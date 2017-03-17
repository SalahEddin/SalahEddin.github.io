---
layout: post
title:  "OS notes: the kernel"
date:   2015-09-04 19:11:00
categories: OS programming
published: false
---

Welcome to the second part of my notes on operating systems. Here I will attempt to summarise important points about the kernel. Some of these stuff I've already encountered briefly in my Computer Systems II class in my freshman spring semester, so this is not meant to be a comprehensive guide to the kernel. Again this blog series is mainly for me to organize what (I think) I know about operating system concepts in general. 

First of all, one of kernel's primary objectives is to prevent 
applications from intentionally or accidentally corrupting or misusing code or data from another application or the OS itself.
To do this, the underlying ISA (instruction set architecture) of the processor has to support dual mode operation. Specifically, the processor can execute instructions in two modes: kernel mode and user mode. In kernel mode, the instructions are carried out directly without any security check. On the other hand, in user mode, the processor has to verify each instruction before actually executing them. Which mode the processor is in depends on a single bit in a designated status register. 

Instructions allowed in kernel mode are privileged instructions. These instructions are only to be executed by the kernel. This makes sense since the kernel is considered the security wall protecting the OS from malicious applications. 
