import { Button, Typography, Card, CardContent, Grid } from '@mui/material';
import Link from 'next/link';

const CertificateDetail = ({ certificate, onSendToStudent }) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>Certificate Details</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography><strong>Student:</strong> {certificate.studentName}</Typography>
              <Typography><strong>GR Number:</strong> {certificate.grNumber}</Typography>
              <Typography><strong>Class:</strong> {certificate.className}</Typography>
              <Typography><strong>Email:</strong> {certificate.studentEmail}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography><strong>Type:</strong> {certificate.type}</Typography>
              <Typography><strong>Purpose:</strong> {certificate.purpose}</Typography>
              <Typography><strong>Status:</strong> {certificate.status}</Typography>
              <Typography><strong>Urgency:</strong> {certificate.urgency}</Typography>
              <Typography><strong>Request Date:</strong> {new Date(certificate.requestDate).toLocaleDateString()}</Typography>
            </Grid>
          </Grid>
          
          {certificate.comments && (
            <div className="mt-4">
              <Typography><strong>Comments:</strong> {certificate.comments}</Typography>
            </div>
          )}
        </CardContent>
      </Card>

      {certificate.documentAccessUrl && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Certificate Document</Typography>
            <Button 
              variant="contained" 
              color="primary"
              href={certificate.documentAccessUrl}
              target="_blank"
              className="mr-2"
            >
              View Certificate
            </Button>
          </CardContent>
        </Card>
      )}

      {certificate.signedDocumentAccessUrl && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Signed Certificate</Typography>
            <Button 
              variant="contained" 
              color="primary"
              href={certificate.signedDocumentAccessUrl}
              target="_blank"
              className="mr-2"
            >
              View Signed Copy
            </Button>
          </CardContent>
        </Card>
      )}

      {certificate.status === 'generated' && certificate.signedDocumentAccessUrl && !certificate.isSentToStudent && (
        <Button 
          variant="contained" 
          color="secondary"
          onClick={onSendToStudent}
          fullWidth
        >
          Send to Student
        </Button>
      )}

      <Link href="/clerk/certificates">
        <Button variant="outlined" fullWidth>Back to List</Button>
      </Link>
    </div>
  );
};

export default CertificateDetail;


