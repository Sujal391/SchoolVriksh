// // src/components/auth/LoginForm.js
// import { useState } from 'react';
// import { useRouter } from 'next/router';
// import { useAuth } from '../../contexts/AuthContext';
// import Link from 'next/link';
// import LoadingSpinner from '../common/LoadingSpinner';
// import ErrorAlert from '../common/ErrorAlert';

// const LoginForm = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { login } = useAuth();
//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     const result = await login(email, password);
//     setLoading(false);

//     if (!result.success) {
//       setError(result.message);
//     }
//   };

//   return (
//     <>
//       {error && <ErrorAlert message={error} />}
//       <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//         <div className="rounded-md shadow-sm space-y-4">
//           <div>
//             <label htmlFor="email" className="sr-only">
//               Email address
//             </label>
//             <input
//               id="email"
//               name="email"
//               type="email"
//               autoComplete="email"
//               required
//               className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//               placeholder="Email address"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//           <div>
//             <label htmlFor="password" className="sr-only">
//               Password
//             </label>
//             <input
//               id="password"
//               name="password"
//               type="password"
//               autoComplete="current-password"
//               required
//               className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//         </div>

//         <div className="flex items-center justify-between">
//           <div className="flex items-center">
//             <input
//               id="remember-me"
//               name="remember-me"
//               type="checkbox"
//               className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//             />
//             <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
//               Remember me
//             </label>
//           </div>

//           <div className="text-sm">
//             <Link href="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">

//                 Forgot your password?

//             </Link>
//           </div>
//         </div>

//         <div>
//           <button
//             type="submit"
//             className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             disabled={loading}
//           >
//             {loading ? <LoadingSpinner size="small" /> : 'Sign in'}
//           </button>
//         </div>
//       </form>
//       <div className="text-center text-sm text-gray-600">
//         Don't have an account?{' '}
//         <Link href="/register-owner" className="font-medium text-indigo-600 hover:text-indigo-500">

//             Register as owner

//         </Link>
//       </div>
//     </>
//   );
// };

// export default LoginForm;

// import { useState } from 'react';
// import { useRouter } from 'next/router';
// import { useAuth } from '../../contexts/AuthContext';
// import Link from 'next/link';
// import LoadingSpinner from '../common/LoadingSpinner';
// import ErrorAlert from '../common/ErrorAlert';

// const LoginForm = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { login } = useAuth();
//   const router = useRouter();

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setError('');
//   setLoading(true);

//   const result = await login(email, password);
//   setLoading(false);

//   if (!result.success) {
//     setError(result.message);
//   }
// };

//   return (
//     <div className="h-screen w-full relative overflow-hidden">
//       {/* Orange Background with School Campus Image Overlay */}
//       <div className="absolute inset-0">
//         {/* Base Orange Gradient Background */}
//         <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-blue-500 to-blue-500"></div>

//         {/* School Campus Silhouette Pattern */}
//         <div className="absolute inset-0 opacity-10">
//           <svg className="w-full h-full object-cover" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
//             <defs>
//               <pattern id="campus" x="0" y="0" width="400" height="300" patternUnits="userSpaceOnUse">
//                 {/* Building Silhouettes */}
//                 <rect x="50" y="200" width="60" height="100" fill="white" opacity="0.05"/>
//                 <rect x="120" y="180" width="80" height="120" fill="white" opacity="0.05"/>
//                 <rect x="210" y="190" width="70" height="110" fill="white" opacity="0.05"/>
//                 <rect x="290" y="170" width="90" height="130" fill="white" opacity="0.05"/>
//                 {/* Trees */}
//                 <circle cx="30" cy="250" r="25" fill="white" opacity="0.03"/>
//                 <circle cx="390" cy="260" r="30" fill="white" opacity="0.03"/>
//                 {/* Windows */}
//                 <rect x="60" y="220" width="8" height="12" fill="white" opacity="0.1"/>
//                 <rect x="75" y="220" width="8" height="12" fill="white" opacity="0.1"/>
//                 <rect x="90" y="220" width="8" height="12" fill="white" opacity="0.1"/>
//               </pattern>
//             </defs>
//             <rect width="100%" height="100%" fill="url(#campus)"/>
//           </svg>
//         </div>

//         {/* Floating Particles */}
//         <div className="absolute inset-0">
//           {[...Array(15)].map((_, i) => (
//             <div
//               key={i}
//               className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-pulse"
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 top: `${Math.random() * 100}%`,
//                 animationDelay: `${Math.random() * 3}s`,
//                 animationDuration: `${2 + Math.random() * 2}s`
//               }}
//             />
//           ))}
//         </div>

//         {/* Glowing Orbs */}
//         <div className="absolute top-20 left-20 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute bottom-20 right-20 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
//         <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-red-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
//       </div>

//       {/* Main Content */}
//       <div className="relative z-10 h-screen flex items-center justify-center p-4 lg:p-6">
//         <div className="w-full max-w-7xl mx-auto">
//           <div className="grid lg:grid-cols-5 gap-6 lg:gap-8 items-center h-full">

//             {/* Left Side - Compact Branding (3/5 width) */}
//             <div className="lg:col-span-3 text-white space-y-6 px-4 lg:px-6">
//               {/* Main Logo & Brand */}
//               <div className="space-y-4">
//                 <div className="flex items-center space-x-4">
//                   <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-6 transition-transform duration-300">
//                     <svg className="w-8 h-8 lg:w-10 lg:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
//                       <path d="M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3ZM18.82 9L12 12.72L5.18 9L12 5.28L18.82 9ZM17 15.99L12 18.72L7 15.99V12.27L12 15L17 12.27V15.99Z"/>
//                     </svg>
//                   </div>
//                   <div className="space-y-1">
//                     <h1 className="text-3xl lg:text-5xl font-black bg-gradient-to-r from-white via-yellow-200 to-orange-200 bg-clip-text text-transparent leading-tight">
//                       SkoolVriksh
//                     </h1>
//                     <p className="text-lg lg:text-xl text-orange-200 font-semibold tracking-wide">
//                       School Management Excellence
//                     </p>
//                     <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <h2 className="text-2xl lg:text-3xl font-bold text-yellow-300 leading-tight">
//                     Transform Your Educational Institution
//                   </h2>
//                   <p className="text-base lg:text-lg text-orange-100 leading-relaxed max-w-2xl">
//                     Experience the future of school management with our comprehensive, AI-powered platform.
//                   </p>
//                 </div>
//               </div>

