# CodeConnect Backend

Backend API for CodeConnect - A peer project hub platform built with Node.js, Express, and MongoDB.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Firebase project with Admin SDK credentials

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Update `.env` with your configuration:
```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_client_email
CLIENT_URL=http://localhost:3000
```

### Running the Server

Development mode (with nodemon):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## 📁 Project Structure

```
backend/
├── config/           # Configuration files
│   ├── database.js   # MongoDB connection
│   └── firebase.js   # Firebase Admin setup
├── controllers/      # Request handlers
│   ├── projectController.js
│   ├── commentController.js
│   ├── bookmarkController.js
│   └── userController.js
├── middleware/       # Custom middleware
│   ├── auth.js       # Authentication middleware
│   └── validate.js   # Validation middleware
├── models/           # MongoDB schemas
│   ├── Project.js
│   ├── Comment.js
│   ├── Bookmark.js
│   └── Rating.js
├── routes/           # API routes
│   ├── auth.js
│   ├── projects.js
│   ├── comments.js
│   ├── bookmarks.js
│   └── users.js
├── .env.example      # Environment variables template
├── .gitignore
├── package.json
├── README.md
└── server.js         # Entry point
```

## 🛣️ API Endpoints

### Authentication
- `POST /api/auth/verify` - Verify Firebase token
- `GET /api/auth/me` - Get current user

### Projects
- `GET /api/projects` - Get all projects (with pagination, search, filters)
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project (auth required)
- `PUT /api/projects/:id` - Update project (auth required)
- `DELETE /api/projects/:id` - Delete project (auth required)
- `POST /api/projects/:id/like` - Toggle like (auth required)

### Comments
- `GET /api/comments/:projectId` - Get project comments
- `POST /api/comments/:projectId` - Create comment (auth required)
- `DELETE /api/comments/:id` - Delete comment (auth required)
- `POST /api/comments/:id/like` - Toggle comment like (auth required)

### Bookmarks
- `GET /api/bookmarks` - Get user bookmarks (auth required)
- `POST /api/bookmarks/:projectId` - Toggle bookmark (auth required)
- `GET /api/bookmarks/check/:projectId` - Check if bookmarked (auth required)

### Users
- `GET /api/users/:userId/projects` - Get user's projects
- `GET /api/users/stats` - Get platform statistics

## 🔒 Authentication

Uses Firebase Authentication with Bearer tokens:
```
Authorization: Bearer <firebase-token>
```

## 🗄️ Database Models

### Project
```javascript
{
  title: String,
  description: String,
  tags: [String],
  githubRepo: String,
  liveDemo: String,
  thumbnail: String,
  authorId: String,
  authorName: String,
  authorEmail: String,
  authorPhoto: String,
  likes: [String],
  likesCount: Number,
  viewsCount: Number,
  commentsCount: Number,
  rating: {
    average: Number,
    count: Number
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Comment
```javascript
{
  projectId: ObjectId,
  authorId: String,
  authorName: String,
  authorEmail: String,
  authorPhoto: String,
  content: String,
  likes: [String],
  likesCount: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Bookmark
```javascript
{
  userId: String,
  projectId: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔧 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/codeconnect` |
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment | `development` or `production` |
| `FIREBASE_PROJECT_ID` | Firebase project ID | `codeconnect-12345` |
| `FIREBASE_PRIVATE_KEY` | Firebase private key | `"-----BEGIN PRIVATE KEY-----\n..."` |
| `FIREBASE_CLIENT_EMAIL` | Firebase client email | `firebase-adminsdk@....iam.gserviceaccount.com` |
| `CLIENT_URL` | Frontend URL for CORS | `http://localhost:3000` |

## 🧪 Testing

Health check endpoint:
```bash
curl http://localhost:5000/health
```

Response:
```json
{
  "status": "OK",
  "message": "CodeConnect API is running"
}
```

## 📝 License

MIT
