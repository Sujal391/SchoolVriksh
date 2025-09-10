// import { useState, useEffect } from "react";
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Switch,
//   CircularProgress,
//   Alert,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Grid,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   FormControlLabel,
//   Checkbox,
//   Chip,
//   IconButton,
//   Snackbar,
//   useTheme,
//   useMediaQuery,
//   Card,
//   CardContent,
//   CardActions,
//   Stack,
// } from "@mui/material";
// import {
//   Delete as DeleteIcon,
//   ContentCopy as CopyIcon,
//   Visibility as ViewIcon,
// } from "@mui/icons-material";
// import AdminService from "../../services/adminService";
// import AdminLayout from "@/components/layout/AdminLayout";

// const AdmissionFormsPage = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const isTablet = useMediaQuery(theme.breakpoints.down("md"));

//   const [forms, setForms] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const [openCreateDialog, setOpenCreateDialog] = useState(false);
//   const [newForm, setNewForm] = useState({
//     title: "",
//     description: "",
//     admissionFee: 0,
//     additionalFields: [],
//   });
//   const [newField, setNewField] = useState({
//     name: "",
//     label: "",
//     type: "text",
//     required: false,
//     options: [],
//     validation: {},
//   });

//   // Get base URL for form links
//   const getBaseUrl = () => {
//     return window.location.origin;
//   };

//   useEffect(() => {
//     fetchForms();
//   }, []);

//   const fetchForms = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await AdminService.getAllForms();
//       console.log("API Response:", response);

//       let formsData = [];
//       if (response && Array.isArray(response)) {
//         formsData = response;
//       } else if (response && response.forms && Array.isArray(response.forms)) {
//         formsData = response.forms;
//       } else if (response && response.data && Array.isArray(response.data)) {
//         formsData = response.data;
//       }

//       const transformedForms = formsData.map((form) => ({
//         id: form._id || form.id,
//         title: form.title,
//         formUrl: form.formUrl,
//         status:
//           form.isActive !== undefined
//             ? form.isActive
//               ? "Active"
//               : "Inactive"
//             : form.status || "Active",
//         createdAt: form.createdAt,
//         admissionFee: form.admissionFee || 0,
//         description: form.description || "",
//       }));

