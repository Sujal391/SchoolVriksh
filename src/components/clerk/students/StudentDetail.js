// import { Card, CardContent, Typography, Grid, Button } from '@mui/material';
// import Link from 'next/link';

// const StudentDetail = ({ student }) => {
//   return (
//     <div className="space-y-4">
//       <Card>
//         <CardContent>
//           <Typography variant="h6" gutterBottom>Student Information</Typography>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <Typography><strong>Name:</strong> {student.name}</Typography>
//               <Typography><strong>GR Number:</strong> {student.grNumber}</Typography>
//               <Typography><strong>Class:</strong> {student.className}</Typography>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Typography><strong>Admission Type:</strong> {student.admissionType}</Typography>
//               <Typography><strong>DOB:</strong> {new Date(student.dob).toLocaleDateString()}</Typography>
//               <Typography><strong>Gender:</strong> {student.gender}</Typography>
//             </Grid>
//           </Grid>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardContent>
//           <Typography variant="h6" gutterBottom>Parent Information</Typography>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <Typography><strong>Name:</strong> {student.parentName}</Typography>
//               <Typography><strong>Email:</strong> {student.parentEmail}</Typography>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Typography><strong>Mobile:</strong> {student.parentMobile}</Typography>
//               <Typography><strong>Occupation:</strong> {student.parentOccupation}</Typography>
//             </Grid>
//           </Grid>
//         </CardContent>
//       </Card>

//       <div className="flex space-x-2">
//         <Link href={`/clerk/students/upgrade?id=${student.id}`}>
//           <Button variant="contained" color="primary">
//             Upgrade Class
//           </Button>
//         </Link>
//         <Link href="/clerk/students">
//           <Button variant="outlined">Back to List</Button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default StudentDetail;




// src/components/clerk/students/StudentDetail.js
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Chip,
  Box,
} from '@mui/material';
import {
  School as SchoolIcon,
  CalendarToday as CalendarIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Work as WorkIcon,
  DirectionsBus as TransportIcon,
  Badge as BadgeIcon,
} from '@mui/icons-material';
import Link from 'next/link';

const StudentDetail = ({ student }) => {
  // Utility function to format dates
  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    try {
      return new Date(dateString).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch (error) {
      return 'Invalid date';
    }
  };

  // Utility function to capitalize gender
  const getGenderDisplay = (gender) => {
    if (!gender) return 'Not specified';
    return gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase();
  };

  return (
    <div className="space-y-4">
      {/* Student Information */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SchoolIcon /> Student Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography>
                <strong>Name:</strong> {student.name || 'Not specified'}
              </Typography>
              <Typography>
                <strong>GR Number:</strong> {student.grNumber || 'Not assigned'}
              </Typography>
              <Typography>
                <strong>Class:</strong> {student.className || 'Unknown Class'}
              </Typography>
              <Typography>
                <strong>Admission Type:</strong> {student.admissionType || 'Regular'}
              </Typography>
              <Typography>
                <strong>DOB:</strong> {formatDate(student.dob)}
              </Typography>
              <Typography>
                <strong>Gender:</strong> {getGenderDisplay(student.gender)}
              </Typography>
              <Typography>
                <strong>Mobile:</strong> {student.mobile || 'Not provided'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>
                <strong>Religion:</strong> {student.religion || 'Not specified'}
              </Typography>
              <Typography>
                <strong>Caste:</strong> {student.caste || 'Not specified'}
              </Typography>
              <Typography>
                <strong>Sub-Caste:</strong> {student.subCaste || 'Not specified'}
              </Typography>
              <Typography>
                <strong>UID Number:</strong> {student.uidNumber || 'Not specified'}
              </Typography>
              <Typography>
                <strong>Aadhar Number:</strong> {student.aadharNumber || 'Not specified'}
              </Typography>
              <Typography>
                <strong>Admission Date:</strong> {formatDate(student.admissionDate)}
              </Typography>
              <Typography>
                <strong>RTE Student:</strong>{' '}
                <Chip
                  label={student.isRTE ? 'Yes' : 'No'}
                  size="small"
                  color={student.isRTE ? 'success' : 'default'}
                  variant="outlined"
                />
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                <strong>Status:</strong>{' '}
                <Chip
                  label={student.status || 'Active'}
                  size="small"
                  color={student.status === 'active' ? 'success' : 'error'}
                  variant="outlined"
                />
              </Typography>
              <Typography>
                <strong>Created At:</strong> {formatDate(student.createdAt)}
              </Typography>
              <Typography>
                <strong>Last Updated:</strong> {formatDate(student.updatedAt)}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Parent Information */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PersonIcon /> Parent Information
          </Typography>
          {student.parentDetails ? (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography>
                  <strong>Name:</strong> {student.parentDetails.name || 'Not specified'}
                </Typography>
                <Typography>
                  <strong>Email:</strong> {student.parentDetails.email || 'Not specified'}
                </Typography>
                <Typography>
                  <strong>Mobile:</strong> {student.parentDetails.mobile || 'Not provided'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography>
                  <strong>Occupation:</strong> {student.parentDetails.occupation || 'Not specified'}
                </Typography>
                <Typography>
                  <strong>Aadhar Number:</strong> {student.parentDetails.aadharNumber || 'Not specified'}
                </Typography>
              </Grid>
            </Grid>
          ) : (
            <Typography color="text.secondary">No parent information available</Typography>
          )}
        </CardContent>
      </Card>

      {/* Transport Information */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TransportIcon /> Transport Details
          </Typography>
          {student.transportDetails ? (
            <>
              <Typography>
                <strong>Transport Required:</strong>{' '}
                <Chip
                  label={student.transportDetails.isApplicable ? 'Yes' : 'No'}
                  size="small"
                  color={student.transportDetails.isApplicable ? 'success' : 'default'}
                  variant="outlined"
                />
              </Typography>
              {student.transportDetails.isApplicable && (
                <>
                  <Typography>
                    <strong>Distance:</strong>{' '}
                    {student.transportDetails.distance
                      ? `${student.transportDetails.distance} km`
                      : 'Not specified'}
                  </Typography>
                  <Typography>
                    <strong>Distance Slab:</strong>{' '}
                    {student.transportDetails.distanceSlab || 'Not specified'}
                  </Typography>
                </>
              )}
            </>
          ) : (
            <Typography color="text.secondary">No transport information available</Typography>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Link href={`/clerk/students/upgrade?id=${student.id}`} passHref>
          <Button variant="contained" color="primary" startIcon={<TransportIcon />}>
            Upgrade Class
          </Button>
        </Link>
        <Link href="/clerk/students" passHref>
          <Button variant="outlined" startIcon={<SchoolIcon />}>
            Back to List
          </Button>
        </Link>
      </Box>
    </div>
  );
};

export default StudentDetail;