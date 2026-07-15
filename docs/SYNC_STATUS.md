# Vercel / GitHub / Cursor sync status

## 1. Push current commits to GitHub (blocked)

- **Status:** Push to `origin` (DrJanDuffy/sienalasvegas.com) fails: `Permission denied to genekellyboyle`.
- **Unblock options:**
  - **A.** Owner adds `genekellyboyle` as collaborator with write access, then run: `git push origin main`
  - **B.** Push from the GitHub account that owns the repo (e.g. DrJanDuffy) on this machine.
  - **C.** Fork the repo on GitHub (genekellyboyle/sienalasvegas.com), then:
    ```powershell
    git remote add myfork git@github.com:genekellyboyle/sienalasvegas.com.git
    git push -u myfork main
    ```
    Open a PR from the fork into DrJanDuffy/sienalasvegas.com; owner merges to sync.

## 2. Pull deployment source from Vercel

- **Status:** Script ready; requires your Vercel token.
- **Run (PowerShell):**
  ```powershell
  $env:VERCEL_TOKEN = "your_token_from_vercel.com/account/tokens"
  $env:VERCEL_PROJECT_NAME = "sienalasvegas.com"
  $env:VERCEL_TEAM_SLUG = "janet-duffys-projects"
  npm run vercel-pull
  ```
- **Result:** Creates `vercel-source/` with deployment files (if the deployment has a retrievable file tree).

## 3. Push vercel-source to GitHub

- **After** step 2 has created `vercel-source/`:
  ```powershell
  npm run vercel-push-github
  ```
- If you use a fork (Option C), set `GITHUB_REPO=genekellyboyle/sienalasvegas.com` before running, or edit the script.

## 4. Pull into Cursor

After step 3 (or after owner merges your PR):

```powershell
git fetch origin
git pull origin main
```

To match GitHub exactly and discard local commits: `git fetch origin && git reset --hard origin/main`.

## 5. Git connection (connected)

**Connected repository:** **LetMeHelpYouREALTY/sienalasvegas.com** — pushes to the connected repo trigger deployments.

- The repo was transferred from `DrJanDuffy/sienalasvegas.com` to the `LetMeHelpYouREALTY` org. That transfer briefly broke the Vercel↔GitHub webhook (no deployments fired for pushes between 2026-03-17 and 2026-07-15); the Git connection was reconnected on 2026-07-15 to restore auto-deploy.
- **Vercel Dashboard** → **sienalasvegas.com** → **Settings** → **Git** to change repo or branch.
- **Options:** Pull Request Comments, Commit Comments, Require Verified Commits, `deployment_status` and `repository_dispatch` events (toggles in the same Git settings).
- Pushes to a fork do not deploy this project; only the connected repo is watched.
