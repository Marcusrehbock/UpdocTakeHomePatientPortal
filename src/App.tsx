// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Snackbar, Alert } from '@mui/material';
import Navbar from './components/Navbar.tsx';
import Dashboard from './pages/Dashboard.tsx';
import ManageRequestsPage from './pages/ManageRequestsPage.tsx';
import PastRequestsPage from './pages/PastRequestsPage.tsx';
import UpdateProfilePage from './pages/UpdateProfilePage.tsx';
import RequestMedicalCertificatePage from './pages/RequestMedicalCertificatePage.tsx';
import RequestTelehealthConsultationPage from './pages/RequestTelehealthConsultationPage.tsx';
import ContactSupportPage from './pages/ContactSupport.tsx';  // Import the page

import { useState } from 'react';

const App: React.FC = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleShowSuccess = (message: string) => {
    setSuccessMessage(message);
  };

  const handleCloseSuccess = () => {
    setSuccessMessage(null);
  };

  return (
    <Router>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Dashboard onShowSuccess={handleShowSuccess} />} />
          <Route path="/manage-requests" element={<ManageRequestsPage onShowSuccess={handleShowSuccess} />} />
          <Route path="/past-requests" element={<PastRequestsPage />} />
          <Route path="/update-profile" element={<UpdateProfilePage onShowSuccess={handleShowSuccess} />} />
          <Route path="/request-medical-certificate" element={<RequestMedicalCertificatePage onShowSuccess={handleShowSuccess} />} />
          <Route path="/request-telehealth-consultation" element={<RequestTelehealthConsultationPage onShowSuccess={handleShowSuccess} />} />
          <Route path="/contact-support" element={<ContactSupportPage />} /> {/* Add this route */}
        </Routes>
      </Container>
      {/* Success Snackbar */}
      <Snackbar
        open={Boolean(successMessage)}
        autoHideDuration={6000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </Router>
  );
};

export default App;
