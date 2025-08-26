// src/components/clerk/dashboard/CertificateRequests.js
import Link from 'next/link';

const CertificateRequests = ({ certificates }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-semibold mb-3">Recent Certificate Requests</h3>
      <div className="space-y-2">
        {certificates.length > 0 ? (
          certificates.map((cert) => (
            <Link key={cert.id} href={`/clerk/certificates/${cert.id}`} className="block p-2 hover:bg-gray-50 rounded">
              
                <div className="flex justify-between">
                  <span className="font-medium">{cert.studentName}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    cert.status === 'generated' ? 'bg-green-100 text-green-800' :
                    cert.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {cert.status}
                  </span>
                </div>
                <div className="text-sm text-gray-500">{cert.type} - {cert.purpose}</div>
              
            </Link>
          ))
        ) : (
          <p className="text-gray-500">No recent certificate requests</p>
        )}
      </div>
      {certificates.length > 0 && (
        <Link href="/clerk/certificates" className="text-blue-500 text-sm mt-2 block">
          View all certificates
        </Link>
      )}
    </div>
  );
};

export default CertificateRequests;