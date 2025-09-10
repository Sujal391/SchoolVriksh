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
import { Button } from '@mui/material';

const TeachersPage = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const { user } = useAuth();

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const response = await AdminService.getTeachers();
      setTeachers(response.data || []);
    } catch (error) {
      console.error('Error fetching teachers:', error);
      setTeachers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleAssignClick = (teacher) => {
    setSelectedTeacher(teacher);
    setIsAssignModalOpen(true);
  };

  const handleAssignmentSubmit = async (assignments) => {
    try {
      const { classTeacherOf, subjectAssignments } = assignments;
      
      const payload = {
        classTeacherOf: classTeacherOf || null,
        addSubjectAssignments: subjectAssignments,
        removeSubjectAssignments: selectedTeacher.currentAssignments?.subjectTeacher || []
      };

      await AdminService.updateTeacherAssignments(selectedTeacher._id, payload);
      await fetchTeachers();
      setIsAssignModalOpen(false);
    } catch (error) {
      console.error('Error updating assignments:', error);
      alert('Failed to update assignments: ' + error.message);
    }
  };

  const handleTeacherCreated = (newTeacher) => {
    setTeachers(prev => [...prev, newTeacher]);
    setIsCreateModalOpen(false);
  };

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Teacher Management</h1>
        <div className="flex justify-between items-center mb-6">
          <Button
          variant="contained"
          onClick={() => setIsCreateModalOpen(true)}            
          >
            Add New Teacher
          </Button>
        </div>
        
        <TeacherTable 
            teachers={teachers}
            loading={loading}
            onAssignClick={handleAssignClick} 
          />        
        
        <AssignTeacherModal
          isOpen={isAssignModalOpen}
          onClose={() => setIsAssignModalOpen(false)}
          teacher={selectedTeacher}
          onSubmit={handleAssignmentSubmit}
        />

        <CreateTeacherModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onTeacherCreated={handleTeacherCreated}
        />
      </div>
    </AdminLayout>
  );
};

export default TeachersPage;