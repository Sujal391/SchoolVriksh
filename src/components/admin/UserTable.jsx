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
  TablePagination,
  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { ROLE_COLORS } from "../../utils/constants";

const UserTable = ({
  users = [],
  loading,
  page,
  rowsPerPage,
  totalPages,
  onPageChange,
  onRowsPerPageChange,
  onEditClick,
}) => {
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
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Attendance Permissions</TableCell>
              <TableCell>Marks Entry Permissions</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    gap={1}
                  >
                    <CircularProgress size={24} />
                    Loading users...
                  </Box>
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <span
                      style={{
                        backgroundColor: ROLE_COLORS[user.role],
                        color: "#212121",
                        padding: "2px 6px",
                        borderRadius: "8px",
                        fontSize: "0.75rem",
                        fontWeight: "600",
                      }}
                    >
                      {user.role.toUpperCase()}
                    </span>
                  </TableCell>
                  <TableCell>
                    {user.permissions?.canTakeAttendance?.length > 0
                      ? user.permissions.canTakeAttendance.map((cls, idx) => (
                          <span key={idx} style={{ marginRight: "4px" }}>
                            {cls.name} {cls.division ? `(${cls.division})` : ""}
                          </span>
                        ))
                      : "None"}
                  </TableCell>
                  <TableCell>
                    {user.permissions?.canEnterMarks?.length > 0
                      ? user.permissions.canEnterMarks.map((perm, idx) => (
                          <span key={idx} style={{ marginRight: "4px" }}>
                            {perm.subject?.name || "Unknown Subject"} (
                            {perm.class?.name || "Unknown Class"}{" "}
                            {perm.class?.division
                              ? `- ${perm.class.division}`
                              : ""}
                            )
                          </span>
                        ))
                      : "None"}
                  </TableCell>
                  <TableCell>
                    <button
                      className="bg-blue-600 text-white px-3 py-1 rounded"
                      onClick={() => onEditClick(user)}
                    >
                      Edit
                    </button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

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

export default UserTable;
