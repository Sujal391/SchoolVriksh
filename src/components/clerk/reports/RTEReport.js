import { Card, CardContent, Typography, Grid, Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

const RTEReport = ({ report, onGenerate }) => {
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null
  });

  const handleDateChange = (name, date) => {
    setDateRange(prev => ({ ...prev, [name]: date }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (dateRange.startDate && dateRange.endDate) {
      onGenerate(dateRange.startDate, dateRange.endDate);
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>Generate RTE Report</Typography>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Start Date"
                  value={dateRange.startDate}
                  onChange={(date) => handleDateChange('startDate', date)}
                  renderInput={(params) => <TextField {...params} fullWidth required />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="End Date"
                  value={dateRange.endDate}
                  onChange={(date) => handleDateChange('endDate', date)}
                  renderInput={(params) => <TextField {...params} fullWidth required />}
                  minDate={dateRange.startDate}
                />
              </Grid>
            </Grid>
            <Button type="submit" variant="contained" color="primary">
              Generate Report
            </Button>
          </form>
        </CardContent>
      </Card>

      {report && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>RTE Report</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography><strong>Total RTE Students:</strong> {report.totalRTEStudents}</Typography>
                <Typography><strong>Verified Documents:</strong> {report.documentVerificationStatus.verified}</Typography>
                <Typography><strong>Pending Documents:</strong> {report.documentVerificationStatus.pending}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">Admissions by Class:</Typography>
                <ul className="list-disc pl-5">
                  {Object.entries(report.admissionsByClass).map(([classId, count]) => (
                    <li key={classId}>Class {classId}: {count} students</li>
                  ))}
                </ul>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RTEReport;