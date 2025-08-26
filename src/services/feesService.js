// import api from './api';

// const feesService = {
//   // Fee Definitions
//   getAvailableClasses:async(classId)=>{
//     return api.get('/fee/classes',{ params: { classId }})
//   },

//   defineFees: async (data) => {
//     return api.post('/fee/define-fees', data);
//   },

//   getFeeDefinitions: async (year, classId) => {
//     return api.get(`/fee/fee-definitions/${year}`, { params: { classId } });
//   },

//   editFees: async (year, data) => {
//     return api.put(`/fee/fee-definitions/${year}`, data);
//   },

//   // Student Fees
//   getStudentByGrNumber: async (grNumber) => {
//     return api.get(`/fee/student/${grNumber}`);
//   },

//   getStudentFeeHistory: async (grNumber) => {
//     return api.get(`/fee/history/${grNumber}`);
//   },

//   payFeesForStudent: async (data) => {
//     return api.post('/fee/pay-for-student', data);
//   },

//   // Payments
//   getPendingPayments: async () => {
//     return api.get('/fee/pending/verification');
//   },

//   verifyPayment: async (data) => {
//     return api.post('/fee/verify-payment', data);
//   },

//   // Reports
//   getTotalEarningsByYear: async (year) => {
//     return api.get('/fee/total-earnings', { params: { year } });
//   },

//   // Receipts
//   downloadReceipt: async (paymentId) => {
//     return api.get(`/fee/receipt/${paymentId}/download`);
//   },

//   // Audit Logs
//   getAuditLogs: async (params) => {
//     return api.get('/fee/audit-logs', { params });
//   },

//   // Refunds
//   refundPayment: async (data) => {
//     return api.post('/fee/refund-payment', data);
//   }
// };

// export default feesService;



import api from './api';

