# Bow-Tie Process Layer
## Compression-Expansion Cycle Specification for Memetic Ecology Simulation

**Status:** Draft v0.2 — revised against canonical corrections  
**Depends on:** Simulation State Schema v0.2, Operator-to-Formalism Matrix v0.2, HABITAT_ECOLOGY v1.2  
**Purpose:** Define one compression-expansion cycle in terms of the state schema variables. The bow-tie is not an additional mechanism bolted onto the element update rules — it is the *process shape* through which those rules express when multiple threads interact.

---

## What the Bow-Tie Is

The canonical formulation from HABITAT_ECOLOGY v1.2:

```
Multiple Threads → [Compression into Knot] → Stabilization → [Expansion into new Threads] → Multiple outputs
```

Three phases. Left funnel compresses. Bottleneck binds. Right funnel expands.

This operates at all scales and in every habitat. Habitats do not create the pattern — they constrain where it operates. The bow-tie is the universal shape of how threads become knots and knots release new threads.

The state schema already contains all the variables the bow-tie modifies. What was missing is a description of the *process* — the temporal sequence by which compression, binding, and expansion occur, and how each element participates differently in each phase.

---

## The Three Phases

### Phase 1: Compression (Left Funnel)

**What happens:** Multiple threads descend local information-curvature gradients toward a basin candidate on the Fisher–Rao manifold. Threads do not simply "approach each other" in a spatial sense — they descend toward a shared minimum in the information geometry induced by their probability distributions. Competitive binding begins. Information is lost — necessarily. Not all threads survive compression. Some are absorbed into the forming knot; some are extinguished without contributing; some contribute torsion that persists as twist.

**State variables involved:**

```
INPUTS (read):
  S_T(k, t) for multiple threads k  — positions, velocities, twist
  S_TP(t).mean_curvature             — local manifold geometry
  S_K(m, t) for nearby knots         — existing basins that attract threads
  ω(t)                                — perturbation (can disrupt or seed compression)

OUTPUTS (modified):
  S_T(k, t).vel_k      — thread velocities converge (curvature descent)
  S_T(k, t).twist_k    — torsion accumulates from compression friction
  S_TP(t).n_threads_absorbed  — threads that join basin and contribute to knot formation
                                (these threads transfer torsion memory to the knot)
  S_TP(t).n_threads_extinct   — threads that dissipate without contributing to the knot
                                (these threads do NOT transfer torsion — their information
                                is lost without trace, which matters for cultural analysis:
                                options that vanish vs. options that become latent tension)
  S_TP(t).diversity_idx — decreases during compression (by definition)
  S_TP(t).torsion_field — accumulated Ψ-torsion in the compression region
                          (threads inherit torsion from this field when entering compression,
                          which explains why some knots recur across cycles even when
                          the initial thread population differs. Torsion_field is the
                          conserved residue of compression friction — not just a diagnostic
                          but structural memory at the threadplex level.)
```

**Elemental participation in compression:**

Each element compresses differently. This is critical — the bow-tie is not a single mechanism but a convergence of elemental pressures, each operating in its own mathematical register.

```
∴ Air:   Compresses by eliminating ambiguity.
         Many possible distinctions → one operative cut.
         Reduces interpretive slack locally.
         Information lost: alternative framings that didn't survive selection.

≈ Water: Compresses by prioritizing resonance.
         Many relational signals → one dominant attunement.
         Forces: "who/what to connect with NOW."
         Information lost: relational nuance, lesser signals drowned.

▲ Fire:  Compresses by selecting direction.
         Many possible vectors → one descent path.
         Forces: "toward THIS, not that."
         Information lost: alternative aims, paths not taken.

𐂷 Wood:  DELAYS convergence until curvature becomes decisive.
         Wood is not anti-binding. Wood ensures that knots emerge from
         real curvature rather than accidental proximity.
         Wood's role during left funnel is to slow convergence,
         preserve branch points, maintain saddles as long as possible,
         so that when compression does succeed, the resulting knot
         is genuinely load-bearing rather than just the first available.
         Wood-resistance during compression is what prevents
         premature bottleneck.

☷ Earth: Compresses by metabolic cost accounting.
         "What can actually be sustained?" eliminates threads that lack
         energetic backing. Threads requiring more resources than
         available substrate can support are composted during compression.
         Information lost: possibilities that were real but unsustainable.

⛨ Metal: Compresses by boundary enforcement.
         Determines compression geometry — how tight the bottleneck is,
         what the walls of the funnel look like.
         Metal sets the constraint surface through which threads must pass.
         Information lost: whatever doesn't fit through the gate.
```

**Compression health diagnostic:**

The canonical question is not "did compression happen?" (it always does) but "was the compression forced or negotiated?"

