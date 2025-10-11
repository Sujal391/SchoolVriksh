import Link from 'next/link';
import { FaCalendarAlt } from 'react-icons/fa';
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { CalendarToday } from '@mui/icons-material';
import EmptyState from '../common/EmptyState';

const badgeColors = {
  Final: 'bg-red-100 text-red-800',
  Midterm: 'bg-purple-100 text-purple-800',
  Other: 'bg-blue-100 text-blue-800',
  UnitTest: 'bg-green-100 text-green-800',
  Practical: 'bg-yellow-100 text-yellow-800',
  draft: 'bg-gray-100 text-gray-800',
  scheduled: 'bg-blue-100 text-blue-800',
  in_progress: 'bg-yellow-100 text-yellow-800',
  completed: 'bg-green-100 text-green-800',
  published: 'bg-purple-100 text-purple-800',
};

const ExamEventTable = ({ examEvents, onEdit, loading, onYearChange, onAcademicYearChange, availableAcademicYears = [] }) => {
  const router = useRouter();
  const queryPage = parseInt(router.query.page || '1', 10);
  const [page, setPage] = useState(queryPage);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedAcademicYear, setSelectedAcademicYear] = useState('all');

  // Flatten the schedule object to get all exams
  const getAllExams = () => {
    if (!examEvents || typeof examEvents !== 'object') {
      console.log('No exam events or invalid format:', examEvents);
      return [];
    }

    const allExams = [];
    
    // Iterate through all keys in the schedule object
    Object.keys(examEvents).forEach(dateKey => {
      if (Array.isArray(examEvents[dateKey])) {
        allExams.push(...examEvents[dateKey]);
      }
    });

    console.log('Flattened exams:', allExams);
    return allExams;
  };

  // Extract unique academic years from exam events (fallback if not provided)
  const getAvailableAcademicYears = () => {
    // If academic years are provided as prop, use them
    if (availableAcademicYears && availableAcademicYears.length > 0) {
      return availableAcademicYears;
    }
    
    // Otherwise, extract from exam events
    const academicYears = new Set();
    const allExams = getAllExams();
    
    allExams.forEach(exam => {
      // Check both exam.academicYear and exam.examEvent?.academicYear
      const academicYear = exam.academicYear || exam.examEvent?.academicYear;
      if (academicYear) {
        academicYears.add(academicYear);
      }
    });
    
    // Sort academic years (e.g., "2025-2026" comes after "2024-2025")
    return Array.from(academicYears).sort((a, b) => b.localeCompare(a));
  };

  const academicYearsList = getAvailableAcademicYears();
  const allExams = getAllExams();
  const totalPages = Math.ceil(allExams.length / rowsPerPage);

  useEffect(() => {
    setPage(queryPage);
  }, [queryPage]);

  useEffect(() => {
    // Reset to page 1 when academic year filter changes
    setPage(1);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: 1 },
    });
  }, [selectedAcademicYear]);

  const handleChangePage = (event, value) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: value },
    });
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(1);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: 1 },
    });
  };

  const handleAcademicYearChange = (event) => {
    const academicYear = event.target.value;
    setSelectedAcademicYear(academicYear);
    
    // Reset page to 1
    setPage(1);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: 1 },
    });
    
    // Call the parent callback to fetch data from API
    if (onAcademicYearChange) {
      onAcademicYearChange(academicYear === 'all' ? null : academicYear);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    
    try {
      // Handle ISO date strings
      const date = new Date(dateString);
      
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return 'Invalid Date';
      }
      
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return date.toLocaleDateString(undefined, options);
    } catch (error) {
      console.error('Error formatting date:', dateString, error);
      return 'Invalid Date';
    }
  };

  // Helper function to get academic year from exam object
  const getAcademicYear = (exam) => {
    return exam.academicYear || exam.examEvent?.academicYear || 'N/A';
  };

  // Helper function to get exam name
  const getExamName = (exam) => {
    return exam.examEvent?.name || exam.name || 'N/A';
  };

  // Helper function to get exam type
  const getExamType = (exam) => {
    return exam.examEvent?.examType || exam.examType || 'Other';
  };

  // Helper function to get custom exam type
  const getCustomExamType = (exam) => {
    return exam.examEvent?.customExamType || exam.customExamType;
  };

  // Helper function to format class display
  const getClassDisplay = (exam) => {
    if (exam.class) {
      // Single class object from schedule response
      const className = exam.class.name || '';
      const division = exam.class.division || '';
      return division ? `${className} ${division}` : className;
    }
    return null;
  };

  return (
    <Paper className="overflow-x-auto p-2">
      {/* Filter Controls */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} px={1}>
        <Typography variant="h6">
          Exam Events
          {selectedAcademicYear !== 'all' && ` (${selectedAcademicYear})`}
        </Typography>
        
        <Box display="flex" gap={2}>
          {/* Academic Year Filter - This triggers API call */}
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel>Academic Year</InputLabel>
            <Select
              value={selectedAcademicYear}
              label="Academic Year"
              onChange={handleAcademicYearChange}
            >
              <MenuItem value="all">All Academic Years</MenuItem>
              {availableAcademicYears.map(year => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: '#E0E0E0' }}>
            <TableRow>
              <TableCell>Exam Name</TableCell>
              <TableCell>Exam Type</TableCell>
              <TableCell>Exam Date</TableCell>
              <TableCell>Academic Year</TableCell>
              <TableCell>Weightage</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  <EmptyState loading loadingMessage="Loading exam events..." />
                </TableCell>
              </TableRow>
            ) : allExams.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  <EmptyState 
                    message={
                      selectedAcademicYear !== 'all'
                        ? `No exam events found for ${selectedAcademicYear}` 
                        : "No exam events found"
                    } 
                  />
                </TableCell>
              </TableRow>
            ) : (
              allExams
                .slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage)
                .map((exam) => (
                  <TableRow key={exam._id} hover>
                    <TableCell>
                      {exam.name || exam.examEvent?.name || 'N/A'}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 text-xs uppercase rounded-full ${badgeColors[exam.examType || exam.examEvent?.examType]}`}
                      >
                        {(exam.examType || exam.examEvent?.examType) === 'Other' 
                          ? (exam.customExamType || exam.examEvent?.customExamType)
                          : (exam.examType || exam.examEvent?.examType)}
                      </span>
                    </TableCell>
                    <TableCell>
                      {exam.examDate ? formatDate(exam.examDate) : 'N/A'}
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-medium text-gray-700">
                        {getAcademicYear(exam)}
                      </span>
                    </TableCell>
                    <TableCell>
                      {exam.weightage ? `${exam.weightage}%` : 'N/A'}
                    </TableCell>
                    <TableCell>
                      {getClassDisplay(exam)}
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        exam.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                        exam.status === 'completed' ? 'bg-green-100 text-green-800' :
                        exam.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {exam.status.replace('_', ' ')}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/admin/exams/schedule/${exam.examEvent?._id || exam._id}`}
                        className="text-blue-600 hover:text-blue-900 flex items-center"
                      >
                        <FaCalendarAlt className="mr-1" /> View Schedule
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Controls */}
      {allExams.length > 0 && (
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          px={2}
          mb={1}
          mt={2}
        >
          <Typography variant="subtitle1">
            Showing {allExams.length} exam{allExams.length !== 1 ? 's' : ''} - Page {page} of {totalPages}
          </Typography>

          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChangePage}
            color="primary"
            disabled={totalPages <= 1}
          />

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Rows per page</InputLabel>
            <Select
              value={rowsPerPage}
              label="Rows per page"
              onChange={handleChangeRowsPerPage}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
            </Select>
          </FormControl>
        </Box>
      )}
    </Paper>
  );
};

export default ExamEventTable;