---
title: "The State of Python Profiling"
date: 2018-10-12T17:59:57-04:00
tags: [CS, python, profiling, tools]
---

There are no good python profiling tools.
Here is what I consider necessary from a profiler:

1. Cross platform
2. Profiling of live applications
3. Ability to generate profiler dumps (preferably gprof compatible)
4. Call tree profiling
5. Line-level profiling

The built-in python profilers cProfile and profile don't meet 1, 2, and 5.
3rd party alternatives also fall short.

## Pyflame

A great live profiler:

- low overhead.
- live profiling of processes.
- generates profiler dumps, convertible to gprof and svg.
- Can generate Chrome profiler dumps.

but it has some limitations

- Uses linux's strace so it's not cross platform.

To complicate matters:

- strace is not enabled by default on docker containers.
- strace is disabled for regular users on a lot of distros.

## Vprof

- Linux only

## line_profiler

- Uses cProfile so it shares its limitations
-

# References

https://kupczynski.info/2015/01/16/profiling-python-scripts.html