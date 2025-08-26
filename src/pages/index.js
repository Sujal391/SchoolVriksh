// import { useAuth } from "../contexts/AuthContext";
// import Link from "next/link";
// import {
//   FaChalkboardTeacher,
//   FaUserGraduate,
//   FaBook,
//   FaChartLine,
//   FaClock,
//   FaShieldAlt,
//   FaPlay,
//   FaCheck,
//   FaStar,
//   FaArrowRight,
//   FaUsers,
//   FaGraduationCap,
//   FaAward,
//   FaLightbulb,
//   FaBars,
//   FaTimes,
//   FaUser,
// } from "react-icons/fa";
// import { useState, useEffect } from "react";

// export default function Home() {
//   const { isAuthenticated } = useAuth();
//   const [currentTestimonial, setCurrentTestimonial] = useState(0);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const features = [
//     {
//       name: "Expert Faculty Management",
//       description:
//         "Streamline teacher onboarding, scheduling, and performance tracking with our intuitive faculty management system.",
//       icon: <FaChalkboardTeacher className="text-4xl mb-4 text-blue-600" />,
//       gradient: "from-blue-500 to-cyan-500",
//     },
//     {
//       name: "Student Success Analytics",
//       description:
//         "Advanced analytics and reporting tools to track student progress and identify areas for improvement.",
//       icon: <FaUserGraduate className="text-4xl mb-4 text-purple-600" />,
//       gradient: "from-purple-500 to-pink-500",
//     },
//     {
//       name: "Dynamic Curriculum",
//       description:
//         "Create, manage, and update curriculum with integrated assessment tools and learning pathways.",
//       icon: <FaBook className="text-4xl mb-4 text-green-600" />,
//       gradient: "from-green-500 to-teal-500",
//     },
//     {
//       name: "Real-time Performance",
//       description:
//         "Live dashboards with comprehensive metrics, attendance tracking, and academic performance indicators.",
//       icon: <FaChartLine className="text-4xl mb-4 text-orange-600" />,
//       gradient: "from-orange-500 to-red-500",
//     },
//     {
//       name: "Smart Scheduling",
//       description:
//         "AI-powered timetable generation with conflict resolution and resource optimization.",
//       icon: <FaClock className="text-4xl mb-4 text-indigo-600" />,
//       gradient: "from-indigo-500 to-blue-500",
//     },
//     {
//       name: "Enterprise Security",
//       description:
//         "Bank-level security with encrypted data, role-based access, and compliance monitoring.",
//       icon: <FaShieldAlt className="text-4xl mb-4 text-red-600" />,
//       gradient: "from-red-500 to-pink-500",
//     },
//   ];

//   const testimonials = [
//     {
//       text: "This platform has revolutionized our school operations. The intuitive interface and powerful analytics have increased our efficiency by 300%.",
//       name: "Sarah Johnson",
//       role: "Principal",
//       school: "Greenfield High School",
//       image: "👩‍🏫",
//       rating: 5,
//     },
//     {
//       text: "The automated attendance and grading system has saved us over 20 hours per week. It's a game-changer for educational institutions.",
//       name: "Michael Chen",
//       role: "Academic Director",
//       school: "Riverside Academy",
//       image: "👨‍🎓",
//       rating: 5,
//     },
//     {
//       text: "As a parent, the real-time updates and comprehensive progress reports keep me perfectly informed about my child's academic journey.",
//       name: "Emily Rodriguez",
//       role: "Parent & Board Member",
//       school: "Lincoln Elementary",
//       image: "👩‍💼",
//       rating: 5,
//     },
//   ];

//   const stats = [
//     { number: "500+", label: "Schools Worldwide", icon: <FaGraduationCap /> },
//     { number: "50K+", label: "Active Students", icon: <FaUsers /> },
//     { number: "10K+", label: "Expert Teachers", icon: <FaChalkboardTeacher /> },
//     { number: "99.9%", label: "Uptime Guarantee", icon: <FaAward /> },
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="font-sans overflow-hidden">
//       {/* Modern Header Navigation */}
//       <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-200/50 shadow-lg">
//         <div className="container mx-auto px-6">
//           <div className="flex items-center justify-between h-20">
//             {/* Logo */}
//             <Link href="/" className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
//                 <FaGraduationCap className="text-white text-xl" />
//               </div>
//               <span className="text-2xl font-black text-gray-900">
//                 SkoolVriksh
//               </span>
//             </Link>

//             {/* Desktop Navigation */}
//             <nav className="hidden lg:flex items-center space-x-8">
//               <a
//                 href="#features"
//                 className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
//               >
//                 Features
//               </a>
//               <a
//                 href="#how-it-works"
//                 className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
//               >
//                 How It Works
//               </a>
//               <a
//                 href="#testimonials"
//                 className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
//               >
//                 Reviews
//               </a>
//               <a
//                 href="#contact"
//                 className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
//               >
//                 Contact
//               </a>
//             </nav>

//             {/* Desktop Auth Buttons */}
//             <div className="hidden lg:flex items-center space-x-4">
//               {isAuthenticated ? (
//                 <Link
//                   href="/dashboard"
//                   className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-2.5 px-6 rounded-full hover:scale-105 transition-all duration-300 shadow-lg"
//                 >
//                   <FaUser className="text-sm" />
//                   <span>Dashboard</span>
//                 </Link>
//               ) : (
//                 <>
//                   <Link
//                     href="/login"
//                     className="bg-gradient-to-r bg-blue-800 text-white hover:text-indigo-600 font-semibold py-2.5 px-4 rounded-lg transition-colors"
//                   >
//                     Sign In
//                   </Link>
//                 </>
//               )}
//             </div>

//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
//             >
//               {isMenuOpen ? (
//                 <FaTimes className="text-xl" />
//               ) : (
//                 <FaBars className="text-xl" />
//               )}
//             </button>
//           </div>

//           {/* Mobile Menu */}
//           {isMenuOpen && (
//             <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-xl">
//               <div className="py-6 px-6 space-y-4">
//                 <a
//                   href="#features"
//                   className="block text-gray-700 hover:text-indigo-600 font-medium py-2 transition-colors"
//                 >
//                   Features
//                 </a>
//                 <a
//                   href="#how-it-works"
//                   className="block text-gray-700 hover:text-indigo-600 font-medium py-2 transition-colors"
//                 >
//                   How It Works
//                 </a>
//                 <a
//                   href="#testimonials"
//                   className="block text-gray-700 hover:text-indigo-600 font-medium py-2 transition-colors"
//                 >
//                   Reviews
//                 </a>
//                 <a
//                   href="#pricing"
//                   className="block text-gray-700 hover:text-indigo-600 font-medium py-2 transition-colors"
//                 >
//                   Pricing
//                 </a>

//                 <div className="pt-4 space-y-3 border-t border-gray-200">
//                   {isAuthenticated ? (
//                     <Link
//                       href="/dashboard"
//                       className="flex items-center justify-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg"
//                     >
//                       <FaUser className="text-sm" />
//                       <span>Dashboard</span>
//                     </Link>
//                   ) : (
//                     <>
//                       <Link
//                         href="/login"
//                         className="block text-center text-gray-700 hover:text-indigo-600 font-semibold py-3 px-4 rounded-lg transition-colors border border-gray-200"
//                       >
//                         Sign In
//                       </Link>
//                     </>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </header>

//       {/* Hero Section with Gradient Background */}
//       <div className="relative min-h-screen bg-gradient-to-br bg-blue-800 pt-20">
//         {/* Animated Background Elements */}
//         <div className="absolute inset-0 overflow-hidden">
//           <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-blue-400/20 to-transparent rounded-full animate-pulse"></div>
//           <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-purple-400/20 to-transparent rounded-full animate-pulse delay-1000"></div>
//         </div>

//         <div className="relative z-10 container mx-auto px-10 pt-10 pb-32 ">
//           <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
//             {/* Left Content */}
//             <div className="text-white space-y-8">
//               <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20">
//                 <FaLightbulb className="mr-2 text-yellow-400" />
//                 #1 School Management Platform
//               </div>

//               <h1 className="text-5xl lg:text-7xl font-black leading-tight">
//                 Transform Your
//                 <span className="block bg-gradient-to-r from-yellow-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
//                   Educational
//                 </span>
//                 Institution
//               </h1>

//               {/* <p className="text-xl lg:text-2xl text-gray-200 leading-relaxed max-w-2xl">
//                 Revolutionize school management with our AI-powered platform. Streamline operations, enhance learning outcomes, and create exceptional educational experiences.
//               </p> */}

//               <div className="flex flex-col sm:flex-row gap-4 pt-4">
//                 {isAuthenticated ? (
//                   <Link
//                     href="/dashboard"
//                     className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-full hover:scale-105 transition-all duration-300 shadow-2xl"
//                   >
//                     <span className="relative z-10 flex items-center justify-center">
//                       Go to Dashboard
//                       <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
//                     </span>
//                   </Link>
//                 ) : (
//                   <>
//                     {/* <Link href="/login" className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-full hover:scale-105 transition-all duration-300 shadow-2xl">
//                       <span className="relative z-10 flex items-center justify-center">
//                         Start Free Trial
//                         <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
//                       </span>
//                     </Link> */}
//                   </>
//                 )}
//               </div>

//               <div className="flex items-center space-x-6 pt-8">
//                 <div className="flex -space-x-2">
//                   {[1, 2, 3, 4, 5].map((i) => (
//                     <div
//                       key={i}
//                       className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 border-2 border-white flex items-center justify-center text-white font-bold"
//                     >
//                       {String.fromCharCode(64 + i)}
//                     </div>
//                   ))}
//                 </div>
//                 <div>
//                   <div className="flex text-yellow-400">
//                     {[1, 2, 3, 4, 5].map((i) => (
//                       <FaStar key={i} />
//                     ))}
//                   </div>
//                   <p className="text-sm text-gray-300 mt-1">
//                     Trusted by 500+ institutions
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Right Content - Interactive Dashboard Preview */}
//             <div className="relative">
//               <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
//                 <div className="space-y-6">
//                   <div className="flex items-center justify-between">
//                     <h3 className="text-white text-xl font-bold">
//                       Live Dashboard
//                     </h3>
//                     <div className="flex space-x-2">
//                       <div className="w-3 h-3 bg-red-400 rounded-full"></div>
//                       <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
//                       <div className="w-3 h-3 bg-green-400 rounded-full"></div>
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-4 border border-white/10">
//                       <div className="text-3xl font-bold text-white">2,847</div>
//                       <div className="text-gray-300 text-sm">
//                         Active Students
//                       </div>
//                     </div>
//                     <div className="bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-xl p-4 border border-white/10">
//                       <div className="text-3xl font-bold text-white">98.5%</div>
//                       <div className="text-gray-300 text-sm">
//                         Attendance Rate
//                       </div>
//                     </div>
//                   </div>

//                   <div className="space-y-3">
//                     <div className="bg-white/10 rounded-lg p-3 border border-white/10">
//                       <div className="flex items-center justify-between">
//                         <span className="text-white text-sm">
//                           Class 12-A Mathematics
//                         </span>
//                         <span className="text-green-400 text-sm">
//                           ✓ Completed
//                         </span>
//                       </div>
//                     </div>
//                     <div className="bg-white/10 rounded-lg p-3 border border-white/10">
//                       <div className="flex items-center justify-between">
//                         <span className="text-white text-sm">
//                           Physics Lab Session
//                         </span>
//                         <span className="text-blue-400 text-sm">
//                           • In Progress
//                         </span>
//                       </div>
//                     </div>
//                     <div className="bg-white/10 rounded-lg p-3 border border-white/10">
//                       <div className="flex items-center justify-between">
//                         <span className="text-white text-sm">
//                           Parent-Teacher Meeting
//                         </span>
//                         <span className="text-orange-400 text-sm">
//                           ⏰ Upcoming
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Animated Stats Bar */}
//       <div className="bg-white py-16 shadow-xl">
//         <div className="container mx-auto px-6">
//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
//             {stats.map((stat, index) => (
//               <div key={index} className="text-center group">
//                 <div className="text-4xl lg:text-5xl text-indigo-600 mb-2 group-hover:scale-110 transition-transform duration-300">
//                   {stat.icon}
//                 </div>
//                 <div className="text-3xl lg:text-4xl font-black text-gray-900 mb-2">
//                   {stat.number}
//                 </div>
//                 <div className="text-gray-600 font-medium">{stat.label}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Enhanced Features Section */}
//       <div
//         id="features"
//         className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
//       >
//         <div className="container mx-auto px-6">
//           <div className="text-center mb-16">
//             <div className="inline-flex items-center px-4 py-2 bg-indigo-100 rounded-full text-indigo-600 font-medium mb-4">
//               <FaAward className="mr-2" />
//               Premium Features
//             </div>
//             <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">
//               Everything You Need to
//               <span className="block text-indigo-600">Succeed</span>
//             </h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
//               Our comprehensive platform provides cutting-edge tools and
//               features designed to elevate your educational institution to new
//               heights
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {features.map((feature, index) => (
//               <div
//                 key={index}
//                 className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:-translate-y-2"
//               >
//                 <div
//                   className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`}
//                 ></div>
//                 <div className="relative z-10">
//                   <div className="flex justify-center mb-6">
//                     <div className="p-4 bg-gray-50 rounded-2xl group-hover:scale-110 transition-transform duration-300">
//                       {feature.icon}
//                     </div>
//                   </div>
//                   <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
//                     {feature.name}
//                   </h3>
//                   <p className="text-gray-600 text-center leading-relaxed">
//                     {feature.description}
//                   </p>
//                   <div className="mt-6 text-center">
//                     <button className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors inline-flex items-center">
//                       Learn More <FaArrowRight className="ml-2 text-sm" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* How It Works with Animation */}
//       <div id="how-it-works" className="py-20 bg-white">
//         <div className="container mx-auto px-6">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">
//               Get Started in
//               <span className="text-indigo-600">3 Simple Steps</span>
//             </h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Launch your digital transformation journey with our streamlined
//               onboarding process
//             </p>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
//             {[
//               {
//                 step: "1",
//                 title: "Buy Subscription",
//                 description:
//                   "Sign up as a school administrator and verify your institution in under 2 minutes",
//                 color: "from-blue-500 to-cyan-500",
//               },
//               {
//                 step: "2",
//                 title: "Configure Your School",
//                 description:
//                   "Import your data, set up classes, and invite your staff with our guided setup wizard",
//                 color: "from-purple-500 to-pink-500",
//               },
//               {
//                 step: "3",
//                 title: "Launch & Scale",
//                 description:
//                   "Go live with full support from our team and scale as your institution grows",
//                 color: "from-green-500 to-teal-500",
//               },
//             ].map((item, index) => (
//               <div key={index} className="text-center relative">
//                 <div
//                   className={`w-20 h-20 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center text-3xl font-black text-white mx-auto mb-6 shadow-2xl hover:scale-110 transition-transform duration-300`}
//                 >
//                   {item.step}
//                 </div>
//                 <h3 className="text-2xl font-bold text-gray-900 mb-4">
//                   {item.title}
//                 </h3>
//                 <p className="text-gray-600 text-lg leading-relaxed max-w-sm mx-auto">
//                   {item.description}
//                 </p>
//                 {index < 2 && (
//                   <div className="hidden lg:block absolute top-10 left-full w-full">
//                     <FaArrowRight className="text-gray-300 text-2xl -translate-x-1/2" />
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Enhanced Testimonials with Carousel */}
//       <div
//         id="testimonials"
//         className="py-20 bg-gradient-to-r bg-blue-900 text-white relative overflow-hidden"
//       >
//         <div className="absolute inset-0">
//           <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-blue-600/20 to-transparent"></div>
//           <div className="absolute bottom-0 right-0 w-1/2 h-full bg-gradient-to-l from-purple-600/20 to-transparent"></div>
//         </div>

//         <div className="container mx-auto px-6 relative z-10">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl lg:text-5xl font-black mb-6">
//               Loved by Educators
//               <span className="block text-yellow-400">Worldwide</span>
//             </h2>
//             <p className="text-xl text-gray-200 max-w-3xl mx-auto">
//               Join thousands of satisfied educators who have transformed their
//               institutions with our platform
//             </p>
//           </div>

//           <div className="max-w-4xl mx-auto">
//             <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-white/20">
//               <div className="text-center">
//                 <div className="flex justify-center mb-6">
//                   {[1, 2, 3, 4, 5].map((i) => (
//                     <FaStar key={i} className="text-yellow-400 text-2xl" />
//                   ))}
//                 </div>
//                 <blockquote className="text-2xl lg:text-3xl font-light italic mb-8 leading-relaxed">
//                   "{testimonials[currentTestimonial].text}"
//                 </blockquote>
//                 <div className="flex items-center justify-center space-x-4">
//                   <div className="text-4xl">
//                     {testimonials[currentTestimonial].image}
//                   </div>
//                   <div className="text-left">
//                     <div className="font-bold text-xl">
//                       {testimonials[currentTestimonial].name}
//                     </div>
//                     <div className="text-gray-300">
//                       {testimonials[currentTestimonial].role}
//                     </div>
//                     <div className="text-sm text-indigo-300">
//                       {testimonials[currentTestimonial].school}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="flex justify-center space-x-3 mt-8">
//               {testimonials.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setCurrentTestimonial(index)}
//                   className={`w-3 h-3 rounded-full transition-all ${
//                     index === currentTestimonial
//                       ? "bg-white scale-125"
//                       : "bg-white/30 hover:bg-white/50"
//                   }`}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Enhanced CTA Section */}
//       <div className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
//         <div className="container mx-auto px-6">
//           <div className="max-w-4xl mx-auto text-center">
//             <h2 className="text-4xl lg:text-6xl font-black text-gray-900 mb-6">
//               Ready to Transform Your
//               <span className="block bg-gradient-to-r bg-blue-600 bg-clip-text text-transparent">
//                 Educational Institution?
//               </span>
//             </h2>
//             <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-2xl mx-auto">
//               Join over 500 schools worldwide who trust our platform to deliver
//               exceptional educational experiences
//             </p>

//             <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
//               {isAuthenticated ? (
//                 <Link
//                   href="/dashboard"
//                   className="group bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 px-12 rounded-full hover:scale-105 transition-all duration-300 shadow-2xl text-lg"
//                 >
//                   <span className="flex items-center">
//                     Go to Dashboard
//                     <FaArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" />
//                   </span>
//                 </Link>
//               ) : (
//                 <>
//                   {/* <Link href="/register-owner" className="group bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 px-12 rounded-full hover:scale-105 transition-all duration-300 shadow-2xl text-lg">
//                     <span className="flex items-center">
//                       Start Free Trial
//                       <FaArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" />
//                     </span>
//                   </Link> */}
//                   {/* <div className="text-gray-500">or</div> */}
//                   <Link
//                     href="/login"
//                     className="group bg-white text-indigo-600 font-bold py-4 px-12 rounded-full border-2 border-indigo-200 hover:border-indigo-400 hover:scale-105 transition-all duration-300 text-lg"
//                   >
//                     Sign In
//                   </Link>
//                 </>
//               )}
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
//               <div className="flex items-center justify-center space-x-2">
//                 <FaCheck className="text-green-500 text-xl" />
//                 <span className="text-gray-600">30-day free trial</span>
//               </div>
//               <div className="flex items-center justify-center space-x-2">
//                 <FaCheck className="text-green-500 text-xl" />
//                 <span className="text-gray-600">No setup fees</span>
//               </div>
//               <div className="flex items-center justify-center space-x-2">
//                 <FaCheck className="text-green-500 text-xl" />
//                 <span className="text-gray-600">24/7 support included</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect, useRef } from "react";
// import Link from "next/link";
// import {
//   FaChalkboardTeacher,
//   FaUserGraduate,
//   FaBook,
//   FaChartLine,
//   FaClock,
//   FaShieldAlt,
//   FaPlay,
//   FaCheck,
//   FaStar,
//   FaArrowRight,
//   FaUsers,
//   FaGraduationCap,
//   FaAward,
//   FaLightbulb,
//   FaBars,
//   FaTimes,
//   FaUser,
//   FaMoneyBillWave,
//   FaBus,
//   FaBookOpen,
//   FaCalendarAlt,
//   FaClipboardList,
//   FaUserCheck,
//   FaMobile,
//   FaCloud,
//   FaLock,
//   FaBell,
//   FaEnvelope,
//   FaPhone,
//   FaMapMarkerAlt,
//   FaDownload,
//   FaVideo,
//   FaHeadset,
//   FaCog,
//   FaDatabase,
//   FaSync,
//   FaPrint,
//   FaFileAlt,
//   FaCalculator,
//   FaMedkit,
//   FaFlask,
//   FaComments,
//   FaRocket,
//   FaHeart,
//   FaMagic,
//   FaGlobe
// } from "react-icons/fa";

// import { HiSparkles } from "react-icons/hi";

// export default function EnhancedHome() {
//   const [currentTestimonial, setCurrentTestimonial] = useState(0);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [activeModule, setActiveModule] = useState(0);
//   const [scrollY, setScrollY] = useState(0);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   // School images for auto-scrolling slider
//   const schoolImages = [
//     "/images/sv1.jpg",
//     "/images/sv2.jpg",
//     "/images/sv3.jpg"
//   ];

//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   useEffect(() => {
//     const handleScroll = () => setScrollY(window.scrollY);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prev) => (prev + 1) % schoolImages.length);
//     }, 6000);
//     return () => clearInterval(interval);
//   }, []);

//   const coreModules = [
//     {
//       title: "Student Management",
//       description: "Complete student information system with admission, enrollment, and academic records management",
//       icon: <FaUserGraduate className="text-4xl text-orange-500" />,
//       features: ["Student Registration", "Admission Management", "Academic Records", "Medical Records", "Parent Portal Access"],
//       gradient: "from-orange-400 to-red-500"
//     },
//     {
//       title: "Faculty Management",
//       description: "Comprehensive teacher management with scheduling, performance tracking, and payroll integration",
//       icon: <FaChalkboardTeacher className="text-4xl text-orange-500" />,
//       features: ["Teacher Profiles", "Class Assignments", "Performance Reviews", "Payroll Integration", "Professional Development"],
//       gradient: "from-orange-500 to-amber-500"
//     },
//     {
//       title: "Academic Management",
//       description: "Complete curriculum management with lesson planning, assessment, and progress tracking",
//       icon: <FaBook className="text-4xl text-orange-500" />,
//       features: ["Curriculum Planning", "Lesson Management", "Assignment Tracking", "Grade Books", "Academic Calendar"],
//       gradient: "from-amber-400 to-orange-500"
//     },
//     {
//       title: "Financial Management",
//       description: "Integrated accounting system with fee collection, expense tracking, and financial reporting",
//       icon: <FaMoneyBillWave className="text-4xl text-orange-500" />,
//       features: ["Fee Collection", "Expense Tracking", "Budget Management", "Financial Reports", "Online Payments"],
//       gradient: "from-orange-600 to-red-600"
//     }
//   ];

//   const allFeatures = [
//     {
//       category: "Academic Management",
//       items: [
//         { name: "Student Information System", icon: <FaUserGraduate className="text-orange-500" />, desc: "Complete student records and profiles" },
//         { name: "Admission Management", icon: <FaClipboardList className="text-orange-500" />, desc: "Online admission process and tracking" },
//         { name: "Attendance Management", icon: <FaUserCheck className="text-orange-500" />, desc: "Digital attendance with parent notifications" },
//         { name: "Examination System", icon: <FaFileAlt className="text-orange-500" />, desc: "Online exams and automated grading" },
//         { name: "Grade Management", icon: <FaCalculator className="text-orange-500" />, desc: "Comprehensive gradebook and analytics" },
//         { name: "Timetable Management", icon: <FaCalendarAlt className="text-orange-500" />, desc: "Automated scheduling and conflict resolution" }
//       ]
//     },
//     {
//       category: "Communication & Collaboration",
//       items: [
//         { name: "Parent Portal", icon: <FaUsers className="text-orange-500" />, desc: "Dedicated parent access and communication" },
//         { name: "SMS & Email Alerts", icon: <FaBell className="text-orange-500" />, desc: "Automated notifications and updates" },
//         { name: "Mobile App", icon: <FaMobile className="text-orange-500" />, desc: "iOS and Android apps for all users" },
//         { name: "Video Conferencing", icon: <FaVideo className="text-orange-500" />, desc: "Integrated online classes and meetings" },
//         { name: "Message Center", icon: <FaEnvelope className="text-orange-500" />, desc: "Internal messaging system" },
//         { name: "Notice Board", icon: <FaComments className="text-orange-500" />, desc: "Digital announcements and updates" }
//       ]
//     },
//     {
//       category: "Financial Management",
//       items: [
//         { name: "Fee Management", icon: <FaMoneyBillWave className="text-orange-500" />, desc: "Online fee collection and tracking" },
//         { name: "Payroll System", icon: <FaCalculator className="text-orange-500" />, desc: "Staff salary and benefits management" },
//         { name: "Accounting", icon: <FaDatabase className="text-orange-500" />, desc: "Complete financial accounting system" },
//         { name: "Budget Planning", icon: <FaChartLine className="text-orange-500" />, desc: "Budget creation and monitoring" },
//         { name: "Expense Tracking", icon: <FaClipboardList className="text-orange-500" />, desc: "Real-time expense management" },
//         { name: "Financial Reports", icon: <FaPrint className="text-orange-500" />, desc: "Comprehensive financial analytics" }
//       ]
//     },
//     {
//       category: "Operations & Administration",
//       items: [
//         { name: "Transport Management", icon: <FaBus className="text-orange-500" />, desc: "School bus routing and tracking" },
//         { name: "Library Management", icon: <FaBookOpen className="text-orange-500" />, desc: "Digital library and book tracking" },
//         { name: "Inventory Management", icon: <FaDatabase className="text-orange-500" />, desc: "Asset and resource management" },
//         { name: "Health Records", icon: <FaMedkit className="text-orange-500" />, desc: "Student and staff health tracking" },
//         { name: "Laboratory Management", icon: <FaFlask className="text-orange-500" />, desc: "Science lab equipment and scheduling" },
//         { name: "Hostel Management", icon: <FaUsers className="text-orange-500" />, desc: "Residential facility management" }
//       ]
//     }
//   ];

//   const benefits = [
//     {
//       title: "Streamlined Operations",
//       description: "Automate routine tasks and reduce administrative overhead by up to 70%",
//       icon: <FaCog className="text-5xl text-orange-500" />,
//       stats: "70% Time Saved"
//     },
//     {
//       title: "Enhanced Communication",
//       description: "Real-time communication between teachers, students, and parents",
//       icon: <FaComments className="text-5xl text-orange-500" />,
//       stats: "24/7 Connectivity"
//     },
//     {
//       title: "Data-Driven Decisions",
//       description: "Comprehensive analytics and reporting for informed decision making",
//       icon: <FaChartLine className="text-5xl text-orange-500" />,
//       stats: "Real-time Insights"
//     },
//     {
//       title: "Secure & Reliable",
//       description: "Bank-level security with 99.9% uptime guarantee",
//       icon: <FaShieldAlt className="text-5xl text-orange-500" />,
//       stats: "99.9% Uptime"
//     }
//   ];

//   const testimonials = [
//     {
//       text: "SkoolVriksh has completely transformed our school operations. The integrated approach and user-friendly interface have made management effortless.",
//       name: "Dr. Priya Sharma",
//       role: "Principal",
//       school: "Delhi Public School, Mumbai",
//       image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
//       rating: 5,
//     },
//     {
//       text: "The parent portal and mobile app have greatly improved our communication with families. Parents love the real-time updates and transparency.",
//       name: "Rajesh Kumar",
//       role: "Academic Director",
//       school: "St. Mary's Convent School",
//       image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
//       rating: 5,
//     },
//     {
//       text: "As a parent, I appreciate having instant access to my child's progress, attendance, and school updates. It's incredibly convenient and reliable.",
//       name: "Sunita Patel",
//       role: "Parent",
//       school: "Kendriya Vidyalaya",
//       image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
//       rating: 5,
//     },
//   ];

//   const stats = [
//     { number: "1000+", label: "Schools Trust Us", icon: <FaGraduationCap className="text-orange-500" /> },
//     { number: "50,000+", label: "Active Students", icon: <FaUsers className="text-orange-500" /> },
//     { number: "5,000+", label: "Teachers", icon: <FaChalkboardTeacher className="text-orange-500" /> },
//     { number: "99.9%", label: "Uptime", icon: <FaAward className="text-orange-500" /> },
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     const moduleInterval = setInterval(() => {
//       setActiveModule((prev) => (prev + 1) % coreModules.length);
//     }, 4000);
//     return () => clearInterval(moduleInterval);
//   }, []);

//   return (
//     <div className="font-sans overflow-hidden bg-gradient-to-br from-orange-50 via-white to-orange-100">
//       {/* Floating Particles Background */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         {[...Array(20)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute w-2 h-2 bg-orange-300/20 rounded-full animate-pulse"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animationDelay: `${Math.random() * 5}s`,
//               animationDuration: `${3 + Math.random() * 4}s`
//             }}
//           />
//         ))}
//       </div>

//       {/* Enhanced Header */}
//       <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
//         scrollY > 50
//           ? 'bg-white/95 backdrop-blur-xl border-b border-orange-100/50 shadow-2xl'
//           : 'bg-transparent'
//       }`}>
//         <div className="container mx-auto px-6">
//           <div className="flex items-center justify-between h-20">
//             <div className="flex items-center space-x-3 group cursor-pointer">
//               <div className="relative">
//                 <div className="w-14 h-14 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
//                   <FaGraduationCap className="text-white text-2xl animate-pulse" />
//                 </div>
//                 <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-ping"></div>
//               </div>
//               <div>
//                 <span className="text-3xl font-black bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
//                   SkoolVriksh
//                 </span>
//                 <div className="text-xs text-black font-semibold tracking-wider">
//                   SCHOOL MANAGEMENT SYSTEM
//                 </div>
//               </div>
//             </div>

//             <nav className="hidden lg:flex items-center space-x-8">
//               {['Features', 'Modules', 'Pricing', 'Reviews', 'Contact'].map((item) => (
//                 <a
//                   key={item}
//                   href={`#${item.toLowerCase()}`}
//                   className="relative text-gray-700 hover:text-orange-600 font-semibold transition-all duration-300 group"
//                 >
//                   {item}
//                   <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-orange-600 group-hover:w-full transition-all duration-300"></span>
//                 </a>
//               ))}
//             </nav>

//             {/* <div className="hidden lg:flex items-center space-x-4">
//               {isAuthenticated ? (
//                 <button className="flex items-center space-x-2 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white font-bold py-3 px-8 rounded-full hover:scale-105 hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
//                   <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
//                   <FaUser className="text-sm" />
//                   <span>Dashboard</span>
//                 </button>
//               ) : (
//                 <button
//                   onClick={() => setIsAuthenticated(true)}
//                   className="group bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white font-bold py-3 px-8 rounded-full hover:scale-105 hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
//                 >
//                   <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
//                   <span className="relative">Sign In</span>
//                 </button>
//               )}
//             </div> */}

//             <div className="hidden lg:flex items-center space-x-4">
//             {isAuthenticated ? (
//                 <Link
//                   href="/dashboard"
//                   className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-2.5 px-6 rounded-full hover:scale-105 transition-all duration-300 shadow-lg"
//                 >
//                   <FaUser className="text-sm" />
//                   <span>Dashboard</span>
//                  </Link>
//                ) : (
//                  <>
//                    <Link
//                      href="/login"
//                      className="bg-gradient-to-r bg-orange-900 text-white hover:text-indigo-600 font-semibold py-2.5 px-4 rounded-lg transition-colors"
//                    >
//                      Skool Login
//                    </Link>
//                  </>
//                )}
//             </div>

//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="lg:hidden p-3 rounded-xl text-gray-700 hover:bg-orange-100 transition-all duration-300 hover:scale-110"
//             >
//               {isMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
//             </button>
//           </div>

//           {/* Mobile Menu */}
//           {isMenuOpen && (
//             <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-orange-100 shadow-2xl rounded-b-3xl">
//               <div className="py-8 px-6 space-y-6">
//                 {['Features', 'Modules', 'Pricing', 'Reviews', 'Contact'].map((item) => (
//                   <a
//                     key={item}
//                     href={`#${item.toLowerCase()}`}
//                     className="block text-gray-700 hover:text-orange-600 font-semibold py-3 hover:bg-orange-50 rounded-lg px-4 transition-all duration-300"
//                   >
//                     {item}
//                   </a>
//                 ))}
//                 <div className="pt-6 border-t border-orange-100">
//                   {isAuthenticated ? (
//                     <button className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-orange-600 to-orange-700 text-white font-bold py-4 px-6 rounded-full shadow-xl">
//                       <FaUser className="text-sm" />
//                       <span>Dashboard</span>
//                     </button>
//                   ) : (
//                     <button
//                       onClick={() => setIsAuthenticated(true)}
//                       className="w-full bg-gradient-to-r from-orange-600 to-orange-700 text-white font-bold py-4 px-6 rounded-full shadow-xl"
//                     >
//                       Sign In
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </header>

//       {/* Hero Section with Dynamic Background */}
//       <div className="relative min-h-screen overflow-hidden ">
//         {/* Dynamic Background with Parallax */}
//         <div className="absolute inset-0">
//           {schoolImages.map((image, index) => (
//             <div
//               key={index}
//               className={`absolute inset-0 transition-all duration-2000 ${
//                 index === currentImageIndex ? 'opacity-50 scale-100' : 'opacity-0 scale-110'
//               }`}
//             >
//               <div className="absolute inset-0 bg-gradient-to-br bg-orange-700"></div>
//               <img
//                 src={image}
//                 alt={`School ${index + 1}`}
//                 className="w-full h-full object-cover"
//                 style={{
//                   transform: `translateY(${scrollY * 0.5}px)`
//                 }}
//               />
//             </div>
//           ))}
//         </div>

//         {/* Animated Geometric Shapes */}
//         <div className="absolute inset-0 overflow-hidden">
//           <div className="absolute top-20 left-10 w-32 h-32 bg-orange-300/20 rounded-full blur-xl animate-pulse"></div>
//           <div className="absolute top-40 right-20 w-24 h-24 bg-amber-400/20 rounded-full blur-lg animate-bounce"></div>
//           <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-orange-500/10 rounded-full blur-2xl animate-pulse"></div>
//         </div>

//         <div className="relative z-10 container mx-auto px-6 pt-32 pb-20">
//           <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
//             <div className="space-y-8 animate-fade-in">
//               {/* Badge */}
//               <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-100 to-amber-100 rounded-full text-orange-700 font-bold border border-orange-300 shadow-lg hover:shadow-xl transition-all duration-300 group">
//                 <FaAward className="mr-3 text-orange-500 group-hover:animate-spin" />
//                 <span className="flex items-center">
//                   #1 School Management Platform in India
//                   <HiSparkles className="ml-2 text-amber-500 animate-pulse" />
//                 </span>
//               </div>

//               {/* Main Heading */}
//               <h1 className="text-6xl lg:text-7xl font-black leading-tight">
//                 <span className="text-gray-900">Complete</span>
//                 <br />
//                 <span className="bg-gradient-to-r bg-blue-800 bg-clip-text text-transparent animate-gradient">
//                   School Management
//                 </span>
//                 <br />
//                 <span className="text-gray-900">Solution</span>
//               </h1>

//               {/* Subtitle */}
//               <p className="text-2xl text-gray-600 leading-relaxed max-w-2xl">
//                 Transform your educational institution with our
//                 <span className="text-orange-600 font-semibold"> AI-powered </span>
//                 comprehensive platform. From student management to financial tracking,
//                 we've revolutionized school administration.
//               </p>

//               {/* CTA Buttons */}
//               <div className="flex flex-col sm:flex-row gap-6 pt-6">
//                 {isAuthenticated ? (
//                   <button className="group relative bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white font-bold py-5 px-10 rounded-full hover:scale-105 hover:shadow-2xl transition-all duration-300 overflow-hidden">
//                     <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
//                     <span className="relative flex items-center justify-center text-lg">
//                       <FaRocket className="mr-3 group-hover:animate-bounce" />
//                       Go to Dashboard
//                       <FaArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
//                     </span>
//                   </button>
//                 ) : (
//                   <>

//                   </>
//                 )}
//               </div>

//               {/* Social Proof */}
//               <div className="flex items-center space-x-8 pt-8">
//                 <div className="flex text-yellow-400">
//                   {[1, 2, 3, 4, 5].map((i) => (
//                     <FaStar key={i} className="text-xl animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
//                   ))}
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <span className="text-gray-600 font-semibold text-lg">Rated 4.9/5 by</span>
//                   <span className="bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent font-black text-xl">
//                     1000+ schools
//                   </span>
//                   <FaHeart className="text-red-500 animate-pulse" />
//                 </div>
//               </div>
//             </div>

//             {/* Dashboard Preview */}
//             <div className="relative group">
//               <div className="absolute -inset-4 bg-gradient-to-r from-orange-600 to-amber-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>

//               <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-orange-100 hover:shadow-3xl transition-all duration-500 group-hover:scale-105">
//                 <div className="space-y-6">
//                   {/* Header */}
//                   <div className="flex items-center justify-between mb-8">
//                     <div>
//                       <h3 className="text-3xl font-black bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">
//                         Live Dashboard
//                       </h3>
//                       <p className="text-gray-500 font-medium">Real-time school insights</p>
//                     </div>
//                     <div className="flex items-center space-x-3">
//                       <div className="relative">
//                         <div className="w-4 h-4 bg-green-500 rounded-full animate-ping"></div>
//                         <div className="absolute inset-0 w-4 h-4 bg-green-400 rounded-full"></div>
//                       </div>
//                       <span className="text-sm text-green-600 font-semibold">Live</span>
//                     </div>
//                   </div>

//                   {/* Stats Cards */}
//                   <div className="grid grid-cols-2 gap-4">
//                     <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-2xl p-6 text-white hover:scale-105 transition-transform duration-300">
//                       <div className="flex items-center justify-between mb-2">
//                         <FaUsers className="text-2xl text-orange-200" />
//                         <div className="text-xs bg-white/20 px-2 py-1 rounded-full">+12%</div>
//                       </div>
//                       <div className="text-4xl font-black mb-1">1,247</div>
//                       <div className="text-orange-100 text-sm font-medium">Active Students</div>
//                     </div>

//                     <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 text-white hover:scale-105 transition-transform duration-300">
//                       <div className="flex items-center justify-between mb-2">
//                         <FaUserCheck className="text-2xl text-amber-200" />
//                         <div className="text-xs bg-white/20 px-2 py-1 rounded-full">+5%</div>
//                       </div>
//                       <div className="text-4xl font-black mb-1">96.8%</div>
//                       <div className="text-amber-100 text-sm font-medium">Attendance Today</div>
//                     </div>
//                   </div>

//                   {/* Activity Feed */}
//                   <div className="space-y-4">
//                     <h4 className="text-lg font-bold text-gray-800 flex items-center">
//                       <FaClock className="mr-2 text-orange-500" />
//                       Recent Activity
//                     </h4>
//                     {[
//                       { subject: "Mathematics - Grade 10", status: "In Progress", color: "orange", icon: <FaBook /> },
//                       { subject: "Physics Lab - Grade 12", status: "Completed", color: "green", icon: <FaFlask /> },
//                       { subject: "Parent-Teacher Meeting", status: "Upcoming", color: "blue", icon: <FaUsers /> }
//                     ].map((item, index) => (
//                       <div key={index} className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-all duration-300 border border-orange-100">
//                         <div className="flex items-center space-x-3">
//                           <div className="text-orange-500 text-lg">{item.icon}</div>
//                           <span className="text-gray-800 font-semibold">{item.subject}</span>
//                         </div>
//                         <span className={`text-${item.color}-600 text-sm font-bold px-3 py-1 bg-${item.color}-100 rounded-full`}>
//                           {item.status}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Scroll Indicator */}
//         <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
//           <div className="w-8 h-12 border-2 border-orange-400 rounded-full flex justify-center">
//             <div className="w-1 h-3 bg-orange-400 rounded-full mt-2 animate-pulse"></div>
//           </div>
//         </div>
//       </div>

//       {/* Enhanced Stats Section */}
//       <div className="relative bg-white py-20 border-b border-orange-100 overflow-hidden">
//         {/* Background Pattern */}
//         <div className="absolute inset-0 opacity-5">
//           <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-orange-100 to-transparent"></div>
//         </div>

//         <div className="container mx-auto px-6 relative z-10">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">
//               Trusted by
//               <span className="bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent"> Thousands</span>
//             </h2>
//             <p className="text-xl text-gray-600">Join the revolution in education management</p>
//           </div>

//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
//             {stats.map((stat, index) => (
//               <div key={index} className="text-center group hover:scale-110 transition-all duration-500">
//                 <div className="relative mb-6">
//                   <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
//                   <div className="relative text-6xl lg:text-7xl text-orange-500 group-hover:animate-pulse">
//                     {stat.icon}
//                   </div>
//                 </div>
//                 <div className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent mb-3">
//                   {stat.number}
//                 </div>
//                 <div className="text-gray-600 font-semibold text-lg">{stat.label}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Enhanced Core Modules Section */}
//       <div id="modules" className="py-24 bg-gradient-to-br from-orange-50 via-white to-amber-50 relative overflow-hidden">
//         {/* Animated Background Elements */}
//         <div className="absolute inset-0">
//           <div className="absolute top-20 left-10 w-64 h-64 bg-orange-200/20 rounded-full blur-3xl animate-pulse"></div>
//           <div className="absolute bottom-20 right-10 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
//         </div>

//         <div className="container mx-auto px-6 relative z-10">
//           <div className="text-center mb-20">
//             <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-100 to-amber-100 rounded-full text-orange-700 font-bold mb-6">
//               <FaRocket className="mr-2 animate-bounce" />
//               Core Modules
//             </div>
//             <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-8">
//               Complete Management
//               <span className="block bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">
//                 Ecosystem
//               </span>
//             </h2>
//             <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
//               Our integrated modules work in perfect harmony to provide a
//               <span className="text-orange-600 font-semibold"> seamless </span>
//               school management experience
//             </p>
//           </div>

//           <div className="grid lg:grid-cols-2 gap-16 items-center">
//             {/* Module Navigation */}
//             <div className="space-y-6">
//               {coreModules.map((module, index) => (
//                 <div
//                   key={index}
//                   className={`relative p-8 rounded-3xl border-2 cursor-pointer transition-all duration-500 group ${
//                     activeModule === index
//                       ? 'bg-gradient-to-r from-orange-100 to-amber-100 border-orange-400 shadow-2xl scale-105'
//                       : 'bg-white/80 backdrop-blur-sm border-orange-200 hover:border-orange-300 hover:shadow-xl'
//                   }`}
//                   onClick={() => setActiveModule(index)}
//                 >
//                   {/* Glow Effect */}
//                   {activeModule === index && (
//                     <div className="absolute -inset-2 bg-gradient-to-r from-orange-400 to-amber-400 rounded-3xl blur-xl opacity-20"></div>
//                   )}

//                   <div className="relative flex items-start space-x-6">
//                     <div className="flex-shrink-0">
//                       <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${
//                         activeModule === index
//                           ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white scale-110'
//                           : 'bg-orange-100 text-orange-500 group-hover:scale-105'
//                       }`}>
//                         {module.icon}
//                       </div>
//                     </div>
//                     <div className="flex-1">
//                       <h3 className="text-2xl font-black text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
//                         {module.title}
//                       </h3>
//                       <p className="text-gray-600 mb-6 leading-relaxed">{module.description}</p>
//                       {activeModule === index && (
//                         <div className="space-y-3 animate-fade-in">
//                           {module.features.map((feature, idx) => (
//                             <div key={idx} className="flex items-center text-gray-700 group/item hover:text-orange-600 transition-colors">
//                               <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 group-hover/item:scale-110 transition-transform">
//                                 <FaCheck className="text-green-500 text-xs" />
//                               </div>
//                               <span className="font-medium">{feature}</span>
//                             </div>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Module Showcase */}
//             <div className="relative">
//               <div className="absolute -inset-8 bg-gradient-to-r from-orange-400 to-amber-400 rounded-3xl blur-2xl opacity-20"></div>

//               <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-orange-100">
//                 <div className="text-center mb-8">
//                   <div className={`inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-r ${coreModules[activeModule].gradient} text-white mb-6 animate-pulse`}>
//                     <div className="text-4xl">{coreModules[activeModule].icon}</div>
//                   </div>
//                   <h3 className="text-3xl font-black text-gray-900 mb-4">
//                     {coreModules[activeModule].title}
//                   </h3>
//                   <p className="text-gray-600 text-lg leading-relaxed">{coreModules[activeModule].description}</p>
//                 </div>

//                 <div className="space-y-4">
//                   {coreModules[activeModule].features.map((feature, index) => (
//                     <div key={index} className="flex items-center p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl hover:shadow-md transition-all duration-300 group border border-orange-100">
//                       <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
//                         <FaCheck className="text-green-500" />
//                       </div>
//                       <span className="text-gray-800 font-semibold group-hover:text-orange-600 transition-colors">{feature}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Enhanced All Features Section */}
//       <div id="features" className="py-24 bg-white relative overflow-hidden">
//         <div className="container mx-auto px-6">
//           <div className="text-center mb-20">
//             <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-100 to-amber-100 rounded-full text-orange-700 font-bold mb-6">
//               <HiSparkles className="mr-2 animate-spin" />
//               50+ Features
//             </div>
//             <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-8">
//               Comprehensive Features for
//               <span className="block bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">
//                 Every School Need
//               </span>
//             </h2>
//             <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
//               Powerful features designed to streamline every aspect of school management with
//               <span className="text-orange-600 font-semibold"> cutting-edge technology</span>
//             </p>
//           </div>

//           {allFeatures.map((category, categoryIndex) => (
//             <div key={categoryIndex} className="mb-20">
//               <div className="text-center mb-12">
//                 <h3 className="text-3xl font-black bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent mb-4">
//                   {category.category}
//                 </h3>
//                 <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-amber-400 mx-auto rounded-full"></div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {category.items.map((feature, index) => (
//                   <div key={index} className="group relative">
//                     <div className="absolute -inset-2 bg-gradient-to-r from-orange-400 to-amber-400 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>

//                     <div className="relative bg-gradient-to-br from-orange-50 to-amber-50 hover:from-orange-100 hover:to-amber-100 rounded-2xl p-8 transition-all duration-500 hover:shadow-2xl border border-orange-100 hover:border-orange-300 group-hover:scale-105">
//                       <div className="flex items-start space-x-5">
//                         <div className="flex-shrink-0">
//                           <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
//                             <div className="text-2xl text-orange-500 group-hover:animate-pulse">
//                               {feature.icon}
//                             </div>
//                           </div>
//                         </div>
//                         <div className="flex-1">
//                           <h4 className="font-black text-xl text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
//                             {feature.name}
//                           </h4>
//                           <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Enhanced Benefits Section */}
//       <div className="py-24 bg-gradient-to-br from-orange-100 via-orange-50 to-amber-100 relative overflow-hidden">
//         {/* Animated Background */}
//         <div className="absolute inset-0">
//           <div className="absolute top-0 left-0 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl animate-pulse"></div>
//           <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-300/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '3s'}}></div>
//         </div>

//         <div className="container mx-auto px-6 relative z-10">
//           <div className="text-center mb-20">
//             <div className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full text-orange-700 font-bold mb-6 shadow-lg">
//               <FaAward className="mr-2 text-orange-500" />
//               Why Choose Us
//             </div>
//             <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-8">
//               Why Schools Choose
//               <span className="block bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">
//                 SkoolVriksh
//               </span>
//             </h2>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//             {benefits.map((benefit, index) => (
//               <div key={index} className="group relative">
//                 <div className="absolute -inset-4 bg-gradient-to-r from-orange-400 to-amber-400 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>

//                 <div className="relative flex items-start space-x-8 bg-white/90 backdrop-blur-sm rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border border-orange-100 group-hover:scale-105">
//                   <div className="flex-shrink-0">
//                     <div className="w-20 h-20 bg-gradient-to-r from-orange-100 to-amber-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//                       {benefit.icon}
//                     </div>
//                   </div>
//                   <div className="flex-1">
//                     <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-orange-600 transition-colors">
//                       {benefit.title}
//                     </h3>
//                     <p className="text-gray-600 mb-6 leading-relaxed text-lg">{benefit.description}</p>
//                     <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-100 to-amber-100 rounded-full font-black text-orange-700 group-hover:scale-105 transition-transform duration-300">
//                       <HiSparkles className="mr-2 text-orange-500" />
//                       {benefit.stats}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Enhanced Image Showcase Section */}
//       <div className="py-24 bg-white relative overflow-hidden">
//         <div className="container mx-auto px-6">
//           <div className="text-center mb-20">
//             <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-100 to-amber-100 rounded-full text-orange-700 font-bold mb-6">
//               <FaGlobe className="mr-2 animate-spin" />
//               Live in Action
//             </div>
//             <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-8">
//               SkoolVriksh in
//               <span className="block bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">
//                 Real Action
//               </span>
//             </h2>
//             <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
//               Experience how our platform transforms school management with these
//               <span className="text-orange-600 font-semibold"> real-world implementations</span>
//             </p>
//           </div>

//           <div className="relative group">
//             <div className="absolute -inset-8 bg-gradient-to-r from-orange-400 to-amber-400 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>

//             <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white group-hover:scale-105 transition-transform duration-500">
//               {schoolImages.map((image, index) => (
//                 <div
//                   key={index}
//                   className={`absolute inset-0 transition-all duration-2000 ${
//                     index === currentImageIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
//                   }`}
//                 >
//                   <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-transparent to-amber-900/20"></div>
//                   <img
//                     src={image}
//                     alt={`School Management System ${index + 1}`}
//                     className="w-full h-full object-cover"
//                   />

//                   {/* Overlay Content */}
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <div className="text-center text-white">
//                       <h3 className="text-4xl font-black mb-4 drop-shadow-lg">
//                         Modern School Management
//                       </h3>
//                       <p className="text-xl drop-shadow-md max-w-2xl mx-auto leading-relaxed px-4">
//                         Streamlined operations, enhanced communication, and data-driven insights
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ))}

//               {/* Navigation Dots */}
//               <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-4">
//                 {schoolImages.map((_, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setCurrentImageIndex(index)}
//                     className={`w-4 h-4 rounded-full transition-all duration-300 ${
//                       index === currentImageIndex
//                         ? "bg-white scale-125 shadow-lg"
//                         : "bg-white/50 hover:bg-white/75 hover:scale-110"
//                     }`}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Enhanced Testimonials Section */}
//       <div id="testimonials" className="py-24 bg-gradient-to-br from-gray-900 via-orange-900 to-gray-900 text-white relative overflow-hidden">
//         {/* Animated Background */}
//         <div className="absolute inset-0">
//           <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-orange-600/30 to-transparent"></div>
//           <div className="absolute bottom-0 right-0 w-1/2 h-full bg-gradient-to-l from-amber-600/30 to-transparent"></div>
//           <div className={`absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]`}></div>

//           {/* <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div> */}
//         </div>

//         <div className="container mx-auto px-6 relative z-10">
//           <div className="text-center mb-20">
//             <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-orange-300 font-bold mb-6 border border-orange-400/30">
//               <FaHeart className="mr-2 text-red-400 animate-pulse" />
//               Customer Love
//             </div>
//             <h2 className="text-5xl lg:text-6xl font-black mb-8">
//               Trusted by Educators
//               <span className="block text-orange-400">Across India</span>
//             </h2>
//             <p className="text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
//               Join thousands of satisfied educators who have
//               <span className="text-orange-400 font-semibold"> revolutionized </span>
//               their institutions
//             </p>
//           </div>

//           <div className="max-w-6xl mx-auto">
//             <div className="relative group">
//               <div className="absolute -inset-8 bg-gradient-to-r from-orange-600/20 to-amber-600/20 rounded-3xl blur-2xl"></div>

//               <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl p-12 lg:p-16 border border-orange-200/20 group-hover:bg-white/15 transition-all duration-500">
//                 <div className="text-center">
//                   {/* Star Rating */}
//                   <div className="flex justify-center mb-8">
//                     {[1, 2, 3, 4, 5].map((i) => (
//                       <FaStar
//                         key={i}
//                         className="text-orange-400 text-3xl mx-1 animate-pulse"
//                         style={{ animationDelay: `${i * 0.1}s` }}
//                       />
//                     ))}
//                   </div>

//                   {/* Testimonial Text */}
//                   <blockquote className="text-3xl lg:text-4xl font-light italic mb-12 leading-relaxed max-w-4xl mx-auto">
//                     <span className="text-orange-400 text-6xl leading-none">"</span>
//                     {testimonials[currentTestimonial].text}
//                     <span className="text-orange-400 text-6xl leading-none">"</span>
//                   </blockquote>

//                   {/* Author Info */}
//                   <div className="flex items-center justify-center space-x-6">
//                     <div className="relative">
//                       <div className="absolute -inset-2 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full blur opacity-50"></div>
//                       <img
//                         src={testimonials[currentTestimonial].image}
//                         alt={testimonials[currentTestimonial].name}
//                         className="relative w-20 h-20 rounded-full border-4 border-white shadow-xl"
//                       />
//                     </div>
//                     <div className="text-left">
//                       <div className="font-black text-2xl text-white mb-1">
//                         {testimonials[currentTestimonial].name}
//                       </div>
//                       <div className="text-orange-300 font-semibold text-lg">
//                         {testimonials[currentTestimonial].role}
//                       </div>
//                       <div className="text-orange-200 text-sm">
//                         {testimonials[currentTestimonial].school}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Navigation Dots */}
//             <div className="flex justify-center space-x-4 mt-12">
//               {testimonials.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setCurrentTestimonial(index)}
//                   className={`w-4 h-4 rounded-full transition-all duration-300 ${
//                     index === currentTestimonial
//                       ? "bg-orange-400 scale-125 shadow-lg"
//                       : "bg-orange-200/50 hover:bg-orange-300 hover:scale-110"
//                   }`}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Enhanced Demo Section */}
//       <div className="py-24 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white relative overflow-hidden">
//         {/* Animated Background */}
//         <div className="absolute inset-0">
//           <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-orange-700/50 to-transparent"></div>
//           <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-l from-amber-700/50 to-transparent"></div>
//         </div>

//         <div className="container mx-auto px-6 relative z-10">
//           <div className="max-w-6xl mx-auto text-center">
//             <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white font-bold mb-8 border border-white/30">
//               <FaVideo className="mr-2 animate-pulse" />
//               Live Demo
//             </div>

//             <h2 className="text-5xl lg:text-6xl font-black mb-8">
//               See SkoolVriksh in Action
//             </h2>
//             <p className="text-2xl text-orange-100 mb-16 leading-relaxed max-w-4xl mx-auto">
//               Schedule a personalized demo and discover how our platform can
//               <span className="text-white font-semibold"> transform your school</span>
//             </p>

//             {/* Features Grid */}
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
//               {[
//                 { icon: <FaVideo />, title: "Live Demo", desc: "Interactive walkthrough of all features" },
//                 { icon: <FaHeadset />, title: "Expert Guidance", desc: "Get answers from our education specialists" },
//                 { icon: <FaCog />, title: "Custom Setup", desc: "Tailored configuration for your school" }
//               ].map((item, index) => (
//                 <div key={index} className="text-center group">
//                   <div className="relative mb-6">
//                     <div className="absolute inset-0 bg-white/20 rounded-full blur-xl group-hover:bg-white/30 transition-all duration-300"></div>
//                     <div className="relative w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 border border-white/30">
//                       <div className="text-3xl text-white">{item.icon}</div>
//                     </div>
//                   </div>
//                   <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
//                   <p className="text-orange-100 leading-relaxed">{item.desc}</p>
//                 </div>
//               ))}
//             </div>

//             {/* CTA Button */}
//             <button className="group relative bg-white text-orange-600 font-bold py-5 px-12 rounded-full hover:scale-105 transition-all duration-300 shadow-2xl text-xl overflow-hidden">
//               <div className="absolute inset-0 bg-gradient-to-r from-orange-100 to-amber-100 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
//               <span className="relative flex items-center">
//                 <FaRocket className="mr-3 group-hover:animate-bounce" />
//                 Schedule Free Demo
//                 <FaArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
//               </span>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Enhanced Contact Section */}
//       <div id="contact" className="py-24 bg-gradient-to-br from-orange-50 via-white to-amber-50 relative overflow-hidden">
//         {/* Background Elements */}
//         <div className="absolute inset-0">
//           <div className="absolute top-0 left-0 w-64 h-64 bg-orange-200/30 rounded-full blur-3xl"></div>
//           <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl"></div>
//         </div>

//         <div className="container mx-auto px-6 relative z-10">
//           <div className="max-w-7xl mx-auto">
//             <div className="text-center mb-20">
//               <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-100 to-amber-100 rounded-full text-orange-700 font-bold mb-6">
//                 <FaEnvelope className="mr-2 animate-bounce" />
//                 Get in Touch
//               </div>
//               <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-8">
//                 Get Started
//                 <span className="block bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">
//                   Today
//                 </span>
//               </h2>
//               <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
//                 Ready to transform your school? Contact us for a
//                 <span className="text-orange-600 font-semibold"> free consultation </span>
//                 and personalized setup
//               </p>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
//               {/* Contact Information */}
//               <div className="space-y-10">
//                 {[
//                   {
//                     icon: <FaPhone className="text-orange-600 text-2xl" />,
//                     title: "Call Us",
//                     info: ["+91 98765 43210", "Mon-Fri, 9AM-6PM IST"],
//                     gradient: "from-orange-100 to-orange-200"
//                   },
//                   {
//                     icon: <FaEnvelope className="text-orange-600 text-2xl" />,
//                     title: "Email Us",
//                     info: ["info@skoolvriksh.com", "We'll respond within 2 hours"],
//                     gradient: "from-amber-100 to-amber-200"
//                   },
//                   {
//                     icon: <FaMapMarkerAlt className="text-orange-600 text-2xl" />,
//                     title: "Visit Us",
//                     info: ["123 Education Hub", "New Delhi, India 110001"],
//                     gradient: "from-orange-100 to-amber-100"
//                   }
//                 ].map((contact, index) => (
//                   <div key={index} className="group relative">
//                     <div className="absolute -inset-2 bg-gradient-to-r from-orange-400 to-amber-400 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>

//                     <div className="relative flex items-start space-x-6 p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-orange-100 group-hover:scale-105">
//                       <div className={`w-16 h-16 bg-gradient-to-r ${contact.gradient} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
//                         {contact.icon}
//                       </div>
//                       <div>
//                         <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-orange-600 transition-colors">
//                           {contact.title}
//                         </h3>
//                         {contact.info.map((line, idx) => (
//                           <p key={idx} className="text-gray-600 text-lg leading-relaxed">
//                             {line}
//                           </p>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Contact Form */}
//               <div className="relative group">
//                 <div className="absolute -inset-4 bg-gradient-to-r from-orange-400 to-amber-400 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>

//                 <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-orange-100">
//                   <h3 className="text-3xl font-black text-gray-900 mb-8 text-center">
//                     Request Information
//                   </h3>

//                   <div className="space-y-6">
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                       <div className="relative group/input">
//                         <input
//                           type="text"
//                           placeholder="School Name"
//                           className="w-full px-6 py-4 border-2 border-orange-200 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 bg-white/80 backdrop-blur-sm group-hover/input:border-orange-300"
//                         />
//                       </div>
//                       <div className="relative group/input">
//                         <input
//                           type="text"
//                           placeholder="Your Name"
//                           className="w-full px-6 py-4 border-2 border-orange-200 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 bg-white/80 backdrop-blur-sm group-hover/input:border-orange-300"
//                         />
//                       </div>
//                     </div>

//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                       <div className="relative group/input">
//                         <input
//                           type="email"
//                           placeholder="Email Address"
//                           className="w-full px-6 py-4 border-2 border-orange-200 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 bg-white/80 backdrop-blur-sm group-hover/input:border-orange-300"
//                         />
//                       </div>
//                       <div className="relative group/input">
//                         <input
//                           type="tel"
//                           placeholder="Phone Number"
//                           className="w-full px-6 py-4 border-2 border-orange-200 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 bg-white/80 backdrop-blur-sm group-hover/input:border-orange-300"
//                         />
//                       </div>
//                     </div>

//                     <div className="relative group/input">
//                       <select className="w-full px-6 py-4 border-2 border-orange-200 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 bg-white/80 backdrop-blur-sm group-hover/input:border-orange-300">
//                         <option>Number of Students</option>
//                         <option>Under 200</option>
//                         <option>200-500</option>
//                         <option>500-1000</option>
//                         <option>1000+</option>
//                       </select>
//                     </div>

//                     <div className="relative group/input">
//                       <textarea
//                         placeholder="Tell us about your requirements"
//                         rows="5"
//                         className="w-full px-6 py-4 border-2 border-orange-200 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 bg-white/80 backdrop-blur-sm group-hover/input:border-orange-300 resize-none"
//                       ></textarea>
//                     </div>

//                     <button
//                       type="button"
//                       className="group/btn w-full bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white font-bold py-5 px-8 rounded-xl hover:scale-105 transition-all duration-300 shadow-xl relative overflow-hidden"
//                     >
//                       <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
//                       <span className="relative flex items-center justify-center text-lg">
//                         <FaRocket className="mr-3 group-hover/btn:animate-bounce" />
//                         Send Request
//                         <FaArrowRight className="ml-3 group-hover/btn:translate-x-2 transition-transform" />
//                       </span>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Enhanced CTA Section */}
//       <div className="py-24 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white relative overflow-hidden">
//         {/* Animated Background */}
//         <div className="absolute inset-0">
//           <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-orange-700/30 to-transparent animate-pulse"></div>
//           <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-l from-amber-700/30 to-transparent animate-pulse" style={{animationDelay: '1s'}}></div>
//         </div>

//         <div className="container mx-auto px-6 relative z-10">
//           <div className="max-w-6xl mx-auto text-center">
//             <div className="inline-flex items-center px-8 py-4 bg-white/20 backdrop-blur-sm rounded-full text-white font-bold mb-8 border border-white/30">
//               <FaRocket className="mr-3 animate-bounce" />
//               Ready to Launch?
//             </div>

//             <h2 className="text-6xl lg:text-7xl font-black mb-8 leading-tight">
//               Ready to Transform
//               <span className="block text-orange-200">
//                 Your School?
//               </span>
//             </h2>

//             <p className="text-2xl text-orange-100 mb-16 leading-relaxed max-w-4xl mx-auto">
//               Join over <span className="text-white font-black">1000 schools</span> who trust SkoolVriksh for their
//               <span className="text-white font-semibold"> complete management needs</span>
//             </p>

//             {/* CTA Buttons */}
//             <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-16">
//               {isAuthenticated ? (
//                 <button className="group relative bg-white text-orange-600 font-bold py-6 px-16 rounded-full hover:scale-110 transition-all duration-300 shadow-2xl text-xl overflow-hidden">
//                   <div className="absolute inset-0 bg-gradient-to-r from-orange-100 to-amber-100 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
//                   <span className="relative flex items-center">
//                     <FaUser className="mr-3 group-hover:animate-spin" />
//                     Go to Dashboard
//                     <FaArrowRight className="ml-3 group-hover:translate-x-3 transition-transform" />
//                   </span>
//                 </button>
//               ) : (
//                 <>
//                   <button
//                     onClick={() => setIsAuthenticated(true)}
//                     className="group relative bg-white text-orange-600 font-bold py-6 px-16 rounded-full hover:scale-110 transition-all duration-300 shadow-2xl text-xl overflow-hidden"
//                   >
//                     <div className="absolute inset-0 bg-gradient-to-r from-orange-100 to-amber-100 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
//                     <span className="relative flex items-center">
//                       <FaMagic className="mr-3 group-hover:animate-spin" />
//                       Start Free Trial
//                       <FaArrowRight className="ml-3 group-hover:translate-x-3 transition-transform" />
//                     </span>
//                   </button>

//                   <button className="group bg-transparent text-white font-bold py-6 px-16 rounded-full border-4 border-white/50 hover:bg-white hover:text-orange-600 hover:scale-110 transition-all duration-300 text-xl backdrop-blur-sm">
//                     <span className="flex items-center">
//                       <FaVideo className="mr-3 group-hover:animate-pulse" />
//                       Watch Demo
//                     </span>
//                   </button>
//                 </>
//               )}
//             </div>

//             {/* Feature Highlights */}
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
//               {[
//                 { icon: <FaCheck />, text: "30-day free trial", color: "text-green-300" },
//                 { icon: <FaCheck />, text: "No setup fees", color: "text-green-300" },
//                 { icon: <FaCheck />, text: "24/7 support included", color: "text-green-300" }
//               ].map((item, index) => (
//                 <div key={index} className="flex items-center justify-center space-x-3 group">
//                   <div className={`${item.color} text-2xl group-hover:animate-bounce`}>
//                     {item.icon}
//                   </div>
//                   <span className="text-orange-100 text-lg font-semibold group-hover:text-white transition-colors">
//                     {item.text}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Enhanced Footer */}
//       <footer className="bg-gray-900 text-white py-20 relative overflow-hidden">
//         {/* Background Pattern */}
//         <div className="absolute inset-0 opacity-5">
//           <div className="absolute inset-0 bg-gradient-to-br from-orange-600 to-amber-600"></div>
//         </div>

//         <div className="container mx-auto px-6 relative z-10">
//           <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
//             {/* Brand Section */}
//             <div className="lg:col-span-1">
//               <div className="flex items-center space-x-4 mb-8 group">
//                 <div className="relative">
//                   <div className="w-16 h-16 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
//                     <FaGraduationCap className="text-white text-3xl animate-pulse" />
//                   </div>
//                   <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full animate-ping"></div>
//                 </div>
//                 <div>
//                   <span className="text-3xl font-black bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
//                     SkoolVriksh
//                   </span>
//                   <div className="text-sm text-orange-400 font-semibold tracking-wider">
//                     SCHOOL MANAGEMENT SYSTEM
//                   </div>
//                 </div>
//               </div>

//               <p className="text-gray-400 leading-relaxed mb-8 text-lg">
//                 Empowering educational institutions with comprehensive management solutions for over a decade.
//                 <span className="text-orange-400 font-semibold"> Trusted by thousands.</span>
//               </p>

//               {/* Social Links */}
//               <div className="flex space-x-4">
//                 {['📘', '🐦', '💼', '📺'].map((emoji, index) => (
//                   <div key={index} className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-gradient-to-r hover:from-orange-600 hover:to-amber-600 transition-all duration-300 cursor-pointer hover:scale-110 hover:shadow-lg group">
//                     <span className="text-xl group-hover:animate-bounce">{emoji}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Footer Links */}
//             {[
//               {
//                 title: "Product",
//                 links: ["Features", "Modules", "Pricing", "Mobile Apps", "Integrations"]
//               },
//               {
//                 title: "Company",
//                 links: ["About Us", "Careers", "Blog", "Press", "Partners"]
//               },
//               {
//                 title: "Support",
//                 links: ["Help Center", "Contact Us", "Training", "System Status", "Security"]
//               }
//             ].map((section, index) => (
//               <div key={index}>
//                 <h3 className="text-xl font-black mb-8 text-orange-400 flex items-center">
//                   <div className="w-2 h-2 bg-orange-400 rounded-full mr-3 animate-pulse"></div>
//                   {section.title}
//                 </h3>
//                 <ul className="space-y-4">
//                   {section.links.map((link, linkIndex) => (
//                     <li key={linkIndex}>
//                       <a href="#" className="text-gray-400 hover:text-orange-300 transition-colors duration-300 text-lg hover:translate-x-2 inline-block">
//                         {link}
//                       </a>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>

//           {/* Footer Bottom */}
//           <div className="border-t border-orange-800/50 pt-12">
//             <div className="flex flex-col lg:flex-row justify-between items-center">
//               <div className="flex items-center space-x-4 mb-6 lg:mb-0">
//                 <p className="text-gray-400 text-lg">
//                   © 2024 SkoolVriksh. All rights reserved.
//                 </p>
//                 <div className="flex items-center space-x-2">
//                   <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
//                   <span className="text-green-400 text-sm font-semibold">Online</span>
//                 </div>
//               </div>

//               <div className="flex space-x-8 text-gray-400">
//                 {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item, index) => (
//                   <a key={index} href="#" className="hover:text-orange-300 transition-colors duration-300 text-lg">
//                     {item}
//                   </a>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </footer>

//       {/* Floating Action Button */}
//       <div className="fixed bottom-8 right-8 z-50">
//         <div className="relative group">
//           <div className="absolute -inset-4 bg-gradient-to-r from-orange-600 to-amber-600 rounded-full blur-xl opacity-50 group-hover:opacity-75 animate-pulse"></div>
//           <button className="relative bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300">
//             <FaComments className="text-2xl animate-bounce" />
//           </button>
//         </div>
//       </div>

//       {/* Custom Styles */}
//       <style jsx>{`
//         @keyframes gradient {
//           0%, 100% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//         }

//         .animate-gradient {
//           background-size: 200% 200%;
//           animation: gradient 3s ease infinite;
//         }

//         .animate-fade-in {
//           animation: fadeIn 1s ease-out;
//         }

//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(30px); }
//           to { opacity: 1; transform: translateY(0); }
//         }

//         .hover\:shadow-3xl:hover {
//           box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.3);
//         }
//       `}</style>
//     </div>
//   );
// }



import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  FaChalkboardTeacher,
  FaUserGraduate,
  FaBook,
  FaChartLine,
  FaClock,
  FaShieldAlt,
  FaPlay,
  FaCheck,
  FaStar,
  FaArrowRight,
  FaUsers,
  FaGraduationCap,
  FaAward,
  FaLightbulb,
  FaBars,
  FaTimes,
  FaUser,
  FaMoneyBillWave,
  FaBus,
  FaBookOpen,
  FaCalendarAlt,
  FaClipboardList,
  FaUserCheck,
  FaMobile,
  FaCloud,
  FaLock,
  FaBell,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaDownload,
  FaVideo,
  FaHeadset,
  FaCog,
  FaDatabase,
  FaSync,
  FaPrint,
  FaFileAlt,
  FaCalculator,
  FaMedkit,
  FaFlask,
  FaComments,
  FaRocket,
  FaHeart,
  FaMagic,
  FaGlobe,
  FaInfinity,
  FaAtom,
  FaBolt,
} from "react-icons/fa";

