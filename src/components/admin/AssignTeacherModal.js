import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Box,
  Alert,
  Chip,
  OutlinedInput,
} from "@mui/material";
import AdminService from "../../services/adminService";

const AssignTeacherModal = ({ isOpen, onClose, teacher, onSubmit }) => {
  const [allClasses, setAllClasses] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [subjectsByClass, setSubjectsByClass] = useState({});
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    classTeacherOf: "",
    subjectAssignments: [],
  });

  const [initialAssignments, setInitialAssignments] = useState({
    classTeacherOf: "",
    subjectAssignments: []
  });

  // Helper function to safely extract ID from various possible structures
  const extractId = (obj) => {
    if (!obj) return null;
    if (typeof obj === 'string') return obj;
    if (obj._id) return obj._id;
    if (obj.id) return obj.id;
    return null;
  };

  // Helper function to extract class and subject IDs with extensive fallback logic
  const extractAssignmentIds = (assignmentItem) => {
    if (!assignmentItem) return { classId: null, subjectId: null };

    // Try various possible structures for class ID
    const classId = extractId(assignmentItem.class) || 
                   extractId(assignmentItem.classId) ||
                   assignmentItem.classId;

    // Try various possible structures for subject ID
    const subjectId = extractId(assignmentItem.subject?.subject) || // nested subject.subject._id
                     extractId(assignmentItem.subject) || 
                     extractId(assignmentItem.subjectId) ||
                     assignmentItem.subjectId;

    return { classId, subjectId };
  };

  const getClassDisplayName = (classId, classes = allClasses) => {
    const classItem = classes.find(cls => cls._id === classId);
    if (classItem) {
      return `${classItem.name}${classItem.division ? ` - ${classItem.division}` : ''}`;
    }
    return 'Unknown Class';
  };

  const fetchSubjectsByClass = async (classId) => {
    try {
      const res = await AdminService.getSubjectsByClass(classId);
      const subjects = res?.data?.subjects || 
                     (Array.isArray(res?.data) ? res.data : []) || 
                     res?.subjects || [];
      
      return subjects.map((subj) => ({
        _id: subj._id || subj.id,
        name: subj.name,
        classId: classId,
      }));
    } catch (err) {
      console.error(`Error fetching subjects for class ${classId}:`, err);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch all classes
        const classesRes = await AdminService.getAvailableClasses();
        const availableClasses = classesRes?.data?.available || classesRes?.available || [];
        const assignedClasses = classesRes?.data?.assigned || classesRes?.assigned || [];
        const combinedClasses = [...availableClasses, ...assignedClasses];
        setAllClasses(combinedClasses);

        // Initialize with teacher's current assignments if available
        if (teacher?.currentAssignments || teacher?.assignments) {
          const assignments = teacher.currentAssignments || teacher.assignments;
          
          console.log('=== INITIAL ASSIGNMENT DATA ===');
          console.log('Full assignments:', JSON.stringify(assignments, null, 2));
          
          // Extract class teacher assignment
          const currentClassTeacher = extractId(assignments.classTeacher?.class) || 
                                     extractId(assignments.classTeacher) || "";
          
          console.log('Class Teacher ID:', currentClassTeacher);
          
          // Extract subject assignments
          const currentSubjects = assignments.subjectTeacher || [];
          console.log('Raw subject teacher data:', currentSubjects);
          
          const subjectAssignments = currentSubjects
            .map(item => {
              const { classId, subjectId } = extractAssignmentIds(item);
              console.log('Processing item:', item, '-> classId:', classId, 'subjectId:', subjectId);
              return { classId, subjectId };
            })
            .filter(s => s.classId && s.subjectId); // Only keep valid assignments
          
          console.log('Processed subject assignments (may contain names):', subjectAssignments);
          
          // We'll update these after fetching subjects and converting names to IDs
          // For now, store the raw data
          const tempInitialAssignments = {
            classTeacherOf: currentClassTeacher,
            subjectAssignments: subjectAssignments
          };

          // Extract unique class IDs from subject assignments
          const uniqueClassIds = [...new Set(subjectAssignments.map(s => s.classId))].filter(Boolean);
          console.log('Unique class IDs:', uniqueClassIds);
          
          if (uniqueClassIds.length > 0) {
            setSelectedClasses(uniqueClassIds);

            // Fetch subjects for each class
            const subjectsMap = {};
            for (const classId of uniqueClassIds) {
              const subjects = await fetchSubjectsByClass(classId);
              subjectsMap[classId] = subjects;
            }
            
            console.log('Fetched subjects map:', subjectsMap);
            setSubjectsByClass(subjectsMap);

            // Build available subjects list
            const availableSubjectsList = [];
            uniqueClassIds.forEach(classId => {
              if (subjectsMap[classId]) {
                subjectsMap[classId].forEach(subject => {
                  const key = `${subject._id}-${classId}`;
                  availableSubjectsList.push({
                    ...subject,
                    classId: classId,
                    displayName: `${subject.name} (${getClassDisplayName(classId, combinedClasses)})`,
                    uniqueKey: key
                  });
                });
              }
            });
            
            console.log('Available subjects list:', availableSubjectsList);
            setAvailableSubjects(availableSubjectsList);

            // Convert subject names to IDs for proper storage
            const normalizedAssignments = subjectAssignments.map(s => {
              const classId = s.classId;
              const subjectIdentifier = s.subjectId;
              
              if (subjectsMap[classId]) {
                // Try to find subject by ID first
                let matchedSubject = subjectsMap[classId].find(
                  subj => subj._id === subjectIdentifier
                );
                
                // If not found by ID, try matching by name
                if (!matchedSubject) {
                  matchedSubject = subjectsMap[classId].find(
                    subj => subj.name.toLowerCase() === subjectIdentifier.toLowerCase()
                  );
                }
                
                if (matchedSubject) {
                  return { classId, subjectId: matchedSubject._id };
                }
              }
              
              return s; // Keep original if no match
            });

            console.log('Normalized assignments with IDs:', normalizedAssignments);

            // Store initial state with normalized IDs
            setInitialAssignments({
              classTeacherOf: currentClassTeacher,
              subjectAssignments: normalizedAssignments
            });

            // Set form data with normalized IDs
            setFormData({
              classTeacherOf: currentClassTeacher,
              subjectAssignments: normalizedAssignments
            });

            // Set selected subjects after we have the available subjects
            // Need to match by ID, but API might return name instead
            const selectedKeys = subjectAssignments
              .filter(s => s.classId && s.subjectId)
              .map(s => {
                const classId = s.classId;
                const subjectIdentifier = s.subjectId;
                
                // Check if we have subjects for this class
                if (subjectsMap[classId]) {
                  // Try to find subject by ID first
                  let matchedSubject = subjectsMap[classId].find(
                    subj => subj._id === subjectIdentifier
                  );
                  
                  // If not found by ID, try matching by name (case-insensitive)
                  if (!matchedSubject) {
                    matchedSubject = subjectsMap[classId].find(
                      subj => subj.name.toLowerCase() === subjectIdentifier.toLowerCase()
                    );
                  }
                  
                  if (matchedSubject) {
                    return `${matchedSubject._id}-${classId}`;
                  }
                }
                
                // Fallback to original if no match found
                return `${subjectIdentifier}-${classId}`;
              });
            
            console.log('Setting selected subject keys:', selectedKeys);
            console.log('Subject assignments before mapping:', subjectAssignments);
            setSelectedSubjects(selectedKeys);
          }

        } else {
          resetForm();
        }

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchData();
    } else {
      resetForm();
    }
  }, [isOpen, teacher]);

  const resetForm = () => {
    setFormData({
      classTeacherOf: "",
      subjectAssignments: [],
    });
    setInitialAssignments({
      classTeacherOf: "",
      subjectAssignments: []
    });
    setSelectedClasses([]);
    setSelectedSubjects([]);
    setSubjectsByClass({});
    setAvailableSubjects([]);
  };

  const updateAvailableSubjects = () => {
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

    const newAvailableSubjects = Array.from(subjectMap.values());
    setAvailableSubjects(newAvailableSubjects);

    // Validate and clean up selected subjects
    const validKeys = newAvailableSubjects.map(s => s.uniqueKey);
    const validatedSelection = selectedSubjects.filter(key => validKeys.includes(key));
    
    if (validatedSelection.length !== selectedSubjects.length) {
      setSelectedSubjects(validatedSelection);
      
      // Update form data
      const subjectAssignments = validatedSelection.map(uniqueKey => {
        const [subjectId, classId] = uniqueKey.split('-');
        return { classId, subjectId };
      });
      
      setFormData(prev => ({
        ...prev,
        subjectAssignments
      }));
    }
  };

  useEffect(() => {
    if (selectedClasses.length > 0) {
      updateAvailableSubjects();
    }
  }, [selectedClasses, subjectsByClass]);

  const handleClassTeacherChange = (e) => {
    setFormData((prev) => ({ ...prev, classTeacherOf: e.target.value }));
  };

  const handleClassSelectionChange = async (event) => {
    const value = event.target.value;
    const newSelectedClasses = typeof value === 'string' ? value.split(',') : value;
    
    setSelectedClasses(newSelectedClasses);
    
    if (newSelectedClasses.length === 0) {
      setSelectedSubjects([]);
      setFormData(prev => ({
        ...prev,
        subjectAssignments: []
      }));
      return;
    }
    
    // Filter out subjects that belong to deselected classes
    const filteredSubjects = selectedSubjects.filter(uniqueKey => {
      const [subjectId, classId] = uniqueKey.split('-');
      return newSelectedClasses.includes(classId);
    });
    
    setSelectedSubjects(filteredSubjects);
    
    // Update formData with filtered subjects
    const subjectAssignments = filteredSubjects.map(uniqueKey => {
      const [subjectId, classId] = uniqueKey.split('-');
      return { classId, subjectId };
    });
    
    setFormData(prev => ({
      ...prev,
      subjectAssignments
    }));
    
    // Fetch subjects for newly selected classes
    for (const classId of newSelectedClasses) {
      if (!subjectsByClass[classId]) {
        const subjects = await fetchSubjectsByClass(classId);
        setSubjectsByClass(prev => ({
          ...prev,
          [classId]: subjects
        }));
      }
    }
  };

  const handleSubjectSelectionChange = (event) => {
    const value = event.target.value;
    const newSelectedSubjects = typeof value === 'string' ? value.split(',') : value;
    
    setSelectedSubjects(newSelectedSubjects);

    const subjectAssignments = newSelectedSubjects.map(uniqueKey => {
      const [subjectId, classId] = uniqueKey.split('-');
      return { classId, subjectId };
    });

    setFormData(prev => ({
      ...prev,
      subjectAssignments
    }));
  };

  const calculateChanges = () => {
    const payload = {};

    // Handle class teacher assignment
    if (formData.classTeacherOf && formData.classTeacherOf !== initialAssignments.classTeacherOf) {
      payload.classTeacherOf = formData.classTeacherOf;
    } else if (!formData.classTeacherOf && initialAssignments.classTeacherOf) {
      payload.removeClassTeacherRole = true;
    }

    // Calculate subject assignments to add
    const currentSubjects = formData.subjectAssignments;
    const initialSubjects = initialAssignments.subjectAssignments;

    const addSubjects = currentSubjects.filter(curr => 
      !initialSubjects.some(init => 
        init.classId === curr.classId && init.subjectId === curr.subjectId
      )
    );

    const removeSubjects = initialSubjects.filter(init => 
      !currentSubjects.some(curr => 
        curr.classId === init.classId && curr.subjectId === init.subjectId
      )
    );

    if (addSubjects.length > 0) {
      payload.addSubjectAssignments = addSubjects;
    }

    if (removeSubjects.length > 0) {
      payload.removeSubjectAssignments = removeSubjects;
    }

    return payload;
  };

  const handleSubmit = () => {
    const payload = calculateChanges();
    
    if (Object.keys(payload).length === 0) {
      alert("No changes detected");
      return;
    }

    console.log('Submitting payload:', payload);
    onSubmit(payload);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        {teacher ? `Assign Roles to ${teacher.name}` : "Assign Teacher"}
      </DialogTitle>

      <DialogContent dividers>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <CircularProgress />
          </Box>
        ) : (
          <>
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
                {allClasses.map((cls) => (
                  <MenuItem key={cls._id} value={cls._id}>
                    {cls.name}{cls.division ? ` - ${cls.division}` : ''}
                    {cls.classTeacher ? ` (Current: ${cls.classTeacher.name})` : ''}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Select Classes for Subject Assignments</InputLabel>
              <Select
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

            <FormControl fullWidth margin="normal" disabled={selectedClasses.length === 0}>
              <InputLabel>Select Subjects</InputLabel>
              <Select
                multiple
                value={selectedSubjects}
                onChange={handleSubjectSelectionChange}
                input={<OutlinedInput label="Select Subjects" />}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 300
                    }
                  }
                }}
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
          </>
        )}

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
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
        >
          Save Assignments
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssignTeacherModal;