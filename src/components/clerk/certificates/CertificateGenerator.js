// import { useState } from 'react';
// import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Typography, Card, CardContent } from '@mui/material';
// import useClerk from '../../../hooks/useClerk';

// const CertificateGenerator = ({ certificate, onGenerate }) => {
//   const [certificateData, setCertificateData] = useState({
//     status: 'generated',
//     comments: '',
//     certificateType: certificate?.type || 'transfer',
//     pdfData: null
//   });
//   const [isGenerating, setIsGenerating] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!certificateData.pdfData) {
//       alert('Please upload a PDF certificate');
//       return;
//     }
    
//     setIsGenerating(true);
//     try {
//       await onGenerate(certificateData);
//     } catch (error) {
//       console.error('Certificate generation failed:', error);
//       alert('Failed to generate certificate: ' + error.message);
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const handleReject = async () => {
//     setIsGenerating(true);
//     try {
//       await onGenerate({
//         status: 'rejected',
//         comments: certificateData.comments,
//         certificateType: certificate?.type || 'transfer',
//         pdfData: null
//       });
//     } catch (error) {
//       console.error('Certificate rejection failed:', error);
//       alert('Failed to reject certificate: ' + error.message);
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.type !== 'application/pdf') {
//         alert('Please select a PDF file');
//         return;
//       }
      
//       const reader = new FileReader();
//       reader.onload = () => {
//         const base64 = reader.result.split(',')[1];
//         setCertificateData({ ...certificateData, pdfData: base64 });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <Card>
//       <CardContent>
//         <Typography variant="h6" gutterBottom>Generate Certificate</Typography>
        
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <FormControl fullWidth>
//             <InputLabel>Certificate Type</InputLabel>
//             <Select
//               value={certificateData.certificateType}
//               onChange={(e) => setCertificateData({ ...certificateData, certificateType: e.target.value })}
//               disabled={certificate?.type} // Disable if certificate type is already set
//             >
//               <MenuItem value="transfer">Transfer Certificate</MenuItem>
//               <MenuItem value="bonafide">Bonafide Certificate</MenuItem>
//               <MenuItem value="leaving">Leaving Certificate</MenuItem>
//             </Select>
//           </FormControl>

//           <TextField
//             label="Comments"
//             fullWidth
//             multiline
//             rows={3}
//             value={certificateData.comments}
//             onChange={(e) => setCertificateData({ ...certificateData, comments: e.target.value })}
//           />

//           <div>
//             <label className="block mb-2 font-medium">Upload PDF Certificate *</label>
//             <input
//               type="file"
//               accept=".pdf"
//               onChange={handleFileChange}
//               required
//               className="block w-full text-sm text-gray-500
//                 file:mr-4 file:py-2 file:px-4
//                 file:rounded-md file:border-0
//                 file:text-sm file:font-semibold
//                 file:bg-blue-50 file:text-blue-700
//                 hover:file:bg-blue-100"
//             />
//           </div>

//           <div className="flex space-x-2">
//             <Button 
//               type="submit" 
//               variant="contained" 
//               color="primary"
//               disabled={isGenerating || !certificateData.pdfData}
//               fullWidth
//             >
//               {isGenerating ? 'Generating...' : 'Generate Certificate'}
//             </Button>
            
//             <Button 
//               type="button"
//               variant="contained" 
//               color="error"
//               disabled={isGenerating}
//               onClick={handleReject}
//               fullWidth
//             >
//               {isGenerating ? 'Rejecting...' : 'Reject Request'}
//             </Button>
//           </div>
//         </form>
//       </CardContent>
//     </Card>
//   );
// };

// export default CertificateGenerator;




// import { useState } from 'react';
// import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Grid } from '@mui/material';
// import { useRouter } from 'next/router';
// import { jsPDF } from 'jspdf';
// import useClerk from '../../../hooks/useClerk';
// import { v4 as uuidv4 } from 'uuid';

// // Certificate templates
// const templates = {
//   transfer: {
//     title: 'Transfer Certificate',
//     content: `
//       \\textbf{MOUNT CARMEL SCHOOL} \\\\
//       PH.: 26301445 \\\\
//       Recognised by the Dept. of Education, U.T. Chandigarh \\
//       \& Affiliated to the C.B.S.E. Delhi. School No. 4913 \\\\
//       SECTOR 47 - B, CHANDIGARH \\\\
//       \\vspace{0.5cm}
//       \\textbf{TRANSFER CERTIFICATE} \\\\
//       \\textbf{Serial No.: [SERIAL_NUMBER]} \\\\
//       \\vspace{0.3cm}
//       This is to certify that [STUDENT_NAME], son/daughter of [PARENT_NAME], \\
//       with General Register Number [GR_NUMBER], born on [DOB], \\
//       was admitted to this school on [ADMISSION_DATE] in Class [CLASS_NAME]. \\
//       He/She has been studying in Class [CLASS_NAME] and has paid all school fees. \\
//       The reason for leaving is [PURPOSE]. \\
//       Date of Issue: [ISSUE_DATE] \\\\
//       \\vspace{0.3cm}
//       \\textbf{Principal} \\\\
//       \\textbf{Mount Carmel School}
//     `
//   },
//   bonafide: {
//     title: 'Bonafide Certificate',
//     content: `
//       \\textbf{MOUNT CARMEL SCHOOL} \\\\
//       PH.: 26301445 \\\\
//       Recognised by the Dept. of Education, U.T. Chandigarh \\
//       \& Affiliated to the C.B.S.E. Delhi. School No. 4913 \\\\
//       SECTOR 47 - B, CHANDIGARH \\\\
//       \\vspace{0.5cm}
//       \\textbf{BONAFIDE CERTIFICATE} \\\\
//       \\textbf{Serial No.: [SERIAL_NUMBER]} \\\\
//       \\vspace{0.3cm}
//       This is to certify that [STUDENT_NAME], son/daughter of [PARENT_NAME], \\
//       with General Register Number [GR_NUMBER], born on [DOB], \\
//       is a bonafide student of this school, studying in Class [CLASS_NAME] \\
//       during the academic year [ACADEMIC_YEAR]. \\
//       Date of Issue: [ISSUE_DATE] \\\\
//       \\vspace{0.3cm}
//       \\textbf{Principal} \\\\
//       \\textbf{Mount Carmel School}
//     `
//   },
//   leaving: {
//     title: 'School Leaving Certificate',
//     content: `
//       \\textbf{MOUNT CARMEL SCHOOL} \\\\
//       PH.: 26301445 \\\\
//       Recognised by the Dept. of Education, U.T. Chandigarh \\
//       \& Affiliated to the C.B.S.E. Delhi. School No. 4913 \\\\
//       SECTOR 47 - B, CHANDIGARH \\\\
//       \\vspace{0.5cm}
//       \\textbf{SCHOOL LEAVING CERTIFICATE} \\\\
//       \\textbf{Serial No.: [SERIAL_NUMBER]} \\\\
//       \\vspace{0.3cm}
//       This is to certify that [STUDENT_NAME], son/daughter of [PARENT_NAME], \\
//       with General Register Number [GR_NUMBER], born on [DOB], \\
//       was admitted to this school on [ADMISSION_DATE] in Class [CLASS_NAME]. \\
//       He/She has completed his/her studies up to Class [CLASS_NAME] \\
//       and is leaving the school due to [PURPOSE]. All dues are cleared. \\
//       Date of Issue: [ISSUE_DATE] \\\\
//       \\vspace{0.3cm}
//       \\textbf{Principal} \\\\
//       \\textbf{Mount Carmel School}
//     `
//   }
// };

// const CertificateGenerator = ({ certificateId }) => {
//   const [certificateData, setCertificateData] = useState({
//     certificateType: 'transfer',
//     studentName: '',
//     grNumber: '',
//     parentName: '',
//     dob: '',
//     admissionDate: '',
//     className: '',
//     purpose: '',
//     comments: '',
//     status: 'generated',
//   });
//   const { generateCertificate } = useClerk();
//   const router = useRouter();
//   const [error, setError] = useState(null);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setCertificateData({ ...certificateData, [name]: value });
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   const serialNumber = uuidv4().slice(0, 8).toUpperCase(); // Generate 8-character serial number
//   //   const issueDate = new Date().toISOString().split('T')[0];
//   //   const academicYear = `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);

//     // Validate certificateId
//     if (!certificateId || !/^[0-9a-fA-F]{24}$/.test(certificateId)) {
//       setError('Invalid certificate ID');
//       return;
//     }

//     // Validate required fields
//     const requiredFields = ['studentName', 'grNumber', 'parentName', 'dob', 'admissionDate', 'className', 'purpose', 'certificateType'];
//     for (const field of requiredFields) {
//       if (!certificateData[field]) {
//         setError(`Please fill in ${field}`);
//         return;
//       }
//     }

//     const serialNumber = uuidv4().slice(0, 8).toUpperCase();
//     const issueDate = new Date().toISOString().split('T')[0];
//     const academicYear = `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`;

//     // Generate PDF
//     const doc = new jsPDF();
//     doc.setFontSize(12);
//     doc.setFont('helvetica', 'normal');

//     // Replace placeholders in template
//     let content = templates[certificateData.certificateType].content;
//     content = content
//       .replace('[SERIAL_NUMBER]', serialNumber)
//       .replace('[STUDENT_NAME]', certificateData.studentName)
//       .replace('[PARENT_NAME]', certificateData.parentName)
//       .replace('[GR_NUMBER]', certificateData.grNumber)
//       .replace('[DOB]', certificateData.dob)
//       .replace('[ADMISSION_DATE]', certificateData.admissionDate)
//       .replace('[CLASS_NAME]', certificateData.className)
//       .replace('[PURPOSE]', certificateData.purpose)
//       .replace('[ISSUE_DATE]', issueDate)
//       .replace('[ACADEMIC_YEAR]', academicYear);

//     // Remove LaTeX-like formatting for plain text rendering
//     content = content.replace(/\\textbf{([^}]+)}/g, '$1').replace(/\\vspace{[^}]+}/g, '\n').replace(/\\\\/g, '\n');

//     // Add text to PDF
//     const lines = content.split('\n');
//     let y = 20;
//     lines.forEach((line) => {
//       doc.text(line.trim(), 20, y);
//       y += 10;
//     });

//     // Convert PDF to base64
//     const pdfData = doc.output('datauristring').split(',')[1];

//     // Send to backend
//     try {
//       await generateCertificate(certificateId, {
//         ...certificateData,
//         pdfData,
//         serialNumber,
//         issuedDate: issueDate,
//       });
//       router.push(`/clerk/certificates/${certificateId}`);
//     } catch (error) {
//       console.error('Certificate generation failed:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <Grid container spacing={2}>
//         <Grid item xs={12}>
//           <FormControl fullWidth>
//             <InputLabel>Certificate Type</InputLabel>
//             <Select
//               name="certificateType"
//               value={certificateData.certificateType}
//               onChange={handleInputChange}
//             >
//               <MenuItem value="transfer">Transfer Certificate</MenuItem>
//               <MenuItem value="bonafide">Bonafide Certificate</MenuItem>
//               <MenuItem value="leaving">School Leaving Certificate</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             name="studentName"
//             label="Student Name"
//             fullWidth
//             value={certificateData.studentName}
//             onChange={handleInputChange}
//             required
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             name="grNumber"
//             label="GR Number"
//             fullWidth
//             value={certificateData.grNumber}
//             onChange={handleInputChange}
//             required
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             name="parentName"
//             label="Parent Name"
//             fullWidth
//             value={certificateData.parentName}
//             onChange={handleInputChange}
//             required
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             name="dob"
//             label="Date of Birth (YYYY-MM-DD)"
//             fullWidth
//             value={certificateData.dob}
//             onChange={handleInputChange}
//             required
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             name="admissionDate"
//             label="Admission Date (YYYY-MM-DD)"
//             fullWidth
//             value={certificateData.admissionDate}
//             onChange={handleInputChange}
//             required
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             name="className"
//             label="Class"
//             fullWidth
//             value={certificateData.className}
//             onChange={handleInputChange}
//             required
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             name="purpose"
//             label="Purpose"
//             fullWidth
//             value={certificateData.purpose}
//             onChange={handleInputChange}
//             required
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             name="comments"
//             label="Comments"
//             fullWidth
//             multiline
//             rows={3}
//             value={certificateData.comments}
//             onChange={handleInputChange}
//           />
//         </Grid>
//       </Grid>
//       <Button type="submit" variant="contained" color="primary">
//         Generate Certificate
//       </Button>
//     </form>
//   );
// };

// export default CertificateGenerator;





// // components/clerk/certificates/EnhancedCertificateGenerator.js
// import { useState } from 'react';
// import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Grid } from '@mui/material';
// import { jsPDF } from 'jspdf';
// import { useRouter } from 'next/router';
// import useClerk from '../../../hooks/useClerk';

// // Enhanced certificate templates
// const templates = {
//   transfer: {
//     title: 'TRANSFER CERTIFICATE',
//     content: (data) => `
//       ${data.schoolName || 'MOUNT CARMEL SCHOOL'}
//       ${data.schoolAddress || 'SECTOR 47 - B, CHANDIGARH'}
//       ${data.schoolPhone || 'PH.: 26301445'}
//       ${data.schoolRecognition || 'Recognised by the Dept. of Education, U.T. Chandigarh & Affiliated to the C.B.S.E. Delhi. School No. 4913'}
      
//       ${data.schoolLogo ? '[LOGO]' : ''}
      
//       TRANSFER CERTIFICATE
//       No.: ${data.serialNumber}
      
//       This is to certify that ${data.studentName}, son/daughter of ${data.parentName},
//       with General Register Number ${data.grNumber}, born on ${data.dob},
//       was admitted to this school on ${data.admissionDate} in Class ${data.className}.
//       He/She has been studying in Class ${data.className} and has paid all school fees.
//       The reason for leaving is ${data.purpose}.
      
//       Date of Issue: ${data.issuedDate}
      
//       Principal
//       ${data.schoolName || 'Mount Carmel School'}
//     `
//   },
//   bonafide: {
//     title: 'BONAFIDE CERTIFICATE',
//     content: (data) => `
//       MOUNT CARMEL SCHOOL
//       PH.: 26301445
//       Recognised by the Dept. of Education, U.T. Chandigarh
//       & Affiliated to the C.B.S.E. Delhi. School No. 4913
//       SECTOR 47 - B, CHANDIGARH
      
//       BONAFIDE CERTIFICATE
//       No.: ${data.serialNumber}
      
//       This is to certify that ${data.studentName}, son/daughter of ${data.parentName},
//       with General Register Number ${data.grNumber}, born on ${data.dob},
//       is a bonafide student of this school, studying in Class ${data.className}
//       during the academic year ${data.academicYear}.
      
//       Date of Issue: ${data.issuedDate}
      
//       Principal
//       Mount Carmel School
//     `
//   },
//   leaving: {
//     title: 'SCHOOL LEAVING CERTIFICATE',
//     content: (data) => `
//       MOUNT CARMEL SCHOOL
//       PH.: 26301445
//       Recognised by the Dept. of Education, U.T. Chandigarh
//       & Affiliated to the C.B.S.E. Delhi. School No. 4913
//       SECTOR 47 - B, CHANDIGARH
      
//       SCHOOL LEAVING CERTIFICATE
//       No.: ${data.serialNumber}
      
//       This is to certify that ${data.studentName}, son/daughter of ${data.parentName},
//       with General Register Number ${data.grNumber}, born on ${data.dob},
//       was admitted to this school on ${data.admissionDate} in Class ${data.className}.
//       He/She has completed his/her studies up to Class ${data.className}
//       and is leaving the school due to ${data.purpose}. All dues are cleared.
      
//       Date of Issue: ${data.issuedDate}
      
//       Principal
//       Mount Carmel School
//     `
//   }
// };

// const CertificateGenerator = ({ certificateId, initialData }) => {
//   const [formData, setFormData] = useState({
//     certificateType: initialData?.type || 'transfer',
//     studentName: initialData?.studentName || '',
//     grNumber: initialData?.grNumber || '',
//     parentName: initialData?.parentName || '',
//     dob: initialData?.dob || '',
//     admissionDate: initialData?.admissionDate || '',
//     className: initialData?.className || '',
//     purpose: initialData?.purpose || '',
//     comments: initialData?.comments || '',
//     status: 'generated'
//   });
  
//   const { generateCertificate } = useClerk();
//   const router = useRouter();
//   const [error, setError] = useState(null);
//   const [isGenerating, setIsGenerating] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const generateSerialNumber = () => {
//     const year = new Date().getFullYear().toString().slice(-2);
//     const randomNum = Math.floor(100 + Math.random() * 900); // 3-digit random number
//     return `MC/${year}/${randomNum}`;
//   };

//   const generatePdf = (data) => {
//     const doc = new jsPDF();
//     const margin = 20;
//     let y = margin;
    
//     // Set font and size
//     doc.setFont('helvetica');
//     doc.setFontSize(12);
    
//     // Split content into lines and add to PDF
//     const content = templates[data.certificateType].content(data);
//     const lines = content.split('\n');

//     // Add school logo if available
//   if (data.schoolLogo) {
//     try {
//       const imgData = data.schoolLogo;
//       doc.addImage(imgData, 'JPEG', 105 - 15, y, 30, 30); // Center the logo
//       y += 35;
//     } catch (error) {
//       console.error('Error adding logo:', error);
//     }
//   }
    
//     // Add school header with larger font
//     doc.setFontSize(14);
//     doc.setFont('helvetica', 'bold');
//     doc.text('MOUNT CARMEL SCHOOL', 105, y, { align: 'center' });
//     y += 10;
    
//     // Reset font for rest of content
//     doc.setFontSize(12);
//     doc.setFont('helvetica', 'normal');
    
//     lines.forEach(line => {
//       if (line.trim() === '') {
//         y += 5; // Add extra space for empty lines
//       } else if (line.includes('CERTIFICATE')) {
//         // Style certificate title differently
//         doc.setFontSize(16);
//         doc.setFont('helvetica', 'bold');
//         doc.text(line.trim(), 105, y, { align: 'center' });
//         doc.setFontSize(12);
//         doc.setFont('helvetica', 'normal');
//         y += 10;
//       } else {
//         doc.text(line.trim(), margin, y);
//         y += 7;
//       }
//     });
    
//     return doc;
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   setError(null);
//   //   setIsGenerating(true);
    
//   //   try {
//   //     // Generate metadata
//   //     const serialNumber = generateSerialNumber();
//   //     const issuedDate = new Date().toISOString().split('T')[0];
//   //     const academicYear = `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`;
      
//   //     // Generate PDF
//   //     const pdfDoc = generatePdf({
//   //       ...formData,
//   //       serialNumber,
//   //       issuedDate,
//   //       academicYear
//   //     });
      
//   //     // Convert to blob for download
//   //     const pdfBlob = pdfDoc.output('blob');
//   //     const pdfUrl = URL.createObjectURL(pdfBlob);

//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   setError(null);
//   setIsGenerating(true);
  
//   try {
//     // Generate metadata
//     const serialNumber = generateSerialNumber();
//     const issuedDate = new Date().toISOString();
//     const academicYear = `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`;

//     // Generate PDF first
//     const pdfDoc = generatePdf({
//       ...formData,
//       serialNumber,
//       issuedDate: issuedDate.split('T')[0], // Format for PDF display
//       academicYear
//     });
    
//     // Convert to blob for download
//     const pdfBlob = pdfDoc.output('blob');
//     const pdfUrl = URL.createObjectURL(pdfBlob);

//     // Prepare the backend payload
//     const payload = {
//       status: 'generated',
//       certificateType: formData.certificateType,
//       serialNumber,
//       issuedDate, // Full ISO string for backend
//       studentDetails: {
//         studentName: formData.studentName,
//         grNumber: formData.grNumber,
//         parentName: formData.parentName,
//         dob: formData.dob,
//         admissionDate: formData.admissionDate,
//         className: formData.className
//       },
//       purpose: formData.purpose,
//       comments: formData.comments,
//       urgency: formData.urgency || 'normal'
//     };

//     console.log('Certificate payload:', payload);
    
//     // Send metadata to backend
//     await generateCertificate(certificateId, payload);
    
//     // Offer download to clerk
//     const link = document.createElement('a');
//     link.href = pdfUrl;
//     link.download = `${formData.certificateType}_certificate_${serialNumber}.pdf`;
//     link.click();
    
//     // Redirect after short delay
//     setTimeout(() => {
//       router.push(`/clerk/certificates/${certificateId}`);
//     }, 1000);
    
//   } catch (error) {
//     console.error('Certificate generation failed:', error);
//     setError(error.message);
//   } finally {
//     setIsGenerating(false);
//   }
// };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow">
//       {error && <div className="text-red-500 mb-4">{error}</div>}
      
//       <Grid container spacing={2}>
//         <Grid item xs={12}>
//           <FormControl fullWidth>
//             <InputLabel>Certificate Type</InputLabel>
//             <Select
//               name="certificateType"
//               value={formData.certificateType}
//               onChange={handleInputChange}
//               required
//             >
//               <MenuItem value="transfer">Transfer Certificate</MenuItem>
//               <MenuItem value="bonafide">Bonafide Certificate</MenuItem>
//               <MenuItem value="leaving">School Leaving Certificate</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>
        
//         {/* Student Details Fields */}
//         <Grid item xs={12} sm={6}>
//           <TextField
//             name="studentName"
//             label="Student Name"
//             fullWidth
//             value={formData.studentName}
//             onChange={handleInputChange}
//             required
//           />
//         </Grid>
        
//         <Grid item xs={12} sm={6}>
//           <TextField
//             name="grNumber"
//             label="GR Number"
//             fullWidth
//             value={formData.grNumber}
//             onChange={handleInputChange}
//             required
//           />
//         </Grid>
        
//         {/* ... other fields ... */}
        
//         <Grid item xs={12}>
//           <Button 
//             type="submit" 
//             variant="contained" 
//             color="primary"
//             fullWidth
//             disabled={isGenerating}
//           >
//             {isGenerating ? 'Generating...' : 'Generate & Download Certificate'}
//           </Button>
//         </Grid>
//       </Grid>
//     </form>
//   );
// };

// export default CertificateGenerator;


import { useState, useEffect } from 'react';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Grid, Box, Avatar, Typography } from '@mui/material';
import { jsPDF } from 'jspdf';
import { useRouter } from 'next/router';
import useClerk from '../../../hooks/useClerk';

