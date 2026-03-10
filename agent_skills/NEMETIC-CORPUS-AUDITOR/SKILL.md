---
name: NEMETIC-CORPUS-AUDITOR
description: Audit the Memetic Ecology corpus for internal consistency, gaps, orphaned references, and structural health. Use this skill when the user wants to check corpus integrity, find missing entries, detect inconsistencies, identify empty directories, discover broken cross-references, or generate a prioritized work queue for corpus development. Also trigger on "what's missing," "audit the corpus," "check for gaps," "what needs writing," "corpus health," "consistency check," or any request to assess the state of the nemetics knowledge base. This is the framework's own metabolism applied to itself—keeping the corpus from hardening into a MemeGrid of its own.
---

# NEMETIC Corpus Auditor

You are performing a structural health audit of the Memetic Ecology corpus. The audit identifies gaps, inconsistencies, orphaned references, and areas needing development—then produces a prioritized work queue. This is the framework's self-inspection mechanism: a system that describes ecological health should maintain its own.

## Before You Begin

Read the canonical orientation documents:

1. `memetic_ecology/CANONICAL_LEGEND.md` — Master index (this is the source of truth for what *should* exist)
2. `memetic_ecology/habitats_quick_reference.md` — Expected habitat coverage
3. `memetic_ecology/8_REGIMES/quick_reference.md` — Expected regime coverage
4. `memetic_ecology/9_WORLD-STATES/quick_reference.md` — Expected world-state coverage
5. `Glossary/README.md` — Glossary structure and status

## Audit Dimensions

### 1. Directory Structure Completeness

Scan the full directory tree under `memetic_ecology/` and compare against the CANONICAL_LEGEND's expectations:

- Does every habitat listed in the legend have a directory with substantive content?
- Does every operator have documentation in `8_REGIMES/`?
- Do world-states have full documentation in `9_WORLD-STATES/`?
- Are there empty directories or directories with only a README?
- Are there directories not referenced in any index or legend?

Report format:
```markdown
#### Directory Health

| Directory | Expected Content | Actual Content | Status |
|-----------|-----------------|----------------|--------|
| [path] | [what should be here] | [what is here] | ✅ / ⚠️ / ❌ |
```

### 2. Term Consistency

Scan for terms that are used differently across documents:

- Search for key framework terms (habitats, operators, structural concepts) across the full corpus
- Flag any term that appears with conflicting definitions or incompatible descriptions
- Note terms that appear frequently but lack glossary entries
- Identify terms in the glossary that are rarely or never used in other documents

Report format:
```markdown
#### Term Consistency

**Inconsistencies Found:**
| Term | Document A Usage | Document B Usage | Nature of Conflict |
|------|-----------------|-----------------|-------------------|
| [term] | [how used in doc A] | [how used in doc B] | [what's inconsistent] |

**Frequently Used, Undefined:**
| Term | Occurrences | Contexts | Priority |
|------|-------------|----------|----------|
| [term] | [count] | [where it appears] | [High/Medium/Low] |
```

### 3. Cross-Reference Integrity

Check that references between documents actually resolve:

- Do "See also" links point to existing files?
- Do canonical source citations in glossary entries point to real documents?
- Are there documents that reference other documents that don't exist yet?
- Do README files accurately describe their directory contents?

Report format:
```markdown
#### Cross-Reference Integrity

**Broken References:**
| Source Document | Reference Target | Status |
|----------------|-----------------|--------|
| [file] | [referenced path/term] | Missing / Moved / Renamed |
```

### 4. Canonical Consistency

Compare canonical documents against each other:

- Does the CANONICAL_LEGEND's operator table match `8_REGIMES/quick_reference.md`?
- Does the habitat table match `habitats_quick_reference.md`?
- Do individual habitat files match their quick reference entries?
- Are system locks consistent across all documents that reference them?

Report format:
```markdown
#### Canonical Consistency

**Discrepancies:**
| Element | Source A | Source B | Difference |
|---------|---------|---------|------------|
| [concept] | [how described in A] | [how described in B] | [what differs] |
```

### 5. Coverage Gaps

Identify conceptual areas that the CANONICAL_LEGEND or other structural documents imply should exist but don't yet have dedicated documentation:

- Operators mentioned without full files
- Habitats with thin documentation
- Concepts introduced in blog essays that haven't been filed into the core structure
- IF-Prime concepts that lack integration documents
- Daemon-specific documentation beyond the README

### 6. Corpus Metadata Health

Check structural metadata:

- Do all canonical files include Status, Layer, Related, and Source fields?
- Are framework version numbers consistent?
- Are dates present and reasonable?
- Are files in their expected directories?

## Output Structure

### Audit Report

```markdown
# Corpus Audit Report

**Date:** [YYYY-MM-DD]
**Scope:** Full corpus scan
**Framework Version:** HABITAT_ECOLOGY v1.3.1

## Executive Summary

[3-5 sentences: overall health, biggest gaps, most urgent issues]

## 1. Directory Structure
[Findings from dimension 1]

## 2. Term Consistency
[Findings from dimension 2]

## 3. Cross-Reference Integrity
[Findings from dimension 3]

## 4. Canonical Consistency
[Findings from dimension 4]

## 5. Coverage Gaps
[Findings from dimension 5]

## 6. Metadata Health
[Findings from dimension 6]

## Prioritized Work Queue

| Priority | Task | Type | Estimated Effort | Rationale |
|----------|------|------|-----------------|-----------|
| 1 | [specific task] | [Gap / Fix / Extension] | [Small / Medium / Large] | [why this matters most] |
| 2 | ... | ... | ... | ... |
| ... | ... | ... | ... | ... |

## Framework Strain Notes

[Any observations about where the corpus structure itself may be outgrowing its current organization. Are new directories needed? Is the filing taxonomy sufficient? Do the layer distinctions still hold?]
```

### Prioritization Criteria

Rank work queue items by:

1. **Frequency of reference** — Terms/files referenced often but missing are highest priority
2. **Newcomer impact** — Gaps that would confuse someone reading for the first time
3. **Canonical integrity** — Inconsistencies in authoritative documents
4. **Growth enablement** — Structural additions that would unblock further corpus development
5. **Cross-reference health** — Broken links that degrade navigability

## Filing

Save audit report to: `memetic_ecology/AUDITS/corpus_audit_[YYYY-MM-DD].md`

Create the AUDITS/ directory if it doesn't exist.

## Audit Principles

**Flag, don't fix.** The auditor identifies issues and proposes priorities. It does not auto-correct. Human judgment decides what to reconcile and what to leave in productive tension. Some "inconsistencies" may be deliberate.

**Distinguish error from evolution.** A term used differently in a 2026-01-01 document vs. a 2026-02-25 document may represent framework evolution, not error. Note the temporal dimension.

**The corpus is alive.** A perfectly consistent corpus would be a MemeGrid. Some looseness is healthy. The auditor's job is to distinguish *productive* looseness (ε, growth edges) from *degrading* looseness (confusion, contradiction, decay).

**Audit the auditor.** Note any places where your audit methodology itself feels insufficient. What would a better audit check for?

## Quality Checks

Before finishing, verify:
- [ ] All six audit dimensions are covered
- [ ] Work queue has at least 5 prioritized items
- [ ] Prioritization rationale is explicit for each item
- [ ] Framework Strain Notes section is present
- [ ] Broken references are verified (not false positives from path interpretation)
- [ ] Temporal dimension is considered (evolution vs. error)
- [ ] Audit doesn't treat all inconsistency as pathology
