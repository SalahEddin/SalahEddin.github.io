---
layout: post
title:  "Live reload with Guard and nodemon"
date:   2015-07-23 14:23:00
categories: programming webdev tricks
published: true
---

Any web developer knows that restarting your web server everytime you make a change in your code (either server or client side), even a change as trivial as a CSS property change, and then restarting the browser to see the change take effect is a huge time drain in development. Today I'm going to show you just how easy it is to set up your web project so that when you hit save on any file in your project, you can instantly see your change reflected in the browser.
First, make sure you have [Ruby](https://www.ruby-lang.org/en/) and its package manager [RubyGems](https://rubygems.org/) installed. Open up terminal (assuming you are running your app in Linux or Mac) and type in following command:

```bash
  sudo gem install guard guard-livereload
```

Enter your password you normally use when you log in to your machine (the characters shouldn't appear when typing). Then in your project's root folder, create a configuration file called Guardfile:

```ruby
guard 'livereload' do
  watch(%r{.+\.(css|js|ejs|html)})
end
```

This Guardfile essentially watches for changes in any css, js, ejs and html files in our project folder.

Now, assuming you're using Chrome for development, install Chrome plugin [LiveReload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei).

Then open Chrome to your locally hosted webpage and click on the plugin to connect to the guard server. You should be able to see a message similar to this in the Terminal.

```bash
[1] guard(main)> 15:16:08 - INFO - Browser connected.
15:16:17 - INFO - Reloading browser: client/components/results/results.html
```

Now everytime you change any client file in your project, the browser will automatically reload. However, at this point, the browser only reloads due to changes in client files but we haven't figured out a way to restart the server once any file changes.

If you're using [Node.js](https://nodejs.org/) as your backend, the module <code class='inline-code'> nodemon </code>  will take care of that problem for you.

To install nodemon, you need package manager npm.

```bash
sudo npm install -g nodemon
```

From now on, instead of (re)starting your server file after changes using something like <code class='inline-code'> node server.js </code>, you can run it once like this:

```bash
nodemon server.js
```

Now, edit a file and watch nodemon do its magic. Now when something changes, both the browser and the server will restart.

At this point, we can consider ourselves done but it'd be nice to restart both the browser and the server at the same time. For the browser to detect when a server has restarted, we can make a change to a dummy log file whenever a server restarts and make guard watch changes to that file. In the code that creates the server, add fs writeFile function to write to a restart.log file. That way, everytime the server restarts, the fs module will update the restart.log file. Guard will detect this change and refresh browser as well. Neat trick huh.

```javascript
var server = http.createServer(app);
server.listen(port);
console.log("Server running on ", app.get("port"));

// make sure to require fs module
fs.writeFile(__dirname + '/restart.log', 'restart', function(err) {
  if (err) {
    throw err;
  }
  console.log('Server restart logged at restart.log file');
});
```
Make the following change in Guardfile

```ruby
guard 'livereload' do
  watch(%r{.+\.(css|js|ejs|html)})
  
  # watch the server restart
  watch(%r{restart.log})
end
```

Well, that's it. I hope I've made your web development life much easier. I know mine definitely has.

Credit: I didn't come up with this method. I basically learn this from [this blog post](https://vickev.com/#!/article/auto-refresh-your-browser-when-saving-files-or-restarting-node-js).  