//               {/* Compact Features Grid */}
//               <div className="grid md:grid-cols-2 gap-4">
//                 {[
//                   {
//                     icon: "🎓",
//                     title: "Smart Student Management",
//                     desc: "AI-powered academic tracking and personalized learning paths.",
//                     color: "from-blue-400 to-purple-600"
//                   },
//                   {
//                     icon: "📚",
//                     title: "Dynamic Course Planning",
//                     desc: "Intelligent curriculum design and automated timetabling.",
//                     color: "from-green-400 to-blue-500"
//                   },
//                   {
//                     icon: "📊",
//                     title: "Advanced Analytics",
//                     desc: "Real-time insights and comprehensive reporting.",
//                     color: "from-purple-400 to-pink-600"
//                   },
//                   {
//                     icon: "🔐",
//                     title: "Enterprise Security",
//                     desc: "Multi-factor authentication and GDPR compliance.",
//                     color: "from-orange-400 to-red-500"
//                   }
//                 ].map((feature, index) => (
//                   <div key={index} className="group p-4 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105">
//                     <div className="flex items-start space-x-3">
//                       <div className={`text-2xl w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
//                         {feature.icon}
//                       </div>
//                       <div className="flex-1 space-y-1">
//                         <h3 className="text-lg font-bold text-white group-hover:text-yellow-200 transition-colors duration-300">{feature.title}</h3>
//                         <p className="text-orange-200 text-sm leading-relaxed">{feature.desc}</p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Compact Stats */}
//               <div className="grid grid-cols-4 gap-3">
//                 {[
//                   { num: "250K+", label: "Students", icon: "👨‍🎓" },
//                   { num: "15K+", label: "Teachers", icon: "👩‍🏫" },
//                   { num: "1.2K+", label: "Schools", icon: "🏫" },
//                   { num: "98%", label: "Satisfaction", icon: "⭐" }
//                 ].map((stat, index) => (
//                   <div key={index} className="text-center p-3 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-xl border border-white/10 hover:from-white/15 hover:to-white/10 transition-all duration-300 group">
//                     <div className="text-lg mb-1 group-hover:scale-110 transition-transform duration-300">{stat.icon}</div>
//                     <div className="text-xl lg:text-2xl font-black text-yellow-300 mb-1">{stat.num}</div>
//                     <div className="text-orange-200 text-xs font-medium">{stat.label}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Right Side - Login Form with Original Functionality (2/5 width) */}
//             <div className="lg:col-span-2 w-full max-w-md mx-auto">
//               {/* Mobile Logo */}
//               <div className="lg:hidden text-center mb-4">
//                 <div className="inline-flex items-center space-x-3">
//                   <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-xl">
//                     <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
//                       <path d="M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3ZM18.82 9L12 12.72L5.18 9L12 5.28L18.82 9ZM17 15.99L12 18.72L7 15.99V12.27L12 15L17 12.27V15.99Z"/>
//                     </svg>
//                   </div>
//                   <div>
//                     <h1 className="text-2xl font-bold text-white">EduFlow</h1>
//                     <p className="text-orange-200 text-sm">School Management</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Login Card */}
//               <div className="bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/30 overflow-hidden transform hover:scale-[1.02] transition-all duration-500">
//                 {/* Card Header */}
//                 <div className="relative p-4 lg:p-6 bg-gradient-to-br from-blue-500 via-blue-500 to-blue-500 text-center overflow-hidden">
//                   <div className="absolute inset-0 bg-black/20"></div>
//                   <div className="absolute inset-0">
//                     <div className="absolute top-2 right-2 w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
//                     <div className="absolute bottom-2 left-2 w-12 h-12 bg-white/10 rounded-full blur-xl"></div>
//                   </div>
//                   <div className="relative z-10 space-y-2">
//                     <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm border border-white/30">
//                       <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
//                       </svg>
//                     </div>
//                     <div>
//                       <h2 className="text-2xl font-black text-white mb-1">Welcome Back!</h2>
//                       <p className="text-white/90">Access your educational dashboard</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Form Content - Original Functionality Preserved */}
//                 <div className="p-4 lg:p-6 space-y-4">
//                   {/* Original Error Alert */}
//                   {error && <ErrorAlert message={error} />}

//                   {/* Original Form with Enhanced Styling */}
//                   <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//                     <div className="rounded-md shadow-sm space-y-4">
//                       <div>
//                         <label htmlFor="email" className="sr-only">
//                           Email address
//                         </label>
//                         <input
//                           id="email"
//                           name="email"
//                           type="email"
//                           autoComplete="email"
//                           required
//                           className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm hover:border-gray-400 transition-colors duration-200"
//                           placeholder="Email address"
//                           value={email}
//                           onChange={(e) => setEmail(e.target.value)}
//                         />
//                       </div>
//                       <div>
//                         <label htmlFor="password" className="sr-only">
//                           Password
//                         </label>
//                         <input
//                           id="password"
//                           name="password"
//                           type="password"
//                           autoComplete="current-password"
//                           required
//                           className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm hover:border-gray-400 transition-colors duration-200"
//                           placeholder="Password"
//                           value={password}
//                           onChange={(e) => setPassword(e.target.value)}
//                         />
//                       </div>
//                     </div>

//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center">
//                         <input
//                           id="remember-me"
//                           name="remember-me"
//                           type="checkbox"
//                           className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
//                         />
//                         <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
//                           Remember me
//                         </label>
//                       </div>

//                       <div className="text-sm">
//                         <Link href="/forgot-password" className="font-medium text-blue-600 hover:text-green-600 transition-colors duration-200">
//                           Forgot your password?
//                         </Link>
//                       </div>
//                     </div>

//                     <div>
//                       <button
//                         type="submit"
//                         className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200 transform hover:scale-[1.02]"
//                         disabled={loading}
//                       >
//                         {loading ? <LoadingSpinner size="small" /> : 'Sign in'}
//                       </button>
//                     </div>
//                   </form>

//                   {/* Original Register Link */}
//                   <div className="text-center text-sm text-gray-600">
//                     Don't have an account?{' '}
//                     <Link href="/register-owner" className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200">
//                       Register as owner
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;





// import { useState, useEffect } from "react";
// import { useRouter } from "next/router";
// import { useAuth } from "../../contexts/AuthContext";
// import Link from "next/link";
// import LoadingSpinner from "../common/LoadingSpinner";
// import ErrorAlert from "../common/ErrorAlert";

// const LoginForm = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [emailFocused, setEmailFocused] = useState(false);
//   const [passwordFocused, setPasswordFocused] = useState(false);
//   const [isClient, setIsClient] = useState(false); // Track client-side rendering
//   const [isMobile, setIsMobile] = useState(false); // Track mobile view
//   const { login } = useAuth();
//   const router = useRouter();

//   // Detect client-side rendering and screen size
//   useEffect(() => {
//     setIsClient(true); // Set to true once component mounts on client
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     handleResize(); // Initial check
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     const result = await login(email, password);
//     setLoading(false);

//     if (!result.success) {
//       setError(result.message);
//     }
//   };

//   return (
//     <div className="min-h-screen w-full relative overflow-hidden">
//       {/* Ultra Modern Animated Background - Responsive Adjustments */}
//       <div className="absolute inset-0">
//         {/* Base Gradient with Animation */}
//         <div className="absolute inset-0 bg-gradient-to-br bg-blue-400 animate-gradient-x"></div>

//         {/* Animated Mesh Gradient Overlay - Reduced on Mobile */}
//         <div className="absolute inset-0 opacity-70">
//           {!isMobile && (
//             <>
//               <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-transparent to-cyan-600/30 animate-pulse"></div>
//               <div
//                 className="absolute inset-0 bg-gradient-to-l from-purple-600/20 via-transparent to-pink-600/20 animate-pulse"
//                 style={{ animationDelay: "1s" }}
//               ></div>
//             </>
//           )}
//         </div>

