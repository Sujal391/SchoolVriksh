// const TeacherTable = ({ teachers = [], onAssignClick }) => {
//   if (!Array.isArray(teachers)) {
//     return (
//       <div className="text-red-500">
//         Invalid data format: teachers is not an array
//       </div>
//     );
//   }

//   if (teachers.length === 0) {
//     return <div className="text-gray-500">No teachers found</div>;
//   }

//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full text-sm text-left text-gray-500 border border-gray-200">
//         <thead className="bg-gray-100 text-xs uppercase text-gray-700">
//           <tr>
//             <th className="px-6 py-3">Name</th>
//             <th className="px-6 py-3">Email</th>
//             <th className="px-6 py-3">Role</th>
//             <th className="px-6 py-3">Status</th>
//             <th className="px-6 py-3">Assignments</th>
//             <th className="px-6 py-3">Actions</th>
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-200">
//           {teachers.map((teacher) => {
//             console.log("Teacher:", teacher); // Debug log
//             return (
//               <tr key={teacher._id} className="bg-white hover:bg-gray-50">
//                 <td className="px-6 py-4">{teacher.name}</td>
//                 <td className="px-6 py-4">{teacher.email}</td>
//                 <td className="px-6 py-4">
//                   <span
//                     className={`inline-block px-2 py-1 text-xs font-medium rounded ${
//                       teacher.role === "admin"
//                         ? "bg-purple-100 text-purple-800"
//                         : "bg-blue-100 text-blue-800"
//                     }`}
//                   >
//                     {teacher.role}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4">
//                   <span
//                     className={`inline-block px-2 py-1 text-xs font-medium rounded ${
//                       teacher.status === "active"
//                         ? "bg-green-100 text-green-800"
//                         : "bg-red-100 text-red-800"
//                     }`}
//                   >
//                     {teacher.status || "Unknown"}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4">
//                   <div className="flex flex-wrap gap-1">
//                     {teacher.assignments?.classTeacher && (
//                       <span className="bg-cyan-100 text-cyan-800 text-xs font-medium px-2 py-1 rounded">
//                         Class Teacher
//                       </span>
//                     )}
//                     {teacher.assignments?.subjectTeacher?.map((subj, idx) => (
//                       <span
//                         key={idx}
//                         className="bg-gray-200 text-gray-800 text-xs font-medium px-2 py-1 rounded"
//                       >
//                         {subj.subject?.name || "Unknown Subject"}
//                       </span>
//                     ))}
//                   </div>
//                 </td>
//                 <td className="px-6 py-4">
//                   <button
//                     onClick={() => onAssignClick(teacher)}
//                     className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 font-medium rounded text-xs px-3 py-1"
//                   >
//                     Assign
//                   </button>
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default TeacherTable;


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
} from "@mui/material";
import EmptyState from "../common/EmptyState";

const TeacherTable = ({
  teachers = [],
  onAssignClick,
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
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => onAssignClick(teacher)}
                    >
                      Assign
                    </Button>
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
