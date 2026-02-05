# Quick Start: Testing the Form with Backend

## Step 1: Install Dependencies

```bash
npm install express cors
```

## Step 2: Start the Backend Server

Open a new terminal and run:
```bash
node server.js
```

You should see:
```
Backend server running on http://localhost:5000
API endpoint: http://localhost:5000/api/contact
View all contacts: http://localhost:5000/api/contacts
```

## Step 3: Start Your React App

In another terminal:
```bash
npm start
```

## Step 4: Test the Form

1. Open your app at `http://localhost:3000`
2. Navigate to the Contact page
3. Fill in email and phone
4. Click "Send"

If successful, you should see a success message!

## Step 5: View Submitted Data

Visit `http://localhost:5000/api/contacts` in your browser to see all submitted contact data.

---

## Troubleshooting

### Still seeing "Failed to fetch"?

1. **Check browser console** (F12 → Console tab) for error details
2. **Make sure backend is running** - Terminal should show "Backend server running..."
3. **Check port 5000** is not in use - try killing and restarting
4. **Clear browser cache** - Ctrl+Shift+Delete
5. **Check CORS** - Backend has `cors()` enabled

### Backend won't start?

Make sure you have these packages:
```bash
npm list express cors
```

If missing, install them:
```bash
npm install express cors
```

---

## What's Included in `server.js`

- ✅ CORS enabled (allows frontend to communicate)
- ✅ JSON parsing middleware
- ✅ `POST /api/contact` - stores form submissions
- ✅ `GET /api/contacts` - view all submitted data
- ✅ `GET /api/health` - health check endpoint
- ✅ In-memory storage (data persists while server runs)

**Note**: In-memory storage means data is lost when server restarts. For production, connect to a real database (MongoDB, PostgreSQL, etc.).

---

## Next Steps (Production Ready)

Replace in-memory storage with a real database:
1. Set up MongoDB, PostgreSQL, or your choice
2. Use an ORM like Mongoose or Sequelize
3. Add data validation and error handling
4. Deploy backend to a server (Heroku, AWS, etc.)
