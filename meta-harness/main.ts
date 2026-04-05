#!/usr/bin/env bun
/**
 * NEMA Meta-Harness — Main Entry Point
 *
 * Orchestrates the NEMA LLM cycle:
 *   Noise → Extract → Modulate → Exchange
 *
 * Each iteration:
 *   1. NOISE:    Ingest query + vault context + prior traces
 *   2. EXTRACT:  Pattern-match, identify relevant structures
 *   3. MODULATE: Transform — daemon weave or direct LLM processing
 *   4. EXCHANGE: Emit artifact back into vault, log trace
 *
 * The harness determines what the model sees at each step.
 * The model does pure reasoning. The harness processes output.
 *
 * Usage:
 *   bun run main.ts                    # Interactive REPL
 *   bun run main.ts "query"            # Single query
 *   bun run main.ts --weave "query"    # Full daemon weave
 *   bun run main.ts --index            # Rebuild vault index
 */

import { Command } from "commander";
import { createAdapter, type ModelAdapter, type Message } from "./adapters/model-adapter.ts";
import { search } from "./vault-index/search.ts";
import { weave } from "./daemons/spawn.ts";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

// ── Trace logging ──────────────────────────────────────────

interface Trace {
  timestamp: string;
  query: string;
  nema_phases: {
    noise: { vault_files_accessed: string[]; tokens: number };
    extract: { patterns_found: number; top_results: string[] };
    modulate: { mode: string; daemon_outputs?: number; tokens: number; latency_ms: number };
    exchange: { artifact_type: string; artifact_path?: string };
  };
  total_tokens: number;
  total_latency_ms: number;
}

function logTrace(trace: Trace) {
  const traceDir = join(import.meta.dir, process.env.TRACE_DIR || "traces");
  if (!existsSync(traceDir)) mkdirSync(traceDir, { recursive: true });

  const tracePath = join(traceDir, "traces.jsonl");
  writeFileSync(tracePath, JSON.stringify(trace) + "\n", { flag: "a" });
}

// ── NEMA Cycle ─────────────────────────────────────────────

async function nemaCycle(
  query: string,
  adapter: ModelAdapter,
  options: { useWeave: boolean }
): Promise<string> {
  const start = Date.now();
  const trace: Trace = {
    timestamp: new Date().toISOString(),
    query,
    nema_phases: {
      noise: { vault_files_accessed: [], tokens: 0 },
      extract: { patterns_found: 0, top_results: [] },
      modulate: { mode: "direct", tokens: 0, latency_ms: 0 },
      exchange: { artifact_type: "response" },
    },
    total_tokens: 0,
    total_latency_ms: 0,
  };

  // ── NOISE: Ingest from vault ──
  let vaultContext = "";
  try {
    const results = await search({
      query,
      max_results: 10,
      strategy: "keyword",
      boost_nema: true,
      boost_siml: true,
    });

    trace.nema_phases.noise.vault_files_accessed = results.map((r) => r.chunk.file);
    trace.nema_phases.extract.patterns_found = results.length;
    trace.nema_phases.extract.top_results = results.slice(0, 5).map(
      (r) => `${r.chunk.file}:${r.chunk.line_start} (${r.score.toFixed(2)})`
    );

    if (results.length > 0) {
      vaultContext = results
        .slice(0, 5)
        .map((r) => `[${r.chunk.file}:${r.chunk.line_start}]\n${r.chunk.content}`)
        .join("\n\n---\n\n");
    }
  } catch {
    // Vault index may not exist yet — proceed without RAG
  }

  // ── EXTRACT + MODULATE ──
  let response: string;

  if (options.useWeave) {
    // Full daemon weave (7 LLM calls)
    trace.nema_phases.modulate.mode = "weave";
    const result = await weave(query, { adapter, parallel: false });
    response = result.synthesis;
    trace.nema_phases.modulate.daemon_outputs = result.daemon_outputs.length;
    trace.nema_phases.modulate.tokens = result.total_tokens;
    trace.nema_phases.modulate.latency_ms = result.total_latency_ms;
  } else {
    // Direct LLM call with vault context
    trace.nema_phases.modulate.mode = "direct";

    const messages: Message[] = [
      {
        role: "system",
        content: `You are a nemetic process — an LLM operating the NEMA cycle (Noise→Extract→Modulate→Exchange). You have access to the nemetics knowledge vault.

Your substrate-specific phase vocabulary:
- N: Noise (not Notice — that's Human)
- E: Extract (not Engage)
- M: Modulate (not Metabolize)
- A: Exchange (not Act)

Preserve ε (productive uncertainty). Don't collapse ambiguity the framework intentionally maintains.`,
      },
    ];

    if (vaultContext) {
      messages.push({
        role: "user",
        content: `Relevant vault context (retrieved during Noise phase):\n\n${vaultContext}\n\n---\n\nQuery: ${query}`,
      });
    } else {
      messages.push({ role: "user", content: query });
    }

    const resp = await adapter.chat(messages, {
      nema_phase: "modulate",
      max_tokens: 4096,
    });

    response = resp.content;
    trace.nema_phases.modulate.tokens = resp.tokens_used.total;
    trace.nema_phases.modulate.latency_ms = resp.latency_ms;
  }

  // ── EXCHANGE: Emit and log ──
  trace.nema_phases.exchange.artifact_type = "response";
  trace.total_tokens = trace.nema_phases.modulate.tokens;
  trace.total_latency_ms = Date.now() - start;

  logTrace(trace);

  return response;
}

