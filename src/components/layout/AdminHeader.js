// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   IconButton,
//   Avatar,
//   Button,
//   Box,
//   Menu,
//   MenuItem,
//   useMediaQuery,
//   useTheme,
//   Chip,
//   Badge,
//   Divider,
//   Paper,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import LogoutIcon from "@mui/icons-material/Logout";
// import PersonIcon from "@mui/icons-material/Person";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import SettingsIcon from "@mui/icons-material/Settings";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import { useState } from "react";
// import { useAuth } from "../../contexts/AuthContext";

// const AdminHeader = ({ onMenuClick }) => {
//   const { user, logout } = useAuth();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"));

//   const [anchorEl, setAnchorEl] = useState(null);
//   const menuOpen = Boolean(anchorEl);

//   const handleMenuClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const handleLogout = () => {
//     handleMenuClose();
//     logout();
//   };

//   return (
//     <AppBar
//       position="fixed"
//       elevation={0}
//       sx={{
//         // zIndex: theme.zIndex.drawer - 1,
//         zIndex: theme.zIndex.drawer + 1, // Higher than sidebar
//         width: { lg: `calc(100% - 280px)` }, // Account for sidebar width
//         ml: { lg: "280px" }, 
//         // background: "linear-gradient(180deg, #1e293b 0%, #334155 100%)",
//         backgroundColor: "#2b77ad",

//         backdropFilter: "blur(20px)",
//         borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
//         boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
//       }}
//     >
//       <Toolbar
//         sx={{
//           minHeight: "75px !important",
//           px: { xs: 2, sm: 3, lg: 4 },
//           justifyContent: "space-between",
//         }}
//       >
//         {/* Left Side */}
//         <Box sx={{ display: "flex", alignItems: "center" }}>
//           {/* Mobile/Tablet Menu Button */}
//           <IconButton
//             edge="start"
//             onClick={onMenuClick}
//             sx={{
//               mr: 2,
//               display: { lg: "none" },
//               color: "rgba(255, 255, 255, 0.9)",
//               backgroundColor: "rgba(255, 255, 255, 0.1)",
//               backdropFilter: "blur(10px)",
//               border: "1px solid rgba(255, 255, 255, 0.2)",
//               width: 44,
//               height: 44,
//               "&:hover": {
//                 backgroundColor: "rgba(255, 255, 255, 0.2)",
//                 transform: "translateY(-1px)",
//                 boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
//               },
//               transition: "all 0.3s ease",
//             }}
//           >
//             <MenuIcon sx={{ fontSize: "1.3rem" }} />
//           </IconButton>

//           {/* Brand Section */}
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
//             <Box
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 width: 44,
//                 height: 44,
//                 borderRadius: "12px",
//                 background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
//                 boxShadow: "0 4px 20px rgba(254, 107, 139, 0.4)",
//               }}
//             >
//               <DashboardIcon sx={{ color: "white", fontSize: "1.4rem" }} />
//             </Box>

//             <Box>
//               <Typography
//                 variant="h6"
//                 sx={{
//                   color: "white",
//                   fontWeight: 700,
//                   fontSize: { xs: "1.1rem", sm: "1.3rem" },
//                   // lineHeight: 1.2,
//                   textShadow: "0 2px 4px rgba(0,0,0,0.1)",
//                 }}
//               >
//                 SchoolVriksh
//               </Typography>
//               {!isMobile && (
//                 <Typography
//                   variant="caption"
//                   sx={{
//                     color: "rgba(255, 255, 255, 0.8)",
//                     display: "block",
//                     lineHeight: 1,
//                     fontWeight: 500,
//                     fontSize: "0.75rem",
//                     letterSpacing: "0.5px",
//                   }}
//                 >
//                   Admin Dashboard
//                 </Typography>
//               )}
//             </Box>
//           </Box>
//         </Box>

