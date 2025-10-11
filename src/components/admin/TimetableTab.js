import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Chip,
  CircularProgress,
  Alert,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AdminService from '../../services/adminService';
import GenerateTimetableModal from './GenerateTimetableModal';
import ViewTimetableModal from './ViewTimetableModal';

const TimetableTab = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  
  // Data states
  const [classesWithSubjects, setClassesWithSubjects] = useState([]);
  const [allTimetables, setAllTimetables] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  
  // Modal states
  const [generateModalOpen, setGenerateModalOpen] = useState(false);
  const [viewTimetableModalOpen, setViewTimetableModalOpen] = useState(false);
  const [selectedTimetable, setSelectedTimetable] = useState(null);

  // Fetch classes with subjects
  const fetchClassesWithSubjects = async () => {
    try {
      setLoading(true);
      const response = await AdminService.getClassesWithSubjects();
      setClassesWithSubjects(response.classes || []);
    } catch (error) {
      console.error('Error fetching classes with subjects:', error);
      setError('Failed to load classes with subjects');
    } finally {
      setLoading(false);
    }
  };

  // Fetch all timetables
  const fetchAllTimetables = async () => {
    try {
      setLoading(true);
      const response = await AdminService.getAllTimetables();
      setAllTimetables(response.timetables || []);
    } catch (error) {
      console.error('Error fetching timetables:', error);
      setError('Failed to load timetables');
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchClassesWithSubjects();
    fetchAllTimetables();
  }, []);

  // Handle class selection for timetable generation
  const handleClassSelection = (classId) => {
    setSelectedClasses(prev => 
      prev.includes(classId) 
        ? prev.filter(id => id !== classId)
        : [...prev, classId]
    );
  };

  // Handle timetable generation
  const handleGenerateTimetable = async (timetableConfig) => {
    try {
      setLoading(true);
      const response = await AdminService.generateTimetable({
        classIds: selectedClasses,
        ...timetableConfig
      });
      
      setSuccessMessage(`✅ ${response.message}`);
      setSnackbarOpen(true);
      setGenerateModalOpen(false);
      setSelectedClasses([]);
      
      // Refresh timetables
      await fetchAllTimetables();
    } catch (error) {
      console.error('Error generating timetable:', error);
      const errorMessage = error.response?.data?.message || error.message;
      setError(`❌ Failed to generate timetable: ${errorMessage}`);
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  // Handle view timetable
  const handleViewTimetable = async (timetable) => {
    try {
      setLoading(true);
      // Fetch detailed timetable data
      const response = await AdminService.getSpecificTimetable(timetable._id);
      setSelectedTimetable(response.timetable);
      setViewTimetableModalOpen(true);
    } catch (error) {
      console.error('Error fetching specific timetable:', error);
      const errorMessage = error.response?.data?.message || error.message;
      setError(`❌ Failed to load timetable details: ${errorMessage}`);
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  // Handle download timetable PDF
  const handleDownloadTimetable = async (timetableId, className) => {
    try {
      setLoading(true);
      const response = await AdminService.downloadTimetablePDF(timetableId);

      // Create blob and download
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Timetable_${className}_${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setSuccessMessage(`✅ Timetable PDF downloaded successfully for ${className}!`);
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error downloading timetable PDF:', error);
      const errorMessage = error.response?.data?.message || error.message;
      setError(`❌ Failed to download timetable PDF: ${errorMessage}`);
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  // Handle bulk download all timetables
  const handleBulkDownload = async () => {
    if (allTimetables.length === 0) {
      setError('❌ No timetables available for download');
      setSnackbarOpen(true);
      return;
    }

    try {
      setLoading(true);
      let successCount = 0;
      let failCount = 0;

      for (const timetable of allTimetables) {
        try {
          const className = `${timetable.class?.name}_${timetable.class?.division}`;
          const response = await AdminService.downloadTimetablePDF(timetable._id);

          // Create blob and download
          const blob = new Blob([response.data], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `Timetable_${className}_${new Date().toISOString().split('T')[0]}.pdf`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);

          successCount++;
          // Small delay between downloads
          await new Promise(resolve => setTimeout(resolve, 500));
        } catch (error) {
          console.error(`Error downloading timetable for ${timetable.class?.name}:`, error);
          failCount++;
        }
      }

      if (successCount > 0) {
        setSuccessMessage(`✅ Successfully downloaded ${successCount} timetable(s)${failCount > 0 ? `. ${failCount} failed.` : '!'}`);
      } else {
        setError(`❌ Failed to download all ${failCount} timetable(s)`);
      }
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error in bulk download:', error);
      setError('❌ Failed to download timetables');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  // Show success/error messages
  const showMessage = (message, type = 'success') => {
    if (type === 'success') {
      setSuccessMessage(message);
      setError(null);
    } else {
      setError(message);
      setSuccessMessage('');
    }
    setSnackbarOpen(true);
  };

  return (
    <Box>
      {/* Header */}
      <Box className="mb-6">
        <Typography variant="h4" className="mb-2">
          📅 Timetable Management
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Generate and manage class timetables with subjects and teachers
        </Typography>
      </Box>

      {/* Action Buttons */}
      <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Button
          variant="contained"
          color="primary"
          onClick={() => setGenerateModalOpen(true)}
          disabled={loading || selectedClasses.length === 0}
        >
          Generate Timetable ({selectedClasses.length} classes)
        </Button>

        <Button
          variant="outlined"
          color="primary"
          onClick={fetchClassesWithSubjects}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Refresh Classes"}
        </Button>

        <Button
          variant="outlined"
          color="secondary"
          onClick={fetchAllTimetables}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Refresh Timetables"}
        </Button>

        <Button
          variant="contained"
          color="success"
          onClick={handleBulkDownload}
          disabled={loading || allTimetables.length === 0}
        >
          📄 Download All PDFs ({allTimetables.length})
        </Button>
      </Box>

      {/* Statistics */}
      <Box className="mb-6 p-3 bg-gray-50 rounded-lg">
        <Typography variant="body2" color="textSecondary" className="text-center">
          📊 {allTimetables.length} timetable(s) generated | 📚 {classesWithSubjects.length} class(es) available |
          ✅ {selectedClasses.length} class(es) selected
        </Typography>
      </Box>

      {/* Classes with Subjects Section */}
      <Card className="mb-6">
        <CardHeader 
          title="📚 Classes with Subjects"
          subheader="Select classes to generate timetables"
        />
        <CardContent>
          {loading ? (
            <Box className="text-center py-4">
              <CircularProgress />
              <Typography variant="body2" className="mt-2">Loading classes...</Typography>
            </Box>
          ) : classesWithSubjects.length === 0 ? (
            <Alert severity="info">
              No classes with subjects found. Please ensure classes and subjects are properly configured.
            </Alert>
          ) : (
            <Grid container spacing={3}>
              {classesWithSubjects.map((classItem) => (
                <Grid item xs={12} md={6} lg={4} key={classItem._id}>
                  <Card 
                    variant="outlined" 
                    className={`cursor-pointer transition-all ${
                      selectedClasses.includes(classItem._id) 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => handleClassSelection(classItem._id)}
                  >
                    <CardContent>
                      <Box className="flex justify-between items-start mb-2">
                        <Typography variant="h6">
                          {classItem.name} {classItem.division}
                        </Typography>
                        {selectedClasses.includes(classItem._id) && (
                          <Chip label="Selected" color="primary" size="small" />
                        )}
                      </Box>
                      
                      <Typography variant="body2" color="textSecondary" className="mb-2">
                        Subjects: {classItem.subjects?.length || 0}
                      </Typography>
                      
                      <Box className="flex flex-wrap gap-1">
                        {classItem.subjects?.slice(0, 3).map((subject) => (
                          <Chip 
                            key={subject._id} 
                            label={subject.name} 
                            size="small" 
                            variant="outlined"
                          />
                        ))}
                        {classItem.subjects?.length > 3 && (
                          <Chip 
                            label={`+${classItem.subjects.length - 3} more`} 
                            size="small" 
                            variant="outlined"
                            color="secondary"
                          />
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </CardContent>
      </Card>

      {/* Generated Timetables Section */}
      <Card>
        <CardHeader 
          title="🗓️ Generated Timetables"
          subheader={`${allTimetables.length} timetable(s) available`}
        />
        <CardContent>
          {loading ? (
            <Box className="text-center py-4">
              <CircularProgress />
              <Typography variant="body2" className="mt-2">Loading timetables...</Typography>
            </Box>
          ) : allTimetables.length === 0 ? (
            <Alert severity="info">
              No timetables generated yet. Select classes above and click "Generate Timetable" to create new timetables.
            </Alert>
          ) : (
            <Grid container spacing={3}>
              {allTimetables.map((timetable) => (
                <Grid item xs={12} md={6} lg={4} key={timetable._id}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" className="mb-2">
                        {timetable.class?.name} {timetable.class?.division}
                      </Typography>
                      
                      <Box className="space-y-1 mb-3">
                        <Typography variant="body2" color="textSecondary">
                          Academic Year: {timetable.academicYear}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          School Type: {timetable.config?.schoolType}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Time: {timetable.config?.startTime} - {timetable.config?.endTime}
                        </Typography>
                      </Box>
                      
                      <Box className="space-y-2">
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          fullWidth
                          onClick={() => handleViewTimetable(timetable)}
                          disabled={loading}
                        >
                          View Details
                        </Button>
                        <Button
                          variant="outlined"
                          color="secondary"
                          size="small"
                          fullWidth
                          onClick={() => handleDownloadTimetable(
                            timetable._id,
                            `${timetable.class?.name}_${timetable.class?.division}`
                          )}
                          disabled={loading}
                        >
                          📄 Download PDF
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </CardContent>
      </Card>

      {/* Success/Error Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => {
          setSnackbarOpen(false);
          setError(null);
          setSuccessMessage('');
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={() => {
            setSnackbarOpen(false);
            setError(null);
            setSuccessMessage('');
          }}
          severity={error ? 'error' : 'success'}
          variant="filled"
        >
          {error || successMessage}
        </Alert>
      </Snackbar>

      {/* Generate Timetable Modal */}
      <GenerateTimetableModal
        isOpen={generateModalOpen}
        onClose={() => setGenerateModalOpen(false)}
        selectedClasses={selectedClasses}
        onSubmit={handleGenerateTimetable}
      />

      {/* View Timetable Modal */}
      <ViewTimetableModal
        isOpen={viewTimetableModalOpen}
        onClose={() => setViewTimetableModalOpen(false)}
        timetable={selectedTimetable}
        onDownload={handleDownloadTimetable}
      />
    </Box>
  );
};

export default TimetableTab;
