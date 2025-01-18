// src/pages/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, LinearProgress, Button, CircularProgress } from '@mui/material';
import { Request } from '../types.ts';
import RequestDetails from '../components/Requests/RequestDetails.tsx'; // You can remove this component if not needed anymore.

interface Props {
  onShowSuccess: (message: string) => void;
}

const Dashboard: React.FC<Props> = ({ onShowSuccess }) => {
  // Updated example requests for medical-related cases
  const fakeOngoingRequests: Request[] = [
    {
      id: 'REQ123',
      patientName: 'John Doe',
      createdAt: '2023-10-01T10:00:00Z',
      status: 'pending',
      reason: 'Medical Certificate for Sick Leave',
      type: 'Medical Certificate',
    },
    {
      id: 'REQ124',
      patientName: 'Jane Smith',
      createdAt: '2023-09-15T14:30:00Z',
      status: 'pending',
      reason: 'Pathology Test Request for Blood Work',
      type: 'Pathology Request',
    },
    {
      id: 'REQ125',
      patientName: 'Alice Johnson',
      createdAt: '2023-09-20T09:00:00Z',
      status: 'pending',
      reason: 'Prescription Refill Request for Blood Pressure Medication',
      type: 'Prescription Refill',
    },
  ];

  const [ongoingRequests, setOngoingRequests] = useState<Request[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Simulate data fetching
  useEffect(() => {
    const loadRequests = async () => {
      setLoading(true);
      setError(null);
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Only show pending requests
        setOngoingRequests(fakeOngoingRequests.filter((request) => request.status === 'pending'));
        if (fakeOngoingRequests.length > 0) setSelectedRequest(fakeOngoingRequests[0]);
      } catch (err) {
        setError('Failed to load requests.');
      } finally {
        setLoading(false);
      }
    };
    loadRequests();
  }, []);

  const handleDownloadRequest = (requestId: string) => {
    console.log(`Downloading request: ${requestId}`);
  };

  if (loading) {
    return (
      <Box textAlign="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box mb={2}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Ongoing Requests
      </Typography>
      <Grid container spacing={2}>
        {ongoingRequests.length > 0 ? (
          ongoingRequests.map((request) => (
            <Grid item xs={12} sm={6} key={request.id}>
              <Box
                sx={{
                  border: '1px solid #e0e0e0',
                  borderRadius: 2,
                  padding: 2,
                  boxShadow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <Typography variant="h6">{request.patientName}</Typography>
                <Typography variant="body2">{request.reason}</Typography>

                <Box sx={{ mt: 2, width: '100%' }}>
                  {/* Horizontal spinner indicating progress */}
                  <LinearProgress sx={{ height: 5 }} />
                </Box>

                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={() => setSelectedRequest(request)}
                >
                  View Details
                </Button>
              </Box>
            </Grid>
          ))
        ) : (
          <Typography variant="body1">No ongoing requests at the moment.</Typography>
        )}
      </Grid>

      {/* Condensed or updated Request Details section */}
      {selectedRequest && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Request Summary
          </Typography>
          <Box sx={{ padding: 2, borderRadius: 2, boxShadow: 1, backgroundColor: '#f5f5f5' }}>
            <Typography variant="body1"><strong>Patient Name:</strong> {selectedRequest.patientName}</Typography>
            <Typography variant="body1"><strong>Request Type:</strong> {selectedRequest.type}</Typography>
            <Typography variant="body1"><strong>Reason:</strong> {selectedRequest.reason}</Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Created At:</strong> {new Date(selectedRequest.createdAt).toLocaleDateString()}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
