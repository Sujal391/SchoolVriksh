// import { useState, useEffect } from 'react';
// import {
//   Box,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   Divider,
//   LinearProgress,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TextField,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel
// } from '@mui/material';
// import { Add as AddIcon } from '@mui/icons-material';
// import FeesManagerLayout from '../../components/layout/FeesManagerLayout';
// import feesService from '../../services/feesService';
// import { useAuth } from '../../contexts/AuthContext';

// const FeeDefinitions = () => {
//   const { school } = useAuth();
//   const [year, setYear] = useState(new Date().getFullYear());
//   const [classId, setClassId] = useState('');
//   const [classes, setClasses] = useState([]);
//   const [feeDefinitions, setFeeDefinitions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchClasses = async () => {
//       try {
//         const response = await feesService.getAvailableClasses();
//         setClasses(response.classes);
//       } catch (err) {
//         console.error('Error fetching classes:', err);
//         setError('Failed to load classes');
//       }
//     };

//     fetchClasses();
//   }, []);

//   useEffect(() => {
//     const fetchFeeDefinitions = async () => {
//       try {
//         setLoading(true);
//         const response = await feesService.getFeeDefinitions(year, classId);
//         setFeeDefinitions(response.fees);
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching fee definitions:', err);
//         setError('Failed to load fee definitions');
//         setLoading(false);
//       }
//     };

//     if (year) {
//       fetchFeeDefinitions();
//     }
//   }, [year, classId]);

//   const handleYearChange = (e) => {
//     setYear(e.target.value);
//   };

//   const handleClassChange = (e) => {
//     setClassId(e.target.value);
//   };

//   return (
//     <FeesManagerLayout>
//       <Box sx={{ mb: 4 }}>
//         <Typography variant="h4" component="h1" gutterBottom>
//           Fee Definitions
//         </Typography>
//         <Typography variant="subtitle1" color="text.secondary">
//           {school?.name || 'School'} - Manage fee structures
//         </Typography>
//       </Box>

//       <Divider sx={{ my: 3 }} />

//       <Box sx={{ mb: 4 }}>
//         <Grid container spacing={3}>
//           <Grid item xs={12} sm={6} md={3}>
//             <FormControl fullWidth>
//               <InputLabel id="year-select-label">Year</InputLabel>
//               <Select
//                 labelId="year-select-label"
//                 value={year}
//                 label="Year"
//                 onChange={handleYearChange}
//               >
//                 {[new Date().getFullYear() - 1, new Date().getFullYear(), new Date().getFullYear() + 1].map((y) => (
//                   <MenuItem key={y} value={y}>{y}</MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <FormControl fullWidth>
//               <InputLabel id="class-select-label">Class</InputLabel>
//               <Select
//                 labelId="class-select-label"
//                 value={classId}
//                 label="Class"
//                 onChange={handleClassChange}
//                 disabled={classes.length === 0}
//               >
//                 <MenuItem value="">All Classes</MenuItem>
//                 {classes.map((cls) => (
//                   <MenuItem key={cls._id} value={cls._id}>
//                     {cls.name} {cls.division}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>
//           <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
//             <Button
//               variant="contained"
//               startIcon={<AddIcon />}
//               onClick={() => console.log('Add new fee definition')}
//             >
//               Define New Fees
//             </Button>
//           </Grid>
//         </Grid>
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
//                 <TableCell>Fee Type</TableCell>
//                 <TableCell>Class</TableCell>
//                 <TableCell align="right">Monthly Amount</TableCell>
//                 <TableCell align="right">Annual Amount</TableCell>
//                 <TableCell>Status</TableCell>
//                 <TableCell>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {Object.entries(feeDefinitions).map(([feeType, feeData]) => (
//                 feeData.map((fee, index) => (
//                   <TableRow key={`${feeType}-${index}`}>
//                     <TableCell>{feeType}</TableCell>
//                     <TableCell>
//                       {fee.classes.map(c => `${c.name} ${c.division}`).join(', ')}
//                     </TableCell>
//                     <TableCell align="right">₹{fee.monthlyAmount || 'N/A'}</TableCell>
//                     <TableCell align="right">₹{fee.annualAmount || 'N/A'}</TableCell>
//                     <TableCell>
//                       <Box
//                         sx={{
//                           display: 'inline-block',
//                           px: 1,
//                           py: 0.5,
//                           borderRadius: 1,
//                           backgroundColor: fee.status === 'pending' ? 'error.light' : 'success.light',
//                           color: fee.status === 'pending' ? 'error.contrastText' : 'success.contrastText'
//                         }}
//                       >
//                         {fee.status}
//                       </Box>
//                     </TableCell>
//                     <TableCell>
//                       <Button size="small" onClick={() => console.log('Edit', feeType)}>
//                         Edit
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}
//     </FeesManagerLayout>
//   );
// };

// export default FeeDefinitions;

// import { useState, useEffect } from 'react';
// import {
//   Box,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   Divider,
//   LinearProgress,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TextField,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
//   Alert,
//   CircularProgress,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Chip,
//   FormControlLabel,
//   Checkbox,
//   FormGroup
// } from '@mui/material';
// import { Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';
// import FeesManagerLayout from '../../components/layout/FeesManagerLayout';
// import feesService from '../../services/feesService';
// import { useAuth } from '../../contexts/AuthContext';

// const FEE_TYPES = [
//   'school',
//   'computer',
//   'transportation',
//   'examination',
//   'classroom',
//   'educational',
//   'library',
//   'sport'
// ];

// const TRANSPORTATION_SLABS = [
//   '0-10km',
//   '10-20km',
//   '20-30km',
//   '30+km'
// ];

// const MONTHS = [
//   'January', 'February', 'March', 'April', 'May', 'June',
//   'July', 'August', 'September', 'October', 'November', 'December'
// ];

// const FeeDefinitions = () => {
//   const { school } = useAuth();
//   const [year, setYear] = useState(new Date().getFullYear());
//   const [classId, setClassId] = useState('');
//   const [classes, setClasses] = useState([]);
//   const [feeDefinitions, setFeeDefinitions] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [fetching, setFetching] = useState(false);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [currentFee, setCurrentFee] = useState(null);
//   const [selectedMonths, setSelectedMonths] = useState([]);

