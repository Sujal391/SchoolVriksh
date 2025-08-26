import {memo, useState} from 'react';
import { Box, Button, Input } from "@mui/material";

const ExcelUpload = ({ examEventId, classId, onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

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
      alert("Excel file uploaded successfully!");
    } catch (error) {
      console.error("Error uploading Excel file:", error);
      alert(`Error uploading Excel file: ${error.response?.data?.error || error.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box className="mb-6">
      <h2 className="text-xl font-semibold mb-4">Upload Exam Results (Excel)</h2>
      <Input
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFileChange}
        disabled={!examEventId || !classId || uploading}
        className="mb-4"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        disabled={!file || uploading}
      >
        {uploading ? "Uploading..." : "Upload Excel"}
      </Button>
    </Box>
  );
};

export default memo(ExcelUpload);