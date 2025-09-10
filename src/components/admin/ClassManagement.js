import CircularProgress from '@mui/material/CircularProgress';

const ClassManagementTable = ({ classes, onEdit, loading }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 shadow rounded-lg">
        <thead className="bg-gray-100 text-gray-700 text-sm font-semibold">
          <tr>
            <th className="py-3 px-2 text-lg text-center border-b">Class</th>
            <th className="py-3 px-2 text-lg text-center border-b">Division</th>
            <th className="py-3 px-2 text-lg text-center border-b">Class Teacher</th>
            <th className="py-3 px-2 text-lg text-center border-b">Students</th>
            <th className="py-3 px-2 text-lg text-center border-b">Status</th>
            <th className="py-3 px-2 text-lg text-center border-b">Actions</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-700 divide-y">
          {loading ? (
            <tr>
              <td colSpan={6} className="px-6 py-4 text-center">
                <div className="flex items-center justify-center space-x-2">
                  <CircularProgress size={20} />
                  <span>Loading classes...</span>
                </div>
              </td>
            </tr>
          ) : classes.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-6 py-4 text-center">
                No classes found
              </td>
            </tr>
          ) : (
          classes.map((cls) => (
            <tr key={cls._id} className="hover:bg-gray-50 transition">
              <td className="py-2 px-4 text-center">{cls.name}</td>
              <td className="py-2 px-4 text-center">{cls.division}</td>
              <td className="py-2 px-4 text-center">{cls.classTeacher?.name || 'Not Assigned'}</td>
              <td className="py-2 px-4 text-center">
                {cls.students?.length || 0}/{cls.capacity}
              </td>
              <td className="py-2 px-4 text-center">
                <span
                  className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                    cls.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {cls.status}
                </span>
              </td>
              <td className="py-2 px-4 flex justify-center">
                <button
                  onClick={() => onEdit(cls)}
                  className="px-3 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded"
                >
                  Edit
                </button>
              </td>
            </tr>
          )))} 
        </tbody>
      </table>
    </div>
  );
};

export default ClassManagementTable;
