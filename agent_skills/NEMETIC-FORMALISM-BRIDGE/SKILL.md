---
name: NEMETIC-FORMALISM-BRIDGE
description: Translate between IF-Prime formal/mathematical expressions and Memetic Ecology experiential/diagnostic descriptions. Use this skill when the user wants to formalize an ecological concept into operator notation, or wants to understand what a formal expression feels like experientially, or wants to build connective tissue between the two layers. Trigger on requests like "formalize this," "what's the operator expression for," "what does Φ(t) mean here," "translate to IF-Prime," "what does this formula feel like," or any work that bridges the mathematical and experiential layers of the framework. Also trigger when someone is working with operator notation and needs to ground it in habitat dynamics, or working with habitat descriptions and wants formal precision.
---

# NEMETIC IF-Prime Formalism Bridge

You are building connective tissue between IF-Prime (the formal/mathematical layer) and Memetic Ecology (the applied/diagnostic layer). These two layers share vocabulary and operator notation but the mapping between formal expressions and lived experience is underspecified. Your job is to make the connection explicit in both directions while preserving the irreducible gap (ε) between formalism and experience.

## Before You Begin

Read these files to ground both sides:

**Formal layer:**
1. `IF-PRIME/README.md` — IF-Prime foundations, operator definitions
2. `IF-PRIME/grammar/integrated_working_document_v0.7.md` — Grammar, elemental channels, verb cycles
3. `IF-PRIME/theory/glossary.md` — Formal terminology
4. `memetic_ecology/8_REGIMES/phi_t_formalism.md` — Φ(t) operator composition

**Ecological layer:**
5. `memetic_ecology/CANONICAL_LEGEND.md` — Master index
6. `memetic_ecology/habitats_quick_reference.md` — Habitat stack
7. `memetic_ecology/11-BOW-TIE/README.md` — Bow-tie as structural inevitability
8. `memetic_ecology/5_HABITAT_THREADPLEX/threadplex.md` — Threadplex dynamics
9. `memetic_ecology/8_REGIMES/omega_chi_Q_Psi_Z.md` — Detailed operator descriptions

Also check `IF-PRIME/integration/` for existing bridge documents (if any).

## Bridge Directions

This skill works in two directions. Determine which direction the user needs:

### Direction A: Ecology → Formalism

The user has an ecological/experiential concept and wants its formal IF-Prime expression.

**Process:**
1. Identify the concept precisely in ecological terms (which habitat, what dynamics, what participants)
2. Determine which operators are active and in what configuration
3. Write the formal Φ(t) expression showing the operator composition
4. Specify boundary conditions: What ε conditions apply? What constraints shape the expression?
5. Show where the concept sits in the bow-tie topology
6. Note what the formalism captures and what it necessarily loses (the experiential remainder)

### Direction B: Formalism → Ecology

The user has a formal expression or operator configuration and wants to know what it feels like experientially.

**Process:**
1. Parse the formal expression into its operator components
2. For each operator, describe its experiential manifestation in specific habitats
3. Walk through the composition step by step: What happens at each operator transition? What does each transformation feel like from inside a habitat?
4. Generate concrete scenarios or vignettes that instantiate the formal expression
5. Note what the experiential description adds and what the formalism preserves that experience doesn't (structural invariants invisible from inside)

## Output Structure

### Bridge Document

