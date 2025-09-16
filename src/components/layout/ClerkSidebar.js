// import {
//   Drawer,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Typography,
//   Box,
//   Divider,
//   useMediaQuery,
//   useTheme,
// } from "@mui/material";
// import {
//   Dashboard as DashboardIcon,
//   School as AdmissionsIcon,
//   Assignment as CertificatesIcon,
//   People as StudentsIcon,
//   EventNote as LeaveRequestsIcon,
//   Assessment as RTEReportsIcon,
//   Upgrade as UpgradeIcon,
//   History as AdmissionHistoryIcon,
// } from "@mui/icons-material";
// import { useRouter } from "next/router";

// const ClerkSidebar = ({ open, onClose, variant, sx }) => {
//   const theme = useTheme();
//   const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
//   const router = useRouter();

//   const menuItems = [
//     { text: "Dashboard", icon: <DashboardIcon />, path: "/clerk/dashboard" },
//     { text: "Admissions", icon: <AdmissionsIcon />, path: "/clerk/admissions" },
//     {
//       text: "Certificates",
//       icon: <CertificatesIcon />,
//       path: "/clerk/certificates",
//     },
//     { text: "Students", icon: <StudentsIcon />, path: "/clerk/students" },
//     {
//       text: "Leave Requests",
//       icon: <LeaveRequestsIcon />,
//       path: "/clerk/leaves",
//     }, // ✅ Corrected path
//     {
//       text: "RTE Reports",
//       icon: <RTEReportsIcon />,
//       path: "/clerk/rte-reports",
//     },
//     {
//       text: "Admission History",
//       icon: <AdmissionHistoryIcon />,
//       path: "/clerk/admissions/admission-history",
//     },
//   ];

//   const handleItemClick = (path) => {
//     router.push(path);
//     if (!isDesktop && onClose) {
//       onClose();
//     }
//   };

//   const drawerContent = (
//     <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
//       {/* Sidebar Header */}
//       <Box
//         sx={{
//           p: 3,
//           backgroundColor: "#1976d2",
//           color: "white",
//           textAlign: "center",
//         }}
//       >
//         <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
//           Clerk Panel
//         </Typography>
//         <Typography variant="caption" sx={{ opacity: 0.9 }}>
//           School Management System
//         </Typography>
//       </Box>

//       <Divider />

//       {/* Navigation Menu */}
//       <Box sx={{ flexGrow: 1, py: 1 }}>
//         <List sx={{ px: 1 }}>
//           {menuItems.map((item) => {
//             const isActive = router.pathname === item.path;
//             return (
//               <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
//                 <ListItemButton
//                   onClick={() => handleItemClick(item.path)}
//                   sx={{
//                     borderRadius: 1,
//                     mx: 1,
//                     backgroundColor: isActive ? "#e3f2fd" : "transparent",
//                     color: isActive ? "#1976d2" : "#666",
//                     "&:hover": {
//                       backgroundColor: isActive
//                         ? "#e3f2fd"
//                         : "rgba(0,0,0,0.04)",
//                     },
//                     "& .MuiListItemIcon-root": {
//                       color: isActive ? "#1976d2" : "#666",
//                       minWidth: 40,
//                     },
//                   }}
//                 >
//                   <ListItemIcon>{item.icon}</ListItemIcon>
//                   <ListItemText
//                     primary={item.text}
//                     primaryTypographyProps={{
//                       fontSize: "0.875rem",
//                       fontWeight: isActive ? 600 : 400,
//                     }}
//                   />
//                 </ListItemButton>
//               </ListItem>
//             );
//           })}
//         </List>
//       </Box>

//       {/* Footer */}
//       <Box sx={{ p: 2, textAlign: "center", borderTop: "1px solid #eee" }}>
//         <Typography variant="caption" color="text.secondary">
//           © 2025 SchoolVriksh
//         </Typography>
//       </Box>
//     </Box>
//   );

//   return (
//     <Drawer
//       variant={variant}
//       open={open}
//       onClose={onClose}
//       sx={{
//         width: 280,
//         flexShrink: 0,
//         "& .MuiDrawer-paper": {
//           width: 280,
//           boxSizing: "border-box",
//           borderRight: "1px solid #e0e0e0",
//           backgroundColor: "#fff",
//         },
//         ...sx,
//       }}
//       ModalProps={{
//         keepMounted: true,
//       }}
//     >
//       {drawerContent}
//     </Drawer>
//   );
// };

// export default ClerkSidebar;




import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Divider,
  useMediaQuery,
  useTheme,
  Avatar,
  Chip,
  Collapse,
  IconButton
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  School as AdmissionsIcon,
  Assignment as CertificatesIcon,
  People as StudentsIcon,
  EventNote as LeaveRequestsIcon,
  Assessment as RTEReportsIcon,
  Upgrade as UpgradeIcon,
  History as AdmissionHistoryIcon,
  ChevronLeft as ChevronLeftIcon,
  ExpandLess,
  ExpandMore
} from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useState } from 'react';
// import logo from '../../styles/images/logo.png'

const ClerkSidebar = ({ open, onClose, variant, sx, logoSrc }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const router = useRouter();
  const [expandedItems, setExpandedItems] = useState({});

  const menuItems = [
    { 
      text: 'Dashboard', 
      icon: <DashboardIcon />, 
      path: '/clerk/dashboard',
      badge: null
    },
    { 
      text: 'Admissions', 
      icon: <AdmissionsIcon />, 
      path: '/clerk/admissions',
      badge: null,
      subItems: [
        { text: 'New Applications', path: '/clerk/admissions' },
        { text: 'Admission History', path: '/clerk/admissions/admission-history' }
      ]
    },
    { 
      text: 'Certificates', 
      icon: <CertificatesIcon />, 
      path: '/clerk/certificates',
      badge: null
    },
    { 
      text: 'Students', 
      icon: <StudentsIcon />, 
      path: '/clerk/students',
      badge: null
    },
    { 
      text: 'Leave Requests', 
      icon: <LeaveRequestsIcon />, 
      path: '/clerk/leaves',
      badge: null
    },
    { 
      text: 'RTE Reports', 
      icon: <RTEReportsIcon />, 
      path: '/clerk/rte-reports',
      badge: null
    }
  ];

  const handleItemClick = (path, hasSubItems = false) => {
    if (hasSubItems) {
      setExpandedItems(prev => ({
        ...prev,
        [path]: !prev[path]
      }));
    } else {
      router.push(path);
      if (!isDesktop && onClose) {
        onClose();
      }
    }
  };

  const handleSubItemClick = (path) => {
    router.push(path);
    if (!isDesktop && onClose) {
      onClose();
    }
  };

  const isActiveRoute = (path, subItems = []) => {
    if (router.pathname === path) return true;
    return subItems.some(sub => router.pathname === sub.path);
  };

  const drawerContent = (
    <Box 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        // background: 'linear-gradient(180deg, #1e293b 0%, #334155 100%)',
        backgroundColor: "#1a365d",
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          transform: 'translate(50%, -50%)',
          pointerEvents: 'none'
        }}
      />
      
      {/* Close Button for Mobile */}
      {!isDesktop && (
        <Box sx={{ position: 'absolute', top: 16, right: 16, zIndex: 10 }}>
          <IconButton 
            onClick={onClose}
            sx={{ 
              color: 'white', 
              backgroundColor: 'rgba(255,255,255,0.1)',
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
        </Box>
      )}

      {/* Sidebar Header with Logo */}
      <Box 
        sx={{ 
          p: 3,
          pb: 2,
          position: 'relative',
          zIndex: 1
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            src="/images/skoolvriksh-logo.jpg"
            alt="SchoolVriksh Logo"
            sx={{
              width: 70,
              height: 70,
              mr: 2,
              backgroundColor: 'white',
              border: '3px solid rgba(255,255,255,0.2)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
            }}
          >
            {/* <School style={{ color: '#1976d2', fontSize: '24px' }} /> */}
          </Avatar>
          <Box>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 700, 
                color: 'white',
                fontSize: '1.25rem',
                lineHeight: 1.2,
                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}
            >
              SchoolVriksh
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                color: 'rgba(255,255,255,0.8)',
                fontSize: '0.75rem',
                fontWeight: 500,
                letterSpacing: '0.5px'
              }}
            >
              Clerk Panel
            </Typography>
          </Box>
        </Box>
        
        <Chip
          label="CLERK ACCESS"
          size="small"
          sx={{
            backgroundColor: 'rgba(34, 197, 94, 0.2)',
            color: '#22c55e',
            border: '1px solid rgba(34, 197, 94, 0.3)',
            fontWeight: 600,
            fontSize: '0.7rem',
            height: '24px'
          }}
        />
      </Box>

      <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.1)', mx: 2 }} />

      {/* Navigation Menu */}
      <Box sx={{ flexGrow: 1, py: 2, px: 1, position: 'relative', zIndex: 1 }}>
        <List sx={{ px: 1 }}>
          {menuItems.map((item) => {
            const isActive = isActiveRoute(item.path, item.subItems);
            const hasSubItems = item.subItems && item.subItems.length > 0;
            const isExpanded = expandedItems[item.path];

            return (
              <Box key={item.text} sx={{ mb: 1 }}>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => handleItemClick(item.path, hasSubItems)}
                    sx={{
                      borderRadius: 2,
                      mx: 1,
                      py: 1.5,
                      px: 2,
                      backgroundColor: isActive ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                      color: isActive ? '#60a5fa' : 'rgba(255,255,255,0.9)',
                      border: isActive ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid transparent',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      position: 'relative',
                      overflow: 'hidden',
                      '&:hover': {
                        backgroundColor: isActive ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        transform: 'translateX(4px)',
                      },
                      '&:before': {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        height: '100%',
                        width: isActive ? '4px' : '0px',
                        backgroundColor: '#3b82f6',
                        borderRadius: '0 4px 4px 0',
                        transition: 'width 0.3s ease'
                      },
                      '& .MuiListItemIcon-root': {
                        color: isActive ? '#60a5fa' : 'rgba(255,255,255,0.7)',
                        minWidth: 40,
                        transition: 'all 0.3s ease'
                      }
                    }}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      primaryTypographyProps={{
                        fontSize: '0.875rem',
                        fontWeight: isActive ? 600 : 500,
                        letterSpacing: '0.25px'
                      }}
                    />
                    {item.badge && (
                      <Chip
                        label={item.badge.count}
                        size="small"
                        color={item.badge.color}
                        sx={{
                          height: '20px',
                          minWidth: '20px',
                          fontSize: '0.7rem',
                          fontWeight: 600,
                          mr: hasSubItems ? 1 : 0
                        }}
                      />
                    )}
                    {hasSubItems && (
                      <Box sx={{ color: 'rgba(255,255,255,0.6)' }}>
                        {isExpanded ? <ExpandLess /> : <ExpandMore />}
                      </Box>
                    )}
                  </ListItemButton>
                </ListItem>
                
                {/* Sub Items */}
                {hasSubItems && (
                  <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding sx={{ ml: 2 }}>
                      {item.subItems.map((subItem) => {
                        const isSubActive = router.pathname === subItem.path;
                        return (
                          <ListItem key={subItem.text} disablePadding sx={{ mb: 0.5 }}>
                            <ListItemButton
                              onClick={() => handleSubItemClick(subItem.path)}
                              sx={{
                                borderRadius: 1.5,
                                mx: 1,
                                py: 1,
                                px: 2,
                                minHeight: 'auto',
                                backgroundColor: isSubActive ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                                color: isSubActive ? '#60a5fa' : 'rgba(255,255,255,0.7)',
                                '&:hover': {
                                  backgroundColor: 'rgba(255,255,255,0.05)',
                                  color: 'rgba(255,255,255,0.9)'
                                }
                              }}
                            >
                              <ListItemText
                                primary={subItem.text}
                                primaryTypographyProps={{
                                  fontSize: '0.8rem',
                                  fontWeight: isSubActive ? 600 : 400
                                }}
                              />
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                    </List>
                  </Collapse>
                )}
              </Box>
            );
          })}
        </List>
      </Box>

      {/* Upgrade Section */}
      <Box sx={{ p: 2, position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            p: 2.5,
            borderRadius: 2,
            background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%)',
            border: '1px solid rgba(168, 85, 247, 0.2)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            '&:before': {
              content: '""',
              position: 'absolute',
              top: '-50%',
              right: '-50%',
              width: '100px',
              height: '100px',
              background: 'radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)',
              borderRadius: '50%'
            }
          }}
        >
          <UpgradeIcon sx={{ color: '#a855f7', mb: 1, fontSize: '2rem' }} />
          <Typography
            variant="subtitle2"
            sx={{
              color: 'white',
              fontWeight: 600,
              mb: 0.5,
              fontSize: '0.875rem'
            }}
          >
            Upgrade Available
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: 'rgba(255,255,255,0.7)',
              fontSize: '0.75rem',
              display: 'block',
              lineHeight: 1.4
            }}
          >
            Get premium features
          </Typography>
        </Box>
      </Box>

      {/* Footer */}
      <Box 
        sx={{ 
          p: 2, 
          textAlign: 'center', 
          borderTop: '1px solid rgba(255,255,255,0.1)',
          position: 'relative',
          zIndex: 1
        }}
      >
        <Typography 
          variant="caption" 
          sx={{ 
            color: 'rgba(255,255,255,0.6)',
            fontSize: '0.7rem',
            fontWeight: 500
          }}
        >
          © 2025 SchoolVriksh v2.1.0
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Drawer
      variant={variant}
      open={open}
      onClose={onClose}
      sx={{
        width: isDesktop ? 280 : '100vw',
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: isDesktop ? 280 : '100vw',
          boxSizing: 'border-box',
          border: 'none',
          boxShadow: isDesktop 
            ? '4px 0 20px rgba(0, 0, 0, 0.15)' 
            : '0 0 20px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        },
        ...sx
      }}
      ModalProps={{
        keepMounted: true,
        BackdropProps: {
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(4px)'
          }
        }
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default ClerkSidebar;