//         {/* Floating Geometric Shapes - Fewer on Mobile */}
//         {isClient && (
//           <div className="absolute inset-0">
//             {[...Array(isMobile ? 10 : 20)].map((_, i) => (
//               <div
//                 key={i}
//                 className={`absolute rounded-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm animate-float-${
//                   (i % 4) + 1
//                 }`}
//                 style={{
//                   left: `${Math.random() * 100}%`,
//                   top: `${Math.random() * 100}%`,
//                   width: `${isMobile ? 10 + Math.random() * 30 : 20 + Math.random() * 60}px`,
//                   height: `${isMobile ? 10 + Math.random() * 30 : 20 + Math.random() * 60}px`,
//                   animationDelay: `${Math.random() * 5}s`,
//                   animationDuration: `${4 + Math.random() * 4}s`,
//                 }}
//               />
//             ))}
//           </div>
//         )}

//         {/* Dynamic Grid Pattern - Lighter on Mobile */}
//         <div className="absolute inset-0 opacity-5 md:opacity-10">
//           <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
//             <defs>
//               <pattern
//                 id="grid"
//                 width="50"
//                 height="50"
//                 patternUnits="userSpaceOnUse"
//               >
//                 <path
//                   d="M 50 0 L 0 0 0 50"
//                   fill="none"
//                   stroke="white"
//                   strokeWidth="1"
//                   className="animate-pulse"
//                 />
//               </pattern>
//             </defs>
//             <rect width="100%" height="100%" fill="url(#grid)" />
//           </svg>
//         </div>

//         {/* Glowing Orbs - Smaller and Fewer on Mobile */}
//         <div className="absolute top-20 left-20 w-48 h-48 md:w-96 md:h-96 bg-gradient-to-r from-cyan-400/20 to-blue-600/20 rounded-full blur-xl md:blur-3xl animate-slow-spin"></div>
//         <div className="absolute bottom-20 right-20 w-40 h-40 md:w-80 md:h-80 bg-gradient-to-r from-purple-400/20 to-pink-600/20 rounded-full blur-xl md:blur-3xl animate-reverse-spin"></div>
//         {!isMobile && isClient && (
//           <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-r from-yellow-400/15 to-orange-600/15 rounded-full blur-3xl animate-bounce-slow"></div>
//         )}

//         {/* Particle System - Fewer on Mobile */}
//         {isClient && (
//           <div className="absolute inset-0">
//             {[...Array(isMobile ? 15 : 30)].map((_, i) => (
//               <div
//                 key={i}
//                 className="absolute w-1 h-1 bg-white rounded-full opacity-40 animate-twinkle"
//                 style={{
//                   left: `${Math.random() * 100}%`,
//                   top: `${Math.random() * 100}%`,
//                   animationDelay: `${Math.random() * 3}s`,
//                   animationDuration: `${1 + Math.random() * 2}s`,
//                 }}
//               />
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Main Content - Responsive Layout */}
//       <div className="relative z-10 min-h-screen flex items-center justify-center p-4 sm:p-6">
//         <div className="w-full max-w-7xl mx-auto">
//           <div className="flex flex-col lg:grid lg:grid-cols-5 gap-6 lg:gap-8 items-center h-full">
//             {/* Left Side - Responsive Branding */}
//             <div className="lg:col-span-3 text-white space-y-6 md:space-y-8 px-4 lg:px-6 animate-slide-in-left">
//               {/* Main Logo & Brand with Responsive Adjustments */}
//               <div className="space-y-4 md:space-y-6">
//                 <div className="flex items-center space-x-4 md:space-x-6 group">
//                   <div className="relative">
//                     <div className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32">
//                       <img
//                         src="/images/skoolvriksh-logo.jpg"
//                         alt="Company Logo"
//                         className="w-full h-full object-contain p-1 md:p-2"
//                       />
//                     </div>

//                     {/* Glowing Ring - Smaller on Mobile */}
//                     <div className="absolute inset-0 w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 border-2 border-white/30 rounded-3xl animate-spin-slow"></div>
//                   </div>
//                   <div className="space-y-1 md:space-y-2">
//                     <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-black bg-gradient-to-r from-gray-900 via-black to-gray-500 bg-clip-text text-transparent leading-tight animate-text-shimmer">
//                       SkoolVriksh
//                     </h1>
//                     <p
//                       className="text-sm sm:text-base md:text-xl lg:text-2xl text-orange-600 font-semibold tracking-wide animate-fade-in-up"
//                       style={{ animationDelay: "0.2s" }}
//                     >
//                       School Management Excellence
//                     </p>
//                     <div className="w-20 md:w-32 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-expand"></div>
//                   </div>
//                 </div>

//                 <div
//                   className="space-y-2 md:space-y-4 animate-fade-in-up"
//                   style={{ animationDelay: "0.4s" }}
//                 >
//                   <h4 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-gradient-to-r from-gray-800 to-gray-700 bg-clip-text leading-tight">
//                     Transform Your Educational Institution
//                   </h4>
//                 </div>
//               </div>

