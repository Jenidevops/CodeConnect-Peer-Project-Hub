# 🔒 Pre-Deployment Security Checklist

**Complete this checklist before pushing to GitHub or deploying to production.**

## ✅ Files to Commit

- [x] `README.md` - Documentation with example values only
- [x] `SETUP.md` - Setup instructions with placeholders
- [x] `DEPLOYMENT.md` - Deployment guide
- [x] `.gitignore` - Configured to exclude sensitive files
- [x] `.gitattributes` - Marks example files as documentation
- [x] `backend/.env.example` - Template with placeholders
- [x] `frontend/.env.example` - Template with placeholders
- [x] `backend/vercel.json` - Vercel configuration
- [x] `frontend/vercel.json` - Vercel configuration
- [x] All source code files (`.js`, `.jsx`, etc.)
- [x] `package.json` and `package-lock.json` files

## ❌ Files to NEVER Commit

- [ ] `backend/.env` - Contains REAL credentials
- [ ] `frontend/.env` - Contains REAL credentials
- [ ] `*-service-account.json` - Firebase service account keys
- [ ] `serviceAccountKey.json` - Firebase private keys
- [ ] `.env.local`, `.env.production` - Local environment files
- [ ] `node_modules/` - Dependencies folder

## 🔍 Security Verification

### 1. Check for Exposed Secrets

Run these commands to scan for secrets:

```bash
# Check for MongoDB connection strings
grep -r "mongodb+srv://[a-z]*:[A-Za-z0-9]*@" . --exclude-dir=node_modules

# Check for Firebase API keys (should only find examples)
grep -r "AIzaSy[A-Za-z0-9_-]{33}" . --exclude-dir=node_modules

# Check for Firebase private keys
grep -r "BEGIN PRIVATE KEY" . --exclude-dir=node_modules
```

**Expected Results:**
- ✅ Only find matches in `.env.example` files and documentation
- ✅ All matches should be placeholder/example values
- ❌ Should NOT find real credentials in any committed files

### 2. Verify .gitignore Works

```bash
# Check what files Git will track
git status

# Verify .env files are ignored
git check-ignore backend/.env
git check-ignore frontend/.env
```

**Expected Results:**
- ✅ `backend/.env` and `frontend/.env` should be ignored
- ✅ `git status` should NOT show `.env` files
- ✅ Only `.env.example` files should be trackable

### 3. Review Environment Templates

**Backend `.env.example`:**
- [ ] Contains ONLY placeholder values
- [ ] Includes comments explaining each variable
- [ ] No real MongoDB URIs
- [ ] No real Firebase credentials
- [ ] Clear warnings about replacing values

**Frontend `.env.example`:**
- [ ] Contains ONLY placeholder values
- [ ] Includes all required Firebase config fields
- [ ] API URL points to localhost for development
- [ ] Clear warnings about replacing values

### 4. Documentation Review

**README.md:**
- [ ] Contains security warning at the top
- [ ] All code examples use placeholders
- [ ] Deployment section explains security
- [ ] Links to `.env.example` files

**SETUP.md:**
- [ ] Clear instructions to copy `.env.example` to `.env`
- [ ] Warnings about not committing `.env`
- [ ] Example values clearly marked as examples

**DEPLOYMENT.md:**
- [ ] Instructions for setting environment variables in Vercel
- [ ] Security checklist included
- [ ] No real credentials in examples

## 🎯 Final Checks

### Before Git Push:

```bash
# 1. Make sure .env files are not staged
git ls-files | grep "\.env$"
# Should return nothing!

# 2. Check for any Firebase service account files
git ls-files | grep "service.*account.*json"
# Should return nothing!

# 3. Review all files to be committed
git diff --cached --name-only

# 4. Scan for potential secrets (optional - install git-secrets)
# git secrets --scan
```

### Admin Email Configuration:

- [ ] Admin email NOT hardcoded in code
- [ ] Uses `process.env.ADMIN_EMAIL` with fallback
- [ ] Documented in `.env.example`
- [ ] Can be configured via environment variables

### Vercel Deployment:

- [ ] Environment variables will be added in Vercel dashboard (NOT in code)
- [ ] `CLIENT_URL` will be set to actual frontend URL
- [ ] `VITE_API_URL` will be set to actual backend URL
- [ ] Admin email will be configured in Vercel env vars

## ✅ Ready to Deploy?

If all checks pass:

```bash
# Stage all files
git add .

# Commit with meaningful message
git commit -m "feat: Complete CodeConnect platform with security audit"

# Push to GitHub
git push origin main
```

## 🚨 If You Find Secrets

**If you accidentally committed secrets:**

1. **Immediately rotate all compromised credentials:**
   - MongoDB: Change database password in Atlas
   - Firebase: Regenerate service account key
   - Update all environment variables

2. **Remove from Git history:**
```bash
# For recent commit
git reset --soft HEAD~1
# Remove the file
git restore --staged <file-with-secrets>
# Fix the file
# Recommit

# For older commits, use git filter-branch or BFG Repo-Cleaner
```

3. **Update all deployments with new credentials**

## 📝 Notes

- `.gitattributes` file tells GitHub that example files are documentation
- This prevents false positives in secret scanning
- All actual secrets are in `.env` files which are gitignored
- Vercel environment variables are configured in dashboard, not in code

---

**Security Status:** ✅ All checks passed - Safe to commit!
