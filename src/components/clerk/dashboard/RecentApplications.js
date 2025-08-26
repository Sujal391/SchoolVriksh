// src/components/clerk/dashboard/RecentApplications.js
import Link from 'next/link';

const RecentApplications = ({ applications }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-semibold mb-3">Recent Applications</h3>
      <div className="space-y-2">
        {applications.length > 0 ? (
          applications.map((app) => (
            <Link key={app.id} href={`/clerk/admissions/${app.id}`} className="block p-2 hover:bg-gray-50 rounded">
              
                <div className="flex justify-between">
                  <span className="font-medium">{app.studentDetails.name}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    app.status === 'approved' ? 'bg-green-100 text-green-800' :
                    app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {app.status}
                  </span>
                </div>
                <div className="text-sm text-gray-500">{app.trackingId}</div>
              
            </Link>
          ))
        ) : (
          <p className="text-gray-500">No recent applications</p>
        )}
      </div>
      {applications.length > 0 && (
        <Link href="/clerk/admissions" className="text-blue-500 text-sm mt-2 block">
          View all applications
        </Link>
      )}
    </div>
  );
};

export default RecentApplications;