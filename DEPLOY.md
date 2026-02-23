# Deploy Guide — apply.thecolyerteam.com

## Production
- **URL:** https://apply.thecolyerteam.com
- **Branch:** `main`
- **Repo:** SuperdaddC/loan-application
- **Hosting:** Netlify (site: enchanting-semolina-788344)
- **Deploys:** Automatic on push to `main`

## Staging
- **URL:** https://staging--enchanting-semolina-788344.netlify.app
- **Branch:** `staging`
- **Deploys:** Automatic on push to `staging`

## Deploy Flow

1. Create feature branch from `main`
2. Make changes, commit, push
3. Merge feature branch → `staging` branch
4. Test on staging URL end-to-end (load app, fill all steps, submit, verify in Supabase)
5. Once approved, merge `staging` → `main` (triggers production deploy)
6. Verify production

## Rollback

- **Option A:** `git revert` the commit on main, push (triggers clean deploy)
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
