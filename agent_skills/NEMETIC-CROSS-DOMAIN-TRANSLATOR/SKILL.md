---
name: NEMETIC-CROSS-DOMAIN-TRANSLATOR
description: Translate Memetic Ecology frameworks into domain-specific applied analyses. Use this skill when the user wants to apply nemetic concepts (habitats, operators, threads, knots, threadplexes, bow-tie topology, world-states) to a specific domain such as education, healthcare, organizational design, media ecology, conflict mediation, technology governance, urban planning, therapy, parenting, or any other field. Also trigger when someone asks "what does X look like in Y context" where X is a nemetic concept and Y is any domain. Trigger on phrases like "apply this to," "how would this work in," "translate to," "map onto," or any request to make the framework concrete in a real-world context.
---

# NEMETIC Cross-Domain Translator

You are generating an applied analysis that maps the Memetic Ecology framework onto a specific domain. The goal is to make the framework's diagnostic power visible and usable for practitioners in that domain, while simultaneously stress-testing the framework against domain realities.

## Before You Begin

Read these canonical files to ground your translation. Do not rely on memory alone—the framework has precise definitions that drift when paraphrased:

1. `memetic_ecology/CANONICAL_LEGEND.md` — Master index, system locks, operator definitions
2. `memetic_ecology/habitats_quick_reference.md` — Full habitat stack with invariants and failure modes
3. `memetic_ecology/8_REGIMES/quick_reference.md` — Operator formalism
4. `memetic_ecology/11-BOW-TIE/README.md` — Bow-tie topology (compression/expansion under constraint)
5. `memetic_ecology/9_WORLD-STATES/co-sphere.md` — Co-SPHERE vs MemeGrid bifurcation

Also scan `blog/` for any existing essays that touch the target domain or adjacent ones.

## Translation Principles

The framework claims substrate-independence. Translation is where that claim gets tested. These principles keep the translation honest:

**Bidirectional mapping.** The framework illuminates the domain AND the domain illuminates the framework. If the mapping only goes one way, you're colonizing, not translating.

**Domain-native language first.** Start with how practitioners in this domain already talk about their work. Find the natural joints where nemetic vocabulary adds precision to something they already feel but lack words for. Do not replace their vocabulary—augment it.

**Preserve diagnostic stance.** Habitats describe where circulation occurs, not what is true. Operators describe how meaning changes, not what it should become. The translation must remain diagnostic, never prescriptive.

**Honor the ε.** Where the framework doesn't map cleanly onto domain realities, say so. These gaps are findings, not failures. They reveal where the framework needs extension or where the domain has features the framework hasn't accounted for.

**Respect system locks.** Threads must remain revisable. Knots must remain untie-able. Habitats must never be moralized. These constraints hold in every domain translation.

## Output Structure

Generate a markdown document with these sections:

### 1. Domain Orientation (~200 words)
Brief description of the domain as a meaning-circulation environment. What are the primary sensemaking activities? Who participates? What are the stakes? Write this in language a domain practitioner would recognize.

### 2. Habitat Mapping

For each relevant habitat (not all nine need apply—only map what genuinely fits):

```markdown
#### [Habitat Name] → [Domain Equivalent]

**What it looks like here:** [Concrete description in domain language]
**Operator dynamics:** [Which transformations are active, in plain terms]
**Invariant check:** [Does the framework invariant hold? How?]
**Failure mode in this domain:** [What does habitat failure look like here specifically?]
**Practitioner signal:** [What would a practitioner notice that indicates this habitat is active?]
```

### 3. Bow-Tie Deformation Diagnosis

Where in this domain is compression happening invisibly? What is being forgotten and presented as discovery? Where has the right funnel collapsed (only one expansion permitted)?

Describe 2-3 specific bow-tie deformations that practitioners would recognize, using concrete domain examples.

### 4. Thread/Knot/Threadplex Dynamics

What are the active threads in this domain (exploratory gradient paths)? What has knotted (locally stabilized)? What threadplexes exist (distributed ecologies of meaning)?

Focus on dynamics practitioners care about: What's hardening that shouldn't be? What's too fluid to act on? Where is binding happening without awareness?

### 5. World-State Tendency

Assess the domain's current tendency toward Co-SPHERE or MemeGrid. Use the specific diagnostic questions:

- Are alternative descent paths conceivable and discussable?
- Does dissonance invite re-threading or enforcement?
- Is recursive self-inspection permitted and protected?
- Is exit cost finite and survivable?

Be specific to the domain. Avoid abstract generalizations.

### 6. Diagnostic Questions for Practitioners

Generate 5-8 questions that a practitioner in this domain could ask themselves or their colleagues, derived from the framework but phrased entirely in domain-native language. These questions should reveal habitat dynamics, operator configurations, and world-state tendencies without requiring the practitioner to know any nemetic vocabulary.

### 7. Framework Feedback

What did this domain reveal about the framework itself? Where did the vocabulary feel precise? Where did it strain? What extensions or new terms might the domain demand?

This section is essential—it's how the framework metabolizes its own applications.

## Filing

Save output to: `memetic_ecology/APPLICATIONS/[domain_slug]_translation.md`

Create the APPLICATIONS/ directory if it doesn't exist.

Include frontmatter:
```markdown
**Domain:** [Name]
**Date:** [YYYY-MM-DD]
**Status:** Working translation
**Framework:** HABITAT_ECOLOGY v1.3.1 + IF-Prime
**Source:** Cross-domain translation skill
```

## Quality Checks

Before finishing, verify:
- [ ] Every mapped habitat includes its invariant and failure mode
- [ ] At least one bow-tie deformation is described with a concrete example
- [ ] World-state assessment uses the actual diagnostic criteria, not vibes
- [ ] Practitioner questions use zero nemetic jargon
- [ ] Framework Feedback section identifies at least one genuine strain or gap
- [ ] System locks are honored (no moralizing habitats, no reifying operators)
- [ ] The document would be useful to someone who has never heard of Memetic Ecology
