
# Branching Workflow & Commit Guidelines

This document explains our branching strategy, commit rules, and how to handle common scenarios.  
**All team members must follow this workflow to maintain consistency.**

---

## Table of Contents
1. [Branch Descriptions](#branch-descriptions)
2. [Commit Message Rules](#commit-message-rules)
3. [Merging Strategies](#merging-strategies)
4. [Feature Branch Workflow](#feature-branch-workflow)
5. [Conflict Prevention & Resolution](#conflict-prevention--resolution)
6. [Handling Special Cases](#handling-special-cases)
7. [Prohibited Behaviors](#prohibited-behaviors)
8. [Best Practices](#best-practices)

---

## Branch Descriptions

### 1. `main` Branch
- **Purpose**: Production-ready code. Always stable and deployable.
- **Rules**:
  - No direct commits allowed.
  - Changes only via Pull Requests (PRs) from `testing`.
  - PRs require **approval from @vieerr** and must pass all tests.

### 2. `dev` Branch
- **Purpose**: Latest development work. Used for integrating features.
- **Rules**:
  - No direct commits allowed.
  - Features are merged via PRs from `feat/*` branches.
  - PRs require **approval from @vieerr**.

### 3. `testing` Branch
- **Purpose**: Pre-release testing environment.
- **Rules**:
  - Changes come from `dev` via PRs.
  - Used for final testing before merging to `main`.

### 4. `feat/*` Branches
- **Purpose**: Develop new features or bug fixes.
- **Naming Convention**:  
  `feat/<short-description>` (e.g., `feat/user-login`).  
  `fix/<short-description>` for bug fixes (e.g., `fix/login-error`).
- **Rules**:
  - Created from `dev`.
  - Deleted after merging into `dev`.

---

## Commit Message Rules
Follow the **[Conventional Commits](https://www.conventionalcommits.org/)** standard:

### Format:
```
<type>: <short description>

[optional body]

[optional footer]
```

### Allowed Types:
| Type       | Use Case                                                                 |
|------------|-------------------------------------------------------------------------|
| `feat`     | New feature (e.g., `feat: add user registration form`).                |
| `fix`      | Bug fix (e.g., `fix: resolve login button alignment`).                 |
| `docs`     | Documentation changes (e.g., `docs: update README`).                   |
| `chore`    | Maintenance tasks (e.g., `chore: update dependencies`).                |
| `rework`   | Major refactoring (e.g., `rework: simplify authentication flow`).      |
| `test`     | Test-related changes (e.g., `test: add login component tests`).        |
| `style`    | Code style/formatting (e.g., `style: format indentation`).             |

---

## Merging Strategies

### 1. **Merge Commit**
- **What it does**: Combines two branches and creates a **merge commit**.
- **When to use**:
  - Merging `feat/*` branches into `dev` or `main`.
  - Integrating changes from `dev` into `testing`.
- **When NOT to use**:
  - On long-running feature branches (use rebase instead).
- **Command**:
  ```bash
  git checkout dev
  git merge feat/user-login
  ```

### 2. **Rebase**
- **What it does**: Rewrites the feature branch’s history to include the latest `dev` changes.
- **When to use**:
  - Updating a **local feature branch** with new changes from `dev`.
  - Cleaning up messy commit history *before* creating a PR.
- **When NOT to use**:
  - On shared branches (e.g., `dev`, `main`).
  - If others are working on the same branch.
- **Command**:
  ```bash
  git checkout feat/user-login
  git rebase dev
  ```

### 3. **Squash and Merge**
- **What it does**: Combines all commits from a PR into a **single commit**.
- **When to use**:
  - Merging PRs with many small/experimental commits (e.g., "WIP" or "fix typo" commits).
  - Keeping `dev` and `main` history clean.
- **When NOT to use**:
  - For PRs with meaningful, granular commits you want to preserve.
- **How to do it**:
  - Use the **"Squash and merge"** button in GitHub when merging a PR.

---

## Feature Branch Workflow

### Step 1: Create a Feature Branch
```bash
git checkout dev
git pull origin dev
git checkout -b feat/user-profile
```

### Step 2: Make Commits
```bash
git add .
git commit -m "feat: add profile picture upload"
git push origin feat/user-profile
```

### Step 3: Create a Pull Request (PR)
1. Go to GitHub and create a PR from `feat/user-profile` to `dev`.
2. Add a description using this template:
   ```markdown
   ## What does this PR do?
   - [ ] Adds profile picture upload
   - [ ] Fixes #123 (link to issue)

   ## Notes for @vieerr:
   - Testing instructions: Run `npm test` and check the profile page.
   ```
3. **Only @vieerr can approve PRs**. Tag them in the PR description.

---

## Conflict Prevention & Resolution

### 🛑 Prevent Conflicts Before Pushing
1. **Always start with the latest `dev`**:
   ```bash
   git checkout dev
   git pull origin dev
   ```
2. **Rebase your feature branch** before pushing:
   ```bash
   git checkout feat/your-branch
   git rebase dev
   ```
3. **Test changes after rebasing** to ensure nothing breaks.

### 🔧 Resolving Conflicts
If conflicts occur during rebase/merge:
1. **Open conflicted files** and resolve sections marked with `<<<<<<<`, `=======`, `>>>>>>>`.
2. **Stage resolved files**:
   ```bash
   git add <file-name>
   ```
3. **Continue the process**:
   ```bash
   git rebase --continue  # For rebase
   git commit             # For merge
   ```

---

## Handling Special Cases

### Case 1: Hotfix for `main`
1. Create a hotfix branch from `main`:
   ```bash
   git checkout main
   git pull origin main
   git checkout -b hotfix/login-error
   ```
2. Fix the issue, test, and create a PR to `main` (tag @vieerr for approval).

### Case 2: Reverting a Bad Commit
Use `git revert` to undo changes safely:
```bash
git revert <commit-hash>
git push origin dev
```

---

## Prohibited Behaviors
1. **Force-pushing to shared branches**  
   - Example: `git push origin dev --force`  
   - **Why it’s bad**: Deletes others’ work.  
   - **Do this instead**: Use `git merge` or `git rebase`.

2. **Direct commits to `main`, `dev`, or `testing`**  
   - **Why it’s bad**: Bypasses code review and testing.  
   - **Do this instead**: Always use PRs.

3. **Ignoring conflicts**  
   - **Why it’s bad**: Breaks the build and creates unstable code.  
   - **Do this instead**: Resolve conflicts before pushing.

4. **Vague commit messages**  
   - Example: `git commit -m "fixed stuff"`  
   - **Why it’s bad**: Makes debugging harder.  
   - **Do this instead**: Follow [commit message rules](#commit-message-rules).

---

## Best Practices
1. **Small PRs**: Keep PRs focused on one task (e.g., one feature/fix).  
2. **Test Locally**: Run tests before pushing code.  
3. **Communicate Early**: Ask @vieerr for help **before** the PR is due.  
4. **Delete Old Branches**:  
   ```bash
   git branch -d feat/user-profile          # Delete locally
   git push origin --delete feat/user-profile # Delete remotely
   ```
5. **Pull Frequently**: Update your branch with `dev` daily to avoid conflicts.

---

**Approval Process**: All PRs require approval from **@vieerr**.  
**Need Help?** DM @vieerr.

**Mistakes are acceptable, but not learning from them is not.**

---
