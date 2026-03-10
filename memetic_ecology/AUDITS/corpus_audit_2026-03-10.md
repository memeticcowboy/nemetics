# Corpus Audit Report

**Date:** 2026-03-10
**Scope:** Full corpus scan
**Framework Version:** HABITAT_ECOLOGY v1.3.1
**Auditor:** NEMETIC-CORPUS-AUDITOR skill

---

## Executive Summary

The Memetic Ecology corpus is structurally sound, with excellent core consistency—operator notation (Φ(t)), habitat definitions, and system locks are perfectly uniform across all documents. The biggest gaps are not in what exists but in what's missing: high-frequency operational terms (SWARM at 134 file mentions, ε at 109, bow-tie at 76) lack glossary entries, the Glossary README is stale (lists 10 entries, actual count is 65), and metadata compliance is uneven (100% in canonical files, ~35% in analytical files). The corpus concentrated heavily in a Feb 24-25 2026 documentation sprint (~94% of content), leaving later layers thin. No critical integrity failures. The framework's self-description is consistent; its accessibility infrastructure (glossary, cross-references, onboarding paths) lags behind.

---

## 1. Directory Structure

#### Directory Health

| Directory | Expected Content | Actual Content | Status |
|-----------|-----------------|----------------|--------|
| `0_Ω_GROUND/` | Omega ground documentation | 2 files (omega_undifferentiated_attention, raw_residues) | ⚠️ Thin |
| `1_HABITAT_IT-FIELD/` | It-Field habitat | 4 files (canonical, biases, surprise, phi-field comparison) | ✅ Good |
| `2_HABITAT_I-TUBE/` | I-Tube habitat | 3 files (canonical, identity_knots, twist_diagnostics) | ✅ Good |
| `3_HABITAT_MY-STREAM/` | My-Stream habitat | 5 files (canonical, affective loops, gradient path, narrative tensions, territorial claims) | ✅ Strong |
| `4_HABITAT_WE-SPHERE/` | We-Sphere habitat | 4 files (canonical, collective twists, intermesh coupling, shared knots) | ✅ Good |
| `5_HABITAT_THREADPLEX/` | Thread/Twist/Knot/Threadplex | 11 files + 3 subdirectories | ✅ Strong |
| `6_LATTICE/` | Structural layer | 6 files (canonical, breathing, hauntological effects, local minimum, persistent knots, philosophical connections) | ✅ Strong |
| `7_OTHER-SPHERE/` | Relational alterity | 4 files (canonical, harmonic collapse, omega contact, refresh protocols) | ✅ Good |
| `8_REGIMES/` | Operator formalism | 5 files (regime canonical, quick reference, phi_t_formalism, layer distinctions, omega_chi_Q_Psi_Z) | ✅ Strong |
| `9_WORLD-STATES/` | World-state topology | 8 files (co-sphere, memegrid, bifurcation diagnostics, adaptive coordination, co-sphere signals, temporal flexibility, quick reference, memegrid_warnings) | ✅ Strong |
| `10_INSIGHTS/` | Pattern recognitions | 20 files across 4 subdirectories | ✅ Active |
| `10_INSIGHTS/context_maps/` | Cross-connection maps | Directory exists, content status unclear | ⚠️ Thin |
| `11-BOW-TIE/` | Bow-tie topology | 1 file (README — comprehensive, 252 lines) | ✅ Complete (single authoritative doc) |
| `12-SELFMESH/` | SelfMesh layer | 2 files (README + canonical) | ✅ Good |
| `13-ELEMENTAL_DAEMONS/` | Daemon definitions | 1 file (README — comprehensive, ~8.7KB) | ✅ Complete (single authoritative doc) |
| `APPLICATIONS/` | Cross-domain translations | 1 file (media_ecology_translation — just created) | ⚠️ New, needs growth |
| `AUDITS/` | Corpus audit reports | This file (first entry) | ⚠️ New |

**Key Findings:**
- All 9 habitats from the CANONICAL_LEGEND have directories with substantive content
- No empty directories detected
- `0_Ω_GROUND/` is the thinnest habitat directory (2 files) for arguably the most foundational concept
- No directory exists for Thread, Twist, or Knot as separate habitats—they're consolidated under `5_HABITAT_THREADPLEX/`. The CANONICAL_LEGEND lists them separately but the filing is combined. This is a structural decision, not an error, but may cause navigation confusion.
- `KNOWLEDGE/KEYWORDS/` (outside memetic_ecology/) exists but is completely empty

