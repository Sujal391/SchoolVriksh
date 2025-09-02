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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  IconButton,
  Tooltip,
  CircularProgress,
  Pagination,
  Grid,
  Card,
  CardContent,
  CardActions,
  useTheme,
  useMediaQuery,
  Fade,
  Stack,
  Container,
} from '@mui/material';
import { Add, Search, Edit, Delete, Visibility, ImportExport, FilterList, Close as CloseIcon } from '@mui/icons-material';
import { useRouter } from 'next/router';
import LibraryLayout from '../../../components/layout/LibraryLayout';
import { useAuth } from '../../../contexts/AuthContext';
import libraryService from '../../../services/libraryService';
import useDebounce from '../../../hooks/useDebounce';

const BookList = () => {
  const { user } = useAuth();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [classFilter, setClassFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [categories, setCategories] = useState([]);
  const [classes, setClasses] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

    const debouncedSearch = useDebounce(searchQuery, 500);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const filters = {
          query: debouncedSearch,
          category: categoryFilter,
          classId: classFilter,
          status: statusFilter,
          page,
          schoolId: user.school._id,
        };

        // Fetch books data using search or getAllBooks based on query
        const booksResponse = debouncedSearch
          ? await libraryService.searchBooks(debouncedSearch, filters)
          : await libraryService.getAllBooks(filters);

        // Fetch categories and classes in parallel
        const [categoriesData, classesData] = await Promise.all([
          libraryService.getCategories(),
          libraryService.getClasses(),
        ]);

        // Safely set the data with fallbacks
        setBooks(booksResponse?.books || booksResponse || []);
        setTotalPages(booksResponse?.totalPages || 1);
        setCategories(Array.isArray(categoriesData) ? categoriesData : []);
        setClasses(Array.isArray(classesData) ? classesData : []);

        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
        setLoading(false);
        setCategories([]);
        setClasses([]);
        setBooks([]);
      }
    };

    if (user?.school?._id) {
      fetchData();
    }
  }, [debouncedSearch, categoryFilter, classFilter, statusFilter, page, user?.school?._id]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
    setPage(1);
  };

  const handleClassChange = (e) => {
    setClassFilter(e.target.value);
    setPage(1);
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    setPage(1);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleDelete = async (bookId) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await libraryService.deleteBook(bookId);
        setBooks(books.filter((book) => book._id !== bookId));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  // Auto-remove error after 10s
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 10000);
      return () => clearTimeout(timer);
    }
  }, [error, setError]);

  // Mobile Card View Component
  const BookCard = ({ book }) => (
    <Fade in timeout={300}>
      <Card 
        sx={{ 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: theme.shadows[8],
          },
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          <Typography 
            variant="h6" 
            component="h3" 
            gutterBottom 
            sx={{ 
              fontWeight: 600,
              color: theme.palette.primary.main,
              lineHeight: 1.3,
              mb: 2 
            }}
          >
            {book.bookTitle}
          </Typography>
          
          <Stack spacing={1.5}>
            <Box display="flex" alignItems="center">
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, minWidth: 60 }}>
                Author:
              </Typography>
              <Typography variant="body2" sx={{ ml: 1 }}>
                {book.author}
              </Typography>
            </Box>
            
            <Box display="flex" alignItems="center">
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, minWidth: 60 }}>
                ISBN:
              </Typography>
              <Typography variant="body2" sx={{ ml: 1, fontFamily: 'monospace' }}>
                {book.isbn}
              </Typography>
            </Box>
            
            <Box display="flex" alignItems="center">
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, minWidth: 60 }}>
                Category:
              </Typography>
              <Chip 
                label={book.category} 
                size="small" 
                variant="outlined"
                sx={{ ml: 1, fontSize: '0.75rem' }}
              />
            </Box>
            
            <Box display="flex" alignItems="center">
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, minWidth: 60 }}>
                Class:
              </Typography>
              <Typography variant="body2" sx={{ ml: 1 }}>
                {book.class?.name || 'General'}
              </Typography>
            </Box>
            
            <Box display="flex" alignItems="center">
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, minWidth: 60 }}>
                Copies:
              </Typography>
              <Typography variant="body2" sx={{ ml: 1, fontWeight: 600 }}>
                {book.availableCopies || 0}/{book.totalCopies || 0}
              </Typography>
            </Box>
            
            <Box display="flex" alignItems="center">
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, minWidth: 60 }}>
                Status:
              </Typography>
              <Chip
                label={book.status || 'unknown'}
                color={
                  book.status === 'available' ? 'success' :
                  book.status === 'unavailable' ? 'error' : 'default'
                }
                size="small"
                sx={{ ml: 1, fontSize: '0.75rem', fontWeight: 500 }}
              />
            </Box>
          </Stack>
        </CardContent>
        
        <CardActions sx={{ p: 2, pt: 0, justifyContent: 'space-between' }}>
          <Box>
            <Tooltip title="View Details">
              <IconButton 
                onClick={() => router.push(`/library/books/${book._id}`)}
                sx={{ 
                  color: theme.palette.info.main,
                  '&:hover': { backgroundColor: theme.palette.info.light + '20' }
                }}
              >
                <Visibility />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit">
              <IconButton 
                onClick={() => router.push(`/library/books/${book._id}/edit`)}
                sx={{ 
                  color: theme.palette.primary.main,
                  '&:hover': { backgroundColor: theme.palette.primary.light + '20' }
                }}
              >
                <Edit />
              </IconButton>
            </Tooltip>
          </Box>
          <Tooltip title="Delete">
            <IconButton 
              onClick={() => handleDelete(book._id)}
              sx={{ 
                color: theme.palette.error.main,
                '&:hover': { backgroundColor: theme.palette.error.light + '20' }
              }}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    </Fade>
  );

  if (loading) {
    return (
      <LibraryLayout>
        <Container maxWidth="xl">
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
            <CircularProgress size={50} thickness={4} />
          </Box>
        </Container>
      </LibraryLayout>
    );
  }

  return (
    <LibraryLayout>
      <Container maxWidth="xl">
        {/* Header Section */}
        <Box 
          display="flex" 
          flexDirection={isMobile ? 'column' : 'row'}
          justifyContent="space-between" 
          alignItems={isMobile ? 'stretch' : 'center'} 
          mt={5}
          mb={4}
          gap={2}
        >
          <Typography 
            variant={isMobile ? "h5" : "h4"} 
            sx={{ 
              fontWeight: 700,
              color: theme.palette.primary.main,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Book Management
          </Typography>
          
          <Stack 
            direction={isMobile ? 'column' : 'row'} 
            spacing={2}
            sx={{ width: isMobile ? '100%' : 'auto' }}
          >
            <Button
              variant="contained"
              color="primary"
              startIcon={<Add />}
              onClick={() => router.push('/library/books/add')}
              fullWidth={isMobile}
              sx={{ 
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                boxShadow: theme.shadows[4],
                '&:hover': {
                  boxShadow: theme.shadows[8],
                  transform: 'translateY(-2px)',
                }
              }}
            >
              Add Book
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<ImportExport />}
              onClick={() => router.push('/library/books/bulk-import')}
              fullWidth={isMobile}
              sx={{ 
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                  transform: 'translateY(-2px)',
                }
              }}
            >
              Bulk Import
            </Button>
          </Stack>
        </Box>

        {/* Error Message */}
        {error && (
          <Fade in>
            <Paper 
              sx={{ 
                p: 3, 
                mb: 3, 
                backgroundColor: theme.palette.error.light + '10',
                border: `1px solid ${theme.palette.error.light}`,
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography color="error" variant="body1" sx={{ fontWeight: 500 }}>
                {error}
              </Typography>
              <IconButton
                size="small"
                onClick={() => setError(null)}
                aria-label="close"
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Paper>
          </Fade>
        )}

        {/* Filters Section */}
        <Paper 
          elevation={2}
          sx={{ 
            p: 3, 
            mb: 4, 
            borderRadius: 3,
            background: `linear-gradient(135deg, ${theme.palette.background.paper}, ${theme.palette.grey[50]})`,
          }}
        >
          <Box display="flex" alignItems="center" mb={2}>
            <FilterList sx={{ mr: 1, color: theme.palette.primary.main }} />
            <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
              Search & Filters
            </Typography>
          </Box>
          
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Search Books"
                variant="outlined"
                size="small"
                value={searchQuery}
                onChange={handleSearch}
                fullWidth
                InputProps={{
                  startAdornment: <Search color="action" sx={{ mr: 1 }} />,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      boxShadow: theme.shadows[2],
                    },
                    '&.Mui-focused': {
                      boxShadow: theme.shadows[4],
                    }
                  }
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl size="small" fullWidth sx={{ minWidth: 110 }}>
                <InputLabel>Category</InputLabel>
                <Select 
                  value={categoryFilter}
                  onChange={handleCategoryChange} 
                  label="Category"
                  sx={{
                    borderRadius: 2,
                    '&:hover': {
                      boxShadow: theme.shadows[2],
                    }
                  }}
                >
                  <MenuItem value="">All Categories</MenuItem>
                  {categories && categories.length > 0 && categories.map((category) => (
                    <MenuItem key={category._id} value={category.name}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl size="small" fullWidth sx={{ minWidth: 110 }}>
                <InputLabel>Class</InputLabel>
                <Select 
                  value={classFilter} 
                  onChange={handleClassChange} 
                  label="Class"
                  sx={{
                    borderRadius: 2,
                    '&:hover': {
                      boxShadow: theme.shadows[2],
                    }
                  }}
                >
                  <MenuItem value="">All Classes</MenuItem>
                  {classes && classes.length > 0 && classes.map((classItem) => (
                    <MenuItem key={classItem._id} value={classItem._id}>
                      {classItem.name} {classItem.division ? `- ${classItem.division}` : ''}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl size="small" fullWidth sx={{ minWidth: 110 }}>
                <InputLabel>Status</InputLabel>
                <Select 
                  value={statusFilter} 
                  onChange={handleStatusChange} 
                  label="Status"
                  sx={{
                    borderRadius: 2,
                    '&:hover': {
                      boxShadow: theme.shadows[2],
                    }
                  }}
                >
                  <MenuItem value="">All Statuses</MenuItem>
                  <MenuItem value="available">Available</MenuItem>
                  <MenuItem value="unavailable">Unavailable</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>

        {/* Books Display */}
        {isMobile || isTablet ? (
          // Card View for Mobile/Tablet
          <Grid container spacing={3}>
            {!books || books.length === 0 ? (
              <Grid item xs={12}>
                <Paper 
                  sx={{ 
                    p: 6, 
                    textAlign: 'center',
                    borderRadius: 3,
                    background: `linear-gradient(135deg, ${theme.palette.grey[50]}, ${theme.palette.background.paper})`,
                  }}
                >
                  <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500 }}>
                    No books found
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Try adjusting your search criteria or add some books to get started
                  </Typography>
                </Paper>
              </Grid>
            ) : (
              books.map((book) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={book._id}>
                  <BookCard book={book} />
                </Grid>
              ))
            )}
          </Grid>
        ) : (
          // Table View for Desktop
          <Paper 
            elevation={3}
            sx={{ 
              borderRadius: 3,
              overflow: 'hidden',
              background: theme.palette.background.paper,
            }}
          >
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow 
                    sx={{ 
                      backgroundColor: theme.palette.primary.main + '08',
                      '& .MuiTableCell-head': {
                        fontWeight: 700,
                        fontSize: '0.95rem',
                        color: theme.palette.primary.main,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }
                    }}
                  >
                    <TableCell>Title</TableCell>
                    <TableCell>Author</TableCell>
                    <TableCell>ISBN</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Class</TableCell>
                    <TableCell>Copies</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!books || books.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} align="center" sx={{ py: 6 }}>
                        <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500 }}>
                          No books found
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          Try adjusting your search criteria or add some books to get started
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    books.map((book, index) => (
                      <Fade in timeout={300 + (index * 50)} key={book._id}>
                        <TableRow 
                          sx={{ 
                            '&:hover': { 
                              backgroundColor: theme.palette.action.hover,
                              transform: 'scale(1.002)',
                            },
                            transition: 'all 0.2s ease-in-out',
                          }}
                        >
                          <TableCell sx={{ fontWeight: 600 }}>{book.bookTitle}</TableCell>
                          <TableCell>{book.author}</TableCell>
                          <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>
                            {book.isbn}
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={book.category} 
                              size="small" 
                              variant="outlined"
                              sx={{ fontSize: '0.75rem' }}
                            />
                          </TableCell>
                          <TableCell>{book.class?.name || 'General'}</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>
                            {book.availableCopies || 0}/{book.totalCopies || 0}
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={book.status || 'unknown'}
                              color={
                                book.status === 'available' ? 'success' :
                                book.status === 'unavailable' ? 'error' : 'default'
                              }
                              size="small"
                              sx={{ fontSize: '0.75rem', fontWeight: 600 }}
                            />
                          </TableCell>
                          <TableCell align="center">
                            <Box display="flex" justifyContent="center" gap={0.5}>
                              <Tooltip title="View Details">
                                <IconButton 
                                  onClick={() => router.push(`/library/books/${book._id}`)}
                                  size="small"
                                  sx={{ 
                                    color: theme.palette.info.main,
                                    '&:hover': { 
                                      backgroundColor: theme.palette.info.light + '20',
                                      transform: 'scale(1.1)',
                                    }
                                  }}
                                >
                                  <Visibility fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Edit">
                                <IconButton 
                                  onClick={() => router.push(`/library/books/${book._id}/edit`)}
                                  size="small"
                                  sx={{ 
                                    color: theme.palette.primary.main,
                                    '&:hover': { 
                                      backgroundColor: theme.palette.primary.light + '20',
                                      transform: 'scale(1.1)',
                                    }
                                  }}
                                >
                                  <Edit fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Delete">
                                <IconButton 
                                  onClick={() => handleDelete(book._id)}
                                  size="small"
                                  sx={{ 
                                    color: theme.palette.error.main,
                                    '&:hover': { 
                                      backgroundColor: theme.palette.error.light + '20',
                                      transform: 'scale(1.1)',
                                    }
                                  }}
                                >
                                  <Delete fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </TableCell>
                        </TableRow>
                      </Fade>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Fade in>
            <Box mt={4} display="flex" justifyContent="center">
              <Paper 
                elevation={2}
                sx={{ 
                  p: 2, 
                  borderRadius: 3,
                  background: `linear-gradient(135deg, ${theme.palette.background.paper}, ${theme.palette.grey[50]})`,
                }}
              >
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                  size={isMobile ? "small" : "medium"}
                  showFirstButton={!isMobile}
                  showLastButton={!isMobile}
                  sx={{
                    '& .MuiPaginationItem-root': {
                      borderRadius: 2,
                      fontWeight: 500,
                      '&:hover': {
                        transform: 'scale(1.1)',
                      },
                      '&.Mui-selected': {
                        boxShadow: theme.shadows[4],
                      }
                    }
                  }}
                />
              </Paper>
            </Box>
          </Fade>
        )}
      </Container>
    </LibraryLayout>
  );
};

export default BookList;



