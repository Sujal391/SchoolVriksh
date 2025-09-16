import { useState, useEffect } from 'react';
import AdminLayout from '../../../components/layout/AdminLayout';
import AdminService from '../../../services/adminService';
import LeaveRequestTable from '../../../components/admin/LeaveRequestManagement';

const LeaveRequestsPage = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await AdminService.getPendingLeaveRequests();
        setLeaveRequests(response.data.leaves);
      } catch (error) {
        console.error('Error fetching leave requests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaveRequests();
  }, []);

  const handleReview = async (leaveId, status, comments = '') => {
    try {
      await AdminService.reviewLeaveRequest(leaveId, { status, comments });
      // Refresh the list
      const response = await AdminService.getPendingLeaveRequests();
      setLeaveRequests(response.data.leaves);
    } catch (error) {
      console.error('Error reviewing leave:', error);
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Leave Requests</h1>
        
        <LeaveRequestTable 
            leaveRequests={leaveRequests} 
            onReview={handleReview} 
          />
      </div>
    </AdminLayout>
  );
};

export default LeaveRequestsPage;