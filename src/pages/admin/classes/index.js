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

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await AdminService.getClasses();
        setClasses(response.data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

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

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Class Management</h1>

        <div className="flex justify-between items-center mb-6">
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              setSelectedClass(null);
              setIsModalOpen(true);
            }}
          >
            Add New Class
          </Button>
        </div>

        <ClassManagementTable
          classes={classes}
          loading={loading}            
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
