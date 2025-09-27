// import { useEffect, useState } from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// const ExamEventFormModal = ({ isOpen, onClose, examData, classes, onSubmit }) => {
//   const [formData, setFormData] = useState({
//     examName: '',
//     examType: 'Unit Test',
//     customExamType: '',
//     startDate: new Date(),
//     endDate: new Date(),
//     classIds: [],
//     subjects: [],
//     maxExamsPerDay: 2,
//     availableRooms: [],
//     roomCapacities: {},
//     nonWorkingDays: []
//   });

//   useEffect(() => {
//     if (examData) {
//       setFormData({
//         examName: examData.name,
//         examType: examData.examType,
//         customExamType: examData.customExamType || '',
//         startDate: new Date(examData.startDate),
//         endDate: new Date(examData.endDate),
//         classIds: examData.classes?.map(c => c._id) || [],
//         subjects: examData.subjects || [],
//         maxExamsPerDay: examData.maxExamsPerDay || 2,
//         availableRooms: examData.availableRooms || [],
//         roomCapacities: examData.roomCapacities || {},
//         nonWorkingDays: examData.nonWorkingDays?.map(d => new Date(d)) || []
//       });
//     } else {
//       setFormData({
//         examName: '',
//         examType: 'Unit Test',
//         customExamType: '',
//         startDate: new Date(),
//         endDate: new Date(),
//         classIds: [],
//         subjects: [],
//         maxExamsPerDay: 2,
//         availableRooms: [],
//         roomCapacities: {},
//         nonWorkingDays: []
//       });
//     }
//   }, [isOpen, examData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleDateChange = (date, name) => {
//     setFormData(prev => ({
//       ...prev,
//       [name]: date
//     }));
//   };

//   const handleClassToggle = (classId) => {
//     setFormData(prev => {
//       const alreadySelected = prev.classIds.includes(classId);
//       return {
//         ...prev,
//         classIds: alreadySelected
//           ? prev.classIds.filter(id => id !== classId)
//           : [...prev.classIds, classId]
//       };
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit({
//       ...formData,
//       startDate: formData.startDate.toISOString(),
//       endDate: formData.endDate.toISOString(),
//       nonWorkingDays: formData.nonWorkingDays.map(d => d.toISOString())
//     });
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
//       <div className="bg-white rounded-lg w-full max-w-4xl p-6 shadow-lg">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold">
//             {examData ? 'Edit Exam Schedule' : 'Create New Exam Schedule'}
//           </h2>
//           <button onClick={onClose} className="text-gray-500 hover:text-black text-lg">
//             ✕
//           </button>
//         </div>

//         <form onSubmit={handleSubmit}>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {/* Exam Name */}
//             <div className="md:col-span-2">
//               <label className="block mb-1 text-sm font-medium text-gray-700">
//                 Exam Name
//               </label>
//               <input
//                 type="text"
//                 name="examName"
//                 value={formData.examName}
//                 onChange={handleChange}
//                 className="w-full border border-gray-300 rounded px-3 py-2"
//                 required
//               />
//             </div>

//             {/* Exam Type */}
//             <div>
//               <label className="block mb-1 text-sm font-medium text-gray-700">
//                 Exam Type
//               </label>
//               <select
//                 name="examType"
//                 value={formData.examType}
//                 onChange={handleChange}
//                 className="w-full border border-gray-300 rounded px-3 py-2"
//                 required
//               >
//                 <option value="Unit Test">Unit Test</option>
//                 <option value="Midterm">Midterm</option>
//                 <option value="Final">Final</option>
//                 <option value="Practical">Practical</option>
//                 <option value="Other">Other</option>
//               </select>
//             </div>

//             {/* Custom Exam Type */}
//             {formData.examType === 'Other' && (
//               <div>
//                 <label className="block mb-1 text-sm font-medium text-gray-700">
//                   Custom Exam Type
//                 </label>
//                 <input
//                   type="text"
//                   name="customExamType"
//                   value={formData.customExamType}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded px-3 py-2"
//                   required={formData.examType === 'Other'}
//                 />
//               </div>
//             )}

//             {/* Start Date */}
//             <div>
//               <label className="block mb-1 text-sm font-medium text-gray-700">
//                 Start Date
//               </label>
//               <DatePicker
//                 selected={formData.startDate}
//                 onChange={(date) => handleDateChange(date, 'startDate')}
//                 minDate={new Date()}
//                 className="w-full border border-gray-300 rounded px-3 py-2"
//                 required
//               />
//             </div>

//             {/* End Date */}
//             <div>
//               <label className="block mb-1 text-sm font-medium text-gray-700">
//                 End Date
//               </label>
//               <DatePicker
//                 selected={formData.endDate}
//                 onChange={(date) => handleDateChange(date, 'endDate')}
//                 minDate={formData.startDate}
//                 className="w-full border border-gray-300 rounded px-3 py-2"
//                 required
//               />
//             </div>

//             {/* Classes */}
//             <div className="md:col-span-2">
//               <label className="block mb-1 text-sm font-medium text-gray-700">
//                 Classes
//               </label>
//               <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
//                 {classes.map(cls => (
//                   <label key={cls._id} className="flex items-center gap-2">
//                     <input
//                       type="checkbox"
//                       checked={formData.classIds.includes(cls._id)}
//                       onChange={() => handleClassToggle(cls._id)}
//                       className="accent-blue-600"
//                     />
//                     <span>{cls.name} - {cls.division}</span>
//                   </label>
//                 ))}
//               </div>
//             </div>

//             {/* Max Exams Per Day */}
//             <div>
//               <label className="block mb-1 text-sm font-medium text-gray-700">
//                 Max Exams Per Day
//               </label>
//               <input
//                 type="number"
//                 name="maxExamsPerDay"
//                 min="1"
//                 max="4"
//                 value={formData.maxExamsPerDay}
//                 onChange={handleChange}
//                 className="w-full border border-gray-300 rounded px-3 py-2"
//               />
//             </div>

//             {/* Available Rooms */}
//             <div>
//               <label className="block mb-1 text-sm font-medium text-gray-700">
//                 Available Rooms (comma separated)
//               </label>
//               <input
//                 type="text"
//                 name="availableRooms"
//                 value={formData.availableRooms.join(', ')}
//                 onChange={(e) => {
//                   const rooms = e.target.value.split(',').map(r => r.trim()).filter(r => r);
//                   setFormData(prev => ({ ...prev, availableRooms: rooms }));
//                 }}
//                 className="w-full border border-gray-300 rounded px-3 py-2"
//               />
//             </div>
//           </div>

//           <div className="flex justify-end gap-3 mt-6">
//             <button
//               type="submit"
//               className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//             >
//               {examData ? 'Update' : 'Create'}
//             </button>
//             <button
//               type="button"
//               onClick={onClose}
//               className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ExamEventFormModal;



import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  Button,
  Grid,
  Typography,
  CircularProgress,
  Alert,
  Box,
  Switch,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RefreshIcon from '@mui/icons-material/Refresh';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import AdminService from '../../services/adminService';

const ExamEventFormModal = ({ isOpen, onClose, examData, classes, onSubmit }) => {
  // Form state
  const [formData, setFormData] = useState({
    examName: '',
    examType: 'Term 1',
    academicYear: '',
    startDate: new Date(),
    endDate: new Date(),
    classIds: [],
    subjects: [],
    weightage: 0,
    nonWorkingDays: [],
    maxExamsPerDay: 2
  });

  // UI state
  const [availableSubjects, setAvailableSubjects] = useState({});
  const [loadingSubjects, setLoadingSubjects] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const [warnings, setWarnings] = useState([]);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
  const [debugMode, setDebugMode] = useState(false);

  // Utility functions
  const getCurrentAcademicYear = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    
    if (currentMonth >= 3) {
      return `${currentYear}-${currentYear + 1}`;
    } else {
      return `${currentYear - 1}-${currentYear}`;
    }
  };

  const calculateDuration = (startTime, endTime) => {
    if (!startTime || !endTime) return 0;
    
    try {
      let startTimeStr = startTime instanceof Date 
        ? startTime.toTimeString().slice(0, 5)
        : startTime;
      let endTimeStr = endTime instanceof Date 
        ? endTime.toTimeString().slice(0, 5) 
        : endTime;
      
      if (!startTimeStr || !endTimeStr) return 0;
      
      const start = new Date(`2000-01-01 ${startTimeStr}`);
      const end = new Date(`2000-01-01 ${endTimeStr}`);
      
      let diffMs = end.getTime() - start.getTime();
      if (diffMs < 0) diffMs += 24 * 60 * 60 * 1000;
      
      return Math.floor(diffMs / (1000 * 60));
    } catch (error) {
      console.error('Error calculating duration:', error);
      return 0;
    }
  };

  const formatTimeForDisplay = (time) => {
    if (!time) return '';
    return time instanceof Date ? time.toTimeString().slice(0, 5) : time;
  };

  // Data loading functions
  const loadSubjects = async (classIds = formData.classIds) => {
    if (classIds.length === 0) {
      setAvailableSubjects({});
      return;
    }

    setLoadingSubjects(true);
    try {
      const subjectsData = {};
      const loadingErrors = [];
      
      for (const classId of classIds) {
        try {
          console.log(`Loading subjects for class ID: ${classId}`);
          const response = await AdminService.getSubjectsByClass(classId);
          
          if (response && response.data && Array.isArray(response.data)) {
            subjectsData[classId] = response.data;
            console.log(`✅ Loaded ${response.data.length} subjects for class ${classId}`);
          } else {
            console.warn(`⚠️ Invalid response for class ${classId}:`, response);
            subjectsData[classId] = [];
            loadingErrors.push(`Invalid response for class ${classId}`);
          }
        } catch (error) {
          console.error(`❌ Error loading subjects for class ${classId}:`, error);
          subjectsData[classId] = [];
          loadingErrors.push(`Failed to load subjects for class ${classId}: ${error.message}`);
        }
      }
      
      setAvailableSubjects(subjectsData);
      
      if (loadingErrors.length > 0 && debugMode) {
        console.warn('Subject loading errors:', loadingErrors);
      }
      
    } catch (error) {
      console.error('Critical error in loadSubjects:', error);
      setSubmitStatus({ 
        type: 'error', 
        message: `Failed to load subjects: ${error.message}` 
      });
    } finally {
      setLoadingSubjects(false);
    }
  };

  const refreshSubjects = () => {
    setAvailableSubjects({});
    loadSubjects();
  };

  // Validation functions
  const validateSubjects = () => {
    const errors = [];
    const subjectWarnings = [];
    
    if (formData.subjects.length === 0) {
      errors.push('Please select at least one subject');
      return { errors, warnings: subjectWarnings };
    }

    formData.subjects.forEach((subject) => {
      const classData = classes?.find(c => c._id === subject.classId);
      const className = classData ? `${classData.name}-${classData.division}` : 'Unknown Class';
      const classSubjects = availableSubjects[subject.classId];
      
      // Check if class subjects are loaded
      if (!classSubjects) {
        errors.push(`Subjects not loaded for ${className}. Please refresh subjects.`);
        return;
      }
      
      // Check if subject exists in class
      const subjectExists = classSubjects.some(s => s._id === subject.subjectId);
      if (!subjectExists) {
        const availableNames = classSubjects.map(s => s.name).join(', ');
        errors.push(`Subject not found in ${className}. Available: ${availableNames || 'None'}`);
        return;
      }
      
      // Validate required fields for exam subjects
      if (subject.requiresExam) {
        if (!subject.examDate) {
          errors.push(`Exam date required for ${className} subject`);
        }
        if (!subject.startTime) {
          errors.push(`Start time required for ${className} subject`);
        }
        if (!subject.endTime) {
          errors.push(`End time required for ${className} subject`);
        }
        
        // Date range validation
        if (subject.examDate) {
          const examDate = new Date(subject.examDate);
          if (examDate < formData.startDate || examDate > formData.endDate) {
            errors.push(`Exam date for ${className} is outside the exam period`);
          }
        }
        
        // Duration warnings
        const duration = calculateDuration(subject.startTime, subject.endTime);
        if (duration > 300) {
          subjectWarnings.push(`${className}: Long exam duration (${Math.round(duration/60)} hours)`);
        }
      }
      
      // Marks validation
      if (subject.totalMarks <= 0) {
        errors.push(`Total marks must be greater than 0 for ${className}`);
      }
      if (subject.passingMarks < 0 || subject.passingMarks > subject.totalMarks) {
        errors.push(`Invalid passing marks for ${className}`);
      }
    });
    
    return { errors, warnings: subjectWarnings };
  };

  const validateForm = () => {
    const errors = [];
    const formWarnings = [];
    
    // Basic validation
    if (!formData.examName.trim()) errors.push('Exam name is required');
    if (!formData.academicYear.trim()) errors.push('Academic year is required');
    if (formData.classIds.length === 0) errors.push('Select at least one class');
    if (formData.weightage < 0 || formData.weightage > 100) {
      errors.push('Weightage must be between 0 and 100');
    }
    
    // Date validation
    if (formData.startDate > formData.endDate) {
      errors.push('End date must be after or same as start date');
    }
    
    // Subject validation
    const subjectValidation = validateSubjects();
    errors.push(...subjectValidation.errors);
    formWarnings.push(...subjectValidation.warnings);
    
    return { errors, warnings: formWarnings };
  };

  // Event handlers
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleClassToggle = (classId) => {
    setFormData(prev => {
      const isSelected = prev.classIds.includes(classId);
      const newClassIds = isSelected
        ? prev.classIds.filter(id => id !== classId)
        : [...prev.classIds, classId];
      
      // Remove subjects from deselected classes
      const newSubjects = prev.subjects.filter(subject => 
        newClassIds.includes(subject.classId)
      );
      
      return {
        ...prev,
        classIds: newClassIds,
        subjects: newSubjects
      };
    });
  };

  const handleSubjectToggle = (classId, subjectId) => {
    setFormData(prev => {
      const existingIndex = prev.subjects.findIndex(
        s => s.classId === classId && s.subjectId === subjectId
      );
      
      if (existingIndex >= 0) {
        // Remove subject
        return {
          ...prev,
          subjects: prev.subjects.filter((_, index) => index !== existingIndex)
        };
      } else {
        // Add subject with defaults
        const defaultTotalMarks = 100;
        const newSubject = {
          classId,
          subjectId,
          totalMarks: defaultTotalMarks,
          passingMarks: Math.round(defaultTotalMarks * 0.33),
          requiresExam: true,
          examDate: prev.startDate,
          startTime: null,
          endTime: null,
          duration: 0
        };
        
        return {
          ...prev,
          subjects: [...prev.subjects, newSubject]
        };
      }
    });
  };

  const updateSubjectProperty = (classId, subjectId, property, value) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.map(subject => {
        if (subject.classId === classId && subject.subjectId === subjectId) {
          const updatedSubject = { ...subject, [property]: value };
          
          // Auto-calculate duration for time changes
          if (property === 'startTime' || property === 'endTime') {
            const startTime = property === 'startTime' ? value : subject.startTime;
            const endTime = property === 'endTime' ? value : subject.endTime;
            updatedSubject.duration = calculateDuration(startTime, endTime);
          }
          
          // Auto-calculate passing marks for total marks changes
          if (property === 'totalMarks') {
            updatedSubject.passingMarks = Math.round(value * 0.33);
          }
          
          return updatedSubject;
        }
        return subject;
      })
    }));
  };

  const handleNonWorkingDayChange = (index, date) => {
    setFormData(prev => ({
      ...prev,
      nonWorkingDays: prev.nonWorkingDays.map((day, i) => i === index ? date : day)
    }));
  };

  const addNonWorkingDay = () => {
    setFormData(prev => ({
      ...prev,
      nonWorkingDays: [...prev.nonWorkingDays, new Date()]
    }));
  };

  const removeNonWorkingDay = (index) => {
    setFormData(prev => ({
      ...prev,
      nonWorkingDays: prev.nonWorkingDays.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitStatus({ type: '', message: '' });
    
    // Validate form
    const validation = validateForm();
    setValidationErrors(validation.errors);
    setWarnings(validation.warnings);
    
    if (validation.errors.length > 0) {
      setSubmitStatus({ 
        type: 'error', 
        message: `Please fix the following errors: ${validation.errors.slice(0, 3).join(', ')}` 
      });
      setSubmitting(false);
      return;
    }
    
    try {
      // Prepare submission data
      const submissionData = {
        examName: formData.examName.trim(),
        examType: formData.examType,
        academicYear: formData.academicYear.trim(),
        startDate: formData.startDate.toISOString().split('T')[0],
        endDate: formData.endDate.toISOString().split('T')[0],
        classIds: formData.classIds,
        subjects: formData.subjects.map(subject => ({
          classId: subject.classId,
          subjectId: subject.subjectId,
          totalMarks: subject.totalMarks,
          passingMarks: subject.passingMarks,
          requiresExam: subject.requiresExam,
          examDate: subject.examDate ? subject.examDate.toISOString().split('T')[0] : null,
          startTime: formatTimeForDisplay(subject.startTime),
          endTime: formatTimeForDisplay(subject.endTime),
          duration: subject.duration
        })),
        weightage: formData.weightage,
        nonWorkingDays: formData.nonWorkingDays.map(d => d.toISOString().split('T')[0]),
        maxExamsPerDay: formData.maxExamsPerDay
      };

      if (debugMode) {
        console.log('📤 Submitting exam schedule:', JSON.stringify(submissionData, null, 2));
      }

      await onSubmit(submissionData);
      setSubmitStatus({ type: 'success', message: 'Exam schedule created successfully!' });
      
      setTimeout(() => {
        onClose();
      }, 2000);
      
    } catch (error) {
      console.error('❌ Submission error:', error);
      
      const errorMessage = error?.response?.data?.error || 
                          error?.response?.data?.message || 
                          error?.message || 
                          'Failed to create exam schedule. Please try again.';
      
      setSubmitStatus({ type: 'error', message: errorMessage });
    } finally {
      setSubmitting(false);
    }
  };

  // Effects
  useEffect(() => {
    if (examData) {
      // Populate form with existing data
      setFormData({
        examName: examData.name || examData.examName || '',
        examType: examData.examType || 'Term 1',
        academicYear: examData.academicYear || getCurrentAcademicYear(),
        startDate: new Date(examData.startDate),
        endDate: new Date(examData.endDate),
        classIds: examData.classes?.map(c => c._id) || examData.classIds || [],
        subjects: examData.subjects?.map(subject => ({
          ...subject,
          requiresExam: subject.requiresExam ?? true,
          examDate: subject.examDate ? new Date(subject.examDate) : new Date(),
          passingMarks: subject.passingMarks || Math.round((subject.totalMarks || 100) * 0.33)
        })) || [],
        weightage: examData.weightage || 0,
        nonWorkingDays: examData.nonWorkingDays?.map(d => new Date(d)) || [],
        maxExamsPerDay: examData.maxExamsPerDay || 2
      });
    } else {
      // Reset form for new exam
      setFormData({
        examName: '',
        examType: 'Term 1',
        academicYear: getCurrentAcademicYear(),
        startDate: new Date(),
        endDate: new Date(),
        classIds: [],
        subjects: [],
        weightage: 0,
        nonWorkingDays: [],
        maxExamsPerDay: 2
      });
    }
    
    setSubmitStatus({ type: '', message: '' });
    setValidationErrors([]);
    setWarnings([]);
  }, [isOpen, examData]);

  useEffect(() => {
    loadSubjects();
  }, [formData.classIds]);

  // Render helper functions
  const renderBasicInfo = () => (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        Basic Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            label="Exam Name"
            value={formData.examName}
            onChange={(e) => handleInputChange('examName', e.target.value)}
            required
            placeholder="e.g., Term 1 2025"
            error={validationErrors.some(err => err.includes('Exam name'))}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel>Exam Type</InputLabel>
            <Select
              value={formData.examType}
              onChange={(e) => handleInputChange('examType', e.target.value)}
              required
              label="Exam Type"
            >
              <MenuItem value="Term 1">Term 1</MenuItem>
              <MenuItem value="Term 2">Term 2</MenuItem>
              <MenuItem value="Mid Term">Mid Term</MenuItem>
              <MenuItem value="Final">Final</MenuItem>
              <MenuItem value="Unit Test">Unit Test</MenuItem>
              <MenuItem value="Practical">Practical</MenuItem>
              <MenuItem value="Internal Assessment">Internal Assessment</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            label="Academic Year"
            value={formData.academicYear}
            onChange={(e) => handleInputChange('academicYear', e.target.value)}
            required
            placeholder="e.g., 2025-2026"
            error={validationErrors.some(err => err.includes('Academic year'))}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            type="number"
            fullWidth
            label="Weightage (%)"
            value={formData.weightage}
            onChange={(e) => handleInputChange('weightage', parseInt(e.target.value) || 0)}
            inputProps={{ min: 0, max: 100 }}
            helperText="Percentage weight for final marksheet"
            required
            error={validationErrors.some(err => err.includes('Weightage'))}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <DatePicker
            label="Start Date"
            value={formData.startDate}
            onChange={(date) => handleInputChange('startDate', date)}
            slotProps={{
              textField: {
                fullWidth: true,
                required: true,
                error: validationErrors.some(err => err.includes('date'))
              }
            }}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <DatePicker
            label="End Date"
            value={formData.endDate}
            onChange={(date) => handleInputChange('endDate', date)}
            minDate={formData.startDate}
            slotProps={{
              textField: {
                fullWidth: true,
                required: true,
                error: validationErrors.some(err => err.includes('date'))
              }
            }}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            type="number"
            fullWidth
            label="Max Exams Per Day"
            value={formData.maxExamsPerDay}
            onChange={(e) => handleInputChange('maxExamsPerDay', parseInt(e.target.value) || 1)}
            inputProps={{ min: 1 }}
            helperText="Maximum exams scheduled per day"
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            label="Available Rooms"
            value={formData.availableRooms?.join(", ") || ""}
            onChange={(e) => {
              const rooms = e.target.value.split(",").map(r => r.trim()).filter(Boolean);
              handleInputChange('availableRooms', rooms);
            }}
            placeholder="Room1, Room2, Room3..."
            helperText="Separate room names with commas"
          />
        </Grid>
      </Grid>
    </Paper>
  );

  const renderNonWorkingDays = () => (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Non-Working Days (Holidays)
        </Typography>
        <Chip
          label={`${formData.nonWorkingDays.length} days selected`}
          color={formData.nonWorkingDays.length > 0 ? "primary" : "default"}
        />
      </Box>

      <Grid container spacing={3}>
        {formData.nonWorkingDays.map((day, index) => (
          <Grid item xs={12} md={3} key={index}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <DatePicker
                label={`Holiday ${index + 1}`}
                value={day}
                onChange={(date) => handleNonWorkingDayChange(index, date)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: 'small'
                  }
                }}
              />
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={() => removeNonWorkingDay(index)}
                fullWidth
              >
                Remove
              </Button>
            </Box>
          </Grid>
        ))}

        {/* Add Holiday Button - Always in 4-column layout */}
        <Grid item xs={12} md={3}>
          <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <Button
              variant="outlined"
              onClick={addNonWorkingDay}
              fullWidth
              sx={{
                height: '56px',
                borderStyle: 'dashed',
                borderWidth: 2,
                '&:hover': {
                  borderStyle: 'dashed',
                  borderWidth: 2
                }
              }}
            >
              + Add Holiday
            </Button>
          </Box>
        </Grid>
      </Grid>

      {formData.nonWorkingDays.length === 0 && (
        <Typography variant="body2" color="textSecondary" sx={{ mt: 2, textAlign: 'center' }}>
          No holidays selected. Click "Add Holiday" to add non-working days.
        </Typography>
      )}
    </Paper>
  );

  const renderClassSelection = () => (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Select Classes *
        </Typography>
        <Chip
          label={`${formData.classIds.length} selected`}
          color={formData.classIds.length > 0 ? "primary" : "default"}
        />
      </Box>

      {classes && classes.length > 0 ? (
        <Grid container spacing={3}>
          {classes.map((cls) => (
            <Grid item xs={12} md={3} key={cls._id}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.classIds.includes(cls._id)}
                    onChange={() => handleClassToggle(cls._id)}
                  />
                }
                label={`${cls.name} - ${cls.division}`}
                sx={{
                  width: '100%',
                  border: '1px solid',
                  borderColor: formData.classIds.includes(cls._id) ? 'primary.main' : 'grey.300',
                  borderRadius: 1,
                  p: 1,
                  m: 0,
                  backgroundColor: formData.classIds.includes(cls._id) ? 'primary.50' : 'transparent',
                  '&:hover': {
                    backgroundColor: formData.classIds.includes(cls._id) ? 'primary.100' : 'grey.50'
                  },
                  '& .MuiFormControlLabel-label': {
                    fontSize: '0.875rem',
                    fontWeight: formData.classIds.includes(cls._id) ? 'bold' : 'normal'
                  }
                }}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Alert severity="warning">No classes available</Alert>
      )}

      {validationErrors.some(err => err.includes('class')) && (
        <Alert severity="error" sx={{ mt: 2 }}>
          Please select at least one class
        </Alert>
      )}
    </Paper>
  );

  const renderSubjectDetails = (subject, classId) => {
    const classSubjects = availableSubjects[classId] || [];
    const subjectData = classSubjects.find(s => s._id === subject.subjectId);
    const subjectName = subjectData?.name || 'Unknown Subject';

    return (
      <Box sx={{ mt: 2, p: 3, bgcolor: 'background.default', borderRadius: 1, border: '1px solid', borderColor: 'grey.200' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              type="number"
              label="Total Marks"
              value={subject.totalMarks || ""}
              onChange={(e) => {
                const value = parseInt(e.target.value) || 0;
                updateSubjectProperty(classId, subject.subjectId, "totalMarks", value);
              }}
              inputProps={{ min: 1 }}
              required
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              type="number"
              label="Passing Marks"
              value={subject.passingMarks || ""}
              onChange={(e) => {
                const value = parseInt(e.target.value) || 0;
                updateSubjectProperty(classId, subject.subjectId, "passingMarks", value);
              }}
              inputProps={{ min: 0 }}
              helperText="Auto-calculated as 33% of total marks"
            />
          </Grid>

          {subject.requiresExam && (
            <>
              <Grid item xs={12} md={3}>
                <DatePicker
                  label="Exam Date"
                  value={subject.examDate}
                  onChange={(date) =>
                    updateSubjectProperty(classId, subject.subjectId, "examDate", date)
                  }
                  minDate={formData.startDate}
                  maxDate={formData.endDate}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      required: true
                    }
                  }}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Duration (mins)"
                  value={subject.duration || ""}
                  InputProps={{ readOnly: true }}
                  helperText="Auto-calculated"
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <TimePicker
                  label="Start Time"
                  value={subject.startTime}
                  onChange={(time) =>
                    updateSubjectProperty(classId, subject.subjectId, "startTime", time)
                  }
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      required: true
                    }
                  }}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <TimePicker
                  label="End Time"
                  value={subject.endTime}
                  onChange={(time) =>
                    updateSubjectProperty(classId, subject.subjectId, "endTime", time)
                  }
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      required: true
                    }
                  }}
                />
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    );
  };

  const renderSubjects = () => (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Subjects & Time *
        </Typography>
        <Box>
          <Chip
            label={`${formData.subjects.length} subjects`}
            color={formData.subjects.length > 0 ? "primary" : "default"}
            sx={{ mr: 1 }}
          />
          <Button
            variant="outlined"
            size="small"
            startIcon={<RefreshIcon />}
            onClick={refreshSubjects}
            disabled={loadingSubjects}
          >
            Refresh
          </Button>
        </Box>
      </Box>

      {loadingSubjects && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
          <CircularProgress />
        </Box>
      )}

      {formData.classIds.length === 0 ? (
        <Alert severity="info">Please select classes first</Alert>
      ) : (
        formData.classIds.map((classId) => {
          const classData = classes?.find((c) => c._id === classId);
          const classSubjects = availableSubjects[classId] || [];

          return (
            <Accordion key={classId} sx={{ mb: 1 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">
                  {classData?.name} - {classData?.division} 
                  ({formData.subjects.filter(s => s.classId === classId).length} subjects selected)
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {classSubjects.length > 0 ? (
                  <Grid container spacing={1}>
                    {classSubjects.map((subject) => {
                      const isSelected = formData.subjects.some(
                        (s) => s.classId === classId && s.subjectId === subject._id
                      );
                      const selectedSubject = formData.subjects.find(
                        (s) => s.classId === classId && s.subjectId === subject._id
                      );

                      return (
                        <React.Fragment key={subject._id}>
                          <Grid item xs={12}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={isSelected}
                                  onChange={() => handleSubjectToggle(classId, subject._id)}
                                />
                              }
                              label={subject.name}
                              sx={{ width: '100%' }}
                            />
                            
                            {isSelected && selectedSubject && 
                              renderSubjectDetails(selectedSubject, classId)
                            }
                          </Grid>
                        </React.Fragment>
                      );
                    })}
                  </Grid>
                ) : (
                  <Alert severity="warning">
                    No subjects available for this class. Please refresh or contact administrator.
                  </Alert>
                )}
              </AccordionDetails>
            </Accordion>
          );
        })
      )}

      {debugMode && (
        <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
          <Typography variant="caption" display="block">
            Debug Info: Classes: {formData.classIds.length}, Available Subject Classes: {Object.keys(availableSubjects).length}, Selected Subjects: {formData.subjects.length}
          </Typography>
        </Box>
      )}
    </Paper>
  );

  // Main render
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Dialog 
        open={isOpen} 
        onClose={onClose} 
        maxWidth="md" 
        fullWidth
        PaperProps={{ sx: { height: '90vh' } }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5">
            {examData ? "Edit Exam Schedule" : "Create New Exam Schedule"}
          </Typography>
        </DialogTitle>

        <DialogContent dividers sx={{ height: '100%', overflow: 'auto' }}>
          {/* Submit Status Alert */}
          {submitStatus.message && (
            <Alert 
              severity={submitStatus.type === 'success' ? 'success' : 'error'} 
              onClose={() => setSubmitStatus({ type: '', message: '' })}
              sx={{ mb: 2 }}
            >
              {submitStatus.message}
            </Alert>
          )}

          {/* Validation Errors */}
          {validationErrors.length > 0 && (
            <Alert severity="error" sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Please fix the following errors:
              </Typography>
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                {validationErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </Alert>
          )}

          {/* Warnings */}
          {warnings.length > 0 && (
            <Alert severity="warning" sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Warnings:
              </Typography>
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                {warnings.map((warning, index) => (
                  <li key={index}>{warning}</li>
                ))}
              </ul>
            </Alert>
          )}

          {/* Form Content */}
          {renderBasicInfo()}
          {renderNonWorkingDays()}
          {renderClassSelection()}
          {renderSubjects()}          
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button 
            onClick={onClose}
            disabled={submitting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            disabled={submitting || loadingSubjects}
            sx={{ minWidth: 120 }}
          >
            {submitting ? (
              <>
                <CircularProgress size={20} sx={{ mr: 1 }} />
                {examData ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              examData ? 'Update Exam' : 'Create Exam'
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

export default ExamEventFormModal;