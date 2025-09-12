import { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Divider,
  CircularProgress,
} from "@mui/material";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const SubjectFormModal = ({
  isOpen,
  onClose,
  subjectData,
  classes,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    classId: "",
    status: "active",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (subjectData) {
      setFormData({
        name: subjectData.name,
        classId: subjectData.class?._id || "",
        status: subjectData.status,
      });
    } else {
      setFormData({
        name: "",
        classId: "",
        status: "",
      });
    }
  }, [isOpen, subjectData, classes]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (submitting) return; // Block double submissions

    setSubmitting(true);

    try {
      await onSubmit(formData);
    } catch (err) {
      console.error('Unexpected error in handleSubmit:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" mb={1}>
          {subjectData ? "Edit Subject" : "Add New Subject"}
        </Typography>

        <Divider sx={{ mb: 1 }} />

        <TextField
          fullWidth
          label="Subject Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          margin="normal"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Class</InputLabel>
          <Select
            name="classId"
            value={formData.classId}
            onChange={handleChange}
            required
            label="Class"
          >
            {classes.map((cls) => (
              <MenuItem key={cls._id} value={cls._id}>
                {cls.name} - {cls.division}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={formData.status}
            onChange={handleChange}
            label="Status"
          >
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </Select>
        </FormControl>

        <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? (
              <>
                <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                {subjectData ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              subjectData ? 'Update' : 'Create'
            )}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default SubjectFormModal;
