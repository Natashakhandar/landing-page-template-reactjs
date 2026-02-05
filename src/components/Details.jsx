import React, { useState, useRef } from 'react'
import {  
    Box,
    Button,
    Stack,
    TextField,
    Alert
} from '@mui/material'
import Title from './Title'
import Paragraph from './Paragraph'
import { submitContactForm } from '../services/api'

const Details = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const formRef = useRef(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setSuccess(false);
        setLoading(true);

        try {
            const data = new FormData(event.currentTarget);
            const formData = {
                email: data.get('email'),
                phone: data.get('phone'),
            };

            const response = await submitContactForm(formData);
            console.log('Form submitted successfully:', response);
            
            // Clear form and show success message
            if (formRef.current) {
                formRef.current.reset();
            }
            setSuccess(true);
            
            // Hide success message after 5 seconds
            setTimeout(() => setSuccess(false), 5000);
        } catch (err) {
            console.error('Form submission error:', err);
            setError(err.message || 'Failed to submit form. Please try again.');
        } finally {
            setLoading(false);
        }
    }


    return (
        <Stack 
        component='section'
        direction="column"
        justifyContent= 'center'
        alignItems='center'
        sx={{
            py: 10,
            px: 2,
        }}
        >
            <Title 
            text={
                'Interesting to buy property'
                } 
            textAlign={'center'}
            />
            <Paragraph 
            text={
                'If you are interested to buy the property contact us we will call you. \
                Shortly to fulfill you requirements and property.'
            }
            maxWidth = {'sm'}
            mx={0}
            textAlign={'center'}
            />

            <Box 
            ref={formRef}
            component="form" 
            noValidate 
            onSubmit={handleSubmit} 
            sx={{ 
                mt: 1,
                py: 2
            }}>
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}
                {success && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                        Thank you! We've received your information and will contact you soon.
                    </Alert>
                )}
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    disabled={loading}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="phone"
                    label="Phone Number"
                    type="phone"
                    id="phone"
                    autoComplete="current-phone"
                    disabled={loading}
                />
                <Button 
                variant="contained" 
                fullWidth
                type="submit"
                size="medium"
                disabled={loading}
                sx= {{ 
                    fontSize: '0.9rem',
                    textTransform: 'capitalize', 
                    py: 2,
                    mt: 3, 
                    mb: 2,
                    borderRadius: 0,
                    backgroundColor: '#14192d',
                    "&:hover": {
                        backgroundColor: '#1e2a5a',
                    },
                    "&:disabled": {
                        backgroundColor: '#9ca3af',
                        color: '#fff',
                    }
                }}
                >
                    {loading ? 'Sending...' : 'send'}
                </Button>
            </Box>
        </Stack>
    )
}

export default Details;