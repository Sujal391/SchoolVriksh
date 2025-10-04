import React from 'react';
import { Box, Typography, Button, InputLabel, MenuItem, Select, CircularProgress } from '@mui/material';
import AdminService from '../../services/adminService';

const PublishedMarksheetsTab = ({ 
  selectedClass, 
  selectedAcademicYear, 
  setSelectedAcademicYear,
  availableAcademicYears,
  classes,
  setSelectedClass,
  loading,
  setLoading,
  error,
  setError,
  successMessage,
  setSuccessMessage
}) => {
  
  const [publishedMarksheets, setPublishedMarksheets] = React.useState(null);

  // Function to fetch published marksheets using new API
  const handleFetchPublishedMarksheets = async () => {
    if (!selectedClass || !selectedAcademicYear) return;

    setLoading(true);
    setError(null);
    setSuccessMessage('');
    try {
      const response = await AdminService.getPublishedMarksheets(selectedClass._id, selectedAcademicYear);
      setPublishedMarksheets(response);
    } catch (error) {
      console.error("Error fetching published marksheets:", error);
      setError("Failed to load published marksheets: " + (error.response?.data?.error || error.message));
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

        <Box className="flex items-end">
          <Button
            variant="contained"
            color="primary"
            onClick={handleFetchPublishedMarksheets}
            disabled={!selectedClass || !selectedAcademicYear || loading}
          >
            {loading ? <CircularProgress size={24} /> : "View Published Marksheets"}
          </Button>
        </Box>
      </Box>

      {/* Display published marksheets */}
      {publishedMarksheets && (
        <Box>
          {/* Published Marksheets Overview */}
          <Box className="mb-4 p-4 bg-green-50 rounded-lg">
            <Typography variant="h6" className="mb-2">
              📋 Published Marksheets for {publishedMarksheets.class?.name} {publishedMarksheets.class?.division && `- ${publishedMarksheets.class.division}`}
            </Typography>
            
            <Box className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Box>
                <Typography variant="body2" color="textSecondary">Total Published</Typography>
                <Typography variant="h6" color="success.main">{publishedMarksheets.totalPublished || 0}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="textSecondary">Academic Year</Typography>
                <Typography variant="h6">{publishedMarksheets.academicYear}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="textSecondary">Class</Typography>
                <Typography variant="h6">{publishedMarksheets.class?.name} - {publishedMarksheets.class?.division}</Typography>
              </Box>
            </Box>
          </Box>

          {/* Published Marksheets Table */}
          <Box className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Student</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">GR Number</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Roll Number</th>
                  <th className="px-4 py-2 text-center text-sm font-medium text-gray-600">Published At</th>
                  <th className="px-4 py-2 text-center text-sm font-medium text-gray-600">Marksheet</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {publishedMarksheets.publishedMarksheets?.map((marksheet) => (
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
                      <Typography variant="body2">
                        {marksheet.publishedAt ? new Date(marksheet.publishedAt).toLocaleDateString() : 'N/A'}
                      </Typography>
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
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </Box>
      )}

      {/* No results message */}
      {!publishedMarksheets && !loading && selectedClass && selectedAcademicYear && (
        <Box className="text-center text-gray-500 mt-8">
          No published marksheets found for the selected class and academic year.
        </Box>
      )}
    </Box>
  );
};

export default PublishedMarksheetsTab;
