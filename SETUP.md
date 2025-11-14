# 🚀 CodeConnect Setup Guide

Complete step-by-step guide to get CodeConnect up and running on your machine.

## 📋 Prerequisites Checklist

Before starting, make sure you have:
- [ ] Node.js (v16 or higher) installed - [Download](https://nodejs.org/)
- [ ] MongoDB installed locally OR MongoDB Atlas account - [Atlas](https://www.mongodb.com/atlas)
- [ ] Firebase account - [Console](https://console.firebase.google.com/)
- [ ] Git installed
- [ ] Code editor (VS Code recommended)

## 🔥 Firebase Setup (Required)

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project"
3. Enter project name: `codeconnect` (or your choice)
4. Disable Google Analytics (optional)
5. Click "Create Project"

### 2. Enable Authentication

1. In Firebase Console, go to **Build → Authentication**
2. Click "Get Started"
3. Enable **Google** sign-in provider
4. Enable **GitHub** sign-in provider (optional)
   - For GitHub: You'll need to create a GitHub OAuth App
   - Go to GitHub Settings → Developer Settings → OAuth Apps
   - Create new OAuth App with callback URL from Firebase

### 3. Get Web App Credentials

1. In Firebase Console, click gear icon → Project Settings
2. Scroll to "Your apps" section
3. Click web icon (</>) to add web app
4. Register app with nickname: `codeconnect-web`
5. Copy the config object - you'll need these values:

```javascript
{
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
}
```

### 4. Get Admin SDK Credentials

1. In Firebase Console → Project Settings → Service Accounts
2. Click "Generate New Private Key"
3. Download the JSON file
4. You'll need these values from the JSON:
   - `project_id`
   - `private_key`
   - `client_email`

## 💾 MongoDB Setup

### Option A: Local MongoDB

1. Install MongoDB Community Edition
2. Start MongoDB service:
   ```bash
   # macOS
   brew services start mongodb-community
   
   # Windows
   net start MongoDB
   ```
3. Your connection string: `mongodb://localhost:27017/codeconnect`

### Option B: MongoDB Atlas (Recommended)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create free account
3. Create new cluster (M0 Free tier)
4. Create database user:
   - Database Access → Add New User
   - Username & Password authentication
   - Save credentials
5. Whitelist IP:
   - Network Access → Add IP Address
   - Allow access from anywhere: `0.0.0.0/0`
6. Get connection string:
   - Clusters → Connect → Connect your application
   - Copy connection string
   - Replace `<password>` with your user password

## ⚙️ Installation Steps

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

Edit `backend/.env`:
```env
# EXAMPLE CONFIGURATION - Replace with your actual values
# MongoDB
MONGODB_URI=mongodb://localhost:27017/codeconnect
# OR for Atlas (EXAMPLE - use your actual credentials):
# MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/codeconnect

# Server
PORT=5001
NODE_ENV=development

# Firebase Admin (from service account JSON - EXAMPLE VALUES)
FIREBASE_PROJECT_ID=your-project-id-here
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_ACTUAL_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com

# CORS
CLIENT_URL=http://localhost:3000

# Admin Email (optional - configure your admin user)
ADMIN_EMAIL=your-admin-email@example.com
```

**Important Notes:**
- ⚠️ These are EXAMPLE values - replace with your actual credentials
- Copy Firebase private key from downloaded service account JSON
- Keep the `\n` characters and wrap in double quotes
- Never commit the actual `.env` file to Git

Start backend:
```bash
npm run dev
```

You should see:
```
🚀 CodeConnect API server running on port 5000
✅ MongoDB Connected: ...
📊 Database: codeconnect
```

### 2. Frontend Setup

```bash
# Navigate to frontend directory (open new terminal)
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

Edit `frontend/.env`:
```env
# Firebase Web Config (from Firebase web app config)
# EXAMPLE VALUES - Replace with your actual Firebase configuration
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456

# API URL (backend server)
VITE_API_URL=http://localhost:5001/api
```

Start frontend:
```bash
npm run dev
```

You should see:
```
VITE v5.x.x ready in xxx ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
```

## 🧪 Testing the Application

### 1. Open Browser
Navigate to: `http://localhost:3000`

### 2. Test Authentication
1. Click "Sign in with Google"
2. Complete Google authentication
3. You should be redirected to the feed page

### 3. Create First Project
1. Click "New Project" button
2. Fill in project details:
   - Title: "My First Project"
   - Description: "This is a test project"
   - Tags: "React, Node.js"
   - GitHub URL: (optional)
   - Live Demo: (optional)
3. Click "Create Project"
4. You should see success message and redirect to dashboard

### 4. Test Features
- ✅ View project in feed
- ✅ Click project to view details
- ✅ Like the project
- ✅ Add a comment
- ✅ Bookmark project
- ✅ Toggle dark/light theme
- ✅ Edit your project
- ✅ Delete your project

## 🐛 Troubleshooting

### Backend Issues

**MongoDB Connection Failed**
```
Solution:
- Check if MongoDB is running
- Verify connection string in .env
- Check network access in Atlas
```

**Firebase Auth Error**
```
Solution:
- Verify Firebase credentials in .env
- Check if private key format is correct
- Ensure service account has proper permissions
```

### Frontend Issues

**Firebase Auth Not Working**
```
Solution:
- Check Firebase config in .env
- Verify auth providers are enabled in Firebase Console
- Clear browser cache and cookies
```

**API Requests Failing**
```
Solution:
- Check if backend is running on port 5000
- Verify VITE_API_URL in .env
- Check CORS settings in backend
```

**Theme Not Switching**
```
Solution:
- Clear localStorage
- Check browser console for errors
- Refresh the page
```

## 📝 Environment Variables Summary

### Backend (.env)
```env
MONGODB_URI=               # MongoDB connection string
PORT=5000                  # Server port
NODE_ENV=development       # Environment
FIREBASE_PROJECT_ID=       # From Firebase service account
FIREBASE_PRIVATE_KEY=      # From Firebase service account (with \n)
FIREBASE_CLIENT_EMAIL=     # From Firebase service account
CLIENT_URL=                # Frontend URL for CORS
```

### Frontend (.env)
```env
VITE_FIREBASE_API_KEY=              # From Firebase web config
VITE_FIREBASE_AUTH_DOMAIN=          # From Firebase web config
VITE_FIREBASE_PROJECT_ID=           # From Firebase web config
VITE_FIREBASE_STORAGE_BUCKET=       # From Firebase web config
VITE_FIREBASE_MESSAGING_SENDER_ID=  # From Firebase web config
VITE_FIREBASE_APP_ID=               # From Firebase web config
VITE_API_URL=                       # Backend API URL
```

## 🎉 Success Checklist

- [ ] Backend server running on port 5000
- [ ] MongoDB connected successfully
- [ ] Frontend running on port 3000
- [ ] Can sign in with Google
- [ ] Can create a project
- [ ] Can view project details
- [ ] Can like and comment
- [ ] Theme toggle works
- [ ] No console errors

## 🚀 Next Steps

Once everything is working:

1. **Customize the design**
   - Update colors in `tailwind.config.js`
   - Modify components in `src/components/`

2. **Add more features**
   - Rating system
   - Advanced search filters
   - User following system
   - Notifications

3. **Deploy your application**
   - Backend: Render, Railway, or Heroku
   - Frontend: Vercel or Netlify
   - Database: MongoDB Atlas

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Manual](https://www.mongodb.com/docs/)
- [Firebase Auth Docs](https://firebase.google.com/docs/auth)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)

## 💬 Need Help?

If you encounter any issues:
1. Check the troubleshooting section above
2. Review the console logs for errors
3. Verify all environment variables are set correctly
4. Make sure all dependencies are installed

---

**Happy Coding! 🎨**
