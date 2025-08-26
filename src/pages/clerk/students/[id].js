// // src/pages/clerk/students/[id].js
// import { useRouter } from 'next/router';
// import { useAuth } from '../../../contexts/AuthContext';
// import withProtectedRoute from '../../../components/common/ProtectedRoute';
// import ClerkLayout from '../../../components/layout/ClerkLayout';
// import StudentDetail from '../../../components/clerk/students/StudentDetail';
// import  useClerk  from '../../../hooks/useClerk';
// import { useEffect, useState } from 'react';

// const StudentDetailPage = () => {
//   const router = useRouter();
//   const { id } = router.query;
//   const { students, loading, error } = useClerk();
//   const [student, setStudent] = useState(null);

//   useEffect(() => {
//     if (id && students.length > 0) {
//       const std = students.find(s => s.id === id);
//       setStudent(std || null);
//     }
//   }, [id, students]);

//   if (loading) return <div>Loading student details...</div>;
//   if (error) return <div>Error: {error}</div>;
//   if (!student) return <div>Student not found</div>;

//   return (
//     <ClerkLayout>
//       <StudentDetail student={student} />
//     </ClerkLayout>
//   );
// };

// export default withProtectedRoute(StudentDetailPage, ['clerk']);



// src/pages/clerk/students/[id].js
import { useRouter } from 'next/router';
import { useAuth } from '../../../contexts/AuthContext';
import withProtectedRoute from '../../../components/common/ProtectedRoute';
import ClerkLayout from '../../../components/layout/ClerkLayout';
import StudentDetail from '../../../components/clerk/students/StudentDetail';
import useClerk from '../../../hooks/useClerk';
import { useEffect, useState } from 'react';
import { CircularProgress, Alert, Box } from '@mui/material';

const StudentDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { students, loading, error } = useClerk();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    if (id && students.length > 0) {
      const std = students.find(s => s.id === id);
      setStudent(std || null);
    }
  }, [id, students]);

  if (loading) {
    return (
      <ClerkLayout>
        <Box display="flex" justifyContent="center" py={4}>
          <CircularProgress />
        </Box>
      </ClerkLayout>
    );
  }

  if (error) {
    return (
      <ClerkLayout>
        <Alert severity="error" sx={{ m: 2 }}>
          {error}
        </Alert>
      </ClerkLayout>
    );
  }

  if (!student) {
    return (
      <ClerkLayout>
        <Alert severity="warning" sx={{ m: 2 }}>
          Student not found. Please go back and try again.
        </Alert>
      </ClerkLayout>
    );
  }

  return (
    <ClerkLayout>
      <StudentDetail student={student} />
    </ClerkLayout>
  );
};

export default withProtectedRoute(StudentDetailPage, ['clerk']);