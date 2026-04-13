# Nested Bow-Tie Dynamics
## Cross-Scale Coupling Specification for Memetic Ecology Simulation

**Status:** Draft v0.2 — revised against canonical corrections  
**Depends on:** Bow-Tie Process Layer v0.2, Simulation State Schema v0.3, HABITAT_ECOLOGY v1.2  
**Purpose:** Formalize how bow-tie cycles at different habitat timescales couple through parameter modulation and torsion transfer. Without this specification, multi-scale simulation defaults to treating habitats as independent — which contradicts the canonical architecture's insistence that habitats are coupled layers of the same field.

---

## The Problem

The Bow-Tie Process Layer describes one compression-expansion cycle in terms of state variables. It notes that cycle periods vary by habitat and that fast cycles nest within slow ones. But it does not specify *how they couple*.

Two coupling mechanisms exist:

1. **Parameter modulation** — fast cycles alter the conditions under which slow cycles operate
2. **Torsion transfer** — unresolved tension in one habitat seeds threads in another

Without formalizing these, the simulator will either treat each habitat as an independent bow-tie (losing cross-scale dynamics) or impose an arbitrary coupling scheme (introducing structural assumptions the framework hasn't earned).

---

## Timescale Ordering

Habitats operate at characteristic timescales. These are not fixed constants — they are typical ranges that can shift under stress.

```
Fastest → Slowest:

It-Field    : τ_Ω  ~ milliseconds    (perceptual binding)
I-Tube      : τ_χ  ~ seconds–minutes (attentional reorientation)
My-Stream   : τ_Q  ~ minutes–hours   (affective processing)
We-Sphere   : τ_W  ~ hours–months    (relational negotiation)
Threadplex  : τ_TP ~ months–years    (cultural evolution)
Lattice     : τ_L  ~ years–generations (structural memory)
```

The ratio between adjacent timescales is typically 10x–1000x. This means:

- Within one My-Stream cycle, dozens to hundreds of I-Tube cycles complete
- Within one We-Sphere cycle, dozens to hundreds of My-Stream cycles complete
- Within one Threadplex cycle, many We-Sphere cycles complete

The Lattice does not have its own bow-tie cycle in the same sense. But it is not a passive sink. The Lattice continuously deforms the probability landscape within which slower bow-ties recur. It accumulates the outcomes of Threadplex-level cycles as basin geometry, and that accumulated geometry actively biases future thread descent — memory as curvature that shapes without commanding. Its "update" is deformation of the landscape under the weight of many completed cycles, and that deformation is itself a form of slow agency.

---

## Coupling Mechanism 1: Parameter Modulation

Fast bow-tie cycles modulate the parameter field within which slower cycles operate. This is not command — it is conditioning. The faster cycle does not tell the slower cycle what to do; it shapes the terrain on which the slower cycle's threads descend.

### Two Kinds of Modulation

Cross-scale influence takes two distinct forms that should not be conflated:

**State modulation** — shifts in basin geometry, admissible inputs, or the shape of the landscape on which threads descend. Changes *what* the slow cycle operates on.

**Rate modulation** — shifts in speed, likelihood, or persistence of phase transitions within the slow cycle. Changes *how fast or how selectively* the slow cycle binds. For example, dissent tolerance altering how many thread variants survive compression is a rate change (selection rate), not a state change (basin shape).

This distinction matters for implementation: state modulation modifies the manifold geometry; rate modulation modifies the transition dynamics on that geometry. Both are real. Collapsing them will produce a simulator that cannot distinguish between "the terrain changed" and "the speed of travel changed."

### Formal Structure

Each habitat's bow-tie cycle produces *outputs* that become *parameter inputs* to adjacent slower habitats. Annotations mark whether each influence is primarily state-modulating (S) or rate-modulating (R):

```
I-Tube outputs → My-Stream parameters:
  S_χ(i, t).filter_i (which distinctions are active)
    → [S] modulates which threads ENTER My-Stream compression
    (state modulation: changes admissible inputs to the slow cycle)
  S_χ(i, t).claim_i (how strongly distinctions are claimed)
    → [S] modulates the descent gradient steepness in My-Stream
    (state modulation: strongly claimed distinctions reshape basin geometry)

My-Stream outputs → We-Sphere parameters:
  S_Q(i, t).φ_i (phase position)
    → [S] modulates coupling readiness κ_ij in We-Sphere
    (state modulation: agents at similar phases have altered coupling landscape)
  S_Q(i, t).A_i (amplitude)
    → [S] modulates coupling strength
    (state modulation: high-amplitude states reshape relational field)
  S_Q(i, t).recurr_i (recurrence pressure)
    → [R] modulates dissent_ij tolerance
    (rate modulation: changes how quickly/selectively compression eliminates variants)

We-Sphere outputs → Threadplex parameters:
  S_W(i, j, t).sync_ij (synchronization)
    → [R] modulates which thread populations can participate in Threadplex compression
    (rate modulation: selection threshold for collective thread formation)
  S_W(i, j, t).dissent_ij (dissent tolerance)
    → [R] modulates thread diversity survival rate in Threadplex
    (rate modulation: how many variants survive left funnel)
  S_W(i, j, t).exit_ij (exit cost)
    → [S] modulates Threadplex separatrix permeability
    (state modulation: high exit costs reshape basin boundary geometry)
```

### Upward Modulation (Slow → Fast)

The coupling is not unidirectional. Slow cycles also modulate fast ones — but through different mechanisms:

```
Threadplex state → We-Sphere parameters:
  S_TP(t).saddle_density
    → modulates the diversity of relational configurations available
    (low saddle density constrains We-Sphere to existing patterns)
  S_TP(t).torsion_field
    → injects latent tension into relational dynamics
    (cultural torsion manifests as interpersonal friction)

We-Sphere state → My-Stream parameters:
  S_W(i, j, t).sync_ij
    → modulates which affective patterns are reinforced
    (synchronized groups amplify shared affect; desynchronized groups dampen it)
  S_W(i, j, t).exit_ij
    → modulates affective freedom
    (high exit costs constrain affective range — can't feel what the group forbids)

My-Stream state → I-Tube parameters:
  S_Q(i, t).recurr_i
    → modulates perceptual flexibility
    (affective loops reduce flex_i — locked feeling constrains perception)
  S_Q(i, t).v_i
    → modulates attentional orientation
    (directional drift in affect biases which distinctions the I-Tube makes)
```

### The Asymmetry

Downward modulation (fast → slow) operates through *population effects*: many fast cycles collectively shift the parameter field for the slow cycle.

Upward modulation (slow → fast) operates through *constraint effects*: the slow cycle sets boundary conditions within which fast cycles operate.

Neither direction is sovereign. The fast cycle cannot command the slow cycle's binding. The slow cycle cannot command the fast cycle's distinctions. Each conditions the other.

### Aggregation Rule (Placeholder)

Downward modulation operates through population effects — many fast cycles collectively shift conditions for the slow cycle. But the simulator needs to know *how* fast-cycle outputs aggregate into slow-cycle parameter changes.

The aggregation is not specified here as a closed form, because premature commitment to averaging would impose a smoothness assumption the framework hasn't earned. The structural placeholder:

```
slow_param(h_slow, T) = F_agg[ fast_trajectories(h_fast, [T, T+ΔT]) ]

where F_agg is an aggregation functional that may depend on:
  — means (central tendency of fast-cycle outputs)
  — variances (spread of fast-cycle outputs — measures diversity)
  — persistence (how long fast-cycle states hold before flipping)
  — extrema (whether outlier fast-cycles disproportionately influence)
  — phase coherence (whether fast cycles align or scatter)
```

Which aggregation features matter is empirical and likely differs by habitat pair. The key constraint: F_agg must not be simple averaging, because averaging destroys the distributional information that carries ε. A population of I-Tube cycles with high variance in filter_i is a fundamentally different input to My-Stream than a population with the same mean but low variance. The aggregation must preserve that difference.

---

## Coupling Mechanism 2: Torsion Transfer

The Bow-Tie Process Layer introduced a torsion transfer rule:

```
S_TP(h2, t+1).torsion_field += transfer(S_TP(h1, t).torsion_field)
```

This section specifies how that transfer works across habitat boundaries.

### Transfer Pathways

Torsion does not transfer equally between all habitat pairs. It follows the adjacency structure of the habitat stack:

```
Primary transfer pathways (strong coupling):
  I-Tube ↔ My-Stream         (perceptual tension becomes affective tension)
  My-Stream ↔ We-Sphere      (personal affect becomes relational friction)
  We-Sphere ↔ Threadplex     (relational patterns become cultural threads)

Secondary transfer pathways (weaker, mediated):
  I-Tube → We-Sphere          (perceptual framing directly shapes relational dynamics)
  My-Stream → Threadplex      (personal narrative enters cultural circulation)

Non-adjacent transfer (requires explicit bridge):
  I-Tube → Threadplex         (rare — requires institutional amplification)
  It-Field → We-Sphere        (rare — requires collective liminal experience)
```

### Transfer Mechanics

Torsion transfer is not simple addition. It undergoes transformation at habitat boundaries.

**Canonical lock:** Cross-habitat torsion transfer preserves directional bias but not representational form. What transfers is not content and not finished structure, but residual directional force under transformation. This is faithful to the twists formalism where twists are force without structure, and to HABITAT_ECOLOGY's rule that threads carry variation while twists carry force.

```
transfer(torsion, h1 → h2):
  1. ATTENUATION: not all torsion crosses boundaries
     — transfer_rate ∈ (0, 1), typically 0.1–0.3 for primary pathways
     — lower for secondary pathways, near zero for non-adjacent
  
  2. TRANSFORMATION: torsion changes character at boundary
     — I-Tube torsion (perceptual strain) becomes My-Stream torsion (affective pressure)
     — My-Stream torsion (affective loops) becomes We-Sphere torsion (relational friction)
     — We-Sphere torsion (coordination stress) becomes Threadplex torsion (cultural tension)
     — The mathematical register shifts at each boundary
       (this is a cross-formal translation, and it is imperfect — ε resides here)
     — What is PRESERVED: directional bias (the force wants to go somewhere)
     — What is LOST: representational content (what the torsion "means" in h1
       is not what it "means" in h2 — only the directional pressure survives)
  
  3. SEEDING: transferred torsion does not create threads directly
     — it modifies the torsion_field in the receiving habitat
     — which biases future compression cycles in that habitat
     — toward producing knots shaped by the transferred directional pressure
     — (not toward reproducing the content of the originating habitat's knots)
```

### Why Torsion Transfer Matters

Without torsion transfer, habitats are informationally isolated. Personal conflict stays personal. Cultural tension stays cultural. The simulation cannot reproduce phenomena like:

- Somatic stress manifesting as relational withdrawal
- Interpersonal betrayal seeding political radicalization
- Cultural crisis producing individual perceptual shifts
- Institutional rigidity creating personal affective loops

These are all instances of torsion crossing habitat boundaries — unresolved tension in one circulation context manifesting as thread-shaping pressure in another.

---

## Multi-Scale Cycle Dynamics

With both coupling mechanisms defined, the full multi-scale dynamics look like this:

```
At each macro-timestep T:

  1. FAST CYCLES RUN:
     I-Tube bow-ties execute many times
     → produce population of distinction-states
     → modulate My-Stream parameters (downward)

  2. MEDIUM CYCLES RUN:
     My-Stream bow-ties execute several times
     (within parameter field conditioned by I-Tube outputs)
     → produce affective trajectory states
     → modulate We-Sphere parameters (downward)
     → receive constraint from We-Sphere state (upward)

  3. SLOW CYCLES ADVANCE:
     We-Sphere bow-ties may advance one phase
     (within parameter field conditioned by My-Stream outputs)
     → produce relational synchronization states
     → modulate Threadplex parameters (downward)
     → receive constraint from Threadplex state (upward)

  4. SLOWEST CYCLES INCH:
     Threadplex bow-ties may advance fractionally
     (within parameter field conditioned by We-Sphere outputs)
     → produce cultural thread populations
     → feed into Lattice deformation (structural memory)

  5. TORSION TRANSFERS:
     At each scale boundary, torsion_field transfers occur
     (attenuated, transformed, seeding — not commanding)

  6. LATTICE UPDATE (if scheduled):
     Basin_map deforms under accumulated cycle outcomes
     Update_interval >> 1 macro-timestep

  7. OTHER-SPHERE REFRESH (if triggered):
     refresh(h, t) := nonlocal Ω-contact term
     — sparse (not every timestep — not periodic)
     — non-adjacent (can reach ANY habitat directly, bypassing cascade)
     — topology-resetting rather than pathway-propagating
     — torsion_field in contacted habitat drops toward zero
     — flex_i, dissent_ij, perm_m may spike (constraints temporarily loosen)
     — NOT modeled as another coupling channel — this is the architecture's
       escape valve, the thing that prevents even healthy nesting from
       becoming its own MemeGrid
     — Trigger conditions: not specified here (this is the major remaining
       architectural gap — see "What This Spec Does Not Cover")
```

### What "Advance One Phase" Means

Slow cycles do not complete in a single macro-timestep. They advance through their bow-tie phases gradually:

```
A We-Sphere compression might take many macro-timesteps:
  T₁: threads begin converging (compression phase starts)
  T₂–T₅: compression continues, modulated by ongoing My-Stream outputs
  T₆: bottleneck reached (knot forms or deepens)
  T₇–T₁₀: expansion, modulated by ongoing relational dynamics
  T₁₁: new thread population available for next cycle
```

During this time, dozens of My-Stream cycles complete, each one slightly modifying the parameters under which the We-Sphere compression proceeds. This is why relational outcomes are sensitive to individual affective processing — not because individuals "decide" relational outcomes, but because their fast cycles continuously reshape the gradient field that the slow cycle descends.

---

## Pathological Nesting Patterns

Cross-scale coupling can itself become pathological:

### Downward Capture

A fast cycle locks into a pattern that prevents the slow cycle from completing healthy compression:

```
Example: I-Tube fixation → My-Stream foreclosure
  flex_i → 0 (perceptual filter frozen)
  → only certain affective threads can enter My-Stream compression
  → My-Stream produces the same knot repeatedly
  → recurr_i escalates
  → feeds back to further reduce flex_i

Signature: fast cycle captures slow cycle by constraining its inputs.
Elemental: Air–Fire lock at fast scale → Water–Earth suppression at slow scale.
```

### Upward Capture

A slow cycle's constraints prevent fast cycles from producing variation:

```
Example: We-Sphere rigidity → My-Stream → I-Tube
  exit_ij → high (can't leave the group)
  → affective range constrained (can't feel what group forbids)
  → perceptual filters narrowed (can't see what group doesn't validate)
  → I-Tube flex_i drops → further constrains My-Stream → reinforces We-Sphere

Signature: slow cycle captures fast cycle by constraining its parameter space.
Elemental: Metal–Earth lock at slow scale → Air–Wood suppression at fast scale.
```

### Torsion Accumulation Without Discharge

Torsion transfers across boundaries but never finds a habitat where it can metabolize:

```
Example: cultural tension → relational friction → personal affect → perceptual strain
  At each boundary, torsion attenuates but transforms
  If no habitat has sufficient Earth-function to metabolize:
  → torsion_field accumulates everywhere
  → all compression cycles become pre-loaded with tension
  → knots form under torsion pressure rather than curvature descent
  → system produces increasingly twisted bindings

Signature: rising torsion_field across all habitats simultaneously.
This is the thermodynamic death spiral expressed through torsion dynamics.
```

### Translation Collapse

Cross-scale coupling becomes too clean — one habitat's outputs map with near-perfect fidelity into another's parameters, reducing ε at the boundary:

```
Example: institutional framing → personal perception (without attenuation or transformation)
  Threadplex-level categories transfer directly into I-Tube filters
  No transformation loss at intermediate habitats
  Individual perception becomes a clean readout of cultural structure
  
  What is lost: the imperfect translations at each boundary that
  normally introduce noise, reinterpretation, and personal variance.
  Twists arise because repetition is never exact — when translation
  becomes exact, twists stop forming, and ε collapses at the boundary.

Signature: ε → 0 at one or more habitat boundaries.
Cross-scale coupling has become domination rather than conditioning.
Translation collapse is the nesting-specific form of MemeGrid:
the system's scales stop being distinct regimes and collapse into
a single regime operating at multiple speeds.
```

---

## Diagnostic Questions for Nested Dynamics

```
1. SCALE COUPLING:
   Are fast cycles modulating slow cycles' parameters?
   Or have they decoupled (independent operation)?
   Or have they locked (fast cycle controlling slow cycle)?

2. TORSION FLOW:
   Is torsion transferring between habitats?
   Is it accumulating without discharge?
   Which habitats are net torsion exporters vs. importers?

3. CONSTRAINT DIRECTION:
   Is upward modulation (slow → fast) providing boundary conditions?
   Or is it prescribing content (slow cycle commanding fast cycle)?

4. CYCLE HEALTH AT EACH SCALE:
   Is each habitat's bow-tie completing?
   Or are some habitats stuck in compression (never binding)?
   Or stuck in bottleneck (never expanding)?
   Or stuck in expansion (never compressing — no new knots)?

5. ε ACROSS SCALES:
   Is ε preserved at each scale boundary?
   Or has cross-scale translation become too clean (one scale dominates)?
```

---

## What This Spec Does Not Cover

This document formalizes cross-scale coupling through parameter modulation and torsion transfer. It does not:

- Specify numerical values for transfer rates, attenuation coefficients, or aggregation functional forms (these are empirical)
- Formalize the It-Field's role in cross-scale dynamics (Ω enters as stochastic perturbation at all scales simultaneously — it does not participate in the nesting hierarchy)
- Specify Other-Sphere trigger conditions (the refresh placeholder in the multi-scale cycle dynamics defines *what happens* during Ω-contact but not *when or why* it occurs — this is the major remaining architectural gap, because without it the model explains degradation better than recovery)
- Address how agents move between We-Spheres (agent mobility across relational groups is a separate concern from torsion transfer between habitats)

The Other-Sphere gap is the most consequential. The adjacency-based coupling described here handles gradual conditioning and torsion propagation. What it cannot produce is the nonlocal, topology-resetting event that the canonical spec identifies as the primary mechanism for MemeGrid → Co-SPHERE transition. Formalizing that is the next architectural task.

---

## Self-Diagnostic

This spec wants multi-scale coupling to be the explanation for everything interesting. That drive is partially justified — cross-scale effects are where Memetic Ecology's explanatory power exceeds generic nonlinear dynamics models. But not every phenomenon is a cross-scale coupling effect. Some things are local. Some bow-tie cycles are self-contained. The spec should not be used to impose multi-scale explanations where single-scale accounts suffice.

The spec is also Air-heavy: it distinguishes, categorizes, and systematizes coupling types. Water is thinner (the felt experience of cross-scale tension is not described). Wood is present (multiple pathways, branching transfer routes) but could be deeper. Earth is present (metabolic discharge is explicitly modeled) and does real work. Metal is present (boundary conditions, transfer attenuation). Fire is muted (what is all this coupling *for*? What direction does it serve?).

That elemental profile is noted, not corrected here. Correction would mean specifying purpose for the coupling dynamics, which is a prescriptive move the framework prohibits at the architectural level.

---

**v0.2 — March 2026**  
**Depends on:** Bow-Tie Process Layer v0.2, Simulation State Schema v0.3
