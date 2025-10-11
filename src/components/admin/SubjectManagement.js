import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
  Button,
} from '@mui/material';
import EmptyState from '../common/EmptyState';

const SubjectTable = ({ subjects, onEdit, onDelete, onManageSyllabus, loading }) => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1); // Reset to first page
  };

  const totalPages = Math.ceil(subjects.length / rowsPerPage);
  const paginatedSubjects = subjects.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <Paper className="overflow-x-auto p-2" sx={{ mt: 2 }}>
      
      <TableContainer>
        <Table>
          <TableHead className="bg-gray-100">
            <TableRow>
              <TableCell><strong>Subject</strong></TableCell>
              <TableCell><strong>Class</strong></TableCell>
              <TableCell><strong>Academic Year</strong></TableCell>
              <TableCell><strong>Teachers</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <EmptyState loading loadingMessage="Loading subjects..." />
                </TableCell>
              </TableRow>
            ) : subjects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <EmptyState message="No subjects found" />
                </TableCell>
              </TableRow>
            ) : (
              paginatedSubjects.map((subject) => (
                <TableRow key={subject._id}>
                  <TableCell>{subject.name}</TableCell>
                  <TableCell>{subject.class?.name} - {subject.class?.division}</TableCell>
                  <TableCell>{subject.academicYear || 'N/A'}</TableCell>
                  <TableCell>
                    <Box display="flex" flexWrap="wrap" gap={1}>
                      {subject.teachers?.length > 0 ? (
                        subject.teachers.map((teacher, idx) => (
                          <Box
                            key={idx}
                            component="span"
                            sx={{
                              backgroundColor: '#e3f2fd',
                              color: '#1976d2',
                              fontSize: '0.75rem',
                              padding: '2px 8px',
                              borderRadius: '12px',
                            }}
                          >
                            {teacher.teacher.name}
                          </Box>
                        ))
                      ) : (
                        <Box
                          component="span"
                          sx={{
                            backgroundColor: '#f5f5f5',
                            color: '#616161',
                            fontSize: '0.75rem',
                            padding: '2px 8px',
                            borderRadius: '12px',
                          }}
                        >
                          Not Assigned
                        </Box>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box className="flex gap-1 flex-wrap">
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => onEdit(subject)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        size="small"
                        onClick={() => onManageSyllabus && onManageSyllabus(subject)}
                      >
                        Syllabus
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => onDelete(subject)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="space-between" alignItems="center" px={2} mb={1} mt={2}>
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
          <Select value={rowsPerPage} label="Rows per page" onChange={handleChangeRowsPerPage}>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Paper>
  );
};

export default SubjectTable;
