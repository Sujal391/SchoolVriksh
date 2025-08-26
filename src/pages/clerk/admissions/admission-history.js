import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
  useMediaQuery,
  useTheme
} from '@mui/material';
import useClerk from '../../../hooks/useClerk';
import ClerkSidebar from '../../../components/layout/ClerkSidebar';
import ClerkHeader from '../../../components/layout/ClerkHeader';

// ClerkLayout component
const ClerkLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* Sidebar */}
      <ClerkSidebar 
        open={sidebarOpen} 
        onClose={handleSidebarClose}
        variant={isDesktop ? 'permanent' : 'temporary'}
        sx={{
          width: { lg: 280 },
          flexShrink: { lg: 0 }
        }}
      />
      
      {/* Main Content */}
      <Box 
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          width: { lg: `calc(100% - 280px)` },
          minHeight: '100vh'
        }}
      >
        {/* Header */}
        <ClerkHeader onMenuClick={handleMenuClick} />
        
        {/* Page Content */}
        <Box 
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, sm: 3, lg: 4 },
            backgroundColor: '#f8f9fa',
            minHeight: 'calc(100vh - 64px)',
            overflow: 'auto'
          }}
        >
          {/* Content Container */}
          <Box 
            sx={{
              maxWidth: '1400px',
              mx: 'auto',
              backgroundColor: '#fff',
              borderRadius: 2,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              overflow: 'hidden',
              minHeight: '100%'
            }}
          >
            <Box sx={{ p: { xs: 2, sm: 3, lg: 4 } }}>
              {children}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

