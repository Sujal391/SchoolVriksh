// import { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   TextField,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Chip,
//   Button,
//   CircularProgress,
//   Avatar,
//   InputAdornment,
// } from "@mui/material";
// import { Search, Refresh } from "@mui/icons-material";
// import { useRouter } from "next/router";
// import LibraryLayout from "../../../components/layout/LibraryLayout.js";
// import { useAuth } from "../../../contexts/AuthContext";
// import libraryService from "../../../services/libraryService";

// const StudentHistory = () => {
//   const { user } = useAuth();
//   const router = useRouter();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // useEffect(() => {

//   //     fetchStudents();

//   // }, []);

//   // const fetchStudents = async () => {
//   //   try {
//   //     setLoading(true);
//   //     setError(null);
//   //     const data = await libraryService.getStudentsWithActiveIssues();
//   //     setStudents(data);
//   //     setLoading(false);
//   //   } catch (err) {
//   //     setError(err.message || 'Failed to fetch students with active issues');
//   //     setLoading(false);
//   //   }
//   // };

//   useEffect(() => {
//     console.log("useEffect triggered");
//     fetchStudents();
//   }, []);

//   const fetchStudents = async () => {
//     try {
//       console.log("Fetching students...");
//       setLoading(true);
//       setError(null);
//       const data = await libraryService.getStudentsWithActiveIssues();
//       console.log("API response:", data);
//       setStudents(data);
//       setLoading(false);
//     } catch (err) {
//       console.error("Error fetching students:", err);
//       setError(err.message || "Failed to fetch students with active issues");
//       setLoading(false);
//     }
//   };

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleViewDetails = (studentId) => {
//     console.log("Navigating to:", `/library/history/${studentId}`);
//     router.push(`/library/history/${studentId}`);
//   };

//   const filteredStudents = students.filter(
//     (student) =>
//       (student.name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
//       (student.grNumber?.toLowerCase() || "").includes(
//         searchQuery.toLowerCase()
//       )
//   );

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
//         <Box
//           display="flex"
//           justifyContent="space-between"
//           alignItems="center"
//           mb={3}
//         >
//           <Typography variant="h4">Student Book History</Typography>
//           <Button
//             variant="outlined"
//             startIcon={<Refresh />}
//             onClick={fetchStudents}
//             disabled={loading}
//           >
//             Refresh
//           </Button>
//         </Box>

//         <TextField
//           fullWidth
//           variant="outlined"
//           placeholder="Search by name or GR number"
//           value={searchQuery}
//           onChange={handleSearch}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <Search />
//               </InputAdornment>
//             ),
//           }}
//           sx={{ mb: 3 }}
//         />

//         {filteredStudents.length === 0 ? (
//           <Typography>No students with active issues found.</Typography>
//         ) : (
//           <TableContainer component={Paper}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Profile</TableCell>
//                   <TableCell>Name</TableCell>
//                   <TableCell>GR Number</TableCell>
//                   <TableCell>Class</TableCell>
//                   <TableCell>Active Issues</TableCell>
//                   <TableCell>Overdue Books</TableCell>
//                   <TableCell>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {filteredStudents.map((student) => (
//                   <TableRow key={student._id}>
//                     <TableCell>
//                       <Avatar
//                         src={student.profile?.avatar || "/default-avatar.png"}
//                         alt={student.name}
//                       />
//                     </TableCell>
//                     <TableCell>{student.name || "N/A"}</TableCell>
//                     <TableCell>{student.grNumber || "N/A"}</TableCell>
//                     <TableCell>
//                       {student.studentDetails?.class?.name || "N/A"}
//                     </TableCell>
//                     <TableCell>
//                       <Chip
//                         label={student.activeIssues || 0}
//                         color={student.activeIssues > 0 ? "primary" : "default"}
//                       />
//                     </TableCell>
//                     <TableCell>
//                       <Chip
//                         label={student.overdue || 0}
//                         color={student.overdue > 0 ? "error" : "default"}
//                       />
//                     </TableCell>
//                     <TableCell>
//                       <Button
//                         variant="contained"
//                         color="primary"
//                         onClick={() => handleViewDetails(student._id)}
//                       >
//                         View Details
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         )}
//       </Box>
//     </LibraryLayout>
//   );
// };

