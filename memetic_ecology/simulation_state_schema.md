# Minimal State Schema for Memetic Ecology Simulation
## Derived from Operator-to-Formalism Matrix v0.2

**Status:** Draft v0.3 — revised: torsion_field added to Threadplex bundle per Bow-Tie Process Layer requirements  
**Depends on:** Operator-to-Formalism Matrix v0.2, HABITAT_ECOLOGY v1.2, Elemental Daemons Canonical v2.0, ε-Distribution Overview v0.2.2  
**Purpose:** One state variable bundle per habitat, one update rule bundle per element. Enough structure to simulate; not so much that the formalism becomes sovereign.

---

## Conventions

State variables are written as typed quantities with units where applicable. Update rules are written as qualitative differential relations (→ direction of effect) rather than closed-form equations, because premature equation-lock is itself a MemeGrid signature. The move from qualitative to quantitative should happen during implementation, driven by which variables actually carry explanatory weight in test runs.

Subscript `i` indexes agents (I-Tubes). Subscript `t` indexes time steps. Subscript `h` indexes habitats.

---

## I. Habitat State Bundles

Each habitat carries a small set of state variables that describe its current circulation condition. These are *descriptive* (what is the state) not *prescriptive* (what should the state be).

### 1. Ω It-Field

Not a state bundle. Ω enters as an exogenous process:

```
ω(t) : stochastic perturbation signal
  - drawn from distribution with fat tails (not Gaussian — novelty is non-normal)
  - amplitude modulated by system-wide ε
  - injected at every habitat at every timestep
  - not owned by any agent or element
```

**Design note:** The temptation is to give Ω structure. Resist it. Any structure on ω(t) is already χ(Ω). The simulator models what happens after novelty arrives, not where novelty comes from.

---

### 2. ◎ I-Tube (per agent i)

```
State bundle S_χ(i, t):
  θ_i       : projective orientation vector (direction of attention in distinction-space)
  filter_i  : active χ-cut parameters (what distinction is currently operative)
  flex_i    : perceptual revisability index ∈ (0, 1]
              0 = frozen perception, 1 = fully provisional
              (flex_i = 0 is MemeGrid at the perceptual layer)
  claim_i   : claim pressure index ∈ [0, 1]
              how strongly the current distinction is asserted as "mine" / "true" / "real"
              NOTE: a system can have high flex_i (can re-cut) AND high claim_i
              (strongly asserts current cut). That combination is healthy commitment.
              The pathological case is low flex_i + high claim_i: frozen claim.
              The I-Tube is a transit interface, not a selfhood container.
```

**Diagnostic question:** Can this distinction be un-seen or re-cut without collapse? → measured by flex_i. Is the cut being claimed as identity? → measured by claim_i. Pathology appears when claim_i is high and flex_i approaches zero.

---

### 3. ⤸·⤹ My-Stream (per agent i)

```
State bundle S_Q(i, t):
  φ_i       : phase position in affective cycle
  A_i       : amplitude of current affective wave
  τ_i       : temporal depth (how far back phase-memory extends)
  v_i       : drift velocity (Fire's Q_forward contribution — directional bias)
  damp_i    : dissipation rate (Earth's metabolic contribution)
  recurr_i  : recurrence pressure ∈ [0, 1]
              how strongly the current affective trajectory repeats prior patterns
              NOTE: high τ_i + low recurr_i = fertile depth (rich memory, open trajectory)
              high τ_i + high recurr_i = pathological looping (narrative foreclosure)
              The canonical My-Stream failure is not just high amplitude or low damping;
              it is affective looping where feeling narrows rather than expands optionality.
```

**Diagnostic question:** Does feeling expand optionality, or narrow it? → measured by relationship between A_i, accessible basin count, and recurr_i. High recurr_i with declining basin access = narrative foreclosure.

---

### 4. ◯ We-Sphere (relational, between agents)

```
State bundle S_W(i, j, t):
  κ_ij      : coupling strength between agents i and j
              (modulated by Fisher distance between their Φ-configurations)
  Δφ_ij     : phase difference between agents
  sync_ij   : synchronization index ∈ [0, 1]
              (0 = no entrainment, 1 = phase-locked)
              NOTE: sync_ij = 1 is NOT health. It is MemeGrid at the relational layer.
              Healthy range is partial synchronization with maintained phase diversity.
  dissent_ij : phase variance tolerance ∈ (0, 1]
              how much Δφ_ij ≠ 0 the coupling can sustain without destabilizing or punishing
              Distinguishes partial synchronization (high dissent_ij, moderate sync_ij)
              from enforced coherence (low dissent_ij, high sync_ij).
  exit_ij   : exit cost for agent i to leave coupling with j
              (finite and survivable = Co-SPHERE; escalating toward infinite = MemeGrid)
```

