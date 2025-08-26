// import { useState, useEffect } from 'react';
// import {
//   Box,
//   Typography,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TextField,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   CircularProgress,
//   IconButton,
//   Tooltip
// } from '@mui/material';
// import { Add, Edit, Delete } from '@mui/icons-material';
// import { useAuth } from '../../contexts/AuthContext';
// import libraryService from '../../services/libraryService';

// const CategoryManager = () => {
//   const { user } = useAuth();
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [currentCategory, setCurrentCategory] = useState(null);
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       setLoading(true);
//       const data = await libraryService.getCategories();
//       setCategories(data);
//       setLoading(false);
//     } catch (err) {
//       setError(err.message);
//       setLoading(false);
//     }
//   };

//   const handleOpenDialog = (category = null) => {
//     setCurrentCategory(category);
//     setName(category?.name || '');
//     setDescription(category?.description || '');
//     setDialogOpen(true);
//   };

//   const handleCloseDialog = () => {
//     setDialogOpen(false);
//     setCurrentCategory(null);
//     setName('');
//     setDescription('');
//   };

//   const handleSubmit = async () => {
//     try {
//       if (currentCategory) {
//         await libraryService.updateCategory(currentCategory._id, name, description);
//       } else {
//         await libraryService.addCategory(name, description);
//       }
//       fetchCategories();
//       handleCloseDialog();
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleDelete = async (categoryId) => {
//     if (window.confirm('Are you sure you want to delete this category?')) {
//       try {
//         await libraryService.deleteCategory(categoryId);
//         fetchCategories();
//       } catch (err) {
//         setError(err.message);
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Box>
//       <Box display="flex" justifyContent="space-between" alignItems="center" mt={5} mb={3}>
//         <Typography variant="h4">Book Categories</Typography>
//         <Button
//           variant="contained"
//           startIcon={<Add />}
//           onClick={() => handleOpenDialog()}
//         >
//           Add Category
//         </Button>
//       </Box>

//       {error && (
//         <Box mb={3}>
//           <Typography color="error">{error}</Typography>
//         </Box>
//       )}

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Name</TableCell>
//               <TableCell>Description</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {categories.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan={3} align="center">
//                   No categories found
//                 </TableCell>
//               </TableRow>
//             ) : (
//               categories.map(category => (
//                 <TableRow key={category._id}>
//                   <TableCell>{category.name}</TableCell>
//                   <TableCell>{category.description || 'N/A'}</TableCell>
//                   <TableCell>
//                     <Tooltip title="Edit">
//                       <IconButton onClick={() => handleOpenDialog(category)}>
//                         <Edit color="primary" />
//                       </IconButton>
//                     </Tooltip>
//                     <Tooltip title="Delete">
//                       <IconButton onClick={() => handleDelete(category._id)}>
//                         <Delete color="error" />
//                       </IconButton>
//                     </Tooltip>
//                   </TableCell>
//                 </TableRow>
//               ))
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Add/Edit Dialog */}
//       <Dialog open={dialogOpen} onClose={handleCloseDialog}>
//         <DialogTitle>
//           {currentCategory ? 'Edit Category' : 'Add New Category'}
//         </DialogTitle>
//         <DialogContent>
//           <Box mb={2}>
//             <TextField
//               fullWidth
//               label="Category Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </Box>
//           <TextField
//             fullWidth
//             label="Description"
//             multiline
//             rows={3}
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog}>Cancel</Button>
//           <Button 
//             onClick={handleSubmit}
//             variant="contained"
//             disabled={!name}
//           >
//             {currentCategory ? 'Update' : 'Add'} Category
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default CategoryManager;




import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  IconButton,
  Tooltip,
  Grid,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import libraryService from '../../services/libraryService';

const CategoryManager = () => {
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await libraryService.getCategories();
      setCategories(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleOpenDialog = (category = null) => {
    setCurrentCategory(category);
    setName(category?.name || '');
    setDescription(category?.description || '');
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setCurrentCategory(null);
    setName('');
    setDescription('');
  };

  const handleSubmit = async () => {
    try {
      if (currentCategory) {
        await libraryService.updateCategory(currentCategory._id, name, description);
      } else {
        await libraryService.addCategory(name, description);
      }
      fetchCategories();
      handleCloseDialog();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await libraryService.deleteCategory(categoryId);
        fetchCategories();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: isMobile ? 2 : 3 }}>
      <Grid container justifyContent="space-between" alignItems="center" spacing={2} mb={3}>
        <Grid item>
          <Typography variant="h4" component="h1" gutterBottom>
            Book Categories
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleOpenDialog()}
            size={isMobile ? 'small' : 'medium'}
          >
            Add Category
          </Button>
        </Grid>
      </Grid>

      {error && (
        <Box mb={3}>
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        </Box>
      )}

      <Paper elevation={3} sx={{ overflowX: 'auto' }}>
        <TableContainer>
          <Table size={isMobile ? 'small' : 'medium'}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} align="center" sx={{ py: 4 }}>
                    <Typography variant="body1" color="textSecondary">
                      No categories found
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                categories.map(category => (
                  <TableRow key={category._id} hover>
                    <TableCell sx={{ minWidth: 150 }}>{category.name}</TableCell>
                    <TableCell sx={{ minWidth: 200 }}>
                      <Typography noWrap={!isMobile} sx={{ maxWidth: isMobile ? 150 : 'none' }}>
                        {category.description || 'N/A'}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ minWidth: 120 }}>
                      <Tooltip title="Edit">
                        <IconButton 
                          onClick={() => handleOpenDialog(category)}
                          size={isMobile ? 'small' : 'medium'}
                          aria-label="edit"
                        >
                          <Edit color="primary" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton 
                          onClick={() => handleDelete(category._id)}
                          size={isMobile ? 'small' : 'medium'}
                          aria-label="delete"
                        >
                          <Delete color="error" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Add/Edit Dialog */}
      <Dialog 
        open={dialogOpen} 
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ bgcolor: theme.palette.primary.main, color: 'white' }}>
          {currentCategory ? 'Edit Category' : 'Add New Category'}
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Category Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                margin="normal"
                variant="outlined"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button 
            onClick={handleCloseDialog}
            variant="outlined"
            size={isMobile ? 'small' : 'medium'}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            variant="contained"
            disabled={!name}
            size={isMobile ? 'small' : 'medium'}
            sx={{ ml: 2 }}
          >
            {currentCategory ? 'Update' : 'Add'} Category
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CategoryManager;