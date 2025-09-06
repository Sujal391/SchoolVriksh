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
  IconButton,
  
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Class as ClassIcon,
  People as StudentsIcon,
  School as TeachersIcon,
  Book as SubjectsIcon,
  Assignment as ExamsIcon,
  Schedule as TimetableIcon,
  EventNote as LeaveRequestsIcon,
  Group as UsersIcon,
  Upgrade as UpgradeIcon,
  ChevronLeft as ChevronLeftIcon,
  Assessment as ResultsIcon,
  Description as AdmissionFormsIcon, 
} from "@mui/icons-material";
import { useRouter } from "next/router";
import Link from "next/link";

const AdminSidebar = ({ isOpen, toggleSidebar }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const router = useRouter();

  const menuItems = [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      path: "/admin/dashboard",
      badge: null,
    },
    {
      text: "Admission Forms",
      icon: <AdmissionFormsIcon />,
      path: "/admin/forms",
      badge: null,
    },
    {
      text: "Classes",
      icon: <ClassIcon />,
      path: "/admin/classes",
      badge: null,
    },
    {
      text: "Students",
      icon: <StudentsIcon />,
      path: "/admin/students",
      badge: null,
    },
    {
      text: "Teachers",
      icon: <TeachersIcon />,
      path: "/admin/teachers",
      badge: null,
    },
    {
      text: "Staff",
      icon: <UsersIcon />,
      path: "/admin/users",
      badge: null,
    },
    {
      text: "Subjects",
      icon: <SubjectsIcon />,
      path: "/admin/subjects",
      badge: null,
    },
    {
      text: "Exams",
      icon: <ExamsIcon />,
      path: "/admin/exams",
      badge: { color: "warning" },
    },
    {
      text: "Results",
      icon: <ResultsIcon />,
      path: "/admin/results",
      badge: null,
    },
    // {
    //   text: "Timetable",
    //   icon: <TimetableIcon />,
    //   path: "/admin/timetable",
    //   badge: null,
    // },
    {
      text: "Leave Requests",
      icon: <LeaveRequestsIcon />,
      path: "/admin/leaves",
      badge: { color: "error" },
    },
    
  ];

  const handleItemClick = (path) => {
    router.push(path);
    if (!isDesktop && toggleSidebar) {
      toggleSidebar();
    }
  };

  const isActiveRoute = (path) => {
    return router.pathname === path;
  };

  const drawerContent = (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        // background: "linear-gradient(180deg,  #1e3a8a 100%)",
        backgroundColor: "#1a365d",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative Background Pattern */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "200px",
          height: "200px",
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",
          borderRadius: "50%",
          transform: "translate(50%, -50%)",
          pointerEvents: "none",
        }}
      />

      {/* Close Button for Mobile */}
      {!isDesktop && (
        <Box sx={{ position: "absolute", top: 16, right: 16, zIndex: 10 }}>
          <IconButton
            onClick={toggleSidebar}
            sx={{
              color: "white",
              backgroundColor: "rgba(255,255,255,0.1)",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
        </Box>
      )}

      {/* Sidebar Header with Logo - Fixed */}
      <Box
        sx={{
          p: 3,
          pb: 2,
          position: "relative",
          zIndex: 1,
          flexShrink: 0, // Prevent shrinking
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar
            src="/images/skoolvriksh-logo.jpg"
            alt="SchoolVriksh Logo"
            sx={{
              width: 70,
              height: 70,
              mr: 2,
              backgroundColor: "white",
              border: "3px solid rgba(255,255,255,0.2)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            }}
          >
            {/* <School style={{ color: '#1976d2', fontSize: '24px' }} /> */}
          </Avatar>
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "white",
                fontSize: "1.25rem",
                lineHeight: 1.2,
                textShadow: "0 2px 4px rgba(0,0,0,0.3)",
              }}
            >
              SkoolVriksh
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "rgba(255,255,255,0.8)",
                fontSize: "0.75rem",
                fontWeight: 500,
                letterSpacing: "0.5px",
              }}
            >
              Admin Panel
            </Typography>
          </Box>
        </Box>

        <Chip
          label="ADMIN ACCESS"
          size="small"
          sx={{
            backgroundColor: "rgba(239, 68, 68, 0.2)",
            color: "#ef4444",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            fontWeight: 600,
            fontSize: "0.7rem",
            height: "24px",
          }}
        />
      </Box>

      <Divider sx={{ backgroundColor: "rgba(255,255,255,0.1)", mx: 2, flexShrink: 0 }} />

      {/* Scrollable Navigation Menu */}
      <Box 
        sx={{ 
          flexGrow: 1, 
          position: "relative", 
          zIndex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          minHeight: 0, // Important for flex child to scroll
          py: 2,
          px: 1,
          // Custom scrollbar styling
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-track": {
            background: "rgba(255,255,255,0.1)",
            borderRadius: "3px",
            margin: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "rgba(255,255,255,0.3)",
            borderRadius: "3px",
            "&:hover": {
              background: "rgba(255,255,255,0.5)",
            },
          },
          // Firefox scrollbar
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(255,255,255,0.3) rgba(255,255,255,0.1)",
        }}
      >
        <List sx={{ px: 1 }}>
          {menuItems.map((item) => {
            const isActive = isActiveRoute(item.path);

            return (
              <Box key={item.text} sx={{ mb: 1 }}>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => handleItemClick(item.path)}
                    sx={{
                      borderRadius: 2,
                      mx: 1,
                      py: 1.5,
                      px: 2,
                      backgroundColor: isActive
                        ? "rgba(59, 130, 246, 0.15)"
                        : "transparent",
                      color: isActive ? "#60a5fa" : "rgba(255,255,255,0.9)",
                      border: isActive
                        ? "1px solid rgba(59, 130, 246, 0.3)"
                        : "1px solid transparent",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      position: "relative",
                      overflow: "hidden",
                      "&:hover": {
                        backgroundColor: isActive
                          ? "rgba(59, 130, 246, 0.2)"
                          : "rgba(255,255,255,0.08)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        transform: "translateX(4px)",
                      },
                      "&:before": {
                        content: '""',
                        position: "absolute",
                        left: 0,
                        top: 0,
                        height: "100%",
                        width: isActive ? "4px" : "0px",
                        backgroundColor: "#3b82f6",
                        borderRadius: "0 4px 4px 0",
                        transition: "width 0.3s ease",
                      },
                      "& .MuiListItemIcon-root": {
                        color: isActive ? "#60a5fa" : "rgba(255,255,255,0.7)",
                        minWidth: 40,
                        transition: "all 0.3s ease",
                      },
                    }}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      primaryTypographyProps={{
                        fontSize: "0.875rem",
                        fontWeight: isActive ? 600 : 500,
                        letterSpacing: "0.25px",
                      }}
                    />
                    {item.badge && (
                      <Chip
                        label={item.badge.count || "!"}
                        size="small"
                        color={item.badge.color}
                        sx={{
                          height: "20px",
                          minWidth: "20px",
                          fontSize: "0.7rem",
                          fontWeight: 600,
                        }}
                      />
                    )}
                  </ListItemButton>
                </ListItem>
              </Box>
            );
          })}
        </List>
      </Box>

      {/* Upgrade Section - Fixed */}
      {/* <Box sx={{ p: 2, position: "relative", zIndex: 1, flexShrink: 0 }}>
        <Box
          sx={{
            p: 2.5,
            borderRadius: 2,
            background:
              "linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%)",
            border: "1px solid rgba(168, 85, 247, 0.2)",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            "&:before": {
              content: '""',
              position: "absolute",
              top: "-50%",
              right: "-50%",
              width: "100px",
              height: "100px",
              background:
                "radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)",
              borderRadius: "50%",
            },

            

          }}
        >
          <UpgradeIcon sx={{ color: "#a855f7", mb: 1, fontSize: "2rem" }} />
          <Typography
            variant="subtitle2"
            sx={{
              color: "white",
              fontWeight: 600,
              mb: 0.5,
              fontSize: "0.875rem",
            }}
          >
            Upgrade Available
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: "rgba(255,255,255,0.7)",
              fontSize: "0.75rem",
              display: "block",
              lineHeight: 1.4,
            }}
          >
            Get premium features
          </Typography>
        </Box>
      </Box> */}


      <Box sx={{ p: 2, position: "relative", zIndex: 1, flexShrink: 0 }}>
  <Box
    sx={{
      p: 2.5,
      borderRadius: 2,
      background:
        "linear-gradient(135deg, rgba(251, 146, 60, 0.15) 0%, rgba(249, 115, 22, 0.15) 100%)",
      border: "1px solid rgba(251, 146, 60, 0.3)",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
      "&:before": {
        content: '""',
        position: "absolute",
        top: "-50%",
        right: "-50%",
        width: "100px",
        height: "100px",
        background:
          "radial-gradient(circle, rgba(251, 146, 60, 0.1) 0%, transparent 70%)",
        borderRadius: "50%",
      },
    }}
  >
    <UpgradeIcon sx={{ color: "#fb923c", mb: 1, fontSize: "2rem" }} />
    <Typography
      variant="subtitle2"
      sx={{
        color: "white",
        fontWeight: 600,
        mb: 0.5,
        fontSize: "0.875rem",
      }}
    >
      Upgrade Available
    </Typography>
    <Typography
      variant="caption"
      sx={{
        color: "rgba(255,255,255,0.7)",
        fontSize: "0.75rem",
        display: "block",
        lineHeight: 1.4,
      }}
    >
      Get premium features
    </Typography>
  </Box>
</Box>


      {/* Footer - Fixed */}
      <Box
        sx={{
          p: 2,
          textAlign: "center",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          position: "relative",
          zIndex: 1,
          flexShrink: 0, // Prevent shrinking
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: "rgba(255,255,255,0.6)",
            fontSize: "0.7rem",
            fontWeight: 500,
          }}
        >
          © 2025 SchoolVriksh v2.1.0
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Drawer
      variant={isDesktop ? "permanent" : "temporary"}
      open={isOpen}
      onClose={toggleSidebar}
      sx={{
        width: isDesktop ? 280 : "100vw",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: isDesktop ? 280 : "100vw",
          boxSizing: "border-box",
          
          border: "none",
          boxShadow: isDesktop
            ? "4px 0 20px rgba(0, 0, 0, 0.15)"
            : "0 0 20px rgba(0, 0, 0, 0.3)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        },
      }}
      ModalProps={{
        keepMounted: true,
        BackdropProps: {
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(4px)",
          },
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default AdminSidebar;