//               {/* Enhanced Features Grid - Responsive Columns */}
//               <div
//                 className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 animate-fade-in-up"
//                 style={{ animationDelay: "0.6s" }}
//               >
//                 {[
//                   {
//                     icon: "🎓",
//                     title: "Smart Student Management",
//                     desc: "AI-powered academic tracking and personalized learning paths with predictive analytics.",
//                     color: "from-orange-400 to-orange-600",
//                   },
//                   {
//                     icon: "📚",
//                     title: "Dynamic Course Planning",
//                     desc: "Intelligent curriculum design with automated timetabling and resource optimization.",
//                     color: "from-orange-400 to-orange-500",
//                   },
//                 ].map((feature, index) => (
//                   <div
//                     key={index}
//                     className={`group p-4 md:p-6 bg-white/10 backdrop-blur-lg rounded-xl md:rounded-2xl border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-500 ${
//                       !isMobile ? "hover:transform hover:scale-105 hover:-translate-y-2" : ""
//                     } animate-fade-in-up`}
//                     style={{ animationDelay: `${0.8 + index * 0.1}s` }}
//                   >
//                     <div className="flex items-start space-x-3 md:space-x-4">
//                       <div
//                         className={`text-2xl md:text-3xl w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br ${
//                           feature.color
//                         } rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg ${
//                           !isMobile
//                             ? "group-hover:shadow-2xl transition-all duration-500 group-hover:rotate-12 group-hover:scale-110"
//                             : ""
//                         }`}
//                       >
//                         <span className="animate-bounce-gentle">
//                           {feature.icon}
//                         </span>
//                       </div>
//                       <div className="flex-1 space-y-1 md:space-y-2">
//                         <h3 className="text-base md:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">
//                           {feature.title}
//                         </h3>
//                         <p className="text-gray-300 text-xs md:text-sm leading-relaxed group-hover:text-white transition-colors duration-300">
//                           {feature.desc}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Enhanced Stats - Responsive Grid */}
//               <div
//                 className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-4 animate-fade-in-up"
//                 style={{ animationDelay: "1.2s" }}
//               >
//                 {[
//                   { num: "250K+", label: "Students", icon: "👨‍🎓" },
//                   { num: "15K+", label: "Teachers", icon: "👩‍🏫" },
//                   { num: "1.2K+", label: "Schools", icon: "🏫" },
//                   { num: "98%", label: "Satisfaction", icon: "⭐" },
//                 ].map((stat, index) => (
//                   <div
//                     key={index}
//                     className={`text-center p-2 md:p-4 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-lg rounded-xl md:rounded-2xl border border-white/20 hover:from-white/25 hover:to-white/15 transition-all duration-500 ${
//                       !isMobile
//                         ? "group hover:transform hover:scale-110 hover:-translate-y-1"
//                         : ""
//                     } animate-fade-in-up`}
//                     style={{ animationDelay: `${1.4 + index * 0.1}s` }}
//                   >
//                     <div
//                       className={`text-xl md:text-2xl mb-1 md:mb-2 ${
//                         !isMobile
//                           ? "group-hover:scale-125 transition-transform duration-300 animate-bounce-gentle"
//                           : ""
//                       }`}
//                       style={{ animationDelay: `${index * 0.2}s` }}
//                     >
//                       {stat.icon}
//                     </div>
//                     <div className="text-xl md:text-2xl lg:text-3xl font-black text-transparent bg-gradient-to-r bg-white bg-clip-text mb-0 md:mb-1">
//                       {stat.num}
//                     </div>
//                     <div className="text-white text-xs font-medium">
//                       {stat.label}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Right Side - Responsive Login Form */}
//             <div className="lg:col-span-2 w-full max-w-md mx-auto animate-slide-in-right">
//               {/* Mobile Logo - Always Visible */}
//               <div className="lg:hidden text-center mb-4 sm:mb-6 animate-fade-in-up">
//                 <div className="inline-flex items-center space-x-2 sm:space-x-4">
//                   <div className="relative">
//                     <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/10 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl animate-pulse-slow overflow-hidden">
//                       <img
//                         src="/images/logo.png"
//                         alt="Company Logo"
//                         className="w-full h-full object-contain p-1 sm:p-2"
//                       />
//                     </div>
//                     <div className="absolute inset-0 w-12 h-12 sm:w-14 sm:h-14 border-2 border-white/30 rounded-xl sm:rounded-2xl animate-spin-slow"></div>
//                   </div>
//                   <div>
//                     <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-gradient-to-r from-white to-cyan-300 bg-clip-text">
//                       SkoolVriksh
//                     </h1>
//                     <p className="text-orange-200 text-xs sm:text-sm">
//                       School Management
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Ultra Modern Login Card - Responsive Adjustments */}
//               <div className="relative group">
//                 {/* Glowing Border Effect - Reduced on Mobile */}
//                 <div className="absolute -inset-0.5 sm:-inset-1 bg-gradient-to-r bg-blue-500 rounded-2xl sm:rounded-3xl blur opacity-25 group-hover:opacity-40 animate-gradient-x transition-opacity duration-500"></div>

//                 <div
//                   className={`relative bg-white/95 backdrop-blur-xl sm:backdrop-blur-2xl rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-2xl border border-white/30 overflow-hidden ${
//                     !isMobile ? "transform hover:scale-[1.02] transition-all duration-700" : ""
//                   } animate-fade-in-up`}
//                   style={{ animationDelay: "0.5s" }}
//                 >
//                   {/* Enhanced Card Header - Responsive Padding */}
//                   <div className="relative p-4 sm:p-6 lg:p-8 bg-gradient-to-br bg-blue-400 text-center overflow-hidden">
//                     {/* Animated Background Elements - Reduced on Mobile */}
//                     <div className="absolute inset-0">
//                       {!isMobile && (
//                         <>
//                           <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
//                           <div
//                             className="absolute bottom-4 left-4 w-16 h-16 bg-white/10 rounded-full blur-2xl animate-pulse"
//                             style={{ animationDelay: "1s" }}
//                           ></div>
//                           <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/5 rounded-full blur-3xl animate-spin-slow"></div>
//                         </>
//                       )}
//                     </div>
                    
                  
//                     <div className="relative z-10 space-y-2 sm:space-y-4">
//                       <div className="relative group">
//                         <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm border border-white/30 group-hover:scale-110 transition-transform duration-500 animate-bounce-gentle">
//                           <svg
//                             className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
//                             />
//                           </svg>
//                         </div>
//                         {!isMobile && (
//                           <div className="absolute inset-0 w-20 h-20 border-2 border-white/20 rounded-full animate-ping mx-auto"></div>
//                         )}
//                       </div>
//                       <div
//                         className="animate-fade-in-up"
//                         style={{ animationDelay: "0.7s" }}
//                       >
//                         <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-1 sm:mb-2">
//                           Welcome Back!
//                         </h2>
//                         <p className="text-white/90 text-sm sm:text-base md:text-lg">
//                           Access your educational dashboard
//                         </p>
//                       </div>
//                     </div>
//                   </div>
                

              


//                   {/* Enhanced Form Content - Responsive Padding */}
//                   <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
//                     {/* Original Error Alert with Animation */}
//                     {error && (
//                       <div className="animate-shake">
//                         <ErrorAlert message={error} />
//                       </div>
//                     )}

//                     {/* Ultra Modern Form - Responsive Inputs */}
//                     <form
//                       className="space-y-4 sm:space-y-6"
//                       onSubmit={handleSubmit}
//                     >
//                       <div className="space-y-4 sm:space-y-6">
//                         {/* Email Input with Responsive Design */}
//                         <div className="relative group">
//                           <div
//                             className={`absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl sm:rounded-2xl blur-sm opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${
//                               emailFocused ? "opacity-30" : ""
//                             }`}
//                           ></div>
//                           <div className="relative">
//                             <input
//                               id="email"
//                               name="email"
//                               type="email"
//                               autoComplete="email"
//                               required
//                               className={`w-full px-4 py-3 sm:px-6 sm:py-4 bg-gray-50/50 backdrop-blur-sm border-2 rounded-xl sm:rounded-2xl text-gray-900 placeholder-gray-500 transition-all duration-300 focus:outline-none focus:bg-white focus:shadow-lg hover:bg-gray-50 ${
//                                 emailFocused
//                                   ? "border-cyan-400 shadow-lg shadow-cyan-400/25"
//                                   : "border-gray-200"
//                               }`}
//                               placeholder="Email address"
//                               value={email}
//                               onChange={(e) => setEmail(e.target.value)}
//                               onFocus={() => setEmailFocused(true)}
//                               onBlur={() => setEmailFocused(false)}
//                             />
//                             {/* Animated Icon */}
//                             <div
//                               className={`absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${
//                                 emailFocused
//                                   ? "text-cyan-500 scale-110"
//                                   : "text-gray-400"
//                               }`}
//                             >
//                               <svg
//                                 className="w-5 h-5 sm:w-6 sm:h-6"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 viewBox="0 0 24 24"
//                               >
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   strokeWidth={2}
//                                   d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a<|control455|> 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
//                                 />
//                               </svg>
//                             </div>
//                           </div>
//                         </div>

