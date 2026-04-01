#!/usr/bin/env python3
"""
Clean up Mini-Memetic Report filenames and titles.

1. Rename URL-encoded/timestamped filenames to clean versions
2. Fix empty H1 titles where the real title is in a Title: line
3. Rename corresponding image files
4. Delete template/junk files
"""

import os
import re
import shutil
import urllib.parse
from pathlib import Path

REPORTS_DIR = Path(__file__).parent / "Mini-Memetic Reports"

# Files to delete (junk/templates)
DELETE_FILES = [
    "Cultural Archetypes & Aesthetics/📌 Mini-Memetic Profile.md",
]


def decode_filename(name: str) -> str:
    """Decode a URL-encoded timestamped filename to a clean name."""
    stem = Path(name).stem
    # Strip numeric prefix: 1771907213439_2394171_
    clean = re.sub(r"^\d+_\d+_", "", stem)
    # URL-decode
    clean = urllib.parse.unquote_plus(clean)
    return clean


def extract_buried_title(text: str) -> str | None:
    """Find a buried title in lines like 'Title:\\n\\nActual Title Here'."""
    lines = text.split("\n")
    for i, line in enumerate(lines):
        stripped = line.strip()
        # Match "Title:" or "**Title:**" or "🧩 Title:" etc.
        if re.match(r"^(\*\*)?[🧩🔖\s]*Title:?\*?\*?\s*$", stripped, re.IGNORECASE):
            # Title is on the next non-blank line
            for j in range(i + 1, min(i + 4, len(lines))):
                candidate = lines[j].strip()
                # Skip blank lines and formatting
                if not candidate or candidate in ("***", "---"):
                    continue
                # Strip quotes and bold
                candidate = candidate.strip('"').strip("*").strip()
                if candidate and len(candidate) > 3:
                    return candidate
    return None


def fix_empty_h1(filepath: Path) -> bool:
    """Fix files with empty '# ' H1 by pulling title from buried Title: line."""
    text = filepath.read_text("utf-8")
    lines = text.split("\n")

    # Check if first H1 is empty
    has_empty_h1 = False
    for i, line in enumerate(lines):
        if re.match(r"^#\s*$", line.strip()):
            has_empty_h1 = True
            break

    if not has_empty_h1:
        return False

    title = extract_buried_title(text)
    if not title:
        return False

    # Replace empty H1 with real title
    for i, line in enumerate(lines):
        if re.match(r"^#\s*$", line.strip()):
            lines[i] = f"# {title}"
            break

    filepath.write_text("\n".join(lines), "utf-8")
    return True


def rename_url_encoded_files():
    """Rename URL-encoded/timestamped files and their images."""
    renames = []
    for cat_dir in sorted(REPORTS_DIR.iterdir()):
        if not cat_dir.is_dir() or cat_dir.name.startswith("."):
            continue
        for md_file in sorted(cat_dir.glob("*.md")):
            name = md_file.name
            if "%" not in name and "+" not in name:
                continue
            if not re.match(r"^\d+_\d+_", name):
                continue

            clean_stem = decode_filename(name)
            if not clean_stem:
                continue

            # Sanitize for filesystem (no colons on some systems, keep readable)
            safe_stem = clean_stem.replace(":", " -").replace("/", "-")
            new_md = cat_dir / f"{safe_stem}.md"

            # Check for collision
            if new_md.exists() and new_md != md_file:
                print(f"  SKIP (collision): {name} -> {new_md.name}")
                continue

            renames.append((md_file, new_md))

            # Find and rename corresponding image
            images_dir = cat_dir / "images"
            if images_dir.exists():
                old_img_stem = md_file.stem
                for img in images_dir.iterdir():
                    if img.stem == old_img_stem:
                        new_img = images_dir / f"{safe_stem}{img.suffix}"
                        if not new_img.exists():
                            renames.append((img, new_img))

    for old, new in renames:
        print(f"  {old.name} -> {new.name}")
        old.rename(new)

    return len([r for r in renames if r[0].suffix == ".md"])


def rename_bad_filenames():
    """Rename files with generic names using their actual H1 or buried title."""
    renames = []
    for cat_dir in sorted(REPORTS_DIR.iterdir()):
        if not cat_dir.is_dir() or cat_dir.name.startswith("."):
            continue
        for md_file in sorted(cat_dir.glob("*.md")):
            name = md_file.stem
            # Target files named "Title -", "Title - 2", "Mini-Memetic Profile", or timestamp-only with empty title
            if name not in ("Title -", "Title - 2", "Mini-Memetic Profile") and \
               not (re.match(r"^\d+_\d+_$", name)):
                continue

            text = md_file.read_text("utf-8")

            # Try H1 first
            m = re.search(r"^#\s+(.+)$", text, re.MULTILINE)
            title = m.group(1).strip() if m and m.group(1).strip() else None

            # Fall back to buried Title:
            if not title:
                title = extract_buried_title(text)

            if not title or len(title) < 4:
                print(f"  SKIP (no title found): {cat_dir.name}/{md_file.name}")
                continue

            # Sanitize
            safe = title.replace(":", " -").replace("/", "-").replace('"', "")
            safe = re.sub(r"\s+", " ", safe).strip()
            # Truncate for filesystem sanity
            if len(safe) > 60:
                safe = safe[:57] + "..."
            new_md = cat_dir / f"{safe}.md"

            if new_md.exists() and new_md != md_file:
                print(f"  SKIP (collision): {md_file.name} -> {new_md.name}")
                continue

            renames.append((md_file, new_md))

    for old, new in renames:
        print(f"  {old.name} -> {new.name}")
        old.rename(new)

    return len(renames)


def update_image_refs(filepath: Path, old_stem: str, new_stem: str):
    """Update image references in markdown after file rename."""
    text = filepath.read_text("utf-8")
    if old_stem in text:
        text = text.replace(old_stem, new_stem)
        filepath.write_text(text, "utf-8")


def delete_junk():
    """Remove template/junk files."""
    count = 0
    for rel_path in DELETE_FILES:
        full = REPORTS_DIR / rel_path
        if full.exists():
            print(f"  DELETE: {rel_path}")
            full.unlink()
            count += 1
    return count


def main():
    print("=== Deleting junk files ===")
    deleted = delete_junk()
    print(f"  Deleted: {deleted}")

    print("\n=== Fixing empty H1 titles ===")
    fixed = 0
    for md_file in sorted(REPORTS_DIR.rglob("*.md")):
        if any(p.startswith(".") for p in md_file.relative_to(REPORTS_DIR).parts):
            continue
        if fix_empty_h1(md_file):
            print(f"  Fixed H1: {md_file.relative_to(REPORTS_DIR)}")
            fixed += 1
    print(f"  Fixed: {fixed}")

    print("\n=== Renaming URL-encoded files ===")
    renamed_url = rename_url_encoded_files()
    print(f"  Renamed: {renamed_url}")

    print("\n=== Renaming bad filenames ===")
    renamed_bad = rename_bad_filenames()
    print(f"  Renamed: {renamed_bad}")

    print(f"\nTotal: {deleted} deleted, {fixed} H1 fixed, {renamed_url + renamed_bad} renamed")


if __name__ == "__main__":
    main()
