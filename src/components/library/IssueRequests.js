import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Tooltip,
  IconButton
} from '@mui/material';
import {
  Check as ApproveIcon,
  Close as RejectIcon,
  Visibility as ViewIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';
import libraryService from '../../services/libraryService';

const IssueRequests = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [remarks, setRemarks] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, [user.school._id]);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const data = await libraryService.getIssueRequests(user.school._id);
      setRequests(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleApprove = (request) => {
    setSelectedRequest(request);
    setDueDate('');
    setApproveDialogOpen(true);
  };

  const handleReject = (request) => {
    setSelectedRequest(request);
    setRemarks('');
    setRejectDialogOpen(true);
  };

  const confirmApprove = async () => {
    try {
      setProcessing(true);
      await libraryService.issueBook(
        selectedRequest.book._id,
        selectedRequest.user._id,
        {
          dueDate,
          requestId: selectedRequest._id,
          loanPeriodDays: 14,
          finePerDay: 5
        }
      );
      setApproveDialogOpen(false);
      fetchRequests();
    } catch (err) {
      setError(err.message);
    } finally {
      setProcessing(false);
    }
  };

  const confirmReject = async () => {
    try {
      setProcessing(true);
      await libraryService.rejectRequest(selectedRequest._id, remarks);
      setRejectDialogOpen(false);
      fetchRequests();
    } catch (err) {
      setError(err.message);
    } finally {
      setProcessing(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={5} mb={3}>
        <Typography variant="h4">Book Issue Requests</Typography>
        <Button
          variant="outlined"
          startIcon={<RefreshIcon />}
          onClick={fetchRequests}
        >
          Refresh
        </Button>
      </Box>

      {error && (
        <Box mb={3}>
          <Typography color="error">{error}</Typography>
        </Box>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Book</TableCell>
              <TableCell>Student</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Request Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No pending requests
                </TableCell>
              </TableRow>
            ) : (
              requests.map(request => (
                <TableRow key={request._id}>
                  <TableCell>
                    <Typography fontWeight="bold">{request.book.bookTitle}</Typography>
                    <Typography variant="body2">{request.book.author}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="bold">{request.user.name}</Typography>
                    <Typography variant="body2">GR: {request.user.studentDetails.grNumber}</Typography>
                  </TableCell>
                  <TableCell>
                    {request.user.studentDetails.class?.name || 'N/A'}
                  </TableCell>
                  <TableCell>
                    {formatDate(request.createdAt)}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={request.status}
                      color={
                        request.status === 'requested' ? 'warning' : 
                        request.status === 'reserved' ? 'info' : 'default'
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Tooltip title="View Details">
                      <IconButton onClick={() => router.push(`/library/books/${request.book._id}`)}>
                        <ViewIcon color="info" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Approve">
                      <IconButton 
                        onClick={() => handleApprove(request)}
                        color="success"
                      >
                        <ApproveIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Reject">
                      <IconButton 
                        onClick={() => handleReject(request)}
                        color="error"
                      >
                        <RejectIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Approve Dialog */}
      <Dialog open={approveDialogOpen} onClose={() => setApproveDialogOpen(false)}>
        <DialogTitle>Approve Book Issue</DialogTitle>
        <DialogContent>
          <Box mb={2}>
            <Typography>
              Approve issue of <strong>{selectedRequest?.book.bookTitle}</strong> to{' '}
              <strong>{selectedRequest?.user.name}</strong>?
            </Typography>
          </Box>
          <TextField
            fullWidth
            label="Due Date"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setApproveDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={confirmApprove}
            color="primary"
            variant="contained"
            disabled={processing || !dueDate}
          >
            {processing ? <CircularProgress size={24} /> : 'Approve'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={rejectDialogOpen} onClose={() => setRejectDialogOpen(false)}>
        <DialogTitle>Reject Book Request</DialogTitle>
        <DialogContent>
          <Box mb={2}>
            <Typography>
              Reject request for <strong>{selectedRequest?.book.bookTitle}</strong> by{' '}
              <strong>{selectedRequest?.user.name}</strong>?
            </Typography>
          </Box>
          <TextField
            fullWidth
            label="Remarks"
            multiline
            rows={3}
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRejectDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={confirmReject}
            color="error"
            variant="contained"
            disabled={processing}
          >
            {processing ? <CircularProgress size={24} /> : 'Reject'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default IssueRequests;