// import { useState, useEffect } from 'react';
// import { 
//   Box, 
//   Typography, 
//   Grid, 
//   Card, 
//   CardContent, 
//   Divider, 
//   LinearProgress,
//   Tabs,
//   Tab,
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
//   TextField
// } from '@mui/material';
// import { 
//   CheckCircle as VerifiedIcon,
//   Pending as PendingIcon,
//   Receipt as ReceiptIcon,
//   Close as CloseIcon
// } from '@mui/icons-material';
// import FeesManagerLayout from '../../components/layout/FeesManagerLayout';
// import feesService from '../../services/feesService';
// import { useAuth } from '../../contexts/AuthContext';

// const Payments = () => {
//   const { school } = useAuth();
//   const [tabValue, setTabValue] = useState(0);
//   const [payments, setPayments] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [selectedPayment, setSelectedPayment] = useState(null);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [verificationData, setVerificationData] = useState({
//     transactionId: '',
//     amount: '',
//     notes: ''
//   });

//   useEffect(() => {
//     const fetchPayments = async () => {
//       try {
//         setLoading(true);
//         const response = await feesService.getPendingPayments();
//         setPayments(response.payments);
//       } catch (err) {
//         console.error('Error fetching payments:', err);
//         setError('Failed to load payments');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPayments();
//   }, []);

//   const handleTabChange = (event, newValue) => {
//     setTabValue(newValue);
//   };

//   const handleOpenDialog = (payment) => {
//     setSelectedPayment(payment);
//     setVerificationData({
//       transactionId: payment.transactionId || '',
//       amount: payment.amount,
//       notes: ''
//     });
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setSelectedPayment(null);
//   };

//   const handleVerifyPayment = async () => {
//     try {
//       setLoading(true);
//       await feesService.verifyPayment({
//         paymentId: selectedPayment.paymentId,
//         ...verificationData
//       });
//       // Refresh payments after verification
//       const response = await feesService.getPendingPayments();
//       setPayments(response.payments);
//       handleCloseDialog();
//     } catch (err) {
//       console.error('Error verifying payment:', err);
//       setError('Failed to verify payment');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setVerificationData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   return (
//     <FeesManagerLayout>
//       <Box sx={{ mb: 4 }}>
//         <Typography variant="h4" component="h1" gutterBottom>
//           Payments Management
//         </Typography>
//         <Typography variant="subtitle1" color="text.secondary">
//           {school?.name || 'School'} - Manage and verify payments
//         </Typography>
//       </Box>
      
//       <Divider sx={{ my: 3 }} />
      
//       <Box sx={{ mb: 4 }}>
//         <Tabs value={tabValue} onChange={handleTabChange}>
//           <Tab label="Pending Verification" icon={<PendingIcon />} iconPosition="start" />
//           <Tab label="Verified Payments" icon={<VerifiedIcon />} iconPosition="start" />
//         </Tabs>
//       </Box>
      
//       {loading ? (
//         <LinearProgress />
//       ) : error ? (
//         <Typography color="error">{error}</Typography>
//       ) : (
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Payment ID</TableCell>
//                 <TableCell>Student</TableCell>
//                 <TableCell>GR Number</TableCell>
//                 <TableCell align="right">Amount</TableCell>
//                 <TableCell>Method</TableCell>
//                 <TableCell>Status</TableCell>
//                 <TableCell>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {payments.map((payment) => (
//                 <TableRow key={payment.paymentId}>
//                   <TableCell>{payment.paymentId.substring(0, 8)}...</TableCell>
//                   <TableCell>{payment.student.name}</TableCell>
//                   <TableCell>{payment.student.grNumber}</TableCell>
//                   <TableCell align="right">₹{payment.amount.toLocaleString()}</TableCell>
//                   <TableCell>
//                     <Chip 
//                       label={payment.paymentMethod} 
//                       size="small" 
//                       color={
//                         payment.paymentMethod === 'cash' ? 'default' : 
//                         payment.paymentMethod === 'bank_account' ? 'primary' : 'secondary'
//                       }
//                     />
//                   </TableCell>
//                   <TableCell>
//                     <Chip 
//                       label={payment.status} 
//                       size="small" 
//                       color={payment.status === 'pending' ? 'warning' : 'success'}
//                       icon={payment.status === 'pending' ? <PendingIcon /> : <VerifiedIcon />}
//                     />
//                   </TableCell>
//                   <TableCell>
//                     <Button 
//                       size="small" 
//                       startIcon={<ReceiptIcon />}
//                       onClick={() => console.log('View receipt', payment.paymentId)}
//                       sx={{ mr: 1 }}
//                     >
//                       Receipt
//                     </Button>
//                     {payment.status === 'pending' && (
//                       <Button 
//                         size="small" 
//                         color="primary"
//                         onClick={() => handleOpenDialog(payment)}
//                       >
//                         Verify
//                       </Button>
//                     )}
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}
      
//       {/* Verification Dialog */}
//       <Dialog open={openDialog} onClose={handleCloseDialog}>
//         <DialogTitle>Verify Payment</DialogTitle>
//         <DialogContent>
//           <Box sx={{ mb: 2 }}>
//             <Typography variant="subtitle1">
//               Student: {selectedPayment?.student.name}
//             </Typography>
//             <Typography variant="subtitle1">
//               GR Number: {selectedPayment?.student.grNumber}
//             </Typography>
//             <Typography variant="subtitle1">
//               Amount: ₹{selectedPayment?.amount}
//             </Typography>
//           </Box>
          
//           <TextField
//             fullWidth
//             label="Transaction ID"
//             name="transactionId"
//             value={verificationData.transactionId}
//             onChange={handleInputChange}
//             margin="normal"
//           />
          
//           <TextField
//             fullWidth
//             label="Amount"
//             name="amount"
//             type="number"
//             value={verificationData.amount}
//             onChange={handleInputChange}
//             margin="normal"
//           />
          
//           <TextField
//             fullWidth
//             label="Notes"
//             name="notes"
//             value={verificationData.notes}
//             onChange={handleInputChange}
//             margin="normal"
//             multiline
//             rows={3}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button 
//             onClick={handleCloseDialog} 
//             startIcon={<CloseIcon />}
//             color="error"
//           >
//             Cancel
//           </Button>
//           <Button 
//             onClick={handleVerifyPayment} 
//             startIcon={<VerifiedIcon />}
//             color="primary"
//             variant="contained"
//             disabled={loading}
//           >
//             Verify Payment
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </FeesManagerLayout>
//   );
// };

// export default Payments;





