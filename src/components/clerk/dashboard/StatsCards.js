import React from 'react';

const StatsCards = ({ data }) => {
  const cards = [
    {
      title: "Pending Verifications",
      value: data?.pendingVerifications || 0,
      color: "blue",
      gradientFrom: "from-blue-50",
      gradientTo: "to-blue-100",
      bgColor: "bg-blue-500",
      borderColor: "border-blue-200",
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Pending Certificates",
      value: data?.pendingCertificates || 0,
      color: "purple",
      gradientFrom: "from-purple-50",
      gradientTo: "to-purple-100",
      bgColor: "bg-purple-500",
      borderColor: "border-purple-200",
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      title: "Enrolled Today",
      value: data?.enrolledToday || 0,
      color: "green",
      gradientFrom: "from-green-50",
      gradientTo: "to-green-100",
      bgColor: "bg-green-500",
      borderColor: "border-green-200",
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      )
    },
    {
      title: "Total Students",
      value: data?.totalStudents || 0,
      color: "indigo",
      gradientFrom: "from-indigo-50",
      gradientTo: "to-indigo-100",
      bgColor: "bg-indigo-500",
      borderColor: "border-indigo-200",
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <div key={index} className="transform hover:scale-105 transition-transform duration-200">
          <div className={`bg-gradient-to-br ${card.gradientFrom} ${card.gradientTo} p-5 rounded-xl shadow-sm border ${card.borderColor} hover:shadow-md transition-all duration-200`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-slate-600 text-sm font-medium mb-1">
                  {card.title}
                </h3>
                <p className="text-3xl font-bold text-slate-800">
                  {card.value}
                </p>
              </div>
              <div className={`${card.bgColor} p-3 rounded-lg shadow-sm`}>
                {card.icon}
              </div>
            </div>
            <div className="flex items-center text-xs text-slate-500 mt-2">
              <div className={`w-1.5 h-1.5 ${card.bgColor} rounded-full mr-2`}></div>
              <span>Live data</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;