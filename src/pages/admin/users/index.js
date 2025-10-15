import { useState, useEffect } from "react";
import { Button, FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";
import AdminLayout from "../../../components/layout/AdminLayout";
import AdminService from "../../../services/adminService";
import { useAuth } from "../../../contexts/AuthContext";
import UserTable from "../../../components/admin/UserTable";
import CreateUserModal from "../../../components/admin/CreateUserModal";
import EditUserModal from "../../../components/admin/EditUserModal";

const UsersPage = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedRole, setSelectedRole] = useState("all");

  const roles = [
    { value: "all", label: "All Roles" },
    { value: "admin", label: "Admin" },
    { value: "teacher", label: "Teacher" },
    { value: "clerk", label: "Clerk" },
    { value: "librarian", label: "Librarian" },
    { value: "inventory manager", label: "Inventory Manager" },
    { value: "parent", label: "Parent" },
    { value: "transport", label: "Transport" },
    { value: "fee_manager", label: "Fee Manager" },
    { value: "student", label: "Student" },
  ];

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await AdminService.getUsers();
      setAllUsers(response);
      setFilteredUsers(response);

      const pages = Math.ceil(response.length / rowsPerPage);
      setTotalPages(pages);
    } catch (error) {
      console.error("Error fetching users:", error);
      setAllUsers([]);
      setFilteredUsers([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    // Filter users based on selected role
    if (selectedRole === "all") {
      setFilteredUsers(allUsers);
    } else {
      const filtered = allUsers.filter(
        (user) => user.role.toLowerCase() === selectedRole.toLowerCase()
      );
      setFilteredUsers(filtered);
    }
    // Reset to page 1 when filter changes
    setPage(1);
  }, [selectedRole, allUsers]);

  useEffect(() => {
    const pages = Math.ceil(filteredUsers.length / rowsPerPage);
    setTotalPages(pages);
  }, [filteredUsers.length, rowsPerPage]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setPage(1);
    const pages = Math.ceil(filteredUsers.length / newRowsPerPage);
    setTotalPages(pages);
  };

  const handleRoleFilterChange = (event) => {
    setSelectedRole(event.target.value);
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

  const paginatedUsers = filteredUsers.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">User Management</h1>
          <Box display="flex" gap={2} alignItems="center">
            <FormControl size="small" sx={{ minWidth: 200 }}>
              <InputLabel>Filter by Role</InputLabel>
              <Select
                value={selectedRole}
                label="Filter by Role"
                onChange={handleRoleFilterChange}
              >
                {roles.map((role) => (
                  <MenuItem key={role.value} value={role.value}>
                    {role.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              size="small"
              onClick={() => setIsCreateModalOpen(true)}
            >
              Add New User
            </Button>
          </Box>
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