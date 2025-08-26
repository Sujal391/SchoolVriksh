import Link from 'next/link';
import { FaCalendarAlt } from 'react-icons/fa';

const badgeColors = {
  Final: 'bg-red-100 text-red-800',
  Midterm: 'bg-purple-100 text-purple-800',
  Other: 'bg-blue-100 text-blue-800',
  UnitTest: 'bg-green-100 text-green-800',
  Practical: 'bg-yellow-100 text-yellow-800',
  draft: 'bg-gray-100 text-gray-800',
  scheduled: 'bg-blue-100 text-blue-800',
  in_progress: 'bg-yellow-100 text-yellow-800',
  completed: 'bg-green-100 text-green-800',
  published: 'bg-purple-100 text-purple-800',
};

const ExamEventTable = ({ examEvents, onEdit }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Classes</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {examEvents.map((exam) => (
            <tr key={exam._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-medium text-gray-900">{exam.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 text-xs rounded-full ${badgeColors[exam.examType]}`}>
                  {exam.examType === 'Other' ? exam.customExamType : exam.examType}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{formatDate(exam.startDate)}</div>
                <div className="text-xs text-gray-500">to</div>
                <div className="text-sm text-gray-900">{formatDate(exam.endDate)}</div>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-wrap gap-1">
                  {exam.classes?.slice(0, 3).map(cls => (
                    <span
                      key={cls._id}
                      className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs"
                    >
                      {cls.name}
                    </span>
                  ))}
                  {exam.classes?.length > 3 && (
                    <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                      +{exam.classes.length - 3} more
                    </span>
                  )}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    badgeColors[exam.status] || 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {exam.status.replace('_', ' ')}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <Link href={`/admin/exams/schedule/${exam._id}`} className="text-blue-600 hover:text-blue-900 flex items-center">
                  
                    <FaCalendarAlt className="mr-1" /> View Schedule
                  
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExamEventTable;