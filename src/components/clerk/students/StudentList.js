// // src/components/clerk/students/StudentList.js
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   IconButton,
//   Collapse,
//   Box,
//   Typography,
//   Avatar,
//   Chip,
//   Menu,
//   MenuItem,
//   Grid,
//   Card,
//   CardContent,
//   useTheme,
//   useMediaQuery,
//   Stack,
//   Tooltip,
//   Alert,
//   LinearProgress,
//   Skeleton,
// } from "@mui/material";
// import {
//   MoreVert as MoreIcon,
//   KeyboardArrowDown as ExpandIcon,
//   KeyboardArrowUp as CollapseIcon,
//   Upgrade as UpgradeIcon,
//   Person as PersonIcon,
//   Email as EmailIcon,
//   Phone as PhoneIcon,
//   Home as HomeIcon,
//   School as SchoolIcon,
//   DirectionsBus as TransportIcon,
//   Work as WorkIcon,
//   CalendarToday as CalendarIcon,
//   LocationOn as LocationIcon,
//   People as PeopleIcon,
//   Badge as BadgeIcon,
//   Numbers as NumberIcon,
// } from "@mui/icons-material";
// import { useState } from "react";
// import ClassUpgradeForm from "./ClassUpgradeForm";

// const StudentList = ({
//   students = [],
//   classes = [],
//   onUpgrade,
//   loading = false,
// }) => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"));
//   const isTablet = useMediaQuery(theme.breakpoints.down("lg"));

//   const [expandedStudent, setExpandedStudent] = useState(null);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [upgradeDialogOpen, setUpgradeDialogOpen] = useState(false);

//   const open = Boolean(anchorEl);

//   // Event Handlers
//   const handleExpandClick = (studentId) => {
//     setExpandedStudent(expandedStudent === studentId ? null : studentId);
//   };

//   const handleMenuClick = (event, student) => {
//     event.stopPropagation();
//     setAnchorEl(event.currentTarget);
//     setSelectedStudent(student);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const handleUpgradeClick = () => {
//     setUpgradeDialogOpen(true);
//     handleMenuClose();
//   };

//   const handleUpgradeSubmit = async (studentId, newClassId) => {
//     try {
//       await onUpgrade(studentId, newClassId);
//       setUpgradeDialogOpen(false);
//     } catch (error) {
//       console.error("Upgrade failed:", error);
//     }
//   };

//   // Utility Functions
//   const formatDate = (dateString) => {
//     if (!dateString) return "Not specified";
//     try {
//       return new Date(dateString).toLocaleDateString("en-IN", {
//         year: "numeric",
//         month: "short",
//         day: "numeric",
//       });
//     } catch (error) {
//       return "Invalid date";
//     }
//   };

//   const getAdmissionTypeColor = (type) => {
//     switch (type?.toLowerCase()) {
//       case "regular":
//         return "primary";
//       case "rte":
//         return "success";
//       case "scholarship":
//         return "info";
//       default:
//         return "default";
//     }
//   };

//   const getGenderDisplay = (gender) => {
//     if (!gender) return "Not specified";
//     return gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase();
//   };

//   const getInitials = (name) => {
//     if (!name) return "S";
//     const names = name.split(" ");
//     return names.length > 1
//       ? `${names[0][0]}${names[1][0]}`.toUpperCase()
//       : name[0].toUpperCase();
//   };

//   // Components
//   const DetailItem = ({ icon, label, value, sx = {} }) => (
//     <Box
//       sx={{
//         display: "flex",
//         alignItems: "flex-start",
//         gap: 1.5,
//         mb: 2,
//         p: 1,
//         borderRadius: 1,
//         "&:hover": {
//           bgcolor: "action.hover",
//         },
//         ...sx,
//       }}
//     >
//       <Box
//         sx={{
//           color: "primary.main",
//           mt: 0.5,
//           minWidth: 20,
//           display: "flex",
//           justifyContent: "center",
//         }}
//       >
//         {icon}
//       </Box>
//       <Box sx={{ flex: 1, minWidth: 0 }}>
//         <Typography
//           variant="caption"
//           color="text.secondary"
//           sx={{
//             display: "block",
//             fontWeight: 500,
//             textTransform: "uppercase",
//             letterSpacing: 0.5,
//             fontSize: "0.75rem",
//           }}
//         >
//           {label}
//         </Typography>
//         <Typography
//           variant="body2"
//           sx={{
//             fontWeight: 500,
//             wordBreak: "break-word",
//             color:
//               value === "Not specified" || value === "N/A"
//                 ? "text.secondary"
//                 : "text.primary",
//           }}
//         >
//           {value || "Not specified"}
//         </Typography>
//       </Box>
//     </Box>
//   );

//   const MobileStudentCard = ({ student, index }) => (
//     <Card
//       sx={{
//         mb: 2,
//         boxShadow: 1,
//         "&:hover": {
//           boxShadow: 3,
//           transform: "translateY(-1px)",
//         },
//         transition: "all 0.2s ease-in-out",
//       }}
//     >
//       <CardContent sx={{ p: 2 }}>
//         {/* Header */}
//         <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//           <Box sx={{ position: "relative", mr: 2 }}>
//             <Avatar
//               sx={{
//                 width: 48,
//                 height: 48,
//                 bgcolor: "primary.main",
//                 fontSize: "1.2rem",
//                 fontWeight: "bold",
//               }}
//             >
//               {getInitials(student.name)}
//             </Avatar>
//             <Box
//               sx={{
//                 position: "absolute",
//                 top: -8,
//                 left: -8,
//                 bgcolor: "primary.main",
//                 color: "primary.contrastText",
//                 borderRadius: "50%",
//                 width: 24,
//                 height: 24,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: "0.75rem",
//                 fontWeight: "bold",
//               }}
//             >
//               {index + 1}
//             </Box>
//           </Box>
//           <Box sx={{ flex: 1, minWidth: 0 }}>
//             <Typography variant="h6" sx={{ fontWeight: "bold", mb: 0.5 }}>
//               {student.name || "Unknown Student"}
//             </Typography>
//             <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
//               GR: {student.grNumber || "Not assigned"}
//             </Typography>
//             <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
//               <Chip
//                 label={student.admissionType || "Regular"}
//                 size="small"
//                 color={getAdmissionTypeColor(student.admissionType)}
//                 variant="outlined"
//               />
//               {student.isRTE && (
//                 <Chip
//                   label="RTE"
//                   size="small"
//                   color="success"
//                   variant="outlined"
//                 />
//               )}
//             </Box>
//           </Box>
//           <IconButton
//             onClick={(e) => handleMenuClick(e, student)}
//             size="small"
//             sx={{ alignSelf: "flex-start" }}
//           >
//             <MoreIcon />
//           </IconButton>
//         </Box>

//         {/* Quick Info */}
//         <Grid container spacing={2} sx={{ mb: 2 }}>
//           <Grid item xs={6}>
//             <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//               <PersonIcon fontSize="small" color="action" />
//               <Box>
//                 <Typography variant="caption" color="text.secondary">
//                   Gender
//                 </Typography>
//                 <Typography variant="body2" sx={{ fontWeight: 500 }}>
//                   {getGenderDisplay(student.gender)}
//                 </Typography>
//               </Box>
//             </Box>
//           </Grid>
//           <Grid item xs={6}>
//             <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//               <PhoneIcon fontSize="small" color="action" />
//               <Box>
//                 <Typography variant="caption" color="text.secondary">
//                   Mobile
//                 </Typography>
//                 <Typography variant="body2" sx={{ fontWeight: 500 }}>
//                   {student.mobile || "Not provided"}
//                 </Typography>
//               </Box>
//             </Box>
//           </Grid>
//         </Grid>

//         {/* Expand Button */}
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             pt: 1,
//             borderTop: "1px solid",
//             borderColor: "divider",
//           }}
//         >
//           <IconButton
//             onClick={() => handleExpandClick(student.id)}
//             size="small"
//             sx={{
//               minWidth: "auto",
//               "&:hover": {
//                 bgcolor: "primary.main",
//                 color: "primary.contrastText",
//               },
//             }}
//           >
//             {expandedStudent === student.id ? <CollapseIcon /> : <ExpandIcon />}
//           </IconButton>
//         </Box>

//         {/* Expanded Details */}
//         <Collapse
//           in={expandedStudent === student.id}
//           timeout="auto"
//           unmountOnExit
//         >
//           <Box
//             sx={{
//               mt: 2,
//               pt: 2,
//               borderTop: "1px solid",
//               borderColor: "divider",
//             }}
//           >
//             {renderExpandedContent(student)}
//           </Box>
//         </Collapse>
//       </CardContent>
//     </Card>
//   );

//   const renderExpandedContent = (student) => (
//     <>
//       <Typography
//         variant="h6"
//         sx={{
//           color: "primary.main",
//           fontWeight: "bold",
//           mb: 3,
//           display: "flex",
//           alignItems: "center",
//           gap: 1,
//         }}
//       >
//         <BadgeIcon fontSize="small" />
//         Student Profile
//       </Typography>

//       <Grid container spacing={3}>
//         {/* Personal Information */}
//         <Grid item xs={12} lg={4}>
//           <Card variant="outlined" sx={{ height: "100%" }}>
//             <CardContent>
//               <Typography
//                 variant="subtitle1"
//                 sx={{
//                   fontWeight: "bold",
//                   mb: 2,
//                   color: "primary.main",
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 1,
//                 }}
//               >
//                 <PersonIcon fontSize="small" />
//                 Personal Information
//               </Typography>

//               <DetailItem
//                 icon={<BadgeIcon fontSize="small" />}
//                 label="GR Number"
//                 value={student.grNumber}
//               />

//               <DetailItem
//                 icon={<CalendarIcon fontSize="small" />}
//                 label="Date of Birth"
//                 value={formatDate(student.dob)}
//               />

//               <DetailItem
//                 icon={<PersonIcon fontSize="small" />}
//                 label="Gender"
//                 value={getGenderDisplay(student.gender)}
//               />

//               <DetailItem
//                 icon={<EmailIcon fontSize="small" />}
//                 label="Email"
//                 value={student.email}
//               />

//               <DetailItem
//                 icon={<PhoneIcon fontSize="small" />}
//                 label="Mobile"
//                 value={student.mobile}
//               />
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Parent Information */}
//         <Grid item xs={12} lg={4}>
//           <Card variant="outlined" sx={{ height: "100%" }}>
//             <CardContent>
//               <Typography
//                 variant="subtitle1"
//                 sx={{
//                   fontWeight: "bold",
//                   mb: 2,
//                   color: "primary.main",
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 1,
//                 }}
//               >
//                 <PersonIcon fontSize="small" />
//                 Parent Information
//               </Typography>

//               {student.parentDetails ? (
//                 <>
//                   <DetailItem
//                     icon={<PersonIcon fontSize="small" />}
//                     label="Parent Name"
//                     value={student.parentDetails.name}
//                   />

//                   <DetailItem
//                     icon={<EmailIcon fontSize="small" />}
//                     label="Parent Email"
//                     value={student.parentDetails.email}
//                   />

//                   <DetailItem
//                     icon={<PhoneIcon fontSize="small" />}
//                     label="Parent Mobile"
//                     value={student.parentDetails.mobile}
//                   />

//                   <DetailItem
//                     icon={<WorkIcon fontSize="small" />}
//                     label="Occupation"
//                     value={student.parentDetails.occupation}
//                   />
//                 </>
//               ) : (
//                 <Alert severity="info" sx={{ mt: 2 }}>
//                   No parent information available
//                 </Alert>
//               )}
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Transport Information */}
//         <Grid item xs={12} lg={4}>
//           <Card variant="outlined" sx={{ height: "100%" }}>
//             <CardContent>
//               <Typography
//                 variant="subtitle1"
//                 sx={{
//                   fontWeight: "bold",
//                   mb: 2,
//                   color: "primary.main",
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 1,
//                 }}
//               >
//                 <TransportIcon fontSize="small" />
//                 Transport Details
//               </Typography>

//               {student.transportDetails ? (
//                 <>
//                   <Box sx={{ mb: 2 }}>
//                     <Chip
//                       label={
//                         student.transportDetails.isApplicable
//                           ? "Transport Required"
//                           : "No Transport"
//                       }
//                       size="small"
//                       color={
//                         student.transportDetails.isApplicable
//                           ? "success"
//                           : "default"
//                       }
//                       variant={
//                         student.transportDetails.isApplicable
//                           ? "filled"
//                           : "outlined"
//                       }
//                     />
//                   </Box>

//                   {student.transportDetails.isApplicable && (
//                     <>
//                       <DetailItem
//                         icon={<LocationIcon fontSize="small" />}
//                         label="Distance"
//                         value={
//                           student.transportDetails.distance
//                             ? `${student.transportDetails.distance} km`
//                             : "Not specified"
//                         }
//                       />

//                       <DetailItem
//                         icon={<TransportIcon fontSize="small" />}
//                         label="Distance Slab"
//                         value={student.transportDetails.distanceSlab}
//                       />
//                     </>
//                   )}
//                 </>
//               ) : (
//                 <Alert severity="info" sx={{ mt: 2 }}>
//                   No transport information available
//                 </Alert>
//               )}
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>

//       {/* Additional Information */}
//       <Card variant="outlined" sx={{ mt: 3, bgcolor: "background.paper" }}>
//         <CardContent>
//           <Typography
//             variant="subtitle1"
//             sx={{ fontWeight: "bold", mb: 2, color: "primary.main" }}
//           >
//             Additional Information
//           </Typography>
//           <Grid container spacing={2}>
//             <Grid item xs={6} sm={3}>
//               <DetailItem
//                 icon={<BadgeIcon fontSize="small" />}
//                 label="Status"
//                 value="Active"
//               />
//             </Grid>
//             <Grid item xs={6} sm={3}>
//               <DetailItem
//                 icon={<SchoolIcon fontSize="small" />}
//                 label="RTE Student"
//                 value={student.isRTE ? "Yes" : "No"}
//               />
//             </Grid>
//             {student.createdAt && (
//               <Grid item xs={6} sm={3}>
//                 <DetailItem
//                   icon={<CalendarIcon fontSize="small" />}
//                   label="Admission Date"
//                   value={formatDate(student.createdAt)}
//                 />
//               </Grid>
//             )}
//             {student.updatedAt && (
//               <Grid item xs={6} sm={3}>
//                 <DetailItem
//                   icon={<CalendarIcon fontSize="small" />}
//                   label="Last Updated"
//                   value={formatDate(student.updatedAt)}
//                 />
//               </Grid>
//             )}
//           </Grid>
//         </CardContent>
//       </Card>
//     </>
//   );

//   // Loading state
//   if (loading) {
//     return (
//       <Box sx={{ width: "100%" }}>
//         <LinearProgress />
//         <Box sx={{ p: 3 }}>
//           <Grid container spacing={3}>
//             {[1, 2, 3].map((item) => (
//               <Grid item xs={12} sm={6} md={4} key={item}>
//                 <Skeleton
//                   variant="rectangular"
//                   height={200}
//                   sx={{ borderRadius: 2 }}
//                 />
//               </Grid>
//             ))}
//           </Grid>
//         </Box>
//       </Box>
//     );
//   }

//   // Empty state
//   if (!students || students.length === 0) {
//     return (
//       <Card variant="outlined" sx={{ mt: 2 }}>
//         <CardContent>
//           <Alert severity="info">
//             No students found. Students will appear here once they are added to
//             the system.
//           </Alert>
//         </CardContent>
//       </Card>
//     );
//   }

//   return (
//     <>
//       {isMobile ? (
//         // Mobile View - Card Layout
//         <Box sx={{ p: 1 }}>
//           {students.map((student, index) => (
//             <MobileStudentCard
//               key={student.id}
//               student={student}
//               index={index}
//             />
//           ))}
//         </Box>
//       ) : (
//         // Desktop/Tablet View - Table Layout
//         <TableContainer
//           component={Paper}
//           elevation={0}
//           variant="outlined"
//           sx={{
//             borderRadius: 2,
//             overflow: "hidden",
//             position: "relative",
//           }}
//         >
//           <Table sx={{ minWidth: 650 }} stickyHeader>
//             <TableHead>
//               <TableRow>
//                 <TableCell sx={{ width: 48 }} />
//                 {/* <TableCell sx={{ fontWeight: 'bold', width: 60 }}>
//                   <Tooltip title="Serial Number">
//                     <NumberIcon fontSize="small" color="primary" />
//                   </Tooltip>
//                 </TableCell> */}
//                 <TableCell sx={{ fontWeight: "bold", width: 90 }}>
//                   S. No.
//                 </TableCell>

