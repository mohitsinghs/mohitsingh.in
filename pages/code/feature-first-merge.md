---
title: Feature first merges
date: '2022-04-05'
description: A hybrid git branching model that enables small teams to work on multiple features in different environments and with different priorities.
---

What branching model will you follow when people work on multiple features, a combination of them need to be tested and any feature can be prioritized or de-prioritized anytime.

At an organization I worked for, we were facing similar challenges. This post is about a solution that I came up with and was adopted to solve this.

### Why not existing models

There are several other models already that work well, for example, gitflow is widely used, but there were some limitations with gitflow. It is designed to work for places where releases are planned and worked on. The micro-services we work on are the most dynamic part of the infra, so gitflow needed some tweaks. The mental overhead was way too much for the developers since we were not using standard gitflow anymore. Similarly, github flow or trunk based branching models were not suitable for us because they were way too generic for our use case.

### A Frankenstein strategy

After, pulling some parts from other models and combining that with our custom deployment strategy, we ended up with following &mdash;

- Naming convention from gitflow.
- Branching simplicity from trunk based.
- Continuous rebase of feature branches to keeps rebase to main possible.
- Temporary branches for different testing environments, for example, one prefixed with `staging-`.
- Squash merging features in different environments.

### Working on a Feature

Since we use Jira, a branch should ideally contain the ticket name. The name will be `feat/[JIRA-ID]-[FEATURE]` or `[JIRA-ID]-[FEARTURE]`, So it will be something like &mdash;

```bash
git switch -c feat/team1-23-feature-x
```

Several commits later, we would like to test this, but there are already some people working on **feature-y** and **feature-z**. So, To deploy all those features together on our testing branch like staging, we will create a branch with **staging-** or other related prefix and merge these features there. Github is not suitable for this because any conflict resolution will end up in feature branches which we don't want. Our goal is to have our feature as a atomic unit and conflicts should be solved in this temporary branch itself based on feature priority.

```bash
git switch main
# you can use whatever naming strategy you want,
# but be consistent with it.
git switch -c staging-5
```

Now that we have our staging branch, We will merge **feature-x** here.

```bash
git merge --squash feat/team1-23-feature-x
# resolve conflicts
git commit -m "feat/team1-23-feature-x"
# now our entire feature x is in a single commit
```

We use squash merge because we don't want a branching jungle here. Now, to add other two features &mdash;

```bash
git merge --squash feat/team1-24-feature-y
# resolve conflicts
git commit -m "feat/team1-24-feature-y"
git merge --squash feat/team1-25-feature-z
# resolve conflicts
git commit -m "feat/team1-25-feature-z"
```

After this, our staging branch will have all three feature as atomic commits and anyone looking at this branch can tell what features are there in staging.

### Merging in main

To merge a feature in main, we rebase and merge to main.

```bash
# prior to this, make sure main in updated
git switch feat/team1-23-feature-x
git rebase main
git switch main
```

Once the branch is rebased, the normal Github PR flow will work fine. It's just that we prefer a linear history and squashed commits, The Pull/Merge request will have the feature branch history if required.

### Updating a Feature

If we've updated our feature branch with some commits, we can either recreate our **staging** branch with required features or replace our commit there.

1. find the hash with git log.
2. git rebase to that.

```bash
git rebase -i <hash>~
```

3. Drop that commit and continue rebase.
4. Now, merge squash you branch again.

To avoid this, I prefer an alias that automates most of this &mdash;

```
# delete a commit using rebase --onto
rd = "!f() { git rebase -r --onto \"$1~\" \"$1\"; }; f"
```

### Continuous Integration and Deployment

1. Branches are tested based on prefixes. Anything prefixed with **feat/** will trigger feature testing workflow.
2. We use manual triggers for deploying **testing** branches but one other way is to trigger staging or development deploy for branches with **staging-** or **dev-** prefix.
3. While we currently follow tag based deployment for production as it gives us more control, the main is so stable at this point that a continuous deployment from main will also work.

### Conclusion

There is much to it but above is the simple workflow that allows feature to be tested in any combination without complexity ( which I admit, is subjective ) and any feature can be moved to backlog or prioritized. We only need to worry about single source branch. While this is not the best way to solve this, so far, I found it to be much more straightforward in terms of time spent in deployment.
