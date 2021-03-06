# Jekyll plugin for generating an rss 2.0 feed for posts
#
# Usage: place this file in the _plugins directory and set the required configuration
#        attributes in the _config.yml file
#
# Uses the following attributes in _config.yml:
#   name           - the name of the site
#   url            - the url of the site
#   description    - (optional) a description for the feed (if not specified will be generated from name)
#   author         - (optional) the author of the site (if not specified will be left blank)
#   copyright      - (optional) the copyright of the feed (if not specified will be left blank)
#   rss_path       - (optional) the path to the feed (if not specified "/" will be used)
#   rss_name       - (optional) the name of the rss file (if not specified "rss.xml" will be used)
#   rss_post_limit - (optional) the number of posts in the feed
#
# Author: Assaf Gelber <assaf.gelber@gmail.com>
# Site: http://agelber.com
# Source: http://github.com/agelber/jekyll-rss
#
# Distributed under the MIT license
# Copyright Assaf Gelber 2013

module Jekyll
  class RssFeed < Page; end

  class RssGenerator < Generator
    priority :low
    safe true

    # Generates an rss 2.0 feed
    #
    # site - the site
    #
    # Returns nothing
    def generate(site)
      require 'rss'

      parser = get_markdown_parser(site.config)

      # Create the rss with the help of the RSS module
      rss = RSS::Maker.make("2.0") do |maker|
        maker.channel.title = site.config['name']
        maker.channel.link = site.config['url']
        maker.channel.description = site.config['description'] || "RSS feed for #{site.config['name']}"
        maker.channel.author = site.config["author"]
        maker.channel.updated = site.posts.docs.map { |p| p.date  }.max
        maker.channel.copyright = site.config['copyright']

        post_limit = (site.config['rss_post_limit'] - 1 rescue site.posts.docs.count)

        site.posts.docs.reverse[0..post_limit].each do |post|
          maker.items.new_item do |item|
            item.title = post.title
            item.link = "#{site.config['url']}#{post.url}"
            #item.description = parser.convert(post.excerpt)
            item.updated = post.date
          end
        end
      end

      # File creation and writing
      rss_path = ensure_slashes(site.config['rss_path'] || "/")
      rss_name = site.config['rss_name'] || "rss.xml"
      full_path = File.join(site.dest, rss_path)
      ensure_dir(full_path)
      File.open("#{full_path}#{rss_name}", "w") { |f| f.write(rss) }

      # Add the feed page to the site pages
      site.pages << Jekyll::RssFeed.new(site, site.dest, rss_path, rss_name)
    end

    private

    # Ensures the given path has leading and trailing slashes
    #
    # path - the string path
    #
    # Return the path with leading and trailing slashes
    def ensure_slashes(path)
      ensure_leading_slash(ensure_trailing_slash(path))
    end

    # Ensures the given path has a leading slash
    #
    # path - the string path
    #
    # Returns the path with a leading slash
    def ensure_leading_slash(path)
      path[0] == "/" ? path : "/#{path}"
    end

    # Ensures the given path has a trailing slash
    #
    # path - the string path
    #
    # Returns the path with a trailing slash
    def ensure_trailing_slash(path)
      path[-1] == "/" ? path : "#{path}/"
    end

    # Ensures the given directory exists
    #
    # path - the string path of the directory
    #
    # Returns nothing
    def ensure_dir(path)
      FileUtils.mkdir_p(path)
    end

    # Gets a parser object for the parser specified in the configuration
    #
    # config - the site's configuration hash
    #
    # Returns a parser or raises exception if one isn't found
    def get_markdown_parser(config)
      return case config['markdown']
        when 'redcarpet'
          Jekyll::Converters::Markdown::RedcarpetParser.new config
        when 'kramdown'
          Jekyll::Converters::Markdown::KramdownParser.new config
        when 'rdiscount'
          Jekyll::Converters::Markdown::RDiscountParser.new config
        when 'maruku'
          Jekyll::Converters::Markdown::MarukuParser.new config
        else
          STDERR.puts "Invalid Markdown processor: #{config['markdown']}"
          STDERR.puts "  Valid options are [ maruku | rdiscount | kramdown | redcarpet ]"
          raise FatalException.new("Invalid Markdown process: #{config['markdown']}")
      end
    end

  end
end
