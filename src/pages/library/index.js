// import { useEffect, useState } from 'react';
// import { Box, Typography, Grid, Card, CardContent, LinearProgress, CircularProgress } from '@mui/material';
// import LibraryLayout from '../../components/layout/LibraryLayout';
// import { useAuth } from '../../contexts/AuthContext';
// import libraryService from '../../services/libraryService';
// import {
//   Book as BookIcon,
//   CheckCircle as AvailableIcon,
//   History as HistoryIcon,
//   Warning as OverdueIcon,
//   People as StudentsIcon,
//   Category as CategoriesIcon
// } from '@mui/icons-material';

// const LibraryDashboard = () => {
//   const { user } = useAuth();
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const data = await libraryService.getLibraryStats(user.school._id);
//         setStats(data);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, [user.school._id]);

//   if (loading) {
//     return (
//       <LibraryLayout>
//         <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
//           <CircularProgress />
//         </Box>
//       </LibraryLayout>
//     );
//   }

//   if (error) {
//     return (
//       <LibraryLayout>
//         <Typography color="error">{error}</Typography>
//       </LibraryLayout>
//     );
//   }

//   return (
//     <LibraryLayout>
//       <Typography variant="h4" gutterBottom>
//         Library Dashboard
//       </Typography>
      
//       <Grid container spacing={3} mt={2}>
//         <Grid item xs={12} sm={6} md={4}>
//           <Card elevation={3}>
//             <CardContent>
//               <Box display="flex" alignItems="center" mb={2}>
//                 <BookIcon color="primary" fontSize="large" />
//                 <Typography variant="h6" ml={2}>
//                   Total Books
//                 </Typography>
//               </Box>
//               <Typography variant="h4">{stats.totalBooks}</Typography>
//             </CardContent>
//           </Card>
//         </Grid>
        
//         <Grid item xs={12} sm={6} md={4}>
//           <Card elevation={3}>
//             <CardContent>
//               <Box display="flex" alignItems="center" mb={2}>
//                 <AvailableIcon color="success" fontSize="large" />
//                 <Typography variant="h6" ml={2}>
//                   Available Books
//                 </Typography>
//               </Box>
//               <Typography variant="h4">{stats.availableBooks}</Typography>
//               <LinearProgress 
//                 variant="determinate" 
//                 value={(stats.availableBooks / stats.totalBooks) * 100} 
//                 color="success"
//                 sx={{ mt: 2, height: 8, borderRadius: 4 }}
//               />
//             </CardContent>
//           </Card>
//         </Grid>
        
//         <Grid item xs={12} sm={6} md={4}>
//           <Card elevation={3}>
//             <CardContent>
//               <Box display="flex" alignItems="center" mb={2}>
//                 <HistoryIcon color="info" fontSize="large" />
//                 <Typography variant="h6" ml={2}>
//                   Issued Books
//                 </Typography>
//               </Box>
//               <Typography variant="h4">{stats.issuedBooks}</Typography>
//             </CardContent>
//           </Card>
//         </Grid>
        
//         <Grid item xs={12} sm={6} md={4}>
//           <Card elevation={3}>
//             <CardContent>
//               <Box display="flex" alignItems="center" mb={2}>
//                 <OverdueIcon color="error" fontSize="large" />
//                 <Typography variant="h6" ml={2}>
//                   Overdue Books
//                 </Typography>
//               </Box>
//               <Typography variant="h4">{stats.overdueBooks}</Typography>
//             </CardContent>
//           </Card>
//         </Grid>
        
//         <Grid item xs={12} sm={6} md={4}>
//           <Card elevation={3}>
//             <CardContent>
//               <Box display="flex" alignItems="center" mb={2}>
//                 <StudentsIcon color="secondary" fontSize="large" />
//                 <Typography variant="h6" ml={2}>
//                   Active Students
//                 </Typography>
//               </Box>
//               <Typography variant="h4">-</Typography>
//             </CardContent>
//           </Card>
//         </Grid>
        
