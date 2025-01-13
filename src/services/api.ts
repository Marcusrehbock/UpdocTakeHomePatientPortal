// src/services/api.ts
import axios from 'axios';
import { Request, Patient } from '../types';

// Base URLs
const N8N_BASE_URL = 'https://your-n8n-instance.com/webhook'; // Replace with your n8n webhook URL
const SUPABASE_BASE_URL = 'https://your-supabase-url.supabase.co'; // Replace with your Supabase URL

// Example n8n workflows
const API_ENDPOINTS = {
  getOngoingRequests: `${N8N_BASE_URL}/get-ongoing-requests`,
  getPastRequests: `${N8N_BASE_URL}/get-past-requests`,
  requestAmendment: `${N8N_BASE_URL}/request-amendment`,
  updateProfile: `${N8N_BASE_URL}/update-profile`,
  requestMedicalCertificate: `${N8N_BASE_URL}/request-medical-certificate`,
  requestTelehealthConsultation: `${N8N_BASE_URL}/request-telehealth-consultation`,
};

// Fetch Ongoing Requests
export const fetchOngoingRequests = async (): Promise<Request[]> => {
  const response = await axios.get(API_ENDPOINTS.getOngoingRequests);
  return response.data;
};

// Fetch Past Requests
export const fetchPastRequests = async (): Promise<Request[]> => {
  const response = await axios.get(API_ENDPOINTS.getPastRequests);
  return response.data;
};

// Request Amendment
export const requestAmendment = async (requestId: string, amendmentDetails: string): Promise<void> => {
  await axios.post(API_ENDPOINTS.requestAmendment, { requestId, amendmentDetails });
};

// Fetch Patient Profile
export const fetchPatientProfile = async (): Promise<Patient> => {
  const response = await axios.get(`${SUPABASE_BASE_URL}/rest/v1/patient_profiles`, {
    headers: {
      apikey: 'your-supabase-anon-key', // Replace with your Supabase anon key
      Authorization: `Bearer your-supabase-anon-key`, // Replace accordingly
    },
  });
  return response.data[0]; // Assuming only one patient
};

// Update Patient Profile
export const updatePatientProfile = async (profile: Patient): Promise<void> => {
  await axios.put(`${SUPABASE_BASE_URL}/rest/v1/patient_profiles?id=eq.${profile.id}`, profile, {
    headers: {
      'Content-Type': 'application/json',
      apikey: 'your-supabase-anon-key', // Replace with your Supabase anon key
      Authorization: `Bearer your-supabase-anon-key`, // Replace accordingly
    },
  });
};

// Request Medical Certificate
export const requestMedicalCertificate = async (data: { approvedDays: number; reason: string }): Promise<void> => {
  await axios.post(API_ENDPOINTS.requestMedicalCertificate, data);
};

// Request Telehealth Consultation
export const requestTelehealthConsultation = async (data: { date: string; reason: string }): Promise<void> => {
  await axios.post(API_ENDPOINTS.requestTelehealthConsultation, data);
};
