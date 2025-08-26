

// // src/components/clerk/admissions/ExistingStudentForm.js
// import { useState } from "react";
// import {
//   TextField,
//   Button,
//   Typography,
//   Grid,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Paper,
//   Box,
//   Divider,
//   Card,
//   CardContent,
// } from "@mui/material";
// import { DatePicker } from "@mui/x-date-pickers";

// const ExistingStudentForm = ({ classes, onSubmit, loading }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     dob: null,
//     gender: "",
//     mobile: "",
//     parentName: "",
//     parentEmail: "",
//     parentMobile: "",
//     parentOccupation: "",
//     address: {
//       street: "",
//       city: "",
//       state: "",
//       pincode: "",
//     },
//     grNumber: "",
//     classId: "",
//     admissionType: "Regular",
//     password: "",
//     parentPassword: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name in formData.address) {
//       setFormData((prev) => ({
//         ...prev,
//         address: {
//           ...prev.address,
//           [name]: value,
//         },
//       }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleDateChange = (date) => {
//     setFormData((prev) => ({ ...prev, dob: date }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <Box
//       component="form"
//       onSubmit={handleSubmit}
//       sx={{ maxWidth: 1200, mx: "auto" }}
//     >
//       {/* Student Information Section */}
//       <Card sx={{ mb: 3 }}>
//         <CardContent>
//           <Typography variant="h5" gutterBottom color="primary" sx={{ mb: 3 }}>
//             Student Information
//           </Typography>
//           <Grid container spacing={3}>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Full Name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//                 variant="outlined"
//                 size="medium"
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Email Address"
//                 name="email"
//                 type="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 variant="outlined"
//                 size="medium"
//               />
//             </Grid>
//             <Grid item xs={12} sm={6} md={4}>
//               <DatePicker
//                 label="Date of Birth"
//                 value={formData.dob}
//                 onChange={handleDateChange}
//                 renderInput={(params) => (
//                   <TextField
//                     {...params}
//                     fullWidth
//                     required
//                     variant="outlined"
//                     size="medium"
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6} md={4}>
//               <FormControl fullWidth required variant="outlined" size="medium">
//                 <InputLabel shrink sx={{ width: '150px' }}>
//   Gender
// </InputLabel>

//                 <Select
//                   name="gender"
//                   value={formData.gender}
//                   onChange={handleChange}
//                   label="Gender"
//                 >
//                   <MenuItem value="Male">Male</MenuItem>
//                   <MenuItem value="Female">Female</MenuItem>
//                   <MenuItem value="Other">Other</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} sm={6} md={4}>
//               <TextField
//                 fullWidth
//                 label="Mobile Number"
//                 name="mobile"
//                 value={formData.mobile}
//                 onChange={handleChange}
//                 required
//                 variant="outlined"
//                 size="medium"
//               />
//             </Grid>
//             <Grid item xs={12} sm={6} md={4}>
//               <TextField
//                 fullWidth
//                 label="GR Number"
//                 name="grNumber"
//                 value={formData.grNumber}
//                 onChange={handleChange}
//                 required
//                 variant="outlined"
//                 size="medium"
//                 helperText="General Register Number"
//               />
//             </Grid>
//             <Grid item xs={12} sm={6} md={4}>
//               <FormControl fullWidth required variant="outlined" size="medium">
//                 <InputLabel>Class</InputLabel>
//                 <Select
//                   name="classId"
//                   value={formData.classId}
//                   onChange={handleChange}
//                   label="Class"
//                 >
//                   {classes.map((cls) => (
//                     <MenuItem key={cls._id} value={cls._id}>
//                       {cls.name} {cls.division}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} sm={6} md={4}>
//               <FormControl fullWidth required variant="outlined" size="medium">
//                 <InputLabel>Admission Type</InputLabel>
//                 <Select
//                   name="admissionType"
//                   value={formData.admissionType}
//                   onChange={handleChange}
//                   label="Admission Type"
//                 >
//                   <MenuItem value="Regular">Regular</MenuItem>
//                   <MenuItem value="RTE">RTE (Right to Education)</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>
//           </Grid>
//         </CardContent>
//       </Card>

