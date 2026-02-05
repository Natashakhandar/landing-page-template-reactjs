const admin = require('firebase-admin');
const path = require('path');

// Initialize Firebase Admin SDK
// Make sure you have a service account key file at the root: serviceAccountKey.json
const serviceAccountPath = path.join(__dirname, 'serviceAccountKey.json');

try {
  const serviceAccount = require(serviceAccountPath);
  
  // Use the correct database URL
  const databaseURL = 'https://project-21e96-default-rtdb.firebaseio.com';
  
  console.log('🔧 Initializing Firebase with:', databaseURL);
  
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: databaseURL
  });
  
  console.log('✅ Firebase initialized successfully');
} catch (error) {
  console.error('❌ Firebase initialization error:', error.message);
  console.warn('⚠️  Firebase service account not found. Please set up Firebase:');
  console.warn('1. Create a serviceAccountKey.json in the project root');
  console.warn('2. Make sure database URL is correct');
}

const db = admin.database();

/**
 * Save contact form submission to Firebase
 */
const saveContact = async (contactData) => {
  try {
    const contactId = Date.now().toString();
    const ref = db.ref(`contacts/${contactId}`);
    
    await ref.set({
      ...contactData,
      createdAt: new Date().toISOString()
    });
    
    console.log(`✅ Contact saved with ID: ${contactId}`);
    return { id: contactId, ...contactData };
  } catch (error) {
    console.error('❌ Error saving to Firebase:', error);
    throw error;
  }
};

/**
 * Get all contacts from Firebase
 */
const getAllContacts = async () => {
  try {
    const snapshot = await db.ref('contacts').once('value');
    const contacts = [];
    
    snapshot.forEach((child) => {
      contacts.push({
        id: child.key,
        ...child.val()
      });
    });
    
    return contacts;
  } catch (error) {
    console.error('❌ Error reading from Firebase:', error);
    throw error;
  }
};

/**
 * Delete a contact from Firebase
 */
const deleteContact = async (contactId) => {
  try {
    await db.ref(`contacts/${contactId}`).remove();
    console.log(`✅ Contact ${contactId} deleted`);
    return true;
  } catch (error) {
    console.error('❌ Error deleting from Firebase:', error);
    throw error;
  }
};

module.exports = {
  saveContact,
  getAllContacts,
  deleteContact,
  db
};
