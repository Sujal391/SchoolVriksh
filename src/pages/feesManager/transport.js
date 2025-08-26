// import React, { useState } from 'react';
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   TextField,
//   Button,
//   FormControl,
//   FormLabel,
//   RadioGroup,
//   FormControlLabel,
//   Radio,
//   Select,
//   MenuItem,
//   InputLabel,
//   Alert,
//   Snackbar,
//   CircularProgress,
//   Divider,
//   Grid,
//   Paper,
//   Chip
// } from '@mui/material';
// import {
//   Search as SearchIcon,
//   DirectionsBus as TransportIcon,
//   Person as PersonIcon,
//   Save as SaveIcon,
//   Clear as ClearIcon
// } from '@mui/icons-material';
// import { useRouter } from 'next/router';
// import feesService from '../../services/feesService';
// import FeesManagerLayout from '../../components/layout/FeesManagerLayout';

// const TransportManagement = () => {
//   const router = useRouter();
//   const [searchGrNumber, setSearchGrNumber] = useState('');
//   const [student, setStudent] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [saving, setSaving] = useState(false);
//   const [transportData, setTransportData] = useState({
//     isApplicable: false,
//     distance: '',
//     distanceSlab: ''
//   });
//   const [alert, setAlert] = useState({ open: false, message: '', severity: 'info' });

//   const distanceSlabs = [
//     { value: '0-10km', label: '0-10 km' },
//     { value: '10-20km', label: '10-20 km' },
//     { value: '20-30km', label: '20-30 km' },
//     { value: '30+km', label: '30+ km' }
//   ];

//   const handleSearchStudent = async () => {
//     if (!searchGrNumber.trim()) {
//       showAlert('Please enter a GR number', 'warning');
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await feesService.getStudentByGrNumber(searchGrNumber);
//       setStudent(response.student);
      
//       // Set existing transport data if available
//       const transport = response.student?.studentDetails?.transportDetails;
//       if (transport) {
//         setTransportData({
//           isApplicable: transport.isApplicable || false,
//           distance: transport.distance || '',
//           distanceSlab: transport.distanceSlab || ''
//         });
//       } else {
//         // Reset form for new student
//         setTransportData({
//           isApplicable: false,
//           distance: '',
//           distanceSlab: ''
//         });
//       }
      
//       showAlert('Student found successfully', 'success');
//     } catch (error) {
//       console.error('Error fetching student:', error);
//       setStudent(null);
//       showAlert(error.response?.data?.message || 'Student not found', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleTransportApplicabilityChange = (event) => {
//     const isApplicable = event.target.value === 'true';
//     setTransportData(prev => ({
//       ...prev,
//       isApplicable,
//       distance: isApplicable ? prev.distance : '',
//       distanceSlab: isApplicable ? prev.distanceSlab : ''
//     }));
//   };

//   const handleDistanceChange = (event) => {
//     const distance = parseFloat(event.target.value);
//     let distanceSlab = '';
    
//     if (distance >= 0 && distance <= 10) distanceSlab = '0-10km';
//     else if (distance > 10 && distance <= 20) distanceSlab = '10-20km';
//     else if (distance > 20 && distance <= 30) distanceSlab = '20-30km';
//     else if (distance > 30) distanceSlab = '30+km';

//     setTransportData(prev => ({
//       ...prev,
//       distance: event.target.value,
//       distanceSlab
//     }));
//   };

//   const handleSaveTransport = async () => {
//     if (!student) {
//       showAlert('Please search and select a student first', 'warning');
//       return;
//     }

//     if (transportData.isApplicable && (!transportData.distance || !transportData.distanceSlab)) {
//       showAlert('Please enter distance and distance slab for transport applicable students', 'warning');
//       return;
//     }

//     setSaving(true);
//     try {
//       const payload = {
//         isApplicable: transportData.isApplicable,
//         distance: transportData.isApplicable ? parseFloat(transportData.distance) : null,
//         distanceSlab: transportData.isApplicable ? transportData.distanceSlab : null
//       };

//       await feesService.updateStudentTransport(student.studentDetails.grNumber, payload);
      
//       // Update local student data
//       setStudent(prev => ({
//         ...prev,
//         studentDetails: {
//           ...prev.studentDetails,
//           transportDetails: payload
//         }
//       }));

