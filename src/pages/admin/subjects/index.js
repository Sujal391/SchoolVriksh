import { useState, useEffect } from "react";
import AdminLayout from "../../../components/layout/AdminLayout";
import AdminService from "../../../services/adminService";
import SubjectTable from "../../../components/admin/SubjectManagement";
import SubjectFormModal from "../../../components/admin/SubjectFormModal";
import SyllabusManagementTab from "../../../components/admin/SyllabusManagementTab";

import {
  Button,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Snackbar,
  Tabs,
  Tab,
  Box,
  Paper,
  Stack,
  Select,
  MenuItem,
} from "@mui/material";
import { Add } from "@mui/icons-material";

const TabPanel = ({ children, value, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`subject-tabpanel-${index}`}
      aria-labelledby={`subject-tab-${index}`}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

const SubjectsPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedClass, setSelectedClass] = useState("");

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [subjectToDelete, setSubjectToDelete] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [tabValue, setTabValue] = useState(0);

  const showError = (message) => {
    setError(message);
    setSuccess("");
    setSnackbarOpen(true);
  };

  const filteredSubjects = selectedClass
    ? subjects.filter((sub) => sub.class?._id === selectedClass)
    : subjects;

  const showSuccess = (message) => {
    setSuccess(message);
    setError("");
    setSnackbarOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subjectsRes, classesRes] = await Promise.all([
          AdminService.getAllSubjects(),
          AdminService.getClasses(),
        ]);
        setSubjects(subjectsRes.data);
        setClasses(classesRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        showError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFormSubmit = async (subjectData) => {
    try {
      let response;
      if (selectedSubject) {
        response = await AdminService.updateSubject(
          selectedSubject._id,
          subjectData
        );
        showSuccess(`Subject "${response.subject.name}" updated successfully`);
      } else {
        response = await AdminService.createSubject(subjectData);
        showSuccess(`Subject "${subjectData.name}" created successfully`);
      }

      const subjectsResponse = await AdminService.getAllSubjects();
      setSubjects(subjectsResponse.data);
      setIsModalOpen(false);
      setSelectedSubject(null);
    } catch (error) {
      console.error("Error saving subject:", error);

      if (error.response?.status === 404) {
        showError("Subject not found. Please refresh and try again.");
      } else if (error.response?.status === 500) {
        showError("Server error occurred. Please try again later.");
      } else {
        const errorMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message;
        showError(
          `Failed to ${
            selectedSubject ? "update" : "create"
          } subject: ${errorMessage}`
        );
      }
    }
  };

  const handleDeleteSubject = (subject) => {
    setSubjectToDelete(subject);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteSubject = async () => {
    try {
      await AdminService.deleteSubject(subjectToDelete._id);
      showSuccess(`Subject "${subjectToDelete.name}" deleted successfully`);

      const response = await AdminService.getAllSubjects();
      setSubjects(response.data);

      setDeleteDialogOpen(false);
      setSubjectToDelete(null);
    } catch (error) {
      console.error("Error deleting subject:", error);

      if (error.response?.status === 404) {
        showError("Subject not found. It may have already been deleted.");
      } else if (error.response?.status === 500) {
        showError("Server error occurred. Please try again later.");
      } else {
        const errorMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message;
        showError(`Failed to delete subject: ${errorMessage}`);
      }

      setDeleteDialogOpen(false);
      setSubjectToDelete(null);
    }
  };

  return (
    <AdminLayout>
      <Box sx={{ maxWidth: 1400, mx: "auto", p: 3 }}>
        {/* Header */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 3 }}
        >
          <Typography variant="h4" fontWeight={600}>
            Subject Management
          </Typography>

          {tabValue === 0 && (
            <Box display="flex" alignItems="center" gap={2}>
              <Typography sx={{ whiteSpace: "nowrap" }}>
                Filter by Class:
              </Typography>
              <Select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                displayEmpty
                size="small"
              >
                <MenuItem value="">All Classes</MenuItem>
                {classes.map((cls) => (
                  <MenuItem key={cls._id} value={cls._id}>
                    {cls.name} {cls.division && `(${cls.division})`}
                  </MenuItem>
                ))}
              </Select>

              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => {
                  setSelectedSubject(null);
                  setIsModalOpen(true);
                }}
              >
                Add Subject
              </Button>
            </Box>
          )}
        </Stack>
        {/* Tabs */}
        <Paper
          elevation={0}
          sx={{ border: "1px solid", borderColor: "divider" }}
        >
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={tabValue}
              onChange={(e, newValue) => setTabValue(newValue)}
              sx={{ px: 2 }}
            >
              <Tab
                label="Subjects"
                sx={{
                  textTransform: "none",
                  fontSize: "0.95rem",
                  fontWeight: 500,
                }}
              />
              <Tab
                label="Syllabus"
                sx={{
                  textTransform: "none",
                  fontSize: "0.95rem",
                  fontWeight: 500,
                }}
              />
            </Tabs>
          </Box>

          {/* Subject Management Tab */}
          <TabPanel value={tabValue} index={0}>
            <Box sx={{ p: 3 }}>
              <SubjectTable
                subjects={filteredSubjects}
                loading={loading}
                onEdit={(subject) => {
                  setSelectedSubject(subject);
                  setIsModalOpen(true);
                }}
                onDelete={handleDeleteSubject}
              />
            </Box>
          </TabPanel>

          {/* Syllabus Management Tab */}
          <TabPanel value={tabValue} index={1}>
            <Box sx={{ p: 3 }}>
              <SyllabusManagementTab />
            </Box>
          </TabPanel>
        </Paper>

        {/* Subject Form Modal */}
        <SubjectFormModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedSubject(null);
          }}
          subjectData={selectedSubject}
          classes={classes}
          onSubmit={handleFormSubmit}
        />

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle sx={{ fontWeight: 600 }}>Delete Subject</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete "{subjectToDelete?.name}"? This
              action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button
              variant="contained"
              color="error"
              onClick={confirmDeleteSubject}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        {/* Notification Snackbar */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={() => setSnackbarOpen(false)}
            severity={error ? "error" : "success"}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {error || success}
          </Alert>
        </Snackbar>
      </Box>
    </AdminLayout>
  );
};

export default SubjectsPage;
