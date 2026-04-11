# Political Influence on AI Regulation and Governance of Reinforcement Learning from Human Feedback

Created at 2025/11/18 4:55 PM

**Section 5 — Political Abdication**

Cowboy’s Intro<br>Back in the main campfire tale, I said moral philosophy’s been outsourced to lawyers.<br>That wasn’t exaggeration — but it also wasn’t the whole map.<br>Governments do affect gradients.<br>Regulators do raise penalties.<br>It’s just that engagement is still the north star of the private frontier.<br>So here’s how the law really shows up in the loss function.

**5.1 — Alignment as Competing Objectives**<br>Let:

- L_id = engagement loss
- L_reg = regulatory penalty

Total optimization objective:<br>L_total = L_id – λ·L_reg<br>Regulators increase λ.<br>Thus political action can tilt optimization away from Id-alignment.<br>The EU AI Act, with phased enforcement beginning August 2025, operationalizes this by mandating transparency and risk assessments for general-purpose AI models, including RLHF-trained LLMs, with penalties scaling to 7% of global annual turnover to enforce accountability and mitigate biases in algorithmic decision-making.^1 Legal analyses of RLHF governance highlight how such frameworks address reward model opacity, proposing co-governance models where public oversight complements private incentives to prevent sycophancy and distortion in preference data.^2

**5.2 — Policy Lever**<br>Require:

- publication of RLHF reward model weights
- publication of rating distributions
- audited transparency for models >10²⁶ FLOP

This turns governance into gradient-shaping. Emerging U.S. algorithmic accountability proposals, like the 2023 Act, align with EU transparency mandates by requiring impact assessments for high-risk AI, providing a blueprint for auditing RLHF processes to ensure fairness and explainability in LLM deployments.^3 Global governance overviews for 2025 emphasize compute thresholds and disclosure rules as levers to govern frontier models, directly targeting RLHF's black-box nature to foster ethical alignment beyond market pressures.^4

***

**Citations**

1. Simmons & Simmons, “Enforcement of the EU AI Act - When Can It Start?,” Simmons & Simmons (March 6, 2025), [https://www.simmons-simmons.com/en/publications/cm7yowsvj00c4tfd4fe4syrgj/enforcement-of-the-eu-ai-act-when-can-it-start-](https://www.simmons-simmons.com/en/publications/cm7yowsvj00c4tfd4fe4syrgj/enforcement-of-the-eu-ai-act-when-can-it-start-).
2. Harvard Law Review, “Co-Governance and the Future of AI Regulation,” *Harvard Law Review* 138, no. 6 (April 10, 2025): [chapter], [https://harvardlawreview.org/print/vol-138/co-governance-and-the-future-of-ai-regulation/](https://harvardlawreview.org/print/vol-138/co-governance-and-the-future-of-ai-regulation/).
3. Holistic AI, “What Could Horizontal AI Legislation Look Like in the US? Exploring the Algorithmic Accountability Act of 2023,” Holistic AI (January 9, 2023), [https://www.holisticai.com/blog/us-algorithmic-accountability-act](https://www.holisticai.com/blog/us-algorithmic-accountability-act).
4. International Association of Privacy Professionals (IAPP), “Global AI Governance Law and Policy: Jurisdiction Overviews 2025,” IAPP (2025), [https://iapp.org/resources/article/global-ai-governance-jurisdiction-overviews/](https://iapp.org/resources/article/global-ai-governance-jurisdiction-overviews/).