//       setForms(transformedForms);
//     } catch (error) {
//       console.error("Error fetching forms:", error);
//       setError(
//         "Failed to load forms: " +
//           (error.response?.data?.error || error.message)
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCreateForm = async () => {
//     if (!newForm.title || newForm.admissionFee < 0) {
//       setError("Form title and valid admission fee are required");
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       const formData = {
//         title: newForm.title.trim(),
//         description: newForm.description.trim(),
//         admissionFee: Number(newForm.admissionFee),
//         additionalFields: newForm.additionalFields,
//       };

//       console.log("Sending form data:", formData);
//       const response = await AdminService.createAdmissionForm(formData);
//       console.log("Create form response:", response);

//       const newFormData = {
//         id: response._id || response.id,
//         title: response.title,
//         formUrl: response.formUrl,
//         status:
//           response.isActive !== undefined
//             ? response.isActive
//               ? "Active"
//               : "Inactive"
//             : "Active",
//         createdAt: response.createdAt || new Date().toISOString(),
//         admissionFee: response.admissionFee || 0,
//         description: response.description || "",
//       };

//       setForms([newFormData, ...forms]);
//       setOpenCreateDialog(false);

//       setNewForm({
//         title: "",
//         description: "",
//         admissionFee: 0,
//         additionalFields: [],
//       });
//       setNewField({
//         name: "",
//         label: "",
//         type: "text",
//         required: false,
//         options: [],
//         validation: {},
//       });

//       // Updated: Use the complete formUrl directly without reconstruction
//       const fullFormUrl = `${getBaseUrl()}/${response.formUrl}`;
//       setSuccess(
//         `Form created successfully! Share this link with students: ${fullFormUrl}`
//       );
//     } catch (error) {
//       console.error("Error creating form:", error);
//       setError(
//         "Failed to create form: " +
//           (error.response?.data?.error || error.message)
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleToggleFormStatus = async (formId, currentStatus) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const newStatus = currentStatus === "Active" ? false : true;
//       await AdminService.toggleFormStatus(formId, { isActive: newStatus });

//       setForms(
//         forms.map((form) =>
//           form.id === formId
//             ? { ...form, status: newStatus ? "Active" : "Inactive" }
//             : form
//         )
//       );

//       setSuccess(
//         `Form ${newStatus ? "activated" : "deactivated"} successfully!`
//       );
//     } catch (error) {
//       console.error("Error toggling form status:", error);
//       setError(
//         "Failed to toggle form status: " +
//           (error.response?.data?.error || error.message)
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddField = () => {
//     if (!newField.name || !newField.label) {
//       setError("Field name and label are required");
//       return;
//     }

//     const fieldNameRegex = /^[a-zA-Z][a-zA-Z0-9]*$/;
//     if (!fieldNameRegex.test(newField.name)) {
//       setError(
//         "Field name should start with a letter and contain only letters and numbers"
//       );
//       return;
//     }

//     if (
//       newForm.additionalFields.some((field) => field.name === newField.name)
//     ) {
//       setError("Field name must be unique");
//       return;
//     }

//     const fieldToAdd = {
//       ...newField,
//       options:
//         newField.type === "select"
//           ? newField.options.filter((opt) => opt.trim() !== "")
//           : [],
//     };

//     setNewForm({
//       ...newForm,
//       additionalFields: [...newForm.additionalFields, fieldToAdd],
//     });

//     setNewField({
//       name: "",
//       label: "",
//       type: "text",
//       required: false,
//       options: [],
//       validation: {},
//     });

//     setError(null);
//   };

//   const handleRemoveField = (index) => {
//     setNewForm({
//       ...newForm,
//       additionalFields: newForm.additionalFields.filter((_, i) => i !== index),
//     });
//   };

//   const handleCopyFormUrl = (formUrl) => {
//     // Updated: Use the complete formUrl directly
//     const fullUrl = `${getBaseUrl()}/${formUrl}`;
//     navigator.clipboard
//       .writeText(fullUrl)
//       .then(() => {
//         setSuccess("Form URL copied to clipboard!");
//       })
//       .catch(() => {
//         setError("Failed to copy URL to clipboard");
//       });
//   };

//   const handleViewApplications = (formId) => {
//     window.location.href = `/admin/applications?formId=${formId}`;
//   };

//   // Mobile Card Component
//   const FormCard = ({ form }) => (
//     <Card
//       sx={{
//         mb: 2,
//         boxShadow: theme.shadows[2],
//         borderRadius: 2,
//         overflow: "hidden",
//         transition: "all 0.2s ease-in-out",
//         "&:hover": {
//           boxShadow: theme.shadows[4],
//           transform: "translateY(-2px)",
//         },
//       }}
//     >
//       <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
//         <Box
//           display="flex"
//           justifyContent="space-between"
//           alignItems="flex-start"
//           mb={2}
//         >
//           <Box flex={1}>
//             <Typography
//               variant={isMobile ? "subtitle1" : "h6"}
//               fontWeight="600"
//               gutterBottom
//             >
//               {form.title}
//             </Typography>
//             {form.description && (
//               <Typography variant="body2" color="text.secondary" mb={1}>
//                 {form.description}
//               </Typography>
//             )}
//           </Box>
//           <Box display="flex" alignItems="center" gap={1}>
//             <Switch
//               checked={form.status === "Active"}
//               onChange={() => handleToggleFormStatus(form.id, form.status)}
//               disabled={loading}
//               size="small"
//             />
//             <Chip
//               label={form.status}
//               color={form.status === "Active" ? "success" : "default"}
//               size="small"
//             />
//           </Box>
//         </Box>

//         <Stack spacing={2}>
//           <Box>
//             <Typography
//               variant="caption"
//               color="text.secondary"
//               display="block"
//             >
//               Form URL
//             </Typography>
//             <Box display="flex" alignItems="center" gap={1}>
//               <Typography
//                 variant="body2"
//                 sx={{
//                   flex: 1,
//                   wordBreak: "break-all",
//                   fontSize: { xs: "0.7rem", sm: "0.75rem" },
//                   fontFamily: "monospace",
//                   backgroundColor: "rgba(0,0,0,0.05)",
//                   p: 1,
//                   borderRadius: 1,
//                 }}
//               >
//                 {/* Updated: Use the complete formUrl directly */}
//                 {`${getBaseUrl()}/${form.formUrl}`}
//               </Typography>
//               <IconButton
//                 size="small"
//                 onClick={() => handleCopyFormUrl(form.formUrl)}
//                 title="Copy URL"
//               >
//                 <CopyIcon fontSize="small" />
//               </IconButton>
//             </Box>
//           </Box>

//           <Box
//             display="flex"
//             justifyContent="space-between"
//             alignItems="center"
//           >
//             <Box>
//               <Typography
//                 variant="caption"
//                 color="text.secondary"
//                 display="block"
//               >
//                 Admission Fee
//               </Typography>
//               <Typography variant="body1" fontWeight="600">
//                 ₹{form.admissionFee || 0}
//               </Typography>
//             </Box>
//             <Box textAlign="right">
//               <Typography
//                 variant="caption"
//                 color="text.secondary"
//                 display="block"
//               >
//                 Created
//               </Typography>
//               <Typography variant="body2">
//                 {form.createdAt
//                   ? new Date(form.createdAt).toLocaleDateString()
//                   : "N/A"}
//               </Typography>
//             </Box>
//           </Box>
//         </Stack>
//       </CardContent>

//       <CardActions sx={{ px: { xs: 2, sm: 3 }, pb: { xs: 2, sm: 3 }, pt: 0 }}>
//         <Button
//           onClick={() => handleViewApplications(form.id)}
//           variant="outlined"
//           size="small"
//           startIcon={<ViewIcon />}
//           fullWidth
//           sx={{ textTransform: "none" }}
//         >
//           View Applications
//         </Button>
//       </CardActions>
//     </Card>
//   );

//   return (
//     <AdminLayout>
//       <Box
//         sx={{
//           width: "100%",
//           maxWidth: "1400px",
//           mx: "auto",
//           py: { xs: 2, sm: 4, lg: 6 },
//         }}
//       >
//         {/* Header Section */}
//         <Box
//           display="flex"
//           flexDirection={{ xs: "column", sm: "row" }}
//           justifyContent="space-between"
//           alignItems={{ xs: "stretch", sm: "center" }}
//           gap={2}
//           mb={3}
//         >
//           <Box>
//             <Typography
//               variant={isMobile ? "h5" : "h4"}
//               fontWeight="700"
//               gutterBottom
//               color="text.primary"
//             >
//               Admission Forms Management
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Create and manage admission forms for your institution
//             </Typography>
//           </Box>

//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => setOpenCreateDialog(true)}
//             disabled={loading}
//             size={isMobile ? "medium" : "large"}
//             sx={{
//               minWidth: { xs: "100%", sm: "auto" },
//               borderRadius: 2,
//               textTransform: "none",
//               fontWeight: 600,
//               px: 4,
//             }}
//           >
//             Create New Form
//           </Button>
//         </Box>

//         {/* Error Alert */}
//         {error && (
//           <Alert
//             severity="error"
//             sx={{ mb: 3, borderRadius: 2 }}
//             onClose={() => setError(null)}
//           >
//             {error}
//           </Alert>
//         )}

//         {/* Forms Content */}
//         {forms.length === 0 && !loading ? (
//           <Paper
//             sx={{
//               p: { xs: 4, sm: 6 },
//               textAlign: "center",
//               borderRadius: 3,
//               background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
//               border: "1px solid",
//               borderColor: "divider",
//             }}
//           >
//             <Typography variant="h6" color="text.secondary" gutterBottom>
//               No admission forms found
//             </Typography>
//             <Typography variant="body2" color="text.secondary" mb={3}>
//               Create your first admission form to get started with student
//               registrations
//             </Typography>
//             <Button
//               variant="contained"
//               onClick={() => setOpenCreateDialog(true)}
//               size="large"
//               sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}
//             >
//               Create Your First Form
//             </Button>
//           </Paper>
//         ) : isMobile || isTablet ? (
//           // Mobile/Tablet Card Layout
//           <Box>
//             {forms.map((form) => (
//               <FormCard key={form.id} form={form} />
//             ))}
//           </Box>
//         ) : (
//           // Desktop Table Layout
//           <Paper
//             sx={{
//               borderRadius: 3,
//               overflow: "hidden",
//               boxShadow: theme.shadows[3],
//             }}
//           >
//             <TableContainer>
//               <Table>
//                 <TableHead>
//                   <TableRow sx={{ backgroundColor: theme.palette.grey[100] }}>
//                     <TableCell sx={{ fontWeight: 600, py: 2 }}>Title</TableCell>
//                     <TableCell sx={{ fontWeight: 600, py: 2 }}>
//                       Form URL
//                     </TableCell>
//                     <TableCell sx={{ fontWeight: 600, py: 2 }}>Fee</TableCell>
//                     <TableCell sx={{ fontWeight: 600, py: 2 }}>
//                       Status
//                     </TableCell>
//                     <TableCell sx={{ fontWeight: 600, py: 2 }}>
//                       Created
//                     </TableCell>
//                     <TableCell sx={{ fontWeight: 600, py: 2 }}>
//                       Actions
//                     </TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {forms.map((form) => (
//                     <TableRow
//                       key={form.id}
//                       sx={{
//                         "&:hover": {
//                           backgroundColor: theme.palette.action.hover,
//                         },
//                         transition: "background-color 0.2s ease",
//                       }}
//                     >
//                       <TableCell sx={{ py: 2 }}>
//                         <Box>
//                           <Typography variant="body1" fontWeight="600">
//                             {form.title}
//                           </Typography>
//                           {form.description && (
//                             <Typography
//                               variant="caption"
//                               color="text.secondary"
//                             >
//                               {form.description}
//                             </Typography>
//                           )}
//                         </Box>
//                       </TableCell>

//                       <TableCell sx={{ py: 2 }}>
//                         <Box display="flex" alignItems="center" gap={1}>
//                           <Typography
//                             variant="body2"
//                             sx={{
//                               maxWidth: 250,
//                               wordBreak: "break-all",
//                               fontFamily: "monospace",
//                               fontSize: "0.75rem",
//                             }}
//                           >
//                             {/* Updated: Use the complete formUrl directly */}
//                             {`${getBaseUrl()}/${form.formUrl}`}
//                           </Typography>
//                           <IconButton
//                             size="small"
//                             onClick={() => handleCopyFormUrl(form.formUrl)}
//                             title="Copy URL"
//                           >
//                             <CopyIcon fontSize="small" />
//                           </IconButton>
//                         </Box>
//                       </TableCell>

//                       <TableCell sx={{ py: 2 }}>
//                         <Typography variant="body1" fontWeight="600">
//                           ₹{form.admissionFee || 0}
//                         </Typography>
//                       </TableCell>

//                       <TableCell sx={{ py: 2 }}>
//                         <Box display="flex" alignItems="center" gap={1}>
//                           <Switch
//                             checked={form.status === "Active"}
//                             onChange={() =>
//                               handleToggleFormStatus(form.id, form.status)
//                             }
//                             disabled={loading}
//                             size="small"
//                           />
//                           <Chip
//                             label={form.status}
//                             color={
//                               form.status === "Active" ? "success" : "default"
//                             }
//                             size="small"
//                           />
//                         </Box>
//                       </TableCell>

//                       <TableCell sx={{ py: 2 }}>
//                         <Typography variant="body2">
//                           {form.createdAt
//                             ? new Date(form.createdAt).toLocaleDateString()
//                             : "N/A"}
//                         </Typography>
//                       </TableCell>

//                       <TableCell sx={{ py: 2 }}>
//                         <Button
//                           onClick={() => handleViewApplications(form.id)}
//                           variant="outlined"
//                           size="small"
//                           sx={{ borderRadius: 2, textTransform: "none" }}
//                         >
//                           View Applications
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Paper>
//         )}

//         {/* Create Form Dialog */}
//         <Dialog
//           open={openCreateDialog}
//           onClose={() => setOpenCreateDialog(false)}
//           maxWidth="md"
//           fullWidth
//           fullScreen={isMobile}
//           sx={{
//             "& .MuiDialog-paper": {
//               borderRadius: isMobile ? 0 : 3,
//               maxHeight: isMobile ? "100vh" : "90vh",
//               m: isMobile ? 0 : 2,
//             },
//           }}
//         >
//           <DialogTitle
//             sx={{
//               borderBottom: "1px solid",
//               borderColor: "divider",
//               fontWeight: 600,
//               fontSize: { xs: "1.1rem", sm: "1.25rem" },
//               p: { xs: 2, sm: 3 },
//             }}
//           >
//             Create New Admission Form
//           </DialogTitle>

//           <DialogContent sx={{ p: { xs: 2, sm: 3 } }}>
//             <Grid container spacing={3} sx={{ mt: 0.5 }}>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Form Title *"
//                   value={newForm.title}
//                   onChange={(e) =>
//                     setNewForm({ ...newForm, title: e.target.value })
//                   }
//                   fullWidth
//                   required
//                   error={!newForm.title}
//                   helperText={!newForm.title ? "Title is required" : ""}
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <TextField
//                   label="Description"
//                   value={newForm.description}
//                   onChange={(e) =>
//                     setNewForm({ ...newForm, description: e.target.value })
//                   }
//                   fullWidth
//                   multiline
//                   rows={3}
//                   helperText="Brief description of the admission form"
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <TextField
//                   label="Admission Fee (₹) *"
//                   type="number"
//                   value={newForm.admissionFee}
//                   onChange={(e) =>
//                     setNewForm({
//                       ...newForm,
//                       admissionFee: Number(e.target.value),
//                     })
//                   }
//                   fullWidth
//                   required
//                   inputProps={{ min: 0, step: 0.01 }}
//                   error={newForm.admissionFee < 0}
//                   helperText={
//                     newForm.admissionFee < 0
//                       ? "Fee cannot be negative"
//                       : "Enter 0 for free admission"
//                   }
//                 />
//               </Grid>

//               {/* Additional Fields Section */}
//               <Grid item xs={12}>
//                 <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
//                   Add Custom Fields
//                 </Typography>
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="Field Name *"
//                   value={newField.name}
//                   onChange={(e) =>
//                     setNewField({ ...newField, name: e.target.value })
//                   }
//                   fullWidth
//                   placeholder="e.g., previousSchool"
//                   helperText="Use camelCase, letters and numbers only"
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="Field Label *"
//                   value={newField.label}
//                   onChange={(e) =>
//                     setNewField({ ...newField, label: e.target.value })
//                   }
//                   fullWidth
//                   placeholder="e.g., Previous School Name"
//                   helperText="Display label for users"
//                 />
//               </Grid>

//               <Grid item xs={12} sm={4}>
//                 <FormControl fullWidth>
//                   <InputLabel>Field Type</InputLabel>
//                   <Select
//                     value={newField.type}
//                     onChange={(e) =>
//                       setNewField({ ...newField, type: e.target.value })
//                     }
//                     label="Field Type"
//                   >
//                     <MenuItem value="text">Text</MenuItem>
//                     <MenuItem value="email">Email</MenuItem>
//                     <MenuItem value="tel">Phone</MenuItem>
//                     <MenuItem value="date">Date</MenuItem>
//                     <MenuItem value="select">Select/Dropdown</MenuItem>
//                     <MenuItem value="textarea">Textarea</MenuItem>
//                     <MenuItem value="number">Number</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>

//               <Grid item xs={12} sm={4}>
//                 <FormControlLabel
//                   control={
//                     <Checkbox
//                       checked={newField.required}
//                       onChange={(e) =>
//                         setNewField({ ...newField, required: e.target.checked })
//                       }
//                     />
//                   }
//                   label="Required Field"
//                 />
//               </Grid>

//               <Grid item xs={12} sm={4}>
//                 <TextField
//                   label="Validation Pattern (Regex)"
//                   value={newField.validation.pattern || ""}
//                   onChange={(e) =>
//                     setNewField({
//                       ...newField,
//                       validation: {
//                         ...newField.validation,
//                         pattern: e.target.value,
//                       },
//                     })
//                   }
//                   fullWidth
//                   helperText="Optional regex for validation"
//                 />
//               </Grid>

//               {newField.type === "select" && (
//                 <Grid item xs={12}>
//                   <TextField
//                     label="Options (comma-separated) *"
//                     value={newField.options.join(", ")}
//                     onChange={(e) =>
//                       setNewField({
//                         ...newField,
//                         options: e.target.value.split(",").map((o) => o.trim()),
//                       })
//                     }
//                     fullWidth
//                     placeholder="Option 1, Option 2, Option 3"
//                     helperText="Required for select type fields"
//                   />
//                 </Grid>
//               )}

//               <Grid item xs={12}>
//                 <Button
//                   variant="outlined"
//                   onClick={handleAddField}
//                   disabled={
//                     !newField.name ||
//                     !newField.label ||
//                     (newField.type === "select" &&
//                       newField.options.length === 0)
//                   }
//                   sx={{ borderRadius: 2, textTransform: "none" }}
//                 >
//                   Add Custom Field
//                 </Button>
//               </Grid>

//               {/* Display Added Fields */}
//               {newForm.additionalFields.length > 0 && (
//                 <Grid item xs={12}>
//                   <Typography variant="subtitle1" sx={{ mb: 1 }}>
//                     Added Custom Fields:
//                   </Typography>
//                   <Stack spacing={1}>
//                     {newForm.additionalFields.map((field, index) => (
//                       <Box
//                         key={index}
//                         display="flex"
//                         alignItems="center"
//                         gap={1}
//                         flexWrap="wrap"
//                       >
//                         <Chip
//                           label={`${field.label} (${field.type}${
//                             field.required ? ", required" : ""
//                           })`}
//                           variant="outlined"
//                           sx={{ flexGrow: { xs: 1, sm: 0 } }}
//                         />
//                         <IconButton
//                           size="small"
//                           onClick={() => handleRemoveField(index)}
//                           color="error"
//                         >
//                           <DeleteIcon fontSize="small" />
//                         </IconButton>
//                       </Box>
//                     ))}
//                   </Stack>
//                 </Grid>
//               )}
//             </Grid>
//           </DialogContent>

//           <DialogActions
//             sx={{
//               p: { xs: 2, sm: 3 },
//               borderTop: "1px solid",
//               borderColor: "divider",
//               gap: 1,
//               flexDirection: { xs: "column", sm: "row" },
//             }}
//           >
//             <Button
//               onClick={() => setOpenCreateDialog(false)}
//               disabled={loading}
//               sx={{
//                 textTransform: "none",
//                 width: { xs: "100%", sm: "auto" },
//                 order: { xs: 2, sm: 1 },
//               }}
//             >
//               Cancel
//             </Button>
//             <Button
//               onClick={handleCreateForm}
//               variant="contained"
//               disabled={loading || !newForm.title || newForm.admissionFee < 0}
//               sx={{
//                 textTransform: "none",
//                 borderRadius: 2,
//                 px: 3,
//                 width: { xs: "100%", sm: "auto" },
//                 order: { xs: 1, sm: 2 },
//               }}
//             >
//               {loading ? <CircularProgress size={20} /> : "Create Form"}
//             </Button>
//           </DialogActions>
//         </Dialog>

//         {/* Success Snackbar */}
//         <Snackbar
//           open={!!success}
//           autoHideDuration={6000}
//           onClose={() => setSuccess(null)}
//           anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//         >
//           <Alert severity="success" onClose={() => setSuccess(null)}>
//             {success}
//           </Alert>
//         </Snackbar>
//       </Box>
//     </AdminLayout>
//   );
// };

// export default AdmissionFormsPage;

import { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Switch,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Chip,
  IconButton,
  Snackbar,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  CardActions,
  Stack,
  Divider,
  Modal,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  ContentCopy as CopyIcon,
  Visibility as ViewIcon,
} from "@mui/icons-material";
import AdminService from "../../services/adminService";
import AdminLayout from "@/components/layout/AdminLayout";

const AdmissionFormsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedFormId, setSelectedFormId] = useState(null);
  const [applications, setApplications] = useState([]);
  const [qrCodeFile, setQrCodeFile] = useState(null); // New state for QR code file
  const [newForm, setNewForm] = useState({
    title: "",
    description: "",
    admissionFee: 0,
    additionalFields: [],
  });
  const [newField, setNewField] = useState({
    name: "",
    label: "",
    type: "text",
    required: false,
    options: [],
    validation: {},
  });

  const getBaseUrl = () => window.location.origin;

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await AdminService.getAllForms();
      let formsData = response.forms || response.data || response;
      const transformedForms = formsData.map((form) => ({
        id: form._id || form.id,
        title: form.title,
        formUrl: form.formUrl,
        status: form.isActive ? "Active" : "Inactive",
        createdAt: form.createdAt,
        admissionFee: form.admissionFee || 0,
        description: form.description || "",
        hasQRCode: !!form.paymentQRCode,
      }));
      setForms(transformedForms);
    } catch (error) {
      setError(
        "Failed to load forms: " +
          (error.response?.data?.error || error.message)
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCreateForm = async () => {
    if (!newForm.title || newForm.admissionFee < 0 || !qrCodeFile) {
      setError(
        "Form title, valid admission fee, and QR code image are required"
      );
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("title", newForm.title.trim());
      formData.append("description", newForm.description.trim());
      formData.append("admissionFee", Number(newForm.admissionFee));

      // Fix: Handle empty additionalFields properly
      if (newForm.additionalFields && newForm.additionalFields.length > 0) {
        // If there are additional fields, send each one individually
        newForm.additionalFields.forEach((field, index) => {
          formData.append(`additionalFields[${index}][name]`, field.name);
          formData.append(`additionalFields[${index}][label]`, field.label);
          formData.append(`additionalFields[${index}][type]`, field.type);
          formData.append(
            `additionalFields[${index}][required]`,
            field.required
          );

          // Handle options array if it exists
          if (field.options && field.options.length > 0) {
            field.options.forEach((option, optionIndex) => {
              formData.append(
                `additionalFields[${index}][options][${optionIndex}]`,
                option
              );
            });
          }

          // Handle validation object if it exists
          if (field.validation) {
            Object.keys(field.validation).forEach((validationKey) => {
              formData.append(
                `additionalFields[${index}][validation][${validationKey}]`,
                field.validation[validationKey]
              );
            });
          }
        });
      }
      // If no additional fields, don't append anything (backend will use default empty array)

      formData.append("qrCode", qrCodeFile);

      // Debug: Log form data contents
      console.log("Form data being sent:");
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const response = await AdminService.createAdmissionForm(formData);

      const newFormData = {
        id: response.id || response._id,
        title: response.title,
        formUrl: response.formUrl,
        status: response.isActive ? "Active" : "Inactive",
        createdAt: response.createdAt || new Date().toISOString(),
        admissionFee: response.admissionFee || 0,
        description: response.description || "",
        hasQRCode: !!(response.paymentQRCode && response.paymentQRCode.url),
      };

      setForms([newFormData, ...forms]);
      setOpenCreateDialog(false);
      resetFormState();
      setSuccess(
        `Form created successfully! Share this link with students: ${getBaseUrl()}/${
          response.formUrl
        }`
      );
    } catch (error) {
      console.error("Form creation error:", error);
      setError(
        "Failed to create form: " +
          (error.response?.data?.error || error.message)
      );
    } finally {
      setLoading(false);
    }
  };
  // Add this helper function
  const resetFormState = () => {
    setNewForm({
      title: "",
      description: "",
      admissionFee: 0,
      additionalFields: [],
    });
    setNewField({
      name: "",
      label: "",
      type: "text",
      required: false,
      options: [],
      validation: {},
    });
    setQrCodeFile(null);
  };

  // const handleToggleFormStatus = async (formId, currentStatus) => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const newStatus = currentStatus === "Active" ? false : true;
  //     await AdminService.toggleFormStatus(formId, { isActive: newStatus });
  //     setForms(
  //       forms.map((form) =>
  //         form.id === formId
  //           ? { ...form, status: newStatus ? "Active" : "Inactive" }
  //           : form
  //       )
  //     );
  //     setSuccess(
  //       `Form ${newStatus ? "activated" : "deactivated"} successfully!`
  //     );
  //   } catch (error) {
  //     setError(
  //       "Failed to toggle form status: " +
  //         (error.response?.data?.error || error.message)
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleAddField = () => {
    if (!newField.name || !newField.label) {
      setError("Field name and label are required");
      return;
    }
    const fieldNameRegex = /^[a-zA-Z][a-zA-Z0-9]*$/;
    if (!fieldNameRegex.test(newField.name)) {
      setError(
        "Field name should start with a letter and contain only letters and numbers"
      );
      return;
    }
    if (
      newForm.additionalFields.some((field) => field.name === newField.name)
    ) {
      setError("Field name must be unique");
      return;
    }
    const fieldToAdd = {
      ...newField,
      options:
        newField.type === "select"
          ? newField.options.filter((opt) => opt.trim() !== "")
          : [],
    };
    setNewForm({
      ...newForm,
      additionalFields: [...newForm.additionalFields, fieldToAdd],
    });
    setNewField({
      name: "",
      label: "",
      type: "text",
      required: false,
      options: [],
      validation: {},
    });
    setError(null);
  };

  const handleRemoveField = (index) => {
    setNewForm({
      ...newForm,
      additionalFields: newForm.additionalFields.filter((_, i) => i !== index),
    });
  };

  const handleCopyFormUrl = (formUrl) => {
    const fullUrl = `${getBaseUrl()}/${formUrl}`;
    navigator.clipboard
      .writeText(fullUrl)
      .then(() => {
        setSuccess("Form URL copied to clipboard!");
      })
      .catch(() => {
        setError("Failed to copy URL to clipboard");
      });
  };

  // Auto-remove error after 10s
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 10000);
      return () => clearTimeout(timer);
    }
  }, [error, setError]);

  // const handleViewApplications = async (formId) => {
  //   setSelectedFormId(formId);

  //   try {
  //     const response = await fetch(`/api/applications?formId=${formId}`); // Or use your service layer
  //     const data = await response.json();
  //     setApplications(data);
  //     setOpenModal(true);
  //   } catch (error) {
  //     console.error("Failed to load applications", error);
  //     // Optionally set an error state to display in modal
  //   }
  // };

  // Mobile Card Component
  const FormCard = ({ form }) => (
    <Card
      sx={{
        mb: 2,
        boxShadow: theme.shadows[2],
        borderRadius: 2,
        "&:hover": {
          boxShadow: theme.shadows[4],
          transform: "translateY(-2px)",
        },
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          mb={2}
        >
          <Box flex={1}>
            <Typography
              variant={isMobile ? "subtitle1" : "h6"}
              fontWeight="600"
              gutterBottom
            >
              {form.title}
            </Typography>
            {form.description && (
              <Typography variant="body2" color="text.secondary" mb={1}>
                {form.description}
              </Typography>
            )}
          </Box>
          <Box alignItems="center" gap={1}>
            {/* <Switch
              checked={form.status === "Active"}
              onChange={() => handleToggleFormStatus(form.id, form.status)}
              disabled={loading}
              size="small"
            /> */}
            <Chip
              label={form.status}
              color={form.status === "Active" ? "success" : "default"}
              size="small"
            />
          </Box>
        </Box>
        <Stack spacing={2}>
          <Box>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
            >
              Form URL
            </Typography>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography
                variant="body2"
                sx={{
                  flex: 1,
                  wordBreak: "break-all",
                  fontSize: { xs: "0.7rem", sm: "0.75rem" },
                  fontFamily: "monospace",
                  backgroundColor: "rgba(0,0,0,0.05)",
                  p: 1,
                  borderRadius: 1,
                }}
              >
                {`${getBaseUrl()}/${form.formUrl}`}
              </Typography>
              <IconButton
                size="small"
                onClick={() => handleCopyFormUrl(form.formUrl)}
                title="Copy URL"
              >
                <CopyIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
              >
                Admission Fee
              </Typography>
              <Typography variant="body1" fontWeight="600">
                ₹{form.admissionFee || 0}
              </Typography>
            </Box>
            <Box textAlign="right">
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
              >
                Created
              </Typography>
              <Typography variant="body2">
                {form.createdAt
                  ? new Date(form.createdAt).toLocaleDateString()
                  : "N/A"}
              </Typography>
            </Box>
          </Box>
          <Box>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
            >
              QR Code
            </Typography>
            <Typography variant="body2">
              {form.hasQRCode ? "QR Code Available" : "No QR Code"}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
      {/* <CardActions sx={{ px: { xs: 2, sm: 3 }, pb: { xs: 2, sm: 3 }, pt: 0 }}>
        <Button
          onClick={() => handleViewApplications(form.id)}
          variant="outlined"
          size="small"
          startIcon={<ViewIcon />}
          fullWidth
          sx={{ textTransform: "none" }}
        >
          View Applications
        </Button>
      </CardActions> */}
    </Card>
  );

  return (
    <AdminLayout>
      <Box
        sx={{
          width: "100%",
          maxWidth: "1400px",
          mx: "auto",
          py: { xs: 2, sm: 4, lg: 6 },
        }}
      >
        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "stretch", sm: "center" }}
          gap={2}
          mb={3}
        >
          <Box>
            <Typography
              variant={isMobile ? "h5" : "h4"}
              fontWeight="700"
              gutterBottom
              color="text.primary"
            >
              Admission Forms Management
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Create and manage admission forms for your institution
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenCreateDialog(true)}
            disabled={loading}
            size={isMobile ? "medium" : "large"}
            sx={{
              minWidth: { xs: "100%", sm: "auto" },
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              px: 4,
            }}
          >
            Create New Form
          </Button>
        </Box>

        {error && (
          <Alert
            severity="error"
            sx={{ mb: 3, borderRadius: 2 }}
            onClose={() => setError(null)}
          >
            {error}
          </Alert>
        )}

        {forms.length === 0 && !loading ? (
          <Paper
            sx={{
              p: { xs: 4, sm: 6 },
              textAlign: "center",
              borderRadius: 3,
              background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No admission forms found
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
              Create your first admission form to get started with student
              registrations
            </Typography>
            <Button
              variant="contained"
              onClick={() => setOpenCreateDialog(true)}
              size="large"
              sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}
            >
              Create Your First Form
            </Button>
          </Paper>
        ) : isMobile || isTablet ? (
          <Box>
            {forms.map((form) => (
              <FormCard key={form.id} form={form} />
            ))}
          </Box>
        ) : (
          <Paper
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              boxShadow: theme.shadows[3],
            }}
          >
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: theme.palette.grey[100] }}>
                    <TableCell
                      sx={{ fontWeight: 600, py: 2, textAlign: "center" }}
                    >
                      Title
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: 600, py: 2, textAlign: "center" }}
                    >
                      Form URL
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: 600, py: 2, textAlign: "center" }}
                    >
                      Fee
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: 600, py: 2, textAlign: "center" }}
                    >
                      Status
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: 600, py: 2, textAlign: "center" }}
                    >
                      Created
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: 600, py: 2, textAlign: "center" }}
                    >
                      QR Code
                    </TableCell>
                    {/* <TableCell
                      sx={{ fontWeight: 600, py: 2, textAlign: "center" }}
                    >
                      Actions
                    </TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {forms.map((form) => (
                    <TableRow
                      key={form.id}
                      sx={{
                        "&:hover": {
                          backgroundColor: theme.palette.action.hover,
                        },
                        transition: "background-color 0.2s ease",
                      }}
                    >
                      <TableCell sx={{ py: 2, textAlign: "center" }}>
                        <Box>
                          <Typography variant="body1" fontWeight="600">
                            {form.title}
                          </Typography>
                          {form.description && (
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {form.description}
                            </Typography>
                          )}
                        </Box>
                      </TableCell>
                      <TableCell sx={{ py: 2, textAlign: "center" }}>
                        <Box
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          gap={1}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              maxWidth: 250,
                              wordBreak: "break-all",
                              fontFamily: "monospace",
                              fontSize: "0.75rem",
                            }}
                          >
                            {`${getBaseUrl()}/${form.formUrl}`}
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={() => handleCopyFormUrl(form.formUrl)}
                            title="Copy URL"
                          >
                            <CopyIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ py: 2, textAlign: "center" }}>
                        <Typography variant="body1" fontWeight="600">
                          ₹{form.admissionFee || 0}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ py: 2, textAlign: "center" }}>
                        <Box alignItems="center" gap={1}>
                          {/* <Switch
                            checked={form.status === "Active"}
                            onChange={() =>
                              handleToggleFormStatus(form.id, form.status)
                            }
                            disabled={loading}
                            size="small"
                          /> */}
                          <Chip
                            label={form.status}
                            color={
                              form.status === "Active" ? "success" : "default"
                            }
                            size="small"
                          />
                        </Box>
                      </TableCell>
                      <TableCell sx={{ py: 2, textAlign: "center" }}>
                        <Typography variant="body2">
                          {form.createdAt
                            ? new Date(form.createdAt).toLocaleDateString()
                            : "N/A"}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ py: 2, textAlign: "center" }}>
                        <Typography variant="body2">
                          {form.hasQRCode ? "Available" : "Not Set"}
                        </Typography>
                      </TableCell>
                      {/* <TableCell sx={{ py: 2, textAlign: "center" }}>
                        <Button
                          onClick={() => handleViewApplications(form.id)}
                          variant="outlined"
                          size="small"
                          sx={{ borderRadius: 2, textTransform: "none" }}
                        >
                          View Applications
                        </Button>
                      </TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}

        <Dialog
          open={openCreateDialog}
          onClose={() => setOpenCreateDialog(false)}
          maxWidth="md"
          fullWidth
          fullScreen={isMobile}
          sx={{
            "& .MuiDialog-paper": {
              borderRadius: isMobile ? 0 : 3,
              maxHeight: isMobile ? "100vh" : "90vh",
              m: isMobile ? 0 : 2,
            },
          }}
        >
          <DialogTitle
            sx={{ fontWeight: 600, fontSize: { xs: "1.25rem", sm: "1.5rem" } }}
          >
            Create New Admission Form
          </DialogTitle>

          <Divider />
          
          <DialogContent sx={{ p: { xs: 2, sm: 3 } }}>
            
            <Typography variant="h6" sx={{ mb: 2 }}>Form Details</Typography>

            <Stack spacing={3}>
              <TextField
                label="Form Title"
                value={newForm.title}
                onChange={(e) =>
                  setNewForm({ ...newForm, title: e.target.value })
                }
                fullWidth
                required
                // error={!newForm.title}
                helperText={!newForm.title ? "Title is required" : ""}
              />

              <TextField
                label="Description"
                value={newForm.description}
                onChange={(e) =>
                  setNewForm({ ...newForm, description: e.target.value })
                }
                fullWidth
                multiline
                rows={3}
                helperText="Brief description of the admission form"
              />

              <TextField
                label="Admission Fee (₹) "
                type="number"
                value={newForm.admissionFee}
                onChange={(e) =>
                  setNewForm({
                    ...newForm,
                    admissionFee: Number(e.target.value),
                  })
                }
                fullWidth
                required
                inputProps={{ min: 0, step: 0.01 }}
                error={newForm.admissionFee < 0}
                helperText={
                  newForm.admissionFee < 0
                    ? "Fee cannot be negative"
                    : "Enter 0 for free admission"
                }
              />

              <Typography variant="subtitle1">QR Code for Payment *</Typography>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{
                  borderRadius: 2,
                  py: 2,
                  borderStyle: qrCodeFile ? "solid" : "dashed",
                  borderColor: qrCodeFile ? "success.main" : "grey.300",
                  backgroundColor: qrCodeFile ? "#86c983" : "transparent",
                  "&:hover": {
                    borderColor: "primary.main",
                    backgroundColor: qrCodeFile ? "success.light" : "grey.50",
                  },
                }}
              >
                {qrCodeFile ? (
                  <Stack alignItems="center">
                    <Typography color="#254223">
                      ✓ {qrCodeFile.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Click to change file
                    </Typography>
                  </Stack>
                ) : (
                  "Upload QR Code Image (PNG/JPG)"
                )}
                <input
                  type="file"
                  hidden
                  accept="image/png, image/jpeg"
                  onChange={(e) => setQrCodeFile(e.target.files[0])}
                />
              </Button>
              <Typography variant="caption" color="text.secondary">
                Upload a clear image of the payment QR code (Max 5MB)
              </Typography>

              <Divider />

              <Typography variant="h6">Add Custom Fields</Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Field Name *"
                    value={newField.name}
                    onChange={(e) =>
                      setNewField({ ...newField, name: e.target.value })
                    }
                    fullWidth
                    placeholder="e.g., previousSchool"
                    helperText="Use camelCase, letters and numbers only"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Field Label *"
                    value={newField.label}
                    onChange={(e) =>
                      setNewField({ ...newField, label: e.target.value })
                    }
                    fullWidth
                    placeholder="e.g., Previous School Name"
                    helperText="Display label for users"
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel>Field Type</InputLabel>
                    <Select
                      value={newField.type}
                      onChange={(e) =>
                        setNewField({ ...newField, type: e.target.value })
                      }
                      label="Field Type"
                    >
                      <MenuItem value="text">Text</MenuItem>
                      <MenuItem value="email">Email</MenuItem>
                      <MenuItem value="tel">Phone</MenuItem>
                      <MenuItem value="date">Date</MenuItem>
                      <MenuItem value="select">Select/Dropdown</MenuItem>
                      <MenuItem value="textarea">Textarea</MenuItem>
                      <MenuItem value="number">Number</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={newField.required}
                        onChange={(e) =>
                          setNewField({
                            ...newField,
                            required: e.target.checked,
                          })
                        }
                      />
                    }
                    label="Required Field"
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Validation Pattern (Regex)"
                    value={newField.validation.pattern || ""}
                    onChange={(e) =>
                      setNewField({
                        ...newField,
                        validation: {
                          ...newField.validation,
                          pattern: e.target.value,
                        },
                      })
                    }
                    fullWidth
                    helperText="Optional regex for validation"
                  />
                </Grid>

                {newField.type === "select" && (
                  <Grid item xs={12}>
                    <TextField
                      label="Options (comma-separated) *"
                      value={newField.options.join(", ")}
                      onChange={(e) =>
                        setNewField({
                          ...newField,
                          options: e.target.value
                            .split(",")
                            .map((o) => o.trim()),
                        })
                      }
                      fullWidth
                      placeholder="Option 1, Option 2, Option 3"
                      helperText="Required for select type fields"
                    />
                  </Grid>
                )}

                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    onClick={handleAddField}
                    disabled={
                      !newField.name ||
                      !newField.label ||
                      (newField.type === "select" &&
                        newField.options.length === 0)
                    }
                    sx={{ textTransform: "none", borderRadius: 2 }}
                  >
                    Add Custom Field
                  </Button>
                </Grid>
              </Grid>

              {newForm.additionalFields.length > 0 && (
                <>
                  <Typography variant="subtitle1">
                    Added Custom Fields:
                  </Typography>
                  <Stack spacing={1}>
                    {newForm.additionalFields.map((field, index) => (
                      <Box
                        key={index}
                        display="flex"
                        alignItems="center"
                        gap={1}
                        flexWrap="wrap"
                      >
                        <Chip
                          label={`${field.label} (${field.type}${
                            field.required ? ", required" : ""
                          })`}
                          variant="outlined"
                          sx={{ flexGrow: 1 }}
                        />
                        <IconButton
                          size="small"
                          onClick={() => handleRemoveField(index)}
                          color="error"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    ))}
                  </Stack>
                </>
              )}
            </Stack>
          </DialogContent>

          <DialogActions
            sx={{
              p: { xs: 2, sm: 3 },
              borderTop: "1px solid",
              borderColor: "divider",
            }}
          >
            <Button
              onClick={() => setOpenCreateDialog(false)}
              disabled={loading}
              sx={{ textTransform: "none" }}
            >
              Cancel
            </Button>

            <Button
              onClick={handleCreateForm}
              variant="contained"
              disabled={
                loading ||
                !newForm.title ||
                newForm.admissionFee < 0 ||
                !qrCodeFile
              }
              sx={{ textTransform: "none", borderRadius: 2 }}
            >
              {loading ? <CircularProgress size={20} /> : "Create Form"}
            </Button>
          </DialogActions>
        </Dialog>

        {/* remove "{false && ()}" when modal has to show  */}
        {false && (
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <Box
            sx={{
              p: 3,
              bgcolor: "white",
              maxWidth: 600,
              margin: "auto",
              mt: 10,
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" mb={2}>
              Applications for Form ID: {selectedFormId}
            </Typography>

            {applications.length > 0 ? (
              applications.map((app) => (
                <Box
                  key={app._id}
                  sx={{
                    mb: 2,
                    p: 2,
                    border: "1px solid #ddd",
                    borderRadius: 1,
                  }}
                >
                  <Typography>
                    <strong>Name:</strong> {app.name}
                  </Typography>
                  <Typography>
                    <strong>Email:</strong> {app.email}
                  </Typography>
                  <Typography>
                    <strong>Submitted At:</strong>{" "}
                    {new Date(app.createdAt).toLocaleString()}
                  </Typography>
                  {/* Add more fields as needed */}
                </Box>
              ))
            ) : (
              <Typography>No applications found.</Typography>
            )}

            <Button
              onClick={() => setOpenModal(false)}
              variant="contained"
              sx={{ mt: 2 }}
            >
              Close
            </Button>
          </Box>
        </Modal>
        )}

        <Snackbar
          open={!!success}
          autoHideDuration={6000}
          onClose={() => setSuccess(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert severity="success" onClose={() => setSuccess(null)}>
            {success}
          </Alert>
        </Snackbar>
      </Box>
    </AdminLayout>
  );
};

export default AdmissionFormsPage;
