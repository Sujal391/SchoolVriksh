import { ROLE_COLORS } from "../../utils/constants";
import CircularProgress from "@mui/material/CircularProgress";

const UserTable = ({ users = [], onEditClick, loading }) => {
  if (!Array.isArray(users)) {
    return (
      <div className="text-red-500">
        Invalid data format: users is not an array
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left text-gray-700 border border-gray-300 shadow-md rounded-lg">
        <thead className="bg-gray-100 text-xs uppercase text-gray-600">
          <tr className="text-[16px] text-nowrap">
            <th className="px-6 py-3 text-center">Name</th>
            <th className="px-6 py-3 text-center">Email</th>
            <th className="px-6 py-3 text-center">Role</th>
            <th className="px-6 py-3 text-center">Attendance Permissions</th>
            <th className="px-6 py-3 text-center">Marks Entry Permissions</th>
            <th className="px-6 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {loading ? (
            <tr>
              <td colSpan={6} className="px-6 py-4 text-center">
                <div className="flex items-center justify-center space-x-2">
                  <CircularProgress size={20} />
                  <span>Loading users...</span>
                </div>
              </td>
            </tr>
          ) : users.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-6 py-4 text-center">
                No users found
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user._id} className="bg-white hover:bg-gray-50">
                <td className="px-6 py-4 text-center">{user.name}</td>
                <td className="px-6 py-4 text-center">{user.email}</td>
                <td className="px-6 py-4 text-center uppercase">
                  <span
                    className={
                      "inline-block px-2 py-1 text-xs font-medium rounded"
                    }
                    style={{
                      backgroundColor: ROLE_COLORS[user.role],
                      color: '#212121',
                      fontWeight: '600',
                    }}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap justify-center gap-1">
                    {user.permissions?.canTakeAttendance?.length > 0 ? (
                      user.permissions.canTakeAttendance.map((cls, idx) => (
                        <span
                          key={idx}
                          className="bg-cyan-100 text-cyan-800 text-xs font-medium px-2 py-1 rounded"
                        >
                          {cls.name}
                          {cls.division ? ` (${cls.division})` : ""}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-400">None</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap justify-center gap-1">
                    {user.permissions?.canEnterMarks?.length > 0 ? (
                      user.permissions.canEnterMarks.map((perm, idx) => (
                        <span
                          key={idx}
                          className="bg-gray-200 text-gray-800 text-xs font-medium px-2 py-1 rounded"
                        >
                          {perm.subject?.name || "Unknown Subject"} (
                          {perm.class?.name || "Unknown Class"}
                          {perm.class?.division
                            ? ` - ${perm.class.division}`
                            : ""}
                          )
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-400">None</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center">
                    <button
                      onClick={() => onEditClick(user)}
                      className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 font-medium rounded text-xs px-3 py-1"
                    >
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
