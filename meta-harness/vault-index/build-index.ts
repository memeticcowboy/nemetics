/**
 * Vault Index Builder
 *
 * Indexes all markdown files in the nemetics vault for RAG retrieval.
 * Produces two indexes:
 *   1. Keyword index (BM25-style) for fast lexical search
 *   2. Embedding index (semantic) for meaning-based retrieval
 *
 * The vault IS the Obsidian vault. Every .md file is a knowledge node.
 * Cross-references (SIML entries, glossary links, elemental mappings)
 * are preserved as metadata for graph-aware retrieval.
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, statSync } from "fs";
import { join, relative, extname } from "path";

interface VaultChunk {
  id: string;
  file: string;
  line_start: number;
  line_end: number;
  content: string;
  /** Metadata extracted from the chunk */
  meta: {
    has_siml_string: boolean;
    has_phi_signature: boolean;
    has_nema_phase: boolean;
    elements_referenced: string[];
    cross_references: string[];
  };
  /** Embedding vector (populated by embed step) */
  embedding?: number[];
}

interface VaultIndex {
  built_at: string;
  vault_path: string;
  total_files: number;
  total_chunks: number;
  chunks: VaultChunk[];
}

const CHUNK_SIZE = 512;      // ~tokens (approximated as ~4 chars/token)
const CHUNK_OVERLAP = 64;
const CHARS_PER_TOKEN = 4;

// Patterns for metadata extraction
const SIML_PATTERN = /Φ\([^)]+\)\s*=/;
const PHI_PATTERN = /Φ\(t\)|[ZΨQχ]\s*[∘(]/;
const NEMA_PHASE_PATTERN = /\b(Noise|Notice|Extract|Engage|Modulate|Metabolize|Exchange|Act)\b/;
const ELEMENT_PATTERN = /\b(Air|Water|Fire|Wood|Earth|Metal|Aether)\b|\b[σρλβδγμ∮]\b/g;
const XREF_PATTERN = /\[([^\]]+)\]\(([^)]+)\)/g;

function getAllMdFiles(dir: string, exclude: string[]): string[] {
  const files: string[] = [];

  function walk(current: string) {
    for (const entry of readdirSync(current)) {
      const full = join(current, entry);
      const rel = relative(dir, full);

      // Check exclusions
      if (exclude.some((pat) => {
        const globBase = pat.replace("/**", "");
        return rel.startsWith(globBase) || entry.startsWith(".");
      })) continue;

      const stat = statSync(full);
      if (stat.isDirectory()) {
        walk(full);
      } else if (extname(entry) === ".md" || extname(entry) === ".txt") {
        files.push(full);
      }
    }
  }

  walk(dir);
  return files;
}

function chunkFile(filePath: string, vaultRoot: string): VaultChunk[] {
  const content = readFileSync(filePath, "utf-8");
  const lines = content.split("\n");
  const relPath = relative(vaultRoot, filePath);
  const chunks: VaultChunk[] = [];

  const chunkChars = CHUNK_SIZE * CHARS_PER_TOKEN;
  const overlapChars = CHUNK_OVERLAP * CHARS_PER_TOKEN;

  let pos = 0;
  let lineIdx = 0;
  let chunkNum = 0;

  while (lineIdx < lines.length) {
    const startLine = lineIdx;
    let accumulated = "";

    // Accumulate lines until we hit chunk size
    while (lineIdx < lines.length && accumulated.length < chunkChars) {
      accumulated += lines[lineIdx] + "\n";
      lineIdx++;
    }

    if (accumulated.trim().length === 0) continue;

    // Extract metadata
    const elements: string[] = [];
    let match;
    const elemRegex = new RegExp(ELEMENT_PATTERN.source, "g");
    while ((match = elemRegex.exec(accumulated)) !== null) {
      if (!elements.includes(match[0])) elements.push(match[0]);
    }

    const xrefs: string[] = [];
    const xrefRegex = new RegExp(XREF_PATTERN.source, "g");
    while ((match = xrefRegex.exec(accumulated)) !== null) {
      xrefs.push(match[2]); // capture the link target
    }

    chunks.push({
      id: `${relPath}:${chunkNum}`,
      file: relPath,
      line_start: startLine + 1,
      line_end: lineIdx,
      content: accumulated.trim(),
      meta: {
        has_siml_string: SIML_PATTERN.test(accumulated),
        has_phi_signature: PHI_PATTERN.test(accumulated),
        has_nema_phase: NEMA_PHASE_PATTERN.test(accumulated),
        elements_referenced: elements,
        cross_references: xrefs.slice(0, 10), // cap at 10
      },
    });

    chunkNum++;

    // Back up by overlap amount (in lines)
    const overlapLines = Math.max(1, Math.floor(overlapChars / 80)); // ~80 chars/line
    lineIdx = Math.max(lineIdx - overlapLines, lineIdx - 1);
    if (lineIdx <= startLine) lineIdx = startLine + 1; // prevent infinite loop
  }

  return chunks;
}

async function buildIndex() {
  const vaultPath = join(import.meta.dir, "..", process.env.VAULT_PATH || "..");
  const excludes = ["meta-harness", "node_modules", ".git", "site", "NEMA_TERMINOLOGY_AUDIT.md"];

  console.log(`Indexing vault at: ${vaultPath}`);
  const files = getAllMdFiles(vaultPath, excludes);
  console.log(`Found ${files.length} files`);

  const allChunks: VaultChunk[] = [];
  for (const file of files) {
    const chunks = chunkFile(file, vaultPath);
    allChunks.push(...chunks);
  }

  console.log(`Generated ${allChunks.length} chunks`);

  // Stats
  const withSiml = allChunks.filter((c) => c.meta.has_siml_string).length;
  const withPhi = allChunks.filter((c) => c.meta.has_phi_signature).length;
  const withNema = allChunks.filter((c) => c.meta.has_nema_phase).length;
  console.log(`  SIML strings: ${withSiml} chunks`);
  console.log(`  Φ signatures: ${withPhi} chunks`);
  console.log(`  NEMA phases:  ${withNema} chunks`);

  const index: VaultIndex = {
    built_at: new Date().toISOString(),
    vault_path: vaultPath,
    total_files: files.length,
    total_chunks: allChunks.length,
    chunks: allChunks,
  };

  const outDir = join(import.meta.dir);
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

  const outPath = join(outDir, "vault-index.json");
  writeFileSync(outPath, JSON.stringify(index, null, 2));
  console.log(`Index written to: ${outPath}`);

  return index;
}

// Run if called directly
if (import.meta.main) {
  buildIndex().catch(console.error);
}

export { buildIndex, type VaultChunk, type VaultIndex };