// import { useState, useEffect } from 'react';
// import { 
//   Box, 
//   Typography, 
//   Grid, 
//   Card, 
//   CardContent, 
//   Divider, 
//   LinearProgress,
//   Tabs,
//   Tab,
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
//   Alert,
//   CircularProgress
// } from '@mui/material';
// import { 
//   CheckCircle as VerifiedIcon,
//   Pending as PendingIcon,
//   Receipt as ReceiptIcon,
//   Close as CloseIcon
// } from '@mui/icons-material';
// import FeesManagerLayout from '../../components/layout/FeesManagerLayout';
// import feesService from '../../services/feesService';
// import { useAuth } from '../../contexts/AuthContext';

// const Payments = () => {
//   const { school } = useAuth();
//   const [tabValue, setTabValue] = useState(0);
//   const [payments, setPayments] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [selectedPayment, setSelectedPayment] = useState(null);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [verificationData, setVerificationData] = useState({
//     transactionId: '',
//     amount: '',
//     notes: ''
//   });
//   const [verifying, setVerifying] = useState(false);

//   useEffect(() => {
//     const fetchPayments = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const response = await feesService.getPendingPayments();
//         if (response.data && response.data.payments) {
//           setPayments(response.data.payments);
//         } else {
//           setPayments([]);
//         }
//       } catch (err) {
//         console.error('Error fetching payments:', err);
//         setError(err.response?.data?.message || 'Failed to load payments');
//         setPayments([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPayments();
//   }, []);

//   const handleTabChange = (event, newValue) => {
//     setTabValue(newValue);
//   };

//   const handleOpenDialog = (payment) => {
//     setSelectedPayment(payment);
//     setVerificationData({
//       transactionId: payment.transactionId || '',
//       amount: payment.amount,
//       notes: ''
//     });
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setSelectedPayment(null);
//   };

//   const handleVerifyPayment = async () => {
//     try {
//       setVerifying(true);
//       const response = await feesService.verifyPayment({
//         paymentId: selectedPayment.paymentId,
//         ...verificationData
//       });
      
//       if (response.data) {
//         // Refresh payments after verification
//         const updatedPayments = await feesService.getPendingPayments();
//         if (updatedPayments.data && updatedPayments.data.payments) {
//           setPayments(updatedPayments.data.payments);
//         }
//         handleCloseDialog();
//       }
//     } catch (err) {
//       console.error('Error verifying payment:', err);
//       setError(err.response?.data?.message || 'Failed to verify payment');
//     } finally {
//       setVerifying(false);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setVerificationData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   return (
//     <FeesManagerLayout>
//       <Box sx={{ mb: 4 }}>
//         <Typography variant="h4" component="h1" gutterBottom>
//           Payments Management
//         </Typography>
//         <Typography variant="subtitle1" color="text.secondary">
//           {school?.name || 'School'} - Manage and verify payments
//         </Typography>
//       </Box>
      
//       <Divider sx={{ my: 3 }} />
      
//       {error && (
//         <Alert severity="error" sx={{ mb: 3 }}>
//           {error}
//         </Alert>
//       )}
      
//       <Box sx={{ mb: 4 }}>
//         <Tabs value={tabValue} onChange={handleTabChange}>
//           <Tab label="Pending Verification" icon={<PendingIcon />} iconPosition="start" />
//           <Tab label="Verified Payments" icon={<VerifiedIcon />} iconPosition="start" />
//         </Tabs>
//       </Box>
      
//       {loading ? (
//         <LinearProgress />
//       ) : payments.length === 0 ? (
//         <Card>
//           <CardContent>
//             <Typography color="text.secondary" align="center">
//               No payments found
//             </Typography>
//           </CardContent>
//         </Card>
//       ) : (
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Payment ID</TableCell>
//                 <TableCell>Student</TableCell>
//                 <TableCell>GR Number</TableCell>
//                 <TableCell align="right">Amount</TableCell>
//                 <TableCell>Method</TableCell>
//                 <TableCell>Status</TableCell>
//                 <TableCell>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {payments.map((payment) => (
//                 <TableRow key={payment.paymentId}>
//                   <TableCell>{payment.paymentId?.substring(0, 8)}...</TableCell>
//                   <TableCell>{payment.student?.name || 'N/A'}</TableCell>
//                   <TableCell>{payment.student?.grNumber || 'N/A'}</TableCell>
//                   <TableCell align="right">₹{payment.amount?.toLocaleString() || '0'}</TableCell>
//                   <TableCell>
//                     <Chip 
//                       label={payment.paymentMethod || 'unknown'} 
//                       size="small" 
//                       color={
//                         payment.paymentMethod === 'cash' ? 'default' : 
//                         payment.paymentMethod === 'bank_account' ? 'primary' : 'secondary'
//                       }
//                     />
//                   </TableCell>
//                   <TableCell>
//                     <Chip 
//                       label={payment.status || 'pending'} 
//                       size="small" 
//                       color={payment.status === 'pending' ? 'warning' : 'success'}
//                       icon={payment.status === 'pending' ? <PendingIcon /> : <VerifiedIcon />}
//                     />
//                   </TableCell>
//                   <TableCell>
//                     <Button 
//                       size="small" 
//                       startIcon={<ReceiptIcon />}
//                       onClick={() => console.log('View receipt', payment.paymentId)}
//                       sx={{ mr: 1 }}
//                     >
//                       Receipt
//                     </Button>
//                     {payment.status === 'pending' && (
//                       <Button 
//                         size="small" 
//                         color="primary"
//                         onClick={() => handleOpenDialog(payment)}
//                       >
//                         Verify
//                       </Button>
//                     )}
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}
      
//       {/* Verification Dialog */}
//       <Dialog open={openDialog} onClose={handleCloseDialog}>
//         <DialogTitle>Verify Payment</DialogTitle>
//         <DialogContent>
//           <Box sx={{ mb: 2 }}>
//             <Typography variant="subtitle1">
//               Student: {selectedPayment?.student?.name || 'N/A'}
//             </Typography>
//             <Typography variant="subtitle1">
//               GR Number: {selectedPayment?.student?.grNumber || 'N/A'}
//             </Typography>
//             <Typography variant="subtitle1">
//               Amount: ₹{selectedPayment?.amount?.toLocaleString() || '0'}
//             </Typography>
//           </Box>
          
//           <TextField
//             fullWidth
//             label="Transaction ID"
//             name="transactionId"
//             value={verificationData.transactionId}
//             onChange={handleInputChange}
//             margin="normal"
//             required
//           />
          
//           <TextField
//             fullWidth
//             label="Amount"
//             name="amount"
//             type="number"
//             value={verificationData.amount}
//             onChange={handleInputChange}
//             margin="normal"
//             required
//           />
          
//           <TextField
//             fullWidth
//             label="Notes"
//             name="notes"
//             value={verificationData.notes}
//             onChange={handleInputChange}
//             margin="normal"
//             multiline
//             rows={3}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button 
//             onClick={handleCloseDialog} 
//             startIcon={<CloseIcon />}
//             color="error"
//             disabled={verifying}
//           >
//             Cancel
//           </Button>
//           <Button 
//             onClick={handleVerifyPayment} 
//             startIcon={verifying ? <CircularProgress size={20} /> : <VerifiedIcon />}
//             color="primary"
//             variant="contained"
//             disabled={verifying || !verificationData.transactionId || !verificationData.amount}
//           >
//             {verifying ? 'Verifying...' : 'Verify Payment'}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </FeesManagerLayout>
//   );
// };

// export default Payments;




// import { useState, useEffect } from 'react';
// import { 
//   Box, 
//   Typography, 
//   Grid, 
//   Card, 
//   CardContent, 
//   Divider, 
//   LinearProgress,
//   Tabs,
//   Tab,
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
//   Alert,
//   CircularProgress,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Avatar,
//   Tooltip
// } from '@mui/material';
// import { 
//   CheckCircle as VerifiedIcon,
//   Pending as PendingIcon,
//   Receipt as ReceiptIcon,
//   Close as CloseIcon,
//   CloudUpload as UploadIcon,
//   ExpandMore as ExpandMoreIcon,
//   School as SchoolIcon,
//   Computer as ComputerIcon,
//   DirectionsBus as TransportIcon,
//   MenuBook as ExamIcon,
//   Class as ClassroomIcon,
//   School as EducationalIcon,
//   LocalLibrary as LibraryIcon,
//   Sports as SportIcon,
//   Person as PersonIcon
// } from '@mui/icons-material';
// import FeesManagerLayout from '../../components/layout/FeesManagerLayout';
// import feesService from '../../services/feesService';
// import { useAuth } from '../../contexts/AuthContext';

// const Payments = () => {
//   const { school } = useAuth();
//   const [tabValue, setTabValue] = useState(0);
//   const [payments, setPayments] = useState([]);
//   const [feeData, setFeeData] = useState([]);
//   const [classes, setClasses] = useState([]);
//   const [selectedClass, setSelectedClass] = useState('');
//   const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [selectedPayment, setSelectedPayment] = useState(null);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [verificationData, setVerificationData] = useState({
//     paymentMethod: '',
//     razorpay_payment_id: '',
//     razorpay_order_id: '',
//     razorpay_signature: '',
//     stripe_payment_intent_id: '',
//     proofOfPayment: null
//   });
//   const [verifying, setVerifying] = useState(false);

//   const months = [
//     { value: 1, label: 'January' },
//     { value: 2, label: 'February' },
//     { value: 3, label: 'March' },
//     { value: 4, label: 'April' },
//     { value: 5, label: 'May' },
//     { value: 6, label: 'June' },
//     { value: 7, label: 'July' },
//     { value: 8, label: 'August' },
//     { value: 9, label: 'September' },
//     { value: 10, label: 'October' },
//     { value: 11, label: 'November' },
//     { value: 12, label: 'December' }
//   ];

//   const currentYear = new Date().getFullYear();
//   const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);

//   useEffect(() => {
//     if (tabValue === 0) {
//       fetchClasses();
//     } else if (tabValue === 1) {
//       fetchPayments();
//     }
//   }, [tabValue]);

//   useEffect(() => {
//     if (tabValue === 0 && selectedClass && selectedMonth && selectedYear) {
//       fetchFeesByClassAndMonth();
//     }
//   }, [selectedClass, selectedMonth, selectedYear, tabValue]);

  // const fetchClasses = async () => {
  //   try {
  //     const response = await feesService.getClassesForFees();
  //     if (response && response.classes) {
  //       setClasses(response.classes);
  //       if (response.classes.length > 0 && !selectedClass) {
  //         setSelectedClass(response.classes[0]._id);
  //       }
  //     } else if (Array.isArray(response)) {
  //       // Handle case where response is directly an array of classes
  //       setClasses(response);
  //       if (response.length > 0 && !selectedClass) {
  //         setSelectedClass(response[0]._id);
  //       }
  //     }
  //   } catch (err) {
  //     console.error('Error fetching classes:', err);
  //     setError('Failed to load classes');
  //   }
  // };

//   const fetchFeesByClassAndMonth = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await feesService.getFeesByClassAndMonth(selectedClass, selectedMonth, selectedYear);
      
//       if (Array.isArray(response)) {
//         setFeeData(response);
//       } else {
//         setFeeData([]);
//       }
//     } catch (err) {
//       console.error('Error fetching fees by class and month:', err);
//       setError(err.message || 'Failed to load fee data');
//       setFeeData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchPayments = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await feesService.getPendingPayments();
      
//       if (response && response.payments) {
//         setPayments(response.payments);
//       } else {
//         setPayments([]);
//       }
//     } catch (err) {
//       console.error('Error fetching payments:', err);
//       setError(err.message || 'Failed to load payments');
//       setPayments([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleTabChange = (event, newValue) => {
//     setTabValue(newValue);
//   };

//   const handleClassChange = (event) => {
//     setSelectedClass(event.target.value);
//   };

//   const handleMonthChange = (event) => {
//     setSelectedMonth(event.target.value);
//   };

//   const handleYearChange = (event) => {
//     setSelectedYear(event.target.value);
//   };

//   const handleOpenDialog = (payment) => {
//     setSelectedPayment(payment);
//     setVerificationData({
//       paymentMethod: '',
//       razorpay_payment_id: '',
//       razorpay_order_id: payment.orderId || '',
//       razorpay_signature: '',
//       stripe_payment_intent_id: '',
//       proofOfPayment: null
//     });
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setSelectedPayment(null);
//     setVerificationData({
//       paymentMethod: '',
//       razorpay_payment_id: '',
//       razorpay_order_id: '',
//       razorpay_signature: '',
//       stripe_payment_intent_id: '',
//       proofOfPayment: null
//     });
//   };

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setVerificationData(prev => ({
//           ...prev,
//           proofOfPayment: {
//             url: e.target.result,
//             transactionId: '',
//             amount: selectedPayment?.amount || 0,
//             mimeType: file.type,
//             size: file.size,
//             uploadedAt: new Date().toISOString()
//           }
//         }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleVerifyPayment = async () => {
//     try {
//       setVerifying(true);
//       setError(null);

//       const payload = {
//         paymentId: selectedPayment.paymentId,
//         paymentMethod: verificationData.paymentMethod,
//         ...verificationData
//       };

//       if (verificationData.paymentMethod !== 'razorpay') {
//         delete payload.razorpay_payment_id;
//         delete payload.razorpay_order_id;
//         delete payload.razorpay_signature;
//       }
//       if (verificationData.paymentMethod !== 'stripe') {
//         delete payload.stripe_payment_intent_id;
//       }
//       if (!['bank_account', 'upi'].includes(verificationData.paymentMethod)) {
//         delete payload.proofOfPayment;
//       }

//       const response = await feesService.verifyPayment(payload);
      
//       if (response.success) {
//         await fetchPayments();
//         handleCloseDialog();
//       } else {
//         setError(response.error || 'Failed to verify payment');
//       }
//     } catch (err) {
//       console.error('Error verifying payment:', err);
//       setError(err.message || 'Failed to verify payment');
//     } finally {
//       setVerifying(false);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setVerificationData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleProofInputChange = (field, value) => {
//     setVerificationData(prev => ({
//       ...prev,
//       proofOfPayment: {
//         ...prev.proofOfPayment,
//         [field]: value
//       }
//     }));
//   };

//   const getFeeTypeIcon = (type) => {
//     const iconMap = {
//       school: <SchoolIcon />,
//       computer: <ComputerIcon />,
//       transportation: <TransportIcon />,
//       examination: <ExamIcon />,
//       classroom: <ClassroomIcon />,
//       educational: <EducationalIcon />,
//       library: <LibraryIcon />,
//       sport: <SportIcon />
//     };
//     return iconMap[type] || <SchoolIcon />;
//   };

//   const getFeeStatusColor = (status) => {
//     switch (status) {
//       case 'paid': return 'success';
//       case 'partially_paid': return 'warning';
//       case 'pending': return 'error';
//       default: return 'default';
//     }
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     return new Date(dateString).toLocaleDateString('en-IN', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const isVerificationValid = () => {
//     if (!verificationData.paymentMethod) return false;
    
//     switch (verificationData.paymentMethod) {
//       case 'razorpay':
//         return verificationData.razorpay_payment_id && 
//                verificationData.razorpay_order_id && 
//                verificationData.razorpay_signature;
//       case 'stripe':
//         return verificationData.stripe_payment_intent_id;
//       case 'bank_account':
//       case 'upi':
//         return verificationData.proofOfPayment && 
//                verificationData.proofOfPayment.url && 
//                verificationData.proofOfPayment.transactionId;
//       default:
//         return false;
//     }
//   };

//   const renderFeesByClass = () => (
//     <Box>
//       {/* Filters */}
//       <Card sx={{ mb: 3 }}>
//         <CardContent>
//           <Typography variant="h6" gutterBottom>
//             Filter Fees
//           </Typography>
//           <Grid container spacing={2}>
//             <Grid item xs={12} md={4}>
//               <FormControl fullWidth>
//                 <InputLabel>Select Class</InputLabel>
//                 <Select
//                   value={selectedClass}
//                   onChange={handleClassChange}
//                   label="Select Class"
//                 >
//                   {classes.map((cls) => (
//                     <MenuItem key={cls._id} value={cls._id}>
//                       {cls.name} - {cls.division}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <FormControl fullWidth>
//                 <InputLabel>Month</InputLabel>
//                 <Select
//                   value={selectedMonth}
//                   onChange={handleMonthChange}
//                   label="Month"
//                 >
//                   {months.map((month) => (
//                     <MenuItem key={month.value} value={month.value}>
//                       {month.label}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <FormControl fullWidth>
//                 <InputLabel>Year</InputLabel>
//                 <Select
//                   value={selectedYear}
//                   onChange={handleYearChange}
//                   label="Year"
//                 >
//                   {years.map((year) => (
//                     <MenuItem key={year} value={year}>
//                       {year}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//           </Grid>
//         </CardContent>
//       </Card>

//       {/* Fee Data */}
//       {loading ? (
//         <LinearProgress />
//       ) : feeData.length === 0 ? (
//         <Card>
//           <CardContent>
//             <Typography color="text.secondary" align="center">
//               No fee data found for the selected class and month
//             </Typography>
//           </CardContent>
//         </Card>
//       ) : (
//         <Box>
//           {feeData.map((student) => (
//             <Accordion key={student.studentId} sx={{ mb: 2 }}>
//               <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
//                   <Avatar sx={{ bgcolor: student.allPaid ? 'success.main' : 'warning.main' }}>
//                     <PersonIcon />
//                   </Avatar>
//                   <Box sx={{ flexGrow: 1 }}>
//                     <Typography variant="h6">
//                       {student.name}
//                       {student.isRTE && (
//                         <Chip label="RTE" size="small" color="info" sx={{ ml: 1 }} />
//                       )}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       GR: {student.grNumber} | Class: {student.class?.name} - {student.class?.division}
//                     </Typography>
//                   </Box>
//                   <Box sx={{ textAlign: 'right' }}>
//                     <Typography variant="h6" color={student.allPaid ? 'success.main' : 'error.main'}>
//                       ₹{student.totalPending?.toLocaleString() || 0}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       Pending
//                     </Typography>
//                   </Box>
//                   <Box sx={{ textAlign: 'right' }}>
//                     <Typography variant="body1">
//                       ₹{student.total?.toLocaleString() || 0}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       Total
//                     </Typography>
//                   </Box>
//                 </Box>
//               </AccordionSummary>
//               <AccordionDetails>
//                 {student.isRTE ? (
//                   <Alert severity="info">
//                     This student is under RTE (Right to Education) and is exempted from fees.
//                   </Alert>
//                 ) : (
//                   <TableContainer component={Paper} variant="outlined">
//                     <Table size="small">
//                       <TableHead>
//                         <TableRow>
//                           <TableCell>Fee Type</TableCell>
//                           <TableCell align="right">Amount</TableCell>
//                           <TableCell align="right">Paid</TableCell>
//                           <TableCell align="right">Remaining</TableCell>
//                           <TableCell>Status</TableCell>
//                           <TableCell>Due Date</TableCell>
//                           <TableCell>Paid Date</TableCell>
//                         </TableRow>
//                       </TableHead>
//                       <TableBody>
//                         {Object.entries(student.fees || {}).map(([feeType, feeInfo]) => (
//                           <TableRow key={feeType}>
//                             <TableCell>
//                               <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                                 {getFeeTypeIcon(feeType)}
//                                 <Box>
//                                   <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
//                                     {feeType.replace('_', ' ')}
//                                   </Typography>
//                                   {feeInfo.transportationSlab && (
//                                     <Typography variant="caption" color="text.secondary">
//                                       {feeInfo.transportationSlab}
//                                     </Typography>
//                                   )}
//                                 </Box>
//                               </Box>
//                             </TableCell>
//                             <TableCell align="right">₹{feeInfo.amount?.toLocaleString() || 0}</TableCell>
//                             <TableCell align="right">₹{feeInfo.paidAmount?.toLocaleString() || 0}</TableCell>
//                             <TableCell align="right">₹{feeInfo.remainingAmount?.toLocaleString() || 0}</TableCell>
//                             <TableCell>
//                               <Chip 
//                                 label={feeInfo.status} 
//                                 size="small" 
//                                 color={getFeeStatusColor(feeInfo.status)}
//                                 sx={{ textTransform: 'capitalize' }}
//                               />
//                             </TableCell>
//                             <TableCell>
//                               {feeInfo.dueDate ? formatDate(feeInfo.dueDate) : 'N/A'}
//                             </TableCell>
//                             <TableCell>
//                               {feeInfo.paidDate ? formatDate(feeInfo.paidDate) : 'N/A'}
//                             </TableCell>
//                           </TableRow>
//                         ))}
//                       </TableBody>
//                     </Table>
//                   </TableContainer>
//                 )}
//               </AccordionDetails>
//             </Accordion>
//           ))}
//         </Box>
//       )}
//     </Box>
//   );

//   const renderPaymentsManagement = () => (
//     <Box>
//       {payments.length === 0 ? (
//         <Card>
//           <CardContent>
//             <Typography color="text.secondary" align="center">
//               No pending payments found
//             </Typography>
//           </CardContent>
//         </Card>
//       ) : (
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Payment ID</TableCell>
//                 <TableCell>Order ID</TableCell>
//                 <TableCell>Student</TableCell>
//                 <TableCell>GR Number</TableCell>
//                 <TableCell align="right">Amount</TableCell>
//                 <TableCell>Fees Paid</TableCell>
//                 <TableCell>Created At</TableCell>
//                 <TableCell>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {payments.map((payment) => (
//                 <TableRow key={payment.paymentId}>
//                   <TableCell>{payment.paymentId?.substring(0, 8)}...</TableCell>
//                   <TableCell>{payment.orderId || 'N/A'}</TableCell>
//                   <TableCell>{payment.student?.name || 'N/A'}</TableCell>
//                   <TableCell>{payment.student?.grNumber || 'N/A'}</TableCell>
//                   <TableCell align="right">₹{payment.amount?.toLocaleString() || '0'}</TableCell>
//                   <TableCell>
//                     <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
//                       {payment.feesPaid?.map((fee, index) => (
//                         <Chip 
//                           key={index}
//                           label={`${fee.type}${fee.transportationSlab ? ` (${fee.transportationSlab})` : ''} - ${fee.month}/${fee.year}`}
//                           size="small"
//                           variant="outlined"
//                         />
//                       )) || 'N/A'}
//                     </Box>
//                   </TableCell>
//                   <TableCell>{formatDate(payment.createdAt)}</TableCell>
//                   <TableCell>
//                     <Button 
//                       size="small" 
//                       color="primary"
//                       variant="contained"
//                       onClick={() => handleOpenDialog(payment)}
//                     >
//                       Verify Payment
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}
//     </Box>
//   );

//   return (
//     <FeesManagerLayout>
//       <Box sx={{ mb: 4 }}>
//         <Typography variant="h4" component="h1" gutterBottom>
//           Payments Management
//         </Typography>
//         <Typography variant="subtitle1" color="text.secondary">
//           {school?.name || 'School'} - Manage fees and verify payments
//         </Typography>
//       </Box>
      
//       <Divider sx={{ my: 3 }} />
      
//       {error && (
//         <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
//           {error}
//         </Alert>
//       )}
      
//       <Box sx={{ mb: 4 }}>
//         <Tabs value={tabValue} onChange={handleTabChange}>
//           <Tab label="Fees by Class" icon={<SchoolIcon />} iconPosition="start" />
//           <Tab label="Pending Payments" icon={<PendingIcon />} iconPosition="start" />
//         </Tabs>
//       </Box>
      
//       {tabValue === 0 && renderFeesByClass()}
//       {tabValue === 1 && renderPaymentsManagement()}
      
//       {/* Verification Dialog */}
//       <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
//         <DialogTitle>Verify Payment</DialogTitle>
//         <DialogContent>
//           <Box sx={{ mb: 3 }}>
//             <Typography variant="h6" gutterBottom>Payment Details</Typography>
//             <Typography variant="body2">
//               <strong>Student:</strong> {selectedPayment?.student?.name || 'N/A'}
//             </Typography>
//             <Typography variant="body2">
//               <strong>GR Number:</strong> {selectedPayment?.student?.grNumber || 'N/A'}
//             </Typography>
//             <Typography variant="body2">
//               <strong>Amount:</strong> ₹{selectedPayment?.amount?.toLocaleString() || '0'}
//             </Typography>
//             <Typography variant="body2">
//               <strong>Order ID:</strong> {selectedPayment?.orderId || 'N/A'}
//             </Typography>
//             <Typography variant="body2">
//               <strong>Fees:</strong> {selectedPayment?.feesPaid?.map(fee => 
//                 `${fee.type} (${fee.month}/${fee.year})`
//               ).join(', ') || 'N/A'}
//             </Typography>
//           </Box>
          
//           <FormControl fullWidth margin="normal" required>
//             <InputLabel>Payment Method</InputLabel>
//             <Select
//               name="paymentMethod"
//               value={verificationData.paymentMethod}
//               onChange={handleInputChange}
//               label="Payment Method"
//             >
//               <MenuItem value="razorpay">Razorpay</MenuItem>
//               <MenuItem value="stripe">Stripe</MenuItem>
//               <MenuItem value="bank_account">Bank Account</MenuItem>
//               <MenuItem value="upi">UPI</MenuItem>
//             </Select>
//           </FormControl>

//           {verificationData.paymentMethod === 'razorpay' && (
//             <>
//               <TextField
//                 fullWidth
//                 label="Razorpay Payment ID"
//                 name="razorpay_payment_id"
//                 value={verificationData.razorpay_payment_id}
//                 onChange={handleInputChange}
//                 margin="normal"
//                 required
//               />
//               <TextField
//                 fullWidth
//                 label="Razorpay Order ID"
//                 name="razorpay_order_id"
//                 value={verificationData.razorpay_order_id}
//                 onChange={handleInputChange}
//                 margin="normal"
//                 required
//               />
//               <TextField
//                 fullWidth
//                 label="Razorpay Signature"
//                 name="razorpay_signature"
//                 value={verificationData.razorpay_signature}
//                 onChange={handleInputChange}
//                 margin="normal"
//                 required
//               />
//             </>
//           )}

//           {verificationData.paymentMethod === 'stripe' && (
//             <TextField
//               fullWidth
//               label="Stripe Payment Intent ID"
//               name="stripe_payment_intent_id"
//               value={verificationData.stripe_payment_intent_id}
//               onChange={handleInputChange}
//               margin="normal"
//               required
//             />
//           )}

//           {['bank_account', 'upi'].includes(verificationData.paymentMethod) && (
//             <Box sx={{ mt: 2 }}>
//               <Typography variant="subtitle1" gutterBottom>
//                 Proof of Payment
//               </Typography>
              
//               <input
//                 accept=".pdf,.jpg,.jpeg,.png"
//                 style={{ display: 'none' }}
//                 id="proof-upload"
//                 type="file"
//                 onChange={handleFileUpload}
//               />
//               <label htmlFor="proof-upload">
//                 <Button
//                   variant="outlined"
//                   component="span"
//                   startIcon={<UploadIcon />}
//                   sx={{ mb: 2 }}
//                 >
//                   Upload Proof of Payment
//                 </Button>
//               </label>
              
//               {verificationData.proofOfPayment && (
//                 <>
//                   <TextField
//                     fullWidth
//                     label="Transaction ID"
//                     value={verificationData.proofOfPayment.transactionId}
//                     onChange={(e) => handleProofInputChange('transactionId', e.target.value)}
//                     margin="normal"
//                     required
//                   />
//                   <TextField
//                     fullWidth
//                     label="Amount"
//                     type="number"
//                     value={verificationData.proofOfPayment.amount}
//                     onChange={(e) => handleProofInputChange('amount', parseFloat(e.target.value))}
//                     margin="normal"
//                     required
//                   />
//                   <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
//                     File uploaded: {verificationData.proofOfPayment.mimeType} 
//                     ({(verificationData.proofOfPayment.size / 1024 / 1024).toFixed(2)} MB)
//                   </Typography>
//                 </>
//               )}
//             </Box>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button 
//             onClick={handleCloseDialog} 
//             startIcon={<CloseIcon />}
//             color="error"
//             disabled={verifying}
//           >
//             Cancel
//           </Button>
//           <Button 
//             onClick={handleVerifyPayment} 
//             startIcon={verifying ? <CircularProgress size={20} /> : <VerifiedIcon />}
//             color="primary"
//             variant="contained"
//             disabled={verifying || !isVerificationValid()}
//           >
//             {verifying ? 'Verifying...' : 'Verify Payment'}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </FeesManagerLayout>
//   );
// };

// export default Payments;







import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Divider, 
  LinearProgress,
  Tabs,
  Tab,
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
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Tooltip
} from '@mui/material';
import { 
  CheckCircle as VerifiedIcon,
  Pending as PendingIcon,
  Receipt as ReceiptIcon,
  Close as CloseIcon,
  CloudUpload as UploadIcon,
  ExpandMore as ExpandMoreIcon,
  School as SchoolIcon,
  Computer as ComputerIcon,
  DirectionsBus as TransportIcon,
  MenuBook as ExamIcon,
  Class as ClassroomIcon,
  School as EducationalIcon,
  LocalLibrary as LibraryIcon,
  Sports as SportIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import FeesManagerLayout from '../../components/layout/FeesManagerLayout';
import feesService from '../../services/feesService';
import { useAuth } from '../../contexts/AuthContext';

const Payments = () => {
  const { school } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [payments, setPayments] = useState([]);
  const [feeData, setFeeData] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [verificationData, setVerificationData] = useState({
    paymentMethod: '',
    razorpay_payment_id: '',
    razorpay_order_id: '',
    razorpay_signature: '',
    stripe_payment_intent_id: '',
    proofOfPayment: null
  });
  const [verifying, setVerifying] = useState(false);

  const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' }
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);

  useEffect(() => {
    if (tabValue === 0) {
      fetchClasses();
    } else if (tabValue === 1) {
      fetchPayments();
    }
  }, [tabValue]);

  useEffect(() => {
    if (tabValue === 0 && selectedClass && selectedMonth && selectedYear) {
      fetchFeesByClassAndMonth();
    }
  }, [selectedClass, selectedMonth, selectedYear, tabValue]);

  


    const fetchClasses = async () => {
    try {
      const response = await feesService.getClassesForFees();
      if (response && response.classes) {
        setClasses(response.classes);
        if (response.classes.length > 0 && !selectedClass) {
          setSelectedClass(response.classes[0]._id);
        }
      } else if (Array.isArray(response)) {
        // Handle case where response is directly an array of classes
        setClasses(response);
        if (response.length > 0 && !selectedClass) {
          setSelectedClass(response[0]._id);
        }
      }
    } catch (err) {
      console.error('Error fetching classes:', err);
      setError('Failed to load classes');
    }
  };

  const fetchFeesByClassAndMonth = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching fees for:', { selectedClass, selectedMonth, selectedYear }); // Debug log
      
      const response = await feesService.getFeesByClassAndMonth(selectedClass, selectedMonth, selectedYear);
      console.log('Fees response:', response); // Debug log
      
      // Handle different response structures
      let feeDataArray = [];
      if (response && response.data) {
        // If response has data property
        if (Array.isArray(response.data)) {
          feeDataArray = response.data;
        } else if (response.data.feeData && Array.isArray(response.data.feeData)) {
          feeDataArray = response.data.feeData;
        }
      } else if (Array.isArray(response)) {
        // If response is directly an array
        feeDataArray = response;
      }
      
      console.log('Processed fee data:', feeDataArray); // Debug log
      setFeeData(feeDataArray);
      
    } catch (err) {
      console.error('Error fetching fees by class and month:', err);
      setError(err.response?.data?.message || err.message || 'Failed to load fee data');
      setFeeData([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchPayments = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await feesService.getPendingPayments();
      console.log('Payments response:', response); // Debug log
      
      // Handle different response structures
      let paymentsData = [];
      if (response && response.data && response.data.payments) {
        paymentsData = response.data.payments;
      } else if (response && response.payments) {
        paymentsData = response.payments;
      } else if (Array.isArray(response)) {
        paymentsData = response;
      } else if (response && response.data && Array.isArray(response.data)) {
        paymentsData = response.data;
      }
      
      setPayments(paymentsData);
    } catch (err) {
      console.error('Error fetching payments:', err);
      setError(err.response?.data?.message || err.message || 'Failed to load payments');
      setPayments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleOpenDialog = (payment) => {
    setSelectedPayment(payment);
    setVerificationData({
      paymentMethod: '',
      razorpay_payment_id: '',
      razorpay_order_id: payment.orderId || '',
      razorpay_signature: '',
      stripe_payment_intent_id: '',
      proofOfPayment: null
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPayment(null);
    setVerificationData({
      paymentMethod: '',
      razorpay_payment_id: '',
      razorpay_order_id: '',
      razorpay_signature: '',
      stripe_payment_intent_id: '',
      proofOfPayment: null
    });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setVerificationData(prev => ({
          ...prev,
          proofOfPayment: {
            url: e.target.result,
            transactionId: '',
            amount: selectedPayment?.amount || 0,
            mimeType: file.type,
            size: file.size,
            uploadedAt: new Date().toISOString()
          }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVerifyPayment = async () => {
    try {
      setVerifying(true);
      setError(null);

      const payload = {
        paymentId: selectedPayment.paymentId,
        paymentMethod: verificationData.paymentMethod,
        ...verificationData
      };

      if (verificationData.paymentMethod !== 'razorpay') {
        delete payload.razorpay_payment_id;
        delete payload.razorpay_order_id;
        delete payload.razorpay_signature;
      }
      if (verificationData.paymentMethod !== 'stripe') {
        delete payload.stripe_payment_intent_id;
      }
      if (!['bank_account', 'upi'].includes(verificationData.paymentMethod)) {
        delete payload.proofOfPayment;
      }

      const response = await feesService.verifyPayment(payload);
      console.log('Verify payment response:', response); // Debug log
      
      // Handle different response structures
      let isSuccess = false;
      if (response && response.data && response.data.success) {
        isSuccess = response.data.success;
      } else if (response && response.success) {
        isSuccess = response.success;
      } else if (response && !response.error) {
        isSuccess = true; // Assume success if no error
      }
      
      if (isSuccess) {
        await fetchPayments();
        handleCloseDialog();
      } else {
        const errorMessage = response?.data?.error || response?.error || 'Failed to verify payment';
        setError(errorMessage);
      }
    } catch (err) {
      console.error('Error verifying payment:', err);
      setError(err.response?.data?.message || err.message || 'Failed to verify payment');
    } finally {
      setVerifying(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVerificationData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProofInputChange = (field, value) => {
    setVerificationData(prev => ({
      ...prev,
      proofOfPayment: {
        ...prev.proofOfPayment,
        [field]: value
      }
    }));
  };

  const getFeeTypeIcon = (type) => {
    const iconMap = {
      school: <SchoolIcon />,
      computer: <ComputerIcon />,
      transportation: <TransportIcon />,
      examination: <ExamIcon />,
      classroom: <ClassroomIcon />,
      educational: <EducationalIcon />,
      library: <LibraryIcon />,
      sport: <SportIcon />
    };
    return iconMap[type] || <SchoolIcon />;
  };

  const getFeeStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'success';
      case 'partially_paid': return 'warning';
      case 'pending': return 'error';
      default: return 'default';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isVerificationValid = () => {
    if (!verificationData.paymentMethod) return false;
    
    switch (verificationData.paymentMethod) {
      case 'razorpay':
        return verificationData.razorpay_payment_id && 
               verificationData.razorpay_order_id && 
               verificationData.razorpay_signature;
      case 'stripe':
        return verificationData.stripe_payment_intent_id;
      case 'bank_account':
      case 'upi':
        return verificationData.proofOfPayment && 
               verificationData.proofOfPayment.url && 
               verificationData.proofOfPayment.transactionId;
      default:
        return false;
    }
  };

  const renderFeesByClass = () => (
    <Box>
      {/* Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Filter Fees
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Select Class</InputLabel>
                <Select
                  value={selectedClass}
                  onChange={handleClassChange}
                  label="Select Class"
                >
                  {classes.map((cls) => (
                    <MenuItem key={cls._id} value={cls._id}>
                      {cls.name} - {cls.division}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Month</InputLabel>
                <Select
                  value={selectedMonth}
                  onChange={handleMonthChange}
                  label="Month"
                >
                  {months.map((month) => (
                    <MenuItem key={month.value} value={month.value}>
                      {month.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Year</InputLabel>
                <Select
                  value={selectedYear}
                  onChange={handleYearChange}
                  label="Year"
                >
                  {years.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Fee Data */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : feeData.length === 0 ? (
        <Card>
          <CardContent>
            <Typography color="text.secondary" align="center">
              No fee data found for the selected class and month
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Box>
          {feeData.map((student) => (
            <Accordion key={student.studentId} sx={{ mb: 2 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                  <Avatar sx={{ bgcolor: student.allPaid ? 'success.main' : 'warning.main' }}>
                    <PersonIcon />
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6">
                      {student.name}
                      {student.isRTE && (
                        <Chip label="RTE" size="small" color="info" sx={{ ml: 1 }} />
                      )}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      GR: {student.grNumber} | Class: {student.class?.name} - {student.class?.division}
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="h6" color={student.allPaid ? 'success.main' : 'error.main'}>
                      ₹{student.totalPending?.toLocaleString() || 0}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Pending
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="body1">
                      ₹{student.total?.toLocaleString() || 0}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total
                    </Typography>
                  </Box>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                {student.isRTE ? (
                  <Alert severity="info">
                    This student is under RTE (Right to Education) and is exempted from fees.
                  </Alert>
                ) : (
                  <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Fee Type</TableCell>
                          <TableCell align="right">Amount</TableCell>
                          <TableCell align="right">Paid</TableCell>
                          <TableCell align="right">Remaining</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Due Date</TableCell>
                          <TableCell>Paid Date</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Object.entries(student.fees || {}).map(([feeType, feeInfo]) => (
                          <TableRow key={feeType}>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                {getFeeTypeIcon(feeType)}
                                <Box>
                                  <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                                    {feeType.replace('_', ' ')}
                                  </Typography>
                                  {feeInfo.transportationSlab && (
                                    <Typography variant="caption" color="text.secondary">
                                      {feeInfo.transportationSlab}
                                    </Typography>
                                  )}
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell align="right">₹{feeInfo.amount?.toLocaleString() || 0}</TableCell>
                            <TableCell align="right">₹{feeInfo.paidAmount?.toLocaleString() || 0}</TableCell>
                            <TableCell align="right">₹{feeInfo.remainingAmount?.toLocaleString() || 0}</TableCell>
                            <TableCell>
                              <Chip 
                                label={feeInfo.status} 
                                size="small" 
                                color={getFeeStatusColor(feeInfo.status)}
                                sx={{ textTransform: 'capitalize' }}
                              />
                            </TableCell>
                            <TableCell>
                              {feeInfo.dueDate ? formatDate(feeInfo.dueDate) : 'N/A'}
                            </TableCell>
                            <TableCell>
                              {feeInfo.paidDate ? formatDate(feeInfo.paidDate) : 'N/A'}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      )}
    </Box>
  );

  const renderPaymentsManagement = () => (
    <Box>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : payments.length === 0 ? (
        <Card>
          <CardContent>
            <Typography color="text.secondary" align="center">
              No pending payments found
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Payment ID</TableCell>
                <TableCell>Order ID</TableCell>
                <TableCell>Student</TableCell>
                <TableCell>GR Number</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell>Fees Paid</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.paymentId}>
                  <TableCell>{payment.paymentId?.substring(0, 8)}...</TableCell>
                  <TableCell>{payment.orderId || 'N/A'}</TableCell>
                  <TableCell>{payment.student?.name || 'N/A'}</TableCell>
                  <TableCell>{payment.student?.grNumber || 'N/A'}</TableCell>
                  <TableCell align="right">₹{payment.amount?.toLocaleString() || '0'}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {payment.feesPaid?.map((fee, index) => (
                        <Chip 
                          key={index}
                          label={`${fee.type}${fee.transportationSlab ? ` (${fee.transportationSlab})` : ''} - ${fee.month}/${fee.year}`}
                          size="small"
                          variant="outlined"
                        />
                      )) || 'N/A'}
                    </Box>
                  </TableCell>
                  <TableCell>{formatDate(payment.createdAt)}</TableCell>
                  <TableCell>
                    <Button 
                      size="small" 
                      color="primary"
                      variant="contained"
                      onClick={() => handleOpenDialog(payment)}
                    >
                      Verify Payment
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );

  return (
    <FeesManagerLayout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Payments Management
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {school?.name || 'School'} - Manage fees and verify payments
        </Typography>
      </Box>
      
      <Divider sx={{ my: 3 }} />
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      
      <Box sx={{ mb: 4 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Fees by Class" icon={<SchoolIcon />} iconPosition="start" />
          <Tab label="Pending Payments" icon={<PendingIcon />} iconPosition="start" />
        </Tabs>
      </Box>
      
      {tabValue === 0 && renderFeesByClass()}
      {tabValue === 1 && renderPaymentsManagement()}
      
      {/* Verification Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>Verify Payment</DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>Payment Details</Typography>
            <Typography variant="body2">
              <strong>Student:</strong> {selectedPayment?.student?.name || 'N/A'}
            </Typography>
            <Typography variant="body2">
              <strong>GR Number:</strong> {selectedPayment?.student?.grNumber || 'N/A'}
            </Typography>
            <Typography variant="body2">
              <strong>Amount:</strong> ₹{selectedPayment?.amount?.toLocaleString() || '0'}
            </Typography>
            <Typography variant="body2">
              <strong>Order ID:</strong> {selectedPayment?.orderId || 'N/A'}
            </Typography>
            <Typography variant="body2">
              <strong>Fees:</strong> {selectedPayment?.feesPaid?.map(fee => 
                `${fee.type} (${fee.month}/${fee.year})`
              ).join(', ') || 'N/A'}
            </Typography>
          </Box>
          
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Payment Method</InputLabel>
            <Select
              name="paymentMethod"
              value={verificationData.paymentMethod}
              onChange={handleInputChange}
              label="Payment Method"
            >
              <MenuItem value="razorpay">Razorpay</MenuItem>
              <MenuItem value="stripe">Stripe</MenuItem>
              <MenuItem value="bank_account">Bank Account</MenuItem>
              <MenuItem value="upi">UPI</MenuItem>
            </Select>
          </FormControl>

          {verificationData.paymentMethod === 'razorpay' && (
            <>
              <TextField
                fullWidth
                label="Razorpay Payment ID"
                name="razorpay_payment_id"
                value={verificationData.razorpay_payment_id}
                onChange={handleInputChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Razorpay Order ID"
                name="razorpay_order_id"
                value={verificationData.razorpay_order_id}
                onChange={handleInputChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Razorpay Signature"
                name="razorpay_signature"
                value={verificationData.razorpay_signature}
                onChange={handleInputChange}
                margin="normal"
                required
              />
            </>
          )}

          {verificationData.paymentMethod === 'stripe' && (
            <TextField
              fullWidth
              label="Stripe Payment Intent ID"
              name="stripe_payment_intent_id"
              value={verificationData.stripe_payment_intent_id}
              onChange={handleInputChange}
              margin="normal"
              required
            />
          )}

          {['bank_account', 'upi'].includes(verificationData.paymentMethod) && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Proof of Payment
              </Typography>
              
              <input
                accept=".pdf,.jpg,.jpeg,.png"
                style={{ display: 'none' }}
                id="proof-upload"
                type="file"
                onChange={handleFileUpload}
              />
              <label htmlFor="proof-upload">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<UploadIcon />}
                  sx={{ mb: 2 }}
                >
                  Upload Proof of Payment
                </Button>
              </label>
              
              {verificationData.proofOfPayment && (
                <>
                  <TextField
                    fullWidth
                    label="Transaction ID"
                    value={verificationData.proofOfPayment.transactionId}
                    onChange={(e) => handleProofInputChange('transactionId', e.target.value)}
                    margin="normal"
                    required
                  />
                  <TextField
                    fullWidth
                    label="Amount"
                    type="number"
                    value={verificationData.proofOfPayment.amount}
                    onChange={(e) => handleProofInputChange('amount', parseFloat(e.target.value))}
                    margin="normal"
                    required
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    File uploaded: {verificationData.proofOfPayment.mimeType} 
                    ({(verificationData.proofOfPayment.size / 1024 / 1024).toFixed(2)} MB)
                  </Typography>
                </>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleCloseDialog} 
            startIcon={<CloseIcon />}
            color="error"
            disabled={verifying}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleVerifyPayment} 
            startIcon={verifying ? <CircularProgress size={20} /> : <VerifiedIcon />}
            color="primary"
            variant="contained"
            disabled={verifying || !isVerificationValid()}
          >
            {verifying ? 'Verifying...' : 'Verify Payment'}
          </Button>
        </DialogActions>
      </Dialog>
    </FeesManagerLayout>
  );
};

export default Payments;