//                         {/* Password Input with Responsive Design */}
//                         <div className="relative group">
//                           <div
//                             className={`absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl sm:rounded-2xl blur-sm opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${
//                               passwordFocused ? "opacity-30" : ""
//                             }`}
//                           ></div>
//                           <div className="relative">
//                             <input
//                               id="password"
//                               name="password"
//                               type="password"
//                               autoComplete="current-password"
//                               required
//                               className={`w-full px-4 py-3 sm:px-6 sm:py-4 bg-gray-50/50 backdrop-blur-sm border-2 rounded-xl sm:rounded-2xl text-gray-900 placeholder-gray-500 transition-all duration-300 focus:outline-none focus:bg-white focus:shadow-lg hover:bg-gray-50 ${
//                                 passwordFocused
//                                   ? "border-purple-400 shadow-lg shadow-purple-400/25"
//                                   : "border-gray-200"
//                               }`}
//                               placeholder="Password"
//                               value={password}
//                               onChange={(e) => setPassword(e.target.value)}
//                               onFocus={() => setPasswordFocused(true)}
//                               onBlur={() => setPasswordFocused(false)}
//                             />
//                             {/* Animated Icon */}
//                             <div
//                               className={`absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${
//                                 passwordFocused
//                                   ? "text-purple-500 scale-110"
//                                   : "text-gray-400"
//                               }`}
//                             >
//                               <svg
//                                 className="w-5 h-5 sm:w-6 sm:h-6"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 viewBox="0 0 24 24"
//                               >
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   strokeWidth={2}
//                                   d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
//                                 />
//                               </svg>
//                             </div>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Enhanced Options - Responsive Layout */}
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center group">
//                           <input
//                             id="remember-me"
//                             name="remember-me"
//                             type="checkbox"
//                             className="h-4 w-4 sm:h-5 sm:w-5 text-gradient-to-r from-cyan-500 to-blue-500 focus:ring-cyan-500 border-gray-300 rounded transition-all duration-200 hover:scale-110"
//                           />
//                           <label
//                             htmlFor="remember-me"
//                             className="ml-2 block text-xs sm:text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-200"
//                           >
//                             Remember me
//                           </label>
//                         </div>

//                         <div className="text-xs sm:text-sm">
//                           <Link
//                             href="/forgot-password"
//                             className="font-medium text-transparent bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 inline-block"
//                           >
//                             Forgot password?
//                           </Link>
//                         </div>
//                       </div>

//                       {/* Ultra Modern Submit Button - Responsive */}
//                       <div className="relative group">
//                         <div className="absolute -inset-0.5 sm:-inset-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-xl sm:rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300 animate-gradient-x"></div>
//                         <button
//                           type="submit"
//                           className={`relative w-full flex justify-center items-center py-3 px-4 sm:py-4 sm:px-6 border border-transparent text-base sm:text-lg font-bold rounded-xl sm:rounded-2xl text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-600 hover:via-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-cyan-500/50 transition-all duration-300 ${
//                             !isMobile
//                               ? "transform hover:scale-[1.02] hover:-translate-y-1"
//                               : ""
//                           } disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none shadow-md hover:shadow-lg sm:shadow-lg sm:hover:shadow-2xl`}
//                           disabled={loading}
//                         >
//                           {loading ? (
//                             <div className="flex items-center space-x-2 sm:space-x-3">
//                               <LoadingSpinner size="small" />
//                               <span>Signing in...</span>
//                             </div>
//                           ) : (
//                             <div className="flex items-center space-x-2 sm:space-x-3">
//                               <span>Sign in</span>
//                               <svg
//                                 className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform duration-300"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 viewBox="0 0 24 24"
//                               >
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   strokeWidth={2}
//                                   d="M13 7l5 5m0 0l-5 5m5-5H6"
//                                 />
//                               </svg>
//                             </div>
//                           )}
//                         </button>
//                       </div>
//                     </form>

//                     {/* Enhanced Register Link - Responsive Text */}
//                     <div className="text-center text-xs sm:text-sm text-gray-600">
//                       <span>Don't have an account? </span>
//                       <Link
//                         href="/register-owner"
//                         className="font-medium text-transparent bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 inline-block"
//                       >
//                         Register as owner
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Custom CSS for Advanced Animations - Responsive Adjustments */}
//       <style jsx>{`
//         @keyframes gradient-x {
//           0%,
//           100% {
//             background-position: 0% 50%;
//           }
//           50% {
//             background-position: 100% 50%;
//           }
//         }

//         @keyframes float-1 {
//           0%,
//           100% {
//             transform: translate(0, 0) rotate(0deg);
//           }
//           33% {
//             transform: translate(30px, -30px) rotate(120deg);
//           }
//           66% {
//             transform: translate(-20px, 20px) rotate(240deg);
//           }
//         }

//         @keyframes float-2 {
//           0%,
//           100% {
//             transform: translate(0, 0) rotate(0deg);
//           }
//           33% {
//             transform: translate(-30px, -20px) rotate(120deg);
//           }
//           66% {
//             transform: translate(20px, 30px) rotate(240deg);
//           }
//         }

//         @keyframes float-3 {
//           0%,
//           100% {
//             transform: translate(0, 0) rotate(0deg);
//           }
//           33% {
//             transform: translate(25px, 25px) rotate(120deg);
//           }
//           66% {
//             transform: translate(-25px, -15px) rotate(240deg);
//           }
//         }

//         @keyframes float-4 {
//           0%,
//           100% {
//             transform: translate(0, 0) rotate(0deg);
//           }
//           33% {
//             transform: translate(-25px, 15px) rotate(120deg);
//           }
//           66% {
//             transform: translate(15px, -25px) rotate(240deg);
//           }
//         }

//         @keyframes slow-spin {
//           from {
//             transform: rotate(0deg);
//           }
//           to {
//             transform: rotate(360deg);
//           }
//         }

//         @keyframes reverse-spin {
//           from {
//             transform: rotate(360deg);
//           }
//           to {
//             transform: rotate(0deg);
//           }
//         }

//         @keyframes bounce-slow {
//           0%,
//           100% {
//             transform: translateY(0);
//           }
//           50% {
//             transform: translateY(-20px);
//           }
//         }

//         @keyframes bounce-gentle {
//           0%,
//           100% {
//             transform: translateY(0);
//           }
//           50% {
//             transform: translateY(-5px);
//           }
//         }

//         @keyframes pulse-slow {
//           0%,
//           100% {
//             opacity: 1;
//           }
//           50% {
//             opacity: 0.7;
//           }
//         }

//         @keyframes text-shimmer {
//           0% {
//             background-position: -200% center;
//           }
//           100% {
//             background-position: 200% center;
//           }
//         }

//         @keyframes twinkle {
//           0%,
//           100% {
//             opacity: 0.4;
//             transform: scale(1);
//           }
//           50% {
//             opacity: 1;
//             transform: scale(1.2);
//           }
//         }

//         @keyframes slide-in-left {
//           0% {
//             transform: translateX(-100px);
//             opacity: 0;
//           }
//           100% {
//             transform: translateX(0);
//             opacity: 1;
//           }
//         }

//         @keyframes slide-in-right {
//           0% {
//             transform: translateX(100px);
//             opacity: 0;
//           }
//           100% {
//             transform: translateX(0);
//             opacity: 1;
//           }
//         }

//         @keyframes fade-in-up {
//           0% {
//             transform: translateY(30px);
//             opacity: 0;
//           }
//           100% {
//             transform: translateY(0);
//             opacity: 1;
//           }
//         }

