---
title: "Tachyons Is Nice for Templates"
date: 2018-09-13T20:47:12-04:00
tags: [CS, design, css, html, tachyons]
---

# Tachyons is Nice

Tachyons.io is great for templates and prototypes.
I wouldn't write a full landing page in it or anything that's not dynamically generated.
Why? because it's got the same problems as css class composition in HTML, there's no way to group css classes you import.

An example:

```HTML
<div class="aside fl w-80 ma1 pa2 lh-copy">
    <div class="aside-heading lh-title">Technologies</div>
    <ul class="list pl0 pt3">
    </ul>
</div>
```

It gets hard to stack css classes into the html tag. It's hard to read and it's
hard to maintain when duplicating elements and tweaking the layout.

I wish I could do something like this in (S)CSS:

```SCSS
@import "tachyons.scss"

/* AND */
.aside = [ .fl .w-80 .ma1 .pa2 .lh-copy ] extend {
    border: 1px solid #eef;
    line-height: 1.2rem;
    font-weight: 600;
}

.any-title =

.aside__content = [.list, .pl0, .pt3], {
    margin: 1rem;
}

```

Equivalent HTML:

```HTML
<div class="aside">
    <div class="aside__heading">Technologies</div>
    <ul class="aside__content">
    </ul>
</div>

```

Some things in the example:

- Import tachyons
- CSS aliases: allowing you to group CSS class names or selectors as one name.
- Anonymous selector groups: Like an anonymous block that can be used as if a named selector has been defined for it.


Using it in HTML:

```HTML

```