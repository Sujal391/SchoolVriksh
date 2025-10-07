// import api from "./api";

// const AdminService = {
//   // User Management
//   createUser: (userData) => api.post("/admin/users", userData),
//   getUsers: () => api.get("/admin/users").then((res) => res.data || []),
//   getUser: (userId) => api.get(`/admin/users/${userId}`),
//   updateUserRole: (userId, roleData) =>
//     api.put(`/admin/users/${userId}/role`, roleData),

//   // Class Management
//   createClass: (classData) => api.post("/admin/classes", classData),
//   getClasses: () => api.get("/admin/classes"),
//   getClass: (classId) => api.get(`/admin/classes/${classId}`),
//   getAvailableClasses: () => api.get("/admin/available-classes"),

//   // Teacher Management
//   createTeacher: (teacherData) =>
//     api.post("/admin/teachers", teacherData).then((res) => res.data),

//   getTeachers: () => api.get("/admin/teachers").then((res) => res.data),
//   updateTeacherAssignments: (teacherId, assignments) =>
//     api
//       .put(`/admin/teachers/${teacherId}/assignments`, assignments)
//       .then((res) => res.data),
//   getTeacherAssignments: () =>
//     api.get("/admin/teacher-assignments").then((res) => res.data),

//   // Student Management
// // In AdminService.js
// getStudentsByClass: (classId = "all") => api.get(`/admin/students/class/${classId}`),

//   // Subject Management
//   createSubject: (subjectData) => api.post("/admin/subjects", subjectData),
//   getSubjectsByClass: (classId) =>
//     api.get(`/admin/classes/${classId}/subjects`),
//   getAllSubjects: () => api.get("/admin/subjects"),
//   uploadSyllabus: (subjectId, formData) =>
//     api.post(`/admin/subjects/${subjectId}/syllabus`, formData),

//   // Exam Management
//   createExamSchedule: (examData) => api.post("/admin/schedule", examData),
//   getExamSchedules: () => api.get("/admin/schedules"),
  

//   reviewClassResults: (examId, classId) =>
//     api.get(`/admin/exams/${examId}/classes/${classId}/review`),
//   uploadExcelResults: (examEventId, classId, file) => {
//     const formData = new FormData();
//     formData.append("file", file);
//     return api.post(
//       `/admin/exam-events/${examEventId}/classes/${classId}/results`,
//       formData,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );
//   },
//   publishResults: (examId, classId) =>
//     api.post(`/admin/exams/${examId}/classes/${classId}/publish`),


//   // Attendance Management
//   getAttendanceReport: (params) => api.get("/admin/attendance", { params }),

//   // Leave Management
//   getPendingLeaveRequests: () => api.get("/admin/leave-requests/pending"),
//   reviewLeaveRequest: (leaveId, decision) =>
//     api.put(`/admin/leave-requests/${leaveId}/review`, decision),
//   getLeaveRequestHistory: () => api.get("/admin/leave-requests/history"),

//   // Daily Work
//   getDailyWork: () => api.get("/admin/daily-work"),
// };

// export default AdminService;





import api from "./api";
import cookies from 'js-cookie';

