// import { useState, useEffect } from 'react';
// import AdminLayout from '../../components/layout/AdminLayout';
// import AdminService from '../../services/adminService';
// import StatsCard from '../../components/admin/StatsCard';

// const AdminDashboard = () => {
//   const [stats, setStats] = useState({
//     students: 0,
//     teachers: 0,
//     classes: 0,
//     pendingLeaves: 0
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//   const fetchStats = async () => {
//     try {
//       const [classesRes, teachersRes, leavesRes] = await Promise.all([
//         AdminService.getClasses(),
//         AdminService.getTeachers(),
//         AdminService.getPendingLeaveRequests()
//       ]);

//       const classes = classesRes.data || [];
      
//       // Fetch students from each class and sum their counts
//       const studentCounts = await Promise.all(
//         classes.map(cls => AdminService.getStudentsByClass(cls._id))
//       );

//       const totalStudents = studentCounts.reduce((sum, res) => {
//         return sum + (res.data?.students?.length || 0);
//       }, 0);

//       setStats({
//         students: totalStudents,
//         teachers: teachersRes.data.length || 0,
//         classes: classes.length || 0,
//         pendingLeaves: leavesRes.data.count || 0
//       });
//     } catch (error) {
//       console.error('Error fetching dashboard stats:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchStats();
// }, []);


//   return (
//     <AdminLayout>
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>

//         {loading ? (
//           <p>Loading dashboard data...</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//             <StatsCard title="Total Students" value={stats.students} icon="people" color="blue" />
//             <StatsCard title="Total Teachers" value={stats.teachers} icon="teacher" color="green" />
//             <StatsCard title="Classes" value={stats.classes} icon="class" color="purple" />
//             <StatsCard title="Pending Leaves" value={stats.pendingLeaves} icon="leave" color="red" />
//           </div>
//         )}

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {/* Recent Activities */}
//           <div className="bg-white rounded-lg shadow p-6">
//             <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
//             <div className="space-y-4 text-sm text-gray-600">
//               <p>No recent activities yet.</p>
//             </div>
//           </div>

//           {/* Quick Actions */}
//           <div className="bg-white rounded-lg shadow p-6">
//             <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
//             <div className="grid grid-cols-2 gap-4">
//               <a
//                 href="/admin/students"
//                 className="p-4 bg-blue-50 rounded-lg text-center hover:bg-blue-100 transition"
//               >
//                 <div className="text-blue-600 mb-2">
//                   <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
//                   </svg>
//                 </div>
//                 <span className="text-sm font-medium">Manage Students</span>
//               </a>
//               <a
//                 href="/admin/teachers"
//                 className="p-4 bg-green-50 rounded-lg text-center hover:bg-green-100 transition"
//               >
//                 <div className="text-green-600 mb-2">
//                   <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//                   </svg>
//                 </div>
//                 <span className="text-sm font-medium">Manage Teachers</span>
//               </a>
//               <a
//                 href="/admin/classes"
//                 className="p-4 bg-purple-50 rounded-lg text-center hover:bg-purple-100 transition"
//               >
//                 <div className="text-purple-600 mb-2">
//                   <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//                   </svg>
//                 </div>
//                 <span className="text-sm font-medium">Manage Classes</span>
//               </a>
//               <a
//                 href="/admin/leaves"
//                 className="p-4 bg-red-50 rounded-lg text-center hover:bg-red-100 transition"
//               >
//                 <div className="text-red-600 mb-2">
//                   <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                   </svg>
//                 </div>
//                 <span className="text-sm font-medium">Review Leaves</span>
//               </a>
//               <a
//                 href="/admin/users"
//                 className="p-4 bg-red-50 rounded-lg text-center hover:bg-red-100 transition"
//               >
//                 <div className="text-red-600 mb-2">
//                   <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                   </svg>
//                 </div>
//                 <span className="text-sm font-medium">Users</span>
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </AdminLayout>
//   );
// };

// export default AdminDashboard;