//       {/* Account Security Section */}
//       <Card sx={{ mb: 3 }}>
//         <CardContent>
//           <Typography variant="h6" gutterBottom color="primary" sx={{ mb: 3 }}>
//             Account Security
//           </Typography>
//           <Grid container spacing={3}>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Student Password"
//                 name="password"
//                 type="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//                 variant="outlined"
//                 size="medium"
//                 helperText="Password for student login"
//               />
//             </Grid>
//           </Grid>
//         </CardContent>
//       </Card>

//       {/* Parent Information Section */}
//       <Card sx={{ mb: 3 }}>
//         <CardContent>
//           <Typography variant="h5" gutterBottom color="primary" sx={{ mb: 3 }}>
//             Parent/Guardian Information
//           </Typography>
//           <Grid container spacing={3}>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Parent/Guardian Name"
//                 name="parentName"
//                 value={formData.parentName}
//                 onChange={handleChange}
//                 required
//                 variant="outlined"
//                 size="medium"
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Parent Email Address"
//                 name="parentEmail"
//                 type="email"
//                 value={formData.parentEmail}
//                 onChange={handleChange}
//                 required
//                 variant="outlined"
//                 size="medium"
//               />
//             </Grid>
//             <Grid item xs={12} sm={6} md={4}>
//               <TextField
//                 fullWidth
//                 label="Parent Mobile Number"
//                 name="parentMobile"
//                 value={formData.parentMobile}
//                 onChange={handleChange}
//                 required
//                 variant="outlined"
//                 size="medium"
//               />
//             </Grid>
//             <Grid item xs={12} sm={6} md={4}>
//               <TextField
//                 fullWidth
//                 label="Parent Occupation"
//                 name="parentOccupation"
//                 value={formData.parentOccupation}
//                 onChange={handleChange}
//                 variant="outlined"
//                 size="medium"
//               />
//             </Grid>
//             <Grid item xs={12} sm={6} md={4}>
//               <TextField
//                 fullWidth
//                 label="Parent Password"
//                 name="parentPassword"
//                 type="password"
//                 value={formData.parentPassword}
//                 onChange={handleChange}
//                 required
//                 variant="outlined"
//                 size="medium"
//                 helperText="Password for parent login"
//               />
//             </Grid>
//           </Grid>
//         </CardContent>
//       </Card>

//       {/* Address Information Section */}
//       <Card sx={{ mb: 4 }}>
//         <CardContent>
//           <Typography variant="h6" gutterBottom color="primary" sx={{ mb: 3 }}>
//             Address Information
//           </Typography>
//           <Grid container spacing={3}>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Street Address"
//                 name="street"
//                 value={formData.address.street}
//                 onChange={handleChange}
//                 required
//                 variant="outlined"
//                 size="medium"
//                 multiline
//                 rows={2}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6} md={4}>
//               <TextField
//                 fullWidth
//                 label="City"
//                 name="city"
//                 value={formData.address.city}
//                 onChange={handleChange}
//                 required
//                 variant="outlined"
//                 size="medium"
//               />
//             </Grid>
//             <Grid item xs={12} sm={6} md={4}>
//               <TextField
//                 fullWidth
//                 label="State"
//                 name="state"
//                 value={formData.address.state}
//                 onChange={handleChange}
//                 required
//                 variant="outlined"
//                 size="medium"
//               />
//             </Grid>
//             <Grid item xs={12} sm={6} md={4}>
//               <TextField
//                 fullWidth
//                 label="Pincode"
//                 name="pincode"
//                 value={formData.address.pincode}
//                 onChange={handleChange}
//                 required
//                 variant="outlined"
//                 size="medium"
//               />
//             </Grid>
//           </Grid>
//         </CardContent>
//       </Card>

//       {/* Submit Button */}
//       <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
//         <Button
//           type="submit"
//           variant="contained"
//           color="primary"
//           size="large"
//           disabled={loading}
//           sx={{
//             minWidth: 200,
//             py: 1.5,
//             px: 4,
//             borderRadius: 2,
//             textTransform: "none",
//             fontSize: "1.1rem",
//             fontWeight: 600,
//           }}
//         >
//           {loading ? "Registering Student..." : "Register Student"}
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default ExistingStudentForm;






