import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Alert,
  Grid,
} from "@mui/material";
import AdminService from "../../services/adminService";

const ClassFormModal = ({ isOpen, onClose, classData, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    division: "",
    capacity: 30,
    academicYear: `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`,
    rteSeats: 0,
    classTeacher: "",
  });

  const [teachers, setTeachers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await AdminService.getTeachers();
        setTeachers(response.data);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    if (isOpen) {
      fetchTeachers();

      setFormData({
        name: classData?.name || "",
        division: classData?.division || "",
        capacity: classData?.capacity || 30,
        academicYear:
          classData?.academicYear ||
          `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`,
        rteSeats: classData?.rteSeats?.total || 0,
        classTeacher: classData?.classTeacher?._id || "",
      });

      setErrorMessage(""); // Reset error message when opening modal
    }
  }, [isOpen, classData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.division || !formData.academicYear) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    await onSubmit({
      ...formData,
      rteSeats: {
        total: parseInt(formData.rteSeats),
        occupied: 0,
      },
    });

    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{classData ? "Edit Class" : "Add New Class"}</DialogTitle>

      <DialogContent dividers>
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}

        <Grid container gap={2} sx={{ alignItems: "center", justifyContent: "center" }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Class Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Division"
              name="division"
              value={formData.division}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Capacity"
              name="capacity"
              type="number"
              value={formData.capacity}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="RTE Seats"
              name="rteSeats"
              type="number"
              value={formData.rteSeats}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Academic Year"
              name="academicYear"
              value={formData.academicYear}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Class Teacher"
              name="classTeacher"
              value={formData.classTeacher}
              onChange={handleChange}
              select
              sx={{ minWidth: 225 }}
              fullWidth
            >
              <MenuItem value="">Select Class Teacher</MenuItem>
              {teachers.map((teacher) => (
                <MenuItem key={teacher._id} value={teacher._id}>
                  {teacher.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {classData ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ClassFormModal;
