import { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  CircularProgress,
  Alert,
  Grid,
  Divider,
} from '@mui/material';
import AdminService from '../../services/adminService';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

const CreateUserModal = ({ isOpen, onClose, onUserCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'teacher',
    profile: {
      phone: '',
      address: '',
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const roleOptions = [
    'admin',
    'teacher',
    'clerk',
    'librarian',
    'inventory_manager',
    'fee_manager',
    'transport',
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('profile.')) {
      const field = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        profile: { ...prev.profile, [field]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.password || !formData.role) {
      setError('Name, email, password, and role are required');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        profile: {
          phone: formData.profile.phone || undefined,
          address: formData.profile.address || undefined,
        },
      };

      const response = await AdminService.createUser(userData);
      onUserCreated(response);
      onClose();
    } catch (err) {
      console.error('Error creating user:', err);
      setError(err.response?.data?.message || 'Failed to create user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" mb={2} sx={{ textAlign: "center" }}>
          Create New User
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Divider sx={{ fontWeight: 600, mb: 3 }}/>

        <Grid container spacing={2} sx={{ mt: 2, justifyContent: "center", alignItems: "center" }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Role</InputLabel>
              <Select
                name="role"
                value={formData.role}
                label="Role"
                onChange={handleInputChange}
                sx={{ minWidth: 225 }}
              >
                {roleOptions.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role.charAt(0).toUpperCase() + role.slice(1).replace('_', ' ')}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone Number"
              name="profile.phone"
              value={formData.profile.phone}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              name="profile.address"
              value={formData.profile.address}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>

        <Box mt={3} display="flex" justifyContent="center" gap={2}>
          <Button variant="outlined" onClick={onClose} disabled={loading}>
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
            startIcon={loading && <CircularProgress size={20} />}
          >
            {loading ? 'Creating...' : 'Create User'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateUserModal;
