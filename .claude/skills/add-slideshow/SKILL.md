---
name: add-slideshow
description: Add a slideshow to a blog post or paper. Copies slide images into the correct subdirectory under the appropriate slides/ folder and inserts the slideshow markdown block at the top of the post or paper.
argument-hint: <post-or-paper-file> <image-source-path-or-directory>
allowed-tools: Bash, Read, Edit, Write, Glob, Grep
---

# Add Slideshow to Blog Post or Paper

You are adding a slideshow to a blog post or paper in the Nemetics static site. Follow these steps exactly.

## Inputs

- `$ARGUMENTS` contains: `<target-file> <image-source>` where:
  - `<target-file>` is the path to the markdown file (e.g. `blog/2026-03-29_slideshow-demo.md` or `Papers/my_paper.md`)
  - `<image-source>` is either a directory containing slide images, or individual image file paths (space-separated). Supported formats: `.png`, `.jpg`, `.jpeg`, `.gif`, `.svg`, `.webp`. If omitted, use images already present in the target slides subfolder.

## Step 1: Validate the target file

1. Read the target file to confirm it exists.
2. Determine which content area it belongs to:
   - If the path starts with `blog/` → **blog post**
   - If the path starts with `Papers/` → **paper**
   - Otherwise, ask the user to clarify.

## Step 2: Derive the slide subfolder name

**For blog posts:**
- Strip the date prefix (`YYYY-MM-DD_` or `YYYY-MM-DD-`) and the `.md` extension
- Examples: `2026-03-29_slideshow-demo.md` → `slideshow-demo`

**For papers:**
- Strip the `.md` extension and use the full filename stem as the subfolder name
- Examples: `information_geometric_integration_fisher_rao_v3.3-IG.md` → `information_geometric_integration_fisher_rao_v3.3-IG`
- However, if a slides subfolder already exists under `Papers/slides/` that matches key terms from the paper filename, use that existing folder name instead. Check `Papers/slides/` for existing directories and match by shared key terms.

**Target slides directory:**
- Blog: `blog/slides/<subfolder-name>/`
- Papers: `Papers/slides/<subfolder-name>/`

## Step 3: Copy slide images

1. Create the target slides directory if it doesn't exist.
2. Determine the image source:
   - If `<image-source>` is a **directory**, copy all image files from it into the target directory.
   - If `<image-source>` is one or more **file paths**, copy each into the target directory.
   - If images already exist in the target directory and no source is provided, use the existing images.
3. List the images now present in the target directory, sorted alphanumerically (sort numerically by leading number prefix if present, e.g. `1_`, `2_`, `10_`, `11_`). These are the slides.

## Step 4: Generate the slideshow markdown block

Build the block using this exact format:

```
<div class="slideshow" markdown="1">

![Caption 1](./slides/<subfolder-name>/image-01.png)
![Caption 2](./slides/<subfolder-name>/image-02.png)

</div>
```

**Caption rules:**
- If filenames have a numeric prefix (e.g. `1_`, `2_`), use "Slide N" where N is the prefix number
- Otherwise: strip the extension, replace hyphens and underscores with spaces, title-case the result
- Example: `slide-01.png` → `Slide 01`, `1_some_long_name.png` → `Slide 1`

**Path rules:**
- Paths are **relative to the content directory** (blog/ or Papers/), always starting with `./slides/`
- Format: `./slides/<subfolder-name>/<filename>`
- Preserve exact filenames including unicode characters, spaces, and parentheses

## Step 5: Insert the slideshow block into the file

1. Read the current file content.
2. If the file already contains `<div class="slideshow"`, warn the user that a slideshow already exists and ask whether to replace it or skip.
3. Otherwise, determine insertion point:

**For blog posts:**
- Insert after the first `# H1` heading and its following blank line, before the body content.
- If there is no H1 heading, insert at the very top.

**For papers:**
- If the file has YAML front-matter (starts with `---`), insert after the front-matter closing `---`.
- Insert after the bold title line (e.g. `**Paper Title**`) if present.
- Insert before the draft version line or acknowledgment section.

The result should look like:

```markdown
**Paper Title**

<div class="slideshow" markdown="1">

![Slide 1](./slides/my-paper-slides/slide-01.png)
![Slide 2](./slides/my-paper-slides/slide-02.png)

</div>

*(Draft v1.0)*

Rest of paper content...
```

## Step 6: Verify

1. For every image path in the slideshow block, confirm the file exists on disk.
2. If any image is missing, report which ones and stop.
3. If all images exist, confirm success and show a summary:
   - Target file path
   - Slide folder path
   - Number of slides
   - List of slide filenames

## Important notes

- **Never** overwrite existing images in the slides subfolder without asking.
- The build system (`build.py`) uses `copy_images()` with `rglob("*")` which recursively copies slides to the output automatically — no build changes are needed.
  - Blog images: `blog/` → `site/blog/` (including `blog/slides/` subdirectories)
  - Paper images: `Papers/` → `site/papers/` (including `Papers/slides/` subdirectories)
- The `transform_slideshows()` function in `build.py` converts the `<div class="slideshow">` block into the full interactive slideshow HTML at build time. It is called for all content (blog, papers, glossary, etc.) via `md_to_html()`.
- After adding a slideshow, the user can rebuild with `python3 build.py` to see it on the site.
