import { Chip } from '@mui/material';

const VerificationStatus = ({ status }) => {
  const getStatusProps = () => {
    switch (status) {
      case 'verified':
        return { label: 'Verified', color: 'success' };
      case 'pending':
        return { label: 'Pending', color: 'warning' };
      case 'rejected':
        return { label: 'Rejected', color: 'error' };
      default:
        return { label: status, color: 'default' };
    }
  };

  const { label, color } = getStatusProps();

  return <Chip label={label} color={color} size="small" />;
};

export default VerificationStatus;