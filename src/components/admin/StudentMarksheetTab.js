import React from 'react';
import { Box, Typography, Button, InputLabel, MenuItem, Select, CircularProgress, Card, CardContent } from '@mui/material';
import AdminService from '../../services/adminService';

const StudentMarksheetTab = ({ 
  selectedAcademicYear, 
  setSelectedAcademicYear,
  availableAcademicYears,
  loading,
  setLoading,
  error,
  setError,
  successMessage,
  setSuccessMessage
}) => {
  
  const [students, setStudents] = React.useState([]);
  const [selectedStudent, setSelectedStudent] = React.useState(null);
  const [studentMarksheet, setStudentMarksheet] = React.useState(null);
  const [searchQuery, setSearchQuery] = React.useState('');

  // Fetch all students when component mounts
  React.useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await AdminService.getAllStudents();
        setStudents(response.students || []);
      } catch (error) {
        console.error("Error fetching students:", error);
        setError("Failed to load students: " + (error.response?.data?.error || error.message));
      }
    };
    fetchStudents();
  }, [setError]);

  // Function to fetch student marksheet using new API
  const handleFetchStudentMarksheet = async () => {
    if (!selectedStudent || !selectedAcademicYear) return;

    setLoading(true);
    setError(null);
    setSuccessMessage('');
    setStudentMarksheet(null);
    
    try {
      const response = await AdminService.getStudentMarksheet(selectedStudent._id, selectedAcademicYear);
      setStudentMarksheet(response);
      setSuccessMessage(`✅ Marksheet found for ${selectedStudent.name}`);
    } catch (error) {
      console.error("Error fetching student marksheet:", error);
      const errorMessage = error.response?.data?.error || error.message;
      if (error.response?.status === 404) {
        setError(`❌ No published marksheet found for ${selectedStudent.name} in academic year ${selectedAcademicYear}`);
      } else {
        setError("❌ Failed to load student marksheet: " + errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  // Filter students based on search query
  const filteredStudents = students.filter(student => 
    student.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.grNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.rollNumber?.toString().includes(searchQuery)
  );

  return (
    <Box>
      <Box className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
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
            Search Student
          </InputLabel>
          <input
            type="text"
            placeholder="Search by name, GR number, or roll number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </Box>

        <Box>
          <InputLabel className="block text-sm font-medium text-gray-700 mb-1">
            Select Student
          </InputLabel>
          <Select
            fullWidth
            value={selectedStudent?._id || ""}
            onChange={(e) => setSelectedStudent(students.find((student) => student._id === e.target.value))}
            displayEmpty
          >
            <MenuItem value="">Select a student</MenuItem>
            {filteredStudents.map((student) => (
              <MenuItem key={student._id} value={student._id}>
                {student.name} - {student.grNumber} (Roll: {student.rollNumber})
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box className="flex items-end">
          <Button
            variant="contained"
            color="primary"
            onClick={handleFetchStudentMarksheet}
            disabled={!selectedStudent || !selectedAcademicYear || loading}
          >
            {loading ? <CircularProgress size={24} /> : "Get Marksheet"}
          </Button>
        </Box>
      </Box>

      {/* Display student marksheet */}
      {studentMarksheet && (
        <Card className="mb-6" elevation={2}>
          <CardContent>
            <Typography variant="h6" className="mb-4">
              📄 Student Marksheet Details
            </Typography>
            
            <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Student Information */}
              <Box>
                <Typography variant="subtitle1" fontWeight="bold" className="mb-3">
                  Student Information
                </Typography>
                <Box className="space-y-2">
                  <Box>
                    <Typography variant="body2" color="textSecondary">Name:</Typography>
                    <Typography variant="body1" fontWeight="medium">{studentMarksheet.student?.name}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="textSecondary">GR Number:</Typography>
                    <Typography variant="body1">{studentMarksheet.student?.grNumber}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="textSecondary">Roll Number:</Typography>
                    <Typography variant="body1">{studentMarksheet.student?.rollNumber}</Typography>
                  </Box>
                </Box>
              </Box>

              {/* Class and Academic Information */}
              <Box>
                <Typography variant="subtitle1" fontWeight="bold" className="mb-3">
                  Academic Information
                </Typography>
                <Box className="space-y-2">
                  <Box>
                    <Typography variant="body2" color="textSecondary">Class:</Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {studentMarksheet.class?.name} - {studentMarksheet.class?.division}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="textSecondary">Academic Year:</Typography>
                    <Typography variant="body1">{studentMarksheet.academicYear}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="textSecondary">Published At:</Typography>
                    <Typography variant="body1">
                      {studentMarksheet.publishedAt ? new Date(studentMarksheet.publishedAt).toLocaleString() : 'N/A'}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* Marksheet Download Section */}
            <Box className="mt-6 p-4 bg-green-50 rounded-lg">
              <Typography variant="subtitle1" fontWeight="bold" className="mb-3">
                📋 Marksheet Download
              </Typography>
              
              <Box className="flex items-center justify-between">
                <Box>
                  <Typography variant="body2" color="textSecondary">
                    Download Status: 
                    <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                      studentMarksheet.canDownload 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {studentMarksheet.canDownload ? '✅ Available' : '❌ Not Available'}
                    </span>
                  </Typography>
                  
                  {studentMarksheet.marksheet?.key && (
                    <Typography variant="body2" color="textSecondary" className="mt-1">
                      File Key: {studentMarksheet.marksheet.key}
                    </Typography>
                  )}
                </Box>

                {studentMarksheet.canDownload && studentMarksheet.marksheet?.url && (
                  <Button
                    variant="contained"
                    color="success"
                    href={studentMarksheet.marksheet.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    📄 Download Marksheet
                  </Button>
                )}
              </Box>
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Instructions */}
      {!selectedStudent && !selectedAcademicYear && (
        <Box className="text-center text-gray-500 mt-8">
          <Typography variant="h6" className="mb-2">🎓 Student Marksheet Lookup</Typography>
          <Typography variant="body1" className="mb-4">
            Search and select a student to view their published marksheet for a specific academic year.
          </Typography>
          <Box className="bg-blue-50 p-4 rounded-lg text-left max-w-2xl mx-auto">
            <Typography variant="body2" className="mb-2">
              <strong>How to use:</strong>
            </Typography>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Select an academic year from the dropdown</li>
              <li>Use the search box to find students by name, GR number, or roll number</li>
              <li>Select a student from the filtered list</li>
              <li>Click "Get Marksheet" to retrieve their published marksheet</li>
              <li>Download the marksheet PDF if available</li>
            </ul>
          </Box>
        </Box>
      )}

      {/* No marksheet found message */}
      {!studentMarksheet && !loading && selectedStudent && selectedAcademicYear && (
        <Box className="text-center text-gray-500 mt-8">
          <Typography variant="body1">
            Click "Get Marksheet" to search for {selectedStudent.name}'s marksheet in {selectedAcademicYear}.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default StudentMarksheetTab;