//       showAlert('Transport details saved successfully', 'success');
//     } catch (error) {
//       console.error('Error saving transport details:', error);
//       showAlert(error.response?.data?.message || 'Failed to save transport details', 'error');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleClearForm = () => {
//     setSearchGrNumber('');
//     setStudent(null);
//     setTransportData({
//       isApplicable: false,
//       distance: '',
//       distanceSlab: ''
//     });
//   };

//   const showAlert = (message, severity) => {
//     setAlert({ open: true, message, severity });
//   };

//   const handleCloseAlert = () => {
//     setAlert({ ...alert, open: false });
//   };

//   return (
//     <FeesManagerLayout>
//     <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
//       {/* Header */}
//       <Box sx={{ mb: 4 }}>
//         <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a365d', mb: 1 }}>
//           <TransportIcon sx={{ mr: 2, verticalAlign: 'middle' }} />
//           Student Transport Management
//         </Typography>
//         <Typography variant="body1" color="text.secondary">
//           Manage transportation details for students including distance and fare calculations
//         </Typography>
//       </Box>

//       {/* Student Search Section */}
//       <Card sx={{ mb: 3, boxShadow: 3 }}>
//         <CardContent>
//           <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
//             <SearchIcon sx={{ mr: 1 }} />
//             Search Student
//           </Typography>
          
//           <Grid container spacing={2} alignItems="center">
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Enter GR Number"
//                 value={searchGrNumber}
//                 onChange={(e) => setSearchGrNumber(e.target.value)}
//                 placeholder="e.g., GR001234"
//                 onKeyPress={(e) => e.key === 'Enter' && handleSearchStudent()}
//               />
//             </Grid>
//             <Grid item xs={12} md={3}>
//               <Button
//                 fullWidth
//                 variant="contained"
//                 onClick={handleSearchStudent}
//                 disabled={loading}
//                 startIcon={loading ? <CircularProgress size={20} /> : <SearchIcon />}
//                 sx={{ height: 56 }}
//               >
//                 {loading ? 'Searching...' : 'Search'}
//               </Button>
//             </Grid>
//             <Grid item xs={12} md={3}>
//               <Button
//                 fullWidth
//                 variant="outlined"
//                 onClick={handleClearForm}
//                 startIcon={<ClearIcon />}
//                 sx={{ height: 56 }}
//               >
//                 Clear
//               </Button>
//             </Grid>
//           </Grid>
//         </CardContent>
//       </Card>

//       {/* Student Details Section */}
//       {student && (
//         <Card sx={{ mb: 3, boxShadow: 3 }}>
//           <CardContent>
//             <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
//               <PersonIcon sx={{ mr: 1 }} />
//               Student Information
//             </Typography>
            
//             <Grid container spacing={2}>
//               <Grid item xs={12} md={6}>
//                 <Paper sx={{ p: 2, backgroundColor: '#f8fafc' }}>
//                   <Typography variant="subtitle2" color="text.secondary">Name</Typography>
//                   <Typography variant="body1" sx={{ fontWeight: 600 }}>
//                     {student.name}
//                   </Typography>
//                 </Paper>
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <Paper sx={{ p: 2, backgroundColor: '#f8fafc' }}>
//                   <Typography variant="subtitle2" color="text.secondary">GR Number</Typography>
//                   <Typography variant="body1" sx={{ fontWeight: 600 }}>
//                     {student.studentDetails?.grNumber}
//                   </Typography>
//                 </Paper>
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <Paper sx={{ p: 2, backgroundColor: '#f8fafc' }}>
//                   <Typography variant="subtitle2" color="text.secondary">Class</Typography>
//                   <Typography variant="body1" sx={{ fontWeight: 600 }}>
//                     {student.studentDetails?.class?.name} - {student.studentDetails?.class?.division}
//                   </Typography>
//                 </Paper>
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <Paper sx={{ p: 2, backgroundColor: '#f8fafc' }}>
//                   <Typography variant="subtitle2" color="text.secondary">Current Transport Status</Typography>
//                   <Chip
//                     label={student.studentDetails?.transportDetails?.isApplicable ? 'Transport Applicable' : 'No Transport'}
//                     color={student.studentDetails?.transportDetails?.isApplicable ? 'success' : 'default'}
//                     variant="outlined"
//                   />
//                 </Paper>
//               </Grid>
//             </Grid>
//           </CardContent>
//         </Card>
//       )}

