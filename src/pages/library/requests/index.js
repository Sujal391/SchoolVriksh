// import { useState, useEffect } from 'react';
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
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   CircularProgress,
//   Tooltip,
//   IconButton
// } from '@mui/material';
// import {
//   Check as ApproveIcon,
//   Close as RejectIcon,
//   Visibility as ViewIcon,
//   Refresh as RefreshIcon
// } from '@mui/icons-material';
// import { useRouter } from 'next/router';
// import LibraryLayout from '../../../components/layout/LibraryLayout';
// import { useAuth } from '../../../contexts/AuthContext';
// import libraryService from '../../../services/libraryService';

// const IssueRequests = () => {
//   const { user } = useAuth();
//   const router = useRouter();
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedRequest, setSelectedRequest] = useState(null);
//   const [approveDialogOpen, setApproveDialogOpen] = useState(false);
//   const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
//   const [remarks, setRemarks] = useState('');
//   const [dueDate, setDueDate] = useState('');
//   const [processing, setProcessing] = useState(false);

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   const fetchRequests = async () => {
//     try {
//       setLoading(true);
//       const data = await libraryService.getIssueRequests();
//       setRequests(data);
//       setLoading(false);
//     } catch (err) {
//       setError(err.message);
//       setLoading(false);
//     }
//   };

//   const handleApprove = (request) => {
//     setSelectedRequest(request);
//     setDueDate('');
//     setApproveDialogOpen(true);
//   };

//   const handleReject = (request) => {
//     setSelectedRequest(request);
//     setRemarks('');
//     setRejectDialogOpen(true);
//   };

//   const confirmApprove = async () => {
//     try {
//       setProcessing(true);
//       await libraryService.issueBook(
//         selectedRequest.book._id,
//         selectedRequest.user._id,
//         {
//           dueDate,
//           requestId: selectedRequest._id,
//           loanPeriodDays: 14,
//           finePerDay: 5
//         }
//       );
//       setApproveDialogOpen(false);
//       fetchRequests();
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setProcessing(false);
//     }
//   };

//   const confirmReject = async () => {
//     try {
//       setProcessing(true);
//       await libraryService.rejectRequest(selectedRequest._id, remarks);
//       setRejectDialogOpen(false);
//       fetchRequests();
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setProcessing(false);
//     }
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString();
//   };

//   if (loading) {
//     return (
//       <LibraryLayout>
//         <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
//           <CircularProgress />
//         </Box>
//       </LibraryLayout>
//     );
//   }

//   return (
//     <LibraryLayout>
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
//         <Typography variant="h4">Book Issue Requests</Typography>
//         <Button
//           variant="outlined"
//           startIcon={<RefreshIcon />}
//           onClick={fetchRequests}
//         >
//           Refresh
//         </Button>
//       </Box>

//       {error && (
//         <Box mb={3}>
//           <Typography color="error">{error}</Typography>
//         </Box>
//       )}

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Book</TableCell>
//               <TableCell>Student</TableCell>
//               <TableCell>Class</TableCell>
//               <TableCell>Request Date</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {requests.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan={6} align="center">
//                   No pending requests
//                 </TableCell>
//               </TableRow>
//             ) : (
//               requests.map(request => (
//                 <TableRow key={request._id}>
//                   <TableCell>
//                     <Typography fontWeight="bold">{request.book.bookTitle}</Typography>
//                     <Typography variant="body2">{request.book.author}</Typography>
//                   </TableCell>
//                   <TableCell>
//                     <Typography fontWeight="bold">{request.user.name}</Typography>
//                     <Typography variant="body2">GR: {request.user.studentDetails.grNumber}</Typography>
//                   </TableCell>
//                   <TableCell>
//                     {request.user.studentDetails.class?.name || 'N/A'}
//                   </TableCell>
//                   <TableCell>
//                     {formatDate(request.createdAt)}
//                   </TableCell>
//                   <TableCell>
//                     <Chip
//                       label={request.status}
//                       color={
//                         request.status === 'requested' ? 'warning' : 
//                         request.status === 'reserved' ? 'info' : 'default'
//                       }
//                     />
//                   </TableCell>
//                   <TableCell>
//                     <Tooltip title="View Details">
//                       <IconButton onClick={() => router.push(`/library/books/${request.book._id}`)}>
//                         <ViewIcon color="info" />
//                       </IconButton>
//                     </Tooltip>
//                     <Tooltip title="Approve">
//                       <IconButton 
//                         onClick={() => handleApprove(request)}
//                         color="success"
//                       >
//                         <ApproveIcon />
//                       </IconButton>
//                     </Tooltip>
//                     <Tooltip title="Reject">
//                       <IconButton 
//                         onClick={() => handleReject(request)}
//                         color="error"
//                       >
//                         <RejectIcon />
//                       </IconButton>
//                     </Tooltip>
//                   </TableCell>
//                 </TableRow>
//               ))
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Approve Dialog */}
//       <Dialog open={approveDialogOpen} onClose={() => setApproveDialogOpen(false)}>
//         <DialogTitle>Approve Book Issue</DialogTitle>
//         <DialogContent>
//           <Box mb={2}>
//             <Typography>
//               Approve issue of <strong>{selectedRequest?.book.bookTitle}</strong> to{' '}
//               <strong>{selectedRequest?.user.name}</strong>?
//             </Typography>
//           </Box>
//           <TextField
//             fullWidth
//             label="Due Date"
//             type="date"
//             value={dueDate}
//             onChange={(e) => setDueDate(e.target.value)}
//             InputLabelProps={{ shrink: true }}
//             sx={{ mt: 2 }}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setApproveDialogOpen(false)}>Cancel</Button>
//           <Button 
//             onClick={confirmApprove}
//             color="primary"
//             variant="contained"
//             disabled={processing || !dueDate}
//           >
//             {processing ? <CircularProgress size={24} /> : 'Approve'}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Reject Dialog */}
//       <Dialog open={rejectDialogOpen} onClose={() => setRejectDialogOpen(false)}>
//         <DialogTitle>Reject Book Request</DialogTitle>
//         <DialogContent>
//           <Box mb={2}>
//             <Typography>
//               Reject request for <strong>{selectedRequest?.book.bookTitle}</strong> by{' '}
//               <strong>{selectedRequest?.user.name}</strong>?
//             </Typography>
//           </Box>
//           <TextField
//             fullWidth
//             label="Remarks"
//             multiline
//             rows={3}
//             value={remarks}
//             onChange={(e) => setRemarks(e.target.value)}
//             sx={{ mt: 2 }}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setRejectDialogOpen(false)}>Cancel</Button>
//           <Button 
//             onClick={confirmReject}
//             color="error"
//             variant="contained"
//             disabled={processing}
//           >
//             {processing ? <CircularProgress size={24} /> : 'Reject'}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </LibraryLayout>
//   );
// };

