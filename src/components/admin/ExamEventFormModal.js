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



import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
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
    maxExamsPerDay: 2,
    availableRooms: [],
    roomCapacities: {},
    nonWorkingDays: []
  });

  const [availableSubjects, setAvailableSubjects] = useState({});
  const [loadingSubjects, setLoadingSubjects] = useState(false);

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
        maxExamsPerDay: examData.maxExamsPerDay || 2,
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
        maxExamsPerDay: 2,
        availableRooms: [],
        roomCapacities: {},
        nonWorkingDays: []
      });
    }
  }, [isOpen, examData]);

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
            startTime: '',
            endTime: ''
          }]
        };
      }
    });
  };

  const updateSubjectDetails = (classId, subjectId, field, value) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.map(subject =>
        subject.classId === classId && subject.subjectId === subjectId
          ? { ...subject, [field]: value }
          : subject
      )
    }));
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

    onSubmit({
      ...formData,
      startDate: formData.startDate.toISOString(),
      endDate: formData.endDate.toISOString(),
      nonWorkingDays: formData.nonWorkingDays.map(d => d.toISOString())
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9999] p-2 sm:p-4">
      {/* Modal Container - Responsive positioning */}
      <div className="bg-white rounded-lg w-full max-w-[95vw] sm:max-w-4xl lg:max-w-5xl xl:max-w-6xl 
                      lg:ml-[280px] xl:ml-[280px] /* Offset for desktop sidebar */
                      shadow-2xl max-h-[95vh] overflow-hidden flex flex-col
                      transform transition-all duration-300 ease-in-out">
        
        {/* Fixed Header */}
        <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200 bg-white">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 truncate pr-4">
            {examData ? 'Edit Exam Schedule' : 'Create New Exam Schedule'}
          </h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 text-xl sm:text-2xl font-bold 
                       min-w-[32px] h-8 flex items-center justify-center
                       hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Basic Information Section */}
            <div className="space-y-4">
              <h3 className="text-base font-medium text-gray-700 border-b pb-2">Basic Information</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Exam Name - Full Width */}
                <div className="lg:col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Exam Name *
                  </label>
                  <input
                    type="text"
                    name="examName"
                    value={formData.examName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm
                               focus:ring-2 focus:ring-blue-500 focus:border-transparent
                               transition-all duration-200"
                    placeholder="Enter exam name"
                    required
                  />
                </div>

                {/* Exam Type */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Exam Type *
                  </label>
                  <select
                    name="examType"
                    value={formData.examType}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm
                               focus:ring-2 focus:ring-blue-500 focus:border-transparent
                               transition-all duration-200"
                    required
                  >
                    <option value="Unit Test">Unit Test</option>
                    <option value="Midterm">Midterm</option>
                    <option value="Final">Final</option>
                    <option value="Practical">Practical</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Custom Exam Type */}
                {formData.examType === 'Other' && (
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Custom Exam Type *
                    </label>
                    <input
                      type="text"
                      name="customExamType"
                      value={formData.customExamType}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm
                                 focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                 transition-all duration-200"
                      placeholder="Enter custom exam type"
                      required={formData.examType === 'Other'}
                    />
                  </div>
                )}

                {/* Start Date */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Start Date *
                  </label>
                  <DatePicker
                    selected={formData.startDate}
                    onChange={(date) => handleDateChange(date, 'startDate')}
                    minDate={new Date()}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm
                               focus:ring-2 focus:ring-blue-500 focus:border-transparent
                               transition-all duration-200"
                    placeholderText="Select start date"
                    required
                  />
                </div>

                {/* End Date */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    End Date *
                  </label>
                  <DatePicker
                    selected={formData.endDate}
                    onChange={(date) => handleDateChange(date, 'endDate')}
                    minDate={formData.startDate}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm
                               focus:ring-2 focus:ring-blue-500 focus:border-transparent
                               transition-all duration-200"
                    placeholderText="Select end date"
                    required
                  />
                </div>

                {/* Max Exams Per Day */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Max Exams Per Day
                  </label>
                  <input
                    type="number"
                    name="maxExamsPerDay"
                    min="1"
                    max="4"
                    value={formData.maxExamsPerDay}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm
                               focus:ring-2 focus:ring-blue-500 focus:border-transparent
                               transition-all duration-200"
                  />
                </div>

                {/* Available Rooms */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Available Rooms
                  </label>
                  <input
                    type="text"
                    name="availableRooms"
                    value={formData.availableRooms.join(', ')}
                    onChange={(e) => {
                      const rooms = e.target.value.split(',').map(r => r.trim()).filter(r => r);
                      setFormData(prev => ({ ...prev, availableRooms: rooms }));
                    }}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm
                               focus:ring-2 focus:ring-blue-500 focus:border-transparent
                               transition-all duration-200"
                    placeholder="Room1, Room2, Room3..."
                  />
                </div>
              </div>
            </div>

            {/* Classes Selection Section */}
            <div className="space-y-4">
              <h3 className="text-base font-medium text-gray-700 border-b pb-2">Class Selection *</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {classes.map(cls => (
                  <label key={cls._id} className="flex items-center gap-3 p-3 border border-gray-200 
                                                   rounded-lg hover:bg-gray-50 cursor-pointer
                                                   transition-all duration-200">
                    <input
                      type="checkbox"
                      checked={formData.classIds.includes(cls._id)}
                      onChange={() => handleClassToggle(cls._id)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded 
                                 focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="text-sm font-medium text-gray-700 truncate">
                      {cls.name} - {cls.division}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Subjects Selection Section */}
            {formData.classIds.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-base font-medium text-gray-700 border-b pb-2">
                  Subjects & Details *
                </h3>
                
                {loadingSubjects ? (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center gap-2 text-gray-600">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                      Loading subjects...
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {formData.classIds.map(classId => {
                      const classData = classes.find(c => c._id === classId);
                      const classSubjects = availableSubjects[classId] || [];
                      
                      return (
                        <div key={classId} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                          <h4 className="font-medium mb-3 text-gray-800 text-sm sm:text-base">
                            {classData?.name} - {classData?.division}
                          </h4>
                          
                          <div className="space-y-3">
                            {classSubjects.map(subject => {
                              const isSelected = formData.subjects.some(
                                s => s.classId === classId && s.subjectId === subject._id
                              );
                              const selectedSubject = formData.subjects.find(
                                s => s.classId === classId && s.subjectId === subject._id
                              );
                              
                              return (
                                <div key={subject._id} className="bg-white border border-gray-200 rounded-lg p-3">
                                  <label className="flex items-center gap-3 mb-3 cursor-pointer">
                                    <input
                                      type="checkbox"
                                      checked={isSelected}
                                      onChange={() => handleSubjectToggle(classId, subject._id)}
                                      className="w-4 h-4 text-blue-600 border-gray-300 rounded 
                                                 focus:ring-blue-500 focus:ring-2"
                                    />
                                    <span className="font-medium text-gray-800 text-sm">
                                      {subject.name}
                                    </span>
                                  </label>
                                  
                                  {isSelected && (
                                    <div className="ml-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                      <input
                                        type="number"
                                        placeholder="Total Marks"
                                        value={selectedSubject?.totalMarks || ''}
                                        onChange={(e) => updateSubjectDetails(classId, subject._id, 'totalMarks', parseInt(e.target.value))}
                                        className="border border-gray-300 rounded px-3 py-2 text-sm
                                                   focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        min="1"
                                      />
                                      <input
                                        type="number"
                                        placeholder="Duration (hours)"
                                        value={selectedSubject?.durationHours || ''}
                                        onChange={(e) => updateSubjectDetails(classId, subject._id, 'durationHours', parseInt(e.target.value))}
                                        className="border border-gray-300 rounded px-3 py-2 text-sm
                                                   focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        min="1"
                                        max="5"
                                      />
                                      <input
                                        type="time"
                                        placeholder="Start Time"
                                        value={selectedSubject?.startTime || ''}
                                        onChange={(e) => updateSubjectDetails(classId, subject._id, 'startTime', e.target.value)}
                                        className="border border-gray-300 rounded px-3 py-2 text-sm
                                                   focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                      />
                                      <input
                                        type="time"
                                        placeholder="End Time"
                                        value={selectedSubject?.endTime || ''}
                                        onChange={(e) => updateSubjectDetails(classId, subject._id, 'endTime', e.target.value)}
                                        className="border border-gray-300 rounded px-3 py-2 text-sm
                                                   focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                      />
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </form>
        </div>

        {/* Fixed Footer */}
        <div className="border-t border-gray-200 p-4 sm:p-6 bg-white">
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2 bg-gray-200 text-gray-800 rounded-lg 
                         hover:bg-gray-300 transition-colors duration-200 font-medium text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg 
                         hover:bg-blue-700 transition-colors duration-200 font-medium text-sm"
            >
              {examData ? 'Update Exam' : 'Create Exam'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamEventFormModal;