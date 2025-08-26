// // src/components/auth/AuthLayout.js
// import Head from 'next/head';
// import Link from 'next/link';

// const AuthLayout = ({ title, children }) => {
//   return (
//     <>
//       <Head>
//         <title>{title} | School Management System</title>
//         <meta name="description" content="School Management System" />
//       </Head>
      
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-md w-full space-y-8">
//           <div className="text-center">
//             <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
//               {title}
//             </h2>
//           </div>
//           {children}
//         </div>
//       </div>
//     </>
//   );
// };

// export default AuthLayout;





// src/components/auth/AuthLayout.js
import Head from 'next/head';
import Link from 'next/link';

const AuthLayout = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title} | School Management System</title>
        <meta name="description" content="School Management System - Streamline your educational institution management" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-300/10 to-purple-300/10 rounded-full blur-3xl"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-32 w-1 h-1 bg-purple-400 rounded-full animate-ping"></div>
          <div className="absolute bottom-32 left-40 w-1.5 h-1.5 bg-indigo-300 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-2 h-2 bg-purple-300 rounded-full animate-ping"></div>
        </div>

        {/* Main Content Container */}
        <div className="relative z-10 w-full max-w-md">
          {children}
        </div>

        {/* Footer */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
          <p className="text-xs text-gray-500">
            © 2024 School Management System. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;