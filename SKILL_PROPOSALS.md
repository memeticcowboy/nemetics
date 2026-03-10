# Skill Proposals for Nemetic Ecology Corpus Development

**Date:** 2026-03-10
**Purpose:** SKILL.md options for an agent generating knowledge that helps people understand the system, expanding the corpus, filling gaps, and extending framework applicability across domains.

---

## Corpus Assessment Summary

The current corpus is philosophically deep but operationally narrow. It has strong canonical definitions (habitats, operators, world-states, bow-tie topology, elemental daemons, IF-Prime formalism) and a growing blog archive connecting external thinkers to the framework. What it lacks: applied material that shows people *how to use this* outside the framework's own self-description, systematic gap-filling across the glossary and knowledge directories, and cross-domain translation that demonstrates the framework's reach.

The existing `link-bundle-entry-skill` handles bookmark ingestion. The proposals below cover what happens *after* material enters the system—how it gets metabolized into framework-native knowledge.

---

## Skill 1: Glossary Entry Generator

**Problem it solves:** The Glossary has 64 entries but significant gaps. Terms surface in canonical documents (e.g., "sensebreaking," "confabulation," "soft global minimum," "harmonic collapse") that don't yet have dedicated glossary entries. Writing each one manually is slow, and inconsistency creeps in.

**What the agent does:**
- Accepts a term (or detects one missing from the glossary during other work)
- Searches the full corpus for every usage of that term in context
- Generates a glossary entry following the established format: definition, habitat affinity, operator relationship, failure modes, philosophical anchors, cross-references
- Flags when a term touches multiple layers and needs disambiguation
- Outputs a properly placed .md file in the Glossary directory structure

**Why it matters for understanding:** The glossary is the entry point for newcomers. Every gap is a place where someone bounces off the framework. Systematic glossary completion makes the system self-explaining.

**Key design constraint:** Entries must be *diagnostic, not prescriptive*—matching the system's own non-moralizing principle. The skill must enforce this.

---

## Skill 2: Cross-Domain Translator

**Problem it solves:** The framework describes itself well but rarely shows what it looks like when applied to education, organizational design, public health, media ecology, conflict mediation, technology governance, or other domains. This limits who can see themselves in the work.

**What the agent does:**
- Accepts a domain (e.g., "K-12 education," "startup culture," "clinical therapy," "urban planning")
- Maps core framework elements onto domain-native language: What are the habitats here? Where are the threads, knots, threadplexes? What does MemeGrid look like in this context? Where is Ω being occluded?
- Produces a structured analysis document with:
  - Domain-specific habitat mapping
  - Operator dynamics in context (what χ, Q, Ψ, Z look like here)
  - Bow-tie deformation diagnosis (where is compression invisible?)
  - Co-SPHERE vs MemeGrid indicators specific to this domain
  - Practical diagnostic questions practitioners can ask
- Files output to a new `APPLICATIONS/` directory or blog post

**Why it matters for applicability:** This is the primary growth vector. The framework claims substrate-independence—this skill tests that claim by doing the translation work. Each domain application also stress-tests the framework and reveals where its vocabulary needs extension.

**Key design constraint:** Must not flatten the domain into framework jargon. The translation goes both ways—framework learns from domain as much as domain gets illuminated by framework.

---

## Skill 3: Insight Extractor

**Problem it solves:** The 10_INSIGHTS directory has a well-designed template and filing system but very few actual entries. Insights are supposed to emerge from reading, conversation, and framework navigation—but the extraction step is a bottleneck.

**What the agent does:**
- Accepts a source text (paper, article, conversation transcript, blog post, book chapter)
- Reads the source through the lens of the full Memetic Ecology stack
- Identifies recognitions: places where the source material resonates with, extends, contradicts, or creates productive friction with framework concepts
- Generates properly formatted Insight files following the template:
  - Source attribution
  - Habitat affinity
  - Pattern connection
  - The Recognition (what was seen)
  - Context Required (what must be understood first)
  - Potential Actions (what this might ask for)
  - Filing Notes (where it belongs, what categories it suggests)
- Sorts into by_habitat/, by_pattern/, or by_action_status/ as appropriate

**Why it matters for expanding the corpus:** Insights are the framework's metabolism—how it digests external material. Automating the structured extraction means more material gets properly metabolized instead of sitting as unprocessed input.

**Key design constraint:** Must preserve the principle that "structure reveals itself"—the skill proposes categories but flags when existing categories feel strained, suggesting emergent ones.

---

## Skill 4: Philosophical Bridge Builder

**Problem it solves:** The blog archive has 31 essays connecting external thinkers (Bateson, Haraway, Whitehead, Stiegler, Thompson, etc.) to the framework. But the coverage is uneven, and many natural interlocutors are missing: Simondon (individuation), Maturana & Varela (autopoiesis at depth), Deleuze (assemblage theory, fold), Peirce (semiotics), Luhmann (systems theory), Dewey (habit/inquiry), James (radical empiricism), Ingold (meshwork), Barad (intra-action).

**What the agent does:**
- Accepts a thinker or theoretical framework
- Researches their core concepts (using existing knowledge + web search if needed)
- Maps points of contact, productive friction, and genuine divergence with Memetic Ecology
- Produces a blog-format essay following the established pattern:
  - Opening orientation
  - Concept-by-concept mapping (not forced agreement—real friction preserved)
  - What the external framework illuminates about Memetic Ecology
  - What Memetic Ecology illuminates about the external framework
  - Residual tensions that don't resolve (the ε)
- Outputs to blog/ with proper dating and naming conventions

**Why it matters for understanding the system:** Each bridge essay reveals something about the framework by showing it alongside something it is *not*. The gaps between frameworks are as illuminating as the overlaps. This also builds intellectual credibility by engaging seriously with established traditions.

**Key design constraint:** Must resist the temptation to subsume other frameworks. The essay should preserve genuine alterity (Other-Sphere principle applied to intellectual engagement).

---

## Skill 5: Diagnostic Case Study Generator

**Problem it solves:** No applied diagnostic examples exist in the corpus. Someone reading about "twist diagnostics" or "bifurcation diagnostics" has no worked examples showing the framework in action on a concrete situation.

**What the agent does:**
- Accepts a scenario description (a conflict, organizational pattern, cultural phenomenon, personal dilemma, policy situation)
- Runs the scenario through the full diagnostic stack:
  1. Habitat identification: Where is meaning circulating?
  2. Operator dynamics: Which transformations are active? What's the current Φ(t) configuration?
  3. Thread/Twist/Knot assessment: What's binding? What's still exploratory?
  4. Bow-tie analysis: Where is compression happening? What's being forgotten?
  5. Lumemic/Usurpenic assessment: Is this pattern enhancing or extracting capacity?
  6. World-state tendency: Is this moving toward Co-SPHERE or MemeGrid?
  7. Daemon perspective: What would each elemental daemon notice?
- Produces a structured diagnostic document with both the analysis and *the reasoning trail* (showing how the framework was applied, not just conclusions)
- Files to a new `CASE_STUDIES/` directory or under 10_INSIGHTS

**Why it matters for understanding:** People learn frameworks by watching them work on familiar material. Case studies are the bridge between abstract architecture and practical perception. They also reveal where the framework's diagnostic vocabulary is insufficient.

**Key design constraint:** Diagnostics must remain *descriptive, not prescriptive*. The output says "here is what the framework notices" not "here is what you should do." The system lock against moralizing habitats must hold.

---

## Skill 6: Corpus Integrity Auditor

**Problem it solves:** As the corpus grows, internal consistency degrades. Terms get used differently across documents. Cross-references break. New canonical files may contradict earlier ones. The KNOWLEDGE/KEYWORDS directory is empty. Some directories have READMEs pointing to content that doesn't exist yet.

**What the agent does:**
- Scans the full corpus directory structure
- Identifies: orphaned references (terms used but not defined), empty directories, broken cross-references, inconsistent term usage, undocumented concepts that appear in multiple files
- Checks canonical documents against each other for contradictions or drift
- Produces an audit report with:
  - Gap inventory (what's missing, prioritized by frequency of reference)
  - Consistency issues (where the same term means different things)
  - Structural suggestions (directories that need content, files that need updating)
  - A ranked work queue of the highest-value additions
- Optionally populates KNOWLEDGE/KEYWORDS with extracted keyword entries

**Why it matters for corpus health:** This is the framework's own metabolism applied to itself. A system that describes ecological health should maintain its own. The auditor keeps the corpus from hardening into a MemeGrid of its own.

**Key design constraint:** Must flag issues without auto-correcting them. Human judgment decides what to reconcile and what to leave in productive tension.

---

## Skill 7: IF-Prime Formalism Bridge

**Problem it solves:** IF-Prime (the mathematical layer) and Memetic Ecology (the applied/diagnostic layer) share vocabulary but the formal connections are underspecified. The IF-Prime grammar document (v0.7) is rich but its relationship to specific habitat dynamics is implicit. Many canonical habitat files reference operators without showing the full formal expression.

**What the agent does:**
- Accepts a concept from either layer
- If starting from ecology: generates the formal IF-Prime expression with operator notation, showing how the concept maps to Φ(t) composition, what ε conditions apply, and where it sits in the bow-tie topology
- If starting from formalism: generates the ecological/experiential description showing what the formal expression *feels like* in each habitat
- Produces a bridge document linking both representations
- Files to IF-PRIME/integration/ directory

**Why it matters for understanding:** The two layers need each other. Without formalism, ecology stays intuitive but imprecise. Without ecology, formalism stays precise but experientially dead. The bridge skill builds the connective tissue.

**Key design constraint:** Must preserve ε—the bridge should show where formal and experiential descriptions *don't quite match*, not paper over the gap.

---

## Priority Ranking

| Priority | Skill | Rationale |
|----------|-------|-----------|
| 1 | **Cross-Domain Translator** | Highest value for expanding applicability and audience |
| 2 | **Diagnostic Case Study Generator** | Most needed for people trying to *use* the framework |
| 3 | **Glossary Entry Generator** | Fills the most visible gaps for newcomers |
| 4 | **Insight Extractor** | Accelerates the framework's natural metabolism |
| 5 | **Philosophical Bridge Builder** | Extends intellectual context and credibility |
| 6 | **Corpus Integrity Auditor** | Maintains health as corpus grows |
| 7 | **IF-Prime Formalism Bridge** | Deepens internal coherence for advanced users |

---

## Implementation Notes

Each of these skills requires deep familiarity with the corpus. The SKILL.md files should include:
- Explicit references to canonical documents (CANONICAL_LEGEND.md, habitats_quick_reference.md, quick references for regimes and world-states)
- The system locks as constraints (threads must remain revisable, habitats must never be moralized, etc.)
- The Insight template format for any skill that produces insights as a side effect
- Instructions to read the relevant canonical files *before* generating output, not just to rely on training data

Any skill that produces new corpus files should follow existing naming conventions and include proper frontmatter (Status, Layer, Related, Source, Framework version).

---

*Generated from corpus review, 2026-03-10*
*Framework: HABITAT_ECOLOGY v1.3.1 + IF-Prime*