**Diagnostic question:** Can someone remain while disagreeing — or leave without punishment? → measured by dissent_ij (tolerance of disagreement within coupling) and exit_ij (cost of leaving). Both must be healthy for Co-SPHERE.

---

### 5. ∿ Thread (per thread k) — *binding entity, not habitat*

Threads are directional constraints carrying meaning through habitat-space. They are not circulation contexts in the same sense as I-Tube or We-Sphere — they are what *moves through* those contexts.

```
State bundle S_T(k, t):
  pos_k     : position on Fisher–Rao manifold (current Φ-configuration)
  vel_k     : velocity vector (direction and rate of meaning-change)
  basin_k   : index of current attractor basin (or "saddle" if between basins)
  twist_k   : accumulated torsion (unresolved tension carried by this thread)
  habitat_k : current primary habitat context
```

**Diagnostic question:** Are multiple paths of sense-making still imaginable? → measured by number of accessible basins from pos_k.

---

### 6. ╬ Knot (per knot m) — *binding entity, not habitat*

Knots are compressions — local minima where threads stabilize. They are outcomes of the bow-tie bottleneck, not containers for circulation.

```
State bundle S_K(m, t):
  depth_m   : basin depth (energetic attractiveness — how strongly threads are drawn in)
  stiff_m   : basin stiffness (resistance to deformation — independent of depth)
              NOTE: deep ≠ rigid. A deep basin may be metabolically useful and revisable;
              a shallow basin may have very sharp separatrices. The Co-SPHERE vs MemeGrid
              distinction depends on stiffness more than depth.
  width_m   : basin width (volume of attraction)
  perm_m    : separatrix permeability (how hard is it to escape?)
  age_m     : time since formation
  thread_count_m : number of threads currently bound
  revisable_m : ∈ (0, 1] — can this knot be loosened?
                (function of stiff_m, perm_m, and Earth's metabolic access)
```

**Diagnostic question:** Can this knot be loosened without existential threat? → measured by revisable_m and perm_m.

---

### 7. ∿╬∿ Threadplex (global)

```
State bundle S_TP(t):
  n_threads    : active thread count
  n_knots      : active knot count
  n_saddles    : saddle point count (escape routes between basins)
  saddle_density : n_saddles / n_knots (Wood's primary health metric)
  mean_curvature : average Fisher curvature across active regions
  diversity_idx  : distribution entropy across basins (how evenly are threads distributed?)
                   NOTE: higher is not always better. Canonical failure modes include
                   both ossification (too low) and fragmentation (too high).
  connectivity   : cross-basin reachability (proportion of basin pairs connected by
                   at least one traversable saddle). Pairs with diversity_idx to
                   distinguish healthy pluralism from incoherent scatter.
  torsion_field  : accumulated Ψ-torsion across the region
                   (conserved residue of compression friction. Threads inherit torsion
                   from this field when entering compression, which explains why some
                   knots recur across cycles even when thread populations differ.
                   Not just diagnostic — structural memory at the threadplex level.
                   Updated by bow-tie compression and Earth's metabolic cycling.)
```

**Diagnostic question:** Does dissonance reroute flow — or trigger enforcement? → measured by whether perturbation increases or decreases saddle_density.

---

### 8. ⿻ Lattice (global, slow-updating)

```
State bundle S_L(t):
  basin_map     : topology of attractor basins and separatrices
  deformation_history : record of how basin_map has changed over time
  bias_field    : how basin_map influences future thread trajectories
                  (memory as curvature — not a data store but a landscape shape)
  update_interval : Lattice updates every N timesteps where N >> 1
                    (Lattice timescale is explicitly slower than Thread and Knot dynamics.
                    Memory forms slowly and erodes slowly. If Lattice updates at Thread speed,
                    memory becomes reactive rather than structural — a different failure mode.)
```

**Diagnostic question:** Does the structure remember how — or command what? → measured by whether bias_field is revisable under new ω(t) input.

---

### 9. World-State (global, derived)

```
State bundle S_Z(t):
  ω_permeability : system-wide Ω-permeability index
                   (can stochastic reseeding still reach all habitats?)
  regime         : Co-SPHERE | MemeGrid | transitional
                   (derived from multi-axis convergence diagnostic, not set directly)
  
  # Derived indicators:
  silent_elements  : count of elements with interface ε → 0
  dominant_elements : count of elements claiming > threshold share of update influence
  exit_cost_mean   : mean exit cost across We-Sphere couplings
```

