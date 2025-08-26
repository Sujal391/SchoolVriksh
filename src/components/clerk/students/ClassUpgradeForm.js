// import { useState } from 'react';
// import { Select, MenuItem, FormControl, InputLabel, Button, Typography, Grid } from '@mui/material';

// const ClassUpgradeForm = ({ student, classes, onSubmit }) => {
//   const [newClassId, setNewClassId] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(student.id, newClassId);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <Typography variant="h6">Upgrade Student Class</Typography>

//       <Grid container spacing={2}>
//         <Grid item xs={12}>
//           <Typography><strong>Current Class:</strong> {student.className}</Typography>
//         </Grid>
//         <Grid item xs={12}>
//           <FormControl fullWidth>
//             <InputLabel>New Class</InputLabel>
//             <Select
//               value={newClassId}
//               onChange={(e) => setNewClassId(e.target.value)}
//               label="New Class"
//               required
//             >
//               {classes
//                 .filter(cls => cls._id !== student.classId)
//                 .map((cls) => (
//                   <MenuItem key={cls._id} value={cls._id}>
//                     {cls.name} {cls.division} ({cls.enrolledCount}/{cls.capacity})
//                   </MenuItem>
//                 ))}
//             </Select>
//           </FormControl>
//         </Grid>
//       </Grid>

//       <Button type="submit" variant="contained" color="primary" fullWidth>
//         Upgrade Class
//       </Button>
//     </form>
//   );
// };

// export default ClassUpgradeForm;






// src/components/clerk/students/ClassUpgradeForm.js
import { 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Alert
} from '@mui/material';
import { useState } from 'react';

const ClassUpgradeForm = ({ 
  open, 
  onClose, 
  student, 
  classes, 
  onSubmit 
}) => {
  const [newClassId, setNewClassId] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!newClassId) {
        setError('Please select a new class');
        return;
      }
      await onSubmit(student.id, newClassId);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to upgrade class');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Upgrade Student Class</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            {error && (
              <Grid item xs={12}>
                <Alert severity="error">{error}</Alert>
              </Grid>
            )}
            <Grid item xs={12}>
              <Typography variant="body1">
                <strong>Student:</strong> {student.name} (GR: {student.grNumber})
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                <strong>Current Class:</strong> {student.className}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Select New Class</InputLabel>
                <Select
                  value={newClassId}
                  onChange={(e) => setNewClassId(e.target.value)}
                  label="Select New Class"
                >
                  {classes
                    .filter(cls => cls._id !== student.classId)
                    .map((cls) => (
                      <MenuItem key={cls._id} value={cls._id}>
                        {cls.name} {cls.division} 
                        (Current: {cls.enrolledCount}/{cls.capacity})
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          onClick={handleSubmit}
          variant="contained" 
          color="primary"
          disabled={!newClassId}
        >
          Upgrade
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ClassUpgradeForm;
