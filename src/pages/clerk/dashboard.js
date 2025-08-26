// src/pages/clerk/dashboard.js


import withProtectedRoute from '../../components/common/ProtectedRoute';
import {useAuth} from '../../contexts/AuthContext';
import ClerkDashboardContent from '@/components/clerk/dashboard/ClerkDashboardContent';
import ClerkLayout from '@/components/layout/ClerkLayout';


const ClerkDashboardPage = () => {
  const { user } = useAuth();

  return (
    <ClerkLayout>
      <ClerkDashboardContent/>

      </ClerkLayout>
    
  );
};

// export default ProtectedRoute(ClerkDashboardPage, ['clerk']);
export default withProtectedRoute(ClerkDashboardPage, ['clerk']);