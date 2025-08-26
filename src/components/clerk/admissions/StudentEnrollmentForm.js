import { useState } from 'react';
import { TextField, Button, Typography, Grid } from '@mui/material';

const StudentEnrollmentForm = ({ application, classes, onSubmit }) => {
  const [formData, setFormData] = useState({
    classId: '',
    grNumber: '',
    password: '',
    parentPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(application.id, formData.classId, formData.grNumber, formData.password, formData.parentPassword);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Typography variant="h6">Enroll Student</Typography>

      <ClassSelector 
        classes={classes} 
        value={formData.classId}
        onChange={(e) => setFormData({ ...formData, classId: e.target.value })}
      />

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="GR Number"
            name="grNumber"
            value={formData.grNumber}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Student Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Parent Password"
            name="parentPassword"
            type="password"
            value={formData.parentPassword}
            onChange={handleChange}
            required
          />
        </Grid>
      </Grid>

      <Button type="submit" variant="contained" color="primary" fullWidth>
        Enroll Student
      </Button>
    </form>
  );
};

export default StudentEnrollmentForm;