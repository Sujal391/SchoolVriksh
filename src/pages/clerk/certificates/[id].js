// import { useRouter } from 'next/router';
// import { useAuth } from '../../../contexts/AuthContext';
// import withProtectedRoute from '../../../components/common/ProtectedRoute';
// import ClerkLayout from '../../../components/layout/ClerkLayout';
// import CertificateDetail from '../../../components/clerk/certificates/CertificateDetail';
// import CertificateGenerator from '../../../components/clerk/certificates/CertificateGenerator';
// import CertificateUploader from '../../../components/clerk/certificates/CertificateUploader';
// import useClerk from '../../../hooks/useClerk';
// import { useEffect, useState } from 'react';

// const CertificateDetailPage = () => {
//   const router = useRouter();
//   const { id } = router.query;
//   const { 
//     certificates, 
//     pendingCertificates, 
//     generateCertificate, 
//     uploadSignedCertificate, 
//     sendCertificateToStudent, 
//     loading, 
//     error 
//   } = useClerk();
//   const [certificate, setCertificate] = useState(null);
  


//   // useEffect(() => {
//   //   if (id && (certificates.length > 0 || pendingCertificates.length > 0)) {
//   //     // Look in both pending and history
//   //     const cert = [...pendingCertificates, ...certificates].find(c => c.id === id);
//   //     setCertificate(cert || null);
//   //   }
//   // }, [id, certificates, pendingCertificates]);

//   useEffect(() => {
//   if (
//     id &&
//     (Array.isArray(certificates) && certificates.length > 0 ||
//      Array.isArray(pendingCertificates) && pendingCertificates.length > 0)
//   ) {
//     const cert = [...(pendingCertificates || []), ...(certificates || [])].find(c => c.id === id);
//     setCertificate(cert || null);
//   }
// }, [id, certificates, pendingCertificates]);


//   const handleGenerate = async (certificateData) => {
//     try {
//       await generateCertificate(id, certificateData);
//       // Refresh the page to show updated data
//       router.reload();
//     } catch (err) {
//       console.error('Generation failed:', err);
//       throw err;
//     }
//   };

//   const handleUpload = async (file) => {
//     try {
//       await uploadSignedCertificate(id, file);
//       // Refresh the page to show updated data
//       router.reload();
//     } catch (err) {
//       console.error('Upload failed:', err);
//       throw err;
//     }
//   };

//   const handleSendToStudent = async () => {
//     try {
//       await sendCertificateToStudent(id);
//       // Refresh the page to show updated data
//       router.reload();
//     } catch (err) {
//       console.error('Failed to send certificate:', err);
//       alert('Failed to send certificate: ' + err.message);
//     }
//   };

//   if (loading) return <div className="flex justify-center items-center h-64">Loading certificate details...</div>;
//   if (error) return <div className="text-red-500 text-center">Error: {error}</div>;
//   if (!certificate) return <div className="text-center">Certificate not found</div>;

//   return (
//     <ClerkLayout>
//       <div className="space-y-6">
//         <CertificateDetail 
//           certificate={certificate} 
//           onSendToStudent={handleSendToStudent} 
//         />
        
//         {/* Show generator for pending certificates */}
//         {certificate.status === 'pending' && (
//           <CertificateGenerator 
//             certificate={certificate}
//             onGenerate={handleGenerate} 
//           />
//         )}
        
//         {/* Show uploader for generated certificates without signed document */}
//         {certificate.status === 'generated' && !certificate.signedDocumentAccessUrl && (
//           <CertificateUploader 
//             certificateId={certificate.id} 
//             onUpload={handleUpload} 
//           />
//         )}
//       </div>
//     </ClerkLayout>
//   );
// };

// export default withProtectedRoute(CertificateDetailPage, ['clerk']);



// pages/clerk/certificates/[id].js
import { useRouter } from 'next/router';
import ClerkLayout from '../../../components/layout/ClerkLayout';
import CertificateGenerator from '../../../components/clerk/certificates/CertificateGenerator';
import CertificateVerifier from '../../../components/clerk/certificates/CertificateVerifier';
import CertificateDetail from '../../../components/clerk/certificates/CertificateDetail';
import useClerk from '../../../hooks/useClerk';
import { useEffect, useState } from 'react';
import { Tab, Tabs, Box, CircularProgress } from '@mui/material';

const CertificateDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { 
    certificates, 
    pendingCertificates, 
    generateCertificate, 
    verifyCertificateBySerial 
  } = useClerk();
  
  const [certificate, setCertificate] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (id && (certificates || pendingCertificates)) {
      const allCerts = [...(pendingCertificates || []), ...(certificates || [])];
      const cert = allCerts.find(c => c.id === id);
      setCertificate(cert || null);
    }
  }, [id, certificates, pendingCertificates]);

  return (
    <ClerkLayout>
      {!certificate ? (
        <Box display="flex" justifyContent="center" alignItems="center" py={4} gap={2}>
          <CircularProgress size={20} /> <span>Loading certificate details...</span>
        </Box>
      ) : (
        <>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
              <Tab label="Details" />
              <Tab label="Generate" />
              {/* <Tab label="Verify" /> */}
            </Tabs>
          </Box>
          
          {activeTab === 0 && <CertificateDetail certificate={certificate} />}
          {activeTab === 1 && certificate.status === 'pending' && (
            <CertificateGenerator 
              certificateId={id} 
              initialData={certificate}
            />
          )}
          {activeTab === 2 && <CertificateVerifier />}
        </>
      )}
    </ClerkLayout>
  );
};

export default CertificateDetailPage;