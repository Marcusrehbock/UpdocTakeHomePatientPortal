// src/pages/ManageRequestsPage.tsx
import React, { useState } from 'react';
import { Box, Typography, Alert } from '@mui/material';
import { Request } from '../types.ts';
import RequestList from '../components/Requests/RequestList.tsx';
import RequestDetails from '../components/Requests/RequestDetails.tsx';
import AmendmentForm from '../components/Requests/AmendmentForm.tsx';

interface Props {
  onShowSuccess: (message: string) => void;
}

const ManageRequestsPage: React.FC<Props> = ({ onShowSuccess }) => {
  // Fake ongoing requests
  const fakeOngoingRequests: Request[] = [
    {
      id: 'REQ125',
      patientName: 'John Doe',
      createdAt: '2023-10-05T11:15:00Z',
      status: 'pending',
      reason: 'Extended recovery period',
    },
  ];

  const [ongoingRequests, setOngoingRequests] = useState<Request[]>(fakeOngoingRequests);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(fakeOngoingRequests[0] || null);
  const [error, setError] = useState<string | null>(null);

  const handleAmendRequest = (amendmentDetails: string) => {
    // Simulate amendment request
    try {
      // Here you would normally send the amendment to the backend
      // We'll just display a success message
      onShowSuccess('Amendment request submitted successfully.');
      setError(null);
    } catch (err) {
      setError('Failed to submit amendment request.');
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Manage Ongoing Requests
      </Typography>
      {error && (
        <Box mb={2}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}
      {ongoingRequests.length > 0 ? (
        <>
          <RequestList requests={ongoingRequests} onSelect={setSelectedRequest} />
          {selectedRequest && <RequestDetails request={selectedRequest} />}
          <AmendmentForm onSubmit={handleAmendRequest} />
        </>
      ) : (
        <Typography variant="body1">You have no ongoing requests.</Typography>
      )}
    </Box>
  );
};

export default ManageRequestsPage;
