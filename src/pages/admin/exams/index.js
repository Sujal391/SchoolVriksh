import { useState, useEffect } from 'react';
import AdminLayout from '../../../components/layout/AdminLayout';
import AdminService from '../../../services/adminService';
import ExamEventTable from '../../../components/admin/ExamEventManagement';
import ExamEventFormModal from '../../../components/admin/ExamEventFormModal';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';

const ExamsPage = () => {
  const [examSchedule, setExamSchedule] = useState({});
  const [availableAcademicYears, setAvailableAcademicYears] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (academicYear = null) => {
  setLoading(true);
  try {
    console.log('Fetching exams with academic year:', academicYear);
    
    const params = academicYear ? { academicYear } : {};
    const [examRes, classesRes] = await Promise.all([
      AdminService.getExamSchedules(params),
      AdminService.getClasses()
    ]);
    
    console.log('API Response:', examRes);
    console.log('Schedule data:', examRes.data.schedule);
    
    // Set the schedule object (not examEvent array)
    setExamSchedule(examRes.data.schedule || {});
    setClasses(classesRes.data);

    // Extract academic years from the schedule on first load
    if (!academicYear) {
      const years = extractAcademicYears(examRes.data.schedule);
      console.log('Extracted academic years:', years);
      setAvailableAcademicYears(years);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    toast.error('Failed to load exam data');
  } finally {
    setLoading(false);
  }
};

  // Extract unique academic years from schedule
  const extractAcademicYears = (schedule) => {
    if (!schedule || typeof schedule !== 'object') return [];
    
    const years = new Set();
    Object.keys(schedule).forEach(dateKey => {
      if (Array.isArray(schedule[dateKey])) {
        schedule[dateKey].forEach(exam => {
          const year = exam.academicYear || exam.examEvent?.academicYear;
          if (year) years.add(year);
        });
      }
    });
    
    return Array.from(years).sort((a, b) => b.localeCompare(a));
  };

  const handleAcademicYearChange = (academicYear) => {
    fetchData(academicYear);
  };

  const handleFormSubmit = async (formData) => {
    try {
      const response = await AdminService.createExamSchedule(formData);
      toast.success('Exam schedule created successfully');
      
      // Refresh exam list
      fetchData();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving exam:', error);
      toast.error(error.response?.data?.message || 'Failed to create exam schedule');
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Exam Management</h1>        
          <Button
            variant="contained"
            size="small"
            sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
            onClick={() => {
              setSelectedExam(null);
              setIsModalOpen(true);
            }}
          >
            Create New Exam Schedule
          </Button>
        </div>

        <ExamEventTable 
          examEvents={examSchedule}
          availableAcademicYears={availableAcademicYears}
          loading={loading}
          onAcademicYearChange={handleAcademicYearChange}
          onEdit={(exam) => {
            setSelectedExam(exam);
            setIsModalOpen(true);
          }}
        />

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