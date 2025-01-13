// src/pages/UpdateProfilePage.tsx
import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';
import { Patient } from '../types';

interface Props {
  onShowSuccess: (message: string) => void;
}

const UpdateProfilePage: React.FC<Props> = ({ onShowSuccess }) => {
  // Fake patient data
  const [profile, setProfile] = useState<Patient>({
    id: 'PAT123',
    fullName: 'John Doe',
    email: 'johndoe@example.com',
    phoneNumber: '+1 234 567 890',
    address: '123 Main St, Anytown, USA',
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    // Simulate profile update
    try {
      // Normally, you'd send the updated profile to the backend
      // We'll just display a success message
      onShowSuccess('Profile updated successfully.');
      setError(null);
    } catch (err) {
      setError('Failed to update profile.');
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Update Personal Details
      </Typography>
      {error && (
        <Box mb={2}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}
      <Box component="form" noValidate autoComplete="off">
        <TextField
          label="Full Name"
          name="fullName"
          variant="outlined"
          fullWidth
          margin="normal"
          value={profile.fullName}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          name="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={profile.email}
          onChange={handleChange}
        />
        <TextField
          label="Phone Number"
          name="phoneNumber"
          variant="outlined"
          fullWidth
          margin="normal"
          value={profile.phoneNumber}
          onChange={handleChange}
        />
        <TextField
          label="Address"
          name="address"
          variant="outlined"
          fullWidth
          margin="normal"
          value={profile.address}
          onChange={handleChange}
        />
        <Button variant="contained" color="primary" onClick={handleUpdate} sx={{ mt: 2 }}>
          Update Profile
        </Button>
      </Box>
    </Box>
  );
};

export default UpdateProfilePage;
