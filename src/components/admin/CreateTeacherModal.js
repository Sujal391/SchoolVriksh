// import { useState, useEffect } from 'react';
// import AdminService from '../../services/adminService';

// const CreateTeacherModal = ({ isOpen, onClose, onTeacherCreated }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     phone: '',
//     address: '',
//     classTeacherOf: '',
//     subjectAssignments: [],
//   });
//   const [availableClasses, setAvailableClasses] = useState([]);
//   const [subjectsByClass, setSubjectsByClass] = useState({});
//   const [selectedClassForSubjects, setSelectedClassForSubjects] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   // Fetch available classes on mount
//   useEffect(() => {
//     if (isOpen) {
//       fetchAvailableClasses();
//     }
//   }, [isOpen]);

//   const fetchAvailableClasses = async () => {
//     try {
//       const response = await AdminService.getAvailableClasses();
//       setAvailableClasses(response.available || []);
//     } catch (err) {
//       console.error('Error fetching classes:', err);
//       setError('Failed to fetch available classes');
//     }
//   };

//   const fetchSubjectsByClass = async (classId) => {
//     try {
//       const response = await AdminService.getSubjectsByClass(classId);
//       setSubjectsByClass((prev) => ({
//         ...prev,
//         [classId]: response.subjects || [],
//       }));
//     } catch (err) {
//       console.error('Error fetching subjects:', err);
//       setError(`Failed to fetch subjects for class ${classId}`);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleClassTeacherChange = (classId) => {
//     setFormData((prev) => ({ ...prev, classTeacherOf: classId }));
//   };

//   const handleClassForSubjectsChange = async (classId) => {
//     setSelectedClassForSubjects(classId);
//     if (classId && !subjectsByClass[classId]) {
//       await fetchSubjectsByClass(classId);
//     }
//   };

//   const handleSubjectToggle = (subjectId, classId) => {
//     setFormData((prev) => {
//       const existingIndex = prev.subjectAssignments.findIndex(
//         (sa) => sa.classId === classId && sa.subjectId === subjectId
//       );

//       if (existingIndex >= 0) {
//         return {
//           ...prev,
//           subjectAssignments: prev.subjectAssignments.filter(
//             (_, index) => index !== existingIndex
//           ),
//         };
//       } else {
//         return {
//           ...prev,
//           subjectAssignments: [...prev.subjectAssignments, { classId, subjectId }],
//         };
//       }
//     });
//   };

//   const handleSubmit = async () => {
//     if (!formData.name || !formData.email || !formData.password) {
//       setError('Name, email, and password are required');
//       return;
//     }

//     if (formData.subjectAssignments.length === 0) {
//       setError('At least one subject assignment is required');
//       return;
//     }

//     try {
//       setLoading(true);
//       setError('');

//       // Check for email uniqueness
//       const emailCheck = await AdminService.checkEmailAvailability(formData.email);
//       if (!emailCheck.available) {
//         setError('Email is already registered');
//         return;
//       }

//       const teacherData = {
//         name: formData.name,
//         email: formData.email,
//         password: formData.password,
//         phone: formData.phone,
//         address: formData.address,
//         classTeacherOf: formData.classTeacherOf || null,
//         subjectAssignments: formData.subjectAssignments,
//       };

//       const response = await AdminService.createTeacher(teacherData);
//       onTeacherCreated(response.teacher);
//       onClose();
//     } catch (err) {
//       console.error('Error creating teacher:', err);
//       setError(
//         err.response?.data?.message ||
//           `Failed to create teacher: ${err.message}`
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white rounded-lg w-full max-w-2xl shadow-lg p-6">
//         <div className="flex justify-between items-center mb-4 border-b pb-2">
//           <h2 className="text-xl font-semibold">Create New Teacher</h2>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
//             disabled={loading}
//           >
//             ×
//           </button>
//         </div>

//         {error && (
//           <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
//             {error}
//           </div>
//         )}

