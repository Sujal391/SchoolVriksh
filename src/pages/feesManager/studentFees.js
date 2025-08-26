import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Alert,
  Snackbar,
  IconButton,
  Tooltip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack
} from '@mui/material';
import { 
  Search as SearchIcon, 
  Receipt as ReceiptIcon,
  Payment as PaymentIcon,
  History as HistoryIcon,
  ExpandMore as ExpandMoreIcon,
  Download as DownloadIcon,
  Person as PersonIcon,
  School as SchoolIcon,
  DirectionsBus as BusIcon
} from '@mui/icons-material';
import FeesManagerLayout from '../../components/layout/FeesManagerLayout';
import feesService from '../../services/feesService';
import { useAuth } from '../../contexts/AuthContext';

const StudentFees = () => {
  const { school } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [feeDetails, setFeeDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentDialog, setPaymentDialog] = useState(false);
  const [selectedFees, setSelectedFees] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [expandedMonth, setExpandedMonth] = useState(null);

  useEffect(() => {
    // Log feeDetails for debugging
    if (feeDetails) {
      console.log('Received feeDetails:', feeDetails);
    }
  }, [feeDetails]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setError('Please enter a GR Number');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await feesService.getStudentByGrNumber(searchTerm.trim());
      setSelectedStudent(response.student);
      setFeeDetails(response.feeData);
    } catch (err) {
      console.error('Error searching student:', err);
      setError(err.response?.data?.message || 'Student not found or error fetching data');
      setSelectedStudent(null);
      setFeeDetails(null);
    } finally {
      setLoading(false);
    }
  };

  const handleViewHistory = async (grNumber) => {
    try {
      setLoading(true);
      const response = await feesService.getStudentFeeHistory(grNumber);
      setSelectedStudent(response.student);
      setFeeDetails(response.feeData);
    } catch (err) {
      console.error('Error fetching fee history:', err);
      setError(err.response?.data?.message || 'Failed to load fee history');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // const formatMonthYear = (monthYearKey) => {
  //   if (!monthYearKey || typeof monthYearKey !== 'string' || !monthYearKey.includes('-')) {
  //     console.warn(`Invalid monthYearKey format: ${monthYearKey}`);
  //     return 'Invalid Date';
  //   }

  //   try {
  //     const parts = monthYearKey.split('-');
  //     if (parts.length !== 2) {
  //       console.warn(`Invalid monthYearKey split: ${monthYearKey}, parts: ${parts}`);
  //       return 'Invalid Date';
  //     }

  //     const [yearStr, monthStr] = parts; // Backend uses year-month format
  //     const month = parseInt(monthStr, 10);
  //     const year = parseInt(yearStr, 10);

  //     if (isNaN(month) || isNaN(year) || month < 1 || month > 12) {
  //       console.warn(`Invalid month or year: month=${monthStr}, year=${yearStr}`);
  //       return 'Invalid Date';
  //     }

  //     const monthNames = [
  //       'January', 'February', 'March', 'April', 'May', 'June',
  //       'July', 'August', 'September', 'October', 'November', 'December'
  //     ];

  //     return `${monthNames[month - 1]} ${year}`;
  //   } catch (error) {
  //     console.error('Error formatting date:', error, { monthYearKey });
  //     return 'Invalid Date';
  //   }
  // };


  const formatMonthYear = (monthYearKey) => {
  if (!monthYearKey || typeof monthYearKey !== 'string' || !monthYearKey.includes('-')) {
    console.warn(`Invalid monthYearKey format: ${monthYearKey}`);
    return 'Invalid Date';
  }

  try {
    const parts = monthYearKey.split('-');
    if (parts.length !== 2) {
      console.warn(`Invalid monthYearKey split: ${monthYearKey}, parts: ${parts}`);
      return 'Invalid Date';
    }

    let year, month;
    // Try year-month format first (e.g., 2025-7)
    if (parts[0].length === 4) {
      [year, month] = parts.map(Number);
    } else {
      // Fallback to month-year format (e.g., 7-2025)
      [month, year] = parts.map(Number);
    }

    if (isNaN(month) || isNaN(year) || month < 1 || month > 12) {
      console.warn(`Invalid month or year: month=${month}, year=${year}, input=${monthYearKey}`);
      return 'Invalid Date';
    }

    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    return `${monthNames[month - 1]} ${year}`;
  } catch (error) {
    console.error('Error formatting date:', error, { monthYearKey });
    return 'Invalid Date';
  }
};

  const getFeeTypeDisplayName = (type) => {
    const typeMap = {
      'school': 'School Fee',
      'computer': 'Computer Fee', 
      'transportation': 'Transportation Fee',
      'examination': 'Examination Fee',
      'classroom': 'Classroom Fee',
      'educational': 'Educational Fee',
      'library': 'Library Fee',
      'sport': 'Sports Fee'
    };
    return typeMap[type] || type.charAt(0).toUpperCase() + type.slice(1) + ' Fee';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'success';
      case 'partially_paid': return 'warning';
      case 'pending': return 'error';
      default: return 'default';
    }
  };

  const handlePaymentDialog = (monthYear) => {
    const monthData = feeDetails[monthYear];
    if (!monthData || monthData.totalPending === 0) return;

    const feesToPay = [];
    Object.entries(monthData.fees).forEach(([feeType, feeData]) => {
      if (feeData.remainingAmount > 0) {
        feesToPay.push({
          monthYear,
          type: feeType,
          amount: feeData.remainingAmount,
          fullAmount: feeData.amount,
          description: feeData.description,
          transportationSlab: feeData.transportationSlab,
          dueDate: feeData.dueDate
        });
      }
    });

    setSelectedFees(feesToPay.map(fee => ({ 
      ...fee, 
      selected: true, 
      amountToPay: fee.amount 
    })));
    setPaymentDialog(true);
  };

  const handleFeeSelection = (index, checked) => {
    const updatedFees = [...selectedFees];
    updatedFees[index].selected = checked;
    if (!checked) {
      updatedFees[index].amountToPay = 0;
    } else {
      updatedFees[index].amountToPay = updatedFees[index].amount;
    }
    setSelectedFees(updatedFees);
  };

  const handleAmountChange = (index, amount) => {
    const updatedFees = [...selectedFees];
    const maxAmount = updatedFees[index].amount;
    const numAmount = Math.min(Math.max(0, parseFloat(amount) || 0), maxAmount);
    updatedFees[index].amountToPay = numAmount;
    setSelectedFees(updatedFees);
  };

  const calculateTotalPayment = () => {
    return selectedFees
      .filter(fee => fee.selected)
      .reduce((total, fee) => total + fee.amountToPay, 0);
  };

  const handlePayment = async () => {
    const feesToPay = selectedFees.filter(fee => fee.selected && fee.amountToPay > 0);
    
    if (feesToPay.length === 0) {
      setError('Please select at least one fee to pay');
      return;
    }

    try {
      setLoading(true);
      
      // Group fees by month-year
      const feesByMonth = feesToPay.reduce((acc, fee) => {
        const key = fee.monthYear;
        if (!acc[key]) {
          const [year, month] = key.split('-').map(Number); // Adjusted for year-month format
          acc[key] = {
            year,
            month,
            types: [],
            amounts: [],
            transportationSlab: null
          };
        }
        acc[key].types.push(fee.type);
        acc[key].amounts.push(fee.amountToPay);
        if (fee.transportationSlab) {
          acc[key].transportationSlab = fee.transportationSlab;
        }
        return acc;
      }, {});

      const paymentData = {
        grNumber: selectedStudent.grNumber,
        selectedFees: Object.values(feesByMonth),
        totalAmount: calculateTotalPayment(),
        paymentMethod
      };

      const response = await feesService.payFeesForStudent(paymentData);
      
      setSnackbar({
        open: true,
        message: `Payment of ₹${calculateTotalPayment().toLocaleString()} processed successfully!`,
        severity: 'success'
      });
      
      setPaymentDialog(false);
      setSelectedFees([]);
      
      // Refresh fee details
      await handleSearch();
      
    } catch (err) {
      console.error('Payment error:', err);
      setError(err.response?.data?.message || 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const closeSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const sortedFeeEntries = feeDetails ? 
    Object.entries(feeDetails).sort(([a], [b]) => {
      const [yearA, monthA] = a.split('-').map(Number); // Adjusted for year-month format
      const [yearB, monthB] = b.split('-').map(Number);
      if (yearA !== yearB) return yearB - yearA; // Most recent year first
      return monthB - monthA; // Most recent month first
    }) : [];

  return (
    <FeesManagerLayout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <PersonIcon color="primary" />
          Student Fees Management
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {school?.name || 'School'} - Search and manage student fee payments
        </Typography>
      </Box>
      
      <Divider sx={{ my: 3 }} />
      
      {/* Search Section */}
      <Card sx={{ mb: 4, p: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={8} md={6}>
            <TextField
              fullWidth
              label="Enter Student GR Number"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="e.g., GR001, GR123..."
              disabled={loading}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <Button 
              fullWidth
              variant="contained" 
              color="primary" 
              onClick={handleSearch}
              startIcon={<SearchIcon />}
              disabled={loading || !searchTerm.trim()}
              size="large"
            >
              {loading ? 'Searching...' : 'Search Student'}
            </Button>
          </Grid>
        </Grid>
      </Card>
      
      {loading && <LinearProgress sx={{ mb: 2 }} />}
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      
      {/* Student Details Section */}
      {selectedStudent && (
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PersonIcon color="primary" />
                Student Information
              </Typography>
              <Button 
                variant="outlined"
                startIcon={<HistoryIcon />}
                onClick={() => handleViewHistory(selectedStudent.grNumber)}
                disabled={loading}
                size="small"
              >
                Full History
              </Button>
            </Box>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <Typography variant="subtitle1">
                    <strong>Name:</strong> {selectedStudent.name}
                  </Typography>
                  <Typography variant="subtitle1">
                    <strong>GR Number:</strong> 
                    <Chip label={selectedStudent.grNumber} size="small" sx={{ ml: 1 }} />
                  </Typography>
                  <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <SchoolIcon fontSize="small" />
                    <strong>Class:</strong> {selectedStudent.class?.name} {selectedStudent.class?.division}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <Typography variant="subtitle1">
                    <strong>RTE Status:</strong> 
                    <Chip 
                      label={selectedStudent.isRTE ? 'RTE Student' : 'Regular Student'} 
                      color={selectedStudent.isRTE ? 'success' : 'default'} 
                      size="small" 
                      sx={{ ml: 1 }}
                    />
                  </Typography>
                  <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <BusIcon fontSize="small" />
                    <strong>Transport:</strong> 
                    {selectedStudent.transportDetails?.isApplicable ? 
                      <Chip 
                        label={selectedStudent.transportDetails.distanceSlab} 
                        color="info" 
                        size="small" 
                        sx={{ ml: 1 }}
                      /> : 
                      'Not Applicable'}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
      
      {/* Fee Details Section */}
      {feeDetails && Object.keys(feeDetails).length > 0 ? (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ReceiptIcon color="primary" />
            Fee Summary
          </Typography>
          
          {/* Summary Table */}
          <TableContainer component={Paper} sx={{ mb: 3 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: 'grey.50' }}>
                  <TableCell><strong>Month/Year</strong></TableCell>
                  <TableCell align="right"><strong>Total Amount</strong></TableCell>
                  <TableCell align="right"><strong>Paid Amount</strong></TableCell>
                  <TableCell align="right"><strong>Pending Amount</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedFeeEntries.map(([monthYear, data]) => (
                  <TableRow key={monthYear} hover>
                    <TableCell>
                      <Typography variant="subtitle2">
                        {formatMonthYear(monthYear)}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="subtitle2">
                        ₹{data.total.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="subtitle2" color="success.main">
                        ₹{data.totalPaid.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="subtitle2" color={data.totalPending > 0 ? "error.main" : "success.main"}>
                        ₹{data.totalPending.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={data.totalPending === 0 ? 'Fully Paid' : 
                               data.totalPaid > 0 ? 'Partially Paid' : 'Pending'} 
                        color={data.totalPending === 0 ? 'success' : 
                               data.totalPaid > 0 ? 'warning' : 'error'} 
                        size="small" 
                      />
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Tooltip title="View Details">
                          <IconButton 
                            size="small" 
                            onClick={() => setExpandedMonth(expandedMonth === monthYear ? null : monthYear)}
                          >
                            <ExpandMoreIcon sx={{ 
                              transform: expandedMonth === monthYear ? 'rotate(180deg)' : 'rotate(0deg)',
                              transition: 'transform 0.3s'
                            }} />
                          </IconButton>
                        </Tooltip>
                        {data.totalPending > 0 && (
                          <Button 
                            size="small" 
                            color="primary" 
                            variant="contained"
                            startIcon={<PaymentIcon />}
                            onClick={() => handlePaymentDialog(monthYear)}
                          >
                            Pay Now
                          </Button>
                        )}
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Detailed Fee Breakdown */}
          {expandedMonth && feeDetails[expandedMonth] && (
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Fee Breakdown - {formatMonthYear(expandedMonth)}
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Fee Type</TableCell>
                        <TableCell align="right">Amount</TableCell>
                        <TableCell align="right">Paid</TableCell>
                        <TableCell align="right">Remaining</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Due Date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.entries(feeDetails[expandedMonth].fees).map(([feeType, feeData]) => (
                        <TableRow key={feeType}>
                          <TableCell>
                            <Typography variant="body2">
                              {getFeeTypeDisplayName(feeType)}
                              {feeData.transportationSlab && (
                                <Chip label={feeData.transportationSlab} size="small" sx={{ ml: 1 }} />
                              )}
                            </Typography>
                            {feeData.description && (
                              <Typography variant="caption" color="text.secondary">
                                {feeData.description}
                              </Typography>
                            )}
                          </TableCell>
                          <TableCell align="right">₹{feeData.amount.toLocaleString()}</TableCell>
                          <TableCell align="right">₹{feeData.paidAmount.toLocaleString()}</TableCell>
                          <TableCell align="right">₹{feeData.remainingAmount.toLocaleString()}</TableCell>
                          <TableCell>
                            <Chip 
                              label={feeData.status === 'paid' ? 'Paid' : 
                                     feeData.status === 'partially_paid' ? 'Partial' : 'Pending'} 
                              color={getStatusColor(feeData.status)} 
                              size="small" 
                            />
                          </TableCell>
                          <TableCell>
                            {feeData.dueDate ? new Date(feeData.dueDate).toLocaleDateString() : 'N/A'}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          )}
        </Box>
      ) : selectedStudent && (
        <Alert severity="info" sx={{ mb: 2 }}>
          No fee records found for this student.
        </Alert>
      )}

      {/* Payment Dialog */}
      <Dialog open={paymentDialog} onClose={() => setPaymentDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white' }}>
          <PaymentIcon sx={{ mr: 1 }} />
          Process Fee Payment
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Alert severity="info" sx={{ mb: 2 }}>
            Select the fees you want to pay. You can pay partial amounts if needed.
          </Alert>
          
          {selectedFees.map((fee, index) => (
            <Card key={index} sx={{ mb: 2, border: fee.selected ? '2px solid' : '1px solid', borderColor: fee.selected ? 'primary.main' : 'grey.300' }}>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={1}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={fee.selected}
                          onChange={(e) => handleFeeSelection(index, e.target.checked)}
                          color="primary"
                        />
                      }
                      label=""
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant="subtitle1">
                      {getFeeTypeDisplayName(fee.type)}
                      {fee.transportationSlab && (
                        <Chip label={fee.transportationSlab} size="small" sx={{ ml: 1 }} />
                      )}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {formatMonthYear(fee.monthYear)}
                    </Typography>
                    {fee.description && (
                      <Typography variant="caption" color="text.secondary">
                        {fee.description}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="body2">
                      <strong>Total:</strong> ₹{fee.fullAmount.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="error">
                      <strong>Pending:</strong> ₹{fee.amount.toLocaleString()}
                    </Typography>
                    {fee.dueDate && (
                      <Typography variant="caption" color="text.secondary">
                        Due: {new Date(fee.dueDate).toLocaleDateString()}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      fullWidth
                      label="Amount to Pay"
                      type="number"
                      value={fee.amountToPay}
                      onChange={(e) => handleAmountChange(index, e.target.value)}
                      disabled={!fee.selected}
                      inputProps={{ min: 0, max: fee.amount, step: 0.01 }}
                      size="small"
                      InputProps={{
                        startAdornment: <Typography sx={{ mr: 1 }}>₹</Typography>
                      }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}

          <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Payment Method</InputLabel>
              <Select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                label="Payment Method"
              >
                <MenuItem value="cash">💰 Cash</MenuItem>
                <MenuItem value="card">💳 Card</MenuItem>
                <MenuItem value="upi">📱 UPI</MenuItem>
                <MenuItem value="bank_transfer">🏦 Bank Transfer</MenuItem>
              </Select>
            </FormControl>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body1">
                Selected Fees: {selectedFees.filter(fee => fee.selected).length}
              </Typography>
              <Typography variant="h6" color="primary">
                Total Amount: ₹{calculateTotalPayment().toLocaleString()}
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setPaymentDialog(false)} variant="outlined">
            Cancel
          </Button>
          <Button 
            onClick={handlePayment} 
            variant="contained" 
            disabled={loading || calculateTotalPayment() === 0}
            startIcon={<PaymentIcon />}
          >
            {loading ? 'Processing Payment...' : `Pay ₹${calculateTotalPayment().toLocaleString()}`}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success/Error Snackbar */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={closeSnackbar} severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </FeesManagerLayout>
  );
};

export default StudentFees;