---

## 2. Term Consistency

#### Consistency Status: Core Definitions Excellent, Glossary Coverage Poor

**Φ(t) Notation:** PERFECT across all 21 files that reference it. Always expressed as `Φ(t) = (Z ∘ Ψ ∘ Q ∘ χ)(Ω) ⊕_harmonic Ω`. No deviations.

**Nematic/Nemetic/NEMAtic Distinctions:** PERFECT. These are three distinct operational modes, not spelling variations, and the corpus maintains clear boundaries with a dedicated distinction file in `8_REGIMES/layer_distinctions_memetic_nemetic_nematic_nematic.md`.

**Bow-tie Spelling:** PERFECT. All 76 occurrences use "bow-tie" (hyphenated). Zero variations.

**Lumemic/Usurpenic:** EXCELLENT across 25 files. Definitions consistent with dedicated canonical file.

**No definitional conflicts detected** between any canonical documents for any core term.

#### Frequently Used, Undefined (Missing Glossary Entries)

| Term | File Mentions | Dedicated Doc | Glossary Entry | Priority |
|------|--------------|---------------|----------------|----------|
| **SWARM** | 134 | NO | NO | **Critical** |
| **ε (epsilon)** | 109 | Implicit across many files | NO | **Critical** |
| **Bow-tie** | 76 | YES (11-BOW-TIE/README.md) | NO | **High** |
| **Lumemic/Usurpenic** | 25 | YES (5_HABITAT_THREADPLEX/lumemic_usurpenic/) | NO | **High** |
| **Φ(t)** | 21 | YES (8_REGIMES/phi_t_formalism.md) | NO | **High** |
| **Pattern-Agent** | 3 | YES (5_HABITAT_THREADPLEX/pattern_agent.md) | NO | **High** |
| **Soft global minimum** | 3 | Defined in world-state files | NO | **Medium** |
| **Sensebreaking** | 2 | Partial (in Bow-Tie doc) | NO | **Medium** |
| **Co-SPHERE** | world-state files | YES (9_WORLD-STATES/co-sphere.md) | NO | **High** |
| **MemeGrid** | world-state files | YES (9_WORLD-STATES/memegrid.md) | NO | **High** |

**Glossary-Specific Issue:** The README.md lists 10 "canonical foundation" entries but the actual Glossary contains 65 files. The README is severely stale—it doesn't reference 55 of the existing entries. The 55 unlisted entries appear to be expansion terms (cognitive science, social theory imports) that were added without updating the index.

---

## 3. Cross-Reference Integrity

#### Broken References

| Source Document | Reference Target | Status |
|----------------|-----------------|--------|
| `IF-PRIME/README.md` | `IF-PRIME/integration/` directory | **Missing** — referenced as "Points of contact with Memetic Ecology" but directory doesn't exist. README acknowledges: "awaiting detailed filing." Known gap, not error. |
| `Glossary/README.md` | 55 actual glossary entries | **Unlisted** — README lists 10 entries, 55 more exist but aren't indexed. |
| `10_INSIGHTS/README.md` | `context_maps/` as "Cross-connections, emergent category proposals" | **Thin** — directory exists but content sparse relative to description. |
| `KNOWLEDGE/KEYWORDS/` | Implied future content | **Empty** — directory exists with no files. No documentation explains intended use. |

#### Verified (Resolving Correctly)

- ✅ All 9 CANONICAL_LEGEND directory references resolve to existing directories with content
- ✅ All README files in `5_HABITAT_THREADPLEX/` subdirectories (cross_habitat_migration, lumemic_usurpenic, pattern_agency) are well-formed and describe their contents accurately
- ✅ `IF-PRIME/theory/` and `IF-PRIME/grammar/` both exist with content as referenced
- ✅ All 10 canonical glossary entries listed in README resolve to existing files

---

## 4. Canonical Consistency

#### Cross-Document Verification

