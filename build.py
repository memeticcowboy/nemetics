#!/usr/bin/env python3
"""
Nemetics Site Builder
=====================
Converts all markdown content in this repository into styled HTML pages.

Usage:
    python3 build.py              # Build to ./site/
    python3 build.py --output DIR # Build to custom directory
    python3 build.py --serve      # Build and serve locally on port 8000
"""

import argparse
import http.server
import os
import re
import shutil
import socketserver
import sys
import textwrap
import yaml
from pathlib import Path

import jinja2
import markdown

# ── Configuration ──────────────────────────────────────────────

ROOT = Path(__file__).parent.resolve()
TEMPLATES_DIR = ROOT / "templates"
DEFAULT_OUTPUT = ROOT / "site"

MARKDOWN_EXTENSIONS = [
    "tables",
    "fenced_code",
    "codehilite",
    "toc",
    "attr_list",
    "md_in_html",
    "smarty",
]

MARKDOWN_EXT_CONFIGS = {
    "codehilite": {"css_class": "highlight", "guess_lang": False},
    "toc": {"permalink": False},
}

# Sections to build, in order: (source_dir, output_subdir, section_key, title, description)
ECOLOGY_SUBDIRS = [
    ("0_Ω_GROUND", "0-omega-ground", "Ω Ground", "Raw residues, omega undifferentiated attention"),
    ("1_HABITAT_IT-FIELD", "1-habitat-it-field", "It-Field", "Pre-habitat source field"),
    ("2_HABITAT_I-TUBE", "2-habitat-i-tube", "I-Tube", "First-person perceptual habitat"),
    ("3_HABITAT_MY-STREAM", "3-habitat-my-stream", "My-Stream", "Temporal-affective patterns"),
    ("4_HABITAT_WE-SPHERE", "4-habitat-we-sphere", "We-Sphere", "Intersubjective coordination"),
    ("5_HABITAT_THREADPLEX", "5-habitat-threadplex", "Threadplex", "Distributed ecology"),
    ("6_LATTICE", "6-lattice", "Lattice", "Memory, habit, scale structures"),
    ("7_OTHER-SPHERE", "7-other-sphere", "Other-Sphere", "Relational alterity"),
    ("8_REGIMES", "8-regimes", "Regimes", "Operators — Ω, χ, Q, Ψ, Z"),
    ("9_WORLD-STATES", "9-world-states", "World-States", "Global coordination topology"),
    ("10_INSIGHTS", "10-insights", "Insights", "Pattern recognition, synthesis"),
    ("11-BOW-TIE", "11-bow-tie", "Bow-Tie", "Compression/expansion cycle architecture"),
    ("12-SELFMESH", "12-selfmesh", "Selfmesh", "Self-referential mesh dynamics"),
    ("13-ELEMENTAL_DAEMONS", "13-elemental-daemons", "Elemental Daemons", "Seven processing regimes"),
]


# ── Helpers ────────────────────────────────────────────────────

def slugify(text: str) -> str:
    """Convert text to a URL-friendly slug."""
    text = text.lower().strip()
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"[\s_]+", "-", text)
    text = re.sub(r"-+", "-", text)
    return text.strip("-")


def parse_front_matter(content: str) -> tuple[dict, str]:
    """Extract YAML front matter from markdown content."""
    if content.startswith("---"):
        parts = content.split("---", 2)
        if len(parts) >= 3:
            try:
                meta = yaml.safe_load(parts[1]) or {}
                return meta, parts[2].strip()
            except yaml.YAMLError:
                pass
    return {}, content


def extract_title(md_content: str, filename: str = "") -> str:
    """Extract the first H1 from markdown, or derive from filename."""
    match = re.search(r"^#\s+(.+)$", md_content, re.MULTILINE)
    if match:
        return match.group(1).strip()
    # Derive from filename
    name = Path(filename).stem
    name = re.sub(r"^\d{4}-\d{2}-\d{2}_?", "", name)  # Strip date prefix
    return name.replace("_", " ").replace("-", " ").title()