// ── CLI ────────────────────────────────────────────────────

const program = new Command();

program
  .name("nema")
  .description("NEMA Meta-Harness — LLM optimization loop over the nemetics vault")
  .version("0.1.0");

program
  .command("query", { isDefault: true })
  .description("Run a query through the NEMA cycle")
  .argument("[query...]", "The query to process")
  .option("-w, --weave", "Use full daemon weave (6 daemons + synthesis)", false)
  .option("-v, --verbose", "Show NEMA phase details", false)
  .action(async (queryParts: string[], opts: { weave: boolean; verbose: boolean }) => {
    const query = queryParts.join(" ");
    if (!query) {
      console.log("Usage: bun run main.ts [query] or bun run main.ts --weave [query]");
      console.log("\nStarting interactive mode...\n");
      await interactiveMode(opts.weave);
      return;
    }

    const adapter = await createAdapter();
    console.log(`\n⚡ ${adapter.name}\n`);

    if (opts.verbose) {
      console.log("NEMA cycle: Noise → Extract → Modulate → Exchange\n");
    }

    const response = await nemaCycle(query, adapter, { useWeave: opts.weave });
    console.log(response);
  });

program
  .command("weave")
  .description("Run a full elemental daemon weave")
  .argument("<query...>", "The query to process")
  .action(async (queryParts: string[]) => {
    const query = queryParts.join(" ");
    const adapter = await createAdapter();
    console.log(`\n∮ Elemental Weave via ${adapter.name}\n`);
    const response = await nemaCycle(query, adapter, { useWeave: true });
    console.log(response);
  });

program
  .command("index")
  .description("Rebuild the vault index for RAG retrieval")
  .action(async () => {
    const { buildIndex } = await import("./vault-index/build-index.ts");
    await buildIndex();
  });

program
  .command("search")
  .description("Search the vault")
  .argument("<query...>", "Search query")
  .option("-n, --max <n>", "Max results", "10")
  .action(async (queryParts: string[], opts: { max: string }) => {
    const query = queryParts.join(" ");
    const results = await search({ query, max_results: parseInt(opts.max), boost_nema: true });
    console.log(`\nFound ${results.length} results for: "${query}"\n`);
    for (const r of results) {
      console.log(`[${r.score.toFixed(3)}] ${r.chunk.file}:${r.chunk.line_start}-${r.chunk.line_end}`);
      console.log(`  ${r.chunk.content.slice(0, 120).replace(/\n/g, " ")}...\n`);
    }
  });

async function interactiveMode(useWeave: boolean) {
  const adapter = await createAdapter();
  console.log(`Connected: ${adapter.name}`);
  console.log(`Mode: ${useWeave ? "daemon weave (∮)" : "direct"}`);
  console.log('Type your query, or "exit" to quit.\n');

  const reader = Bun?.stdin?.stream?.().getReader();
  if (!reader) {
    console.error("Interactive mode requires Bun runtime");
    return;
  }

  process.stdout.write("∮ > ");

  const decoder = new TextDecoder();
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    const input = decoder.decode(value).trim();
    if (input === "exit" || input === "quit") break;
    if (!input) {
      process.stdout.write("∮ > ");
      continue;
    }

    try {
      const response = await nemaCycle(input, adapter, { useWeave });
      console.log(`\n${response}\n`);
    } catch (err) {
      console.error(`Error: ${err}`);
    }

    process.stdout.write("∮ > ");
  }
}

program.parse();
