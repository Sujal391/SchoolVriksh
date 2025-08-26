import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  CircularProgress,
  Alert,
  Input,
} from '@mui/material';
import { CloudUpload, ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useAuth } from '../../../contexts/AuthContext';
import libraryService from '../../../services/libraryService';
import LibraryLayout from '../../../components/layout/LibraryLayout';

const BulkImportBooks = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a CSV file to upload');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const result = await libraryService.bulkImportBooks(file);
      setSuccess(`Bulk import completed: ${result.imported} books imported successfully`);
      if (result.errors && result.errors.length > 0) {
        setError(`Some books could not be imported: ${result.errors.join(', ')}`);
      }
      setFile(null);
    } catch (err) {
      setError(err.message || 'Failed to import books');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LibraryLayout>
      <Box mb={3} display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">Bulk Import Books</Typography>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => router.push('/library/books')}
        >
          Back to Books
        </Button>
      </Box>

      {error && (
        <Box mb={3}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}

      {success && (
        <Box mb={3}>
          <Alert severity="success">{success}</Alert>
        </Box>
      )}

      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Box mb={3}>
            <Typography variant="subtitle1" gutterBottom>
              Upload CSV File
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              The CSV file should contain columns: bookTitle, author, isbn, category, classId (optional), totalCopies, publisher (optional), publicationYear (optional), language (optional), description (optional), isGeneral (optional).
            </Typography>
            <Input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              fullWidth
              inputProps={{ style: { padding: '10px' } }}
            />
          </Box>
          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<ArrowBack />}
              onClick={() => router.push('/library/books')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <CloudUpload />}
              disabled={loading || !file}
            >
              Import Books
            </Button>
          </Box>
        </form>
      </Paper>
    </LibraryLayout>
  );
};

export default BulkImportBooks;