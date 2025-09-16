import { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, CircularProgress, Box } from '@mui/material';
import Link from 'next/link';

const statusColors = {
  pending: 'warning',
  document_verification: 'info',
  fees_pending: 'secondary',
  approved: 'success',
  rejected: 'error',
  confirmed: 'primary',
  enrolled: 'success'
};

const ApplicationList = ({ applications, loading }) => {

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Tracking ID</TableCell>
            <TableCell>Student Name</TableCell>
            <TableCell>Class</TableCell>
            <TableCell>Admission Type</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Submitted On</TableCell>
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
                  <CircularProgress size={20} />
                  <Box ml={2}>Loading Applications...</Box>
                </Box>
              </TableCell>
            </TableRow>
          ) : ( applications.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} align="center">
                No applications found
              </TableCell>
            </TableRow>
          ) : (
          applications.map((app) => (
            <TableRow key={app.id}>
              <TableCell>{app.trackingId}</TableCell>
              <TableCell>{app.studentDetails.name}</TableCell>
              <TableCell>{app.studentDetails.appliedClass}</TableCell>
              <TableCell>{app.admissionType}</TableCell>
              <TableCell>
                <Chip 
                  label={app.status.replace('_', ' ')} 
                  color={statusColors[app.status] || 'default'}
                  size="small"
                />
              </TableCell>
              <TableCell>{new Date(app.submittedOn).toLocaleDateString()}</TableCell>
              <TableCell>
                <Link href={`/clerk/admissions/${app.id}`} className="text-blue-500 hover:underline">
                  View Details
                </Link>
              </TableCell>
            </TableRow>
          )))
        )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ApplicationList;