//         <div className="space-y-4">
//           <div>
//             <label className="block mb-1 text-sm font-medium text-gray-700">Name*</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleInputChange}
//               className="w-full border border-gray-300 rounded px-3 py-2"
//               required
//             />
//           </div>

//           <div>
//             <label className="block mb-1 text-sm font-medium text-gray-700">Email*</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               className="w-full border border-gray-300 rounded px-3 py-2"
//               required
//             />
//           </div>

//           <div>
//             <label className="block mb-1 text-sm font-medium text-gray-700">Password*</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleInputChange}
//               className="w-full border border-gray-300 rounded px-3 py-2"
//               required
//             />
//           </div>

//           <div>
//             <label className="block mb-1 text-sm font-medium text-gray-700">Phone</label>
//             <input
//               type="text"
//               name="phone"
//               value={formData.phone}
//               onChange={handleInputChange}
//               className="w-full border border-gray-300 rounded px-3 py-2"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 text-sm font-medium text-gray-700">Address</label>
//             <input
//               type="text"
//               name="address"
//               value={formData.address}
//               onChange={handleInputChange}
//               className="w-full border border-gray-300 rounded px-3 py-2"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 text-sm font-medium text-gray-700">
//               Class Teacher Assignment (Optional)
//             </label>
//             <select
//               value={formData.classTeacherOf}
//               onChange={(e) => handleClassTeacherChange(e.target.value)}
//               className="w-full border border-gray-300 rounded px-3 py-2"
//             >
//               <option value="">Select a class</option>
//               {availableClasses.map((cls) => (
//                 <option key={cls._id} value={cls._id}>
//                   {cls.name}{cls.division ? ` - ${cls.division}` : ''}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block mb-1 text-sm font-medium text-gray-700">
//               Select Class for Subject Assignments*
//             </label>
//             <select
//               value={selectedClassForSubjects}
//               onChange={(e) => handleClassForSubjectsChange(e.target.value)}
//               className="w-full border border-gray-300 rounded px-3 py-2"
//             >
//               <option value="">Select a class</option>
//               {availableClasses.map((cls) => (
//                 <option key={cls._id} value={cls._id}>
//                   {cls.name}{cls.division ? ` - ${cls.division}` : ''}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {selectedClassForSubjects && subjectsByClass[selectedClassForSubjects]?.length > 0 && (
//             <div>
//               <label className="block mb-1 text-sm font-medium text-gray-700">
//                 Subject Assignments for {availableClasses.find(cls => cls._id === selectedClassForSubjects)?.name || 'Selected Class'}*
//               </label>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-40 overflow-y-auto p-2 border rounded">
//                 {subjectsByClass[selectedClassForSubjects].map((subject) => (
//                   <div key={subject._id} className="flex items-center">
//                     <input
//                       type="checkbox"
//                       id={`subject-${subject._id}`}
//                       checked={formData.subjectAssignments.some(
//                         (sa) => sa.subjectId === subject._id && sa.classId === selectedClassForSubjects
//                       )}
//                       onChange={() => handleSubjectToggle(subject._id, selectedClassForSubjects)}
//                       className="mr-2"
//                       disabled={subject.isAssigned}
//                     />
//                     <label htmlFor={`subject-${subject._id}`} className="text-sm">
//                       {subject.name}
//                       {subject.isAssigned && (
//                         <span className="text-xs text-gray-500">
//                           (Assigned to {subject.assignedTo?.name || 'Unknown'})
//                         </span>
//                       )}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {formData.subjectAssignments.length > 0 && (
//             <div>
//               <label className="block mb-1 text-sm font-medium text-gray-700">
//                 Selected Subject Assignments
//               </label>
//               <div className="flex flex-wrap gap-2 p-2 border rounded">
//                 {formData.subjectAssignments.map((sa, idx) => {
//                   const classData = availableClasses.find(cls => cls._id === sa.classId);
//                   const subjectData = subjectsByClass[sa.classId]?.find(sub => sub._id === sa.subjectId);
//                   return (
//                     <span
//                       key={idx}
//                       className="bg-gray-200 text-gray-800 text-xs font-medium px-2 py-1 rounded"
//                     >
//                       {subjectData?.name || 'Unknown Subject'} ({classData?.name || 'Unknown Class'}
//                       {classData?.division ? ` - ${classData.division}` : ''})
//                     </span>
//                   );
//                 })}
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="flex justify-end gap-2 border-t pt-4 mt-6">
//           <button
//             onClick={handleSubmit}
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//             disabled={loading}
//           >
//             {loading ? 'Creating...' : 'Create Teacher'}
//           </button>
//           <button
//             onClick={onClose}
//             className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
//             disabled={loading}
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateTeacherModal;



import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Alert,
  Grid,
  CircularProgress,
  Chip,
  OutlinedInput,
} from '@mui/material';
import AdminService from '../../services/adminService';

const CreateTeacherModal = ({ isOpen, onClose, onTeacherCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    classTeacherOf: '',
    subjectAssignments: [],
  });
  const [allClasses, setAllClasses] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [subjectsByClass, setSubjectsByClass] = useState({});
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      resetForm();
      fetchAllClasses();
    }
  }, [isOpen]);

  useEffect(() => {
    updateAvailableSubjects();
  }, [selectedClasses, subjectsByClass]);

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      phone: '',
      address: '',
      classTeacherOf: '',
      subjectAssignments: [],
    });
    setAllClasses([]);
    setSelectedClasses([]);
    setSelectedSubjects([]);
    setSubjectsByClass({});
    setAvailableSubjects([]);
    setError('');
    setLoading(false);
  };

  const fetchAllClasses = async () => {
    try {
      const res = await AdminService.getAvailableClasses();
      const availableClasses = res?.data?.available || res?.available || [];
      const assignedClasses = res?.data?.assigned || res?.assigned || [];
      
      const combinedClasses = [...availableClasses, ...assignedClasses];
      setAllClasses(combinedClasses);
    } catch (err) {
      console.error('Error fetching classes:', err);
    }
  };

  const fetchSubjectsByClass = async (classId) => {
    if (subjectsByClass[classId]) return;

    try {
      const res = await AdminService.getSubjectsByClass(classId);
      const subjects =
        res?.data?.subjects ||
        (Array.isArray(res?.data) ? res.data : []) ||
        res?.subjects ||
        [];
      
      setSubjectsByClass((prev) => ({
        ...prev,
        [classId]: subjects.map((subj) => ({
          _id: subj._id,
          name: subj.name,
          classId: classId,
        })),
      }));
    } catch (err) {
      console.error('Error fetching subjects:', err);
      setSubjectsByClass((prev) => ({ ...prev, [classId]: [] }));
    }
  };

  const updateAvailableSubjects = () => {
    const subjects = [];
    const subjectMap = new Map();

    selectedClasses.forEach(classId => {
      if (subjectsByClass[classId]) {
        subjectsByClass[classId].forEach(subject => {
          const key = `${subject._id}-${classId}`;
          if (!subjectMap.has(key)) {
            subjectMap.set(key, {
              ...subject,
              classId: classId,
              displayName: `${subject.name} (${getClassDisplayName(classId)})`,
              uniqueKey: key
            });
          }
        });
      }
    });

    setAvailableSubjects(Array.from(subjectMap.values()));
  };

  const getClassDisplayName = (classId) => {
    const classItem = allClasses.find(cls => cls._id === classId);
    if (classItem) {
      return `${classItem.name}${classItem.division ? ` - ${classItem.division}` : ''}`;
    }
    return 'Unknown Class';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleClassTeacherChange = (e) => {
    setFormData((prev) => ({ ...prev, classTeacherOf: e.target.value }));
  };

  const handleClassSelectionChange = async (event) => {
    const value = event.target.value;
    const newSelectedClasses = typeof value === 'string' ? value.split(',') : value;
    
    setSelectedClasses(newSelectedClasses);
    setSelectedSubjects([]);
    
    for (const classId of newSelectedClasses) {
      if (!subjectsByClass[classId]) {
        await fetchSubjectsByClass(classId);
      }
    }
  };

  const handleSubjectSelectionChange = (event) => {
    const value = event.target.value;
    const newSelectedSubjects = typeof value === 'string' ? value.split(',') : value;
    setSelectedSubjects(newSelectedSubjects);

    const subjectAssignments = newSelectedSubjects.map(uniqueKey => {
      const subject = availableSubjects.find(subj => subj.uniqueKey === uniqueKey);
      return {
        classId: subject.classId,
        subjectId: subject._id
      };
    });

    setFormData(prev => ({
      ...prev,
      subjectAssignments
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.password) {
      setError('Name, email, and password are required.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const emailAvailable =
        AdminService.checkEmailAvailability &&
        (await AdminService.checkEmailAvailability(formData.email));

      if (emailAvailable === false) {
        setError('Email is already registered.');
        setLoading(false);
        return;
      }

      const payload = {
        ...formData,
        classTeacherOf: formData.classTeacherOf || null,
      };

      const res = await AdminService.createTeacher(payload);
      const teacher = res?.teacher || res?.data?.teacher || res;
      onTeacherCreated(teacher);
      onClose();
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
        err.message ||
        'Failed to create teacher.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Create New Teacher</DialogTitle>

      <DialogContent dividers>
        {error && <Alert severity="error">{error}</Alert>}

        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Class Teacher Assignment (Optional)</InputLabel>
              <Select
                sx={{ minWidth: 225 }}
                value={formData.classTeacherOf}
                onChange={handleClassTeacherChange}
                label="Class Teacher Assignment (Optional)"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {allClasses.map((cls) => (
                  <MenuItem key={cls._id} value={cls._id}>
                    {cls.name}{cls.division ? ` - ${cls.division}` : ''}
                    {cls.classTeacher ? ` (Current: ${cls.classTeacher.name})` : ''}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Select Classes for Subject Assignments</InputLabel>
              <Select
                sx={{ minWidth: 225 }}
                multiple
                value={selectedClasses}
                onChange={handleClassSelectionChange}
                input={<OutlinedInput label="Select Classes for Subject Assignments" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip 
                        key={value} 
                        label={getClassDisplayName(value)}
                        size="small"
                      />
                    ))}
                  </Box>
                )}
              >
                {allClasses.map((cls) => (
                  <MenuItem key={cls._id} value={cls._id}>
                    {cls.name}{cls.division ? ` - ${cls.division}` : ''}
                    {cls.classTeacher ? ` (Class Teacher: ${cls.classTeacher.name})` : ' (Available)'}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth disabled={selectedClasses.length === 0}>
              <InputLabel>Select Subjects</InputLabel>
              <Select
                sx={{ minWidth: 225 }}
                multiple
                value={selectedSubjects}
                onChange={handleSubjectSelectionChange}
                input={<OutlinedInput label="Select Subjects" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => {
                      const subject = availableSubjects.find(subj => subj.uniqueKey === value);
                      return (
                        <Chip 
                          key={value} 
                          label={subject?.displayName || 'Unknown Subject'}
                          size="small"
                        />
                      );
                    })}
                  </Box>
                )}
              >
                {availableSubjects.map((subject) => (
                  <MenuItem key={subject.uniqueKey} value={subject.uniqueKey}>
                    {subject.displayName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Box mt={2}>
          {selectedClasses.length === 0 && (
            <Alert severity="info">
              Select classes first to view available subjects
            </Alert>
          )}
          
          {selectedClasses.length > 0 && availableSubjects.length === 0 && (
            <Alert severity="warning">
              No subjects available for the selected classes
            </Alert>
          )}
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Create Teacher'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateTeacherModal;