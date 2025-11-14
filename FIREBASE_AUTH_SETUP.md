# Firebase Authentication Setup Guide

## Enable Authentication Providers

### 1. Email/Password Authentication

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **codeconnect-94863**
3. Click **Authentication** in the left sidebar
4. Click **Get Started** (if not already enabled)
5. Go to **Sign-in method** tab
6. Click **Email/Password**
7. Enable the **Email/Password** toggle
8. Click **Save**

### 2. Google Authentication

1. In **Sign-in method** tab, click **Google**
2. Enable the toggle
3. Enter a **Project support email** (your email)
4. Click **Save**

### 3. GitHub Authentication

1. First, create a GitHub OAuth App:
   - Go to [GitHub Settings](https://github.com/settings/developers)
   - Click **OAuth Apps** → **New OAuth App**
   - Fill in the details:
     - **Application name**: CodeConnect
     - **Homepage URL**: `http://localhost:3000`
     - **Authorization callback URL**: Get this from Firebase (see step 3)
   - Click **Register application**

2. In Firebase Console, **Sign-in method** tab:
   - Click **GitHub**
   - Enable the toggle
   - **Copy the callback URL** shown

3. Go back to GitHub OAuth App:
   - Paste the Firebase callback URL in **Authorization callback URL**
   - Click **Update application**

4. In GitHub OAuth App:
   - Copy the **Client ID**
   - Generate a new **Client Secret** and copy it

5. Back in Firebase GitHub settings:
   - Paste **Client ID** and **Client Secret**
   - Click **Save**

## Get Firebase Admin SDK Credentials (for Backend)

1. In Firebase Console → Project Settings
2. Go to **Service Accounts** tab
3. Click **Generate New Private Key**
4. Download the JSON file
5. Open the JSON file and find these values:
   - `project_id`
   - `private_key`
   - `client_email`
6. Update `backend/.env`:
```env
FIREBASE_PROJECT_ID=codeconnect-94863
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Private-Key-Here\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@codeconnect-94863.iam.gserviceaccount.com
```

**Important**: Keep the `\n` characters in the private key as-is!

## Test the Setup

1. Make sure both frontend and backend are running
2. Navigate to `http://localhost:3000`
3. Click "Sign in with email" or use social login buttons
4. Try creating an account with email/password
5. Test Google and GitHub sign-in

## Troubleshooting

### Email not verified
- Check your email inbox (and spam folder)
- Resend verification email from Firebase Console

### GitHub OAuth fails
- Verify callback URL matches exactly
- Check Client ID and Secret are correct
- Make sure authorized domains are set in Firebase

### Google sign-in fails
- Verify support email is set
- Check authorized domains in Firebase Console

## Security Notes

- Never commit `.env` files to version control
- Keep your Firebase service account JSON file secure
- Use environment variables for all sensitive data
- Enable email verification in production
- Set up proper security rules in Firebase
