const StudentTable = ({ students }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left text-gray-700 border border-gray-300 shadow-md rounded-lg">
        <thead className="bg-gray-100 text-xs uppercase text-gray-600">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">GR Number</th>
            <th className="px-4 py-3">Admission Type</th>
            <th className="px-4 py-3">Gender</th>
            <th className="px-4 py-3">Parent</th>
            <th className="px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {students.map((student) => (
            <tr key={student.id} className="hover:bg-gray-50">
              <td className="px-4 py-2">{student.name}</td>
              <td className="px-4 py-2">{student.grNumber}</td>
              <td className="px-4 py-2">
                <span className={`px-2 py-1 rounded text-white text-xs font-medium ${
                  student.admissionType === 'RTE' ? 'bg-purple-600' : 'bg-blue-600'
                }`}>
                  {student.admissionType}
                </span>
              </td>
              <td className="px-4 py-2">{student.gender}</td>
              <td className="px-4 py-2">
                {student.parentDetails?.name || 'N/A'}
                {student.parentDetails?.mobile && (
                  <div className="text-xs text-gray-500">{student.parentDetails.mobile}</div>
                )}
              </td>
              <td className="px-4 py-2">
                <span className={`px-2 py-1 rounded text-white text-xs font-medium ${
                  student.status === 'active' ? 'bg-green-600' : 'bg-red-500'
                }`}>
                  {student.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;


