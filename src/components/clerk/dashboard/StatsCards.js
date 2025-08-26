// src/components/clerk/dashboard/StatsCards.js
const StatsCards = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-gray-500 text-sm">Pending Verifications</h3>
        <p className="text-2xl font-bold">{data?.pendingVerifications || 0}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-gray-500 text-sm">Pending Certificates</h3>
        <p className="text-2xl font-bold">{data?.pendingCertificates || 0}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-gray-500 text-sm">Enrolled Today</h3>
        <p className="text-2xl font-bold">{data?.enrolledToday || 0}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-gray-500 text-sm">Total Students</h3>
        <p className="text-2xl font-bold">{data?.totalStudents || 0}</p>
      </div>
    </div>
  );
};

export default StatsCards;