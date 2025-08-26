import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip } from '@mui/material';

const LeaveStatus = ({ leaves }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>Period</TableCell>
            <TableCell>Reason</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Applied On</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leaves.map((leave) => (
            <TableRow key={leave.id}>
              <TableCell>{leave.type}</TableCell>
              <TableCell>
                {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
              </TableCell>
              <TableCell>{leave.reason}</TableCell>
              <TableCell>
                <Chip 
                  label={leave.status} 
                  color={
                    leave.status === 'approved' ? 'success' :
                    leave.status === 'pending' ? 'warning' : 'error'
                  }
                />
              </TableCell>
              <TableCell>{new Date(leave.appliedOn).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LeaveStatus;