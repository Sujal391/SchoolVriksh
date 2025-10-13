import React from 'react';
import Link from 'next/link';

const RecentApplications = ({ applications }) => {
  const getStatusColor = (status) => {
    switch(status) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 h-full flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 px-5 py-4 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-800 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Recent Applications
            </h3>
            <p className="text-xs text-slate-500 mt-1">Latest admission requests</p>
          </div>
          <div className="bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {applications.length}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {applications.length > 0 ? (
          <div className="space-y-3">
            {applications.map((app) => (
              <Link 
                key={app.id} 
                href={`/clerk/admissions/${app.id}`}
                className="block group"
              >
                <div className="p-4 bg-gradient-to-r from-slate-50 to-slate-100 hover:from-blue-50 hover:to-indigo-50 rounded-lg border border-slate-200 hover:border-blue-300 transition-all duration-200 hover:shadow-md">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                        <span className="text-white font-semibold text-sm">
                          {app.studentDetails.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-slate-800 truncate group-hover:text-blue-600 transition-colors">
                          {app.studentDetails.name}
                        </div>
                        <div className="text-xs text-slate-500 flex items-center mt-1">
                          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                          </svg>
                          {app.trackingId}
                        </div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(app.status)} whitespace-nowrap ml-2`}>
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </span>
                  </div>
                  
                  {/* Additional info bar */}
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-200">
                    <div className="flex items-center text-xs text-slate-500">
                      <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {new Date(app.createdAt || Date.now()).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-blue-500 font-medium group-hover:text-blue-700">
                      View Details →
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-slate-500 font-medium">No recent applications</p>
            <p className="text-slate-400 text-sm mt-1">Applications will appear here</p>
          </div>
        )}
      </div>

      {/* Footer */}
      {applications.length > 0 && (
        <div className="flex-shrink-0 px-5 py-3 border-t border-slate-200 bg-slate-50">
          <Link 
            href="/clerk/admissions" 
            className="flex items-center justify-center text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors group"
          >
            View all applications
            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
};

export default RecentApplications;