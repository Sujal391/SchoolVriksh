import { useState, useEffect } from "react";
import AdminLayout from "../../../components/layout/AdminLayout";
import AdminService from "../../../services/adminService";
import ClassManagementTable from "../../../components/admin/ClassManagement";
import ClassFormModal from "../../../components/admin/ClassFormModal";
import { Button } from "@mui/material";

const ClassesPage = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  // pagination state
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

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
      if (selectedClass) {
        await AdminService.updateClass(selectedClass._id, classData);
      } else {
        await AdminService.createClass(classData);
      }

      const response = await AdminService.getClasses();
      setClasses(response.data);

      setIsModalOpen(false); // Closes modal after successful submission
    } catch (error) {
      console.error("Error saving class:", error);
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
          onClose={() => setIsModalOpen(false)}
          classData={selectedClass}
          onSubmit={handleFormSubmit}
        />
      </div>
    </AdminLayout>
  );
};

export default ClassesPage;
