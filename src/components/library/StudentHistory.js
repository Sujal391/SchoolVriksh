import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  Avatar,
  CircularProgress
} from '@mui/material';
import { Search, Refresh } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';
import libraryService from '../../services/libraryService';

const StudentHistory = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, [user.school._id]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      // This would need to be implemented in your backend
      // For now, we'll simulate fetching students with active issues
      const data = await libraryService.getStudentsWithActiveIssues();
      setStudents(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.grNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      {/* <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Student Book History</Typography>
        <Button
          variant="outlined"
          startIcon={<Refresh />}
          onClick={fetchStudents}
        >
          Refresh
        </Button>
      </Box>

      {error && (
        <Box mb={3}>
          <Typography color="error">{error}</Typography>
        </Box>
      )}

      <Box mb={3}>
        <TextField
          fullWidth
          label="Search Students"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearch}
          InputProps={{
            startAdornment: <Search color="action" sx={{ mr: 1 }} />,
          }}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student</TableCell>
              <TableCell>GR Number</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Active Issues</TableCell>
              <TableCell>Overdue</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStudents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No students found
                </TableCell>
              </TableRow>
            ) : (
              filteredStudents.map(student => (
                <TableRow key={student._id}>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <Avatar
                        src={student.profile?.photo}
                        sx={{ mr: 2 }}
                      >
                        {student.name.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography fontWeight="bold">{student.name}</Typography>
                        <Typography variant="body2">{student.email}</Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{student.studentDetails.grNumber}</TableCell>
                  <TableCell>{student.studentDetails.class?.name || 'N/A'}</TableCell>
                  <TableCell>
                    <Chip
                      label={student.activeIssues}
                      color="primary"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={student.overdue}
                      color={student.overdue > 0 ? 'error' : 'default'}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => router.push(`/library/history/${student._id}`)}
                    >
                      View History
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer> */}
    </Box>
  );
};

export default StudentHistory;



