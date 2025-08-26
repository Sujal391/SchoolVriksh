import { useState, useEffect } from 'react';
import AdminLayout from '../../../components/layout/AdminLayout';
import AdminService from '../../../services/adminService';
import ClassManagementTable from '../../../components/admin/ClassManagement';
import ClassFormModal from '../../../components/admin/ClassFormModal';

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
        console.error('Error fetching classes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  const handleFormSubmit = async (classData) => {
    try {
      if (selectedClass) {
        // Update existing class
        await AdminService.updateClass(selectedClass._id, classData);
      } else {
        // Create new class
        await AdminService.createClass(classData);
      }
      // Refresh class list
      const response = await AdminService.getClasses();
      setClasses(response.data);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving class:', error);
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Class Management</h1>
        
        <div className="flex justify-between items-center mb-6">
          <div>
            <button onClick={() => {
              setSelectedClass(null);
              setIsModalOpen(true);
            }}>
              Add New Class
            </button>
          </div>
        </div>

        {loading ? (
          <p>Loading classes...</p>
        ) : (
          <ClassManagementTable 
            classes={classes} 
            onEdit={(cls) => {
              setSelectedClass(cls);
              setIsModalOpen(true);
            }} 
          />
        )}

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