//         <Grid item xs={12} sm={6} md={4}>
//           <Card elevation={3}>
//             <CardContent>
//               <Box display="flex" alignItems="center" mb={2}>
//                 <CategoriesIcon color="warning" fontSize="large" />
//                 <Typography variant="h6" ml={2}>
//                   Categories
//                 </Typography>
//               </Box>
//               <Typography variant="h4">-</Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </LibraryLayout>
//   );
// };

// export default LibraryDashboard;





import { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, LinearProgress, CircularProgress } from '@mui/material';
import LibraryLayout from '../../components/layout/LibraryLayout';
import { useAuth } from '../../contexts/AuthContext';
import libraryService from '../../services/libraryService'
import {
  Book as BookIcon,
  CheckCircle as AvailableIcon,
  History as HistoryIcon,
  Warning as OverdueIcon,
  People as StudentsIcon,
  Category as CategoriesIcon
} from '@mui/icons-material';

const LibraryDashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
    //   if (authLoading) return; // Wait for auth to complete
    //   if (!user || !user.school || !user.school._id) {
    //     setError('User or school information not available');
    //     setLoading(false);
    //     return;
    //   }

      try {
        const data = await libraryService.getLibraryStats(user.school._id);
        setStats(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchStats();
  }, [user, authLoading]);

  if (authLoading || loading) {
    return (
      <LibraryLayout>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <CircularProgress />
        </Box>
      </LibraryLayout>
    );
  }

  if (error) {
    return (
      <LibraryLayout>
        <Typography color="error">{error}</Typography>
      </LibraryLayout>
    );
  }

//   if (!user.permissions || !user.permissions.canManageLibrary) {
//     return (
//       <LibraryLayout>
//         <Typography color="error">
//           Unauthorized: You do not have permission to view the library dashboard
//         </Typography>
//       </LibraryLayout>
//     );
//   }

  return (
    <LibraryLayout>
      <Typography variant="h4" gutterBottom>
        Library Dashboard
      </Typography>
      
      <Grid container spacing={3} mt={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <BookIcon color="primary" fontSize="large" />
                <Typography variant="h6" ml={2}>
                  Total Books
                </Typography>
              </Box>
              <Typography variant="h4">{stats.totalBooks}</Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <AvailableIcon color="success" fontSize="large" />
                <Typography variant="h6" ml={2}>
                  Available Books
                </Typography>
              </Box>
              <Typography variant="h4">{stats.availableBooks}</Typography>
              <LinearProgress 
                variant="determinate" 
                value={(stats.availableBooks / stats.totalBooks) * 100} 
                color="success"
                sx={{ mt: 2, height: 8, borderRadius: 4 }}
              />
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <HistoryIcon color="info" fontSize="large" />
                <Typography variant="h6" ml={2}>
                  Issued Books
                </Typography>
              </Box>
              <Typography variant="h4">{stats.issuedBooks}</Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <OverdueIcon color="error" fontSize="large" />
                <Typography variant="h6" ml={2}>
                  Overdue Books
                </Typography>
              </Box>
              <Typography variant="h4">{stats.overdueBooks}</Typography>
            </CardContent>
          </Card>
        </Grid>


         <Grid item xs={12} sm={6} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <OverdueIcon color="error" fontSize="large" />
                <Typography variant="h6" ml={2}>
                  reserved Books
                </Typography>
              </Box>
              <Typography variant="h4">{stats.reservedBooks}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <OverdueIcon color="error" fontSize="large" />
                <Typography variant="h6" ml={2}>
                  Total Fines
                </Typography>
              </Box>
              <Typography variant="h4">{stats.totalFines}</Typography>
            </CardContent>
          </Card>
        </Grid>
        
        {/* <Grid item xs={12} sm={6} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <StudentsIcon color="secondary" fontSize="large" />
                <Typography variant="h6" ml={2}>
                  Active Students
                </Typography>
              </Box>
              <Typography variant="h4">-</Typography>
            </CardContent>
          </Card>
        </Grid> */}
        
        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <CategoriesIcon color="warning" fontSize="large" />
                <Typography variant="h6" ml={2}>
                  Categories
                </Typography>
              </Box>
              <Typography variant="h4">-</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </LibraryLayout>
  );
};

export default LibraryDashboard;