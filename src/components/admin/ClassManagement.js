import Link from 'next/link';

const ClassManagementTable = ({ classes, onEdit }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 shadow rounded-md">
        <thead className="bg-gray-100 text-gray-700 text-sm font-semibold">
          <tr>
            <th className="py-3 px-4 text-left border-b">Class</th>
            <th className="py-3 px-4 text-left border-b">Division</th>
            <th className="py-3 px-4 text-left border-b">Class Teacher</th>
            <th className="py-3 px-4 text-left border-b">Students</th>
            <th className="py-3 px-4 text-left border-b">Status</th>
            <th className="py-3 px-4 text-left border-b">Actions</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-700 divide-y">
          {classes.map((cls) => (
            <tr key={cls._id} className="hover:bg-gray-50 transition">
              <td className="py-2 px-4">{cls.name}</td>
              <td className="py-2 px-4">{cls.division}</td>
              <td className="py-2 px-4">{cls.classTeacher?.name || 'Not Assigned'}</td>
              <td className="py-2 px-4">
                {cls.students?.length || 0}/{cls.capacity}
              </td>
              <td className="py-2 px-4">
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
              <td className="py-2 px-4">
                <div className="flex gap-2">
                  <Link href={`/admin/classes/${cls._id}`} passHref>
                    <button className="px-3 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded text-gray-800">
                      View
                    </button>
                  </Link>
                  <button
                    onClick={() => onEdit(cls)}
                    className="px-3 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded"
                  >
                    Edit
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClassManagementTable;