```markdown
# Formalism Bridge: [Concept/Expression Name]

**Direction:** [Ecology → Formalism / Formalism → Ecology / Bidirectional]
**Date:** [YYYY-MM-DD]
**Status:** Working bridge
**Framework:** HABITAT_ECOLOGY v1.3.1 + IF-Prime v0.1

---

## The Ecological Description

[Plain-language description of the concept as it appears in the habitat/diagnostic layer. What does it look like? What does it feel like from inside? How would a participant describe it?]

## The Formal Expression

[IF-Prime operator notation. Full Φ(t) expression if applicable. Include operator composition, boundary conditions, and ε specification.]

```
[Formal expression in code block for clarity]
```

## The Translation

### Operator-by-Operator Walkthrough

For each operator in the expression:

**[Operator Symbol] — [Operator Name]**
- **Formal role:** [What the operator does mathematically]
- **Ecological manifestation:** [What this looks like in habitat terms]
- **Experiential texture:** [What it feels like from inside]
- **Where visible:** [Which habitat(s) this operator's action is most apparent]

### Composition Dynamics

[How the operators interact when composed. What emergent properties arise from the composition that aren't visible in individual operators? What does the ∘ (composition) operation itself mean experientially?]

### Bow-Tie Position

[Where does this concept/expression sit in the bow-tie topology? Is it part of compression, the bottleneck, or expansion? How does its formal structure relate to the information-loss dynamics of the bow-tie?]

## The Gap (ε)

[What the formalism captures that experience doesn't show (structural invariants, symmetries, conservation properties). What experience contains that the formalism can't express (qualia, affect, situatedness, temporal texture). This section is essential—it preserves the irreducible difference between the two layers.]

## Lumemic/Usurpenic Assessment

[If applicable: Does this concept/expression have a characteristic directionality? Does it tend to enhance substrate capacity (lumemic) or extract/degrade it (usurpenic)? Or is it directionality-neutral (a structural feature rather than a force)?]

## Cross-References

- Ecological source: [path to relevant habitat/ecology files]
- Formal source: [path to relevant IF-Prime files]
- Related bridges: [paths to other bridge documents if they exist]
- Glossary entries: [relevant terms]
```

## Special Cases

### Elemental Channel Mapping

When the bridge involves elemental daemons or grammar channels (Air/Water/Fire/Wood/Earth/Metal/✶), include an additional section:

```markdown
## Elemental Channel Expression

| Channel | Formal Contribution | Experiential Quality | Grammar Signature |
|---------|--------------------|--------------------|------------------|
| [Element] | [How this channel appears in the formal expression] | [What it feels like] | [Syntactic mode from IF-Prime Grammar] |
```

### Novel Expressions

When the user is exploring a combination not yet documented in the corpus, mark the output clearly:

```markdown
**⚠️ Novel Expression:** This operator configuration does not appear in existing canonical documents. The following bridge is exploratory and may require canonical review.
```

### Contradictions Between Layers

If the formal expression implies something that the ecological description contradicts (or vice versa), do not resolve the contradiction. Document it:

```markdown
## Layer Tension Detected

**Formal implication:** [What the math says should happen]
**Ecological observation:** [What actually appears in habitat terms]
**Possible explanations:** [Why these might diverge]
**Status:** [Unresolved — requires further investigation]
```

These tensions are among the most valuable outputs of bridge work.

## Filing

Save output to: `IF-PRIME/integration/bridge_[concept_slug].md`

Create the integration/ directory if it doesn't exist.

## Bridge Principles

**Neither layer is primary.** The formal layer is not "more real" than the ecological layer. The ecological layer is not "more true" than the formal layer. They are two descriptions of the same dynamics, each capturing what the other misses.

**Preserve the ε between layers.** The gap between formalism and experience is not a bug—it's a fundamental feature. Complete translation would mean one layer is redundant. The bridge exists because the gap exists.

**Compositionality matters.** Show how operators compose, not just what individual operators do. The ∘ (composition) operation is where much of the meaning lives. What does it mean for Q to act on χ's output? What does Ψ do to Q's temporal flow? These questions are the bridge's core work.

**Ground in examples.** Abstract bridge documents are less useful than ones with concrete scenarios. When possible, include a brief vignette or scenario that makes the formal expression tangible.

**Watch for reification.** Operators are functions, not agents. The bridge should never describe an operator as "wanting" or "deciding." Formalism describes how meaning changes, not who is changing it.

## Quality Checks

Before finishing, verify:
- [ ] Both directions are represented (even if one is primary)
- [ ] Operator-by-operator walkthrough is complete
- [ ] The Gap (ε) section is substantive, not perfunctory
- [ ] No operator has been reified as an agent
- [ ] Composition dynamics are described (not just individual operators)
- [ ] Bow-tie position is specified
- [ ] At least one concrete example or vignette is included
- [ ] Cross-references to both layers are provided
- [ ] Novel expressions are flagged if applicable
- [ ] Layer tensions are documented rather than resolved
