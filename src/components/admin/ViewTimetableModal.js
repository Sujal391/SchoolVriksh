import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Grid,
  Card,
  CardContent
} from '@mui/material';

const ViewTimetableModal = ({ isOpen, onClose, timetable, onDownload }) => {
  if (!timetable) return null;

  const { class: classInfo, config, schedule } = timetable;

  // Days of the week
  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  
  // Get working days from config or default
  const workingDays = config?.workingDays || ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
  
  // Filter and sort days
  const displayDays = daysOfWeek.filter(day => workingDays.includes(day));

  // Get periods for each day
  const getPeriodsByDay = (day) => {
    const daySchedule = schedule?.find(s => s.day === day);
    return daySchedule?.periods || [];
  };

  // Get all unique periods across all days
  const getAllPeriods = () => {
    const allPeriods = [];
    schedule?.forEach(daySchedule => {
      daySchedule.periods?.forEach(period => {
        if (!allPeriods.find(p => p.period === period.period)) {
          allPeriods.push(period);
        }
      });
    });
    return allPeriods.sort((a, b) => a.period - b.period);
  };

  const allPeriods = getAllPeriods();

  const formatTime = (time) => {
    if (!time) return '';
    return time;
  };

  const getPeriodColor = (type) => {
    switch (type) {
      case 'subject':
        return 'primary';
      case 'break':
        return 'warning';
      case 'lunch':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="xl" fullWidth>
      <DialogTitle>
        Timetable - {classInfo?.name} {classInfo?.division}
      </DialogTitle>
      
      <DialogContent dividers>
        {/* Timetable Configuration Info */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Configuration Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body2" color="textSecondary">Timetable ID</Typography>
                <Typography variant="body1" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
                  {timetable._id || 'N/A'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body2" color="textSecondary">School Type</Typography>
                <Typography variant="body1">{config?.schoolType || 'N/A'}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body2" color="textSecondary">Time</Typography>
                <Typography variant="body1">
                  {formatTime(config?.startTime)} - {formatTime(config?.endTime)}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body2" color="textSecondary">Period Duration</Typography>
                <Typography variant="body1">{config?.periodDuration || 'N/A'} minutes</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body2" color="textSecondary">Academic Year</Typography>
                <Typography variant="body1">{timetable.academicYear || 'N/A'}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body2" color="textSecondary">Working Days</Typography>
                <Typography variant="body1">
                  {config?.workingDays?.length || 0} days
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body2" color="textSecondary">Total Periods</Typography>
                <Typography variant="body1">
                  {schedule?.reduce((total, day) => total + (day.periods?.length || 0), 0) || 0}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body2" color="textSecondary">Shift</Typography>
                <Typography variant="body1">{timetable.shift || 'None'}</Typography>
              </Grid>
            </Grid>

            {config?.lunchBreak && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="textSecondary">Lunch Break</Typography>
                <Typography variant="body1">
                  {formatTime(config.lunchBreakTime)} ({config.lunchBreakDuration} minutes)
                </Typography>
              </Box>
            )}

            {config?.workingDays && config.workingDays.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="textSecondary">Working Days</Typography>
                <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
                  {config.workingDays.map((day) => (
                    <Chip
                      key={day}
                      label={day.charAt(0).toUpperCase() + day.slice(1)}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </Box>
            )}
          </CardContent>
        </Card>

        {/* Timetable Grid */}
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', bgcolor: 'grey.100' }}>
                  Period
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', bgcolor: 'grey.100' }}>
                  Time
                </TableCell>
                {displayDays.map((day) => (
                  <TableCell 
                    key={day} 
                    align="center" 
                    sx={{ fontWeight: 'bold', bgcolor: 'grey.100' }}
                  >
                    {day.charAt(0).toUpperCase() + day.slice(1)}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {allPeriods.map((periodInfo) => (
                <TableRow key={periodInfo.period}>
                  <TableCell sx={{ fontWeight: 'medium' }}>
                    {periodInfo.period}
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {formatTime(periodInfo.startTime)} - {formatTime(periodInfo.endTime)}
                    </Typography>
                  </TableCell>
                  {displayDays.map((day) => {
                    const dayPeriods = getPeriodsByDay(day);
                    const period = dayPeriods.find(p => p.period === periodInfo.period);
                    
                    return (
                      <TableCell key={day} align="center">
                        {period ? (
                          <Box>
                            <Chip
                              label={period.subject || period.type}
                              color={getPeriodColor(period.type)}
                              size="small"
                              sx={{ mb: 0.5 }}
                            />
                            {period.teacher && (
                              <Typography variant="caption" display="block" color="textSecondary">
                                {period.teacher}
                              </Typography>
                            )}
                          </Box>
                        ) : (
                          <Typography variant="body2" color="textSecondary">
                            -
                          </Typography>
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Legend */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            Legend:
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Chip label="Subject" color="primary" size="small" />
            <Chip label="Break" color="warning" size="small" />
            <Chip label="Lunch" color="success" size="small" />
          </Box>
        </Box>

        {/* Schedule Summary */}
        {schedule && schedule.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Schedule Summary
            </Typography>
            <Grid container spacing={2}>
              {schedule.map((daySchedule) => (
                <Grid item xs={12} sm={6} md={4} key={daySchedule.day}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="subtitle1" gutterBottom>
                        {daySchedule.day.charAt(0).toUpperCase() + daySchedule.day.slice(1)}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {daySchedule.periods?.length || 0} periods scheduled
                      </Typography>
                      <Box sx={{ mt: 1 }}>
                        {daySchedule.periods?.slice(0, 3).map((period) => (
                          <Chip
                            key={period.period}
                            label={period.subject || period.type}
                            size="small"
                            sx={{ mr: 0.5, mb: 0.5 }}
                          />
                        ))}
                        {daySchedule.periods?.length > 3 && (
                          <Typography variant="caption" color="textSecondary">
                            +{daySchedule.periods.length - 3} more
                          </Typography>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => onDownload && onDownload(timetable._id, `${classInfo?.name}_${classInfo?.division}`)}
        >
          📄 Download PDF
        </Button>
        <Button variant="contained" onClick={() => window.print()}>
          🖨️ Print Timetable
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewTimetableModal;
