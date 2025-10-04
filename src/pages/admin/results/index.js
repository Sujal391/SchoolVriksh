import { useState, useEffect, memo } from "react";
import AdminLayout from "../../../components/layout/AdminLayout";
import AdminService from "../../../services/adminService";
import SubmittedResultsTab from "../../../components/admin/SubmittedResultsTab";
import AllMarksheetsTab from "../../../components/admin/AllMarksheetsTab";
import PublishedMarksheetsTab from "../../../components/admin/PublishedMarksheetsTab";
import UnpublishedMarksheetsTab from "../../../components/admin/UnpublishedMarksheetsTab";
import StudentMarksheetTab from "../../../components/admin/StudentMarksheetTab";
import LegacyExamResultsTab from "../../../components/admin/LegacyExamResultsTab";
import {
  ErrorMessage,
  SuccessMessage,
  ResultsPageHeader,
  ResultsTabNavigation,
  TabPanel
} from "../../../components/admin/ResultsPageComponents";
import { Box } from "@mui/material";

const ExamResultsPage = () => {
  // State for exam events and classes
  const [examEvents, setExamEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);

  // State for different result types
  const [results, setResults] = useState([]);
  const [unpublishedMarksheets, setUnpublishedMarksheets] = useState([]);
  const [submittedResults, setSubmittedResults] = useState(null);
  const [marksheets, setMarksheets] = useState(null);

  // State for academic year filtering
  const [availableAcademicYears, setAvailableAcademicYears] = useState([]);
  const [selectedAcademicYear, setSelectedAcademicYear] = useState('');

  // UI state
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Initialize data on component mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [examResponse, classesResponse] = await Promise.all([
          AdminService.getExamSchedules(),
          AdminService.getClasses()
        ]);

        setExamEvents(examResponse.data.examEvent);
        setClasses(classesResponse.data);

        // Extract academic years from exam events
        const academicYears = [...new Set(
          examResponse.data.examEvent
            .map(event => event.academicYear)
            .filter(year => year)
        )].sort((a, b) => b.localeCompare(a));

        setAvailableAcademicYears(academicYears);
        if (academicYears.length > 0) {
          setSelectedAcademicYear(academicYears[0]); // Set most recent academic year
        }
      } catch (error) {
        console.error("Error fetching initial data:", error);
        setError("Failed to load initial data: " + error.message);
      }
    };

    fetchInitialData();
  }, []);

  // Legacy exam results functions
  const handleFetchResults = async () => {
    if (!selectedEvent) return;

    setLoading(true);
    setError(null);
    try {
      const response = await AdminService.getResults(selectedEvent._id);
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching results:", error);
      setError("Failed to load results: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchUnpublishedMarksheets = async () => {
    if (!selectedEvent) return;

    setLoading(true);
    setError(null);
    try {
      const response = await AdminService.getUnpublishedMarksheets(selectedEvent._id);
      setUnpublishedMarksheets(response.data);
    } catch (error) {
      console.error("Error fetching unpublished marksheets:", error);
      setError("Failed to load unpublished marksheets: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Clear messages when tab changes
  useEffect(() => {
    setError(null);
    setSuccessMessage('');
  }, [tabValue]);

  return (
    <AdminLayout>
      <Box className="p-6">
        <ResultsPageHeader />

        <ErrorMessage error={error} />
        <SuccessMessage successMessage={successMessage} />

        <ResultsTabNavigation tabValue={tabValue} setTabValue={setTabValue} />

        {/* Tab Panel 0: Submitted Excel Results */}
        <TabPanel value={tabValue} index={0}>
          <SubmittedResultsTab
            selectedClass={selectedClass}
            selectedAcademicYear={selectedAcademicYear}
            setSelectedAcademicYear={setSelectedAcademicYear}
            availableAcademicYears={availableAcademicYears}
            classes={classes}
            setSelectedClass={setSelectedClass}
            submittedResults={submittedResults}
            setSubmittedResults={setSubmittedResults}
            loading={loading}
            setLoading={setLoading}
            verifying={verifying}
            setVerifying={setVerifying}
            error={error}
            setError={setError}
            successMessage={successMessage}
            setSuccessMessage={setSuccessMessage}
          />
        </TabPanel>

        {/* Tab Panel 1: All Marksheets */}
        <TabPanel value={tabValue} index={1}>
          <AllMarksheetsTab
            selectedClass={selectedClass}
            selectedAcademicYear={selectedAcademicYear}
            setSelectedAcademicYear={setSelectedAcademicYear}
            availableAcademicYears={availableAcademicYears}
            classes={classes}
            setSelectedClass={setSelectedClass}
            marksheets={marksheets}
            setMarksheets={setMarksheets}
            loading={loading}
            setLoading={setLoading}
            error={error}
            setError={setError}
            successMessage={successMessage}
            setSuccessMessage={setSuccessMessage}
          />
        </TabPanel>

        {/* Tab Panel 2: Published Marksheets */}
        <TabPanel value={tabValue} index={2}>
          <PublishedMarksheetsTab
            selectedClass={selectedClass}
            selectedAcademicYear={selectedAcademicYear}
            setSelectedAcademicYear={setSelectedAcademicYear}
            availableAcademicYears={availableAcademicYears}
            classes={classes}
            setSelectedClass={setSelectedClass}
            loading={loading}
            setLoading={setLoading}
            error={error}
            setError={setError}
            successMessage={successMessage}
            setSuccessMessage={setSuccessMessage}
          />
        </TabPanel>

        {/* Tab Panel 3: Unpublished Marksheets */}
        <TabPanel value={tabValue} index={3}>
          <UnpublishedMarksheetsTab
            selectedClass={selectedClass}
            selectedAcademicYear={selectedAcademicYear}
            setSelectedAcademicYear={setSelectedAcademicYear}
            availableAcademicYears={availableAcademicYears}
            classes={classes}
            setSelectedClass={setSelectedClass}
            loading={loading}
            setLoading={setLoading}
            error={error}
            setError={setError}
            successMessage={successMessage}
            setSuccessMessage={setSuccessMessage}
          />
        </TabPanel>

        {/* Tab Panel 4: Student Marksheet */}
        <TabPanel value={tabValue} index={4}>
          <StudentMarksheetTab
            selectedAcademicYear={selectedAcademicYear}
            setSelectedAcademicYear={setSelectedAcademicYear}
            availableAcademicYears={availableAcademicYears}
            loading={loading}
            setLoading={setLoading}
            error={error}
            setError={setError}
            successMessage={successMessage}
            setSuccessMessage={setSuccessMessage}
          />
        </TabPanel>

        {/* Tab Panel 5: Legacy Exam Results */}
        <TabPanel value={tabValue} index={5}>
          <LegacyExamResultsTab
            examEvents={examEvents}
            selectedExamEvent={selectedEvent}
            setSelectedExamEvent={setSelectedEvent}
            results={results}
            setResults={setResults}
            unpublishedMarksheets={unpublishedMarksheets}
            setUnpublishedMarksheets={setUnpublishedMarksheets}
            loading={loading}
            setLoading={setLoading}
            error={error}
            setError={setError}
            successMessage={successMessage}
            setSuccessMessage={setSuccessMessage}
            handleFetchResults={handleFetchResults}
            handleFetchUnpublishedMarksheets={handleFetchUnpublishedMarksheets}
          />
        </TabPanel>
      </Box>
    </AdminLayout>
  );
};

export default memo(ExamResultsPage);