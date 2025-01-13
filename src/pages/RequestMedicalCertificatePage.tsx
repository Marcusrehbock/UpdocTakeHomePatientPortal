// src/pages/RequestMedicalCertificatePage.tsx
import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';
import { Request } from '../types';

interface Props {
  onShowSuccess: (message: string) => void;
}

const RequestMedicalCertificatePage: React.FC<Props> = ({ onShowSuccess }) => {
  const [approvedDays, setApprovedDays] = useState<number>(1);
  const [reason, setReason] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    if (approvedDays < 1 || reason.trim() === '') {
      setError('Please provide a valid number of days and a reason for the request.');
      return;
    }
    try {
      // Simulate request submission
      // Normally, you'd send this data to the backend
      onShowSuccess('Medical certificate request submitted successfully.');
      setApprovedDays(1);
      setReason('');
      setError(null);
    } catch (err) {
      setError('Failed to submit request.');
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Request Medical Certificate
      </Typography>
      {error && (
        <Box mb={2}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}
      <Box component="form" noValidate autoComplete="off">
        <TextField
          label="Number of Days"
          type="number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={approvedDays}
          onChange={(e) => setApprovedDays(Number(e.target.value))}
          inputProps={{ min: 1 }}
        />
        <TextField
          label="Reason for Request"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
          Submit Request
        </Button>
      </Box>
    </Box>
  );
};

export default RequestMedicalCertificatePage;
