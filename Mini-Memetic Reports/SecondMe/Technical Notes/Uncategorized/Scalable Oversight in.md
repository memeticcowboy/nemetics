# Scalable Oversight in Hierarchical Reinforcement Learning: The Yan-Lipton Framework

Created at 2025/10/14 10:37 AM

Tom Yan and Zachary Lipton have developed a significant theoretical contribution to AI alignment through their work **"A theoretical case-study of Scalable Oversight in Hierarchical Reinforcement Learning,"** published at NeurIPS 2024. This research addresses one of the most pressing challenges in AI safety: how to maintain effective oversight of increasingly complex AI systems whose outputs may exceed human capacity to evaluate directly.[^1][^2][^3]

## The Core Problem

The fundamental challenge they tackle stems from the growing complexity of next-generation AI models, where **the size of model outputs makes it time-consuming to parse and provide reliable feedback**. As AI systems become more sophisticated, human supervisors face an increasingly difficult task in evaluating and providing meaningful feedback on model behavior. This creates a bottleneck that could undermine AI alignment efforts at scale.[^2][^1]

## Hierarchical Structure as a Solution Entry Point

Yan and Lipton propose that **hierarchical structure is a promising entrypoint into studying how to scale up human feedback**. Their approach leverages goal-conditioned hierarchical reinforcement learning, where they assume human feedback can only be provided for model outputs below a threshold size. This assumption reflects the practical reality that humans have cognitive limitations in processing complex information.[^1][^2]

The hierarchical framework builds on established methods in reinforcement learning, particularly extending concepts from the MAXQ hierarchical RL approach. By decomposing complex tasks into hierarchies of subtasks, the system can potentially make oversight more tractable by focusing human attention on manageable components.[^4][^5][^6]

## Technical Contributions

### Cardinal Feedback Setting

In the cardinal feedback setting, Yan and Lipton develop **an apt sub-MDP reward and algorithm that allows us to acquire and scale up low-level feedback for learning with sublinear regret**. This represents a significant theoretical advance, as sublinear regret bounds are a key benchmark for efficient learning algorithms.[^7][^8][^9][^2][^1]

The cardinal feedback approach allows for more nuanced evaluation than simple binary preferences. Research in this area has shown that **cardinal feedback is also easiest to learn and generalize from** compared to ordinal approaches. By incorporating scalar human feedback, the system can better prioritize high-impact improvements and make more informed decisions about model behavior.[^10][^11][^12]

### Ordinal Feedback Setting

For ordinal feedback scenarios, the researchers **show the necessity of both high- and low-level feedback, and develop a hierarchical experimental design algorithm that efficiently acquires both types of feedback for learning**. This dual-level approach recognizes that effective oversight requires understanding both granular details and broader patterns in AI system behavior.[^2][^1]

The ordinal feedback setting addresses scenarios where humans can more easily make comparative judgments (e.g., "output A is better than output B") rather than providing absolute quality scores. This aligns with research showing that **ordinal comparisons can be more reliable than cardinal ratings in certain contexts**.[^13][^12]

## Broader Context and Significance

### Scalable Oversight Landscape

The Yan-Lipton framework contributes to the broader field of scalable oversight, which encompasses **a set of AI alignment methods aimed at providing effective oversight over AI systems**. Current approaches include Constitutional AI, AI Safety via Debate, Iterated Distillation and Amplification, and reward modeling. The hierarchical approach offers a novel angle by leveraging the structure of tasks themselves to make oversight more manageable.[^14][^15]

### Addressing Human Limitations

Their work explicitly acknowledges that **humans won't be able to reliably judge the output of AI systems much smarter than them**. This is a critical insight for AI safety, as traditional oversight mechanisms may become inadequate as AI capabilities advance. The hierarchical decomposition provides a potential pathway for maintaining meaningful human involvement even as AI systems become more sophisticated.[^15]

### Theoretical Foundations

By **consolidating the foundations of scalable oversight, formalizing and studying the various challenges thereof**, Yan and Lipton's work provides crucial theoretical grounding for the field. Their formal analysis helps establish clear conditions under which hierarchical oversight can be effective and identifies the key trade-offs involved.[^1][^2]

## Research Team Background

**Tom Yan** is a PhD student at Carnegie Mellon University's Machine Learning Department, working under the supervision of Zachary Lipton. His research interests broadly encompass multi-agent learning and ML settings involving multiple players with agency, often motivated by issues at the intersection of AI and Society. His previous work includes contributions to active fairness auditing, strategic machine learning, and human-AI interaction.[^16][^17]