const AdminService = {
  // User Management
  createUser: (userData) => api.post("/admin/users", userData),
  getUsers: () => api.get("/admin/users").then((res) => res.data || []),
  getUser: (userId) => api.get(`/admin/users/${userId}`),
  updateUserRole: (userId, roleData) =>
    api.put(`/admin/users/${userId}/role`, roleData),
  updateUser: (userId, userData) =>
    api.put(`/admin/staff/${userId}`, userData),
  deleteUser: (userId) => api.delete(`/admin/staff/${userId}`),

  // Class Management
  createClass: (classData) => api.post("/admin/classes", classData),
  getClasses: () => api.get("/admin/classes"),
  getClass: (classId) => api.get(`/admin/classes/${classId}`),
  updateClass: (classId, classData) => api.patch(`/admin/classes/${classId}`, classData).then((res) => res.data),
  // getAvailableClasses: () => api.get("/admin/available-classes"),
  getAvailableClasses: () =>
    api.get("/admin/available-classes")
      .then((res) => res.data),

  // Teacher Management
  createTeacher: (teacherData) =>
    api.post("/admin/teachers", teacherData)
      .then((res) => res.data),

  getTeachers: () => 
    api.get("/admin/teachers")
      .then((res) => res.data),

  updateTeacherAssignments: (teacherId, assignments) =>
    api.put(`/admin/teachers/${teacherId}/assignments`, assignments)
      .then((res) => res.data),

  deleteTeacher: (teacherId) => 
    api.delete(`/admin/teachers/${teacherId}`)
      .then((res) => res.data),

  getTeacherAssignments: () =>
    api.get("/admin/teacher-assignments")
      .then((res) => res.data),

  // Student Management
  getStudentsByClass: (classId = "all") => api.get(`/admin/students/class/${classId}`),
  getAllStudents: () => api.get(`/admin/students/class/all`).then((res) => res.data),

  // Subject Management
  createSubject: (subjectData) => api.post("/admin/subjects", subjectData),
  getSubjectsByClass: (classId) =>
    api.get(`/admin/classes/${classId}/subjects`),
  getAllSubjects: () => api.get("/admin/subjects"),
  updateSubject: (subjectId, subjectData) =>
    api.put(`/admin/subjects/${subjectId}`, subjectData).then((res) => res.data),
  deleteSubject: (subjectId) =>
    api.delete(`/admin/subjects/${subjectId}`).then((res) => res.data),
  reassignSubject: (reassignData) =>
    api.post("/admin/teachers/reassign-subject", reassignData).then((res) => res.data),
  uploadSyllabus: (subjectId, formData) =>
    api.post(`/admin/subjects/${subjectId}/syllabus`, formData),

  // Exam Management - FIXED
  createExamSchedule: (examData) => api.post("/admin/schedule", examData),
  // getExamSchedules: () => api.get("/admin/schedules").then((res) => {
  //   // Transform the schedule data to match frontend expectations
  //   const schedule = res.data.schedule || {};
  //   const examEvents = [];
    
  //   // Convert the date-organized schedule back to exam events array
  //   Object.keys(schedule).forEach(date => {
  //     schedule[date].forEach(exam => {
  //       // Check if this exam event already exists in our array
  //       let existingEvent = examEvents.find(event => 
  //         event._id === exam.examEvent._id
  //       );
        
  //       if (!existingEvent) {
  //         // Create new exam event entry
  //         existingEvent = {
  //           _id: exam.examEvent._id,
  //           name: exam.examEvent.name,
  //           examType: exam.examEvent.examType,
  //           customExamType: exam.examEvent.customExamType,
  //           startDate: date, // Use the earliest date found
  //           endDate: date,   // Will be updated as we find later dates
  //           classes: [],
  //           status: exam.status || 'scheduled'
  //         };
  //         examEvents.push(existingEvent);
  //       }
        
  //       // Update end date if this exam is later
  //       if (new Date(date) > new Date(existingEvent.endDate)) {
  //         existingEvent.endDate = date;
  //       }
        
  //       // Add class info if not already present
  //       const classExists = existingEvent.classes.some(cls => 
  //         cls._id === exam.class._id
  //       );
  //       if (!classExists) {
  //         existingEvent.classes.push({
  //           _id: exam.class._id,
  //           name: exam.class.name,
  //           division: exam.class.division
  //         });
  //       }
  //     });
  //   });
    
  //   return {
  //     data: {
  //       examEvent: examEvents,
  //       schedule: schedule,
  //       totalExams: res.data.totalExams
  //     }
  //   };
  // }),


getExamSchedules: (params = {}) => {
  // Build query string from params
  const queryString = new URLSearchParams(params).toString();
  const url = queryString 
    ? `/admin/schedules?${queryString}` 
    : `/admin/schedules`;
  
  return api.get(url).then((res) => {
    // Handle successful response (2xx)
    const schedule = res.data.schedule || {};
    const examEvents = [];
    
    // Convert the date-organized schedule back to exam events array
    Object.keys(schedule).forEach(date => {
      schedule[date].forEach(exam => {
        let existingEvent = examEvents.find(event => 
          event._id === exam.examEvent._id
        );
        
        if (!existingEvent) {
          existingEvent = {
            _id: exam.examEvent._id,
            name: exam.examEvent.name,
            examType: exam.examEvent.examType,
            customExamType: exam.examEvent.customExamType,
            academicYear: exam.examEvent.academicYear || exam.academicYear, // Add academic year
            // examDate: exam.examEvent.examDate || exam.examDate, // Add exam date
            startDate: date,
            endDate: date,
            classes: [],
            status: exam.status || 'scheduled'
          };
          examEvents.push(existingEvent);
        }
        
        if (new Date(date) > new Date(existingEvent.endDate)) {
          existingEvent.endDate = date;
        }
        
        const classExists = existingEvent.classes.some(cls => 
          cls._id === exam.class._id
        );
        if (!classExists) {
          existingEvent.classes.push({
            _id: exam.class._id,
            name: exam.class.name,
            division: exam.class.division
          });
        }
      });
    });
    
    return {
      data: {
        examEvent: examEvents,
        schedule: schedule,
        totalExams: res.data.totalExams || 0
      }
    };
  }).catch((error) => {
    // Handle 404 specifically
    if (error.response && error.response.status === 404) {
      // Return empty data for no schedules
      return {
        data: {
          examEvent: [],
          schedule: {},
          totalExams: 0
        }
      };
    }
    // Re-throw other errors
    throw error;
  });
},

   getExamEvent: async (id) => {
  const token = cookies.get('token');
  return await api.get(`/admin/exam-event/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
},


  getExamSchedulesForEvent: async (eventId) => {
  const token = cookies.get('token');
  return await api.get(`/admin/exam-event/${eventId}/schedules`, {
    headers: { Authorization: `Bearer ${token}` }
  });
},

  getAvailableRooms: async () => {
  const token = cookies.get('token');
  return await api.get('/admin/rooms', {
    headers: { Authorization: `Bearer ${token}` }
  });
},
  
  reviewClassResults: (examEventId, classId) =>
    api.get(`/admin/exam-events/${examEventId}/classes/${classId}/results`).then((res) => res.data),

  uploadExcelResults: (examEventId, classId, file) => {
    const formData = new FormData();
    formData.append("file", file);
    return api.post(`/admin/exam-events/${examEventId}/classes/${classId}/results`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  // getUnpublishedMarksheets: (examEventId, classId) =>
  //   api.get(`/admin/exam-events/${examEventId}/classes/${classId}/unpublished-marksheets`).then((res) => res.data),

  // publishIndividualMarksheet: (examEventId, classId, studentId) =>
  //   api.post(`/admin/exam-events/${examEventId}/classes/${classId}/students/${studentId}/publish`),

  // getAllMarksheets: (examEventId, classId) =>
  //   api.get(`/admin/exam-events/${examEventId}/classes/${classId}/marksheets`).then((res) => res.data),

  // Get Submitted Excel Results - NEW API
  getSubmittedExcelResults: (classId, academicYear) =>
    api.get(`/admin/classes/${classId}/academic-year/${academicYear}/results`).then((res) => res.data),

  // Verify Excel Results - NEW API
  verifyExcelResults: (classId, academicYear) =>
    api.post(`/admin/classes/${classId}/academic-year/${academicYear}/verify-results`).then((res) => res.data),

  // Get All Marksheets - NEW API
  getAllMarksheetsByClass: (classId, academicYear) =>
    api.get(`/admin/classes/${classId}/academic-year/${academicYear}/marksheets`).then((res) => res.data),

  // Publish Individual Marksheet - NEW API
  publishIndividualMarksheet: (classId, academicYear, studentId) =>
    api.post(`/admin/classes/${classId}/academic-year/${academicYear}/students/${studentId}/publish`).then((res) => res.data),

  // Get Published Marksheets - NEW API
  getPublishedMarksheets: (classId, academicYear) =>
    api.get(`/admin/classes/${classId}/academic-year/${academicYear}/published-marksheets`).then((res) => res.data),

  // Get Unpublished Marksheets - NEW API
  getUnpublishedMarksheets: (classId, academicYear) =>
    api.get(`/admin/classes/${classId}/academic-year/${academicYear}/unpublished-marksheets`).then((res) => res.data),

  // Get Student Marksheet - NEW API
  getStudentMarksheet: (studentId, academicYear) =>
    api.get(`/admin/students/${studentId}/academic-year/${academicYear}/marksheet`).then((res) => res.data),

  // Attendance Management
  getAttendanceReport: (params) => api.get("/admin/attendance", { params }),

  // Leave Management
  getPendingLeaveRequests: () => api.get("/admin/leave-requests/pending"),
  reviewLeaveRequest: (leaveId, decision) =>
    api.put(`/admin/leave-requests/${leaveId}/review`, decision),
  getLeaveRequestHistory: () => api.get("/admin/leave-requests/history"),

  // Daily Work
  getDailyWork: () => api.get("/admin/daily-work"),


  // createAdmissionForm: (formData) => api.post("/admission/forms", formData).then((res) => res.data),
  createAdmissionForm: (formData) =>
  api.post("/admission/forms", formData, {
    headers: { 
      "Content-Type": "multipart/form-data",
    },
  }).then((res) => res.data),

  getAllForms: () => api.get("/admission/all/forms").then((res) => res.data),
  // getAdmissionForm: (timestamp) => api.get(`/admin/form/${timestamp}`).then((res) => res.data),
  getPaymentDetails: (formUrl) => api.get(`/admission/payment-details/${formUrl}`).then((res) => res.data),
  getQRCodeDetails: (schoolId, timestamp) =>
    api.get(`/admission/qr-details/${schoolId}/${timestamp}`).then((res) => res.data),
  verifyPayment: (paymentData) => api.post("/admission/verify-payment", paymentData).then((res) => res.data),
  submitApplication: (applicationData) => api.post("/admission/apply", applicationData, {
    headers: { "Content-Type": "multipart/form-data" },
  }).then((res) => res.data),
  checkApplicationStatus: (trackingId) => api.get(`/admission/status/${trackingId}`).then((res) => res.data),
  searchApplications: (params) => api.get("/admission/applications/search", { params }).then((res) => res.data),
  
   validateForm: (formUrl) => api.get(`/admission/validate-form/${formUrl}`).then((res) => res.data),
  

};

export default AdminService;