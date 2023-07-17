---
title: Markdoc - A language adventure
date: '2023-07-17'
description: Lessons learned from trial of an exciting new language and creating some language tooling.
---

I used to build blog and websites with njk but due to limitations I faced, I switched to Next. The markdown with front-matter is still my primary way to write text heavy content, the templates turned into JSX which allowed me to do a lot more.

More than a year back, I stumbled upon a post by Stripe team. They announced a new language called Markdoc which was a superset of Markdown with just enough syntactic sugar to allow custom components. I really liked this approach. I went on to try it only to find there was no editor tooling for it. We got an announcement that the tooling we be released soon.

## Syntax Highlighting

I use VSCode and NeoVim as my favorite editors. The first thing I needed was syntax highlighting for Markdoc in these two editors.

### Highlighting Markdoc in VSCode

I started with a Textmate Grammar on the top of Markdown and added Markdoc specific constructs to it. The problem with this approach was, any updates in Markdown syntax was very difficult to merge.

In second iteration, I isolated Markdoc specific highlights and generated Markdoc syntax by dynamically adding these highlights into Markdown grammar via a script. Now, All I had to maintain was the Markdoc grammar. Soon, I realized, I wasn't following specs as clearly as possible.

Meanwhile, I learned from my NeoVim syntax highlighting adventure that I can do the opposite and inject markdown grammar into markdoc.

In third iteration, I had a textmate grammar that was just for Markdoc and as close to specs as possible with Markdown syntax injected to it.

### Highlighting Markdoc in Neovim

My another favorite editor was missing Markdoc highlighting, so after I finished first iteration of Markdoc grammar, I tried writing a tree-sitter parser for Markdoc. It was a very new and exciting thing for me. I did the opposite of what I did for VSCode and instead of deriving from Markdown, I injected Markdown inside Markdoc. With time I refined it to some extent but compared to VSCode, It was very easy and straightforward to work with.

> This is what I like about tools, they should be easy to use with minimum effort possible. Allowing optional adventures is a totally separate thing that can be done in parallel. Unix is great example.

## A language Server

I wrote a language server for Markdoc. Initially it allowed some basic completions and formatting. Markdoc relies on a config file and the Next plugin for Markdoc does some magic to make it work but it changes the file a bit.

For the language server, I decided to detect config automatically. I did it for Next and with help from [Ben Holmes](https://github.com/bholmesdev) of Astro team, I was able to do it for Astro.

> Ben was second person during a decade of my Github adventure that was helpful and kind. The first will be [Thomas Smith](https://github.com/Thom1729).

I started writing a parser that could allow detecting partial Markdoc syntax. It's still in infancy but it allowed me to properly perform some analysis that I couldn't do with markdoc parser. My goal was to slowly build a language server in a way that requires minimal user interaction.

## A breaking point

Meanwhile, In my projects, I started facing drawback of Markdoc. For example, I had to write each component twice. first as a react component and then inside Markdoc config. I also had to maintain a fork of Markdoc because, locations of errors in Markdoc parser were really limited.

At the same time, Markdoc team released the extension for VSCode along with a language server that I was really excited about. I realized it required another config for language server. After fighting it an entire day, I gave up. Upon digging, I figured out, while the language server and extensions were feature rich, they were tuned for specific purpose and thinking.

While I was trying to avoid yet another config, this new language server required another config. I can totally understand that, since it's something open source and used by Stripe. They have no obligation to listen but as a user, I was unhappy. I figured, it was not for people like me who don't want to fight their tooling unnecessarily.

## Wrapping up

A day later, I spent some time writing a library that used unified ecosystem to process Markdown and some syntax sugar that I needed. From there jumping back to plain Markdown was really easy. A year of Markdoc lost me in a day. I migrated my sites to app router the new library allowed me to avoid thinking about static content and focus on dynamic and component driven parts.