//       {/* Transport Details Form */}
//       {student && (
//         <Card sx={{ boxShadow: 3 }}>
//           <CardContent>
//             <Typography variant="h6" sx={{ mb: 3 }}>
//               Transportation Details
//             </Typography>

//             <Grid container spacing={3}>
//               {/* Transport Applicability */}
//               <Grid item xs={12}>
//                 <FormControl component="fieldset">
//                   <FormLabel component="legend" sx={{ mb: 1, fontWeight: 600 }}>
//                     Is transportation applicable for this student?
//                   </FormLabel>
//                   <RadioGroup
//                     row
//                     value={transportData.isApplicable.toString()}
//                     onChange={handleTransportApplicabilityChange}
//                   >
//                     <FormControlLabel
//                       value="true"
//                       control={<Radio />}
//                       label="Yes, transport is applicable"
//                     />
//                     <FormControlLabel
//                       value="false"
//                       control={<Radio />}
//                       label="No transport required"
//                     />
//                   </RadioGroup>
//                 </FormControl>
//               </Grid>

//               {/* Distance and Slab (only if transport is applicable) */}
//               {transportData.isApplicable && (
//                 <>
//                   <Grid item xs={12} md={6}>
//                     <TextField
//                       fullWidth
//                       label="Distance from School (km)"
//                       type="number"
//                       value={transportData.distance}
//                       onChange={handleDistanceChange}
//                       placeholder="Enter distance in kilometers"
//                       inputProps={{ min: 0, step: 0.1 }}
//                       helperText="Distance will automatically determine the fare slab"
//                     />
//                   </Grid>

//                   <Grid item xs={12} md={6}>
//                     <FormControl fullWidth>
//                       <InputLabel>Distance Slab</InputLabel>
//                       <Select
//                         value={transportData.distanceSlab}
//                         label="Distance Slab"
//                         onChange={(e) => setTransportData(prev => ({
//                           ...prev,
//                           distanceSlab: e.target.value
//                         }))}
//                       >
//                         {distanceSlabs.map((slab) => (
//                           <MenuItem key={slab.value} value={slab.value}>
//                             {slab.label}
//                           </MenuItem>
//                         ))}
//                       </Select>
//                     </FormControl>
//                   </Grid>

//                   {/* Current Transport Details Display */}
//                   {transportData.distance && transportData.distanceSlab && (
//                     <Grid item xs={12}>
//                       <Alert severity="info" sx={{ mt: 1 }}>
//                         <Typography variant="body2">
//                           <strong>Transport Summary:</strong> Distance: {transportData.distance} km, 
//                           Fare Slab: {distanceSlabs.find(s => s.value === transportData.distanceSlab)?.label}
//                         </Typography>
//                       </Alert>
//                     </Grid>
//                   )}
//                 </>
//               )}

//               {/* Action Buttons */}
//               <Grid item xs={12}>
//                 <Divider sx={{ my: 2 }} />
//                 <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
//                   <Button
//                     variant="outlined"
//                     onClick={handleClearForm}
//                     startIcon={<ClearIcon />}
//                   >
//                     Clear Form
//                   </Button>
//                   <Button
//                     variant="contained"
//                     onClick={handleSaveTransport}
//                     disabled={saving}
//                     startIcon={saving ? <CircularProgress size={20} /> : <SaveIcon />}
//                     sx={{
//                       backgroundColor: '#1976d2',
//                       '&:hover': { backgroundColor: '#1565c0' }
//                     }}
//                   >
//                     {saving ? 'Saving...' : 'Save Transport Details'}
//                   </Button>
//                 </Box>
//               </Grid>
//             </Grid>
//           </CardContent>
//         </Card>
//       )}

//       {/* Alert Snackbar */}
//       <Snackbar
//         open={alert.open}
//         autoHideDuration={6000}
//         onClose={handleCloseAlert}
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//       >
//         <Alert
//           onClose={handleCloseAlert}
//           severity={alert.severity}
//           sx={{ width: '100%' }}
//         >
//           {alert.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//     </FeesManagerLayout>
//   );
// };

// export default TransportManagement;





