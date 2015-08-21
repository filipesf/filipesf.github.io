require "stringex"
class Jekyll < Thor
  desc "new", "create a new post"
  method_option :editor, :default => "subl"
  def new(*title)
    title = title.join(" ")
    date = Time.now.strftime('%Y-%m-%d')
    time = Time.now.strftime('%H:%M:%S')
    filename = "_posts/#{date}-#{title.to_url}.html"

    if File.exist?(filename)
      abort("#{filename} already exists!")
    end

    puts "Creating new post: #{filename}"
    open(filename, 'w') do |post|
      post.puts "---"
      post.puts "layout: post"
      post.puts "cover: /img/"
      post.puts "title: \"#{title.gsub(/&/,'&amp;')}\""
      post.puts "excerpt: "
      post.puts "date: #{date} #{time}"
      post.puts "published: false"
      post.puts "tags: "
      post.puts "---"
    end

    system(options[:editor], filename)
  end
end
