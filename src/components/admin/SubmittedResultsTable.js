import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Chip, 
  Box, 
  Typography,
  Link,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from "@mui/material";
import { ExpandMore, Download, School, Person } from "@mui/icons-material";

const SubmittedResultsTable = ({ submittedResults }) => {
  if (!submittedResults) {
    return (
      <Box className="text-center text-gray-500 mt-8">
        No submitted results data available.
      </Box>
    );
  }

  const { class: classInfo, examEvents, results, excelFile } = submittedResults;

  // Get all unique subjects from the first student's results
  const allSubjects = results.length > 0 ? Object.keys(results[0].subjects || {}) : [];

  const getGradeColor = (grade) => {
    switch (grade?.toUpperCase()) {
      case 'A+':
      case 'A':
        return 'success';
      case 'B+':
      case 'B':
        return 'primary';
      case 'C+':
      case 'C':
        return 'warning';
      case 'D':
      case 'F':
        return 'error';
      default:
        return 'default';
    }
  };

  const getResultColor = (result) => {
    return result?.toLowerCase() === 'pass' ? 'success' : 'error';
  };

  return (
    <Box>
      {/* Header Information */}
      <Box className="mb-6 p-4 bg-gray-50 rounded-lg">
        <Typography variant="h6" className="mb-2 flex items-center">
          <School className="mr-2" />
          Class: {classInfo?.name} {classInfo?.division && `- ${classInfo.division}`}
        </Typography>
        
        {/* Exam Events Information */}
        <Box className="mb-3">
          <Typography variant="subtitle2" className="mb-2">Exam Events:</Typography>
          <Box className="flex flex-wrap gap-2">
            {examEvents?.map((event) => (
              <Chip
                key={event.id}
                label={`${event.name} (${event.type}) - ${event.weightage}%`}
                variant="outlined"
                size="small"
              />
            ))}
          </Box>
        </Box>

        {/* Excel File Download */}
        {excelFile && (
          <Box className="flex items-center">
            <Download className="mr-2" />
            <Link
              href={excelFile.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Download Excel File: {excelFile.originalName}
            </Link>
          </Box>
        )}
      </Box>

      {/* Results Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell><strong>Student</strong></TableCell>
              <TableCell><strong>GR Number</strong></TableCell>
              <TableCell><strong>Roll Number</strong></TableCell>
              {allSubjects.map((subjectId) => {
                const subjectName = results[0]?.subjects[subjectId]?.name || `Subject ${subjectId}`;
                return (
                  <TableCell key={subjectId} align="center">
                    <strong>{subjectName}</strong>
                  </TableCell>
                );
              })}
              <TableCell align="center"><strong>Total Marks</strong></TableCell>
              <TableCell align="center"><strong>Percentage</strong></TableCell>
              <TableCell align="center"><strong>Grade</strong></TableCell>
              <TableCell align="center"><strong>Result</strong></TableCell>
              <TableCell align="center"><strong>Files</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((result) => (
              <TableRow key={result.student.id} hover>
                <TableCell>
                  <Box className="flex items-center">
                    <Person className="mr-2 text-gray-500" />
                    {result.student.name}
                  </Box>
                </TableCell>
                <TableCell>{result.student.grNumber}</TableCell>
                <TableCell>{result.student.rollNumber}</TableCell>
                
                {/* Subject Marks */}
                {allSubjects.map((subjectId) => {
                  const subject = result.subjects[subjectId];
                  return (
                    <TableCell key={subjectId} align="center">
                      {subject ? (
                        <Box>
                          <Typography variant="body2">
                            {subject.marksObtained} / {subject.totalMarks}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            ({subject.percentage?.toFixed(1)}%)
                          </Typography>
                          {subject.remarks && (
                            <Typography variant="caption" display="block" color="textSecondary">
                              {subject.remarks}
                            </Typography>
                          )}
                        </Box>
                      ) : (
                        'N/A'
                      )}
                    </TableCell>
                  );
                })}

                {/* Total Marks */}
                <TableCell align="center">
                  <Typography variant="body2" fontWeight="bold">
                    {result.totalMarks} / {result.totalMaxMarks}
                  </Typography>
                </TableCell>

                {/* Percentage */}
                <TableCell align="center">
                  <Typography variant="body2" fontWeight="bold">
                    {result.percentage?.toFixed(2)}%
                  </Typography>
                </TableCell>

                {/* Grade */}
                <TableCell align="center">
                  <Chip
                    label={result.grade || 'N/A'}
                    color={getGradeColor(result.grade)}
                    size="small"
                  />
                </TableCell>

                {/* Result */}
                <TableCell align="center">
                  <Chip
                    label={result.result || 'N/A'}
                    color={getResultColor(result.result)}
                    size="small"
                  />
                </TableCell>

                {/* Files */}
                <TableCell align="center">
                  <Box className="flex flex-col gap-1">
                    {result.excelFile?.url && (
                      <Link
                        href={result.excelFile.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-xs"
                      >
                        Excel
                      </Link>
                    )}
                    {result.marksheet?.url && (
                      <Link
                        href={result.marksheet.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:underline text-xs"
                      >
                        Marksheet
                      </Link>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Summary Statistics */}
      <Box className="mt-6 p-4 bg-blue-50 rounded-lg">
        <Typography variant="h6" className="mb-2">Summary Statistics</Typography>
        <Box className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Box>
            <Typography variant="body2" color="textSecondary">Total Students</Typography>
            <Typography variant="h6">{results.length}</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="textSecondary">Pass Rate</Typography>
            <Typography variant="h6">
              {((results.filter(r => r.result?.toLowerCase() === 'pass').length / results.length) * 100).toFixed(1)}%
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="textSecondary">Average Percentage</Typography>
            <Typography variant="h6">
              {(results.reduce((sum, r) => sum + (r.percentage || 0), 0) / results.length).toFixed(2)}%
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="textSecondary">Exam Events</Typography>
            <Typography variant="h6">{examEvents?.length || 0}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SubmittedResultsTable;
