// // components/clerk/certificates/CertificateVerifier.js
// import { useState } from 'react';
// import { Button, TextField, Card, CardContent, Typography } from '@mui/material';
// import useClerk from '../../../hooks/useClerk';

// const CertificateVerifier = () => {
//   const [serialNumber, setSerialNumber] = useState('');
//   const [certificate, setCertificate] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const { verifyCertificateBySerial } = useClerk();

//   const handleVerify = async () => {
//   if (!serialNumber) {
//     setError('Please enter a serial number');
//     return;
//   }
  
//   try {
//     setLoading(true);
//     setError(null);
//     const result = await verifyCertificateBySerial(serialNumber);
//     if (!result.certificate) {
//       throw new Error('Certificate not found');
//     }
//     setCertificate(result.certificate);
//   } catch (err) {
//     setError(err.message || 'Certificate not found or invalid');
//     setCertificate(null);
//   } finally {
//     setLoading(false);
//   }
// };

//   return (
//     <div className="space-y-4">
//       <Card>
//         <CardContent>
//           <Typography variant="h6" gutterBottom>Verify Certificate</Typography>
//           <div className="flex gap-2 items-center">
//             <TextField
//               label="Enter Serial Number"
//               value={serialNumber}
//               onChange={(e) => setSerialNumber(e.target.value)}
//               fullWidth
//             />
//             <Button 
//               variant="contained" 
//               onClick={handleVerify}
//               disabled={loading}
//             >
//               {loading ? 'Verifying...' : 'Verify'}
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//       {error && (
//         <Typography color="error" className="text-center">
//           {error}
//         </Typography>
//       )}

//       {certificate && (
//         <Card>
//           <CardContent>
//             <Typography variant="h6" gutterBottom>
//               Certificate Details
//             </Typography>
//             <Typography><strong>Student:</strong> {certificate.studentName}</Typography>
//             <Typography><strong>Type:</strong> {certificate.type}</Typography>
//             <Typography><strong>Issued Date:</strong> {certificate.issuedDate}</Typography>
//             <Typography><strong>Status:</strong> {certificate.status}</Typography>
            
//             {certificate.documentAccessUrl && (
//               <Button 
//                 variant="outlined" 
//                 href={certificate.documentAccessUrl}
//                 target="_blank"
//                 className="mt-2"
//               >
//                 View Certificate
//               </Button>
//             )}
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   );
// };

// export default CertificateVerifier;



import { useState } from 'react';
import { Button, TextField, Card, CardContent, Typography, Box } from '@mui/material';
import useClerk from '../../../hooks/useClerk';

const CertificateVerifier = () => {
  const [serialNumber, setSerialNumber] = useState('');
  const [certificate, setCertificate] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { verifyCertificateBySerial } = useClerk();

  const handleVerify = async () => {
    if (!serialNumber.trim()) {
      setError('Please enter a serial number');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      const result = await verifyCertificateBySerial(serialNumber);
      
      if (!result || !result.certificate) {
        throw new Error('Certificate not found');
      }
      
      setCertificate(result.certificate);
    } catch (err) {
      setError(err.message || 'Certificate not found or invalid');
      setCertificate(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>Verify Certificate</Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mt: 2 }}>
            <TextField
              label="Enter Serial Number"
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
              fullWidth
              variant="outlined"
              placeholder="e.g. SN/25/123"
            />
            <Button 
              variant="contained" 
              onClick={handleVerify}
              disabled={loading || !serialNumber.trim()}
              size="large"
            >
              {loading ? 'Verifying...' : 'Verify'}
            </Button>
          </Box>
        </CardContent>
      </Card>

      {error && (
        <Card sx={{ mb: 3, bgcolor: 'error.light' }}>
          <CardContent>
            <Typography color="error">{error}</Typography>
          </CardContent>
        </Card>
      )}

      {certificate && (
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Certificate Details
            </Typography>
            
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <Typography><strong>Student:</strong> {certificate.studentName}</Typography>
              <Typography><strong>GR Number:</strong> {certificate.grNumber}</Typography>
              <Typography><strong>Type:</strong> {certificate.type}</Typography>
              <Typography><strong>Issued Date:</strong> {new Date(certificate.issuedDate).toLocaleDateString()}</Typography>
              <Typography><strong>Status:</strong> {certificate.status}</Typography>
              <Typography><strong>Serial Number:</strong> {certificate.serialNumber}</Typography>
              <Typography><strong>Class:</strong> {certificate.className}</Typography>
              <Typography><strong>School:</strong> {certificate.schoolName}</Typography>
            </Box>
            
            {certificate.documentAccessUrl && (
              <Box sx={{ mt: 3 }}>
                <Button 
                  variant="contained" 
                  href={certificate.documentAccessUrl}
                  target="_blank"
                  fullWidth
                >
                  View Certificate
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default CertificateVerifier;