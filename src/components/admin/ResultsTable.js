import { Chip } from "@mui/material";

const ResultsTable = ({ results, onPublish }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Student</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">GR Number</th>
            {results[0]?.subjects
              ? Object.values(results[0].subjects).map((subject, idx) => (
                  <th key={idx} className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                    {subject.subjectName}
                  </th>
                ))
              : null}
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Total</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Percentage</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Grade</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Marksheet</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Excel File</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Status</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {results.map((result) => (
            <tr key={result.student.id}>
              <td className="px-4 py-2 whitespace-nowrap">{result.student.name}</td>
              <td className="px-4 py-2 whitespace-nowrap">{result.student.grNumber}</td>
              {result.subjects
                ? Object.values(result.subjects).map((subject, idx) => (
                    <td key={idx} className="px-4 py-2 whitespace-nowrap">
                      {subject.marksObtained} / {subject.totalMarks}
                    </td>
                  ))
                : null}
              <td className="px-4 py-2 whitespace-nowrap">{result.totalMarks}</td>
              <td className="px-4 py-2 whitespace-nowrap">{(result.percentage ?? 0).toFixed(2)}%</td>
              <td className="px-4 py-2 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${
                      result.grade === "A+"
                        ? "bg-green-100 text-green-800"
                        : result.grade === "F"
                        ? "bg-red-100 text-red-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                >
                  {result.grade}
                </span>
              </td>
              <td className="px-4 py-2 whitespace-nowrap">
                {result.marksheet?.url ? (
                  <a href={result.marksheet.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    View Marksheet
                  </a>
                ) : (
                  "N/A"
                )}
              </td>
              <td className="px-4 py-2 whitespace-nowrap">
                {result.excelFile?.url ? (
                  <a href={result.excelFile.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    View Excel
                  </a>
                ) : (
                  "N/A"
                )}
              </td>
              <td className="px-4 py-2 whitespace-nowrap">
                <Chip
                  label={result.status || "Unknown"}
                  color={result.status === "published" ? "success" : "warning"}
                  size="small"
                />
              </td>
              <td className="px-4 py-2 whitespace-nowrap">
                {result.status !== "published" && (
                  <button
                    onClick={() => onPublish(result.student.id)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
                  >
                    Publish
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsTable;