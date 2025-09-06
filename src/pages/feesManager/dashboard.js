import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  LinearProgress,
  useTheme,
  Alert,
} from "@mui/material";
import {
  MonetizationOn as FeesIcon,
  Receipt as ReceiptsIcon,
  People as StudentsIcon,
  CheckCircle as VerifiedIcon,
  PendingActions as PendingIcon,
} from "@mui/icons-material";
import FeesManagerLayout from "../../components/layout/FeesManagerLayout";
import feesService from "../../services/feesService";
import { useAuth } from "../../contexts/AuthContext";

const DashboardCard = ({ icon, title, value, color }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        height: "100%",
        boxShadow: theme.shadows[4],
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-5px)",
        },
      }}
    >
      <CardContent
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Box
          sx={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            backgroundColor: `${color}.light`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 2,
          }}
        >
          {icon}
        </Box>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4" component="div" color="text.primary">
          {value || "0"}
        </Typography>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  const { school } = useAuth();
  const [stats, setStats] = useState({
    totalFees: 0,
    collectedFees: 0,
    pendingFees: 0,
    students: 0,
    verifiedPayments: 0,
    pendingVerification: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const currentYear = new Date().getFullYear();

        // Fetch main API (already includes summary, student stats, quick stats, etc.)
        const earningsResponse = await feesService.getTotalEarningsByYear(
          currentYear
        );
        const data = earningsResponse.data || {};

        // If you really want pending details separately, keep this.
        const pendingResponse = await feesService.getPendingPayments();
        const pendingPayments = pendingResponse.data || {};

        // Extract only what you care about
        const summary = data.summary || {};
        const studentStats = data.studentStats || {};
        const quickStats = data.quickStats || {};

        // Update minimal stats only
        setStats({
          // Summary
          totalFees: summary.totalDefined || 0,
          collectedFees: summary.totalEarning || 0,
          pendingFees: summary.totalPending || 0,
          totalTransactions: summary.totalTransactions || 0,
          collectionRate: summary.collectionRate || 0,

          // Students
          students: studentStats.totalStudents || 0,
          studentsWithPending: studentStats.studentsWithPendingFees || 0,
          paidStudents: studentStats.paidStudents || 0,
          paymentRate: studentStats.paymentRate || 0,

          // Quick stats
          pendingPayments: quickStats.pendingPayments || 0,
          averageTransaction: quickStats.averageTransaction || 0,

          // Extra check from second API
          pendingVerification: pendingPayments.payments?.length || 0,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setError("Failed to load dashboard data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <FeesManagerLayout>
        <LinearProgress />
      </FeesManagerLayout>
    );
  }

  if (error) {
    return (
      <FeesManagerLayout>
        <Alert severity="error" sx={{ my: 2 }}>
          {error}
        </Alert>
      </FeesManagerLayout>
    );
  }

  return (
    <FeesManagerLayout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Fees Dashboard
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {school?.name || "School"} - Overview of fees management
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        {[
          {
            title: "Total Fees Defined",
            value: `₹${(stats.totalFees ?? 0).toLocaleString()}`,
            color: "primary",
            icon: <FeesIcon fontSize="large" color="primary" />,
          },
          {
            title: "Collected Fees",
            value: `₹${(stats.collectedFees ?? 0).toLocaleString()}`,
            color: "success",
            icon: <FeesIcon fontSize="large" color="success" />,
          },
          {
            title: "Pending Fees",
            value: `₹${(stats.pendingFees ?? 0).toLocaleString()}`,
            color: "warning",
            icon: <FeesIcon fontSize="large" color="warning" />,
          },
          {
            title: "Collection Rate",
            value: `${(stats.collectionRate ?? 0).toFixed(2)}%`,
            color: "secondary",
            icon: <FeesIcon fontSize="large" color="secondary" />,
          },
          {
            title: "Total Students",
            value: (stats.students ?? 0).toLocaleString(),
            color: "info",
            icon: <StudentsIcon fontSize="large" color="info" />,
          },
          {
            title: "Students with Pending Fees",
            value: (stats.studentsWithPending ?? 0).toLocaleString(),
            color: "warning",
            icon: <PendingIcon fontSize="large" color="warning" />,
          },
          {
            title: "Paid Students",
            value: (stats.paidStudents ?? 0).toLocaleString(),
            color: "success",
            icon: <VerifiedIcon fontSize="large" color="success" />,
          },
          {
            title: "Payment Rate",
            value: `${(stats.paymentRate ?? 0).toFixed(2)}%`,
            color: "secondary",
            icon: <StudentsIcon fontSize="large" color="secondary" />,
          },
          {
            title: "Total Transactions",
            value: (stats.totalTransactions ?? 0).toLocaleString(),
            color: "primary",
            icon: <FeesIcon fontSize="large" color="primary" />,
          },
          {
            title: "Average Transaction",
            value: `₹${(stats.averageTransaction ?? 0).toLocaleString()}`,
            color: "info",
            icon: <FeesIcon fontSize="large" color="info" />,
          },
          {
            title: "Growth Amount",
            value: `₹${(stats.growthAmount ?? 0).toLocaleString()}`,
            color: "success",
            icon: <FeesIcon fontSize="large" color="success" />,
          },
          {
            title: "Growth %",
            value: `${(stats.growthPercentage ?? 0).toFixed(2)}%`,
            color: "secondary",
            icon: <FeesIcon fontSize="large" color="secondary" />,
          },
          {
            title: "Pending Verification",
            value: (stats.pendingVerification ?? 0).toLocaleString(),
            color: "error",
            icon: <PendingIcon fontSize="large" color="error" />,
          },
          {
            title: "Most Used Payment",
            value: `${stats.mostUsedPaymentMethod?._id || "N/A"} (${(
              stats.mostUsedPaymentMethod?.transactions ?? 0
            ).toLocaleString()})`,
            color: "secondary",
            icon: <FeesIcon fontSize="large" color="secondary" />,
          },
        ].map((card, index) => (
          <Box
            key={index}
            sx={{
              flex: "1 1 calc(20% - 16px)", // Each card takes roughly 20% width with gap compensation
              minWidth: "200px", // Prevent cards from shrinking too small
              maxWidth: "250px",
            }}
          >
            <DashboardCard
              icon={card.icon}
              title={card.title}
              value={card.value}
              color={card.color}
            />
          </Box>
        ))}
      </Box>

      {/* Recent Activities Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Recent Activities
        </Typography>
        <Card>
          <CardContent>
            <Typography color="text.secondary">
              No recent activities to display
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </FeesManagerLayout>
  );
};

export default Dashboard;
