import { Box, CircularProgress, Typography } from "@mui/material";

const EmptyState = ({ loading = false, message, loadingMessage }) => {
  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={1}
        py={4}
      >
        <CircularProgress size={24} />
        <Typography variant="body2">
          {loadingMessage || "Loading..."}
        </Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" py={4}>
      <Typography variant="body2" color="text.secondary">
        {message || "No data found"}
      </Typography>
    </Box>
  );
};

export default EmptyState;
