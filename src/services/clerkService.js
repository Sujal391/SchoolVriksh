// src/services/clerkService.js
import api from './api';

const clerkService = {
  getDashboardData: async () => {
    try {
      const response = await api.get('/clerk/dashboard');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch dashboard data');
    }
  },

  verifyCertificateBySerial: async (serialNumber) => {
  try {
    // Encode the serial number to handle slashes
    const encodedSerialNumber = encodeURIComponent(serialNumber);
    const response = await api.get(`/clerk/certificates/verify-serial/${encodedSerialNumber}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Verification failed');
  }
},

  getStudentById: async (studentId) => {
  try {
    const response = await api.get(`/clerk/students/${studentId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch student');
  }
},

  getPendingApplications: async () => {
    try {
      const response = await api.get('/clerk/applications/pending-verification');
      return response.data.applications;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch applications');
    }
  },

  verifyApplication: async (applicationId, status, comments) => {
    try {
      const response = await api.put(`/clerk/verify/${applicationId}`, {
        status,
        comments
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Verification failed');
    }
  },

  getAvailableClasses: async () => {
    try {
      const response = await api.get('/clerk/classes/available');
      return response.data.classes;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch classes');
    }
  },

  enrollStudent: async (applicationId, classId, grNumber, password, parentPassword) => {
    try {
      const response = await api.post(`/clerk/enroll/${applicationId}`, {
        classId,
        grNumber,
        password,
        parentPassword
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Enrollment failed');
    }
  },

  getCertificateHistory: async () => {
    try {
      const response = await api.get('/clerk/certificates/history');
      return response.data.certificates;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch certificates');
    }
  },

 generateCertificate: async (certificateId, data) => {
  try {
    console.log('Sending certificate data:', data); // Debug log
    const response = await api.post(`/clerk/certificates/${certificateId}/generate`, {
      status: data.status,
      certificateType: data.certificateType,
      serialNumber: data.serialNumber,
      issuedDate: data.issuedDate,
      studentDetails: data.studentDetails,
      purpose: data.purpose,
      comments: data.comments || '',
      urgency: data.urgency || 'normal'
    });
    return response.data;
  } catch (error) {
    console.error('Certificate generation error:', {
      error: error.response?.data,
      status: error.response?.status
    });
    throw new Error(error.response?.data?.message || 'Certificate generation failed');
  }
},


   uploadSignedCertificate: async (certificateId, file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await api.post(`/clerk/certificates/${certificateId}/upload-signed`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Certificate upload failed');
    }
  },

  getPendingCertificates: async () => {
  try {
    const response = await api.get('/clerk/certificates/pending');
    return response.data.certificates;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch pending certificates');
  }
},

  sendCertificateToStudent: async (certificateId) => {
  try {
    const response = await api.post(`/clerk/certificates/${certificateId}/send-to-student`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to send certificate to student');
  }
},

  getStudentsByClass: async (classId) => {
    try {
      const response = await api.get(`/clerk/students/class/${classId}`);
      return response.data.students;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch students');
    }
  },




  registerExistingStudent: async (studentData) => {
    try {
      const response = await api.post('/clerk/register-existing-student', studentData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Student registration failed');
    }
  },

  upgradeStudentClass: async (studentId, newClassId) => {
    try {
      const response = await api.post('/clerk/upgrade-student-class', {
        studentId,
        newClassId
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Class upgrade failed');
    }
  },

  getAdmissionHistory: async (grNumber) => {
    try {
      const response = await api.get(`/clerk/admission-history/${grNumber}`);
      return response.data.admissionHistory;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch admission history');
    }
  },

  requestLeave: async (leaveData) => {
  try {
    const response = await api.post('/clerk/leave-requests', leaveData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Leave request failed');
  }
},

getLeaveStatus: async () => {
  try {
    console.log('=== DEBUG: clerkService.getLeaveStatus called ===');
    console.log('Making API call to /clerk/leave-status...');
    
    const response = await api.get('/clerk/leave-status');
    
    console.log('API response status:', response.status);
    console.log('API response data:', response.data);
    console.log('API response type:', typeof response.data);
    console.log('API response keys:', Object.keys(response.data || {}));
    
    // Return the actual data, not the entire response object
    return response.data;
  } catch (error) {
    console.error('=== DEBUG: clerkService.getLeaveStatus error ===');
    console.error('Error details:', error);
    console.error('Error response:', error.response?.data);
    console.error('Error status:', error.response?.status);
    
    throw new Error(error.response?.data?.error || 'Failed to fetch leave status');
  }
}


};

export default clerkService;