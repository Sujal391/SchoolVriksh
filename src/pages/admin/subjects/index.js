import { useState, useEffect } from 'react';
import AdminLayout from '../../../components/layout/AdminLayout';
import AdminService from '../../../services/adminService';
import SubjectTable from '../../../components/admin/SubjectManagement';
import SubjectFormModal from '../../../components/admin/SubjectFormModal';

const SubjectsPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subjectsRes, classesRes] = await Promise.all([
          AdminService.getAllSubjects(),
          AdminService.getClasses()
        ]);
        setSubjects(subjectsRes.data);
        setClasses(classesRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFormSubmit = async (subjectData) => {
    try {
      if (selectedSubject) {
        // Update existing subject
        await AdminService.updateSubject(selectedSubject._id, subjectData);
      } else {
        // Create new subject
        await AdminService.createSubject(subjectData);
      }
      // Refresh subject list
      const response = await AdminService.getAllSubjects();
      setSubjects(response.data);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving subject:', error);
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Subject Management</h1>
        
        <div className="flex justify-between items-center mb-6">
          <div>
            <button onClick={() => {
              setSelectedSubject(null);
              setIsModalOpen(true);
            }}>
              Add New Subject
            </button>
          </div>
        </div>

        {loading ? (
          <p>Loading subjects...</p>
        ) : (
          <SubjectTable 
            subjects={subjects} 
            onEdit={(subject) => {
              setSelectedSubject(subject);
              setIsModalOpen(true);
            }} 
          />
        )}

        <SubjectFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          subjectData={selectedSubject}
          classes={classes}
          onSubmit={handleFormSubmit}
        />
      </div>
    </AdminLayout>
  );
};

export default SubjectsPage;