def extract_date(md_content: str, filename: str = "") -> str:
    """Extract date from content or filename."""
    # From filename pattern YYYY-MM-DD
    match = re.search(r"(\d{4}-\d{2}-\d{2})", filename)
    if match:
        return match.group(1)
    # From content
    match = re.search(r"\*\*Date:\*\*\s*(\d{4}-\d{2}-\d{2})", md_content)
    if match:
        return match.group(1)
    return ""


def extract_excerpt(md_content: str, max_length: int = 200) -> str:
    """Extract a plain-text excerpt from markdown content."""
    # Skip the title line
    lines = md_content.split("\n")
    text_lines = []
    for line in lines:
        stripped = line.strip()
        # Skip headings, metadata, empty lines, code fences, separators
        if stripped.startswith("#"):
            continue
        if stripped.startswith("**Date:") or stripped.startswith("**SIML") or stripped.startswith("**Source:") or stripped.startswith("**Status:"):
            continue
        if stripped.startswith("---") or stripped.startswith("```") or stripped.startswith("|"):
            continue
        if not stripped:
            continue
        # Clean markdown formatting
        clean = re.sub(r"\*\*(.+?)\*\*", r"\1", stripped)
        clean = re.sub(r"\*(.+?)\*", r"\1", clean)
        clean = re.sub(r"\[(.+?)\]\(.+?\)", r"\1", clean)
        clean = re.sub(r"`(.+?)`", r"\1", clean)
        clean = re.sub(r"^>\s*", "", clean)
        text_lines.append(clean)
        if len(" ".join(text_lines)) > max_length:
            break

    text = " ".join(text_lines)
    if len(text) > max_length:
        text = text[:max_length].rsplit(" ", 1)[0] + "..."
    return text


def extract_definition(md_content: str) -> str:
    """Extract the bold definition line from a glossary term."""
    match = re.search(r"\*\*(.+?)\*\*", md_content)
    if match:
        return match.group(1)
    return ""


def strip_leading_heading(md_content: str) -> str:
    """Remove the first H1 heading from markdown (since we display it in the page header)."""
    lines = md_content.split("\n")
    result = []
    found_h1 = False
    for line in lines:
        if not found_h1 and re.match(r"^#\s+", line):
            found_h1 = True
            continue
        result.append(line)
    return "\n".join(result).strip()


def md_to_html(md_content: str, strip_title: bool = True) -> str:
    """Convert markdown to HTML."""
    if strip_title:
        md_content = strip_leading_heading(md_content)
    md = markdown.Markdown(
        extensions=MARKDOWN_EXTENSIONS,
        extension_configs=MARKDOWN_EXT_CONFIGS,
    )
    return md.convert(md_content)


def relative_root(from_path: str) -> str:
    """Calculate relative path back to root from a given output path."""
    depth = from_path.count("/")
    if depth == 0:
        return "./"
    return "../" * depth


# ── Builder ────────────────────────────────────────────────────

class SiteBuilder:
    def __init__(self, output_dir: Path):
        self.output_dir = output_dir
        self.env = jinja2.Environment(
            loader=jinja2.FileSystemLoader(str(TEMPLATES_DIR)),
            autoescape=False,
        )
        self.stats = {"pages": 0, "sections": []}

    def render(self, template_name: str, output_path: str, **context):
        """Render a template to an output file."""
        tmpl = self.env.get_template(template_name)
        # Add root_path for asset references
        context["root_path"] = relative_root(output_path)
        html = tmpl.render(**context)
        full_path = self.output_dir / output_path
        full_path.parent.mkdir(parents=True, exist_ok=True)
        full_path.write_text(html, encoding="utf-8")
        self.stats["pages"] += 1

    def copy_assets(self):
        """Copy CSS to output directory."""
        css_src = TEMPLATES_DIR / "style.css"
        css_dst = self.output_dir / "style.css"
        shutil.copy2(css_src, css_dst)

    def build_blog(self) -> list[dict]:
        """Build all blog posts and return metadata for index."""
        blog_dir = ROOT / "blog"
        posts = []

        for md_file in sorted(blog_dir.glob("*.md"), reverse=True):
            raw = md_file.read_text(encoding="utf-8")
            front_matter, body = parse_front_matter(raw)
            title = extract_title(body, md_file.name)
            date = extract_date(body, md_file.name)
            excerpt = extract_excerpt(body)
            html_content = md_to_html(body)
            slug = slugify(md_file.stem)
            output_path = f"blog/{slug}.html"

            meta_tags = []
            if date:
                meta_tags.append(date)

            breadcrumbs = [
                {"label": "Home", "url": relative_root(output_path) + "index.html"},
                {"label": "Blog", "url": "index.html"},
                {"label": title, "url": None},
            ]

            self.render("page.html", output_path,
                        title=title, content=html_content, meta=meta_tags,
                        breadcrumbs=breadcrumbs, active_section="blog")

            posts.append({
                "title": title,
                "date": date,
                "excerpt": excerpt,
                "url": f"{slug}.html",
            })

        # Build blog index
        self.render("blog_index.html", "blog/index.html",
                    posts=posts, active_section="blog")

        return posts

    def build_papers(self) -> list[dict]:
        """Build all papers and return metadata for index."""
        papers_dir = ROOT / "Papers"
        papers = []

        for paper_file in sorted(papers_dir.iterdir()):
            if paper_file.name.startswith("."):
                continue
            if paper_file.suffix.lower() not in ("", ".md", ".txt"):
                continue
            if not paper_file.is_file():
                continue
            raw = paper_file.read_text(encoding="utf-8")
            front_matter, body = parse_front_matter(raw)
            title = extract_title(body, paper_file.name)
            excerpt = extract_excerpt(body)
            html_content = md_to_html(body)
            slug = slugify(paper_file.stem)
            output_path = f"papers/{slug}.html"

            breadcrumbs = [
                {"label": "Home", "url": relative_root(output_path) + "index.html"},
                {"label": "Papers", "url": "index.html"},
                {"label": title, "url": None},
            ]

            self.render("page.html", output_path,
                        title=title, content=html_content,
                        breadcrumbs=breadcrumbs, active_section="papers")

            papers.append({
                "title": title,
                "excerpt": excerpt,
                "url": f"{slug}.html",
            })

        # Build papers index
        self.render("paper_index.html", "papers/index.html",
                    papers=papers, active_section="papers")

        return papers

    def build_glossary(self) -> list[dict]:
        """Build all glossary terms and return metadata for index."""
        glossary_dir = ROOT / "Glossary"
        terms = []

        for md_file in sorted(glossary_dir.rglob("*.md")):
            # Skip README and top-level special files
            if md_file.name.lower() == "readme.md":
                continue
            if md_file.name == "tertiary_emergence_top_10.md":
                # Include as a regular page
                pass

            raw = md_file.read_text(encoding="utf-8")
            front_matter, body = parse_front_matter(raw)
            title = front_matter.get("term", extract_title(body, md_file.name))
            category = front_matter.get("category", "")
            definition = extract_definition(body)
            html_content = md_to_html(body)
            slug = slugify(md_file.stem)
            output_path = f"glossary/{slug}.html"

            breadcrumbs = [
                {"label": "Home", "url": relative_root(output_path) + "index.html"},
                {"label": "Glossary", "url": "index.html"},
                {"label": title, "url": None},
            ]

            self.render("page.html", output_path,
                        title=title, content=html_content,
                        breadcrumbs=breadcrumbs, active_section="glossary")

            terms.append({
                "title": title,
                "definition": definition,
                "category": category,
                "url": f"{slug}.html",
                "letter": title[0].upper() if title and title[0].isalpha() else "#",
            })

        # Group by first letter
        terms.sort(key=lambda t: t["title"].lower())
        grouped = {}
        for term in terms:
            letter = term["letter"]
            grouped.setdefault(letter, []).append(term)

        grouped_list = sorted(grouped.items())

        # Build glossary index
        self.render("glossary_index.html", "glossary/index.html",
                    grouped_terms=grouped_list, active_section="glossary")

        return terms

    def _build_directory(self, src_dir: Path, output_prefix: str,
                         section_key: str, breadcrumb_base: list[dict],
                         active: str) -> list[dict]:
        """Build all markdown files in a directory, recursively."""
        pages = []
        if not src_dir.exists():
            return pages

        for md_file in sorted(src_dir.glob("*.md")):
            if md_file.name.lower() == "readme.md":
                continue
            raw = md_file.read_text(encoding="utf-8")
            front_matter, body = parse_front_matter(raw)
            title = extract_title(body, md_file.name)
            excerpt = extract_excerpt(body)
            html_content = md_to_html(body)
            slug = slugify(md_file.stem)
            output_path = f"{output_prefix}/{slug}.html"

            breadcrumbs = breadcrumb_base + [{"label": title, "url": None}]

            self.render("page.html", output_path,
                        title=title, content=html_content,
                        breadcrumbs=breadcrumbs, active_section=active)

            pages.append({
                "title": title,
                "excerpt": excerpt,
                "url": f"{slug}.html",
            })

        # Also process subdirectories
        for subdir in sorted(src_dir.iterdir()):
            if subdir.is_dir() and not subdir.name.startswith("."):
                sub_slug = slugify(subdir.name)
                sub_prefix = f"{output_prefix}/{sub_slug}"
                sub_breadcrumbs = breadcrumb_base + [
                    {"label": subdir.name.replace("_", " ").title(), "url": f"{sub_slug}/index.html"}
                ]
                sub_pages = self._build_directory(
                    subdir, sub_prefix, section_key,
                    sub_breadcrumbs, active
                )
                if sub_pages:
                    # Create sub-index
                    sub_title = subdir.name.replace("_", " ").title()
                    readme = subdir / "README.md"
                    readme_html = ""
                    if readme.exists():
                        _, rbody = parse_front_matter(readme.read_text(encoding="utf-8"))
                        readme_html = md_to_html(rbody)

                    self.render("section_index.html", f"{sub_prefix}/index.html",
                                title=sub_title, pages=sub_pages, subdirs=[],
                                readme_content=readme_html, active_section=active,
                                breadcrumbs=sub_breadcrumbs[:-1] + [{"label": sub_title, "url": None}])

        return pages

    def build_ecology(self):
        """Build the memetic ecology section."""
        eco_dir = ROOT / "memetic_ecology"

        # Build canonical legend and quick reference as top-level pages
        top_pages = []
        for fname in ["CANONICAL_LEGEND.md", "habitats_quick_reference.md"]:
            fpath = eco_dir / fname
            if fpath.exists():
                raw = fpath.read_text(encoding="utf-8")
                _, body = parse_front_matter(raw)
                title = extract_title(body, fname)
                excerpt = extract_excerpt(body)
                html_content = md_to_html(body)
                slug = slugify(fpath.stem)
                output_path = f"memetic-ecology/{slug}.html"

                breadcrumbs = [
                    {"label": "Home", "url": relative_root(output_path) + "index.html"},
                    {"label": "Memetic Ecology", "url": "index.html"},
                    {"label": title, "url": None},
                ]
                self.render("page.html", output_path,
                            title=title, content=html_content,
                            breadcrumbs=breadcrumbs, active_section="ecology")
                top_pages.append({
                    "title": title,
                    "excerpt": excerpt,
                    "url": f"{slug}.html",
                })

        # Build subdirectories
        subdirs_meta = []
        for src_name, out_name, label, desc in ECOLOGY_SUBDIRS:
            src = eco_dir / src_name
            if not src.exists():
                continue

            prefix = f"memetic-ecology/{out_name}"
            breadcrumb_base = [
                {"label": "Home", "url": "../../index.html"},
                {"label": "Memetic Ecology", "url": "../index.html"},
                {"label": label, "url": "index.html"},
            ]

            pages = self._build_directory(src, prefix, out_name, breadcrumb_base, "ecology")

            # Read README if present
            readme = src / "README.md"
            readme_html = ""
            if readme.exists():
                _, rbody = parse_front_matter(readme.read_text(encoding="utf-8"))
                readme_html = md_to_html(rbody)

            if pages or readme_html:
                self.render("section_index.html", f"{prefix}/index.html",
                            title=label, description=desc,
                            pages=pages, subdirs=[],
                            readme_content=readme_html,
                            active_section="ecology",
                            breadcrumbs=[
                                {"label": "Home", "url": "../../index.html"},
                                {"label": "Memetic Ecology", "url": "../index.html"},
                                {"label": label, "url": None},
                            ])

                subdirs_meta.append({
                    "title": label,
                    "description": desc,
                    "url": f"{out_name}/index.html",
                })

        # Build ecology index
        readme = eco_dir / "CANONICAL_LEGEND.md"
        readme_html = ""
        if readme.exists():
            _, rbody = parse_front_matter(readme.read_text(encoding="utf-8"))
            # Only use the first section as intro
            intro_lines = []
            for line in rbody.split("\n"):
                if line.startswith("## ") and intro_lines:
                    break
                intro_lines.append(line)
            readme_html = md_to_html("\n".join(intro_lines))

        self.render("section_index.html", "memetic-ecology/index.html",
                    title="Memetic Ecology",
                    description="Habitat-based diagnostic framework for pattern circulation, binding, and world-state emergence.",
                    pages=top_pages, subdirs=subdirs_meta,
                    readme_content=readme_html,
                    active_section="ecology",
                    breadcrumbs=[
                        {"label": "Home", "url": "../index.html"},
                        {"label": "Memetic Ecology", "url": None},
                    ])

    def build_ifprime(self):
        """Build the IF-Prime section."""
        ifp_dir = ROOT / "IF-PRIME"
        pages = []

        breadcrumb_base = [
            {"label": "Home", "url": "../../index.html" if False else "../index.html"},
            {"label": "IF-Prime", "url": "index.html"},
        ]

        for md_file in sorted(ifp_dir.rglob("*.md")):
            if md_file.name.lower() == "readme.md" and md_file.parent == ifp_dir:
                continue
            raw = md_file.read_text(encoding="utf-8")
            _, body = parse_front_matter(raw)
            title = extract_title(body, md_file.name)
            excerpt = extract_excerpt(body)
            html_content = md_to_html(body)
            slug = slugify(md_file.stem)
            output_path = f"if-prime/{slug}.html"

            breadcrumbs = [
                {"label": "Home", "url": relative_root(output_path) + "index.html"},
                {"label": "IF-Prime", "url": "index.html"},
                {"label": title, "url": None},
            ]
            self.render("page.html", output_path,
                        title=title, content=html_content,
                        breadcrumbs=breadcrumbs, active_section="if-prime")
            pages.append({
                "title": title,
                "excerpt": excerpt,
                "url": f"{slug}.html",
            })

        # Read main README for section intro
        readme = ifp_dir / "README.md"
        readme_html = ""
        if readme.exists():
            _, rbody = parse_front_matter(readme.read_text(encoding="utf-8"))
            readme_html = md_to_html(rbody)

        self.render("section_index.html", "if-prime/index.html",
                    title="IF-Prime — Infomorphic Field Theory",
                    description="Formal mathematical foundation for substrate-independent information patterns.",
                    pages=pages, subdirs=[], readme_content=readme_html,
                    active_section="if-prime",
                    breadcrumbs=[
                        {"label": "Home", "url": "../index.html"},
                        {"label": "IF-Prime", "url": None},
                    ])

    def build_knowledge(self):
        """Build the knowledge section."""
        know_dir = ROOT / "KNOWLEDGE"
        pages = []

        for md_file in sorted(know_dir.rglob("*.md")):
            raw = md_file.read_text(encoding="utf-8")
            _, body = parse_front_matter(raw)
            title = extract_title(body, md_file.name)
            excerpt = extract_excerpt(body)
            html_content = md_to_html(body)
            slug = slugify(md_file.stem)
            output_path = f"knowledge/{slug}.html"

            breadcrumbs = [
                {"label": "Home", "url": relative_root(output_path) + "index.html"},
                {"label": "Knowledge", "url": "index.html"},
                {"label": title, "url": None},
            ]
            self.render("page.html", output_path,
                        title=title, content=html_content,
                        breadcrumbs=breadcrumbs, active_section="knowledge")
            pages.append({
                "title": title,
                "excerpt": excerpt,
                "url": f"{slug}.html",
            })

        # Philosophical connections
        phil_dir = ROOT / "PHILOSOPHICAL_CONNECTIONS"
        if phil_dir.exists():
            for md_file in sorted(phil_dir.rglob("*.md")):
                raw = md_file.read_text(encoding="utf-8")
                _, body = parse_front_matter(raw)
                title = extract_title(body, md_file.name)
                excerpt = extract_excerpt(body)
                html_content = md_to_html(body)
                slug = slugify(md_file.stem)
                output_path = f"knowledge/{slug}.html"

                breadcrumbs = [
                    {"label": "Home", "url": relative_root(output_path) + "index.html"},
                    {"label": "Knowledge", "url": "index.html"},
                    {"label": title, "url": None},
                ]
                self.render("page.html", output_path,
                            title=title, content=html_content,
                            breadcrumbs=breadcrumbs, active_section="knowledge")
                pages.append({
                    "title": title,
                    "excerpt": excerpt,
                    "url": f"{slug}.html",
                })

        self.render("section_index.html", "knowledge/index.html",
                    title="Knowledge",
                    description="Core models, daily cycles, and philosophical connections.",
                    pages=pages, subdirs=[], readme_content="",
                    active_section="knowledge",
                    breadcrumbs=[
                        {"label": "Home", "url": "../index.html"},
                        {"label": "Knowledge", "url": None},
                    ])

    def build(self):
        """Run the full build."""
        print(f"Building site to {self.output_dir}/")

        # Clean output
        if self.output_dir.exists():
            shutil.rmtree(self.output_dir)
        self.output_dir.mkdir(parents=True)

        # Copy assets
        self.copy_assets()

        # Build all sections
        posts = self.build_blog()
        papers = self.build_papers()
        terms = self.build_glossary()
        self.build_ecology()
        self.build_ifprime()
        self.build_knowledge()

        # Build main index
        self.render("index.html", "index.html",
                    blog_count=len(posts),
                    paper_count=len(papers),
                    glossary_count=len(terms),
                    wide=True)

        print(f"\nBuild complete: {self.stats['pages']} pages generated.")
        print(f"  Blog posts:    {len(posts)}")
        print(f"  Papers:        {len(papers)}")
        print(f"  Glossary:      {len(terms)}")
        print(f"  Output:        {self.output_dir}/")


# ── CLI ────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="Build the Nemetics static site")
    parser.add_argument("--output", "-o", type=Path, default=DEFAULT_OUTPUT,
                        help="Output directory (default: ./site/)")
    parser.add_argument("--serve", "-s", action="store_true",
                        help="Serve the site locally after building")
    parser.add_argument("--port", "-p", type=int, default=8000,
                        help="Port for local server (default: 8000)")
    args = parser.parse_args()

    builder = SiteBuilder(args.output)
    builder.build()

    if args.serve:
        os.chdir(args.output)
        handler = http.server.SimpleHTTPRequestHandler
        with socketserver.TCPServer(("", args.port), handler) as httpd:
            print(f"\nServing at http://localhost:{args.port}/")
            print("Press Ctrl+C to stop.")
            try:
                httpd.serve_forever()
            except KeyboardInterrupt:
                print("\nStopped.")


if __name__ == "__main__":
    main()
