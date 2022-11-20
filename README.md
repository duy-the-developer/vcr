# Verbose Correction Reporting For Concordia Full Stack Web Development Bootcamp Instructors

## Description

Tool to auto-generate reporting messages for instructors to paste into staff-chat because the leads can't be bothered to check github PR for correction statuses. The tool automatically pull the Github pull request and copy an except of the PR's status into the clipboard.

## Installation

```bash
# HTTPS
git clone https://github.com/duy-the-developer/vcr.git

# GitHub CLI
gh repo clone duy-the-developer/vcr

# Add package to node
npm link
```

### Pre-requisites

- GitHub CLI

### Permission Issue For Mac Users

When trying to execute the bash script in `./index.js`, it is possible for Mac users to run into the following error:

```bash
zsh: permission denied: ./index.js
```

To get around this, simply run the following in the root directory of the project:

```bash
chmod 777 index.js
```

## Usage

### Basic Usage

```bash
# vcr cr [pr-number]
vcr cr 23
```

Example Output:

```
I will be working on Pull Request `#23`, title: `oop - 75% - rob`, id: `PR_kwDOH8r-Js5Cy1rD`, from `RobertsonBA1998` on github.com. Currently the PR has undefined label, and it was last updated on 2022-11-18T02:45:46Z. They have already submitted their workshop.I requested 0 changes. I will verify that all requested changes have in fact been changed properly. Here is the pull request in question: https://github.com/cb-wd-21/js-oop/pull/23
```

### Optional Flag

```bash
# -n
# Number of Changes Requested
# vcr cr [pr-number] -n [number-of-changes-requested]
vcr cr 23 -n 2
```
