// // src/pages/clerk/leaves/index.js
// import { useAuth } from '../../../contexts/AuthContext';
// import withProtectedRoute from '../../../components/common/ProtectedRoute';
// import ClerkLayout from '../../../components/layout/ClerkLayout';
// import LeaveStatus from '../../../components/clerk/leaves/LeaveStatus';
// import useClerk  from '../../../hooks/useClerk';
// import Link from 'next/link';
// import Button from '@mui/material/Button';

// const LeavesPage = () => {
//   const { leaveStatus, loading, error } = useClerk();

//   return (
//     <ClerkLayout>
//       <div className="space-y-6">
//         <div className="flex justify-between items-center">
//           <h1 className="text-2xl font-bold">Leave Management</h1>
//           <Link href="/clerk/leaves/request" passHref>
//             <Button variant="contained" color="primary">
//               Request Leave
//             </Button>
//           </Link>
//         </div>

//         <div className="bg-white p-4 rounded-lg shadow">
//           <h3 className="font-semibold mb-3">Leave Summary</h3>
//           <div className="grid grid-cols-4 gap-4 mb-6">
//             <div className="bg-blue-50 p-3 rounded text-center">
//               <p className="text-sm text-gray-500">Total Leaves</p>
//               <p className="text-xl font-bold">{leaveStatus?.total || 0}</p>
//             </div>
//             <div className="bg-yellow-50 p-3 rounded text-center">
//               <p className="text-sm text-gray-500">Pending</p>
//               <p className="text-xl font-bold">{leaveStatus?.pending || 0}</p>
//             </div>
//             <div className="bg-green-50 p-3 rounded text-center">
//               <p className="text-sm text-gray-500">Approved</p>
//               <p className="text-xl font-bold">{leaveStatus?.approved || 0}</p>
//             </div>
//             <div className="bg-red-50 p-3 rounded text-center">
//               <p className="text-sm text-gray-500">Rejected</p>
//               <p className="text-xl font-bold">{leaveStatus?.rejected || 0}</p>
//             </div>
//           </div>

//           {loading ? (
//             <div>Loading leave requests...</div>
//           ) : error ? (
//             <div className="text-red-500">{error}</div>
//           ) : (
//             <LeaveStatus leaves={leaveStatus?.leaves || []} />
//           )}
//         </div>
//       </div>
//     </ClerkLayout>
//   );
// };

// export default withProtectedRoute(LeavesPage, ['clerk']);



// src/pages/clerk/leaves/index.js - With debugging
import { useAuth } from '../../../contexts/AuthContext';
import withProtectedRoute from '../../../components/common/ProtectedRoute';
import ClerkLayout from '../../../components/layout/ClerkLayout';
import LeaveStatus from '../../../components/clerk/leaves/LeaveStatus';
import useClerk from '../../../hooks/useClerk';
import Link from 'next/link';
import Button from '@mui/material/Button';
import { useEffect } from 'react';


const LeavesPage = () => {
  const { leaveStatus, leaveLoading, leaveError, refreshLeaveStatus } = useClerk(); // Use leave-specific states

  // Only fetch leave data when this page loads
  useEffect(() => {
    refreshLeaveStatus();
  }, []);

  return (
    <ClerkLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Leave Management</h1>
          <Link href="/clerk/leaves/request" passHref>
            <Button variant="contained" color="primary">
              Request Leave
            </Button>
          </Link>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-3">Leave Summary</h3>
          
          {/* Debug info */}
          {/* {process.env.NODE_ENV === 'development' && (
            <div className="mb-4 p-2 bg-gray-100 rounded text-xs">
              <p>Debug - LeaveLoading: {leaveLoading ? 'true' : 'false'}</p>
              <p>Debug - LeaveError: {leaveError || 'none'}</p>
              <p>Debug - LeaveStatus: {leaveStatus ? 'loaded' : 'null'}</p>
              <p>Debug - Total: {leaveStatus?.total}</p>
              <p>Debug - Leaves Array Length: {leaveStatus?.leaves?.length || 0}</p>
            </div>
          )} */}

          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-3 rounded text-center">
              <p className="text-sm text-gray-500">Total Leaves</p>
              <p className="text-xl font-bold">{leaveStatus?.total || 0}</p>
            </div>
            <div className="bg-yellow-50 p-3 rounded text-center">
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-xl font-bold">{leaveStatus?.pending || 0}</p>
            </div>
            <div className="bg-green-50 p-3 rounded text-center">
              <p className="text-sm text-gray-500">Approved</p>
              <p className="text-xl font-bold">{leaveStatus?.approved || 0}</p>
            </div>
            <div className="bg-red-50 p-3 rounded text-center">
              <p className="text-sm text-gray-500">Rejected</p>
              <p className="text-xl font-bold">{leaveStatus?.rejected || 0}</p>
            </div>
          </div>

          {leaveLoading ? (
            <div className="flex justify-center p-4">
              <div className="text-blue-600">Loading leave requests...</div>
            </div>
          ) : leaveError ? (
            <div className="text-red-500 p-4 bg-red-50 rounded">
              Error: {leaveError}
            </div>
          ) : leaveStatus ? (
            <LeaveStatus leaves={leaveStatus.leaves || []} />
          ) : (
            <div className="text-gray-500 p-4">No leave data available</div>
          )}
        </div>
      </div>
    </ClerkLayout>
  );
};

export default withProtectedRoute(LeavesPage, ['clerk']);