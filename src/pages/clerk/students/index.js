




// src/pages/clerk/students/index.js
import { 
  Box, 
  Typography, 
  Button, 
  TextField, 
  MenuItem, 
  Paper,
  Alert,
  CircularProgress,
  Divider,
  Stack,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { 
  Add as AddIcon,
  FilterList as FilterIcon,
  School as SchoolIcon
} from '@mui/icons-material';
import { useAuth } from '../../../contexts/AuthContext';
import withProtectedRoute from '../../../components/common/ProtectedRoute';
import ClerkLayout from '../../../components/layout/ClerkLayout';
import StudentList from '../../../components/clerk/students/StudentList';
import useClerk from '../../../hooks/useClerk';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const StudentsPage = () => {
  const {
    students,
    classes,
    loading,
    error,
    fetchStudentsByClass,
    fetchAvailableClasses,
    upgradeStudentClass
  } = useClerk();

  // Only fetch classes data when this page loads
  useEffect(() => {
    fetchAvailableClasses();
  }, []);
  const [classId, setClassId] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();

  const handleClassChange = async (e) => {
    const selectedClassId = e.target.value;
    setClassId(selectedClassId);
    if (selectedClassId) {
      await fetchStudentsByClass(selectedClassId);
    }
  };

  const handleUpgrade = async (studentId, newClassId) => {
    try {
      await upgradeStudentClass(studentId, newClassId);
      // Refresh the student list after upgrade
      if (classId) {
        await fetchStudentsByClass(classId);
      }
    } catch (err) {
      throw err; // Error will be caught in the ClassUpgradeForm
    }
  };

  // Add className to each student for display
  const studentsWithClass = students.map(student => ({
    ...student,
    className: classes.find(c => c._id === student.classId)?.name || 'Unknown Class',
    classId: student.classId // Ensure classId is included
  }));

  const LoadingState = () => (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        py: 8 
      }}
    >
      <Stack spacing={2} alignItems="center">
        <CircularProgress />
        <Typography variant="body2" color="text.secondary">
          Loading students...
        </Typography>
      </Stack>
    </Box>
  );

  const ErrorState = () => (
    <Alert severity="error" sx={{ mb: 2 }}>
      <Typography variant="body2">
        <strong>Error:</strong> {error}
      </Typography>
    </Alert>
  );

  const EmptyClassState = () => (
    <Paper 
      variant="outlined"
      sx={{ 
        textAlign: 'center', 
        py: 6,
        backgroundColor: 'grey.50'
      }}
    >
      <SchoolIcon sx={{ fontSize: 48, color: 'grey.400', mb: 2 }} />
      <Typography variant="h6" color="text.secondary" gutterBottom>
        No Students Found
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {classId ? 'No students found for the selected class.' : 'Please select a class to view students.'}
      </Typography>
    </Paper>
  );

  return (
    <ClerkLayout>
      <Box sx={{ p: 0 }}>
        {/* Page Header */}
        <Box sx={{ mb: 4 }}>
          <Stack 
            direction={isMobile ? 'column' : 'row'} 
            justifyContent="space-between" 
            alignItems={isMobile ? 'stretch' : 'center'}
            spacing={2}
          >
            <Box>
              <Typography variant="h4" component="h1" gutterBottom>
                Student Management
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Manage and view student records
              </Typography>
            </Box>
            
            <Link href="/clerk/students/register" passHref legacyBehavior>
              <Button 
                variant="contained" 
                startIcon={<AddIcon />}
                size={isMobile ? 'large' : 'medium'}
                fullWidth={isMobile}
                sx={{ 
                  minWidth: isMobile ? 'auto' : 180,
                  py: isMobile ? 1.5 : 1
                }}
              >
                Register Student
              </Button>
            </Link>
          </Stack>
          <Divider sx={{ mt: 2 }} />
        </Box>

        {/* Filter Section */}
        <Paper 
          variant="outlined" 
          sx={{ 
            p: 3, 
            mb: 3,
            backgroundColor: 'grey.50'
          }}
        >
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <FilterIcon color="primary" />
              <Typography variant="h6" sx={{ fontWeight: 500 }}>
                Filter Options
              </Typography>
            </Box>
            
            <TextField
              select
              fullWidth
              label="Select Class"
              value={classId}
              onChange={handleClassChange}
              variant="outlined"
              size={isMobile ? 'medium' : 'small'}
              sx={{ maxWidth: isMobile ? '100%' : 300 }}
            >
              <MenuItem value="">
                <em>All Classes</em>
              </MenuItem>
              {classes.length === 0 ? (
                <MenuItem disabled>No classes available</MenuItem>
              ) : (
                classes.map((cls) => (
                  <MenuItem key={cls._id} value={cls._id}>
                    {`${cls.name}${cls.division ? " " + cls.division : ""}`}
                  </MenuItem>
                ))
              )}
            </TextField>
          </Stack>
        </Paper>

        {/* Content Section */}
        <Box>
          {loading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState />
          ) : students.length === 0 ? (
            <EmptyClassState />
          ) : (
            <StudentList 
              students={studentsWithClass} 
              classes={classes}
              onUpgrade={handleUpgrade}
            />
          )}
        </Box>
      </Box>
    </ClerkLayout>
  );
};

export default withProtectedRoute(StudentsPage, ['clerk']);