//                 <TableCell sx={{ fontWeight: "bold", minWidth: 120 }}>
//                   GR Number
//                 </TableCell>
//                 <TableCell sx={{ fontWeight: "bold", minWidth: 200 }}>
//                   Student
//                 </TableCell>
//                 <TableCell sx={{ fontWeight: "bold", minWidth: 130 }}>
//                   Admission Type
//                 </TableCell>
//                 <TableCell sx={{ fontWeight: "bold", minWidth: 100 }}>
//                   Gender
//                 </TableCell>
//                 <TableCell sx={{ fontWeight: "bold", minWidth: 130 }}>
//                   Mobile
//                 </TableCell>
//                 <TableCell sx={{ fontWeight: "bold", width: 60 }}>
//                   Actions
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {students.map((student, index) => (
//                 <>
//                   <TableRow
//                     key={student.id}
//                     hover
//                     sx={{
//                       cursor: "pointer",
//                       "&:hover": {
//                         bgcolor: "action.hover",
//                       },
//                     }}
//                     onClick={() => handleExpandClick(student.id)}
//                   >
//                     <TableCell>
//                       <IconButton
//                         size="small"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleExpandClick(student.id);
//                         }}
//                       >
//                         {expandedStudent === student.id ? (
//                           <CollapseIcon />
//                         ) : (
//                           <ExpandIcon />
//                         )}
//                       </IconButton>
//                     </TableCell>
//                     <TableCell>
//                       <Typography variant="body2" color="text.secondary">
//                         {index + 1}
//                       </Typography>
//                     </TableCell>
//                     <TableCell>
//                       <Typography variant="body2" fontWeight="bold">
//                         {student.grNumber || "Not assigned"}
//                       </Typography>
//                     </TableCell>
//                     <TableCell>
//                       <Box
//                         sx={{ display: "flex", alignItems: "center", gap: 2 }}
//                       >
//                         <Avatar
//                           sx={{
//                             width: 40,
//                             height: 40,
//                             bgcolor: "primary.main",
//                             fontSize: "1rem",
//                             fontWeight: "bold",
//                           }}
//                         >
//                           {getInitials(student.name)}
//                         </Avatar>
//                         <Box sx={{ minWidth: 0 }}>
//                           <Typography
//                             variant="subtitle2"
//                             fontWeight="bold"
//                             sx={{
//                               overflow: "hidden",
//                               textOverflow: "ellipsis",
//                               whiteSpace: "nowrap",
//                             }}
//                           >
//                             {student.name || "Unknown Student"}
//                           </Typography>
//                           <Typography
//                             variant="caption"
//                             color="text.secondary"
//                             sx={{
//                               overflow: "hidden",
//                               textOverflow: "ellipsis",
//                               whiteSpace: "nowrap",
//                               display: "block",
//                             }}
//                           >
//                             {student.email || "No email"}
//                           </Typography>
//                         </Box>
//                       </Box>
//                     </TableCell>
//                     <TableCell>
//                       <Stack direction="row" spacing={1} flexWrap="wrap">
//                         <Chip
//                           label={student.admissionType || "Regular"}
//                           size="small"
//                           color={getAdmissionTypeColor(student.admissionType)}
//                           variant="outlined"
//                         />
//                         {student.isRTE && (
//                           <Chip
//                             label="RTE"
//                             size="small"
//                             color="success"
//                             variant="outlined"
//                           />
//                         )}
//                       </Stack>
//                     </TableCell>
//                     <TableCell>
//                       <Typography variant="body2">
//                         {getGenderDisplay(student.gender)}
//                       </Typography>
//                     </TableCell>
//                     <TableCell>
//                       <Typography variant="body2">
//                         {student.mobile || "Not provided"}
//                       </Typography>
//                     </TableCell>
//                     <TableCell>
//                       <Tooltip title="More actions">
//                         <IconButton
//                           onClick={(e) => handleMenuClick(e, student)}
//                           size="small"
//                         >
//                           <MoreIcon />
//                         </IconButton>
//                       </Tooltip>
//                     </TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell
//                       style={{ paddingBottom: 0, paddingTop: 0 }}
//                       colSpan={8}
//                     >
//                       <Collapse
//                         in={expandedStudent === student.id}
//                         timeout="auto"
//                         unmountOnExit
//                       >
//                         <Box sx={{ margin: 2 }}>
//                           {renderExpandedContent(student)}
//                         </Box>
//                       </Collapse>
//                     </TableCell>
//                   </TableRow>
//                 </>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}

//       <Menu
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleMenuClose}
//         anchorOrigin={{
//           vertical: "bottom",
//           horizontal: "right",
//         }}
//         transformOrigin={{
//           vertical: "top",
//           horizontal: "right",
//         }}
//         PaperProps={{
//           sx: {
//             minWidth: 160,
//             boxShadow: 3,
//           },
//         }}
//       >
//         <MenuItem onClick={handleUpgradeClick} sx={{ gap: 1 }}>
//           <UpgradeIcon fontSize="small" />
//           Upgrade Class
//         </MenuItem>
//       </Menu>

//       {selectedStudent && (
//         <ClassUpgradeForm
//           open={upgradeDialogOpen}
//           onClose={() => setUpgradeDialogOpen(false)}
//           student={selectedStudent}
//           classes={classes}
//           onSubmit={handleUpgradeSubmit}
//         />
//       )}
//     </>
//   );
// };

// export default StudentList;





// // src/components/clerk/students/StudentList.js
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   IconButton,
//   Collapse,
//   Box,
//   Typography,
//   Avatar,
//   Chip,
//   Menu,
//   MenuItem,
//   Grid,
//   Card,
//   CardContent,
//   useTheme,
//   useMediaQuery,
//   Stack,
//   Tooltip,
//   Alert,
//   LinearProgress,
//   Skeleton,
// } from "@mui/material";
// import {
//   MoreVert as MoreIcon,
//   KeyboardArrowDown as ExpandIcon,
//   KeyboardArrowUp as CollapseIcon,
//   Upgrade as UpgradeIcon,
//   Person as PersonIcon,
//   Email as EmailIcon,
//   Phone as PhoneIcon,
//   Home as HomeIcon,
//   School as SchoolIcon,
//   DirectionsBus as TransportIcon,
//   Work as WorkIcon,
//   CalendarToday as CalendarIcon,
//   LocationOn as LocationIcon,
//   People as PeopleIcon,
//   Badge as BadgeIcon,
//   Numbers as NumberIcon,
// } from "@mui/icons-material";
// import { useState } from "react";
// import ClassUpgradeForm from "./ClassUpgradeForm";

// const StudentList = ({
//   students = [],
//   classes = [],
//   onUpgrade,
//   loading = false,
// }) => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"));
//   const isTablet = useMediaQuery(theme.breakpoints.down("lg"));

//   const [expandedStudent, setExpandedStudent] = useState(null);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [upgradeDialogOpen, setUpgradeDialogOpen] = useState(false);

//   const open = Boolean(anchorEl);

//   // Event Handlers
//   const handleExpandClick = (studentId) => {
//     setExpandedStudent(expandedStudent === studentId ? null : studentId);
//   };

//   const handleMenuClick = (event, student) => {
//     event.stopPropagation();
//     setAnchorEl(event.currentTarget);
//     setSelectedStudent(student);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const handleUpgradeClick = () => {
//     setUpgradeDialogOpen(true);
//     handleMenuClose();
//   };

//   const handleUpgradeSubmit = async (studentId, newClassId) => {
//     try {
//       await onUpgrade(studentId, newClassId);
//       setUpgradeDialogOpen(false);
//     } catch (error) {
//       console.error("Upgrade failed:", error);
//     }
//   };

//   // Utility Functions
//   const formatDate = (dateString) => {
//     if (!dateString) return "Not specified";
//     try {
//       return new Date(dateString).toLocaleDateString("en-IN", {
//         year: "numeric",
//         month: "short",
//         day: "numeric",
//       });
//     } catch (error) {
//       return "Invalid date";
//     }
//   };

//   const getAdmissionTypeColor = (type) => {
//     switch (type?.toLowerCase()) {
//       case "regular":
//         return "primary";
//       case "rte":
//         return "success";
//       case "scholarship":
//         return "info";
//       default:
//         return "default";
//     }
//   };

//   const getGenderDisplay = (gender) => {
//     if (!gender) return "Not specified";
//     return gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase();
//   };

//   const getInitials = (name) => {
//     if (!name) return "S";
//     const names = name.split(" ");
//     return names.length > 1
//       ? `${names[0][0]}${names[1][0]}`.toUpperCase()
//       : name[0].toUpperCase();
//   };

//   // Components
//   const DetailItem = ({ icon, label, value, sx = {} }) => (
//     <Box
//       sx={{
//         display: "flex",
//         alignItems: "flex-start",
//         gap: 1.5,
//         mb: 2,
//         p: 1,
//         borderRadius: 1,
//         "&:hover": {
//           bgcolor: "action.hover",
//         },
//         ...sx,
//       }}
//     >
//       <Box
//         sx={{
//           color: "primary.main",
//           mt: 0.5,
//           minWidth: 20,
//           display: "flex",
//           justifyContent: "center",
//         }}
//       >
//         {icon}
//       </Box>
//       <Box sx={{ flex: 1, minWidth: 0 }}>
//         <Typography
//           variant="caption"
//           color="text.secondary"
//           sx={{
//             display: "block",
//             fontWeight: 500,
//             textTransform: "uppercase",
//             letterSpacing: 0.5,
//             fontSize: "0.75rem",
//           }}
//         >
//           {label}
//         </Typography>
//         <Typography
//           variant="body2"
//           sx={{
//             fontWeight: 500,
//             wordBreak: "break-word",
//             color:
//               value === "Not specified" || value === "N/A"
//                 ? "text.secondary"
//                 : "text.primary",
//           }}
//         >
//           {value || "Not specified"}
//         </Typography>
//       </Box>
//     </Box>
//   );

//   const MobileStudentCard = ({ student, index }) => (
//     <Card
//       sx={{
//         mb: 2,
//         boxShadow: 1,
//         "&:hover": {
//           boxShadow: 3,
//           transform: "translateY(-1px)",
//         },
//         transition: "all 0.2s ease-in-out",
//       }}
//     >
//       <CardContent sx={{ p: 2 }}>
//         {/* Header */}
//         <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//           <Box sx={{ position: "relative", mr: 2 }}>
//             <Avatar
//               sx={{
//                 width: 48,
//                 height: 48,
//                 bgcolor: "primary.main",
//                 fontSize: "1.2rem",
//                 fontWeight: "bold",
//               }}
//             >
//               {getInitials(student.name)}
//             </Avatar>
//             <Box
//               sx={{
//                 position: "absolute",
//                 top: -8,
//                 left: -8,
//                 bgcolor: "primary.main",
//                 color: "primary.contrastText",
//                 borderRadius: "50%",
//                 width: 24,
//                 height: 24,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: "0.75rem",
//                 fontWeight: "bold",
//               }}
//             >
//               {index + 1}
//             </Box>
//           </Box>
//           <Box sx={{ flex: 1, minWidth: 0 }}>
//             <Typography variant="h6" sx={{ fontWeight: "bold", mb: 0.5 }}>
//               {student.name || "Unknown Student"}
//             </Typography>
//             <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
//               GR: {student.grNumber || "Not assigned"}
//             </Typography>
//             <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
//               <Chip
//                 label={student.admissionType || "Regular"}
//                 size="small"
//                 color={getAdmissionTypeColor(student.admissionType)}
//                 variant="outlined"
//               />
//               {student.isRTE && (
//                 <Chip
//                   label="RTE"
//                   size="small"
//                   color="success"
//                   variant="outlined"
//                 />
//               )}
//             </Box>
//           </Box>
//           <IconButton
//             onClick={(e) => handleMenuClick(e, student)}
//             size="small"
//             sx={{ alignSelf: "flex-start" }}
//           >
//             <MoreIcon />
//           </IconButton>
//         </Box>

//         {/* Quick Info */}
//         <Grid container spacing={2} sx={{ mb: 2 }}>
//           <Grid item xs={6}>
//             <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//               <PersonIcon fontSize="small" color="action" />
//               <Box>
//                 <Typography variant="caption" color="text.secondary">
//                   Gender
//                 </Typography>
//                 <Typography variant="body2" sx={{ fontWeight: 500 }}>
//                   {getGenderDisplay(student.gender)}
//                 </Typography>
//               </Box>
//             </Box>
//           </Grid>
//           <Grid item xs={6}>
//             <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//               <PhoneIcon fontSize="small" color="action" />
//               <Box>
//                 <Typography variant="caption" color="text.secondary">
//                   Mobile
//                 </Typography>
//                 <Typography variant="body2" sx={{ fontWeight: 500 }}>
//                   {student.mobile || "Not provided"}
//                 </Typography>
//               </Box>
//             </Box>
//           </Grid>
//         </Grid>

//         {/* Expand Button */}
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             pt: 1,
//             borderTop: "1px solid",
//             borderColor: "divider",
//           }}
//         >
//           <IconButton
//             onClick={() => handleExpandClick(student.id)}
//             size="small"
//             sx={{
//               minWidth: "auto",
//               "&:hover": {
//                 bgcolor: "primary.main",
//                 color: "primary.contrastText",
//               },
//             }}
//           >
//             {expandedStudent === student.id ? <CollapseIcon /> : <ExpandIcon />}
//           </IconButton>
//         </Box>

//         {/* Expanded Details */}
//         <Collapse
//           in={expandedStudent === student.id}
//           timeout="auto"
//           unmountOnExit
//         >
//           <Box
//             sx={{
//               mt: 2,
//               pt: 2,
//               borderTop: "1px solid",
//               borderColor: "divider",
//             }}
//           >
//             {renderExpandedContent(student)}
//           </Box>
//         </Collapse>
//       </CardContent>
//     </Card>
//   );

//   const renderExpandedContent = (student) => (
//     <>
//       <Typography
//         variant="h6"
//         sx={{
//           color: "primary.main",
//           fontWeight: "bold",
//           mb: 3,
//           display: "flex",
//           alignItems: "center",
//           gap: 1,
//         }}
//       >
//         <BadgeIcon fontSize="small" />
//         Student Profile
//       </Typography>

//       <Grid container spacing={3}>
//         {/* Personal Information */}
//         <Grid item xs={12} lg={4}>
//           <Card variant="outlined" sx={{ height: "100%" }}>
//             <CardContent>
//               <Typography
//                 variant="subtitle1"
//                 sx={{
//                   fontWeight: "bold",
//                   mb: 2,
//                   color: "primary.main",
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 1,
//                 }}
//               >
//                 <PersonIcon fontSize="small" />
//                 Personal Information
//               </Typography>

//               <DetailItem
//                 icon={<BadgeIcon fontSize="small" />}
//                 label="GR Number"
//                 value={student.grNumber}
//               />
//               <DetailItem
//                 icon={<CalendarIcon fontSize="small" />}
//                 label="Date of Birth"
//                 value={formatDate(student.dob)}
//               />
//               <DetailItem
//                 icon={<PersonIcon fontSize="small" />}
//                 label="Gender"
//                 value={getGenderDisplay(student.gender)}
//               />
//               <DetailItem
//                 icon={<EmailIcon fontSize="small" />}
//                 label="Email"
//                 value={student.email}
//               />
//               <DetailItem
//                 icon={<PhoneIcon fontSize="small" />}
//                 label="Mobile"
//                 value={student.mobile}
//               />
//               <DetailItem
//                 icon={<SchoolIcon fontSize="small" />}
//                 label="Religion"
//                 value={student.religion}
//               />
//               <DetailItem
//                 icon={<SchoolIcon fontSize="small" />}
//                 label="Caste"
//                 value={student.caste}
//               />
//               <DetailItem
//                 icon={<SchoolIcon fontSize="small" />}
//                 label="Sub-Caste"
//                 value={student.subCaste}
//               />
//               <DetailItem
//                 icon={<BadgeIcon fontSize="small" />}
//                 label="UID Number"
//                 value={student.uidNumber}
//               />
//               <DetailItem
//                 icon={<BadgeIcon fontSize="small" />}
//                 label="Aadhar Number"
//                 value={student.aadharNumber}
//               />
//               <DetailItem
//                 icon={<CalendarIcon fontSize="small" />}
//                 label="Admission Date"
//                 value={formatDate(student.admissionDate)}
//               />
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Parent Information */}
//         <Grid item xs={12} lg={4}>
//           <Card variant="outlined" sx={{ height: "100%" }}>
//             <CardContent>
//               <Typography
//                 variant="subtitle1"
//                 sx={{
//                   fontWeight: "bold",
//                   mb: 2,
//                   color: "primary.main",
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 1,
//                 }}
//               >
//                 <PersonIcon fontSize="small" />
//                 Parent Information
//               </Typography>

//               {student.parentDetails ? (
//                 <>
//                   <DetailItem
//                     icon={<PersonIcon fontSize="small" />}
//                     label="Parent Name"
//                     value={student.parentDetails.name}
//                   />
//                   <DetailItem
//                     icon={<EmailIcon fontSize="small" />}
//                     label="Parent Email"
//                     value={student.parentDetails.email}
//                   />
//                   <DetailItem
//                     icon={<PhoneIcon fontSize="small" />}
//                     label="Parent Mobile"
//                     value={student.parentDetails.mobile}
//                   />
//                   <DetailItem
//                     icon={<WorkIcon fontSize="small" />}
//                     label="Occupation"
//                     value={student.parentDetails.occupation}
//                   />
//                   <DetailItem
//                     icon={<BadgeIcon fontSize="small" />}
//                     label="Parent Aadhar Number"
//                     value={student.parentDetails.aadharNumber}
//                   />
//                 </>
//               ) : (
//                 <Alert severity="info" sx={{ mt: 2 }}>
//                   No parent information available
//                 </Alert>
//               )}
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Transport Information */}
//         <Grid item xs={12} lg={4}>
//           <Card variant="outlined" sx={{ height: "100%" }}>
//             <CardContent>
//               <Typography
//                 variant="subtitle1"
//                 sx={{
//                   fontWeight: "bold",
//                   mb: 2,
//                   color: "primary.main",
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 1,
//                 }}
//               >
//                 <TransportIcon fontSize="small" />
//                 Transport Details
//               </Typography>

