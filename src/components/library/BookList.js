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
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
//   Chip,
//   IconButton,
//   Tooltip,
//   CircularProgress,
//   Pagination
// } from '@mui/material';
// import { Add, Search, Edit, Delete, Visibility, ImportExport } from '@mui/icons-material';
// import { useRouter } from 'next/router';
// import { useAuth } from '../../contexts/AuthContext';
// import libraryService from '../../services/libraryService';

// const BookList = () => {
//   const { user } = useAuth();
//   const router = useRouter();
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [categoryFilter, setCategoryFilter] = useState('');
//   const [classFilter, setClassFilter] = useState('');
//   const [statusFilter, setStatusFilter] = useState('');
//   const [categories, setCategories] = useState([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const [booksData, categoriesData] = await Promise.all([
//           libraryService.getAllBooks(user.school._id, {
//             query: searchQuery,
//             category: categoryFilter,
//             classId: classFilter,
//             status: statusFilter,
//             page
//           }),
//           libraryService.getCategories(user.school._id)
//         ]);
        
//         setBooks(booksData.books);
//         setTotalPages(booksData.totalPages);
//         setCategories(categoriesData);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [user.school._id, searchQuery, categoryFilter, classFilter, statusFilter, page]);

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//     setPage(1);
//   };

//   const handleCategoryChange = (e) => {
//     setCategoryFilter(e.target.value);
//     setPage(1);
//   };

//   const handleClassChange = (e) => {
//     setClassFilter(e.target.value);
//     setPage(1);
//   };

//   const handleStatusChange = (e) => {
//     setStatusFilter(e.target.value);
//     setPage(1);
//   };

//   const handlePageChange = (event, value) => {
//     setPage(value);
//   };

//   const handleDelete = async (bookId) => {
//     if (window.confirm('Are you sure you want to delete this book?')) {
//       try {
//         await libraryService.deleteBook(bookId);
//         setBooks(books.filter(book => book._id !== bookId));
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
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
//         <Typography variant="h4">Book Management</Typography>
//         <Box>
//           <Button
//             variant="contained"
//             color="primary"
//             startIcon={<Add />}
//             onClick={() => router.push('/library/books/add')}
//             sx={{ mr: 2 }}
//           >
//             Add Book
//           </Button>
//           <Button
//             variant="outlined"
//             color="secondary"
//             startIcon={<ImportExport />}
//             onClick={() => router.push('/library/books/import')}
//           >
//             Bulk Import
//           </Button>
//         </Box>
//       </Box>

//       {error && (
//         <Box mb={3}>
//           <Typography color="error">{error}</Typography>
//         </Box>
//       )}

//       <Box mb={4} display="flex" flexWrap="wrap" gap={2}>
//         <TextField
//           label="Search Books"
//           variant="outlined"
//           size="small"
//           value={searchQuery}
//           onChange={handleSearch}
//           InputProps={{
//             startAdornment: <Search color="action" sx={{ mr: 1 }} />,
//           }}
//           sx={{ minWidth: 250 }}
//         />
        
//         <FormControl size="small" sx={{ minWidth: 180 }}>
//           <InputLabel>Category</InputLabel>
//           <Select
//             value={categoryFilter}
//             onChange={handleCategoryChange}
//             label="Category"
//           >
//             <MenuItem value="">All Categories</MenuItem>
//             {categories.map(category => (
//               <MenuItem key={category._id} value={category.name}>
//                 {category.name}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
        
//         <FormControl size="small" sx={{ minWidth: 180 }}>
//           <InputLabel>Class</InputLabel>
//           <Select
//             value={classFilter}
//             onChange={handleClassChange}
//             label="Class"
//           >
//             <MenuItem value="">All Classes</MenuItem>
//             {/* Add class options here */}
//           </Select>
//         </FormControl>
        
//         <FormControl size="small" sx={{ minWidth: 180 }}>
//           <InputLabel>Status</InputLabel>
//           <Select
//             value={statusFilter}
//             onChange={handleStatusChange}
//             label="Status"
//           >
//             <MenuItem value="">All Statuses</MenuItem>
//             <MenuItem value="available">Available</MenuItem>
//             <MenuItem value="unavailable">Unavailable</MenuItem>
//           </Select>
//         </FormControl>
//       </Box>

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Title</TableCell>
//               <TableCell>Author</TableCell>
//               <TableCell>ISBN</TableCell>
//               <TableCell>Category</TableCell>
//               <TableCell>Class</TableCell>
//               <TableCell>Copies</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {books.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan={8} align="center">
//                   No books found
//                 </TableCell>
//               </TableRow>
//             ) : (
//               books.map(book => (
//                 <TableRow key={book._id}>
//                   <TableCell>{book.bookTitle}</TableCell>
//                   <TableCell>{book.author}</TableCell>
//                   <TableCell>{book.isbn}</TableCell>
//                   <TableCell>{book.category}</TableCell>
//                   <TableCell>{book.class?.name || 'General'}</TableCell>
//                   <TableCell>
//                     {book.availableCopies}/{book.totalCopies}
//                   </TableCell>
//                   <TableCell>
//                     <Chip
//                       label={book.status}
//                       color={
//                         book.status === 'available' ? 'success' : 
//                         book.status === 'unavailable' ? 'error' : 'default'
//                       }
//                       size="small"
//                     />
//                   </TableCell>
//                   <TableCell>
//                     <Tooltip title="View Details">
//                       <IconButton onClick={() => router.push(`/library/books/${book._id}`)}>
//                         <Visibility color="info" />
//                       </IconButton>
//                     </Tooltip>
//                     <Tooltip title="Edit">
//                       <IconButton onClick={() => router.push(`/library/books/${book._id}/edit`)}>
//                         <Edit color="primary" />
//                       </IconButton>
//                     </Tooltip>
//                     <Tooltip title="Delete">
//                       <IconButton onClick={() => handleDelete(book._id)}>
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

//       {totalPages > 1 && (
//         <Box mt={3} display="flex" justifyContent="center">
//           <Pagination
//             count={totalPages}
//             page={page}
//             onChange={handlePageChange}
//             color="primary"
//           />
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default BookList;