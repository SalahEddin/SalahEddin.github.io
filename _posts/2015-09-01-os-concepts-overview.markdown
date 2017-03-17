---
layout: post
title:  "Overview of Operating Systems concepts"
date:   2015-09-01 15:45:00
categories: OS programming
published: false
---

This is a first in my series of blog posts regarding things I've learned about operating systems. The content of each blog post will be dependent on how much I've read and gathered each week using both the textbook and lecture videos from UC Berkeley's class on Youtube.

##What is the role of an operating system?

Operating system acts as an hardware abstraction layer that any applications can run on. This means that the application developer does not need to worry about hardware specifications when developing apps, which is a good thing. Otherwise, time spent on tweaking applications to run on specific hardware platform is wasted resource.

OS provides a set of common services, specifically system calls, that allow applications to take advantage of hardware without worrying about how these functions are actually implemented. Similar to many web APIs I suppose. This also facilitates communication among processes.

An OS also provides fault isolation, i.e. a faulty application does not affect other application's performance. So security.

An OS handles resource contention among processes and make sure that unsafe access to memory regions by a malicious application is overruled. So more security.

Finally, an OS also masks the hardware limits so as to create an illusion that each application has infinite memory and the processor(s) to itself. This goes back to the first point of how an OS makes an application developer's life easier by allowing him/her to ignore hardware limitations.

##How should an OS be evaluated? As in what makes a good OS?

Just like regular applications, an OS should be **reliable**. That is, it performs tasks it is expected to do and only do those tasks, i.e. not perform unexpected behaviors. This means every extreme edge cases are accounted for. This is expected since all applications rely on an OS to function.

Another important aspect of a good OS is its **availability**. This means that the percentage of time the system should be running as long as possible. An available OS is not necessarily reliable. For example, an operating system that allows a malicious application to record keystrokes while continuing to appear to function normally is available but unreliable. Likewise, an OS that crashes frequently but ensures data security is reliable but not very available. A good OS is both: reliable and available.

A good OS is **portable**: it has to be able to support future applications on hardware platform that is yet to be developed. A measure of a good OS is its lengivity measured in decades. It is impractical to develop entirely new OS every time hardware and software applications are produced or developed. 

Other measures of a good OS: **performance** (app performance is dependent on e.g. how good an OS is at efficiently allocating memory among contending applications or caching or retrieving files from disks), **response time** (how long it takes for single specific task from its inception to its termination), **throughput** (similar to response time but for a group of tasks), 