const feesService = {
  


  // Get available classes - matches backend route: GET /classes
  getAvailableClasses: async (filters = {}) => {
    try {
      const params = {};
      if (filters.academicYear) params.academicYear = filters.academicYear;
      if (filters.name) params.name = filters.name;
      if (filters.division) params.division = filters.division;
      
      return await api.get('/fee/classes', { params });
    } catch (error) {
      console.error('Error fetching classes:', error);
      throw error;
    }
  },

  // Define new fees - matches backend route: POST /define-fees
  defineFees: async (data) => {
    try {
      // Backend expects: { year, month, classIds, feeTypes }
      const payload = {
        year: data.year,
        classIds: data.classIds,
        feeTypes: data.feeTypes
      };
      
      // Add month if not applying to all months
      if (data.month) {
        payload.month = data.month;
      }
      
      return await api.post('/fee/define-fees', payload);
    } catch (error) {
      console.error('Error defining fees:', error);
      throw error;
    }
  },

  // Get fee definitions - matches backend route: GET /fee-definitions/:year
  getFeeDefinitions: async (year, classId = null) => {
    try {
      const params = {};
      if (classId) {
        params.classId = classId;
      }
      
      const response = await api.get(`/fee/fee-definitions/${year}`, { params });
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        // Return empty data structure when no fees are found
        return { fees: {} };
      }
      console.error('Error fetching fee definitions:', error);
      throw error;
    }
  },


  editFees: async (year, data) => {
    try {
      // Backend expects: { year, feeUpdates, classIds, applyToAllMonths }
      const payload = {
        year: year,
        feeUpdates: data.feeUpdates,
        classIds: data.classIds,
        applyToAllMonths: data.applyToAllMonths
      };
      
      // Add months if not applying to all months
      if (!data.applyToAllMonths && data.months) {
        payload.months = data.months;
      }
      
      return await api.put(`/fee/fee-definitions/${year}`, payload);
    } catch (error) {
      console.error('Error editing fees:', error);
      throw error;
    }
  },


  // Student Fees
  getStudentByGrNumber: async (grNumber) => {
    try {
      const response = await api.get(`/fee/student/${grNumber}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching student by GR number:', error);
      throw error;
    }
  },

  getStudentFeeHistory: async (grNumber) => {
    try {
      const response = await api.get(`/fee/history/${grNumber}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching student fee history:', error);
      throw error;
    }
  },


    payFeesForStudent: async (paymentData) => {
    try {
      const response = await api.post('/fee/pay-for-student', paymentData);
      return response.data;
    } catch (error) {
      console.error('Error processing payment:', error);
      throw error;
    }
  },

  // Payments

  getClassesForFees: async (filters = {}) => {
    try {
      const response = await api.get('/fee/classes', { params: filters }); // Changed to /fee/classes
      console.log('getAvailableClasses response:', response.data); // Debug log
      return response.data;
    } catch (error) {
      console.error('Error fetching classes:', error.response?.data || error.message);
      throw error;
    }
  },

  


  getFeesByClassAndMonth: async (classId, month, year) => {
    try {
      console.log('Calling getFeesByClassAndMonth with:', { classId, month, year });
      const response = await api.get(`/fee/class/${classId}/${month}/${year}`);
      console.log('getFeesByClassAndMonth response:', response.data);
      // Return the actual data, not the response object
      return response.data;
    } catch (error) {
      console.error('Error fetching fees by class and month:', error.response?.data || error.message);
      throw error;
    }
  },
  
  


  getPendingPayments: async () => {
    try {
      const response = await api.get('/fee/pending-payments');
      console.log('getPendingPayments response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching pending payments:', error.response?.data || error.message);
      throw error;
    }
  },

  


  verifyPayment: async (data) => {
    try {
      const response = await api.post('/fee/verify-payment', data);
      console.log('verifyPayment response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error verifying payment:', error.response?.data || error.message);
      throw error;
    }
  },

  

  // Reports
  getTotalEarningsByYear: async (year) => {
    return api.get('/fee/total-earnings', { params: { year } });
  },

  
   getReceipts: async (params = {}) => {
    try {
      const response = await api.get('/fee/receipts', { params });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Download a specific receipt
  downloadReceipt: async (paymentId) => {
    try {
      const response = await api.get(`/fee/receipt/${paymentId}/download`, {
        responseType: 'blob' // For handling streamed file downloads
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Audit Logs
  getAuditLogs: async (params) => {
    return api.get('/fee/audit-logs', { params });
  },

  // Refunds
  refundPayment: async (data) => {
    return api.post('/fee/refund-payment', data);
  },



//   updateStudentTransport: async (grNumber, transportData) => {
//     try {
//       const response = await api.put(`/fee/student/${grNumber}/transport`, transportData);
//       return response.data;
//     } catch (error) {
//       console.error('Error updating student transport:', error);
//       throw error;
//     }
//   },

//   // Get student transport details (you might need this endpoint in backend too)
//   getStudentTransport: async (grNumber) => {
//     try {
//       const response = await api.get(`/fee/student/${grNumber}/transport`);
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching student transport:', error);
//       throw error;
//     }
//   },

//   getStudentsWithTransport: async (params = {}) => {
//   const response = await api.get('/fee/students/transport', { params });
//   return response.data;
// },



// Update student transport - matches: PUT /student/:grNumber/transport
  updateStudentTransport: async (grNumber, transportData) => {
    try {
      const response = await api.put(`/fee/student/${grNumber}/transport`, transportData);
      return response.data;
    } catch (error) {
      console.error('Error updating student transport:', error);
      throw error;
    }
  },

  // Get students with transport - matches: GET /students/transport
  getStudentsWithTransport: async (params = {}) => {
    try {
      const response = await api.get('/fee/students/transport', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching students with transport:', error);
      throw error;
    }
  },
  
  getStudentTransport: async (grNumber) => {
  try {
    const response = await api.get(`/fee/student/${grNumber}/transport`);
    return response.data;
  } catch (error) {
    console.error('Error fetching student transport:', error);
    throw error;
  }
},

  // Get transport fee calculation - matches: GET /transport/fee-calculation/:grNumber
  getTransportFeeCalculation: async (grNumber, params = {}) => {
    try {
      const response = await api.get(`/fee/transport/fee-calculation/${grNumber}`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching transport fee calculation:', error);
      throw error;
    }
  },



// getTransportFeeCalculation: async (grNumber, params = {}) => {
//   const response = await api.get(`/fee/transport/fee-calculation/${grNumber}`, { params });
//   return response.data;
// },


};

export default feesService;