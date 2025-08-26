const UserTable = ({ users = [], onEditClick }) => {
  if (!Array.isArray(users)) {
    return <div className="text-red-500">Invalid data format: users is not an array</div>;
  }

  if (users.length === 0) {
    return <div className="text-gray-500">No users found</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left text-gray-500 border border-gray-200">
        <thead className="bg-gray-100 text-xs uppercase text-gray-700">
          <tr>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Role</th>
            <th className="px-6 py-3">Attendance Permissions</th>
            <th className="px-6 py-3">Marks Entry Permissions</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user._id} className="bg-white hover:bg-gray-50">
              <td className="px-6 py-4">{user.name}</td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">
                <span
                  className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                    user.role === 'admin'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {user.role}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-wrap gap-1">
                  {user.permissions?.canTakeAttendance?.length > 0 ? (
                    user.permissions.canTakeAttendance.map((cls, idx) => (
                      <span
                        key={idx}
                        className="bg-cyan-100 text-cyan-800 text-xs font-medium px-2 py-1 rounded"
                      >
                        {cls.name}{cls.division ? ` (${cls.division})` : ''}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400">None</span>
                  )}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-wrap gap-1">
                  {user.permissions?.canEnterMarks?.length > 0 ? (
                    user.permissions.canEnterMarks.map((perm, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-200 text-gray-800 text-xs font-medium px-2 py-1 rounded"
                      >
                        {perm.subject?.name || 'Unknown Subject'} (
                        {perm.class?.name || 'Unknown Class'}
                        {perm.class?.division ? ` - ${perm.class.division}` : ''})
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400">None</span>
                  )}
                </div>
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => onEditClick(user)}
                  className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 font-medium rounded text-xs px-3 py-1"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;



