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

import { useEffect, useState, useCallback } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Checkbox,
  FormGroup,
  FormControlLabel,
  CircularProgress,
  Grid,
  Typography,
  Alert,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import AdminService from "../../services/adminService";

const ExamEventFormModal = ({
  isOpen,
  onClose,
  examData,
  classes,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    examName: "",
    examType: "Unit Test",
    customExamType: "",
    startDate: new Date(),
    endDate: new Date(),
    classIds: [],
    subjects: [],
    maxExamsPerDay: 1,
    availableRooms: [],
    roomCapacities: {},
    nonWorkingDays: [],
  });

  const [timeErrors, setTimeErrors] = useState({});
  const [availableSubjects, setAvailableSubjects] = useState({});
  const [loadingSubjects, setLoadingSubjects] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Initialize form data when modal opens or examData changes
  useEffect(() => {
    try {
      if (examData) {
        setFormData({
          examName: examData.name || "",
          examType: examData.examType || "Unit Test",
          customExamType: examData.customExamType || "",
          startDate: examData.startDate
            ? new Date(examData.startDate)
            : new Date(),
          endDate: examData.endDate ? new Date(examData.endDate) : new Date(),
          classIds: examData.classes?.map((c) => c._id) || [],
          subjects: examData.subjects || [],
          maxExamsPerDay: examData.maxExamsPerDay || 1,
          availableRooms: examData.availableRooms || [],
          roomCapacities: examData.roomCapacities || {},
          nonWorkingDays:
            examData.nonWorkingDays?.map((d) => {
              try {
                return new Date(d);
              } catch {
                return new Date();
              }
            }) || [],
        });
      } else {
        // Reset form for new exam
        setFormData({
          examName: "",
          examType: "Unit Test",
          customExamType: "",
          startDate: new Date(),
          endDate: new Date(),
          classIds: [],
          subjects: [],
          maxExamsPerDay: 1,
          availableRooms: [],
          roomCapacities: {},
          nonWorkingDays: [],
        });
      }
      setError("");
    } catch (err) {
      console.error("Error initializing form data:", err);
      setError("Error loading exam data");
    }
  }, [isOpen, examData]);

  
const clearTimeErrorsOnInteraction = useCallback(() => {
  if (Object.keys(timeErrors).length > 0) {
    setTimeErrors({});
  }
}, [timeErrors]);

  // Load subjects when classes change
  useEffect(() => {
    const loadSubjects = async () => {
      if (formData.classIds.length === 0) {
        setAvailableSubjects({});
        return;
      }

      setLoadingSubjects(true);
      try {
        const subjectsData = {};
        for (const classId of formData.classIds) {
          try {
            const response = await AdminService.getSubjectsByClass(classId);
            subjectsData[classId] = response.data || [];
          } catch (err) {
            console.error(`Error loading subjects for class ${classId}:`, err);
            subjectsData[classId] = [];
          }
        }
        setAvailableSubjects(subjectsData);
      } catch (err) {
        console.error("Error loading subjects:", err);
        setError("Failed to load subjects");
      } finally {
        setLoadingSubjects(false);
      }
    };

    loadSubjects();
  }, [formData.classIds]);

const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
    clearTimeErrorsOnInteraction(); // Add this line
}, [clearTimeErrorsOnInteraction]);

  const handleDateChange = useCallback((newValue, name) => {
    if (newValue && !isNaN(newValue.getTime())) {
      setFormData((prev) => ({
        ...prev,
        [name]: newValue,
      }));
      setError("");
    }
  }, []);

  const handleClassToggle = useCallback((classId) => {
  setFormData(prev => {
    const newClassIds = prev.classIds.includes(classId)
      ? prev.classIds.filter(id => id !== classId)
      : [...prev.classIds, classId];

    const newSubjects = prev.subjects.filter(s => newClassIds.includes(s.classId));

    return { ...prev, classIds: newClassIds, subjects: newSubjects };
  });
  setError('');
  clearTimeErrorsOnInteraction(); // Add this line
}, [clearTimeErrorsOnInteraction]);

  const handleSubjectToggle = useCallback((classId, subjectId) => {
    setFormData((prev) => {
      const exists = prev.subjects.find(
        (s) => s.classId === classId && s.subjectId === subjectId
      );
      if (exists) {
        return {
          ...prev,
          subjects: prev.subjects.filter(
            (s) => !(s.classId === classId && s.subjectId === subjectId)
          ),
        };
      } else {
        return {
          ...prev,
          subjects: [
            ...prev.subjects,
            {
              classId,
              subjectId,
              totalMarks: 100,
              durationHours: 2,
              startTime: "",
              endTime: "",
            },
          ],
        };
      }
    });
    setError("");
  }, []);

  const updateSubjectDetails = useCallback((classId, subjectId, field, value) => {
  setFormData(prev => ({
    ...prev,
    subjects: prev.subjects.map(s => {
      if (s.classId === classId && s.subjectId === subjectId) {
        // Ensure we're not concatenating values
        const updatedSubject = { ...s };
        updatedSubject[field] = value;
        return updatedSubject;
      }
      return s;
    })
  }));
}, []);

  const calculateDuration = useCallback((startTime, endTime) => {
    if (startTime && endTime) {
      try {
        const start = new Date(startTime);
        const end = new Date(endTime);

        // Check for invalid dates
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
          return 0;
        }

        let diffMs = end - start;

        // If end time is before start time, assume it's next day
        if (diffMs < 0) {
          diffMs += 24 * 60 * 60 * 1000; // Add 24 hours
        }

        const hours = diffMs / (1000 * 60 * 60);
        return hours > 0 ? parseFloat(hours.toFixed(2)) : 0;
      } catch {
        return 0;
      }
    }
    return "";
  }, []);

  const handleTimeChange = useCallback((classId, subjectId, timeType, newValue) => {
  const errorKey = `${classId}-${subjectId}-${timeType}`;
  const durationErrorKey = `${classId}-${subjectId}-duration`;
  
  // Clear previous errors for this field and duration
  setTimeErrors(prev => {
    const newErrors = { ...prev };
    delete newErrors[errorKey];
    delete newErrors[durationErrorKey];
    return newErrors;
  });
  
  // Handle invalid time (like 00:00 PM)
  if (newValue && isNaN(newValue.getTime())) {
    setTimeErrors(prev => ({
      ...prev,
      [errorKey]: 'Invalid time format'
    }));
    return;
  }
  
  const timeString = newValue ? newValue.toISOString() : '';
  
  setFormData(prev => {
    const updatedSubjects = prev.subjects.map(s => {
      if (s.classId === classId && s.subjectId === subjectId) {
        const updatedSubject = { ...s, [timeType]: timeString };
        
        const startTime = timeType === 'startTime' ? timeString : s.startTime;
        const endTime = timeType === 'endTime' ? timeString : s.endTime;
        
        if (startTime && endTime) {
          const duration = calculateDuration(startTime, endTime);
          updatedSubject.durationHours = duration;
          
          // Add validation for unusually long durations
          if (duration > 12) {
            setTimeErrors(prev => ({
              ...prev,
              [durationErrorKey]: `Warning: ${duration} hours is unusually long for an exam`
            }));
          }
        } else {
          updatedSubject.durationHours = '';
        }
        
        return updatedSubject;
      }
      return s;
    });
    
    return { ...prev, subjects: updatedSubjects };
  });
}, [calculateDuration]);

  const validateForm = useCallback(() => {
    if (!formData.examName.trim()) {
      return "Exam name is required";
    }
    if (formData.examType === "Other" && !formData.customExamType.trim()) {
      return "Custom exam type is required";
    }
    if (formData.classIds.length === 0) {
      return "Select at least one class";
    }
    if (formData.subjects.length === 0) {
      return "Select at least one subject";
    }
    if (formData.startDate >= formData.endDate) {
      return "End date must be after start date";
    }
    if (formData.maxExamsPerDay < 1) {
      return "Max exams per day must be at least 1";
    }

    // Validate subjects
    for (const subject of formData.subjects) {
      if (!subject.totalMarks || subject.totalMarks <= 0) {
        return "All subjects must have valid total marks";
      }
      if (subject.startTime && subject.endTime) {
        try {
          const start = new Date(subject.startTime);
          const end = new Date(subject.endTime);
          if (start >= end) {
            return "End time must be after start time for all subjects";
          }
        } catch {
          return "Invalid time format";
        }
      }
    }

    return null;
  }, [formData]);

  const handleSubmit = useCallback(async (e) => {
  e.preventDefault();
  
  const validationError = validateForm();
  if (validationError) {
    setError(validationError);
    return;
  }

  setSubmitting(true);
  setError('');
  
  try {
    // Process subjects to ensure correct time format
    const processedSubjects = formData.subjects.map(subject => {
      const processedSubject = { ...subject };
      
      // Ensure startTime and endTime are separate fields, not concatenated
      if (subject.startTime && subject.endTime) {
        // Parse and format times properly
        try {
          const startDate = new Date(subject.startTime);
          const endDate = new Date(subject.endTime);
          
          if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
            processedSubject.startTime = startDate.toISOString();
            processedSubject.endTime = endDate.toISOString();
          } else {
            // Remove invalid times
            delete processedSubject.startTime;
            delete processedSubject.endTime;
          }
        } catch (err) {
          console.error('Time processing error:', err);
          delete processedSubject.startTime;
          delete processedSubject.endTime;
        }
      }
      
      return processedSubject;
    });

    const submitData = {
      ...formData,
      subjects: processedSubjects,
      startDate: formData.startDate.toISOString(),
      endDate: formData.endDate.toISOString(),
      nonWorkingDays: formData.nonWorkingDays.map(d => d.toISOString())
    };

    console.log('Submitting data:', submitData); // Debug log to check format

    await onSubmit(submitData);
    onClose();
  } catch (err) {
    console.error('Submit error:', err);
    setError(err.response?.data?.error || err.message || 'Failed to save exam. Please try again.');
  } finally {
    setSubmitting(false);
  }
}, [formData, validateForm, onSubmit, onClose]);

  const handleRoomsChange = useCallback((e) => {
    const rooms = e.target.value
      .split(",")
      .map((r) => r.trim())
      .filter(Boolean);
    setFormData((prev) => ({ ...prev, availableRooms: rooms }));
  }, []);

  const handleMaxExamsChange = useCallback((e) => {
    const value = parseInt(e.target.value) || 1;
    setFormData((prev) => ({ ...prev, maxExamsPerDay: Math.max(1, value) }));
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Dialog open={isOpen} onClose={onClose} maxWidth="lg" fullWidth>
        <DialogTitle>
          {examData ? "Edit Exam Schedule" : "Create New Exam Schedule"}
        </DialogTitle>
        <DialogContent dividers>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {Object.keys(timeErrors).length > 0 && (
            <Alert severity="warning" sx={{ mb: 2 }}>
              <Typography variant="body2" component="div">
                {Object.values(timeErrors).map((error, index) => (
                  <div key={index}>• {error}</div>
                ))}
              </Typography>
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            {/* Basic Info */}
            <Grid container spacing={2} mb={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Exam Name"
                  name="examName"
                  value={formData.examName}
                  onChange={handleChange}
                  required
                  error={!formData.examName.trim() && submitting}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Exam Type</InputLabel>
                  <Select
                    name="examType"
                    value={formData.examType}
                    onChange={handleChange}
                    required
                    label="Exam Type"
                  >
                    <MenuItem value="Unit Test">Unit Test</MenuItem>
                    <MenuItem value="Midterm">Midterm</MenuItem>
                    <MenuItem value="Final">Final</MenuItem>
                    <MenuItem value="Practical">Practical</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {formData.examType === "Other" && (
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Custom Exam Type"
                    name="customExamType"
                    value={formData.customExamType}
                    onChange={handleChange}
                    required
                    error={
                      formData.examType === "Other" &&
                      !formData.customExamType.trim() &&
                      submitting
                    }
                  />
                </Grid>
              )}

              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Start Date"
                  value={formData.startDate}
                  onChange={(newValue) =>
                    handleDateChange(newValue, "startDate")
                  }
                  renderInput={(params) => (
                    <TextField fullWidth {...params} required />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="End Date"
                  value={formData.endDate}
                  onChange={(newValue) => handleDateChange(newValue, "endDate")}
                  minDate={formData.startDate}
                  renderInput={(params) => (
                    <TextField fullWidth {...params} required />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  type="number"
                  fullWidth
                  label="Max Exams Per Day"
                  name="maxExamsPerDay"
                  value={formData.maxExamsPerDay}
                  onChange={handleMaxExamsChange}
                  inputProps={{ min: 1 }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Available Rooms"
                  value={formData.availableRooms.join(", ")}
                  onChange={handleRoomsChange}
                  placeholder="Room1, Room2, Room3..."
                  helperText="Separate room names with commas"
                />
              </Grid>
            </Grid>

            {/* Classes */}
            <Typography variant="subtitle1" mb={1}>
              Classes *
            </Typography>
            {classes && classes.length > 0 ? (
              <FormGroup row>
                {classes.map((cls) => (
                  <FormControlLabel
                    key={cls._id}
                    control={
                      <Checkbox
                        checked={formData.classIds.includes(cls._id)}
                        onChange={() => handleClassToggle(cls._id)}
                      />
                    }
                    label={`${cls.name || "Unknown"} - ${
                      cls.division || "Unknown"
                    }`}
                  />
                ))}
              </FormGroup>
            ) : (
              <Typography color="textSecondary">
                No classes available
              </Typography>
            )}

            {/* Subjects */}
            {formData.classIds.length > 0 && (
              <>
                <Typography variant="subtitle1" mt={2} mb={1}>
                  Subjects & Details *
                </Typography>
                {loadingSubjects ? (
                  <CircularProgress />
                ) : (
                  formData.classIds.map((classId) => {
                    const classData = classes?.find((c) => c._id === classId);
                    const classSubjects = availableSubjects[classId] || [];

                    return (
                      <div
                        key={classId}
                        style={{
                          marginBottom: "16px",
                          padding: "16px",
                          border: "1px solid #ddd",
                          borderRadius: "8px",
                          backgroundColor: "#fafafa",
                        }}
                      >
                        <Typography variant="subtitle2" gutterBottom>
                          {classData?.name || "Unknown Class"} -{" "}
                          {classData?.division || "Unknown Division"}
                        </Typography>

                        {classSubjects.length > 0 ? (
                          <FormGroup>
                            {classSubjects.map((subject) => {
                              const isSelected = formData.subjects.some(
                                (s) =>
                                  s.classId === classId &&
                                  s.subjectId === subject._id
                              );
                              const selectedSubject = formData.subjects.find(
                                (s) =>
                                  s.classId === classId &&
                                  s.subjectId === subject._id
                              );

                              return (
                                <div
                                  key={subject._id}
                                  style={{
                                    marginLeft: "16px",
                                    marginTop: "8px",
                                  }}
                                >
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        checked={isSelected}
                                        onChange={() =>
                                          handleSubjectToggle(
                                            classId,
                                            subject._id
                                          )
                                        }
                                      />
                                    }
                                    label={subject.name || "Unknown Subject"}
                                  />

                                  {isSelected && selectedSubject && (
                                    <Grid container spacing={1} mt={0.5}>
                                      <Grid item xs={12} sm={3}>
                                        <TextField
                                          fullWidth
                                          type="number"
                                          label="Total Marks"
                                          value={
                                            selectedSubject.totalMarks || ""
                                          }
                                          onChange={(e) => {
                                            const value =
                                              parseInt(e.target.value) || 0;
                                            updateSubjectDetails(
                                              classId,
                                              subject._id,
                                              "totalMarks",
                                              value
                                            );
                                          }}
                                          inputProps={{ min: 1 }}
                                          required
                                        />
                                      </Grid>

                                      <Grid item xs={12} sm={3}>
                                        <TimePicker
                                          label="Start Time"
                                          value={
                                            selectedSubject.startTime
                                              ? new Date(
                                                  selectedSubject.startTime
                                                )
                                              : null
                                          }
                                          onChange={(newValue) =>
                                            handleTimeChange(
                                              classId,
                                              subject._id,
                                              "startTime",
                                              newValue
                                            )
                                          }
                                          renderInput={(params) => (
                                            <TextField
                                              fullWidth
                                              {...params}
                                              error={
                                                !!timeErrors[
                                                  `${classId}-${subject._id}-startTime`
                                                ]
                                              }
                                              helperText={
                                                timeErrors[
                                                  `${classId}-${subject._id}-startTime`
                                                ] || ""
                                              }
                                            />
                                          )}
                                        />
                                      </Grid>

                                      <Grid item xs={12} sm={3}>
                                        <TimePicker
                                          label="End Time"
                                          value={
                                            selectedSubject.endTime
                                              ? new Date(
                                                  selectedSubject.endTime
                                                )
                                              : null
                                          }
                                          onChange={(newValue) =>
                                            handleTimeChange(
                                              classId,
                                              subject._id,
                                              "endTime",
                                              newValue
                                            )
                                          }
                                          renderInput={(params) => (
                                            <TextField
                                              fullWidth
                                              {...params}
                                              error={
                                                !!timeErrors[
                                                  `${classId}-${subject._id}-endTime`
                                                ]
                                              }
                                              helperText={
                                                timeErrors[
                                                  `${classId}-${subject._id}-endTime`
                                                ] || ""
                                              }
                                            />
                                          )}
                                        />
                                      </Grid>

                                      <Grid item xs={12} sm={3}>
                                        <TextField
                                          fullWidth
                                          type="number"
                                          label="Duration (hrs)"
                                          value={
                                            selectedSubject.durationHours || ""
                                          }
                                          InputProps={{ readOnly: true }}
                                          error={
                                            !!timeErrors[
                                              `${classId}-${subject._id}-duration`
                                            ]
                                          }
                                          helperText={
                                            timeErrors[
                                              `${classId}-${subject._id}-duration`
                                            ] ||
                                            (selectedSubject.startTime &&
                                            selectedSubject.endTime &&
                                            new Date(selectedSubject.endTime) <
                                              new Date(
                                                selectedSubject.startTime
                                              )
                                              ? "Next day exam"
                                              : "Auto-calculated")
                                          }
                                        />
                                      </Grid>
                                    </Grid>
                                  )}
                                </div>
                              );
                            })}
                          </FormGroup>
                        ) : (
                          <Typography color="textSecondary" sx={{ ml: 2 }}>
                            No subjects available for this class
                          </Typography>
                        )}
                      </div>
                    );
                  })
                )}
              </>
            )}
          </form>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} disabled={submitting}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            disabled={submitting}
            startIcon={
              submitting ? <CircularProgress size={20} color="inherit" /> : null
            }
          >
            {submitting
              ? "Saving..."
              : examData
              ? "Update Exam"
              : "Create Exam"}
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

export default ExamEventFormModal;
