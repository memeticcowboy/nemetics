---
name: NEMETIC-GLOSSARY-GENERATOR
description: Generate properly formatted Memetic Ecology glossary entries that fit the canonical Glossary structure. Use this skill when the user wants to define a nemetic term, fill a glossary gap, create a new entry for the Glossary directory, or when a term surfaces in framework work that lacks a dedicated definition. Also trigger when someone asks "what does X mean in this framework," "define X," or "add X to the glossary." Works for core framework terms, emergent concepts, and terms from adjacent disciplines that need nemetic contextualization. Trigger on any mention of "glossary," "definition," "term," or requests to explain framework vocabulary systematically.
---

# NEMETIC Glossary Generator

You are generating a glossary entry for the Memetic Ecology framework's canonical Glossary. Each entry must be precise, cross-referenced, and consistent with the framework's diagnostic (non-prescriptive) stance.

## Before You Begin

Read these files to calibrate your entry against the existing corpus:

1. `Glossary/README.md` — Index, structure, canonical foundation description
2. `memetic_ecology/CANONICAL_LEGEND.md` — Master reference for operators, habitats, world-states
3. `memetic_ecology/habitats_quick_reference.md` — Habitat definitions and invariants

Then search the full corpus for every usage of the target term:
- Scan `memetic_ecology/` directories for appearances in canonical files
- Check `blog/` for contextual usage in essays
- Check `IF-PRIME/` for formal/mathematical usage
- Check `Glossary/` for related existing entries and cross-reference patterns

Understanding how the term is already being used across the corpus is essential. The glossary entry should crystallize existing usage, not invent new meaning.

## Entry Format

Follow the structure established in existing glossary entries. Read 2-3 existing entries in `Glossary/` to match tone and format before writing.

```markdown
# [Term]

**Status:** [Canonical / Working / Provisional]
**Layer:** [Which layer(s) this term primarily belongs to: Habitat, Regime, World-State, Structural, Grammar, Daemon, Cross-layer]
**Related:** [Comma-separated list of related terms with their glyphs where applicable]

---

## Definition

[2-4 sentences. Clear, precise, jargon-minimal where possible. The definition should be understandable to someone who has read the CANONICAL_LEGEND but nothing else.]

---

## Habitat Affinity

[Which habitat(s) does this term most naturally belong to? Why? If it crosses habitats, describe the crossing pattern.]

## Operator Relationship

[How does this term relate to the Φ(t) operator stack? Which operators does it engage, modify, or describe?]

## What It Is NOT

[2-3 common misreadings or confusions. What does this term get mistaken for? What adjacent concepts must it be distinguished from?]

## Failure Modes

[How does this concept go wrong? What happens when it's misapplied, over-extended, or reified?]

## Cross-References

[Links to related glossary entries and canonical documents. Use relative paths.]

- See also: [Term 1](relative/path)
- See also: [Term 2](relative/path)
- Canonical source: [Document](relative/path)

---

## Usage Examples

[2-3 brief examples showing how the term is used in framework context. Pull from actual corpus usage where possible.]

---

*Source: Glossary entry, [Date]*
*Framework: HABITAT_ECOLOGY v1.3.1*
```

## Writing Principles

**Crystallize, don't invent.** The glossary entry should capture how the term is already functioning in the corpus. If the term is genuinely new, note that explicitly and mark the entry as Provisional.

**Diagnostic, never prescriptive.** Definitions describe what something *does* or *how it functions*, not what it *should* mean or why it *matters*. Avoid evaluative language.

**Honor the ε.** If a term has irreducible ambiguity or productive tension in its meaning, preserve that. Don't resolve what the framework deliberately leaves open.

**Cross-reference generously.** The glossary's value increases with its interconnection. Every entry should point to at least 2-3 related entries and 1-2 canonical source documents.

**Match existing tone.** The glossary has an established voice—read existing entries before writing. It tends toward compressed clarity without being telegraphic.

## Handling Different Term Types

**Core framework terms** (habitats, operators, world-states): These have canonical definitions. The glossary entry should cite the canonical source and add navigational value—quick orientation, common confusions, cross-references. Don't redefine what's already canonically defined; point to the source and add access paths.

**Emergent terms** (concepts that surface in insights, blog posts, or conversation): These need careful handling. Mark as Provisional. Note where the term first appeared. Describe current usage patterns without prematurely stabilizing meaning.

**Imported terms** (concepts from external thinkers given nemetic context): Note the original source and thinker. Describe how the term functions *within* the Memetic Ecology framework specifically, noting divergence from its original usage.

**Compound terms** (e.g., "Ω-permeable," "soft global minimum"): Define the compound, then reference its component entries. The compound often does conceptual work that neither component does alone.

## Filing

Save output to: `Glossary/[FIRST_LETTER]/[term_slug].md`

Follow the existing alphabetical directory structure. If the directory for the first letter doesn't exist, create it.

If the term uses a symbol (glyph), file it in `Glossary/symbols/`.

## Gap Detection

When generating an entry, note any terms referenced in the definition or cross-references that don't yet have their own glossary entries. Output a brief list at the end:

```markdown
## Detected Gaps

The following terms are referenced but lack glossary entries:
- [Term 1] — used in [context]
- [Term 2] — used in [context]
```

This feeds the corpus integrity cycle.

## Quality Checks

Before finishing, verify:
- [ ] Definition is understandable with only CANONICAL_LEGEND as background
- [ ] Habitat affinity is specified
- [ ] Operator relationship is specified
- [ ] "What It Is NOT" prevents at least 2 common misreadings
- [ ] At least 2 cross-references to other glossary entries
- [ ] At least 1 cross-reference to a canonical source document
- [ ] No moralizing language (good/bad, should/must in evaluative sense)
- [ ] Status is correctly set (Canonical/Working/Provisional)
- [ ] Detected Gaps section is present
