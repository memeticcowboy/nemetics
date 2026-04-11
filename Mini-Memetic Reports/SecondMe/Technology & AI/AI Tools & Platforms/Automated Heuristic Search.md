# Automated Heuristic Search Design

Created at 2024/07/20 3:23 PM

This editorial introduces a special issue on automating the design and assessment of heuristic search methods. It covers topics like parameter tuning, algorithm configuration, and performance evaluation, featuring five papers that explore various aspects of improving heuristic optimization techniques. Main areas of research:  Automated parameter tuning Algorithmic component configuration Heuristic generation Experimental analysis of computational systems Machine learning in heuristic optimization Meta-modeling approaches Adaptive memetic algorithms Hyper-heuristics Sequential Parameter Optimization (SPO) Resampling methods for meta-model validation

## Resources
- https://frontdoorcdn.mindverse.ai/mindos-resource/front-img/note/attachments/file/1721514180786/MIT-Press-evco_e_00071.pdf

## Insight
This editorial introduces a special issue focused on automating the design and assessment of heuristic search methods. It highlights the need for automated tools to assist in tuning, designing, and assessing heuristic optimization methods. The issue features five papers that delve into various aspects of improving heuristic optimization techniques, including parameter tuning, algorithm configuration, and performance evaluation. If you're working on optimization problems, consider leveraging automated tools and techniques discussed here to enhance your heuristic search methods. Now, let's dive into the detailed breakdown of the key topics covered.

**🔧 Automated Parameter Tuning**
- **Key Processes**: Tuning, configuring, and generating are identified as the main processes in automated heuristic design.
- **Machine Learning Applications**: Machine learning, meta-modelling, and multilevel search approaches are applied to automate these processes.
- **Self-* Search**: The term 'Self-* Search' was introduced, now a track in GECCO, focusing on self-tuning, self-configuring, and self-generating search heuristics.

**🧩 Algorithmic Component Configuration**
- **Adaptive Memetic Algorithms**: These algorithms autonomously guide the choice of operators during the search, focusing on local search heuristics.
- **Selective Hyper-Heuristics**: These adaptively select different types of heuristics, requiring mechanisms for assigning rewards based on past performance.
- **Adaptive Operator Selection**: Studied within the evolutionary computation community, focusing on assigning credit to search operators.

**📊 Performance Evaluation**
- **Sequential Parameter Optimization (SPO)**: An established framework that uses meta models to guide the search and improve knowledge about the search space.
- **Response Transformations**: Transformations like rank and Box-Cox are used to improve the properties of result distributions in SPO.
- **Resampling Methods**: Basic resampling methods from statistics are discussed for meta-model validation, highlighting their advantages and pitfalls.

**🔍 Experimental Analysis**
- **Experimental Methods**: Emphasizes the need for appropriate experimental methods to draw objective conclusions from computational experiments.
- **Data Collection**: Profitable ways of looking into collected data can improve the design and configuration of computational systems.
- **Visualization Tools**: Heatmaps and parameterized difference plots are suggested for the experimental analysis of non-deterministic optimization algorithms.

**📚 Featured Papers**
- **Estimating Meme Fitness**: Studies the assignment of credit to search operators, finding that local reward schemes outperform global ones in combinatorial spaces.
- **Hyper-Heuristics with Low-Level Parameter Adaptation**: Incorporates a mechanism for adapting the parameters of low-level heuristics, improving efficiency.
- **Effect of Response Transformations**: Enhances SPO by introducing transformation steps before modeling, significantly improving result distributions.
- **Resampling Methods for Meta-Model Validation**: Summarizes resampling methods and discusses their application in evolutionary algorithms.
- **Comparison of Continuous Metaheuristics**: Extends previous work on problem generators, comparing different evolutionary algorithms on various landscapes.


