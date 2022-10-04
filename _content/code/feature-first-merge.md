---
title: Feature first merges
author: Mohit Singh
date: '2022-04-05'
excerpt: A hybrid git branching model that enables small teams to work on multiple features in different environments and with different priorities.
---

What branching model will you follow when people work on multiple features, a combination of them need to be tested and any feature can be prioritized or de-prioritized anytime. At an organization I worked for, we were facing similar challenges. This post is about a solution that was adopted to solve this.

### Why not existing models

There are several other models already that work well, for example, gitflow is widely used, but there were some limitations with gitflow. It is designed to work for places where releases are planned and worked on. The micro-services we work on are the most dynamic part of the infra, so gitflow needed some tweaks. The mental overhead was way too much for the developers since we were not using standard gitflow anymore. Similarly, github flow or trunk based failed our tests because they were way too generic for our use case.

### A Frankenstein strategy

After, pulling some parts from other models and combining that with our custom deployment strategy, we ended up with following &mdash;

- Naming convention from gitflow.
- Branching simplicity from trunk based.
- Continuous rebase of feature branches to keeps rebase to main possible.
- Temporary branches for different testing environments, for example, one prefixed with `staging-`.
- Squash merging features in different environments.

### Working on a Feature

Since we use jira, a branch should ideally contain the ticket name. The name will be `feat/[JIRA-ID]-[FEATURE]`, So let's create a branch &mdash;

```bash
git switch -c team1-23-feature-x
```

Several commits later, we would like to test this, but there are already some people working on **feature-y** and **feature-z**. So, let's deploy all these features together on **staging** environment. To do that, let's create a **staging** branch and merge these features there. Github is not suitable for this because any conflict resolution will end up in feature branches which we don't want. Our goal is to have our feature as a atomic unit with required conflict resolution.

```bash
git switch main
# you can use whatever naming strategy you want,
# but be consistent with it.
git switch -c staging-5
```

Now that we have our staging branch, let's merge **feature-x** here.

```bash
git merge --squash feat/team1-23-feature-x
# resolve conflicts
git commit -m "feat/team1-23-feature-x"
# now our entire feature x is in a single commit
```

We used squash merge because we don't want a branching jungle here. Now let's quickly add other two features &mdash;

```bash
git merge --squash feat/team1-24-feature-y
# resolve conflicts
git commit -m "feat/team1-24-feature-y"
git merge --squash feat/team1-25-feature-z
# resolve conflicts
git commit -m "feat/team1-25-feature-z"
```

Now, our staging branch have all three feature as atomic commits and anyone looking at this branch can tell what features are there in staging.

### Merging in main

To merge a feature in main, we can simplify rebase and merge it.

```bash
# prior to this, make sure main in updated
git switch feat/team1-23-feature-x
git rebase main
git switch main
```

Once the branch is rebase, the normal Github PR flow will work fine. It's just that we prefer a linear history and squashed commits.

### Updating a Feature

If you've updated your feature branch with some commits, you can either recreate your testing branch with required features or replace you commit there.

1. find the hash with git log.
2. git rebase to that.

```bash
git rebase -i <hash>~
```

3. Drop that commit and continue rebase.
4. Now, merge squash you branch again.

### Continuous Integration and Deployment

1. Branches are tested based on prefixes. Anything prefixed with **feat/** will trigger feature testing workflow.
2. We use manual trigger for deploying testing branches but one other way is to trigger staging or development deploy for branches with **staging-** or **dev-** prefix.
3. While we currently follow tag based deployment for production as it gives us more control, the main is so stable at this point that a continuous deployment from main will also work.

### Conclusion

There is much is it but above is the simple workflow that allows feature to be tested in any combination without complexity ( which I admit, is subjective ) and any feature can be moved to backlog or prioritized. We only need to worry about single source branch. While this is not the best way to solve this, so far, I found it to be much more straightforward in terms of time spent in deployment.
