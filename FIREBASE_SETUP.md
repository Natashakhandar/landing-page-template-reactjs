# Firebase Setup Guide

Your contact form now uses **Firebase Realtime Database** to store data permanently in the cloud!

## Step 1: Create Firebase Project

1. Go to **[Firebase Console](https://console.firebase.google.com/)**
2. Click **"Create a new project"**
3. Enter project name (e.g., "landing-page-contacts")
4. Click **"Create Project"**
5. Wait for the project to initialize

## Step 2: Create Realtime Database

1. In Firebase Console, click **"Build"** → **"Realtime Database"**
2. Click **"Create Database"**
3. Select your region (closest to your users)
4. Choose **Start in test mode** (for development)
5. Click **"Enable"**

You should now see a database URL like: `https://your-project-id.firebaseio.com`

## Step 3: Get Service Account Key

1. Click the **⚙️ Settings icon** (top-right) → **Project Settings**
2. Go to **"Service Accounts"** tab
3. Click **"Generate New Private Key"**
4. A JSON file will download

## Step 4: Add to Your Project

1. **Rename** the downloaded file to `serviceAccountKey.json`
2. **Move it to your project root** (same level as `package.json`)
   ```
   landing-page-template-reactjs/
   ├── package.json
   ├── server.js
   ├── serviceAccountKey.json  ← Place it here
   └── ...
   ```

## Step 5: Set Database URL (Optional)

If you want to set the database URL as an environment variable:

1. Create a `.env` file in the project root:
   ```
   FIREBASE_DB_URL=https://your-project-id.firebaseio.com
   ```

2. Replace `your-project-id` with your actual project ID

3. Restart your backend server

## Step 6: Restart Backend Server

Stop the current server (Ctrl+C) and restart:
```bash
node server.js
```

You should see:
```
✅ Firebase initialized successfully
Backend server running on http://localhost:5000
```

## Step 7: Test It!

1. Go to your app: `http://localhost:3001`
2. Fill out the contact form
3. Click **Send**
4. Check data at: `http://localhost:5000/api/contacts`

Your data is now saved in Firebase! ☁️

## Step 8: View Data in Firebase Console

To see your data in the Firebase Console:

1. Go back to **[Firebase Console](https://console.firebase.google.com/)**
2. Select your project
3. Click **"Realtime Database"**
4. You should see a `contacts` folder with all submissions

## Adjusting Security Rules (Important!)

By default, test mode allows anyone to read/write. For production:

1. In Firebase Console → **Realtime Database**
2. Go to **"Rules"** tab
3. Update rules to:

```json
{
  "rules": {
    "contacts": {
      ".read": "auth != null",
      ".write": "auth != null"
    }
  }
}
```

Then set up user authentication (Firebase Auth) in your app.

---

## Troubleshooting

### "Firebase service account not found"
- ✅ Make sure `serviceAccountKey.json` is in the project root
- ✅ Restart the server with `node server.js`

### "Error saving to Firebase"
- ✅ Check database URL is correct in `FIREBASE_DB_URL`
- ✅ Make sure Realtime Database is created in Firebase Console
- ✅ Check Firebase security rules allow writes

### "Permission denied" error
- ✅ Go to Firebase Console → Realtime Database → Rules
- ✅ Change to test mode temporarily while developing
- ✅ Then update rules as shown above for production

### Can't see database in Firebase Console
- ✅ Make sure you're looking at the right project
- ✅ Click on "Realtime Database" (not Firestore)
- ✅ Wait a moment for data to appear

---

## Data Structure in Firebase

Your data is stored in this structure:
```
contacts/
  └── [timestamp]
      ├── email: "user@example.com"
      ├── phone: "+1234567890"
      └── createdAt: "2026-02-05T10:30:00Z"
```

Each contact gets a unique ID (timestamp) so you can update or delete individual submissions later.

---

## Next Steps

- Add user authentication (Firebase Auth)
- Set up email notifications when form is submitted
- Create an admin dashboard to manage contacts
- Add analytics to track form submissions