import { useState, useEffect } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import AdminService from '../../services/adminService';
import StatsCard from '../../components/admin/StatsCard';
import RecentAnnouncements from '../../components/admin/RecentAnnouncements';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    classes: 0,
    pendingLeaves: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [classesRes, teachersRes, leavesRes] = await Promise.all([
          AdminService.getClasses(),
          AdminService.getTeachers(),
          AdminService.getPendingLeaveRequests()
        ]);

        const classes = classesRes.data || [];
        
        // Fetch students from each class and sum their counts
        const studentCounts = await Promise.all(
          classes.map(cls => AdminService.getStudentsByClass(cls._id))
        );

        const totalStudents = studentCounts.reduce((sum, res) => {
          return sum + (res.data?.students?.length || 0);
        }, 0);

        setStats({
          students: totalStudents,
          teachers: teachersRes.data.length || 0,
          classes: classes.length || 0,
          pendingLeaves: leavesRes.data.count || 0
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <AdminLayout>
      {/* Main Dashboard Container - Fixed Height */}
      <div className="h-screen bg-gradient-to-br overflow-hidden">
        {/* Content Wrapper with Controlled Spacing */}
        <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col">
          
          {/* Header Section - Compact */}
          <div className="flex-shrink-0 mb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="mb-2 sm:mb-0">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1 ">
                  Admin Dashboard
                </h1> 
                <p className="text-slate-600 text-sm text-center">
                  Welcome back! Here's what's happening at your school today.
                </p>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-500">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Live Data</span>
              </div>
            </div>
          </div>

          {/* Stats Cards Section - Compact */}
          <div className="flex-shrink-0 mb-4">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 animate-pulse">
                    <div className="h-3 bg-slate-200 rounded w-3/4 mb-3"></div>
                    <div className="h-6 bg-slate-200 rounded w-1/2 mb-2"></div>
                    <div className="h-2 bg-slate-200 rounded w-full"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="transform hover:scale-105 transition-transform duration-200">
                  <StatsCard 
                    title="Total Students" 
                    value={stats.students} 
                    icon="people" 
                    color="blue" 
                  />
                </div>
                <div className="transform hover:scale-105 transition-transform duration-200">
                  <StatsCard 
                    title="Total Teachers" 
                    value={stats.teachers} 
                    icon="teacher" 
                    color="green" 
                  />
                </div>
                <div className="transform hover:scale-105 transition-transform duration-200">
                  <StatsCard 
                    title="Classes" 
                    value={stats.classes} 
                    icon="class" 
                    color="purple" 
                  />
                </div>
                <div className="transform hover:scale-105 transition-transform duration-200">
                  <StatsCard 
                    title="Pending Leaves" 
                    value={stats.pendingLeaves} 
                    icon="leave" 
                    color="red" 
                  />
                </div>
              </div>
            )}
          </div>

          {/* Main Content Grid - Flexible Height */}
          <div className="flex-1 min-h-0">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 h-full">
              
              {/* Recent Announcements Section */}
              <div className="xl:col-span-2">
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 h-full flex flex-col">
                  <div className="flex-1 p-4">
                    <RecentAnnouncements maxItems={5} compact={true} />
                  </div>
                </div>
              </div>

              {/* Quick Actions Section */}
              <div className="xl:col-span-1">
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 h-full flex flex-col">
                  <div className="flex-shrink-0 px-4 py-3 border-b border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-800">Quick Actions</h3>
                    <p className="text-xs text-slate-500 mt-1">Manage your school efficiently</p>
                  </div>
                  <div className="flex-1 p-4">
                    <div className="grid grid-cols-1 gap-2 h-full">
                      
                      {/* Manage Students */}
                      <a
                        href="/admin/students"
                        className="group p-3 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-lg transition-all duration-200 border border-blue-200 hover:border-blue-300"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          </div>
                          <div className="min-w-0">
                            <div className="font-medium text-slate-800 text-sm">Manage Students</div>
                            <div className="text-xs text-slate-600">Add, edit student records</div>
                          </div>
                        </div>
                      </a>

                      {/* Manage Teachers */}
                      <a
                        href="/admin/teachers"
                        className="group p-3 bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 rounded-lg transition-all duration-200 border border-green-200 hover:border-green-300"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                          </div>
                          <div className="min-w-0">
                            <div className="font-medium text-slate-800 text-sm">Manage Teachers</div>
                            <div className="text-xs text-slate-600">Faculty management</div>
                          </div>
                        </div>
                      </a>

                      {/* Manage Classes */}
                      <a
                        href="/admin/classes"
                        className="group p-3 bg-gradient-to-r from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 rounded-lg transition-all duration-200 border border-purple-200 hover:border-purple-300"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                          </div>
                          <div className="min-w-0">
                            <div className="font-medium text-slate-800 text-sm">Manage Classes</div>
                            <div className="text-xs text-slate-600">Class organization</div>
                          </div>
                        </div>
                      </a>

                      {/* Review Leaves */}
                      <a
                        href="/admin/leaves"
                        className="group p-3 bg-gradient-to-r from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 rounded-lg transition-all duration-200 border border-red-200 hover:border-red-300"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div className="min-w-0">
                            <div className="font-medium text-slate-800 text-sm">Review Leaves</div>
                            <div className="text-xs text-slate-600">Approve/reject requests</div>
                          </div>
                        </div>
                      </a>

                      {/* Users */}
                      <a
                        href="/admin/users"
                        className="group p-3 bg-gradient-to-r from-indigo-50 to-indigo-100 hover:from-indigo-100 hover:to-indigo-200 rounded-lg transition-all duration-200 border border-indigo-200 hover:border-indigo-300"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          </div>
                          <div className="min-w-0">
                            <div className="font-medium text-slate-800 text-sm">Manage Staff</div>
                            <div className="text-xs text-slate-600">System user management</div>
                          </div>
                        </div>
                      </a>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;