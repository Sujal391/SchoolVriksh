import React, { useState } from "react";
import {
  Button,
  Modal,
  Box,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import CircularProgress from '@mui/material/CircularProgress';

const StudentTable = ({ students, selectedClassId, loading }) => {
  const [open, setOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleOpen = (student) => {
    setSelectedStudent(student);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedStudent(null);
    setOpen(false);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left text-gray-700 border border-gray-300 shadow-md rounded-lg">
        <thead className="bg-gray-100 text-xs uppercase text-gray-600">
          <tr>
            <th className="px-4 py-3 text-[16px] text-center">Name</th>
            <th className="px-4 py-3 text-[16px] text-center">GR Number</th>
            <th className="px-4 py-3 text-[16px] text-center">Admission Type</th>
            <th className="px-4 py-3 text-[16px] text-center">Gender</th>
            <th className="px-4 py-3 text-[16px] text-center">Parent</th>
            <th className="px-4 py-3 text-[16px] text-center">Student Details</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <CircularProgress size={20} />
                    <span>Loading students...</span>
                  </div>
                </td>
              </tr>
            ) : !selectedClassId ? (
            <tr>
                <td colSpan={6} className="px-4 py-4 text-center text-gray-500">
                  No class is selected
                </td>
              </tr>
            ) : students.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-4 py-2 text-center">
                No students found
              </td>
            </tr>
          ) : (
            students.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-center">{student.name}</td>
                <td className="px-4 py-2 text-center">{student.grNumber}</td>
                <td className="px-4 py-2 text-center">
                  <span
                    className={`px-2 py-1 rounded text-white text-xs font-medium ${
                    student.admissionType === "RTE"
                      ? "bg-purple-600"
                      : "bg-blue-600"
                  }`}
                >
                  {student.admissionType}
                </span>
              </td>
              <td className="px-4 py-2 text-center">{student.gender}</td>
              <td className="px-4 py-2 text-center">
                {student.parentDetails?.name || "N/A"}
                {student.parentDetails?.mobile && (
                  <div className="text-xs text-gray-500">
                    {student.parentDetails.mobile}
                  </div>
                )}
              </td>
              <td className="px-4 py-2 text-center">
                {/* <span className={`px-2 py-1 rounded text-white text-xs font-medium ${
                  student.status === 'active' ? 'bg-green-600' : 'bg-red-500'
                }`}>
                  {student.status}
                </span> */}
                <Button
                  variant="text"
                  color="primary"
                  size="small"
                  onClick={handleOpen}
                  sx={{ textTransform: "none" }}
                >
                  View
                </Button>
              </td>
            </tr>
            )))}
        </tbody>
      </table>

      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropProps={{
          style: {
            backdropFilter: "blur(5px)",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            maxWidth: 400,
            width: "90%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 1,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <PersonIcon style={{ fontSize: "2rem", color: "#333" }} />
              <Typography variant="h6" component="h2">
                Student Details
              </Typography>
            </Box>
            <IconButton onClick={handleClose}>
              <CloseIcon style={{ color: "#333" }} />
            </IconButton>
          </Box>

          <Divider sx={{ mb: 2 }} />

          {selectedStudent ? (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box>
                <Typography variant="subtitle2">Name:</Typography>
                <Typography>{selectedStudent.name || "N/A"}</Typography>
                <Divider />
              </Box>

              <Box>
                <Typography variant="subtitle2">GR Number:</Typography>
                <Typography>{selectedStudent.grNumber || "N/A"}</Typography>
                <Divider />
              </Box>

              <Box>
                <Typography variant="subtitle2">Admission Type:</Typography>
                <Typography>
                  {selectedStudent.admissionType || "N/A"}
                </Typography>
                <Divider />
              </Box>

              <Box>
                <Typography variant="subtitle2">Gender:</Typography>
                <Typography>{selectedStudent.gender || "N/A"}</Typography>
                <Divider />
              </Box>

              <Box>
                <Typography variant="subtitle2">Parent Name:</Typography>
                <Typography>
                  {selectedStudent.parentDetails?.name || "N/A"}
                </Typography>
                <Divider />
              </Box>

              <Box>
                <Typography variant="subtitle2">Parent Mobile:</Typography>
                <Typography>
                  {selectedStudent.parentDetails?.mobile || "N/A"}
                </Typography>
              </Box>
            </Box>
          ) : (
            <Typography>No details available</Typography>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default StudentTable;
