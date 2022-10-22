---
title: A tool mistreated - njk
date: '2021-08-07'
description: The story of an open source tool that became one of mindlessly installed dependencies on npm.
---

We are installing dependencies so mindlessly nowadays that we don't exactly care, what's there in our dependency tree. This is about one such dependency, a command line tool that I wrote.

## Static Site Generators

When I started to build a static website, I didn't know much about web technologies but after a little research (googling ?) I found that static-site-generators were a thing. I spent next few months teaching myself web stuff. Next, I was looking for a good static site generator to utilize this newly gained knowledge.

## From Jekyll to Node

I decide to use Jekyll, a static site generator written in Ruby and built those websites with it. Jekyll has a templating/markup language named liquid. I got familiar with markdown, yaml and templating languages during.

There were several issues with Jekyll though. It required ruby along with ruby DevKit which I really didn't like. The build process was slow. On the other hand, I learned about Node and some build tools like gulp and grunt etc. Node felt easy to use and I found a templating language similar to liquid, nunjucks, and decided to build old sites with these.

After putting together a few gulp plugins to replicate Jekyll like structure, I was able to move away from Jekyll.

## Simplifying things

It worked for a while but the plugin system of gulp was not something I was very happy with. For example, the plugin I used to render nunjucks needed three other plugins in order to support front-matter and external data. Those plugins in turn were depending on actual libraries doing those things. This didn't feel right to me. I forked original plugin and added markdown and front-matter support to it. It got some community adoption and I learned that a lot of other people felt the same.

I was still not satisfied since I was using some other gulp plugins, I tried abstracting away my gulp config and named in njk. It was njk v1, a gulp based module to build static-sites. After a while I realized that instead of abstracting things away, I should optimize my slow build process and huge dependency tree. I rewrote njk as a command line tool to render nunjucks with markdown, front-matter and external data and released as njk v2. I the original gulp plugin I wrote was gone by then.

## A tool mistreated

Fast forwards to some years, I kept maintaining njk since I was building all my sites with it. It got some adoption but wasn't much popular. By now, I was good enough in React and with time, migrated those sites to Next. njk was in good shape and in maintenance mode at this point.

A few months ago, during a random lookup, I landed in a project that used njk as dependency. I got curious how they used it. What I found next was shocking. They used njk just to have nunjucks as a dependency. My guess was that njk sounded official and some people downloaded it instead of nunjucks library. It worked since njk was depending on nunjucks.

A facepalm later, I decide to dig deeper. After looking into some dependent projects, I found that most of them had njk but they actually intended to use nunjucks directly. It was okay that njk wasn't much used, but finding out that most of existing users were misusers was hilarious. They wanted bananas but ended up with a gorilla holding bananas and the whole jungle around it because nunjucks is way lighter than njk since former is a library and later is a command line tool for specific job. For those who are curious about this tiny tool, [here](https://github.com/mohitsinghs/njk) it is.

Will this behavior be fixed ? I am not sure.
