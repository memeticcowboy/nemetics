---
name: add-slideshow
description: Add a slideshow to a blog post. Copies slide images into the correct subdirectory under blog/slides/ and inserts the slideshow markdown block at the top of the post.
argument-hint: <post-file> <image-source-path-or-directory>
allowed-tools: Bash, Read, Edit, Write, Glob, Grep
---

# Add Slideshow to Blog Post

You are adding a slideshow to a blog post in the Nemetics static site. Follow these steps exactly.

## Inputs

- `$ARGUMENTS` contains: `<post-file> <image-source>` where:
  - `<post-file>` is the path to the blog post markdown file (e.g. `blog/2026-03-29_slideshow-demo.md`)
  - `<image-source>` is either a directory containing slide images, or individual image file paths (space-separated). Supported formats: `.png`, `.jpg`, `.jpeg`, `.gif`, `.svg`, `.webp`

## Step 1: Validate the target post

1. Read the post file to confirm it exists.
2. If it does not exist, list available posts in `blog/` and ask the user which one they meant.

## Step 2: Derive the slide subfolder name

Extract the slug from the post filename:
- Strip the date prefix (`YYYY-MM-DD_` or `YYYY-MM-DD-`)
- Strip the `.md` extension
- The remaining string is the subfolder name

Examples:
- `2026-03-29_slideshow-demo.md` → `slideshow-demo`
- `2026-03-06-devolution-thermodynamic-necessity.md` → `devolution-thermodynamic-necessity`
- `2026-02-25_bateson_ecology_mind_information_nemetic_pattern.md` → `bateson_ecology_mind_information_nemetic_pattern`

The target directory is: `blog/slides/<subfolder-name>/`

## Step 3: Copy slide images

1. Create the target directory if it doesn't exist: `blog/slides/<subfolder-name>/`
2. Determine the image source:
   - If `<image-source>` is a **directory**, copy all image files (`.png`, `.jpg`, `.jpeg`, `.gif`, `.svg`, `.webp`) from it into the target directory.
   - If `<image-source>` is one or more **file paths**, copy each into the target directory.
   - If images already exist in the target directory and no source is provided, use the existing images.
3. List the images now present in the target directory, sorted alphanumerically. These are the slides.

## Step 4: Generate the slideshow markdown block

Build the block using this exact format:

```
<div class="slideshow" markdown="1">

![Caption 1](./slides/<subfolder-name>/image-01.png)
![Caption 2](./slides/<subfolder-name>/image-02.png)

</div>
```

**Caption rules:**
- Take the image filename, strip the extension
- Replace hyphens (`-`) and underscores (`_`) with spaces
- Title-case the result
- Example: `slide-01.png` → `Slide 01`, `field-theory-overview.jpg` → `Field Theory Overview`

**Path rules:**
- Paths are **relative to the blog/ directory**, always starting with `./slides/`
- Format: `./slides/<subfolder-name>/<filename>`

## Step 5: Insert the slideshow block into the post

1. Read the current post content.
2. If the post already contains `<div class="slideshow"`, warn the user that a slideshow already exists and ask whether to replace it or skip.
3. Otherwise, insert the slideshow block **after the first `# H1` heading and its following blank line**, before the body content. If there is no H1 heading, insert at the very top.

The result should look like:

```markdown
# Post Title

<div class="slideshow" markdown="1">

![Slide 01](./slides/my-post-slug/slide-01.png)
![Slide 02](./slides/my-post-slug/slide-02.png)

</div>

The rest of the post content continues here...
```

## Step 6: Verify

1. For every image path in the slideshow block, confirm the file exists on disk.
2. If any image is missing, report which ones and stop.
3. If all images exist, confirm success and show a summary:
   - Post file path
   - Slide folder path
   - Number of slides
   - List of slide filenames

## Important notes

- **Never** overwrite existing images in the slides subfolder without asking.
- The build system (`build.py`) uses `copy_images()` with `rglob("*")` which recursively copies `blog/slides/<subfolder>/` to `site/blog/slides/<subfolder>/` automatically — no build changes are needed.
- The `transform_slideshows()` function in `build.py` converts the `<div class="slideshow">` block into the full interactive slideshow HTML at build time.
- After adding a slideshow, the user can rebuild with `python3 build.py` to see it on the site.
