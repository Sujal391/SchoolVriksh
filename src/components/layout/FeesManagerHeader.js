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
import SchoolIcon from "@mui/icons-material/School";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const FeesManagerHeader = ({ onMenuClick }) => {
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
            onClick={onMenuClick}
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
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.1) 100%)",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <SchoolIcon sx={{ color: '#ffffff', fontSize: '1.5rem' }} />
            </Box>
            
            <Box>
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: 700,
                  color: "#ffffff",
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
                Fees Manager Dashboard
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
                label="Fees Manager"
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
                  {user?.name || "Fees Manager"}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: "rgba(255, 255, 255, 0.8)",
                    fontSize: '0.75rem',
                    fontWeight: 500,
                  }}
                >
                  {user?.email || "fees@school.edu"}
                </Typography>
              </Box>
              
              <Avatar
                sx={{
                  width: 48,
                  height: 48,
                  background: "linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)",
                  color: "#1e40af",
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  border: '3px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15), inset 0 2px 4px rgba(255, 255, 255, 0.8)',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  "&:hover": {
                    transform: 'translateY(-2px) scale(1.05)',
                    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2), inset 0 2px 4px rgba(255, 255, 255, 0.9)',
                  }
                }}
                onClick={handleMenuClick}
              >
                {user?.name?.charAt(0)?.toUpperCase() || "F"}
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
                label="Fees"
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
                {user?.name?.split(" ")[0] || "Manager"}
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
                    background: "linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)",
                    color: "#1e40af",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15), inset 0 1px 2px rgba(255, 255, 255, 0.8)',
                  }}
                >
                  {user?.name?.charAt(0)?.toUpperCase() || "F"}
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
                      {user?.name || "Fees Manager"}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#64748b", fontSize: '0.75rem' }}>
                      Fees Management Access
                    </Typography>
                  </Stack>
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

export default FeesManagerHeader;