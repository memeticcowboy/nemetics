# NEMA Meta-Harness

A locally-runnable meta-harness architecture that wraps any LLM core with the NEMA optimization loop, using the nemetics Obsidian vault as its knowledge corpus.

## Architecture

```
                    ┌─────────────────────────────────────┐
                    │         OUTER SPHERE                 │
                    │       (Meta-Harness)                 │
                    │                                      │
                    │  ┌───────────┐   ┌───────────────┐  │
                    │  │ Obsidian  │   │  Execution     │  │
                    │  │ Vault RAG │   │  Traces        │  │
                    │  │ (823+ md) │   │  (meta-harness │  │
                    │  │           │   │   /traces/)    │  │
                    │  └─────┬─────┘   └───────┬───────┘  │
                    │        │                 │           │
                    │        ▼                 ▼           │
                    │  ┌─────────────────────────────┐    │
                    │  │     Nema (∮ Coordinator)     │    │
                    │  │  Credit assignment, routing,  │    │
                    │  │  synthesis, loop control       │    │
                    │  └──────────┬──────────────────┘    │
                    │             │                        │
                    │    ┌────── ─┼──────┐                │
                    │    ▼        ▼      ▼                │
                    │  ┌───┐  ┌───┐  ┌───┐  ...          │
                    │  │ σ │  │ ρ │  │ λ │  (6 daemons)  │
                    │  └─┬─┘  └─┬─┘  └─┬─┘               │
                    │    └──────┼──────┘                  │
                    │           ▼                          │
                    │  ┌─────────────────────────────┐    │
                    │  │    Model Adapter Layer       │    │
                    │  │  (Ollama / OpenAI / proxy)   │    │
                    │  └──────────┬──────────────────┘    │
                    │             │                        │
                    └─────────────┼────────────────────────┘
                                  │
                    ┌─────────────▼────────────────────────┐
                    │          INNER CORE                    │
                    │     LLM (local or remote)             │
                    │   Claude / Llama / Qwen / Kimi        │
                    │         (pure reasoning)              │
                    └───────────────────────────────────────┘
```

## NEMA LLM Cycle (the optimization loop)

```
Noise ──► Extract ──► Modulate ──► Exchange
  │                                    │
  └────────────────────────────────────┘
         (traces fed back as Noise)
```

Each iteration:
1. **Noise**: Ingest vault content, prior traces, user query
2. **Extract**: Pattern-match against corpus, identify relevant structures
3. **Modulate**: Transform — adjust code, rewrite config, tune retrieval
4. **Exchange**: Emit artifact (file, commit, SIML string) back into vault

## Quick Start

```bash
# 1. Install dependencies
cd meta-harness
bun install    # or: npm install

# 2. Configure model endpoint
cp config/env.example .env
# Edit .env with your model endpoint

# 3. Index the vault
bun run vault-index/build-index.ts

# 4. Run the harness
bun run main.ts
```

## Model Support

Configure via `.env` or `config/harness.toml`:

| Backend | Endpoint Example | Notes |
|---------|------------------|-------|
| Ollama (local) | `http://localhost:11434/v1` | Best for offline, supports llama3.1/qwen2.5 |
| llama.cpp server | `http://localhost:8080/v1` | Raw performance, custom quants |
| vLLM | `http://localhost:8000/v1` | Multi-GPU, production serving |
| OpenAI-compatible proxy | any `/v1/chat/completions` | LiteLLM, OpenRouter, etc. |
| Anthropic (Claude) | `https://api.anthropic.com` | For hybrid local+cloud routing |
| Groq / Together / Fireworks | their respective URLs | Fast inference fallback |

## Directory Structure

```
meta-harness/
├── main.ts               — Entry point, NEMA loop orchestrator
├── config/
│   ├── harness.toml      — Harness configuration
│   └── env.example       — Environment variable template
├── adapters/
│   ├── model-adapter.ts  — Unified LLM interface
│   ├── ollama.ts         — Ollama-specific adapter
│   ├── openai-compat.ts  — OpenAI-compatible adapter
│   └── anthropic.ts      — Claude API adapter
├── daemons/
│   ├── daemon-base.ts    — Base daemon class
│   ├── aerunik.ts        — Air (σ) — distinction
│   ├── sentaria.ts       — Water (ρ) — relation
│   ├── jvalion.ts        — Fire (λ) — direction
│   ├── arboriel.ts       — Wood (β) — exploration
│   ├── humavita.ts       — Earth (δγ) — metabolism
│   ├── ferrosid.ts       — Metal (μ) — boundary
│   └── nema.ts           — Aether (∮) — synthesis coordinator
├── vault-index/
│   ├── build-index.ts    — Index vault markdown files
│   ├── search.ts         — Semantic + keyword search over vault
│   └── embeddings.ts     — Local embedding generation
├── traces/               — Execution trace storage (gitignored)
│   └── .gitkeep
└── package.json
```