// src/components/clerk/admissions/ExistingStudentForm.js
import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Box,
  Divider,
  Card,
  CardContent,
  Alert,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

const ExistingStudentForm = ({ classes, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dob: null,
    gender: "",
    mobile: "",
    parentName: "",
    parentEmail: "",
    parentMobile: "",
    parentOccupation: "",
    address: {
      street: "",
      city: "",
      state: "",
      pincode: "",
    },
    grNumber: "",
    classId: "",
    admissionType: "Regular",
    password: "",
    parentPassword: "",
    // New fields added
    religion: "",
    caste: "",
    subCaste: "",
    admissionDate: null,
    uidNumber: "",
    studentAadharNumber: "",
    parentAadharNumber: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.address) {
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, dob: date }));
    if (errors.dob) {
      setErrors(prev => ({ ...prev, dob: '' }));
    }
  };

  const handleAdmissionDateChange = (date) => {
    setFormData((prev) => ({ ...prev, admissionDate: date }));
    if (errors.admissionDate) {
      setErrors(prev => ({ ...prev, admissionDate: '' }));
    }
  };

  // Comprehensive validation function
  const validateForm = () => {
    const newErrors = {};

    // Required field validation
    const requiredFields = [
      'name', 'email', 'gender', 'mobile', 'parentName', 
      'parentEmail', 'parentMobile', 'grNumber', 'classId', 
      'password', 'parentPassword', 'religion', 'caste', 
      'uidNumber', 'studentAadharNumber', 'parentAadharNumber'
    ];

    requiredFields.forEach(field => {
      if (!formData[field] || formData[field].trim() === '') {
        newErrors[field] = `${field.replace(/([A-Z])/g, ' $1').toLowerCase()} is required`;
      }
    });

    // Date validation
    if (!formData.dob) {
      newErrors.dob = 'Date of birth is required';
    }

    if (!formData.admissionDate) {
      newErrors.admissionDate = 'Admission date is required';
    }

    // Address validation
    if (!formData.address.street?.trim()) {
      newErrors.street = 'Street address is required';
    }
    if (!formData.address.city?.trim()) {
      newErrors.city = 'City is required';
    }
    if (!formData.address.state?.trim()) {
      newErrors.state = 'State is required';
    }
    if (!formData.address.pincode?.trim()) {
      newErrors.pincode = 'Pincode is required';
    }

    // Format validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (formData.parentEmail && !emailRegex.test(formData.parentEmail)) {
      newErrors.parentEmail = 'Invalid parent email format';
    }

    const mobileRegex = /^[0-9]{10}$/;
    if (formData.mobile && !mobileRegex.test(formData.mobile)) {
      newErrors.mobile = 'Mobile number must be 10 digits';
    }
    if (formData.parentMobile && !mobileRegex.test(formData.parentMobile)) {
      newErrors.parentMobile = 'Parent mobile number must be 10 digits';
    }

    const aadharRegex = /^[0-9]{12}$/;
    if (formData.studentAadharNumber && !aadharRegex.test(formData.studentAadharNumber)) {
      newErrors.studentAadharNumber = 'Student Aadhar number must be 12 digits';
    }
    if (formData.parentAadharNumber && !aadharRegex.test(formData.parentAadharNumber)) {
      newErrors.parentAadharNumber = 'Parent Aadhar number must be 12 digits';
    }

    const pincodeRegex = /^[0-9]{6}$/;
    if (formData.address.pincode && !pincodeRegex.test(formData.address.pincode)) {
      newErrors.pincode = 'Pincode must be 6 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatDataForSubmission = (data) => {
    // Create a clean copy of the data
    const submissionData = {
      ...data,
      // Ensure dates are in ISO format
      dob: data.dob ? new Date(data.dob).toISOString() : null,
      admissionDate: data.admissionDate ? new Date(data.admissionDate).toISOString() : null,
      // Ensure all string fields are trimmed
      name: data.name?.trim(),
      email: data.email?.trim().toLowerCase(),
      parentName: data.parentName?.trim(),
      parentEmail: data.parentEmail?.trim().toLowerCase(),
      grNumber: data.grNumber?.trim().toUpperCase(),
      religion: data.religion?.trim(),
      caste: data.caste?.trim(),
      subCaste: data.subCaste?.trim() || undefined, // Send undefined instead of empty string
      uidNumber: data.uidNumber?.trim(),
      studentAadharNumber: data.studentAadharNumber?.trim(),
      parentAadharNumber: data.parentAadharNumber?.trim(),
      mobile: data.mobile?.trim(),
      parentMobile: data.parentMobile?.trim(),
      parentOccupation: data.parentOccupation?.trim() || undefined,
      // Clean address object
      address: {
        street: data.address.street?.trim(),
        city: data.address.city?.trim(),
        state: data.address.state?.trim(),
        pincode: data.address.pincode?.trim(),
      }
    };

    // Remove any undefined values to avoid backend issues
    Object.keys(submissionData).forEach(key => {
      if (submissionData[key] === undefined || submissionData[key] === '') {
        if (key !== 'subCaste' && key !== 'parentOccupation') {
          delete submissionData[key];
        }
      }
    });

    return submissionData;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Form data before validation:', formData);
    
    if (!validateForm()) {
      console.log('Validation failed:', errors);
      return;
    }

    const submissionData = formatDataForSubmission(formData);
    console.log('Formatted submission data:', submissionData);
    
    onSubmit(submissionData);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 1200, mx: "auto" }}
    >
      {/* Show validation errors if any */}
      {Object.keys(errors).length > 0 && (
        <Alert severity="error" sx={{ mb: 3 }}>
          Please fix the following errors:
          <ul style={{ margin: '8px 0 0 20px' }}>
            {Object.values(errors).map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </Alert>
      )}

      {/* Student Information Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom color="primary" sx={{ mb: 3 }}>
            Student Information
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                variant="outlined"
                size="medium"
                error={!!errors.name}
                helperText={errors.name}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                variant="outlined"
                size="medium"
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <DatePicker
                label="Date of Birth"
                value={formData.dob}
                onChange={handleDateChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    required
                    variant="outlined"
                    size="medium"
                    error={!!errors.dob}
                    helperText={errors.dob}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth required variant="outlined" size="medium" error={!!errors.gender}>
                <InputLabel shrink sx={{ width: '150px' }}>
                  Gender
                </InputLabel>
                <Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  label="Gender"
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
                {errors.gender && (
                  <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                    {errors.gender}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Mobile Number"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
                variant="outlined"
                size="medium"
                inputProps={{ maxLength: 10 }}
                helperText={errors.mobile || "10 digit mobile number"}
                error={!!errors.mobile}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="GR Number"
                name="grNumber"
                value={formData.grNumber}
                onChange={handleChange}
                required
                variant="outlined"
                size="medium"
                helperText={errors.grNumber || "General Register Number"}
                error={!!errors.grNumber}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth required variant="outlined" size="medium" error={!!errors.classId}>
                <InputLabel>Class</InputLabel>
                <Select
                  name="classId"
                  value={formData.classId}
                  onChange={handleChange}
                  label="Class"
                >
                  {classes.map((cls) => (
                    <MenuItem key={cls._id} value={cls._id}>
                      {cls.name} {cls.division}
                    </MenuItem>
                  ))}
                </Select>
                {errors.classId && (
                  <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                    {errors.classId}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth required variant="outlined" size="medium">
                <InputLabel>Admission Type</InputLabel>
                <Select
                  name="admissionType"
                  value={formData.admissionType}
                  onChange={handleChange}
                  label="Admission Type"
                >
                  <MenuItem value="Regular">Regular</MenuItem>
                  <MenuItem value="RTE">RTE (Right to Education)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <DatePicker
                label="Admission Date"
                value={formData.admissionDate}
                onChange={handleAdmissionDateChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    required
                    variant="outlined"
                    size="medium"
                    error={!!errors.admissionDate}
                    helperText={errors.admissionDate}
                  />
                )}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Student Personal Details Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom color="primary" sx={{ mb: 3 }}>
            Personal & Identity Details
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Religion"
                name="religion"
                value={formData.religion}
                onChange={handleChange}
                required
                variant="outlined"
                size="medium"
                error={!!errors.religion}
                helperText={errors.religion}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Caste"
                name="caste"
                value={formData.caste}
                onChange={handleChange}
                required
                variant="outlined"
                size="medium"
                error={!!errors.caste}
                helperText={errors.caste}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Sub-Caste (Optional)"
                name="subCaste"
                value={formData.subCaste}
                onChange={handleChange}
                variant="outlined"
                size="medium"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                label="UID Number"
                name="uidNumber"
                value={formData.uidNumber}
                onChange={handleChange}
                required
                variant="outlined"
                size="medium"
                helperText={errors.uidNumber || "Unique Identification Number"}
                error={!!errors.uidNumber}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                label="Student Aadhar Number"
                name="studentAadharNumber"
                value={formData.studentAadharNumber}
                onChange={handleChange}
                required
                variant="outlined"
                size="medium"
                inputProps={{ maxLength: 12 }}
                helperText={errors.studentAadharNumber || "12 digit Aadhar number"}
                error={!!errors.studentAadharNumber}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Account Security Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom color="primary" sx={{ mb: 3 }}>
            Account Security
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Student Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                variant="outlined"
                size="medium"
                helperText={errors.password || "Password for student login"}
                error={!!errors.password}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Parent Information Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom color="primary" sx={{ mb: 3 }}>
            Parent/Guardian Information
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Parent/Guardian Name"
                name="parentName"
                value={formData.parentName}
                onChange={handleChange}
                required
                variant="outlined"
                size="medium"
                error={!!errors.parentName}
                helperText={errors.parentName}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Parent Email Address"
                name="parentEmail"
                type="email"
                value={formData.parentEmail}
                onChange={handleChange}
                required
                variant="outlined"
                size="medium"
                error={!!errors.parentEmail}
                helperText={errors.parentEmail}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Parent Mobile Number"
                name="parentMobile"
                value={formData.parentMobile}
                onChange={handleChange}
                required
                variant="outlined"
                size="medium"
                inputProps={{ maxLength: 10 }}
                helperText={errors.parentMobile || "10 digit mobile number"}
                error={!!errors.parentMobile}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Parent Occupation"
                name="parentOccupation"
                value={formData.parentOccupation}
                onChange={handleChange}
                variant="outlined"
                size="medium"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Parent Aadhar Number"
                name="parentAadharNumber"
                value={formData.parentAadharNumber}
                onChange={handleChange}
                required
                variant="outlined"
                size="medium"
                inputProps={{ maxLength: 12 }}
                helperText={errors.parentAadharNumber || "12 digit Aadhar number"}
                error={!!errors.parentAadharNumber}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Parent Password"
                name="parentPassword"
                type="password"
                value={formData.parentPassword}
                onChange={handleChange}
                required
                variant="outlined"
                size="medium"
                helperText={errors.parentPassword || "Password for parent login"}
                error={!!errors.parentPassword}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Address Information Section */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom color="primary" sx={{ mb: 3 }}>
            Address Information
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Street Address"
                name="street"
                value={formData.address.street}
                onChange={handleChange}
                required
                variant="outlined"
                size="medium"
                multiline
                rows={2}
                error={!!errors.street}
                helperText={errors.street}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="City"
                name="city"
                value={formData.address.city}
                onChange={handleChange}
                required
                variant="outlined"
                size="medium"
                error={!!errors.city}
                helperText={errors.city}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="State"
                name="state"
                value={formData.address.state}
                onChange={handleChange}
                required
                variant="outlined"
                size="medium"
                error={!!errors.state}
                helperText={errors.state}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Pincode"
                name="pincode"
                value={formData.address.pincode}
                onChange={handleChange}
                required
                variant="outlined"
                size="medium"
                inputProps={{ maxLength: 6 }}
                error={!!errors.pincode}
                helperText={errors.pincode || "6 digit pincode"}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          disabled={loading}
          sx={{
            minWidth: 200,
            py: 1.5,
            px: 4,
            borderRadius: 2,
            textTransform: "none",
            fontSize: "1.1rem",
            fontWeight: 600,
          }}
        >
          {loading ? "Registering Student..." : "Register Student"}
        </Button>
      </Box>
    </Box>


  );
};

export default ExistingStudentForm;






