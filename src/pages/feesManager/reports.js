import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Divider, 
  LinearProgress,
  Tabs,
  Tab,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button
} from '@mui/material';
import { 
  Assessment as ReportIcon,
  Download as DownloadIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import FeesManagerLayout from '../../components/layout/FeesManagerLayout';
import feesService from '../../services/feesService';
import { useAuth } from '../../contexts/AuthContext';

const Reports = () => {
  const { school } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [year, setYear] = useState(new Date().getFullYear());
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchReportData = async () => {
    try {
      setLoading(true);
      const response = await feesService.getTotalEarningsByYear(year);
      setReportData(response);
    } catch (err) {
      console.error('Error fetching report data:', err);
      setError('Failed to load report data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReportData();
  }, [year]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleDownloadReport = () => {
    console.log('Downloading report for year:', year);
    // Implement download functionality
  };

  return (
    <FeesManagerLayout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Fee Reports
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {school?.name || 'School'} - View and analyze fee reports
        </Typography>
      </Box>
      
      <Divider sx={{ my: 3 }} />
      
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={6}>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label="Monthly Report" icon={<ReportIcon />} iconPosition="start" />
              <Tab label="Annual Report" icon={<ReportIcon />} iconPosition="start" />
            </Tabs>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <FormControl sx={{ minWidth: 120, mr: 2 }}>
              <InputLabel id="year-select-label">Year</InputLabel>
              <Select
                labelId="year-select-label"
                value={year}
                label="Year"
                onChange={handleYearChange}
              >
                {[new Date().getFullYear() - 1, new Date().getFullYear(), new Date().getFullYear() + 1].map((y) => (
                  <MenuItem key={y} value={y}>{y}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button 
              variant="contained" 
              startIcon={<DownloadIcon />}
              onClick={handleDownloadReport}
            >
              Download
            </Button>
          </Grid>
        </Grid>
      </Box>
      
      {loading ? (
        <LinearProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : reportData ? (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Fee Collection Summary
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography>Total Fees Defined:</Typography>
                  <Typography fontWeight="bold">
                    ₹{(reportData.totalEarning + reportData.totalPending).toLocaleString()}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography>Total Collected:</Typography>
                  <Typography fontWeight="bold" color="success.main">
                    ₹{reportData.totalEarning.toLocaleString()}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography>Total Pending:</Typography>
                  <Typography fontWeight="bold" color="warning.main">
                    ₹{reportData.totalPending.toLocaleString()}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>Growth from Previous Year:</Typography>
                  <Typography fontWeight="bold" color={reportData.growth >= 0 ? "success.main" : "error.main"}>
                    {reportData.growth >= 0 ? '+' : ''}{reportData.growth.toLocaleString()}%
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Collection Rate
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ 
                  width: '100%', 
                  height: 200, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  backgroundColor: '#f5f5f5',
                  borderRadius: 1
                }}>
                  <Typography variant="h4" color="text.secondary">
                    {((reportData.totalEarning / (reportData.totalEarning + reportData.totalPending)) * 100).toFixed(1)}%
                  </Typography>
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                  Percentage of total fees collected
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ) : null}
    </FeesManagerLayout>
  );
};

export default Reports;