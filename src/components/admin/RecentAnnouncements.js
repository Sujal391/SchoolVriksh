import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Tooltip,
  CircularProgress,
  Alert,
  Snackbar,
  Divider,
  Stack
} from '@mui/material';
import {
  Add,
  Refresh,
  Campaign,
  Visibility
} from '@mui/icons-material';
import AnnouncementCard from './AnnouncementCard';
import AnnouncementModal from './AnnouncementModal';
import AdminService from '../../services/adminService';

const RecentAnnouncements = ({ maxItems = 5, compact = true }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const response = await AdminService.getAnnouncements();
      
      // Sort by creation date (newest first) and limit to maxItems
      const sortedAnnouncements = (response || [])
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, maxItems);
      
      setAnnouncements(sortedAnnouncements);
    } catch (error) {
      console.error('Error fetching announcements:', error);
      setError('Failed to load announcements');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSuccess = () => {
    setSuccess('Announcement created successfully!');
    fetchAnnouncements();
  };

  const handleRefresh = () => {
    fetchAnnouncements();
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Campaign color="primary" />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Recent Announcements
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title="Refresh">
            <IconButton size="small" onClick={handleRefresh} disabled={loading}>
              <Refresh fontSize="small" />
            </IconButton>
          </Tooltip>
          
          <Button
            variant="contained"
            size="small"
            startIcon={<Add />}
            onClick={() => setModalOpen(true)}
            sx={{ minWidth: 'auto' }}
          >
            New
          </Button>
        </Box>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Content */}
      {error ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      ) : announcements.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Campaign sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No announcements yet
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Create your first announcement to keep everyone informed
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setModalOpen(true)}
          >
            Create Announcement
          </Button>
        </Box>
      ) : (
        <Box>
          <Stack spacing={compact ? 1 : 2}>
            {announcements.map((announcement) => (
              <AnnouncementCard
                key={announcement._id}
                announcement={announcement}
                compact={compact}
              />
            ))}
          </Stack>
          
          {announcements.length === maxItems && (
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<Visibility />}
                // onClick={() => router.push('/admin/announcements')} // Future: Link to full announcements page
              >
                View All Announcements
              </Button>
            </Box>
          )}
        </Box>
      )}

      {/* Create Announcement Modal */}
      <AnnouncementModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={handleCreateSuccess}
      />

      {/* Success Snackbar */}
      <Snackbar
        open={!!success}
        autoHideDuration={4000}
        onClose={() => setSuccess('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSuccess('')} severity="success" sx={{ width: '100%' }}>
          {success}
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RecentAnnouncements;
