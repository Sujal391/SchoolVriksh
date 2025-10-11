import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Alert,
  Box,
  Typography,
  CircularProgress
} from '@mui/material';
import AdminService from '../../services/adminService';

const ReassignSubjectModal = ({ isOpen, onClose, teacher, onSubmit }) => {
  const [formData, setFormData] = useState({
    fromTeacherId: '',
    toTeacherId: '',
    subjectId: '',
    classId: ''
  });
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (isOpen) {
        try {
          setLoading(true);
          const [teachersRes, classesRes, subjectsRes] = await Promise.all([
            AdminService.getTeachers(),
            AdminService.getClasses(),
            AdminService.getAllSubjects()
          ]);
          setTeachers(teachersRes.data || teachersRes);
          setClasses(classesRes.data || classesRes);
          setSubjects(subjectsRes.data || subjectsRes);

          // Pre-populate form with teacher data
          if (teacher) {
            setFormData({
              fromTeacherId: teacher._id,
              toTeacherId: '',
              subjectId: '',
              classId: ''
            });
          }
        } catch (error) {
          console.error('Error fetching data:', error);
          setError('Failed to load teachers, classes, and subjects');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [isOpen, teacher]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.fromTeacherId || !formData.toTeacherId || !formData.subjectId || !formData.classId) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.fromTeacherId === formData.toTeacherId) {
      setError('Please select different teachers for reassignment');
      return;
    }

    try {
      setError('');
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Error in reassignment:', error);
      setError('Failed to reassign subject. Please try again.');
    }
  };

  const handleClose = () => {
    setFormData({
      fromTeacherId: '',
      toTeacherId: '',
      subjectId: '',
      classId: ''
    });
    setError('');
    onClose();
  };

  const currentTeacher = teachers.find(t => t._id === formData.fromTeacherId);
  const availableTeachers = teachers.filter(t => t._id !== formData.fromTeacherId);

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Reassign Subject from Teacher</DialogTitle>
      
      <DialogContent dividers>
        {loading ? (
          <Box display="flex" justifyContent="center" p={3}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {teacher && (
              <Box sx={{ mb: 3, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                <Typography variant="h6" gutterBottom>
                  Teacher: {teacher.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Email: {teacher.email}
                </Typography>
                {teacher.subjects && teacher.subjects.length > 0 && (
                  <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    Current Subjects: {teacher.subjects.map(s => s.name).join(', ')}
                  </Typography>
                )}
              </Box>
            )}

            <TextField
              label="From Teacher"
              name="fromTeacherId"
              value={formData.fromTeacherId}
              onChange={handleChange}
              select
              fullWidth
              margin="normal"
              required
            >
              <MenuItem value="">Select current teacher</MenuItem>
              {teachers.map((teacher) => (
                <MenuItem key={teacher._id} value={teacher._id}>
                  {teacher.name} - {teacher.email}
                </MenuItem>
              ))}
            </TextField>

            {currentTeacher && (
              <Alert severity="info" sx={{ mt: 1, mb: 2 }}>
                Current Teacher: {currentTeacher.name} ({currentTeacher.email})
              </Alert>
            )}

            <TextField
              label="Subject to Reassign"
              name="subjectId"
              value={formData.subjectId}
              onChange={handleChange}
              select
              fullWidth
              margin="normal"
              required
            >
              <MenuItem value="">Select subject to reassign</MenuItem>
              {subjects.map((subject) => (
                <MenuItem key={subject._id} value={subject._id}>
                  {subject.name} - {subject.academicYear}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="To Teacher"
              name="toTeacherId"
              value={formData.toTeacherId}
              onChange={handleChange}
              select
              fullWidth
              margin="normal"
              required
            >
              <MenuItem value="">Select new teacher</MenuItem>
              {availableTeachers.map((teacher) => (
                <MenuItem key={teacher._id} value={teacher._id}>
                  {teacher.name} - {teacher.email}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Class"
              name="classId"
              value={formData.classId}
              onChange={handleChange}
              select
              fullWidth
              margin="normal"
              required
            >
              <MenuItem value="">Select class</MenuItem>
              {classes.map((cls) => (
                <MenuItem key={cls._id} value={cls._id}>
                  {cls.name} {cls.division} - {cls.academicYear}
                </MenuItem>
              ))}
            </TextField>
          </>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button 
          variant="contained" 
          onClick={handleSubmit}
          disabled={loading || !formData.fromTeacherId || !formData.toTeacherId || !formData.classId}
        >
          Reassign Subject
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReassignSubjectModal;