//         {/* Right Side - User Info */}
//         <Box
//           sx={{ display: "flex", alignItems: "center", gap: { xs: 1, sm: 2 } }}
//         >
//           {/* Notifications - Desktop Only */}
//           {!isMobile && (
//             <IconButton
//               sx={{
//                 color: "rgba(255, 255, 255, 0.9)",
//                 backgroundColor: "rgba(255, 255, 255, 0.1)",
//                 backdropFilter: "blur(10px)",
//                 border: "1px solid rgba(255, 255, 255, 0.2)",
//                 width: 44,
//                 height: 44,
//                 "&:hover": {
//                   backgroundColor: "rgba(255, 255, 255, 0.2)",
//                   transform: "translateY(-1px)",
//                   boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
//                 },
//                 transition: "all 0.3s ease",
//               }}
//             >
//               <Badge
//                 badgeContent={3}
//                 sx={{
//                   "& .MuiBadge-badge": {
//                     fontSize: "0.65rem",
//                     height: 18,
//                     minWidth: 18,
//                     backgroundColor: "#FF4757",
//                     color: "white",
//                     fontWeight: 600,
//                     boxShadow: "0 2px 8px rgba(255, 71, 87, 0.4)",
//                   },
//                 }}
//               >
//                 <NotificationsIcon sx={{ fontSize: "1.2rem" }} />
//               </Badge>
//             </IconButton>
//           )}

//           {/* Desktop View */}
//           {!isMobile && (
//             <>
//               <Chip
//                 icon={<PersonIcon sx={{ fontSize: "0.95rem" }} />}
//                 label="Administrator"
//                 size="small"
//                 sx={{
//                   backgroundColor: "rgba(255, 255, 255, 0.15)",
//                   color: "white",
//                   border: "1px solid rgba(255, 255, 255, 0.3)",
//                   fontWeight: 600,
//                   fontSize: "0.75rem",
//                   height: 32,
//                   backdropFilter: "blur(10px)",
//                   "& .MuiChip-icon": {
//                     color: "rgba(255, 255, 255, 0.9)",
//                   },
//                   "&:hover": {
//                     backgroundColor: "rgba(255, 255, 255, 0.2)",
//                   },
//                 }}
//               />

//               <Paper
//                 elevation={0}
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 1.5,
//                   px: 2,
//                   py: 1,
//                   backgroundColor: "rgba(255, 255, 255, 0.1)",
//                   backdropFilter: "blur(10px)",
//                   border: "1px solid rgba(255, 255, 255, 0.2)",
//                   borderRadius: 3,
//                 }}
//               >
//                 <Box sx={{ textAlign: "right", minWidth: 0 }}>
//                   <Typography
//                     variant="body2"
//                     sx={{
//                       fontWeight: 600,
//                       color: "white",
//                       overflow: "hidden",
//                       textOverflow: "ellipsis",
//                       whiteSpace: "nowrap",
//                       maxWidth: 140,
//                       fontSize: "0.875rem",
//                     }}
//                   >
//                     {user?.name || "School Admin"}
//                   </Typography>
//                   <Typography
//                     variant="caption"
//                     sx={{
//                       color: "rgba(255, 255, 255, 0.7)",
//                       display: "block",
//                       lineHeight: 1,
//                       fontWeight: 400,
//                       fontSize: "0.7rem",
//                     }}
//                   >
//                     {user?.email || "admin@school.edu"}
//                   </Typography>
//                 </Box>

//                 <Avatar
//                   sx={{
//                     width: 42,
//                     height: 42,
//                     background:
//                       "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
//                     fontSize: "1rem",
//                     fontWeight: 700,
//                     border: "2px solid rgba(255, 255, 255, 0.3)",
//                     boxShadow: "0 4px 14px rgba(33, 150, 243, 0.4)",
//                   }}
//                 >
//                   {user?.name?.charAt(0)?.toUpperCase() || "A"}
//                 </Avatar>
//               </Paper>

//               <Button
//                 variant="contained"
//                 size="small"
//                 onClick={logout}
//                 startIcon={<LogoutIcon sx={{ fontSize: "1rem" }} />}
//                 sx={{
//                   textTransform: "none",
//                   background:
//                     "linear-gradient(45deg, rgba(255, 255, 255, 0.2) 30%, rgba(255, 255, 255, 0.1) 90%)",
//                   backdropFilter: "blur(10px)",
//                   border: "1px solid rgba(255, 255, 255, 0.3)",
//                   color: "white",
//                   fontWeight: 600,
//                   fontSize: "0.8rem",
//                   px: 2.5,
//                   py: 1,
//                   borderRadius: 2,
//                   "&:hover": {
//                     background:
//                       "linear-gradient(45deg, rgba(255, 255, 255, 0.3) 30%, rgba(255, 255, 255, 0.2) 90%)",
//                     transform: "translateY(-1px)",
//                     boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
//                   },
//                   transition: "all 0.3s ease",
//                 }}
//               >
//                 Logout
//               </Button>
//             </>
//           )}