//               {student.transportDetails ? (
//                 <>
//                   <Box sx={{ mb: 2 }}>
//                     <Chip
//                       label={
//                         student.transportDetails.isApplicable
//                           ? "Transport Required"
//                           : "No Transport"
//                       }
//                       size="small"
//                       color={
//                         student.transportDetails.isApplicable
//                           ? "success"
//                           : "default"
//                       }
//                       variant={
//                         student.transportDetails.isApplicable
//                           ? "filled"
//                           : "outlined"
//                       }
//                     />
//                   </Box>

//                   {student.transportDetails.isApplicable && (
//                     <>
//                       <DetailItem
//                         icon={<LocationIcon fontSize="small" />}
//                         label="Distance"
//                         value={
//                           student.transportDetails.distance
//                             ? `${student.transportDetails.distance} km`
//                             : "Not specified"
//                         }
//                       />
//                       <DetailItem
//                         icon={<TransportIcon fontSize="small" />}
//                         label="Distance Slab"
//                         value={student.transportDetails.distanceSlab}
//                       />
//                     </>
//                   )}
//                 </>
//               ) : (
//                 <Alert severity="info" sx={{ mt: 2 }}>
//                   No transport information available
//                 </Alert>
//               )}
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>

//       {/* Additional Information */}
//       <Card variant="outlined" sx={{ mt: 3, bgcolor: "background.paper" }}>
//         <CardContent>
//           <Typography
//             variant="subtitle1"
//             sx={{ fontWeight: "bold", mb: 2, color: "primary.main" }}
//           >
//             Additional Information
//           </Typography>
//           <Grid container spacing={2}>
//             <Grid item xs={6} sm={3}>
//               <DetailItem
//                 icon={<BadgeIcon fontSize="small" />}
//                 label="Status"
//                 value={student.status || "Active"}
//               />
//             </Grid>
//             <Grid item xs={6} sm={3}>
//               <DetailItem
//                 icon={<SchoolIcon fontSize="small" />}
//                 label="RTE Student"
//                 value={student.isRTE ? "Yes" : "No"}
//               />
//             </Grid>
//             {student.createdAt && (
//               <Grid item xs={6} sm={3}>
//                 <DetailItem
//                   icon={<CalendarIcon fontSize="small" />}
//                   label="Created At"
//                   value={formatDate(student.createdAt)}
//                 />
//               </Grid>
//             )}
//             {student.updatedAt && (
//               <Grid item xs={6} sm={3}>
//                 <DetailItem
//                   icon={<CalendarIcon fontSize="small" />}
//                   label="Last Updated"
//                   value={formatDate(student.updatedAt)}
//                 />
//               </Grid>
//             )}
//           </Grid>
//         </CardContent>
//       </Card>
//     </>
//   );

//   // Loading state
//   if (loading) {
//     return (
//       <Box sx={{ width: "100%" }}>
//         <LinearProgress />
//         <Box sx={{ p: 3 }}>
//           <Grid container spacing={3}>
//             {[1, 2, 3].map((item) => (
//               <Grid item xs={12} sm={6} md={4} key={item}>
//                 <Skeleton
//                   variant="rectangular"
//                   height={200}
//                   sx={{ borderRadius: 2 }}
//                 />
//               </Grid>
//             ))}
//           </Grid>
//         </Box>
//       </Box>
//     );
//   }

//   // Empty state
//   if (!students || students.length === 0) {
//     return (
//       <Card variant="outlined" sx={{ mt: 2 }}>
//         <CardContent>
//           <Alert severity="info">
//             No students found. Students will appear here once they are added to
//             the system.
//           </Alert>
//         </CardContent>
//       </Card>
//     );
//   }

//   return (
//     <>
//       {isMobile ? (
//         // Mobile View - Card Layout
//         <Box sx={{ p: 1 }}>
//           {students.map((student, index) => (
//             <MobileStudentCard
//               key={student.id}
//               student={student}
//               index={index}
//             />
//           ))}
//         </Box>
//       ) : (
//         // Desktop/Tablet View - Table Layout
//         <TableContainer
//           component={Paper}
//           elevation={0}
//           variant="outlined"
//           sx={{
//             borderRadius: 2,
//             overflow: "hidden",
//             position: "relative",
//           }}
//         >
//           <Table sx={{ minWidth: 650 }} stickyHeader>
//             <TableHead>
//               <TableRow>
//                 <TableCell sx={{ width: 48 }} />
//                 <TableCell sx={{ fontWeight: "bold", width: 90 }}>
//                   S. No.
//                 </TableCell>
//                 <TableCell sx={{ fontWeight: "bold", minWidth: 120 }}>
//                   GR Number
//                 </TableCell>
//                 <TableCell sx={{ fontWeight: "bold", minWidth: 200 }}>
//                   Student
//                 </TableCell>
//                 <TableCell sx={{ fontWeight: "bold", minWidth: 130 }}>
//                   Admission Type
//                 </TableCell>
//                 <TableCell sx={{ fontWeight: "bold", minWidth: 100 }}>
//                   Gender
//                 </TableCell>
//                 <TableCell sx={{ fontWeight: "bold", minWidth: 130 }}>
//                   Mobile
//                 </TableCell>
//                 <TableCell sx={{ fontWeight: "bold", width: 60 }}>
//                   Actions
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {students.map((student, index) => (
//                 <>
//                   <TableRow
//                     key={student.id}
//                     hover
//                     sx={{
//                       cursor: "pointer",
//                       "&:hover": {
//                         bgcolor: "action.hover",
//                       },
//                     }}
//                     onClick={() => handleExpandClick(student.id)}
//                   >
//                     <TableCell>
//                       <IconButton
//                         size="small"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleExpandClick(student.id);
//                         }}
//                       >
//                         {expandedStudent === student.id ? (
//                           <CollapseIcon />
//                         ) : (
//                           <ExpandIcon />
//                         )}
//                       </IconButton>
//                     </TableCell>
//                     <TableCell>
//                       <Typography variant="body2" color="text.secondary">
//                         {index + 1}
//                       </Typography>
//                     </TableCell>
//                     <TableCell>
//                       <Typography variant="body2" fontWeight="bold">
//                         {student.grNumber || "Not assigned"}
//                       </Typography>
//                     </TableCell>
//                     <TableCell>
//                       <Box
//                         sx={{ display: "flex", alignItems: "center", gap: 2 }}
//                       >
//                         <Avatar
//                           sx={{
//                             width: 40,
//                             height: 40,
//                             bgcolor: "primary.main",
//                             fontSize: "1rem",
//                             fontWeight: "bold",
//                           }}
//                         >
//                           {getInitials(student.name)}
//                         </Avatar>
//                         <Box sx={{ minWidth: 0 }}>
//                           <Typography
//                             variant="subtitle2"
//                             fontWeight="bold"
//                             sx={{
//                               overflow: "hidden",
//                               textOverflow: "ellipsis",
//                               whiteSpace: "nowrap",
//                             }}
//                           >
//                             {student.name || "Unknown Student"}
//                           </Typography>
//                           <Typography
//                             variant="caption"
//                             color="text.secondary"
//                             sx={{
//                               overflow: "hidden",
//                               textOverflow: "ellipsis",
//                               whiteSpace: "nowrap",
//                               display: "block",
//                             }}
//                           >
//                             {student.email || "No email"}
//                           </Typography>
//                         </Box>
//                       </Box>
//                     </TableCell>
//                     <TableCell>
//                       <Stack direction="row" spacing={1} flexWrap="wrap">
//                         <Chip
//                           label={student.admissionType || "Regular"}
//                           size="small"
//                           color={getAdmissionTypeColor(student.admissionType)}
//                           variant="outlined"
//                         />
//                         {student.isRTE && (
//                           <Chip
//                             label="RTE"
//                             size="small"
//                             color="success"
//                             variant="outlined"
//                           />
//                         )}
//                       </Stack>
//                     </TableCell>
//                     <TableCell>
//                       <Typography variant="body2">
//                         {getGenderDisplay(student.gender)}
//                       </Typography>
//                     </TableCell>
//                     <TableCell>
//                       <Typography variant="body2">
//                         {student.mobile || "Not provided"}
//                       </Typography>
//                     </TableCell>
//                     <TableCell>
//                       <Tooltip title="More actions">
//                         <IconButton
//                           onClick={(e) => handleMenuClick(e, student)}
//                           size="small"
//                         >
//                           <MoreIcon />
//                         </IconButton>
//                       </Tooltip>
//                     </TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell
//                       style={{ paddingBottom: 0, paddingTop: 0 }}
//                       colSpan={8}
//                     >
//                       <Collapse
//                         in={expandedStudent === student.id}
//                         timeout="auto"
//                         unmountOnExit
//                       >
//                         <Box sx={{ margin: 2 }}>
//                           {renderExpandedContent(student)}
//                         </Box>
//                       </Collapse>
//                     </TableCell>
//                   </TableRow>
//                 </>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}

//       <Menu
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleMenuClose}
//         anchorOrigin={{
//           vertical: "bottom",
//           horizontal: "right",
//         }}
//         transformOrigin={{
//           vertical: "top",
//           horizontal: "right",
//         }}
//         PaperProps={{
//           sx: {
//             minWidth: 160,
//             boxShadow: 3,
//           },
//         }}
//       >
//         <MenuItem onClick={handleUpgradeClick} sx={{ gap: 1 }}>
//           <UpgradeIcon fontSize="small" />
//           Upgrade Class
//         </MenuItem>
//       </Menu>

//       {selectedStudent && (
//         <ClassUpgradeForm
//           open={upgradeDialogOpen}
//           onClose={() => setUpgradeDialogOpen(false)}
//           student={selectedStudent}
//           classes={classes}
//           onSubmit={handleUpgradeSubmit}
//         />
//       )}
//     </>
//   );
// };

// export default StudentList;






// src/components/clerk/students/StudentList.js
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Collapse,
  Box,
  Typography,
  Avatar,
  Chip,
  Menu,
  MenuItem,
  Grid,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
  Stack,
  Tooltip,
  Alert,
  LinearProgress,
  Skeleton,
  Divider,
  Badge,
  Button,
  CardActions,
  Fade,
  Zoom,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  MoreVert as MoreIcon,
  KeyboardArrowDown as ExpandIcon,
  KeyboardArrowUp as CollapseIcon,
  Upgrade as UpgradeIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Home as HomeIcon,
  School as SchoolIcon,
  DirectionsBus as TransportIcon,
  Work as WorkIcon,
  CalendarToday as CalendarIcon,
  LocationOn as LocationIcon,
  People as PeopleIcon,
  Badge as BadgeIcon,
  Numbers as NumberIcon,
  Verified as VerifiedIcon,
  Star as StarIcon,
  Info as InfoIcon,
  ContactPhone as ContactPhoneIcon,
  AccountCircle as AccountCircleIcon,
  FamilyRestroom as FamilyIcon,
  DirectionsCar as CarIcon,
  AdminPanelSettings as AdminIcon,
  Visibility as VisibilityIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useState } from "react";
import ClassUpgradeForm from "./ClassUpgradeForm";

const StudentList = ({
  students = [],
  classes = [],
  onUpgrade,
  loading = false,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [upgradeDialogOpen, setUpgradeDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

  const open = Boolean(anchorEl);

  // Event Handlers
  const handleMenuClick = (event, student) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedStudent(student);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleUpgradeClick = () => {
    setUpgradeDialogOpen(true);
    handleMenuClose();
  };

  const handleViewDetailsClick = () => {
    setDetailsDialogOpen(true);
    handleMenuClose();
  };

  const handleUpgradeSubmit = async (studentId, newClassId) => {
    try {
      await onUpgrade(studentId, newClassId);
      setUpgradeDialogOpen(false);
    } catch (error) {
      console.error("Upgrade failed:", error);
    }
  };

  // Utility Functions
  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    try {
      return new Date(dateString).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      return "Invalid date";
    }
  };

  const getAdmissionTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case "regular":
        return "primary";
      case "rte":
        return "success";
      case "scholarship":
        return "warning";
      default:
        return "default";
    }
  };

  const getGenderDisplay = (gender) => {
    if (!gender) return "Not specified";
    return gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase();
  };

  const getInitials = (name) => {
    if (!name) return "S";
    const names = name.split(" ");
    return names.length > 1
      ? `${names[0][0]}${names[1][0]}`.toUpperCase()
      : name[0].toUpperCase();
  };

  const getAvatarColor = (index) => {
    const colors = [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      theme.palette.success.main,
      theme.palette.warning.main,
      theme.palette.info.main,
      theme.palette.error.main,
    ];
    return colors[index % colors.length];
  };

  // Components
  const DetailItem = ({ icon, label, value, sx = {} }) => (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: 1.5,
        mb: 2,
        p: 1.5,
        borderRadius: 2,
        backgroundColor: "background.default",
        border: "1px solid",
        borderColor: "divider",
        transition: "all 0.2s ease",
        "&:hover": {
          bgcolor: "action.hover",
          borderColor: "primary.main",
          transform: "translateY(-1px)",
          boxShadow: 1,
        },
        ...sx,
      }}
    >
      <Box
        sx={{
          color: "primary.main",
          mt: 0.5,
          minWidth: 20,
          display: "flex",
          justifyContent: "center",
        }}
      >
        {icon}
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            display: "block",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: 0.8,
            fontSize: "0.7rem",
            mb: 0.5,
          }}
        >
          {label}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 500,
            wordBreak: "break-word",
            color:
              value === "Not specified" || value === "N/A"
                ? "text.secondary"
                : "text.primary",
            fontSize: "0.875rem",
          }}
        >
          {value || "Not specified"}
        </Typography>
      </Box>
    </Box>
  );

  const MobileStudentCard = ({ student, index }) => (
    <Zoom in timeout={300 + index * 100}>
      <Card
        sx={{
          mb: 3,
          borderRadius: 3,
          overflow: "hidden",
          background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
          border: "1px solid",
          borderColor: "divider",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: theme.shadows[8],
            borderColor: "primary.main",
          },
        }}
      >
        <CardContent sx={{ p: 3 }}>
          {/* Header */}
          <Box sx={{ display: "flex", alignItems: "flex-start", mb: 3 }}>
            <Box sx={{ position: "relative", mr: 2 }}>
              <Avatar
                sx={{
                  width: 64,
                  height: 64,
                  bgcolor: getAvatarColor(index),
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  border: "3px solid white",
                  boxShadow: 3,
                }}
              >
                {getInitials(student.name)}
              </Avatar>
              <Badge
                badgeContent={index + 1}
                sx={{
                  position: "absolute",
                  top: -8,
                  left: -8,
                  "& .MuiBadge-badge": {
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                    fontWeight: "bold",
                    fontSize: "0.75rem",
                    minWidth: 24,
                    height: 24,
                  },
                }}
              />
              {student.isRTE && (
                <Tooltip title="RTE Student">
                  <VerifiedIcon
                    sx={{
                      position: "absolute",
                      bottom: -4,
                      right: -4,
                      color: "success.main",
                      bgcolor: "white",
                      borderRadius: "50%",
                      fontSize: 20,
                    }}
                  />
                </Tooltip>
              )}
            </Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  mb: 0.5,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {student.name || "Unknown Student"}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 1, fontWeight: 500 }}
              >
                GR: {student.grNumber || "Not assigned"}
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                <Chip
                  label={student.admissionType || "Regular"}
                  size="small"
                  color={getAdmissionTypeColor(student.admissionType)}
                  variant="filled"
                  sx={{
                    fontWeight: "bold",
                    borderRadius: 2,
                  }}
                />
                {student.isRTE && (
                  <Chip
                    icon={<StarIcon fontSize="small" />}
                    label="RTE"
                    size="small"
                    color="success"
                    variant="filled"
                    sx={{
                      fontWeight: "bold",
                      borderRadius: 2,
                    }}
                  />
                )}
              </Stack>
            </Box>
            <IconButton
              onClick={(e) => handleMenuClick(e, student)}
              size="small"
              sx={{
                bgcolor: "action.hover",
                "&:hover": {
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                  transform: "scale(1.1)",
                },
                transition: "all 0.2s ease",
              }}
            >
              <MoreIcon />
            </IconButton>
          </Box>

          {/* Quick Info Cards */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={6}>
              <Card
                variant="outlined"
                sx={{
                  p: 2,
                  textAlign: "center",
                  borderRadius: 2,
                  bgcolor: "primary.50",
                  borderColor: "primary.200",
                }}
              >
                <PersonIcon
                  sx={{ color: "primary.main", fontSize: 28, mb: 1 }}
                />
                <Typography variant="caption" color="text.secondary" display="block">
                  Gender
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {getGenderDisplay(student.gender)}
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card
                variant="outlined"
                sx={{
                  p: 2,
                  textAlign: "center",
                  borderRadius: 2,
                  bgcolor: "success.50",
                  borderColor: "success.200",
                }}
              >
                <ContactPhoneIcon
                  sx={{ color: "success.main", fontSize: 28, mb: 1 }}
                />
                <Typography variant="caption" color="text.secondary" display="block">
                  Mobile
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {student.mobile || "Not provided"}
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Zoom>
  );

  const renderExpandedContent = (student) => (
    <Fade in timeout={500}>
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 4,
            p: 2,
            borderRadius: 3,
            background: `linear-gradient(135deg, ${theme.palette.primary.main}10, ${theme.palette.secondary.main}10)`,
            border: "1px solid",
            borderColor: "primary.200",
          }}
        >
          <AccountCircleIcon sx={{ color: "primary.main", fontSize: 32 }} />
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "primary.main",
            }}
          >
            Student Profile Details
          </Typography>
        </Box>

        {/* Personal Information */}
        <Card
          sx={{
            borderRadius: 3,
            background: `linear-gradient(135deg, ${theme.palette.info.main}05, ${theme.palette.info.main}15)`,
            border: "1px solid",
            borderColor: "info.200",
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 3,
                pb: 2,
                borderBottom: "2px solid",
                borderColor: "info.200",
              }}
            >
              <PersonIcon sx={{ color: "info.main", fontSize: 24 }} />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "info.main",
                }}
              >
                Personal Information
              </Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <DetailItem
                  icon={<BadgeIcon fontSize="small" />}
                  label="GR Number"
                  value={student.grNumber}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <DetailItem
                  icon={<CalendarIcon fontSize="small" />}
                  label="Date of Birth"
                  value={formatDate(student.dob)}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <DetailItem
                  icon={<PersonIcon fontSize="small" />}
                  label="Gender"
                  value={getGenderDisplay(student.gender)}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <DetailItem
                  icon={<EmailIcon fontSize="small" />}
                  label="Email"
                  value={student.email}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <DetailItem
                  icon={<PhoneIcon fontSize="small" />}
                  label="Mobile"
                  value={student.mobile}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <DetailItem
                  icon={<SchoolIcon fontSize="small" />}
                  label="Religion"
                  value={student.religion}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <DetailItem
                  icon={<SchoolIcon fontSize="small" />}
                  label="Caste"
                  value={student.caste}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <DetailItem
                  icon={<SchoolIcon fontSize="small" />}
                  label="Sub-Caste"
                  value={student.subCaste}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <DetailItem
                  icon={<BadgeIcon fontSize="small" />}
                  label="UID Number"
                  value={student.uidNumber}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <DetailItem
                  icon={<BadgeIcon fontSize="small" />}
                  label="Aadhar Number"
                  value={student.aadharNumber}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <DetailItem
                  icon={<CalendarIcon fontSize="small" />}
                  label="Admission Date"
                  value={formatDate(student.admissionDate)}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Parent Information */}
        <Card
          sx={{
            mt: 3,
            borderRadius: 3,
            background: `linear-gradient(135deg, ${theme.palette.success.main}05, ${theme.palette.success.main}15)`,
            border: "1px solid",
            borderColor: "success.200",
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 3,
                pb: 2,
                borderBottom: "2px solid",
                borderColor: "success.200",
              }}
            >
              <FamilyIcon sx={{ color: "success.main", fontSize: 24 }} />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "success.main",
                }}
              >
                Parent Information
              </Typography>
            </Box>

            {student.parentDetails ? (
              <Grid container spacing={2}>
                <Grid item xs={6} sm={3}>
                  <DetailItem
                    icon={<PersonIcon fontSize="small" />}
                    label="Parent Name"
                    value={student.parentDetails.name}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <DetailItem
                    icon={<EmailIcon fontSize="small" />}
                    label="Parent Email"
                    value={student.parentDetails.email}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <DetailItem
                    icon={<PhoneIcon fontSize="small" />}
                    label="Parent Mobile"
                    value={student.parentDetails.mobile}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <DetailItem
                    icon={<WorkIcon fontSize="small" />}
                    label="Occupation"
                    value={student.parentDetails.occupation}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <DetailItem
                    icon={<BadgeIcon fontSize="small" />}
                    label="Parent Aadhar Number"
                    value={student.parentDetails.aadharNumber}
                  />
                </Grid>
              </Grid>
            ) : (
              <Alert
                severity="info"
                sx={{
                  borderRadius: 2,
                  bgcolor: "info.50",
                  border: "1px solid",
                  borderColor: "info.200",
                }}
                icon={<InfoIcon />}
              >
                No parent information available
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Transport Information */}
        <Card
          sx={{
            mt: 3,
            borderRadius: 3,
            background: `linear-gradient(135deg, ${theme.palette.warning.main}05, ${theme.palette.warning.main}15)`,
            border: "1px solid",
            borderColor: "warning.200",
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 3,
                pb: 2,
                borderBottom: "2px solid",
                borderColor: "warning.200",
              }}
            >
              <CarIcon sx={{ color: "warning.main", fontSize: 24 }} />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "warning.main",
                }}
              >
                Transport Details
              </Typography>
            </Box>

            {student.transportDetails ? (
              <>
                <Box sx={{ mb: 3, textAlign: "center" }}>
                  <Chip
                    label={
                      student.transportDetails.isApplicable
                        ? "Transport Required"
                        : "No Transport"
                    }
                    size="medium"
                    color={
                      student.transportDetails.isApplicable
                        ? "success"
                        : "default"
                    }
                    variant="filled"
                    sx={{
                      fontWeight: "bold",
                      fontSize: "0.875rem",
                      px: 2,
                      py: 1,
                    }}
                    icon={
                      student.transportDetails.isApplicable ? (
                        <TransportIcon />
                      ) : (
                        <PersonIcon />
                      )
                    }
                  />
                </Box>

                {student.transportDetails.isApplicable && (
                  <Grid container spacing={2}>
                    <Grid item xs={6} sm={3}>
                      <DetailItem
                        icon={<LocationIcon fontSize="small" />}
                        label="Distance"
                        value={
                          student.transportDetails.distance
                            ? `${student.transportDetails.distance} km`
                            : "Not specified"
                        }
                      />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <DetailItem
                        icon={<TransportIcon fontSize="small" />}
                        label="Distance Slab"
                        value={student.transportDetails.distanceSlab}
                      />
                    </Grid>
                  </Grid>
                )}
              </>
            ) : (
              <Alert
                severity="info"
                sx={{
                  borderRadius: 2,
                  bgcolor: "info.50",
                  border: "1px solid",
                  borderColor: "info.200",
                }}
                icon={<InfoIcon />}
              >
                No transport information available
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Additional Information */}
        <Card
          sx={{
            mt: 3,
            borderRadius: 3,
            background: `linear-gradient(135deg, ${theme.palette.secondary.main}05, ${theme.palette.secondary.main}15)`,
            border: "1px solid",
            borderColor: "secondary.200",
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 3,
                pb: 2,
                borderBottom: "2px solid",
                borderColor: "secondary.200",
              }}
            >
              <AdminIcon sx={{ color: "secondary.main", fontSize: 24 }} />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "secondary.main",
                }}
              >
                Additional Information
              </Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <DetailItem
                  icon={<BadgeIcon fontSize="small" />}
                  label="Status"
                  value={student.status || "Active"}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <DetailItem
                  icon={<SchoolIcon fontSize="small" />}
                  label="RTE Student"
                  value={student.isRTE ? "Yes" : "No"}
                />
              </Grid>
              {student.createdAt && (
                <Grid item xs={6} sm={3}>
                  <DetailItem
                    icon={<CalendarIcon fontSize="small" />}
                    label="Created At"
                    value={formatDate(student.createdAt)}
                  />
                </Grid>
              )}
              {student.updatedAt && (
                <Grid item xs={6} sm={3}>
                  <DetailItem
                    icon={<CalendarIcon fontSize="small" />}
                    label="Last Updated"
                    value={formatDate(student.updatedAt)}
                  />
                </Grid>
              )}
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Fade>
  );

  // Loading state
  if (loading) {
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress
          sx={{
            height: 6,
            borderRadius: 3,
            bgcolor: "primary.50",
            "& .MuiLinearProgress-bar": {
              borderRadius: 3,
            },
          }}
        />
        <Box sx={{ p: 3 }}>
          <Grid container spacing={3}>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item}>
                <Skeleton
                  variant="rectangular"
                  height={250}
                  sx={{
                    borderRadius: 3,
                    bgcolor: "grey.100",
                  }}
                  animation="wave"
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    );
  }

  // Empty state
  if (!students || students.length === 0) {
    return (
      <Card
        sx={{
          mt: 3,
          borderRadius: 3,
          textAlign: "center",
          py: 6,
          background: `linear-gradient(135deg, ${theme.palette.primary.main}05, ${theme.palette.secondary.main}05)`,
          border: "2px dashed",
          borderColor: "primary.200",
        }}
      >
        <CardContent>
          <SchoolIcon
            sx={{
              fontSize: 80,
              color: "primary.main",
              mb: 2,
              opacity: 0.7,
            }}
          />
          <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
            No Students Found
          </Typography>
          <Alert
            severity="info"
            sx={{
              maxWidth: 400,
              mx: "auto",
              borderRadius: 2,
              bgcolor: "info.50",
            }}
          >
            Students will appear here once they are added to the system.
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      {isMobile ? (
        // Mobile View - Enhanced Card Layout
        <Box sx={{ p: 2 }}>
          <Typography
            variant="h5"
            sx={{
              mb: 3,
              fontWeight: "bold",
              textAlign: "center",
              color: "primary.main",
            }}
          >
            Students Directory
          </Typography>
          {students.map((student, index) => (
            <MobileStudentCard
              key={student.id}
              student={student}
              index={index}
            />
          ))}
        </Box>
      ) : (
        // Desktop/Tablet View - Enhanced Table Layout
        <Box>
          <Typography
            variant="h4"
            sx={{
              mb: 3,
              fontWeight: "bold",
              color: "primary.main",
              textAlign: "center",
            }}
          >
            Students Directory
          </Typography>
          <TableContainer
            component={Paper}
            elevation={0}
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              border: "1px solid",
              borderColor: "divider",
              background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
            }}
          >
            <Table sx={{ minWidth: 650 }} stickyHeader>
              <TableHead>
                <TableRow
                  sx={{
                    "& .MuiTableCell-head": {
                      bgcolor: "primary.main",
                      color: "primary.contrastText",
                      fontWeight: "bold",
                      fontSize: "0.95rem",
                      py: 2,
                    },
                  }}
                >
                  <TableCell sx={{ width: 90 }}>S. No.</TableCell>
                  <TableCell sx={{ minWidth: 120 }}>GR Number</TableCell>
                  <TableCell sx={{ minWidth: 200 }}>Student</TableCell>
                  <TableCell sx={{ minWidth: 130 }}>Admission Type</TableCell>
                  <TableCell sx={{ minWidth: 100 }}>Gender</TableCell>
                  <TableCell sx={{ minWidth: 130 }}>Mobile</TableCell>
                  <TableCell sx={{ width: 60 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student, index) => (
                  <TableRow
                    key={student.id}
                    hover
                    sx={{
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        bgcolor: "action.hover",
                        transform: "translateY(-1px)",
                        boxShadow: 2,
                      },
                    }}
                  >
                    <TableCell>
                      <Chip
                        label={index + 1}
                        size="small"
                        color="primary"
                        variant="filled"
                        sx={{
                          fontWeight: "bold",
                          minWidth: 32,
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <BadgeIcon fontSize="small" color="action" />
                        <Typography
                          variant="body2"
                          fontWeight="bold"
                          sx={{
                            color: student.grNumber ? "text.primary" : "text.secondary",
                          }}
                        >
                          {student.grNumber || "Not assigned"}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <Box sx={{ position: "relative" }}>
                          <Avatar
                            sx={{
                              width: 48,
                              height: 48,
                              bgcolor: getAvatarColor(index),
                              fontSize: "1.1rem",
                              fontWeight: "bold",
                              border: "2px solid white",
                              boxShadow: 2,
                            }}
                          >
                            {getInitials(student.name)}
                          </Avatar>
                          {student.isRTE && (
                            <VerifiedIcon
                              sx={{
                                position: "absolute",
                                bottom: -4,
                                right: -4,
                                color: "success.main",
                                bgcolor: "white",
                                borderRadius: "50%",
                                fontSize: 18,
                              }}
                            />
                          )}
                        </Box>
                        <Box sx={{ minWidth: 0, flex: 1 }}>
                          <Typography
                            variant="subtitle2"
                            fontWeight="bold"
                            sx={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              mb: 0.5,
                            }}
                          >
                            {student.name || "Unknown Student"}
                          </Typography>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                            <EmailIcon fontSize="small" color="action" />
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {student.email || "No email"}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                        <Chip
                          label={student.admissionType || "Regular"}
                          size="small"
                          color={getAdmissionTypeColor(student.admissionType)}
                          variant="filled"
                          sx={{
                            fontWeight: "bold",
                            borderRadius: 2,
                          }}
                        />
                        {student.isRTE && (
                          <Chip
                            icon={<StarIcon fontSize="small" />}
                            label="RTE"
                            size="small"
                            color="success"
                            variant="filled"
                            sx={{
                              fontWeight: "bold",
                              borderRadius: 2,
                            }}
                          />
                        )}
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <PersonIcon fontSize="small" color="action" />
                        <Typography variant="body2" fontWeight="500">
                          {getGenderDisplay(student.gender)}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <ContactPhoneIcon fontSize="small" color="action" />
                        <Typography variant="body2" fontWeight="500">
                          {student.mobile || "Not provided"}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Tooltip title="More actions">
                        <IconButton
                          onClick={(e) => handleMenuClick(e, student)}
                          size="small"
                          sx={{
                            bgcolor: "action.hover",
                            "&:hover": {
                              bgcolor: "primary.main",
                              color: "primary.contrastText",
                              transform: "scale(1.1)",
                            },
                            transition: "all 0.2s ease",
                          }}
                        >
                          <MoreIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          sx: {
            minWidth: 180,
            borderRadius: 2,
            boxShadow: theme.shadows[8],
            border: "1px solid",
            borderColor: "divider",
            "& .MuiMenuItem-root": {
              px: 2,
              py: 1.5,
              borderRadius: 1,
              mx: 1,
              my: 0.5,
              fontWeight: 500,
              "&:hover": {
                bgcolor: "primary.main",
                color: "primary.contrastText",
                "& .MuiSvgIcon-root": {
                  color: "primary.contrastText",
                },
              },
            },
          },
        }}
      >
        <MenuItem onClick={handleViewDetailsClick} sx={{ gap: 1.5 }}>
          <VisibilityIcon fontSize="small" />
          View Details
        </MenuItem>
        <MenuItem onClick={handleUpgradeClick} sx={{ gap: 1.5 }}>
          <UpgradeIcon fontSize="small" />
          Upgrade Class
        </MenuItem>
      </Menu>

      {/* Student Details Dialog */}
      <Dialog
        open={detailsDialogOpen}
        onClose={() => setDetailsDialogOpen(false)}
        maxWidth="lg"
        fullWidth
        fullScreen={isMobile}
        PaperProps={{
          sx: {
            borderRadius: isMobile ? 0 : 3,
            maxHeight: "90vh",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            borderBottom: "1px solid",
            borderColor: "divider",
            bgcolor: "primary.main",
            color: "primary.contrastText",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar
              sx={{
                bgcolor: "primary.contrastText",
                color: "primary.main",
                width: 40,
                height: 40,
              }}
            >
              {getInitials(selectedStudent?.name)}
            </Avatar>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {selectedStudent?.name || "Student Details"}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                GR: {selectedStudent?.grNumber || "Not assigned"}
              </Typography>
            </Box>
          </Box>
          <IconButton
            onClick={() => setDetailsDialogOpen(false)}
            sx={{
              color: "primary.contrastText",
              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          {selectedStudent && renderExpandedContent(selectedStudent)}
        </DialogContent>
        <DialogActions
          sx={{
            borderTop: "1px solid",
            borderColor: "divider",
            p: 2,
            justifyContent: "center",
          }}
        >
          <Button
            onClick={() => setDetailsDialogOpen(false)}
            variant="contained"
            sx={{
              borderRadius: 2,
              px: 4,
              py: 1.5,
              fontWeight: "bold",
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {selectedStudent && (
        <ClassUpgradeForm
          open={upgradeDialogOpen}
          onClose={() => setUpgradeDialogOpen(false)}
          student={selectedStudent}
          classes={classes}
          onSubmit={handleUpgradeSubmit}
        />
      )}
    </>
  );
};

export default StudentList;






