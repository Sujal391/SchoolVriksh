import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  LinearProgress,
  Alert,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
  Container,
  Fade,
  Divider,
  Stack,
} from '@mui/material';
import { CloudUpload, Download, CheckCircle, ErrorOutline, Info, ArrowBack } from '@mui/icons-material';

import { useRouter } from 'next/router';
import LibraryLayout from '../../../components/layout/LibraryLayout';
import libraryService from '../../../services/libraryService';

const BulkImportBooks = () => {
  const theme = useTheme();
  const router = useRouter();
  
  const [activeStep, setActiveStep] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [error, setError] = useState(null);

  const steps = [
    'Download Template',
    'Upload CSV File',
    'Review Results'
  ];

  const csvTemplate = `bookTitle,author,isbn,category,classId,isGeneral,totalCopies,publisher,publicationYear,language,description
"Mathematics Grade 10","John Smith","978-0123456789","Mathematics","60f1b2e3c4d5e6f7a8b9c0d1","false","25","ABC Publishers","2023","English","Comprehensive mathematics textbook for grade 10"
"General Science","Jane Doe","978-9876543210","Science","","true","30","XYZ Publications","2022","English","Basic science concepts for all grades"
"English Literature","Robert Johnson","978-1122334455","Literature","60f1b2e3c4d5e6f7a8b9c0d2","false","20","Literary Press","2023","English","Collection of classic literature pieces"`;

  const requiredColumns = [
    { name: 'bookTitle', description: 'Title of the book (required)', example: 'Mathematics Grade 10' },
    { name: 'author', description: 'Author name (required)', example: 'John Smith' },
    { name: 'isbn', description: 'ISBN number (required, must be unique)', example: '978-0123456789' },
    { name: 'category', description: 'Book category (required)', example: 'Mathematics' },
    { name: 'classId', description: 'Class ID (optional, leave empty for general books)', example: '60f1b2e3c4d5e6f7a8b9c0d1' },
    { name: 'isGeneral', description: 'Is general book (true/false)', example: 'false' },
    { name: 'totalCopies', description: 'Number of copies (required)', example: '25' },
    { name: 'publisher', description: 'Publisher name (optional)', example: 'ABC Publishers' },
    { name: 'publicationYear', description: 'Year of publication (optional)', example: '2023' },
    { name: 'language', description: 'Book language (optional, defaults to English)', example: 'English' },
    { name: 'description', description: 'Book description (optional)', example: 'Comprehensive mathematics textbook' },
  ];

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.name.endsWith('.csv')) {
        setError('Please select a CSV file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError('File size should be less than 5MB');
        return;
      }
      setSelectedFile(file);
      setError(null);
      setActiveStep(1);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file first');
      return;
    }

    setUploading(true);
    setError(null);
    
    try {
      const result = await libraryService.bulkImportBooks(selectedFile);
      setUploadResult(result);
      setActiveStep(2);
    } catch (err) {
      setError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const downloadTemplate = () => {
    const blob = new Blob([csvTemplate], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'books_import_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    setActiveStep(1);
  };

  const resetImport = () => {
    setActiveStep(0);
    setSelectedFile(null);
    setUploadResult(null);
    setError(null);
    setUploading(false);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="body1" paragraph>
              Download the CSV template to ensure your data is formatted correctly.
            </Typography>
            
            <Card sx={{ mb: 3, borderLeft: `4px solid ${theme.palette.info.main}` }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <Info sx={{ mr: 1, verticalAlign: 'middle' }} />
                  CSV Format Requirements
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell><strong>Column</strong></TableCell>
                        <TableCell><strong>Description</strong></TableCell>
                        <TableCell><strong>Example</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {requiredColumns.map((col) => (
                        <TableRow key={col.name}>
                          <TableCell>
                            <code>{col.name}</code>
                          </TableCell>
                          <TableCell>{col.description}</TableCell>
                          <TableCell>
                            <Typography variant="body2" color="text.secondary">
                              {col.example}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>

            <Button
              variant="contained"
              startIcon={<Download />}
              onClick={downloadTemplate}
              size="large"
              sx={{ borderRadius: 2 }}
            >
              Download CSV Template
            </Button>
          </Box>
        );

      case 1:
        return (
          <Box>
            <Typography variant="body1" paragraph>
              Upload your CSV file with book data. The file should follow the template format.
            </Typography>

            <Paper
              sx={{
                p: 4,
                textAlign: 'center',
                border: `2px dashed ${theme.palette.primary.main}`,
                borderRadius: 2,
                mb: 3,
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
              onClick={() => document.getElementById('csv-upload').click()}
            >
              <CloudUpload 
                sx={{ 
                  fontSize: 48, 
                  color: theme.palette.primary.main, 
                  mb: 2 
                }} 
              />
              <Typography variant="h6" gutterBottom>
                {selectedFile ? selectedFile.name : 'Click to select CSV file'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedFile 
                  ? `File size: ${(selectedFile.size / 1024).toFixed(1)} KB`
                  : 'Maximum file size: 5MB'
                }
              </Typography>
              <input
                id="csv-upload"
                type="file"
                accept=".csv"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
              />
            </Paper>

            {selectedFile && (
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  onClick={handleUpload}
                  disabled={uploading}
                  size="large"
                  sx={{ borderRadius: 2 }}
                >
                  {uploading ? 'Uploading...' : 'Upload & Import'}
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setSelectedFile(null);
                    setActiveStep(0);
                  }}
                  size="large"
                  sx={{ borderRadius: 2 }}
                >
                  Choose Different File
                </Button>
              </Stack>
            )}

            {uploading && (
              <Box sx={{ mt: 3 }}>
                <LinearProgress />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Processing CSV file and importing books...
                </Typography>
              </Box>
            )}
          </Box>
        );

      case 2:
        return (
          <Box>
            {uploadResult && (
              <Fade in>
                <Box>
                  <Stack spacing={3}>
                    {/* Success Summary */}
                    <Card sx={{ borderLeft: `4px solid ${theme.palette.success.main}` }}>
                      <CardContent>
                        <Box display="flex" alignItems="center" mb={2}>
                          <CheckCircle sx={{ color: 'success.main', mr: 1 }} />
                          <Typography variant="h6">
                            Import Completed Successfully
                          </Typography>
                        </Box>
                        <Typography variant="body1" paragraph>
                          <strong>{uploadResult.imported}</strong> books have been imported successfully.
                        </Typography>
                      </CardContent>
                    </Card>

                    {/* Errors (if any) */}
                    {uploadResult.errors && uploadResult.errors.length > 0 && (
                      <Card sx={{ borderLeft: `4px solid ${theme.palette.warning.main}` }}>
                        <CardContent>
                          <Box display="flex" alignItems="center" mb={2}>
                            <ErrorOutline sx={{ color: 'warning.main', mr: 1 }} />
                            <Typography variant="h6">
                              Issues Found ({uploadResult.errors.length})
                            </Typography>
                          </Box>
                          <Typography variant="body2" paragraph color="text.secondary">
                            The following issues were encountered during import:
                          </Typography>
                          <List dense>
                            {uploadResult.errors.map((error, index) => (
                              <ListItem key={index} disablePadding>
                                <ListItemText 
                                  primary={
                                    <Typography variant="body2" color="error">
                                      • {error}
                                    </Typography>
                                  }
                                />
                              </ListItem>
                            ))}
                          </List>
                        </CardContent>
                      </Card>
                    )}

                    {/* Action Buttons */}
                    <Stack direction="row" spacing={2}>
                      <Button
                        variant="contained"
                        onClick={() => router.push('/library/books')}
                        size="large"
                        sx={{ borderRadius: 2 }}
                      >
                        View All Books
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={resetImport}
                        size="large"
                        sx={{ borderRadius: 2 }}
                      >
                        Import More Books
                      </Button>
                    </Stack>
                  </Stack>
                </Box>
              </Fade>
            )}
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <LibraryLayout>
      <Container maxWidth="lg">
        {/* Header */}
        <Box mb={4}>
          <Stack direction="row" alignItems="center" spacing={2} mb={2}>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => router.push('/library/books')}
              sx={{ textTransform: 'none' }}
            >
              Back to Books
            </Button>
          </Stack>
          
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 700,
              color: theme.palette.primary.main,
              mb: 1
            }}
          >
            Bulk Import Books
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Import multiple books at once using a CSV file
          </Typography>
        </Box>

        {/* Error Alert */}
        {error && (
          <Fade in>
            <Alert 
              severity="error" 
              sx={{ mb: 3, borderRadius: 2 }}
              onClose={() => setError(null)}
            >
              {error}
            </Alert>
          </Fade>
        )}

        {/* Stepper */}
        <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {label}
                  </Typography>
                </StepLabel>
                <StepContent>
                  <Box sx={{ py: 2 }}>
                    {getStepContent(index)}
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Paper>

        {/* Additional Instructions */}
        <Paper elevation={1} sx={{ p: 3, mt: 3, borderRadius: 2, backgroundColor: theme.palette.grey[50] }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Important Notes:
          </Typography>
          <List dense>
            <ListItem disablePadding>
              <ListItemText 
                primary="• Each book must have a unique ISBN number"
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText 
                primary="• Books with duplicate ISBNs will be skipped"
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText 
                primary="• Leave classId empty for general books that can be accessed by all classes"
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText 
                primary="• Maximum file size is 5MB"
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText 
                primary="• All successfully imported books will have status set to 'available'"
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
          </List>
        </Paper>
      </Container>
    </LibraryLayout>
  );
};

export default BulkImportBooks;