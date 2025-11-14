# 🚀 CodeConnect Deployment Guide

This guide walks you through deploying CodeConnect to production using Vercel for both frontend and backend.

## Prerequisites

- [Vercel Account](https://vercel.com/signup)
- [GitHub Account](https://github.com/signup)
- MongoDB Atlas database
- Firebase project with authentication enabled

## 📋 Pre-Deployment Checklist

- [ ] All sensitive data moved to environment variables
- [ ] `.env` files added to `.gitignore`
- [ ] `.env.example` files created with placeholder values
- [ ] Code tested locally
- [ ] All dependencies installed

## 🔐 Security Audit Completed

✅ **No hardcoded secrets** - All sensitive data uses environment variables  
✅ **Proper .gitignore** - `.env` files will not be committed  
✅ **Example files** - `.env.example` provided for both frontend and backend  
✅ **Admin configuration** - Admin email configurable via `ADMIN_EMAIL` env var  

## 📦 Step 1: Push to GitHub

1. **Initialize Git Repository** (if not already done):
```bash
cd /path/to/CodeConnect
git init
git add .
git commit -m "Initial commit - CodeConnect project"
```

2. **Create GitHub Repository**:
   - Go to [GitHub](https://github.com/new)
   - Create a new repository named `codeconnect`
   - **Do NOT** initialize with README (we already have one)

3. **Push to GitHub**:
```bash
git remote add origin https://github.com/YOUR_USERNAME/codeconnect.git
git branch -M main
git push -u origin main
```

## 🎯 Step 2: Deploy Backend to Vercel

1. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**

2. **Import Project**:
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - **Root Directory**: Select `backend`
   - **Framework Preset**: Other

3. **Environment Variables** - Add these in Vercel:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/codeconnect
   PORT=5001
   NODE_ENV=production
   FIREBASE_PROJECT_ID=your-firebase-project-id
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
   CLIENT_URL=https://your-frontend-domain.vercel.app
   ADMIN_EMAIL=your-admin-email@example.com
   ```

   **Important**: For `FIREBASE_PRIVATE_KEY`, copy the entire key including quotes and `\n` characters.

4. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete
   - Copy your backend URL (e.g., `https://codeconnect-backend.vercel.app`)

## 🎨 Step 3: Deploy Frontend to Vercel

1. **Import Project Again**:
   - Click "Add New" → "Project"
   - Import the same GitHub repository
   - **Root Directory**: Select `frontend`
   - **Framework Preset**: Vite

2. **Environment Variables** - Add these in Vercel:
   ```
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_API_URL=https://your-backend-domain.vercel.app/api
   ```

   **Update `VITE_API_URL`** with your backend URL from Step 2!

3. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete
   - Your frontend will be live at `https://codeconnect-frontend.vercel.app`

## 🔄 Step 4: Update Firebase & MongoDB

### Firebase Configuration

1. **Add Production Domain to Firebase**:
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Select your project
   - Go to Authentication → Settings → Authorized domains
   - Add your Vercel frontend domain: `codeconnect-frontend.vercel.app`

### MongoDB Atlas

1. **Update Network Access**:
   - Go to [MongoDB Atlas](https://cloud.mongodb.com)
   - Network Access → Add IP Address
   - Add `0.0.0.0/0` (allows Vercel's dynamic IPs)
   - Or add specific Vercel IP ranges if preferred

## ✅ Step 5: Verify Deployment

1. **Test Frontend**:
   - Visit your frontend URL
   - Check if homepage loads correctly
   - Verify analytics display

2. **Test Authentication**:
   - Sign in with Google/GitHub
   - Sign up with email/password
   - Verify user profile creation

3. **Test Backend API**:
   - Create a project
   - Rate a project
   - Add comments
   - Test admin features (if admin user)

4. **Test All Features**:
   - [ ] Homepage analytics carousel
   - [ ] Project feed with infinite scroll
   - [ ] Project creation & editing
   - [ ] Star rating system
   - [ ] Comments system
   - [ ] Bookmarks/Favorites
   - [ ] User profiles with bio/social links
   - [ ] Admin delete controls

## 🔧 Troubleshooting

### CORS Errors
- Make sure `CLIENT_URL` in backend matches your frontend domain exactly
- Check Firebase authorized domains

### API Connection Failed
- Verify `VITE_API_URL` in frontend points to correct backend URL
- Check backend logs in Vercel dashboard

### Authentication Issues
- Verify all Firebase env variables are correct
- Check Firebase authorized domains include Vercel domain

### Database Connection
- Verify MongoDB Atlas allows Vercel IPs
- Check `MONGODB_URI` is correct

## 🔄 Updating Your Deployment

To update your live site after making changes:

```bash
git add .
git commit -m "Your update message"
git push origin main
```

Vercel will automatically rebuild and redeploy both frontend and backend!

## 📱 Custom Domain (Optional)

1. Go to Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS records as instructed
5. Update `CLIENT_URL` in backend env vars
6. Update Firebase authorized domains

## 🎉 You're Live!

Your CodeConnect platform is now deployed and accessible to the world!

**Frontend**: `https://your-frontend.vercel.app`  
**Backend API**: `https://your-backend.vercel.app/api`

## 📊 Monitoring

- **Vercel Analytics**: Enabled by default
- **Error Tracking**: Check Vercel logs for errors
- **Performance**: Use Vercel Speed Insights

## 🔒 Security Best Practices

✅ Never commit `.env` files  
✅ Rotate Firebase service account keys periodically  
✅ Use MongoDB Atlas IP whitelist  
✅ Enable Vercel deployment protection if needed  
✅ Keep dependencies updated

---

**Need Help?** Check Vercel documentation or Firebase support.
