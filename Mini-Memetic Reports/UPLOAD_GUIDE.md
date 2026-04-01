# Mini-Memetic Report: Upload & Formatting Guide

For the openclaw bot — how to generate, format, and upload mini-memetic profile reports to the nemetics repo.

---

## Directory Structure

All reports live in `Mini-Memetic Reports/` at the repo root, organized by category:

```
Mini-Memetic Reports/
├── AI & Technology/
│   ├── images/
│   │   ├── Report Title.png
│   │   └── ...
│   ├── Report Title.md
│   └── ...
├── Consciousness & Spirituality/
│   ├── images/
│   └── ...
├── Cultural Archetypes & Aesthetics/
├── Digital Culture & Platform/
├── Ecology & Collapse/
├── Embodiment & Wellness/
├── Identity & Psychology/
├── Narrative & Information Warfare/
├── Political & Ideological/
└── Systems & Leadership/
```

### Rules

- **One `.md` file per report**, placed directly in the category folder (not nested deeper)
- **One image per report**, placed in the `images/` subfolder inside the same category
- **Image filename must match** what the markdown references — keep names simple and readable
- New categories can be added as top-level folders; the build discovers them automatically

---

## Canonical Report Template

```markdown
# [Title]

![Alt Text](images/[Image Filename].png)

Created at YYYY/MM/DD H:MM AM/PM

***

### ∴ Core Idea Unit

[The irreducible claim — what survives compression. 1-3 paragraphs.]

***

### ▲ Identity Play & Roles

[What adopting this meme signals. Archetypes activated, self-repositioning.]

***

### ≈ Emotional Triggers

[Affective hooks — use emoji prefixes for each trigger.]
- 🤯 [Trigger 1]
- 😬 [Trigger 2]
- 🧠 [Trigger 3]

***

### 𐂷 Spread Mechanics

**Distribution Vectors:** [Where it spreads — platforms, communities, formats]

**Propagation Style:** [How it's packaged — parable, polemic, aphorism, etc.]

***

### ⛨ Defense Reflexes

- [Built-in response to criticism 1]
- [Thought-terminating cliché or reframe 2]
- [In-group marker or irony shield 3]

***

### ☷ Memeplex Anchor Points

- [Adjacent meme/framework 1]
- [Adjacent meme/framework 2]
- [Adjacent meme/framework 3]

***

### ✶ Sticky Symbols or Quotes

- "[Memorable phrase 1]"
- "[Memorable phrase 2]"
- [Visual/symbolic shorthand description]

***

### ∿ Tags

#Tag1 · #Tag2 · #Tag3 · #Tag4 · #Tag5
```

---

## Formatting Rules

| Element | Requirement |
|---------|------------|
| **Title** | `# H1` at the very first line — required for the build to extract the title |
| **Image** | `![alt](images/filename.png)` — immediately after title, relative path to `images/` |
| **Date** | `Created at YYYY/MM/DD H:MM AM/PM` — plain text, not bold |
| **Section headings** | `### {glyph} {label}` — always H3, always with the canonical glyph |
| **Section separators** | `***` between every section — no `---`, no `⸻`, only `***` |
| **Bullets** | Use `-` (not `•`, not `*`) |
| **Tags** | Hashtags separated by ` · ` (space-middot-space) |
| **No Insight section** | Do not include `## Insight` — these have been removed |
| **No Resources section** | Do not include `## Resources` — these have been removed |

### Section Glyph Reference

| Glyph | Section | Purpose |
|-------|---------|---------|
| ∴ | Core Idea Unit | The irreducible claim |
| ▲ | Identity Play & Roles | Who the carrier becomes |
| ≈ | Emotional Triggers | Affective hooks |
| 𐂷 | Spread Mechanics | How it moves |
| ⛨ | Defense Reflexes | Built-in criticism shields |
| ☷ | Memeplex Anchor Points | Adjacent meme ecology |
| ✶ | Sticky Symbols or Quotes | Visual/verbal shorthands |
| ∿ | Tags | Hashtag classification |

The optional `◈ Mini-Memetic Profile` header can appear after the date line and before Core Idea Unit, but is not required.

---

## File Naming

**Markdown files:**
- Use the report's short title as filename
- Spaces are fine: `AI - Co-Rider in Posthuman.md`
- Keep names under ~50 characters for readability
- No date prefix needed (unlike blog posts)

**Image files:**
- Match the markdown filename stem: `AI - Co-Rider in Posthuman.png`
- PNG preferred, JPG accepted
- Place in the `images/` subfolder of the same category

---

## How to Upload

### Git workflow

1. Place the `.md` file in the correct category folder under `Mini-Memetic Reports/`
2. Place the `.png` image in `Mini-Memetic Reports/[Category]/images/`
3. Commit and push to `main`
4. GitHub Actions builds and deploys automatically

### What the build does

- Scans each category folder for `*.md` files
- Extracts title from the first `# H1` line
- Extracts excerpt from the first ~200 characters of body text
- Converts markdown to HTML
- Copies images from `images/` to the output directory
- Generates: `reports/[category-slug]/[report-slug].html`

### Output URL pattern

```
https://memeticcowboy.github.io/nemetics/reports/                          → category grid
https://memeticcowboy.github.io/nemetics/reports/ai-technology/            → category listing
https://memeticcowboy.github.io/nemetics/reports/ai-technology/report.html → individual report
```

---

## Choosing a Category

| Category | Use for memes about... |
|----------|----------------------|
| **AI & Technology** | AI tools, alignment, scaling, human-AI relations |
| **Consciousness & Spirituality** | Mysticism, sacred frames, awareness, psychedelics |
| **Cultural Archetypes & Aesthetics** | Myths, art movements, aesthetic codes, nostalgia |
| **Digital Culture & Platform** | Social media, algorithms, virality, online identity |
| **Ecology & Collapse** | Climate, systems failure, degrowth, civilizational risk |
| **Embodiment & Wellness** | Body, health, somatic experience, biohacking |
| **Identity & Psychology** | Self-concept, mental models, trauma, personality |
| **Narrative & Information Warfare** | Propaganda, psyops, counter-narratives, epistemic attacks |
| **Political & Ideological** | Governance, ideology, power structures, movements |
| **Systems & Leadership** | Organizations, coordination, management, complexity |

New categories can be added — just create the folder with an `images/` subfolder.
