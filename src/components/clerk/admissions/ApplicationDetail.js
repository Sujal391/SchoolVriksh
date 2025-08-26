import { useState } from 'react';
import { 
  Button, 
  TextField, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Typography,
  Grid,
  Card,
  CardContent,
  Divider
} from '@mui/material';

const ApplicationDetail = ({ application, onVerify }) => {
  const [verificationStatus, setVerificationStatus] = useState('verified');
  const [comments, setComments] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onVerify(verificationStatus, comments);
  };

  return (
    <Card>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Application Details
            </Typography>
            <Divider />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Student Information
            </Typography>
            <Typography variant="body1">
              <strong>Name:</strong> {application.studentDetails.name}
            </Typography>
            <Typography variant="body1">
              <strong>DOB:</strong> {new Date(application.studentDetails.dob).toLocaleDateString()}
            </Typography>
            <Typography variant="body1">
              <strong>Gender:</strong> {application.studentDetails.gender}
            </Typography>
            <Typography variant="body1">
              <strong>Class:</strong> {application.studentDetails.appliedClass}
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> {application.studentDetails.email}
            </Typography>
            <Typography variant="body1">
              <strong>Mobile:</strong> {application.studentDetails.mobile}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Parent Information
            </Typography>
            <Typography variant="body1">
              <strong>Name:</strong> {application.parentDetails.name}
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> {application.parentDetails.email}
            </Typography>
            <Typography variant="body1">
              <strong>Mobile:</strong> {application.parentDetails.mobile}
            </Typography>
            <Typography variant="body1">
              <strong>Occupation:</strong> {application.parentDetails.occupation || 'N/A'}
            </Typography>
            <Typography variant="body1">
              <strong>Address:</strong> {[
                application.parentDetails.address.street,
                application.parentDetails.address.city,
                application.parentDetails.address.state,
                application.parentDetails.address.pincode
              ].join(', ')}
            </Typography>
          </Grid>

          {application.clerkVerification.status === 'pending' && (
            <Grid item xs={12}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">
                      Verification Form
                    </Typography>
                    <Divider />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel>Verification Status</InputLabel>
                      <Select
                        value={verificationStatus}
                        onChange={(e) => setVerificationStatus(e.target.value)}
                        required
                        label="Verification Status"
                      >
                        <MenuItem value="verified">Verified</MenuItem>
                        <MenuItem value="rejected">Rejected</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Comments"
                      fullWidth
                      multiline
                      rows={3}
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button 
                      type="submit" 
                      variant="contained" 
                      color="primary"
                      size="large"
                    >
                      Submit Verification
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          )}

          {application.clerkVerification.status !== 'pending' && (
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Verification Details
              </Typography>
              <Divider />
              <Typography variant="body1">
                <strong>Status:</strong> {application.clerkVerification.status}
              </Typography>
              <Typography variant="body1">
                <strong>Comments:</strong> {application.clerkVerification.comments || 'None'}
              </Typography>
              <Typography variant="body1">
                <strong>Verified At:</strong> {new Date(application.clerkVerification.verifiedAt).toLocaleString()}
              </Typography>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ApplicationDetail;