//   const [formData, setFormData] = useState({
//     feeType: '',
//     amount: '',
//     description: '',
//     transportationSlab: '',
//     applyToAllMonths: true,
//     months: [],
//     classIds: [],
//     dueDate: ''
//   });

//   useEffect(() => {
//     const fetchClasses = async () => {
//       try {
//         const response = await feesService.getAvailableClasses();
//         setClasses(response.data.classes || []);
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to load classes');
//         console.error('Error fetching classes:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchClasses();
//   }, []);

//   useEffect(() => {
//     const fetchFeeDefinitions = async () => {
//       try {
//         setFetching(true);
//         setError(null);
//         const response = await feesService.getFeeDefinitions(year, classId);
//         setFeeDefinitions(response.fees || {});
//       } catch (err) {
//         if (err.response?.status !== 404) {
//           setError(err.response?.data?.message || 'Failed to load fee definitions');
//         }
//         setFeeDefinitions({});
//       } finally {
//         setFetching(false);
//         setLoading(false);
//       }
//     };

//     if (year) {
//       fetchFeeDefinitions();
//     }
//   }, [year, classId]);

//   const handleYearChange = (e) => {
//     setYear(e.target.value);
//   };

//   const handleClassChange = (e) => {
//     setClassId(e.target.value);
//   };

//   const handleOpenCreateDialog = () => {
//     setFormData({
//       feeType: '',
//       amount: '',
//       description: '',
//       transportationSlab: '',
//       applyToAllMonths: true,
//       months: [],
//       classIds: [],
//       dueDate: ''
//     });
//     setSelectedMonths([]);
//     setCurrentFee(null);
//     setEditMode(false);
//     setOpenDialog(true);
//   };

//   const handleOpenEditDialog = (feeType, feeData) => {
//     setCurrentFee({ feeType, ...feeData });
//     setFormData({
//       feeType,
//       amount: feeData.monthlyAmount || (feeData.annualAmount / 12).toFixed(2),
//       description: feeData.description || '',
//       transportationSlab: feeData.transportationSlab || '',
//       applyToAllMonths: !feeData.monthlyBreakdown,
//       months: feeData.monthlyBreakdown ? Object.keys(feeData.monthlyBreakdown).map(Number) : [],
//       classIds: feeData.classes.map(c => c._id),
//       dueDate: feeData.dueDate ? new Date(feeData.dueDate).toISOString().split('T')[0] : ''
//     });
//     setSelectedMonths(feeData.monthlyBreakdown ? Object.keys(feeData.monthlyBreakdown).map(Number) : []);
//     setEditMode(true);
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setError(null);
//   };

//   const handleFormChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleMonthSelection = (month) => {
//     setSelectedMonths(prev =>
//       prev.includes(month)
//         ? prev.filter(m => m !== month)
//         : [...prev, month]
//     );
//   };

//   const validateForm = () => {
//     if (!formData.feeType) {
//       return 'Fee type is required';
//     }
//     if (!formData.amount || isNaN(parseFloat(formData.amount)) || parseFloat(formData.amount) <= 0) {
//       return 'Valid amount is required';
//     }
//     if (formData.feeType === 'transportation' && !formData.transportationSlab) {
//       return 'Distance slab is required for transportation fees';
//     }
//     if (!formData.applyToAllMonths && selectedMonths.length === 0) {
//       return 'At least one month must be selected';
//     }
//     if (formData.classIds.length === 0 && classes.length === 0) {
//       return 'No classes available to apply fees to';
//     }
//     return null;
//   };

//   const handleSubmit = async () => {
//     try {
//       const validationError = validateForm();
//       if (validationError) {
//         setError(validationError);
//         return;
//       }

//       setFetching(true);
//       setError(null);

//       if (editMode && currentFee) {
//         // Edit existing fees - use editFeesForYear endpoint
//         const payload = {
//           year,
//           classIds: formData.classIds.length > 0 ? formData.classIds : classes.map(c => c._id),
//           applyToAllMonths: formData.applyToAllMonths,
//           feeUpdates: [{
//             type: formData.feeType,
//             amount: parseFloat(formData.amount),
//             description: formData.description || `${formData.feeType} fee for ${year}`,
//             months: formData.applyToAllMonths ? undefined : selectedMonths,
//             ...(formData.feeType === 'transportation' && {
//               transportationSlab: formData.transportationSlab
//             })
//           }]
//         };

//         await feesService.editFees(year, payload);
//       } else {
//         // Create new fees - use defineFeesForYear endpoint
//         const payload = {
//           year,
//           classIds: formData.classIds.length > 0 ? formData.classIds : classes.map(c => c._id),
//           // If not applying to all months, convert selectedMonths to month parameter
//           ...(formData.applyToAllMonths ? {} : { month: selectedMonths.length === 1 ? selectedMonths[0] : null }),
//           feeTypes: [{
//             type: formData.feeType,
//             amount: parseFloat(formData.amount),
//             description: formData.description || `${formData.feeType} fee for ${year}`,
//             dueDate: formData.dueDate || undefined,
//             ...(formData.feeType === 'transportation' && {
//               transportationDetails: {
//                 distanceSlab: formData.transportationSlab
//               }
//             })
//           }]
//         };

//         await feesService.defineFees(payload);
//       }

//       // Refresh fee definitions
//       const response = await feesService.getFeeDefinitions(year, classId);
//       setFeeDefinitions(response.fees || {});
//       setOpenDialog(false);
//     } catch (err) {
//       console.error('Error saving fee definition:', err);
//       const errorMessage = err.response?.data?.message || 'Failed to save fee definition';
//       if (err.response?.status === 400 && err.response?.data?.invalidClassIds) {
//         setError(`Invalid class IDs: ${err.response.data.invalidClassIds.join(', ')}`);
//       } else if (err.response?.status === 400 && err.response?.data?.duplicateSlabs) {
//         setError(`Duplicate transportation slabs: ${err.response.data.duplicateSlabs.join(', ')}`);
//       } else if (err.response?.status === 409) {
//         setError('Fees already defined for the selected parameters');
//       } else {
//         setError(errorMessage);
//       }
//     } finally {
//       setFetching(false);
//     }
//   };

