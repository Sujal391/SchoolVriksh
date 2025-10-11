import React, { useState } from 'react';
import AdminLayout from '../../../components/layout/AdminLayout';
import TimetableTab from '../../../components/admin/TimetableTab';
import { Box, Typography } from '@mui/material';

const TimetablePage = () => {
  return (
    <AdminLayout>
      <Box className="p-6">
        <TimetableTab />
      </Box>
    </AdminLayout>
  );
};

export default TimetablePage;
