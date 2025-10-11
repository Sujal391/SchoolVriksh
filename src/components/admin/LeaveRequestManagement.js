import { useState } from 'react';
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
  TextField,
  Typography,
  Box,
  Avatar,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  MoreVert,
  CheckCircle,
  Cancel,
  Comment,
  Delete
} from '@mui/icons-material';

const LeaveRequestTable = ({ leaveRequests = [], onReview, loading = false }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [comments, setComments] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleMenuClick = (event, leave) => {
    setAnchorEl(event.currentTarget);
    setSelectedLeave(leave);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
    handleMenuClose();
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setComments('');
  };

  const handleReview = async (status) => {
    if (selectedLeave && onReview) {
      try {
        setSubmitting(true);
        await onReview(selectedLeave.id, status, comments);
        handleCloseDialog();
        setComments('');
        setSelectedLeave(null);
      } catch (error) {
        console.error('Error reviewing leave request:', error);
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handleQuickAction = async (status) => {
    if (selectedLeave && onReview) {
      try {
        await onReview(selectedLeave.id, status, '');
        handleMenuClose();
        setSelectedLeave(null);
      } catch (error) {
        console.error('Error reviewing leave request:', error);
      }
    }
  };

  const getTypeColor = (type) => {
    return type === 'sick' ? 'error' : 'info';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'success';
      case 'rejected': return 'error';
      default: return 'warning';
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

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: '#1976d2' }}>
        Pending Leave Requests
      </Typography>

      {leaveRequests.length === 0 ? (
        <Alert severity="info">No pending leave requests found.</Alert>
      ) : (
        <TableContainer component={Paper} elevation={2}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                <TableCell sx={{ fontWeight: 600 }}>Employee</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Duration</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Reason</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Applied On</TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaveRequests.map((leave) => (
                <TableRow key={leave.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {leave.user.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {leave.user.role}
                        </Typography>
                      </Box>
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
                    <Typography variant="body2" sx={{ maxWidth: 250 }}>
                      {leave.reason}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {formatDate(leave.appliedOn)}
                    </Typography>
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

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleOpenDialog}>
          <Comment fontSize="small" sx={{ mr: 1 }} />
          Add Comments & Review
        </MenuItem>
        <MenuItem onClick={() => handleQuickAction('approved')}>
          <CheckCircle fontSize="small" sx={{ mr: 1, color: 'success.main' }} />
          Quick Approve
        </MenuItem>
        <MenuItem onClick={() => handleQuickAction('rejected')}>
          <Cancel fontSize="small" sx={{ mr: 1, color: 'error.main' }} />
          Quick Reject
        </MenuItem>
      </Menu>

      <Dialog 
        open={dialogOpen} 
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Review Leave Request
          {selectedLeave && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {selectedLeave.user.name} - {selectedLeave.user.role}
            </Typography>
          )}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Comments (Optional)"
            placeholder="Add your comments or feedback..."
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleCloseDialog} color="inherit" disabled={submitting}>
            Cancel
          </Button>
          <Button
            onClick={() => handleReview('rejected')}
            variant="outlined"
            color="error"
            startIcon={submitting ? <CircularProgress size={16} /> : <Cancel />}
            disabled={submitting}
          >
            Reject
          </Button>
          <Button
            onClick={() => handleReview('approved')}
            variant="contained"
            color="success"
            startIcon={submitting ? <CircularProgress size={16} /> : <CheckCircle />}
            disabled={submitting}
          >
            Approve
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LeaveRequestTable;