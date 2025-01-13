// src/pages/RequestTelehealthConsultationPage.tsx
import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';

interface Props {
  onShowSuccess: (message: string) => void;
}

const RequestTelehealthConsultationPage: React.FC<Props> = ({ onShowSuccess }) => {
  const [date, setDate] = useState<string>('');
  const [reason, setReason] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    if (date.trim() === '' || reason.trim() === '') {
      setError('Please provide a valid date and a reason for the consultation.');
      return;
    }
    try {
      // Simulate consultation request
      // Normally, you'd send this data to the backend
      onShowSuccess('Telehealth consultation request submitted successfully.');
      setDate('');
      setReason('');
      setError(null);
    } catch (err) {
      setError('Failed to submit consultation request.');
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Request Telehealth Consultation
      </Typography>
      {error && (
        <Box mb={2}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}
      <Box component="form" noValidate autoComplete="off">
        <TextField
          label="Preferred Date and Time"
          type="datetime-local"
          variant="outlined"
          fullWidth
          margin="normal"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Reason for Consultation"
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

export default RequestTelehealthConsultationPage;
