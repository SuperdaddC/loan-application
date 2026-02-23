# Deploy Guide — apply.thecolyerteam.com

## Production
- **URL:** https://apply.thecolyerteam.com
- **Branch:** `main`
- **Repo:** SuperdaddC/loan-application
- **Hosting:** Netlify (site: enchanting-semolina-788344)
- **Deploy method:** `netlify deploy --prod` via CLI (Netlify git-builds disabled — private repo requires GitHub App linking)

## Staging
- **URL:** https://staging--enchanting-semolina-788344.netlify.app
- **Branch:** `staging`
- **Deploy method:** `netlify deploy --alias=staging` via CLI

## Quick Deploy

```bash
# Set token (or export in .bashrc)
export NETLIFY_AUTH_TOKEN=nfp_w3y4AJwqDi6Re8rKeGdQSE7uAny8JPy9b94a

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
8. Verify production

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

## Future: Enable Auto-Deploys

To enable automatic deploys on git push (no manual CLI step), connect the Netlify GitHub App:
1. Go to https://app.netlify.com/projects/enchanting-semolina-788344/configuration/deploys
2. Under "Build settings", click "Link to Git provider"
3. Authorize the Netlify GitHub App for the SuperdaddC account
4. Select the loan-application repo, branch: main
5. Once linked, set `stop_builds: false` and pushes will auto-deploy
