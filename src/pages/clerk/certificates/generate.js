import { useAuth } from '../../../contexts/AuthContext';
import withProtectedRoute from '../../../components/common/ProtectedRoute';
import ClerkLayout from '../../../components/layout/ClerkLayout';
import CertificateGenerator from '../../../components/clerk/certificates/CertificateGenerator';
import useClerk from '../../../hooks/useClerk';
import Link from 'next/link';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import { useState } from 'react';
import TextField from '@mui/material/TextField';

const GenerateCertificatePage = () => {
  const { generateCertificate } = useClerk();
  const router = useRouter();
  const [studentId, setStudentId] = useState('');

  const handleGenerate = async (data) => {
    try {
      await generateCertificate(studentId, data);
      router.push('/clerk/certificates');
    } catch (error) {
      console.error('Certificate generation failed:', error);
    }
  };

  return (
    <ClerkLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Generate Certificate</h1>
          <Link href="/clerk/certificates" passHref>
            <Button variant="outlined">Back to Certificates</Button>
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <TextField
            fullWidth
            label="Student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            margin="normal"
            required
          />

          {studentId && (
            <CertificateGenerator 
              certificateId={studentId} 
              onSubmit={handleGenerate} 
            />
          )}
        </div>
      </div>
    </ClerkLayout>
  );
};

export default withProtectedRoute(GenerateCertificatePage, ['clerk']);