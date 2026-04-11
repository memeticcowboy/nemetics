#!/usr/bin/env python3
"""
Normalize all Mini-Memetic Report markdown files to a consistent format.

Changes:
- Remove ## Insight sections (and everything after)
- Remove ## Resources sections
- Standardize section headings to ### with glyphs
- Split inline heading+content into separate lines
- Normalize separators to ***
- Clean up spacing and HTML artifacts
"""

import re
from pathlib import Path

REPORTS_DIR = Path(__file__).parent / "Mini-Memetic Reports"

# Canonical section heading map: normalized name -> (glyph, canonical label)
SECTION_MAP = {
    "core idea unit": ("∴", "Core Idea Unit"),
    "core idea": ("∴", "Core Idea Unit"),
    "identity play & roles": ("▲", "Identity Play & Roles"),
    "identity play": ("▲", "Identity Play & Roles"),
    "emotional triggers": ("≈", "Emotional Triggers"),
    "emotions": ("≈", "Emotional Triggers"),
    "emotional landscape": ("≈", "Emotional Triggers"),
    "spread mechanics": ("𐂷", "Spread Mechanics"),
    "propagation": ("𐂷", "Spread Mechanics"),
    "defense reflexes": ("⛨", "Defense Reflexes"),
    "defense mechanisms": ("⛨", "Defense Reflexes"),
    "memeplex anchor points": ("☷", "Memeplex Anchor Points"),
    "memetic anchor points": ("☷", "Memeplex Anchor Points"),
    "sticky symbols or quotes": ("✶", "Sticky Symbols or Quotes"),
    "sticky symbols / quotes": ("✶", "Sticky Symbols or Quotes"),
    "sticky symbols & quotes": ("✶", "Sticky Symbols or Quotes"),
    "sticky symbols": ("✶", "Sticky Symbols or Quotes"),
    "tags": ("∿", "Tags"),
}

# Section names sorted longest-first for greedy matching
SECTION_NAMES = sorted(SECTION_MAP.keys(), key=len, reverse=True)

# Glyphs that may prefix section names in the source
KNOWN_GLYPHS = {"◈", "∴", "▲", "≈", "𐂷", "⛨", "☷", "✶", "∿", "🧩"}

# Build a regex pattern that matches an inline section heading with trailing content
# e.g. "∴ Core Idea Unit:**some content here"
# or "### ▲ Identity Play & Roles:****The Disillusioned Seer**"
GLYPH_PATTERN = "|".join(re.escape(g) for g in KNOWN_GLYPHS)
SECTION_NAME_PATTERN = "|".join(re.escape(n) for n in SECTION_NAMES)


def try_split_inline_heading(line: str) -> tuple[str, str] | None:
    """If line contains an inline heading+content, return (heading, content).

    Matches patterns like:
      ∴ Core Idea Unit:**content here
      ▲ Identity Play & Roles:****Bold content**
      ### ≈ Emotional Triggers:**• bullet
    """
    # Strip leading markdown heading markers
    text = re.sub(r"^#{1,4}\s*", "", line.strip())

    # Try to match: optional_glyph optional_bold section_name optional_bold colon content
    pattern = (
        r"^(?:\*\*)?(?:" + GLYPH_PATTERN + r")?\s*(?:\*\*)?\s*"
        r"(" + SECTION_NAME_PATTERN + r")"
        r"(?:\*\*)?:?\*{0,4}\s*(.+)"
    )
    m = re.match(pattern, text, re.IGNORECASE)
    if m:
        section_key = m.group(1).lower().strip()
        content = m.group(2).strip()
        # Don't split if content is empty or just punctuation
        if content and section_key in SECTION_MAP:
            glyph, label = SECTION_MAP[section_key]
            return (f"### {glyph} {label}", content)
    return None


def try_match_section_heading(line: str) -> tuple[str, str] | None:
    """Try to match a line as a pure section heading (no trailing content)."""
    # Strip markdown heading prefixes
    text = re.sub(r"^#{1,4}\s*", "", line)

    # Strip bold markers
    text = re.sub(r"\*\*", "", text)

    # Strip trailing colon
    text = text.rstrip(":").strip()

    # Strip known leading glyphs
    for g in KNOWN_GLYPHS:
        if text.startswith(g):
            text = text[len(g):].strip()
            break

    # Also strip emoji-style glyphs
    text = re.sub(r"^[\U0001F300-\U0001F9FF]\s*", "", text)

    # Strip trailing colon again after glyph removal
    text = text.rstrip(":").strip()

    # Look up in section map
    key = text.lower().strip()
    if key in SECTION_MAP:
        return SECTION_MAP[key]

    # Special case: "Mini-Memetic Profile" header
    if "mini-memetic profile" in key or "mini memetic profile" in key:
        return ("◈", "Mini-Memetic Profile")

    return None


