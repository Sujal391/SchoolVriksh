import { useState } from 'react';
import { Button, Typography, Card, CardContent } from '@mui/material';

const CertificateUploader = ({ certificateId, onUpload }) => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type !== 'application/pdf') {
      alert('Please select a PDF file');
      return;
    }
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file');
      return;
    }

    setIsUploading(true);
    try {
      await onUpload(file);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload certificate: ' + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>Upload Signed Certificate</Typography>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 font-medium">Select Signed PDF File *</label>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              required
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </div>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            disabled={!file || isUploading}
            fullWidth
          >
            {isUploading ? 'Uploading...' : 'Upload Signed Certificate'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CertificateUploader;