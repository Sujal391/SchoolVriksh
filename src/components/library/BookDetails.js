import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Button,
  Avatar,
  Chip,
  Divider,
  Grid,
  Paper,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Stack,
  Fade,
} from '@mui/material';
import {
  Edit,
  Delete,
  ArrowBack,
  Bookmark,
  BookmarkBorder,
  CloudUpload,
  CheckCircle,
  Cancel,
  MenuBook,
  Person,
  Business,
  CalendarToday,
  Category,
  School,
  Language,
  Inventory,
  CheckCircleOutline,
} from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';
import libraryService from '../../services/libraryService';
import LibraryLayout from '../../components/layout/LibraryLayout';

const BookDetails = ({ bookId }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const fileInputRef = useRef(null);

  // Check if user has library management permissions
  const canManageLibrary = user?.permissions?.canManageLibrary || false;

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await libraryService.getBookById(bookId);
        setBook(data);
      } catch (err) {
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
      fetchBook();
    } else if (!user?.school?._id) {
      setError('User or school information is missing.');
      setLoading(false);
    }
  }, [bookId, user?.school?._id]);

  const validateImageFile = (file) => {
    return new Promise((resolve, reject) => {
      // Check file type
      if (!file.type.startsWith('image/')) {
        reject(new Error('Please select a valid image file'));
        return;
      }

      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        reject(new Error('Image size must be less than 5MB'));
        return;
      }

      // Check image dimensions
      const img = new Image();
      img.src = URL.createObjectURL(file);
      
      img.onload = () => {
        // Clean up the object URL
        URL.revokeObjectURL(img.src);
        
        if (img.width < 200 || img.height < 200) {
          reject(new Error('Image dimensions must be at least 200x200 pixels'));
        } else {
          resolve(true);
        }
      };
      
      img.onerror = () => {
        URL.revokeObjectURL(img.src);
        reject(new Error('Invalid image file'));
      };
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      setCoverFile(null);
      setError(null);
      return;
    }

    try {
      await validateImageFile(file);
      setCoverFile(file);
      setError(null);
      console.log('File selected successfully:', file.name);
    } catch (validationError) {
      console.error('File validation error:', validationError.message);
      setError(validationError.message);
      setCoverFile(null);
      // Clear the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleCoverUpload = async () => {
    if (!coverFile ) {
      console.log('Upload conditions not met:', { coverFile: !!coverFile });
      return;
    }

    try {
      setUploading(true);
      setError(null);
      
      console.log('Starting cover upload for bookId:', bookId, 'file:', coverFile.name);
      
      const coverUrl = await libraryService.uploadBookCover(bookId, coverFile);
      
      console.log('Upload successful, coverUrl:', coverUrl);
      
      // Update the book state with new cover URL
      setBook((prev) => ({ ...prev, coverImage: coverUrl }));
      setSuccessMessage('Book cover uploaded successfully');
      setCoverFile(null);
      
      // Clear the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.message || 'Failed to upload cover');
    } finally {
      setUploading(false);
    }
  };

  const handleCancelUpload = () => {
    setCoverFile(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDelete = async () => {
    try {
      await libraryService.deleteBook(bookId);
      router.push('/library/books');
    } catch (err) {
      setError(err.message || 'Failed to delete book');
    }
  };

  const handleUploadClick = () => {
    console.log('Upload button clicked');
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'success';
      case 'issued':
        return 'warning';
      case 'damaged':
        return 'error';
      default:
        return 'default';
    }
  };

  const InfoRow = ({ icon, label, value }) => (
    <Box display="flex" alignItems="center" py={1}>
      <Box
        sx={{
          minWidth: 32,
          height: 32,
          borderRadius: 1,
          backgroundColor: 'primary.main',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mr: 2,
        }}
      >
        {icon}
      </Box>
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
          {label}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary' }}>
          {value}
        </Typography>
      </Box>
    </Box>
  );

  if (loading) {
    return (
      <LibraryLayout>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="60vh" gap={2}>
          <CircularProgress size={48} />
          <Typography variant="h6" color="text.secondary">
            Loading book details...
          </Typography>
        </Box>
      </LibraryLayout>
    );
  }

  if (error && !book) {
    return (
      <LibraryLayout>
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
      </LibraryLayout>
    );
  }

  if (!book) {
    return (
      <LibraryLayout>
        <Box mb={3}>
          <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>Book data is unavailable.</Alert>
          <Button
            variant="contained"
            startIcon={<ArrowBack />}
            onClick={() => router.push('/library/books')}
            sx={{ borderRadius: 2 }}
          >
            Back to Books
          </Button>
        </Box>
      </LibraryLayout>
    );
  }

  return (
    <LibraryLayout>
      <Box sx={{ maxHeight: '100vh', overflow: 'hidden' }}>
        {/* Compact Header */}
        <Paper 
          elevation={0}
          sx={{ 
            p: 2, 
            mb: 2, 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            borderRadius: 2
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Button
              variant="outlined"
              size="small"
              startIcon={<ArrowBack />}
              onClick={() => router.push('/library/books')}
              sx={{ 
                color: 'white', 
                borderColor: 'white',
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
              }}
            >
              Back
            </Button>
            <Stack direction="row" spacing={1}>
              <Tooltip title="Edit Book">
                <IconButton
                  size="small"
                  onClick={() => router.push(`/library/books/${bookId}/edit`)}
                  disabled={!canManageLibrary}
                  sx={{ 
                    color: 'white',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }
                  }}
                >
                  <Edit fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete Book">
                <IconButton
                  size="small"
                  onClick={() => setDeleteDialogOpen(true)}
                  disabled={!canManageLibrary}
                  sx={{ 
                    color: 'white',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }
                  }}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </Tooltip>
            </Stack>
          </Box>
        </Paper>

        {/* Error Alert */}
        {error && (
          <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 2, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        {/* Success Snackbar */}
        <Snackbar
          open={!!successMessage}
          autoHideDuration={4000}
          onClose={() => setSuccessMessage(null)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert severity="success" onClose={() => setSuccessMessage(null)} sx={{ borderRadius: 2 }}>
            {successMessage}
          </Alert>
        </Snackbar>

        {/* Main Content - Single Row Layout */}
        <Card elevation={3} sx={{ borderRadius: 2, height: 'calc(100vh - 180px)', overflow: 'hidden' }}>
          <CardContent sx={{ p: 0, height: '100%', '&:last-child': { pb: 0 } }}>
            <Grid container sx={{ height: '100%' }}>
              {/* Left Side - Book Cover */}
              <Grid item xs={12} sm={4} md={3}>
                <Box 
                  sx={{ 
                    height: '100%',
                    background: 'linear-gradient(135deg, #f8f9ff 0%, #e8eaff 100%)',
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderRight: { sm: '1px solid', borderColor: 'divider' }
                  }}
                >
                  {/* Book Cover Image */}
                  <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', mb: 2 }}>
                    {book.coverImage ? (
                      <Avatar
                        src={book.coverImage}
                        variant="rounded"
                        sx={{ 
                          width: '100%', 
                          maxWidth: 200,
                          height: 280,
                          borderRadius: 2,
                          boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
                        }}
                        alt={`Cover of ${book.bookTitle}`}
                      />
                    ) : (
                      <Avatar
                        variant="rounded"
                        sx={{
                          width: '100%',
                          maxWidth: 200,
                          height: 280,
                          backgroundColor: 'grey.100',
                          borderRadius: 2,
                          border: '2px dashed',
                          borderColor: 'grey.300',
                          fontSize: 48,
                          color: 'grey.400'
                        }}
                      >
                        <MenuBook fontSize="inherit" />
                      </Avatar>
                    )}
                  </Box>

                  {/* Upload Controls */}
                  <Box sx={{ width: '100%', maxWidth: 200 }}>
                    <input
                      accept="image/*"
                      style={{ display: 'none' }}
                      id="cover-upload"
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                    />

                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<CloudUpload />}
                      fullWidth
                      onClick={handleUploadClick}
                      disabled={uploading}
                      sx={{ mb: 5, borderRadius: 1 }}
                    >
                      Upload Cover
                    </Button>

                    {coverFile && (
                      <Fade in={true}>
                        <Box sx={{ mb: 5 }}>
                          <Typography variant="caption" sx={{ display: 'block', mb: 1, textAlign: 'center' }}>
                            📎 {coverFile.name.length > 20 ? coverFile.name.substring(0, 20) + '...' : coverFile.name}
                          </Typography>
                          <Stack direction="row" spacing={0.5}>
                            <Button
                              variant="contained"
                              color="success"
                              size="small"
                              startIcon={uploading ? <CircularProgress size={12} /> : <CheckCircle />}
                              onClick={handleCoverUpload}
                              disabled={uploading}
                              fullWidth
                              sx={{ fontSize: '0.7rem' }}
                            >
                              OK
                            </Button>
                            <Button
                              variant="outlined"
                              color="error"
                              size="small"
                              startIcon={<Cancel />}
                              onClick={handleCancelUpload}
                              fullWidth
                              disabled={uploading}
                              sx={{ fontSize: '0.7rem' }}
                            >
                              Cancel
                            </Button>
                          </Stack>
                        </Box>
                      </Fade>
                    )}
                  </Box>
                </Box>
              </Grid>

              {/* Right Side - Book Details */}
              <Grid item xs={12} sm={8} md={9}>
                <Box sx={{ height: '100%', overflow: 'auto', p: 3 }}>
                  {/* Title and Status */}
                  <Box mb={3}>
                    <Typography 
                      variant="h4" 
                      sx={{ 
                        fontWeight: 700,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        mb: 2,
                        fontSize: { xs: '1.5rem', md: '2rem' }
                      }}
                    >
                      {book.bookTitle}
                    </Typography>

                    <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" mb={2}>
                      <Chip
                        label={book.status}
                        color={getStatusColor(book.status)}
                        size="small"
                        icon={<CheckCircleOutline />}
                        sx={{ fontWeight: 600, textTransform: 'capitalize' }}
                      />
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          backgroundColor: 'grey.100',
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 1,
                          fontWeight: 500,
                          fontSize: '0.75rem'
                        }}
                      >
                        ISBN: {book.isbn}
                      </Typography>
                    </Stack>
                  </Box>

                  {/* Book Details in Compact Rows */}
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Paper variant="outlined" sx={{p: 2, borderRadius: 2, height: '100%' }}>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, fontSize: '1rem' }}>
                          Book Information
                        </Typography>
                        <InfoRow icon={<Person fontSize="small" />} label="Author" value={book.author} />
                        <InfoRow icon={<Business fontSize="small" />} label="Publisher" value={book.publisher || 'N/A'} />
                        <InfoRow icon={<CalendarToday fontSize="small" />} label="Year" value={book.publicationYear || 'N/A'} />
                        <InfoRow icon={<Category fontSize="small" />} label="Category" value={book.category || 'N/A'} />
                        <InfoRow icon={<School fontSize="small" />} label="Class" value={book.class?.name || 'General'} />
                        <InfoRow icon={<Language fontSize="small" />} label="Language" value={book.language || 'English'} />
                      </Paper>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, height: '100%' }}>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, fontSize: '1rem' }}>
                          Availability
                        </Typography>
                        <InfoRow icon={<Inventory fontSize="small" />} label="Total Copies" value={book.totalCopies} />
                        <InfoRow icon={<CheckCircleOutline fontSize="small" />} label="Available" value={book.availableCopies} />
                        
                        {/* Progress Bar for Availability */}
                        <Box sx={{ mt: 2 }}>
                          <Typography variant="caption" color="text.secondary">
                            Availability Rate
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                            <Box sx={{ width: '100%', mr: 1 }}>
                              <Box
                                sx={{
                                  height: 8,
                                  borderRadius: 4,
                                  backgroundColor: 'grey.200',
                                  overflow: 'hidden'
                                }}
                              >
                                <Box
                                  sx={{
                                    width: `${(book.availableCopies / book.totalCopies) * 100}%`,
                                    height: '100%',
                                    backgroundColor: book.availableCopies > 0 ? 'success.main' : 'error.main',
                                    transition: 'width 0.3s ease'
                                  }}
                                />
                              </Box>
                            </Box>
                            <Typography variant="caption" sx={{ minWidth: 40 }}>
                              {Math.round((book.availableCopies / book.totalCopies) * 100)}%
                            </Typography>
                          </Box>
                        </Box>
                      </Paper>
                    </Grid>

                    {/* Description */}
                    <Grid item xs={12}>
                      <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                        <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: 1 }}>
                          <MenuBook color="primary" fontSize="small" />
                          Description
                        </Typography>
                        <Typography variant="body2" sx={{ lineHeight: 1.5, color: 'text.secondary' }}>
                          {book.description || 'No description available'}
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Delete confirmation dialog */}
        <Dialog 
          open={deleteDialogOpen} 
          onClose={() => setDeleteDialogOpen(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{ sx: { borderRadius: 2 } }}
        >
          <DialogTitle>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Delete Book
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Alert severity="warning" sx={{ mb: 2, borderRadius: 1 }}>
              Are you sure you want to delete "{book?.bookTitle}"? This action cannot be undone.
            </Alert>
            {book?.availableCopies < book?.totalCopies && (
              <Alert severity="error" sx={{ borderRadius: 1 }}>
                Warning: This book has issued copies that must be returned first.
              </Alert>
            )}
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setDeleteDialogOpen(false)} variant="outlined" sx={{ borderRadius: 1 }}>
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              color="error"
              variant="contained"
              disabled={book?.availableCopies < book?.totalCopies || !canManageLibrary}
              sx={{ borderRadius: 1 }}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </LibraryLayout>
  );
};

export default BookDetails;


