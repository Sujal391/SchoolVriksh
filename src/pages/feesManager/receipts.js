// import { useState, useEffect } from 'react';
// import { 
//   Box, 
//   Typography, 
//   Grid, 
//   Divider, 
//   LinearProgress,
//   TextField,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Chip,
//   IconButton
// } from '@mui/material';
// import { 
//   Search as SearchIcon,
//   Download as DownloadIcon,
//   Print as PrintIcon,
//   Refresh as RefreshIcon
// } from '@mui/icons-material';
// import FeesManagerLayout from '../../components/layout/FeesManagerLayout';
// import feesService from '../../services/feesService';
// import { useAuth } from '../../contexts/AuthContext';

// const Receipts = () => {
//   const { school } = useAuth();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [receipts, setReceipts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchReceipts = async (params = {}) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await feesService.getReceipts(params);
//       // Transform backend data to match frontend structure
//       const transformedReceipts = response.data.map(payment => ({
//         id: payment._id,
//         date: new Date(payment.paymentDate).toISOString().split('T')[0],
//         student: {
//           name: payment.student.name,
//           grNumber: payment.student.grNumber
//         },
//         amount: payment.amount,
//         status: payment.status,
//         receiptUrl: payment.receiptUrl
//       }));
//       setReceipts(transformedReceipts);
//     } catch (err) {
//       console.error('Error fetching receipts:', err);
//       setError(err.response?.data?.message || 'Failed to load receipts');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchReceipts();
//   }, []);

//   const handleSearch = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       await fetchReceipts({ search: searchTerm });
//     } catch (err) {
//       console.error('Error searching receipts:', err);
//       setError(err.response?.data?.message || 'Failed to search receipts');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDownloadReceipt = async (receiptId) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await feesService.downloadReceipt(receiptId);
      
//       // Handle streamed response from backend
//       const blob = await response.data;
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = url;
//       link.download = `receipt-${receiptId}.pdf`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);
//     } catch (err) {
//       console.error('Error downloading receipt:', err);
//       setError(err.response?.data?.message || 'Failed to download receipt');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePrintReceipt = async (receiptId) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await feesService.downloadReceipt(receiptId);
      
//       // Handle streamed response for printing
//       const blob = await response.data;
//       const url = window.URL.createObjectURL(blob);
//       const printWindow = window.open(url, '_blank');
//       printWindow.onload = () => {
//         printWindow.print();
//       };
//       // Clean up
//       setTimeout(() => {
//         window.URL.revokeObjectURL(url);
//       }, 1000);
//     } catch (err) {
//       console.error('Error printing receipt:', err);
//       setError(err.response?.data?.message || 'Failed to print receipt');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <FeesManagerLayout>
//       <Box sx={{ mb: 4 }}>
//         <Typography variant="h4" component="h1" gutterBottom>
//           Fee Receipts
//         </Typography>
//         <Typography variant="subtitle1" color="text.secondary">
//           {school?.name || 'School'} - Manage and download fee receipts
//         </Typography>
//       </Box>
      
//       <Divider sx={{ my: 3 }} />
      
//       <Box sx={{ mb: 4 }}>
//         <Grid container spacing={2} alignItems="center">
//           <Grid item xs={12} sm={8} md={6}>
//             <TextField
//               fullWidth
//               label="Search by GR Number or Receipt Number"
//               variant="outlined"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               InputProps={{
//                 endAdornment: (
//                   <Button 
//                     variant="contained" 
//                     color="primary" 
//                     onClick={handleSearch}
//                     startIcon={<SearchIcon />}
//                   >
//                     Search
//                   </Button>
//                 )
//               }}
//             />
//           </Grid>
//           <Grid item xs={12} sm={4} md={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
//             <Button 
//               variant="outlined" 
//               startIcon={<RefreshIcon />}
//               onClick={() => fetchReceipts()}
//             >
//               Refresh
//             </Button>
//           </Grid>
//         </Grid>
//       </Box>
      
