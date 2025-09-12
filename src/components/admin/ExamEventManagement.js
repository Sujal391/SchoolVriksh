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

const ExamEventTable = ({ examEvents, onEdit, loading }) => {
  const router = useRouter();
  const queryPage = parseInt(router.query.page || '1', 10);
  const [page, setPage] = useState(queryPage);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const totalPages = Math.ceil(examEvents.length / rowsPerPage);

  useEffect(() => {
    setPage(queryPage);
  }, [queryPage]);

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

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Box>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#E0E0E0' }}>
            <TableRow>
              <TableCell>Exam Name</TableCell>
              <TableCell>Exam Type</TableCell>
              <TableCell>Exam Dates</TableCell>
              <TableCell>Classes</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                    <CircularProgress size={20} />
                    Loading exam events...
                  </Box>
                </TableCell>
              </TableRow>
            ) : examEvents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No exam events found
                </TableCell>
              </TableRow>
            ) : (
              examEvents
                .slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage)
                .map((exam) => (
                  <TableRow key={exam._id} hover>
                    <TableCell>{exam.name}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${badgeColors[exam.examType]}`}
                      >
                        {exam.examType === 'Other' ? exam.customExamType : exam.examType}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div>{formatDate(exam.startDate)}</div>
                      <div className="text-xs text-gray-500">to</div>
                      <div>{formatDate(exam.endDate)}</div>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" flexWrap="wrap" gap={1}>
                        {exam.classes?.slice(0, 3).map((cls) => (
                          <span
                            key={cls._id}
                            className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs"
                          >
                            {cls.name}
                          </span>
                        ))}
                        {exam.classes?.length > 3 && (
                          <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                            +{exam.classes.length - 3} more
                          </span>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          badgeColors[exam.status] || 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {exam.status.replace('_', ' ')}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/admin/exams/schedule/${exam._id}`}
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
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px={2}
        mb={1}
        mt={2}
      >
        <Typography variant="subtitle1">
          Page {page} of {totalPages}
        </Typography>

        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChangePage}
          color="primary"
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
    </Box>
  );
};

export default ExamEventTable;
