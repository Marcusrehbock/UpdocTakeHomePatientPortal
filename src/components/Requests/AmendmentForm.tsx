// src/components/Requests/AmendmentForm.tsx
import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';

interface Props {
  onSubmit: (amendmentDetails: string) => void;
}

const AmendmentForm: React.FC<Props> = ({ onSubmit }) => {
  const [amendmentDetails, setAmendmentDetails] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleAmend = () => {
    if (amendmentDetails.trim() === '') {
      setError('Please provide details for the amendment.');
      return;
    }
    try {
      onSubmit(amendmentDetails);
      setAmendmentDetails('');
      setError(null);
    } catch (err) {
      setError('Failed to submit amendment.');
    }
  };

  return (
    <Box mt={4}>
      <Typography variant="h6" gutterBottom>
        Request Amendment
      </Typography>
      {error && (
        <Box mb={2}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}
      <TextField
        label="Amendment Details"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={amendmentDetails}
        onChange={(e) => setAmendmentDetails(e.target.value)}
      />
      <Button
        variant="contained"
        color="secondary"
        onClick={handleAmend}
        sx={{ mt: 2 }}
      >
        Submit Amendment
      </Button>
    </Box>
  );
};

export default AmendmentForm;