//   if (loading) {
//     return (
//       <FeesManagerLayout>
//         <LinearProgress />
//       </FeesManagerLayout>
//     );
//   }

//   return (
//     <FeesManagerLayout>
//       <Box sx={{ mb: 4 }}>
//         <Typography variant="h4" component="h1" gutterBottom>
//           Fee Definitions
//         </Typography>
//         <Typography variant="subtitle1" color="text.secondary">
//           {school?.name || 'School'} - Manage fee structures
//         </Typography>
//       </Box>

//       <Divider sx={{ my: 3 }} />

//       {error && (
//         <Alert severity="error" sx={{ mb: 3 }}>
//           {error}
//         </Alert>
//       )}

//       <Box sx={{ mb: 4 }}>
//         <Grid container spacing={3}>
//           <Grid item xs={12} sm={6} md={3}>
//             <FormControl fullWidth>
//               <InputLabel id="year-select-label">Year</InputLabel>
//               <Select
//                 labelId="year-select-label"
//                 value={year}
//                 label="Year"
//                 onChange={handleYearChange}
//                 disabled={fetching}
//               >
//                 {[new Date().getFullYear() - 1, new Date().getFullYear(), new Date().getFullYear() + 1].map((y) => (
//                   <MenuItem key={y} value={y}>{y}</MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <FormControl fullWidth>
//               <InputLabel id="class-select-label">Class</InputLabel>
//               <Select
//                 labelId="class-select-label"
//                 value={classId}
//                 label="Class"
//                 onChange={handleClassChange}
//                 disabled={fetching || classes.length === 0}
//               >
//                 <MenuItem value="">All Classes</MenuItem>
//                 {classes.map((cls) => (
//                   <MenuItem key={cls._id} value={cls._id}>
//                     {cls.name} {cls.division}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>
//           <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
//             <Button
//               variant="contained"
//               startIcon={<AddIcon />}
//               onClick={handleOpenCreateDialog}
//               disabled={fetching || classes.length === 0}
//             >
//               Define New Fees
//             </Button>
//           </Grid>
//         </Grid>
//       </Box>

//       {fetching ? (
//         <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
//           <CircularProgress />
//         </Box>
//       ) : Object.keys(feeDefinitions).length === 0 ? (
//         <Card>
//           <CardContent>
//             <Typography color="text.secondary" align="center">
//               No fee definitions found for {year}. Click "Define New Fees" to create them.
//             </Typography>
//           </CardContent>
//         </Card>
//       ) : (
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Fee Type</TableCell>
//                 <TableCell>Class</TableCell>
//                 <TableCell align="right">Monthly Amount</TableCell>
//                 <TableCell align="right">Annual Amount</TableCell>
//                 <TableCell>Status</TableCell>
//                 <TableCell>Description</TableCell>
//                 <TableCell>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {Object.entries(feeDefinitions).map(([feeType, feeData]) => (
//                 feeData.map((fee, index) => (
//                   <TableRow key={`${feeType}-${index}`}>
//                     <TableCell>
//                       {feeType.charAt(0).toUpperCase() + feeType.slice(1)}
//                       {fee.transportationSlab && ` (${fee.transportationSlab})`}
//                     </TableCell>
//                     <TableCell>
//                       {fee.classes?.map(c => `${c.name} ${c.division}`).join(', ') || 'N/A'}
//                     </TableCell>
//                     <TableCell align="right">
//                       ₹{fee.monthlyAmount?.toLocaleString() || 'N/A'}
//                     </TableCell>
//                     <TableCell align="right">
//                       ₹{fee.annualAmount?.toLocaleString() || 'N/A'}
//                     </TableCell>
//                     <TableCell>
//                       <Box
//                         sx={{
//                           display: 'inline-block',
//                           px: 1,
//                           py: 0.5,
//                           borderRadius: 1,
//                           backgroundColor: fee.status === 'pending' ? 'error.light' :
//                                          fee.status === 'paid' ? 'success.light' :
//                                          'warning.light',
//                           color: fee.status === 'pending' ? 'error.contrastText' :
//                                 fee.status === 'paid' ? 'success.contrastText' :
//                                 'warning.contrastText'
//                         }}
//                       >
//                         {fee.status || 'unknown'}
//                       </Box>
//                     </TableCell>
//                     <TableCell>
//                       {fee.description || 'N/A'}
//                     </TableCell>
//                     <TableCell>
//                       <Button
//                         size="small"
//                         onClick={() => handleOpenEditDialog(feeType, fee)}
//                         disabled={fetching}
//                       >
//                         Edit
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}

//       <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
//         <DialogTitle>
//           {editMode ? 'Edit Fee Definition' : 'Define New Fees'}
//         </DialogTitle>
//         <DialogContent>
//           {error && (
//             <Alert severity="error" sx={{ mb: 2 }}>
//               {error}
//             </Alert>
//           )}
//           <Grid container spacing={3} sx={{ mt: 1 }}>
//             <Grid item xs={12} md={6}>
//               <FormControl fullWidth margin="normal">
//                 <InputLabel id="fee-type-label">Fee Type</InputLabel>
//                 <Select
//                   labelId="fee-type-label"
//                   name="feeType"
//                   value={formData.feeType}
//                   onChange={handleFormChange}
//                   label="Fee Type"
//                   required
//                   disabled={editMode}
//                 >
//                   {FEE_TYPES.map(type => (
//                     <MenuItem key={type} value={type}>
//                       {type.charAt(0).toUpperCase() + type.slice(1)}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>

//             {formData.feeType === 'transportation' && (
//               <Grid item xs={12} md={6}>
//                 <FormControl fullWidth margin="normal">
//                   <InputLabel id="transportation-slab-label">Distance Slab</InputLabel>
//                   <Select
//                     labelId="transportation-slab-label"
//                     name="transportationSlab"
//                     value={formData.transportationSlab}
//                     onChange={handleFormChange}
//                     label="Distance Slab"
//                     required
//                   >
//                     {TRANSPORTATION_SLABS.map(slab => (
//                       <MenuItem key={slab} value={slab}>
//                         {slab}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               </Grid>
//             )}

