# Deploy Guide — apply.thecolyerteam.com

## Production
- **URL:** https://apply.thecolyerteam.com
- **Branch:** `main`
- **Repo:** SuperdaddC/loan-application
- **Hosting:** Netlify (site: enchanting-semolina-788344)
- **Deploy method:** **merging to `main` publishes.** The Netlify site is linked to this repo (GitHub App,
  `stop_builds: false`), so every push to `main` builds and goes live within seconds, and every pull
  request gets a deploy preview. `./deploy.sh prod` (Netlify CLI) also publishes, from your working tree.
  On 2026-09-21 merging only the first of three stacked PRs published a half-finished `main` for two
  minutes: land a stack with ONE merge into `main`, or retarget each PR to `main` and merge in order.
- **Published folder:** `site/` only. The repo is public on GitHub, but the site must not serve the
  repo root: until 2026-09-21 a `--dir=.` deploy published WISP.md, INCIDENT_RESPONSE.md, COMPLIANCE.md
  and shell scripts at apply.thecolyerteam.com. Never deploy with `--dir=.`.

## Staging
- **URL:** https://staging--enchanting-semolina-788344.netlify.app
- **Branch:** `staging`
- **Deploy method:** `netlify deploy --alias=staging` via CLI

## Quick Deploy

```bash
# Auth: NETLIFY_AUTH_TOKEN if set, otherwise the CLI's stored `netlify login`. Never commit a token.
# If a stale token is exported in your shell, `unset NETLIFY_AUTH_TOKEN` first.

# Deploy to staging
./deploy.sh staging

# Deploy to production
./deploy.sh prod
```

## Deploy Flow

1. Create feature branch from `main`
2. Make changes, commit, push
3. Merge feature branch → `staging` branch
4. Deploy staging: `git checkout staging && ./deploy.sh staging`
5. Test on staging URL end-to-end (load app, fill all steps, submit, verify in Supabase)
6. Once approved, merge `staging` → `main`
7. Deploy production: `git checkout main && ./deploy.sh prod`
8. Verify production: fetch https://apply.thecolyerteam.com/ and compare it with `site/index.html`
   at the deployed commit, and confirm `/WISP.md` returns 404

## Rollback

- **Option A:** `git revert` the commit on main, push, redeploy with `./deploy.sh prod`
- **Option B:** Netlify dashboard → Deploys → click "Publish deploy" on previous deploy

## Schema Add-Only Rule

- Never rename or drop DB columns the current frontend uses
- Add new columns first, deploy frontend that uses them second
- Only consider destructive changes when certain no cached old version exists (wait 24h+ after deploy)

## Pre-Deploy Checklist

- [ ] Tested on staging with full form submission?
- [ ] Any destructive schema changes (rename/drop)? If yes, STOP and redesign as add-only.
- [ ] DB migrations applied before frontend deploy?
- [ ] Checked Netlify deploy log for errors?

## Auto-deploys are ON

The site is linked to SuperdaddC/loan-application, branch `main`. To stop merges from publishing
(for example during a risky change), lock the current production deploy in the Netlify dashboard
(Deploys -> the published deploy -> "Lock to stop auto publishing") and unlock it afterwards.
