/**
 * Vault Search
 *
 * Hybrid search over the indexed vault: keyword (BM25-approximation)
 * + semantic (cosine similarity on embeddings).
 *
 * This is the Noise→Extract interface: it determines what the LLM sees.
 */

import { readFileSync, existsSync } from "fs";
import { join } from "path";
import type { VaultChunk, VaultIndex } from "./build-index.ts";

interface SearchResult {
  chunk: VaultChunk;
  score: number;
  match_type: "keyword" | "semantic" | "hybrid";
}

interface SearchOptions {
  query: string;
  max_results?: number;
  strategy?: "keyword" | "semantic" | "hybrid";
  /** Boost chunks containing NEMA phase terminology */
  boost_nema?: boolean;
  /** Boost chunks containing SIML strings */
  boost_siml?: boolean;
  /** Filter to specific files or directories */
  file_filter?: string;
}

let cachedIndex: VaultIndex | null = null;

function loadIndex(): VaultIndex {
  if (cachedIndex) return cachedIndex;

  const indexPath = join(import.meta.dir, "vault-index.json");
  if (!existsSync(indexPath)) {
    throw new Error("Vault index not found. Run: bun run vault-index/build-index.ts");
  }

  cachedIndex = JSON.parse(readFileSync(indexPath, "utf-8")) as VaultIndex;
  return cachedIndex;
}

/** Simple BM25-approximation keyword scoring */
function keywordScore(query: string, content: string): number {
  const terms = query.toLowerCase().split(/\s+/).filter((t) => t.length > 2);
  if (terms.length === 0) return 0;

  const contentLower = content.toLowerCase();
  const contentLen = contentLower.split(/\s+/).length;
  const avgLen = 128; // approximate average chunk length in words

  let score = 0;
  for (const term of terms) {
    // Count occurrences
    let count = 0;
    let pos = 0;
    while ((pos = contentLower.indexOf(term, pos)) !== -1) {
      count++;
      pos += term.length;
    }

    if (count === 0) continue;

    // BM25-style scoring (simplified)
    const k1 = 1.5;
    const b = 0.75;
    const tf = count;
    const norm = 1 - b + b * (contentLen / avgLen);
    score += (tf * (k1 + 1)) / (tf + k1 * norm);
  }

  return score / terms.length; // Normalize by query length
}

/** Cosine similarity between two vectors */
function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length || a.length === 0) return 0;
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB) || 1);
}

export async function search(options: SearchOptions): Promise<SearchResult[]> {
  const index = loadIndex();
  const {
    query,
    max_results = 20,
    strategy = "hybrid",
    boost_nema = false,
    boost_siml = false,
    file_filter,
  } = options;

  let chunks = index.chunks;

  // Apply file filter
  if (file_filter) {
    chunks = chunks.filter((c) => c.file.startsWith(file_filter) || c.file.includes(file_filter));
  }

  const results: SearchResult[] = [];

  for (const chunk of chunks) {
    let score = 0;
    let matchType: "keyword" | "semantic" | "hybrid" = "keyword";

    if (strategy === "keyword" || strategy === "hybrid") {
      score = keywordScore(query, chunk.content);
    }

    if ((strategy === "semantic" || strategy === "hybrid") && chunk.embedding) {
      // Would need query embedding — for now, fall back to keyword
      // TODO: Embed query via adapter and compute cosine similarity
      matchType = strategy === "hybrid" ? "hybrid" : "semantic";
    }

    // Boost factors
    if (boost_nema && chunk.meta.has_nema_phase) score *= 1.3;
    if (boost_siml && chunk.meta.has_siml_string) score *= 1.2;

    if (score > 0) {
      results.push({ chunk, score, match_type: matchType });
    }
  }

  // Sort by score descending, take top-k
  results.sort((a, b) => b.score - a.score);
  return results.slice(0, max_results);
}

/** Quick search from CLI */
if (import.meta.main) {
  const query = process.argv.slice(2).join(" ");
  if (!query) {
    console.error("Usage: bun run vault-index/search.ts <query>");
    process.exit(1);
  }

  search({ query, max_results: 10, boost_nema: true }).then((results) => {
    console.log(`\nFound ${results.length} results for: "${query}"\n`);
    for (const r of results) {
      console.log(`[${r.score.toFixed(3)}] ${r.chunk.file}:${r.chunk.line_start}-${r.chunk.line_end}`);
      console.log(`  ${r.chunk.content.slice(0, 120).replace(/\n/g, " ")}...`);
      console.log();
    }
  });
}