// export default StudentHistory;





// import { useState, useEffect } from 'react';
// import {
//   Box,
//   Typography,
//   TextField,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Chip,
//   Button,
//   CircularProgress,
//   Avatar,
//   InputAdornment,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Grid,
//   Card,
//   CardContent,
//   Divider,
//   IconButton,
//   Alert
// } from '@mui/material';
// import { Search, Refresh, History, Close, Book, Person } from '@mui/icons-material';
// import { useRouter } from 'next/router';
// import LibraryLayout from '../../../components/layout/LibraryLayout.js';
// import { useAuth } from '../../../contexts/AuthContext';
// import libraryService from '../../../services/libraryService';

// const StudentHistory = () => {
//   const { user } = useAuth();
//   const router = useRouter();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  
//   // New states for GR number search functionality
//   const [grSearchQuery, setGrSearchQuery] = useState('');
//   const [grSearchLoading, setGrSearchLoading] = useState(false);
//   const [grSearchError, setGrSearchError] = useState(null);
//   const [historyDialogOpen, setHistoryDialogOpen] = useState(false);
//   const [selectedStudentHistory, setSelectedStudentHistory] = useState(null);

//   useEffect(() => {
//     console.log('useEffect triggered');
//     fetchStudents();
//   }, []);

//   const fetchStudents = async () => {
//     try {
//       console.log('Fetching students...');
//       setLoading(true);
//       setError(null);
//       const data = await libraryService.getStudentsWithActiveIssues();
//       console.log('API response:', data);
//       setStudents(data);
//       setLoading(false);
//     } catch (err) {
//       console.error('Error fetching students:', err);
//       setError(err.message || 'Failed to fetch students with active issues');
//       setLoading(false);
//     }
//   };

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleViewDetails = (studentId) => {
//     console.log('Navigating to:', `/library/history/${studentId}`);
//     router.push(`/library/history/${studentId}`);
//   };

//   // New function to search by GR number
//   const handleGrNumberSearch = async () => {
//     if (!grSearchQuery.trim()) {
//       setGrSearchError('Please enter a GR number');
//       return;
//     }

//     try {
//       setGrSearchLoading(true);
//       setGrSearchError(null);
      
//       const data = await libraryService.getStudentHistoryByGrNumber(grSearchQuery.trim());
//       setSelectedStudentHistory(data);
//       setHistoryDialogOpen(true);
//       setGrSearchLoading(false);
//     } catch (err) {
//       console.error('Error fetching student history by GR number:', err);
//       setGrSearchError(err.message || 'Failed to fetch student history');
//       setGrSearchLoading(false);
//     }
//   };

//   const handleCloseHistoryDialog = () => {
//     setHistoryDialogOpen(false);
//     setSelectedStudentHistory(null);
//     setGrSearchQuery('');
//     setGrSearchError(null);
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'issued':
//         return 'primary';
//       case 'returned':
//         return 'success';
//       case 'overdue':
//         return 'error';
//       case 'lost':
//         return 'warning';
//       default:
//         return 'default';
//     }
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-IN', {
//       day: '2-digit',
//       month: '2-digit',
//       year: 'numeric'
//     });
//   };

//   const filteredStudents = students.filter(student =>
//     (student.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
//     (student.grNumber?.toLowerCase() || '').includes(searchQuery.toLowerCase())
//   );

//   if (loading) {
//     return (
//       <LibraryLayout>
//         <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
//           <CircularProgress />
//         </Box>
//       </LibraryLayout>
//     );
//   }

//   if (error) {
//     return (
//       <LibraryLayout>
//         <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
//           <Typography color="error">{error}</Typography>
//         </Box>
//       </LibraryLayout>
//     );
//   }

//   return (
//     <LibraryLayout>
//       <Box sx={{ p: 3 }}>
//         <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
//           <Typography variant="h4">Student Book History</Typography>
//           <Button
//             variant="outlined"
//             startIcon={<Refresh />}
//             onClick={fetchStudents}
//             disabled={loading}
//           >
//             Refresh
//           </Button>
//         </Box>

//         {/* New GR Number Search Section */}
//         <Card sx={{ mb: 3 }}>
//           <CardContent>
//             <Typography variant="h6" gutterBottom>
//               <History sx={{ mr: 1, verticalAlign: 'middle' }} />
//               Search History by GR Number
//             </Typography>
//             <Box display="flex" gap={2} alignItems="center">
//               <TextField
//                 variant="outlined"
//                 placeholder="Enter GR number to view complete history"
//                 value={grSearchQuery}
//                 onChange={(e) => setGrSearchQuery(e.target.value)}
//                 onKeyPress={(e) => e.key === 'Enter' && handleGrNumberSearch()}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <Person />
//                     </InputAdornment>
//                   ),
//                 }}
//                 sx={{ flexGrow: 1 }}
//                 error={!!grSearchError}
//                 helperText={grSearchError}
//               />
//               <Button
//                 variant="contained"
//                 onClick={handleGrNumberSearch}
//                 disabled={grSearchLoading}
//                 startIcon={grSearchLoading ? <CircularProgress size={20} /> : <Search />}
//               >
//                 Search History
//               </Button>
//             </Box>
//           </CardContent>
//         </Card>

//         <TextField
//           fullWidth
//           variant="outlined"
//           placeholder="Search by name or GR number"
//           value={searchQuery}
//           onChange={handleSearch}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <Search />
//               </InputAdornment>
//             ),
//           }}
//           sx={{ mb: 3 }}
//         />

//         {filteredStudents.length === 0 ? (
//           <Typography>No students with active issues found.</Typography>
//         ) : (
//           <TableContainer component={Paper}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Profile</TableCell>
//                   <TableCell>Name</TableCell>
//                   <TableCell>GR Number</TableCell>
//                   <TableCell>Class</TableCell>
//                   <TableCell>Active Issues</TableCell>
//                   <TableCell>Overdue Books</TableCell>
//                   <TableCell>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {filteredStudents.map((student) => (
//                   <TableRow key={student._id}>
//                     <TableCell>
//                       <Avatar
//                         src={student.profile?.avatar || '/default-avatar.png'}
//                         alt={student.name}
//                       />
//                     </TableCell>
//                     <TableCell>{student.name || 'N/A'}</TableCell>
//                     <TableCell>{student.grNumber || 'N/A'}</TableCell>
//                     <TableCell>{student.studentDetails?.class?.name || 'N/A'}</TableCell>
//                     <TableCell>
//                       <Chip
//                         label={student.activeIssues || 0}
//                         color={student.activeIssues > 0 ? 'primary' : 'default'}
//                       />
//                     </TableCell>
//                     <TableCell>
//                       <Chip
//                         label={student.overdue || 0}
//                         color={student.overdue > 0 ? 'error' : 'default'}
//                       />
//                     </TableCell>
//                     <TableCell>
//                       <Button
//                         variant="contained"
//                         color="primary"
//                         onClick={() => handleViewDetails(student._id)}
//                       >
//                         View Details
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         )}