// export default IssueRequests;



import { useState, useEffect } from 'react';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Tooltip,
  IconButton,
  Alert,
  Snackbar,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  Divider
} from '@mui/material';
import {
  Check as ApproveIcon,
  Close as RejectIcon,
  Visibility as ViewIcon,
  Refresh as RefreshIcon,
  Person as PersonIcon,
  Book as BookIcon,
  Badge as BadgeIcon
} from '@mui/icons-material';
import { useRouter } from 'next/router';
import LibraryLayout from '../../../components/layout/LibraryLayout';
import { useAuth } from '../../../contexts/AuthContext';
import libraryService from '../../../services/libraryService';

const IssueRequests = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [remarks, setRemarks] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [loanPeriodDays, setLoanPeriodDays] = useState(14);
  const [finePerDay, setFinePerDay] = useState(5);
  const [processing, setProcessing] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  
  // New states for GR number functionality
  const [issueMethod, setIssueMethod] = useState('request'); // 'request' or 'direct'
  const [grNumber, setGrNumber] = useState('');
  const [directIssueDialogOpen, setDirectIssueDialogOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [bookSearchQuery, setBookSearchQuery] = useState('');
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [bookSearchLoading, setBookSearchLoading] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await libraryService.getIssueRequests();
      setRequests(data);
    } catch (err) {
      setError(err.message);
      setSnackbar({
        open: true,
        message: err.message,
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = (request) => {
    setSelectedRequest(request);
    setIssueMethod('request');
    
    // Set default due date based on loan period
    const defaultDueDate = new Date();
    defaultDueDate.setDate(defaultDueDate.getDate() + loanPeriodDays);
    setDueDate(defaultDueDate.toISOString().split('T')[0]);
    
    setRemarks('');
    setGrNumber('');
    setApproveDialogOpen(true);
  };

  const handleDirectIssue = (book = null) => {
    setSelectedBook(book);
    setIssueMethod('direct');
    
    // Set default due date based on loan period
    const defaultDueDate = new Date();
    defaultDueDate.setDate(defaultDueDate.getDate() + loanPeriodDays);
    setDueDate(defaultDueDate.toISOString().split('T')[0]);
    
    setRemarks('');
    setGrNumber('');
    setDirectIssueDialogOpen(true);
  };

  const handleReject = (request) => {
    setSelectedRequest(request);
    setRemarks('');
    setRejectDialogOpen(true);
  };

  const confirmApprove = async () => {
    if (!selectedRequest || !dueDate) return;

    try {
      setProcessing(true);
      
      if (issueMethod === 'request') {
        // Issue based on existing request
        await libraryService.issueBook(
          selectedRequest.book._id,
          selectedRequest.user._id,
          {
            dueDate,
            requestId: selectedRequest._id,
            loanPeriodDays: parseInt(loanPeriodDays),
            finePerDay: parseFloat(finePerDay),
            remarks: remarks || undefined
          }
        );
      } else if (issueMethod === 'direct') {
        // Direct issue by GR number
        if (!grNumber.trim()) {
          setSnackbar({
            open: true,
            message: 'Please enter a valid GR number',
            severity: 'error'
          });
          return;
        }

        await libraryService.issueBookByGrNumber(
          selectedRequest.book._id,
          grNumber.trim(),
          {
            dueDate,
            loanPeriodDays: parseInt(loanPeriodDays),
            finePerDay: parseFloat(finePerDay),
            remarks: remarks || undefined
          }
        );
      }
      
      setApproveDialogOpen(false);
      setSnackbar({
        open: true,
        message: 'Book issued successfully!',
        severity: 'success'
      });
      
      // Reset form
      resetForm();
      
      // Refresh the requests list
      await fetchRequests();
      
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message,
        severity: 'error'
      });
    } finally {
      setProcessing(false);
    }
  };

  const searchBooks = async (query) => {
    if (!query || query.length < 2) {
      setSearchedBooks([]);
      return;
    }

    try {
      setBookSearchLoading(true);
      const books = await libraryService.searchBooks(query);
      setSearchedBooks(books);
    } catch (err) {
      console.error('Error searching books:', err);
      setSearchedBooks([]);
    } finally {
      setBookSearchLoading(false);
    }
  };

  const handleBookSearch = (query) => {
    setBookSearchQuery(query);
    searchBooks(query);
  };

  const handleBookSelect = (book) => {
    setSelectedBook(book);
    setBookSearchQuery(book.bookTitle);
    setSearchedBooks([]);
  };

  const confirmDirectIssue = async () => {
    if (!selectedBook || !dueDate || !grNumber.trim()) return;

    try {
      setProcessing(true);
      
      await libraryService.issueBookByGrNumber(
        selectedBook._id,
        grNumber.trim(),
        {
          dueDate,
          loanPeriodDays: parseInt(loanPeriodDays),
          finePerDay: parseFloat(finePerDay),
          remarks: remarks || undefined
        }
      );
      
      setDirectIssueDialogOpen(false);
      setSnackbar({
        open: true,
        message: 'Book issued successfully!',
        severity: 'success'
      });
      
      // Reset form
      resetForm();
      
      // Refresh the requests list
      await fetchRequests();
      
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message,
        severity: 'error'
      });
    } finally {
      setProcessing(false);
    }
  };

  const confirmReject = async () => {
    if (!selectedRequest) return;

    try {
      setProcessing(true);
      
      await libraryService.rejectRequest(selectedRequest._id, remarks);
      
      setRejectDialogOpen(false);
      setSnackbar({
        open: true,
        message: 'Request rejected successfully!',
        severity: 'success'
      });
      
      // Reset form
      resetForm();
      
      // Refresh the requests list
      await fetchRequests();
      
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message,
        severity: 'error'
      });
    } finally {
      setProcessing(false);
    }
  };

  const resetForm = () => {
    setSelectedRequest(null);
    setSelectedBook(null);
    setDueDate('');
    setRemarks('');
    setLoanPeriodDays(14);
    setFinePerDay(5);
    setIssueMethod('request');
    setGrNumber('');
    setBookSearchQuery('');
    setSearchedBooks([]);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'requested':
        return 'warning';
      case 'reserved':
        return 'info';
      case 'issued':
        return 'success';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  // Calculate due date when loan period changes
  const handleLoanPeriodChange = (days) => {
    setLoanPeriodDays(days);
    if (days > 0) {
      const newDueDate = new Date();
      newDueDate.setDate(newDueDate.getDate() + parseInt(days));
      setDueDate(newDueDate.toISOString().split('T')[0]);
    }
  };

  if (loading) {
    return (
      <LibraryLayout>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <CircularProgress size={60} />
        </Box>
      </LibraryLayout>
    );
  }

  return (
    <LibraryLayout>
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={5} mb={3}>
        <Typography variant="h4" fontWeight="bold">
          Book Issue Requests
        </Typography>
        <Box display="flex" gap={2}>
          <Button
            variant="contained"
            startIcon={<BadgeIcon />}
            onClick={() => setDirectIssueDialogOpen(true)}
            color="primary"
            sx={{
              backgroundColor: 'primary.main',
              '&:hover': {
                backgroundColor: 'primary.dark'
              }
            }}
          >
            Issue by GR Number
          </Button>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={fetchRequests}
            disabled={loading}
          >
            Refresh
          </Button>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Paper elevation={3} sx={{ mt: 2 }}>
        <TableContainer sx={{ maxHeight: '70vh' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'primary.main' }}>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', minWidth: 200 }}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <BookIcon fontSize="small" />
                    Book Details
                  </Box>
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', minWidth: 180 }}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <PersonIcon fontSize="small" />
                    Student Details
                  </Box>
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', minWidth: 120 }}>Request Date</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', minWidth: 100 }}>Status</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', minWidth: 200 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                    <Typography variant="h6" color="textSecondary">
                      No pending requests found
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      All requests have been processed or no new requests are available
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                requests.map((request) => (
                  <TableRow key={request._id} hover sx={{ height: 80 }}>
                    <TableCell sx={{ py: 2 }}>
                      <Box>
                        <Typography fontWeight="bold" variant="body1">
                          {request.book?.bookTitle || 'N/A'}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          by {request.book?.author || 'Unknown'}
                        </Typography>
                        {request.book?.isbn && (
                          <Typography variant="caption" color="textSecondary">
                            ISBN: {request.book.isbn}
                          </Typography>
                        )}
                        {request.book?.category && (
                          <Chip 
                            label={request.book.category} 
                            size="small" 
                            variant="outlined"
                            sx={{ ml: 1, fontSize: '0.7rem' }}
                          />
                        )}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ py: 2 }}>
                      <Box>
                        <Typography fontWeight="bold">
                          {request.user?.name || 'N/A'}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          GR: {request.user?.studentDetails?.grNumber || 'N/A'}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Class: {request.user?.studentDetails?.class?.name || 'N/A'}
                        </Typography>
                        {request.user?.email && (
                          <Typography variant="caption" color="textSecondary">
                            {request.user.email}
                          </Typography>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ py: 2 }}>
                      <Typography variant="body2">
                        {formatDate(request.createdAt || request.issueDate)}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ py: 2 }}>
                      <Chip
                        label={request.status.toUpperCase()}
                        color={getStatusColor(request.status)}
                        variant="filled"
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box display="flex" gap={1} flexWrap="wrap" py={1}>
                        <Tooltip title="View Book Details">
                          <IconButton 
                            onClick={() => router.push(`/library/books/${request.book._id}`)}
                            color="info"
                            size="small"
                            sx={{ mb: 0.5 }}
                          >
                            <ViewIcon />
                          </IconButton>
                        </Tooltip>
                        
                        {(request.status === 'requested' || request.status === 'reserved') && (
                          <>
                            <Tooltip title="Approve Request">
                              <IconButton 
                                onClick={() => handleApprove(request)}
                                color="success"
                                size="small"
                                sx={{ mb: 0.5 }}
                              >
                                <ApproveIcon />
                              </IconButton>
                            </Tooltip>
                            
                            <Tooltip title="Issue by GR Number">
                              <IconButton 
                                onClick={() => handleDirectIssue(request.book)}
                                color="primary"
                                size="small"
                                sx={{ 
                                  mb: 0.5,
                                  backgroundColor: 'primary.light',
                                  '&:hover': {
                                    backgroundColor: 'primary.main',
                                    color: 'white'
                                  }
                                }}
                              >
                                <BadgeIcon />
                              </IconButton>
                            </Tooltip>
                            
                            <Tooltip title="Reject Request">
                              <IconButton 
                                onClick={() => handleReject(request)}
                                color="error"
                                size="small"
                                sx={{ mb: 0.5 }}
                              >
                                <RejectIcon />
                              </IconButton>
                            </Tooltip>
                          </>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Approve Dialog */}
      <Dialog 
        open={approveDialogOpen} 
        onClose={() => setApproveDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6" fontWeight="bold">
            Approve Book Issue Request
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box mb={3}>
            <Typography variant="body1" gutterBottom>
              Issue <strong>"{selectedRequest?.book?.bookTitle}"</strong> to{' '}
              <strong>{selectedRequest?.user?.name}</strong>
              {selectedRequest?.user?.studentDetails?.grNumber && (
                <> (GR: {selectedRequest.user.studentDetails.grNumber})</>
              )}?
            </Typography>
          </Box>

          <FormControl component="fieldset" sx={{ mb: 3 }}>
            <FormLabel component="legend">Issue Method</FormLabel>
            <RadioGroup
              value={issueMethod}
              onChange={(e) => setIssueMethod(e.target.value)}
              row
            >
              <FormControlLabel 
                value="request" 
                control={<Radio />} 
                label="Process Request" 
              />
              <FormControlLabel 
                value="direct" 
                control={<Radio />} 
                label="Direct Issue by GR" 
              />
            </RadioGroup>
          </FormControl>

          {issueMethod === 'direct' && (
            <Box mb={3}>
              <Divider sx={{ mb: 2 }} />
              <TextField
                fullWidth
                label="Student GR Number"
                value={grNumber}
                onChange={(e) => setGrNumber(e.target.value)}
                placeholder="Enter student's GR number"
                required
                sx={{ mb: 2 }}
              />
              <Alert severity="info" sx={{ mb: 2 }}>
                This will issue the book directly to the student with the provided GR number, 
                regardless of the original request.
              </Alert>
            </Box>
          )}

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Loan Period (Days)</InputLabel>
                <Select
                  value={loanPeriodDays}
                  onChange={(e) => handleLoanPeriodChange(e.target.value)}
                  label="Loan Period (Days)"
                >
                  <MenuItem value={7}>7 Days</MenuItem>
                  <MenuItem value={14}>14 Days</MenuItem>
                  <MenuItem value={21}>21 Days</MenuItem>
                  <MenuItem value={30}>30 Days</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Fine Per Day (₹)"
                type="number"
                value={finePerDay}
                onChange={(e) => setFinePerDay(e.target.value)}
                inputProps={{ min: 0, max: 100, step: 0.5 }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Due Date"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Remarks (Optional)"
                multiline
                rows={2}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Any additional notes..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setApproveDialogOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={confirmApprove}
            color="primary"
            variant="contained"
            disabled={processing || !dueDate || (issueMethod === 'direct' && !grNumber.trim())}
            startIcon={processing ? <CircularProgress size={20} /> : <ApproveIcon />}
          >
            {processing ? 'Processing...' : 'Issue Book'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Direct Issue Dialog */}
      <Dialog 
        open={directIssueDialogOpen} 
        onClose={() => setDirectIssueDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6" fontWeight="bold">
            Issue Book by GR Number
          </Typography>
        </DialogTitle>
        <DialogContent>
          {!selectedBook ? (
            <>
              <Box mb={3}>
                <Typography variant="body1" gutterBottom>
                  Search and select a book to issue:
                </Typography>
              </Box>

              <TextField
                fullWidth
                label="Search Books"
                value={bookSearchQuery}
                onChange={(e) => handleBookSearch(e.target.value)}
                placeholder="Enter book title, author, or ISBN..."
                sx={{ mb: 2 }}
                InputProps={{
                  endAdornment: bookSearchLoading && <CircularProgress size={20} />
                }}
              />

              {searchedBooks.length > 0 && (
                <Box sx={{ maxHeight: 200, overflowY: 'auto', mb: 3 }}>
                  {searchedBooks.map((book) => (
                    <Paper
                      key={book._id}
                      sx={{
                        p: 2,
                        mb: 1,
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: 'grey.100'
                        }
                      }}
                      onClick={() => handleBookSelect(book)}
                    >
                      <Typography fontWeight="bold">
                        {book.bookTitle}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        by {book.author} • Available: {book.availableCopies}
                      </Typography>
                    </Paper>
                  ))}
                </Box>
              )}
            </>
          ) : (
            <>
              <Box mb={3}>
                <Typography variant="body1" gutterBottom>
                  Issue <strong>"{selectedBook?.bookTitle}"</strong> by{' '}
                  <strong>{selectedBook?.author}</strong>
                </Typography>
                <Button 
                  size="small" 
                  onClick={() => {
                    setSelectedBook(null);
                    setBookSearchQuery('');
                  }}
                >
                  Change Book
                </Button>
              </Box>

              <TextField
                fullWidth
                label="Student GR Number"
                value={grNumber}
                onChange={(e) => setGrNumber(e.target.value)}
                placeholder="Enter student's GR number"
                required
                sx={{ mb: 3 }}
              />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Loan Period (Days)</InputLabel>
                    <Select
                      value={loanPeriodDays}
                      onChange={(e) => handleLoanPeriodChange(e.target.value)}
                      label="Loan Period (Days)"
                    >
                      <MenuItem value={7}>7 Days</MenuItem>
                      <MenuItem value={14}>14 Days</MenuItem>
                      <MenuItem value={21}>21 Days</MenuItem>
                      <MenuItem value={30}>30 Days</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Fine Per Day (₹)"
                    type="number"
                    value={finePerDay}
                    onChange={(e) => setFinePerDay(e.target.value)}
                    inputProps={{ min: 0, max: 100, step: 0.5 }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Due Date"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Remarks (Optional)"
                    multiline
                    rows={2}
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    placeholder="Any additional notes..."
                  />
                </Grid>
              </Grid>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDirectIssueDialogOpen(false)}>
            Cancel
          </Button>
          {selectedBook && (
            <Button 
              onClick={confirmDirectIssue}
              color="primary"
              variant="contained"
              disabled={processing || !dueDate || !grNumber.trim()}
              startIcon={processing ? <CircularProgress size={20} /> : <ApproveIcon />}
            >
              {processing ? 'Processing...' : 'Issue Book'}
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog 
        open={rejectDialogOpen} 
        onClose={() => setRejectDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6" fontWeight="bold" color="error">
            Reject Book Request
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box mb={3}>
            <Typography variant="body1" gutterBottom>
              Reject request for <strong>"{selectedRequest?.book?.bookTitle}"</strong> by{' '}
              <strong>{selectedRequest?.user?.name}</strong>
              {selectedRequest?.user?.studentDetails?.grNumber && (
                <> (GR: {selectedRequest.user.studentDetails.grNumber})</>
              )}?
            </Typography>
          </Box>
          
          <TextField
            fullWidth
            label="Rejection Reason"
            multiline
            rows={4}
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="Please provide a reason for rejection..."
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRejectDialogOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={confirmReject}
            color="error"
            variant="contained"
            disabled={processing || !remarks.trim()}
            startIcon={processing ? <CircularProgress size={20} /> : <RejectIcon />}
          >
            {processing ? 'Processing...' : 'Reject Request'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </LibraryLayout>
  );
};

export default IssueRequests;