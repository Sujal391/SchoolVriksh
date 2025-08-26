// // src/pages/clerk/leaves/request.js
// import { useAuth } from '../../../contexts/AuthContext';
// import withProtectedRoute from '../../../components/common/ProtectedRoute';
// import ClerkLayout from '../../../components/layout/ClerkLayout';
// import LeaveRequestForm from '../../../components/clerk/leaves/LeaveRequestForm';
// import  useClerk  from '../../../hooks/useClerk';
// import Link from 'next/link';
// import Button from '@mui/material/Button';
// import { useRouter } from 'next/router';

// const LeaveRequestPage = () => {
//   const { requestLeave } = useClerk();
//   const router = useRouter();

//   const handleSubmit = async (leaveData) => {
//     try {
//       await requestLeave(leaveData);
//       router.push('/clerk/leaves');
//     } catch (error) {
//       console.error('Leave request failed:', error);
//     }
//   };

//   return (
//     <ClerkLayout>
//       <div className="space-y-6">
//         <div className="flex justify-between items-center">
//           <h1 className="text-2xl font-bold">Request Leave</h1>
//           <Link href="/clerk/leaves" passHref>
//             <Button variant="outlined">Back to Leaves</Button>
//           </Link>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow">
//           <LeaveRequestForm onSubmit={handleSubmit} />
//         </div>
//       </div>
//     </ClerkLayout>
//   );
// };

// export default withProtectedRoute(LeaveRequestPage, ['clerk']);


// src/pages/clerk/leaves/request.js
import { useAuth } from '../../../contexts/AuthContext';
import withProtectedRoute from '../../../components/common/ProtectedRoute';
import ClerkLayout from '../../../components/layout/ClerkLayout';
import LeaveRequestForm from '../../../components/clerk/leaves/LeaveRequestForm';
import useClerk from '../../../hooks/useClerk';
import Link from 'next/link';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';

// MUI X LocalizationProvider for DatePicker
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const LeaveRequestPage = () => {
  const { requestLeave } = useClerk();
  const router = useRouter();

  const handleSubmit = async (leaveData) => {
    try {
      await requestLeave(leaveData);
      router.push('/clerk/leaves');
    } catch (error) {
      console.error('Leave request failed:', error);
    }
  };

  return (
    <ClerkLayout>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Request Leave</h1>
            <Link href="/clerk/leaves" passHref>
              <Button variant="outlined">Back to Leaves</Button>
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <LeaveRequestForm onSubmit={handleSubmit} />
          </div>
        </div>
      </LocalizationProvider>
    </ClerkLayout>
  );
};

export default withProtectedRoute(LeaveRequestPage, ['clerk']);
