// import { useState, useEffect } from 'react';
// import AdminLayout from '../../../components/layout/AdminLayout';
// import AdminService from '../../../services/adminService';
// import { useAuth } from '../../../contexts/AuthContext';
// import TeacherTable from '../../../components/admin/TeacherManagement';
// import AssignTeacherModal from '../../../components/admin/AssignTeacherModal';

// const TeachersPage = () => {
//   const [teachers, setTeachers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedTeacher, setSelectedTeacher] = useState(null);
//   const { user } = useAuth();

//   useEffect(() => {
//     const fetchTeachers = async () => {
//       try {
//         const response = await AdminService.getTeachers();
//         setTeachers(response.data);
//       } catch (error) {
//         console.error('Error fetching teachers:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTeachers();
//   }, []);

//   const handleAssignClick = (teacher) => {
//     setSelectedTeacher(teacher);
//     setIsModalOpen(true);
//   };

//   const handleAssignmentSubmit = async (assignments) => {
//     try {
//       await AdminService.updateTeacherAssignments(selectedTeacher._id, assignments);
//       // Refresh teacher list
//       const response = await AdminService.getTeachers();
//       setTeachers(response.data);
//       setIsModalOpen(false);
//     } catch (error) {
//       console.error('Error updating assignments:', error);
//     }
//   };

//   return (
//     <AdminLayout>
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-2xl font-bold mb-6">Teacher Management</h1>
        
//         <button 
//           onClick={() => setIsModalOpen(true)}
//           className="bg-blue-600 text-white px-4 py-2 rounded mb-4 hover:bg-blue-700"
//         >
//           Add New Teacher
//         </button>

//         {loading ? (
//           <p>Loading teachers...</p>
//         ) : (
//           <TeacherTable 
//             teachers={teachers} 
//             onAssignClick={handleAssignClick} 
//           />
//         )}

//         <AssignTeacherModal
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//           teacher={selectedTeacher}
//           onSubmit={handleAssignmentSubmit}
//         />
//       </div>
//     </AdminLayout>
//   );
// };

// export default TeachersPage;



// import { useState, useEffect } from 'react';
// import AdminLayout from '../../../components/layout/AdminLayout';
// import AdminService from '../../../services/adminService';
// import { useAuth } from '../../../contexts/AuthContext';
// import TeacherTable from '../../../components/admin/TeacherManagement';
// import AssignTeacherModal from '../../../components/admin/AssignTeacherModal';

// const TeachersPage = () => {
//   const [teachers, setTeachers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedTeacher, setSelectedTeacher] = useState(null);
//   const { user } = useAuth();

//   useEffect(() => {
//     const fetchTeachers = async () => {
//       try {
//         const response = await AdminService.getTeachers();
//         console.log('Teachers response:', response.data); // Debug log
//         setTeachers(Array.isArray(response.data.data) ? response.data.data : []);
//       } catch (error) {
//         console.error('Error fetching teachers:', error);
//         setTeachers([]); // Fallback to empty array on error
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTeachers();
//   }, []);

//   const handleAssignClick = (teacher) => {
//     setSelectedTeacher(teacher);
//     setIsModalOpen(true);
//   };

//   const handleAssignmentSubmit = async (assignments) => {
//     try {
//       await AdminService.updateTeacherAssignments(selectedTeacher._id, assignments);
//       const response = await AdminService.getTeachers();
//       console.log('Updated teachers response:', response.data); // Debug log
//       setTeachers(Array.isArray(response.data.data) ? response.data.data : []);
//       setIsModalOpen(false);
//     } catch (error) {
//       console.error('Error updating assignments:', error);
//     }
//   };

//   return (
//     <AdminLayout>
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-2xl font-bold mb-6">Teacher Management</h1>
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="bg-blue-600 text-white px-4 py-2 rounded mb-4 hover:bg-blue-700"
//         >
//           Add New Teacher
//         </button>
//         {loading ? (
//           <p>Loading teachers...</p>
//         ) : (
//           <TeacherTable teachers={teachers} onAssignClick={handleAssignClick} />
//         )}
//         <AssignTeacherModal
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//           teacher={selectedTeacher}
//           onSubmit={handleAssignmentSubmit}
//         />
//       </div>
//     </AdminLayout>
//   );
// };

// export default TeachersPage;



import { useState, useEffect } from 'react';
import AdminLayout from '../../../components/layout/AdminLayout';
import AdminService from '../../../services/adminService';
import { useAuth } from '../../../contexts/AuthContext';
import TeacherTable from '../../../components/admin/TeacherManagement';
import AssignTeacherModal from '../../../components/admin/AssignTeacherModal';
import CreateTeacherModal from '../../../components/admin/CreateTeacherModal';
import ReassignSubjectModal from '../../../components/admin/ReassignSubjectModal';
import { Button, Alert, Snackbar } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

