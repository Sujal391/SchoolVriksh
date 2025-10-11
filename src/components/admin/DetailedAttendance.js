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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Pagination,
  Stack
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  CheckCircle as PresentIcon,
  Cancel as AbsentIcon,
  Schedule as LateIcon
} from '@mui/icons-material';
import dayjs from 'dayjs';
import AdminService from '../../services/adminService';

const DetailedAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [metadata, setMetadata] = useState({});
  const [statistics, setStatistics] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [classes, setClasses] = useState([]);
  
  // Filter states
  const [filters, setFilters] = useState({
    startDate: dayjs().subtract(7, 'day'),
    endDate: dayjs(),
    type: 'student',
    classId: '',
    page: 1,
    limit: 10
  });

  useEffect(() => {
    fetchClasses();
  }, []);

  useEffect(() => {
    fetchDetailedAttendance();
  }, [filters]);

  const fetchClasses = async () => {
    try {
      const response = await AdminService.getClasses();
      setClasses(response.data || []);
    } catch (err) {
      console.error('Error fetching classes:', err);
    }
  };

  const fetchDetailedAttendance = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = {
        startDate: filters.startDate.format('YYYY-MM-DD'),
        endDate: filters.endDate.format('YYYY-MM-DD'),
        type: filters.type,
        page: filters.page,
        limit: filters.limit
      };

      if (filters.classId) {
        params.classId = filters.classId;
      }

      const response = await AdminService.getDetailedAttendance(params);
      setAttendanceData(response.data.attendance || []);
      setMetadata(response.data.metadata || {});
      setStatistics(response.data.statistics || {});
    } catch (err) {
      setError('Failed to fetch detailed attendance');
      console.error('Error fetching detailed attendance:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value,
      page: field !== 'page' ? 1 : value // Reset page when other filters change
    }));
  };

  const handlePageChange = (event, newPage) => {
    handleFilterChange('page', newPage);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'present': return 'success';
      case 'absent': return 'error';
      case 'late': return 'warning';
      default: return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'present': return <PresentIcon sx={{ fontSize: 16 }} />;
      case 'absent': return <AbsentIcon sx={{ fontSize: 16 }} />;
      case 'late': return <LateIcon sx={{ fontSize: 16 }} />;
      default: return null;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: '#1976d2' }}>
          Detailed Attendance Records
        </Typography>

        {/* Filters */}
        <Card elevation={2} sx={{ mb: 3, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, display: 'flex', alignItems: 'center' }}>
              <FilterIcon sx={{ mr: 1 }} />
              Filters
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={3}>
                <DatePicker
                  label="Start Date"
                  value={filters.startDate}
                  onChange={(date) => handleFilterChange('startDate', date)}
                  renderInput={(params) => <TextField {...params} fullWidth size="small" />}
                  maxDate={dayjs()}
                />
              </Grid>
              
              <Grid item xs={12} md={3}>
                <DatePicker
                  label="End Date"
                  value={filters.endDate}
                  onChange={(date) => handleFilterChange('endDate', date)}
                  renderInput={(params) => <TextField {...params} fullWidth size="small" />}
                  minDate={filters.startDate}
                  maxDate={dayjs()}
                />
              </Grid>
              
              <Grid item xs={12} md={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Type</InputLabel>
                  <Select
                    value={filters.type}
                    label="Type"
                    onChange={(e) => handleFilterChange('type', e.target.value)}
                  >
                    <MenuItem value="student">Student</MenuItem>
                    <MenuItem value="teacher">Teacher</MenuItem>
                    <MenuItem value="staff">Staff</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Class</InputLabel>
                  <Select
                    value={filters.classId}
                    label="Class"
                    onChange={(e) => handleFilterChange('classId', e.target.value)}
                    disabled={filters.type !== 'student'}
                  >
                    <MenuItem value="">All Classes</MenuItem>
                    {classes.map((cls) => (
                      <MenuItem key={cls._id} value={cls._id}>
                        {cls.name} {cls.division}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={1}>
                <Button
                  variant="contained"
                  onClick={fetchDetailedAttendance}
                  startIcon={<SearchIcon />}
                  fullWidth
                  sx={{ height: '40px' }}
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Statistics Summary */}
        {statistics && Object.keys(statistics).length > 0 && (
          <Card elevation={2} sx={{ mb: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Summary Statistics
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={6} md={2}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                      {statistics.total || 0}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Total Records
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={2}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: 'success.main' }}>
                      {statistics.present || 0}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Present
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={2}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: 'error.main' }}>
                      {statistics.absent || 0}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Absent
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={2}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: 'warning.main' }}>
                      {statistics.late || 0}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Late
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: 'info.main' }}>
                      {statistics.presentPercentage || 0}%
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Attendance Rate
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}

        {/* Attendance Table */}
        <Card elevation={2} sx={{ borderRadius: 2 }}>
          <CardContent>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                <CircularProgress />
              </Box>
            ) : error ? (
              <Alert severity="error">{error}</Alert>
            ) : attendanceData.length === 0 ? (
              <Alert severity="info">No attendance records found for the selected criteria.</Alert>
            ) : (
              <>
                <TableContainer component={Paper} elevation={0}>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                        <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                        {filters.type === 'student' && (
                          <TableCell sx={{ fontWeight: 600 }}>Class</TableCell>
                        )}
                        <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Marked By</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {attendanceData.map((record) => (
                        <TableRow key={record._id} hover>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {record.user.name}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="text.secondary">
                              {record.user.email}
                            </Typography>
                          </TableCell>
                          {filters.type === 'student' && (
                            <TableCell>
                              <Typography variant="body2">
                                {record.class?.name} {record.class?.division}
                              </Typography>
                            </TableCell>
                          )}
                          <TableCell>
                            <Typography variant="body2">
                              {formatDate(record.date)}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              icon={getStatusIcon(record.status)}
                              label={record.status.toUpperCase()}
                              color={getStatusColor(record.status)}
                              size="small"
                              sx={{ fontWeight: 500 }}
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {record.markedBy?.name || 'System'}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* Pagination */}
                {metadata.pages > 1 && (
                  <Stack 
                    direction="row" 
                    justifyContent="space-between" 
                    alignItems="center" 
                    sx={{ mt: 3, px: 2 }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Page {metadata.page} of {metadata.pages} • Showing {attendanceData.length} of {metadata.total} records
                    </Typography>
                    
                    <Pagination
                      count={metadata.pages}
                      page={metadata.page}
                      onChange={handlePageChange}
                      color="primary"
                      showFirstButton
                      showLastButton
                      sx={{
                        '& .MuiPaginationItem-root': {
                          borderRadius: 2,
                          fontWeight: 500,
                        }
                      }}
                    />
                    
                    <FormControl size="small" sx={{ minWidth: 120 }}>
                      <InputLabel>Per Page</InputLabel>
                      <Select
                        value={filters.limit}
                        label="Per Page"
                        onChange={(e) => handleFilterChange('limit', e.target.value)}
                      >
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={25}>25</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </Box>
    </LocalizationProvider>
  );
};

export default DetailedAttendance;
