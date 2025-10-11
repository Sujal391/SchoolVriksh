import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  MoreVert,
  Delete,
  Visibility
} from '@mui/icons-material';
import AdminService from '../../services/adminService';

const LeaveRequestHistory = () => {
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  useEffect(() => {
    fetchLeaveHistory();
  }, []);

  const fetchLeaveHistory = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await AdminService.getLeaveRequestHistory();
      setLeaveHistory(response.data.leaves || []);
    } catch (err) {
      setError('Failed to fetch leave request history');
      console.error('Error fetching leave history:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMenuClick = (event, leave) => {
    setAnchorEl(event.currentTarget);
    setSelectedLeave(leave);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleViewDetails = () => {
    setViewDialogOpen(true);
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
    handleMenuClose();
  };

  const handleDeleteConfirm = async () => {
    if (selectedLeave) {
      try {
        await AdminService.deleteLeaveRequest(selectedLeave.id);
        setLeaveHistory(leaveHistory.filter(leave => leave.id !== selectedLeave.id));
        setDeleteDialogOpen(false);
        setSelectedLeave(null);
      } catch (err) {
        console.error('Error deleting leave request:', err);
        setError('Failed to delete leave request');
      }
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setSelectedLeave(null);
  };

  const handleViewClose = () => {
    setViewDialogOpen(false);
    setSelectedLeave(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'success';
      case 'rejected': return 'error';
      default: return 'warning';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'sick': return 'error';
      case 'emergency': return 'warning';
      default: return 'info';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

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
        Leave Request History
      </Typography>

      {leaveHistory.length === 0 ? (
        <Alert severity="info">No leave request history found.</Alert>
      ) : (
        <TableContainer component={Paper} elevation={2}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                <TableCell sx={{ fontWeight: 600 }}>Employee</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Duration</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Reason</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Applied On</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Reviewed By</TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaveHistory.map((leave) => (
                <TableRow key={leave.id} hover>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {leave.user.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {leave.user.role}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={leave.type.toUpperCase()} 
                      color={getTypeColor(leave.type)}
                      size="small"
                      sx={{ fontWeight: 500 }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {formatDate(leave.startDate)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      to {formatDate(leave.endDate)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ maxWidth: 200 }}>
                      {leave.reason}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={leave.status.toUpperCase()} 
                      color={getStatusColor(leave.status)}
                      size="small"
                      sx={{ fontWeight: 500 }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {formatDate(leave.appliedOn)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {leave.reviewedBy ? (
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {leave.reviewedBy.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {formatDate(leave.reviewedAt)}
                        </Typography>
                      </Box>
                    ) : (
                      <Typography variant="caption" color="text.secondary">
                        Not reviewed
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={(e) => handleMenuClick(e, leave)}
                      size="small"
                    >
                      <MoreVert />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleViewDetails}>
          <Visibility fontSize="small" sx={{ mr: 1 }} />
          View Details
        </MenuItem>
        <MenuItem onClick={handleDeleteClick}>
          <Delete fontSize="small" sx={{ mr: 1, color: 'error.main' }} />
          Delete Request
        </MenuItem>
      </Menu>

      {/* View Details Dialog */}
      <Dialog 
        open={viewDialogOpen} 
        onClose={handleViewClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Leave Request Details
        </DialogTitle>
        <DialogContent>
          {selectedLeave && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom>
                {selectedLeave.user.name} - {selectedLeave.user.role}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Type:</strong> {selectedLeave.type}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Duration:</strong> {formatDate(selectedLeave.startDate)} to {formatDate(selectedLeave.endDate)}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Reason:</strong> {selectedLeave.reason}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Status:</strong> {selectedLeave.status}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Applied On:</strong> {formatDate(selectedLeave.appliedOn)}
              </Typography>
              {selectedLeave.reviewedBy && (
                <>
                  <Typography variant="body1" paragraph>
                    <strong>Reviewed By:</strong> {selectedLeave.reviewedBy.name}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    <strong>Reviewed On:</strong> {formatDate(selectedLeave.reviewedAt)}
                  </Typography>
                </>
              )}
              {selectedLeave.comments && (
                <Typography variant="body1" paragraph>
                  <strong>Comments:</strong> {selectedLeave.comments}
                </Typography>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleViewClose}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog 
        open={deleteDialogOpen} 
        onClose={handleDeleteCancel}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this leave request? This action cannot be undone.
          </Typography>
          {selectedLeave && (
            <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
              <Typography variant="body2">
                <strong>Employee:</strong> {selectedLeave.user.name}
              </Typography>
              <Typography variant="body2">
                <strong>Type:</strong> {selectedLeave.type}
              </Typography>
              <Typography variant="body2">
                <strong>Duration:</strong> {formatDate(selectedLeave.startDate)} to {formatDate(selectedLeave.endDate)}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LeaveRequestHistory;