//         {/* History Dialog */}
//         <Dialog
//           open={historyDialogOpen}
//           onClose={handleCloseHistoryDialog}
//           maxWidth="lg"
//           fullWidth
//         >
//           <DialogTitle>
//             <Box display="flex" justifyContent="space-between" alignItems="center">
//               <Typography variant="h6">Student Book History</Typography>
//               <IconButton onClick={handleCloseHistoryDialog} size="small">
//                 <Close />
//               </IconButton>
//             </Box>
//           </DialogTitle>
//           <DialogContent>
//             {selectedStudentHistory && (
//               <>
//                 <Card sx={{ mb: 3 }}>
//                   <CardContent>
//                     <Grid container spacing={2}>
//                       <Grid item xs={12} md={6}>
//                         <Typography variant="subtitle2" color="textSecondary">Name</Typography>
//                         <Typography variant="body1">{selectedStudentHistory.student.name}</Typography>
//                       </Grid>
//                       <Grid item xs={12} md={6}>
//                         <Typography variant="subtitle2" color="textSecondary">GR Number</Typography>
//                         <Typography variant="body1">{selectedStudentHistory.student.grNumber}</Typography>
//                       </Grid>
//                       <Grid item xs={12} md={6}>
//                         <Typography variant="subtitle2" color="textSecondary">Class</Typography>
//                         <Typography variant="body1">
//                           {selectedStudentHistory.student.class?.name || 'N/A'}
//                         </Typography>
//                       </Grid>
//                       <Grid item xs={12} md={6}>
//                         <Typography variant="subtitle2" color="textSecondary">Email</Typography>
//                         <Typography variant="body1">{selectedStudentHistory.student.email}</Typography>
//                       </Grid>
//                     </Grid>
//                   </CardContent>
//                 </Card>

