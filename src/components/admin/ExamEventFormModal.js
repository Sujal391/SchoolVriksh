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
  FormGroup,
  Button,
  Grid,
  Typography,
  CircularProgress,
  Alert,
  Box
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import AdminService from '../../services/adminService';

const ExamEventFormModal = ({ isOpen, onClose, examData, classes, onSubmit }) => {
  const [formData, setFormData] = useState({
    examName: '',
    examType: 'Unit Test',
    customExamType: '',
    startDate: new Date(),
    endDate: new Date(),
    classIds: [],
    subjects: [],
    maxExamsPerDay: 1,
    availableRooms: [],
    roomCapacities: {},
    nonWorkingDays: []
  });

  const [availableSubjects, setAvailableSubjects] = useState({});
  const [loadingSubjects, setLoadingSubjects] = useState(false);
  const [warnings, setWarnings] = useState([]);

  useEffect(() => {
    if (examData) {
      setFormData({
        examName: examData.name,
        examType: examData.examType,
        customExamType: examData.customExamType || '',
        startDate: new Date(examData.startDate),
        endDate: new Date(examData.endDate),
        classIds: examData.classes?.map(c => c._id) || [],
        subjects: examData.subjects || [],
        maxExamsPerDay: examData.maxExamsPerDay || 1,
        availableRooms: examData.availableRooms || [],
        roomCapacities: examData.roomCapacities || {},
        nonWorkingDays: examData.nonWorkingDays?.map(d => new Date(d)) || []
      });
    } else {
      setFormData({
        examName: '',
        examType: 'Unit Test',
        customExamType: '',
        startDate: new Date(),
        endDate: new Date(),
        classIds: [],
        subjects: [],
        maxExamsPerDay: 1,
        availableRooms: [],
        roomCapacities: {},
        nonWorkingDays: []
      });
    }
  }, [isOpen, examData]);

  const calculateDuration = (startTime, endTime) => {
    if (!startTime || !endTime) return { hours: 0, minutes: 0, totalHours: 0 };
    
    // Handle both string and Date object inputs
    let startTimeStr = startTime;
    let endTimeStr = endTime;
    
    if (startTime instanceof Date) {
      startTimeStr = startTime.toTimeString().slice(0, 5);
    }
    if (endTime instanceof Date) {
      endTimeStr = endTime.toTimeString().slice(0, 5);
    }
    
    // Ensure we have valid time strings
    if (!startTimeStr || !endTimeStr) return { hours: 0, minutes: 0, totalHours: 0 };
    
    try {
      const start = new Date(`2000-01-01 ${startTimeStr}`);
      const end = new Date(`2000-01-01 ${endTimeStr}`);
      
      let diffMs = end.getTime() - start.getTime();
      
      // Handle case where end time is next day (e.g., start: 23:00, end: 01:00)
      if (diffMs < 0) {
        diffMs += 24 * 60 * 60 * 1000; // Add 24 hours
      }
      
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const totalHours = parseFloat((hours + minutes / 60).toFixed(2));
      
      return { hours, minutes, totalHours };
    } catch (error) {
      console.error('Error calculating duration:', error);
      return { hours: 0, minutes: 0, totalHours: 0 };
    }
  };

  // Generate warnings for form validation
  const generateWarnings = () => {
    const newWarnings = [];
    
    // Date validation
    if (formData.startDate > formData.endDate) {
      newWarnings.push("End date should be after or same as start date");
    }
    
    // Check for very long exam durations
    formData.subjects.forEach(subject => {
      const duration = calculateDuration(subject.startTime, subject.endTime);
      if (duration.totalHours > 5) {
        const subjectName = availableSubjects[subject.classId]?.find(s => s._id === subject.subjectId)?.name || 'Unknown';
        newWarnings.push(`${subjectName}: Exam duration is ${duration.totalHours} hours. Consider if this is appropriate.`);
      }
      if (duration.totalHours > 12) {
        const subjectName = availableSubjects[subject.classId]?.find(s => s._id === subject.subjectId)?.name || 'Unknown';
        newWarnings.push(`${subjectName}: Duration spans multiple days (${duration.totalHours} hours). Please verify times are correct.`);
      }
    });
    
    // Check for overlapping exam times
    const timeSlots = formData.subjects.map(subject => ({
      ...subject,
      duration: calculateDuration(subject.startTime, subject.endTime)
    }));
    
    for (let i = 0; i < timeSlots.length; i++) {
      for (let j = i + 1; j < timeSlots.length; j++) {
        const slot1 = timeSlots[i];
        const slot2 = timeSlots[j];
        
        if (slot1.startTime && slot1.endTime && slot2.startTime && slot2.endTime) {
          const start1 = new Date(`2000-01-01 ${slot1.startTime}`);
          const end1 = new Date(`2000-01-01 ${slot1.endTime}`);
          const start2 = new Date(`2000-01-01 ${slot2.startTime}`);
          const end2 = new Date(`2000-01-01 ${slot2.endTime}`);
          
          if ((start1 <= start2 && end1 > start2) || (start2 <= start1 && end2 > start1)) {
            newWarnings.push("Some exam times overlap. Please check the schedule.");
          }
        }
      }
    }
    
    setWarnings(newWarnings);
  };

  // Update warnings when relevant data changes
  useEffect(() => {
    generateWarnings();
  }, [formData.startDate, formData.endDate, formData.subjects, availableSubjects]);

  // Load subjects when classes are selected
  useEffect(() => {
    const loadSubjects = async () => {
      if (formData.classIds.length > 0) {
        setLoadingSubjects(true);
        try {
          const subjectsData = {};
          for (const classId of formData.classIds) {
            const response = await AdminService.getSubjectsByClass(classId);
            subjectsData[classId] = response.data || [];
          }
          setAvailableSubjects(subjectsData);
        } catch (error) {
          console.error('Error loading subjects:', error);
        } finally {
          setLoadingSubjects(false);
        }
      } else {
        setAvailableSubjects({});
      }
    };

    loadSubjects();
  }, [formData.classIds]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date, name) => {
    setFormData(prev => ({
      ...prev,
      [name]: date
    }));
  };

  const handleClassToggle = (classId) => {
    setFormData(prev => {
      const alreadySelected = prev.classIds.includes(classId);
      const newClassIds = alreadySelected
        ? prev.classIds.filter(id => id !== classId)
        : [...prev.classIds, classId];
      
      // Remove subjects that belong to deselected classes
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
        // Add subject with default values
        return {
          ...prev,
          subjects: [...prev.subjects, {
            classId,
            subjectId,
            totalMarks: 100,
            durationHours: 2,
            startTime: null,
            endTime: null
          }]
        };
      }
    });
  };

  const updateSubjectDetails = (classId, subjectId, field, value) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.map(subject => {
        if (subject.classId === classId && subject.subjectId === subjectId) {
          const updatedSubject = { ...subject, [field]: value };
          
          // Auto-calculate duration when time changes
          if (field === 'startTime' || field === 'endTime') {
            const startTime = field === 'startTime' ? value : subject.startTime;
            const endTime = field === 'endTime' ? value : subject.endTime;
            
            if (startTime && endTime) {
              const duration = calculateDuration(
                startTime instanceof Date ? startTime.toTimeString().slice(0, 5) : startTime,
                endTime instanceof Date ? endTime.toTimeString().slice(0, 5) : endTime
              );
              updatedSubject.durationHours = duration.totalHours;
            }
          }
          
          return updatedSubject;
        }
        return subject;
      })
    }));
  };

  const handleRoomsChange = (e) => {
    const rooms = e.target.value.split(',').map(r => r.trim()).filter(r => r);
    setFormData(prev => ({ ...prev, availableRooms: rooms }));
  };

  const formatTimeForDisplay = (time) => {
    if (!time) return '';
    if (time instanceof Date) {
      return time.toTimeString().slice(0, 5);
    }
    return time;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (formData.classIds.length === 0) {
      alert('Please select at least one class');
      return;
    }
    
    if (formData.subjects.length === 0) {
      alert('Please select at least one subject');
      return;
    }

    // Convert time objects to strings for submission
    const processedSubjects = formData.subjects.map(subject => ({
      ...subject,
      startTime: formatTimeForDisplay(subject.startTime),
      endTime: formatTimeForDisplay(subject.endTime)
    }));

    onSubmit({
      ...formData,
      subjects: processedSubjects,
      startDate: formData.startDate.toISOString(),
      endDate: formData.endDate.toISOString(),
      nonWorkingDays: formData.nonWorkingDays.map(d => d.toISOString())
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Dialog open={isOpen} onClose={onClose} maxWidth="lg" fullWidth>
        <DialogTitle>
          {examData ? "Edit Exam Schedule" : "Create New Exam Schedule"}
        </DialogTitle>
        <DialogContent dividers>
          {/* Warnings */}
          {warnings.length > 0 && (
            <Box mb={2}>
              {warnings.map((warning, index) => (
                <Alert key={index} severity="warning" sx={{ mb: 1 }}>
                  {warning}
                </Alert>
              ))}
            </Box>
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
                  />
                </Grid>
              )}

              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Start Date"
                  value={formData.startDate}
                  onChange={(newValue) => handleDateChange(newValue, "startDate")}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      required: true
                    }
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="End Date"
                  value={formData.endDate}
                  onChange={(newValue) => handleDateChange(newValue, "endDate")}
                  minDate={formData.startDate}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      required: true
                    }
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  type="number"
                  fullWidth
                  label="Max Exams Per Day"
                  name="maxExamsPerDay"
                  value={formData.maxExamsPerDay}
                  onChange={handleChange}
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
                    label={`${cls.name || "Unknown"} - ${cls.division || "Unknown"}`}
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
                                      <Grid item xs={12} sm={2.4}>
                                        <TextField
                                          fullWidth
                                          type="number"
                                          label="Total Marks"
                                          value={selectedSubject.totalMarks || ""}
                                          onChange={(e) => {
                                            const value = parseInt(e.target.value) || 0;
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

                                      <Grid item xs={12} sm={2.4}>
                                        <TimePicker
                                          label="Start Time"
                                          value={selectedSubject.startTime}
                                          onChange={(newValue) =>
                                            updateSubjectDetails(
                                              classId,
                                              subject._id,
                                              "startTime",
                                              newValue
                                            )
                                          }
                                          slotProps={{
                                            textField: {
                                              fullWidth: true,
                                            }
                                          }}
                                        />
                                      </Grid>

                                      <Grid item xs={12} sm={2.4}>
                                        <TimePicker
                                          label="End Time"
                                          value={selectedSubject.endTime}
                                          onChange={(newValue) =>
                                            updateSubjectDetails(
                                              classId,
                                              subject._id,
                                              "endTime",
                                              newValue
                                            )
                                          }
                                          slotProps={{
                                            textField: {
                                              fullWidth: true,
                                            }
                                          }}
                                        />
                                      </Grid>

                                      <Grid item xs={12} sm={2.4}>
                                        <TextField
                                          fullWidth
                                          label="Duration (hrs)"
                                          value={selectedSubject.durationHours || ""}
                                          InputProps={{
                                            readOnly: true,
                                          }}
                                          helperText="Auto-calculated"
                                          variant="outlined"
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
          <Button onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
          >
            {examData ? "Update Exam" : "Create Exam"}
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

export default ExamEventFormModal;