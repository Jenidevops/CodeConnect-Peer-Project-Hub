# 🚀 CodeConnect

**CodeConnect - Connect. Code. Collaborate.**

A modern, production-ready full-stack platform where developers showcase projects, discover inspiration, and build community through meaningful interactions.

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)
![Node](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb)


## ✨ Key Features

### 🎯 Core Functionality
- **📊 Analytics Dashboard** - Real-time platform statistics with carousel display of top-rated and most-liked projects
- **⭐ 5-Star Rating System** - Interactive rating system with weighted averages and user engagement tracking
- **👤 Enhanced User Profiles** - Comprehensive profiles with bio, location, skills, and social links (GitHub, LinkedIn, Email)
- **♾️ Infinite Scroll** - Smooth, auto-loading project feed for seamless browsing experience
- **🛡️ Admin Controls** - Role-based access control with admin management capabilities
- **🔖 Bookmarks & Favorites** - Save and organize projects for later reference
- **💬 Comments System** - Threaded discussions with likes on individual comments
- **🏷️ Smart Tagging** - Multi-tag project categorization for better discoverability
- **🔍 Advanced Search** - Filter projects by keywords, tags, authors, and ratings

### 🎨 Design & User Experience
- **🌓 Dark/Light Theme** - Seamless theme switching with system preference detection and persistence
- **🎭 Modern UI** - Netlify-inspired design with glassmorphism and gradient effects
- **📱 Fully Responsive** - Mobile-first design that scales perfectly across all devices
- **✨ Smooth Animations** - Framer Motion powered micro-interactions and page transitions
- **🎨 Gradient Design System** - Consistent teal-to-purple gradient branding throughout
- **📊 Interactive Cards** - Hover effects, skeleton loading, and dynamic content updates

### 🔐 Authentication & Security
- **🔑 Multi-Provider Auth** - Google OAuth, GitHub OAuth, and Email/Password authentication
- **🔒 Firebase Integration** - Secure server-side token validation with Firebase Admin SDK
- **🛡️ Protected Routes** - Route guards preventing unauthorized access to protected resources
- **✅ Input Validation** - Client and server-side validation with sanitization
- **🎫 JWT Management** - Automatic token refresh and secure session handling
- **👮 Role-Based Access** - Admin system with configurable admin email via environment variables

## 🛠️ Tech Stack

### Frontend Architecture
| Technology | Purpose | Version |
|-----------|---------|---------|
| **React** | UI Library with modern hooks | 18.2.0 |
| **Vite** | Lightning-fast build tool & dev server | 5.0.8 |
| **Tailwind CSS** | Utility-first CSS framework | 3.4.0 |
| **Framer Motion** | Production-ready animation library | 10.16.16 |
| **React Router** | Client-side routing & navigation | 6.21.1 |
| **Axios** | Promise-based HTTP client | 1.6.5 |
| **React Hot Toast** | Beautiful toast notifications | 2.4.1 |
| **React Icons** | Comprehensive icon library | 4.12.0 |
| **Firebase** | Client-side authentication | 10.7.2 |

### Backend Architecture
| Technology | Purpose | Version |
|-----------|---------|---------|
| **Node.js** | JavaScript runtime environment | LTS |
| **Express.js** | Minimal & flexible web framework | 4.18.2 |
| **MongoDB** | NoSQL database (cloud-hosted) | Atlas |
| **Mongoose** | Elegant MongoDB object modeling | 8.1.0 |
| **Firebase Admin** | Server-side auth verification | 12.0.0 |
| **Express Validator** | Input validation & sanitization | 7.0.1 |
| **CORS** | Cross-origin resource sharing | 2.8.5 |
| **dotenv** | Environment variable management | 16.3.1 |

### Development & Deployment
- **Git & GitHub** - Version control and collaboration
- **Vercel** - Frontend & backend deployment
- **MongoDB Atlas** - Cloud database hosting
- **Firebase Console** - Authentication management
- **ESLint** - Code quality and consistency

## 📁 Project Architecture

