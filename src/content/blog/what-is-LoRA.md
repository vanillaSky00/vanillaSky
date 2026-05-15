---
title: "What is LoRA"
date: 2026-04-08
description: "LoRA is a popular PEFT technique for fine-tuning models with fewer trainable parameters."
tags: ["LLM", "Fine-tuning", "LoRA"]
draft: true
---

## Introduction

Before jumping into LoRA, we first need to understand post-training. In post-training, we update a pretrained model's parameters for a new task. But updating all parameters is expensive. This is where PEFT (Parameter-Efficient Fine-Tuning) comes in. PEFT methods update only a small part of the model, and LoRA is one of them.

In deep learning, a layer sends values to the next layer through a weight matrix $W$. So when we train a layer, we are mostly updating its weights. LoRA changes this idea a little bit. Instead of directly updating the original weight matrix, it adds a small update matrix:

$$
Wx = W_0x + \Delta Wx = W_0x + BAx
$$


where $W_0 \in \mathbb{R}^{d \times k}$, $B \in \mathbb{R}^{d \times r}$, $A \in \mathbb{R}^{r \times k}$, and the rank $r \ll \min(d, k)$.


So intuitively, if we can find a good $\Delta W$, we can update the model. The key question is: why does factorizing $\Delta W$ into two smaller matrices, $B$ and $A$, reduce the number of trainable parameters?

picture of apper Lora

## The benefit 
Actually it saves the memory 

## When to use it?
If we can use 

## What is the limitation

## Are learned solution really equivalent between LoRA and full-finetuning?


## Lora related term
### LoRA Rank ($r$): 
### LoRA Alpha ($\alpha$):
### QLoRA (Quantized LoRA):


