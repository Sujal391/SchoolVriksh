// import { useState, useEffect } from 'react';
// import {
//   Box,
//   Typography,
//   TextField,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
//   Button,
//   CircularProgress,
//   Grid,
//   Paper,
//   FormHelperText
// } from '@mui/material';
// import { Save, Cancel } from '@mui/icons-material';
// import { useRouter } from 'next/router';
// import { useAuth } from '../../contexts/AuthContext';
// import libraryService from '../../services/libraryService';

// const BookForm = ({ bookId }) => {
//   const { user } = useAuth();
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [categories, setCategories] = useState([]);
//   const [classes, setClasses] = useState([]);
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
//         const [categoriesData] = await Promise.all([
//           libraryService.getCategories(user.school._id)
//         ]);
//         setCategories(categoriesData);

//         if (bookId) {
//           const bookData = await libraryService.getBookById(bookId);
//           setFormData({
//             bookTitle: bookData.bookTitle,
//             author: bookData.author,
//             isbn: bookData.isbn,
//             category: bookData.category,
//             classId: bookData.class?._id || '',
//             totalCopies: bookData.totalCopies,
//             description: bookData.description,
//             publisher: bookData.publisher,
//             publicationYear: bookData.publicationYear,
//             language: bookData.language,
//             isGeneral: bookData.isGeneral
//           });
//         }
//       } catch (err) {
//         setError('Failed to fetch required data');
//       }
//     };

//     fetchData();
//   }, [bookId, user.school._id]);

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
//       if (bookId) {
//         await libraryService.updateBook(bookId, {
//           ...formData,
//           schoolId: user.school._id
//         });
//       } else {
//         await libraryService.addBook({
//           ...formData,
//           schoolId: user.school._id
//         });
//       }
//       router.push('/library/books');
//     } catch (err) {
//       setError(err.message);
//       setLoading(false);
//     }
//   };

//   return (
//     <Box>
//       <Typography variant="h4" gutterBottom>
//         {bookId ? 'Edit Book' : 'Add New Book'}
//       </Typography>

//       {error && (
//         <Box mb={3}>
//           <Typography color="error">{error}</Typography>
//         </Box>
//       )}

//       <Paper sx={{ p: 3 }}>
//         <form onSubmit={handleSubmit}>
//           <Grid container spacing={3}>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Book Title"
//                 name="bookTitle"
//                 value={formData.bookTitle}
//                 onChange={handleChange}
//                 required
//               />
//             </Grid>
            
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Author"
//                 name="author"
//                 value={formData.author}
//                 onChange={handleChange}
//                 required
//               />
//             </Grid>
            
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="ISBN"
//                 name="isbn"
//                 value={formData.isbn}
//                 onChange={handleChange}
//                 required
//               />
//             </Grid>
            
//             <Grid item xs={12} md={6}>
//               <FormControl fullWidth>
//                 <InputLabel>Category</InputLabel>
//                 <Select
//                   name="category"
//                   value={formData.category}
//                   onChange={handleChange}
//                   label="Category"
//                   required
//                 >
//                   {categories.map(category => (
//                     <MenuItem key={category._id} value={category.name}>
//                       {category.name}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
            
//             <Grid item xs={12} md={6}>
//               <FormControl fullWidth>
//                 <InputLabel>Class</InputLabel>
//                 <Select
//                   name="classId"
//                   value={formData.classId}
//                   onChange={handleChange}
//                   label="Class"
//                 >
//                   <MenuItem value="">General (All Classes)</MenuItem>
//                   {/* Add class options here */}
//                 </Select>
//               </FormControl>
//               <FormHelperText>
//                 Leave empty if book is available for all classes
//               </FormHelperText>
//             </Grid>
            
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Total Copies"
//                 name="totalCopies"
//                 type="number"
//                 value={formData.totalCopies}
//                 onChange={handleChange}
//                 required
//                 inputProps={{ min: 1 }}
//               />
//             </Grid>
            
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Publisher"
//                 name="publisher"
//                 value={formData.publisher}
//                 onChange={handleChange}
//               />
//             </Grid>
            
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Publication Year"
//                 name="publicationYear"
//                 type="number"
//                 value={formData.publicationYear}
//                 onChange={handleChange}
//                 inputProps={{ min: 1900, max: new Date().getFullYear() }}
//               />
//             </Grid>
            
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Language"
//                 name="language"
//                 value={formData.language}
//                 onChange={handleChange}
//               />
//             </Grid>
            
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Description"
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 multiline
//                 rows={4}
//               />
//             </Grid>
            
//             <Grid item xs={12}>
//               <Box display="flex" justifyContent="flex-end" gap={2}>
//                 <Button
//                   variant="outlined"
//                   color="secondary"
//                   startIcon={<Cancel />}
//                   onClick={() => router.push('/library/books')}
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   color="primary"
//                   startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Save />}
//                   disabled={loading}
//                 >
//                   {bookId ? 'Update' : 'Save'} Book
//                 </Button>
//               </Box>
//             </Grid>
//           </Grid>
//         </form>
//       </Paper>
//     </Box>
//   );
// };

// export default BookForm;




import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  CircularProgress,
  Grid,
  Paper,
  FormHelperText
} from '@mui/material';
import { Save, Cancel } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';
import libraryService from '../../services/libraryService';

const BookForm = ({ bookId }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loadingClasses, setLoadingClasses] = useState(false);
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
        setLoadingClasses(true);
        // Fetch categories and classes in parallel
        const [categoriesData, classesData] = await Promise.all([
          libraryService.getCategories(user.school._id),
          libraryService.getClasses(user.school._id)
        ]);
        setCategories(Array.isArray(categoriesData) ? categoriesData : []);
        setClasses(Array.isArray(classesData) ? classesData : []);

        if (bookId) {
          const bookData = await libraryService.getBookById(bookId);
          setFormData({
            bookTitle: bookData.bookTitle || '',
            author: bookData.author || '',
            isbn: bookData.isbn || '',
            category: bookData.category || '',
            classId: bookData.class?._id || '',
            totalCopies: bookData.totalCopies || 1,
            description: bookData.description || '',
            publisher: bookData.publisher || '',
            publicationYear: bookData.publicationYear || new Date().getFullYear(),
            language: bookData.language || 'English',
            isGeneral: bookData.isGeneral !== undefined ? bookData.isGeneral : true
          });
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch required data');
      } finally {
        setLoadingClasses(false);
      }
    };

    fetchData();
  }, [bookId, user.school._id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (bookId) {
        await libraryService.updateBook(bookId, {
          ...formData,
          schoolId: user.school._id
        });
      } else {
        await libraryService.addBook({
          ...formData,
          schoolId: user.school._id
        });
      }
      router.push('/library/books');
    } catch (err) {
      setError(err.message || 'Failed to save book');
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {bookId ? 'Edit Book' : 'Add New Book'}
      </Typography>

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
              <FormControl fullWidth>
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
                  {bookId ? 'Update' : 'Save'} Book
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default BookForm;