const CertificateGenerator = ({ certificateId, initialData }) => {
  const [formData, setFormData] = useState({
    certificateType: initialData?.type || 'transfer',
    studentName: initialData?.studentName || '',
    grNumber: initialData?.grNumber || '',
    parentName: initialData?.parentName || '',
    dob: initialData?.dob || '',
    admissionDate: initialData?.admissionDate || '',
    className: initialData?.className || '',
    purpose: initialData?.purpose || '',
    comments: initialData?.comments || '',
    schoolName: initialData?.schoolName || 'Mount Carmel School',
    schoolAddress: initialData?.schoolAddress || 'Sector 47-B, Chandigarh',
    schoolPhone: initialData?.schoolPhone || 'PH: 26301445',
    schoolRecognition: initialData?.schoolRecognition || 'Recognised by the Dept. of Education, U.T. Chandigarh & Affiliated to the C.B.S.E. Delhi. School No. 4913',
    schoolLogo: null,
    status: 'generated'
  });

  const { generateCertificate } = useClerk();
  const router = useRouter();
  const [error, setError] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData({ ...formData, schoolLogo: event.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const generateSerialNumber = () => {
    const year = new Date().getFullYear().toString().slice(-2);
    const randomNum = Math.floor(100 + Math.random() * 900);
    return `SN/${year}/${randomNum}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: '2-digit', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const addBorder = (doc) => {
    // Add decorative border
    const pageWidth = 210;
    const pageHeight = 297;
    const borderMargin = 10;
    
    doc.setDrawColor(0, 102, 204);
    doc.setLineWidth(0.8);
    doc.rect(borderMargin, borderMargin, pageWidth - 2 * borderMargin, pageHeight - 2 * borderMargin);
    
    doc.setLineWidth(0.3);
    doc.rect(borderMargin + 3, borderMargin + 3, pageWidth - 2 * (borderMargin + 3), pageHeight - 2 * (borderMargin + 3));
  };

  const addWatermark = (doc) => {
    doc.setTextColor(240, 240, 240);
    doc.setFontSize(60);
    doc.setFont('helvetica', 'bold');
    doc.text('VERIFIED', 105, 150, { 
      align: 'center', 
      angle: 45,
      renderingMode: 'stroke'
    });
    doc.setTextColor(0, 0, 0); // Reset color
  };

  const templates = {
    transfer: {
      title: 'TRANSFER CERTIFICATE',
      generateContent: (doc, data) => {
        let y = 40;
        const margin = 25;
        const rightMargin = 185;
        
        // Add decorative elements
        addBorder(doc);
        addWatermark(doc);
        
        // School logo
        if (data.schoolLogo) {
          try {
            doc.addImage(data.schoolLogo, 'JPEG', 85, y, 40, 40);
            y += 50;
          } catch (error) {
            console.error('Error adding logo:', error);
            y += 20;
          }
        } else {
          y += 20;
        }
        
        // School header with better typography
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0, 51, 102);
        doc.text(data.schoolName.toUpperCase(), 105, y, { align: 'center' });
        y += 8;
        
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(80, 80, 80);
        doc.text(data.schoolAddress, 105, y, { align: 'center' });
        y += 6;
        doc.text(data.schoolPhone, 105, y, { align: 'center' });
        y += 6;
        
        // Recognition text with line breaks for better readability
        const recognitionLines = doc.splitTextToSize(data.schoolRecognition, 160);
        recognitionLines.forEach(line => {
          doc.text(line, 105, y, { align: 'center' });
          y += 5;
        });
        y += 10;
        
        // Decorative line
        doc.setDrawColor(0, 102, 204);
        doc.setLineWidth(0.5);
        doc.line(30, y, 180, y);
        y += 15;
        
        // Certificate title with enhanced styling
        doc.setFontSize(20);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(153, 0, 51);
        doc.text('TRANSFER CERTIFICATE', 105, y, { align: 'center' });
        y += 12;
        
        // Serial number box
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(0, 0, 0);
        doc.rect(margin, y, 50, 8);
        doc.text(`Sl. No: ${data.serialNumber}`, margin + 2, y + 5);
        
        doc.text(`Date: ${data.issuedDate}`, rightMargin - 40, y + 5, { align: 'right' });
        y += 20;
        
        // Certificate content with proper formatting
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        
        // Main content paragraph
        const content = `This is to certify that ${data.studentName.toUpperCase()}, son/daughter of ${data.parentName}, bearing General Register Number ${data.grNumber}, born on ${formatDate(data.dob)}, was admitted to this school on ${formatDate(data.admissionDate)} in Class ${data.className}.`;
        
        const contentLines = doc.splitTextToSize(content, 160);
        contentLines.forEach(line => {
          doc.text(line, margin, y);
          y += 7;
        });
        y += 5;
        
        const content2 = `He/She has been studying in Class ${data.className} and has cleared all school dues. The reason for leaving the school is "${data.purpose}".`;
        const content2Lines = doc.splitTextToSize(content2, 160);
        content2Lines.forEach(line => {
          doc.text(line, margin, y);
          y += 7;
        });
        y += 10;
        
        // Additional comments if any
        if (data.comments && data.comments.trim()) {
          doc.setFont('helvetica', 'italic');
          doc.text('Remarks: ', margin, y);
          const remarksLines = doc.splitTextToSize(data.comments, 140);
          remarksLines.forEach((line, index) => {
            doc.text(line, index === 0 ? margin + 20 : margin, y);
            y += 7;
          });
          y += 10;
        }
        
        // Signature section
        y = Math.max(y, 220);
        
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.text('Date of Issue: ' + formatDate(data.issuedDate), margin, y);
        
        // Principal signature
        doc.text('Principal', rightMargin - 30, y, { align: 'center' });
        doc.line(rightMargin - 50, y + 15, rightMargin - 10, y + 15);
        doc.setFontSize(9);
        doc.text(data.schoolName, rightMargin - 30, y + 20, { align: 'center' });
        
        // School stamp placeholder
        doc.setDrawColor(100, 100, 100);
        doc.setLineWidth(0.3);
        doc.circle(margin + 30, y + 10, 15, 'S');
        doc.setFontSize(8);
        doc.text('SCHOOL', margin + 30, y + 8, { align: 'center' });
        doc.text('SEAL', margin + 30, y + 12, { align: 'center' });
      }
    },
    
    bonafide: {
      title: 'BONAFIDE CERTIFICATE',
      generateContent: (doc, data) => {
        let y = 40;
        const margin = 25;
        const rightMargin = 185;
        
        addBorder(doc);
        addWatermark(doc);
        
        // School logo
        if (data.schoolLogo) {
          try {
            doc.addImage(data.schoolLogo, 'JPEG', 85, y, 40, 40);
            y += 50;
          } catch (error) {
            y += 20;
          }
        } else {
          y += 20;
        }
        
        // School header
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0, 51, 102);
        doc.text(data.schoolName.toUpperCase(), 105, y, { align: 'center' });
        y += 8;
        
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(80, 80, 80);
        doc.text(data.schoolAddress, 105, y, { align: 'center' });
        y += 6;
        doc.text(data.schoolPhone, 105, y, { align: 'center' });
        y += 6;
        
        const recognitionLines = doc.splitTextToSize(data.schoolRecognition, 160);
        recognitionLines.forEach(line => {
          doc.text(line, 105, y, { align: 'center' });
          y += 5;
        });
        y += 10;
        
        // Decorative line
        doc.setDrawColor(0, 102, 204);
        doc.setLineWidth(0.5);
        doc.line(30, y, 180, y);
        y += 15;
        
        // Certificate title
        doc.setFontSize(20);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0, 102, 0);
        doc.text('BONAFIDE CERTIFICATE', 105, y, { align: 'center' });
        y += 12;
        
        // Serial number
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(0, 0, 0);
        doc.rect(margin, y, 50, 8);
        doc.text(`Sl. No: ${data.serialNumber}`, margin + 2, y + 5);
        doc.text(`Date: ${data.issuedDate}`, rightMargin - 40, y + 5, { align: 'right' });
        y += 20;
        
        // Certificate content
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        
        const content = `This is to certify that ${data.studentName.toUpperCase()}, son/daughter of ${data.parentName}, bearing General Register Number ${data.grNumber}, born on ${formatDate(data.dob)}, is a bonafide student of this institution.`;
        
        const contentLines = doc.splitTextToSize(content, 160);
        contentLines.forEach(line => {
          doc.text(line, margin, y);
          y += 7;
        });
        y += 5;
        
        const content2 = `He/She is currently studying in Class ${data.className} during the academic year ${data.academicYear}. This certificate is being issued for the purpose of "${data.purpose}".`;
        const content2Lines = doc.splitTextToSize(content2, 160);
        content2Lines.forEach(line => {
          doc.text(line, margin, y);
          y += 7;
        });
        y += 10;
        
        // Character certificate addition
        doc.setFont('helvetica', 'normal');
        const characterText = `The student bears a good moral character and is regular in attendance. We wish him/her success in all future endeavors.`;
        const characterLines = doc.splitTextToSize(characterText, 160);
        characterLines.forEach(line => {
          doc.text(line, margin, y);
          y += 7;
        });
        y += 15;
        
        // Signature section
        y = Math.max(y, 220);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.text('Date of Issue: ' + formatDate(data.issuedDate), margin, y);
        
        doc.text('Principal', rightMargin - 30, y, { align: 'center' });
        doc.line(rightMargin - 50, y + 15, rightMargin - 10, y + 15);
        doc.setFontSize(9);
        doc.text(data.schoolName, rightMargin - 30, y + 20, { align: 'center' });
        
        // School stamp
        doc.setDrawColor(100, 100, 100);
        doc.setLineWidth(0.3);
        doc.circle(margin + 30, y + 10, 15, 'S');
        doc.setFontSize(8);
        doc.text('SCHOOL', margin + 30, y + 8, { align: 'center' });
        doc.text('SEAL', margin + 30, y + 12, { align: 'center' });
      }
    },
    
    leaving: {
      title: 'SCHOOL LEAVING CERTIFICATE',
      generateContent: (doc, data) => {
        let y = 40;
        const margin = 25;
        const rightMargin = 185;
        
        addBorder(doc);
        addWatermark(doc);
        
        // School logo
        if (data.schoolLogo) {
          try {
            doc.addImage(data.schoolLogo, 'JPEG', 85, y, 40, 40);
            y += 50;
          } catch (error) {
            y += 20;
          }
        } else {
          y += 20;
        }
        
        // School header
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0, 51, 102);
        doc.text(data.schoolName.toUpperCase(), 105, y, { align: 'center' });
        y += 8;
        
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(80, 80, 80);
        doc.text(data.schoolAddress, 105, y, { align: 'center' });
        y += 6;
        doc.text(data.schoolPhone, 105, y, { align: 'center' });
        y += 6;
        
        const recognitionLines = doc.splitTextToSize(data.schoolRecognition, 160);
        recognitionLines.forEach(line => {
          doc.text(line, 105, y, { align: 'center' });
          y += 5;
        });
        y += 10;
        
        // Decorative line
        doc.setDrawColor(0, 102, 204);
        doc.setLineWidth(0.5);
        doc.line(30, y, 180, y);
        y += 15;
        
        // Certificate title
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(204, 0, 0);
        doc.text('SCHOOL LEAVING CERTIFICATE', 105, y, { align: 'center' });
        y += 12;
        
        // Serial number
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(0, 0, 0);
        doc.rect(margin, y, 50, 8);
        doc.text(`Sl. No: ${data.serialNumber}`, margin + 2, y + 5);
        doc.text(`Date: ${data.issuedDate}`, rightMargin - 40, y + 5, { align: 'right' });
        y += 20;
        
        // Certificate content
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        
        const content = `This is to certify that ${data.studentName.toUpperCase()}, son/daughter of ${data.parentName}, bearing General Register Number ${data.grNumber}, born on ${formatDate(data.dob)}, was admitted to this school on ${formatDate(data.admissionDate)} in Class ${data.className}.`;
        
        const contentLines = doc.splitTextToSize(content, 160);
        contentLines.forEach(line => {
          doc.text(line, margin, y);
          y += 7;
        });
        y += 5;
        
        const content2 = `He/She has successfully completed his/her studies up to Class ${data.className} and is leaving the school due to "${data.purpose}". All school dues have been cleared and no objection is raised for his/her admission to any other institution.`;
        const content2Lines = doc.splitTextToSize(content2, 160);
        content2Lines.forEach(line => {
          doc.text(line, margin, y);
          y += 7;
        });
        y += 10;
        
        // Academic performance note
        doc.setFont('helvetica', 'normal');
        const performanceText = `The student has maintained satisfactory academic performance and conduct during his/her tenure at this institution.`;
        const performanceLines = doc.splitTextToSize(performanceText, 160);
        performanceLines.forEach(line => {
          doc.text(line, margin, y);
          y += 7;
        });
        y += 15;
        
        // Signature section
        y = Math.max(y, 220);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.text('Date of Issue: ' + formatDate(data.issuedDate), margin, y);
        
        doc.text('Principal', rightMargin - 30, y, { align: 'center' });
        doc.line(rightMargin - 50, y + 15, rightMargin - 10, y + 15);
        doc.setFontSize(9);
        doc.text(data.schoolName, rightMargin - 30, y + 20, { align: 'center' });
        
        // School stamp
        doc.setDrawColor(100, 100, 100);
        doc.setLineWidth(0.3);
        doc.circle(margin + 30, y + 10, 15, 'S');
        doc.setFontSize(8);
        doc.text('SCHOOL', margin + 30, y + 8, { align: 'center' });
        doc.text('SEAL', margin + 30, y + 12, { align: 'center' });
      }
    }
  };

  const generatePdf = (data) => {
    const doc = new jsPDF();
    const template = templates[data.certificateType];
    
    if (template && template.generateContent) {
      template.generateContent(doc, data);
    }
    
    return doc;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsGenerating(true);
    
    try {
      // Generate metadata
      const serialNumber = generateSerialNumber();
      const issuedDate = new Date().toISOString();
      const academicYear = `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`;

      // Generate PDF with enhanced formatting
      const pdfDoc = generatePdf({
        ...formData,
        serialNumber,
        issuedDate: formatDate(issuedDate),
        academicYear
      });
      
      // Convert to blob for download
      const pdfBlob = pdfDoc.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);

      // Prepare the backend payload
      const payload = {
        status: 'generated',
        certificateType: formData.certificateType,
        serialNumber,
        issuedDate,
        studentDetails: {
          studentName: formData.studentName,
          grNumber: formData.grNumber,
          parentName: formData.parentName,
          dob: formData.dob,
          admissionDate: formData.admissionDate,
          className: formData.className
        },
        purpose: formData.purpose,
        comments: formData.comments,
        schoolDetails: {
          name: formData.schoolName,
          address: formData.schoolAddress,
          phone: formData.schoolPhone,
          recognition: formData.schoolRecognition
        }
      };

      // Send metadata to backend
      await generateCertificate(certificateId, payload);
      
      // Offer download to clerk
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = `${formData.certificateType}_certificate_${serialNumber}.pdf`;
      link.click();
      
      // Redirect after short delay
      setTimeout(() => {
        router.push(`/clerk/certificates/${certificateId}`);
      }, 1000);
      
    } catch (error) {
      console.error('Certificate generation failed:', error);
      setError(error.message || 'Failed to generate certificate');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow">
      {error && <div className="text-red-500 mb-4">{error}</div>}
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Certificate Type</InputLabel>
            <Select
              name="certificateType"
              value={formData.certificateType}
              onChange={handleInputChange}
              required
            >
              <MenuItem value="transfer">Transfer Certificate</MenuItem>
              <MenuItem value="bonafide">Bonafide Certificate</MenuItem>
              <MenuItem value="leaving">School Leaving Certificate</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        
        {/* Student Details */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
            Student Information
          </Typography>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            name="studentName"
            label="Student Name"
            fullWidth
            value={formData.studentName}
            onChange={handleInputChange}
            required
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            name="grNumber"
            label="GR Number"
            fullWidth
            value={formData.grNumber}
            onChange={handleInputChange}
            required
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            name="parentName"
            label="Parent Name"
            fullWidth
            value={formData.parentName}
            onChange={handleInputChange}
            required
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            name="dob"
            label="Date of Birth"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formData.dob}
            onChange={handleInputChange}
            required
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            name="admissionDate"
            label="Admission Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formData.admissionDate}
            onChange={handleInputChange}
            required
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            name="className"
            label="Class"
            fullWidth
            value={formData.className}
            onChange={handleInputChange}
            required
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            name="purpose"
            label="Purpose/Reason"
            fullWidth
            multiline
            rows={2}
            value={formData.purpose}
            onChange={handleInputChange}
            required
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            name="comments"
            label="Additional Comments (Optional)"
            fullWidth
            multiline
            rows={2}
            value={formData.comments}
            onChange={handleInputChange}
          />
        </Grid>
        
        {/* School Details */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
            School Information
          </Typography>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            name="schoolName"
            label="School Name"
            fullWidth
            value={formData.schoolName}
            onChange={handleInputChange}
            required
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            name="schoolAddress"
            label="School Address"
            fullWidth
            value={formData.schoolAddress}
            onChange={handleInputChange}
            required
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            name="schoolPhone"
            label="School Phone"
            fullWidth
            value={formData.schoolPhone}
            onChange={handleInputChange}
            required
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            name="schoolRecognition"
            label="School Recognition"
            fullWidth
            multiline
            rows={2}
            value={formData.schoolRecognition}
            onChange={handleInputChange}
            required
          />
        </Grid>
        
        <Grid item xs={12}>
          <Box mb={2}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'medium' }}>
              School Logo (Optional)
            </Typography>
            <input
              accept="image/*"
              type="file"
              onChange={handleLogoUpload}
              id="school-logo-upload"
              style={{ display: 'none' }}
            />
            <label htmlFor="school-logo-upload">
              <Button 
                variant="outlined" 
                component="span"
                sx={{ mb: 2 }}
              >
                Upload Logo
              </Button>
            </label>
            {formData.schoolLogo && (
              <Avatar
                src={formData.schoolLogo}
                alt="School Logo"
                sx={{ width: 100, height: 100, mt: 2, border: '2px solid #e0e0e0' }}
                variant="square"
              />
            )}
          </Box>
        </Grid>
        
        <Grid item xs={12}>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            fullWidth
            disabled={isGenerating}
            size="large"
            sx={{ 
              height: 50,
              fontSize: '1.1rem',
              fontWeight: 'bold'
            }}
          >
            {isGenerating ? 'Generating Certificate...' : 'Generate & Download Certificate'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CertificateGenerator;
