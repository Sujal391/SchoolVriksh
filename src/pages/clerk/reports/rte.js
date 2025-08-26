// src/pages/clerk/reports/rte.js
import { useAuth } from '../../../contexts/AuthContext';
import withProtectedRoute from '../../../components/common/ProtectedRoute';
import ClerkLayout from '../../../components/layout/ClerkLayout';
import RTEReport from '../../../components/clerk/reports/RTEReport';
import  useClerk  from '../../../hooks/useClerk';
import Link from 'next/link';
import Button from '@mui/material/Button';

const RTEReportPage = () => {
  const { generateRTEReport, loading, error } = useClerk();
  const [report, setReport] = useState(null);

  const handleGenerate = async (startDate, endDate) => {
    try {
      const result = await generateRTEReport(startDate, endDate);
      setReport(result.report);
    } catch (err) {
      console.error('Report generation failed:', err);
    }
  };

  return (
    <ClerkLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">RTE Report</h1>
          <Link href="/clerk/dashboard" passHref>
            <Button variant="outlined">Back to Dashboard</Button>
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <RTEReport 
            report={report} 
            onGenerate={handleGenerate} 
            loading={loading}
          />
        </div>
      </div>
    </ClerkLayout>
  );
};

export default withProtectedRoute(RTEReportPage, ['clerk']);