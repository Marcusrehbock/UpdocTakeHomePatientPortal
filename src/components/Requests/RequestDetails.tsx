// src/components/Requests/RequestDetails.tsx
import React from 'react';
import { Box, Typography, Chip, Button } from '@mui/material';
import { Request } from '../../types.ts';

interface Props {
  request: Request;
}

const RequestDetails: React.FC<Props> = ({ request }) => {
  const handleAmendRequest = () => {
    // Implement amendment functionality, e.g., open a modal or navigate to amendment form
    alert('Amend Request functionality to be implemented.');
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Request Details
      </Typography>
      <Box mb={2}>
        <Typography variant="subtitle2">Request ID:</Typography>
        <Typography variant="body1">{request.id}</Typography>
      </Box>
      <Box mb={2}>
        <Typography variant="subtitle2">Date Submitted:</Typography>
        <Typography variant="body1">{new Date(request.createdAt).toLocaleString()}</Typography>
      </Box>
      <Box mb={2}>
        <Typography variant="subtitle2">Status:</Typography>
        <Chip
          label={request.status}
          color={
            request.status.toLowerCase() === 'confirmed'
              ? 'success'
              : request.status.toLowerCase() === 'denied'
              ? 'error'
              : 'warning'
          }
        />
      </Box>
      {request.status.toLowerCase() === 'denied' && request.doctorRemarks && (
        <Box mb={2}>
          <Typography variant="subtitle2">Doctor's Remarks:</Typography>
          <Typography variant="body1">{request.doctorRemarks}</Typography>
        </Box>
      )}
      {request.status.toLowerCase() === 'confirmed' && request.approvedDays && (
        <Box mb={2}>
          <Typography variant="subtitle2">Approved Days:</Typography>
          <Typography variant="body1">{request.approvedDays}</Typography>
        </Box>
      )}
      {/* Add more details as needed */}
      <Box>
        <Button variant="contained" color="secondary" onClick={handleAmendRequest} sx={{ mr: 2 }}>
          Request Amendment
        </Button>
        {/* Add more actions if necessary */}
      </Box>
    </Box>
  );
};

export default RequestDetails;
