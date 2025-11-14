# CodeConnect Frontend

Modern, responsive React application for CodeConnect - A peer project hub platform.

## ✨ Features

- 🎨 **Netlify-inspired Design** - Clean, modern UI with smooth animations
- 🌓 **Dark/Light Theme** - Seamless theme switching with system preference detection
- 🔥 **Firebase Authentication** - Google and GitHub sign-in
- ⚡ **Fast & Responsive** - Built with Vite and optimized for performance
- 🎭 **Smooth Animations** - Framer Motion for delightful interactions
- 💅 **Tailwind CSS** - Utility-first styling with custom design system

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Update `.env` with your Firebase and API configuration:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_API_URL=http://localhost:5000/api
```

### Running the Application

Development mode:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## 📁 Project Structure

```
frontend/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable components
│   │   ├── common/      # Common UI components
│   │   └── layout/      # Layout components
│   ├── config/          # Configuration files
│   ├── context/         # React Context providers
│   ├── pages/           # Page components
│   ├── routes/          # Route configuration
│   ├── services/        # API services
│   ├── App.jsx          # Main App component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

## 🎨 Design System

### Colors
- **Primary**: Teal gradient (#14b8a6 → #6366f1)
- **Accent**: Purple (#764ba2)
- **Dark Mode**: Navy backgrounds (#0f172a, #1e293b)

### Components
- **ProjectCard**: Displays project with hover effects
- **Button**: Multiple variants (primary, secondary, outline, ghost, danger)
- **Input/Textarea**: Form inputs with validation states
- **Modal**: Reusable modal dialog
- **LoadingSpinner**: Loading states

## 🔐 Authentication

Firebase Authentication with support for:
- Google Sign-In
- GitHub Sign-In
- Protected routes for authenticated users

## 🛣️ Routes

- `/` - Landing page
- `/feed` - Browse all projects
- `/projects/:id` - Project details
- `/profile/:userId` - User profile
- `/dashboard` - User dashboard (protected)
- `/favorites` - Bookmarked projects (protected)
- `/create` - Create new project (protected)
- `/edit/:id` - Edit project (protected)

## 🌐 API Integration

All API calls are handled through the `services/api.js` file:
- Automatic token injection
- Error handling
- Request/response interceptors

## 📱 Responsive Design

Fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🎭 Animations

Smooth animations using Framer Motion:
- Page transitions
- Hover effects
- Loading states
- Modal animations

## 🔧 Development

Built with:
- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Routing
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **Firebase** - Authentication

## 📝 License

MIT
