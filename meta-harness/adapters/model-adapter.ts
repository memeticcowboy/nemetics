/**
 * Unified Model Adapter
 *
 * Routes all LLM calls through a single interface, regardless of backend.
 * The harness controls what the model sees (Noise/Extract phases);
 * the model does pure reasoning; the harness processes the output
 * (Modulate/Exchange phases).
 *
 * Supports: Ollama, OpenAI-compatible, Anthropic, any /v1/chat/completions endpoint.
 */

export interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface ModelResponse {
  content: string;
  model: string;
  tokens_used: { prompt: number; completion: number; total: number };
  latency_ms: number;
}

export interface ModelAdapter {
  name: string;
  chat(messages: Message[], options?: ChatOptions): Promise<ModelResponse>;
  embed?(text: string): Promise<number[]>;
  available(): Promise<boolean>;
}

export interface ChatOptions {
  temperature?: number;
  max_tokens?: number;
  stop?: string[];
  /** Which NEMA phase is calling — for trace logging */
  nema_phase?: "noise" | "extract" | "modulate" | "exchange";
  /** Which daemon is calling, if any */
  daemon?: string;
}

/**
 * Create adapter from environment variables.
 *
 * Reads MODEL_ADAPTER from .env and returns the appropriate implementation.
 * Falls back to FALLBACK_ADAPTER if primary is unavailable.
 */
export async function createAdapter(): Promise<ModelAdapter> {
  const adapterType = process.env.MODEL_ADAPTER || "ollama";
  const endpoint = process.env.MODEL_ENDPOINT || "http://localhost:11434/v1";
  const model = process.env.MODEL_NAME || "llama3.1:8b";
  const apiKey = process.env.MODEL_API_KEY || "";
  const maxContext = parseInt(process.env.MODEL_MAX_CONTEXT || "32768");
  const temperature = parseFloat(process.env.MODEL_TEMPERATURE || "0.7");

  const adapter = buildAdapter(adapterType, { endpoint, model, apiKey, maxContext, temperature });

  // Check if primary adapter is available
  if (await adapter.available()) {
    return adapter;
  }

  // Try fallback
  const fallbackType = process.env.FALLBACK_ADAPTER;
  if (fallbackType) {
    console.warn(`Primary adapter (${adapterType}) unavailable, trying fallback (${fallbackType})`);
    const fallback = buildAdapter(fallbackType, {
      endpoint: process.env.FALLBACK_ENDPOINT || endpoint,
      model: process.env.FALLBACK_MODEL || model,
      apiKey: process.env.FALLBACK_API_KEY || "",
      maxContext,
      temperature,
    });
    if (await fallback.available()) {
      return fallback;
    }
  }

  throw new Error(`No model adapter available. Tried: ${adapterType}${fallbackType ? `, ${fallbackType}` : ""}`);
}

interface AdapterConfig {
  endpoint: string;
  model: string;
  apiKey: string;
  maxContext: number;
  temperature: number;
}

function buildAdapter(type: string, config: AdapterConfig): ModelAdapter {
  // All three adapters use the OpenAI-compatible interface.
  // The difference is in health-check and endpoint formatting.
  return {
    name: `${type}:${config.model}`,

    async chat(messages: Message[], options?: ChatOptions): Promise<ModelResponse> {
      const start = Date.now();

      const body: Record<string, unknown> = {
        model: config.model,
        messages,
        temperature: options?.temperature ?? config.temperature,
        max_tokens: options?.max_tokens ?? 4096,
      };
      if (options?.stop) body.stop = options.stop;

      // Anthropic uses a different API format
      if (type === "anthropic") {
        return callAnthropic(config, messages, body, start);
      }

      // OpenAI-compatible (covers Ollama, vLLM, llama.cpp, LiteLLM, etc.)
      const url = `${config.endpoint}/chat/completions`;
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (config.apiKey) headers["Authorization"] = `Bearer ${config.apiKey}`;

      const resp = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });

      if (!resp.ok) {
        throw new Error(`Model API error ${resp.status}: ${await resp.text()}`);
      }

      const data = await resp.json() as {
        choices: { message: { content: string } }[];
        model: string;
        usage?: { prompt_tokens: number; completion_tokens: number; total_tokens: number };
      };

      return {
        content: data.choices[0]?.message?.content || "",
        model: data.model || config.model,
        tokens_used: {
          prompt: data.usage?.prompt_tokens || 0,
          completion: data.usage?.completion_tokens || 0,
          total: data.usage?.total_tokens || 0,
        },
        latency_ms: Date.now() - start,
      };
    },

    async embed(text: string): Promise<number[]> {
      const embModel = process.env.EMBEDDING_MODEL || "nomic-embed-text";
      const embEndpoint = process.env.EMBEDDING_ENDPOINT || config.endpoint.replace("/v1", "");

      if (type === "ollama") {
        // Ollama embedding endpoint
        const resp = await fetch(`${embEndpoint}/api/embeddings`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ model: embModel, prompt: text }),
        });
        const data = await resp.json() as { embedding: number[] };
        return data.embedding;
      }

      // OpenAI-compatible embedding endpoint
      const resp = await fetch(`${config.endpoint}/embeddings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(config.apiKey ? { Authorization: `Bearer ${config.apiKey}` } : {}),
        },
        body: JSON.stringify({ model: embModel, input: text }),
      });
      const data = await resp.json() as { data: { embedding: number[] }[] };
      return data.data[0]?.embedding || [];
    },

    async available(): Promise<boolean> {
      try {
        if (type === "ollama") {
          const base = config.endpoint.replace("/v1", "");
          const resp = await fetch(`${base}/api/tags`, { signal: AbortSignal.timeout(3000) });
          return resp.ok;
        }
        if (type === "anthropic") {
          // Just check if API key is set
          return !!config.apiKey;
        }
        // Generic health check: try models endpoint
        const resp = await fetch(`${config.endpoint}/models`, {
          signal: AbortSignal.timeout(3000),
          headers: config.apiKey ? { Authorization: `Bearer ${config.apiKey}` } : {},
        });
        return resp.ok;
      } catch {
        return false;
      }
    },
  };
}

async function callAnthropic(
  config: AdapterConfig,
  messages: Message[],
  body: Record<string, unknown>,
  start: number
): Promise<ModelResponse> {
  const systemMsg = messages.find((m) => m.role === "system");
  const nonSystem = messages.filter((m) => m.role !== "system");

  const anthropicBody = {
    model: config.model,
    max_tokens: (body.max_tokens as number) || 4096,
    temperature: body.temperature,
    ...(systemMsg ? { system: systemMsg.content } : {}),
    messages: nonSystem.map((m) => ({ role: m.role, content: m.content })),
  };

  const resp = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": config.apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify(anthropicBody),
  });

  if (!resp.ok) {
    throw new Error(`Anthropic API error ${resp.status}: ${await resp.text()}`);
  }

  const data = await resp.json() as {
    content: { text: string }[];
    model: string;
    usage: { input_tokens: number; output_tokens: number };
  };

  return {
    content: data.content[0]?.text || "",
    model: data.model,
    tokens_used: {
      prompt: data.usage.input_tokens,
      completion: data.usage.output_tokens,
      total: data.usage.input_tokens + data.usage.output_tokens,
    },
    latency_ms: Date.now() - start,
  };
}