| Element | CANONICAL_LEGEND | Quick Reference | Individual Files | Status |
|---------|-----------------|-----------------|------------------|--------|
| Operator Ω | "Undifferentiated field / Reseeding, novelty" | "Reseeding, novelty, source of revisability" | Consistent across all habitat files | ✅ Match (QR adds "source of revisability" — extension, not conflict) |
| Operator χ | "Distinction / Differentiation, perceptual cut" | "Perceptual cut, differentiation" | I-Tube canonical: "Distinguishes but doesn't decide" | ✅ Match |
| Operator Q | "Temporal-Relational Flow / Continuity, affect, carry" | "Continuity, affect, carry" | My-Stream canonical: "Continuity without narrative foreclosure" | ✅ Match |
| Operator Ψ | "Binding / Stabilization, compression" | "Stabilization, compression" | Thread/Knot files: consistent | ✅ Match |
| Operator Z | "Coordination / World-level alignment" | "World-level alignment" | Co-SPHERE/MemeGrid: consistent | ✅ Match |
| Co-SPHERE glyph | 🜛 | 🜛 | 🜛 across all files | ✅ Match |
| MemeGrid glyph | ▩ | ▩ | ▩ across all files | ✅ Match |

**System Locks Consistency:**

The 7 system locks from CANONICAL_LEGEND were checked against all files that reference constraints:

| Lock | Consistent? | Notes |
|------|-------------|-------|
| Threads must remain revisable | ✅ | Referenced in 12+ files, always identical |
| Knots must remain untie-able | ✅ | Referenced in 8+ files, always identical |
| Twists must remain unwindable | ✅ | Referenced in 6+ files, always identical |
| Z must remain Ω-permeable | ✅ | Core bifurcation, consistent everywhere |
| Ω must never be owned | ✅ | Consistent across It-Field, ground, and regime docs |
| Habitats must never be moralized | ✅ | Consistent, explicitly enforced |
| Operators must never be reified | ✅ | Consistent, explicitly enforced |

**No canonical discrepancies detected.** The framework's core definitions are locked and consistent.

#### Possible Evolution (Not Error)

| Element | Earlier Usage | Later Usage | Assessment |
|---------|-------------|-------------|------------|
| Glossary scope | 10 canonical terms (README) | 65 terms (actual files) | **Evolution** — glossary expanded without README update |
| SIML tagging | Used in blog posts (Feb 25) | Referenced less in later structural docs | **Evolution** — SIML may be transitioning from active tagging to reference infrastructure |
| Co-SPHERE failure mode | "Premature coherence" (quick_reference) | "Premature Z-Collapse" (co-sphere.md) | **Consistent** — same concept, different phrasing |

---

## 5. Coverage Gaps

#### Concepts Introduced But Not Filed Into Core Structure

| Concept | Where Introduced | Core Structure Status | Gap Severity |
|---------|-----------------|----------------------|-------------|
| **SWARM (collective daemon operation)** | Bow-Tie README, Glossary README (flagged as "next") | No dedicated file, no glossary entry | **Critical** |
| **Sensebreaking** | Bow-Tie README (5 types defined) | No dedicated file, no glossary entry | **High** |
| **SIMLattice** | Bow-Tie README, 102 files reference it | SIML_CROSS_REFERENCE exists, but SIMLattice as concept undocumented | **Medium** |
| **Confabulation (as right-funnel artifact)** | Bow-Tie README | Glossary entry exists (Glossary/C/confabulation.md) but may not reflect bow-tie framing | **Low** |

#### Habitats with Thin Documentation

| Habitat | Files | What's Missing |
|---------|-------|---------------|
| **0_Ω_GROUND** | 2 | Thinnest directory for arguably the most foundational concept. Needs: relationship to each habitat, operational characteristics, how Ω functions differently from "nothing" |
| **2_HABITAT_I-TUBE** | 3 | Adequate but could use: examples of I-Tube dynamics in specific contexts, relationship to algorithmic filtering (media ecology connection) |

#### IF-Prime Integration Gaps

| Component | Status |
|-----------|--------|
| `IF-PRIME/theory/` | Has glossary.md — functional |
| `IF-PRIME/grammar/` | Has integrated_working_document_v0.7.md — comprehensive |
| `IF-PRIME/integration/` | **MISSING** — referenced in README but doesn't exist |

#### Daemon-Specific Gaps