// AdmissionHistory component with improved UI/UX and responsive design
const AdmissionHistory = () => {
  const [grNumber, setGrNumber] = useState('');
  const [history, setHistory] = useState(null);
  const { getAdmissionHistory, loading, error } = useClerk();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleFetchHistory = async () => {
    try {
      const data = await getAdmissionHistory(grNumber);
      setHistory(data);
    } catch (err) {
      setHistory(null);
    }
  };

  const InfoCard = ({ title, children, icon }) => (
    <Paper 
      elevation={0}
      sx={{ 
        p: 3, 
        mb: 3,
        borderRadius: 3,
        border: '1px solid #e0e0e0',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
          transform: 'translateY(-1px)'
        }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        {icon && <Box sx={{ mr: 1, color: 'primary.main' }}>{icon}</Box>}
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 600,
            color: 'primary.main',
            fontSize: { xs: '1.1rem', sm: '1.25rem' }
          }}
        >
          {title}
        </Typography>
      </Box>
      {children}
    </Paper>
  );

  const InfoRow = ({ label, value, fullWidth = false }) => (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: fullWidth || isMobile ? 'column' : 'row',
        mb: 2,
        p: 2,
        borderRadius: 2,
        backgroundColor: '#fafafa',
        border: '1px solid #f0f0f0'
      }}
    >
      <Typography 
        variant="body2" 
        sx={{ 
          fontWeight: 600,
          color: 'text.secondary',
          minWidth: fullWidth || isMobile ? 'auto' : 140,
          mb: fullWidth || isMobile ? 0.5 : 0,
          fontSize: '0.875rem'
        }}
      >
        {label}:
      </Typography>
      <Typography 
        variant="body1"
        sx={{ 
          color: 'text.primary',
          wordBreak: 'break-word',
          fontSize: '0.95rem'
        }}
      >
        {value || 'N/A'}
      </Typography>
    </Box>
  );

  const StatusChip = ({ status }) => {
    const getStatusColor = (status) => {
      switch (status?.toLowerCase()) {
        case 'approved': return 'success';
        case 'pending': return 'warning';
        case 'rejected': return 'error';
        case 'verified': return 'success';
        default: return 'default';
      }
    };

    return (
      <Chip 
        label={status || 'Unknown'} 
        color={getStatusColor(status)}
        size="small"
        sx={{ 
          fontWeight: 500,
          textTransform: 'capitalize'
        }}
      />
    );
  };

  return (
    <Box>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 700,
            color: 'primary.main',
            mb: 1,
            fontSize: { xs: '1.75rem', sm: '2.125rem' }
          }}
        >
          Admission History
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Search and view detailed admission records by GR Number
        </Typography>
      </Box>

      {/* Search Section */}
      <Paper 
        elevation={0}
        sx={{ 
          p: 3, 
          mb: 4,
          borderRadius: 3,
          border: '1px solid #e0e0e0',
          backgroundColor: '#fafafa'
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2, 
          alignItems: { xs: 'stretch', sm: 'flex-end' }
        }}>
          <TextField
            label="Enter GR Number"
            placeholder="e.g., GR2024001"
            value={grNumber}
            onChange={(e) => setGrNumber(e.target.value)}
            variant="outlined"
            fullWidth
            size="medium"
            sx={{ 
              maxWidth: { xs: '100%', sm: 400 },
              '& .MuiOutlinedInput-root': {
                borderRadius: 2
              }
            }}
          />
          <Button
            variant="contained"
            onClick={handleFetchHistory}
            disabled={loading || !grNumber.trim()}
            size="large"
            sx={{ 
              minWidth: { xs: '100%', sm: 140 },
              height: 56,
              borderRadius: 2,
              fontWeight: 600,
              textTransform: 'none'
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Search History'}
          </Button>
        </Box>
      </Paper>

      {/* Error State */}
      {error && (
        <Paper 
          elevation={0}
          sx={{ 
            p: 3, 
            mb: 3,
            borderRadius: 2,
            border: '1px solid #ffcdd2',
            backgroundColor: '#ffebee'
          }}
        >
          <Typography color="error" sx={{ fontWeight: 500 }}>
            {error}
          </Typography>
        </Paper>
      )}

      {/* Results Section */}
      {history && (
        <Box sx={{ mt: 4 }}>
          {/* Student Details */}
          <InfoCard title="Student Information">
            <Box sx={{ display: 'grid', gap: 1 }}>
              <InfoRow label="Full Name" value={history.student.name} />
              <InfoRow label="Email Address" value={history.student.email} />
              <InfoRow label="GR Number" value={history.student.grNumber} />
              <InfoRow label="Class" value={history.student.class} />
              <InfoRow label="Admission Type" value={history.student.admissionType} />
              <InfoRow label="Date of Birth" value={new Date(history.student.dob).toLocaleDateString()} />
              <InfoRow label="Gender" value={history.student.gender} />
              <InfoRow 
                label="Parent/Guardian" 
                value={history.student.parentDetails
                  ? `${history.student.parentDetails.name} (${history.student.parentDetails.relationship})`
                  : 'N/A'}
              />
            </Box>
          </InfoCard>

          {/* Application Details */}
          <InfoCard title="Application Information">
            <Box sx={{ display: 'grid', gap: 1 }}>
              <InfoRow label="Tracking ID" value={history.application.trackingId} />
              <InfoRow label="Admission Type" value={history.application.admissionType077} />
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                mb: 2,
                p: 2,
                borderRadius: 2,
                backgroundColor: '#fafafa',
                border: '1px solid #f0f0f0'
              }}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary', mr: 2 }}>
                  Status:
                </Typography>
                <StatusChip status={history.application.status} />
              </Box>
              <InfoRow 
                label="Submitted On" 
                value={new Date(history.application.submittedOn).toLocaleDateString()}
              />
            </Box>
          </InfoCard>

          {/* Documents */}
          <InfoCard title="Submitted Documents">
            <Box sx={{ display: 'grid', gap: 2 }}>
              {history.application.documents.map((doc, index) => (
                <Paper 
                  key={index}
                  elevation={0}
                  sx={{ 
                    p: 2, 
                    border: '1px solid #e0e0e0',
                    borderRadius: 2,
                    backgroundColor: '#fafafa'
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {doc.type}
                    </Typography>
                    <StatusChip status={doc.verified ? 'Verified' : 'Pending'} />
                  </Box>
                  <Button
                    variant="outlined"
                    href={doc.documentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="small"
                    sx={{ textTransform: 'none', borderRadius: 1 }}
                  >
                    View Document
                  </Button>
                </Paper>
              ))}
            </Box>
          </InfoCard>

          {/* Verification Sections */}
          <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' } }}>
            {/* Clerk Verification */}
            <InfoCard title="Clerk Verification">
              <Box sx={{ display: 'grid', gap: 1 }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  mb: 2,
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: '#fafafa',
                  border: '1px solid #f0f0f0'
                }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary', mr: 2 }}>
                    Status:
                  </Typography>
                  <StatusChip status={history.application.clerkVerification.status} />
                </Box>
                <InfoRow label="Verified By" value={history.application.clerkVerification.verifiedBy} />
                <InfoRow 
                  label="Verified At" 
                  value={history.application.clerkVerification.verifiedAt
                    ? new Date(history.application.clerkVerification.verifiedAt).toLocaleDateString()
                    : 'N/A'}
                />
                <InfoRow label="Comments" value={history.application.clerkVerification.comments} fullWidth />
              </Box>
            </InfoCard>

            {/* Fees Verification */}
            <InfoCard title="Fees Verification">
              <Box sx={{ display: 'grid', gap: 1 }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  mb: 2,
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: '#fafafa',
                  border: '1px solid #f0f0f0'
                }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary', mr: 2 }}>
                    Status:
                  </Typography>
                  <StatusChip status={history.application.feesVerification.status} />
                </Box>
                <InfoRow label="Verified By" value={history.application.feesVerification.verifiedBy} />
                <InfoRow 
                  label="Verified At" 
                  value={history.application.feesVerification.verifiedAt
                    ? new Date(history.application.feesVerification.verifiedAt).toLocaleDateString()
                    : 'N/A'}
                />
                <InfoRow label="Receipt Number" value={history.application.feesVerification.receiptNumber} />
                <InfoRow label="Comments" value={history.application.feesVerification.comments} fullWidth />
              </Box>
            </InfoCard>
          </Box>

          {/* Payment Details */}
          {history.application.paymentDetails?.note && (
            <InfoCard title="Payment Information">
              <InfoRow label="Payment Note" value={history.application.paymentDetails.note} fullWidth />
            </InfoCard>
          )}

          {/* Additional Responses */}
          {history.application.additionalResponses && Object.keys(history.application.additionalResponses).length > 0 && (
            <InfoCard title="Additional Information">
              <Box sx={{ display: 'grid', gap: 1 }}>
                {Object.entries(history.application.additionalResponses).map(([key, value], index) => (
                  <InfoRow key={index} label={key} value={value} fullWidth />
                ))}
              </Box>
            </InfoCard>
          )}
        </Box>
      )}
    </Box>
  );
};

// Main component that connects AdmissionHistory with ClerkLayout
const AdmissionHistoryPage = () => {
  return (
    <ClerkLayout>
      <AdmissionHistory />
    </ClerkLayout>
  );
};

export default AdmissionHistoryPage;