//       {loading ? (
//         <LinearProgress />
//       ) : error ? (
//         <Typography color="error">{error}</Typography>
//       ) : (
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Receipt ID</TableCell>
//                 <TableCell>Date</TableCell>
//                 <TableCell>Student</TableCell>
//                 <TableCell>GR Number</TableCell>
//                 <TableCell align="right">Amount</TableCell>
//                 <TableCell>Status</TableCell>
//                 <TableCell>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {receipts.map((receipt) => (
//                 <TableRow key={receipt.id}>
//                   <TableCell>{receipt.id}</TableCell>
//                   <TableCell>{receipt.date}</TableCell>
//                   <TableCell>{receipt.student.name}</TableCell>
//                   <TableCell>{receipt.student.grNumber}</TableCell>
//                   <TableCell align="right">₹{receipt.amount.toLocaleString()}</TableCell>
//                   <TableCell>
//                     <Chip 
//                       label={receipt.status} 
//                       size="small" 
//                       color={receipt.status === 'completed' ? 'success' : 'warning'}
//                     />
//                   </TableCell>
//                   <TableCell>
//                     <IconButton 
//                       color="primary" 
//                       onClick={() => handleDownloadReceipt(receipt.id)}
//                       title="Download Receipt"
//                     >
//                       <DownloadIcon />
//                     </IconButton>
//                     <IconButton 
//                       color="secondary" 
//                       onClick={() => handlePrintReceipt(receipt.id)}
//                       title="Print Receipt"
//                     >
//                       <PrintIcon />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}
//     </FeesManagerLayout>
//   );
// };

// export default Receipts;





import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Divider, 
  LinearProgress,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Tooltip,
  useTheme,
  styled
} from '@mui/material';
import { 
  Search as SearchIcon,
  Download as DownloadIcon,
  Print as PrintIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import FeesManagerLayout from '../../components/layout/FeesManagerLayout';
import feesService from '../../services/feesService';
import { useAuth } from '../../contexts/AuthContext';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
  },
}));

const StatusChip = styled(Chip)(({ theme, status }) => ({
  fontWeight: 600,
  textTransform: 'capitalize',
  backgroundColor: status === 'completed' 
    ? theme.palette.success.light 
    : theme.palette.warning.light,
  color: status === 'completed' 
    ? theme.palette.success.dark 
    : theme.palette.warning.dark,
}));

