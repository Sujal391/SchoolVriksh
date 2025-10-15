// src/components/clerk/dashboard/ClerkDashboardContent.js
import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect } from "react";
import StatsCards from "./StatsCards";
import RecentApplications from "./RecentApplications";
import CertificateRequests from "./CertificateRequests";
import useClerk from "../../../hooks/useClerk";

const ClerkDashboardContent = () => {
  const { dashboardData, applications, certificates, loading, error, fetchDashboardData } = useClerk();

  // Only fetch dashboard-specific data
  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading)
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="70vh"
      >
        <CircularProgress size={48} thickness={4} />
        <Typography variant="h6" color="text.secondary" mt={2}>
          Loading Clerk Dashboard...
        </Typography>
      </Box>
    );

  if (error)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="70vh">
        <Typography color="error">Error: {error.message}</Typography>
      </Box>
    );

  return (
    <div className="mt-10">
      <h1 className="text-3xl bold mb-4 text-center">Clerk Dashboard</h1>
      <br />
      <StatsCards data={dashboardData} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12">
        <RecentApplications applications={applications?.slice(0, 5) || []} />
        <CertificateRequests certificates={certificates?.slice(0, 5) || []} />
      </div>
    </div>
  );
};

export default ClerkDashboardContent;
