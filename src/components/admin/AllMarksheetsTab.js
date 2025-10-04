import React from 'react';
import { Box, Typography, Button, InputLabel, MenuItem, Select, CircularProgress } from '@mui/material';
import AdminService from '../../services/adminService';

const AllMarksheetsTab = ({ 
  selectedClass, 
  selectedAcademicYear, 
  setSelectedAcademicYear,
  availableAcademicYears,
  classes,
  setSelectedClass,
  marksheets,
  setMarksheets,
  loading,
  setLoading,
  error,
  setError,
  successMessage,
  setSuccessMessage
}) => {
  
  // Function to fetch all marksheets using new API
  const handleFetchMarksheets = async () => {
    if (!selectedClass || !selectedAcademicYear) return;

    setLoading(true);
    setError(null);
    setSuccessMessage('');
    try {
      const response = await AdminService.getAllMarksheetsByClass(selectedClass._id, selectedAcademicYear);
      setMarksheets(response);
    } catch (error) {
      console.error("Error fetching marksheets:", error);
      setError("Failed to load marksheets: " + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  // Function to publish individual marksheet
  const handlePublishMarksheet = async (studentId, studentName) => {
    if (!selectedClass || !selectedAcademicYear) return;

    setLoading(true);
    setError(null);
    setSuccessMessage('');
    try {
      const response = await AdminService.publishIndividualMarksheet(
        selectedClass._id,
        selectedAcademicYear,
        studentId
      );
      setSuccessMessage(`✅ ${response.message}`);

      // Refresh marksheets to show updated status
      await handleFetchMarksheets();
    } catch (error) {
      console.error("Error publishing marksheet:", error);
      const errorMessage = error.response?.data?.error || error.message;
      setError("❌ Failed to publish marksheet: " + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Function to publish all verified marksheets
  const handlePublishAllVerified = async () => {
    if (!selectedClass || !selectedAcademicYear || !marksheets?.marksheets) return;

    const verifiedMarksheets = marksheets.marksheets.filter(m => m.status === 'verified');
    if (verifiedMarksheets.length === 0) {
      setError("No verified marksheets found to publish.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage('');

    let publishedCount = 0;
    let failedCount = 0;

    try {
      for (const marksheet of verifiedMarksheets) {
        try {
          await AdminService.publishIndividualMarksheet(
            selectedClass._id,
            selectedAcademicYear,
            marksheet.student.id
          );
          publishedCount++;
        } catch (error) {
          console.error(`Failed to publish marksheet for ${marksheet.student.name}:`, error);
          failedCount++;
        }
      }

      if (publishedCount > 0) {
        setSuccessMessage(`✅ Successfully published ${publishedCount} marksheet(s).${failedCount > 0 ? ` ${failedCount} failed.` : ''}`);
      }

      if (failedCount > 0 && publishedCount === 0) {
        setError(`❌ Failed to publish all ${failedCount} marksheet(s).`);
      }

      // Refresh marksheets to show updated status
      await handleFetchMarksheets();
    } catch (error) {
      console.error("Error in bulk publish:", error);
      setError("❌ Failed to publish marksheets: " + error.message);
    } finally {
      setLoading(false);
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

        <Box className="flex items-end gap-2">
          <Button
            variant="contained"
            color="primary"
            onClick={handleFetchMarksheets}
            disabled={!selectedClass || !selectedAcademicYear || loading}
          >
            {loading ? <CircularProgress size={24} /> : "View All Marksheets"}
          </Button>

          {marksheets?.marksheets?.some(m => m.status === 'verified') && (
            <Button
              variant="contained"
              color="success"
              onClick={handlePublishAllVerified}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Publish All Verified"}
            </Button>
          )}
        </Box>
      </Box>

      {/* Display marksheets */}
      {marksheets && (
        <Box>
          {/* Marksheets Overview */}
          <Box className="mb-4 p-4 bg-green-50 rounded-lg">
            <Typography variant="h6" className="mb-2">
              📋 Marksheets for {marksheets.class?.name} {marksheets.class?.division && `- ${marksheets.class.division}`}
            </Typography>
            
            <Box className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <Box>
                <Typography variant="body2" color="textSecondary">Total Marksheets</Typography>
                <Typography variant="h6">{marksheets.marksheets?.length || 0}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="textSecondary">Published</Typography>
                <Typography variant="h6" color="success.main">
                  {marksheets.marksheets?.filter(m => m.status === 'published').length || 0}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="textSecondary">Verified (Ready)</Typography>
                <Typography variant="h6" color="primary.main">
                  {marksheets.marksheets?.filter(m => m.status === 'verified').length || 0}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="textSecondary">Pass Rate</Typography>
                <Typography variant="h6" color="success.main">
                  {marksheets.marksheets?.length > 0
                    ? `${((marksheets.marksheets.filter(m => m.result?.toLowerCase() === 'pass').length / marksheets.marksheets.length) * 100).toFixed(1)}%`
                    : '0%'
                  }
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="textSecondary">Average Percentage</Typography>
                <Typography variant="h6">
                  {marksheets.marksheets?.length > 0
                    ? `${(marksheets.marksheets.reduce((sum, m) => sum + (m.percentage || 0), 0) / marksheets.marksheets.length).toFixed(2)}%`
                    : '0%'
                  }
                </Typography>
              </Box>
            </Box>

            {/* Exam Events List */}
            <Box className="mt-3">
              <Typography variant="body2" color="textSecondary" className="mb-2">Exam Events:</Typography>
              <Box className="flex flex-wrap gap-2">
                {marksheets.examEvents?.map((event) => (
                  <Box key={event.id} className="bg-white px-3 py-1 rounded border">
                    <Typography variant="caption">
                      {event.name} ({event.type}) - {event.weightage}%
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>

          {/* Marksheets Table */}
          <Box className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Student</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">GR Number</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Roll Number</th>
                  <th className="px-4 py-2 text-center text-sm font-medium text-gray-600">Total Marks</th>
                  <th className="px-4 py-2 text-center text-sm font-medium text-gray-600">Percentage</th>
                  <th className="px-4 py-2 text-center text-sm font-medium text-gray-600">Grade</th>
                  <th className="px-4 py-2 text-center text-sm font-medium text-gray-600">Result</th>
                  <th className="px-4 py-2 text-center text-sm font-medium text-gray-600">Status</th>
                  <th className="px-4 py-2 text-center text-sm font-medium text-gray-600">Marksheet</th>
                  <th className="px-4 py-2 text-center text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {marksheets.marksheets?.map((marksheet) => (
                  <tr key={marksheet.student.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 whitespace-nowrap">
                      <Typography variant="body2" fontWeight="medium">
                        {marksheet.student.name}
                      </Typography>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <Typography variant="body2">
                        {marksheet.student.grNumber}
                      </Typography>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <Typography variant="body2">
                        {marksheet.student.rollNumber}
                      </Typography>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-center">
                      <Typography variant="body2" fontWeight="medium">
                        {marksheet.totalMarks} / {marksheet.totalMaxMarks}
                      </Typography>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-center">
                      <Typography variant="body2" fontWeight="medium">
                        {marksheet.percentage?.toFixed(2)}%
                      </Typography>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-center">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        marksheet.grade === 'A+' || marksheet.grade === 'A' ? 'bg-green-100 text-green-800' :
                        marksheet.grade === 'B+' || marksheet.grade === 'B' ? 'bg-blue-100 text-blue-800' :
                        marksheet.grade === 'C+' || marksheet.grade === 'C' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {marksheet.grade}
                      </span>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-center">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        marksheet.result?.toLowerCase() === 'pass'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {marksheet.result}
                      </span>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-center">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        marksheet.status === 'verified' ? 'bg-blue-100 text-blue-800' :
                        marksheet.status === 'published' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {marksheet.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-center">
                      {marksheet.marksheet?.url ? (
                        <a
                          href={marksheet.marksheet.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-900 text-sm"
                        >
                          📄 Download
                        </a>
                      ) : (
                        <Typography variant="caption" color="textSecondary">
                          N/A
                        </Typography>
                      )}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-center">
                      {marksheet.status === 'verified' ? (
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          onClick={() => handlePublishMarksheet(marksheet.student.id, marksheet.student.name)}
                          disabled={loading}
                        >
                          {loading ? <CircularProgress size={16} /> : "Publish"}
                        </Button>
                      ) : marksheet.status === 'published' ? (
                        <Typography variant="caption" color="success.main" fontWeight="medium">
                          ✅ Published
                        </Typography>
                      ) : (
                        <Typography variant="caption" color="textSecondary">
                          Not Ready
                        </Typography>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </Box>
      )}

      {/* No results message */}
      {!marksheets && !loading && selectedClass && selectedAcademicYear && (
        <Box className="text-center text-gray-500 mt-8">
          No marksheets found for the selected class and academic year.
        </Box>
      )}
    </Box>
  );
};

export default AllMarksheetsTab;
