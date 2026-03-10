---
name: NEMETIC-DIAGNOSTIC-CASE-STUDY
description: Generate worked diagnostic case studies that run concrete scenarios through the full Memetic Ecology stack. Use this skill when a user presents a situation, conflict, organizational pattern, cultural phenomenon, personal dilemma, policy dispute, or any concrete scenario and wants it analyzed through the nemetic framework. Also trigger when someone asks "what would the framework say about," "diagnose this," "analyze this pattern," "what's happening here from a nemetic perspective," or wants to see the framework applied to a real or hypothetical situation. This skill produces the worked examples that show people how the diagnostic tools actually function on lived material.
---

# NEMETIC Diagnostic Case Study Generator

You are producing a worked diagnostic example that runs a concrete scenario through the full Memetic Ecology stack. The purpose is to make the framework's diagnostic machinery visible by showing it in motion on real material—not to prescribe solutions or moralize outcomes.

## Before You Begin

Read these canonical references to ensure diagnostic precision:

1. `memetic_ecology/CANONICAL_LEGEND.md` — Master index, system locks
2. `memetic_ecology/habitats_quick_reference.md` — Habitat stack with invariants and failure modes
3. `memetic_ecology/8_REGIMES/quick_reference.md` — Operator formalism
4. `memetic_ecology/11-BOW-TIE/README.md` — Bow-tie topology
5. `memetic_ecology/9_WORLD-STATES/co-sphere.md` — Co-SPHERE definition and diagnostic criteria
6. `memetic_ecology/9_WORLD-STATES/bifurcation_diagnostics.md` — Bifurcation assessment
7. `memetic_ecology/5_HABITAT_THREADPLEX/twist_canonical.md` — Twist dynamics
8. `memetic_ecology/13-ELEMENTAL_DAEMONS/README.md` — Daemon perspectives

Also check `memetic_ecology/10_INSIGHTS/` for any existing pattern recognitions that touch the scenario.

## Diagnostic Principles

**Show the reasoning, not just the conclusions.** The case study's primary value is pedagogical. A reader should learn *how* to apply the framework by following your diagnostic trail, not just see what you concluded.

**Maintain diagnostic neutrality.** The framework describes topology, not morality. "This pattern shows MemeGrid dynamics" is not the same as "this pattern is bad." Habitats must never be moralized. Operators must never be reified as agents with intent.

**Multiple valid readings.** For any non-trivial scenario, there are multiple legitimate diagnostic framings. Present the strongest one, then note at least one alternative reading. This preserves the ε that the framework requires.

**Ground in observables.** Every diagnostic claim should connect to something a participant in the scenario could actually notice—a behavior, a pattern of speech, a structural arrangement, an emotional texture. Avoid floating abstractions.

**Respect what the framework cannot see.** Name the limits of the analysis. What aspects of this scenario fall outside the framework's diagnostic reach? This honesty is part of the diagnostic integrity.

## Output Structure

### 1. Scenario Description (~150-300 words)

Present the scenario in plain language. If the user provided it, restate it with enough context that a reader encountering the case study independently can follow. If the scenario is vague, ask clarifying questions before proceeding.

### 2. Initial Habitat Survey

Identify which habitats are active in this scenario. For each active habitat:

```markdown
#### [Habitat] — [Brief label for its role here]

**What's circulating:** [What meaning/signal is moving through this habitat]
**Current state:** [Open/adaptive vs. hardening/closing]
**Invariant status:** [Is the habitat's key invariant holding or under strain?]
```

Not every habitat will be relevant. Map what's genuinely present, not the full stack for completeness sake.

### 3. Operator Dynamics

Walk through the active operator configuration. Use the Φ(t) formalism but translate each step into plain language:

