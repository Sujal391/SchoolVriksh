// // src/components/common/ProtectedRoute.js
// import { useRouter } from 'next/router';
// import { useEffect } from 'react';
// import { useAuth } from '../../contexts/AuthContext';
// import LoadingSpinner from './LoadingSpinner';

// const ProtectedRoute = ({ children, allowedRoles }) => {
//   const { user, loading, isAuthenticated } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!loading && !isAuthenticated) {
//       router.push('/login');
//     } else if (!loading && isAuthenticated && allowedRoles && !allowedRoles.includes(user?.role)) {
//       router.push('/unauthorized');
//     }
//   }, [loading, isAuthenticated, user, router, allowedRoles]);

//   if (loading || !isAuthenticated || (allowedRoles && !allowedRoles.includes(user?.role))) {
//     return <LoadingSpinner fullPage />;
//   }

//   return children;
// };

// export default ProtectedRoute;


// src/components/common/ProtectedRoute.js
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from './LoadingSpinner';

const withProtectedRoute = (WrappedComponent, allowedRoles = []) => {
  return function ProtectedComponent(props) {
    const { user, loading, isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !isAuthenticated) {
        router.push('/login');
      } else if (
        !loading &&
        isAuthenticated &&
        allowedRoles.length > 0 &&
        !allowedRoles.includes(user?.role)
      ) {
        router.push('/unauthorized');
      }
    }, [loading, isAuthenticated, user, router, allowedRoles]);

    if (
      loading ||
      !isAuthenticated ||
      (allowedRoles.length > 0 && !allowedRoles.includes(user?.role))
    ) {
      return <LoadingSpinner fullPage />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withProtectedRoute;