const TeachersPage = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isReassignModalOpen, setIsReassignModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [teacherToReassign, setTeacherToReassign] = useState(null);
  const [teacherToDelete, setTeacherToDelete] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, severity: 'success', message: '' });
  const { user } = useAuth();

  // pagination state
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const response = await AdminService.getTeachers();
      const data = response.data || [];
      
      // Normalize the data: rename 'assignments' to 'currentAssignments' if needed
      const normalizedData = data.map(teacher => ({
        ...teacher,
        currentAssignments: teacher.currentAssignments || teacher.assignments
      }));
      
      setTeachers(normalizedData);

      const pages = Math.ceil(normalizedData.length / rowsPerPage) || 1;
      setTotalPages(pages);
    } catch (error) {
      console.error('Error fetching teachers:', error);
      setTeachers([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, [rowsPerPage]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setPage(1);
    const pages = Math.ceil(teachers.length / newRowsPerPage) || 1;
    setTotalPages(pages);
  };

  const handleAssignClick = (teacher) => {
    setSelectedTeacher(teacher);
    setIsAssignModalOpen(true);
  };

  const handleAssignmentSubmit = async (payload) => {
    try {
      // The payload already comes in the correct format from AssignTeacherModal:
      // {
      //   classTeacherOf: "classId" (optional),
      //   removeClassTeacherRole: true/false (optional),
      //   addSubjectAssignments: [{ classId, subjectId }] (optional),
      //   removeSubjectAssignments: [{ classId, subjectId }] (optional)
      // }

      await AdminService.updateTeacherAssignments(selectedTeacher._id, payload);
      
      setSnackbar({
        open: true,
        severity: 'success',
        message: '✅ Teacher assignments updated successfully!'
      });

      await fetchTeachers();
      setIsAssignModalOpen(false);
      setSelectedTeacher(null);

    } catch (error) {
      console.error('Error updating assignments:', error);
      
      let errorMessage = 'Failed to update assignments. Please try again.';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      setSnackbar({
        open: true,
        severity: 'error',
        message: `❌ ${errorMessage}`
      });
    }
  };

  const handleTeacherCreated = async (newTeacher) => {
    setIsCreateModalOpen(false);
    setSnackbar({
      open: true,
      severity: 'success',
      message: '✅ Teacher created successfully!'
    });

    // Refetch all teachers to ensure proper data structure with assignments
    await fetchTeachers();
  };

  const handleDeleteClick = (teacher) => {
    setTeacherToDelete(teacher);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setTeacherToDelete(null);
    setDeleteDialogOpen(false);
  };

  const handleReassignSubjectClick = (teacher) => {
    setTeacherToReassign(teacher);
    setIsReassignModalOpen(true);
  };

  const handleReassignSubmit = async (reassignData) => {
    try {
      await AdminService.reassignSubject(reassignData);
      setSnackbar({
        open: true,
        severity: 'success',
        message: `✅ Subject reassigned successfully from ${teacherToReassign.name}!`
      });

      await fetchTeachers();
      setIsReassignModalOpen(false);
      setTeacherToReassign(null);
    } catch (error) {
      console.error('Error reassigning subject:', error);

      let errorMessage = 'Failed to reassign subject. Please try again.';
      if (error.response?.status === 404) {
        errorMessage = error.response?.data?.message || 'Teacher or subject not found.';
      } else if (error.response?.status === 500) {
        errorMessage = 'Server error occurred. Please try again later.';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      setSnackbar({
        open: true,
        severity: 'error',
        message: `❌ ${errorMessage}`
      });
    }
  };

  const handleConfirmDelete = async () => {
    try {
      setIsDeleting(true);
      await AdminService.deleteTeacher(teacherToDelete._id);
      await fetchTeachers();
      setTeacherToDelete(null);
      setDeleteDialogOpen(false);
      setIsDeleting(false);
      setSnackbar({ 
        open: true, 
        severity: 'success', 
        message: '✅ Teacher deleted successfully.' 
      });
    } catch (error) {
      console.error('Error deleting teacher:', error);
      setSnackbar({ 
        open: true, 
        severity: 'error', 
        message: `❌ Failed to delete teacher: ${error.message}` 
      });
      setIsDeleting(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const paginatedTeachers = teachers.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Teacher Management</h1>            
          <Button
            variant="contained"
            size="small"
            onClick={() => setIsCreateModalOpen(true)}            
          >
            Add New Teacher
          </Button>
        </div>
        
        <TeacherTable
          teachers={paginatedTeachers}
          loading={loading}
          onAssignClick={handleAssignClick}
          onDeleteClick={handleDeleteClick}
          onReassignSubjectClick={handleReassignSubjectClick}
          page={page}
          rowsPerPage={rowsPerPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
        
        <AssignTeacherModal
          isOpen={isAssignModalOpen}
          onClose={() => {
            setIsAssignModalOpen(false);
            setSelectedTeacher(null);
          }}
          teacher={selectedTeacher}
          onSubmit={handleAssignmentSubmit}
        />

        <CreateTeacherModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onTeacherCreated={handleTeacherCreated}
        />

        <Dialog
          open={deleteDialogOpen}
          onClose={handleCloseDeleteDialog}
          aria-labelledby="delete-dialog-title"
          aria-describedby="delete-dialog-description"
        >
          <DialogTitle id="delete-dialog-title">
            Confirm Delete Teacher
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="delete-dialog-description">
              Are you sure you want to delete teacher{' '}
              <strong>{teacherToDelete?.name}</strong>?
              <br />
              <br />
              This action cannot be undone. All assignments and related data will be removed.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={handleCloseDeleteDialog} 
              disabled={isDeleting}
              color="inherit"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmDelete}
              color="error"
              variant="contained"
              disabled={isDeleting}
              autoFocus
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogActions>
        </Dialog>

        <ReassignSubjectModal
          isOpen={isReassignModalOpen}
          onClose={() => {
            setIsReassignModalOpen(false);
            setTeacherToReassign(null);
          }}
          teacher={teacherToReassign}
          onSubmit={handleReassignSubmit}
        />

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>

      </div>
    </AdminLayout>
  );
};

export default TeachersPage;