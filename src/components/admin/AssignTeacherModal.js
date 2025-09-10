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
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Grid,
  Box,
} from "@mui/material";
import AdminService from "../../services/adminService";

const AssignTeacherModal = ({ isOpen, onClose, teacher, onSubmit }) => {
  const [availableClasses, setAvailableClasses] = useState([]);
  const [assignableSubjects, setAssignableSubjects] = useState([]);
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
        setAvailableClasses(classesRes.available || []);

        if (teacher) {
          const initialClassTeacher =
            teacher.currentAssignments?.classTeacher?._id || "";
          const initialSubjects =
            teacher.currentAssignments?.subjectTeacher?.map((st) => ({
              classId: st.class?._id || st.class,
              subjectId: st.subject?._id || st.subject,
            })) || [];

          setFormData({
            classTeacherOf: initialClassTeacher,
            subjectAssignments: initialSubjects,
          });

          if (initialClassTeacher) {
            const subjectsRes = await AdminService.getSubjectsByClass(
              initialClassTeacher
            );
            setAssignableSubjects(subjectsRes.subjects || []);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) fetchData();
  }, [isOpen, teacher]);

  const handleClassChange = async (classId) => {
    setFormData((prev) => ({ ...prev, classTeacherOf: classId, subjectAssignments: [] }));

    try {
      setLoading(true);
      const res = await AdminService.getSubjectsByClass(classId);
      setAssignableSubjects(res.subjects || []);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubjectToggle = (subjectId) => {
    setFormData((prev) => {
      const exists = prev.subjectAssignments.some(
        (sa) =>
          sa.subjectId === subjectId && sa.classId === prev.classTeacherOf
      );

      const updatedAssignments = exists
        ? prev.subjectAssignments.filter(
            (sa) =>
              !(sa.subjectId === subjectId && sa.classId === prev.classTeacherOf)
          )
        : [...prev.subjectAssignments, { classId: prev.classTeacherOf, subjectId }];

      return { ...prev, subjectAssignments: updatedAssignments };
    });
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
              <InputLabel>Select Class</InputLabel>
              <Select
                value={formData.classTeacherOf}
                onChange={(e) => handleClassChange(e.target.value)}
                label="Select Class"
              >
                <MenuItem value="">None</MenuItem>
                {availableClasses.map((cls) => (
                  <MenuItem key={cls._id} value={cls._id}>
                    {cls.name} {cls.division ? `- ${cls.division}` : ""}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {formData.classTeacherOf && (
              <Box mt={2}>
                <Grid container spacing={2}>
                  {assignableSubjects.map((subject) => (
                    <Grid item xs={12} sm={6} md={4} key={subject._id}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formData.subjectAssignments.some(
                              (sa) =>
                                sa.subjectId === subject._id &&
                                sa.classId === formData.classTeacherOf
                            )}
                            onChange={() => handleSubjectToggle(subject._id)}
                          />
                        }
                        label={subject.name || "Unknown Subject"}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading || !formData.classTeacherOf}
        >
          Save Assignments
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssignTeacherModal;
