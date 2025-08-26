import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { 
  Container,
  Typography,
  Button,
  Box,
  CircularProgress,
  Alert,
  Tabs,
  Tab
} from '@mui/material';
import ClerkLayout from '../../../components/layout/ClerkLayout';
import ApplicationList from '../../../components/clerk/admissions/ApplicationList';
import useClerk from '../../../hooks/useClerk';

const AdmissionsPage = () => {
  const router = useRouter();
  const { 
    applications, 
    loading, 
    error,
    fetchPendingApplications
  } = useClerk();
  const [tabValue, setTabValue] = useState('pending');
  const [filteredApplications, setFilteredApplications] = useState([]);

  useEffect(() => {
    fetchPendingApplications();
  }, []);

  useEffect(() => {
    if (applications) {
      if (tabValue === 'pending') {
        setFilteredApplications(
          applications.filter(app => 
            ['pending', 'document_verification'].includes(app.status)
        )
      );
      } else if (tabValue === 'fees') {
        setFilteredApplications(
          applications.filter(app => app.status === 'fees_pending')
        );
      } else if (tabValue === 'approved') {
        setFilteredApplications(
          applications.filter(app => app.status === 'approved')
        );
      } else {
        setFilteredApplications(applications);
      }
    }
  }, [applications, tabValue]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <ClerkLayout>
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h4" component="h1">
            Admission Applications
          </Typography>
          {/* <Button 
            variant="contained" 
            color="primary"
            onClick={() => router.push('/clerk/admissions/new')}
          >
            New Application
          </Button> */}
        </Box>

        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          sx={{ mb: 3 }}
        >
          <Tab label="Pending Verification" value="pending" />
          <Tab label="Fees Pending" value="fees" />
          <Tab label="Approved" value="approved" />
          <Tab label="All Applications" value="all" />
        </Tabs>

        {loading && <CircularProgress />}
        {error && <Alert severity="error">{error}</Alert>}
        {!loading && !error && (
          <ApplicationList 
            applications={filteredApplications} 
            loading={loading} 
          />
        )}
      </Container>
    </ClerkLayout>
  );
};

export default AdmissionsPage;