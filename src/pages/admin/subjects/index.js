import { useState, useEffect } from "react";
import AdminLayout from "../../../components/layout/AdminLayout";
import AdminService from "../../../services/adminService";
import SubjectTable from "../../../components/admin/SubjectManagement";
import SubjectFormModal from "../../../components/admin/SubjectFormModal";
import SyllabusManagement from "../../../components/admin/SyllabusManagement";

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
  Paper
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

// Tab Panel Component
const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`subject-tabpanel-${index}`}
      aria-labelledby={`subject-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
};

const SubjectsPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [showError, setShowError] = useState(false);

  // New state for delete functionality
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [subjectToDelete, setSubjectToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Tab state
  const [tabValue, setTabValue] = useState(0);
  const [selectedSubjectForSyllabus, setSelectedSubjectForSyllabus] = useState(null);
  
  // Function to show error message with a timeout
  const showErrorMessage = (message) => {
    setError(message);
    setShowError(true);
    setSuccessMessage("");

    setTimeout(() => {
      setShowError(false);
      setError('');
    }, 10000); // 10 seconds
  };

  // Function to show success message
  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setError("");
    setShowError(false);
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
        setError("");
      } catch (error) {
        console.error("Error fetching data:", error);
        showErrorMessage("Failed to load data");
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
        // Update existing subject
        response = await AdminService.updateSubject(selectedSubject._id, subjectData);
        showSuccessMessage(`✅ Subject "${response.subject.name}" updated successfully!`);
      } else {
        // Create new subject
        response = await AdminService.createSubject(subjectData);
        showSuccessMessage(`✅ Subject "${subjectData.name}" created successfully!`);
      }

      // Refresh subject list
      const subjectsResponse = await AdminService.getAllSubjects();
      setSubjects(subjectsResponse.data);
      setIsModalOpen(false);
      setSelectedSubject(null);
      setError("");
    } catch (error) {
      console.error("Error saving subject:", error);

      // Handle specific API error responses
      if (error.response?.status === 404) {
        showErrorMessage("❌ Subject not found. Please refresh the page and try again.");
      } else if (error.response?.status === 500) {
        showErrorMessage("❌ Server error occurred. Please try again later.");
      } else {
        const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message;
        showErrorMessage(`❌ Failed to ${selectedSubject ? 'update' : 'create'} subject: ${errorMessage}`);
      }
    }
  };

  // Handle delete subject
  const handleDeleteSubject = (subject) => {
    setSubjectToDelete(subject);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteSubject = async () => {
    try {
      await AdminService.deleteSubject(subjectToDelete._id);
      showSuccessMessage(`✅ Subject "${subjectToDelete.name}" deleted successfully!`);

      // Refresh subject list
      const response = await AdminService.getAllSubjects();
      setSubjects(response.data);

      setDeleteDialogOpen(false);
      setSubjectToDelete(null);
    } catch (error) {
      console.error("Error deleting subject:", error);

      if (error.response?.status === 404) {
        showErrorMessage("❌ Subject not found. It may have already been deleted.");
      } else if (error.response?.status === 500) {
        showErrorMessage("❌ Server error occurred. Please try again later.");
      } else {
        const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message;
        showErrorMessage(`❌ Failed to delete subject: ${errorMessage}`);
      }

      setDeleteDialogOpen(false);
      setSubjectToDelete(null);
    }
  };



  const handleManageSyllabus = (subject) => {
    setSelectedSubjectForSyllabus(subject);
    setTabValue(1); // Switch to syllabus tab
  };

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Subject Management</h1>
          <div>
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                setSelectedSubject(null);
                setIsModalOpen(true);
              }}
            >
              Add New Subject
            </Button>
          </div>
        </div>
        {showError && (
          <Alert
            severity="error"
            sx={{ mb: 4 }}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setShowError(false);
                  setError('');
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {error}
          </Alert>
        )}

        {/* Tab Navigation */}
        <Paper sx={{ mb: 3 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={tabValue}
              onChange={(e, newValue) => setTabValue(newValue)}
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
            >
              <Tab label="Subject Management" />
              <Tab label="Syllabus Management" />
            </Tabs>
          </Box>

          {/* Tab Panel 0: Subject Management */}
          <TabPanel value={tabValue} index={0}>
            <SubjectTable
              subjects={subjects}
              loading={loading}
              onEdit={(subject) => {
                setSelectedSubject(subject);
                setIsModalOpen(true);
              }}
              onDelete={handleDeleteSubject}
              onManageSyllabus={handleManageSyllabus}
            />
          </TabPanel>

          {/* Tab Panel 1: Syllabus Management */}
          <TabPanel value={tabValue} index={1}>
            <SyllabusManagement
              selectedSubject={selectedSubjectForSyllabus}
              onClose={() => {
                setSelectedSubjectForSyllabus(null);
                setTabValue(0);
              }}
            />
          </TabPanel>
        </Paper>

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
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete the subject "{subjectToDelete?.name}"?
              This action cannot be undone and will remove the subject from all associated classes.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button
              variant="contained"
              color="error"
              onClick={confirmDeleteSubject}
            >
              Delete Subject
            </Button>
          </DialogActions>
        </Dialog>



        {/* Success/Error Snackbar */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => {
            setSnackbarOpen(false);
            setSuccessMessage("");
          }}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert
            onClose={() => {
              setSnackbarOpen(false);
              setSuccessMessage("");
            }}
            severity="success"
            variant="filled"
          >
            {successMessage}
          </Alert>
        </Snackbar>
      </div>
    </AdminLayout>
  );
};

export default SubjectsPage;
