import { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip } from '@mui/material';
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
  if (loading) return <div>Loading applications...</div>;

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
          {applications.map((app) => (
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
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ApplicationList;