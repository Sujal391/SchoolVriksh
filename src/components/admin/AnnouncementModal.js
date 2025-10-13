import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Box,
  Typography,
  IconButton,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  Close,
  CloudUpload,
  AttachFile,
  Delete,
  CalendarToday
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import AdminService from '../../services/adminService';

const AnnouncementModal = ({ open, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    targetGroups: [],
    priority: 'medium',
    validFrom: null,
    validUntil: null
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const targetGroupOptions = [
    { value: 'teachers', label: 'Teachers' },
    { value: 'students', label: 'Students' },
    { value: 'parents', label: 'Parents' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low', color: 'success' },
    { value: 'medium', label: 'Medium', color: 'warning' },
    { value: 'high', label: 'High', color: 'error' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTargetGroupChange = (group) => {
    setFormData(prev => ({
      ...prev,
      targetGroups: prev.targetGroups.includes(group)
        ? prev.targetGroups.filter(g => g !== group)
        : [...prev.targetGroups, group]
    }));
  };

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter(file => {
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError(`File ${file.name} exceeds 10MB limit`);
        return false;
      }
      return true;
    });
    
    setSelectedFiles(prev => [...prev, ...validFiles]);
    // Reset input
    event.target.value = '';
  };

  const removeFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }
    if (!formData.content.trim()) {
      setError('Content is required');
      return;
    }
    if (formData.targetGroups.length === 0) {
      setError('At least one target group must be selected');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('content', formData.content);
      submitData.append('targetGroups', JSON.stringify(formData.targetGroups));
      submitData.append('priority', formData.priority);
      
      if (formData.validFrom) {
        submitData.append('validFrom', formData.validFrom.toISOString());
      }
      if (formData.validUntil) {
        submitData.append('validUntil', formData.validUntil.toISOString());
      }

      // Append files
      selectedFiles.forEach(file => {
        submitData.append('files', file);
      });

      await AdminService.createAnnouncement(submitData);
      
      // Reset form
      setFormData({
        title: '',
        content: '',
        targetGroups: [],
        priority: 'medium',
        validFrom: null,
        validUntil: null
      });
      setSelectedFiles([]);
      
      onSuccess();
      onClose();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create announcement');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setFormData({
        title: '',
        content: '',
        targetGroups: [],
        priority: 'medium',
        validFrom: null,
        validUntil: null
      });
      setSelectedFiles([]);
      setError('');
      onClose();
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Dialog 
        open={open} 
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { minHeight: '70vh' }
        }}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6">Create New Announcement</Typography>
            <IconButton onClick={handleClose} disabled={loading}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent dividers>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Title */}
            <TextField
              label="Announcement Title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              fullWidth
              required
              disabled={loading}
            />

            {/* Content */}
            <TextField
              label="Announcement Content"
              value={formData.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
              fullWidth
              multiline
              rows={4}
              required
              disabled={loading}
            />

            {/* Priority */}
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                value={formData.priority}
                onChange={(e) => handleInputChange('priority', e.target.value)}
                label="Priority"
                disabled={loading}
              >
                {priorityOptions.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Chip 
                        label={option.label} 
                        color={option.color} 
                        size="small" 
                      />
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Target Groups */}
            <FormControl component="fieldset">
              <FormLabel component="legend">Target Groups *</FormLabel>
              <FormGroup row>
                {targetGroupOptions.map(option => (
                  <FormControlLabel
                    key={option.value}
                    control={
                      <Checkbox
                        checked={formData.targetGroups.includes(option.value)}
                        onChange={() => handleTargetGroupChange(option.value)}
                        disabled={loading}
                      />
                    }
                    label={option.label}
                  />
                ))}
              </FormGroup>
            </FormControl>

            {/* Validity Period */}
            <Box sx={{ display: 'flex', gap: 2 }}>
              <DatePicker
                label="Valid From"
                value={formData.validFrom}
                onChange={(date) => handleInputChange('validFrom', date)}
                disabled={loading}
                slotProps={{
                  textField: { fullWidth: true }
                }}
              />
              <DatePicker
                label="Valid Until"
                value={formData.validUntil}
                onChange={(date) => handleInputChange('validUntil', date)}
                disabled={loading}
                minDate={formData.validFrom}
                slotProps={{
                  textField: { fullWidth: true }
                }}
              />
            </Box>

            {/* File Upload */}
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Attachments (Optional)
              </Typography>
              <input
                type="file"
                multiple
                onChange={handleFileSelect}
                style={{ display: 'none' }}
                id="announcement-file-input"
                disabled={loading}
              />
              <Button
                variant="outlined"
                startIcon={<CloudUpload />}
                onClick={() => document.getElementById('announcement-file-input').click()}
                disabled={loading}
                sx={{ mb: 2 }}
              >
                Select Files
              </Button>
              
              {selectedFiles.length > 0 && (
                <List dense>
                  {selectedFiles.map((file, index) => (
                    <ListItem key={index} divider>
                      <ListItemIcon>
                        <AttachFile />
                      </ListItemIcon>
                      <ListItemText
                        primary={file.name}
                        secondary={`${(file.size / 1024 / 1024).toFixed(2)} MB`}
                      />
                      <ListItemSecondaryAction>
                        <IconButton 
                          edge="end" 
                          onClick={() => removeFile(index)}
                          disabled={loading}
                        >
                          <Delete />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              )}
            </Box>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {loading ? 'Creating...' : 'Create Announcement'}
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

export default AnnouncementModal;
