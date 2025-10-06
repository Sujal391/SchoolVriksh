import { useState, useEffect } from "react";
import AdminLayout from "../../../components/layout/AdminLayout";
import AdminService from "../../../services/adminService";
import ClassManagementTable from "../../../components/admin/ClassManagement";
import ClassFormModal from "../../../components/admin/ClassFormModal";
import { Button, Alert, Snackbar } from "@mui/material";

const ClassesPage = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  // pagination state
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  // error and success handling
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await AdminService.getClasses();
        setClasses(response.data);
        const pages = Math.ceil(response.data.length / rowsPerPage);
        setTotalPages(pages);
      } catch (error) {
        console.error("Error fetching classes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, [rowsPerPage]);

  const handleFormSubmit = async (classData) => {
    try {
      // Clear previous messages
      setError(null);
      setSuccessMessage(null);
      setSnackbarOpen(false);

      let response;
      if (selectedClass) {
        response = await AdminService.updateClass(selectedClass._id, classData);
        setSuccessMessage(`✅ Class "${response.name} ${response.division}" updated successfully!`);
      } else {
        response = await AdminService.createClass(classData);
        setSuccessMessage(`✅ Class "${response.name} ${response.division}" created successfully!`);
      }

      // Refresh classes list
      const classesResponse = await AdminService.getClasses();
      setClasses(classesResponse.data);

      setIsModalOpen(false);
      setSelectedClass(null);
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error saving class:", error);

      // Clear success message and set error
      setSuccessMessage(null);

      // Handle specific API error responses
      if (error.response?.status === 404) {
        setError("❌ Class not found. Please refresh the page and try again.");
      } else if (error.response?.status === 400) {
        const errorMessage = error.response.data?.error || "Invalid class data provided.";
        if (errorMessage.includes("already exists")) {
          setError(`❌ ${errorMessage}`);
        } else {
          setError(`❌ ${errorMessage}`);
        }
      } else if (error.response?.status === 500) {
        setError("❌ Server error occurred. Please try again later.");
      } else {
        setError(`❌ Failed to ${selectedClass ? 'update' : 'create'} class: ${error.response?.data?.error || error.message}`);
      }

      setSnackbarOpen(true);
    }
  };

  
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setPage(1); // reset to first page
    const pages = Math.ceil(classes.length / newRowsPerPage) || 1;
    setTotalPages(pages);
  };
  
  // slice classes for pagination
  const paginatedClasses = classes.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Class Management</h1>

          <Button
            variant="contained"
            size="small"
            sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
            onClick={() => {
              setSelectedClass(null);
              setIsModalOpen(true);
            }}
          >
            Add New Class
          </Button>
        </div>

        <ClassManagementTable
          classes={paginatedClasses}
          loading={loading}
          page={page}
          rowsPerPage={rowsPerPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}      
          onEdit={(cls) => {
            setSelectedClass(cls);
            setIsModalOpen(true);
          }}
        />

        <ClassFormModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedClass(null);
            setError(null);
          }}
          classData={selectedClass}
          onSubmit={handleFormSubmit}
        />

        {/* Success/Error Snackbar */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => {
            setSnackbarOpen(false);
            setError(null);
            setSuccessMessage(null);
          }}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert
            onClose={() => {
              setSnackbarOpen(false);
              setError(null);
              setSuccessMessage(null);
            }}
            severity={error ? 'error' : 'success'}
            variant="filled"
          >
            {error || successMessage}
          </Alert>
        </Snackbar>
      </div>
    </AdminLayout>
  );
};

export default ClassesPage;
