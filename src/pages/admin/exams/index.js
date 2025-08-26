import { useState, useEffect } from 'react';
import AdminLayout from '../../../components/layout/AdminLayout';
import AdminService from '../../../services/adminService';
import ExamEventTable from '../../../components/admin/ExamEventManagement';
import ExamEventFormModal from '../../../components/admin/ExamEventFormModal';
import { toast } from 'react-toastify';

const ExamsPage = () => {
  const [examEvents, setExamEvents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [examRes, classesRes] = await Promise.all([
          AdminService.getExamSchedules(),
          AdminService.getClasses()
        ]);
        setExamEvents(examRes.data.examEvent || []);
        setClasses(classesRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load exam data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFormSubmit = async (formData) => {
    try {
      const response = await AdminService.createExamSchedule(formData);
      toast.success('Exam schedule created successfully');
      
      // Refresh exam list
      const examRes = await AdminService.getExamSchedules();
      setExamEvents(examRes.data.examEvent || []);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving exam:', error);
      toast.error(error.response?.data?.message || 'Failed to create exam schedule');
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Exam Management</h1>
        
        <div className="flex justify-between items-center mb-6">
          <button 
            onClick={() => {
              setSelectedExam(null);
              setIsModalOpen(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Create New Exam Schedule
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <ExamEventTable 
            examEvents={examEvents} 
            onEdit={(exam) => {
              setSelectedExam(exam);
              setIsModalOpen(true);
            }}
          />
        )}

        <ExamEventFormModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedExam(null);
          }}
          examData={selectedExam}
          classes={classes}
          onSubmit={handleFormSubmit}
        />
      </div>
    </AdminLayout>
  );
};

export default ExamsPage;