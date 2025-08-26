// src/components/clerk/dashboard/ClerkDashboardContent.js
import StatsCards from './StatsCards';
import RecentApplications from './RecentApplications';
import CertificateRequests from './CertificateRequests';
import useClerk  from '../../../hooks/useClerk';

const ClerkDashboardContent = () => {
  const { dashboardData, applications, certificates, loading, error } = useClerk();

  if (loading) return <div>Loading clerk dashboard...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className='mt-10'>
      <h1 className="text-3xl font-serif mb-4 text-center">Clerk Dashboard</h1>
      <br/>
      <StatsCards data={dashboardData} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12">
        <RecentApplications applications={applications?.slice(0, 5) || []} />
        <CertificateRequests certificates={certificates?.slice(0, 5) || []} />
      </div>
    </div>
  );
};

export default ClerkDashboardContent;