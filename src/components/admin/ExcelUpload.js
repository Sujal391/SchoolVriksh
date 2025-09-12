import { memo, useState } from "react";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import AdminService from "../../services/adminService";

const ExcelUpload = ({ examEventId, classId, onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // "error" or "success"
  });

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file || !examEventId || !classId) return;

    setUploading(true);
    try {
      await AdminService.uploadExcelResults(examEventId, classId, file);
      onUploadSuccess();
      setFile(null);
      setSnackbar({
        open: true,
        message: "Excel file uploaded successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error("Upload error:", error);
      setSnackbar({
        open: true,
        message:
          error.response?.data?.error || "Failed to upload Excel file.",
        severity: "error",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Box mb={6}>
      <Typography variant="h6" gutterBottom>
        Upload Exam Results{" "}
        <Typography variant="body2" component="span" color="textSecondary">
          (.xlsx and .xls files only)
        </Typography>
      </Typography>

      <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileChange}
          disabled={!examEventId || !classId || uploading}
          style={{ display: "none" }}
          id="excel-file-input"
        />

        <Button
          variant="outlined"
          component="span"
          startIcon={<UploadFileIcon />}
          onClick={() =>
            document.getElementById("excel-file-input").click()
          }
          disabled={!examEventId || !classId || uploading}
          sx={{
            textTransform: "none",
            borderColor: file ? "success.main" : undefined,
            color: file ? "success.main" : undefined,
          }}
        >
          {file ? file.name : "Select Excel File"}
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={!file || uploading}
          sx={{ textTransform: "none" }}
        >
          {uploading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Upload Excel"
          )}
        </Button>
      </Box>

      {file && (
        <Typography variant="body2" color="green" mt={1}>
          File selected. Click "Select Excel File" again to choose a different file.
        </Typography>
      )}
      
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default memo(ExcelUpload);
