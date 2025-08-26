import { Chip } from "@mui/material";

const UnpublishedMarksheetsTable = ({ marksheets, onPublish }) => {
  return (
    <div className="overflow-x-auto mt-8">
      <h2 className="text-xl font-semibold mb-4">Unpublished Marksheets</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Student</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">GR Number</th>
            {marksheets[0]?.subjects?.length > 0
              ? marksheets[0].subjects.map((subject, idx) => (
                  <th key={idx} className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                    {subject.subjectName}
                  </th>
                ))
              : null}
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Marksheet</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Status</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {marksheets.map((marksheet) => (
            <tr key={marksheet.student.id}>
              <td className="px-4 py-2 whitespace-nowrap">{marksheet.student.name}</td>
              <td className="px-4 py-2 whitespace-nowrap">{marksheet.student.grNumber}</td>
              {marksheet.subjects.map((subject, idx) => (
                <td key={idx} className="px-4 py-2 whitespace-nowrap">
                  {subject.marksObtained} / {subject.totalMarks}
                </td>
              ))}
              <td className="px-4 py-2 whitespace-nowrap">
                {marksheet.marksheet?.url ? (
                  <a href={marksheet.marksheet.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    View Marksheet
                  </a>
                ) : (
                  "N/A"
                )}
              </td>
              <td className="px-4 py-2 whitespace-nowrap">
                <Chip
                  label={marksheet.status || "submittedToAdmin"}
                  color="warning"
                  size="small"
                />
              </td>
              <td className="px-4 py-2 whitespace-nowrap">
                <button
                  onClick={() => onPublish(marksheet.student.id)}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-half"
                  disabled={marksheet.status === "published"}
                >
                  Publish
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UnpublishedMarksheetsTable;