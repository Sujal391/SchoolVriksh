import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { 
  Container,
  Grid,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Breadcrumbs,
  Link
} from '@mui/material';
import ClerkLayout from '../../../components/layout/ClerkLayout';
import ApplicationDetail from '../../../components/clerk/admissions/ApplicationDetail';
import DocumentViewer from '../../../components/clerk/admissions/DocumentViewer';
import useClerk from '../../../hooks/useClerk';

const AdmissionDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const {
    applications,
    verifyApplication,
    loading,
    error,
    fetchPendingApplications
  } = useClerk();
  const [application, setApplication] = useState(null);

  // Fetch applications when page loads
  useEffect(() => {
    fetchPendingApplications();
  }, []);

  useEffect(() => {
    if (id && applications.length > 0) {
      const app = applications.find(a => a.id === id);
      setApplication(app || null);
    }
  }, [id, applications]);

  const handleVerification = async (status, comments) => {
    try {
      await verifyApplication(id, status, comments);
      router.push('/clerk/admissions');
    } catch (err) {
      console.error('Verification failed:', err);
    }
  };

  if (loading) return (
    <ClerkLayout>
      <Container>
        <CircularProgress />
      </Container>
    </ClerkLayout>
  );

  if (error) return (
    <ClerkLayout>
      <Container>
        <Alert severity="error">{error}</Alert>
      </Container>
    </ClerkLayout>
  );

  if (!application) return (
    <ClerkLayout>
      <Container>
        <Alert severity="warning">Application not found</Alert>
      </Container>
    </ClerkLayout>
  );

  return (
    <ClerkLayout>
      <Container maxWidth="xl">
        <Breadcrumbs sx={{ mb: 2 }}>
          <Link 
            color="inherit" 
            href="/clerk/admissions"
            onClick={(e) => {
              e.preventDefault();
              router.push('/clerk/admissions');
            }}
          >
            Admissions
          </Link>
          <Typography color="text.primary">
            {application.trackingId}
          </Typography>
        </Breadcrumbs>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" component="h1" gutterBottom>
              Application Details
            </Typography>
          </Grid>

          <Grid item xs={12} md={8}>
            <ApplicationDetail 
              application={application} 
              onVerify={handleVerification} 
            />
          </Grid>
          
          <Grid item xs={12} md={4}>
            <DocumentViewer 
              documents={application.documents} 
              applicationId={application.id} 
            />
          </Grid>
        </Grid>
      </Container>
    </ClerkLayout>
  );
};

export default AdmissionDetailPage;