---
name: add-audio-player
description: Add an audio player to a blog post or paper. Copies MP3 files into the correct subdirectory under the appropriate audio/ folder and inserts the audio player markdown block into the post or paper.
argument-hint: <post-or-paper-file> <audio-source-path-or-directory>
allowed-tools: Bash, Read, Edit, Write, Glob, Grep
---

# Add Audio Player to Blog Post or Paper

You are adding an audio player to a blog post or paper in the Nemetics static site. Follow these steps exactly.

## Inputs

- `$ARGUMENTS` contains: `<target-file> <audio-source>` where:
  - `<target-file>` is the path to the markdown file (e.g. `blog/2026-03-29_my-post.md` or `Papers/my_paper.md`)
  - `<audio-source>` is either a directory containing audio files, or individual audio file paths (space-separated). Supported formats: `.mp3`, `.ogg`, `.wav`, `.m4a`. If omitted, use audio files already present in the target audio subfolder.

## Step 1: Validate the target file

1. Read the target file to confirm it exists.
2. Determine which content area it belongs to:
   - If the path starts with `blog/` -> **blog post**
   - If the path starts with `Papers/` -> **paper**
   - Otherwise, ask the user to clarify.

## Step 2: Derive the audio subfolder name

**For blog posts:**
- Strip the date prefix (`YYYY-MM-DD_` or `YYYY-MM-DD-`) and the `.md` extension
- Examples: `2026-03-29_my-post.md` -> `my-post`

**For papers:**
- Strip the `.md` extension and use the full filename stem as the subfolder name
- If an audio subfolder already exists under `Papers/audio/` that matches key terms from the paper filename, use that existing folder name instead.

**Target audio directory:**
- Blog: `blog/audio/<subfolder-name>/`
- Papers: `Papers/audio/<subfolder-name>/`

## Step 3: Copy audio files

1. Create the target audio directory if it doesn't exist.
2. Determine the audio source:
   - If `<audio-source>` is a **directory**, copy all audio files from it into the target directory.
   - If `<audio-source>` is one or more **file paths**, copy each into the target directory.
   - If audio files already exist in the target directory and no source is provided, use the existing files.
3. List the audio files now present in the target directory, sorted alphanumerically. These are the tracks.

## Step 4: Generate the audio player markdown block

Build the block using this exact format:

```
<div class="audio-player" markdown="1">

[Track Title 1](<./audio/<subfolder-name>/file1.mp3>)
[Track Title 2](<./audio/<subfolder-name>/file2.mp3>)

</div>
```

**IMPORTANT - angle brackets around URLs:** Always wrap the audio URL in angle brackets `<...>` as shown above. This is required because filenames may contain spaces or special characters.

**Title rules:**
- Strip the file extension, replace hyphens and underscores with spaces, title-case the result
- If filenames have a numeric prefix (e.g. `01_`, `1-`), include it as a track number: "1. Track Name"
- Example: `01_introduction.mp3` -> `1. Introduction`
- Example: `field-theory-overview.mp3` -> `Field Theory Overview`

**Path rules:**
- Paths are **relative to the content directory** (blog/ or Papers/), always starting with `./audio/`
- Format: `./audio/<subfolder-name>/<filename>`
- Preserve exact filenames including spaces and special characters

## Step 5: Insert the audio player block into the file

1. Read the current file content.
2. If the file already contains `<div class="audio-player"`, warn the user that an audio player already exists and ask whether to replace it or add another.
3. Otherwise, determine insertion point:

**For blog posts:**
- Insert after the first `# H1` heading and its following blank line.
- If a slideshow exists, insert after the slideshow closing `</div>`.
- If there is no H1 heading, insert at the very top.

**For papers:**
- If the file has YAML front-matter (starts with `---`), insert after the front-matter closing `---`.
- Insert after the bold title line (e.g. `**Paper Title**`) if present.
- If a slideshow exists, insert after the slideshow closing `</div>`.

## Step 6: Verify

1. For every audio path in the player block, confirm the file exists on disk.
2. If any audio file is missing, report which ones and stop.
3. If all files exist, confirm success and show a summary:
   - Target file path
   - Audio folder path
   - Number of tracks
   - List of track filenames

## Important notes

- **Never** overwrite existing audio files in the audio subfolder without asking.
- The build system (`build.py`) copies audio files alongside images via `copy_images()` which handles `AUDIO_EXTENSIONS` (`.mp3`, `.ogg`, `.wav`, `.m4a`).
  - Blog audio: `blog/audio/` -> `site/blog/audio/`
  - Paper audio: `Papers/audio/` -> `site/papers/audio/`
- The `transform_audio_players()` function in `build.py` converts the `<div class="audio-player">` block into the full interactive player HTML at build time. It is called for all content via `md_to_html()`.
- After adding audio, the user can rebuild with `python3 build.py` to see it on the site.