def pre_split_flat_lines(text: str) -> str:
    """Split lines that contain multiple sections jammed together.

    Handles patterns like:
      ∴ Core Idea UnitSome content here⸻▲ Identity Play & RolesMore content
    by inserting newlines before each glyph+section pattern.
    """
    # Replace ⸻ separator with newline+*** throughout
    text = re.sub(r"⸻", "\n***\n", text)

    # Build pattern for glyph+section name combos
    glyph_section = "|".join(
        re.escape(g) + r"\s*" + re.escape(n)
        for n in SECTION_NAMES
        for g in KNOWN_GLYPHS
    )

    # Process line by line to avoid splitting already-formatted headings
    out_lines = []
    for line in text.split("\n"):
        # Skip lines that are already markdown headings
        if line.strip().startswith("#"):
            out_lines.append(line)
            continue
        # Split before glyph+section combos that appear after other content
        line = re.sub(
            r"(?<=\S)\s*(" + glyph_section + ")",
            r"\n\1",
            line,
            flags=re.IGNORECASE,
        )
        out_lines.append(line)

    return "\n".join(out_lines)


def normalize_report(text: str) -> str:
    """Normalize a single report's markdown content."""
    # First pass: split flat lines that jam multiple sections together
    text = pre_split_flat_lines(text)

    lines = text.split("\n")
    out = []
    i = 0

    while i < len(lines):
        line = lines[i]
        stripped = line.strip()

        # --- Remove Insight and Resources sections (to end of file) ---
        if re.match(r"^#{0,3}\s*\*{0,2}(Insight|Resources)\*{0,2}\s*$", stripped, re.IGNORECASE):
            break

        # Also catch heading-prefixed versions
        if re.match(r"^#{1,3}\s*(Insight|Resources)", stripped, re.IGNORECASE):
            break

        # --- Normalize separators to *** ---
        if stripped in ("---", "⸻", "---<br><br>", "---<br>", "----", "-----"):
            out.append("***")
            i += 1
            continue

        # --- Normalize pure section headings (check before inline split) ---
        heading_match = try_match_section_heading(stripped)
        if heading_match:
            glyph, label = heading_match
            out.append(f"### {glyph} {label}")
            i += 1
            continue

        # --- Check for inline heading+content ---
        inline = try_split_inline_heading(stripped)
        if inline:
            heading, content = inline
            out.append(heading)
            out.append("")
            # Content may have bullet markers like • that should be on separate lines
            content_lines = re.split(r"(?=•)", content)
            for cl in content_lines:
                cl = cl.strip()
                if cl:
                    # Convert • to - for markdown consistency
                    if cl.startswith("•"):
                        cl = "-" + cl[1:]
                    out.append(cl)
            i += 1
            continue

        # --- Clean HTML line breaks ---
        line = line.replace("<br>", "")

        # --- Convert • bullets to - ---
        if stripped.startswith("•"):
            line = re.sub(r"^(\s*)•", r"\1-", line)

        out.append(line)
        i += 1

    # Clean up trailing blank lines
    while out and out[-1].strip() == "":
        out.pop()

    # Normalize multiple blank lines
    result = "\n".join(out)
    result = re.sub(r"\n{4,}", "\n\n\n", result)

    # Clean orphaned bold markers at start of content lines after heading splits
    # e.g. "The Disillusioned Seer** — once entranced..." -> "**The Disillusioned Seer** — once entranced..."
    result = re.sub(r"^([A-Z][^*\n]{1,60})\*\*(\s*[—–-])", r"**\1**\2", result, flags=re.MULTILINE)

    # Clean lines starting with stray closing bold (no opening bold on that line)
    # e.g. "Distribution Vectors:** content" -> "**Distribution Vectors:** content"
    result = re.sub(r"^(\*\*)(?=[A-Z])", r"**", result, flags=re.MULTILINE)

    # Ensure file ends with newline
    return result + "\n"


def process_all():
    if not REPORTS_DIR.exists():
        print(f"Reports directory not found: {REPORTS_DIR}")
        return

    count = 0
    for md_file in sorted(REPORTS_DIR.rglob("*.md")):
        # Skip hidden directories
        if any(part.startswith(".") for part in md_file.relative_to(REPORTS_DIR).parts):
            continue

        original = md_file.read_text(encoding="utf-8")
        normalized = normalize_report(original)

        if normalized != original:
            md_file.write_text(normalized, encoding="utf-8")
            count += 1

    print(f"Normalized {count} files")


if __name__ == "__main__":
    process_all()
