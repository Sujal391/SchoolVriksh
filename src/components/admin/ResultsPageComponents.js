import React from 'react';
import { Box, Typography, Tabs, Tab } from '@mui/material';

// Error Message Component
export const ErrorMessage = ({ error }) => {
  if (!error) return null;
  
  return (
    <Box className="mb-4 p-4 bg-red-100 text-red-700 rounded">
      {error}
    </Box>
  );
};

// Success Message Component
export const SuccessMessage = ({ successMessage }) => {
  if (!successMessage) return null;
  
  return (
    <Box className="mb-4 p-4 bg-green-100 text-green-700 rounded">
      {successMessage}
    </Box>
  );
};

// Page Header Component
export const ResultsPageHeader = () => {
  return (
    <Box className="mb-6">
      <Typography variant="h4" className="mb-2">
        📊 Exam Results Management
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Manage exam results, verify submissions, and generate marksheets
      </Typography>
    </Box>
  );
};

// Tab Navigation Component
export const ResultsTabNavigation = ({ tabValue, setTabValue }) => {
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
      <Tabs
        value={tabValue}
        onChange={(e, newValue) => setTabValue(newValue)}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
      >
        <Tab label="Submitted Excel Results" />
        <Tab label="All Marksheets" />
        <Tab label="Published Marksheets" />
        <Tab label="Unpublished Marksheets" />
        <Tab label="Student Marksheet" />
        <Tab label="Legacy Exam Results" />
      </Tabs>
    </Box>
  );
};

// Tab Panel Wrapper Component
export const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`results-tabpanel-${index}`}
      aria-labelledby={`results-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
};

// Loading Overlay Component
export const LoadingOverlay = ({ loading, message = "Loading..." }) => {
  if (!loading) return null;
  
  return (
    <Box className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Box className="bg-white p-6 rounded-lg shadow-lg text-center">
        <Typography variant="h6" className="mb-2">
          {message}
        </Typography>
        <Box className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></Box>
      </Box>
    </Box>
  );
};

// Statistics Card Component
export const StatisticsCard = ({ title, value, color = "primary", icon }) => {
  return (
    <Box className="bg-white p-4 rounded-lg shadow border">
      <Box className="flex items-center justify-between">
        <Box>
          <Typography variant="body2" color="textSecondary" className="mb-1">
            {title}
          </Typography>
          <Typography variant="h6" color={`${color}.main`}>
            {value}
          </Typography>
        </Box>
        {icon && (
          <Box className="text-gray-400">
            {icon}
          </Box>
        )}
      </Box>
    </Box>
  );
};

// Empty State Component
export const EmptyState = ({ 
  title = "No Data Available", 
  description = "No data to display at this time.",
  icon = "📭"
}) => {
  return (
    <Box className="text-center py-12">
      <Typography variant="h1" className="text-6xl mb-4">
        {icon}
      </Typography>
      <Typography variant="h6" className="mb-2 text-gray-600">
        {title}
      </Typography>
      <Typography variant="body1" color="textSecondary">
        {description}
      </Typography>
    </Box>
  );
};

// Action Button Group Component
export const ActionButtonGroup = ({ children, className = "" }) => {
  return (
    <Box className={`flex gap-2 ${className}`}>
      {children}
    </Box>
  );
};

// Info Card Component
export const InfoCard = ({ 
  title, 
  children, 
  variant = "info", // info, success, warning, error
  className = "" 
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  return (
    <Box className={`p-4 rounded-lg border ${getVariantClasses()} ${className}`}>
      {title && (
        <Typography variant="h6" className="mb-2">
          {title}
        </Typography>
      )}
      {children}
    </Box>
  );
};

// Section Header Component
export const SectionHeader = ({ title, subtitle, icon, actions }) => {
  return (
    <Box className="flex items-center justify-between mb-4">
      <Box className="flex items-center">
        {icon && <Box className="mr-2">{icon}</Box>}
        <Box>
          <Typography variant="h6">
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body2" color="textSecondary">
              {subtitle}
            </Typography>
          )}
        </Box>
      </Box>
      {actions && (
        <Box>
          {actions}
        </Box>
      )}
    </Box>
  );
};