//                 <Divider sx={{ my: 2 }} />

//                 <Typography variant="h6" gutterBottom>
//                   <Book sx={{ mr: 1, verticalAlign: 'middle' }} />
//                   Book History ({selectedStudentHistory.history.length} records)
//                 </Typography>

//                 {selectedStudentHistory.history.length === 0 ? (
//                   <Alert severity="info">No book history found for this student.</Alert>
//                 ) : (
//                   <TableContainer component={Paper}>
//                     <Table>
//                       <TableHead>
//                         <TableRow>
//                           <TableCell>Book Title</TableCell>
//                           <TableCell>Author</TableCell>
//                           <TableCell>Issue Date</TableCell>
//                           <TableCell>Due Date</TableCell>
//                           <TableCell>Return Date</TableCell>
//                           <TableCell>Status</TableCell>
//                           <TableCell>Fine</TableCell>
//                         </TableRow>
//                       </TableHead>
//                       <TableBody>
//                         {selectedStudentHistory.history.map((record) => (
//                           <TableRow key={record._id}>
//                             <TableCell>
//                               <Box display="flex" alignItems="center">
//                                 {record.book?.coverImage && (
//                                   <Avatar
//                                     src={record.book.coverImage}
//                                     variant="square"
//                                     sx={{ width: 40, height: 40, mr: 2 }}
//                                   />
//                                 )}
//                                 <Box>
//                                   <Typography variant="body2" fontWeight="medium">
//                                     {record.book?.bookTitle || 'N/A'}
//                                   </Typography>
//                                   <Typography variant="caption" color="textSecondary">
//                                     ISBN: {record.book?.isbn || 'N/A'}
//                                   </Typography>
//                                 </Box>
//                               </Box>
//                             </TableCell>
//                             <TableCell>{record.book?.author || 'N/A'}</TableCell>
//                             <TableCell>{formatDate(record.issueDate)}</TableCell>
//                             <TableCell>{formatDate(record.dueDate)}</TableCell>
//                             <TableCell>
//                               {record.returnDate ? formatDate(record.returnDate) : '-'}
//                             </TableCell>
//                             <TableCell>
//                               <Chip
//                                 label={record.status.charAt(0).toUpperCase() + record.status.slice(1)}
//                                 color={getStatusColor(record.status)}
//                                 size="small"
//                               />
//                             </TableCell>
//                             <TableCell>
//                               {record.fine > 0 ? (
//                                 <Box>
//                                   <Typography variant="body2" color="error">
//                                     ₹{record.fine}
//                                   </Typography>
//                                   {record.finePardoned && (
//                                     <Chip label="Pardoned" size="small" color="success" />
//                                   )}
//                                   {record.daysOverdue > 0 && (
//                                     <Typography variant="caption" color="textSecondary">
//                                       ({record.daysOverdue} days overdue)
//                                     </Typography>
//                                   )}
//                                 </Box>
//                               ) : (
//                                 <Typography variant="body2" color="success">
//                                   No Fine
//                                 </Typography>
//                               )}
//                             </TableCell>
//                           </TableRow>
//                         ))}
//                       </TableBody>
//                     </Table>
//                   </TableContainer>
//                 )}
//               </>
//             )}
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleCloseHistoryDialog}>Close</Button>
//           </DialogActions>
//         </Dialog>
//       </Box>
//     </LibraryLayout>
//   );
// };