import { HiSparkles } from "react-icons/hi";

export default function UltraModernHome() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeModule, setActiveModule] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // School images for auto-scrolling slider
  const schoolImages = [
    "/images/sv1.jpg",
    "/images/sv2.jpg",
    "/images/sv3.jpg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % schoolImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const coreModules = [
    {
      title: "Student Management",
      description:
        "AI-powered student information system with predictive analytics, automated workflows, and comprehensive academic tracking",
      icon: <FaUserGraduate className="text-4xl" />,
      features: [
        "Smart Registration",
        "Predictive Analytics",
        "Academic Insights",
        "Health Monitoring",
        "Parent Integration",
      ],
      gradient: "from-violet-600 via-purple-600 to-indigo-600",
      color: "violet",
    },
    {
      title: "Faculty Excellence",
      description:
        "Revolutionary teacher management with AI-driven performance insights, automated scheduling, and professional development tracking",
      icon: <FaChalkboardTeacher className="text-4xl" />,
      features: [
        "AI Performance Insights",
        "Smart Scheduling",
        "Growth Tracking",
        "Collaboration Tools",
        "Resource Management",
      ],
      gradient: "from-cyan-500 via-teal-500 to-emerald-500",
      color: "cyan",
    },
    {
      title: "Academic Intelligence",
      description:
        "Next-generation curriculum management with adaptive learning paths, real-time assessment, and outcome prediction",
      icon: <FaBook className="text-4xl" />,
      features: [
        "Adaptive Learning",
        "Smart Assessments",
        "Progress Prediction",
        "Curriculum Optimization",
        "Learning Analytics",
      ],
      gradient: "from-rose-500 via-pink-500 to-fuchsia-500",
      color: "rose",
    },
    {
      title: "Financial Intelligence",
      description:
        "Advanced financial ecosystem with blockchain security, automated reconciliation, and predictive budget planning",
      icon: <FaMoneyBillWave className="text-4xl" />,
      features: [
        "Blockchain Security",
        "Auto Reconciliation",
        "Budget Prediction",
        "Revenue Optimization",
        "Financial Insights",
      ],
      gradient: "from-amber-500 via-orange-500 to-red-500",
      color: "amber",
    },
  ];

  const allFeatures = [
    {
      category: "🎓 Academic Excellence",
      gradient: "from-purple-600 to-indigo-600",
      items: [
        {
          name: "Neural Student Profiles",
          icon: <FaUserGraduate className="text-purple-500" />,
          desc: "AI-powered comprehensive student analytics",
        },
        {
          name: "Smart Admissions",
          icon: <FaClipboardList className="text-indigo-500" />,
          desc: "Automated admission with predictive matching",
        },
        {
          name: "Biometric Attendance",
          icon: <FaUserCheck className="text-violet-500" />,
          desc: "Contactless attendance with real-time alerts",
        },
        {
          name: "Quantum Assessments",
          icon: <FaFileAlt className="text-purple-600" />,
          desc: "AI-proctored exams with instant insights",
        },
        {
          name: "Adaptive Grading",
          icon: <FaCalculator className="text-indigo-600" />,
          desc: "Machine learning powered evaluation system",
        },
        {
          name: "Holographic Scheduling",
          icon: <FaCalendarAlt className="text-violet-600" />,
          desc: "3D visualization of optimal timetables",
        },
      ],
    },
    {
      category: "🌐 Digital Ecosystem",
      gradient: "from-cyan-500 to-teal-500",
      items: [
        {
          name: "Metaverse Portals",
          icon: <FaUsers className="text-cyan-500" />,
          desc: "Virtual reality parent-teacher conferences",
        },
        {
          name: "Neural Notifications",
          icon: <FaBell className="text-teal-500" />,
          desc: "AI-personalized communication system",
        },
        {
          name: "Quantum Mobile App",
          icon: <FaMobile className="text-cyan-600" />,
          desc: "Cross-platform with offline-first architecture",
        },
        {
          name: "Holographic Meetings",
          icon: <FaVideo className="text-teal-600" />,
          desc: "3D immersive virtual classrooms",
        },
        {
          name: "Telepathic Messaging",
          icon: <FaEnvelope className="text-cyan-700" />,
          desc: "Intent-based communication system",
        },
        {
          name: "Digital Twin Campus",
          icon: <FaComments className="text-teal-700" />,
          desc: "Virtual replica of physical infrastructure",
        },
      ],
    },
    {
      category: "💰 Financial Quantum",
      gradient: "from-emerald-500 to-green-500",
      items: [
        {
          name: "Crypto Fee Gateway",
          icon: <FaMoneyBillWave className="text-emerald-500" />,
          desc: "Blockchain-secured payment processing",
        },
        {
          name: "AI Payroll Engine",
          icon: <FaCalculator className="text-green-500" />,
          desc: "Automated salary optimization system",
        },
        {
          name: "Quantum Accounting",
          icon: <FaDatabase className="text-emerald-600" />,
          desc: "Real-time financial state management",
        },
        {
          name: "Predictive Budgeting",
          icon: <FaChartLine className="text-green-600" />,
          desc: "ML-powered financial forecasting",
        },
        {
          name: "Smart Expense AI",
          icon: <FaClipboardList className="text-emerald-700" />,
          desc: "Automated expense categorization",
        },
        {
          name: "Revenue Optimization",
          icon: <FaPrint className="text-green-700" />,
          desc: "Dynamic pricing and revenue streams",
        },
      ],
    },
    {
      category: "🚀 Operations Matrix",
      gradient: "from-rose-500 to-pink-500",
      items: [
        {
          name: "Autonomous Transport",
          icon: <FaBus className="text-rose-500" />,
          desc: "Self-driving school bus fleet management",
        },
        {
          name: "Digital Library 3.0",
          icon: <FaBookOpen className="text-pink-500" />,
          desc: "AR/VR enhanced learning resources",
        },
        {
          name: "Quantum Inventory",
          icon: <FaDatabase className="text-rose-600" />,
          desc: "Predictive asset lifecycle management",
        },
        {
          name: "Biometric Health",
          icon: <FaMedkit className="text-pink-600" />,
          desc: "Continuous health monitoring system",
        },
        {
          name: "Smart Laboratory",
          icon: <FaFlask className="text-rose-700" />,
          desc: "IoT-enabled experimental environments",
        },
        {
          name: "Neural Facilities",
          icon: <FaUsers className="text-pink-700" />,
          desc: "AI-optimized resource allocation",
        },
      ],
    },
  ];

  const benefits = [
    {
      title: "Quantum Efficiency",
      description:
        "Leverage quantum computing principles to achieve 95% operational efficiency with predictive automation",
      icon: <FaAtom className="text-6xl text-purple-500" />,
      stats: "95% Efficiency",
      gradient: "from-purple-600 to-indigo-600",
    },
    {
      title: "Neural Communication",
      description:
        "AI-powered communication matrix connecting every stakeholder with intelligent message routing",
      icon: <FaBolt className="text-6xl text-cyan-500" />,
      stats: "Instant Connect",
      gradient: "from-cyan-500 to-teal-500",
    },
    {
      title: "Predictive Intelligence",
      description:
        "Machine learning algorithms provide actionable insights and predict outcomes before they happen",
      icon: <FaInfinity className="text-6xl text-emerald-500" />,
      stats: "Future Insights",
      gradient: "from-emerald-500 to-green-500",
    },
    {
      title: "Fortress Security",
      description:
        "Military-grade encryption with quantum-resistant security protocols and 99.99% uptime guarantee",
      icon: <FaShieldAlt className="text-6xl text-rose-500" />,
      stats: "99.99% Uptime",
      gradient: "from-rose-500 to-pink-500",
    },
  ];

  const testimonials = [
    {
      text: "SkoolVriksh has revolutionized our entire educational ecosystem. The AI-powered insights and seamless integration have transformed how we manage our institution.",
      name: "Dr. Priya Sharma",
      role: "Principal & EdTech Innovator",
      school: "Delhi Public School, Mumbai",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      rating: 5,
    },
    {
      text: "The quantum leap in parent engagement and communication has been phenomenal. Our community feels more connected than ever before.",
      name: "Rajesh Kumar",
      role: "Academic Director & Innovation Lead",
      school: "St. Mary's Convent School",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      rating: 5,
    },
    {
      text: "As a parent, the real-time insights into my child's progress and the intuitive interface make school management transparent and engaging.",
      name: "Sunita Patel",
      role: "Parent & Community Advocate",
      school: "Kendriya Vidyalaya",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      rating: 5,
    },
  ];

  const stats = [
    {
      number: "2000+",
      label: "Schools Transformed",
      icon: <FaGraduationCap className="text-purple-500" />,
      gradient: "from-purple-500 to-indigo-500",
    },
    {
      number: "100K+",
      label: "Active Students",
      icon: <FaUsers className="text-cyan-500" />,
      gradient: "from-cyan-500 to-teal-500",
    },
    {
      number: "10K+",
      label: "Educators",
      icon: <FaChalkboardTeacher className="text-emerald-500" />,
      gradient: "from-emerald-500 to-green-500",
    },
    {
      number: "99.99%",
      label: "Reliability",
      icon: <FaAward className="text-rose-500" />,
      gradient: "from-rose-500 to-pink-500",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const moduleInterval = setInterval(() => {
      setActiveModule((prev) => (prev + 1) % coreModules.length);
    }, 5000);
    return () => clearInterval(moduleInterval);
  }, []);

  return (
    // <div className="font-sans overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white relative">
    <div className="font-sans overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-orange-600 text-white relative">
      {/* Animated Cursor Trail */}
      <div
        className="fixed w-6 h-6 pointer-events-none z-50 mix-blend-difference"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transition: "all 0.1s ease-out",
        }}
      >
        <div className="w-full h-full bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full blur-sm animate-pulse"></div>
      </div>

      {/* Dynamic Particle System */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${10 + Math.random() * 20}s`,
            }}
          >
            <div
              className={`w-2 h-2 rounded-full bg-gradient-to-r ${
                [
                  "from-purple-400 to-pink-400",
                  "from-cyan-400 to-blue-400",
                  "from-emerald-400 to-teal-400",
                  "from-rose-400 to-orange-400",
                ][Math.floor(Math.random() * 4)]
              } opacity-30 animate-pulse`}
            ></div>
          </div>
        ))}
      </div>

      {/* Glassmorphism Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrollY > 50
            ? "bg-slate-900/80 backdrop-blur-2xl border-b border-purple-500/20 shadow-2xl shadow-purple-500/10"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4 group cursor-pointer">
              <div className="relative">
                
                <div className="w-16 h-16  from-orange-600 via-orange-500 to-orange-600 rounded-3xl flex items-center justify-center ">
                  <img
                    src="/images/skoolvriksh-logo.jpg"
                    alt="SkoolVriksh Logo"
                    className="w-20 h-20 object-contain"
                  />
                </div>
                {/* <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-ping"></div>
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"></div> */}
              </div>
              <div>
                <span className="text-4xl font-black bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
                  SkoolVriksh
                </span>
                <div className="text-xs text-purple-300 font-bold tracking-widest">
                  QUANTUM EDUCATION PLATFORM
                </div>
              </div>
            </div>

            <nav className="hidden lg:flex items-center space-x-8">
              {["Features", "Modules", "Pricing", "Reviews", "Contact"].map(
                (item, index) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="relative text-slate-300 hover:text-purple-400 font-bold transition-all duration-500 group text-lg"
                  >
                    <span className="relative z-10">{item}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 group-hover:w-full transition-all duration-500"></span>
                    <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10"></span>
                  </a>
                )
              )}
            </nav>

            <div className="hidden lg:flex items-center space-x-4">
              {isAuthenticated ? (
                <Link
                  href="/dashboard"
                  className="group relative flex items-center space-x-3 bg-gradient-to-r from-purple-600 via-cyan-500 to-purple-600 text-white font-bold py-3 px-8 rounded-2xl hover:scale-105 transition-all duration-500 shadow-2xl shadow-purple-500/30 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <FaUser className="text-lg relative z-10" />
                  <span className="relative z-10">Dashboard</span>
                  <div className="absolute top-0 left-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="group relative bg-gradient-to-r from-slate-800 to-slate-700 text-purple-300 hover:text-white font-bold py-3 px-8 rounded-2xl transition-all duration-500 hover:scale-105 border border-purple-500/30 hover:border-purple-400/50 shadow-lg hover:shadow-purple-500/20"
                >
                  <span className="relative z-10">Skool Login</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                </Link>
              )}
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-4 rounded-2xl text-slate-300 hover:text-purple-400 hover:bg-purple-500/10 transition-all duration-500 hover:scale-110"
            >
              {isMenuOpen ? (
                <FaTimes className="text-2xl" />
              ) : (
                <FaBars className="text-2xl" />
              )}
            </button>
          </div>

          {/* Enhanced Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-2xl border-b border-purple-500/20 shadow-2xl rounded-b-3xl">
              <div className="py-8 px-6 space-y-6">
                {["Features", "Modules", "Pricing", "Reviews", "Contact"].map(
                  (item) => (
                    <a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      className="block text-slate-300 hover:text-purple-400 font-bold py-4 hover:bg-purple-500/10 rounded-2xl px-6 transition-all duration-500 text-lg"
                    >
                      {item}
                    </a>
                  )
                )}
                <div className="pt-6 border-t border-purple-500/20">
                  {isAuthenticated ? (
                    <Link
                      href="/dashboard"
                      className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-bold py-4 px-6 rounded-2xl shadow-2xl"
                    >
                      <FaUser className="text-lg" />
                      <span>Dashboard</span>
                    </Link>
                  ) : (
                    <Link
                      href="/login"
                      className="w-full block text-center bg-gradient-to-r from-slate-800 to-slate-700 text-purple-300 font-bold py-4 px-6 rounded-2xl border border-purple-500/30"
                    >
                      Skool Login
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Revolutionary Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
            `,
              backgroundSize: "50px 50px",
              animation: "grid-move 20s linear infinite",
            }}
          ></div>
        </div>

        {/* Dynamic Background Orbs */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-rose-600/20 to-orange-600/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "4s" }}
          ></div>
        </div>

        <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
          <div className="text-center max-w-6xl mx-auto">
            {/* Revolutionary Badge */}
            <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-900/50 to-cyan-900/50 backdrop-blur-xl rounded-full text-purple-300 font-bold mb-8 border border-purple-500/30 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 group">
              <FaRocket className="mr-3 text-purple-400 group-hover:animate-spin" />
              <span className="flex items-center text-lg">
                #1 Quantum Education Platform in the Universe
                <HiSparkles className="ml-3 text-cyan-400 animate-pulse" />
              </span>
            </div>

            {/* Mind-Blowing Headline */}
            <h1 className="text-7xl lg:text-9xl font-black leading-tight mb-8">
              <span className="block bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
                QUANTUM
              </span>
              <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-rose-400 bg-clip-text text-transparent">
                EDUCATION
              </span>
              <span className="block bg-gradient-to-r from-rose-400 via-orange-400 to-emerald-400 bg-clip-text text-transparent">
                REVOLUTION
              </span>
            </h1>

            {/* Epic Subtitle */}
            <p className="text-3xl text-slate-300 leading-relaxed max-w-5xl mx-auto mb-12">
              Experience the future of education with our
              <span className="text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text font-bold">
                {" "}
                AI-powered quantum platform{" "}
              </span>
              that transcends traditional school management into a revolutionary
              digital ecosystem.
            </p>

            {/* Futuristic CTA Buttons */}
            <div className="flex flex-col lg:flex-row gap-8 justify-center items-center mb-20">
              {isAuthenticated ? (
                <Link
                  href="/dashboard"
                  className="group relative bg-gradient-to-r from-purple-600 via-cyan-500 to-purple-600 text-white font-bold py-6 px-16 rounded-full hover:scale-110 transition-all duration-500 shadow-2xl shadow-purple-500/30 text-2xl overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <span className="relative flex items-center justify-center">
                    <FaRocket className="mr-4 group-hover:animate-bounce text-2xl" />
                    Enter Quantum Dashboard
                    <FaArrowRight className="ml-4 group-hover:translate-x-3 transition-transform text-2xl" />
                  </span>
                  <div className="absolute top-0 left-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </Link>
              ) : (
                <>
                  <button className="group relative bg-gradient-to-r from-purple-600 via-cyan-500 to-purple-600 text-white font-bold py-6 px-16 rounded-full hover:scale-110 transition-all duration-500 shadow-2xl shadow-purple-500/30 text-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <span className="relative flex items-center justify-center">
                      <FaAtom className="mr-4 group-hover:animate-spin text-2xl" />
                      Start Quantum Journey
                      <FaArrowRight className="ml-4 group-hover:translate-x-3 transition-transform text-2xl" />
                    </span>
                    <div className="absolute top-0 left-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  </button>

                  <button className="group relative bg-transparent text-purple-300 font-bold py-6 px-16 rounded-full border-4 border-purple-500/50 hover:bg-purple-500/20 hover:text-white hover:scale-110 transition-all duration-500 text-2xl backdrop-blur-xl">
                    <span className="flex items-center">
                      <FaVideo className="mr-4 group-hover:animate-pulse text-2xl" />
                      Experience Demo
                    </span>
                  </button>
                </>
              )}
            </div>

            {/* Quantum Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
              {stats.map((stat, index) => (
                <div key={index} className="group relative">
                  <div
                    className={`absolute -inset-4 bg-gradient-to-r ${stat.gradient} rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-all duration-500`}
                  ></div>
                  <div className="relative bg-slate-900/50 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-500 group-hover:scale-105">
                    <div className="text-6xl mb-4 text-center group-hover:animate-pulse">
                      {stat.icon}
                    </div>
                    <div
                      className={`text-4xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2 text-center`}
                    >
                      {stat.number}
                    </div>
                    <div className="text-slate-400 font-bold text-center text-lg">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quantum Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center space-y-4 animate-bounce">
            <div className="w-8 h-16 border-2 border-purple-400 rounded-full flex justify-center backdrop-blur-xl">
              <div className="w-2 h-4 bg-gradient-to-b from-purple-400 to-cyan-400 rounded-full mt-2 animate-pulse"></div>
            </div>
            <span className="text-purple-300 font-semibold text-sm">
              Scroll to Explore
            </span>
          </div>
        </div>
      </div>

      {/* Quantum Modules Section */}
      <div id="modules" className="py-32 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900/20 via-transparent to-cyan-900/20"></div>
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.2) 0%, transparent 50%),
                               radial-gradient(circle at 75% 75%, rgba(6, 182, 212, 0.2) 0%, transparent 50%)`,
              }}
            ></div>
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-900/50 to-cyan-900/50 backdrop-blur-xl rounded-full text-purple-300 font-bold mb-8 border border-purple-500/30">
              <FaAtom className="mr-3 animate-spin" />
              Quantum Core Modules
            </div>
            <h2 className="text-6xl lg:text-8xl font-black mb-8">
              <span className="block text-slate-200">NEXT-GEN</span>
              <span className="block bg-gradient-to-r from-purple-400 via-cyan-400 to-rose-400 bg-clip-text text-transparent">
                ECOSYSTEM
              </span>
            </h2>
            <p className="text-2xl text-slate-300 max-w-5xl mx-auto leading-relaxed">
              Revolutionary modules powered by quantum computing and artificial
              intelligence,
              <span className="text-purple-400 font-bold">
                {" "}
                redefining educational management{" "}
              </span>
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Module Navigation */}
            <div className="space-y-8">
              {coreModules.map((module, index) => (
                <div
                  key={index}
                  className={`group relative p-10 rounded-3xl border-2 cursor-pointer transition-all duration-700 ${
                    activeModule === index
                      ? `bg-gradient-to-r ${module.gradient}/20 border-${module.color}-400 shadow-2xl shadow-${module.color}-500/20 scale-105`
                      : "bg-slate-900/30 backdrop-blur-xl border-slate-700/50 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10"
                  }`}
                  onClick={() => setActiveModule(index)}
                >
                  {/* Glow Effect */}
                  {activeModule === index && (
                    <div
                      className={`absolute -inset-4 bg-gradient-to-r ${module.gradient} rounded-3xl blur-2xl opacity-30 animate-pulse`}
                    ></div>
                  )}

                  <div className="relative flex items-start space-x-8">
                    <div className="flex-shrink-0">
                      <div
                        className={`w-20 h-20 rounded-3xl flex items-center justify-center transition-all duration-500 ${
                          activeModule === index
                            ? `bg-gradient-to-r ${module.gradient} text-white scale-110 shadow-2xl`
                            : "bg-slate-800/50 text-slate-400 group-hover:scale-105 group-hover:bg-slate-700/50"
                        }`}
                      >
                        {module.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3
                        className={`text-3xl font-black mb-4 transition-colors duration-500 ${
                          activeModule === index
                            ? "text-white"
                            : "text-slate-300 group-hover:text-purple-400"
                        }`}
                      >
                        {module.title}
                      </h3>
                      <p className="text-slate-400 mb-8 leading-relaxed text-lg">
                        {module.description}
                      </p>
                      {activeModule === index && (
                        <div className="space-y-4 animate-fade-in">
                          {module.features.map((feature, idx) => (
                            <div
                              key={idx}
                              className="flex items-center text-slate-300 group/item hover:text-white transition-colors"
                            >
                              <div
                                className={`w-8 h-8 bg-gradient-to-r ${module.gradient} rounded-full flex items-center justify-center mr-4 group-hover/item:scale-110 transition-transform`}
                              >
                                <FaCheck className="text-white text-sm" />
                              </div>
                              <span className="font-semibold text-lg">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Module Showcase */}
            <div className="relative">
              <div
                className={`absolute -inset-8 bg-gradient-to-r ${coreModules[activeModule].gradient} rounded-3xl blur-3xl opacity-20 animate-pulse`}
              ></div>

              <div className="relative bg-slate-900/70 backdrop-blur-2xl rounded-3xl shadow-2xl p-12 border border-slate-700/50">
                <div className="text-center mb-10">
                  <div
                    className={`inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-r ${coreModules[activeModule].gradient} text-white mb-8 shadow-2xl`}
                  >
                    <div className="text-5xl animate-pulse">
                      {coreModules[activeModule].icon}
                    </div>
                  </div>
                  <h3 className="text-4xl font-black text-white mb-6">
                    {coreModules[activeModule].title}
                  </h3>
                  <p className="text-slate-300 text-xl leading-relaxed">
                    {coreModules[activeModule].description}
                  </p>
                </div>

                <div className="space-y-6">
                  {coreModules[activeModule].features.map((feature, index) => (
                    <div
                      key={index}
                      className="group flex items-center p-6 bg-slate-800/30 backdrop-blur-sm rounded-2xl hover:bg-slate-700/30 transition-all duration-500 border border-slate-700/30 hover:border-purple-500/30"
                    >
                      <div
                        className={`w-10 h-10 bg-gradient-to-r ${coreModules[activeModule].gradient} rounded-full flex items-center justify-center mr-6 group-hover:scale-110 transition-transform`}
                      >
                        <FaCheck className="text-white" />
                      </div>
                      <span className="text-slate-300 font-bold text-lg group-hover:text-white transition-colors">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Revolutionary Features Section */}
      <div id="features" className="py-32 relative overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950/50 to-slate-950"></div>
          <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-600/10 to-cyan-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-rose-600/10 to-orange-600/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "3s" }}
          ></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-900/50 to-cyan-900/50 backdrop-blur-xl rounded-full text-purple-300 font-bold mb-8 border border-purple-500/30">
              <HiSparkles className="mr-3 animate-spin" />
              100+ Quantum Features
            </div>
            <h2 className="text-6xl lg:text-8xl font-black mb-8">
              <span className="block text-slate-200">INFINITE</span>
              <span className="block bg-gradient-to-r from-purple-400 via-cyan-400 to-rose-400 bg-clip-text text-transparent">
                POSSIBILITIES
              </span>
            </h2>
            <p className="text-2xl text-slate-300 max-w-5xl mx-auto leading-relaxed">
              Cutting-edge features that harness the power of
              <span className="text-purple-400 font-bold">
                {" "}
                quantum computing and AI{" "}
              </span>
              to revolutionize every aspect of educational management
            </p>
          </div>

          {allFeatures.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-24">
              <div className="text-center mb-16">
                <h3
                  className={`text-5xl font-black mb-6 bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}
                >
                  {category.category}
                </h3>
                <div
                  className={`w-32 h-2 bg-gradient-to-r ${category.gradient} mx-auto rounded-full shadow-lg`}
                ></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.items.map((feature, index) => (
                  <div key={index} className="group relative">
                    <div
                      className={`absolute -inset-4 bg-gradient-to-r ${category.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-all duration-700`}
                    ></div>

                    <div className="relative bg-slate-900/40 backdrop-blur-xl hover:bg-slate-800/60 rounded-3xl p-8 transition-all duration-700 hover:shadow-2xl border border-slate-700/30 hover:border-purple-500/50 group-hover:scale-105">
                      <div className="flex items-start space-x-6">
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 bg-slate-800/50 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110 border border-slate-600/30">
                            <div className="text-3xl group-hover:animate-pulse">
                              {feature.icon}
                            </div>
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-black text-2xl text-slate-200 mb-4 group-hover:text-white transition-colors">
                            {feature.name}
                          </h4>
                          <p className="text-slate-400 leading-relaxed text-lg group-hover:text-slate-300 transition-colors">
                            {feature.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quantum Benefits Section */}
      <div className="py-32 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-950/30 via-slate-950 to-cyan-950/30"></div>
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `conic-gradient(from 0deg at 50% 50%, 
                rgba(139, 92, 246, 0.3) 0deg, 
                rgba(6, 182, 212, 0.3) 120deg, 
                rgba(236, 72, 153, 0.3) 240deg, 
                rgba(139, 92, 246, 0.3) 360deg)`,
                animation: "spin 30s linear infinite",
              }}
            ></div>
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-900/50 to-cyan-900/50 backdrop-blur-xl rounded-full text-purple-300 font-bold mb-8 border border-purple-500/30">
              <FaInfinity className="mr-3 animate-pulse" />
              Quantum Advantages
            </div>
            <h2 className="text-6xl lg:text-8xl font-black mb-8">
              <span className="block text-slate-200">WHY CHOOSE</span>
              <span className="block bg-gradient-to-r from-purple-400 via-cyan-400 to-rose-400 bg-clip-text text-transparent">
                QUANTUM POWER
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {benefits.map((benefit, index) => (
              <div key={index} className="group relative">
                <div
                  className={`absolute -inset-8 bg-gradient-to-r ${benefit.gradient} rounded-3xl blur-2xl opacity-0 group-hover:opacity-20 transition-all duration-700`}
                ></div>

                <div className="relative flex items-start space-x-10 bg-slate-900/50 backdrop-blur-2xl rounded-3xl p-12 shadow-2xl hover:shadow-purple-500/10 transition-all duration-700 border border-slate-700/30 group-hover:scale-105 group-hover:border-purple-500/30">
                  <div className="flex-shrink-0">
                    <div
                      className={`w-28 h-28 bg-gradient-to-r ${benefit.gradient}/20 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 border border-purple-500/20`}
                    >
                      {benefit.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-black text-slate-200 mb-6 group-hover:text-white transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-slate-400 mb-8 leading-relaxed text-xl group-hover:text-slate-300 transition-colors">
                      {benefit.description}
                    </p>
                    <div
                      className={`inline-flex items-center px-8 py-4 bg-gradient-to-r ${benefit.gradient}/20 backdrop-blur-sm rounded-full font-black text-white group-hover:scale-105 transition-transform duration-500 border border-purple-500/30`}
                    >
                      <HiSparkles className="mr-3 text-purple-400" />
                      {benefit.stats}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quantum Testimonials */}
      <div id="testimonials" className="py-32 relative overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950"></div>
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-purple-600/30 to-transparent"></div>
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-cyan-600/30 to-transparent"></div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/3 h-full bg-gradient-to-t from-rose-600/30 to-transparent"></div>
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-900/50 to-cyan-900/50 backdrop-blur-xl rounded-full text-purple-300 font-bold mb-8 border border-purple-500/30">
              <FaHeart className="mr-3 text-rose-400 animate-pulse" />
              Quantum Testimonials
            </div>
            <h2 className="text-6xl lg:text-8xl font-black mb-8">
              <span className="block text-slate-200">TRUSTED BY</span>
              <span className="block bg-gradient-to-r from-purple-400 via-cyan-400 to-rose-400 bg-clip-text text-transparent">
                INNOVATORS
              </span>
            </h2>
            <p className="text-2xl text-slate-300 max-w-5xl mx-auto leading-relaxed">
              Educational leaders worldwide are
              <span className="text-purple-400 font-bold">
                {" "}
                revolutionizing their institutions{" "}
              </span>
              with our quantum platform
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="relative group">
              <div className="absolute -inset-12 bg-gradient-to-r from-purple-600/20 via-cyan-600/20 to-rose-600/20 rounded-3xl blur-3xl animate-pulse"></div>

              <div className="relative bg-slate-900/80 backdrop-blur-2xl rounded-3xl p-16 lg:p-20 border border-purple-500/30 group-hover:border-purple-400/50 transition-all duration-700">
                <div className="text-center">
                  {/* Quantum Star Rating */}
                  <div className="flex justify-center mb-12">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <FaStar
                        key={i}
                        className="text-purple-400 text-4xl mx-2 animate-pulse hover:scale-125 transition-transform cursor-pointer"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <blockquote className="text-4xl lg:text-5xl font-light italic mb-16 leading-relaxed max-w-5xl mx-auto text-slate-200">
                    <span className="text-purple-400 text-8xl leading-none">
                      "
                    </span>
                    {testimonials[currentTestimonial].text}
                    <span className="text-cyan-400 text-8xl leading-none">
                      "
                    </span>
                  </blockquote>

                  {/* Author Info */}
                  <div className="flex items-center justify-center space-x-8">
                    <div className="relative">
                      <div className="absolute -inset-4 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full blur opacity-50 animate-pulse"></div>
                      <img
                        src={testimonials[currentTestimonial].image}
                        alt={testimonials[currentTestimonial].name}
                        className="relative w-24 h-24 rounded-full border-4 border-purple-400 shadow-2xl"
                      />
                    </div>
                    <div className="text-left">
                      <div className="font-black text-3xl text-white mb-2">
                        {testimonials[currentTestimonial].name}
                      </div>
                      <div className="text-purple-300 font-bold text-xl">
                        {testimonials[currentTestimonial].role}
                      </div>
                      <div className="text-slate-400 text-lg">
                        {testimonials[currentTestimonial].school}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center space-x-6 mt-16">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-6 h-6 rounded-full transition-all duration-500 ${
                    index === currentTestimonial
                      ? "bg-gradient-to-r from-purple-400 to-cyan-400 scale-125 shadow-lg shadow-purple-500/50"
                      : "bg-slate-600 hover:bg-slate-500 hover:scale-110"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Ultimate CTA Section */}
      <div className="py-32 relative overflow-hidden">
        {/* Epic Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-slate-950 to-cyan-950"></div>
          <div className="absolute inset-0 opacity-30">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.4) 0%, transparent 50%),
                               radial-gradient(circle at 80% 80%, rgba(6, 182, 212, 0.4) 0%, transparent 50%),
                               radial-gradient(circle at 40% 60%, rgba(236, 72, 153, 0.4) 0%, transparent 50%)`,
                animation: "pulse 8s ease-in-out infinite",
              }}
            ></div>
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-purple-900/50 to-cyan-900/50 backdrop-blur-xl rounded-full text-purple-300 font-bold mb-12 border border-purple-500/30 text-xl">
              <FaRocket className="mr-4 animate-bounce text-2xl" />
              Ready for Quantum Leap?
            </div>

            <h2 className="text-7xl lg:text-9xl font-black mb-12 leading-tight">
              <span className="block bg-gradient-to-r from-purple-400 via-cyan-400 to-rose-400 bg-clip-text text-transparent">
                TRANSFORM
              </span>
              <span className="block text-slate-200">YOUR UNIVERSE</span>
            </h2>

            <p className="text-3xl text-slate-300 mb-20 leading-relaxed max-w-5xl mx-auto">
              Join over{" "}
              <span className="text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text font-black text-4xl">
                2000 institutions
              </span>{" "}
              experiencing the
              <span className="text-purple-400 font-bold">
                {" "}
                quantum revolution in education
              </span>
            </p>

            {/* Epic CTA Buttons */}
            <div className="flex flex-col lg:flex-row gap-12 justify-center items-center mb-20">
              {isAuthenticated ? (
                <Link
                  href="/dashboard"
                  className="group relative bg-gradient-to-r from-purple-600 via-cyan-500 to-purple-600 text-white font-bold py-8 px-20 rounded-full hover:scale-110 transition-all duration-500 shadow-2xl shadow-purple-500/30 text-3xl overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <span className="relative flex items-center justify-center">
                    <FaAtom className="mr-4 group-hover:animate-spin text-3xl" />
                    Enter Quantum Realm
                    <FaArrowRight className="ml-4 group-hover:translate-x-4 transition-transform text-3xl" />
                  </span>
                  <div className="absolute top-0 left-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </Link>
              ) : (
                <>
                  <button className="group relative bg-gradient-to-r from-purple-600 via-cyan-500 to-purple-600 text-white font-bold py-8 px-20 rounded-full hover:scale-110 transition-all duration-500 shadow-2xl shadow-purple-500/30 text-3xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <span className="relative flex items-center justify-center">
                      <FaRocket className="mr-4 group-hover:animate-bounce text-3xl" />
                      Start Quantum Journey
                      <FaArrowRight className="ml-4 group-hover:translate-x-4 transition-transform text-3xl" />
                    </span>
                    <div className="absolute top-0 left-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  </button>

                  <button className="group relative bg-transparent text-purple-300 font-bold py-8 px-20 rounded-full border-4 border-purple-500/50 hover:bg-purple-500/20 hover:text-white hover:scale-110 transition-all duration-500 text-3xl backdrop-blur-xl">
                    <span className="flex items-center">
                      <FaVideo className="mr-4 group-hover:animate-pulse text-3xl" />
                      Experience Magic
                    </span>
                  </button>
                </>
              )}
            </div>

            {/* Quantum Guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 text-center">
              {[
                {
                  icon: <FaCheck />,
                  text: "Quantum-powered trial",
                  color: "from-emerald-400 to-teal-400",
                },
                {
                  icon: <FaCheck />,
                  text: "Zero setup complexity",
                  color: "from-purple-400 to-cyan-400",
                },
                {
                  icon: <FaCheck />,
                  text: "Infinite support included",
                  color: "from-rose-400 to-pink-400",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center space-x-4 group"
                >
                  <div
                    className={`bg-gradient-to-r ${item.color} text-slate-900 text-3xl p-3 rounded-full group-hover:animate-bounce shadow-lg`}
                  >
                    {item.icon}
                  </div>
                  <span className="text-slate-300 text-xl font-bold group-hover:text-white transition-colors">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="py-32 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950/50 to-slate-950"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24">
              <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-900/50 to-cyan-900/50 backdrop-blur-xl rounded-full text-purple-300 font-bold mb-8 border border-purple-500/30">
                <FaEnvelope className="mr-3 animate-bounce" />
                Quantum Communication
              </div>
              <h2 className="text-6xl lg:text-8xl font-black mb-8">
                <span className="block text-slate-200">CONNECT WITH</span>
                <span className="block bg-gradient-to-r from-purple-400 via-cyan-400 to-rose-400 bg-clip-text text-transparent">
                  THE FUTURE
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              {/* Contact Information */}
              <div className="space-y-12">
                {[
                  {
                    icon: <FaPhone className="text-purple-400 text-3xl" />,
                    title: "Quantum Hotline",
                    info: ["+91 98765 43210", "24/7 Dimensional Support"],
                    gradient: "from-purple-600 to-indigo-600",
                  },
                  {
                    icon: <FaEnvelope className="text-cyan-400 text-3xl" />,
                    title: "Neural Network",
                    info: ["info@skoolvriksh.com", "Instant quantum response"],
                    gradient: "from-cyan-500 to-teal-500",
                  },
                  {
                    icon: <FaMapMarkerAlt className="text-rose-400 text-3xl" />,
                    title: "Quantum Headquarters",
                    info: [
                      "123 Innovation Galaxy",
                      "New Delhi, Multiverse 110001",
                    ],
                    gradient: "from-rose-500 to-pink-500",
                  },
                ].map((contact, index) => (
                  <div key={index} className="group relative">
                    <div
                      className={`absolute -inset-4 bg-gradient-to-r ${contact.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-all duration-700`}
                    ></div>

                    <div className="relative flex items-start space-x-8 p-10 bg-slate-900/50 backdrop-blur-xl rounded-3xl shadow-2xl hover:shadow-purple-500/10 transition-all duration-700 border border-slate-700/30 group-hover:scale-105 group-hover:border-purple-500/50">
                      <div
                        className={`w-20 h-20 bg-gradient-to-r ${contact.gradient} rounded-3xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500 shadow-2xl`}
                      >
                        {contact.icon}
                      </div>
                      <div>
                        <h3 className="text-3xl font-black text-slate-200 mb-6 group-hover:text-white transition-colors">
                          {contact.title}
                        </h3>
                        {contact.info.map((line, idx) => (
                          <p
                            key={idx}
                            className="text-slate-400 text-xl leading-relaxed group-hover:text-slate-300 transition-colors"
                          >
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quantum Contact Form */}
              <div className="relative group">
                <div className="absolute -inset-8 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-all duration-700"></div>

                <div className="relative bg-slate-900/70 backdrop-blur-2xl rounded-3xl shadow-2xl p-12 border border-slate-700/50 group-hover:border-purple-500/50 transition-all duration-700">
                  <h3 className="text-4xl font-black text-slate-200 mb-10 text-center">
                    Quantum Communication Portal
                  </h3>

                  <div className="space-y-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div className="relative group/input">
                        <input
                          type="text"
                          placeholder="Institution Name"
                          className="w-full px-8 py-5 border-2 border-slate-700 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-500 bg-slate-800/50 backdrop-blur-sm text-white placeholder-slate-400 text-lg group-hover/input:border-slate-600"
                        />
                      </div>
                      <div className="relative group/input">
                        <input
                          type="text"
                          placeholder="Your Name"
                          className="w-full px-8 py-5 border-2 border-slate-700 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-500 bg-slate-800/50 backdrop-blur-sm text-white placeholder-slate-400 text-lg group-hover/input:border-slate-600"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div className="relative group/input">
                        <input
                          type="email"
                          placeholder="Email Address"
                          className="w-full px-8 py-5 border-2 border-slate-700 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-500 bg-slate-800/50 backdrop-blur-sm text-white placeholder-slate-400 text-lg group-hover/input:border-slate-600"
                        />
                      </div>
                      <div className="relative group/input">
                        <input
                          type="tel"
                          placeholder="Phone Number"
                          className="w-full px-8 py-5 border-2 border-slate-700 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-500 bg-slate-800/50 backdrop-blur-sm text-white placeholder-slate-400 text-lg group-hover/input:border-slate-600"
                        />
                      </div>
                    </div>

                    <div className="relative group/input">
                      <select className="w-full px-8 py-5 border-2 border-slate-700 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-500 bg-slate-800/50 backdrop-blur-sm text-white text-lg group-hover/input:border-slate-600">
                        <option>Number of Students</option>
                        <option>Under 200</option>
                        <option>200-500</option>
                        <option>500-1000</option>
                        <option>1000+</option>
                      </select>
                    </div>

                    <div className="relative group/input">
                      <textarea
                        placeholder="Tell us about your quantum requirements"
                        rows="6"
                        className="w-full px-8 py-5 border-2 border-slate-700 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-500 bg-slate-800/50 backdrop-blur-sm text-white placeholder-slate-400 text-lg resize-none group-hover/input:border-slate-600"
                      ></textarea>
                    </div>

                    <button
                      type="button"
                      className="group/btn w-full bg-gradient-to-r from-purple-600 via-cyan-500 to-purple-600 text-white font-bold py-6 px-10 rounded-2xl hover:scale-105 transition-all duration-500 shadow-2xl shadow-purple-500/30 relative overflow-hidden text-xl"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-rose-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
                      <span className="relative flex items-center justify-center">
                        <FaRocket className="mr-4 group-hover/btn:animate-bounce text-2xl" />
                        Send Quantum Message
                        <FaArrowRight className="ml-4 group-hover/btn:translate-x-3 transition-transform text-2xl" />
                      </span>
                      <div className="absolute top-0 left-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quantum Footer */}
      <footer className="bg-slate-950 text-white py-24 relative overflow-hidden border-t border-purple-500/20">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-950 to-cyan-950"></div>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.2) 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, rgba(6, 182, 212, 0.2) 0%, transparent 50%)`,
            }}
          ></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 mb-20">
            {/* Quantum Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-4 mb-10 group">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-600 via-cyan-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl group-hover:shadow-purple-500/50 transition-all duration-500 group-hover:scale-110 animate-pulse">
                    <FaGraduationCap className="text-white text-4xl" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-ping"></div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"></div>
                </div>
                <div>
                  <span className="text-4xl font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    SkoolVriksh
                  </span>
                  <div className="text-sm text-purple-300 font-bold tracking-widest">
                    QUANTUM EDUCATION PLATFORM
                  </div>
                </div>
              </div>

              <p className="text-slate-400 leading-relaxed mb-10 text-lg">
                Pioneering the future of education with quantum computing and
                artificial intelligence.
                <span className="text-purple-400 font-bold">
                  {" "}
                  Trusted across dimensions.
                </span>
              </p>

              {/* Social Links */}
              <div className="flex space-x-4">
                {[
                  { emoji: "📘", gradient: "from-blue-600 to-blue-700" },
                  { emoji: "🐦", gradient: "from-cyan-500 to-blue-500" },
                  { emoji: "💼", gradient: "from-blue-700 to-indigo-700" },
                  { emoji: "📺", gradient: "from-red-600 to-red-700" },
                ].map((social, index) => (
                  <div
                    key={index}
                    className={`w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center hover:bg-gradient-to-r hover:${social.gradient} transition-all duration-500 cursor-pointer hover:scale-110 hover:shadow-lg group border border-slate-700 hover:border-transparent`}
                  >
                    <span className="text-2xl group-hover:animate-bounce">
                      {social.emoji}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            {[
              {
                title: "Quantum Features",
                links: [
                  "AI Modules",
                  "Neural Analytics",
                  "Quantum Security",
                  "Holographic Apps",
                  "Predictive Intelligence",
                ],
              },
              {
                title: "Multiverse",
                links: [
                  "About Quantum",
                  "Future Careers",
                  "Innovation Lab",
                  "Press Releases",
                  "Dimensional Partners",
                ],
              },
              {
                title: "Support Matrix",
                links: [
                  "Help Universe",
                  "Contact Dimensions",
                  "Quantum Training",
                  "System Status",
                  "Security Protocols",
                ],
              },
            ].map((section, index) => (
              <div key={index}>
                <h3 className="text-2xl font-black mb-10 text-purple-400 flex items-center">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full mr-4 animate-pulse"></div>
                  {section.title}
                </h3>
                <ul className="space-y-5">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href="#"
                        className="text-slate-400 hover:text-purple-300 transition-colors duration-500 text-lg hover:translate-x-2 inline-block group"
                      >
                        <span className="group-hover:text-white transition-colors">
                          {link}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-slate-800 pt-12">
            <div className="flex flex-col lg:flex-row justify-between items-center">
              <div className="flex items-center space-x-6 mb-8 lg:mb-0">
                <p className="text-slate-400 text-lg">
                  © 2024 SkoolVriksh Quantum Systems. All dimensions reserved.
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-pulse"></div>
                  <span className="text-emerald-400 font-bold">
                    Quantum Online
                  </span>
                </div>
              </div>

              <div className="flex space-x-10 text-slate-400">
                {[
                  "Privacy Matrix",
                  "Terms of Multiverse",
                  "Quantum Cookies",
                ].map((item, index) => (
                  <a
                    key={index}
                    href="#"
                    className="hover:text-purple-300 transition-colors duration-500 text-lg font-medium"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Quantum Floating Action Button */}
      <div className="fixed bottom-10 right-10 z-50">
        <div className="relative group">
          <div className="absolute -inset-6 bg-gradient-to-r from-purple-600 via-cyan-500 to-purple-600 rounded-full blur-2xl opacity-50 group-hover:opacity-75 animate-pulse"></div>
          <button className="relative bg-gradient-to-r from-purple-600 via-cyan-500 to-purple-600 text-white p-6 rounded-full shadow-2xl hover:scale-110 transition-all duration-500 border-2 border-purple-400/30 hover:border-purple-300">
            <FaComments className="text-3xl animate-bounce" />
          </button>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-rose-400 to-orange-400 rounded-full animate-ping"></div>
        </div>
      </div>

      {/* Custom Quantum Styles */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.3;
          }
          25% {
            transform: translateY(-20px) rotate(90deg);
            opacity: 0.8;
          }
          50% {
            transform: translateY(-40px) rotate(180deg);
            opacity: 1;
          }
          75% {
            transform: translateY(-20px) rotate(270deg);
            opacity: 0.8;
          }
        }

        @keyframes grid-move {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }

        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 4s ease infinite;
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-float {
          animation: float linear infinite;
        }

        .hover\:shadow-3xl:hover {
          box-shadow: 0 35px 60px -15px rgba(139, 92, 246, 0.4);
        }

        /* Quantum glow effects */
        .group:hover .quantum-glow {
          box-shadow: 0 0 50px rgba(139, 92, 246, 0.5);
        }

        /* Scrollbar styling */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.5);
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #8b5cf6, #06b6d4);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #a855f7, #0891b2);
        }

        /* Custom selection colors */
        ::selection {
          background: rgba(139, 92, 246, 0.3);
          color: white;
        }
      `}</style>
    </div>
  );
}

// import React, { useState, useEffect } from 'react';
// import { FaChalkboardTeacher, FaUserGraduate, FaBook, FaChartLine, FaClock, FaShieldAlt, FaPlay, FaCheck, FaStar, FaArrowRight, FaUsers, FaGraduationCap, FaBars, FaTimes, FaUser, FaSchool, FaClipboardList, FaCalendarAlt, FaFileAlt, FaBell, FaDesktop, FaMobile, FaCloud, FaHeadset, FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaLinkedin, FaYoutube, FaUserCog, FaUserTie, FaMoneyBillWave, FaBullhorn } from 'react-icons/fa';

// export default function Home() {
//   const [currentTestimonial, setCurrentTestimonial] = useState(0);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [activeModule, setActiveModule] = useState('admin');

//   const features = [
//     {
//       name: 'Student Management',
//       description: 'Streamline admissions, enrollment, and academic records with an intuitive system.',
//       icon: <FaUserGraduate className="text-4xl mb-4 text-orange-500" />,
//     },
//     {
//       name: 'Staff Management',
//       description: 'Manage faculty and staff with tools for attendance, payroll, and performance.',
//       icon: <FaChalkboardTeacher className="text-4xl mb-4 text-orange-500" />,
//     },
//     {
//       name: 'Academic Management',
//       description: 'Plan curricula, generate timetables, manage exams, and process results.',
//       icon: <FaBook className="text-4xl mb-4 text-orange-500" />,
//     },
//     {
//       name: 'Financial Management',
//       description: 'Handle fee collection, expense tracking, and generate financial reports.',
//       icon: <FaChartLine className="text-4xl mb-4 text-orange-500" />,
//     },
//     {
//       name: 'Communication Hub',
//       description: 'Enable seamless parent-school communication via SMS, email, and app notifications.',
//       icon: <FaBell className="text-4xl mb-4 text-orange-500" />,
//     },
//     {
//       name: 'Library Management',
//       description: 'Track books, manage lending, and maintain digital library catalogs.',
//       icon: <FaBook className="text-4xl mb-4 text-orange-500" />,
//     },
//   ];

//   const modules = {
//     admin: {
//       title: 'School Admin Panel',
//       icon: <FaUserCog className="text-2xl text-orange-500" />,
//       description: 'Comprehensive control for administrators to manage all school operations efficiently.',
//       features: [
//         { title: 'User Management', icon: <FaUserCog className="text-orange-500" />, description: 'Manage teachers, clerks, librarians, parents, and trustees with role-based access.' },
//         { title: 'Academic Management', icon: <FaChalkboardTeacher className="text-orange-500" />, description: 'Customize classes, assign teachers, and track RTE seat allocation.' },
//         { title: 'Attendance System', icon: <FaClipboardList className="text-orange-500" />, description: 'Track attendance with detailed daily, weekly, and yearly reports.' },
//         { title: 'Examination Management', icon: <FaFileAlt className="text-orange-500" />, description: 'Schedule exams, manage results, and generate report cards.' },
//         { title: 'Announcement System', icon: <FaBullhorn className="text-orange-500" />, description: 'Share targeted announcements with specific user groups.' },
//         { title: 'Trusty Management', icon: <FaUserTie className="text-orange-500" />, description: 'Manage trustee accounts, board meetings, and minutes.' },
//       ],
//     },
//     trusty: {
//       title: 'Trusty Panel',
//       icon: <FaUserTie className="text-2xl text-orange-500" />,
//       description: 'Dedicated access for trustees to oversee financial, academic, and operational aspects.',
//       features: [
//         { title: 'Financial Oversight', icon: <FaMoneyBillWave className="text-orange-500" />, description: 'Review financial reports, budgets, and expenditure details.' },
//         { title: 'Admission Monitoring', icon: <FaUserGraduate className="text-orange-500" />, description: 'Track admission stats and ensure RTE compliance.' },
//         { title: 'Academic Oversight', icon: <FaChalkboardTeacher className="text-orange-500" />, description: 'Monitor academic performance and quality standards.' },
//         { title: 'Infrastructure Development', icon: <FaDesktop className="text-orange-500" />, description: 'Oversee infrastructure projects and their progress.' },
//         { title: 'Meeting Management', icon: <FaCalendarAlt className="text-orange-500" />, description: 'Access meeting schedules and review minutes.' },
//         { title: 'Inventory Oversight', icon: <FaClipboardList className="text-orange-500" />, description: 'Monitor inventory and asset management activities.' },
//       ],
//     },
//     clerk: {
//       title: 'Clerk Panel',
//       icon: <FaClipboardList className="text-2xl text-orange-500" />,
//       description: 'Streamlined interface for clerks to manage admissions and records.',
//       features: [
//         { title: 'Admission Management', icon: <FaUserGraduate className="text-orange-500" />, description: 'Handle RTE and normal admission workflows.' },
//         { title: 'Document Generation', icon: <FaFileAlt className="text-orange-500" />, description: 'Generate GR numbers and certificates like bonafide or transfer.' },
//         { title: 'RTE Compliance', icon: <FaShieldAlt className="text-orange-500" />, description: 'Verify RTE documents and mark students in the system.' },
//         { title: 'Fee Processing', icon: <FaMoneyBillWave className="text-orange-500" />, description: 'Calculate and process admission fees.' },
//         { title: 'Admission Workflow', icon: <FaClipboardList className="text-orange-500" />, description: 'Manage applications to class allocation and notifications.' },
//         { title: 'Student Records', icon: <FaFileAlt className="text-orange-500" />, description: 'Maintain comprehensive student data and documents.' },
//       ],
//     },
//     fee: {
//       title: 'Fee Management Panel',
//       icon: <FaMoneyBillWave className="text-2xl text-orange-500" />,
//       description: 'Comprehensive fee system for regular and RTE students.',
//       features: [
//         { title: 'Fee Categories', icon: <FaClipboardList className="text-orange-500" />, description: 'Define fees like school, transport, and examination fees.' },
//         { title: 'Payment Tracking', icon: <FaMoneyBillWave className="text-orange-500" />, description: 'Track payments, generate receipts, and manage dues.' },
//         { title: 'Discount Management', icon: <FaMoneyBillWave className="text-orange-500" />, description: 'Apply discounts and special fee arrangements.' },
//         { title: 'RTE Management', icon: <FaShieldAlt className="text-orange-500" />, description: 'Track RTE records and generate reimbursement claims.' },
//         { title: 'Compliance Reporting', icon: <FaFileAlt className="text-orange-500" />, description: 'Generate RTE compliance reports for regulations.' },
//         { title: 'Online Payments', icon: <FaMoneyBillWave className="text-orange-500" />, description: 'Enable online fee payments with receipt generation.' },
//       ],
//     },
//     library: {
//       title: 'Librarian Panel',
//       icon: <FaBook className="text-2xl text-orange-500" />,
//       description: 'Manage library inventory, lending, and returns seamlessly.',
//       features: [
//         { title: 'Book Inventory', icon: <FaBook className="text-orange-500" />, description: 'Add, update, or remove books in the library catalog.' },
//         { title: 'Issue & Return', icon: <FaClipboardList className="text-orange-500" />, description: 'Manage book lending and track overdue returns.' },
//         { title: 'Fine Management', icon: <FaMoneyBillWave className="text-orange-500" />, description: 'Calculate fines for late or damaged books.' },
//         { title: 'Library Cards', icon: <FaFileAlt className="text-orange-500" />, description: 'Generate and manage library cards for users.' },
//         { title: 'Usage Analytics', icon: <FaChartLine className="text-orange-500" />, description: 'Analyze library usage and popular books.' },
//         { title: 'Resource Tracking', icon: <FaClipboardList className="text-orange-500" />, description: 'Monitor availability and condition of resources.' },
//       ],
//     },
//     inventory: {
//       title: 'Inventory Management Panel',
//       icon: <FaClipboardList className="text-2xl text-orange-500" />,
//       description: 'Track and manage school assets and consumables efficiently.',
//       features: [
//         { title: 'Asset Tracking', icon: <FaDesktop className="text-orange-500" />, description: 'Record computers, projectors, and other school assets.' },
//         { title: 'Stock Management', icon: <FaClipboardList className="text-orange-500" />, description: 'Monitor supplies like notebooks and cleaning materials.' },
//         { title: 'Procurement', icon: <FaMoneyBillWave className="text-orange-500" />, description: 'Automate purchasing with timely alerts.' },
//         { title: 'Maintenance Scheduling', icon: <FaCalendarAlt className="text-orange-500" />, description: 'Track maintenance for equipment and tools.' },
//         { title: 'Loss Prevention', icon: <FaShieldAlt className="text-orange-500" />, description: 'Prevent theft or damage to school assets.' },
//         { title: 'Budget Control', icon: <FaMoneyBillWave className="text-orange-500" />, description: 'Manage supply expenses cost-effectively.' },
//       ],
//     },
//     student: {
//       title: 'Student Panel',
//       icon: <FaUserGraduate className="text-2xl text-orange-500" />,
//       description: 'Access academic resources, results, and services for students.',
//       features: [
//         { title: 'Academic Access', icon: <FaChalkboardTeacher className="text-orange-500" />, description: 'View attendance, materials, and exam schedules.' },
//         { title: 'Result Tracking', icon: <FaFileAlt className="text-orange-500" />, description: 'Check results and download report cards.' },
//         { title: 'Fee Management', icon: <FaMoneyBillWave className="text-orange-500" />, description: 'Pay fees online and download receipts.' },
//         { title: 'Certificate Requests', icon: <FaFileAlt className="text-orange-500" />, description: 'Request bonafide or transfer certificates.' },
//         { title: 'Library Services', icon: <FaBook className="text-orange-500" />, description: 'Access library catalog and manage borrowed books.' },
//         { title: 'Notifications', icon: <FaBullhorn className="text-orange-500" />, description: 'Receive event and exam notifications.' },
//       ],
//     },
//     parent: {
//       title: 'Parent Panel',
//       icon: <FaUserCog className="text-2xl text-orange-500" />,
//       description: 'Monitor your child’s progress, attendance, and school updates.',
//       features: [
//         { title: 'Attendance Monitoring', icon: <FaClipboardList className="text-orange-500" />, description: 'Track daily attendance patterns.' },
//         { title: 'Progress Tracking', icon: <FaChartLine className="text-orange-500" />, description: 'View progress reports and academic performance.' },
//         { title: 'Fee Management', icon: <FaMoneyBillWave className="text-orange-500" />, description: 'Pay fees and access payment history.' },
//         { title: 'School Communications', icon: <FaBullhorn className="text-orange-500" />, description: 'Receive event and exam notifications.' },
//         { title: 'Transportation', icon: <FaDesktop className="text-orange-500" />, description: 'View transport routes and schedules.' },
//         { title: 'Document Access', icon: <FaFileAlt className="text-orange-500" />, description: 'Download certificates and report cards.' },
//       ],
//     },
//   };

//   const testimonials = [
//     {
//       text: 'SkoolVriksh has transformed our school operations with its intuitive interface and robust features.',
//       name: 'Dr. Priya Sharma',
//       role: 'Principal',
//       school: 'Delhi Public School',
//       rating: 5,
//     },
//     {
//       text: 'The fee management module simplified our payment process, making it seamless for parents.',
//       name: 'Rajesh Kumar',
//       role: 'Administrative Director',
//       school: 'Ryan International School',
//       rating: 5,
//     },
//     {
//       text: 'Real-time updates via the mobile app keep me informed about my child’s progress and school events.',
//       name: 'Sunita Patel',
//       role: 'Parent',
//       school: 'Modern Academy',
//       rating: 5,
//     },
//   ];

//   const stats = [
//     { number: '1000+', label: 'Schools Trust Us' },
//     { number: '500K+', label: 'Students Managed' },
//     { number: '50K+', label: 'Teachers Connected' },
//     { number: '99.9%', label: 'Uptime Guaranteed' },
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="font-sans overflow-hidden bg-gray-50">
//       {/* Top Bar */}
//       <div className="bg-orange-600 text-white text-sm py-3">
//         <div className="container mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
//           <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-4 text-center sm:text-left">
//             <div className="flex items-center gap-2">
//               <FaPhone />
//               <span>+91 98765 43210</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <FaEnvelope />
//               <span>info@skoolvriksh.com</span>
//             </div>
//           </div>
//           <div className="flex items-center space-x-4">
//             <a href="#" className="hover:text-orange-200 transition-colors"><FaFacebook /></a>
//             <a href="#" className="hover:text-orange-200 transition-colors"><FaTwitter /></a>
//             <a href="#" className="hover:text-orange-200 transition-colors"><FaLinkedin /></a>
//             <a href="#" className="hover:text-orange-200 transition-colors"><FaYoutube /></a>
//           </div>
//         </div>
//       </div>

//       {/* Header Navigation */}
//       <header className="bg-white shadow-lg sticky top-0 z-50">
//         <div className="container mx-auto px-4 sm:px-6">
//           <div className="flex items-center justify-between h-16 sm:h-20">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-700 rounded-full flex items-center justify-center">
//                 <FaGraduationCap className="text-white text-xl" />
//               </div>
//               <span className="text-xl sm:text-2xl font-extrabold text-gray-800">Skool<span className="text-orange-500">Vriksh</span></span>
//             </div>

//             <nav className="hidden lg:flex items-center space-x-6">
//               <a href="#" className="text-gray-700 hover:text-orange-500 font-medium text-base transition-colors duration-300">Home</a>
//               <a href="#features" className="text-gray-700 hover:text-orange-500 font-medium text-base transition-colors duration-300">Features</a>
//               <a href="#modules" className="text-gray-700 hover:text-orange-500 font-medium text-base transition-colors duration-300">Modules</a>
//               <a href="#testimonials" className="text-gray-700 hover:text-orange-500 font-medium text-base transition-colors duration-300">Testimonials</a>
//               <a href="#contact" className="text-gray-700 hover:text-orange-500 font-medium text-base transition-colors duration-300">Contact</a>
//             </nav>

//             <div className="hidden lg:flex items-center space-x-4">
//               {isAuthenticated ? (
//                 <button className="flex items-center space-x-2 bg-orange-500 text-white font-semibold py-2 px-6 rounded-full hover:bg-orange-600 transition-all duration-300 transform hover:scale-105">
//                   <FaUser className="text-sm" />
//                   <span>Dashboard</span>
//                 </button>
//               ) : (
//                 <>
//                   <button className="text-gray-700 hover:text-orange-500 font-semibold py-2 px-4 transition-colors duration-300">
//                     Login
//                   </button>
//                   <button className="bg-orange-500 text-white font-semibold py-2 px-6 rounded-full hover:bg-orange-600 transition-all duration-300 transform hover:scale-105">
//                     Get Started
//                   </button>
//                 </>
//               )}
//             </div>

//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="lg:hidden p-2 text-gray-700 hover:text-orange-500 transition-colors"
//             >
//               {isMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
//             </button>
//           </div>

//           {isMenuOpen && (
//             <div className="lg:hidden bg-white border-t border-gray-200 py-4">
//               <div className="space-y-2 px-4">
//                 <a href="#" className="block py-2 text-gray-700 hover:text-orange-500 font-medium">Home</a>
//                 <a href="#features" className="block py-2 text-gray-700 hover:text-orange-500 font-medium">Features</a>
//                 <a href="#modules" className="block py-2 text-gray-700 hover:text-orange-500 font-medium">Modules</a>
//                 <a href="#testimonials" className="block py-2 text-gray-700 hover:text-orange-500 font-medium">Testimonials</a>
//                 <a href="#contact" className="block py-2 text-gray-700 hover:text-orange-500 font-medium">Contact</a>
//                 <div className="pt-2 space-y-2">
//                   <button className="w-full text-left text-gray-700 hover:text-orange-500 font-semibold py-2">Login</button>
//                   <button className="w-full bg-orange-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-orange-600 transition-all duration-300">Get Started</button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </header>

//       {/* Hero Section */}
//       <div className="bg-gradient-to-b from-orange-50 to-white py-12 sm:py-16">
//         <div className="container mx-auto px-4 sm:px-6 py-12">
//           <div className="grid lg:grid-cols-2 gap-8 items-center">
//             <div className="space-y-6 text-center lg:text-left">
//               <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-gray-800">
//                 Transform Your School with <span className="text-orange-500">SkoolVriksh</span>
//               </h1>
//               <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
//                 A multi-tenant school management system to streamline operations, enhance communication, and ensure RTE compliance effortlessly.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
//                 <button className="bg-orange-500 text-white font-bold py-3 px-8 rounded-full hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
//                   Start Free Trial
//                   <FaArrowRight className="ml-2" />
//                 </button>
//                 <button className="border-2 border-orange-500 text-orange-500 font-bold py-3 px-8 rounded-full hover:bg-orange-50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
//                   <FaPlay className="mr-2" />
//                   Watch Demo
//                 </button>
//               </div>
//               <div className="flex items-center justify-center lg:justify-start space-x-4 pt-4">
//                 <div className="flex text-yellow-400">
//                   {[1,2,3,4,5].map(i => <FaStar key={i} className="text-lg" />)}
//                 </div>
//                 <span className="text-gray-600 font-medium">Trusted by 1000+ Schools</span>
//               </div>
//             </div>
//             <div className="relative mt-8 lg:mt-0">
//               <div className="bg-white rounded-2xl shadow-2xl p-6 transform hover:scale-105 transition-transform duration-300">
//                 <div className="bg-gradient-to-r from-orange-500 to-orange-700 rounded-lg p-4 mb-4">
//                   <h3 className="text-white text-lg font-bold">SkoolVriksh Dashboard</h3>
//                 </div>
//                 <div className="grid grid-cols-2 gap-4 mb-6">
//                   <div className="bg-orange-50 rounded-lg p-4 text-center">
//                     <div className="text-xl sm:text-2xl font-bold text-orange-600">1,247</div>
//                     <div className="text-gray-600 text-sm">Total Students</div>
//                   </div>
//                   <div className="bg-orange-50 rounded-lg p-4 text-center">
//                     <div className="text-xl sm:text-2xl font-bold text-orange-600">89</div>
//                     <div className="text-gray-600 text-sm">Teaching Staff</div>
//                   </div>
//                   <div className="bg-orange-50 rounded-lg p-4 text-center">
//                     <div className="text-xl sm:text-2xl font-bold text-orange-600">95.2%</div>
//                     <div className="text-gray-600 text-sm">Attendance</div>
//                   </div>
//                   <div className="bg-orange-50 rounded-lg p-4 text-center">
//                     <div className="text-xl sm:text-2xl font-bold text-orange-600">₹12.5L</div>
//                     <div className="text-gray-600 text-sm">Monthly Fee</div>
//                   </div>
//                 </div>
//                 <div className="space-y-2">
//                   <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
//                     <span className="text-gray-700 text-sm sm:text-base">Class 10-A Mathematics</span>
//                     <span className="text-green-500 text-xs sm:text-sm">Completed</span>
//                   </div>
//                   <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
//                     <span className="text-gray-700 text-sm sm:text-base">Parent Meeting</span>
//                     <span className="text-orange-500 text-xs sm:text-sm">Today 3:00 PM</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Stats Section */}
//       <div className="bg-gradient-to-r from-orange-600 to-orange-800 text-white py-12">
//         <div className="container mx-auto px-4 sm:px-6">
//           <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
//             {stats.map((stat, index) => (
//               <div key={index} className="text-center">
//                 <div className="text-3xl sm:text-4xl font-extrabold mb-2">{stat.number}</div>
//                 <div className="text-sm sm:text-lg font-medium">{stat.label}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Features Section */}
//       <div id="features" className="py-12 sm:py-16 bg-white">
//         <div className="container mx-auto px-4 sm:px-6">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4">
//               Powerful <span className="text-orange-500">Features</span>
//             </h2>
//             <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
//               A comprehensive platform to manage every aspect of your school with ease
//             </p>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
//             {features.map((feature, index) => (
//               <div key={index} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-orange-100 transform hover:scale-105">
//                 <div className="text-center mb-4">
//                   {feature.icon}
//                 </div>
//                 <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 text-center">{feature.name}</h3>
//                 <p className="text-gray-600 text-sm sm:text-base text-center leading-relaxed">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Modules Section */}
//       <div id="modules" className="py-12 sm:py-16 bg-orange-50">
//         <div className="container mx-auto px-4 sm:px-6">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4">
//               Comprehensive <span className="text-orange-500">Modules</span>
//             </h2>
//             <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
//               Specialized modules tailored for every role in school management
//             </p>
//           </div>
//           <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8">
//             {Object.keys(modules).map((key) => (
//               <button
//                 key={key}
//                 onClick={() => setActiveModule(key)}
//                 className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 ${
//                   activeModule === key ? 'bg-orange-500 text-white shadow-md' : 'bg-white text-gray-700 border border-orange-200 hover:bg-orange-100'
//                 }`}
//               >
//                 {modules[key].icon}
//                 {modules[key].title}
//               </button>
//             ))}
//           </div>
//           <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl transition-all duration-300">
//             <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
//               {modules[activeModule].icon}
//               {modules[activeModule].title}
//             </h3>
//             <p className="text-gray-600 text-sm sm:text-base mb-6 leading-relaxed">{modules[activeModule].description}</p>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//               {modules[activeModule].features.map((feature, index) => (
//                 <div key={index} className="bg-orange-50 p-4 sm:p-6 rounded-xl border-l-4 border-orange-500 hover:bg-white hover:shadow-md transition-all duration-300 transform hover:scale-105">
//                   <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
//                     {feature.icon}
//                     {feature.title}
//                   </h4>
//                   <p className="text-gray-600 text-sm sm:text-base">{feature.description}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Why Choose Us */}
//       <div className="py-12 sm:py-16 bg-white">
//         <div className="container mx-auto px-4 sm:px-6">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4">
//               Why Choose <span className="text-orange-500">SkoolVriksh?</span>
//             </h2>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
//             {[
//               { icon: <FaCloud className="text-orange-500 text-4xl mb-4" />, title: 'Cloud-Based', desc: 'Access anywhere, anytime' },
//               { icon: <FaMobile className="text-orange-500 text-4xl mb-4" />, title: 'Mobile App', desc: 'Android & iOS apps included' },
//               { icon: <FaShieldAlt className="text-orange-500 text-4xl mb-4" />, title: 'Secure & Safe', desc: 'Bank-level security' },
//               { icon: <FaHeadset className="text-orange-500 text-4xl mb-4" />, title: '24/7 Support', desc: 'Round-the-clock assistance' },
//             ].map((item, index) => (
//               <div key={index} className="text-center bg-orange-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105">
//                 <div className="flex justify-center">{item.icon}</div>
//                 <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-800">{item.title}</h3>
//                 <p className="text-gray-600 text-sm sm:text-base">{item.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Testimonials */}
//       <div id="testimonials" className="py-12 sm:py-16 bg-gradient-to-b from-orange-50 to-white">
//         <div className="container mx-auto px-4 sm:px-6">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4">
//               What Our <span className="text-orange-500">Clients Say</span>
//             </h2>
//           </div>
//           <div className="max-w-4xl mx-auto">
//             <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl transform hover:scale-105 transition-all duration-300">
//               <div className="text-center">
//                 <div className="flex justify-center mb-6">
//                   {[1,2,3,4,5].map(i => (
//                     <FaStar key={i} className="text-yellow-400 text-lg sm:text-xl" />
//                   ))}
//                 </div>
//                 <blockquote className="text-base sm:text-lg font-light italic mb-6 text-gray-700 leading-relaxed">
//                   "{testimonials[currentTestimonial].text}"
//                 </blockquote>
//                 <div className="flex flex-col items-center">
//                   <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 text-xl sm:text-2xl mb-4">
//                     {testimonials[currentTestimonial].name.charAt(0)}
//                   </div>
//                   <div className="text-center">
//                     <div className="font-bold text-base sm:text-lg text-gray-800">{testimonials[currentTestimonial].name}</div>
//                     <div className="text-gray-600 text-sm sm:text-base">{testimonials[currentTestimonial].role}</div>
//                     <div className="text-xs sm:text-sm text-orange-600">{testimonials[currentTestimonial].school}</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="flex justify-center space-x-3 mt-6">
//               {testimonials.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setCurrentTestimonial(index)}
//                   className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                     index === currentTestimonial ? 'bg-orange-500 scale-125' : 'bg-gray-300 hover:bg-orange-300'
//                   }`}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* CTA Section */}
//       <div className="py-12 sm:py-16 bg-gradient-to-r from-orange-600 to-orange-800 text-white">
//         <div className="container mx-auto px-4 sm:px-6">
//           <div className="max-w-4xl mx-auto text-center">
//             <h2 className="text-3xl sm:text-4xl font-extrabold mb-6">
//               Ready to Transform Your School?
//             </h2>
//             <p className="text-base sm:text-lg mb-8 leading-relaxed">
//               Join thousands of schools digitizing their operations with SkoolVriksh’s powerful platform
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
//               <button className="bg-white text-orange-600 font-bold py-3 px-8 rounded-full hover:bg-orange-100 transition-all duration-300 transform hover:scale-105">
//                 Start Free Trial
//               </button>
//               <button className="border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-orange-600 transition-all duration-300 transform hover:scale-105">
//                 Schedule Demo
//               </button>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
//               <div className="flex items-center justify-center space-x-2">
//                 <FaCheck className="text-green-300" />
//                 <span>30-day free trial</span>
//               </div>
//               <div className="flex items-center justify-center space-x-2">
//                 <FaCheck className="text-green-300" />
//                 <span>No setup fees</span>
//               </div>
//               <div className="flex items-center justify-center space-x-2">
//                 <FaCheck className="text-green-300" />
//                 <span>24/7 support</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Contact Section */}
//       <div id="contact" className="py-12 sm:py-16 bg-white">
//         <div className="container mx-auto px-4 sm:px-6">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4">
//               Contact <span className="text-orange-500">Us</span>
//             </h2>
//             <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
//               Have questions? Our team is here to assist you.
//             </p>
//           </div>
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
//             <div className="space-y-6">
//               <div className="flex items-start space-x-4">
//                 <div className="bg-orange-100 p-3 rounded-full text-orange-500">
//                   <FaPhone />
//                 </div>
//                 <div>
//                   <h3 className="font-bold text-lg text-gray-800">Phone</h3>
//                   <p className="text-gray-600 text-sm sm:text-base">+91 98765 43210</p>
//                 </div>
//               </div>
//               <div className="flex items-start space-x-4">
//                 <div className="bg-orange-100 p-3 rounded-full text-orange-500">
//                   <FaEnvelope />
//                 </div>
//                 <div>
//                   <h3 className="font-bold text-lg text-gray-800">Email</h3>
//                   <p className="text-gray-600 text-sm sm:text-base">info@skoolvriksh.com</p>
//                 </div>
//               </div>
//               <div className="flex items-start space-x-4">
//                 <div className="bg-orange-100 p-3 rounded-full text-orange-500">
//                   <FaMapMarkerAlt />
//                 </div>
//                 <div>
//                   <h3 className="font-bold text-lg text-gray-800">Address</h3>
//                   <p className="text-gray-600 text-sm sm:text-base">123 Education Street, New Delhi, India</p>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-orange-50 p-6 sm:p-8 rounded-2xl shadow-md">
//               <div className="space-y-4">
//                 <div>
//                   <input type="text" placeholder="Your Name" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base" />
//                 </div>
//                 <div>
//                   <input type="email" placeholder="Your Email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base" />
//                 </div>
//                 <div>
//                   <input type="text" placeholder="Subject" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base" />
//                 </div>
//                 <div>
//                   <textarea placeholder="Your Message" rows="4" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base"></textarea>
//                 </div>
//                 <button className="bg-orange-500 text-white font-bold py-3 px-6 rounded-full hover:bg-orange-600 transition-all duration-300 transform hover:scale-105">
//                   Send Message
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="bg-orange-700 text-white py-12">
//         <div className="container mx-auto px-4 sm:px-6">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//             <div>
//               <div className="flex items-center space-x-3 mb-4">
//                 <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-700 rounded-full flex items-center justify-center">
//                   <FaGraduationCap className="text-white" />
//                 </div>
//                 <span className="text-lg sm:text-xl font-extrabold">Skool<span className="text-orange-200">Vriksh</span></span>
//               </div>
//               <p className="text-gray-200 text-sm sm:text-base mb-4">
//                 Trusted school management software for thousands of institutions.
//               </p>
//               <div className="flex space-x-4">
//                 <a href="#" className="text-gray-200 hover:text-white transition-colors"><FaFacebook /></a>
//                 <a href="#" className="text-gray-200 hover:text-white transition-colors"><FaTwitter /></a>
//                 <a href="#" className="text-gray-200 hover:text-white transition-colors"><FaLinkedin /></a>
//                 <a href="#" className="text-gray-200 hover:text-white transition-colors"><FaYoutube /></a>
//               </div>
//             </div>
//             <div>
//               <h3 className="font-bold text-base sm:text-lg mb-4">Quick Links</h3>
//               <ul className="space-y-2 text-gray-200 text-sm sm:text-base">
//                 <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
//                 <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
//                 <li><a href="#modules" className="hover:text-white transition-colors">Modules</a></li>
//                 <li><a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a></li>
//                 <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="font-bold text-base sm:text-lg mb-4">Modules</h3>
//               <ul className="space-y-2 text-gray-200 text-sm sm:text-base">
//                 <li><a href="#" className="hover:text-white transition-colors">Student Management</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">Staff Management</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">Fee Management</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">Examination</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">Library</a></li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="font-bold text-base sm:text-lg mb-4">Contact Info</h3>
//               <div className="space-y-2 text-gray-200 text-sm sm:text-base">
//                 <div className="flex items-start space-x-2">
//                   <FaMapMarkerAlt className="mt-1 text-orange-200" />
//                   <p>123 Education Street, New Delhi, India</p>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <FaPhone className="text-orange-200" />
//                   <p>+91 98765 43210</p>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <FaEnvelope className="text-orange-200" />
//                   <p>info@skoolvriksh.com</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="border-t border-orange-500 mt-8 pt-8 text-center text-gray-200 text-sm">
//             <p>&copy; {new Date().getFullYear()} SkoolVriksh. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }
