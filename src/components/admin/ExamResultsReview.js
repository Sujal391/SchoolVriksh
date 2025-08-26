const ResultsTable = ({ results }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Student</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">GR Number</th>
            {results[0]?.subjects?.map((subject, idx) => (
              <th key={idx} className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                {subject.name}
              </th>
            ))}
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Total</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Percentage</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Grade</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {results.map((result) => (
            <tr key={result.id}>
              <td className="px-4 py-2 whitespace-nowrap">{result.student.name}</td>
              <td className="px-4 py-2 whitespace-nowrap">{result.student.grNumber}</td>

              {result.subjects.map((subject, idx) => (
                <td key={idx} className="px-4 py-2 whitespace-nowrap">
                  {subject.marksObtained} / {subject.totalMarks}
                </td>
              ))}

              <td className="px-4 py-2 whitespace-nowrap">{result.totalMarks}</td>
              <td className="px-4 py-2 whitespace-nowrap">{result.percentage.toFixed(2)}%</td>
              <td className="px-4 py-2 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${
                      result.grade === 'A+'
                        ? 'bg-green-100 text-green-800'
                        : result.grade === 'F'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                >
                  {result.grade}
                </span>
              </td>
              <td className="px-4 py-2 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${
                      result.status === 'published'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                >
                  {result.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsTable;
