const express = require('express');
const cors = require('cors');
const { saveContact, getAllContacts } = require('./firebase-service');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Backend API is running!',
    endpoints: {
      health: 'GET /api/health',
      submitContact: 'POST /api/contact',
      viewContacts: 'GET /api/contacts'
    }
  });
});

// Contact submission endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { email, phone } = req.body;

    // Validation
    if (!email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Email and phone are required'
      });
    }

    // Save to Firebase
    const contact = await saveContact({ email, phone });
    
    res.json({
      success: true,
      message: 'Contact information received successfully',
      data: contact
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Endpoint to view all contacts
app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await getAllContacts();
    res.json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running!' });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
  console.log(`API endpoint: http://localhost:${PORT}/api/contact`);
  console.log(`View all contacts: http://localhost:${PORT}/api/contacts`);
});