import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  InputLabel,
  Alert,
  Snackbar,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Chip
} from '@mui/material';
import {
  Search as SearchIcon,
  DirectionsBus as TransportIcon,
  Person as PersonIcon,
  Save as SaveIcon,
  Clear as ClearIcon
} from '@mui/icons-material';
import { useRouter } from 'next/router';
import feesService from '../../services/feesService';
import FeesManagerLayout from '../../components/layout/FeesManagerLayout';

const TransportManagement = () => {
  const router = useRouter();
  const [searchGrNumber, setSearchGrNumber] = useState('');
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [transportData, setTransportData] = useState({
    isApplicable: false,
    distance: '',
    distanceSlab: ''
  });
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'info' });

  const distanceSlabs = [
    { value: '0-10km', label: '0-10 km' },
    { value: '10-20km', label: '10-20 km' },
    { value: '20-30km', label: '20-30 km' },
    { value: '30+km', label: '30+ km' }
  ];

  const handleSearchStudent = async () => {
    if (!searchGrNumber.trim()) {
      showAlert('Please enter a GR number', 'warning');
      return;
    }

    setLoading(true);
    try {
      // Updated to use the correct backend endpoint
      const response = await feesService.getStudentTransport(searchGrNumber);
      setStudent(response.student);
      
      // Set existing transport data from the response
      const transport = response.transportDetails;
      if (transport) {
        setTransportData({
          isApplicable: transport.isApplicable || false,
          distance: transport.distance || '',
          distanceSlab: transport.distanceSlab || ''
        });
      } else {
        // Reset form for new student
        setTransportData({
          isApplicable: false,
          distance: '',
          distanceSlab: ''
        });
      }
      
      showAlert('Student found successfully', 'success');
    } catch (error) {
      console.error('Error fetching student:', error);
      setStudent(null);
      showAlert(error.response?.data?.message || 'Student not found', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleTransportApplicabilityChange = (event) => {
    const isApplicable = event.target.value === 'true';
    setTransportData(prev => ({
      ...prev,
      isApplicable,
      distance: isApplicable ? prev.distance : '',
      distanceSlab: isApplicable ? prev.distanceSlab : ''
    }));
  };

  const handleDistanceChange = (event) => {
    const distance = parseFloat(event.target.value);
    let distanceSlab = '';
    
    if (distance >= 0 && distance <= 10) distanceSlab = '0-10km';
    else if (distance > 10 && distance <= 20) distanceSlab = '10-20km';
    else if (distance > 20 && distance <= 30) distanceSlab = '20-30km';
    else if (distance > 30) distanceSlab = '30+km';

    setTransportData(prev => ({
      ...prev,
      distance: event.target.value,
      distanceSlab
    }));
  };

  const handleSaveTransport = async () => {
    if (!student) {
      showAlert('Please search and select a student first', 'warning');
      return;
    }

    if (transportData.isApplicable && (!transportData.distance || !transportData.distanceSlab)) {
      showAlert('Please enter distance and distance slab for transport applicable students', 'warning');
      return;
    }

    setSaving(true);
    try {
      const payload = {
        isApplicable: transportData.isApplicable,
        distance: transportData.isApplicable ? parseFloat(transportData.distance) : null,
        distanceSlab: transportData.isApplicable ? transportData.distanceSlab : null
      };

      await feesService.updateStudentTransport(student.studentDetails.grNumber, payload);
      
      // Update local student data
      setStudent(prev => ({
        ...prev,
        studentDetails: {
          ...prev.studentDetails,
          transportDetails: payload
        }
      }));

      showAlert('Transport details saved successfully', 'success');
    } catch (error) {
      console.error('Error saving transport details:', error);
      showAlert(error.response?.data?.message || 'Failed to save transport details', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleClearForm = () => {
    setSearchGrNumber('');
    setStudent(null);
    setTransportData({
      isApplicable: false,
      distance: '',
      distanceSlab: ''
    });
  };

  const showAlert = (message, severity) => {
    setAlert({ open: true, message, severity });
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <FeesManagerLayout>
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a365d', mb: 1 }}>
          <TransportIcon sx={{ mr: 2, verticalAlign: 'middle' }} />
          Student Transport Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage transportation details for students including distance and fare calculations
        </Typography>
      </Box>

      {/* Student Search Section */}
      <Card sx={{ mb: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
            <SearchIcon sx={{ mr: 1 }} />
            Search Student
          </Typography>
          
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Enter GR Number"
                value={searchGrNumber}
                onChange={(e) => setSearchGrNumber(e.target.value)}
                placeholder="e.g., GR001234"
                onKeyPress={(e) => e.key === 'Enter' && handleSearchStudent()}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Button
                fullWidth
                variant="contained"
                onClick={handleSearchStudent}
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : <SearchIcon />}
                sx={{ height: 56 }}
              >
                {loading ? 'Searching...' : 'Search'}
              </Button>
            </Grid>
            <Grid item xs={12} md={3}>
              <Button
                fullWidth
                variant="outlined"
                onClick={handleClearForm}
                startIcon={<ClearIcon />}
                sx={{ height: 56 }}
              >
                Clear
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Student Details Section */}
      {student && (
        <Card sx={{ mb: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <PersonIcon sx={{ mr: 1 }} />
              Student Information
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2, backgroundColor: '#f8fafc' }}>
                  <Typography variant="subtitle2" color="text.secondary">Name</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {student.name}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2, backgroundColor: '#f8fafc' }}>
                  <Typography variant="subtitle2" color="text.secondary">GR Number</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {student.studentDetails?.grNumber}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2, backgroundColor: '#f8fafc' }}>
                  <Typography variant="subtitle2" color="text.secondary">Class</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {student.studentDetails?.class?.name} - {student.studentDetails?.class?.division}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2, backgroundColor: '#f8fafc' }}>
                  <Typography variant="subtitle2" color="text.secondary">Current Transport Status</Typography>
                  <Chip
                    label={transportData.isApplicable ? 'Transport Applicable' : 'No Transport'}
                    color={transportData.isApplicable ? 'success' : 'default'}
                    variant="outlined"
                  />
                </Paper>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Transport Details Form */}
      {student && (
        <Card sx={{ boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Transportation Details
            </Typography>

            <Grid container spacing={3}>
              {/* Transport Applicability */}
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend" sx={{ mb: 1, fontWeight: 600 }}>
                    Is transportation applicable for this student?
                  </FormLabel>
                  <RadioGroup
                    row
                    value={transportData.isApplicable.toString()}
                    onChange={handleTransportApplicabilityChange}
                  >
                    <FormControlLabel
                      value="true"
                      control={<Radio />}
                      label="Yes, transport is applicable"
                    />
                    <FormControlLabel
                      value="false"
                      control={<Radio />}
                      label="No transport required"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>

              {/* Distance and Slab (only if transport is applicable) */}
              {transportData.isApplicable && (
                <>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Distance from School (km)"
                      type="number"
                      value={transportData.distance}
                      onChange={handleDistanceChange}
                      placeholder="Enter distance in kilometers"
                      inputProps={{ min: 0, step: 0.1 }}
                      helperText="Distance will automatically determine the fare slab"
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel>Distance Slab</InputLabel>
                      <Select
                        value={transportData.distanceSlab}
                        label="Distance Slab"
                        onChange={(e) => setTransportData(prev => ({
                          ...prev,
                          distanceSlab: e.target.value
                        }))}
                      >
                        {distanceSlabs.map((slab) => (
                          <MenuItem key={slab.value} value={slab.value}>
                            {slab.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Current Transport Details Display */}
                  {transportData.distance && transportData.distanceSlab && (
                    <Grid item xs={12}>
                      <Alert severity="info" sx={{ mt: 1 }}>
                        <Typography variant="body2">
                          <strong>Transport Summary:</strong> Distance: {transportData.distance} km, 
                          Fare Slab: {distanceSlabs.find(s => s.value === transportData.distanceSlab)?.label}
                        </Typography>
                      </Alert>
                    </Grid>
                  )}
                </>
              )}

              {/* Action Buttons */}
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                  <Button
                    variant="outlined"
                    onClick={handleClearForm}
                    startIcon={<ClearIcon />}
                  >
                    Clear Form
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleSaveTransport}
                    disabled={saving}
                    startIcon={saving ? <CircularProgress size={20} /> : <SaveIcon />}
                    sx={{
                      backgroundColor: '#1976d2',
                      '&:hover': { backgroundColor: '#1565c0' }
                    }}
                  >
                    {saving ? 'Saving...' : 'Save Transport Details'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Alert Snackbar */}
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alert.severity}
          sx={{ width: '100%' }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
    </FeesManagerLayout>
  );
};

export default TransportManagement;