//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 margin="normal"
//                 name="amount"
//                 label="Amount (per month)"
//                 type="number"
//                 value={formData.amount}
//                 onChange={handleFormChange}
//                 required
//                 inputProps={{ min: 0 }}
//               />
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 margin="normal"
//                 name="dueDate"
//                 label="Due Date"
//                 type="date"
//                 value={formData.dueDate}
//                 onChange={handleFormChange}
//                 InputLabelProps={{ shrink: true }}
//               />
//             </Grid>

//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 margin="normal"
//                 name="description"
//                 label="Description"
//                 value={formData.description}
//                 onChange={handleFormChange}
//               />
//             </Grid>

//             <Grid item xs={12}>
//               <FormControl fullWidth margin="normal">
//                 <InputLabel id="classes-label">Apply to Classes</InputLabel>
//                 <Select
//                   labelId="classes-label"
//                   multiple
//                   name="classIds"
//                   value={formData.classIds}
//                   onChange={(e) => setFormData({...formData, classIds: e.target.value})}
//                   label="Apply to Classes"
//                   renderValue={(selected) => selected.length === classes.length ? 'All Classes' : selected.map(id => {
//                     const cls = classes.find(c => c._id === id);
//                     return cls ? `${cls.name} ${cls.division}` : '';
//                   }).join(', ')}
//                 >
//                   {classes.map(cls => (
//                     <MenuItem key={cls._id} value={cls._id}>
//                       {cls.name} {cls.division}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>

//             <Grid item xs={12}>
//               <FormControlLabel
//                 control={
//                   <Checkbox
//                     checked={formData.applyToAllMonths}
//                     onChange={handleFormChange}
//                     name="applyToAllMonths"
//                   />
//                 }
//                 label="Apply to all months"
//               />
//             </Grid>

//             {!formData.applyToAllMonths && (
//               <Grid item xs={12}>
//                 <Typography variant="subtitle2" gutterBottom>
//                   Select specific months:
//                 </Typography>
//                 <FormGroup row>
//                   {MONTHS.map((month, index) => (
//                     <Chip
//                       key={index + 1}
//                       label={month}
//                       onClick={() => handleMonthSelection(index + 1)}
//                       color={selectedMonths.includes(index + 1) ? 'primary' : 'default'}
//                       sx={{ m: 0.5 }}
//                     />
//                   ))}
//                 </FormGroup>
//               </Grid>
//             )}
//           </Grid>
//         </DialogContent>
//         <DialogActions>
//           <Button
//             onClick={handleCloseDialog}
//             startIcon={<CloseIcon />}
//             color="error"
//             disabled={fetching}
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={handleSubmit}
//             variant="contained"
//             disabled={fetching}
//           >
//             {fetching ? <CircularProgress size={24} /> : editMode ? 'Update' : 'Create'}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </FeesManagerLayout>
//   );
// };

