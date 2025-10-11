import { useState } from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import AdminLayout from '../../../components/layout/AdminLayout';
import AttendanceOverview from '../../../components/admin/AttendanceOverview';
import DetailedAttendance from '../../../components/admin/DetailedAttendance';

const AttendancePage = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 600, color: '#1976d2' }}>
          Attendance Management
        </Typography>
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '1rem',
                minWidth: 120,
              }
            }}
          >
            <Tab 
              label="Overview" 
              sx={{ 
                '&.Mui-selected': { 
                  color: '#1976d2',
                  fontWeight: 600 
                } 
              }} 
            />
            <Tab 
              label="Detailed Records" 
              sx={{ 
                '&.Mui-selected': { 
                  color: '#1976d2',
                  fontWeight: 600 
                } 
              }} 
            />
          </Tabs>
        </Box>

        {activeTab === 0 && <AttendanceOverview />}
        {activeTab === 1 && <DetailedAttendance />}
      </div>
    </AdminLayout>
  );
};

export default AttendancePage;
