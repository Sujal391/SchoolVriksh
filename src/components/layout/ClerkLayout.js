// import { useState } from "react";
// import ClerkSidebar from "./ClerkSidebar";
// import ClerkHeader from "./ClerkHeader";

// const ClerkLayout = ({ children }) => {
//   const [sidebarOpen, setSidebarOpen] = useState(false); // Start closed

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <ClerkSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
//       <div className="lg:pl-64 flex flex-col flex-1">
//         <ClerkHeader onMenuClick={() => setSidebarOpen(true)} />
//         <main className="flex-1 pb-8">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//             {children}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default ClerkLayout;


import { useState } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import ClerkSidebar from './ClerkSidebar';
import ClerkHeader from './ClerkHeader';

const ClerkLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* Sidebar */}
      <ClerkSidebar 
        open={sidebarOpen} 
        onClose={handleSidebarClose}
        variant={isDesktop ? 'permanent' : 'temporary'}
        sx={{
          width: { lg: 280 },
          flexShrink: { lg: 0 }
        }}
      />
      
      {/* Main Content */}
      <Box 
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          width: { lg: `calc(100% - 280px)` },
          minHeight: '100vh'
        }}
      >
        {/* Header */}
        <ClerkHeader onMenuClick={handleMenuClick} />
        
        {/* Page Content */}
        <Box 
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, sm: 3, lg: 4 },
            backgroundColor: '#f8f9fa',
            minHeight: 'calc(100vh - 64px)',
            overflow: 'auto'
          }}
        >
          {/* Content Container */}
          <Box 
            sx={{
              maxWidth: '1400px',
              mx: 'auto',
              backgroundColor: '#fff',
              borderRadius: 2,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              overflow: 'hidden',
              minHeight: '100%'
            }}
          >
            <Box sx={{ p: { xs: 2, sm: 3, lg: 4 } }}>
              {children}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ClerkLayout;