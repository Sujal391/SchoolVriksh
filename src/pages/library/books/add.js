import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
  Paper,
  CircularProgress,
  FormHelperText,
  Avatar,
  Alert
} from '@mui/material';
import { Save, Cancel, CloudUpload, MenuBook } from '@mui/icons-material';
import { useRouter } from 'next/router';
import LibraryLayout from '../../../components/layout/LibraryLayout';
import { useAuth } from '../../../contexts/AuthContext';
import libraryService from '../../../services/libraryService';

const AddBook = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loadingClasses, setLoadingClasses] = useState(false);
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [uploadingCover, setUploadingCover] = useState(false);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    bookTitle: '',
    author: '',
    isbn: '',
    category: '',
    classId: '',
    totalCopies: 1,
    description: '',
    publisher: '',
    publicationYear: new Date().getFullYear(),
    language: 'English',
    isGeneral: true
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoriesData = await libraryService.getCategories();
        setCategories(categoriesData);

        // Fetch classes
        setLoadingClasses(true);
        const classesData = await libraryService.getClasses();
        setClasses(classesData);
        setLoadingClasses(false);
      } catch (err) {
        setError('Failed to fetch required data');
        setLoadingClasses(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
  const { name, value } = e.target;

  let newValue = name === "isbn"
  ? value.replace(/\D/g, "").slice(0, 13)
  : value;

  setFormData((prev) => ({
    ...prev,
    [name]: newValue,
  }));
};

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setCoverFile(null);
      setCoverPreview(null);
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image file size should be less than 5MB');
      return;
    }

    setCoverFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setCoverPreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const removeCoverImage = () => {
    setCoverFile(null);
    setCoverPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // First, create the book
      const newBook = await libraryService.addBook({
        ...formData,
        schoolId: user.school._id
      });

      // If there's a cover image, upload it
      if (coverFile && newBook._id) {
        try {
          setUploadingCover(true);
          await libraryService.uploadBookCover(newBook._id, coverFile);
        } catch (uploadErr) {
          console.error('Cover upload failed:', uploadErr);
          // Don't fail the entire operation if cover upload fails
          setError('Book created successfully, but cover upload failed. You can upload it later from the book details page.');
        } finally {
          setUploadingCover(false);
        }
      }

      router.push('/library/books');
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <LibraryLayout>
      <Box mt={5} mb={3}>
        <Typography variant="h4">Add New Book</Typography>
      </Box>

      {error && (
        <Box mb={3}>
          <Typography color="error">{error}</Typography>
        </Box>
      )}

      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Book Title"
                name="bookTitle"
                value={formData.bookTitle}
                onChange={handleChange}
                required
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="ISBN"
                name="isbn"
                value={formData.isbn}
                onChange={handleChange}
                required
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth minWidth={150}>
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  label="Category"
                  required
                >
                  {categories.map(category => (
                    <MenuItem key={category._id} value={category.name}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Class</InputLabel>
                <Select
                  name="classId"
                  value={formData.classId}
                  onChange={handleChange}
                  label="Class"
                  disabled={loadingClasses}
                >
                  <MenuItem value="">General (All Classes)</MenuItem>
                  {classes.map(classItem => (
                    <MenuItem key={classItem._id} value={classItem._id}>
                      {classItem.name} {classItem.division ? `- ${classItem.division}` : ''}
                    </MenuItem>
                  ))}
                </Select>
                {loadingClasses && (
                  <Box display="flex" alignItems="center" mt={1}>
                    <CircularProgress size={16} />
                    <Typography variant="caption" ml={1}>Loading classes...</Typography>
                  </Box>
                )}
              </FormControl>
              <FormHelperText>
                Leave empty if book is available for all classes
              </FormHelperText>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Total Copies"
                name="totalCopies"
                type="number"
                value={formData.totalCopies}
                onChange={handleChange}
                required
                inputProps={{ min: 1 }}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Publisher"
                name="publisher"
                value={formData.publisher}
                onChange={handleChange}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Publication Year"
                name="publicationYear"
                type="number"
                value={formData.publicationYear}
                onChange={handleChange}
                inputProps={{ min: 1900, max: new Date().getFullYear() }}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Language"
                name="language"
                value={formData.language}
                onChange={handleChange}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={4}
              />
            </Grid>

            {/* Book Cover Upload Section */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2, mb: 2 }}>
                Book Cover Image
              </Typography>
              <Box display="flex" gap={3} alignItems="flex-start">
                {/* Cover Preview */}
                <Box>
                  {coverPreview ? (
                    <Avatar
                      src={coverPreview}
                      variant="rounded"
                      sx={{
                        width: 120,
                        height: 160,
                        borderRadius: 2,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                      }}
                      alt="Book cover preview"
                    />
                  ) : (
                    <Avatar
                      variant="rounded"
                      sx={{
                        width: 120,
                        height: 160,
                        backgroundColor: 'grey.100',
                        borderRadius: 2,
                        border: '2px dashed',
                        borderColor: 'grey.300',
                        fontSize: 32,
                        color: 'grey.400'
                      }}
                    >
                      <MenuBook fontSize="inherit" />
                    </Avatar>
                  )}
                </Box>

                {/* Upload Controls */}
                <Box sx={{ flex: 1 }}>
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="cover-upload"
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />

                  <Box display="flex" gap={2} mb={2}>
                    <Button
                      variant="outlined"
                      startIcon={<CloudUpload />}
                      onClick={handleUploadClick}
                      disabled={uploadingCover}
                    >
                      {coverFile ? 'Change Cover' : 'Upload Cover'}
                    </Button>

                    {coverFile && (
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={removeCoverImage}
                        disabled={uploadingCover}
                      >
                        Remove
                      </Button>
                    )}
                  </Box>

                  <Typography variant="body2" color="text.secondary">
                    Upload a book cover image (JPG, PNG, GIF). Max size: 5MB
                  </Typography>

                  {coverFile && (
                    <Typography variant="body2" color="primary" sx={{ mt: 1 }}>
                      Selected: {coverFile.name}
                    </Typography>
                  )}

                  {uploadingCover && (
                    <Box display="flex" alignItems="center" mt={1}>
                      <CircularProgress size={16} />
                      <Typography variant="body2" ml={1}>
                        Uploading cover...
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box display="flex" justifyContent="flex-end" gap={2}>
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<Cancel />}
                  onClick={() => router.push('/library/books')}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Save />}
                  disabled={loading}
                >
                  Save Book
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </LibraryLayout>
  );
};

export default AddBook;




// import { useState, useEffect } from 'react';
// import {
//   Box,
//   Typography,
//   Button,
//   TextField,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
//   Grid,
//   Paper,
//   CircularProgress,
//   FormHelperText,
//   Card,
//   CardContent,
//   Divider,
//   Chip,
//   Stack,
//   Container,
//   Fade,
//   Zoom,
//   useTheme,
//   alpha
// } from '@mui/material';
// import { 
//   Save, 
//   Cancel, 
//   MenuBook, 
//   Person, 
//   Category,
//   School,
//   Numbers,
//   Business,
//   CalendarToday,
//   Language,
//   Description,
//   LibraryBooks,
//   AutoStories
// } from '@mui/icons-material';
// import { useRouter } from 'next/router';
// import LibraryLayout from '../../../components/layout/LibraryLayout';
// import { useAuth } from '../../../contexts/AuthContext';
// import libraryService from '../../../services/libraryService';

// const AddBook = () => {
//   const { user } = useAuth();
//   const router = useRouter();
//   const theme = useTheme();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [categories, setCategories] = useState([]);
//   const [classes, setClasses] = useState([]);
//   const [loadingClasses, setLoadingClasses] = useState(false);
//   const [formData, setFormData] = useState({
//     bookTitle: '',
//     author: '',
//     isbn: '',
//     category: '',
//     classId: '',
//     totalCopies: 1,
//     description: '',
//     publisher: '',
//     publicationYear: new Date().getFullYear(),
//     language: 'English',
//     isGeneral: true
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch categories
//         const categoriesData = await libraryService.getCategories();
//         setCategories(categoriesData);

//         // Fetch classes
//         setLoadingClasses(true);
//         const classesData = await libraryService.getClasses();
//         setClasses(classesData);
//         setLoadingClasses(false);
//       } catch (err) {
//         setError('Failed to fetch required data');
//         setLoadingClasses(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       await libraryService.addBook({
//         ...formData,
//         schoolId: user.school._id
//       });
//       router.push('/library/books');
//     } catch (err) {
//       setError(err.message);
//       setLoading(false);
//     }
//   };

//   return (
//     <LibraryLayout>
//       <Container maxWidth="lg" sx={{ py: 4 }}>
//         {/* Header Section */}
//         <Fade in timeout={800}>
//           <Box sx={{ mb: 5, textAlign: 'center' }}>
//             <Box 
//               sx={{ 
//                 display: 'flex', 
//                 alignItems: 'center', 
//                 justifyContent: 'center', 
//                 gap: 2,
//                 mb: 2 
//               }}
//             >
//               <Box
//                 sx={{
//                   p: 2,
//                   borderRadius: '50%',
//                   background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//                   color: 'white',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center'
//                 }}
//               >
//                 <AutoStories sx={{ fontSize: 22 }} />
//               </Box>
//               <Typography 
//                 variant="h3" 
//                 sx={{ 
//                   fontWeight: 800,
//                   background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//                   backgroundClip: 'text',
//                   WebkitBackgroundClip: 'text',
//                   color: 'black',
//                 }}
//               >
//                 Add New Book
//               </Typography>
//             </Box>
            
//           </Box>
//         </Fade>

//         {/* Error Display */}
//         {error && (
//           <Zoom in timeout={600}>
//             <Card 
//               sx={{ 
//                 mb: 4, 
//                 border: '1px solid',
//                 borderColor: 'error.main',
//                 bgcolor: alpha(theme.palette.error.main, 0.05)
//               }}
//             >
//               <CardContent>
//                 <Typography color="error" sx={{ fontWeight: 500 }}>
//                   {error}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Zoom>
//         )}

//         {/* Main Form */}
//         <Fade in timeout={1000} style={{ transitionDelay: '200ms' }}>
//           <Card 
//             elevation={12}
//             sx={{ 
//               borderRadius: 4,
//               overflow: 'visible',
//               background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.02)}, ${alpha(theme.palette.secondary.main, 0.02)})`,
//               backdropFilter: 'blur(10px)',
//               border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
//             }}
//           >
//             <CardContent sx={{ p: { xs: 3, md: 5 } }}>
//               <form onSubmit={handleSubmit}>
//                 <Grid container spacing={4}>
//                   {/* Basic Information Section */}
//                   <Grid item xs={12}>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
//                       <MenuBook sx={{ color: 'primary.main', fontSize: 28 }} />
//                       <Typography variant="h5" sx={{ fontWeight: 600, color: 'primary.main' }}>
//                         Basic Information
//                       </Typography>
//                     </Box>
//                     <Divider sx={{ mb: 3, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//                   </Grid>

//                   <Grid item xs={12} md={6}>
//                     <TextField
//                       fullWidth
//                       label="Book Title"
//                       name="bookTitle"
//                       value={formData.bookTitle}
//                       onChange={handleChange}
//                       required
//                       variant="outlined"
//                       InputProps={{
//                         startAdornment: <MenuBook sx={{ color: 'text.secondary', mr: 1 }} />
//                       }}
//                       sx={{
//                         '& .MuiOutlinedInput-root': {
//                           borderRadius: 2,
//                           transition: 'all 0.3s ease',
//                           '&:hover': {
//                             boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.15)}`
//                           },
//                           '&.Mui-focused': {
//                             boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.25)}`
//                           }
//                         }
//                       }}
//                     />
//                   </Grid>
                  
//                   <Grid item xs={12} md={6}>
//                     <TextField
//                       fullWidth
//                       label="Author"
//                       name="author"
//                       value={formData.author}
//                       onChange={handleChange}
//                       required
//                       variant="outlined"
//                       InputProps={{
//                         startAdornment: <Person sx={{ color: 'text.secondary', mr: 1 }} />
//                       }}
//                       sx={{
//                         '& .MuiOutlinedInput-root': {
//                           borderRadius: 2,
//                           transition: 'all 0.3s ease',
//                           '&:hover': {
//                             boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.15)}`
//                           },
//                           '&.Mui-focused': {
//                             boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.25)}`
//                           }
//                         }
//                       }}
//                     />
//                   </Grid>
                  
//                   <Grid item xs={12} md={6}>
//                     <TextField
//                       fullWidth
//                       label="ISBN"
//                       name="isbn"
//                       value={formData.isbn}
//                       onChange={handleChange}
//                       required
//                       variant="outlined"
//                       InputProps={{
//                         startAdornment: <Numbers sx={{ color: 'text.secondary', mr: 1 }} />
//                       }}
//                       sx={{
//                         '& .MuiOutlinedInput-root': {
//                           borderRadius: 2,
//                           transition: 'all 0.3s ease',
//                           '&:hover': {
//                             boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.15)}`
//                           },
//                           '&.Mui-focused': {
//                             boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.25)}`
//                           }
//                         }
//                       }}
//                     />
//                   </Grid>
                  
//                   <Grid item xs={12} md={6}>
//                     <FormControl 
//                       fullWidth
//                       sx={{
//                         '& .MuiOutlinedInput-root': {
//                           borderRadius: 2,
//                           transition: 'all 0.3s ease',
//                           '&:hover': {
//                             boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.15)}`
//                           },
//                           '&.Mui-focused': {
//                             boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.25)}`
//                           }
//                         }
//                       }}
//                     >
//                       <InputLabel>Category</InputLabel>
//                       <Select
//                         name="category"
//                         value={formData.category}
//                         onChange={handleChange}
//                         label="Category"
//                         required
//                         startAdornment={<Category sx={{ color: 'text.secondary', mr: 1, ml: 1 }} />}
//                       >
//                         {categories.map(category => (
//                           <MenuItem key={category._id} value={category.name}>
//                             <Stack direction="row" alignItems="center" gap={1}>
//                               <Chip 
//                                 label={category.name} 
//                                 size="small" 
//                                 color="primary" 
//                                 variant="outlined" 
//                               />
//                             </Stack>
//                           </MenuItem>
//                         ))}
//                       </Select>
//                     </FormControl>
//                   </Grid>

//                   {/* Classification Section */}
//                   <Grid item xs={12} sx={{ mt: 3 }}>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
//                       <School sx={{ color: 'secondary.main', fontSize: 28 }} />
//                       <Typography variant="h5" sx={{ fontWeight: 600, color: 'secondary.main' }}>
//                         Classification & Availability
//                       </Typography>
//                     </Box>
//                     <Divider sx={{ mb: 3, bgcolor: alpha(theme.palette.secondary.main, 0.2) }} />
//                   </Grid>
                  
//                   <Grid item xs={12} md={6}>
//                     <FormControl 
//                       fullWidth
//                       sx={{
//                         '& .MuiOutlinedInput-root': {
//                           borderRadius: 2,
//                           transition: 'all 0.3s ease',
//                           '&:hover': {
//                             boxShadow: `0 4px 12px ${alpha(theme.palette.secondary.main, 0.15)}`
//                           },
//                           '&.Mui-focused': {
//                             boxShadow: `0 6px 20px ${alpha(theme.palette.secondary.main, 0.25)}`
//                           }
//                         }
//                       }}
//                     >
//                       <InputLabel>Class</InputLabel>
//                       <Select
//                         name="classId"
//                         value={formData.classId}
//                         onChange={handleChange}
//                         label="Class"
//                         disabled={loadingClasses}
//                         startAdornment={<School sx={{ color: 'text.secondary', mr: 1, ml: 1 }} />}
//                       >
//                         <MenuItem value="">
//                           <Chip 
//                             label="General (All Classes)" 
//                             color="success" 
//                             variant="outlined"
//                             size="small"
//                           />
//                         </MenuItem>
//                         {classes.map(classItem => (
//                           <MenuItem key={classItem._id} value={classItem._id}>
//                             <Chip 
//                               label={`${classItem.name}${classItem.division ? ` - ${classItem.division}` : ''}`}
//                               color="info"
//                               variant="outlined"
//                               size="small"
//                             />
//                           </MenuItem>
//                         ))}
//                       </Select>
//                       {loadingClasses && (
//                         <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 1 }}>
//                           <CircularProgress size={16} color="secondary" />
//                           <Typography variant="caption" color="text.secondary">
//                             Loading classes...
//                           </Typography>
//                         </Box>
//                       )}
//                     </FormControl>
//                     <FormHelperText sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
//                       Leave empty if book is available for all classes
//                     </FormHelperText>
//                   </Grid>
                  
//                   <Grid item xs={12} md={6}>
//                     <TextField
//                       fullWidth
//                       label="Total Copies"
//                       name="totalCopies"
//                       type="number"
//                       value={formData.totalCopies}
//                       onChange={handleChange}
//                       required
//                       inputProps={{ min: 1 }}
//                       InputProps={{
//                         startAdornment: <LibraryBooks sx={{ color: 'text.secondary', mr: 1 }} />
//                       }}
//                       sx={{
//                         '& .MuiOutlinedInput-root': {
//                           borderRadius: 2,
//                           transition: 'all 0.3s ease',
//                           '&:hover': {
//                             boxShadow: `0 4px 12px ${alpha(theme.palette.secondary.main, 0.15)}`
//                           },
//                           '&.Mui-focused': {
//                             boxShadow: `0 6px 20px ${alpha(theme.palette.secondary.main, 0.25)}`
//                           }
//                         }
//                       }}
//                     />
//                   </Grid>

//                   {/* Publication Details Section */}
//                   <Grid item xs={12} sx={{ mt: 3 }}>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
//                       <Business sx={{ color: 'success.main', fontSize: 28 }} />
//                       <Typography variant="h5" sx={{ fontWeight: 600, color: 'success.main' }}>
//                         Publication Details
//                       </Typography>
//                     </Box>
//                     <Divider sx={{ mb: 3, bgcolor: alpha(theme.palette.success.main, 0.2) }} />
//                   </Grid>
                  
//                   <Grid item xs={12} md={6}>
//                     <TextField
//                       fullWidth
//                       label="Publisher"
//                       name="publisher"
//                       value={formData.publisher}
//                       onChange={handleChange}
//                       InputProps={{
//                         startAdornment: <Business sx={{ color: 'text.secondary', mr: 1 }} />
//                       }}
//                       sx={{
//                         '& .MuiOutlinedInput-root': {
//                           borderRadius: 2,
//                           transition: 'all 0.3s ease',
//                           '&:hover': {
//                             boxShadow: `0 4px 12px ${alpha(theme.palette.success.main, 0.15)}`
//                           },
//                           '&.Mui-focused': {
//                             boxShadow: `0 6px 20px ${alpha(theme.palette.success.main, 0.25)}`
//                           }
//                         }
//                       }}
//                     />
//                   </Grid>
                  
//                   <Grid item xs={12} md={6}>
//                     <TextField
//                       fullWidth
//                       label="Publication Year"
//                       name="publicationYear"
//                       type="number"
//                       value={formData.publicationYear}
//                       onChange={handleChange}
//                       inputProps={{ min: 1900, max: new Date().getFullYear() }}
//                       InputProps={{
//                         startAdornment: <CalendarToday sx={{ color: 'text.secondary', mr: 1 }} />
//                       }}
//                       sx={{
//                         '& .MuiOutlinedInput-root': {
//                           borderRadius: 2,
//                           transition: 'all 0.3s ease',
//                           '&:hover': {
//                             boxShadow: `0 4px 12px ${alpha(theme.palette.success.main, 0.15)}`
//                           },
//                           '&.Mui-focused': {
//                             boxShadow: `0 6px 20px ${alpha(theme.palette.success.main, 0.25)}`
//                           }
//                         }
//                       }}
//                     />
//                   </Grid>
                  
//                   <Grid item xs={12} md={6}>
//                     <TextField
//                       fullWidth
//                       label="Language"
//                       name="language"
//                       value={formData.language}
//                       onChange={handleChange}
//                       InputProps={{
//                         startAdornment: <Language sx={{ color: 'text.secondary', mr: 1 }} />
//                       }}
//                       sx={{
//                         '& .MuiOutlinedInput-root': {
//                           borderRadius: 2,
//                           transition: 'all 0.3s ease',
//                           '&:hover': {
//                             boxShadow: `0 4px 12px ${alpha(theme.palette.success.main, 0.15)}`
//                           },
//                           '&.Mui-focused': {
//                             boxShadow: `0 6px 20px ${alpha(theme.palette.success.main, 0.25)}`
//                           }
//                         }
//                       }}
//                     />
//                   </Grid>
                  
//                   <Grid item xs={12}>
//                     <TextField
//                       fullWidth
//                       label="Description"
//                       name="description"
//                       value={formData.description}
//                       onChange={handleChange}
//                       multiline
//                       rows={4}
//                       InputProps={{
//                         startAdornment: (
//                           <Description sx={{ 
//                             color: 'text.secondary', 
//                             mr: 1, 
//                             alignSelf: 'flex-start',
//                             mt: 1
//                           }} />
//                         )
//                       }}
//                       sx={{
//                         '& .MuiOutlinedInput-root': {
//                           borderRadius: 2,
//                           transition: 'all 0.3s ease',
//                           '&:hover': {
//                             boxShadow: `0 4px 12px ${alpha(theme.palette.info.main, 0.15)}`
//                           },
//                           '&.Mui-focused': {
//                             boxShadow: `0 6px 20px ${alpha(theme.palette.info.main, 0.25)}`
//                           }
//                         }
//                       }}
//                     />
//                   </Grid>
                  
//                   {/* Action Buttons */}
//                   <Grid item xs={12} sx={{ mt: 4 }}>
//                     <Divider sx={{ mb: 4 }} />
//                     <Stack 
//                       direction={{ xs: 'column', sm: 'row' }} 
//                       spacing={3} 
//                       justifyContent="flex-end"
//                       alignItems="center"
//                     >
//                       <Button
//                         variant="outlined"
//                         size="large"
//                         startIcon={<Cancel />}
//                         onClick={() => router.push('/library/books')}
//                         sx={{
//                           minWidth: 150,
//                           height: 48,
//                           borderRadius: 3,
//                           borderWidth: 2,
//                           fontWeight: 600,
//                           textTransform: 'none',
//                           fontSize: 16,
//                           '&:hover': {
//                             borderWidth: 2,
//                             transform: 'translateY(-2px)',
//                             boxShadow: `0 8px 24px ${alpha(theme.palette.grey[500], 0.3)}`
//                           },
//                           transition: 'all 0.3s ease'
//                         }}
//                       >
//                         Cancel
//                       </Button>
//                       <Button
//                         type="submit"
//                         variant="contained"
//                         size="large"
//                         startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Save />}
//                         disabled={loading}
//                         sx={{
//                           minWidth: 150,
//                           height: 48,
//                           borderRadius: 3,
//                           fontWeight: 600,
//                           textTransform: 'none',
//                           fontSize: 16,
//                           background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//                           boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
//                           '&:hover': {
//                             background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
//                             transform: 'translateY(-2px)',
//                             boxShadow: `0 12px 32px ${alpha(theme.palette.primary.main, 0.5)}`
//                           },
//                           '&:disabled': {
//                             background: alpha(theme.palette.action.disabled, 0.5),
//                             color: theme.palette.action.disabled
//                           },
//                           transition: 'all 0.3s ease'
//                         }}
//                       >
//                         {loading ? 'Saving Book...' : 'Save Book'}
//                       </Button>
//                     </Stack>
//                   </Grid>
//                 </Grid>
//               </form>
//             </CardContent>
//           </Card>
//         </Fade>
//       </Container>
//     </LibraryLayout>
//   );
// };

// export default AddBook;