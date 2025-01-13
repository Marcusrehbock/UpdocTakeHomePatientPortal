// src/pages/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, CircularProgress, Alert } from '@mui/material';
import { Request } from '../types.ts';
import RequestList from '../components/Requests/RequestList.tsx';
import RequestDetails from '../components/Requests/RequestDetails.tsx';

interface Props {
  onShowSuccess: (message: string) => void;
}

const Dashboard: React.FC<Props> = ({ onShowSuccess }) => {
  // Fake data
  const fakeOngoingRequests: Request[] = [
    {
      id: 'REQ123',
      patientName: 'John Doe',
      createdAt: '2023-10-01T10:00:00Z',
      status: 'pending',
      reason: 'Recovery from surgery',
    },
    {
      id: 'REQ124',
      patientName: 'John Doe',
      createdAt: '2023-09-15T14:30:00Z',
      status: 'confirmed',
      approvedDays: 5,
    },
  ];

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

  const [ongoingRequests, setOngoingRequests] = useState<Request[]>([]);
  const [pastRequests, setPastRequests] = useState<Request[]>([]);
  const [selectedOngoing, setSelectedOngoing] = useState<Request | null>(null);
  const [selectedPast, setSelectedPast] = useState<Request | null>(null);
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
        setOngoingRequests(fakeOngoingRequests);
        setPastRequests(fakePastRequests);
        if (fakeOngoingRequests.length > 0) setSelectedOngoing(fakeOngoingRequests[0]);
        if (fakePastRequests.length > 0) setSelectedPast(fakePastRequests[0]);
      } catch (err) {
        setError('Failed to load requests.');
      } finally {
        setLoading(false);
      }
    };
    loadRequests();
  }, []);

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
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={4}>
        {/* Ongoing Requests */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Ongoing Requests
          </Typography>
          {ongoingRequests.length > 0 ? (
            <RequestList requests={ongoingRequests} onSelect={setSelectedOngoing} />
          ) : (
            <Typography variant="body1">You have no ongoing requests.</Typography>
          )}
        </Grid>
        {/* Past Requests */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Past Requests
          </Typography>
          {pastRequests.length > 0 ? (
            <RequestList requests={pastRequests} onSelect={setSelectedPast} />
          ) : (
            <Typography variant="body1">You have no past requests.</Typography>
          )}
        </Grid>
        {/* Request Details */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Request Details
          </Typography>
          {selectedOngoing ? (
            <RequestDetails request={selectedOngoing} />
          ) : selectedPast ? (
            <RequestDetails request={selectedPast} />
          ) : (
            <Typography variant="body1">Select a request to view details.</Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