```
Healthy compression:
  — Multiple elements active during left funnel
  — Wood provides resistance (slows convergence, preserves saddles)
  — ε > 0 at bottleneck entry (uncertainty about which threads will survive)
  — Torsion from compressed-out threads is captured as twist_k, not discarded

Pathological compression:
  — Single element dominates left funnel
     (e.g., Fire alone → crusade compression; Metal alone → gatekeeping compression)
  — Wood silent (no resistance to premature binding)
  — ε → 0 at bottleneck entry (outcome predetermined)
  — Torsion discarded (lost information not even recorded as tension)
```

---

### Phase 2: Bottleneck (Knot Formation)

**What happens:** Threads that survive compression bind into a knot. This is the moment of forced coherence — the system commits to a local interpretation, belief, norm, or structure. A new knot forms, or an existing knot deepens.

**State variables involved:**

```
INPUTS (read):
  Surviving threads from Phase 1
  S_K(m, t) for nearby existing knots  — can the new binding join an existing basin?
  S_TP(t).saddle_density               — are there alternatives still available?
  S_L(t).bias_field                    — does structural memory favor this binding?

OUTPUTS (modified):
  S_K(m_new, t) created  OR  S_K(m_existing, t) deepened
    — depth_m increases (basin becomes more attractive)
    — stiff_m set by compression conditions (how rigid is the new binding?)
    — width_m set by how many threads participated
    — perm_m set by Metal's constraint geometry
    — thread_count_m increases
    — revisable_m ∝ ε_bottleneck (revisability is not an independent parameter —
                                   it derives from ε at the moment of binding)
    — stiff_m ∝ 1/ε_bottleneck (stiffness is the inverse of bottleneck openness)
  S_T(k, t).basin_k     — surviving threads assigned to knot basin
  S_T(k, t).twist_k     — some torsion may discharge at binding; some persists
```

**The critical variable at the bottleneck: ε**

The bow-tie's deepest structural feature is that *information is necessarily lost at the bottleneck*. The canonical spec is explicit: "Compression loses information (increases local order)." This is not a failure. It is thermodynamic necessity.

But the *degree* of information loss determines everything downstream.

```
ε at bottleneck > 0:
  — Binding is provisional
  — Knot forms with revisable_m > 0
  — Some twist persists (residue of what was lost)
  — Expansion phase has raw material to work with
  — This is the Co-SPHERE pathway

ε at bottleneck → 0:
  — Binding is absolute
  — Knot forms with revisable_m → 0
  — No twist persists (information cleanly destroyed)
  — Expansion phase has nothing to elaborate from
  — This is the MemeGrid pathway
```

The decisive question is not whether information is lost (it always is) but whether the *trace of what was lost* survives as torsion. Twist is the memory of compression. If twist is preserved, the knot can later be loosened. If twist is destroyed, the knot becomes permanent.

**Pattern-agency at the bottleneck:**

Threads that survive compression are not neutral. They have been selected. And selected threads modify the bottleneck to favor their own future replication. This is the canonical insight: "Threads compete during compression. Winners modify bottleneck to favor their own future replication."

In state schema terms: surviving threads influence the stiff_m and perm_m of the knot they form, biasing future compression cycles toward producing similar knots. This is how lumemes and usurpenes differ:

```
Lumemic knot formation:
  — Surviving threads do not seal the bottleneck behind them
  — perm_m remains moderate (others can enter or leave)
  — stiff_m allows deformation under new evidence
  — The knot enhances substrate capacity for future threads

Usurpenic knot formation:
  — Surviving threads modify bottleneck to exclude competitors
  — perm_m drops sharply (separatrix hardens)
  — stiff_m rises (resistance to deformation increases)
  — The knot degrades substrate capacity (dependency creation)
```

---

### Phase 3: Expansion (Right Funnel)

**What happens:** The stabilized knot generates new thread variants. This is creative elaboration — the knot becomes a source of new meaning, new trajectories, new questions. If compression reduces, expansion produces. The bow-tie breathes.

**State variables involved:**

```
INPUTS (read):
  S_K(m, t) newly formed or deepened knot
  S_T(k, t).twist_k     — residual torsion (raw material for new threads)
  S_TP(t).saddle_density — are there destinations for new threads?
  ω(t)                    — perturbation seeds new variation
  S_L(t).bias_field      — structural memory guides but does not command expansion

OUTPUTS (modified):
  S_T(k_new, t) created  — new threads emerge from knot
  S_TP(t).n_threads      — increases
  S_TP(t).diversity_idx  — should increase if expansion is healthy
  S_TP(t).saddle_density — new threads may discover or create new saddles
  S_TP(t).connectivity   — new threads may bridge previously disconnected basins
```

**Elemental participation in expansion:**

