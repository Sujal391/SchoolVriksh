import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Grid,
  Typography,
  Box,
  Chip,
  Alert
} from '@mui/material';

const GenerateTimetableModal = ({ isOpen, onClose, selectedClasses, onSubmit }) => {
  const [formData, setFormData] = useState({
    schoolType: 'day',
    startTime: '08:00',
    endTime: '15:00',
    periodDuration: 45,
    lunchBreak: true,
    lunchBreakTime: '12:30',
    lunchBreakDuration: 45,
    workingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
    shifts: [],
    customBreaks: [],
    numPeriodsPerDay: 8
  });

  const [error, setError] = useState('');

  const workingDayOptions = [
    { value: 'monday', label: 'Monday' },
    { value: 'tuesday', label: 'Tuesday' },
    { value: 'wednesday', label: 'Wednesday' },
    { value: 'thursday', label: 'Thursday' },
    { value: 'friday', label: 'Friday' },
    { value: 'saturday', label: 'Saturday' },
    { value: 'sunday', label: 'Sunday' }
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleWorkingDayToggle = (day) => {
    setFormData(prev => ({
      ...prev,
      workingDays: prev.workingDays.includes(day)
        ? prev.workingDays.filter(d => d !== day)
        : [...prev.workingDays, day]
    }));
  };

  const handleSubmit = () => {
    // Validation
    if (!formData.startTime || !formData.endTime) {
      setError('Please provide start and end times');
      return;
    }

    if (formData.workingDays.length === 0) {
      setError('Please select at least one working day');
      return;
    }

    if (formData.periodDuration <= 0 || formData.numPeriodsPerDay <= 0) {
      setError('Period duration and number of periods must be greater than 0');
      return;
    }

    setError('');
    onSubmit(formData);
  };

  const handleClose = () => {
    setError('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Generate Timetable</DialogTitle>
      
      <DialogContent dividers>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* Selected Classes Info */}
        <Box sx={{ mb: 3, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
          <Typography variant="subtitle1" gutterBottom>
            Selected Classes ({selectedClasses.length})
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Timetables will be generated for the selected classes
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Basic Configuration */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Basic Configuration
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>School Type</InputLabel>
              <Select
                value={formData.schoolType}
                onChange={(e) => handleChange('schoolType', e.target.value)}
                label="School Type"
              >
                <MenuItem value="day">Day School</MenuItem>
                <MenuItem value="boarding">Boarding School</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Number of Periods per Day"
              type="number"
              value={formData.numPeriodsPerDay}
              onChange={(e) => handleChange('numPeriodsPerDay', parseInt(e.target.value))}
              fullWidth
              inputProps={{ min: 1, max: 12 }}
            />
          </Grid>

          {/* Time Configuration */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Time Configuration
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              label="Start Time"
              type="time"
              value={formData.startTime}
              onChange={(e) => handleChange('startTime', e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              label="End Time"
              type="time"
              value={formData.endTime}
              onChange={(e) => handleChange('endTime', e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              label="Period Duration (minutes)"
              type="number"
              value={formData.periodDuration}
              onChange={(e) => handleChange('periodDuration', parseInt(e.target.value))}
              fullWidth
              inputProps={{ min: 15, max: 120 }}
            />
          </Grid>

          {/* Lunch Break Configuration */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Break Configuration
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.lunchBreak}
                  onChange={(e) => handleChange('lunchBreak', e.target.checked)}
                />
              }
              label="Include Lunch Break"
            />
          </Grid>

          {formData.lunchBreak && (
            <>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Lunch Break Time"
                  type="time"
                  value={formData.lunchBreakTime}
                  onChange={(e) => handleChange('lunchBreakTime', e.target.value)}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Lunch Break Duration (minutes)"
                  type="number"
                  value={formData.lunchBreakDuration}
                  onChange={(e) => handleChange('lunchBreakDuration', parseInt(e.target.value))}
                  fullWidth
                  inputProps={{ min: 15, max: 120 }}
                />
              </Grid>
            </>
          )}

          {/* Working Days */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Working Days
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {workingDayOptions.map((day) => (
                <Chip
                  key={day.value}
                  label={day.label}
                  onClick={() => handleWorkingDayToggle(day.value)}
                  color={formData.workingDays.includes(day.value) ? 'primary' : 'default'}
                  variant={formData.workingDays.includes(day.value) ? 'filled' : 'outlined'}
                  clickable
                />
              ))}
            </Box>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button 
          variant="contained" 
          onClick={handleSubmit}
          disabled={selectedClasses.length === 0}
        >
          Generate Timetable
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GenerateTimetableModal;
