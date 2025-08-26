// // src/pages/dashboard.js
// import { useAuth } from '../contexts/AuthContext';
// import ProtectedRoute from '../components/common/ProtectedRoute';
// import ClerkDashboardContent from '@/components/clerk/dashboard/ClerkDashboardContent';





// const Dashboard = () => {
//   const { user } = useAuth();

//   const getDashboardContent = () => {
//     switch (user?.role) {
//       case 'owner':
//         return <OwnerDashboardContent />;
//       case 'admin':
//         return <AdminDashboardContent />;
//       case 'teacher':
//         return <TeacherDashboardContent />;
//      case 'clerk':
//         return <ClerkDashboardContent />;
//       default:
//         return <DefaultDashboardContent />;
//     }
//   };

//   return (
//     <ProtectedRoute>
//       <div className="p-6">
//         <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
//         {getDashboardContent()}
//       </div>
//     </ProtectedRoute>
//   );
// };

// const OwnerDashboardContent = () => (
//   <div>
//     <h2 className="text-xl font-semibold mb-4">Owner Dashboard</h2>
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//       {/* Owner-specific widgets */}
//     </div>
//   </div>
// );

// const AdminDashboardContent = () => (
//   <div>
//     <h2 className="text-xl font-semibold mb-4">Admin Dashboard</h2>
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//       {/* Admin-specific widgets */}
//     </div>
//   </div>
// );





// const TeacherDashboardContent = () => (
//   <div>
//     <h2 className="text-xl font-semibold mb-4">Teacher Dashboard</h2>
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//       {/* Teacher-specific widgets */}
//     </div>
//   </div>
// );

// const StudentDashboardContent = () => (
//   <div>
//     <h2 className="text-xl font-semibold mb-4">Student Dashboard</h2>
//     <div className="grid grid-cols-1 gap-6">
//       {/* Student-specific widgets */}
//     </div>
//   </div>
// );

// const ParentDashboardContent = () => (
//   <div>
//     <h2 className="text-xl font-semibold mb-4">Parent Dashboard</h2>
//     <div className="grid grid-cols-1 gap-6">
//       {/* Parent-specific widgets */}
//     </div>
//   </div>
// );

// const DefaultDashboardContent = () => (
//   <div>
//     <h2 className="text-xl font-semibold mb-4">Welcome</h2>
//     <p>Please select an option from the menu.</p>
//   </div>
// );

// export default Dashboard;



import { useAuth } from '../contexts/AuthContext';
import ProtectedRoute from '../components/common/ProtectedRoute';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Dashboard = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user?.role) {
      switch (user.role) {
        case 'clerk':
          router.push('clerk/dashboard');
          break;
        case 'owner':
          router.push('/owner/dashboard');
          break;
        case 'admin':
          router.push('/admin/dashboard');
          break;
        case 'fee_manager':
          router.push('/feesManager/dashboard');
          break;
        case 'librarian':
          router.push('/library');
          break;
        default:
          router.push('/dashboard'); // Default fallback
      }
    }
  }, [user?.role, router]);

  // Show loading or default content while redirecting
  return (
    <ProtectedRoute>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <p>Redirecting to your dashboard...</p>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;