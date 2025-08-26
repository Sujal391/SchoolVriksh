import React from 'react';

const SubjectTable = ({ subjects, onEdit }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 border rounded-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Subject</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Class</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Teachers</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Status</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {subjects.map((subject) => (
            <tr key={subject._id}>
              <td className="px-4 py-3 text-sm text-gray-800">{subject.name}</td>
              <td className="px-4 py-3 text-sm text-gray-800">
                {subject.class?.name} - {subject.class?.division}
              </td>
              <td className="px-4 py-3 text-sm">
                <div className="flex flex-wrap gap-1">
                  {subject.teachers?.length > 0 ? (
                    subject.teachers.map((teacher, idx) => (
                      <span
                        key={idx}
                        className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded"
                      >
                        {teacher.name}
                      </span>
                    ))
                  ) : (
                    <span className="bg-gray-200 text-gray-700 text-xs font-medium px-2 py-0.5 rounded">
                      Not Assigned
                    </span>
                  )}
                </div>
              </td>
              <td className="px-4 py-3 text-sm">
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded ${
                    subject.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {subject.status}
                </span>
              </td>
              <td className="px-4 py-3 text-sm">
                <button
                  onClick={() => onEdit(subject)}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded"
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

export default SubjectTable;
