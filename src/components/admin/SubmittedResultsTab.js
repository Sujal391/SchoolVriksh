import React from 'react';
import { Box, Typography, Button, InputLabel, MenuItem, Select, CircularProgress } from '@mui/material';
import AdminService from '../../services/adminService';

const SubmittedResultsTab = ({ 
  selectedClass, 
  selectedAcademicYear, 
  setSelectedAcademicYear,
  availableAcademicYears,
  classes,
  setSelectedClass,
  submittedResults,
  setSubmittedResults,
  loading,
  setLoading,
  verifying,
  setVerifying,
  error,
  setError,
  successMessage,
  setSuccessMessage
}) => {
  
  // Function to fetch submitted Excel results using new API
  const handleFetchSubmittedResults = async () => {
  if (!selectedClass || !selectedAcademicYear) return;

  setLoading(true);
  setError(null);
  setSuccessMessage('');
  try {
    const response = await AdminService.getSubmittedExcelResults(
      selectedClass._id,
      selectedAcademicYear
    );
    setSubmittedResults(response);
  } catch (error) {
    console.error("Error fetching submitted results:", error);

    let message = "Something went wrong while loading results.";

    if (error.response?.status === 400) {
      // Show the server's explanation if provided
      message =
        error.response.data?.message ||
        "Some results are missing. Please verify exam events for this class.";
    } else if (error.response?.status === 404) {
      message = "No submitted results found for this class and year.";
    } else if (error.response?.status === 500) {
      message = "Server is having issues. Please try again later.";
    } else if (error.message === "Network Error") {
      message = "Unable to connect. Check your internet and try again.";
    }

    setError(message);
  } finally {
    setLoading(false);
  }
};

  // Function to verify Excel results and generate marksheets
  const handleVerifyResults = async () => {
    if (!selectedClass || !selectedAcademicYear) return;

    setVerifying(true);
    setError(null);
    setSuccessMessage('');
    try {
      const response = await AdminService.verifyExcelResults(selectedClass._id, selectedAcademicYear);
      setSuccessMessage(`✅ ${response.message}. Generated ${response.marksheetsGenerated} marksheets.`);
      
      // Refresh the submitted results to show updated status
      await handleFetchSubmittedResults();
    } catch (error) {
      console.error("Error verifying results:", error);
      const errorMessage = error.response?.data?.error || error.message;
      
      if (error.response?.data?.existingMarksheets) {
        setError("⚠️ " + errorMessage);
      } else {
        setError("❌ Failed to verify results: " + errorMessage);
      }
    } finally {
      setVerifying(false);
    }
  };

  return (
    <Box>
      <Box className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Box>
          <InputLabel className="block text-sm font-medium text-gray-700 mb-1">
            Academic Year
          </InputLabel>
          <Select
            fullWidth
            value={selectedAcademicYear}
            onChange={(e) => setSelectedAcademicYear(e.target.value)}
            displayEmpty
          >
            <MenuItem value="">Select academic year</MenuItem>
            {availableAcademicYears.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box>
          <InputLabel className="block text-sm font-medium text-gray-700 mb-1">
            Select Class
          </InputLabel>
          <Select
            fullWidth
            value={selectedClass?._id || ""}
            onChange={(e) => setSelectedClass(classes.find((cls) => cls._id === e.target.value))}
            displayEmpty
          >
            <MenuItem value="">Select a class</MenuItem>
            {classes.map((cls) => (
              <MenuItem key={cls._id} value={cls._id}>
                {cls.name} - {cls.division}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box className="flex flex-col items-end gap-2">
          <Box className="flex gap-2">
            <Button
              variant="contained"
              color="primary"
              onClick={handleFetchSubmittedResults}
              disabled={!selectedClass || !selectedAcademicYear || loading || verifying}
            >
              {loading ? <CircularProgress size={24} /> : "View Submitted Results"}
            </Button>
            
            <Button
              variant="contained"
              color="success"
              onClick={handleVerifyResults}
              disabled={!selectedClass || !selectedAcademicYear || loading || verifying || !submittedResults}
            >
              {verifying ? <CircularProgress size={24} /> : "Verify & Generate Marksheets"}
            </Button>
          </Box>
          
          {submittedResults && (
            <Typography variant="caption" color="textSecondary" className="text-right">
              💡 Click "Verify & Generate Marksheets" to process Excel results and create PDF marksheets
            </Typography>
          )}
        </Box>
      </Box>

      {/* Display submitted results */}
      {submittedResults && (
        <Box>
          {/* Results Status Information */}
          <Box className="mb-4 p-4 bg-blue-50 rounded-lg">
            <Typography variant="h6" className="mb-2">
              📊 Results Status for {submittedResults.class?.name} {submittedResults.class?.division && `- ${submittedResults.class.division}`}
            </Typography>
            
            <Box className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Box>
                <Typography variant="body2" color="textSecondary">Total Students</Typography>
                <Typography variant="h6">{submittedResults.results?.length || 0}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="textSecondary">Exam Events</Typography>
                <Typography variant="h6">{submittedResults.examEvents?.length || 0}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="textSecondary">Verification Status</Typography>
                <Typography variant="h6" color={submittedResults.results?.some(r => r.marksheet?.url) ? "success.main" : "warning.main"}>
                  {submittedResults.results?.some(r => r.marksheet?.url) ? "✅ Verified" : "⏳ Pending"}
                </Typography>
              </Box>
            </Box>

            {submittedResults.excelFile && (
              <Box className="mt-3">
                <Typography variant="body2" color="textSecondary">Excel File:</Typography>
                <Typography variant="body2">
                  📄 <a href={submittedResults.excelFile.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {submittedResults.excelFile.originalName}
                  </a>
                </Typography>
              </Box>
            )}
          </Box>

          {/* Detailed Results Table (Component temporarily disabled) */}
          <Box className="p-4 bg-gray-50 rounded-lg text-center">
            <Typography variant="body1" color="textSecondary">
              📋 Detailed results table will be displayed here once the component import issue is resolved.
            </Typography>
            <Typography variant="body2" color="textSecondary" className="mt-2">
              Results data is available and can be processed for verification.
            </Typography>
          </Box>
        </Box>
      )}

      {/* No results message */}
      {!submittedResults && !loading && selectedClass && selectedAcademicYear && (
        <Box className="text-center text-gray-500 mt-8">
          No submitted results found for the selected class and academic year.
        </Box>
      )}
    </Box>
  );
};

export default SubmittedResultsTab;
