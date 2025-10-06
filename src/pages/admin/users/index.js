import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import AdminLayout from "../../../components/layout/AdminLayout";
import AdminService from "../../../services/adminService";
import { useAuth } from "../../../contexts/AuthContext";
import UserTable from "../../../components/admin/UserTable";
import CreateUserModal from "../../../components/admin/CreateUserModal";
import EditUserModal from "../../../components/admin/EditUserModal";

const UsersPage = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await AdminService.getUsers();
      setAllUsers(response);

      const pages = Math.ceil(response.length / rowsPerPage);
      setTotalPages(pages);
    } catch (error) {
      console.error("Error fetching users:", error);
      setAllUsers([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const pages = Math.ceil(allUsers.length / rowsPerPage);
    setTotalPages(pages);
  }, [allUsers.length, rowsPerPage]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setPage(1);
    const pages = Math.ceil(allUsers.length / newRowsPerPage);
    setTotalPages(pages);
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await AdminService.deleteUser(userId);
        fetchUsers();
        alert("User deleted successfully");
      } catch (error) {
        console.error("Error deleting user:", error);
        alert(error.response?.data?.message || "Failed to delete user");
      }
    }
  };

  const handleUserCreated = () => {
    fetchUsers();
    setIsCreateModalOpen(false);
  };

  const handleUserUpdated = () => {
    fetchUsers();
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };

  const paginatedUsers = allUsers.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

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
          users={paginatedUsers}
          loading={loading}
          page={page}
          rowsPerPage={rowsPerPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
        />

        <CreateUserModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onUserCreated={handleUserCreated}
        />

        <EditUserModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedUser(null);
          }}
          user={selectedUser}
          onUserUpdated={handleUserUpdated}
        />
      </div>
    </AdminLayout>
  );
};

export default UsersPage;