// src/pages/PastRequestsPage.tsx
import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Request } from '../types.ts';
import RequestList from '../components/Requests/RequestList.tsx';
import RequestDetails from '../components/Requests/RequestDetails.tsx';

const PastRequestsPage: React.FC = () => {
  // Fake past requests
  const fakePastRequests: Request[] = [
    {
      id: 'REQ100',
      patientName: 'John Doe',
      createdAt: '2023-08-10T09:20:00Z',
      status: 'confirmed',
      approvedDays: 3,
    },
    {
      id: 'REQ101',
      patientName: 'John Doe',
      createdAt: '2023-07-22T16:45:00Z',
      status: 'denied',
      doctorRemarks: 'Insufficient documentation',
      reason: 'Work leave',
    },
  ];

  const [pastRequests] = useState<Request[]>(fakePastRequests);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(fakePastRequests[0] || null);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Past Requests
      </Typography>
      {pastRequests.length > 0 ? (
        <Box>
          <RequestList requests={pastRequests} onSelect={setSelectedRequest} />
          {selectedRequest && <RequestDetails request={selectedRequest} />}
        </Box>
      ) : (
        <Typography variant="body1">You have no past requests.</Typography>
      )}
    </Box>
  );
};

export default PastRequestsPage;