//         @keyframes expand {
//           0% {
//             width: 0;
//           }
//           100% {
//             width: 5rem;
//           }
//         }

//         @keyframes shake {
//           0%,
//           100% {
//             transform: translateX(0);
//           }
//           25% {
//             transform: translateX(-5px);
//           }
//           75% {
//             transform: translateX(5px);
//           }
//         }

//         @keyframes spin-slow {
//           from {
//             transform: rotate(0deg);
//           }
//           to {
//             transform: rotate(360deg);
//           }
//         }

//         .animate-gradient-x {
//           animation: gradient-x 15s ease infinite;
//           background-size: 200% 200%;
//         }
//         .animate-float-1 {
//           animation: float-1 6s ease-in-out infinite;
//         }
//         .animate-float-2 {
//           animation: float-2 8s ease-in-out infinite;
//         }
//         .animate-float-3 {
//           animation: float-3 7s ease-in-out infinite;
//         }
//         .animate-float-4 {
//           animation: float-4 9s ease-in-out infinite;
//         }
//         .animate-slow-spin {
//           animation: slow-spin 20s linear infinite;
//         }
//         .animate-reverse-spin {
//           animation: reverse-spin 25s linear infinite;
//         }
//         .animate-bounce-slow {
//           animation: bounce-slow 3s ease-in-out infinite;
//         }
//         .animate-bounce-gentle {
//           animation: bounce-gentle 2s ease-in-out infinite;
//         }
//         .animate-pulse-slow {
//           animation: pulse-slow 4s ease-in-out infinite;
//         }
//         .animate-text-shimmer {
//           animation: text-shimmer 3s ease-in-out infinite;
//           background-size: 200% auto;
//         }
//         .animate-twinkle {
//           animation: twinkle 2s ease-in-out infinite;
//         }
//         .animate-slide-in-left {
//           animation: slide-in-left 0.8s ease-out forwards;
//         }
//         .animate-slide-in-right {
//           animation: slide-in-right 0.8s ease-out forwards;
//         }
//         .animate-fade-in-up {
//           animation: fade-in-up 0.6s ease-out forwards;
//         }
//         .animate-expand {
//           animation: expand 1s ease-out forwards;
//         }
//         .animate-shake {
//           animation: shake 0.6s ease-in-out;
//         }
//         .animate-spin-slow {
//           animation: spin-slow 8s linear infinite;
//         }

//         /* Responsive animations */
//         @media (max-width: 768px) {
//           .animate-slide-in-left,
//           .animate-slide-in-right {
//             animation: fade-in-up 0.6s ease-out forwards;
//           }

//           .animate-expand {
//             animation: none;
//             width: 5rem;
//           }

//           .animate-text-shimmer {
//             animation: none;
//             background-position: center;
//           }
//         }

//         /* Hover effects - only on larger screens */
//         @media (min-width: 768px) {
//           .group:hover .animate-bounce-gentle {
//             animation-duration: 0.8s;
//           }
//         }

//         /* Reduced motion for accessibility */
//         @media (prefers-reduced-motion: reduce) {
//           * {
//             animation-duration: 0.01ms !important;
//             animation-iteration-count: 1 !important;
//             transition-duration: 0.01ms !important;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default LoginForm;





