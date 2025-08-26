import { useState, useEffect, memo } from "react";
import AdminLayout from "../../../components/layout/AdminLayout";
import AdminService from "../../../services/adminService";
import ResultsTable from "../../../components/admin/ResultsTable";
import UnpublishedMarksheetsTable from "../../../components/admin/UnpublishedMarksheetsTable";
import ExcelUpload from "../../../components/admin/ExcelUpload";
import { Box, Button, InputLabel, MenuItem, Select, CircularProgress } from "@mui/material";

const ExamResultsPage = () => {
  const [examEvents, setExamEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [results, setResults] = useState([]);
  const [unpublishedMarksheets, setUnpublishedMarksheets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExamEvents = async () => {
      try {
        const response = await AdminService.getExamSchedules();
        setExamEvents(response.data.examEvent);
      } catch (error) {
        console.error("Error fetching exam events:", error);
        setError("Failed to load exam events.");
      }
    };

    fetchExamEvents();
  }, []);

  useEffect(() => {
    if (selectedEvent) {
      setClasses(selectedEvent.classes || []);
      setSelectedClass(null);
      setResults([]);
      setUnpublishedMarksheets([]);
    }
  }, [selectedEvent]);

  const handleFetchResults = async () => {
    setResults([]);
    if (!selectedEvent || !selectedClass) return;

    setLoading(true);
    setError(null);
    try {
      const response = await AdminService.reviewClassResults(selectedEvent._id, selectedClass._id);
      setResults(response.results || []);
    } catch (error) {
      console.error("Error fetching results:", error);
      setError("Failed to load results: " + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleFetchUnpublishedMarksheets = async () => {
    if (!selectedEvent || !selectedClass) return;

    setLoading(true);
    setError(null);
    try {
      const response = await AdminService.getUnpublishedMarksheets(selectedEvent._id, selectedClass._id);
      setUnpublishedMarksheets(response.marksheets || []);
    } catch (error) {
      console.error("Error fetching unpublished marksheets:", error);
      setError("Failed to load unpublished marksheets: " + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handlePublishMarksheet = async (studentId) => {
    if (!selectedEvent || !selectedClass) return;

    setLoading(true);
    setError(null);
    try {
      await AdminService.publishIndividualMarksheet(selectedEvent._id, selectedClass._id, studentId);
      // Refresh both results and unpublished marksheets
      await Promise.all([handleFetchResults(), handleFetchUnpublishedMarksheets()]);
      alert("Marksheet published successfully!");
    } catch (error) {
      console.error("Error publishing marksheet:", error);
      setError("Failed to publish marksheet: " + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleExcelUploadSuccess = async () => {
    // Refresh results and unpublished marksheets after successful upload
    await Promise.all([handleFetchResults(), handleFetchUnpublishedMarksheets()]);
  };

  return (
    <AdminLayout>
      <Box className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Exam Results Management</h1>

        {error && (
          <Box className="mb-4 p-4 bg-red-100 text-red-700 rounded">{error}</Box>
        )}

        <Box className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Box>
            <InputLabel className="block text-sm font-medium text-gray-700 mb-1">
              Select Exam Event
            </InputLabel>
            <Select
              fullWidth
              value={selectedEvent?._id || ""}
              onChange={(e) => setSelectedEvent(examEvents.find((ev) => ev._id === e.target.value))}
              displayEmpty
            >
              <MenuItem value="">Select an exam event</MenuItem>
              {examEvents.map((exam) => (
                <MenuItem key={exam._id} value={exam._id}>
                  {exam.examType === "Other" ? exam.customExamType : exam.examType}
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
              disabled={!selectedEvent}
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
              onClick={() => {
                handleFetchResults();
                handleFetchUnpublishedMarksheets();
              }}
              disabled={!selectedClass || loading}
            >
              {loading ? <CircularProgress size={24} /> : "View Results"}
            </Button>
          </Box>
        </Box>

        <ExcelUpload
          examEventId={selectedEvent?._id}
          classId={selectedClass?._id}
          onUploadSuccess={handleExcelUploadSuccess}
        />

        {results.length > 0 && (
          <>
            <ResultsTable results={results} onPublish={handlePublishMarksheet} />
          </>
        )}

        {unpublishedMarksheets.length > 0 && (
          <UnpublishedMarksheetsTable marksheets={unpublishedMarksheets} onPublish={handlePublishMarksheet} />
        )}

        {(results.length === 0 && unpublishedMarksheets.length === 0 && !loading && selectedClass) && (
          <Box className="text-center text-gray-500 mt-8">
            No results or unpublished marksheets found for the selected class and exam event.
          </Box>
        )}
      </Box>
    </AdminLayout>
  );
};

export default memo(ExamResultsPage);