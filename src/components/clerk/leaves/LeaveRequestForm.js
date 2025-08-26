import { useState } from 'react';
import { TextField, Button, Typography, Grid, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

const LeaveRequestForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    reason: '',
    type: 'casual',
    startDate: null,
    endDate: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name, date) => {
    setFormData(prev => ({ ...prev, [name]: date }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Typography variant="h6">Request Leave</Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Leave Type</InputLabel>
            <Select
              name="type"
              value={formData.type}
              onChange={handleChange}
              label="Leave Type"
              required
            >
              <MenuItem value="casual">Casual Leave</MenuItem>
              <MenuItem value="sick">Sick Leave</MenuItem>
              <MenuItem value="emergency">Emergency Leave</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePicker
            label="Start Date"
            value={formData.startDate}
            onChange={(date) => handleDateChange('startDate', date)}
            renderInput={(params) => <TextField {...params} fullWidth required />}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePicker
            label="End Date"
            value={formData.endDate}
            onChange={(date) => handleDateChange('endDate', date)}
            renderInput={(params) => <TextField {...params} fullWidth required />}
            minDate={formData.startDate}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Reason"
            name="reason"
            multiline
            rows={3}
            value={formData.reason}
            onChange={handleChange}
            required
          />
        </Grid>
      </Grid>

      <Button type="submit" variant="contained" color="primary" fullWidth>
        Submit Leave Request
      </Button>
    </form>
  );
};

export default LeaveRequestForm;