---
title: "APL My Old Friend"
date: 2018-07-11T19:37:18-04:00
tags: [CS, apl, j, k]
---

I've been getting back into J after reading this twitter thread:

https://twitter.com/digitalbeard/status/987775955220430848

I first learned of J around 10 years ago. I remember reading "Easy J" and being amazed. Here was something so alien from everything
I thought I knew about programming languages. The verbs, adverbs, and conjunctions were so cohesive, everything seemed to flow effortlessly.
Writing J programs was somewhat akin to poetry, something explained better by [Alan J. Perlis](http://www.jsoftware.com/papers/perlis77.htm).

Although J is still one of my favorite languages, it has some limitations. It's not easy to model datastructures in J.
Once you move away from arrays, things are clunky. Most of the primitives become useless and the imperative language
embedded in J is 'eclectic' to put it mildly. There are also no robust parallelism or concurrency options.

<!--
Back to the tweet:

```J
lp=: ' '&(#~)@(0: >. (- #))
```
-->

P.S. I was also [briefly](https://github.com/isawdrones) obssessed with [K](https://kx.com).