import React, { useState } from "react";
import {
  Button,
  Modal,
  Box,
  Typography,
  IconButton,
  Divider,
  Chip,
  Grid,
  Stack,
  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import { useTheme } from "@mui/material/styles";

const StudentTable = ({
  students,
  selectedClassId,
  loading,
  page,
  rowsPerPage,
  totalPages,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const theme = useTheme();
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

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-IN");
  };

  const handleChangePage = (event, newPage) => {
    onPageChange(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    onRowsPerPageChange(parseInt(event.target.value, 10));
  };

  const DetailItem = ({ label, value, fullWidth = false }) => (
    <Box sx={{ mb: 1.5 }}>
      <Typography
        variant="subtitle2"
        sx={{ fontWeight: 600, color: "#666", mb: 0.5 }}
      >
        {label}:
      </Typography>
      <Typography sx={{ color: "#333" }}>{value || "N/A"}</Typography>
      {!fullWidth && <Divider sx={{ mt: 1 }} />}
    </Box>
  );

  const InfoSection = ({ title, children }) => (
    <Box
      sx={{
        p: 3,
        border: "1px solid #ddd",
        borderRadius: 2,
        backgroundColor: "#fafafa",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          color: "#1976d2",
          borderBottom: "2px solid #1976d2",
          pb: 1,
        }}
      >
        {title}
      </Typography>
      {children}
    </Box>
  );

  return (
    <Paper className="overflow-x-auto p-2">
      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">GR Number</TableCell>
              <TableCell align="center">Admission Type</TableCell>
              <TableCell align="center">Gender</TableCell>
              <TableCell align="center">Parent</TableCell>
              <TableCell align="center">Student Details</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
                    <CircularProgress size={20} />
                    Loading students...
                  </Box>
                </TableCell>
              </TableRow>
            ) : !selectedClassId ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ color: "#999" }}>
                  No class is selected
                </TableCell>
              </TableRow>
            ) : students.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ color: "#999" }}>
                  No students found
                </TableCell>
              </TableRow>
            ) : (
              students.map((student) => (
                <TableRow key={student.id} hover>
                  <TableCell align="center">{student.name}</TableCell>
                  <TableCell align="center">{student.grNumber}</TableCell>
                  <TableCell align="center">
                    <Chip
                      label={student.admissionType}
                      size="small"
                      sx={{
                        color: "#fff",
                        backgroundColor:
                          student.admissionType === "RTE" ? "#6B46C1" : "#2563EB",
                        fontWeight: 600,
                        fontSize: "0.75rem",
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">{student.gender}</TableCell>
                  <TableCell align="center">
                    {student.parentDetails?.name || "N/A"}
                    {student.parentDetails?.mobile && (
                      <Typography variant="caption" sx={{ display: "block", color: "#666" }}>
                        {student.parentDetails.mobile}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="text"
                      color="primary"
                      size="small"
                      onClick={() => handleOpen(student)}
                      sx={{ textTransform: "none" }}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination controls */}
      <Box display="flex" justifyContent="space-between" alignItems="center" px={2} mb={1} mt={2}>
        <Typography variant="subtitle1">
          Page {page} of {totalPages}
        </Typography>

        <Pagination count={totalPages} page={page} onChange={handleChangePage} color="primary" />

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Rows per page</InputLabel>
          <Select value={rowsPerPage} label="Rows per page" onChange={handleChangeRowsPerPage}>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Enhanced Modal */}
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
            p: 0,
            borderRadius: 3,
            maxWidth: 700,
            width: "95%",
            maxHeight: "90vh",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: 3,
              bgcolor: "#f8f9fa",
              borderBottom: "1px solid #e0e0e0",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <PersonIcon sx={{ fontSize: "2.2rem", color: "#1976d2" }} />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Student Details
                </Typography>
                <Typography variant="body2" sx={{ color: "#666" }}>
                  {selectedStudent?.name}
                </Typography>
              </Box>
            </Box>
            <IconButton onClick={handleClose}>
              <CloseIcon sx={{ color: "#666" }} />
            </IconButton>
          </Box>

          {/* Content */}
          <Box sx={{ p: 3, maxHeight: "calc(90vh - 100px)", overflowY: "auto" }}>
            {selectedStudent ? (
              <Stack spacing={4}>
                {/* Personal Information */}
                <InfoSection title="Personal Information">
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <DetailItem label="Full Name" value={selectedStudent.name} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <DetailItem label="GR Number" value={selectedStudent.grNumber} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <DetailItem label="Email" value={selectedStudent.email} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <DetailItem label="Mobile" value={selectedStudent.mobile} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <DetailItem label="Date of Birth" value={formatDate(selectedStudent.dob)} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <DetailItem label="Gender" value={selectedStudent.gender} />
                    </Grid>
                  </Grid>
                </InfoSection>

                {/* Academic Information */}
                <InfoSection title="Academic Information">
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <DetailItem label="Admission Type" value={selectedStudent.admissionType} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <DetailItem label="Admission Date" value={formatDate(selectedStudent.admissionDate)} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <DetailItem label="RTE Status" value={selectedStudent.isRTE ? "Yes" : "No"} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <DetailItem label="Status" value={selectedStudent.status} />
                    </Grid>
                  </Grid>
                </InfoSection>

                {/* Personal Details */}
                <InfoSection title="Personal Details">
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <DetailItem label="Religion" value={selectedStudent.religion} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <DetailItem label="Caste" value={selectedStudent.caste} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <DetailItem label="Sub Caste" value={selectedStudent.subCaste} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <DetailItem label="UID Number" value={selectedStudent.uidNumber} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <DetailItem label="Aadhar Number" value={selectedStudent.aadharNumber} />
                    </Grid>
                  </Grid>
                </InfoSection>

                {/* Parent Information */}
                {selectedStudent.parentDetails && (
                  <InfoSection title="Parent Information">
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <DetailItem label="Parent Name" value={selectedStudent.parentDetails.name} />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <DetailItem label="Parent Email" value={selectedStudent.parentDetails.email} />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <DetailItem label="Parent Mobile" value={selectedStudent.parentDetails.mobile} />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <DetailItem label="Parent Occupation" value={selectedStudent.parentDetails.occupation} />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <DetailItem label="Parent Aadhar" value={selectedStudent.parentDetails.aadharNumber} />
                      </Grid>
                    </Grid>
                  </InfoSection>
                )}

                {/* Transport Information */}
                {selectedStudent.transportDetails && (
                  <InfoSection title="Transport Information">
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <DetailItem
                          label="Transport Applicable"
                          value={selectedStudent.transportDetails.isApplicable ? "Yes" : "No"}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <DetailItem
                          label="Distance Slab"
                          value={selectedStudent.transportDetails.distanceSlab || "Not Applicable"}
                        />
                      </Grid>
                    </Grid>
                  </InfoSection>
                )}

                {/* Record Information */}
                <InfoSection title="Record Information">
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <DetailItem label="Created At" value={formatDate(selectedStudent.createdAt)} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <DetailItem label="Updated At" value={formatDate(selectedStudent.updatedAt)} />
                    </Grid>
                  </Grid>
                </InfoSection>
              </Stack>
            ) : (
              <Typography>No details available</Typography>
            )}
          </Box>
        </Box>
      </Modal>
    </Paper>
  );
};

export default StudentTable;
