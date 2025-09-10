// import { useState, useEffect } from 'react';
// import AdminLayout from '../../../components/layout/AdminLayout';
// import AdminService from '../../../services/adminService';
// import { useAuth } from '../../../contexts/AuthContext';
// import UserTable from '../../../components/admin/UserTable';
// import CreateUserModal from '../../../components/admin/CreateUserModal';

// const UsersPage = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const { user } = useAuth();

//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       const response = await AdminService.getUsers();
//       setUsers(response || []);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//       setUsers([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const handleEditClick = (user) => {
//     setSelectedUser(user);
//     // Implement edit modal or redirect to edit page if needed
//     alert('Edit functionality to be implemented');
//   };

//   const handleUserCreated = (newUser) => {
//     setUsers((prev) => [...prev, newUser]);
//     setIsCreateModalOpen(false);
//   };

//   return (
//     <AdminLayout>
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-2xl font-bold mb-6">User Management</h1>
//         <div className="flex justify-between items-center mb-6">
//           <button
//             onClick={() => setIsCreateModalOpen(true)}
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//           >
//             Add New User
//           </button>
//         </div>

//         {loading ? (
//           <div className="flex justify-center items-center h-64">
//             <p>Loading users...</p>
//           </div>
//         ) : (
//           <UserTable users={users} onEditClick={handleEditClick} />
//         )}

//         <CreateUserModal
//           isOpen={isCreateModalOpen}
//           onClose={() => setIsCreateModalOpen(false)}
//           onUserCreated={handleUserCreated}
//         />
//       </div>
//     </AdminLayout>
//   );
// };

// export default UsersPage;

import { useState, useEffect } from "react";
import AdminLayout from "../../../components/layout/AdminLayout";
import AdminService from "../../../services/adminService";
import { useAuth } from "../../../contexts/AuthContext";
import UserTable from "../../../components/admin/UserTable";
import CreateUserModal from "../../../components/admin/CreateUserModal";
import { Button } from "@mui/material";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { user } = useAuth();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await AdminService.getUsers();
      // Filter out student roles as they're already excluded in backend
      setUsers(response || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEditClick = (user) => {
    setSelectedUser(user);
    // Implement edit modal or redirect to edit page if needed
    alert("Edit functionality to be implemented");
  };

  const handleUserCreated = (newUser) => {
    setUsers((prev) => [...prev, newUser]);
    setIsCreateModalOpen(false);
  };

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">User Management</h1>
          <Button
          variant="contained"
          size="small"
          onClick={() => setIsCreateModalOpen(true)}
          >
            Add New User
          </Button>
        </div>

        <UserTable
          users={users}
          onEditClick={handleEditClick}
          loading={loading}
        />

        <CreateUserModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onUserCreated={handleUserCreated}
        />
      </div>
    </AdminLayout>
  );
};

export default UsersPage;