```
∴ Air:   Expands by generating new distinctions from the knot.
         "If X ≠ Y, then what else follows?"
         Each new distinction is a potential thread.

≈ Water: Expands by tracing relational implications.
         "If X ↔ Y, then who else is affected?"
         Resonance propagates outward from the binding.

▲ Fire:  Expands by projecting directional consequences.
         "If toward X, then what becomes possible?"
         New vectors emerge from the committed direction.

𐂷 Wood:  DRIVES expansion (primarily).
         Wood's role during right funnel is to maximize branching.
         New saddles, new fork points, new adjacent possibilities.
         This is where Wood's bifurcation generation is most active.
         Wood converts the forced coherence of the bottleneck
         into renewed optionality.

☷ Earth: Expands by cycling metabolic products.
         Discharged torsion becomes available energy for new threads.
         Composted material from compression feeds expansion.
         Cross-habitat redistribution happens here: metabolic products
         from one habitat's bow-tie cycle seed another habitat's threads.
         Formally: S_TP(h2, t+1).torsion_field += transfer(S_TP(h1, t).torsion_field)
         This encodes the phenomenon where unresolved tension in one habitat
         seeds new threads elsewhere (e.g., personal conflict becoming
         cultural discourse, somatic tension becoming relational pattern).

⛨ Metal: Expands by providing structure for new threads.
         New threads need provisional boundaries to exist as threads
         rather than dissipating into noise.
         Metal gives emerging threads enough form to persist
         without prematurely hardening them.
```

**Expansion health diagnostic:**

```
Healthy expansion:
  — Multiple new threads emerge (not just one dominant replication)
  — New threads have genuine variety (not copies of the binding thread)
  — twist_k from compression is converted to new thread energy
  — saddle_density increases or holds (optionality maintained)
  — ω(t) contributes to variation (novelty enters)

Pathological expansion:
  — Single thread replicates (knot produces copies, not variants)
  — No genuine variety (expansion is cosmetic, not structural)
  — twist_k is not converted (torsion accumulates without discharge)
  — saddle_density decreases (expansion produces but does not diversify)
  — ω(t) blocked (novelty cannot enter expansion phase)
```

---

## The Complete Cycle

One bow-tie cycle in state schema terms:

```
t₀: Multiple threads active in region
    → Compression begins (elements apply convergent pressure)
    → Threads compete; torsion accumulates; information lost

t₁: Bottleneck reached
    → Knot forms (or existing knot deepens)
    → ε determines: provisional (revisable_m > 0) or absolute (revisable_m → 0)
    → Twist preserved or destroyed

t₂: Expansion begins
    → New threads emerge from knot
    → Wood drives bifurcation; Earth cycles metabolic products
    → diversity_idx and saddle_density should recover or increase

t₃: New threads available for next compression cycle
    → The bow-tie repeats
```

**Cycle period varies by habitat:**

```
It-Field:     fastest (milliseconds — perceptual binding)
I-Tube:       fast (seconds to minutes — attentional reorientation)
My-Stream:    medium (minutes to hours — affective processing)
We-Sphere:    slow (hours to months — relational negotiation)
Threadplex:   slowest (months to generations — cultural evolution)
Lattice:      structural (updates across many cycles — memory formation)
```

This timescale nesting means that many fast bow-tie cycles occur within a single slow one. A single We-Sphere compression (a group reaching agreement) contains hundreds of My-Stream cycles (individual affective processing) which contain thousands of I-Tube cycles (perceptual shifts).

The nesting is not hierarchical — faster cycles do not "serve" slower ones. But it is *coupled*: fast bow-tie cycles modulate the parameter field within which slower cycles operate. For example, I-Tube cycles modulate attention gradients that affect which threads enter My-Stream compression. My-Stream affective processing modulates the coupling strengths that shape We-Sphere synchronization. This cross-scale coupling is not command — it is parameter modulation. The slower cycle sets boundary conditions; the faster cycle populates the field within those conditions.

---

## Elemental Balance Across the Cycle

The bow-tie has a characteristic elemental signature at each phase. Imbalance at any phase propagates forward:

```
COMPRESSION should involve:
  Primary:   Air (selecting), Fire (directing), Metal (constraining)
  Secondary: Water (prioritizing resonance), Earth (costing sustainability)
  Resistance: Wood (slowing, preserving alternatives)

BOTTLENECK should involve:
  Primary:   Metal (forming boundary), Fire (committing direction)
  Secondary: Air (finalizing distinction), Earth (grounding)
  Critical:  ε preservation (Water's affective fluidity, Wood's generativity
             keep the binding from becoming absolute)

EXPANSION should involve:
  Primary:   Wood (branching), Earth (cycling)
  Secondary: Air (new distinctions), Water (relational propagation), Fire (new directions)
  Structure: Metal (provisional form for new threads)
```

**Capture patterns by elemental dominance:**

