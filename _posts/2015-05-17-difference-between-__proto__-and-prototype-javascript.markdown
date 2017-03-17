---
layout: post
title:  "Difference between __proto__ and prototype in javascript"
date:   2015-05-17 21:00:00
categories: javascript hackreactor
---

During my first week at HackReactor, a programming bootcamp focused on Javascript, I learned many important concepts that go far beyond the syntax of the language. At first glance, there are very few syntactical differences between Javascript and other object-oriented languages like Java. But dig deeper and you'll see that Javascript has its own little quirks which are really fascinating and worth mulling over. Well, if you are a programming language geek like me at least.

One of those quirks that I find most interesting, besides from the fact that you can pass in functions as arguments in higher order functions, making Javascript a functional programming language (*gasp* - I'll have a blog post on that later), is the difference between a function object's prototype and its prototype property.

But first, what the heck is a prototype?

Well, it's Javascript's own take on inheritance, a crucial feature in object-oriented programming. It's helpful for someone with Java background like me to think of it as a "parent" class, or a super class, that a class can inherit properties and methods from. Consider the following snippet of code.

{% highlight javascript %}
var Car = function(loc) {
  var obj = Object.create(Car.prototype);
  obj.loc = loc;
  return obj;
}

Car.prototype.move = function() { this.loc++; };

var myCar = new Car(3);
myCar.move();            // delegate failed method lookup to its prototype
console.log(myCar.loc)   // log 4.
{% endhighlight %}

In the code block above, the object returned from the Car constructor function has as its prototype Car.prototype. This is potentially confusing since to many Javascript newcomers, Car.prototype seems to be the Car function's prototype. This is wrong.

{% highlight javascript %}
Function.prototype.isPrototypeOf(Car) // return true
Car.prototype.isPrototypeOf(Car)      // return false
{% endhighlight %}

In other words, you should think of Car.prototype as only a method storage property for the object returned by the function object. Javascript just happens to allow functions to have prototype property as default. The actual prototype of any Javascript function, referenced by \_\_proto\_\_, should be Function.prototype, whose prototype in turn is Object.prototype.

TL;DR: Here is a helpful diagram summarizing my point

![Difference between prototype and __proto__][fig1]

**Figure 1.** Difference between prototype and \_\_proto\_\_

[fig1]: {{ site.baseurl }}assets/images/js-prototype-differences.png



