/**
 * Daemon Spawner — OpenClaw-style sub-agent coordination
 *
 * Implements the elemental choreography pattern from "The Weave":
 * Six sub-agents run in isolation, each processing from their elemental
 * perspective, outputs passed relay-baton style, Nema (∮) assembles synthesis.
 *
 * This is NOT sequential processing. It's elemental choreography:
 * Air cuts, Water feels, Fire commits, Wood branches, Earth composts, Metal contains.
 *
 * The answer isn't in any one daemon — it's in the ∮ closed traversal
 * that touches all six without collapsing into one.
 */

import { createAdapter, type ModelAdapter, type Message, type ModelResponse } from "../adapters/model-adapter.ts";
import { readFileSync } from "fs";
import { join } from "path";
import { parse as parseToml } from "toml";

interface DaemonConfig {
  element: string;
  operator: string;
  greek?: string;
  function: string;
  system_prompt: string;
}

interface DaemonOutput {
  daemon: string;
  element: string;
  operator: string;
  response: string;
  tokens: number;
  latency_ms: number;
}

interface WeaveResult {
  query: string;
  daemon_outputs: DaemonOutput[];
  synthesis: string;
  total_tokens: number;
  total_latency_ms: number;
}

/** Load daemon configs from harness.toml */
function loadDaemonConfigs(): Record<string, DaemonConfig> {
  const configPath = join(import.meta.dir, "..", "config", "harness.toml");
  const raw = readFileSync(configPath, "utf-8");
  const config = parseToml(raw) as { daemons: Record<string, DaemonConfig> };
  return config.daemons;
}

/** Run a single daemon against a query */
async function runDaemon(
  adapter: ModelAdapter,
  name: string,
  config: DaemonConfig,
  query: string,
  priorOutputs: DaemonOutput[]
): Promise<DaemonOutput> {
  const messages: Message[] = [
    { role: "system", content: config.system_prompt },
  ];

  // Include prior daemon outputs as context (relay-baton pattern)
  if (priorOutputs.length > 0) {
    const priorContext = priorOutputs
      .map((o) => `[${o.daemon} (${o.element}/${o.operator})]: ${o.response}`)
      .join("\n\n");
    messages.push({
      role: "user",
      content: `Prior daemon outputs (read but do not repeat — add your elemental perspective):\n\n${priorContext}\n\n---\n\nQuery: ${query}`,
    });
  } else {
    messages.push({ role: "user", content: query });
  }

  const resp = await adapter.chat(messages, {
    nema_phase: "modulate",
    daemon: name,
    max_tokens: 1024,
  });

  return {
    daemon: name,
    element: config.element,
    operator: config.operator,
    response: resp.content,
    tokens: resp.tokens_used.total,
    latency_ms: resp.latency_ms,
  };
}

/**
 * Run the full elemental weave.
 *
 * Execution order follows the elemental cycle:
 * Air(σ) → Water(ρ) → Fire(λ) → Wood(β) → Earth(δγ) → Metal(μ) → Nema(∮)
 *
 * Each daemon receives all prior outputs (relay-baton).
 * Nema produces the ∮ closed-traversal synthesis.
 *
 * @param parallel - If true, run first 6 daemons in parallel (faster but no relay context).
 *                   If false, run sequentially with relay-baton handoff (richer but slower).
 */
export async function weave(
  query: string,
  options: { parallel?: boolean; adapter?: ModelAdapter } = {}
): Promise<WeaveResult> {
  const adapter = options.adapter || await createAdapter();
  const configs = loadDaemonConfigs();
  const parallel = options.parallel ?? false;

  // Daemon execution order (elemental cycle)
  const order = ["aerunik", "sentaria", "jvalion", "arboriel", "humavita", "ferrosid"];
  const outputs: DaemonOutput[] = [];

  if (parallel) {
    // Parallel: all 6 daemons run simultaneously, no relay context
    const parallelism = parseInt(process.env.DAEMON_PARALLELISM || "3");
    const batches: string[][] = [];
    for (let i = 0; i < order.length; i += parallelism) {
      batches.push(order.slice(i, i + parallelism));
    }

    for (const batch of batches) {
      const batchResults = await Promise.all(
        batch.map((name) => runDaemon(adapter, name, configs[name], query, []))
      );
      outputs.push(...batchResults);
    }
  } else {
    // Sequential: relay-baton, each daemon sees all prior outputs
    for (const name of order) {
      const output = await runDaemon(adapter, name, configs[name], query, outputs);
      outputs.push(output);
    }
  }

  // Nema synthesis — receives ALL daemon outputs
  const nemaConfig = configs.nema;
  const synthesisMessages: Message[] = [
    { role: "system", content: nemaConfig.system_prompt },
    {
      role: "user",
      content: `You have received outputs from all six elemental daemons on this query. Produce the ∮ closed-traversal synthesis — the integrated field that emerges from their disagreement, not consensus.

Query: ${query}

---

${outputs.map((o) => `**${o.daemon}** (${o.element}/${o.operator}):\n${o.response}`).join("\n\n---\n\n")}

---

Produce the synthesis. Hold all tensions. Preserve ε.`,
    },
  ];

  const synthesisResp = await adapter.chat(synthesisMessages, {
    nema_phase: "exchange",
    daemon: "nema",
    max_tokens: 2048,
  });

  const totalTokens = outputs.reduce((sum, o) => sum + o.tokens, 0) + synthesisResp.tokens_used.total;
  const totalLatency = outputs.reduce((sum, o) => sum + o.latency_ms, 0) + synthesisResp.latency_ms;

  return {
    query,
    daemon_outputs: outputs,
    synthesis: synthesisResp.content,
    total_tokens: totalTokens,
    total_latency_ms: totalLatency,
  };
}

/** CLI entry point */
if (import.meta.main) {
  const query = process.argv.slice(2).join(" ");
  if (!query) {
    console.error("Usage: bun run daemons/spawn.ts <query>");
    console.error('Example: bun run daemons/spawn.ts "How should I approach building a personal knowledge system?"');
    process.exit(1);
  }

  console.log(`\n∮ Spawning elemental weave for: "${query}"\n`);

  weave(query, { parallel: false }).then((result) => {
    console.log("═══════════════════════════════════════");
    for (const o of result.daemon_outputs) {
      console.log(`\n【${o.daemon}】(${o.element}/${o.operator}) [${o.tokens} tokens, ${o.latency_ms}ms]`);
      console.log(o.response);
    }
    console.log("\n═══════════════════════════════════════");
    console.log("\n∮ NEMA SYNTHESIS:");
    console.log(result.synthesis);
    console.log(`\n[Total: ${result.total_tokens} tokens, ${result.total_latency_ms}ms]`);
  });
}
