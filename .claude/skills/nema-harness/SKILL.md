---
name: nema-harness
description: Run a query through the NEMA meta-harness cycle (Noise→Extract→Modulate→Exchange) with optional daemon weave. Uses the Obsidian vault as RAG knowledge source and can spawn elemental sub-agents for multi-perspective analysis.
argument-hint: [--weave] <query>
allowed-tools: Bash, Read, Edit, Write, Glob, Grep, Agent
---

# NEMA Meta-Harness Skill

You are running the NEMA meta-harness — an LLM optimization loop over the nemetics Obsidian vault.

## Inputs

- `$ARGUMENTS` contains: `[--weave] <query>` where:
  - `--weave` (optional): Use full elemental daemon decomposition (6 perspectives + synthesis)
  - `<query>`: The question or task to process through the NEMA cycle

## Execution: The NEMA LLM Cycle

### Phase 1: NOISE (Ingest)

Search the vault for relevant prior work. The vault IS the knowledge corpus.

1. Use Grep/Glob to search for terms from the query across `**/*.md`
2. Check key reference files:
   - `memetic_ecology/8_REGIMES/regime.md` — Φ(t) formalism
   - `Papers/SIML_Plain_English_Guide_v1.1.1.md` — SIML spec
   - `Glossary/` — defined terms
3. Check `memory/` for recent session context
4. Check `meta-harness/traces/` for prior runs on similar queries

Report what you found. Don't filter prematurely — that's the next phase.

### Phase 2: EXTRACT (Discriminate)

From the Noise results, identify which patterns are **structurally relevant**:

- Which vault files actually address the query (not just keyword-similar)?
- Which SIML entries, elemental mappings, or Φ(t) formalisms apply?
- What's the substrate context — LLM (nemetic) or Human (nematic)?
- What ε (productive uncertainty) exists in the source material?

Produce a ranked list of the 3-5 most relevant sources with reasoning.

### Phase 3: MODULATE (Transform)

**If `--weave` was specified:**
Launch 6 Agent sub-agents, one per elemental daemon:

| Agent | Daemon | Instruction |
|-------|--------|-------------|
| 1 | Aerunik (Air/σ/χ) | "Cut: What distinctions does this query require? What must be separated from what?" |
| 2 | Sentaria (Water/ρ/Q) | "Feel: What resonances exist? What relates to what, and how deeply?" |
| 3 | Jvalion (Fire/λ) | "Commit: What is the directional thrust? What specific action or answer is aimed at?" |
| 4 | Arboriel (Wood/β) | "Branch: What alternatives exist? What paths haven't been explored?" |
| 5 | Humavita (Earth/δγ) | "Compost: What needs to be decomposed? What old material can be recycled?" |
| 6 | Ferrosid (Metal/μ) | "Contain: What are the boundaries? What structural constraints apply?" |

Each agent receives the query + the Extract results as context.
Then produce the ∮ synthesis — the integrated field from all six perspectives.

**If no `--weave`:**
Process the query directly using the Extract results as context. Apply the nemetic framework vocabulary. Preserve ε.

### Phase 4: EXCHANGE (Emit)

Produce the output artifact. This could be:
- A direct answer (default)
- A new vault file (if the query asks for content creation)
- A modified existing file (if the query asks for edits)
- A SIML string or nemetic string
- A mini-memetic report

Log the trace: what files were accessed, what was produced, token usage.

## Important Rules

1. **Search before generating.** The vault has 823+ files of prior work.
2. **Use correct substrate terminology.** LLM: Noise/Extract/Modulate/Exchange. Human: Notice/Engage/Metabolize/Act.
3. **Preserve ε.** Don't collapse ambiguity the framework intentionally maintains.
4. **Cite sources.** Reference vault file paths when drawing on existing content.
5. **Cowboy voice for blog content.** If producing blog posts, use first-person Bert voice.
