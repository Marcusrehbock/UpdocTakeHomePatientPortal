// src/pages/PastRequestsPage.tsx
import React, { useState } from 'react';
import { Box, Typography, Button, Grid, Paper, TextField } from '@mui/material';
import { Request } from '../types.ts';
import RequestList from '../components/Requests/RequestList.tsx';
import RequestDetails from '../components/Requests/RequestDetails.tsx';

const PastRequestsPage: React.FC = () => {
  // Fake past requests with the option to request amendments
  const fakePastRequests: Request[] = [
    {
      id: 'REQ100',
      patientName: 'John Doe',
      createdAt: '2023-08-10T09:20:00Z',
      status: 'confirmed',
      approvedDays: 3,
      type: 'Medical Certificate',
      reason: 'Medical leave',
    },
    {
      id: 'REQ101',
      patientName: 'John Doe',
      createdAt: '2023-07-22T16:45:00Z',
      status: 'denied',
      doctorRemarks: 'Insufficient documentation',
      reason: 'Work leave',
      type: 'Medical Certificate',
    },
  ];

  const [pastRequests] = useState<Request[]>(fakePastRequests);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(fakePastRequests[0] || null);
  const [amendmentRequest, setAmendmentRequest] = useState<string>('');

  const handleAmendmentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmendmentRequest(event.target.value);
  };

  const handleAmendmentSubmit = () => {
    if (selectedRequest && amendmentRequest) {
      console.log(`Requesting amendment for: ${selectedRequest.id}`);
      console.log(`Reason for amendment: ${amendmentRequest}`);
      // Logic for submitting amendment can go here (e.g., API call)
      setAmendmentRequest('');
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Completed Requests
      </Typography>

      {/* Request list with selectable items */}
      {pastRequests.length > 0 ? (
        <Box>
          <RequestList requests={pastRequests} onSelect={setSelectedRequest} />

          {/* Conditionally render request details or provide amendment options */}
          {selectedRequest ? (
            <Box sx={{ mt: 4 }}>
              <Paper sx={{ padding: 2, boxShadow: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Request Details
                </Typography>
                <RequestDetails request={selectedRequest} />
              </Paper>

              {/* Amendment Request Form */}
              {selectedRequest.status === 'denied' && (
                <Box sx={{ mt: 4 }}>
                  <Typography variant="body1" gutterBottom>
                    The request has been denied. Please provide your reason for amendment.
                  </Typography>
                  <TextField
                    label="Amendment Request"
                    multiline
                    rows={4}
                    value={amendmentRequest}
                    onChange={handleAmendmentChange}
                    fullWidth
                    variant="outlined"
                    sx={{ mb: 2 }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAmendmentSubmit}
                    fullWidth
                  >
                    Submit Amendment Request
                  </Button>
                </Box>
              )}

              {/* Additional Actions: Re-request, download, etc. */}
              <Box sx={{ mt: 4 }}>
                {selectedRequest.status === 'confirmed' && (
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mb: 2 }}
                    fullWidth
                  >
                    Download Request Details
                  </Button>
                )}

                {selectedRequest.status === 'confirmed' && (
                  <Button variant="outlined" color="secondary" fullWidth>
                    Re-request Document
                  </Button>
                )}
              </Box>
            </Box>
          ) : null}
        </Box>
      ) : (
        <Typography variant="body1">You have no past requests.</Typography>
      )}
    </Box>
  );
};

export default PastRequestsPage;
