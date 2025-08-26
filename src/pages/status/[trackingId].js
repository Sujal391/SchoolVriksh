import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/material";
import AdminService from "../../services/adminService";

const StatusPage = () => {
  const router = useRouter();
  const { trackingId } = router.query;
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (trackingId) {
      fetchStatus();
    }
  }, [trackingId]);

  const fetchStatus = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await AdminService.checkApplicationStatus(trackingId);
      setApplication(response.application);
    } catch (error) {
      setError("Failed to load status: " + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="container mx-auto px-4 py-8">
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!application) {
    return (
      <Box className="container mx-auto px-4 py-8">
        <Alert severity="info">Application not found.</Alert>
      </Box>
    );
  }

  return (
    <Box className="container mx-auto px-4 py-8">
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Application Status
        </Typography>
        <Typography variant="h6">Tracking ID: {application.trackingId}</Typography>
        <Typography>Student: {application.studentName}</Typography>
        <Typography>Class: {application.appliedClass}</Typography>
        <Typography>Admission Type: {application.admissionType}</Typography>
        <Typography>Status: {application.status}</Typography>
        <Typography>Payment Status: {application.paymentStatus}</Typography>
        <Typography variant="h6" sx={{ mt: 4 }}>
          Application Timeline
        </Typography>
        <Timeline>
          {application.timeline.map((event, index) => (
            <TimelineItem key={index}>
              <TimelineSeparator>
                <TimelineDot color={event.completed ? "primary" : "grey"} />
                {index < application.timeline.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent>
                <Typography variant="subtitle1">{event.stage}</Typography>
                <Typography variant="caption">
                  {event.date ? new Date(event.date).toLocaleDateString() : "Pending"}
                </Typography>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
        {application.nextSteps && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Next Steps</Typography>
            <Typography>{application.nextSteps}</Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default StatusPage;