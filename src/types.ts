// src/types/index.ts

export interface Request {
    id: string;
    patientName: string;
    createdAt: string;
    status: 'pending' | 'confirmed' | 'denied';
    approvedDays?: number;
    doctorRemarks?: string;
    reason?: string;
  }
  
  export interface Patient {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    address: string;
  }
  