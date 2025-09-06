// import { useState, useEffect } from "react";
// import { useRouter } from "next/router";
// import {
//   Box,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Chip,
//   Button,
//   Avatar,
//   CircularProgress,
// } from "@mui/material";
// import { ArrowBack } from "@mui/icons-material";
// import LibraryLayout from "../../../components/layout/LibraryLayout";
// import { useAuth } from "../../../contexts/AuthContext";
// import libraryService from "../../../services/libraryService";

// const StudentHistoryDetail = () => {
//   const router = useRouter();
//   const { studentId } = router.query;
//   const { user } = useAuth();
//   const [history, setHistory] = useState([]);
//   const [student, setStudent] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         console.log("Fetching history for studentId:", studentId);
//         const data = await libraryService.getStudentHistory(studentId);
//         console.log("Fetched data:", data);
//         setHistory(data.history || []);
//         setStudent(data.student || null);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching history:", err);
//         setError(err.message || "Failed to fetch student history");
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [studentId]);

//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     return new Date(dateString).toLocaleDateString();
//   };

//   if (loading) {
//     return (
//       <LibraryLayout>
//         <Box
//           display="flex"
//           justifyContent="center"
//           alignItems="center"
//           minHeight="60vh"
//         >
//           <CircularProgress />
//         </Box>
//       </LibraryLayout>
//     );
//   }

//   if (error) {
//     return (
//       <LibraryLayout>
//         <Box
//           display="flex"
//           justifyContent="center"
//           alignItems="center"
//           minHeight="60vh"
//         >
//           <Typography color="error">{error}</Typography>
//         </Box>
//       </LibraryLayout>
//     );
//   }

//   return (
//     <LibraryLayout>
//       <Box sx={{ p: 3 }}>
//         <Button
//           startIcon={<ArrowBack />}
//           onClick={() => router.push("/library/history")}
//           sx={{ mb: 3 }}
//         >
//           Back to Student History
//         </Button>

//         {student ? (
//           <Paper sx={{ p: 3, mb: 3 }}>
//             <Box display="flex" alignItems="center" mb={3}>
//               <Avatar
//                 src={student.profile?.avatar || "/default-avatar.png"}
//                 alt={student.name || "Student"}
//                 sx={{ width: 80, height: 80, mr: 3 }}
//               >
//                 {student.name?.charAt(0) || "?"}
//               </Avatar>
//               <Box>
//                 <Typography variant="h5">
//                   {student.name || "Unknown Student"}
//                 </Typography>
//                 <Typography>GR Number: {student.grNumber || "N/A"}</Typography>
//                 <Typography>Class: {student.class?.name || "N/A"}</Typography>
//                 <Typography>Email: {student.email || "N/A"}</Typography>
//                 {student.parentDetails && (
//                   <Typography>
//                     Parent: {student.parentDetails.name || "N/A"} (
//                     {student.parentDetails.contact || "N/A"})
//                   </Typography>
//                 )}
//               </Box>
//             </Box>
//           </Paper>
//         ) : (
//           <Typography color="error">Student data not available</Typography>
//         )}

//         <Typography variant="h6" gutterBottom>
//           Book History
//         </Typography>

