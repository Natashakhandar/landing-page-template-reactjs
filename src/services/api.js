// API service for handling form submissions
// Configure your backend API URL here
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

/**
 * Submit contact form data to backend
 * @param {Object} data - Form data containing email and phone
 * @param {string} data.email - User's email address
 * @param {string} data.phone - User's phone number
 * @returns {Promise<Object>} - Response from backend
 */
export const submitContactForm = async (data) => {
    try {
        const response = await fetch(`${API_BASE_URL}/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error submitting form:', error);
        throw error;
    }
};