```
CodeConnect/
├── backend/                    # Express.js REST API Server
│   ├── config/
│   │   ├── database.js        # MongoDB connection configuration
│   │   └── firebase.js        # Firebase Admin SDK initialization
│   ├── controllers/
│   │   ├── projectController.js   # Project CRUD operations
│   │   ├── userController.js      # User management & stats
│   │   ├── commentController.js   # Comment system logic
│   │   ├── bookmarkController.js  # Bookmark functionality
│   │   └── ratingController.js    # 5-star rating system
│   ├── middleware/
│   │   ├── auth.js            # Firebase token verification & user sync
│   │   └── validate.js        # Request validation middleware
│   ├── models/
│   │   ├── User.js            # User schema with admin role
│   │   ├── Project.js         # Project schema with ratings
│   │   ├── Comment.js         # Comment schema with likes
│   │   ├── Bookmark.js        # Bookmark relationships
│   │   └── Rating.js          # Rating schema (1-5 stars)
│   ├── routes/
│   │   ├── auth.js            # Authentication endpoints
│   │   ├── projects.js        # Project CRUD & rating routes
│   │   ├── users.js           # User & stats routes
│   │   ├── comments.js        # Comment routes
│   │   └── bookmarks.js       # Bookmark routes
│   ├── .env.example           # Environment template
│   ├── .gitignore             # Git ignore rules
│   ├── vercel.json            # Vercel deployment config
│   ├── package.json           # Dependencies & scripts
│   └── server.js              # Application entry point
│
├── frontend/                   # React + Vite Application
│   ├── public/                # Static assets
│   └── src/
│       ├── components/
│       │   ├── common/
│       │   │   ├── Button.jsx           # Reusable button component
│       │   │   ├── Input.jsx            # Form input component
│       │   │   ├── Textarea.jsx         # Textarea component
│       │   │   ├── Modal.jsx            # Modal wrapper
│       │   │   ├── ProjectCard.jsx      # Project display card
│       │   │   ├── StarRating.jsx       # Interactive star rating
│       │   │   ├── LoadingSpinner.jsx   # Loading states
│       │   │   └── EditProfileModal.jsx # Profile editing modal
│       │   └── layout/
│       │       └── Navbar.jsx           # Main navigation
│       ├── config/
│       │   └── firebase.js    # Firebase client configuration
│       ├── context/
│       │   ├── AuthContext.jsx      # Authentication state
│       │   └── ThemeContext.jsx     # Theme management
│       ├── pages/
│       │   ├── Home.jsx             # Landing page with analytics
│       │   ├── Feed.jsx             # Project feed (infinite scroll)
│       │   ├── ProjectDetail.jsx    # Project view with ratings
│       │   ├── CreateProject.jsx    # Project creation form
│       │   ├── EditProject.jsx      # Project editing form
│       │   ├── Profile.jsx          # User profile page
│       │   ├── Dashboard.jsx        # User dashboard
│       │   ├── Favorites.jsx        # Bookmarked projects
│       │   ├── Login.jsx            # Login page
│       │   ├── Signup.jsx           # Signup page
│       │   ├── ForgotPassword.jsx   # Password reset
│       │   └── NotFound.jsx         # 404 page
│       ├── routes/
│       │   └── AppRoutes.jsx  # Route configuration
│       ├── services/
│       │   └── api.js         # Axios API service layer
│       ├── App.jsx            # Main application component
│       ├── main.jsx           # React entry point
│       └── index.css          # Global styles & Tailwind
│   ├── .env.example           # Environment template
│   ├── .gitignore             # Git ignore rules
│   ├── vercel.json            # Vercel deployment config
│   ├── package.json           # Dependencies & scripts
│   ├── tailwind.config.js     # Tailwind configuration
│   ├── postcss.config.js      # PostCSS configuration
│   └── vite.config.js         # Vite build configuration
│
├── .gitignore                 # Root Git ignore
├── DEPLOYMENT.md              # Comprehensive deployment guide
├── README.md                  # This file
└── SETUP.md                   # Detailed setup instructions
```

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB Atlas Account** - [Sign Up](https://www.mongodb.com/cloud/atlas/register)
- **Firebase Project** - [Console](https://console.firebase.google.com/)
- **Git** - [Download](https://git-scm.com/downloads)

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/codeconnect.git
cd codeconnect
```

### 2️⃣ Backend Setup

**Navigate to backend directory:**
```bash
cd backend
```

**Install dependencies:**
```bash
npm install
```

**Create environment file:**
```bash
cp .env.example .env
```

**Configure `.env` file:**
```env
# ⚠️ EXAMPLE VALUES - Replace with your actual credentials
# Get these from Firebase Console > Project Settings > Service Accounts

# MongoDB Atlas connection string
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/codeconnect

# Server configuration
PORT=5001
NODE_ENV=development

# Firebase Admin SDK (from Firebase Console > Project Settings > Service Accounts)
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Actual-Private-Key-Here\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com

# CORS origin
CLIENT_URL=http://localhost:3000

# Admin user email (configurable)
ADMIN_EMAIL=your-admin-email@example.com
```

> **Important:** 
> - These are placeholder values - replace with your actual credentials
> - Never commit the `.env` file to Git (it's already in `.gitignore`)
> - Copy Firebase private key from your downloaded service account JSON file

**Start backend server:**
```bash
npm start
# Server runs on http://localhost:5001
```

### 3️⃣ Frontend Setup

**Open new terminal and navigate to frontend:**
```bash
cd frontend
```

**Install dependencies:**
```bash
npm install
```

**Create environment file:**
```bash
cp .env.example .env
```

**Configure `.env` file:**
```env
# ⚠️ EXAMPLE VALUES - Replace with your actual Firebase configuration
# Get these from Firebase Console > Project Settings > General

# Firebase Configuration (from Firebase Console > Project Settings > General)
VITE_FIREBASE_API_KEY=your_firebase_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id

# Backend API URL
VITE_API_URL=http://localhost:5001/api
```

> **Note:** These are placeholder values. Replace with your actual Firebase project credentials.

**Start development server:**
```bash
npm run dev
# App runs on http://localhost:3000
```

### 4️⃣ Firebase Configuration

1. **Enable Authentication Providers:**
   - Go to Firebase Console > Authentication > Sign-in method
   - Enable: Google, GitHub, Email/Password

2. **Add Authorized Domains:**
   - Authentication > Settings > Authorized domains
   - Add: `localhost`

3. **Generate Service Account:**
   - Project Settings > Service Accounts
   - Click "Generate new private key"
   - Copy credentials to backend `.env`

### 5️⃣ MongoDB Atlas Setup

1. **Create Cluster:**
   - Create free M0 cluster
   - Select region closest to you

2. **Database Access:**
   - Create database user with read/write permissions
   - Note username and password for connection string

3. **Network Access:**
   - Add IP: `0.0.0.0/0` (for development)
   - For production, whitelist specific IPs

4. **Get Connection String:**
   - Click "Connect" > "Connect your application"
   - Copy connection string and update `.env`

### ✅ Verify Installation

Visit `http://localhost:3000` - you should see the CodeConnect homepage!

**Test the following:**
- ✅ Homepage loads with analytics
- ✅ Sign up with email/password works
- ✅ Google/GitHub OAuth works
- ✅ Create a project
- ✅ Rate a project (5 stars)
- ✅ Add comments
- ✅ Bookmark projects

### 🔧 Troubleshooting

**Backend won't start:**
- Check MongoDB connection string is correct
- Verify Firebase credentials in `.env`
- Ensure PORT 5001 is not in use

**Frontend can't connect:**
- Verify `VITE_API_URL` points to `http://localhost:5001/api`
- Check backend server is running
- Clear browser cache and restart

**Authentication fails:**
- Verify all Firebase env variables are correct
- Check Firebase authorized domains include localhost
- Ensure authentication providers are enabled

---

## 📡 API Documentation

### Authentication Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/verify` | Verify Firebase token & sync user | ✅ |
| GET | `/api/auth/me` | Get current user profile | ✅ |

### Project Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/projects` | Get all projects (supports pagination, search, sorting) | ❌ |
| GET | `/api/projects/:id` | Get single project details | ❌ |
| POST | `/api/projects` | Create new project | ✅ |
| PUT | `/api/projects/:id` | Update project (owner/admin only) | ✅ |
| DELETE | `/api/projects/:id` | Delete project (owner/admin only) | ✅ |
| POST | `/api/projects/:id/like` | Toggle project like | ✅ |

### Rating Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/projects/:id/rate` | Rate a project (1-5 stars) | ✅ |
| GET | `/api/projects/:id/rating/user` | Get user's rating for project | ✅ |
| GET | `/api/projects/:id/ratings` | Get all ratings with distribution | ❌ |
| DELETE | `/api/projects/:id/rating` | Delete user's rating | ✅ |

### Comment Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/comments/:projectId` | Get all comments for project | ❌ |
| POST | `/api/comments/:projectId` | Create new comment | ✅ |
| DELETE | `/api/comments/:id` | Delete comment (owner/admin only) | ✅ |
| POST | `/api/comments/:id/like` | Toggle comment like | ✅ |

### Bookmark Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/bookmarks` | Get user's bookmarked projects | ✅ |
| POST | `/api/bookmarks/:projectId` | Toggle project bookmark | ✅ |
| GET | `/api/bookmarks/check/:projectId` | Check if project is bookmarked | ✅ |

### User Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/users/:userId/projects` | Get projects by user | ❌ |
| GET | `/api/users/stats` | Get platform statistics | ❌ |
| GET | `/api/users/profile/:userId` | Get user profile | ❌ |
| PUT | `/api/users/profile` | Update own profile | ✅ |

### Query Parameters (GET /api/projects)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 12)
- `search` - Search in title/description/author
- `tags` - Filter by tags (comma-separated)
- `sortBy` - Sort order: `recent`, `popular`, `rating`

## 🎨 Design System & UI Highlights

### Color Palette

**Light Theme:**
```css
Background: #FFFFFF, #F8FAFC, #F1F5F9
Primary Gradient: linear-gradient(135deg, #14B8A6 0%, #6366F1 100%)
Text: #1F2937, #4B5563
Accent: #14B8A6 (Teal), #6366F1 (Indigo)
```

**Dark Theme:**
```css
Background: #0F172A, #1E293B, #334155
Primary Gradient: linear-gradient(135deg, #14B8A6 0%, #6366F1 100%)
Text: #F1F5F9, #CBD5E1
Accent: #14B8A6 (Teal), #6366F1 (Indigo)
```

### Component Library

**StarRating Component:**
- Interactive 5-star rating system
- Hover effects with color transitions
- Readonly mode for display
- Multiple sizes (sm, md, lg, xl)
- Shows rating count and average

**ProjectCard Component:**
- Glassmorphism backdrop effect
- Smooth hover scale animation
- Author avatar and metadata
- Tag chips with hover effects
- Star rating display integration

**Analytics Carousel:**
- Navigation arrows with circular design
- Dot indicators for multiple items
- Auto-scales for top 5 projects
- Click-to-navigate functionality
- Responsive grid layout

**EditProfileModal:**
- Full-screen overlay with backdrop blur
- Form sections for bio, location, social links
- Character count for bio (500 max)
- Skills input with tag display
- Smooth enter/exit animations

### Animation Patterns

**Framer Motion Variants:**
- Page transitions: Fade + scale
- Card hover: Scale 1.02 with shadow lift
- Button interactions: Scale 0.95 on tap
- List items: Stagger children animations
- Modal: Spring-based smooth appearing

### Responsive Breakpoints
```javascript
sm: '640px'   // Mobile landscape
md: '768px'   // Tablet
lg: '1024px'  // Desktop
xl: '1280px'  // Large desktop
2xl: '1536px' // Extra large
```

## 📱 Features Showcase

### 🏠 Homepage with Analytics Dashboard
- Real-time platform statistics (total projects, users, likes, ratings)
- **Top 5 Most Liked Projects** - Interactive carousel with navigation arrows
- **Top 5 Highest Rated Projects** - Carousel showcasing best-rated content
- Dot indicators for carousel navigation
- Click-to-view project functionality
- Responsive grid layout adapting to screen sizes

### ⭐ Advanced Rating System
- Interactive 5-star rating component with hover effects
- Prevents self-rating (users can't rate their own projects)
- Calculates weighted averages across all ratings
- Displays rating distribution (how many 1-star, 2-star, etc.)
- Shows total rating count next to average
- Users can update or delete their ratings
- Real-time rating updates without page refresh

### 👤 Enhanced User Profiles
- **Comprehensive Profile Information:**
  - Display name and email
  - Profile photo from OAuth provider
  - Bio section (500 character limit)
  - Location with icon
  - Website link with validation
  - Social links: GitHub, LinkedIn, Email
  - Skills displayed as interactive tags
  - Admin badge for admin users

- **Profile Editing:**
  - Modal-based editing interface
  - Form validation for all fields
  - Character counter for bio
  - Comma-separated skills input
  - URL validation for website and social links
  - Instant updates without page reload

### ♾️ Infinite Scroll on Feed
- **Smooth Auto-Loading:**
  - Projects load automatically as user scrolls
  - Intersection Observer API for efficient detection
  - Loading spinner while fetching more content
  - "You've reached the end!" message when no more projects
  - No manual "Load More" button needed
  - Maintains scroll position on navigation

### 🛡️ Admin Control System
- **Email-Based Admin Configuration:**
  - Admin email configurable via environment variable
  - Auto-assigns admin role on user creation/login
  - Admin badge displayed on profiles and project cards

- **Admin Capabilities:**
  - Delete any project (not just own projects)
  - "Admin Delete" button with shield icon
  - Edit any project (full access)
  - Visible admin indicators throughout UI

### 🔖 Bookmarks & Favorites
- Save projects for later reference
- Quick access from user dashboard
- Toggle bookmark with single click
- Visual indicator on bookmarked projects
- Dedicated favorites page with all saved projects

### 💬 Interactive Comments System
- Threaded discussions on each project
- Like individual comments
- Delete own comments
- Admin can delete any comment
- Real-time comment count updates
- Author avatars and timestamps

### 🏷️ Smart Tagging & Search
- Multi-tag support for projects
- Click tags to filter by category
- Full-text search in titles and descriptions
- Search by author name
- Combined search and tag filtering
- Sort by: Recent, Popular, Highest Rated

### 🌓 Theme System
- **Dark and Light Mode:**
  - Smooth theme transitions
  - System preference detection
  - Persistent theme choice (localStorage)
  - All components adapt to theme
  - Consistent color scheme across modes

## 🔒 Security & Best Practices

### Implemented Security Measures

✅ **Environment Variables**
- All sensitive data stored in `.env` files
- `.env` files excluded from version control
- Separate configs for development and production
- Environment templates provided (`.env.example`)

✅ **Authentication Security**
- Firebase Admin SDK for server-side token verification
- JWT token validation on protected routes
- Automatic token refresh handling
- Secure session management

✅ **Data Validation**
- Server-side validation with Express Validator
- Client-side form validation
- Input sanitization against XSS
- MongoDB query injection prevention

✅ **Authorization**
- Role-based access control (Admin system)
- Resource ownership verification
- Protected routes with middleware
- Admin email configurable via environment

✅ **API Security**
- CORS configured with whitelist
- Rate limiting ready for production
- HTTP-only cookies for sensitive data
- Secure headers configuration

✅ **Database Security**
- MongoDB Atlas with IP whitelist
- Encrypted connections (TLS/SSL)
- Database user authentication
- Indexes for performance optimization

### Production Security Checklist

Before deploying to production:

- [ ] Rotate all API keys and secrets
- [ ] Enable Firebase App Check
- [ ] Configure proper CORS origins
- [ ] Set up MongoDB IP whitelist
- [ ] Enable Vercel deployment protection
- [ ] Add rate limiting middleware
- [ ] Configure security headers
- [ ] Enable HTTPS only
- [ ] Set up error monitoring (Sentry)
- [ ] Review and audit dependencies

## 🚀 Deployment Strategy

### GitHub Repository Structure

**Single Monorepo Approach:**
```
codeconnect/                    # ✅ ONE GitHub Repository
├── backend/                    # Backend application folder
│   ├── server.js
│   ├── .env.example           # ✅ Committed (safe placeholders)
│   ├── .env                   # ❌ NOT committed (in .gitignore)
│   └── ...
├── frontend/                   # Frontend application folder
│   ├── src/
│   ├── .env.example           # ✅ Committed (safe placeholders)
│   ├── .env                   # ❌ NOT committed (in .gitignore)
│   └── ...
├── .gitignore                 # Prevents .env files from being committed
├── .gitattributes             # Tells GitHub example files are documentation
├── README.md                  # This file
└── DEPLOYMENT.md              # Deployment instructions
```

### Vercel Deployment (Two Separate Projects)

**From the SAME GitHub repo, create TWO Vercel projects:**

#### 🔧 Project 1: Backend API
- **Root Directory:** `backend/`
- **Framework:** Other
- **Build Command:** (none)
- **Install Command:** `npm install`
- **Environment Variables:** Add from `.env.example`

#### 🎨 Project 2: Frontend App
- **Root Directory:** `frontend/`
- **Framework:** Vite
- **Build Command:** `npm run build`
- **Install Command:** `npm install`
- **Environment Variables:** Add from `.env.example`

### Why This Approach?

✅ **Easy to manage** - All code in one repository  
✅ **Separate deployments** - Backend and frontend deploy independently  
✅ **Scalable** - Each can scale based on its own needs  
✅ **Clean URLs** - Backend: `api.yourdomain.com`, Frontend: `yourdomain.com`  
✅ **Security** - Real `.env` files never committed to Git

---

## 🌐 Vercel Deployment (Recommended)

**Backend & Frontend can be deployed separately on Vercel from the same GitHub repository.**

#### Quick Deploy

[![Deploy Backend](https://vercel.com/button)](https://vercel.com/new)
[![Deploy Frontend](https://vercel.com/button)](https://vercel.com/new)

#### Manual Deployment Steps

1. **Push to GitHub:**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Deploy Backend (Vercel Project #1):**
   - Go to Vercel Dashboard
   - Click "Import Project"
   - Select your GitHub repository
   - **Set root directory to `backend/`** ⚠️ Important!
   - Framework: Other
   - Add environment variables from `backend/.env.example`
   - Click Deploy!
   - Copy your backend URL (e.g., `https://codeconnect-backend.vercel.app`)

3. **Deploy Frontend (Vercel Project #2):**
   - Go to Vercel Dashboard again
   - Click "Import Project"
   - Select the SAME GitHub repository
   - **Set root directory to `frontend/`** ⚠️ Important!
   - Framework: Vite
   - Add environment variables from `frontend/.env.example`
   - **Update `VITE_API_URL`** with your backend URL from step 2
   - Click Deploy!
   - Import repository again
   - Set root directory to `frontend`
   - Add environment variables
   - Update `VITE_API_URL` with backend URL
   - Deploy!

4. **Post-Deployment:**
   - Update Firebase authorized domains
   - Update MongoDB IP whitelist
   - Test all features in production



### Alternative Hosting Options

**Backend:**
- Railway
- Render
- Heroku
- AWS EC2/Elastic Beanstalk

**Frontend:**
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting

### Environment Variables for Production

**Backend (Vercel):**
```
MONGODB_URI=<your-production-mongodb-uri>
NODE_ENV=production
FIREBASE_PROJECT_ID=<your-project-id>
FIREBASE_PRIVATE_KEY=<your-private-key>
FIREBASE_CLIENT_EMAIL=<your-client-email>
CLIENT_URL=<your-frontend-url>
ADMIN_EMAIL=<admin-email>
```

**Frontend (Vercel):**
```
VITE_FIREBASE_API_KEY=<your-api-key>
VITE_FIREBASE_AUTH_DOMAIN=<your-auth-domain>
VITE_FIREBASE_PROJECT_ID=<your-project-id>
VITE_FIREBASE_STORAGE_BUCKET=<your-storage-bucket>
VITE_FIREBASE_MESSAGING_SENDER_ID=<your-sender-id>
VITE_FIREBASE_APP_ID=<your-app-id>
VITE_API_URL=<your-backend-url>/api
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the Repository**
   ```bash
   git clone https://github.com/yourusername/codeconnect.git
   ```

2. **Create Feature Branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```

3. **Make Changes**
   - Follow existing code style
   - Add comments for complex logic
   - Update documentation if needed

4. **Commit Changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```

5. **Push to Branch**
   ```bash
   git push origin feature/AmazingFeature
   ```

6. **Open Pull Request**
   - Describe your changes in detail
   - Reference any related issues
   - Wait for review and feedback

### Code Style Guidelines
- Use ES6+ JavaScript features
- Follow React best practices
- Use functional components with hooks
- Keep components small and focused
- Write meaningful commit messages
- Add comments for complex logic

## 🐛 Bug Reports & Feature Requests

Found a bug or have a feature idea? Please open an issue!

**Bug Report Template:**
- Description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Environment details (browser, OS)

**Feature Request Template:**
- Problem you're trying to solve
- Proposed solution
- Alternative solutions considered
- Additional context

## � Key Learning Outcomes & Technical Skills

This full-stack project demonstrates proficiency in:

### Frontend Development
- ✅ **Modern React Development** - Functional components, custom hooks, context API
- ✅ **State Management** - React Context for auth and theme, local state optimization
- ✅ **Routing & Navigation** - React Router v6 with protected routes and nested routing
- ✅ **API Integration** - Axios for HTTP requests, error handling, loading states
- ✅ **Form Handling** - Controlled components, validation, file uploads
- ✅ **Animation** - Framer Motion for smooth transitions and micro-interactions
- ✅ **Responsive Design** - Mobile-first approach with Tailwind CSS
- ✅ **Performance Optimization** - Code splitting, lazy loading, memo optimization
- ✅ **Accessibility** - Semantic HTML, ARIA labels, keyboard navigation

### Backend Development
- ✅ **RESTful API Design** - Well-structured endpoints following REST principles
- ✅ **Database Modeling** - Mongoose schemas with relationships and indexing
- ✅ **Authentication & Authorization** - Firebase Admin SDK, JWT verification, role-based access
- ✅ **Middleware Implementation** - Custom auth, validation, and error handling middleware
- ✅ **Data Validation** - Server-side validation with Express Validator
- ✅ **Error Handling** - Comprehensive error responses and logging
- ✅ **Security Best Practices** - Input sanitization, CORS, environment variables
- ✅ **Database Operations** - CRUD operations, aggregations, transactions

### DevOps & Tools
- ✅ **Version Control** - Git workflow with meaningful commits
- ✅ **Environment Management** - Separate configs for dev/prod
- ✅ **Deployment** - Vercel deployment for both frontend and backend
- ✅ **Cloud Services** - MongoDB Atlas, Firebase Authentication
- ✅ **Build Tools** - Vite for modern frontend builds
- ✅ **Package Management** - npm dependencies and scripts

### Software Engineering Principles
- ✅ **Component Architecture** - Reusable, modular components
- ✅ **Separation of Concerns** - Clear separation of UI, business logic, and data
- ✅ **DRY Principle** - Avoiding code duplication through abstraction
- ✅ **Code Organization** - Logical folder structure and file naming
- ✅ **Documentation** - Comprehensive README and inline comments
- ✅ **Error Handling** - Graceful degradation and user-friendly error messages

## 📄 License

This project is licensed under the **MIT License** - see below for details:

```
MIT License

Copyright (c) 2024 CodeConnect

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 👨‍💻 Author

**Built with ❤️ by Jenifer Nirmalraj**

- Portfolio: [Your Portfolio URL]
- GitHub: [@YourGitHubUsername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Email: jenidevops@gmail.com

### Project Context
This project was developed as a comprehensive full-stack application demonstrating modern web development practices, MERN stack proficiency, and production-ready code quality. It showcases skills in:
- Full-stack JavaScript development
- Modern React with hooks and context
- RESTful API design and implementation
- Database design and optimization
- Authentication and authorization
- Deployment and DevOps practices

## 🙏 Acknowledgments

**Inspiration:**
- UI/UX inspired by Netlify, GitHub, and Dribbble
- Modern design trends from Awwwards

**Technologies & Libraries:**
- [React](https://react.dev/) - UI library
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Firebase](https://firebase.google.com/) - Authentication
- [MongoDB](https://www.mongodb.com/) - Database
- [Express](https://expressjs.com/) - Backend framework
- [React Icons](https://react-icons.github.io/react-icons/) - Icon library

**Resources:**
- Firebase documentation and community
- MongoDB University courses
- React documentation and examples
- MDN Web Docs for JavaScript best practices

## 📞 Support

Need help or have questions?

- 📧 Email: jenidevops@gmail.com

---

> **⚠️ IMPORTANT SECURITY NOTICE**
> 
> This documentation contains **EXAMPLE/PLACEHOLDER** values only. All API keys, connection strings, and credentials shown in this file are:
> - ❌ **NOT REAL** - They are placeholder examples for documentation
> - ❌ **NOT FUNCTIONAL** - They will not work and are for reference only
> - ✅ **SAFE TO COMMIT** - All actual secrets are in `.env` files (gitignored)
> 
> **Never commit actual `.env` files to version control!**

---

<div align="center">

### ⭐ Star this repository if you find it helpful!

**CodeConnect** - Empowering developers to showcase, discover, and collaborate.

Made with ❤️ using React, Node.js, MongoDB, and Firebase

**[🚀 Live Demo](#) • [📖 Documentation](./SETUP.md) • [🐛 Report Bug](https://github.com/jenidevops@gmail.com/codeconnect/issues) • [✨ Request Feature](https://github.com/jenidevops@gmail.com/codeconnect/issues)**

</div>
