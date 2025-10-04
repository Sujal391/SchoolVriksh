import React from 'react';
import { Box, Typography, Button, InputLabel, MenuItem, Select, CircularProgress } from '@mui/material';
import ResultsTable from './ResultsTable';
import UnpublishedMarksheetsTable from './UnpublishedMarksheetsTable';
import ExcelUpload from './ExcelUpload';

const LegacyExamResultsTab = ({
  examEvents,
  selectedExamEvent,
  setSelectedExamEvent,
  results,
  setResults,
  unpublishedMarksheets,
  setUnpublishedMarksheets,
  loading,
  setLoading,
  error,
  setError,
  successMessage,
  setSuccessMessage,
  handleFetchResults,
  handleFetchUnpublishedMarksheets
}) => {

  return (
    <Box>
      <Box className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Box>
          <InputLabel className="block text-sm font-medium text-gray-700 mb-1">
            Select Exam Event
          </InputLabel>
          <Select
            fullWidth
            value={selectedExamEvent?._id || ""}
            onChange={(e) => setSelectedExamEvent(examEvents.find((event) => event._id === e.target.value))}
            displayEmpty
          >
            <MenuItem value="">Select an exam event</MenuItem>
            {examEvents.map((event) => (
              <MenuItem key={event._id} value={event._id}>
                {event.name} - {event.type} ({event.academicYear})
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box className="flex items-end">
          <Button
            variant="contained"
            color="primary"
            onClick={handleFetchResults}
            disabled={!selectedExamEvent || loading}
          >
            {loading ? <CircularProgress size={24} /> : "View Results"}
          </Button>
        </Box>

        <Box className="flex items-end">
          <Button
            variant="contained"
            color="secondary"
            onClick={handleFetchUnpublishedMarksheets}
            disabled={!selectedExamEvent || loading}
          >
            {loading ? <CircularProgress size={24} /> : "View Marksheets"}
          </Button>
        </Box>

        <Box className="flex items-end">
          <ExcelUpload
            examEventId={selectedExamEvent?._id}
            onUploadSuccess={() => {
              setSuccessMessage("Excel file uploaded successfully!");
              if (selectedExamEvent) {
                handleFetchResults();
              }
            }}
            onUploadError={(errorMsg) => setError(errorMsg)}
          />
        </Box>
      </Box>

      {/* Display results table */}
      {results && results.length > 0 && (
        <Box className="mb-6">
          <Typography variant="h6" className="mb-3">
            📊 Exam Results for {selectedExamEvent?.name}
          </Typography>
          <ResultsTable results={results} />
        </Box>
      )}

      {/* Display unpublished marksheets */}
      {unpublishedMarksheets && unpublishedMarksheets.length > 0 && (
        <Box className="mb-6">
          <Typography variant="h6" className="mb-3">
            📋 Unpublished Marksheets for {selectedExamEvent?.name}
          </Typography>
          <UnpublishedMarksheetsTable marksheets={unpublishedMarksheets} />
        </Box>
      )}

      {/* No results message */}
      {!results && !unpublishedMarksheets && !loading && selectedExamEvent && (
        <Box className="text-center text-gray-500 mt-8">
          No results or marksheets found for the selected exam event.
        </Box>
      )}

      {/* Instructions */}
      {!selectedExamEvent && (
        <Box className="text-center text-gray-500 mt-8">
          <Typography variant="h6" className="mb-2">📚 Legacy Exam Results Management</Typography>
          <Typography variant="body1" className="mb-4">
            Select an exam event to view results, unpublished marksheets, or upload Excel files.
          </Typography>
          <Box className="bg-blue-50 p-4 rounded-lg text-left max-w-2xl mx-auto">
            <Typography variant="body2" className="mb-2">
              <strong>Available Actions:</strong>
            </Typography>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>View Results: Display exam results for the selected exam event</li>
              <li>View Unpublished Marksheets: Show marksheets that haven't been published yet</li>
              <li>Upload Excel: Upload Excel files with exam results data</li>
            </ul>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default LegacyExamResultsTab;
