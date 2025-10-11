import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert,
  Snackbar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction
} from '@mui/material';
import {
  CloudUpload,
  Download,
  Delete,
  Description,
  PictureAsPdf,
  Image,
  InsertDriveFile,
  Visibility,
  Close
} from '@mui/icons-material';
import AdminService from '../../services/adminService';

const SyllabusManagement = ({ selectedSubject, onClose }) => {
  const [syllabus, setSyllabus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState(null);

  useEffect(() => {
    if (selectedSubject) {
      fetchSyllabus();
    }
  }, [selectedSubject]);

  const fetchSyllabus = async () => {
    if (!selectedSubject?._id) return;
    
    setLoading(true);
    try {
      const response = await AdminService.getSyllabus(selectedSubject._id);
      setSyllabus(response);
    } catch (error) {
      if (error.response?.status !== 404) {
        setError('Failed to fetch syllabus');
      }
      setSyllabus(null);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    
    // Check total files including already selected ones
    const totalFiles = selectedFiles.length + files.length;
    if (totalFiles > 5) {
      setError(`Maximum 5 files can be uploaded. You have ${selectedFiles.length} file(s) already selected.`);
      event.target.value = ''; // Reset input
      return;
    }
    
    // Validate file types and sizes
    const validFiles = files.filter(file => {
      const isValidType = file.type.includes('pdf') || file.type.includes('image') || 
                         file.type.includes('document') || file.type.includes('text');
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB limit
      
      if (!isValidType) {
        setError(`${file.name} is not a valid file type`);
        return false;
      }
      if (!isValidSize) {
        setError(`${file.name} exceeds 10MB size limit`);
        return false;
      }
      return true;
    });
    
    // Add new files to existing selection
    setSelectedFiles(prevFiles => [...prevFiles, ...validFiles]);
    
    // Reset the input so the same file can be selected again if needed
    event.target.value = '';
  };

  const handleRemoveFile = (indexToRemove) => {
    setSelectedFiles(prevFiles => prevFiles.filter((_, index) => index !== indexToRemove));
    
    // If no files left, reset the file input
    if (selectedFiles.length === 1) {
      const fileInput = document.getElementById('syllabus-file-input');
      if (fileInput) fileInput.value = '';
    }
  };

  const handleClearAllFiles = () => {
    setSelectedFiles([]);
    const fileInput = document.getElementById('syllabus-file-input');
    if (fileInput) fileInput.value = '';
  };

  const handleUpload = async () => {
    if (!selectedFiles.length || !selectedSubject?._id) return;
    
    setUploading(true);
    try {
      const formData = new FormData();
      selectedFiles.forEach(file => {
        formData.append('documents', file);
      });
      
      const response = await AdminService.uploadSyllabus(selectedSubject._id, formData);
      setSyllabus(response.data.syllabus);
      setSelectedFiles([]);
      setSuccess('Syllabus uploaded successfully!');
      
      // Reset file input
      const fileInput = document.getElementById('syllabus-file-input');
      if (fileInput) fileInput.value = '';
      
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to upload syllabus');
    } finally {
      setUploading(false);
    }
  };

  const handleDownload = (document) => {
    if (document.downloadUrl) {
      window.open(document.downloadUrl, '_blank');
    }
  };

  const getFileIcon = (contentType) => {
    if (contentType?.includes('pdf')) return <PictureAsPdf color="error" />;
    if (contentType?.includes('image')) return <Image color="primary" />;
    return <InsertDriveFile color="action" />;
  };

  const getFileTypeChip = (contentType) => {
    if (contentType?.includes('pdf')) return <Chip label="PDF" size="small" color="error" />;
    if (contentType?.includes('image')) return <Chip label="Image" size="small" color="primary" />;
    return <Chip label="Document" size="small" color="default" />;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (!selectedSubject) {
    return (
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          Select a subject to manage syllabus
        </Typography>
      </Paper>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Syllabus Management
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Subject: {selectedSubject.name} - {selectedSubject.class?.name} {selectedSubject.class?.division}
        </Typography>
      </Paper>

      {/* Upload Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Upload Syllabus Documents
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Upload up to 5 documents (PDF, Images, Documents). Maximum file size: 10MB each.
        </Typography>

        <Box sx={{ mb: 2 }}>
          <input
            id="syllabus-file-input"
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
          
          <Button
            variant="outlined"
            startIcon={<CloudUpload />}
            onClick={() => document.getElementById('syllabus-file-input').click()}
            disabled={uploading || selectedFiles.length >= 5}
            sx={{ mr: 2 }}
          >
            {selectedFiles.length > 0 ? 'Add More Files' : 'Select Files'}
          </Button>
          
          <Button
            variant="contained"
            onClick={handleUpload}
            disabled={!selectedFiles.length || uploading}
            startIcon={uploading ? <CircularProgress size={20} /> : <CloudUpload />}
          >
            {uploading ? 'Uploading...' : 'Upload Files'}
          </Button>
          
          {selectedFiles.length > 0 && (
            <Button
              variant="outlined"
              color="error"
              startIcon={<Delete />}
              onClick={handleClearAllFiles}
              disabled={uploading}
              sx={{ ml: 2 }}
            >
              Clear All
            </Button>
          )}
        </Box>

        {/* Selected Files Preview */}
        {selectedFiles.length > 0 && (
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Selected Files ({selectedFiles.length}/5):
            </Typography>
            <List dense>
              {selectedFiles.map((file, index) => (
                <ListItem 
                  key={index}
                  sx={{ 
                    bgcolor: 'action.hover', 
                    mb: 1, 
                    borderRadius: 1,
                    '&:hover': {
                      bgcolor: 'action.selected'
                    }
                  }}
                >
                  <ListItemIcon>
                    {getFileIcon(file.type)}
                  </ListItemIcon>
                  <ListItemText
                    primary={file.name}
                    secondary={formatFileSize(file.size)}
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {getFileTypeChip(file.type)}
                    <IconButton
                      edge="end"
                      aria-label="remove"
                      onClick={() => handleRemoveFile(index)}
                      disabled={uploading}
                      size="small"
                      color="error"
                    >
                      <Close />
                    </IconButton>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Paper>

      {/* Existing Syllabus Documents */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Current Syllabus Documents
        </Typography>
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : syllabus?.documents?.length > 0 ? (
          <Grid container spacing={2}>
            {syllabus.documents.map((document, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      {getFileIcon(document.contentType)}
                      <Typography variant="subtitle1" sx={{ ml: 1, flexGrow: 1 }}>
                        {document.title}
                      </Typography>
                      {getFileTypeChip(document.contentType)}
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      startIcon={<Visibility />}
                      onClick={() => handleDownload(document)}
                    >
                      View
                    </Button>
                    <Button
                      size="small"
                      startIcon={<Download />}
                      onClick={() => handleDownload(document)}
                    >
                      Download
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ textAlign: 'center', p: 3 }}>
            <Description sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No syllabus documents uploaded
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Upload documents using the form above
            </Typography>
          </Box>
        )}
      </Paper>

      {/* Snackbars */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!success}
        autoHideDuration={4000}
        onClose={() => setSuccess('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSuccess('')} severity="success" sx={{ width: '100%' }}>
          {success}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SyllabusManagement;