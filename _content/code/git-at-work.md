---
title: Git at work
author: Mohit Singh
date: '2022-10-10'
excerpt: Techniques that I use to isolate working environments of git from my personal setup from work.
---

Isolate git and other configurations for work and personal projects can be complicated. In this post, I'll be sharing the way I isolate my work development environment from my personal one.

## Setting up ssh

In order to isolate my work github account from my personal one when cloning, I've setup different host and identity for them. I utilize ed25519 as ssh key for both.

Below is a my `~/.ssh/config` which allows me to have two hosts **github.com** and **gh-work** both of which use different ssh keys.

```properties
Host github.com
   HostName github.com
   User git
   IdentityFile ~/.ssh/path-to-persona-key

Host gh-work
   HostName github.com
   User git
   IdentityFile ~/.ssh/path-to-work-key
```

So when cloning something for work, it becomes `git@gh-work` instead of `git@github.com`.

## Separate Git configs

My personal git config lives in my dotfiles. For work related code, I've a dedicated repository named `~/Work`. In order to change git config inside this repository, I've put a `gitconfig` in it's root which contains nothing more than my name and email for work.

```properties
[user]
	name = some-work-name
	email = my-work-email
```

and in order to apply this when I am under work directory, I've added following to my `~/.gitconfig`.

```properties
[includeIf "gitdir:~/Work/"]
  path = ~/Work/.gitconfig
```

This applies the work gitconfig whenever a git directory I am working with is inside work folder.

## For other configurations

I have two shell scripts named `home` and `work`. When I land in a terminal, depending on where I want to work &mdash;

1. Either a tmux session is created or I am attached to an already running tmux session.
2. In both cases, these sessions contains session specific environment variables to interact with private registries and other things.
3. I utilize **gh**, and I've two configs for it as well. Based on the session I'm being attached, The config symlink is switched to related config, to allow me to interact with that account on github.

This means, whenever I start a long session in terminal, I start in tmux with one of those two commands. This have worked so far.
