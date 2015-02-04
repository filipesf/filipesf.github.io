---
layout: articles
permalink: articles/
---
{% for post in site.posts %}
  <article class="article">
    <span class="article__meta">
      <time class="article__meta__datetime" datetime="{{ post.date | %H:%M:%S }}">
        <i class="fa fa-clock-o"></i>
        {{ post.date | date_to_long_string }}
      </time>
      <span class="article__meta__category">
        <i class="fa fa-tags"></i>
        {{ post.tags }}
      </span>
    </span>
    <h2 class="article__title">
      <a href="{{ post.url | prepend: site.baseurl }}">
        {{ post.title }}
      </a>
    </h2>
    <p class="article__excerpt">
      {{ post.excerpt }}
    </p>
  </article>
  <hr>
{% endfor %}