//           {/* Mobile/Tablet View */}
//           {isMobile && (
//             <>
//               <Chip
//                 label="Admin"
//                 size="small"
//                 sx={{
//                   backgroundColor: "rgba(255, 255, 255, 0.15)",
//                   color: "white",
//                   border: "1px solid rgba(255, 255, 255, 0.3)",
//                   fontWeight: 600,
//                   fontSize: "0.7rem",
//                   height: 26,
//                   backdropFilter: "blur(10px)",
//                 }}
//               />

//               <Typography
//                 variant="body2"
//                 sx={{
//                   fontWeight: 600,
//                   color: "white",
//                   fontSize: "0.875rem",
//                   textShadow: "0 1px 2px rgba(0,0,0,0.1)",
//                 }}
//               >
//                 {user?.name?.split(" ")[0] || "Admin"}
//               </Typography>

//               <IconButton
//                 onClick={handleMenuClick}
//                 sx={{
//                   p: 0.5,
//                   "&:hover": {
//                     backgroundColor: "rgba(255, 255, 255, 0.1)",
//                     transform: "scale(1.05)",
//                   },
//                   transition: "all 0.2s ease",
//                 }}
//               >
//                 <Avatar
//                   sx={{
//                     width: 38,
//                     height: 38,
//                     background:
//                       "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
//                     fontSize: "0.9rem",
//                     fontWeight: 700,
//                     border: "2px solid rgba(255, 255, 255, 0.3)",
//                     boxShadow: "0 3px 10px rgba(33, 150, 243, 0.4)",
//                   }}
//                 >
//                   {user?.name?.charAt(0)?.toUpperCase() || "A"}
//                 </Avatar>
//               </IconButton>

//               <Menu
//                 anchorEl={anchorEl}
//                 open={menuOpen}
//                 onClose={handleMenuClose}
//                 anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//                 transformOrigin={{ vertical: "top", horizontal: "right" }}
//                 PaperProps={{
//                   sx: {
//                     mt: 1,
//                     minWidth: 220,
//                     backgroundColor: "rgba(255, 255, 255, 0.95)",
//                     backdropFilter: "blur(20px)",
//                     boxShadow:
//                       "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
//                     border: "1px solid rgba(255, 255, 255, 0.2)",
//                     borderRadius: 3,
//                   },
//                 }}
//               >
//                 <MenuItem
//                   disabled
//                   sx={{
//                     opacity: 1,
//                     background:
//                       "linear-gradient(180deg, #1e293b 0%, #334155 100%)",
//                     py: 2,
//                     px: 2.5,
//                     color: "white",
//                   }}
//                 >
//                   <Box
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: 1.5,
//                       width: "100%",
//                     }}
//                   >
//                     <Avatar
//                       sx={{
//                         width: 40,
//                         height: 40,
//                         background:
//                           "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
//                         fontSize: "0.9rem",
//                         fontWeight: 700,
//                       }}
//                     >
//                       {user?.name?.charAt(0)?.toUpperCase() || "A"}
//                     </Avatar>
//                     <Box>
//                       <Typography
//                         variant="body2"
//                         sx={{ fontWeight: 600, color: "white" }}
//                       >
//                         {user?.name || "School Admin"}
//                       </Typography>
//                       <Typography
//                         variant="caption"
//                         sx={{ color: "rgba(255, 255, 255, 0.8)" }}
//                       >
//                         Administrator Access
//                       </Typography>
//                     </Box>
//                   </Box>
//                 </MenuItem>

//                 <Divider sx={{ my: 0.5 }} />

//                 <MenuItem
//                   sx={{
//                     py: 1.5,
//                     px: 2.5,
//                     color: "#4b5563",
//                     "&:hover": {
//                       backgroundColor: "#f3f4f6",
//                     },
//                   }}
//                 >
//                   <SettingsIcon
//                     sx={{ mr: 2, fontSize: "1.1rem", color: "#6b7280" }}
//                   />
//                   Settings
//                 </MenuItem>

//                 <MenuItem
//                   onClick={handleLogout}
//                   sx={{
//                     py: 1.5,
//                     px: 2.5,
//                     color: "#dc2626",
//                     "&:hover": {
//                       backgroundColor: "#fef2f2",
//                       color: "#b91c1c",
//                     },
//                   }}
//                 >
//                   <LogoutIcon sx={{ mr: 2, fontSize: "1.1rem" }} />
//                   Logout
//                 </MenuItem>
//               </Menu>
//             </>
//           )}
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default AdminHeader;





import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Button,
  Box,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Chip,
  Badge,
  Divider,
  Stack,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const AdminHeader = ({ toggleSidebar, user }) => {
  const { logout } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        zIndex: theme.zIndex.drawer + 1,
        width: { lg: `calc(100% - 280px)` },
        ml: { lg: "280px" }, 
        // background: "linear-gradient(135deg, #1e293b 0%, #334155 35%, #475569 100%)",
        background: "linear-gradient(135deg, #1e40af 0%, #3b82f6 35%, #2563eb 100%)",
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        borderRadius: { xs: 0, lg: '0 0 24px 24px' },
        "&::before": {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(ellipse at top, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        },
        "&::after": {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: '10%',
          right: '10%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 20%, rgba(255, 255, 255, 0.6) 50%, rgba(255, 255, 255, 0.4) 80%, transparent 100%)',
        }
      }}
    >
      <Toolbar
        sx={{
          minHeight: "80px !important",
          px: { xs: 3, sm: 4, lg: 5 },
          justifyContent: "space-between",
          position: 'relative',
        }}
      >
        {/* Left Side */}
        <Stack direction="row" alignItems="center" spacing={3}>
          {/* Mobile Menu Button */}
          <IconButton
            edge="start"
            onClick={toggleSidebar}
            sx={{
              display: { lg: "none" },
              color: "#ffffff",
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.08) 100%)",
              border: '1px solid rgba(255, 255, 255, 0.2)',
              width: 48,
              height: 48,
              borderRadius: '16px',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(20px)',
              "&:hover": { 
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.15) 100%)",
                transform: 'translateY(-2px) scale(1.02)',
                boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
              },
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <MenuIcon sx={{ fontSize: '1.25rem' }} />
          </IconButton>

          {/* Brand Section */}
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '16px',
                background: "linear-gradient(135deg, #FE6B8B 30%, #FF8E53 90%)",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 16px rgba(254, 107, 139, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <DashboardIcon sx={{ color: '#ffffff', fontSize: '1.5rem' }} />
            </Box>
            
            <Box>
              <Typography 
                variant="h5" 
                sx={{ 
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: { xs: '1.25rem', sm: '1.5rem' },
                  lineHeight: 1.2,
                  letterSpacing: '-0.025em',
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                }}
              >
                SchoolVriksh
              </Typography>
              <Typography
                variant="body2"
                sx={{ 
                  color: "rgba(255, 255, 255, 0.8)", 
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  letterSpacing: '0.025em',
                  textTransform: 'uppercase',
                  display: { xs: "none", sm: "block" }
                }}
              >
                Admin Dashboard
              </Typography>
            </Box>
          </Stack>
        </Stack>

        {/* Right Side */}
        <Stack direction="row" alignItems="center" spacing={{ xs: 2, sm: 3 }}>
          {/* Notifications - Desktop Only */}
          {!isMobile && (
            <IconButton
              sx={{
                color: "#ffffff",
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.08) 100%)",
                border: '1px solid rgba(255, 255, 255, 0.2)',
                width: 48,
                height: 48,
                borderRadius: '16px',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(20px)',
                "&:hover": { 
                  background: "linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.15) 100%)",
                  transform: 'translateY(-2px) scale(1.02)',
                  boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                },
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <Badge 
                badgeContent={3} 
                sx={{
                  '& .MuiBadge-badge': {
                    fontSize: '0.7rem',
                    height: 20,
                    minWidth: 20,
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                    border: '2px solid #ffffff',
                    boxShadow: '0 2px 8px rgba(239, 68, 68, 0.3)',
                    fontWeight: 600,
                  }
                }}
              >
                <NotificationsIcon sx={{ fontSize: '1.25rem' }} />
              </Badge>
            </IconButton>
          )}

          {/* User Section */}
          {!isMobile ? (
            // Desktop Layout
            <Stack direction="row" alignItems="center" spacing={2}>
              <Chip
                icon={<PersonIcon sx={{ fontSize: '1rem' }} />}
                label="Administrator"
                sx={{
                  background: "linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.1) 100%)",
                  color: "#ffffff",
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  height: 36,
                  borderRadius: '18px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(20px)',
                  '& .MuiChip-icon': {
                    color: "#ffffff"
                  },
                  '& .MuiChip-label': {
                    px: 1.5
                  }
                }}
              />

              <Box 
                sx={{ 
                  textAlign: "right", 
                  minWidth: 0,
                  display: { xs: 'none', md: 'block' }
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 700,
                    color: "#ffffff",
                    fontSize: '1rem',
                    lineHeight: 1.2,
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  {user?.name || "School Admin"}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: "rgba(255, 255, 255, 0.8)",
                    fontSize: '0.75rem',
                    fontWeight: 500,
                  }}
                >
                  {user?.email || "admin@school.edu"}
                </Typography>
              </Box>
              
              <Avatar
                sx={{
                  width: 48,
                  height: 48,
                  background: "linear-gradient(135deg, #2196F3 30%, #21CBF3 90%)",
                  color: "#ffffff",
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  border: '3px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: '0 8px 16px rgba(33, 150, 243, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.2)',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  "&:hover": {
                    transform: 'translateY(-2px) scale(1.05)',
                    boxShadow: '0 12px 24px rgba(33, 150, 243, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.3)',
                  }
                }}
              >
                {user?.name?.charAt(0)?.toUpperCase() || "A"}
              </Avatar>
              
              <Button
                variant="outlined"
                onClick={logout}
                startIcon={<LogoutIcon sx={{ fontSize: '1.1rem' }} />}
                sx={{
                  textTransform: "none",
                  color: "#ffffff",
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  px: 3,
                  py: 1.5,
                  borderRadius: '16px',
                  background: "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)",
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(20px)',
                  "&:hover": {
                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.1) 100%)",
                    borderColor: "rgba(255, 255, 255, 0.5)",
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                  },
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                Logout
              </Button>
            </Stack>
          ) : (
            // Mobile Layout
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Chip
                label="Admin"
                size="small"
                sx={{
                  background: "linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.1) 100%)",
                  color: "#ffffff",
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  height: 28,
                  borderRadius: '14px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(20px)',
                }}
              />

              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  color: "#ffffff",
                  fontSize: '0.875rem',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                }}
              >
                {user?.name?.split(" ")[0] || "Admin"}
              </Typography>
              
              <IconButton
                onClick={handleMenuClick}
                sx={{
                  p: 0,
                  "&:hover": { 
                    transform: 'scale(1.05)',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                <Avatar
                  sx={{
                    width: 44,
                    height: 44,
                    background: "linear-gradient(135deg, #2196F3 30%, #21CBF3 90%)",
                    color: "#ffffff",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: '0 4px 12px rgba(33, 150, 243, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.2)',
                  }}
                >
                  {user?.name?.charAt(0)?.toUpperCase() || "A"}
                </Avatar>
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                PaperProps={{
                  sx: {
                    mt: 2,
                    minWidth: 240,
                    background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.8)",
                    border: 'none',
                    borderRadius: 3,
                    backdropFilter: 'blur(20px)',
                    overflow: 'hidden',
                  },
                }}
              >
                <MenuItem 
                  disabled 
                  sx={{ 
                    opacity: 1,
                    background: "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
                    py: 2,
                    px: 3,
                    borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
                  }}
                >
                  <Stack spacing={0.5}>
                    <Typography variant="body1" sx={{ fontWeight: 700, color: "#1e293b" }}>
                      {user?.name || "School Admin"}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#64748b", fontSize: '0.75rem' }}>
                      Administrator Access
                    </Typography>
                  </Stack>
                </MenuItem>
                
                <MenuItem 
                  sx={{ 
                    py: 2,
                    px: 3,
                    color: "#64748b",
                    fontWeight: 500,
                    '&:hover': {
                      backgroundColor: "#f1f5f9",
                      color: "#475569"
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  <SettingsIcon sx={{ mr: 2, fontSize: "1.25rem" }} />
                  Settings
                </MenuItem>

                <MenuItem 
                  onClick={handleLogout} 
                  sx={{ 
                    py: 2,
                    px: 3,
                    color: "#64748b",
                    fontWeight: 500,
                    '&:hover': {
                      backgroundColor: "#fee2e2",
                      color: "#dc2626"
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  <LogoutIcon sx={{ mr: 2, fontSize: "1.25rem" }} />
                  Logout
                </MenuItem>
              </Menu>
            </Stack>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default AdminHeader;