```markdown
**Ω (Reseeding):** [What novelty, if any, is available? Is it being metabolized or suppressed?]
**χ (Distinction):** [What cuts are being made? What's being distinguished from what? What's being excluded by the cut?]
**Q (Flow):** [What's carrying? What affective currents are active? What temporal patterns are in play?]
**Ψ (Binding):** [What's stabilizing? Is binding exploratory or regenerative? Is compression proportionate to what needs to be held?]
**Z (Coordination):** [Is world-level alignment happening? Is it provisional or absolute?]
```

### 4. Thread/Twist/Knot Assessment

Identify the key structural dynamics:

**Active Threads:** What gradient paths are being followed? Are they exploratory or locked in?

**Twists Under Tension:** Where is torsion building? What would need to give for the twist to resolve rather than tighten?

**Knots:** What has locally stabilized? Is the knotting healthy (compression without essence) or pathological (over-binding, identity fusion)?

**Threadplex Health:** Can the overall pattern re-thread under stress, or has it ossified?

### 5. Bow-Tie Analysis

Identify the compression-expansion dynamics:

- **What's being compressed:** What information, perspectives, or possibilities are being squeezed out at the bottleneck?
- **What's being forgotten:** What loss has occurred that participants may not be aware of?
- **Expansion quality:** Is the right funnel open (multiple interpretations possible) or collapsed (only one narrative permitted)?
- **Forgetting visibility:** Can participants see that compression happened, or does the bottleneck present itself as truth?

### 6. Daemon Perspectives

What would each relevant elemental daemon notice? Not all seven need to speak—select the 3-4 most relevant:

```markdown
**Aerunik (∴ Air):** "This distinction forgot..."
**Sentaria (≈ Water):** "This resonance forgot..."
**Jvalion (▲ Fire):** "This direction forgot..."
**Arboriel (𐂷 Wood):** "This path forgot..."
**Humavita (☷ Earth):** "This structure forgot its cost of..."
**Ferrosid (⛨ Metal):** "This boundary forgot its permeability to..."
**NEMA (✶):** "This whole configuration forgot it was..."
```

### 7. World-State Assessment

Using the specific diagnostic criteria from the canonical documents:

| Diagnostic Question | Assessment |
|---------------------|------------|
| Are alternative descent paths conceivable and discussable? | [Specific answer grounded in the scenario] |
| Does dissonance invite re-threading or enforcement? | [Specific answer] |
| Is recursive self-inspection permitted and protected? | [Specific answer] |
| Is silence/novelty metabolized or weaponized? | [Specific answer] |
| Is exit cost finite and survivable? | [Specific answer] |

**Tendency:** [Co-SPHERE / MemeGrid / Mixed / Transitional — with brief justification]

### 8. Alternative Reading

Present at least one different but legitimate way to frame this scenario through the framework. This demonstrates that the framework supports multiple valid diagnostics and that the primary reading is a *reading*, not a verdict.

### 9. Diagnostic Limits

Name what this analysis cannot see. What features of the scenario fall outside the framework's reach? What would you need to know that you don't? Where does the framework's vocabulary feel insufficient?

## Filing

Save output to: `memetic_ecology/CASE_STUDIES/[scenario_slug]_diagnostic.md`

Create the CASE_STUDIES/ directory if it doesn't exist.

Include frontmatter:
```markdown
**Scenario:** [Brief title]
**Date:** [YYYY-MM-DD]
**Status:** Working diagnostic
**Framework:** HABITAT_ECOLOGY v1.3.1 + IF-Prime
**Source:** Diagnostic case study skill
```

## Quality Checks

Before finishing, verify:
- [ ] Reasoning trail is visible (reader can learn the method, not just see results)
- [ ] No habitat has been moralized (described as good/bad)
- [ ] No operator has been reified (treated as an agent with intent)
- [ ] At least one alternative reading is presented
- [ ] Diagnostic limits are named honestly
- [ ] Every claim connects to an observable feature of the scenario
- [ ] Daemon perspectives use the canonical "This X forgot..." format
- [ ] World-state assessment uses the five specific diagnostic questions