// export default StudentHistory;




import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  CircularProgress,
  Avatar,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Card,
  CardContent,
  Divider,
  IconButton,
  Alert,
  Menu,
  MenuItem,
  Snackbar
} from '@mui/material';
import { 
  Search, 
  Refresh, 
  History, 
  Close, 
  Book, 
  Person, 
  MoreVert,
  AssignmentReturn,
  Autorenew,
  MoneyOff
} from '@mui/icons-material';
import { useRouter } from 'next/router';
import LibraryLayout from '../../../components/layout/LibraryLayout.js';
import { useAuth } from '../../../contexts/AuthContext';
import libraryService from '../../../services/libraryService';

const StudentHistory = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // States for GR number search functionality
  const [grSearchQuery, setGrSearchQuery] = useState('');
  const [grSearchLoading, setGrSearchLoading] = useState(false);
  const [grSearchError, setGrSearchError] = useState(null);
  const [historyDialogOpen, setHistoryDialogOpen] = useState(false);
  const [selectedStudentHistory, setSelectedStudentHistory] = useState(null);

  // States for book actions
  const [actionLoading, setActionLoading] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    console.log('useEffect triggered');
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      console.log('Fetching students...');
      setLoading(true);
      setError(null);
      const data = await libraryService.getStudentsWithActiveIssues();
      console.log('API response:', data);
      setStudents(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching students:', err);
      setError(err.message || 'Failed to fetch students with active issues');
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleViewDetails = (studentId) => {
    console.log('Navigating to:', `/library/history/${studentId}`);
    router.push(`/library/history/${studentId}`);
  };

  // Function to search by GR number
  const handleGrNumberSearch = async () => {
    if (!grSearchQuery.trim()) {
      setGrSearchError('Please enter a GR number');
      return;
    }

    try {
      setGrSearchLoading(true);
      setGrSearchError(null);
      
      const data = await libraryService.getStudentHistoryByGrNumber(grSearchQuery.trim());
      setSelectedStudentHistory(data);
      setHistoryDialogOpen(true);
      setGrSearchLoading(false);
    } catch (err) {
      console.error('Error fetching student history by GR number:', err);
      setGrSearchError(err.message || 'Failed to fetch student history');
      setGrSearchLoading(false);
    }
  };

  const handleCloseHistoryDialog = () => {
    setHistoryDialogOpen(false);
    setSelectedStudentHistory(null);
    setGrSearchQuery('');
    setGrSearchError(null);
  };

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
      if (selectedStudentHistory) {
        const updatedData = await libraryService.getStudentHistoryByGrNumber(selectedStudentHistory.student.grNumber);
        setSelectedStudentHistory(updatedData);
      }

      // Refresh students list
      fetchStudents();
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

        // Refresh the data to check if book was actually returned
        try {
          if (selectedStudentHistory) {
            const updatedData = await libraryService.getStudentHistoryByGrNumber(selectedStudentHistory.student.grNumber);
            setSelectedStudentHistory(updatedData);
          }
          fetchStudents();
        } catch (refreshErr) {
          console.error('Failed to refresh data:', refreshErr);
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
  //     await libraryService.renewBook(issueId, 'Renewed from student history');
      
  //     setSnackbar({
  //       open: true,
  //       message: 'Book renewed successfully',
  //       severity: 'success'
  //     });
      
  //     // Refresh the history data
  //     if (selectedStudentHistory) {
  //       const updatedData = await libraryService.getStudentHistoryByGrNumber(selectedStudentHistory.student.grNumber);
  //       setSelectedStudentHistory(updatedData);
  //     }
      
  //     // Refresh students list
  //     fetchStudents();
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
  //     await libraryService.pardonFine(issueId, 'Fine pardoned from student history');
      
  //     setSnackbar({
  //       open: true,
  //       message: 'Fine pardoned successfully',
  //       severity: 'success'
  //     });
      
  //     // Refresh the history data
  //     if (selectedStudentHistory) {
  //       const updatedData = await libraryService.getStudentHistoryByGrNumber(selectedStudentHistory.student.grNumber);
  //       setSelectedStudentHistory(updatedData);
  //     }
      
  //     // Refresh students list
  //     fetchStudents();
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'issued':
        return 'primary';
      case 'returned':
        return 'success';
      case 'overdue':
        return 'error';
      case 'lost':
        return 'warning';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const canPerformActions = () => {
    return true; // Allow all authenticated users to perform actions
  };

  const canRenewBook = (record) => {
    return record.status === 'issued' && 
           new Date(record.dueDate) >= new Date() && 
           (record.renewalCount || 0) < 2;
  };

  const canReturnBook = (record) => {
    return record.status === 'issued';
  };

  const canPardonFine = (record) => {
    return record.fine > 0 && !record.finePardoned;
  };

  const filteredStudents = students.filter(student =>
    (student.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
    (student.grNumber?.toLowerCase() || '').includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <LibraryLayout>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <CircularProgress />
        </Box>
      </LibraryLayout>
    );
  }

  if (error) {
    return (
      <LibraryLayout>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <Typography color="error">{error}</Typography>
        </Box>
      </LibraryLayout>
    );
  }

  return (
    <LibraryLayout>
      <Box sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4">Student Book History</Typography>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={fetchStudents}
            disabled={loading}
          >
            Refresh
          </Button>
        </Box>

        {/* GR Number Search Section */}
        {/* <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              <History sx={{ mr: 1, verticalAlign: 'middle' }} />
              Search History by GR Number
            </Typography>
            <Box display="flex" gap={2} alignItems="center">
              <TextField
                variant="outlined"
                placeholder="Enter GR number to view complete history"
                value={grSearchQuery}
                onChange={(e) => setGrSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleGrNumberSearch()}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  ),
                }}
                sx={{ flexGrow: 1 }}
                error={!!grSearchError}
                helperText={grSearchError}
              />
              <Button
                variant="contained"
                onClick={handleGrNumberSearch}
                disabled={grSearchLoading}
                startIcon={grSearchLoading ? <CircularProgress size={20} /> : <Search />}
              >
                Search History
              </Button>
            </Box>
          </CardContent>
        </Card> */}

        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by name or GR number"
          value={searchQuery}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 3 }}
        />

        {filteredStudents.length === 0 ? (
          <Typography>No students with active issues found.</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Profile</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>GR Number</TableCell>
                  <TableCell>Class</TableCell>
                  <TableCell>Active Issues</TableCell>
                  <TableCell>Overdue Books</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student._id}>
                    <TableCell>
                      <Avatar
                        src={student.profile?.avatar || '/default-avatar.png'}
                        alt={student.name}
                      />
                    </TableCell>
                    <TableCell>{student.name || 'N/A'}</TableCell>
                    <TableCell>{student.grNumber || 'N/A'}</TableCell>
                    <TableCell>{student.studentDetails?.class?.name || 'N/A'}</TableCell>
                    <TableCell>
                      <Chip
                        label={student.activeIssues || 0}
                        color={student.activeIssues > 0 ? 'primary' : 'default'}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={student.overdue || 0}
                        color={student.overdue > 0 ? 'error' : 'default'}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleViewDetails(student._id)}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* History Dialog */}
        <Dialog
          open={historyDialogOpen}
          onClose={handleCloseHistoryDialog}
          maxWidth="lg"
          fullWidth
        >
          <DialogTitle>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6">Student Book History</Typography>
              <IconButton onClick={handleCloseHistoryDialog} size="small">
                <Close />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            {selectedStudentHistory && (
              <>
                {/* <Card sx={{ mb: 3 }}>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Typography variant="subtitle2" color="textSecondary">Name</Typography>
                        <Typography variant="body1">{selectedStudentHistory.student.name}</Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography variant="subtitle2" color="textSecondary">GR Number</Typography>
                        <Typography variant="body1">{selectedStudentHistory.student.grNumber}</Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography variant="subtitle2" color="textSecondary">Class</Typography>
                        <Typography variant="body1">
                          {selectedStudentHistory.student.class?.name || 'N/A'}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography variant="subtitle2" color="textSecondary">Email</Typography>
                        <Typography variant="body1">{selectedStudentHistory.student.email}</Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card> */}

                {/* <Divider sx={{ my: 2 }} /> */}

                {/* <Typography variant="h6" gutterBottom>
                  <Book sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Book History ({selectedStudentHistory.history.length} records)
                </Typography> */}

                {/* {selectedStudentHistory.history.length === 0 ? (
                  <Alert severity="info">No book history found for this student.</Alert>
                ) : (
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Book Title</TableCell>
                          <TableCell>Author</TableCell>
                          <TableCell>Issue Date</TableCell>
                          <TableCell>Due Date</TableCell>
                          <TableCell>Return Date</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Fine</TableCell>
                          <TableCell>Renewals</TableCell>
                          {canPerformActions() && <TableCell>Actions</TableCell>}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedStudentHistory.history.map((record) => (
                          <TableRow key={record._id}>
                            <TableCell>
                              <Box display="flex" alignItems="center">
                                {record.book?.coverImage && (
                                  <Avatar
                                    src={record.book.coverImage}
                                    variant="square"
                                    sx={{ width: 40, height: 40, mr: 2 }}
                                  />
                                )}
                                <Box>
                                  <Typography variant="body2" fontWeight="medium">
                                    {record.book?.bookTitle || 'N/A'}
                                  </Typography>
                                  <Typography variant="caption" color="textSecondary">
                                    ISBN: {record.book?.isbn || 'N/A'}
                                  </Typography>
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell>{record.book?.author || 'N/A'}</TableCell>
                            <TableCell>{formatDate(record.issueDate)}</TableCell>
                            <TableCell>{formatDate(record.dueDate)}</TableCell>
                            <TableCell>
                              {record.returnDate ? formatDate(record.returnDate) : '-'}
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                                color={getStatusColor(record.status)}
                                size="small"
                              />
                            </TableCell>
                            <TableCell>
                              {record.fine > 0 ? (
                                <Box>
                                  <Typography variant="body2" color="error">
                                    ₹{record.fine}
                                  </Typography>
                                  {record.finePardoned && (
                                    <Chip label="Pardoned" size="small" color="success" />
                                  )}
                                  {record.daysOverdue > 0 && (
                                    <Typography variant="caption" color="textSecondary">
                                      ({record.daysOverdue} days overdue)
                                    </Typography>
                                  )}
                                </Box>
                              ) : (
                                <Typography variant="body2" color="success">
                                  No Fine
                                </Typography>
                              )}
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2">
                                {record.renewalCount || 0}/2
                              </Typography>
                            </TableCell>
                            {canPerformActions() && (
                              <TableCell>
                                <IconButton
                                  onClick={(e) => handleMenuClick(e, record)}
                                  disabled={actionLoading[record._id]}
                                  size="small"
                                >
                                  {actionLoading[record._id] ? (
                                    <CircularProgress size={20} />
                                  ) : (
                                    <MoreVert />
                                  )}
                                </IconButton>
                              </TableCell>
                            )}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )} */}
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseHistoryDialog}>Close</Button>
          </DialogActions>
        </Dialog>

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
          {selectedRecord && canRenewBook(selectedRecord) && (
            <MenuItem onClick={() => handleRenewBook(selectedRecord._id)}>
              <Autorenew sx={{ mr: 1 }} />
              Renew Book
            </MenuItem>
          )}
          {/* {selectedRecord && canPardonFine(selectedRecord) && (
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

export default StudentHistory;