const Receipts = () => {
  const { school } = useAuth();
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchReceipts = async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response = await feesService.getReceipts(params);
      const transformedReceipts = response.data.map(payment => ({
        id: payment._id,
        date: new Date(payment.paymentDate).toISOString().split('T')[0],
        student: {
          name: payment.student.name,
          grNumber: payment.student.grNumber
        },
        amount: payment.amount,
        status: payment.status,
        receiptUrl: payment.receiptUrl
      }));
      setReceipts(transformedReceipts);
    } catch (err) {
      console.error('Error fetching receipts:', err);
      setError(err.response?.data?.message || 'Failed to load receipts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReceipts();
  }, []);

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError(null);
      await fetchReceipts({ search: searchTerm });
    } catch (err) {
      console.error('Error searching receipts:', err);
      setError(err.response?.data?.message || 'Failed to search receipts');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadReceipt = async (receiptId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await feesService.downloadReceipt(receiptId);
      const blob = await response.data;
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `receipt-${receiptId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error downloading receipt:', err);
      setError(err.response?.data?.message || 'Failed to download receipt');
    } finally {
      setLoading(false);
    }
  };

  const handlePrintReceipt = async (receiptId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await feesService.downloadReceipt(receiptId);
      const blob = await response.data;
      const url = window.URL.createObjectURL(blob);
      const printWindow = window.open(url, '_blank');
      printWindow.onload = () => {
        printWindow.print();
      };
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 1000);
    } catch (err) {
      console.error('Error printing receipt:', err);
      setError(err.response?.data?.message || 'Failed to print receipt');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FeesManagerLayout>
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom
          sx={{
            fontWeight: 700,
            color: theme.palette.primary.main,
            display: 'flex',
            alignItems: 'center',
            gap: 2
          }}
        >
          Fee Receipts
          <Chip 
            label={`${receipts.length} Receipts`} 
            color="primary" 
            variant="outlined"
            size="small"
          />
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {school?.name || 'School'} - Manage and download fee receipts
        </Typography>
      </Box>
      
      <Divider sx={{ 
        my: 3,
        borderWidth: 1,
        borderColor: theme.palette.divider
      }} />
      
      <Box sx={{ 
        mb: 4,
        p: 3,
        backgroundColor: theme.palette.background.paper,
        borderRadius: 2,
        boxShadow: theme.shadows[1]
      }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              label="Search by GR Number or Receipt Number"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="small"
              InputProps={{
                startAdornment: (
                  <SearchIcon 
                    color="action" 
                    sx={{ mr: 1 }} 
                  />
                ),
                sx: {
                  backgroundColor: theme.palette.background.default,
                  borderRadius: 1
                }
              }}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </Grid>
          <Grid item xs={12} md={4} sx={{ 
            display: 'flex', 
            justifyContent: { xs: 'flex-start', md: 'flex-end' },
            gap: 2
          }}>
            <Button 
              variant="contained"
              color="primary"
              onClick={handleSearch}
              sx={{
                px: 3,
                textTransform: 'none',
                boxShadow: 'none'
              }}
            >
              Search
            </Button>
            <Button 
              variant="outlined"
              color="inherit"
              startIcon={<RefreshIcon />}
              onClick={() => fetchReceipts()}
              sx={{
                textTransform: 'none'
              }}
            >
              Refresh
            </Button>
          </Grid>
        </Grid>
      </Box>
      
      {loading && <LinearProgress sx={{ height: 2 }} />}
      
      {error && (
        <Box sx={{ 
          p: 2,
          mb: 2,
          backgroundColor: theme.palette.error.light,
          color: theme.palette.error.contrastText,
          borderRadius: 1
        }}>
          <Typography>{error}</Typography>
        </Box>
      )}
      
      <Paper 
        elevation={0}
        sx={{
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 2,
          overflow: 'hidden'
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ 
                backgroundColor: theme.palette.grey[100] 
              }}>
                <TableCell sx={{ fontWeight: 600 }}>Receipt ID</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Student</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>GR Number</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>Amount</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {receipts.length > 0 ? (
                receipts.map((receipt) => (
                  <StyledTableRow key={receipt.id}>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                        {receipt.id.slice(0, 8)}...
                      </Typography>
                    </TableCell>
                    <TableCell>{receipt.date}</TableCell>
                    <TableCell sx={{ fontWeight: 500 }}>{receipt.student.name}</TableCell>
                    <TableCell>{receipt.student.grNumber}</TableCell>
                    <TableCell align="right">
                      <Typography sx={{ fontWeight: 600 }}>
                        ₹{receipt.amount.toLocaleString('en-IN')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <StatusChip 
                        label={receipt.status} 
                        size="small" 
                        status={receipt.status}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="Download Receipt">
                          <IconButton 
                            color="primary" 
                            onClick={() => handleDownloadReceipt(receipt.id)}
                            size="small"
                            sx={{
                              backgroundColor: theme.palette.primary.light,
                              '&:hover': {
                                backgroundColor: theme.palette.primary.main,
                                color: '#fff'
                              }
                            }}
                          >
                            <DownloadIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Print Receipt">
                          <IconButton 
                            color="secondary" 
                            onClick={() => handlePrintReceipt(receipt.id)}
                            size="small"
                            sx={{
                              backgroundColor: theme.palette.secondary.light,
                              '&:hover': {
                                backgroundColor: theme.palette.secondary.main,
                                color: '#fff'
                              }
                            }}
                          >
                            <PrintIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </StyledTableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                    <Typography variant="body1" color="text.secondary">
                      {searchTerm ? 'No receipts found matching your search' : 'No receipts available'}
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </FeesManagerLayout>
  );
};

export default Receipts;