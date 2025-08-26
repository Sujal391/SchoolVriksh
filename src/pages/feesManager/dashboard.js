import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Divider, 
  LinearProgress,
  useTheme,
  Alert
} from '@mui/material';
import {
  MonetizationOn as FeesIcon,
  Receipt as ReceiptsIcon,
  People as StudentsIcon,
  CheckCircle as VerifiedIcon,
  PendingActions as PendingIcon
} from '@mui/icons-material';
import FeesManagerLayout from '../../components/layout/FeesManagerLayout';
import feesService from '../../services/feesService';
import { useAuth } from '../../contexts/AuthContext';

const DashboardCard = ({ icon, title, value, color }) => {
  const theme = useTheme();
  
  return (
    <Card sx={{ 
      height: '100%',
      boxShadow: theme.shadows[4],
      transition: 'transform 0.3s ease-in-out',
      '&:hover': {
        transform: 'translateY(-5px)'
      }
    }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box
          sx={{
            width: 60,
            height: 60,
            borderRadius: '50%',
            backgroundColor: `${color}.light`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2
          }}
        >
          {icon}
        </Box>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4" component="div" color="text.primary">
          {value || '0'}
        </Typography>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  const { school } = useAuth();
  const [stats, setStats] = useState({
    totalFees: 0,
    collectedFees: 0,
    pendingFees: 0,
    students: 0,
    verifiedPayments: 0,
    pendingVerification: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const currentYear = new Date().getFullYear();
        
        // Fetch total earnings for the current year
        const earningsResponse = await feesService.getTotalEarningsByYear(currentYear);
        const earnings = earningsResponse.data || {};
        
        // Fetch pending payments
        const pendingResponse = await feesService.getPendingPayments();
        const pendingPayments = pendingResponse.data || {};
        
        // Update stats
        setStats({
          totalFees: (earnings.totalEarning || 0) + (earnings.totalPending || 0),
          collectedFees: earnings.totalEarning || 0,
          pendingFees: earnings.totalPending || 0,
          students: 0, // You might want to fetch actual student count
          verifiedPayments: 0, // You might want to fetch actual verified payments count
          pendingVerification: pendingPayments.payments?.length || 0
        });
        
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <FeesManagerLayout>
        <LinearProgress />
      </FeesManagerLayout>
    );
  }

  if (error) {
    return (
      <FeesManagerLayout>
        <Alert severity="error" sx={{ my: 2 }}>
          {error}
        </Alert>
      </FeesManagerLayout>
    );
  }

  return (
    <FeesManagerLayout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Fees Dashboard
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {school?.name || 'School'} - Overview of fees management
        </Typography>
      </Box>
      
      <Divider sx={{ my: 3 }} />
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <DashboardCard 
            icon={<FeesIcon fontSize="large" color="primary" />}
            title="Total Fees"
            value={`₹${stats.totalFees.toLocaleString()}`}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DashboardCard 
            icon={<FeesIcon fontSize="large" color="success" />}
            title="Collected Fees"
            value={`₹${stats.collectedFees.toLocaleString()}`}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DashboardCard 
            icon={<FeesIcon fontSize="large" color="warning" />}
            title="Pending Fees"
            value={`₹${stats.pendingFees.toLocaleString()}`}
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DashboardCard 
            icon={<StudentsIcon fontSize="large" color="info" />}
            title="Total Students"
            value={stats.students.toLocaleString()}
            color="info"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DashboardCard 
            icon={<VerifiedIcon fontSize="large" color="success" />}
            title="Verified Payments"
            value={stats.verifiedPayments.toLocaleString()}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DashboardCard 
            icon={<PendingIcon fontSize="large" color="error" />}
            title="Pending Verification"
            value={stats.pendingVerification.toLocaleString()}
            color="error"
          />
        </Grid>
      </Grid>
      
      {/* Recent Activities Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Recent Activities
        </Typography>
        <Card>
          <CardContent>
            {/* You can add recent activities list here */}
            <Typography color="text.secondary">
              No recent activities to display
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </FeesManagerLayout>
  );
};

export default Dashboard;