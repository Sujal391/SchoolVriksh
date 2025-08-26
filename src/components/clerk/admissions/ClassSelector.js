import { Select, MenuItem, FormControl, InputLabel, Typography } from '@mui/material';

const ClassSelector = ({ classes, value, onChange }) => {
  return (
    <FormControl fullWidth>
      <InputLabel>Select Class</InputLabel>
      <Select
        value={value}
        onChange={onChange}
        label="Select Class"
        required
      >
        {classes.map((cls) => (
          <MenuItem key={cls._id} value={cls._id}>
            {cls.name} {cls.division} - {cls.teacher} ({cls.enrolledCount}/{cls.capacity})
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ClassSelector;