// export default FeeDefinitions;

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  LinearProgress,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  FormControlLabel,
  Checkbox,
  FormGroup,
  IconButton,
  Tooltip,
  Stack,
  Collapse,
} from "@mui/material";
import {
  Add as AddIcon,
  Close as CloseIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from "@mui/icons-material";
import FeesManagerLayout from "../../components/layout/FeesManagerLayout";
import feesService from "../../services/feesService";
import { useAuth } from "../../contexts/AuthContext";

const FEE_TYPES = [
  "school",
  "computer",
  "transportation",
  "examination",
  "classroom",
  "educational",
  "library",
  "sport",
];

const TRANSPORTATION_SLABS = ["0-10km", "10-20km", "20-30km", "30+km"];

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const FeeDefinitions = () => {
  const { school } = useAuth();
  const [year, setYear] = useState(new Date().getFullYear());
  const [classId, setClassId] = useState("");
  const [classes, setClasses] = useState([]);
  const [feeDefinitions, setFeeDefinitions] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentFee, setCurrentFee] = useState(null);
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [expandedRows, setExpandedRows] = useState({});

  const [formData, setFormData] = useState({
    applyToAllMonths: true,
    months: [],
    classIds: [],
    dueDate: "",
    feeTypes: [
      { type: "", amount: "", description: "", transportationSlab: "" },
    ],
  });

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoading(true);
        const response = await feesService.getAvailableClasses();
        setClasses(response.data.classes || []);
        setFormData((prev) => ({
          ...prev,
          classIds: response.data.classes.map((c) => c._id),
        }));
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load classes");
        console.error("Error fetching classes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  useEffect(() => {
    const fetchFeeDefinitions = async () => {
      try {
        setFetching(true);
        setError(null);
        const response = await feesService.getFeeDefinitions(
          year,
          classId || null
        );
        setFeeDefinitions(response || {});
      } catch (err) {
        if (err.response?.status !== 404) {
          setError(
            err.response?.data?.message || "Failed to load fee definitions"
          );
        }
        setFeeDefinitions({});
      } finally {
        setFetching(false);
      }
    };

    if (year) {
      fetchFeeDefinitions();
    }
  }, [year, classId]);

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleClassChange = (e) => {
    setClassId(e.target.value);
  };

  const handleOpenCreateDialog = () => {
    setFormData({
      applyToAllMonths: true,
      months: [],
      classIds: classes.map((c) => c._id),
      dueDate: "",
      feeTypes: [
        { type: "", amount: "", description: "", transportationSlab: "" },
      ],
    });
    setSelectedMonths([]);
    setCurrentFee(null);
    setEditMode(false);
    setOpenDialog(true);
  };

  const handleOpenEditDialog = (feeType, feeData, classIds = []) => {
  if (!feeType || !feeData) return;

  setCurrentFee({ feeType, ...feeData });

  setFormData({
    applyToAllMonths: feeData.isConsistent ?? true,
    months: !feeData.isConsistent && feeData.monthlyBreakdown
      ? Object.keys(feeData.monthlyBreakdown).map(Number)
      : [],
    classIds: classIds, // comes from the class wrapper, not feeType
    dueDate: feeData.representativeDueDate
      ? new Date(feeData.representativeDueDate).toISOString().split("T")[0]
      : "",
    feeTypes: [
      {
        type: feeType,
        amount: feeData.monthlyAmount 
          || (feeData.totalAnnualAmount 
              ? (feeData.totalAnnualAmount / 12).toFixed(2) 
              : ""),
        description: feeData.description || "",
        transportationSlab: feeData.transportationSlab || "",
      },
    ],
  });

  setSelectedMonths(
    !feeData.isConsistent && feeData.monthlyBreakdown
      ? Object.keys(feeData.monthlyBreakdown).map(Number)
      : []
  );

  setEditMode(true);
  setOpenDialog(true);
};


  const handleCloseDialog = () => {
    setOpenDialog(false);
    setError(null);
  };

  const handleFormChange = (index, field, value) => {
    setFormData((prev) => {
      const newFeeTypes = [...prev.feeTypes];
      newFeeTypes[index] = { ...newFeeTypes[index], [field]: value };
      return { ...prev, feeTypes: newFeeTypes };
    });
  };

  const handleTopLevelFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleMonthSelection = (month) => {
    setSelectedMonths((prev) => {
      const newMonths = prev.includes(month)
        ? prev.filter((m) => m !== month)
        : [...prev, month];
      setFormData((prevData) => ({ ...prevData, months: newMonths }));
      return newMonths;
    });
  };

  const handleClassSelection = (e) => {
    setFormData((prev) => ({ ...prev, classIds: e.target.value }));
  };

  const addFeeType = () => {
    setFormData((prev) => ({
      ...prev,
      feeTypes: [
        ...prev.feeTypes,
        { type: "", amount: "", description: "", transportationSlab: "" },
      ],
    }));
  };

  const removeFeeType = (index) => {
    setFormData((prev) => ({
      ...prev,
      feeTypes: prev.feeTypes.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    if (formData.classIds.length === 0) {
      return "At least one class must be selected";
    }
    if (!formData.applyToAllMonths && selectedMonths.length === 0) {
      return "At least one month must be selected";
    }
    if (formData.dueDate && isNaN(new Date(formData.dueDate).getTime())) {
      return "Invalid due date";
    }

    for (let i = 0; i < formData.feeTypes.length; i++) {
      const fee = formData.feeTypes[i];
      if (!fee.type) {
        return `Fee type is required for fee entry ${i + 1}`;
      }
      if (
        !fee.amount ||
        isNaN(parseFloat(fee.amount)) ||
        parseFloat(fee.amount) <= 0
      ) {
        return `Valid amount is required for fee entry ${i + 1}`;
      }
      if (fee.type === "transportation" && !fee.transportationSlab) {
        return `Distance slab is required for transportation fee entry ${
          i + 1
        }`;
      }
      const sameTypeSlab = formData.feeTypes.filter(
        (f, j) =>
          j !== i &&
          f.type === fee.type &&
          (f.type !== "transportation" ||
            f.transportationSlab === fee.transportationSlab)
      );
      if (sameTypeSlab.length > 0) {
        return `Duplicate fee type ${fee.type}${
          fee.transportationSlab ? ` (${fee.transportationSlab})` : ""
        } detected`;
      }
    }

    return null;
  };

  const handleSubmit = async () => {
    try {
      const validationError = validateForm();
      if (validationError) {
        setError(validationError);
        return;
      }

      setFetching(true);
      setError(null);

      if (editMode && currentFee) {
        const payload = {
          year,
          classIds: formData.classIds,
          applyToAllMonths: formData.applyToAllMonths,
          feeUpdates: formData.feeTypes.map((fee) => ({
            type: fee.type,
            amount: parseFloat(fee.amount),
            description: fee.description || `${fee.type} fee for ${year}`,
            months: formData.applyToAllMonths ? undefined : selectedMonths,
            ...(fee.type === "transportation" && {
              transportationSlab: fee.transportationSlab,
            }),
          })),
        };
        await feesService.editFees(year, payload);
      } else {
        const payload = {
          year,
          classIds: formData.classIds,
          ...(formData.applyToAllMonths
            ? {}
            : {
                month: selectedMonths.length === 1 ? selectedMonths[0] : null,
              }),
          feeTypes: formData.feeTypes.map((fee) => ({
            type: fee.type,
            amount: parseFloat(fee.amount),
            description: fee.description || `${fee.type} fee for ${year}`,
            dueDate: formData.dueDate || undefined,
            ...(fee.type === "transportation" && {
              transportationDetails: {
                distanceSlab: fee.transportationSlab,
              },
            }),
          })),
        };
        await feesService.defineFees(payload);
      }

      const response = await feesService.getFeeDefinitions(
        year,
        classId || null
      );
      setFeeDefinitions(response.fees || {});
      setOpenDialog(false);
    } catch (err) {
      console.error("Error saving fee definition:", err);
      let errorMessage =
        err.response?.data?.message || "Failed to save fee definitions";
      if (err.response?.status === 400 && err.response?.data?.invalidClassIds) {
        errorMessage = `Invalid class IDs: ${err.response.data.invalidClassIds.join(
          ", "
        )}`;
      } else if (
        err.response?.status === 400 &&
        err.response?.data?.duplicateSlabs
      ) {
        errorMessage = `Duplicate transportation slabs: ${err.response.data.duplicateSlabs.join(
          ", "
        )}`;
      } else if (err.response?.status === 409) {
        errorMessage = err.response.data.suggestion
          ? `${err.response.data.message}. ${err.response.data.suggestion}`
          : "Fees already defined for the selected parameters";
      } else if (err.response?.status === 403) {
        errorMessage = "You do not have permission to perform this action";
      }
      setError(errorMessage);
    } finally {
      setFetching(false);
    }
  };

  // Helper functions for display values
  const getDisplayMonths = (fee) => {
    if (!fee.monthlyBreakdown || fee.isAllMonths) {
      return "All Months";
    }
    const months = Object.keys(fee.monthlyBreakdown)
      .map(Number)
      .sort((a, b) => a - b)
      .map((m) => MONTHS[m - 1]);
    return months.join(", ") || "N/A";
  };

  const getDisplayAmount = (fee) => {
    if (fee.monthlyAmount) {
      return `₹${fee.monthlyAmount.toLocaleString("en-IN")}`;
    }
    if (fee.monthlyBreakdown) {
      const amounts = Object.values(fee.monthlyBreakdown).map(
        (detail) => detail.amount
      );
      const uniqueAmounts = [...new Set(amounts)];
      return uniqueAmounts.length === 1
        ? `₹${uniqueAmounts[0].toLocaleString("en-IN")}`
        : "Varies";
    }
    return "N/A";
  };

  const getDisplayStatus = (fee) => {
  // Case 1: Inconsistent → check monthly breakdown
  if (!fee.isConsistent && fee.monthlyBreakdown) {
    const statuses = Object.values(fee.monthlyBreakdown).map(
      (detail) => detail.status
    );
    const uniqueStatuses = [...new Set(statuses)];
    return uniqueStatuses.length === 1
      ? uniqueStatuses[0].charAt(0).toUpperCase() + uniqueStatuses[0].slice(1)
      : "Mixed";
  }

  // Case 2: Consistent → rely on statusSummary
  if (fee.isConsistent && fee.statusSummary) {
    const activeStatus = Object.entries(fee.statusSummary).find(
      ([, count]) => count > 0
    );
    if (activeStatus) {
      const [status] = activeStatus;
      return status.charAt(0).toUpperCase() + status.slice(1);
    }
  }

  // Case 3: Fallback to direct fee.status (if API provides it)
  if (fee.status && typeof fee.status === "string") {
    return fee.status.charAt(0).toUpperCase() + fee.status.slice(1);
  }

  return "Unknown";
};


  const toggleRowExpansion = (key) => {
    setExpandedRows((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (loading) {
    return (
      <FeesManagerLayout>
        <LinearProgress color="primary" />
      </FeesManagerLayout>
    );
  }

  return (
    <FeesManagerLayout>
      <Box
        sx={{
          mb: 4,
          px: { xs: 2, sm: 3, md: 4 },
          bgcolor: "background.default",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold", color: "text.primary" }}
        >
          Fee Definitions
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
          {school?.name || "School"} - Manage fee structures
        </Typography>
      </Box>

      <Divider sx={{ my: 3, borderColor: "grey.300" }} />

      {error && (
        <Alert
          severity="error"
          sx={{ mb: 3, mx: { xs: 2, sm: 3, md: 4 }, borderRadius: 2 }}
          onClose={() => setError(null)}
        >
          {error}
        </Alert>
      )}

      <Box sx={{ mb: 4, px: { xs: 2, sm: 3, md: 4 } }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={4}>
            <FormControl
              fullWidth
              size="small"
              sx={{ bgcolor: "white", borderRadius: 1 }}
            >
              <InputLabel id="year-select-label">Year</InputLabel>
              <Select
                labelId="year-select-label"
                value={year}
                label="Year"
                onChange={handleYearChange}
                disabled={fetching}
                sx={{ "& .MuiSelect-select": { py: 1.5 } }}
              >
                {Array.from(
                  { length: 5 },
                  (_, i) => new Date().getFullYear() - 2 + i
                ).map((y) => (
                  <MenuItem key={y} value={y}>
                    {y}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl
              fullWidth
              size="small"
              sx={{ bgcolor: "white", borderRadius: 1 }}
            >
              <InputLabel id="class-select-label">Class</InputLabel>
              <Select
                labelId="class-select-label"
                value={classId}
                label="Class"
                onChange={handleClassChange}
                disabled={fetching || classes.length === 0}
                sx={{ "& .MuiSelect-select": { py: 1.5 } }}
              >
                <MenuItem value="">All Classes</MenuItem>
                {classes.map((cls) => (
                  <MenuItem key={cls._id} value={cls._id}>
                    {cls.name} {cls.division}{" "}
                    {cls.academicYear ? `(${cls.academicYear})` : ""}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              display: "flex",
              justifyContent: { xs: "flex-start", md: "flex-end" },
            }}
          >
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleOpenCreateDialog}
              disabled={fetching || classes.length === 0}
              sx={{
                px: 3,
                py: 1,
                borderRadius: 2,
                textTransform: "none",
                bgcolor: "primary.main",
                "&:hover": { bgcolor: "primary.dark" },
              }}
            >
              Define New Fees
            </Button>
          </Grid>
        </Grid>
      </Box>

      {fetching ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <TableContainer
          component={Paper}
          sx={{
            mx: { xs: 2, sm: 3, md: 4 },
            borderRadius: 2,
            boxShadow: 3,
            overflowX: "auto",
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "grey.100" }}>
                <TableCell sx={{ fontWeight: "bold", py: 1.5 }} />
                <TableCell sx={{ fontWeight: "bold", py: 1.5 }}>
                  Fee Type
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", py: 1.5 }}>
                  Class
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", py: 1.5 }}>
                  Months
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold", py: 1.5 }}>
                  Monthly Amount
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold", py: 1.5 }}>
                  Annual Amount
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", py: 1.5 }}>
                  Status
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", py: 1.5 }}>
                  Description
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", py: 1.5 }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!feeDefinitions.classes || feeDefinitions.classes.length === 0 ? (
    <TableRow>
      <TableCell colSpan={9} align="center" sx={{ py: 3 }}>
        No fee definitions found for {feeDefinitions.year}. 
        Click "Define New Fees" to create them.
      </TableCell>
    </TableRow>
  ) : (
    feeDefinitions.classes.map((classItem, classIndex) =>
      classItem.feeTypes.map((fee, feeIndex) => {
        const rowKey = `${classItem.className}-${fee.type}-${feeIndex}`;
        const isExpanded = expandedRows[rowKey];

        return (
          <React.Fragment key={rowKey}>
            <TableRow
              sx={{
                "&:hover": { bgcolor: "grey.50" },
                transition: "background-color 0.2s",
              }}
            >
              {/* Expand toggle */}
              <TableCell sx={{ py: 1 }}>
                {fee.monthlyBreakdown &&
                  Object.keys(fee.monthlyBreakdown).length > 0 && (
                    <IconButton
                      size="small"
                      onClick={() => toggleRowExpansion(rowKey)}
                      sx={{ color: "primary.main" }}
                    >
                      {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                  )}
              </TableCell>

              {/* Fee Type */}
              <TableCell sx={{ py: 1 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="body2">
                    {fee.type
                      ? fee.type.charAt(0).toUpperCase() + fee.type.slice(1)
                      : "Unknown Type"}
                  </Typography>
                </Stack>
              </TableCell>

              {/* Class */}
              <TableCell sx={{ py: 1 }}>
                {classItem.className || "N/A"}
              </TableCell>

              {/* Months (from statusSummary.pending) */}
              <TableCell sx={{ py: 1 }}>
                {fee.statusSummary?.pending ?? "N/A"}
              </TableCell>

              {/* Monthly Amount */}
              <TableCell align="right" sx={{ py: 1 }}>
                ₹{fee.monthlyAmount?.toLocaleString("en-IN") || "N/A"}
              </TableCell>

              {/* Annual Amount */}
              <TableCell align="right" sx={{ py: 1 }}>
                ₹{fee.totalAnnualAmount?.toLocaleString("en-IN") || "N/A"}
              </TableCell>

              {/* Status */}
              <TableCell sx={{ py: 1 }}>
                <Chip
                  label={getDisplayStatus(fee)}
                  color={
                    getDisplayStatus(fee).toLowerCase() === "pending"
                      ? "error"
                      : getDisplayStatus(fee).toLowerCase() === "paid"
                      ? "success"
                      : getDisplayStatus(fee).toLowerCase() === "partially_paid"
                      ? "warning"
                      : getDisplayStatus(fee).toLowerCase() === "mixed"
                      ? "info"
                      : "default"
                  }
                  size="small"
                  sx={{ borderRadius: 1 }}
                />
              </TableCell>

              {/* Description */}
              <TableCell sx={{ py: 1 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="body2">
                    {fee.description || "N/A"}
                  </Typography>
                  {fee.monthlyBreakdown && (
                    <Tooltip title="Varies by month">
                      <Chip
                        label="Monthly Varying"
                        size="small"
                        variant="outlined"
                        sx={{ borderRadius: 1 }}
                      />
                    </Tooltip>
                  )}
                </Stack>
              </TableCell>

              {/* Actions */}
              <TableCell sx={{ py: 1 }}>
                <Tooltip title="Edit Fee">
                  <IconButton
                    onClick={() => handleOpenEditDialog(fee.type, fee)}
                    disabled={fetching || !fee.type || !fee}
                    size="small"
                    sx={{ color: "primary.main" }}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>

            {/* Expanded Monthly Breakdown */}
            {isExpanded && fee.monthlyBreakdown && (
              <TableRow>
                <TableCell colSpan={9}>
                  <Collapse in={isExpanded}>
                    <Box
                      sx={{
                        p: 2,
                        bgcolor: "grey.100",
                        borderRadius: 2,
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        gutterBottom
                        sx={{ fontWeight: "medium" }}
                      >
                        Monthly Breakdown
                      </Typography>
                      <Table size="small">
                        <TableHead>
                          <TableRow sx={{ bgcolor: "grey.200" }}>
                            <TableCell>Month</TableCell>
                            <TableCell align="right">Amount</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Due Date</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {Object.entries(fee.monthlyBreakdown)
                            .sort(
                              ([monthA], [monthB]) =>
                                Number(monthA) - Number(monthB)
                            )
                            .map(([month, details]) => (
                              <TableRow key={`${rowKey}-${month}`}>
                                <TableCell>
                                  {MONTHS[Number(month) - 1]}
                                </TableCell>
                                <TableCell align="right">
                                  ₹
                                  {details.amount?.toLocaleString("en-IN") ||
                                    "N/A"}
                                </TableCell>
                                <TableCell>
                                  {details.status
                                    ? details.status.charAt(0).toUpperCase() +
                                      details.status.slice(1)
                                    : "Unknown"}
                                </TableCell>
                                <TableCell>
                                  {details.dueDate
                                    ? new Date(
                                        details.dueDate
                                      ).toLocaleDateString("en-IN")
                                    : "N/A"}
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            )}
          </React.Fragment>
        );
      })
    )
  )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            m: { xs: 1, sm: 2 },
            borderRadius: 2,
            maxHeight: "90vh",
            overflowY: "auto",
            bgcolor: "background.paper",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            bgcolor: "primary.main",
            color: "white",
            px: 3,
            py: 2,
            borderTopLeftRadius: 2,
            borderTopRightRadius: 2,
          }}
        >
          {editMode ? "Edit Fee Definition" : "Define New Fees"}
          <IconButton
            onClick={handleCloseDialog}
            disabled={fetching}
            sx={{ color: "white" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent
          dividers
          sx={{
            px: { xs: 2, sm: 3 },
            py: 3,
            overflowY: "auto",
            maxHeight: "70vh",
          }}
        >
          {error && (
            <Alert
              severity="error"
              sx={{ mb: 2, borderRadius: 2 }}
              onClose={() => setError(null)}
            >
              {error}
            </Alert>
          )}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontWeight: "medium", color: "text.primary" }}
              >
                Fee Types
              </Typography>
              {formData.feeTypes.map((fee, index) => (
                <Card
                  key={index}
                  sx={{
                    mb: 2,
                    p: 2,
                    borderRadius: 2,
                    boxShadow: 2,
                    bgcolor: "white",
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4}>
                      <FormControl
                        fullWidth
                        size="small"
                        sx={{ bgcolor: "white", borderRadius: 1 }}
                      >
                        <InputLabel id={`fee-type-label-${index}`}>
                          Fee Type
                        </InputLabel>
                        <Select
                          labelId={`fee-type-label-${index}`}
                          value={fee.type}
                          onChange={(e) =>
                            handleFormChange(index, "type", e.target.value)
                          }
                          label="Fee Type"
                          required
                          disabled={editMode}
                          sx={{ "& .MuiSelect-select": { py: 1.5 } }}
                        >
                          {FEE_TYPES.map((type) => (
                            <MenuItem key={type} value={type}>
                              {type.charAt(0).toUpperCase() + type.slice(1)}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    {fee.type === "transportation" && (
                      <Grid item xs={12} sm={6} md={4}>
                        <FormControl
                          fullWidth
                          size="small"
                          sx={{ bgcolor: "white", borderRadius: 1 }}
                        >
                          <InputLabel id={`slab-label-${index}`}>
                            Distance Slab
                          </InputLabel>
                          <Select
                            labelId={`slab-label-${index}`}
                            value={fee.transportationSlab}
                            onChange={(e) =>
                              handleFormChange(
                                index,
                                "transportationSlab",
                                e.target.value
                              )
                            }
                            label="Distance Slab"
                            required
                            sx={{ "& .MuiSelect-select": { py: 1.5 } }}
                          >
                            {TRANSPORTATION_SLABS.map((slab) => (
                              <MenuItem key={slab} value={slab}>
                                {slab}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                    )}
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={fee.type === "transportation" ? 4 : 8}
                    >
                      <TextField
                        fullWidth
                        size="small"
                        label="Amount (per month)"
                        type="number"
                        value={fee.amount}
                        onChange={(e) =>
                          handleFormChange(index, "amount", e.target.value)
                        }
                        required
                        inputProps={{ min: 0, step: 0.01 }}
                        InputProps={{
                          startAdornment: (
                            <Typography sx={{ mr: 1, color: "text.secondary" }}>
                              ₹
                            </Typography>
                          ),
                        }}
                        sx={{ bgcolor: "white", borderRadius: 1 }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Description (Optional)"
                        value={fee.description}
                        onChange={(e) =>
                          handleFormChange(index, "description", e.target.value)
                        }
                        multiline
                        rows={2}
                        sx={{ bgcolor: "white", borderRadius: 1 }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl
                        fullWidth={false}
                        size="small"
                        sx={{ bgcolor: "white", borderRadius: 1, width: 150 }}
                      >
                        <InputLabel id="classes-label">Apply to Classes</InputLabel>
                        <Select
                          labelId="classes-label"
                          multiple
                          value={formData.classIds}
                          onChange={handleClassSelection}
                          label="Apply to Classes"
                          renderValue={(selected) => (
                            <Typography
                              noWrap
                              sx={{ maxWidth: 'calc(100% - 10%)' }} // ensures ellipsis before arrow
                            >
                              {selected.length === classes.length
                                ? "All Classes"
                                : selected
                                    .map((id) => {
                                      const cls = classes.find((c) => c._id === id);
                                      return cls ? `${cls.name} ${cls.division}` : "";
                                    })
                                    .filter(Boolean)
                                    .join(", ")}
                            </Typography>
                          )}
                          sx={{ "& .MuiSelect-select": { py: 1.5 } }}
                        >
                          {classes.map((cls) => (
                            <MenuItem key={cls._id} value={cls._id}>
                              <Checkbox checked={formData.classIds.includes(cls._id)} />
                              {cls.name} {cls.division}{" "}
                              {cls.academicYear ? `(${cls.academicYear})` : ""}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        size="small"
                        name="dueDate"
                        label="Due Date (Optional)"
                        type="date"
                        value={formData.dueDate}
                        onChange={handleTopLevelFormChange}
                        InputLabelProps={{ shrink: true }}
                        sx={{ bgcolor: "white", borderRadius: 1 }}
                      />
                    </Grid>
                    {!editMode && (
                      <Grid
                        item
                        xs={12}
                        sx={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <Tooltip title="Remove Fee Type">
                          <IconButton
                            onClick={() => removeFeeType(index)}
                            disabled={
                              formData.feeTypes.length === 1 || fetching
                            }
                            sx={{ color: "error.main" }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                    )}
                  </Grid>
                  
                </Card>
              ))}
              {!editMode && (
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={addFeeType}
                  disabled={fetching}
                  sx={{
                    mt: 2,
                    borderRadius: 2,
                    textTransform: "none",
                    borderColor: "primary.main",
                    color: "primary.main",
                    "&:hover": {
                      bgcolor: "primary.light",
                      borderColor: "primary.dark",
                    },
                  }}
                >
                  Add Another Fee Type
                </Button>
              )}
            </Grid>           

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.applyToAllMonths}
                    onChange={handleTopLevelFormChange}
                    name="applyToAllMonths"
                    size="small"
                    sx={{ color: "primary.main" }}
                  />
                }
                label="Apply to all months"
                sx={{ color: "text.primary" }}
              />
            </Grid>

            {!formData.applyToAllMonths && (
              <Grid item xs={12}>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  sx={{ fontWeight: "medium", color: "text.primary" }}
                >
                  Select specific months:
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1,
                    maxHeight: 150,
                    overflowY: "auto",
                    p: 1,
                    bgcolor: "grey.100",
                    borderRadius: 2,
                  }}
                >
                  {MONTHS.map((month, index) => (
                    <Chip
                      key={index + 1}
                      label={month}
                      onClick={() => handleMonthSelection(index + 1)}
                      color={
                        selectedMonths.includes(index + 1)
                          ? "primary"
                          : "default"
                      }
                      variant={
                        selectedMonths.includes(index + 1)
                          ? "filled"
                          : "outlined"
                      }
                      sx={{
                        m: 0.5,
                        borderRadius: 1,
                        "&:hover": {
                          bgcolor: selectedMonths.includes(index + 1)
                            ? "primary.dark"
                            : "grey.200",
                        },
                      }}
                    />
                  ))}
                </Box>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2, bgcolor: "background.paper" }}>
          <Button
            onClick={handleCloseDialog}
            startIcon={<CloseIcon />}
            color="error"
            disabled={fetching}
            variant="outlined"
            sx={{
              borderRadius: 2,
              textTransform: "none",
              borderColor: "error.main",
              "&:hover": { bgcolor: "error.light", borderColor: "error.dark" },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={fetching}
            sx={{
              minWidth: 100,
              borderRadius: 2,
              textTransform: "none",
              bgcolor: "primary.main",
              "&:hover": { bgcolor: "primary.dark" },
            }}
          >
            {fetching ? (
              <CircularProgress size={24} color="inherit" />
            ) : editMode ? (
              "Update"
            ) : (
              "Create"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </FeesManagerLayout>
  );
};

export default FeeDefinitions;