import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../contexts/AuthContext";
import Link from "next/link";
import LoadingSpinner from "../common/LoadingSpinner";
import ErrorAlert from "../common/ErrorAlert";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [isClient, setIsClient] = useState(false); // Track client-side rendering
  const [isMobile, setIsMobile] = useState(false); // Track mobile view
  const { login } = useAuth();
  const router = useRouter();

  // Detect client-side rendering and screen size
  useEffect(() => {
    setIsClient(true); // Set to true once component mounts on client
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await login(email, password);
    setLoading(false);

    if (!result.success) {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Ultra Modern Animated Background - Responsive Adjustments */}
      <div className="absolute inset-0">
        {/* Base Gradient with Animation */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 animate-gradient-x"></div>

        {/* Animated Mesh Gradient Overlay - Reduced on Mobile */}
        <div className="absolute inset-0 opacity-70">
          {!isMobile && (
            <>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-transparent to-cyan-600/30 animate-pulse"></div>
              <div
                className="absolute inset-0 bg-gradient-to-l from-purple-600/20 via-transparent to-pink-600/20 animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
            </>
          )}
        </div>

        {/* Floating Geometric Shapes - Fewer on Mobile */}
        {isClient && (
          <div className="absolute inset-0">
            {[...Array(isMobile ? 10 : 20)].map((_, i) => (
              <div
                key={i}
                className={`absolute rounded-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm animate-float-${
                  (i % 4) + 1
                }`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${isMobile ? 10 + Math.random() * 30 : 20 + Math.random() * 60}px`,
                  height: `${isMobile ? 10 + Math.random() * 30 : 20 + Math.random() * 60}px`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${4 + Math.random() * 4}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Dynamic Grid Pattern - Lighter on Mobile */}
        <div className="absolute inset-0 opacity-5 md:opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="grid"
                width="50"
                height="50"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 50 0 L 0 0 0 50"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                  className="animate-pulse"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Glowing Orbs - Smaller and Fewer on Mobile */}
        <div className="absolute top-20 left-20 w-48 h-48 md:w-96 md:h-96 bg-gradient-to-r from-cyan-400/20 to-blue-600/20 rounded-full blur-xl md:blur-3xl animate-slow-spin"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 md:w-80 md:h-80 bg-gradient-to-r from-purple-400/20 to-pink-600/20 rounded-full blur-xl md:blur-3xl animate-reverse-spin"></div>
        {!isMobile && isClient && (
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-r from-yellow-400/15 to-orange-600/15 rounded-full blur-3xl animate-bounce-slow"></div>
        )}

        {/* Particle System - Fewer on Mobile */}
        {isClient && (
          <div className="absolute inset-0">
            {[...Array(isMobile ? 15 : 30)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full opacity-40 animate-twinkle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${1 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Main Content - Responsive Layout */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex flex-col lg:grid lg:grid-cols-5 gap-6 lg:gap-8 items-center h-full">
            {/* Left Side - Responsive Branding */}
            <div className="lg:col-span-3 text-white space-y-6 md:space-y-8 px-4 lg:px-6 animate-slide-in-left">
              {/* Main Logo & Brand with Responsive Adjustments */}
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-center space-x-4 md:space-x-6 group">
                  <div className="relative">
                    <div className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32">
                      <img
                        src="/images/skoolvriksh-logo.jpg"
                        alt="Company Logo"
                        className="w-full h-full object-contain p-1 md:p-2"
                      />
                    </div>

                    {/* Glowing Ring - Smaller on Mobile */}
                    <div className="absolute inset-0 w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 border-2 border-white/30 rounded-3xl animate-spin-slow"></div>
                  </div>
                  <div className="space-y-1 md:space-y-2">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-black bg-gradient-to-r from-white via-yellow-200 to-orange-200 bg-clip-text text-transparent leading-tight animate-text-shimmer">
                      SkoolVriksh
                    </h1>
                    <p
                      className="text-sm sm:text-base md:text-xl lg:text-2xl text-orange-200 font-semibold tracking-wide animate-fade-in-up"
                      style={{ animationDelay: "0.2s" }}
                    >
                      School Management Excellence
                    </p>
                    <div className="w-20 md:w-32 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-expand"></div>
                  </div>
                </div>

                <div
                  className="space-y-2 md:space-y-4 animate-fade-in-up"
                  style={{ animationDelay: "0.4s" }}
                >
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text leading-tight">
                    Transform Your Educational Institution
                  </h3>
                </div>
              </div>

              {/* Enhanced Features Grid - Responsive Columns */}
              <div
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 animate-fade-in-up"
                style={{ animationDelay: "0.6s" }}
              >
                {[
                  {
                    icon: "🎓",
                    title: "Smart Student Management",
                    desc: "AI-powered academic tracking and personalized learning paths with predictive analytics.",
                    color: "from-blue-400 to-purple-600",
                  },
                  {
                    icon: "📚",
                    title: "Dynamic Course Planning",
                    desc: "Intelligent curriculum design with automated timetabling and resource optimization.",
                    color: "from-green-400 to-blue-500",
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className={`group p-4 md:p-6 bg-white/10 backdrop-blur-lg rounded-xl md:rounded-2xl border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-500 ${
                      !isMobile ? "hover:transform hover:scale-105 hover:-translate-y-2" : ""
                    } animate-fade-in-up`}
                    style={{ animationDelay: `${0.8 + index * 0.1}s` }}
                  >
                    <div className="flex items-start space-x-3 md:space-x-4">
                      <div
                        className={`text-2xl md:text-3xl w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br ${
                          feature.color
                        } rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg ${
                          !isMobile
                            ? "group-hover:shadow-2xl transition-all duration-500 group-hover:rotate-12 group-hover:scale-110"
                            : ""
                        }`}
                      >
                        <span className="animate-bounce-gentle">
                          {feature.icon}
                        </span>
                      </div>
                      <div className="flex-1 space-y-1 md:space-y-2">
                        <h3 className="text-base md:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">
                          {feature.title}
                        </h3>
                        <p className="text-gray-300 text-xs md:text-sm leading-relaxed group-hover:text-white transition-colors duration-300">
                          {feature.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Enhanced Stats - Responsive Grid */}
              <div
                className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-4 animate-fade-in-up"
                style={{ animationDelay: "1.2s" }}
              >
                {[
                  { num: "250K+", label: "Students", icon: "👨‍🎓" },
                  { num: "15K+", label: "Teachers", icon: "👩‍🏫" },
                  { num: "1.2K+", label: "Schools", icon: "🏫" },
                  { num: "98%", label: "Satisfaction", icon: "⭐" },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className={`text-center p-2 md:p-4 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-lg rounded-xl md:rounded-2xl border border-white/20 hover:from-white/25 hover:to-white/15 transition-all duration-500 ${
                      !isMobile
                        ? "group hover:transform hover:scale-110 hover:-translate-y-1"
                        : ""
                    } animate-fade-in-up`}
                    style={{ animationDelay: `${1.4 + index * 0.1}s` }}
                  >
                    <div
                      className={`text-xl md:text-2xl mb-1 md:mb-2 ${
                        !isMobile
                          ? "group-hover:scale-125 transition-transform duration-300 animate-bounce-gentle"
                          : ""
                      }`}
                      style={{ animationDelay: `${index * 0.2}s` }}
                    >
                      {stat.icon}
                    </div>
                    <div className="text-xl md:text-2xl lg:text-3xl font-black text-transparent bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text mb-0 md:mb-1">
                      {stat.num}
                    </div>
                    <div className="text-gray-300 text-xs font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Responsive Login Form */}
            <div className="lg:col-span-2 w-full max-w-md mx-auto animate-slide-in-right">
              {/* Mobile Logo - Always Visible */}
              <div className="lg:hidden text-center mb-4 sm:mb-6 animate-fade-in-up">
                <div className="inline-flex items-center space-x-2 sm:space-x-4">
                  <div className="relative">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/10 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl animate-pulse-slow overflow-hidden">
                      <img
                        src="/images/logo.png"
                        alt="Company Logo"
                        className="w-full h-full object-contain p-1 sm:p-2"
                      />
                    </div>
                    <div className="absolute inset-0 w-12 h-12 sm:w-14 sm:h-14 border-2 border-white/30 rounded-xl sm:rounded-2xl animate-spin-slow"></div>
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-gradient-to-r from-white to-cyan-300 bg-clip-text">
                      SkoolVriksh
                    </h1>
                    <p className="text-orange-200 text-xs sm:text-sm">
                      School Management
                    </p>
                  </div>
                </div>
              </div>

              {/* Ultra Modern Login Card - Responsive Adjustments */}
              <div className="relative group">
                {/* Glowing Border Effect - Reduced on Mobile */}
                <div className="absolute -inset-0.5 sm:-inset-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-2xl sm:rounded-3xl blur opacity-25 group-hover:opacity-40 animate-gradient-x transition-opacity duration-500"></div>

                <div
                  className={`relative bg-white/95 backdrop-blur-xl sm:backdrop-blur-2xl rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-2xl border border-white/30 overflow-hidden ${
                    !isMobile ? "transform hover:scale-[1.02] transition-all duration-700" : ""
                  } animate-fade-in-up`}
                  style={{ animationDelay: "0.5s" }}
                >
                  {/* Enhanced Card Header - Responsive Padding */}
                  <div className="relative p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-center overflow-hidden">
                    {/* Animated Background Elements - Reduced on Mobile */}
                    <div className="absolute inset-0">
                      {!isMobile && (
                        <>
                          <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
                          <div
                            className="absolute bottom-4 left-4 w-16 h-16 bg-white/10 rounded-full blur-2xl animate-pulse"
                            style={{ animationDelay: "1s" }}
                          ></div>
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/5 rounded-full blur-3xl animate-spin-slow"></div>
                        </>
                      )}
                    </div>

                    <div className="relative z-10 space-y-2 sm:space-y-4">
                      <div className="relative group">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm border border-white/30 group-hover:scale-110 transition-transform duration-500 animate-bounce-gentle">
                          <svg
                            className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                            />
                          </svg>
                        </div>
                        {!isMobile && (
                          <div className="absolute inset-0 w-20 h-20 border-2 border-white/20 rounded-full animate-ping mx-auto"></div>
                        )}
                      </div>
                      <div
                        className="animate-fade-in-up"
                        style={{ animationDelay: "0.7s" }}
                      >
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-1 sm:mb-2">
                          Welcome Back!
                        </h2>
                        <p className="text-white/90 text-sm sm:text-base md:text-lg">
                          Access your educational dashboard
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Form Content - Responsive Padding */}
                  <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
                    {/* Original Error Alert with Animation */}
                    {error && (
                      <div className="animate-shake">
                        <ErrorAlert message={error} />
                      </div>
                    )}

                    {/* Ultra Modern Form - Responsive Inputs */}
                    <form
                      className="space-y-4 sm:space-y-6"
                      onSubmit={handleSubmit}
                    >
                      <div className="space-y-4 sm:space-y-6">
                        {/* Email Input with Responsive Design */}
                        <div className="relative group">
                          <div
                            className={`absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl sm:rounded-2xl blur-sm opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${
                              emailFocused ? "opacity-30" : ""
                            }`}
                          ></div>
                          <div className="relative">
                            <input
                              id="email"
                              name="email"
                              type="email"
                              autoComplete="email"
                              required
                              className={`w-full px-4 py-3 sm:px-6 sm:py-4 bg-gray-50/50 backdrop-blur-sm border-2 rounded-xl sm:rounded-2xl text-gray-900 placeholder-gray-500 transition-all duration-300 focus:outline-none focus:bg-white focus:shadow-lg hover:bg-gray-50 ${
                                emailFocused
                                  ? "border-cyan-400 shadow-lg shadow-cyan-400/25"
                                  : "border-gray-200"
                              }`}
                              placeholder="Email address"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              onFocus={() => setEmailFocused(true)}
                              onBlur={() => setEmailFocused(false)}
                            />
                            {/* Animated Icon */}
                            <div
                              className={`absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${
                                emailFocused
                                  ? "text-cyan-500 scale-110"
                                  : "text-gray-400"
                              }`}
                            >
                              <svg
                                className="w-5 h-5 sm:w-6 sm:h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a<|control455|> 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>

                        {/* Password Input with Responsive Design */}
                        <div className="relative group">
                          <div
                            className={`absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl sm:rounded-2xl blur-sm opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${
                              passwordFocused ? "opacity-30" : ""
                            }`}
                          ></div>
                          <div className="relative">
                            <input
                              id="password"
                              name="password"
                              type="password"
                              autoComplete="current-password"
                              required
                              className={`w-full px-4 py-3 sm:px-6 sm:py-4 bg-gray-50/50 backdrop-blur-sm border-2 rounded-xl sm:rounded-2xl text-gray-900 placeholder-gray-500 transition-all duration-300 focus:outline-none focus:bg-white focus:shadow-lg hover:bg-gray-50 ${
                                passwordFocused
                                  ? "border-purple-400 shadow-lg shadow-purple-400/25"
                                  : "border-gray-200"
                              }`}
                              placeholder="Password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              onFocus={() => setPasswordFocused(true)}
                              onBlur={() => setPasswordFocused(false)}
                            />
                            {/* Animated Icon */}
                            <div
                              className={`absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${
                                passwordFocused
                                  ? "text-purple-500 scale-110"
                                  : "text-gray-400"
                              }`}
                            >
                              <svg
                                className="w-5 h-5 sm:w-6 sm:h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Enhanced Options - Responsive Layout */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center group">
                          <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="h-4 w-4 sm:h-5 sm:w-5 text-gradient-to-r from-cyan-500 to-blue-500 focus:ring-cyan-500 border-gray-300 rounded transition-all duration-200 hover:scale-110"
                          />
                          <label
                            htmlFor="remember-me"
                            className="ml-2 block text-xs sm:text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-200"
                          >
                            Remember me
                          </label>
                        </div>

                        <div className="text-xs sm:text-sm">
                          <Link
                            href="/forgot-password"
                            className="font-medium text-transparent bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 inline-block"
                          >
                            Forgot password?
                          </Link>
                        </div>
                      </div>

                      {/* Ultra Modern Submit Button - Responsive */}
                      <div className="relative group">
                        <div className="absolute -inset-0.5 sm:-inset-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-xl sm:rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300 animate-gradient-x"></div>
                        <button
                          type="submit"
                          className={`relative w-full flex justify-center items-center py-3 px-4 sm:py-4 sm:px-6 border border-transparent text-base sm:text-lg font-bold rounded-xl sm:rounded-2xl text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-600 hover:via-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-cyan-500/50 transition-all duration-300 ${
                            !isMobile
                              ? "transform hover:scale-[1.02] hover:-translate-y-1"
                              : ""
                          } disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none shadow-md hover:shadow-lg sm:shadow-lg sm:hover:shadow-2xl`}
                          disabled={loading}
                        >
                          {loading ? (
                            <div className="flex items-center space-x-2 sm:space-x-3">
                              <LoadingSpinner size="small" />
                              <span>Signing in...</span>
                            </div>
                          ) : (
                            <div className="flex items-center space-x-2 sm:space-x-3">
                              <span>Sign in</span>
                              <svg
                                className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                                />
                              </svg>
                            </div>
                          )}
                        </button>
                      </div>
                    </form>

                    {/* Enhanced Register Link - Responsive Text */}
                    <div className="text-center text-xs sm:text-sm text-gray-600">
                      <span>Don't have an account? </span>
                      <Link
                        href="/register-owner"
                        className="font-medium text-transparent bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 inline-block"
                      >
                        Register as owner
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for Advanced Animations - Responsive Adjustments */}
      <style jsx>{`
        @keyframes gradient-x {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes float-1 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(30px, -30px) rotate(120deg);
          }
          66% {
            transform: translate(-20px, 20px) rotate(240deg);
          }
        }

        @keyframes float-2 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(-30px, -20px) rotate(120deg);
          }
          66% {
            transform: translate(20px, 30px) rotate(240deg);
          }
        }

        @keyframes float-3 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(25px, 25px) rotate(120deg);
          }
          66% {
            transform: translate(-25px, -15px) rotate(240deg);
          }
        }

        @keyframes float-4 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(-25px, 15px) rotate(120deg);
          }
          66% {
            transform: translate(15px, -25px) rotate(240deg);
          }
        }

        @keyframes slow-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes reverse-spin {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes bounce-gentle {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        @keyframes text-shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @keyframes slide-in-left {
          0% {
            transform: translateX(-100px);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slide-in-right {
          0% {
            transform: translateX(100px);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes fade-in-up {
          0% {
            transform: translateY(30px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes expand {
          0% {
            width: 0;
          }
          100% {
            width: 5rem;
          }
        }

        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-gradient-x {
          animation: gradient-x 15s ease infinite;
          background-size: 200% 200%;
        }
        .animate-float-1 {
          animation: float-1 6s ease-in-out infinite;
        }
        .animate-float-2 {
          animation: float-2 8s ease-in-out infinite;
        }
        .animate-float-3 {
          animation: float-3 7s ease-in-out infinite;
        }
        .animate-float-4 {
          animation: float-4 9s ease-in-out infinite;
        }
        .animate-slow-spin {
          animation: slow-spin 20s linear infinite;
        }
        .animate-reverse-spin {
          animation: reverse-spin 25s linear infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        .animate-text-shimmer {
          animation: text-shimmer 3s ease-in-out infinite;
          background-size: 200% auto;
        }
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out forwards;
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        .animate-expand {
          animation: expand 1s ease-out forwards;
        }
        .animate-shake {
          animation: shake 0.6s ease-in-out;
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        /* Responsive animations */
        @media (max-width: 768px) {
          .animate-slide-in-left,
          .animate-slide-in-right {
            animation: fade-in-up 0.6s ease-out forwards;
          }

          .animate-expand {
            animation: none;
            width: 5rem;
          }

          .animate-text-shimmer {
            animation: none;
            background-position: center;
          }
        }

        /* Hover effects - only on larger screens */
        @media (min-width: 768px) {
          .group:hover .animate-bounce-gentle {
            animation-duration: 0.8s;
          }
        }

        /* Reduced motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
};

export default LoginForm;

