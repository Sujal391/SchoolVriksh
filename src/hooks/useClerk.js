// src/hooks/useClerk.js
import { useState, useEffect } from 'react';
import clerkService from '../services/clerkService';
import axios from 'axios';

const useClerk = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [applications, setApplications] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
   // Separate states for leave management
  const [leaveStatus, setLeaveStatus] = useState(null);
  const [leaveLoading, setLeaveLoading] = useState(true);
  const [leaveError, setLeaveError] = useState(null);
  const [error, setError] = useState(null);


  // // Initialize data
  // useEffect(() => {
  //   fetchDashboardData();
  //   fetchPendingApplications();
  //   fetchCertificateHistory();
  //   fetchAvailableClasses();
  //   console.log('=== DEBUG: useClerk useEffect triggered ===');
  //   fetchLeaveStatus();
  // }, []);


  // Initialize data
  useEffect(() => {
    const initializeData = async () => {
      console.log('=== DEBUG: useClerk useEffect triggered ===');
      
      // Run these in parallel
      await Promise.all([
        fetchDashboardData(),
        fetchPendingApplications(),
        fetchCertificateHistory(),
        fetchAvailableClasses(),
        fetchLeaveStatus()
      ]);
    };

    initializeData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const data = await clerkService.getDashboardData();
      setDashboardData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStudentById = async (studentId) => {
  try {
    setLoading(true);
    const response = await clerkService.getStudentById(studentId);
    return response.student;
  } catch (err) {
    setError(err.message);
    throw err;
  } finally {
    setLoading(false);
  }
};

  const fetchPendingApplications = async () => {
    try {
      setLoading(true);
      const apps = await clerkService.getPendingApplications();
      setApplications(apps);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyApplication = async (applicationId, status, comments) => {
    try {
      setLoading(true);
      await clerkService.verifyApplication(applicationId, status, comments);
      await fetchPendingApplications(); // Refresh the list
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchCertificateHistory = async () => {
    try {
      setLoading(true);
      const certs = await clerkService.getCertificateHistory();
      setCertificates(certs);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableClasses = async () => {
    try {
      setLoading(true);
      const cls = await clerkService.getAvailableClasses();
      console.log('Fetched classes:', cls);
      setClasses(cls);
    } catch (err) {
      console.error('Error fetching classes:', err.response?.data || err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };







  // const fetchStudentsByClass = async (classId) => {
  //   try {
  //     setLoading(true);
  //     const stds = await clerkService.getStudentsByClass(classId);
  //     console.log('Fetched students:', stds);
  //     setStudents(stds);
  //   } catch (err) {
  //     console.error('Error fetching students:', err.response?.data || err.message);
  //     setError(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchStudentsByClass = async (classId) => {
  try {
    setLoading(true);
    const stds = await clerkService.getStudentsByClass(classId);
    // Add classId to each student for reference
    const studentsWithClass = stds.map(student => ({
      ...student,
      classId // Add the classId to each student object
    }));
    setStudents(studentsWithClass);
  } catch (err) {
    console.error('Error fetching students:', err.response?.data || err.message);
    setError(err.message);
  } finally {
    setLoading(false);
  }
};




  const enrollStudent = async (applicationId, classId, grNumber, password, parentPassword) => {
    try {
      setLoading(true);
      const result = await clerkService.enrollStudent(
        applicationId,
        classId,
        grNumber,
        password,
        parentPassword
      );
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // const generateCertificate = async (certificateId, data) => {
  //   try {
  //     setLoading(true);
  //     const result = await clerkService.generateCertificate(certificateId, data);
  //     await fetchCertificateHistory(); // Refresh the list
  //     return result;
  //   } catch (err) {
  //     setError(err.message);
  //     throw err;
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const fetchPendingCertificates = async () => {
  try {
    setLoading(true);
    const certs = await clerkService.getPendingCertificates();
    setPendingCertificates(certs);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  //   const generateCertificate = async (certificateId, data) => {
  //   try {
  //     setLoading(true);
  //     const result = await clerkService.generateCertificate(certificateId, {
  //       status: data.status,
  //       comments: data.comments,
  //       pdfData: data.pdfData,
  //       certificateType: data.certificateType,
  //       purpose: data.purpose,
  //       urgency: data.urgency
  //     });
  //     await fetchCertificateHistory();
  //     return result;
  //   } catch (err) {
  //     setError(err.message);
  //     throw err;
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const verifyCertificateBySerial = async (serialNumber) => {
    try {
      setLoading(true);
      const response = await clerkService.verifyCertificateBySerial(serialNumber);
      return response;
    } catch (error) {
      console.error('Verification failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };


  const generateCertificate = async (certificateId, data) => {
  try {
    setLoading(true);
    const result = await clerkService.generateCertificate(certificateId, data);
    await fetchCertificateHistory();
    return result;
  } catch (err) {
    console.error('Error in generateCertificate:', err, err.response?.data); // Debug log
    setError(err.response?.data?.message || err.message);
    throw err;
  } finally {
    setLoading(false);
  }
};

const refreshCertificates = async () => {
    try {
      const [history, pending] = await Promise.all([
        clerkService.getCertificateHistory(),
        clerkService.getPendingCertificates()
      ]);
      setCertificates(history);
      setPendingCertificates(pending);
    } catch (error) {
      console.error('Failed to refresh certificates:', error);
    }
  };

 const uploadSignedCertificate = async (certificateId, file) => {
    try {
      setLoading(true);
      const result = await clerkService.uploadSignedCertificate(certificateId, file);
      await fetchCertificateHistory();
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

const sendCertificateToStudent = async (certificateId) => {
  try {
    setLoading(true);
    await clerkService.sendCertificateToStudent(certificateId);
    await fetchCertificateHistory(); // Refresh the list
    await fetchPendingCertificates(); // Refresh pending list
  } catch (err) {
    setError(err.message);
    throw err;
  } finally {
    setLoading(false);
  }
};


  const registerExistingStudent = async (studentData) => {
    try {
      setLoading(true);
      const result = await clerkService.registerExistingStudent(studentData);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const upgradeStudentClass = async (studentId, newClassId) => {
    try {
      setLoading(true);
      const result = await clerkService.upgradeStudentClass(studentId, newClassId);
      await fetchStudentsByClass(newClassId); // Refresh the student list
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

 

  const requestLeave = async (leaveData) => {
  try {
    setLoading(true);
    const result = await clerkService.requestLeave(leaveData);

    await fetchLeaveStatus()
    return result;
  } catch (err) {
    setError(err.message);
    throw err;
  } finally {
    setLoading(false);
  }
};


const fetchLeaveStatus = async () => {
    console.log('=== DEBUG: fetchLeaveStatus called ===');
    try {
      setLeaveLoading(true);
      setLeaveError(null);
      
      console.log('Making API call to getLeaveStatus...');
      const response = await clerkService.getLeaveStatus();
      console.log('API response received:', response);
      
      // Process the response data
      const processedData = {
        total: response.count || 0,
        pending: response.leaves?.filter(leave => leave.status === 'pending').length || 0,
        approved: response.leaves?.filter(leave => leave.status === 'approved').length || 0,
        rejected: response.leaves?.filter(leave => leave.status === 'rejected').length || 0,
        leaves: response.leaves || []
      };
      
      console.log('Processed data:', processedData);
      console.log('About to call setLeaveStatus...');
      
      setLeaveStatus(processedData);
      console.log('setLeaveStatus called with:', processedData);
      
    } catch (err) {
      console.error('=== DEBUG: fetchLeaveStatus error ===', err);
      setLeaveError(err.message);
    } finally {
      console.log('Setting leaveLoading to false');
      setLeaveLoading(false);
    }
  };





  const getAdmissionHistory = async (grNumber) => {
    try {
      setLoading(true);
      const history = await clerkService.getAdmissionHistory(grNumber);
      return history;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  

  return {
    dashboardData,
    applications,
    certificates,
    classes,
    students,
    loading,
    error,
    // Leave-specific states
    leaveStatus,
    leaveLoading,
    leaveError,
    verifyApplication,
    enrollStudent,
    generateCertificate,
    uploadSignedCertificate,
    sendCertificateToStudent,
    registerExistingStudent,
    upgradeStudentClass,
    getAdmissionHistory,
    fetchPendingApplications,
    fetchCertificateHistory,
    fetchAvailableClasses,
    fetchStudentsByClass,
    requestLeave,
    refreshLeaveStatus: fetchLeaveStatus,
    getStudentById,
    verifyCertificateBySerial,
    refreshCertificates
  };
};

export default useClerk;