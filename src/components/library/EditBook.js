import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Grid,
  CircularProgress,
  Alert,
  Switch,
  FormControlLabel,
  Card,
  CardContent,
  Container,
  Stack,
  Divider,
} from '@mui/material';
import {
  Save,
  Cancel,
  ArrowBack,
  Edit as EditIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';
import libraryService from '../../services/libraryService';
import LibraryLayout from '../../components/layout/LibraryLayout';

const EditBook = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { bookId } = router.query;

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [classes, setClasses] = useState([]);

  // Form state
  const [formData, setFormData] = useState({
    bookTitle: '',
    author: '',
    isbn: '',
    category: '',
    classId: '',
    totalCopies: 1,
    description: '',
    publisher: '',
    publicationYear: '',
    language: 'English',
    isGeneral: false,
    status: 'available'
  });

  const [formErrors, setFormErrors] = useState({});

  // Check permissions
  const canManageLibrary = user?.permissions?.canManageLibrary || false;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        

        // Fetch book data and categories/classes in parallel
        const [bookData, categoriesData, classesData] = await Promise.all([
          libraryService.getBookById(bookId),
          libraryService.getCategories(),
          libraryService.getClasses(),
        ]);

        setBook(bookData);
        setCategories(Array.isArray(categoriesData) ? categoriesData : []);
        setClasses(Array.isArray(classesData) ? classesData : []);

        // Populate form with existing book data
        setFormData({
          bookTitle: bookData.bookTitle || '',
          author: bookData.author || '',
          isbn: bookData.isbn || '',
          category: bookData.category || '',
          classId: bookData.class?._id || '',
          totalCopies: bookData.totalCopies || 1,
          description: bookData.description || '',
          publisher: bookData.publisher || '',
          publicationYear: bookData.publicationYear || '',
          language: bookData.language || 'English',
          isGeneral: bookData.isGeneral || false,
          status: bookData.status || 'available'
        });

      } catch (err) {
        console.error('Error fetching data:', err);
        if (err.message.includes('404') || err.message.includes('not found')) {
          setError('Book not found. It may have been deleted or does not exist.');
        } else {
          setError(err.message || 'Failed to fetch book details');
        }
      } finally {
        setLoading(false);
      }
    };

    if (bookId && user?.school?._id) {
      fetchData();
    } else if (!user?.school?._id) {
      setError('User or school information is missing.');
      setLoading(false);
    }
  }, [bookId, user?.school?._id, canManageLibrary]);

  const validateForm = () => {
    const errors = {};

    if (!formData.bookTitle.trim()) {
      errors.bookTitle = 'Book title is required';
    }

    if (!formData.author.trim()) {
      errors.author = 'Author is required';
    }

    if (!formData.isbn.trim()) {
      errors.isbn = 'ISBN is required';
    }

    if (!formData.category.trim()) {
      errors.category = 'Category is required';
    }

    if (formData.totalCopies < 1) {
      errors.totalCopies = 'Total copies must be at least 1';
    }

    // Check if total copies is being reduced below currently issued copies
    if (book && formData.totalCopies < (book.totalCopies - book.availableCopies)) {
      errors.totalCopies = 'Cannot reduce total copies below currently issued copies';
    }

    if (formData.publicationYear && (formData.publicationYear < 1000 || formData.publicationYear > new Date().getFullYear())) {
      errors.publicationYear = 'Please enter a valid publication year';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error for this field when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setError('Please fix the validation errors below');
      return;
    }

    try {
      setSaving(true);
      setError(null);

      const updateData = {
        ...formData,
        // Convert string numbers to actual numbers
        totalCopies: parseInt(formData.totalCopies),
        publicationYear: formData.publicationYear ? parseInt(formData.publicationYear) : null,
      };

      const updatedBook = await libraryService.updateBook(bookId, updateData);
      
      setSuccessMessage('Book updated successfully!');
      
      // Redirect to book details after a short delay
      setTimeout(() => {
        router.push(`/library/books/${bookId}`);
      }, 1500);

    } catch (err) {
      console.error('Error updating book:', err);
      setError(err.message || 'Failed to update book');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    router.push(`/library/books/${bookId}`);
  };

  if (loading) {
    return (
      <LibraryLayout>
        <Container maxWidth="md">
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="60vh" gap={2}>
            <CircularProgress size={48} />
            <Typography variant="h6" color="text.secondary">
              Loading book details...
            </Typography>
          </Box>
        </Container>
      </LibraryLayout>
    );
  }

  if (error && !book) {
    return (
      <LibraryLayout>
        <Container maxWidth="md">
          <Box mb={3}>
            <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>
            <Button
              variant="contained"
              startIcon={<ArrowBack />}
              onClick={() => router.push('/library/books')}
              sx={{ borderRadius: 2 }}
            >
              Back to Books
            </Button>
          </Box>
        </Container>
      </LibraryLayout>
    );
  }

  return (
    <LibraryLayout>
      <Container maxWidth="md">
        {/* Header */}
        <Paper 
          elevation={0}
          sx={{ 
            p: 3, 
            mb: 3, 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            borderRadius: 3
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Stack direction="row" spacing={2} alignItems="center">
              <EditIcon />
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                Edit Book
              </Typography>
            </Stack>
            <Button
              variant="outlined"
              startIcon={<ArrowBack />}
              onClick={() => router.push(`/library/books/${bookId}`)}
              sx={{ 
                color: 'white', 
                borderColor: 'white',
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
              }}
            >
              Back to Details
            </Button>
          </Box>
        </Paper>

        {/* Success Message */}
        {successMessage && (
          <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
            {successMessage}
          </Alert>
        )}

        {/* Error Message */}
        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        {/* Edit Form */}
        <Card elevation={3} sx={{ borderRadius: 3 }}>
          <CardContent sx={{ p: 4 }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                {/* Basic Information */}
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'primary.main' }}>
                    Basic Information
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    label="Book Title"
                    variant="outlined"
                    fullWidth
                    required
                    value={formData.bookTitle}
                    onChange={handleInputChange('bookTitle')}
                    error={!!formErrors.bookTitle}
                    helperText={formErrors.bookTitle}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    label="Author"
                    variant="outlined"
                    fullWidth
                    required
                    value={formData.author}
                    onChange={handleInputChange('author')}
                    error={!!formErrors.author}
                    helperText={formErrors.author}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    label="ISBN"
                    variant="outlined"
                    fullWidth
                    required
                    value={formData.isbn}
                    onChange={handleInputChange('isbn')}
                    error={!!formErrors.isbn}
                    helperText={formErrors.isbn}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth required error={!!formErrors.category}>
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={formData.category}
                      onChange={handleInputChange('category')}
                      label="Category"
                      sx={{ borderRadius: 2 }}
                    >
                      {categories.map((category) => (
                        <MenuItem key={category._id} value={category.name}>
                          {category.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {formErrors.category && (
                      <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                        {formErrors.category}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>

                {/* Classification */}
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mb: 2, mt: 2, fontWeight: 600, color: 'primary.main' }}>
                    Classification
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.isGeneral}
                        onChange={handleInputChange('isGeneral')}
                        color="primary"
                      />
                    }
                    label="General Book (Available to all classes)"
                    sx={{ mb: 2 }}
                  />
                </Grid>

                {!formData.isGeneral && (
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel>Specific Class</InputLabel>
                      <Select
                        value={formData.classId}
                        onChange={handleInputChange('classId')}
                        label="Specific Class"
                        sx={{ borderRadius: 2 }}
                      >
                        <MenuItem value="">Select Class</MenuItem>
                        {classes.map((classItem) => (
                          <MenuItem key={classItem._id} value={classItem._id}>
                            {classItem.name} {classItem.division ? `- ${classItem.division}` : ''}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                )}

                {/* Publication Details */}
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mb: 2, mt: 2, fontWeight: 600, color: 'primary.main' }}>
                    Publication Details
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    label="Publisher"
                    variant="outlined"
                    fullWidth
                    value={formData.publisher}
                    onChange={handleInputChange('publisher')}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    label="Publication Year"
                    variant="outlined"
                    fullWidth
                    type="number"
                    value={formData.publicationYear}
                    onChange={handleInputChange('publicationYear')}
                    error={!!formErrors.publicationYear}
                    helperText={formErrors.publicationYear}
                    inputProps={{ min: 1000, max: new Date().getFullYear() }}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Language</InputLabel>
                    <Select
                      value={formData.language}
                      onChange={handleInputChange('language')}
                      label="Language"
                      sx={{ borderRadius: 2 }}
                    >
                      <MenuItem value="English">English</MenuItem>
                      <MenuItem value="Hindi">Hindi</MenuItem>
                      <MenuItem value="Spanish">Spanish</MenuItem>
                      <MenuItem value="French">French</MenuItem>
                      <MenuItem value="German">German</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={formData.status}
                      onChange={handleInputChange('status')}
                      label="Status"
                      sx={{ borderRadius: 2 }}
                    >
                      <MenuItem value="available">Available</MenuItem>
                      <MenuItem value="unavailable">Unavailable</MenuItem>
                      <MenuItem value="damaged">Damaged</MenuItem>
                      <MenuItem value="lost">Lost</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {/* Inventory */}
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mb: 2, mt: 2, fontWeight: 600, color: 'primary.main' }}>
                    Inventory
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    label="Total Copies"
                    variant="outlined"
                    fullWidth
                    required
                    type="number"
                    value={formData.totalCopies}
                    onChange={handleInputChange('totalCopies')}
                    error={!!formErrors.totalCopies}
                    helperText={formErrors.totalCopies || `Currently ${book?.totalCopies - book?.availableCopies || 0} copies are issued`}
                    inputProps={{ min: 1 }}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box sx={{ p: 2, backgroundColor: 'grey.50', borderRadius: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Copy Status
                    </Typography>
                    <Typography variant="body2">
                      <strong>Available:</strong> {book?.availableCopies || 0}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Issued:</strong> {(book?.totalCopies - book?.availableCopies) || 0}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Total:</strong> {book?.totalCopies || 0}
                    </Typography>
                  </Box>
                </Grid>

                {/* Description */}
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mb: 2, mt: 2, fontWeight: 600, color: 'primary.main' }}>
                    Description
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange('description')}
                    placeholder="Enter a brief description of the book..."
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                  />
                </Grid>

                {/* Action Buttons */}
                <Grid item xs={12}>
                  <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid', borderColor: 'divider' }}>
                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                      <Button
                        variant="outlined"
                        startIcon={<Cancel />}
                        onClick={handleCancel}
                        disabled={saving}
                        sx={{ 
                          borderRadius: 2,
                          textTransform: 'none',
                          fontWeight: 600,
                          minWidth: 120
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        startIcon={saving ? <CircularProgress size={16} /> : <Save />}
                        disabled={saving}
                        sx={{ 
                          borderRadius: 2,
                          textTransform: 'none',
                          fontWeight: 600,
                          minWidth: 120,
                          boxShadow: 4,
                          '&:hover': {
                            boxShadow: 8,
                            transform: 'translateY(-2px)',
                          }
                        }}
                      >
                        {saving ? 'Updating...' : 'Update Book'}
                      </Button>
                    </Stack>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Container>
    </LibraryLayout>
  );
};

export default EditBook;