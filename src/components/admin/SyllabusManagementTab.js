import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Card,
  CardContent,
  IconButton,
  Chip,
  CircularProgress,
  Alert,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  ListItemSecondaryAction,
  Stack,
} from "@mui/material";
import {
  Search,
  CloudUpload,
  Download,
  Visibility,
  PictureAsPdf,
  Image,
  InsertDriveFile,
  Description,
  Delete,
  Close,
  Add,
} from "@mui/icons-material";
import AdminService from "../../services/adminService";

const SyllabusManagementTab = () => {
  // Class and Subject States
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");

  // Syllabus Data States
  const [syllabusData, setSyllabusData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingClasses, setLoadingClasses] = useState(true);
  const [loadingSubjects, setLoadingSubjects] = useState(false);

  // Upload Modal States
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploadClass, setUploadClass] = useState("");
  const [uploadSubject, setUploadSubject] = useState("");
  const [uploadSubjects, setUploadSubjects] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  // Delete Dialog States
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Notification States
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Fetch classes on component mount
  useEffect(() => {
    fetchClasses();
  }, []);

  // Fetch subjects when class is selected
  useEffect(() => {
    if (selectedClass) {
      fetchSubjects(selectedClass);
    } else {
      setSubjects([]);
      setSelectedSubject("");
      setSyllabusData(null);
    }
  }, [selectedClass]);

  // Fetch subjects for upload modal when upload class is selected
  useEffect(() => {
    if (uploadClass) {
      fetchSubjectsForSyllabusUpload(uploadClass);
    } else {
      setUploadSubjects([]);
      setUploadSubject("");
    }
  }, [uploadClass]);

  const fetchClasses = async () => {
    try {
      setLoadingClasses(true);
      const response = await AdminService.getClassesForSyllabus();
      console.log("Classes response:", response);
      setClasses(response || []);
    } catch (error) {
      console.error("Error fetching classes:", error);
      showError("Failed to load classes");
    } finally {
      setLoadingClasses(false);
    }
  };

  const fetchSubjects = async (classId) => {
    try {
      setLoadingSubjects(true);
      setSelectedSubject("");
      setSyllabusData(null);

      const response = await AdminService.getSubjectsWithSyllabusStatus(
        classId
      );
      console.log("Subjects response:", response);

      const subjectsArray = response?.data || response || [];
      setSubjects(subjectsArray);
    } catch (error) {
      console.error("Error fetching subjects:", error);
      showError("Failed to load subjects");
      setSubjects([]);
    } finally {
      setLoadingSubjects(false);
    }
  };

  const fetchSubjectsForSyllabusUpload = async (classId) => {
    try {
      const response = await AdminService.getSubjectsWithSyllabusStatus(
        classId
      );
      const subjectsArray = response?.data || response || [];
      setUploadSubjects(subjectsArray);
      setUploadSubject("");
    } catch (error) {
      console.error("Error fetching subjects for upload:", error);
      showError("Failed to load subjects");
      setUploadSubjects([]);
    }
  };

  const handleSearch = async () => {
    if (!selectedClass || !selectedSubject) {
      showError("Please select both class and subject");
      return;
    }

    try {
      setLoading(true);
      const response = await AdminService.getSyllabus(
        selectedClass,
        selectedSubject
      );
      setSyllabusData(response.data);
    } catch (error) {
      if (error.response?.status === 404) {
        setSyllabusData(null);
        showError("No syllabus found for this class and subject");
      } else {
        console.error("Error fetching syllabus:", error);
        showError("Failed to fetch syllabus");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);

    const totalFiles = selectedFiles.length + files.length;
    if (totalFiles > 5) {
      showError(
        `Maximum 5 files allowed. You have ${selectedFiles.length} file(s) selected.`
      );
      event.target.value = "";
      return;
    }

    const validFiles = [];
    const maxSize = 10 * 1024 * 1024;

    for (const file of files) {
      if (file.size > maxSize) {
        showError(`File "${file.name}" exceeds 10MB limit`);
        continue;
      }
      validFiles.push(file);
    }

    setSelectedFiles([...selectedFiles, ...validFiles]);
    event.target.value = "";
  };

  const handleRemoveFile = (index) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (!uploadClass || !uploadSubject) {
      showError("Please select both class and subject");
      return;
    }

    if (selectedFiles.length === 0) {
      showError("Please select at least one file");
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append("documents", file);
      });

      await AdminService.uploadSyllabus(uploadClass, uploadSubject, formData);
      showSuccess("Syllabus uploaded successfully!");

      setUploadModalOpen(false);
      setUploadClass("");
      setUploadSubject("");
      setSelectedFiles([]);

      if (selectedClass === uploadClass && selectedSubject === uploadSubject) {
        handleSearch();
      }
    } catch (error) {
      console.error("Error uploading syllabus:", error);
      showError(error.response?.data?.error || "Failed to upload syllabus");
    } finally {
      setUploading(false);
    }
  };

  const handleView = (document) => {
    if (document.url) {
      window.open(document.url, "_blank");
    } else if (document.downloadUrl) {
      window.open(document.downloadUrl, "_blank");
    }
  };

  const handleDownload = (document) => {
    if (document.downloadUrl) {
      window.open(document.downloadUrl, "_blank");
    } else if (document.url) {
      window.open(document.url, "_blank");
    }
  };

  const handleDeleteClick = (docId) => {
    console.log("Delete clicked for document ID:", docId);
    if (!docId) {
      showError("Invalid document ID");
      return;
    }
    setDocumentToDelete(docId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!documentToDelete) {
      showError("No document selected for deletion");
      return;
    }

    console.log("Deleting document:", {
      class: selectedClass,
      subject: selectedSubject,
      documentId: documentToDelete,
    });

    try {
      setDeleting(true);
      await AdminService.deleteSyllabus(
        selectedClass,
        selectedSubject,
        documentToDelete
      );
      showSuccess("Document deleted successfully");
      setDeleteDialogOpen(false);
      setDocumentToDelete(null);
      handleSearch();
    } catch (error) {
      console.error("Error deleting document:", error);
      showError(error.response?.data?.error || "Failed to delete document");
    } finally {
      setDeleting(false);
    }
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
    setDocumentToDelete(null);
  };

  const showError = (message) => {
    setError(message);
    setSuccess("");
    setSnackbarOpen(true);
  };

  const showSuccess = (message) => {
    setSuccess(message);
    setError("");
    setSnackbarOpen(true);
  };

  const getFileIcon = (contentType) => {
    if (!contentType) return <InsertDriveFile />;

    if (contentType.includes("pdf")) return <PictureAsPdf color="error" />;
    if (contentType.includes("image")) return <Image color="primary" />;
    if (contentType.includes("word") || contentType.includes("document"))
      return <Description color="info" />;
    return <InsertDriveFile />;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <Box sx={{ maxWidth: 1400, mx: "auto" }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h5" fontWeight={600}>
          Syllabus Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setUploadModalOpen(true)}
          size="large"
        >
          Upload Syllabus
        </Button>
      </Box>

      {/* Search Section */}
      <Paper
        elevation={0}
        sx={{ p: 3, mb: 4, border: "1px solid", borderColor: "divider" }}
      >
        <Typography variant="subtitle1" fontWeight={500} sx={{ mb: 3 }}>
          Search Syllabus
        </Typography>

        <Stack spacing={3}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={5}>
              <FormControl fullWidth size="medium">
                <InputLabel>Class</InputLabel>
                <Select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  label="Class"
                  disabled={loadingClasses}
                  sx={{ width: "150px" }}
                >
                  {classes.map((cls) => (
                    <MenuItem key={cls._id} value={cls._id}>
                      {cls.name} {cls.division && `(${cls.division})`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={5}>
              <FormControl
                fullWidth
                size="medium"
                disabled={!selectedClass || loadingSubjects}
              >
                <InputLabel>Subject</InputLabel>
                <Select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  label="Subject"
                  sx={{ width: "150px" }}
                >
                  {subjects.map((subject) => (
                    <MenuItem key={subject._id} value={subject._id}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <span>{subject.name}</span>
                        {subject.hasSyllabus && (
                          <Chip
                            label={`${subject.documentCount} docs`}
                            size="small"
                            color="success"
                            sx={{ ml: "auto" }}
                          />
                        )}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={2}>
              <Button
                variant="contained"
                fullWidth
                startIcon={<Search />}
                onClick={handleSearch}
                disabled={!selectedClass || !selectedSubject || loading}
                size="large"
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Stack>
      </Paper>

      {/* Loading State */}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Results */}
      {!loading &&
        syllabusData &&
        syllabusData.documents &&
        syllabusData.documents.length > 0 && (
          <Box>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                mb: 2,
                bgcolor: "grey.50",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography variant="body2" color="text.secondary">
                <strong>Class:</strong> {syllabusData.class?.name}{" "}
                {syllabusData.class?.division} | <strong>Subject:</strong>{" "}
                {syllabusData.subject?.name}
              </Typography>
            </Paper>

            <Grid container spacing={2}>
              {syllabusData.documents.map((doc, index) => {
                console.log("Document:", doc); // Debug log
                return (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    key={doc._id || doc.id || index}
                  >
                    <Card
                      variant="outlined"
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: 2,
                        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                        transition: "0.2s ease",
                        "&:hover": { boxShadow: "0 3px 8px rgba(0,0,0,0.12)" },
                      }}
                    >
                      <CardContent
                        sx={{
                          flexGrow: 1,
                          pb: 1,
                          "&:last-child": { pb: 1 },
                        }}
                      >
                        {/* File title + icon */}
                        <Stack
                          direction="row"
                          spacing={1}
                          alignItems="center"
                          sx={{ pb: 1.5 }}
                        >
                          {getFileIcon(doc.contentType)}
                          <Typography
                            variant="subtitle2"
                            noWrap
                            sx={{ fontWeight: 500, flexGrow: 1 }}
                          >
                            {doc.title || doc.name || "Untitled Document"}
                          </Typography>
                        </Stack>

                        {/* Action buttons */}
                        <Stack direction="row" spacing={1.5}>
                          <Tooltip title="View">
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => handleView(doc)}
                              sx={{
                                bgcolor: "action.hover",
                                "&:hover": { bgcolor: "action.selected" },
                              }}
                            >
                              <Visibility fontSize="small" />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Download">
                            <IconButton
                              size="small"
                              color="success"
                              onClick={() => handleDownload(doc)}
                              sx={{
                                bgcolor: "action.hover",
                                "&:hover": { bgcolor: "action.selected" },
                              }}
                            >
                              <Download fontSize="small" />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Delete">
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() =>
                                handleDeleteClick(doc._id || doc.id)
                              }
                              sx={{
                                bgcolor: "action.hover",
                                "&:hover": { bgcolor: "action.selected" },
                              }}
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        )}

      {/* Empty State */}
      {!loading &&
        syllabusData &&
        (!syllabusData.documents || syllabusData.documents.length === 0) && (
          <Paper
            elevation={0}
            sx={{
              p: 6,
              textAlign: "center",
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Description sx={{ fontSize: 56, color: "text.disabled", mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No syllabus documents found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Upload documents using the button above
            </Typography>
          </Paper>
        )}

      {/* Upload Modal */}
      <Dialog
        open={uploadModalOpen}
        onClose={() => !uploading && setUploadModalOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Upload Syllabus
          <IconButton
            onClick={() => setUploadModalOpen(false)}
            disabled={uploading}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={3}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <FormControl fullWidth>
                <InputLabel>Class</InputLabel>
                <Select
                  value={uploadClass}
                  onChange={(e) => setUploadClass(e.target.value)}
                  label="Class"
                  disabled={uploading}
                >
                  {classes.map((cls) => (
                    <MenuItem key={cls._id} value={cls._id}>
                      {cls.name} {cls.division}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth disabled={!uploadClass || uploading}>
                <InputLabel>Subject</InputLabel>
                <Select
                  value={uploadSubject}
                  onChange={(e) => setUploadSubject(e.target.value)}
                  label="Subject"
                >
                  {uploadSubjects.map((subject) => (
                    <MenuItem key={subject._id} value={subject._id}>
                      {subject.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
            <Box>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                startIcon={<CloudUpload />}
                disabled={uploading}
                size="large"
              >
                Select Files (Max 5)
                <input
                  type="file"
                  hidden
                  multiple
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  onChange={handleFileSelect}
                />
              </Button>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mt: 1, display: "block" }}
              >
                PDF, DOC, DOCX, JPG, PNG • Max 10MB per file
              </Typography>
            </Box>

            {selectedFiles.length > 0 && (
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Selected Files ({selectedFiles.length}/5)
                </Typography>
                <List dense>
                  {selectedFiles.map((file, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>{getFileIcon(file.type)}</ListItemIcon>
                      <ListItemText
                        primary={file.name}
                        secondary={formatFileSize(file.size)}
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          onClick={() => handleRemoveFile(index)}
                          disabled={uploading}
                          size="small"
                        >
                          <Close />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button
            onClick={() => setUploadModalOpen(false)}
            disabled={uploading}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleUpload}
            disabled={
              uploading ||
              !uploadClass ||
              !uploadSubject ||
              selectedFiles.length === 0
            }
            startIcon={
              uploading ? <CircularProgress size={20} /> : <CloudUpload />
            }
          >
            {uploading ? "Uploading..." : "Upload"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={!deleting ? cancelDelete : undefined}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ pb: 2 }}>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this document? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={cancelDelete} disabled={deleting} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={confirmDelete}
            disabled={deleting}
            variant="contained"
            color="error"
            startIcon={deleting ? <CircularProgress size={20} /> : <Delete />}
          >
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
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
        >
          {error || success}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SyllabusManagementTab;