**Zachary Lipton** is the Raj Reddy Associate Professor of Machine Learning at Carnegie Mellon University, where he directs the Approximately Correct Machine Intelligence (ACMI) lab. He is also Chief Technology Officer and Chief Scientist of Abridge, a leading platform for AI-based ambient listening technology in healthcare. His research focuses on the theoretical and engineering foundations of robust and adaptive machine learning algorithms, with particular attention to clinical medicine applications and the societal impact of ML systems.[^18]

## Implications and Future Directions

The Yan-Lipton framework represents an important step toward making AI oversight more scalable and effective. Their theoretical analysis provides a foundation for understanding when and how hierarchical approaches can succeed, while their algorithmic contributions offer concrete methods for implementation.

The work's emphasis on **both cardinal and ordinal feedback** mechanisms provides flexibility for different oversight scenarios, recognizing that the optimal feedback structure may vary depending on the specific application and available human expertise. The **sublinear regret guarantees** they establish are particularly important for practical deployment, as they ensure the system can learn efficiently even with limited oversight.[^11][^10][^2][^1]

As AI systems continue to advance in capability and complexity, frameworks like this will become increasingly critical for maintaining alignment with human values and intentions. The hierarchical approach offers a principled way to decompose complex oversight challenges into more manageable components, potentially preserving meaningful human involvement in AI governance even as systems become more sophisticated.

<span style="display:none">[^19][^20][^21][^22][^23][^24][^25][^26][^27][^28][^29][^30][^31][^32][^33][^34][^35][^36][^37][^38][^39][^40][^41][^42][^43][^44][^45][^46][^47][^48][^49][^50][^51][^52][^53][^54][^55][^56][^57][^58][^59][^60][^61][^62][^63][^64][^65][^66][^67][^68][^69][^70][^71][^72][^73][^74][^75][^76][^77][^78][^79][^80][^81][^82][^83][^84][^85][^86]</span>

<div align="center">⁂</div>

[^1]: https://neurips.cc/virtual/2024/poster/96710

[^2]: https://openreview.net/forum?id=3tj3A26wsV

[^3]: https://proceedings.neurips.cc/paper_files/paper/2024/hash/2ff26b12ade4282de80c2461e447c373-Abstract-Conference.html

[^4]: https://arxiv.org/abs/cs/9905014

[^5]: http://matt.colorado.edu/teaching/RL/readings/dietterich 1998 ICML maxQ.pdf

[^6]: https://arxiv.org/pdf/cs/9905014.pdf

[^7]: https://arxiv.org/abs/2208.05622

[^8]: https://openreview.net/forum?id=Qd0p0bl-A9t

[^9]: http://proceedings.mlr.press/v37/ammar15.pdf

[^10]: https://arxiv.org/html/2508.08486v1

[^11]: https://arxiv.org/abs/2508.08486

[^12]: https://aclanthology.org/P18-1165/

[^13]: https://www.sciencedirect.com/science/article/abs/pii/S0360835224006259

[^14]: https://www.edps.europa.eu/data-protection/technology-monitoring/techsonar/scalable-oversight

[^15]: https://ui.stampy.ai/questions/8EL8/What-is-scalable-oversight

[^16]: https://scholar.google.com/citations?user=x2F1rPkAAAAJ\&hl=en

[^17]: https://tyyan.github.io

[^18]: https://acmilab.org/people/zachary-lipton/

[^19]: https://slideslive.com/s/zachary-lipton-17733

[^20]: https://chatpaper.com/es/chatpaper/paper/81072

[^21]: https://zmy.io/files/sec19-colla.pdf

[^22]: https://dl.acm.org/profile/99659286197

[^23]: https://arxiv.org/html/2404.18976v1

[^24]: https://dl.acm.org/doi/10.5555/3737916.3738774

[^25]: https://blog.ml.cmu.edu/2024/12/02/carnegie-mellon-university-at-neurips-2024/

[^26]: https://slideslive.com/s/tom-yan-43677

[^27]: https://chatpaper.com/zh-CN/chatpaper/paper/81072

[^28]: https://openreview.net/profile?id=~Tom_Yan1

[^29]: https://scholar.google.com.au/citations?user=x2F1rPkAAAAJ\&hl=th

[^30]: https://www.alignmentforum.org/posts/hw2tGSsvLLyjFoLFS/scalable-oversight-and-weak-to-strong-generalization

[^31]: https://arxiv.org/abs/2402.14244

[^32]: https://alignmentsurvey.com/materials/learning/scalable/

[^33]: https://ieeexplore.ieee.org/document/10856553/

[^34]: https://www.alignmentforum.org/posts/6AT4vhYzww56CR6cm/scalable-oversight-as-a-quantitative-rather-than-qualitative

[^35]: https://pmc.ncbi.nlm.nih.gov/articles/PMC7703642/

