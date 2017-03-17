---
layout: post
title:  "Haskell - functional fun"
date:   2015-10-18 16:30:00
categories: haskell programming
<!--published: false-->
---
Ok I need a break from all the headaches that come with learning Vim and tmux. I think I'm getting better at it though. We'll see.

So I decided to learn Haskell. Because, hey, why not?

First off, I'm glad that I encountered some functional stuff from Javascript. I was going to write about some more Javascript concepts that I find interesting but frankly, many blog posts have done such a great job covering those topics anyway. 

Not that there are dozens of good ones about Haskell already on the interweb. This post serves more as a refresher of concepts I've learned about Haskell so far. If any Haskell pros are reading this (if there are even any readers at all) and find any thing I said about Haskell errorneous, please help me understand it better through the comment section below (please comment anything, I will read them lol).

Ok, let's dive in.

Let's start off with how powerful and elegent Haskell can be. For those starting out with data structures, how many lines of code did you have to write for quick sort? Let's see with ordinary object oriented programming languages like Java for example, you have to create an auxilary method like swap for swapping operation. That takes 3 lines. You have to keep track of indexes within a while loop.. Arg too many details. At least that's what I imagine a persona of Haskell would say (think of cool lazy beanie wearing hipster coder). Here's quicksort in **6 lines** in Haskell: 

``` haskell
quicksort :: (Sort a) => [a] -> [a]
quicksort [] = []
quicksort (x:xs) = 
  let smallerSorted = quicksort [a | a <- xs, a <= x]
      biggerSorted = quicksort [a | a <- xs, a > x]
  in smallerSorted ++ [x] ++ biggerSorted
```

![WHAAAAA???](https://www.wearefine.com/mingle/wp-content/uploads/2014/10/unnamed-111.gif)

Ok, what is this dark magic?? (Never mind the technicality that makes this not a true quicksort - see [this SO post](http://stackoverflow.com/questions/7717691/why-is-the-minimalist-example-haskell-quicksort-not-a-true-quicksort)).

The first line is simply an explicit function type declaration. The "::" should be read as "has type of". The "a" variable is a **type variable** meaning it can be of type Int, Integer, Float, etc. as long as the input and output of quicksort function has the same type. Which has **class type** of Sort, indicated by the stuff in parens before the "=>", which indicates **class constraint** to either input or output types of a function type declaration. Although **class type** sounds a lot like the concept of classes in OO, it's actually more closely related with the concept of interface. The square brackets around "a" indicate that it is a list of the same type.

Ok, on to the meat of the function. In Haskell, a function allows for pattern matching for a given input so instead of having if else blocks inside method body for catching different types of inputs, you can declare different method bodies depending on what pattern the input matches. We always want the edge case pattern to be the first one the input must be matched against so hence the empty list input. Otherwise we would have infinite loop. For the second pattern, we split the input up into 2 parts: the first element and the rest. The first element is used as a partitioning element, which would dictate where the rest of the elements in xs should go. The let .. in pattern is called **let binding** in Haskell. It allows expressions in "in" part to be named in the "let" body. Obviously, the smallerSorted is just a recursive call to quicksort on a list that contains every element less than or equal to x, the partitioning element. The list comprehension is what gives us that list without us having to explicitly do all the grunt work of comparing and pushing to the appropriate list (think of Python list comprehension - same thing). Finally, the expression in the final line concatenates all the recursive calles into final sorted list. Mmmm, syntactic sugar...

Of course, this is only the tip of the iceberg for Haskell. There are many other crazy concepts like **curried functions**, **partial functions**, etc. There are many good resources for those. I hope for those non-Haskell programmers reading this, you should definitely pick up Haskell regardless of whether you would use it in your programming career or not. It would definitely blow your mind. 

