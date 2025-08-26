import { useState, useEffect } from "react";
import { useRouter } from "next/router";
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
  TextField,
  Button,
  CircularProgress,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import AdminService from "../../services/adminService";

const ApplicationsPage = () => {
  const router = useRouter();
  const { formId } = router.query;
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useState({
    status: "",
    admissionType: "",
    class: "",
    searchTerm: "",
    dateRange: { start: "", end: "" },
  });

  useEffect(() => {
    fetchApplications();
  }, [formId]);

  const fetchApplications = async () => {
    setLoading(true);
    setError(null);
    try {
      const query = { ...searchParams };
      if (formId) query.formId = formId;
      const response = await AdminService.searchApplications(query);
      setApplications(response.applications);
    } catch (error) {
      setError("Failed to load applications: " + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchApplications();
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

  return (
    <Box className="container mx-auto px-4 py-8">
      <Typography variant="h4" gutterBottom>
        Admission Applications
      </Typography>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6">Search Applications</Typography>
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <TextField
            label="Search by Name/Tracking ID"
            value={searchParams.searchTerm}
            onChange={(e) => setSearchParams({ ...searchParams, searchTerm: e.target.value })}
          />
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={searchParams.status}
              onChange={(e) => setSearchParams({ ...searchParams, status: e.target.value })}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="document_verification">Document Verification</MenuItem>
              <MenuItem value="fees_pending">Fees Pending</MenuItem>
              <MenuItem value="approved">Approved</MenuItem>
              <MenuItem value="rejected">Rejected</MenuItem>
              <MenuItem value="confirmed">Confirmed</MenuItem>
              <MenuItem value="enrolled">Enrolled</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Admission Type</InputLabel>
            <Select
              value={searchParams.admissionType}
              onChange={(e) => setSearchParams({ ...searchParams, admissionType: e.target.value })}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Regular">Regular</MenuItem>
              <MenuItem value="RTE">RTE</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Class"
            value={searchParams.class}
            onChange={(e) => setSearchParams({ ...searchParams, class: e.target.value })}
          />
          <Button variant="contained" onClick={handleSearch}>
            Search
          </Button>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tracking ID</TableCell>
              <TableCell>Student Name</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Admission Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Payment Status</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications.map((app) => (
              <TableRow key={app.trackingId}>
                <TableCell>{app.trackingId}</TableCell>
                <TableCell>{app.studentDetails.name}</TableCell>
                <TableCell>{app.studentDetails.appliedClass}</TableCell>
                <TableCell>{app.admissionType}</TableCell>
                <TableCell>{app.status}</TableCell>
                <TableCell>{app.paymentStatus}</TableCell>
                <TableCell>{new Date(app.createdAt).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ApplicationsPage;