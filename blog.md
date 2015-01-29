---
layout: default
---
<div class="row">
  <div class="medium-12 columns">
    {% for post in site.posts %}
      <article class="home">
        <time class="fi-clock" datetime="">
          {{ post.date | date_to_long_string }}
        </time>

        <span class="fi-pricetag-multiple category">
          {{ post.tags }}
        </span>

        <h2>
          <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">
            {{ post.title }}
          </a>
        </h2>
        <p>
          {{ post.excerpt }}
        </p>
      </article>
    {% endfor %}
  </div>
</div>