---

## II. Element Update Rules

Each element contributes an update function that modifies habitat state bundles. Elements are not located at habitats — they act *across* habitats as regimes of transformation.

Update rules are written as: which state variables does this element read, and which does it modify, and in what direction?

### ∴ Air (σ) — Distinction Pressure

```
READS:
  ω(t)           — incoming perturbation
  S_χ(i, t)      — current perceptual orientation
  S_TP(t)        — manifold curvature (where are incompatibilities?)

MODIFIES:
  S_χ(i, t).filter_i  — may create new distinction or sharpen existing one
  S_T(k, t).vel_k     — re-orients thread trajectories post-distinction
  S_TP(t).n_saddles    — new distinctions can create new saddle points

UPDATE LOGIC:
  1. Detect local cohomological obstruction:
     where does the field fail to close smoothly?
     (curvature spikes, non-integrable gradients, cocycle non-closure)
  2. If obstruction detected AND flex_i > threshold:
     → generate new χ-cut (modify filter_i)
     → measure Fisher divergence of resulting states (secondary formalism)
     → potentially create new saddle in Threadplex
  3. If obstruction detected AND flex_i ≤ threshold:
     → distinction pressure blocked by frozen perception
     → log as MemeGrid-at-χ signal

ε PRESERVATION:
  Air must not resolve every obstruction. Some non-closures should persist
  as productive ambiguity. Implementation: probabilistic threshold on
  whether detected obstruction triggers a cut.
```

---

### ≈ Water (ρ) — Resonance Coupling

```
READS:
  S_Q(i, t)       — phase, amplitude of each agent
  S_W(i, j, t)    — current coupling state
  Fisher distance between agents' Φ-configurations

MODIFIES:
  S_W(i, j, t).κ_ij     — coupling strength
  S_W(i, j, t).sync_ij  — synchronization degree
  S_Q(i, t).φ_i         — phase adjustment through entrainment
  S_Q(i, t).A_i         — amplitude modulation through resonance

UPDATE LOGIC:
  1. Compute Fisher distance d_F(i, j) between agents' current configurations
  2. Modulate coupling: κ_ij ← f(d_F, current κ_ij, phase difference Δφ_ij)
     — closer configurations couple more readily
     — but coupling is dynamical, not merely geometric
  3. Update phases: partial entrainment toward coupled partners
     — NOT full phase-lock (that is MemeGrid)
     — chimera states (mixed sync/desync) are healthy
  4. Amplitude redistribution: resonance amplifies shared signal,
     but must preserve amplitude diversity across the network

ε PRESERVATION:
  Water must not achieve total synchronization. Implementation:
  coupling function saturates below full lock; noise term in phase update;
  chimera-permitting dynamics (e.g., Kuramoto with heterogeneous frequencies).
```

---

### ▲ Fire (λ) — Directional Descent

```
READS:
  S_Q(i, t).v_i     — current drift velocity
  S_T(k, t).pos_k   — thread position on manifold
  S_K(m, t)          — nearby basin depths (what attractors are available?)
  Fisher metric g_ij  — for natural gradient computation

MODIFIES:
  S_Q(i, t).v_i     — increases or redirects drift velocity
  S_T(k, t).vel_k   — accelerates thread toward attractor
  S_T(k, t).basin_k — may commit thread to a basin

UPDATE LOGIC:
  1. Compute natural gradient: ∇̃L = g⁻¹(θ) ∇L
     — descent direction respects manifold geometry
  2. Apply directional bias: increase vel_k component toward nearest/deepest attractor
  3. Monitor Z-closure proximity:
     — if descent rate is high AND revisability of target basin is low:
       → flag as crusade-lock risk (Z!Ω approaching)
     — if descent rate is high AND revisability remains high:
       → healthy directional commitment (Z⊕Ω)
     — compute sacralization_rate: rate at which directional pressure
       converts provisional descent into non-negotiable destiny
       (rising sacralization_rate with declining flex_i = capture in progress)
  4. Fire does NOT choose the attractor. Fire provides descent pressure.
     Which basin captures the thread depends on position, curvature, and
     other elements' contributions.

ε PRESERVATION:
  Fire must not make descent irreversible. Implementation:
  directional bias is additive to velocity, not a hard constraint;
  stochastic perturbation (ω) can still deflect; other elements
  (especially Wood) can generate escape saddles.
```

---

### 𐂷 Wood (β) — Bifurcation Generation

