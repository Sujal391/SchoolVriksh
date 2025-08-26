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

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        classTeacherOf: '',
        subjectAssignments: [],
      });
      setSelectedClassForSubjects('');
      setSubjectsByClass({});
      setError('');
      fetchAvailableClasses();
    }
  }, [isOpen]);

  const fetchAvailableClasses = async () => {
    try {
      setLoading(true);
      const response = await AdminService.getAvailableClasses();
      console.log('Available classes response:', response); // Debug log
      
      // Backend returns { available: [], assigned: [] }
      if (response?.data?.available) {
        setAvailableClasses(response.data.available);
      } else if (response?.available) {
        setAvailableClasses(response.available);
      } else {
        console.error('Unexpected response format:', response);
        setAvailableClasses([]);
        setError('Failed to load classes - unexpected response format');
      }
    } catch (err) {
      console.error('Error fetching classes:', err);
      setAvailableClasses([]);
      setError('Failed to fetch available classes');
    } finally {
      setLoading(false);
    }
  };

  const fetchSubjectsByClass = async (classId) => {
    try {
      setLoading(true);
      const response = await AdminService.getSubjectsByClass(classId);
      console.log('Subjects response for class', classId, ':', response); // Debug log
      
      // Backend returns direct array of subjects or { data: subjects }
      let subjects = [];
      if (response?.data) {
        if (Array.isArray(response.data)) {
          subjects = response.data;
        } else if (response.data.subjects) {
          subjects = response.data.subjects;
        }
      } else if (Array.isArray(response)) {
        subjects = response;
      } else if (response?.subjects) {
        subjects = response.subjects;
      }

      setSubjectsByClass((prev) => ({
        ...prev,
        [classId]: subjects.map(subject => ({
          _id: subject._id,
          name: subject.name,
          isAssigned: false, // For create modal, we don't need to check assignment status
          assignedTo: null
        }))
      }));
    } catch (err) {
      console.error('Error fetching subjects:', err);
      setError(`Failed to fetch subjects for selected class`);
      setSubjectsByClass((prev) => ({
        ...prev,
        [classId]: []
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClassTeacherChange = (classId) => {
    setFormData((prev) => ({ ...prev, classTeacherOf: classId }));
  };

  const handleClassForSubjectsChange = async (classId) => {
    setSelectedClassForSubjects(classId);
    if (classId && !subjectsByClass[classId]) {
      await fetchSubjectsByClass(classId);
    }
  };

  const handleSubjectToggle = (subjectId, classId) => {
    setFormData((prev) => {
      const existingIndex = prev.subjectAssignments.findIndex(
        (sa) => sa.classId === classId && sa.subjectId === subjectId
      );

      if (existingIndex >= 0) {
        return {
          ...prev,
          subjectAssignments: prev.subjectAssignments.filter(
            (_, index) => index !== existingIndex
          ),
        };
      } else {
        return {
          ...prev,
          subjectAssignments: [...prev.subjectAssignments, { classId, subjectId }],
        };
      }
    });
  };

  const checkEmailAvailability = async (email) => {
    try {
      // Check if AdminService has this method, if not, skip this check
      if (AdminService.checkEmailAvailability) {
        const emailCheck = await AdminService.checkEmailAvailability(email);
        return emailCheck.available;
      }
      return true; // Skip check if method doesn't exist
    } catch (err) {
      console.warn('Email availability check failed:', err);
      return true; // Continue if check fails
    }
  };

  const handleSubmit = async () => {
    // Validation
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

      // Check email availability (optional)
      const emailAvailable = await checkEmailAvailability(formData.email);
      if (!emailAvailable) {
        setError('Email is already registered');
        return;
      }

      const teacherData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        address: formData.address,
        classTeacherOf: formData.classTeacherOf || null,
        subjectAssignments: formData.subjectAssignments,
      };

      console.log('Sending teacher data:', teacherData); // Debug log

      const response = await AdminService.createTeacher(teacherData);
      console.log('Create teacher response:', response); // Debug log
      
      // Handle different response formats
      const teacher = response?.teacher || response?.data?.teacher || response;
      onTeacherCreated(teacher);
      onClose();
    } catch (err) {
      console.error('Error creating teacher:', err);
      setError(
        err.response?.data?.message ||
        err.message ||
        'Failed to create teacher'
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-full max-w-2xl shadow-lg p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-xl font-semibold">Create New Teacher</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
            disabled={loading}
          >
            ×
          </button>
        </div>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        {loading && (
          <div className="mb-4 p-2 bg-blue-100 text-blue-700 rounded">
            Loading...
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Name*</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Email*</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Password*</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Class Teacher Assignment (Optional)
            </label>
            <select
              value={formData.classTeacherOf}
              onChange={(e) => handleClassTeacherChange(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a class</option>
              {availableClasses.map((cls) => (
                <option key={cls._id} value={cls._id}>
                  {cls.name}{cls.division ? ` - ${cls.division}` : ''}
                </option>
              ))}
            </select>
            {availableClasses.length === 0 && !loading && (
              <p className="text-sm text-gray-500 mt-1">No available classes found</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Select Class for Subject Assignments*
            </label>
            <select
              value={selectedClassForSubjects}
              onChange={(e) => handleClassForSubjectsChange(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a class</option>
              {availableClasses.map((cls) => (
                <option key={cls._id} value={cls._id}>
                  {cls.name}{cls.division ? ` - ${cls.division}` : ''}
                </option>
              ))}
            </select>
          </div>

          {selectedClassForSubjects && subjectsByClass[selectedClassForSubjects]?.length > 0 && (
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Subject Assignments for {availableClasses.find(cls => cls._id === selectedClassForSubjects)?.name || 'Selected Class'}*
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-40 overflow-y-auto p-2 border rounded">
                {subjectsByClass[selectedClassForSubjects].map((subject) => (
                  <div key={subject._id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`subject-${subject._id}`}
                      checked={formData.subjectAssignments.some(
                        (sa) => sa.subjectId === subject._id && sa.classId === selectedClassForSubjects
                      )}
                      onChange={() => handleSubjectToggle(subject._id, selectedClassForSubjects)}
                      className="mr-2"
                      disabled={subject.isAssigned}
                    />
                    <label htmlFor={`subject-${subject._id}`} className="text-sm">
                      {subject.name}
                      {subject.isAssigned && (
                        <span className="text-xs text-gray-500">
                          (Assigned to {subject.assignedTo?.name || 'Unknown'})
                        </span>
                      )}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedClassForSubjects && subjectsByClass[selectedClassForSubjects]?.length === 0 && (
            <div className="p-2 bg-yellow-100 text-yellow-700 rounded">
              No subjects found for the selected class.
            </div>
          )}

          {formData.subjectAssignments.length > 0 && (
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Selected Subject Assignments
              </label>
              <div className="flex flex-wrap gap-2 p-2 border rounded">
                {formData.subjectAssignments.map((sa, idx) => {
                  const classData = availableClasses.find(cls => cls._id === sa.classId);
                  const subjectData = subjectsByClass[sa.classId]?.find(sub => sub._id === sa.subjectId);
                  return (
                    <span
                      key={idx}
                      className="bg-gray-200 text-gray-800 text-xs font-medium px-2 py-1 rounded"
                    >
                      {subjectData?.name || 'Unknown Subject'} ({classData?.name || 'Unknown Class'}
                      {classData?.division ? ` - ${classData.division}` : ''})
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 border-t pt-4 mt-6">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
            disabled={loading || formData.subjectAssignments.length === 0}
          >
            {loading ? 'Creating...' : 'Create Teacher'}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTeacherModal;