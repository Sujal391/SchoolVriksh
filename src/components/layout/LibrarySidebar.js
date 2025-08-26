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
//   Avatar,
//   Chip,
//   Collapse,
//   IconButton
// } from '@mui/material';
// import {
//   Dashboard as DashboardIcon,
//   MenuBook as BooksIcon,
//   RequestPage as RequestsIcon,
//   History as HistoryIcon,
//   Category as CategoriesIcon,
//   Assessment as StatsIcon,
//   ListAlt as LogsIcon,
//   ChevronLeft as ChevronLeftIcon,
//   ExpandLess,
//   ExpandMore,
//   Add as AddIcon,
//   Search as SearchIcon,
//   People as StudentsIcon
// } from '@mui/icons-material';
// import { useRouter } from 'next/router';
// import { useState } from 'react';

// const LibrarySidebar = ({ open, onClose, variant, sx }) => {
//   const theme = useTheme();
//   const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
//   const router = useRouter();
//   const [expandedItems, setExpandedItems] = useState({});

//   const menuItems = [
//     { 
//       text: 'Dashboard', 
//       icon: <DashboardIcon />, 
//       path: '/library',
//     },
//     { 
//       text: 'Books', 
//       icon: <BooksIcon />, 
//       path: '/library/books',
//       subItems: [
//         { text: 'All Books', path: '/library/books' },
//         { text: 'Add New Book', path: '/library/books/add' },
//         { text: 'Search Books', path: '/library/books/search' }
//       ]
//     },
//     { 
//       text: 'Issue Requests', 
//       icon: <RequestsIcon />, 
//       path: '/library/requests',
//     },
//     { 
//       text: 'Student History', 
//       icon: <HistoryIcon />, 
//       path: '/library/history',
//     },
//     { 
//       text: 'Categories', 
//       icon: <CategoriesIcon />, 
//       path: '/library/categories',
//     },
//     { 
//       text: 'Statistics', 
//       icon: <StatsIcon />, 
//       path: '/library/stats',
//     },
//     { 
//       text: 'Audit Logs', 
//       icon: <LogsIcon />, 
//       path: '/library/audit-logs',
//     },
//   ];

//   const handleItemClick = (path, hasSubItems = false) => {
//     if (hasSubItems) {
//       setExpandedItems(prev => ({
//         ...prev,
//         [path]: !prev[path]
//       }));
//     } else {
//       router.push(path);
//       if (!isDesktop && onClose) {
//         onClose();
//       }
//     }
//   };

//   const handleSubItemClick = (path) => {
//     router.push(path);
//     if (!isDesktop && onClose) {
//       onClose();
//     }
//   };

//   const isActiveRoute = (path, subItems = []) => {
//     if (router.pathname === path) return true;
//     return subItems.some(sub => router.pathname === sub.path);
//   };

//   return (
//     <Drawer
//       variant={variant}
//       open={open}
//       onClose={onClose}
//       sx={{
//         width: isDesktop ? 280 : '100vw',
//         flexShrink: 0,
//         '& .MuiDrawer-paper': {
//           width: isDesktop ? 280 : '100vw',
//           boxSizing: 'border-box',
//           backgroundColor: '#1a365d',
//           color: 'white',
//         },
//         ...sx
//       }}
//     >
//       <Box sx={{ p: 3, display: 'flex', alignItems: 'center' }}>
//         <Avatar
//           sx={{
//             width: 56,
//             height: 56,
//             mr: 2,
//             backgroundColor: 'white',
//             color: '#1a365d',
//           }}
//         >
//           <BooksIcon fontSize="large" />
//         </Avatar>
//         <Box>
//           <Typography variant="h6" sx={{ fontWeight: 700 }}>
//             Library System
//           </Typography>
//           <Typography variant="caption">
//             Management Panel
//           </Typography>
//         </Box>
//       </Box>

//       <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />

//       <List sx={{ p: 2 }}>
//         {menuItems.map((item) => {
//           const isActive = isActiveRoute(item.path, item.subItems);
//           const hasSubItems = item.subItems && item.subItems.length > 0;
//           const isExpanded = expandedItems[item.path];

//           return (
//             <Box key={item.text}>
//               <ListItem disablePadding>
//                 <ListItemButton
//                   onClick={() => handleItemClick(item.path, hasSubItems)}
//                   sx={{
//                     borderRadius: 1,
//                     mb: 1,
//                     backgroundColor: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
//                     color: isActive ? 'white' : 'rgba(255,255,255,0.8)',
//                     '&:hover': {
//                       backgroundColor: 'rgba(255,255,255,0.1)',
//                     },
//                   }}
//                 >
//                   <ListItemIcon sx={{ color: 'inherit' }}>
//                     {item.icon}
//                   </ListItemIcon>
//                   <ListItemText primary={item.text} />
//                   {hasSubItems && (isExpanded ? <ExpandLess /> : <ExpandMore />)}
//                 </ListItemButton>
//               </ListItem>
              
//               {hasSubItems && (
//                 <Collapse in={isExpanded} timeout="auto" unmountOnExit>
//                   <List component="div" disablePadding>
//                     {item.subItems.map((subItem) => (
//                       <ListItemButton
//                         key={subItem.text}
//                         onClick={() => handleSubItemClick(subItem.path)}
//                         sx={{
//                           pl: 6,
//                           borderRadius: 1,
//                           backgroundColor: router.pathname === subItem.path ? 'rgba(255,255,255,0.05)' : 'transparent',
//                           color: router.pathname === subItem.path ? 'white' : 'rgba(255,255,255,0.6)',
//                           '&:hover': {
//                             backgroundColor: 'rgba(255,255,255,0.05)',
//                           },
//                         }}
//                       >
//                         <ListItemText primary={subItem.text} />
//                       </ListItemButton>
//                     ))}
//                   </List>
//                 </Collapse>
//               )}
//             </Box>
//           );
//         })}
//       </List>
//     </Drawer>
//   );
// };

// export default LibrarySidebar;




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
  IconButton,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  MenuBook as BooksIcon,
  RequestPage as RequestsIcon,
  History as HistoryIcon,
  Category as CategoriesIcon,
  Assessment as StatsIcon,
  ListAlt as LogsIcon,
  ChevronLeft as ChevronLeftIcon,
  ExpandLess,
  ExpandMore,
  Add as AddIcon,
  Search as SearchIcon,
  People as StudentsIcon
} from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useState } from 'react';

const LibrarySidebar = ({ open, onClose, variant, sx }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const router = useRouter();
  const [expandedItems, setExpandedItems] = useState({});

  const menuItems = [
    { 
      text: 'Dashboard', 
      icon: <DashboardIcon />, 
      path: '/library',
    },
    { 
      text: 'Books', 
      icon: <BooksIcon />, 
      path: '/library/books',
      subItems: [
        { text: 'All Books', path: '/library/books' },
        { text: 'Add New Book', path: '/library/books/add' },
        { text: 'Search Books', path: '/library/books/search' }
      ]
    },
    { 
      text: 'Issue Requests', 
      icon: <RequestsIcon />, 
      path: '/library/requests',
    },
    { 
      text: 'Student History', 
      icon: <HistoryIcon />, 
      path: '/library/history',
    },
    { 
      text: 'Categories', 
      icon: <CategoriesIcon />, 
      path: '/library/categories',
    },
    // { 
    //   text: 'Statistics', 
    //   icon: <StatsIcon />, 
    //   path: '/library/stats',
    // },
    { 
      text: 'Audit Logs', 
      icon: <LogsIcon />, 
      path: '/library/audit-logs',
    },
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
            sx={{
              width: 70,
              height: 70,
              mr: 2,
              backgroundColor: 'white',
              color: '#1a365d',
              border: '3px solid rgba(255,255,255,0.2)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
            }}
          >
            <BooksIcon fontSize="large" />
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
              Library System
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
              Management Panel
            </Typography>
          </Box>
        </Box>
        
        <Chip
          label="LIBRARY MANAGER"
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

export default LibrarySidebar;