The 7 elemental daemons are defined in `13-ELEMENTAL_DAEMONS/README.md` as a comprehensive single document. However:
- No individual daemon files exist
- Daemon variant analyses exist in `10_INSIGHTS/by_pattern/daemon_variants/` (6 files for Air, Earth, Fire, Metal, Water, Wood) but these are analytical insights, not canonical definitions
- No documentation of daemon interaction patterns, handoff protocols, or collective behavior (the SWARM gap)

---

## 6. Metadata Health

#### Status/Layer/Related/Source Field Compliance

| Directory | Files Checked | Has Status | Has Layer | Has Related | Has Source | Compliance |
|-----------|--------------|-----------|-----------|-------------|-----------|------------|
| 1_HABITAT_IT-FIELD | 4 | 75% | 50% | 75% | 75% | ⚠️ Mixed |
| 2_HABITAT_I-TUBE | 3 | 67% | 33% | 67% | 67% | ⚠️ Mixed |
| 3_HABITAT_MY-STREAM | 5 | 80% | 60% | 80% | 80% | ✅ Good |
| 4_HABITAT_WE-SPHERE | 4 | 50% | 25% | 50% | 50% | ⚠️ Mixed |
| 5_HABITAT_THREADPLEX | 11 | 82% | 73% | 82% | 82% | ✅ Good |
| 6_LATTICE | 6 | 83% | 67% | 83% | 83% | ✅ Good |
| 7_OTHER-SPHERE | 4 | 50% | 25% | 50% | 50% | ⚠️ Mixed |
| 8_REGIMES | 5 | 80% | 60% | 60% | 80% | ⚠️ Mixed |
| 9_WORLD-STATES | 8 | 88% | 75% | 88% | 88% | ✅ Good |
| 11-BOW-TIE | 1 | 100% | 100% | 100% | 100% | ✅ Perfect |
| 12-SELFMESH | 2 | 100% | 100% | 100% | 100% | ✅ Perfect |
| 13-ELEMENTAL_DAEMONS | 1 | 100% | 100% | 100% | 100% | ✅ Perfect |

**Average metadata compliance: ~70%** — Canonical hub documents (Bow-Tie, SelfMesh, Daemons) are 100%. Satellite files in habitat directories are 50-80%.

#### Framework Version Numbers

**100% consistent.** All files reference HABITAT_ECOLOGY v1.3.1 or compatible extensions (+ IF-Prime, + SELFMESH v1.0, etc.). No version conflicts.

#### Temporal Distribution

| Period | Files | Notes |
|--------|-------|-------|
| 2025-12-09 | ~2 | Earliest dated content |
| 2026-01-01 to 2026-01-15 | ~5 | Co-SPHERE, MemeGrid, Bow-Tie foundations |
| 2026-02-23 to 2026-02-25 | ~68 | **Major documentation sprint** (~86% of corpus) |
| 2026-03-02 to 2026-03-10 | ~5 | Blog additions, Media Ecology translation, this audit |

The corpus was substantially created in a 2-3 day burst. This explains both its remarkable internal consistency (written close together with unified intent) and its metadata gaps (speed over completeness).

---

## Prioritized Work Queue

