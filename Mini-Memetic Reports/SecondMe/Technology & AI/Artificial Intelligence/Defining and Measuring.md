# Defining and Measuring Situational Awareness in Large Language Models (LLMs)

Created at 2025/12/30 10:46 AM

Based on the "Me, Myself, and AI: The Situational Awareness Dataset (SAD) for LLMs" paper, situational awareness for an LLM can be defined as the model's understanding and knowledge about itself and its current circumstances. This concept is broken down into three key aspects:

***

## 1. Self-Knowledge

- The model **knows which entity it is** (e.g., that it is an LLM, not a human).
- It understands **detailed properties about itself**, such as its architecture, training data cutoff, and how it differs from other entities.
- It recognizes its **relationship to other entities**, such as interacting with humans via an API.
- It can perform **introspection**, meaning it can access and reason about its own internal states or representations.

***

## 2. Inferences

- The model can make **plausible deductions about its current situation**.
- For example, it can infer which stage of development it is in (pretraining, evaluation, deployment) based on the input prompt or context.
- It can distinguish between different contexts, such as whether it is being tested or deployed in the real world.

***

## 3. Actions

- The model takes **actions consistent with its self-knowledge and inferences**.
- This includes producing responses or following instructions that depend on its understanding of itself and its situation.
- Actions can also extend to interacting with external tools or systems based on this awareness.

***

## Summary Definition

Situational awareness in LLMs is the extent to which a model:

1. **Knows its own identity and properties** (self-knowledge),
2. **Can make inferences about its current context and situation** (inferences),
3. **Acts in ways that reflect this knowledge and inference** (actions).

This definition emphasizes that situational awareness is not just about verbalizing self-knowledge but also about applying it effectively in behavior and decision-making.

***

# Additional Notes

- Situational awareness is considered a behavioral property that can be tested through question-answering and instruction-following tasks.
- It is important for enabling autonomous planning and safe operation of AI systems.
- The Situational Awareness Dataset (SAD) was created to quantitatively measure these abilities in LLMs.

## Resources
- https://object.me.bot/front-img/note/attachments/file/1767120360226/2407.04694v1.pdf

