import { useAuth } from '../../../contexts/AuthContext';
import withProtectedRoute from '../../../components/common/ProtectedRoute';
import ClerkLayout from '../../../components/layout/ClerkLayout';
import CertificateList from '../../../components/clerk/certificates/CertificateList';
import useClerk from '../../../hooks/useClerk';
import { Button, Typography } from '@mui/material';

const CertificatesPage = () => {
  const { certificates, pendingCertificates, loading, error } = useClerk();

  // Combine pending and history certificates
  const allCertificates = [...(pendingCertificates || []), ...(certificates || [])];

  return (
    <ClerkLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <Typography variant="h4" component="h1" gutterBottom>
              Certificate Management
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Manage student certificate requests and generation
            </Typography>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div>Loading certificates...</div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center bg-red-50 p-4 rounded">
            Error: {error}
          </div>
        ) : (
          <CertificateList certificates={allCertificates} />
        )}
      </div>
    </ClerkLayout>
  );
};

export default withProtectedRoute(CertificatesPage, ['clerk']);