[^36]: https://www.ias.tu-darmstadt.de/uploads/Team/RiadAkrour/icra18_robert.pdf

[^37]: https://dl.acm.org/profile/99660132416

[^38]: https://openreview.net/forum?id=NGpMCH5q7Y

[^39]: https://www.cs.cmu.edu/calendar/185167700

[^40]: https://bluedot.org/blog/scalable-oversight-intro

[^41]: https://www.reddit.com/r/reinforcementlearning/comments/13d4ic6/what_are_the_limitations_of_hierarchical/

[^42]: https://ml.cmu.edu/people/phd-students

[^43]: https://alignment.anthropic.com/2025/recommended-directions/

[^44]: https://huyenchip.com/2023/05/02/rlhf.html

[^45]: https://proceedings.neurips.cc/paper/2020/file/4a5cfa9281924139db466a8a19291aff-Paper.pdf

[^46]: https://arxiv.org/abs/2506.16336

[^47]: https://www.ijcai.org/Proceedings/15/Papers/493.pdf

[^48]: https://pubmed.ncbi.nlm.nih.gov/38300770/

[^49]: http://www.jmlr.org/papers/volume8/ghavamzadeh07a/ghavamzadeh07a.pdf

[^50]: https://www.scitepress.org/Papers/2025/132389/132389.pdf

[^51]: https://towardsdatascience.com/hierarchical-reinforcement-learning-56add31a21ab/

[^52]: https://proceedings.neurips.cc/paper_files/paper/2023/hash/c5ed2c8acda8c3716b1b6f9c6c713aaa-Abstract-Conference.html

[^53]: https://arxiv.org/html/2504.18794v1

[^54]: https://par.nsf.gov/servlets/purl/10440808

[^55]: https://ieeexplore.ieee.org/iel7/5962385/10877690/10418512.pdf

[^56]: https://pmc.ncbi.nlm.nih.gov/articles/PMC3145918/

[^57]: https://timokaufmann.com/publications/

[^58]: https://arxiv.org/abs/2205.11790

[^59]: http://proceedings.mlr.press/v117/zahavy20a/zahavy20a.pdf

[^60]: https://www.sciencedirect.com/science/article/pii/S0010027725001726

[^61]: https://law-ai.org/the-role-of-compute-thresholds-for-ai-governance/

[^62]: https://jack-clark.net/2025/05/06/import-ai-411-scaling-laws-for-ai-oversight-googles-cyber-threshold-ai-scientists/

[^63]: https://jair.org/index.php/jair/article/download/10266/24463/18857

[^64]: https://arxiv.org/html/2408.11416v1

[^65]: https://arxiv.org/html/2501.05790v1

[^66]: https://papers.nips.cc/paper/1770-state-abstraction-in-maxq-hierarchical-reinforcement-learning

[^67]: https://drl4ir.github.io/paper1.pdf

[^68]: https://cltc.berkeley.edu/wp-content/uploads/2025/02/Intolerable-Risk-Threshold-Recommendations-for-Artificial-Intelligence.pdf

[^69]: https://dl.acm.org/doi/abs/10.5555/1622262.1622268

[^70]: https://www.lesswrong.com/posts/4Tx6ALN8erdgRojkk/quick-thoughts-on-scalable-oversight-super-human-feedback

[^71]: https://icml.cc/Conferences/2008/papers/544.pdf

[^72]: https://www.edps.europa.eu/data-protection/our-work/publications/techdispatch/2025-09-23-techdispatch-22025-human-oversight-automated-making_en

[^73]: https://thegradient.pub/the-promise-of-hierarchical-reinforcement-learning/

[^74]: https://direct.mit.edu/neco/article/26/11/2465/7996/A-Hierarchical-Adaptive-Approach-to-Optimal

[^75]: https://pmc.ncbi.nlm.nih.gov/articles/PMC9098003/

[^76]: https://arxiv.org/html/2503.11705v1

[^77]: https://www.sciencedirect.com/science/article/abs/pii/S0951832008001968

[^78]: https://pmc.ncbi.nlm.nih.gov/articles/PMC11682040/

[^79]: https://arxiv.org/html/2408.14223v1

[^80]: https://arxiv.org/abs/2410.17216

[^81]: https://arxiv.org/html/2506.18932v1

[^82]: https://www.biorxiv.org/content/10.1101/2021.06.29.450439.full

[^83]: https://www.sciencedirect.com/science/article/pii/S0267364924001195

[^84]: https://www3.stat.sinica.edu.tw/statistica/oldpdf/A33n117.pdf

[^85]: https://viterbischool.usc.edu/news/2024/04/making-ai-safe-and-fair/

[^86]: https://arxiv.org/html/2402.14244v2

