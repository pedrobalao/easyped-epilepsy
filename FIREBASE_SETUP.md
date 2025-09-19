# Firebase Authentication Setup

This guide explains how to set up Firebase Authentication with Google and Apple sign-in for the EasyPed application.

## Prerequisites

- A Google account
- An Apple Developer account (for Apple sign-in)
- Access to Firebase Console

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name (e.g., "easyped-epilepsy")
4. Enable Google Analytics (optional)
5. Create project

## Step 2: Enable Authentication

1. In Firebase Console, go to "Authentication"
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable the following providers:

### Email/Password

1. Click "Email/Password"
2. Enable "Email/Password"
3. Save

### Google

1. Click "Google"
2. Enable Google sign-in
3. Enter project support email
4. Save

### Apple

1. Click "Apple"
2. Enable Apple sign-in
3. Enter the following details:
   - **Services ID**: Create one in Apple Developer Console
   - **Apple Team ID**: Found in Apple Developer Console
   - **Key ID**: From Apple Developer Console
   - **Private Key**: Upload the .p8 file from Apple
4. Save

## Step 3: Configure Web App

1. In Firebase Console, go to "Project Settings" (gear icon)
2. Scroll down to "Your apps" section
3. Click "Add app" and select "Web"
4. Enter app nickname (e.g., "EasyPed Web")
5. Copy the Firebase configuration

## Step 4: Update Environment Variables

Update your `.env.local` file in the frontend directory:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_FIREBASE_API_KEY=your-actual-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

## Step 5: Apple Sign-In Configuration

### Apple Developer Console Setup

1. Go to [Apple Developer Console](https://developer.apple.com/)
2. Navigate to "Certificates, Identifiers & Profiles"

#### Create Services ID

1. Click "Identifiers" → "+"
2. Select "Services IDs"
3. Enter description and identifier (e.g., `com.yourcompany.easyped.signin`)
4. Enable "Sign In with Apple"
5. Configure domains and return URLs:
   - **Domains**: `your-project.firebaseapp.com`
   - **Return URLs**: `https://your-project.firebaseapp.com/__/auth/handler`

#### Create Key

1. Click "Keys" → "+"
2. Enter key name
3. Enable "Sign In with Apple"
4. Configure the key with your Services ID
5. Download the .p8 key file

#### Get Team ID

1. Go to "Membership" section
2. Copy your Team ID

### Firebase Configuration

1. In Firebase Console, go to Apple sign-in settings
2. Enter the Services ID, Team ID, Key ID, and upload the .p8 file

## Step 6: Domain Configuration

### For Production

1. In Firebase Console, go to "Authentication" → "Settings"
2. Add your production domain to "Authorized domains"
3. For Apple sign-in, update the Services ID configuration with your production domain

### For Development

- `localhost` and `127.0.0.1` are automatically authorized for development

## Step 7: Test Authentication

1. Start your development server:

   ```bash
   # Frontend
   cd frontend && npm run dev

   # Backend (in another terminal)
   cd backend && npm run dev
   ```

2. Navigate to `http://localhost:3000/auth/login`
3. Test all three authentication methods:
   - Email/Password registration and login
   - Google sign-in
   - Apple sign-in

## Features Implemented

### Frontend Features

- **Firebase Configuration**: Complete setup with Google and Apple providers
- **Authentication Context**: React context for managing auth state
- **Social Login UI**: Beautiful login/register forms with social buttons
- **Error Handling**: Proper error messages and loading states
- **Auto-sync**: Automatic user synchronization with backend

### Backend Features

- **Flexible User Model**: Supports both email/password and social auth users
- **Firebase UID Support**: Users can be identified by Firebase UID
- **Auth Provider Tracking**: Tracks how users signed up (email, google, apple)
- **Backward Compatibility**: Existing email/password auth still works

### Security Features

- **JWT Tokens**: Secure token-based authentication
- **Firebase Token Verification**: Can be extended to verify Firebase tokens
- **Password Hashing**: bcrypt for secure password storage
- **Role-based Access**: Doctor vs Parent role system

## Troubleshooting

### Common Issues

1. **"Firebase config not found"**

   - Ensure all environment variables are set correctly
   - Restart the development server after updating `.env.local`

2. **Apple sign-in not working**

   - Verify Services ID configuration
   - Check that return URLs match exactly
   - Ensure the .p8 key is valid

3. **Google sign-in not working**

   - Verify the project support email is set
   - Check that the domain is authorized

4. **Users not syncing with backend**
   - Check backend logs for errors
   - Verify the backend is running on the correct port
   - Ensure JWT_SECRET is set in backend `.env`

### Debug Tips

1. Open browser developer tools to see authentication errors
2. Check Firebase Console authentication logs
3. Monitor backend logs for API errors
4. Use Firebase Auth emulator for local testing

## Production Deployment

1. Update Firebase authorized domains with your production URL
2. Update Apple Services ID with production domain
3. Set production environment variables
4. Test all authentication flows in production

## Next Steps

- Implement password reset functionality
- Add email verification
- Set up Firebase security rules
- Add user profile management
- Implement social account linking