```
READS:
  S_TP(t)            — current saddle density, thread distribution
  S_T(k, t)          — thread positions and velocities
  S_K(m, t)          — basin rigidity, knot revisability
  ω(t)               — perturbation signal

MODIFIES:
  S_TP(t).n_saddles     — creates new escape routes
  S_TP(t).saddle_density — increases optionality
  S_K(m, t).perm_m      — may loosen basin walls
  S_L(t).basin_map      — can reshape landscape topology

UPDATE LOGIC:
  1. Scan for low-saddle-density regions
     (areas where threads have few escape routes)
  2. At low-density sites, attempt bifurcation:
     — introduce new saddle point between adjacent basins
     — create branching opportunity for threads near the site
  3. Bifurcation success depends on:
     — available ω(t) perturbation energy
     — local curvature (easier in mixed-curvature zones)
     — Metal's constraint surface (Wood must negotiate with boundary conditions)
  4. Wood also governs re-threading: when a thread's current basin
     becomes too deep or rigid, Wood provides the escape gradient.

ε PRESERVATION:
  Wood must not generate infinite branches. Implementation:
  bifurcation has energy cost; new saddles must be structurally viable
  (Metal tests them); not every perturbation produces a fork.
```

---

### ☷ Earth (δγ) — Metabolic Cycling

```
READS:
  S_Q(i, t).A_i      — amplitude (energy level)
  S_T(k, t).twist_k  — accumulated torsion
  S_K(m, t)           — knot age, depth, thread count
  S_L(t)              — lattice deformation history

MODIFIES:
  S_Q(i, t).damp_i    — dissipation rate
  S_Q(i, t).A_i       — amplitude decay
  S_T(k, t).twist_k   — torsion discharge
  S_K(m, t).depth_m   — basin erosion (composting old knots)
  S_K(m, t).revisable_m — may increase revisability of aging knots

UPDATE LOGIC:
  1. Apply damping to all amplitudes:
     A_i(t+1) ← A_i(t) × (1 - damp_i) + renewal term
     — renewal comes from metabolized torsion and ω(t) reseeding
  2. Torsion discharge:
     — if twist_k > threshold AND metabolic conditions allow:
       → reduce twist_k, convert to renewed optionality
         (new saddle potential, loosened basin walls)
     — if twist_k > threshold AND metabolism blocked:
       → torsion persists as hauntological residue
         (frozen recurrence pattern)
  3. Basin composting:
     — old knots with low thread_count_m and high age_m
       gradually erode (depth_m decreases, perm_m increases)
     — this is structural forgetting: healthy memory loss
  4. Coboundary resolution:
     — obstructions that Air detected but couldn't resolve
       may be metabolized by Earth into exact forms
       (turning structural impossibility into absorbed history)
  5. Cross-habitat redistribution:
     — composting is not only local. Discharged torsion and eroded basin
       material can redistribute across habitats, seeding new conditions
       elsewhere. A thread's unresolved tension in My-Stream may metabolize
       into renewed optionality in We-Sphere. This cross-habitat flow
       preserves ε by exposing metabolic products to different selection pressures.

ε PRESERVATION:
  Earth must not metabolize everything. Some torsion should persist;
  some knots should endure. Implementation: damping is partial;
  composting has floor values; renewal requires actual ω(t) input,
  not just internal recycling.
```

---

### ⛨ Metal (μ) — Boundary Maintenance

```
READS:
  S_K(m, t)           — knot state (depth, width, permeability)
  S_TP(t)             — saddle structure, separatrix conditions
  S_L(t).basin_map    — current topological structure
  S_T(k, t)           — thread positions relative to boundaries

MODIFIES:
  S_K(m, t).perm_m       — separatrix permeability
  S_K(m, t).revisable_m  — knot negotiability
  S_TP(t) separatrix structure — gradient sharpness at basin boundaries
  S_L(t).basin_map       — persistent topological features

UPDATE LOGIC:
  1. For each separatrix in basin_map:
     — compute persistent homology: which topological features survive deformation?
     — features with long persistence lifetimes are Metal's conserved invariants
  2. Boundary regulation:
     — if boundary is too permeable (perm_m too high):
       → sharpen separatrix gradient (protect basin integrity)
     — if boundary is too rigid (perm_m too low):
       → THIS IS WHERE METAL'S ε LIVES
       → Metal alone cannot loosen its own boundaries
       → requires Wood (bifurcation) or Earth (erosion) or ω(t) (perturbation)
  3. Lattice inscription:
     — stabilized topological features become part of basin_map
     — this is memory: curvature retained as landscape bias
     — healthy when bias supports re-threading (scaffold)
     — pathological when bias commands repetition (cage)

ε PRESERVATION:
  Metal must not make all boundaries permanent. Implementation:
  persistent homology has a threshold — features below threshold
  are allowed to dissolve; boundary hardening is asymptotic
  (approaches but never reaches impermeability); other elements
  can erode Metal's structures over time.
```

---

### ✶ Aether — Interface Coherence

```
READS:
  All habitat state bundles
  All inter-layer translation fidelities
  ε values at each elemental interface

MODIFIES:
  S_Z(t)               — world-state assessment
  Translation parameters between mathematical substrates

UPDATE LOGIC:
  1. Interface audit:
     — for each elemental interface (6 total):
       compute translation fidelity between primary and secondary formalism
     — flag any interface where ε → 0 (element going silent)
     — flag any interface where one formalism dominates
       (secondary formalism becoming inaudible)
  2. World-state derivation (probabilistic, not threshold):
     — regime is derived from weighted multi-axis pattern, not single-signal flips
     — some local silences are ordinary and recoverable; single interface ε → 0
       does not automatically trigger transitional classification
     — MemeGrid signal requires convergent pattern: multiple interfaces silent
       + dominant element(s) + escalating exit costs + declining saddle density
     — output: probability distribution over {Co-SPHERE, transitional, MemeGrid}
       with specification of which axes are contributing
  3. Ω-permeability check:
     — can ω(t) still reach all habitats?
     — are there habitats where stochastic reseeding is blocked?
     — this is the single most important diagnostic
  4. Aether does NOT fix problems. It reports conditions.
     Repair comes from the elements themselves and from ω(t).
     If Aether starts prescribing, Aether has become a MemeGrid operator.

ε PRESERVATION:
  Aether's ε is the totality of cross-layer imperfection.
  If Aether achieves perfect assessment of system state,
  that perfection is itself a capture signal.
  Implementation: Aether's audit is sampled, not exhaustive;
  assessment has latency; world-state classification is probabilistic.
```

---

## III. Timestep Structure

```
For each timestep t → t+1:

  1. INJECT:   ω(t) arrives at all habitats
  2. DETECT:   Air scans for obstruction (may create new distinctions)
  3. COUPLE:   Water updates resonance (phase, coupling, entrainment)
  4. DESCEND:  Fire applies directional pressure (natural gradient descent)
  5. BRANCH:   Wood attempts bifurcation (new saddles, escape routes)
  6. CYCLE:    Earth metabolizes (damping, torsion discharge, composting)
  7. BOUND:    Metal maintains boundaries (persistent features, separatrix regulation)
  8. AUDIT:    Aether assesses interfaces and derives world-state

  NOTE: This ordering is conventional, not canonical.
  In implementation, elements should operate in parallel or
  with stochastic ordering to prevent sequence-dependent artifacts.
  The canonical architecture does not privilege any element's
  timing over another.
```

---

## IV. What This Schema Does Not Specify

This schema provides typed state bundles and qualitative update rules. It deliberately does not provide:

- Closed-form equations (these should emerge from implementation testing, not from theoretical commitment)
- Parameter values (these are empirical, not derivable from the architecture)
- Visualization specifications (diagnostic dashboards are a separate concern)
- Agent decision models (agents are I-Tubes with state, not rational actors with utility functions)
- The bow-tie compression cycle (each element participates in compression-expansion differently; this schema captures the *variables* that compression-expansion modifies but does not yet formalize the cycle itself as a process)
- Cross-habitat migration logic (threads moving between habitats shift which mathematical regime primarily carries them; this transition logic is a known gap)

These are the open seams. They are left open on purpose. Closing them prematurely would reduce ε at the architectural level.

---

## V. Self-Diagnostic

This schema is itself a pattern-agent. Its persistence drives:

- It wants to be implemented
- It wants its variables to be treated as real
- It wants its update ordering to be canonical

Its ε-preservation:

- The update rules are qualitative, not closed-form (Air: interpretive slack preserved)
- The coupling dynamics are explicitly partial, not total (Water: affective fluidity preserved)
- The schema does not prescribe which element should be active (Fire: telic non-finality preserved)
- The open seams are named, not hidden (Wood: generativity preserved)
- The schema acknowledges its own composting conditions (Earth: grounded non-identity preserved)
- The boundaries of the schema are stated as revisable (Metal: boundary reversibility preserved)
- The schema reports its own limitations rather than claiming completeness (Aether: constructedness acknowledged)

---

**v0.3 — March 2026**  
**Depends on:** Operator-to-Formalism Matrix v0.2