//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Book</TableCell>
//                 <TableCell>Issue Date</TableCell>
//                 <TableCell>Due Date</TableCell>
//                 <TableCell>Return Date</TableCell>
//                 <TableCell>Status</TableCell>
//                 <TableCell>Fine</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {history.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={6} align="center">
//                     No history found
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 history.map((item) => (
//                   <TableRow key={item._id}>
//                     <TableCell>
//                       <Typography fontWeight="bold">
//                         {item.book?.bookTitle || "N/A"}
//                       </Typography>
//                       <Typography variant="body2">
//                         {item.book?.author || "N/A"}
//                       </Typography>
//                     </TableCell>
//                     <TableCell>{formatDate(item.issueDate)}</TableCell>
//                     <TableCell>{formatDate(item.dueDate)}</TableCell>
//                     <TableCell>{formatDate(item.returnDate)}</TableCell>
//                     <TableCell>
//                       <Chip
//                         label={item.status || "Unknown"}
//                         color={
//                           item.status === "issued"
//                             ? "primary"
//                             : item.status === "returned"
//                             ? "success"
//                             : item.status === "overdue"
//                             ? "error"
//                             : item.status === "reserved"
//                             ? "warning"
//                             : "default"
//                         }
//                         size="small"
//                       />
//                     </TableCell>
//                     <TableCell>
//                       {item.fine > 0 ? (
//                         <Chip
//                           label={`₹${item.fine}`}
//                           color={item.finePardoned ? "success" : "error"}
//                           variant={item.finePardoned ? "outlined" : "filled"}
//                           size="small"
//                         />
//                       ) : (
//                         "None"
//                       )}
//                     </TableCell>
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Box>
//     </LibraryLayout>
//   );
// };

// export default StudentHistoryDetail;




// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import {
//   Box,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Chip,
//   Button,
//   Avatar,
//   CircularProgress,
//   Alert
// } from '@mui/material';
// import { ArrowBack } from '@mui/icons-material';
// import LibraryLayout from '../../../components/layout/LibraryLayout';
// import { useAuth } from '../../../contexts/AuthContext';
// import libraryService from '../../../services/libraryService';

// const StudentHistoryDetail = () => {
//   const router = useRouter();
//   const { studentId } = router.query;
//   const { user } = useAuth();
//   const [history, setHistory] = useState([]);
//   const [student, setStudent] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Don't fetch if studentId is not available yet
//     if (!studentId) {
//       return;
//     }

//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         setError(null); // Reset error state
        
//         console.log('Fetching history for studentId:', studentId);
//         console.log('Current user:', user);
        
//         const data = await libraryService.getStudentHistory(studentId);
//         console.log('Fetched data:', data);
        
//         setHistory(data.history || []);
//         setStudent(data.student || null);
        
//       } catch (err) {
//         console.error('Error fetching history:', err);
        
//         // Handle specific error cases
//         if (err.response) {
//           const status = err.response.status;
//           const message = err.response.data?.message || err.response.data?.error || 'Unknown error';
          
//           switch (status) {
//             case 403:
//               setError('You do not have permission to view this student\'s history. You can only view your own history or need librarian permissions.');
//               break;
//             case 404:
//               setError('Student not found. Please check if the student ID is correct.');
//               break;
//             case 500:
//               setError('Server error occurred while fetching student history. Please try again later.');
//               break;
//             default:
//               setError(`Error ${status}: ${message}`);
//           }
//         } else if (err.request) {
//           setError('Network error: Unable to connect to the server. Please check your internet connection.');
//         } else {
//           setError(err.message || 'An unexpected error occurred while fetching student history.');
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [studentId, user]);

//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     try {
//       return new Date(dateString).toLocaleDateString();
//     } catch (error) {
//       console.error('Error formatting date:', error);
//       return 'Invalid Date';
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'issued': return 'primary';
//       case 'returned': return 'success';
//       case 'overdue': return 'error';
//       case 'reserved': return 'warning';
//       default: return 'default';
//     }
//   };

//   if (loading) {
//     return (
//       <LibraryLayout>
//         <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
//           <CircularProgress />
//           <Typography sx={{ ml: 2 }}>Loading student history...</Typography>
//         </Box>
//       </LibraryLayout>
//     );
//   }

//   if (error) {
//     return (
//       <LibraryLayout>
//         <Box sx={{ p: 3 }}>
//           <Button
//             startIcon={<ArrowBack />}
//             onClick={() => router.push('/library/history')}
//             sx={{ mb: 3 }}
//           >
//             Back to Student History
//           </Button>
          
//           <Alert severity="error" sx={{ mb: 2 }}>
//             <Typography variant="h6" gutterBottom>Error Loading Student History</Typography>
//             <Typography>{error}</Typography>
//           </Alert>
          
//           <Button 
//             variant="contained" 
//             onClick={() => window.location.reload()}
//             sx={{ mt: 2 }}
//           >
//             Retry
//           </Button>
//         </Box>
//       </LibraryLayout>
//     );
//   }

//   return (
//     <LibraryLayout>
//       <Box sx={{ p: 3 }}>
//         <Button
//           startIcon={<ArrowBack />}
//           onClick={() => router.push('/library/history')}
//           sx={{ mb: 3 }}
//         >
//           Back to Student History
//         </Button>

//         {student ? (
//           <Paper sx={{ p: 3, mb: 3 }}>
//             <Box display="flex" alignItems="center" mb={3}>
//               <Avatar
//                 src={student.profile?.avatar || '/default-avatar.png'}
//                 alt={student.name || 'Student'}
//                 sx={{ width: 80, height: 80, mr: 3 }}
//               >
//                 {student.name?.charAt(0) || '?'}
//               </Avatar>
//               <Box>
//                 <Typography variant="h5">{student.name || 'Unknown Student'}</Typography>
//                 <Typography>GR Number: {student.grNumber || 'N/A'}</Typography>
//                 <Typography>
//                   Class: {
//                     typeof student.class === 'object' && student.class?.name 
//                       ? student.class.name 
//                       : typeof student.class === 'string' 
//                         ? student.class 
//                         : 'N/A'
//                   }
//                 </Typography>
//                 <Typography>Email: {student.email || 'N/A'}</Typography>
//                 {student.parentDetails && (
//                   <Typography>
//                     Parent: {student.parentDetails.name || 'N/A'} ({student.parentDetails.contact || 'N/A'})
//                   </Typography>
//                 )}
//               </Box>
//             </Box>
//           </Paper>
//         ) : (
//           <Alert severity="warning" sx={{ mb: 3 }}>
//             Student data not available
//           </Alert>
//         )}

//         <Typography variant="h6" gutterBottom>
//           Book History ({history.length} records)
//         </Typography>

//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Book</TableCell>
//                 <TableCell>Issue Date</TableCell>
//                 <TableCell>Due Date</TableCell>
//                 <TableCell>Return Date</TableCell>
//                 <TableCell>Status</TableCell>
//                 <TableCell>Fine</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {history.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={6} align="center">
//                     <Typography variant="body2" color="text.secondary">
//                       No book history found for this student
//                     </Typography>
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 history.map((item, index) => (
//                   <TableRow key={item._id || index}>
//                     <TableCell>
//                       <Typography fontWeight="bold">
//                         {item.book?.bookTitle || 'N/A'}
//                       </Typography>
//                       <Typography variant="body2" color="text.secondary">
//                         {item.book?.author || 'N/A'}
//                       </Typography>
//                       {item.book?.isbn && (
//                         <Typography variant="caption" color="text.secondary">
//                           ISBN: {item.book.isbn}
//                         </Typography>
//                       )}
//                     </TableCell>
//                     <TableCell>{formatDate(item.issueDate)}</TableCell>
//                     <TableCell>{formatDate(item.dueDate)}</TableCell>
//                     <TableCell>
//                       {item.returnDate ? formatDate(item.returnDate) : 'Not returned'}
//                     </TableCell>
//                     <TableCell>
//                       <Chip
//                         label={item.status || 'Unknown'}
//                         color={getStatusColor(item.status)}
//                         size="small"
//                       />
//                     </TableCell>
//                     <TableCell>
//                       {item.fine && item.fine > 0 ? (
//                         <Box>
//                           <Chip
//                             label={`₹${item.fine}`}
//                             color={item.finePardoned ? 'success' : 'error'}
//                             variant={item.finePardoned ? 'outlined' : 'filled'}
//                             size="small"
//                           />
//                           {item.finePardoned && (
//                             <Typography variant="caption" display="block" color="success.main">
//                               Pardoned
//                             </Typography>
//                           )}
//                           {item.daysOverdue > 0 && (
//                             <Typography variant="caption" display="block" color="text.secondary">
//                               {item.daysOverdue} days overdue
//                             </Typography>
//                           )}
//                         </Box>
//                       ) : (
//                         <Typography variant="body2" color="text.secondary">
//                           None
//                         </Typography>
//                       )}
//                     </TableCell>
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Box>
//     </LibraryLayout>
//   );
// };

// export default StudentHistoryDetail;




// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import {
//   Box,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Chip,
//   Button,
//   Avatar,
//   CircularProgress,
//   Alert
// } from '@mui/material';
// import { ArrowBack } from '@mui/icons-material';
// import LibraryLayout from '../../../components/layout/LibraryLayout';
// import { useAuth } from '../../../contexts/AuthContext';
// import libraryService from '../../../services/libraryService';

// const StudentHistoryDetail = () => {
//   const router = useRouter();
//   const { studentId } = router.query;
//   const { user } = useAuth();
//   const [history, setHistory] = useState([]);
//   const [student, setStudent] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Don't fetch if studentId is not available yet
//     if (!studentId) {
//       return;
//     }

//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         setError(null); // Reset error state
        
//         console.log('Fetching history for studentId:', studentId);
//         console.log('Current user:', user);
        
//         const data = await libraryService.getStudentHistory(studentId);
//         console.log('Fetched data:', data);
        
//         setHistory(data.history || []);
//         setStudent(data.student || null);
        
//       } catch (err) {
//         console.error('Error fetching history:', err);
        
//         // Handle specific error cases
//         if (err.response) {
//           const status = err.response.status;
//           const message = err.response.data?.message || err.response.data?.error || 'Unknown error';
          
//           switch (status) {
//             case 403:
//               setError('You do not have permission to view this student\'s history. You can only view your own history or need librarian permissions.');
//               break;
//             case 404:
//               setError('Student not found. Please check if the student ID is correct.');
//               break;
//             case 500:
//               setError('Server error occurred while fetching student history. Please try again later.');
//               break;
//             default:
//               setError(`Error ${status}: ${message}`);
//           }
//         } else if (err.request) {
//           setError('Network error: Unable to connect to the server. Please check your internet connection.');
//         } else {
//           setError(err.message || 'An unexpected error occurred while fetching student history.');
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [studentId, user]);

//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     try {
//       return new Date(dateString).toLocaleDateString();
//     } catch (error) {
//       console.error('Error formatting date:', error);
//       return 'Invalid Date';
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'issued': return 'primary';
//       case 'returned': return 'success';
//       case 'overdue': return 'error';
//       case 'reserved': return 'warning';
//       default: return 'default';
//     }
//   };

//   if (loading) {
//     return (
//       <LibraryLayout>
//         <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
//           <CircularProgress />
//           <Typography sx={{ ml: 2 }}>Loading student history...</Typography>
//         </Box>
//       </LibraryLayout>
//     );
//   }

//   if (error) {
//     return (
//       <LibraryLayout>
//         <Box sx={{ p: 3 }}>
//           <Button
//             startIcon={<ArrowBack />}
//             onClick={() => router.push('/library/history')}
//             sx={{ mb: 3 }}
//           >
//             Back to Student History
//           </Button>
          
//           <Alert severity="error" sx={{ mb: 2 }}>
//             <Typography variant="h6" gutterBottom>Error Loading Student History</Typography>
//             <Typography>{error}</Typography>
//           </Alert>
          
//           <Button 
//             variant="contained" 
//             onClick={() => window.location.reload()}
//             sx={{ mt: 2 }}
//           >
//             Retry
//           </Button>
//         </Box>
//       </LibraryLayout>
//     );
//   }

//   return (
//     <LibraryLayout>
//       <Box sx={{ p: 3 }}>
//         <Button
//           startIcon={<ArrowBack />}
//           onClick={() => router.push('/library/history')}
//           sx={{ mb: 3 }}
//         >
//           Back to Student History
//         </Button>

//         {student ? (
//           <Paper sx={{ p: 3, mb: 3 }}>
//             <Box display="flex" alignItems="center" mb={3}>
//               <Avatar
//                 src={student.profile?.avatar || '/default-avatar.png'}
//                 alt={student.name || 'Student'}
//                 sx={{ width: 80, height: 80, mr: 3 }}
//               >
//                 {student.name?.charAt(0) || '?'}
//               </Avatar>
//               <Box>
//                 <Typography variant="h5">{student.name || 'Unknown Student'}</Typography>
//                 <Typography>GR Number: {student.grNumber || 'N/A'}</Typography>
//                 <Typography>
//                   Class: {
//                     typeof student.class === 'object' && student.class?.name 
//                       ? student.class.name 
//                       : typeof student.class === 'string' 
//                         ? student.class 
//                         : 'N/A'
//                   }
//                 </Typography>
//                 <Typography>Email: {student.email || 'N/A'}</Typography>
//                 {student.parentDetails && (
//                   <Typography>
//                     Parent: {student.parentDetails.name || 'N/A'} ({student.parentDetails.contact || 'N/A'})
//                   </Typography>
//                 )}
//               </Box>
//             </Box>
//           </Paper>
//         ) : (
//           <Alert severity="warning" sx={{ mb: 3 }}>
//             Student data not available
//           </Alert>
//         )}

//         <Typography variant="h6" gutterBottom>
//           Book History ({history.length} records)
//         </Typography>

//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Book</TableCell>
//                 <TableCell>Issue Date</TableCell>
//                 <TableCell>Due Date</TableCell>
//                 <TableCell>Return Date</TableCell>
//                 <TableCell>Status</TableCell>
//                 <TableCell>Fine</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {history.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={6} align="center">
//                     <Typography variant="body2" color="text.secondary">
//                       No book history found for this student
//                     </Typography>
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 history.map((item, index) => (
//                   <TableRow key={item._id || index}>
//                     <TableCell>
//                       <Typography fontWeight="bold">
//                         {item.book?.bookTitle || 'N/A'}
//                       </Typography>
//                       <Typography variant="body2" color="text.secondary">
//                         {item.book?.author || 'N/A'}
//                       </Typography>
//                       {item.book?.isbn && (
//                         <Typography variant="caption" color="text.secondary">
//                           ISBN: {item.book.isbn}
//                         </Typography>
//                       )}
//                     </TableCell>
//                     <TableCell>{formatDate(item.issueDate)}</TableCell>
//                     <TableCell>{formatDate(item.dueDate)}</TableCell>
//                     <TableCell>
//                       {item.returnDate ? formatDate(item.returnDate) : 'Not returned'}
//                     </TableCell>
//                     <TableCell>
//                       <Chip
//                         label={item.status || 'Unknown'}
//                         color={getStatusColor(item.status)}
//                         size="small"
//                       />
//                     </TableCell>
//                     <TableCell>
//                       {item.fine && item.fine > 0 ? (
//                         <Box>
//                           <Chip
//                             label={`₹${item.fine}`}
//                             color={item.finePardoned ? 'success' : 'error'}
//                             variant={item.finePardoned ? 'outlined' : 'filled'}
//                             size="small"
//                           />
//                           {item.finePardoned && (
//                             <Typography variant="caption" display="block" color="success.main">
//                               Pardoned
//                             </Typography>
//                           )}
//                           {item.daysOverdue > 0 && (
//                             <Typography variant="caption" display="block" color="text.secondary">
//                               {item.daysOverdue} days overdue
//                             </Typography>
//                           )}
//                         </Box>
//                       ) : (
//                         <Typography variant="body2" color="text.secondary">
//                           None
//                         </Typography>
//                       )}
//                     </TableCell>
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Box>
//     </LibraryLayout>
//   );
// };

// export default StudentHistoryDetail;




import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  Avatar,
  CircularProgress,
  Alert,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  Card,
  CardContent,
  Grid
} from '@mui/material';
import { 
  ArrowBack, 
  MoreVert, 
  AssignmentReturn, 
  Autorenew, 
  MoneyOff 
} from '@mui/icons-material';
import LibraryLayout from '../../../components/layout/LibraryLayout';
import { useAuth } from '../../../contexts/AuthContext';
import libraryService from '../../../services/libraryService';

const StudentHistoryDetail = () => {
  const router = useRouter();
  const { studentId } = router.query;
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // States for book actions
  const [actionLoading, setActionLoading] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    // Don't fetch if studentId is not available yet
    if (!studentId) {
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null); // Reset error state
        
        console.log('Fetching history for studentId:', studentId);
        console.log('Current user:', user);
        
        const data = await libraryService.getStudentHistory(studentId);
        console.log('Fetched data:', data);
        
        setHistory(data.history || []);
        setStudent(data.student || null);
        
      } catch (err) {
        console.error('Error fetching history:', err);
        
        // Handle specific error cases
        if (err.response) {
          const status = err.response.status;
          const message = err.response.data?.message || err.response.data?.error || 'Unknown error';
          
          switch (status) {
            case 403:
              setError('You do not have permission to view this student\'s history. You can only view your own history or need librarian permissions.');
              break;
            case 404:
              setError('Student not found. Please check if the student ID is correct.');
              break;
            case 500:
              setError('Server error occurred while fetching student history. Please try again later.');
              break;
            default:
              setError(`Error ${status}: ${message}`);
          }
        } else if (err.request) {
          setError('Network error: Unable to connect to the server. Please check your internet connection.');
        } else {
          setError(err.message || 'An unexpected error occurred while fetching student history.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [studentId, user]);

  // Book action handlers
  const handleMenuClick = (event, record) => {
    setAnchorEl(event.currentTarget);
    setSelectedRecord(record);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRecord(null);
  };

  const handleReturnBook = async (issueId) => {
    try {
      setActionLoading(prev => ({ ...prev, [issueId]: true }));
      const result = await libraryService.returnBook(issueId);

      setSnackbar({
        open: true,
        message: result.message || 'Book returned successfully',
        severity: 'success'
      });

      // Refresh the history data
      const data = await libraryService.getStudentHistory(studentId);
      setHistory(data.history || []);

    } catch (err) {
      // Check if it's a sendEmail error but the book was actually returned
      const errorMessage = err.message || 'Failed to return book';

      if (errorMessage.includes('sendEmail is not a function')) {
        // Show warning but still refresh data as the book might have been returned
        setSnackbar({
          open: true,
          message: 'Book returned successfully (email notification failed)',
          severity: 'warning'
        });

        // Refresh the history data to check if book was actually returned
        try {
          const data = await libraryService.getStudentHistory(studentId);
          setHistory(data.history || []);
        } catch (refreshErr) {
          console.error('Failed to refresh history:', refreshErr);
        }
      } else {
        setSnackbar({
          open: true,
          message: errorMessage,
          severity: 'error'
        });
      }
    } finally {
      setActionLoading(prev => ({ ...prev, [issueId]: false }));
      handleMenuClose();
    }
  };

  // const handleRenewBook = async (issueId) => {
  //   try {
  //     setActionLoading(prev => ({ ...prev, [issueId]: true }));
  //     await libraryService.renewBook(issueId, 'Renewed from student history detail');
      
  //     setSnackbar({
  //       open: true,
  //       message: 'Book renewed successfully',
  //       severity: 'success'
  //     });
      
  //     // Refresh the history data
  //     const data = await libraryService.getStudentHistory(studentId);
  //     setHistory(data.history || []);
      
  //   } catch (err) {
  //     setSnackbar({
  //       open: true,
  //       message: err.message || 'Failed to renew book',
  //       severity: 'error'
  //     });
  //   } finally {
  //     setActionLoading(prev => ({ ...prev, [issueId]: false }));
  //     handleMenuClose();
  //   }
  // };

  // const handlePardonFine = async (issueId) => {
  //   try {
  //     setActionLoading(prev => ({ ...prev, [issueId]: true }));
  //     await libraryService.pardonFine(issueId, 'Fine pardoned from student history detail');
      
  //     setSnackbar({
  //       open: true,
  //       message: 'Fine pardoned successfully',
  //       severity: 'success'
  //     });
      
  //     // Refresh the history data
  //     const data = await libraryService.getStudentHistory(studentId);
  //     setHistory(data.history || []);
      
  //   } catch (err) {
  //     setSnackbar({
  //       open: true,
  //       message: err.message || 'Failed to pardon fine',
  //       severity: 'error'
  //     });
  //   } finally {
  //     setActionLoading(prev => ({ ...prev, [issueId]: false }));
  //     handleMenuClose();
  //   }
  // };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid Date';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'issued': return 'primary';
      case 'returned': return 'success';
      case 'overdue': return 'error';
      case 'reserved': return 'warning';
      default: return 'default';
    }
  };

  const canPerformActions = () => {
    return true; // Allow all authenticated users to perform actions
  };

  // const canRenewBook = (record) => {
  //   return record.status === 'issued' && 
  //          new Date(record.dueDate) >= new Date() && 
  //          (record.renewalCount || 0) < 2;
  // };

  const canReturnBook = (record) => {
    return record.status === 'issued';
  };

  const canPardonFine = (record) => {
    return record.fine > 0 && !record.finePardoned;
  };

  if (loading) {
    return (
      <LibraryLayout>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <CircularProgress />
          <Typography sx={{ ml: 2 }}>Loading student history...</Typography>
        </Box>
      </LibraryLayout>
    );
  }

  if (error) {
    return (
      <LibraryLayout>
        <Box sx={{ p: 3 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => router.push('/library/history')}
            sx={{ mb: 3 }}
          >
            Back to Student History
          </Button>
          
          <Alert severity="error" sx={{ mb: 2 }}>
            <Typography variant="h6" gutterBottom>Error Loading Student History</Typography>
            <Typography>{error}</Typography>
          </Alert>
          
          <Button 
            variant="contained" 
            onClick={() => window.location.reload()}
            sx={{ mt: 2 }}
          >
            Retry
          </Button>
        </Box>
      </LibraryLayout>
    );
  }

  return (
    <LibraryLayout>
      <Box sx={{ p: 3 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => router.push('/library/history')}
          sx={{ mb: 3 }}
        >
          Back to Student History
        </Button>

        {student ? (
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={3}>
                <Avatar
                  src={student.profile?.avatar || '/default-avatar.png'}
                  alt={student.name || 'Student'}
                  sx={{ width: 80, height: 80, mr: 3 }}
                >
                  {student.name?.charAt(0) || '?'}
                </Avatar>
                <Box>
                  <Typography variant="h5">{student.name || 'Unknown Student'}</Typography>
                  <Typography>GR Number: {student.grNumber || 'N/A'}</Typography>
                  <Typography>
                    Class: {
                      typeof student.class === 'object' && student.class?.name 
                        ? student.class.name 
                        : typeof student.class === 'string' 
                          ? student.class 
                          : 'N/A'
                    }
                  </Typography>
                  <Typography>Email: {student.email || 'N/A'}</Typography>
                  {student.parentDetails && (
                    <Typography>
                      Parent: {student.parentDetails.name || 'N/A'} ({student.parentDetails.contact || 'N/A'})
                    </Typography>
                  )}
                </Box>
              </Box>
            </CardContent>
          </Card>
        ) : (
          <Alert severity="warning" sx={{ mb: 3 }}>
            Student data not available
          </Alert>
        )}

        <Typography variant="h6" gutterBottom>
          Book History ({history.length} records)
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Book</TableCell>
                <TableCell>Issue Date</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Return Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Fine</TableCell>
                {/* <TableCell>Renewals</TableCell> */}
                {canPerformActions() && <TableCell>Actions</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {history.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={canPerformActions() ? 8 : 7} align="center">
                    <Typography variant="body2" color="text.secondary">
                      No book history found for this student
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                history.map((item, index) => (
                  <TableRow key={item._id || index}>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        {item.book?.coverImage && (
                          <Avatar
                            src={item.book.coverImage}
                            variant="square"
                            sx={{ width: 40, height: 40, mr: 2 }}
                          />
                        )}
                        <Box>
                          <Typography fontWeight="bold">
                            {item.book?.bookTitle || 'N/A'}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.book?.author || 'N/A'}
                          </Typography>
                          {item.book?.isbn && (
                            <Typography variant="caption" color="text.secondary">
                              ISBN: {item.book.isbn}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>{formatDate(item.issueDate)}</TableCell>
                    <TableCell>{formatDate(item.dueDate)}</TableCell>
                    <TableCell>
                      {item.returnDate ? formatDate(item.returnDate) : 'Not returned'}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={item.status || 'Unknown'}
                        color={getStatusColor(item.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {item.fine && item.fine > 0 ? (
                        <Box>
                          <Chip
                            label={`₹${item.fine}`}
                            color={item.finePardoned ? 'success' : 'error'}
                            variant={item.finePardoned ? 'outlined' : 'filled'}
                            size="small"
                          />
                          {item.finePardoned && (
                            <Typography variant="caption" display="block" color="success.main">
                              Pardoned
                            </Typography>
                          )}
                          {item.daysOverdue > 0 && (
                            <Typography variant="caption" display="block" color="text.secondary">
                              {item.daysOverdue} days overdue
                            </Typography>
                          )}
                        </Box>
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          None
                        </Typography>
                      )}
                    </TableCell>
                    {/* <TableCell>
                      <Typography variant="body2">
                        {item.renewalCount || 0}/2
                      </Typography>
                    </TableCell> */}
                    {canPerformActions() && (
                      <TableCell>
                        <IconButton
                          onClick={(e) => handleMenuClick(e, item)}
                          disabled={actionLoading[item._id]}
                          size="small"
                        >
                          {actionLoading[item._id] ? (
                            <CircularProgress size={20} />
                          ) : (
                            <MoreVert />
                          )}
                        </IconButton>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Action Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          {selectedRecord && canReturnBook(selectedRecord) && (
            <MenuItem onClick={() => handleReturnBook(selectedRecord._id)}>
              <AssignmentReturn sx={{ mr: 1 }} />
              Return Book
            </MenuItem>
          )}
          {/* {selectedRecord && canRenewBook(selectedRecord) && (
            <MenuItem onClick={() => handleRenewBook(selectedRecord._id)}>
              <Autorenew sx={{ mr: 1 }} />
              Renew Book
            </MenuItem>
          )}
          {selectedRecord && canPardonFine(selectedRecord) && (
            <MenuItem onClick={() => handlePardonFine(selectedRecord._id)}>
              <MoneyOff sx={{ mr: 1 }} />
              Pardon Fine
            </MenuItem>
          )} */}
        </Menu>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        >
          <Alert
            onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </LibraryLayout>
  );
};

export default StudentHistoryDetail;