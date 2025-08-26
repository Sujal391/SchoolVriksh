// import { useState, useEffect } from 'react';
// import {
//   Box,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Chip,
//   TextField,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
//   CircularProgress,
//   Pagination
// } from '@mui/material';
// import { Search, Event, Person, Book } from '@mui/icons-material';
// import { useAuth } from '../../contexts/AuthContext';
// import libraryService from '../../services/libraryService';

// const AuditLogs = () => {
//   const { user } = useAuth();
//   const [logs, setLogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [actionFilter, setActionFilter] = useState('');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   useEffect(() => {
//     fetchLogs();
//   }, [page, actionFilter]);

//   const fetchLogs = async () => {
//     try {
//       setLoading(true);
//       const data = await libraryService.getAuditLogs({
//         query: searchQuery,
//         action: actionFilter,
//         startDate,
//         endDate,
//         page
//       });
//       setLogs(data.logs);
//       setTotalPages(data.totalPages);
//       setLoading(false);
//     } catch (err) {
//       setError(err.message);
//       setLoading(false);
//     }
//   };

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//     setPage(1);
//   };

//   const handleActionChange = (e) => {
//     setActionFilter(e.target.value);
//     setPage(1);
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleString();
//   };

//   const getActionColor = (action) => {
//     switch (action) {
//       case 'book_issue': return 'success';
//       case 'book_return': return 'info';
//       case 'book_reject': return 'warning';
//       case 'fine_pardon': return 'secondary';
//       default: return 'default';
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
//       <Box mb={3}>
//         <Typography variant="h4">Audit Logs</Typography>
//       </Box>

//       {error && (
//         <Box mb={3}>
//           <Typography color="error">{error}</Typography>
//         </Box>
//       )}

//       <Box mb={3} display="flex" flexWrap="wrap" gap={2}>
//         <TextField
//           label="Search Logs"
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
//           <InputLabel>Action Type</InputLabel>
//           <Select
//             value={actionFilter}
//             onChange={handleActionChange}
//             label="Action Type"
//           >
//             <MenuItem value="">All Actions</MenuItem>
//             <MenuItem value="book_issue">Book Issue</MenuItem>
//             <MenuItem value="book_return">Book Return</MenuItem>
//             <MenuItem value="book_reject">Request Reject</MenuItem>
//             <MenuItem value="book_reserve">Book Reserve</MenuItem>
//             <MenuItem value="fine_pardon">Fine Pardon</MenuItem>
//           </Select>
//         </FormControl>
        
//         <TextField
//           label="Start Date"
//           type="date"
//           size="small"
//           InputLabelProps={{ shrink: true }}
//           sx={{ minWidth: 180 }}
//         />
        
//         <TextField
//           label="End Date"
//           type="date"
//           size="small"
//           InputLabelProps={{ shrink: true }}
//           sx={{ minWidth: 180 }}
//         />
//       </Box>

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Action</TableCell>
//               <TableCell>User</TableCell>
//               <TableCell>Book</TableCell>
//               <TableCell>Details</TableCell>
//               <TableCell>Timestamp</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {logs.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan={5} align="center">
//                   No logs found
//                 </TableCell>
//               </TableRow>
//             ) : (
//               logs.map(log => (
//                 <TableRow key={log._id}>
//                   <TableCell>
//                     <Chip
//                       label={log.action.replace('_', ' ')}
//                       color={getActionColor(log.action)}
//                       size="small"
//                     />
//                   </TableCell>
//                   <TableCell>
//                     <Box display="flex" alignItems="center">
//                       <Person color="action" sx={{ mr: 1 }} />
//                       {log.user?.name || 'System'}
//                     </Box>
//                   </TableCell>
//                   <TableCell>
//                     {log.book?.bookTitle ? (
//                       <Box display="flex" alignItems="center">
//                         <Book color="action" sx={{ mr: 1 }} />
//                         {log.book.bookTitle}
//                       </Box>
//                     ) : 'N/A'}
//                   </TableCell>
//                   <TableCell>
//                     <Typography variant="body2">
//                       {log.details?.bookTitle && `Book: ${log.details.bookTitle}`}
//                       {log.details?.studentName && `Student: ${log.details.studentName}`}
//                       {log.details?.fine && `Fine: ₹${log.details.fine}`}
//                     </Typography>
//                   </TableCell>
//                   <TableCell>
//                     <Box display="flex" alignItems="center">
//                       <Event color="action" sx={{ mr: 1 }} />
//                       {formatDate(log.timestamp)}
//                     </Box>
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
//             onChange={(e, value) => setPage(value)}
//             color="primary"
//           />
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default AuditLogs;

import { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CircularProgress,
  Pagination,
  Button,
  Grid,
  Card,
  CardContent,
  Divider,
  InputAdornment,
  Stack,
  alpha,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  Search, 
  Event, 
  Person, 
  Book, 
  Clear, 
  FilterList,
  Analytics,
  History,
  DateRange
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import libraryService from '../../services/libraryService';

const AuditLogs = () => {
  const { user } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [actionFilter, setActionFilter] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Debounced search function
  const [searchTimeout, setSearchTimeout] = useState(null);

  const fetchLogs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = {
        page,
        limit: 20,
        ...(searchQuery.trim() && { query: searchQuery.trim() }),
        ...(actionFilter && { action: actionFilter }),
        ...(startDate && { startDate: formatDateForAPI(startDate) }),
        ...(endDate && { endDate: formatEndDateForAPI(endDate) })
      };

      console.log('Fetching logs with params:', params); // Debug log

      const data = await libraryService.getAuditLogs(params);
      setLogs(data.logs || []);
      setTotalPages(data.pagination?.totalPages || 1);
    } catch (err) {
      setError(err.message || 'Failed to fetch audit logs');
      setLogs([]);
    } finally {
      setLoading(false);
    }
  }, [page, searchQuery, actionFilter, startDate, endDate]);

  // Initial load
  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  // Handle search with debouncing
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setPage(1); // Reset to first page when searching
    
    // Clear existing timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    
    // Set new timeout for debounced search
    const newTimeout = setTimeout(() => {
      // The useEffect with fetchLogs dependency will handle the API call
    }, 500); // 500ms delay
    
    setSearchTimeout(newTimeout);
  };

  // Handle action filter change
  const handleActionChange = (e) => {
    setActionFilter(e.target.value);
    setPage(1);
  };

  // Handle start date change
  const handleStartDateChange = (e) => {
    const value = e.target.value;
    setStartDate(value);
    setPage(1);
    
    // Validate date range
    if (endDate && value && new Date(value) > new Date(endDate)) {
      setEndDate(''); // Clear end date if start date is after end date
    }
  };

  // Handle end date change
  const handleEndDateChange = (e) => {
    const value = e.target.value;
    setEndDate(value);
    setPage(1);
    
    // Validate date range
    if (startDate && value && new Date(startDate) > new Date(value)) {
      setStartDate(''); // Clear start date if end date is before start date
    }
  };

  // Format date for API (simpler approach)
  const formatDateForAPI = (dateString) => {
    if (!dateString) return '';
    // Just pass the date string as is - backend will handle timezone
    return dateString;
  };

  // Format end date for API 
  const formatEndDateForAPI = (dateString) => {
    if (!dateString) return '';
    // Just pass the date string as is - backend handles setting end of day
    return dateString;
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setActionFilter('');
    setStartDate('');
    setEndDate('');
    setPage(1);
  };

  // Handle page change
  const handlePageChange = (e, value) => {
    setPage(value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const getActionColor = (action) => {
    switch (action) {
      case 'book_issue': return 'success';
      case 'book_return': return 'info';
      case 'book_reject': return 'warning';
      case 'book_reserve': return 'secondary';
      case 'fine_pardon': return 'secondary';
      case 'book_request': return 'default';
      case 'book_renewal': return 'primary';
      default: return 'default';
    }
  };

  const formatActionLabel = (action) => {
    return action.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const hasActiveFilters = searchQuery || actionFilter || startDate || endDate;

  if (loading && logs.length === 0) {
    return (
      <Box 
        display="flex" 
        flexDirection="column"
        justifyContent="center" 
        alignItems="center" 
        minHeight="60vh"
        sx={{
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
          borderRadius: 2
        }}
      >
        <CircularProgress size={48} thickness={4} />
        <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
          Loading audit logs...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      p: { xs: 2, sm: 3, md: 4 }, 
      maxWidth: '100%',
      background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.02)} 0%, ${alpha(theme.palette.secondary.main, 0.02)} 100%)`,
      minHeight: '100vh'
    }}>
      {/* Header Section */}
      {/* <Card 
        elevation={0}
        sx={{ 
          mb: 4,
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: 'white',
          borderRadius: 3
        }}
      >
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box
              sx={{
                p: 1.5,
                borderRadius: '50%',
                bgcolor: alpha(theme.palette.common.white, 0.2),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Analytics sx={{ fontSize: 28 }} />
            </Box>
            <Box>
              <Typography variant={isMobile ? "h5" : "h4"} fontWeight="bold" gutterBottom>
                Audit Logs
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Track and monitor all library activities and transactions
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card> */}

      {/* Error Alert */}
      {error && (
        <Card 
          elevation={0} 
          sx={{ 
            mb: 3, 
            borderLeft: `4px solid ${theme.palette.error.main}`,
            bgcolor: alpha(theme.palette.error.main, 0.1)
          }}
        >
          <CardContent>
            <Typography color="error" variant="body1" fontWeight="medium">
              {error}
            </Typography>
          </CardContent>
        </Card>
      )}

      {/* Filters Section */}
      <Card elevation={0} sx={{ mb: 2, borderRadius: 3 }}>
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
            <FilterList color="primary" />
            <Typography variant="h6" color="text.primary" fontWeight="600">
              Filters
            </Typography>
          </Stack>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <TextField
                fullWidth
                label="Search Logs"
                variant="outlined"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search by user, book, or details..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover': {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.primary.main,
                      }
                    }
                  }
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={3} lg={2}>
              <FormControl fullWidth>
                <InputLabel>Action Type</InputLabel>
                <Select
                  value={actionFilter}
                  onChange={handleActionChange}
                  label="Action Type"
                  sx={{ borderRadius: 2 }}
                >
                  <MenuItem value="">All Actions</MenuItem>
                  <MenuItem value="book_request">Book Request</MenuItem>
                  <MenuItem value="book_issue">Book Issue</MenuItem>
                  <MenuItem value="book_return">Book Return</MenuItem>
                  <MenuItem value="book_reject">Request Reject</MenuItem>
                  <MenuItem value="book_reserve">Book Reserve</MenuItem>
                  <MenuItem value="book_renewal">Book Renewal</MenuItem>
                  <MenuItem value="fine_pardon">Fine Pardon</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3} lg={2}>
              <TextField
                fullWidth
                label="Start Date"
                type="date"
                value={startDate}
                onChange={handleStartDateChange}
                InputLabelProps={{ shrink: true }}
                inputProps={{
                  max: endDate || new Date().toISOString().split('T')[0]
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DateRange color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={3} lg={2}>
              <TextField
                fullWidth
                label="End Date"
                type="date"
                value={endDate}
                onChange={handleEndDateChange}
                InputLabelProps={{ shrink: true }}
                inputProps={{
                  min: startDate,
                  max: new Date().toISOString().split('T')[0]
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DateRange color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Grid>

            {hasActiveFilters && (
              <Grid item xs={12} sm={6} md={3} lg={2}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={handleClearFilters}
                  startIcon={<Clear />}
                  sx={{ 
                    height: '56px',
                    borderRadius: 2,
                    borderColor: theme.palette.grey[300],
                    '&:hover': {
                      borderColor: theme.palette.error.main,
                      color: theme.palette.error.main,
                    }
                  }}
                >
                  Clear Filters
                </Button>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>

      {/* Loading indicator for filtered results */}
      {loading && logs.length > 0 && (
        <Box display="flex" justifyContent="center" mb={3}>
          <Card elevation={0} sx={{ px: 3, py: 1.5, borderRadius: 3 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <CircularProgress size={20} />
              <Typography variant="body2" color="text.secondary">
                Updating results...
              </Typography>
            </Stack>
          </Card>
        </Box>
      )}

      {/* Data Table */}
      <Card elevation={0} sx={{ borderRadius: 3, overflow: 'hidden' }}>
        <TableContainer 
          component={Paper} 
          elevation={0}
          sx={{ 
            maxHeight: isMobile ? 'none' : '70vh',
            '& .MuiTable-root': {
              minWidth: isMobile ? 800 : 'auto'
            }
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell 
                  sx={{ 
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    borderBottom: `2px solid ${theme.palette.divider}`
                  }}
                >
                  Action
                </TableCell>
                <TableCell 
                  sx={{ 
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    borderBottom: `2px solid ${theme.palette.divider}`
                  }}
                >
                  User
                </TableCell>
                <TableCell 
                  sx={{ 
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    borderBottom: `2px solid ${theme.palette.divider}`
                  }}
                >
                  Book
                </TableCell>
                <TableCell 
                  sx={{ 
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    borderBottom: `2px solid ${theme.palette.divider}`
                  }}
                >
                  Details
                </TableCell>
                <TableCell 
                  sx={{ 
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    borderBottom: `2px solid ${theme.palette.divider}`
                  }}
                >
                  Timestamp
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {logs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
                    <Box>
                      <History 
                        sx={{ 
                          fontSize: 64, 
                          color: theme.palette.grey[400], 
                          mb: 2 
                        }} 
                      />
                      <Typography variant="h6" color="text.secondary" gutterBottom>
                        {hasActiveFilters ? 'No logs found matching your filters' : 'No logs found'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        {hasActiveFilters 
                          ? 'Try adjusting your search criteria or date range'
                          : 'Audit logs will appear here as activities are performed'
                        }
                      </Typography>
                      {hasActiveFilters && (
                        <Button 
                          variant="contained" 
                          onClick={handleClearFilters}
                          sx={{ borderRadius: 2 }}
                        >
                          Clear filters to see all logs
                        </Button>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                logs.map((log, index) => (
                  <TableRow 
                    key={log._id}
                    sx={{ 
                      '&:hover': { 
                        bgcolor: alpha(theme.palette.primary.main, 0.04),
                        transition: 'background-color 0.15s ease'
                      },
                      '&:nth-of-type(odd)': {
                        bgcolor: alpha(theme.palette.grey[100], 0.3)
                      }
                    }}
                  >
                    <TableCell sx={{ py: 2 }}>
                      <Chip
                        label={formatActionLabel(log.action)}
                        color={getActionColor(log.action)}
                        size="small"
                        sx={{ 
                          fontWeight: 500,
                          borderRadius: 2,
                          textTransform: 'capitalize'
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ py: 2 }}>
                      <Stack direction="row" alignItems="center" spacing={1.5}>
                        <Box
                          sx={{
                            p: 1,
                            borderRadius: '50%',
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <Person sx={{ fontSize: 18, color: theme.palette.primary.main }} />
                        </Box>
                        <Box>
                          <Typography variant="body2" fontWeight="500">
                            {log.user?.name || 'System'}
                          </Typography>
                          {log.user?.studentDetails?.grNumber && (
                            <Typography variant="caption" color="text.secondary">
                              GR: {log.user.studentDetails.grNumber}
                            </Typography>
                          )}
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell sx={{ py: 2 }}>
                      {log.book?.bookTitle ? (
                        <Stack direction="row" alignItems="center" spacing={1.5}>
                          <Box
                            sx={{
                              p: 1,
                              borderRadius: '50%',
                              bgcolor: alpha(theme.palette.secondary.main, 0.1),
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <Book sx={{ fontSize: 18, color: theme.palette.secondary.main }} />
                          </Box>
                          <Box>
                            <Typography variant="body2" fontWeight="500">
                              {log.book.bookTitle}
                            </Typography>
                            {log.book?.isbn && (
                              <Typography variant="caption" color="text.secondary">
                                ISBN: {log.book.isbn}
                              </Typography>
                            )}
                          </Box>
                        </Stack>
                      ) : (
                        <Typography variant="body2" color="text.secondary" fontStyle="italic">
                          N/A
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell sx={{ py: 2 }}>
                      <Box>
                        {log.details?.bookTitle && (
                          <Typography variant="body2" sx={{ mb: 0.5 }}>
                            <strong>Book:</strong> {log.details.bookTitle}
                          </Typography>
                        )}
                        {log.details?.studentName && (
                          <Typography variant="body2" sx={{ mb: 0.5 }}>
                            <strong>Student:</strong> {log.details.studentName}
                          </Typography>
                        )}
                        {log.details?.fine && (
                          <Chip
                            label={`Fine: ₹${log.details.fine}`}
                            color="error"
                            size="small"
                            variant="outlined"
                            sx={{ mt: 0.5 }}
                          />
                        )}
                        {log.details?.reason && (
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, fontStyle: 'italic' }}>
                            <strong>Reason:</strong> {log.details.reason}
                          </Typography>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ py: 2 }}>
                      <Stack direction="row" alignItems="center" spacing={1.5}>
                        <Box
                          sx={{
                            p: 1,
                            borderRadius: '50%',
                            bgcolor: alpha(theme.palette.info.main, 0.1),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <Event sx={{ fontSize: 18, color: theme.palette.info.main }} />
                        </Box>
                        <Typography variant="body2" fontWeight="400">
                          {formatDate(log.timestamp)}
                        </Typography>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <Card elevation={0} sx={{ mt: 4, borderRadius: 3 }}>
          <CardContent>
            <Stack 
              direction={isMobile ? "column" : "row"} 
              justifyContent="center" 
              alignItems="center" 
              spacing={3}
            >
              <Typography variant="body2" color="text.secondary" fontWeight="500">
                Page {page} of {totalPages} • Showing {logs.length} results
              </Typography>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                showFirstButton
                showLastButton
                size={isMobile ? "small" : "medium"}
                sx={{
                  '& .MuiPaginationItem-root': {
                    borderRadius: 2,
                    fontWeight: 500,
                  }
                }}
              />
            </Stack>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default AuditLogs;