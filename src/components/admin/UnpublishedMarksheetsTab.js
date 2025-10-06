import React from 'react';
import { Box, Typography, Button, InputLabel, MenuItem, Select, CircularProgress } from '@mui/material';
import AdminService from '../../services/adminService';

const UnpublishedMarksheetsTab = ({ 
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
  
  const [unpublishedMarksheets, setUnpublishedMarksheets] = React.useState(null);

  // Function to fetch unpublished marksheets using new API
  const handleFetchUnpublishedMarksheets = async () => {
    if (!selectedClass || !selectedAcademicYear) return;

    setLoading(true);
    setError(null);
    setSuccessMessage('');
    try {
      const response = await AdminService.getUnpublishedMarksheets(selectedClass._id, selectedAcademicYear);
      setUnpublishedMarksheets(response);
    } catch (error) {
      console.error("Error fetching unpublished marksheets:", error);
      setError("Failed to load unpublished marksheets: " + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  // Function to publish individual marksheet from unpublished list
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
      
      // Refresh unpublished marksheets to show updated status
      await handleFetchUnpublishedMarksheets();
    } catch (error) {
      console.error("Error publishing marksheet:", error);
      const errorMessage = error.response?.data?.error || error.message;
      setError("❌ Failed to publish marksheet: " + errorMessage);
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
            color="warning"
            onClick={handleFetchUnpublishedMarksheets}
            disabled={!selectedClass || !selectedAcademicYear || loading}
          >
            {loading ? <CircularProgress size={24} /> : "View Unpublished Marksheets"}
          </Button>
        </Box>
      </Box>

      {/* Display unpublished marksheets */}
      {unpublishedMarksheets && (
        <Box>
          {/* Summary Overview */}
          <Box className="mb-4 p-4 bg-orange-50 rounded-lg">
            <Typography variant="h6" className="mb-2">
              ⚠️ Unpublished Marksheets for {unpublishedMarksheets.class?.name} {unpublishedMarksheets.class?.division && `- ${unpublishedMarksheets.class.division}`}
            </Typography>
            
            <Box className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Box>
                <Typography variant="body2" color="textSecondary">Total Students</Typography>
                <Typography variant="h6">{unpublishedMarksheets.summary?.totalStudents || 0}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="textSecondary">Verified (Ready)</Typography>
                <Typography variant="h6" color="primary.main">{unpublishedMarksheets.summary?.verifiedNotPublished || 0}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="textSecondary">Not Generated</Typography>
                <Typography variant="h6" color="error.main">{unpublishedMarksheets.summary?.notGenerated || 0}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="textSecondary">Ready for Publishing</Typography>
                <Typography variant="h6" color="success.main">{unpublishedMarksheets.summary?.readyForPublishing || 0}</Typography>
              </Box>
            </Box>
          </Box>

          {/* Unpublished Marksheets Table */}
          <Box className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Student</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">GR Number</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Roll Number</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Contact</th>
                  <th className="px-4 py-2 text-center text-sm font-medium text-gray-600">Status</th>
                  <th className="px-4 py-2 text-center text-sm font-medium text-gray-600">Reason</th>
                  <th className="px-4 py-2 text-center text-sm font-medium text-gray-600">Verified At</th>
                  <th className="px-4 py-2 text-center text-sm font-medium text-gray-600">Marksheet</th>
                  <th className="px-4 py-2 text-center text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {/* {unpublishedMarksheets.unpublishedMarksheets?.filter((marksheet) => marksheet.status === 'unpublished').map((marksheet) => (  -----this filters out not generated marksheets ------ */}
                {unpublishedMarksheets.unpublishedMarksheets?.map((marksheet) => (
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
                    <td className="px-4 py-2 whitespace-nowrap">
                      <Typography variant="body2">
                        {marksheet.student.contact || marksheet.student.parentContact || 'N/A'}
                      </Typography>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-center">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        marksheet.status === 'verified_not_published' ? 'bg-blue-100 text-blue-800' :
                        marksheet.status === 'not_generated' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {marksheet.status?.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-center">
                      <Typography variant="body2">
                        {marksheet.reason || 'N/A'}
                      </Typography>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-center">
                      <Typography variant="body2">
                        {marksheet.verifiedAt ? new Date(marksheet.verifiedAt).toLocaleDateString() : 'N/A'}
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
                    <td className="px-4 py-2 whitespace-nowrap text-center">
                      {marksheet.status === 'verified_not_published' && marksheet.marksheet?.url ? (
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          onClick={() => handlePublishMarksheet(marksheet.student.id, marksheet.student.name)}
                          disabled={loading}
                        >
                          {loading ? <CircularProgress size={16} /> : "Publish"}
                        </Button>
                      ) : marksheet.status === 'not_generated' ? (
                        <Typography variant="caption" color="error.main">
                          ❌ Not Generated
                        </Typography>
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
      {!unpublishedMarksheets && !loading && selectedClass && selectedAcademicYear && (
        <Box className="text-center text-gray-500 mt-8">
          No unpublished marksheets found for the selected class and academic year.
        </Box>
      )}
    </Box>
  );
};

export default UnpublishedMarksheetsTab;
