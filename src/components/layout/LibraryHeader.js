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
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const LibraryHeader = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
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
        background: "linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)",
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(20px)',
        borderRadius: { xs: 0, lg: '0 0 24px 24px' },
      }}
    >
      <Toolbar
        sx={{
          minHeight: "80px !important",
          px: { xs: 3, sm: 4, lg: 5 },
          justifyContent: "space-between",
        }}
      >
        {/* Left Side */}
        <Stack direction="row" alignItems="center" spacing={3}>
          {/* Mobile Menu Button */}
          <IconButton
            edge="start"
            onClick={onMenuClick}
            sx={{
              display: { lg: "none" },
              color: "#ffffff",
              background: "rgba(255, 255, 255, 0.1)",
              width: 48,
              height: 48,
              borderRadius: '16px',
              "&:hover": { 
                background: "rgba(255, 255, 255, 0.2)",
              },
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* Brand Section */}
          <Stack direction="row" alignItems="center" spacing={2}>
            <LibraryBooksIcon sx={{ color: '#ffffff', fontSize: '2rem' }} />
            <Typography 
              variant="h5" 
              sx={{ 
                color: "#ffffff",
                fontWeight: 700,
                fontSize: { xs: '1.25rem', sm: '1.5rem' },
              }}
            >
              Library Management
            </Typography>
          </Stack>
        </Stack>

        {/* Right Side */}
        <Stack direction="row" alignItems="center" spacing={{ xs: 2, sm: 3 }}>
          {/* Notifications - Desktop Only */}
          {!isMobile && (
            <IconButton
              sx={{
                color: "#ffffff",
                background: "rgba(255, 255, 255, 0.1)",
                width: 48,
                height: 48,
                borderRadius: '16px',
                "&:hover": { 
                  background: "rgba(255, 255, 255, 0.2)",
                },
              }}
            >
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          )}

          {/* User Section */}
          {!isMobile ? (
            // Desktop Layout
            <Stack direction="row" alignItems="center" spacing={2}>
              <Chip
                icon={<PersonIcon />}
                label="Librarian"
                sx={{
                  background: "rgba(255, 255, 255, 0.1)",
                  color: "#ffffff",
                  fontWeight: 600,
                }}
              />

              <Box sx={{ textAlign: "right" }}>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 700,
                    color: "#ffffff",
                  }}
                >
                  {user?.name || "Library Staff"}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: "rgba(255, 255, 255, 0.8)",
                  }}
                >
                  {user?.email || "library@school.edu"}
                </Typography>
              </Box>
              
              <Avatar
                sx={{
                  width: 48,
                  height: 48,
                  background: "#ffffff",
                  color: "#1e40af",
                  fontSize: "1.25rem",
                  fontWeight: 700,
                }}
              >
                {user?.name?.charAt(0)?.toUpperCase() || "L"}
              </Avatar>
              
              <Button
                variant="outlined"
                onClick={logout}
                startIcon={<LogoutIcon />}
                sx={{
                  textTransform: "none",
                  color: "#ffffff",
                  fontWeight: 600,
                  borderColor: "rgba(255, 255, 255, 0.3)",
                  "&:hover": {
                    borderColor: "rgba(255, 255, 255, 0.5)",
                  },
                }}
              >
                Logout
              </Button>
            </Stack>
          ) : (
            // Mobile Layout
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Chip
                label="Librarian"
                size="small"
                sx={{
                  background: "rgba(255, 255, 255, 0.1)",
                  color: "#ffffff",
                  fontWeight: 600,
                }}
              />

              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  color: "#ffffff",
                }}
              >
                {user?.name?.split(" ")[0] || "Lib"}
              </Typography>
              
              <IconButton
                onClick={handleMenuClick}
                sx={{ p: 0 }}
              >
                <Avatar
                  sx={{
                    width: 44,
                    height: 44,
                    background: "#ffffff",
                    color: "#1e40af",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                  }}
                >
                  {user?.name?.charAt(0)?.toUpperCase() || "L"}
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
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                    borderRadius: 2,
                  },
                }}
              >
                <MenuItem disabled sx={{ opacity: 1 }}>
                  <Stack spacing={0.5}>
                    <Typography variant="body1" sx={{ fontWeight: 700 }}>
                      {user?.name || "Library Staff"}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#64748b" }}>
                      Librarian Access
                    </Typography>
                  </Stack>
                </MenuItem>
                
                <MenuItem onClick={handleLogout}>
                  <LogoutIcon sx={{ mr: 2 }} />
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

export default LibraryHeader;