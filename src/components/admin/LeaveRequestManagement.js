import { useState } from 'react';

const LeaveRequestTable = ({ leaveRequests, onReview }) => {
  const [comments, setComments] = useState('');
  const [selectedLeave, setSelectedLeave] = useState(null);

  const handleApprove = (leaveId) => {
    onReview(leaveId, 'approved', comments);
    setSelectedLeave(null);
    setComments('');
  };

  const handleReject = (leaveId) => {
    onReview(leaveId, 'rejected', comments);
    setSelectedLeave(null);
    setComments('');
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left text-gray-600 border">
        <thead className="bg-gray-100 text-xs uppercase font-semibold">
          <tr>
            <th className="px-4 py-3 border">Teacher</th>
            <th className="px-4 py-3 border">Type</th>
            <th className="px-4 py-3 border">Dates</th>
            <th className="px-4 py-3 border">Reason</th>
            <th className="px-4 py-3 border">Status</th>
            <th className="px-4 py-3 border">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {leaveRequests.map((leave) => (
            <tr key={leave.id} className="bg-white hover:bg-gray-50">
              <td className="px-4 py-3 border">
                <div className="font-medium">{leave.user.name}</div>
                <div className="text-xs text-gray-500">{leave.user.role}</div>
              </td>
              <td className="px-4 py-3 border">
                <span
                  className={`px-2 py-1 text-xs rounded font-medium ${
                    leave.type === 'sick'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  {leave.type}
                </span>
              </td>
              <td className="px-4 py-3 border">
                <div>{new Date(leave.startDate).toLocaleDateString()}</div>
                <div className="text-xs text-gray-500 text-center">to</div>
                <div>{new Date(leave.endDate).toLocaleDateString()}</div>
              </td>
              <td className="px-4 py-3 border max-w-xs truncate">{leave.reason}</td>
              <td className="px-4 py-3 border">
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 text-xs rounded font-medium">
                  Pending
                </span>
              </td>
              <td className="px-4 py-3 border">
                <div className="relative">
                  <details className="inline-block">
                    <summary className="cursor-pointer text-blue-600 hover:underline">
                      Actions
                    </summary>
                    <div className="absolute z-10 mt-2 bg-white border rounded shadow w-32">
                      <button
                        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                        onClick={() => setSelectedLeave(leave)}
                      >
                        Add Comments
                      </button>
                      <button
                        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                        onClick={() => handleApprove(leave.id)}
                      >
                        Approve
                      </button>
                      <button
                        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                        onClick={() => handleReject(leave.id)}
                      >
                        Reject
                      </button>
                    </div>
                  </details>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Comments Modal */}
      {selectedLeave && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              Add Comments for {selectedLeave.user.name}'s Leave
            </h3>
            <textarea
              className="w-full p-2 border border-gray-300 rounded mb-4"
              rows="4"
              placeholder="Enter comments (optional)"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                onClick={() => {
                  setSelectedLeave(null);
                  setComments('');
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={() => handleApprove(selectedLeave.id)}
              >
                Approve
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={() => handleReject(selectedLeave.id)}
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveRequestTable;