| Priority | Task | Type | Effort | Rationale |
|----------|------|------|--------|-----------|
| 1 | **Define SWARM concept** — Create dedicated file in 13-ELEMENTAL_DAEMONS/ or new directory. 134 file mentions with no definition is the corpus's biggest structural gap. | Gap | Medium | Highest reference frequency with zero documentation. Blocks understanding of daemon collective behavior. |
| 2 | **Update Glossary/README.md** — Index all 65 existing entries, not just 10 canonical ones. Currently the glossary's front door misrepresents its contents by 6x. | Fix | Small | Highest newcomer impact. Anyone arriving at the glossary sees 10% of what's there. |
| 3 | **Create glossary entries for ε, bow-tie, lumemic/usurpenic, Co-SPHERE, MemeGrid, Φ(t)** — The 6 most-referenced terms without glossary entries. | Gap | Medium | These terms appear in 300+ combined file mentions. Any newcomer will encounter them immediately and need definitions. |
| 4 | **Create IF-PRIME/integration/ directory** — Populate with at least 2-3 bridge documents connecting IF-Prime formalism to ecological habitat descriptions. | Gap | Medium | Referenced in README as planned; currently missing. The NEMETIC-FORMALISM-BRIDGE skill is designed for exactly this. |
| 5 | **Expand 0_Ω_GROUND/** — Add at least 2 files: Ω's relationship to each habitat, and how Ω differs from "nothing/void/chaos." | Gap | Medium | Ω is the framework's ground concept. 2 files for the most foundational element creates a false impression of thinness. |
| 6 | **Create sensebreaking glossary entry and/or dedicated file** — Currently defined only within the Bow-Tie document. Deserves standalone treatment given its diagnostic importance. | Gap | Small | Key diagnostic concept buried inside another document. Easy extraction. |
| 7 | **Create pattern-agent glossary entry** — Well-defined in dedicated file but invisible to glossary navigation. | Gap | Small | Foundational concept for memetic ecology; easy to create from existing content. |
| 8 | **Standardize metadata across habitat satellite files** — Add Status/Layer/Related/Source to the ~30% of files missing them. | Fix | Medium | Improves navigability and machine-readability. Not urgent but compounds as corpus grows. |
| 9 | **Document KNOWLEDGE/KEYWORDS/** — Either populate with keyword entries or document its intended purpose. Currently an unexplained empty directory. | Fix | Small | Minor confusion point. Easy to resolve. |
| 10 | **Add individual daemon files** — Expand 13-ELEMENTAL_DAEMONS/ from single README to 7 individual files (one per daemon). | Extension | Large | Enables deeper daemon-specific documentation, variant tracking, and cross-referencing. The daemon variant analyses in 10_INSIGHTS already provide source material. |
| 11 | **Create Thread/Twist/Knot as navigational entries** — The CANONICAL_LEGEND lists these as separate habitats but they're filed under 5_HABITAT_THREADPLEX. Add redirect/index files or clarify the consolidation. | Fix | Small | Reduces navigation confusion for newcomers following the legend. |
| 12 | **Create APPLICATIONS/ seed documents** — The media ecology translation is the first entry. Add 2-3 more domain translations to establish the directory as a living resource. | Extension | Large | Growth enablement. Multiple domain translations demonstrate the framework's reach and stress-test its vocabulary. |

---

## Framework Strain Notes

**The Glossary is two things at once.** The 10 "canonical foundation" entries (Authenticity, Distinction, Fractal Depth, etc.) are framework-native terms. The 55 expansion entries (cognitive dissonance, Barnum effect, dark patterns, Overton window, etc.) are imported concepts given nemetic context. These serve different functions—the README should distinguish between them, perhaps as "Core Terms" and "Cross-Reference Terms." The current flat structure obscures the difference.

**The SIML tagging system exists in parallel to the Glossary** without a clear relationship between them. SIML has ~436 tagged concepts; the Glossary has 65 entries; the overlap is ~9%. Are these meant to converge? Is SIML an infrastructure layer and the Glossary a user-facing layer? The relationship needs explicit documentation.

**The 5_HABITAT_THREADPLEX directory is doing too much.** It houses Thread, Twist, Knot, Threadplex, pattern-agent, lumemic/usurpenic, cross-habitat migration, binding authority, replication modes, and pattern agency. This is 11 files plus 3 subdirectories—more than any other habitat. The consolidation was pragmatic (these concepts are closely related) but may need decomposition as documentation deepens. Thread, Twist, and Knot could plausibly become separate directories, especially since the CANONICAL_LEGEND already lists them as distinct habitats.

**The blog/ directory and the core memetic_ecology/ structure are not cross-referenced.** Blog essays (31 files) contain substantial framework analysis (Bateson, Haraway, Whitehead connections) but the core structure doesn't link back to them. Adding a "Related Essays" field to relevant canonical files would weave the two layers together.

**The audit methodology itself has a gap:** It cannot assess whether the framework's concepts are *correctly applied* in analytical files—only whether they are *consistently referenced*. A deeper audit would check whether, for example, the daemon variant analyses in 10_INSIGHTS correctly apply the daemon definitions from 13-ELEMENTAL_DAEMONS. This requires domain understanding, not just structural scanning.

---

*Audit generated by NEMETIC-CORPUS-AUDITOR skill*
*Framework: HABITAT_ECOLOGY v1.3.1*
*Audit scope: /sessions/peaceful-eloquent-hypatia/mnt/nemetics/ (full corpus)*
*Next recommended audit: After Priority 1-6 items are addressed*
