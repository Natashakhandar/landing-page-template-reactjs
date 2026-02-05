# Backend Integration Guide

## Overview
The frontend form now sends contact data to your backend API. Here's what you need to set up on the backend.

## API Endpoint Required

### POST `/api/contact`

**Purpose**: Receive and store contact form submissions (email and phone)

**Request Body**:
```json
{
  "email": "user@example.com",
  "phone": "+1234567890"
}
```

**Required Fields**:
- `email` (string): Valid email address
- `phone` (string): Phone number in any format

**Success Response** (200 OK):
```json
{
  "success": true,
  "message": "Contact information received",
  "data": {
    "email": "user@example.com",
    "phone": "+1234567890",
    "timestamp": "2026-02-05T10:30:00Z"
  }
}
```

**Error Response** (400/500):
```json
{
  "success": false,
  "message": "Error description"
}
```

## Frontend Configuration

### Setting API URL
The frontend expects the API at `http://localhost:5000/api` by default.

To change this, create a `.env` file in the project root:
```
REACT_APP_API_URL=https://your-api-domain.com/api
```

Then restart your React app.

## Backend Implementation Examples

### Node.js/Express Example
```javascript
const express = require('express');
const app = express();

app.use(express.json());

app.post('/api/contact', async (req, res) => {
  try {
    const { email, phone } = req.body;

    // Validate input
    if (!email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Email and phone are required'
      });
    }

    // Store in database (MongoDB, PostgreSQL, etc.)
    // const contact = await Contact.create({ email, phone });

    res.json({
      success: true,
      message: 'Contact information received',
      data: { email, phone, timestamp: new Date() }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
```

### Python/Flask Example
```python
from flask import Flask, request, jsonify
from datetime import datetime

app = Flask(__name__)

@app.route('/api/contact', methods=['POST'])
def contact():
    try:
        data = request.get_json()
        email = data.get('email')
        phone = data.get('phone')

        if not email or not phone:
            return jsonify({
                'success': False,
                'message': 'Email and phone are required'
            }), 400

        # Store in database
        # contact = Contact(email=email, phone=phone)
        # db.session.add(contact)
        # db.session.commit()

        return jsonify({
            'success': True,
            'message': 'Contact information received',
            'data': {
                'email': email,
                'phone': phone,
                'timestamp': datetime.now().isoformat()
            }
        })
    except Exception as error:
        return jsonify({
            'success': False,
            'message': str(error)
        }), 500

if __name__ == '__main__':
    app.run(port=5000)
```

## Database Schema

Consider storing contacts with:
- `id`: Unique identifier
- `email`: Contact email
- `phone`: Contact phone number
- `createdAt`: Timestamp of submission
- `status`: Whether contacted or not (optional)

## CORS Considerations

If your backend is on a different domain, enable CORS:

**Express.js**:
```javascript
const cors = require('cors');
app.use(cors());
```

**Flask**:
```python
from flask_cors import CORS
CORS(app)
```

## Testing the Integration

1. Start your backend server
2. Update `.env` with your API URL if needed
3. Fill out the form and click "Send"
4. Check your backend logs for the incoming request
5. Verify data is stored in your database

## What the Frontend Does

- Validates email and phone fields (required)
- Shows "Sending..." while request is in progress
- Disables inputs during submission
- Displays success message on successful submission
- Displays error message if submission fails
- Automatically clears form on success