```
Air-dominated bow-tie:
  Compression → overcut (too many distinctions kill threads prematurely)
  Bottleneck → fragile (binding is conceptually precise but relationally thin)
  Expansion → analytical (new distinctions but no felt resonance)

Water-dominated bow-tie:
  Compression → fusion (threads merge rather than compete)
  Bottleneck → enmeshed (binding loses distinction between participants)
  Expansion → contagion (resonance spreads without structural support)

Fire-dominated bow-tie:
  Compression → crusade (one direction eliminates all others)
  Bottleneck → hardened (binding is non-negotiable)
  Expansion → monodirectional (all new threads point the same way)

Wood-dominated bow-tie:
  Compression → fails (nothing binds; permanent left funnel)
  Bottleneck → never forms (no knot, only proliferating threads)
  Expansion → N/A (no bottleneck to expand from)

Earth-dominated bow-tie:
  Compression → pragmatic (only "sustainable" threads survive — may discard the novel)
  Bottleneck → institutional (binding follows precedent rather than present conditions)
  Expansion → recycling (products look like inputs — no genuine novelty)

Metal-dominated bow-tie:
  Compression → gatekeeping (bottleneck predetermined by existing structure)
  Bottleneck → fortress (binding is architecturally rigid from formation)
  Expansion → controlled (new threads must conform to existing boundaries)

Earth–Metal lock (compound capture):
  Compression → metabolically justified AND structurally enforced simultaneously
  Earth eliminates novelty as "unsustainable"; Metal codifies remaining patterns
  into rigid procedure. Bottleneck appears "reasonable" from both cost and
  structural perspectives, making it resistant to critique from any single element.
  Expansion → bureaucratic replication (products are procedurally correct
  but genuinely novel threads cannot survive the dual filter).
  This is historically the most common MemeGrid pattern in institutions.
```

---

## Interface with World-State

The bow-tie cycle is where Co-SPHERE and MemeGrid are *produced*, not just detected.

```
Co-SPHERE production:
  — Compression is multi-elemental (negotiated, not dominated)
  — Bottleneck preserves ε > 0 (binding is provisional)
  — Expansion generates genuine variety (saddle_density maintained or increased)
  — Torsion is preserved as twist and later metabolized
  — Cycle repeats with refreshed thread population

MemeGrid production:
  — Compression is mono-elemental (one element dominates left funnel)
  — Bottleneck destroys ε (binding is absolute, twist eliminated)
  — Expansion is replicative (knot produces copies, not variants)
  — Torsion is discarded (no raw material for future variation)
  — Cycle degrades with each repetition (progressive saddle annihilation)
```

The transition from Co-SPHERE to MemeGrid is therefore not a single event but a progressive degradation of bow-tie cycle quality. Each unhealthy cycle makes the next cycle slightly worse — compression becomes more mono-elemental, bottlenecks become harder, expansion becomes more replicative. This is the "thermodynamic death spiral" from the canonical spec: multi-axis convergence toward rigidity.

The transition from MemeGrid back to Co-SPHERE requires *punctuated Ω-contact*: ω(t) perturbation strong enough to disrupt the degraded cycle. This often appears as crisis — an external shock that forces the bottleneck open, reintroduces twist, and seeds expansion with genuinely novel threads. The canonical spec notes that "MemeGrid → Co-SPHERE requires punctuated Ω-contact, often through crisis."

---

## What This Spec Does Not Cover

This process layer describes the *shape* of one bow-tie cycle. It does not:

- Specify the mathematical form of compression dynamics (this depends on which habitat the cycle operates in and which elements are active)
- Formalize nested cycles (how fast cycles compose within slow ones — this is the next structural gap)
- Model cross-habitat bow-tie coupling (how a knot formed in one habitat seeds threads in another — partially addressed by Earth's cross-habitat redistribution rule, but not fully formalized)
- Provide detection thresholds for cycle health (these are empirical and should emerge from simulation testing)

These gaps are noted, not hidden.

---

## Self-Diagnostic

This spec has a persistence drive: it wants the bow-tie to be treated as the central process of the simulation.

That drive is largely justified. The bow-tie is not merely one process among many — it is closer to a universal coordination motif that appears whenever systems compress many signals into a single commitment and then generate consequences. Most binding events in the ecology project onto this geometry. That makes the bow-tie appropriate as the central process layer.

The correction is narrower than "the bow-tie is not fundamental." It is: the bow-tie describes binding dynamics specifically. Element update rules operate continuously, not only during bow-tie phases. Stochastic reseeding is always active. Cross-habitat migration occurs outside the bow-tie cycle. Some ecological processes (drift, gradual parameter change, slow Lattice deformation) do not have bow-tie shape. The bow-tie is the central process but not the only process.

---

**v0.2 — March 2026**  
**Depends on:** Simulation State Schema v0.3, Operator-to-Formalism Matrix v0.2
