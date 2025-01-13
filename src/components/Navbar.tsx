// src/components/Navbar.tsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Patient Portal
        </Typography>
        <Box>
          <Button color="inherit" component={RouterLink} to="/">
            Dashboard
          </Button>
          <Button color="inherit" component={RouterLink} to="/manage-requests">
            Manage Requests
          </Button>
          <Button color="inherit" component={RouterLink} to="/past-requests">
            Past Requests
          </Button>
          <Button color="inherit" component={RouterLink} to="/update-profile">
            Profile
          </Button>
          <Button color="inherit" component={RouterLink} to="/request-medical-certificate">
            Request Medical Certificate
          </Button>
          <Button color="inherit" component={RouterLink} to="/request-telehealth-consultation">
            Telehealth Consultation
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
