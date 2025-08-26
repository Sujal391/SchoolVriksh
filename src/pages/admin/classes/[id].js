import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import AdminLayout from '../../../components/layout/AdminLayout';
import AdminService from '../../../services/adminService';
import StudentTable from '../../../components/admin/StudentManagement';
import ClassDetailsCard from '../../../components/admin/ClassDetailsCard';

const ClassDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [classData, setClassData] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const [classRes, studentsRes] = await Promise.all([
          AdminService.getClass(id),
          AdminService.getStudentsByClass(id)
        ]);
        setClassData(classRes.data);
        setStudents(studentsRes.data.students);
      } catch (error) {
        console.error('Error fetching class details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <AdminLayout>
        <div className="container mx-auto px-4 py-8">
          <p>Loading class details...</p>
        </div>
      </AdminLayout>
    );
  }

  if (!classData) {
    return (
      <AdminLayout>
        <div className="container mx-auto px-4 py-8">
          <p>Class not found</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            {classData.name} - {classData.division}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <ClassDetailsCard 
            title="Class Information"
            items={[
              { label: 'Academic Year', value: classData.academicYear },
              { label: 'Capacity', value: `${students.length}/${classData.capacity}` },
              { label: 'RTE Seats', value: `${classData.rteSeats?.occupied || 0}/${classData.rteSeats?.total || 0}` },
              { label: 'Class Teacher', value: classData.classTeacher?.name || 'Not Assigned' }
            ]}
          />

          <ClassDetailsCard 
            title="Subjects"
            items={classData.subjects?.map(subject => ({
              label: subject.name,
              value: subject.teachers?.map(t => t.name).join(', ') || 'Not Assigned'
            })) || []}
          />

          <ClassDetailsCard 
            title="Schedule"
            items={[
              { label: 'Start Time', value: classData.schedule?.startTime || '09:00' },
              { label: 'End Time', value: classData.schedule?.endTime || '15:00' },
              { label: 'Periods/Day', value: classData.schedule?.periodsPerDay || 8 },
              { label: 'Period Duration', value: `${classData.schedule?.periodDuration || 45} mins` }
            ]}
          />
        </div>

        <h2 className="text-xl font-semibold mb-4">Students</h2>
        <StudentTable students={students} />
      </div>
    </AdminLayout>
  );
};

export default ClassDetailsPage;