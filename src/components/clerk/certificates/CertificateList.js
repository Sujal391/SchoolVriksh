// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Tabs, Tab, Box } from '@mui/material';
// import Link from 'next/link';
// import { useState } from 'react';
// import CertificateVerifier from './CertificateVerifier';

// const CertificateList = ({ certificates }) => {
//   const [tabValue, setTabValue] = useState(0);

//   const handleTabChange = (event, newValue) => {
//     setTabValue(newValue);
//   };

//   // Filter certificates based on tab
//   const getFilteredCertificates = () => {
//     switch (tabValue) {
//       case 0: // All
//         return certificates;
//       case 1: // Pending
//         return certificates.filter(cert => cert.status === 'pending');
//       case 2: // Generated
//         return certificates.filter(cert => cert.status === 'generated');
//       case 3: // Rejected
//         return certificates.filter(cert => cert.status === 'rejected');
//       default:
//         return certificates;
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'generated':
//         return 'success';
//       case 'pending':
//         return 'warning';
//       case 'rejected':
//         return 'error';
//       default:
//         return 'default';
//     }
//   };

//   const getUrgencyColor = (urgency) => {
//     switch (urgency) {
//       case 'high':
//         return 'error';
//       case 'medium':
//         return 'warning';
//       case 'normal':
//         return 'default';
//       default:
//         return 'default';
//     }
//   };

//   const filteredCertificates = getFilteredCertificates();

//   return (
//     <div>
//       <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
//         <Tabs value={tabValue} onChange={handleTabChange}>
//           <Tab label={`All (${certificates.length})`} />
//           <Tab label={`Pending (${certificates.filter(c => c.status === 'pending').length})`} />
//           <Tab label={`Generated (${certificates.filter(c => c.status === 'generated').length})`} />
//           <Tab label={`Rejected (${certificates.filter(c => c.status === 'rejected').length})`} />
//         </Tabs>
//       </Box>

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Student</TableCell>
//               <TableCell>Type</TableCell>
//               <TableCell>Purpose</TableCell>
//               <TableCell>Urgency</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>Request Date</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredCertificates.map((cert) => (
//               <TableRow key={cert.id}>
//                 <TableCell>
//                   <div>
//                     <div className="font-medium">{cert.studentName}</div>
//                     <div className="text-sm text-gray-500">GR: {cert.grNumber}</div>
//                   </div>
//                 </TableCell>
//                 <TableCell>
//                   <Chip
//                     label={cert.type}
//                     variant="outlined"
//                     size="small"
//                   />
//                 </TableCell>
//                 <TableCell>{cert.purpose}</TableCell>
//                 <TableCell>
//                   <Chip
//                     label={cert.urgency}
//                     color={getUrgencyColor(cert.urgency)}
//                     size="small"
//                   />
//                 </TableCell>
//                 <TableCell>
//                   <Chip
//                     label={cert.status}
//                     color={getStatusColor(cert.status)}
//                     size="small"
//                   />
//                 </TableCell>
//                 <TableCell>{new Date(cert.requestDate).toLocaleDateString()}</TableCell>
//                 <TableCell>
//                   <Link href={`/clerk/certificates/${cert.id}`} className="text-blue-500 hover:underline">
//                     View Details
//                   </Link>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {filteredCertificates.length === 0 && (
//         <div className="text-center py-8 text-gray-500">
//           No certificates found for the selected filter.
//         </div>
//       )}
//     </div>
//   );
// };

// export default CertificateList;

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Tabs,
  Tab,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { VerifiedUser } from "@mui/icons-material";
import Link from "next/link";
import { useState } from "react";
import CertificateVerifier from "./CertificateVerifier";

const CertificateList = ({ certificates, loading, error }) => {
  const [tabValue, setTabValue] = useState(0);
  const [showVerifier, setShowVerifier] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Filter certificates based on tab
  const getFilteredCertificates = () => {
    switch (tabValue) {
      case 0: // All
        return certificates;
      case 1: // Pending
        return certificates.filter((cert) => cert.status === "pending");
      case 2: // Generated
        return certificates.filter((cert) => cert.status === "generated");
      case 3: // Rejected
        return certificates.filter((cert) => cert.status === "rejected");
      default:
        return certificates;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "generated":
        return "success";
      case "pending":
        return "warning";
      case "rejected":
        return "error";
      default:
        return "default";
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case "high":
        return "error";
      case "medium":
        return "warning";
      case "normal":
        return "default";
      default:
        return "default";
    }
  };

  const filteredCertificates = getFilteredCertificates();

  return (
    <div>
      {/* Option 1: Header with action button (Recommended) */}
      {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}> */}
      {/* <Typography variant="h5" component="h1">
          Certificate Management
        </Typography> */}
      <Box display="flex" flexDirection="column" alignItems="flex-end" gap={2}>
        <Button
          variant="outlined"
          startIcon={<VerifiedUser />}
          onClick={() => setShowVerifier((prev) => !prev)}
        >
          {showVerifier ? "Cancel" : "Verify Certificate"}
        </Button>

        {showVerifier && <CertificateVerifier />}
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label={`All (${certificates.length})`} />
          <Tab
            label={`Pending (${
              certificates.filter((c) => c.status === "pending").length
            })`}
          />
          <Tab
            label={`Generated (${
              certificates.filter((c) => c.status === "generated").length
            })`}
          />
          <Tab
            label={`Rejected (${
              certificates.filter((c) => c.status === "rejected").length
            })`}
          />
        </Tabs>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Purpose</TableCell>
              <TableCell>Urgency</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Request Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    py={2}
                  >
                    <CircularProgress size={24} />
                    <Box ml={2}>Loading certificates...</Box>
                  </Box>
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Alert severity="error">Error: {error}</Alert>
                </TableCell>
              </TableRow>
            ) : filteredCertificates.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Box py={4} color="text.secondary">
                    No certificates found for the selected filter.
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              filteredCertificates.map((cert) => (
                <TableRow key={cert.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{cert.studentName}</div>
                      <div className="text-sm text-gray-500">
                        GR: {cert.grNumber}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Chip label={cert.type} variant="outlined" size="small" />
                  </TableCell>
                  <TableCell>{cert.purpose}</TableCell>
                  <TableCell>
                    <Chip
                      label={cert.urgency}
                      color={getUrgencyColor(cert.urgency)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={cert.status}
                      color={getStatusColor(cert.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {new Date(cert.requestDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/clerk/certificates/${cert.id}`}
                      className="text-blue-500 hover:underline"
                    >
                      View Details
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* {filteredCertificates.length === 0 && !loading && !error && (
        <div className="text-center py-8 text-gray-500">
          No certificates found for the selected filter.
        </div>
      )} */}
    </div>
  );
};

export default CertificateList;
