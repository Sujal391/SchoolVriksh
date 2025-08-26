// src/pages/clerk/students/upgrade.js
import { useRouter } from 'next/router';
import { useAuth } from '../../../contexts/AuthContext';
import withProtectedRoute from '../../../components/common/ProtectedRoute';
import ClerkLayout from '../../../components/layout/ClerkLayout';
import ClassUpgradeForm from '../../../components/clerk/students/ClassUpgradeForm';
import  useClerk  from '../../../hooks/useClerk';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Button from '@mui/material/Button';

const StudentUpgradePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { classes, students, upgradeStudentClass, loading, error } = useClerk();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    if (id && students.length > 0) {
      const std = students.find(s => s.id === id);
      setStudent(std || null);
    }
  }, [id, students]);

  const handleUpgrade = async (studentId, newClassId) => {
    try {
      await upgradeStudentClass(studentId, newClassId);
      router.push(`/clerk/students/${studentId}`);
    } catch (err) {
      console.error('Class upgrade failed:', err);
    }
  };

  if (loading) return <div>Loading student data...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!student) return <div>Student not found</div>;

  return (
    <ClerkLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Upgrade Student Class</h1>
          <Link href={`/clerk/students/${student.id}`} passHref>
            <Button variant="outlined">Back to Student</Button>
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <ClassUpgradeForm 
            student={student} 
            classes={classes} 
            onSubmit={handleUpgrade} 
          />
        </div>
      </div>
    </ClerkLayout>
  );
};

export default withProtectedRoute(StudentUpgradePage, ['clerk']);


