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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const classesRes = await AdminService.getAvailableClasses();
        const availableClasses = classesRes?.data?.available || classesRes?.available || [];
        const assignedClasses = classesRes?.data?.assigned || classesRes?.assigned || [];

        // Combine both available and assigned classes
        const combinedClasses = [...availableClasses, ...assignedClasses];
        setAllClasses(combinedClasses);

        // Reset all form fields to empty state when modal opens
        setFormData({
          classTeacherOf: "",
          subjectAssignments: [],
        });
        setSelectedClasses([]);
        setSelectedSubjects([]);
        setSubjectsByClass({});
        setAvailableSubjects([]);

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchData();
    } else {
      // Reset form when modal closes
      setFormData({
        classTeacherOf: "",
        subjectAssignments: [],
      });
      setSelectedClasses([]);
      setSelectedSubjects([]);
      setSubjectsByClass({});
      setAvailableSubjects([]);
    }
  }, [isOpen, teacher]);

  // Update available subjects when selected classes change
  useEffect(() => {
    updateAvailableSubjects();
  }, [selectedClasses, subjectsByClass]);

  const fetchSubjectsByClass = async (classId) => {
    if (subjectsByClass[classId]) return; // Already fetched

    try {
      const res = await AdminService.getSubjectsByClass(classId);
      const subjects = res?.data?.subjects || 
                     (Array.isArray(res?.data) ? res.data : []) || 
                     res?.subjects || [];
      
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

  const handleClassTeacherChange = (e) => {
    setFormData((prev) => ({ ...prev, classTeacherOf: e.target.value }));
  };

  const handleClassSelectionChange = async (event) => {
    const value = event.target.value;
    const newSelectedClasses = typeof value === 'string' ? value.split(',') : value;
    
    setSelectedClasses(newSelectedClasses);
    setSelectedSubjects([]); // Reset selected subjects when classes change
    
    // Fetch subjects for newly selected classes
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

    // Update formData.subjectAssignments
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

  const handleSubmit = () => {
    onSubmit(formData);
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