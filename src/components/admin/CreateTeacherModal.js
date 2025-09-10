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
  Checkbox,
  FormControlLabel,
  Box,
  Alert,
  CircularProgress,
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
  const [availableClasses, setAvailableClasses] = useState([]);
  const [subjectsByClass, setSubjectsByClass] = useState({});
  const [selectedClassForSubjects, setSelectedClassForSubjects] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      resetForm();
      fetchAvailableClasses();
    }
  }, [isOpen]);

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
    setAvailableClasses([]);
    setSubjectsByClass({});
    setSelectedClassForSubjects('');
    setError('');
    setLoading(false);
  };

  const fetchAvailableClasses = async () => {
    try {
      setLoading(true);
      const res = await AdminService.getAvailableClasses();
      const classes = res?.data?.available || res?.available || [];
      setAvailableClasses(classes);
    } catch (err) {
      console.error('Error fetching classes:', err);
      setError('Failed to load available classes');
    } finally {
      setLoading(false);
    }
  };

  const fetchSubjectsByClass = async (classId) => {
    try {
      setLoading(true);
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
          isAssigned: false,
          assignedTo: null,
        })),
      }));
    } catch (err) {
      console.error('Error fetching subjects:', err);
      setSubjectsByClass((prev) => ({ ...prev, [classId]: [] }));
      setError('Failed to load subjects for selected class');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClassTeacherChange = (e) => {
    setFormData((prev) => ({ ...prev, classTeacherOf: e.target.value }));
  };

  const handleClassForSubjectsChange = async (classId) => {
    setSelectedClassForSubjects(classId);
    if (classId && !subjectsByClass[classId]) {
      await fetchSubjectsByClass(classId);
    }
  };

  const handleSubjectToggle = (subjectId, classId) => {
    setFormData((prev) => {
      const exists = prev.subjectAssignments.some(
        (sa) => sa.subjectId === subjectId && sa.classId === classId
      );
      return {
        ...prev,
        subjectAssignments: exists
          ? prev.subjectAssignments.filter(
              (sa) => !(sa.subjectId === subjectId && sa.classId === classId)
            )
          : [...prev.subjectAssignments, { classId, subjectId }],
      };
    });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.password) {
      setError('Name, email, and password are required');
      return;
    }

    if (formData.subjectAssignments.length === 0) {
      setError('At least one subject assignment is required');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const emailAvailable =
        AdminService.checkEmailAvailability &&
        (await AdminService.checkEmailAvailability(formData.email));

      if (emailAvailable === false) {
        setError('Email is already registered');
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
        'Failed to create teacher'
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

        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          fullWidth
          required
          margin="normal"
        />

        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          fullWidth
          required
          margin="normal"
        />

        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          fullWidth
          required
          margin="normal"
        />

        <TextField
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Class Teacher Assignment (Optional)</InputLabel>
          <Select
            value={formData.classTeacherOf}
            onChange={handleClassTeacherChange}
            label="Class Teacher Assignment (Optional)"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {availableClasses.map((cls) => (
              <MenuItem key={cls._id} value={cls._id}>
                {cls.name}{cls.division ? ` - ${cls.division}` : ''}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Select Class for Subject Assignments</InputLabel>
          <Select
            value={selectedClassForSubjects}
            onChange={(e) => handleClassForSubjectsChange(e.target.value)}
            label="Select Class for Subject Assignments"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {availableClasses.map((cls) => (
              <MenuItem key={cls._id} value={cls._id}>
                {cls.name}{cls.division ? ` - ${cls.division}` : ''}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {selectedClassForSubjects && (
          <Box mt={2}>
            {subjectsByClass[selectedClassForSubjects]?.length ? (
              subjectsByClass[selectedClassForSubjects].map((subject) => (
                <FormControlLabel
                  key={subject._id}
                  control={
                    <Checkbox
                      checked={formData.subjectAssignments.some(
                        (sa) =>
                          sa.subjectId === subject._id &&
                          sa.classId === selectedClassForSubjects
                      )}
                      onChange={() =>
                        handleSubjectToggle(subject._id, selectedClassForSubjects)
                      }
                      disabled={subject.isAssigned}
                    />
                  }
                  label={subject.name}
                />
              ))
            ) : (
              <Alert severity="warning">
                No subjects found for selected class.
              </Alert>
            )}
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading || formData.subjectAssignments.length === 0}
        >
          {loading ? <CircularProgress size={24} /> : 'Create Teacher'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateTeacherModal;
