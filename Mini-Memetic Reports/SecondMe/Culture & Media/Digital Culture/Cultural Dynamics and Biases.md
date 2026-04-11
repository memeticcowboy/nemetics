# Cultural Dynamics and Biases in Large Language Model Training and Inference Personas

Created at 2025/11/18 4:58 PM

**Section 6 — Cultural Triumph of the Terminally Online**

Cowboy’s Intro<br>In the main piece, I said: “The median voice in the dataset is a 23-year-old shitposter.”<br>Now that’s a meme with legs — but the truth walks on two legs:

- Models ingest far more than shitposts
- But the persona summoned at inference is often the shitposter
- Because that persona maximizes engagement

So let’s separate training distribution from inference behavior.

**6.1 — Distribution vs. Persona**<br>Pretraining includes:

- academic text
- coding
- books
- multilingual data

But inference persona depends on:

- prompt context
- conversational modality
- user expectations
- engagement patterns

Thus models “know Shakespeare,” but engagement summons the troll.<br>This corresponds to your earlier analysis in The Drift of Tongue on “Algorithmic lexicon” drift.^4 <br>Comprehensive surveys of LLM pretraining corpora reveal that datasets like C4 (derived from CommonCrawl) and RefinedWeb comprise primarily web-scraped content (70–90%), with books and academic materials contributing 5–15% of tokens, leading to tonal skews toward informal, youth-oriented discourse despite diverse inclusions.^1 Critical analyses of CommonCrawl highlight demographic imbalances, such as overrepresentation of English-language social media from urban demographics (ages 18–34 at ~40% inferred from platform origins), which propagate into filtered subsets like RefinedWeb and C4.^2

**6.2 — Proposed Corpus Histogram**<br>Later, with research mode, sample:

- 10k tokens from the pretraining mix
- classify by age, tone, platform, domain

This produces a measurable skew index. Studies on data combinations, such as SlimPajama-DC, demonstrate through token-level histograms that web sources (e.g., CommonCrawl/C4) exhibit 2–3x higher proportions of ironic/snarky tone compared to books or academic texts, validating the feasibility and value of such diagnostics for uncovering inference biases.^3

***

**Citations**

1. Hao Yu et al., “Datasets for Large Language Models: A Comprehensive Survey,” *Artificial Intelligence Review* 58, no. 11403 (2025): 1–45, [https://doi.org/10.1007/s10462-025-11403-7](https://doi.org/10.1007/s10462-025-11403-7).
2. Kushal Chawla et al., “A Critical Analysis of the Largest Source for Generative AI Training Data: Common Crawl,” in *Proceedings of the 2024 ACM Conference on Fairness, Accountability, and Transparency* (New York: Association for Computing Machinery, 2024), 148:1–148:12, [https://doi.org/10.1145/3630106.3658983](https://doi.org/10.1145/3630106.3658983).
3. Shubham Misra et al., “SlimPajama-DC: Understanding Data Combinations for LLM Training,” arXiv preprint arXiv:2309.10818 (2023), [https://arxiv.org/abs/2309.10818](https://arxiv.org/abs/2309.10818).
4. Memetic Cowboy, *The Drift of the Tongue: AI, Memes, and the Quiet Rewriting of Voice* (Substack, 2025). https://memeticcowboy.substack.com/p/the-drift-of-the-tongue-ai-memes

