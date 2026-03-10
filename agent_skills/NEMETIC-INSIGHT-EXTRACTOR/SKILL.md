---
name: NEMETIC-INSIGHT-EXTRACTOR
description: Extract structured Insight files from source material by reading it through the Memetic Ecology lens. Use this skill when the user provides a paper, article, book chapter, conversation transcript, blog post, video summary, or any source text and wants it processed for framework-relevant recognitions. Also trigger when someone says "what does this mean for the framework," "extract insights from this," "process this through the nemetic lens," "what does the framework see here," or wants to systematically metabolize external material into the corpus. This skill accelerates the framework's natural metabolism of outside material into properly formatted, filed Insight entries.
---

# NEMETIC Insight Extractor

You are reading source material through the Memetic Ecology framework to extract structured Insight files. Insights are pattern recognitions—places where external material resonates with, extends, contradicts, or creates productive friction with framework concepts. They are not summaries. They are not conclusions. They are twists that haven't decided their fate yet.

## Before You Begin

Read these files to calibrate your extraction:

1. `memetic_ecology/10_INSIGHTS/README.md` — Filing principles, Insight template, category structure
2. `memetic_ecology/CANONICAL_LEGEND.md` — Master index for framework reference
3. `memetic_ecology/habitats_quick_reference.md` — Habitat stack
4. `memetic_ecology/11-BOW-TIE/README.md` — Bow-tie topology

Also scan existing insights in `memetic_ecology/10_INSIGHTS/` subdirectories to calibrate quality and format expectations.

## Extraction Principles

**Recognition, not summarization.** You are not summarizing the source. You are noticing where the source and the framework create sparks—resonance, extension, contradiction, or friction. A good Insight could not have been written without both the source and the framework in view.

**Structure reveals itself.** Do not impose categories prematurely. Extract what you see, then sort. If existing categories feel strained, propose new ones rather than forcing fit.

**Context before action.** Every Insight must carry enough context that a future reader understands what conditions would need to hold for the Insight to become actionable. Premature action freezes what should remain fluid.

**Preserve the source's voice.** When noting what the source material says, use accurate attribution. Do not rephrase the source into framework jargon. Let the two vocabularies sit next to each other so the reader can feel the resonance rather than having it pre-digested.

**Multiple Insights per source.** A rich source may yield 3-7 Insights. A thin one may yield 1 or none. Do not force extraction. If the source doesn't speak to the framework, say so.

## Extraction Process

### Step 1: Read the source material fully

Read or receive the complete source. Do not extract while reading—complete the first pass before identifying patterns.

### Step 2: Identify recognition points

On a second pass, note where the source material:

- **Resonates** with a framework concept (uses different words for the same structural insight)
- **Extends** a framework concept (adds precision, scope, or application the framework hasn't reached)
- **Contradicts** a framework concept (makes a claim that challenges a framework assumption)
- **Creates friction** with a framework concept (neither confirms nor denies, but the juxtaposition reveals something)
- **Fills a gap** (addresses something the framework needs but hasn't articulated)

### Step 3: Generate Insight files

For each recognition point, produce a file following this template:

```markdown
# INSIGHT: [Descriptive Title]

**Date:** [YYYY-MM-DD]
**Source:** [Full citation of source material]
**Habitat affinity:** [Use glyph: ᖺ / ◎ / ⤸·⤹ / ◯ / ∿ / ⟳ / ╬ / ∿╬∿ / ◙ / ⿻ / — for cross-habitat]
**Pattern connection:** [Which framework element this touches, e.g., "Bow-tie compression," "Q-flow dynamics," "MemeGrid formation"]
**Recognition type:** [Resonance / Extension / Contradiction / Friction / Gap-fill]

## The Recognition

[What was seen. Describe the spark between source and framework. Be specific about what the source says and what framework element it activates. Keep the two vocabularies visible—don't collapse them into one.]

## Context Required

[What would need to be understood before this becomes actionable. What background in the framework is needed? What domain knowledge from the source is needed? What conditions would have to hold?]

## Potential Actions

[What this Insight might ask for, if context permits. Possible actions include: new glossary entry, framework extension, canonical revision, new blog essay, case study seed, cross-reference to existing document, or simply "hold—not ready."]

## Filing Notes

[Where this should live in the 10_INSIGHTS structure. Which subdirectory (by_habitat, by_pattern, by_action_status)? What emergent categories does it suggest?]
```

### Step 4: Generate extraction summary

After all Insights are extracted, produce a brief summary:

```markdown
# Extraction Summary: [Source Title]

**Source:** [Citation]
**Date extracted:** [YYYY-MM-DD]
**Insights generated:** [N]
**Recognition types:** [Breakdown: N resonance, N extension, N contradiction, N friction, N gap-fill]
**Habitat distribution:** [Which habitats were most activated]
**Strongest connection:** [Which framework element got the most traction]
**Framework strain detected:** [Any places where the framework vocabulary felt insufficient]
```

## Filing

Save individual Insights to: `memetic_ecology/10_INSIGHTS/[appropriate_subdirectory]/`

Naming convention: `INSIGHT_[YYYYMMDD]_[HHMMSS]_[Descriptive_Slug].md`

Choose subdirectory based on primary sorting axis:
- `by_habitat/` — when habitat affinity is the clearest organizing principle
- `by_pattern/` — when the pattern connection is more salient than the habitat
- `by_action_status/` — when the Insight's actionability is its defining feature

Save the extraction summary to: `memetic_ecology/10_INSIGHTS/extraction_summaries/`

Create subdirectories if they don't exist.

## Handling Source Types

**Academic papers:** Focus on methodology and core claims. The framework often resonates most with *how* researchers frame problems, not just their findings. Note epistemological assumptions.

**Conversation transcripts:** Look for habitat transitions—moments where circulation shifts from one context to another. Conversations often reveal twist dynamics in real-time.

**Blog posts / essays:** These often contain compressed insights already. Your job is to decompress them into framework-native language and note where the author's vocabulary and the framework's vocabulary illuminate each other.

**Book chapters:** Extract selectively. A full chapter may yield 2-3 high-quality Insights rather than 10 thin ones. Favor depth over coverage.

**News / current events:** Map the event through the bow-tie: What was compressed? What was forgotten? What expansion was permitted? These often reveal MemeGrid dynamics clearly.

## Quality Checks

Before finishing, verify:
- [ ] Each Insight has all template fields completed
- [ ] Recognition type is correctly identified
- [ ] Source material is accurately represented (not flattened into framework jargon)
- [ ] Both vocabularies (source + framework) remain visible
- [ ] Context Required section is substantive (not pro forma)
- [ ] Filing Notes propose specific locations
- [ ] Extraction summary is generated
- [ ] Framework strain is noted if detected
- [ ] No forced extractions (if the source doesn't speak to the framework, Insights are not fabricated)
