import { useState, useEffect } from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import AdminLayout from '../../../components/layout/AdminLayout';
import AdminService from '../../../services/adminService';
import LeaveRequestTable from '../../../components/admin/LeaveRequestManagement';
import LeaveRequestHistory from '../../../components/admin/LeaveRequestHistory';

const LeaveRequestsPage = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (activeTab === 0) {
      fetchPendingLeaveRequests();
    }
  }, [activeTab]);

  const fetchPendingLeaveRequests = async () => {
    try {
      setLoading(true);
      const response = await AdminService.getPendingLeaveRequests();
      setLeaveRequests(response.data.leaves || []);
    } catch (error) {
      console.error('Error fetching leave requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReview = async (leaveId, status, comments = '') => {
    try {
      await AdminService.reviewLeaveRequest(leaveId, { status, comments });
      // Refresh the pending requests list
      await fetchPendingLeaveRequests();
    } catch (error) {
      console.error('Error reviewing leave:', error);
      throw error; // Re-throw to handle in component
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 600, color: '#1976d2' }}>
          Leave Management
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
              label="Pending Requests"
              sx={{
                '&.Mui-selected': {
                  color: '#1976d2',
                  fontWeight: 600
                }
              }}
            />
            <Tab
              label="History"
              sx={{
                '&.Mui-selected': {
                  color: '#1976d2',
                  fontWeight: 600
                }
              }}
            />
          </Tabs>
        </Box>

        {activeTab === 0 && (
          <LeaveRequestTable
            leaveRequests={leaveRequests}
            onReview={handleReview}
            loading={loading}
          />
        )}

        {activeTab === 1 && (
          <LeaveRequestHistory />
        )}
      </div>
    </AdminLayout>
  );
};

export default LeaveRequestsPage;