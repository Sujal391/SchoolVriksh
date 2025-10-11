import {
  CircularProgress,
  Box,
  Typography,
  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  IconButton,
} from "@mui/material";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import DeleteIcon from '@mui/icons-material/Delete';
import EmptyState from "../common/EmptyState";

const TeacherTable = ({
  teachers = [],
  onAssignClick,
  onDeleteClick,
  onReassignSubjectClick,
  loading,
  page,
  rowsPerPage,
  totalPages,
  onPageChange,
  onRowsPerPageChange,
}) => {
  if (!Array.isArray(teachers)) {
    return (
      <Typography color="error">
        Invalid data format: teachers is not an array
      </Typography>
    );
  }

  const handleChangePage = (event, newPage) => {
    onPageChange(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    onRowsPerPageChange(parseInt(event.target.value, 10));
  };

  return (
    <Paper className="overflow-x-auto p-2">
      <TableContainer>
        <Table>
          <TableHead className="bg-gray-100">
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Class Teacher</TableCell>
              <TableCell align="center">Subject Assignments</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <EmptyState loading loadingMessage="Loading teachers..." />
                </TableCell>
              </TableRow>
            ) : teachers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <EmptyState message="No teachers found" />
                </TableCell>
              </TableRow>
            ) : (
              teachers.map((teacher) => (
                <TableRow key={teacher._id} hover>
                  <TableCell align="center">{teacher.name}</TableCell>
                  <TableCell align="center">{teacher.email}</TableCell>
                  <TableCell align="center">
                    {teacher.currentAssignments?.classTeacher ? (
                      <Chip
                        label={`${teacher.currentAssignments.classTeacher.name}${
                          teacher.currentAssignments.classTeacher.division
                            ? ` (${teacher.currentAssignments.classTeacher.division})`
                            : ""
                        }`}
                        size="small"
                        color="info"
                        variant="filled"
                      />
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        Not assigned
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {teacher.currentAssignments?.subjectTeacher?.length > 0 ? (
                      <Box display="flex" flexWrap="wrap" justifyContent="center" gap={1}>
                        {teacher.currentAssignments.subjectTeacher.map((subj, idx) => (
                          <Chip
                            key={idx}
                            label={`${subj.subject} (${subj.class?.name || "Unknown"})`}
                            size="small"
                            variant="filled"
                          />
                        ))}
                      </Box>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        No subjects
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell align="center">
  <Box display="flex" justifyContent="center" gap={1} flexWrap="wrap">
    <IconButton
      color="primary"
      size="small"
      onClick={() => onAssignClick(teacher)}
      aria-label="assign teacher"
      title="Assign Teacher"
    >
      <PersonAddAltIcon />
    </IconButton>

    <IconButton
      color="secondary"
      size="small"
      onClick={() => onReassignSubjectClick(teacher)}
      aria-label="reassign subject"
      title="Reassign Subject"
    >
      <PublishedWithChangesIcon />
    </IconButton>

    <IconButton
      color="error"
      size="small"
      onClick={() => onDeleteClick(teacher)}
      aria-label="delete teacher"
      title="Delete Teacher"
    >
      <DeleteIcon />
    </IconButton>
  </Box>
</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination controls */}
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
    </Paper>
  );
};

export default TeacherTable;