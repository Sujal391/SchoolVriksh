import { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  LinearProgress
} from '@mui/material';
import {
  People as PeopleIcon,
  School as SchoolIcon,
  Group as GroupIcon,
  CheckCircle as PresentIcon,
  Cancel as AbsentIcon,
  Schedule as LateIcon
} from '@mui/icons-material';
import AdminService from '../../services/adminService';

const AttendanceOverview = () => {
  const [overviewData, setOverviewData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOverviewData();
  }, []);

  const fetchOverviewData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await AdminService.getAttendanceOverview();
      setOverviewData(response.data);
    } catch (err) {
      setError('Failed to fetch attendance overview');
      console.error('Error fetching attendance overview:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'present': return 'success';
      case 'absent': return 'error';
      case 'late': return 'warning';
      default: return 'default';
    }
  };

  const getAttendancePercentage = (present, total) => {
    if (total === 0) return 0;
    return Math.round((present / total) * 100);
  };

  const StatCard = ({ title, icon, data, color }) => (
    <Card elevation={2} sx={{ height: '100%', borderRadius: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box
            sx={{
              p: 1,
              borderRadius: 2,
              backgroundColor: `${color}.100`,
              color: `${color}.600`,
              mr: 2
            }}
          >
            {icon}
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
            {title}
          </Typography>
        </Box>
        
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'success.main' }}>
                {data?.present || 0}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Present
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'error.main' }}>
                {data?.absent || 0}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Absent
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'warning.main' }}>
                {data?.late || 0}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Late
              </Typography>
            </Box>
          </Grid>
        </Grid>
        
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Attendance Rate
          </Typography>
          <LinearProgress
            variant="determinate"
            value={getAttendancePercentage(data?.present || 0, (data?.present || 0) + (data?.absent || 0) + (data?.late || 0))}
            sx={{ height: 8, borderRadius: 4 }}
          />
          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
            {getAttendancePercentage(data?.present || 0, (data?.present || 0) + (data?.absent || 0) + (data?.late || 0))}%
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: '#1976d2' }}>
        Attendance Overview - {new Date().toLocaleDateString()}
      </Typography>

      {/* Today's Summary */}
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        Today's Summary
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Students"
            icon={<PeopleIcon />}
            data={overviewData?.todaySummary?.students}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Teachers"
            icon={<SchoolIcon />}
            data={overviewData?.todaySummary?.teachers}
            color="secondary"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Staff"
            icon={<GroupIcon />}
            data={overviewData?.todaySummary?.staff}
            color="info"
          />
        </Grid>
      </Grid>

      {/* Monthly Statistics */}
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        Monthly Statistics
      </Typography>
      
      <Card elevation={2} sx={{ mb: 4, borderRadius: 2 }}>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Total</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Present</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Absent</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Late</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Attendance Rate</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {overviewData?.monthlyStats?.map((stat) => (
                  <TableRow key={stat._id} hover>
                    <TableCell>
                      <Chip
                        label={stat._id.toUpperCase()}
                        color={stat._id === 'student' ? 'primary' : stat._id === 'teacher' ? 'secondary' : 'info'}
                        size="small"
                        sx={{ fontWeight: 500 }}
                      />
                    </TableCell>
                    <TableCell>{stat.total}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <PresentIcon sx={{ color: 'success.main', mr: 1, fontSize: 16 }} />
                        {stat.present}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <AbsentIcon sx={{ color: 'error.main', mr: 1, fontSize: 16 }} />
                        {stat.absent}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <LateIcon sx={{ color: 'warning.main', mr: 1, fontSize: 16 }} />
                        {stat.late}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <LinearProgress
                          variant="determinate"
                          value={getAttendancePercentage(stat.present, stat.total)}
                          sx={{ width: 60, height: 6, borderRadius: 3, mr: 1 }}
                        />
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {getAttendancePercentage(stat.present, stat.total)}%
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Class-wise Attendance */}
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        Class-wise Attendance
      </Typography>
      
      <Card elevation={2} sx={{ borderRadius: 2 }}>
        <CardContent>
          {overviewData?.classWiseAttendance?.length === 0 ? (
            <Alert severity="info">No class attendance data available.</Alert>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                    <TableCell sx={{ fontWeight: 600 }}>Class</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Total Students</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Present</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Absent</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Late</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Attendance Rate</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {overviewData?.classWiseAttendance?.map((classData) => (
                    <TableRow key={classData._id} hover>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {classData.className} {classData.classDivision}
                        </Typography>
                      </TableCell>
                      <TableCell>{classData.totalStudents}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <PresentIcon sx={{ color: 'success.main', mr: 1, fontSize: 16 }} />
                          {classData.present}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <AbsentIcon sx={{ color: 'error.main', mr: 1, fontSize: 16 }} />
                          {classData.absent}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <LateIcon sx={{ color: 'warning.main', mr: 1, fontSize: 16 }} />
                          {classData.late}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <LinearProgress
                            variant="determinate"
                            value={getAttendancePercentage(classData.present, classData.totalStudents)}
                            sx={{ width: 60, height: 6, borderRadius: 3, mr: 1 }}
                          />
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {getAttendancePercentage(classData.present, classData.totalStudents)}%
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default AttendanceOverview;
