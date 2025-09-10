import { useState, useEffect } from "react";
import AdminLayout from "../../../components/layout/AdminLayout";
import AdminService from "../../../services/adminService";
import SubjectTable from "../../../components/admin/SubjectManagement";
import SubjectFormModal from "../../../components/admin/SubjectFormModal";
import { Button, Alert } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

const SubjectsPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [showError, setShowError] = useState(false);
  
  // Function to show error message with a timeout
  const showErrorMessage = (message) => {
    setError(message);
    setShowError(true);

    setTimeout(() => {
      setShowError(false);
      setError('');
    }, 10000); // 10 seconds
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
      if (selectedSubject) {
        // Update existing subject
        await AdminService.updateSubject(selectedSubject._id, subjectData);
      } else {
        // Create new subject
        await AdminService.createSubject(subjectData);
      }
      // Refresh subject list
      const response = await AdminService.getAllSubjects();
      setSubjects(response.data);
      setIsModalOpen(false);
      setError("");
    } catch (error) {
      console.error("Error saving subject:", error);
      showErrorMessage("Failed to save subject. Please try again.");

      return;
    }
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

        <SubjectTable
          subjects={subjects}
          loading={loading}
          onEdit={(subject) => {
            setSelectedSubject(subject);
            setIsModalOpen(true);
          }}
        />

        <SubjectFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          subjectData={selectedSubject}
          classes={classes}
          onSubmit={handleFormSubmit}
        />
      </div>
    </AdminLayout>
  );
};

export default SubjectsPage;
