// const TeacherTable = ({ teachers = [], onAssignClick }) => {
//   if (!Array.isArray(teachers)) {
//     return (
//       <div className="text-red-500">
//         Invalid data format: teachers is not an array
//       </div>
//     );
//   }

//   if (teachers.length === 0) {
//     return <div className="text-gray-500">No teachers found</div>;
//   }

//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full text-sm text-left text-gray-500 border border-gray-200">
//         <thead className="bg-gray-100 text-xs uppercase text-gray-700">
//           <tr>
//             <th className="px-6 py-3">Name</th>
//             <th className="px-6 py-3">Email</th>
//             <th className="px-6 py-3">Role</th>
//             <th className="px-6 py-3">Status</th>
//             <th className="px-6 py-3">Assignments</th>
//             <th className="px-6 py-3">Actions</th>
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-200">
//           {teachers.map((teacher) => {
//             console.log("Teacher:", teacher); // Debug log
//             return (
//               <tr key={teacher._id} className="bg-white hover:bg-gray-50">
//                 <td className="px-6 py-4">{teacher.name}</td>
//                 <td className="px-6 py-4">{teacher.email}</td>
//                 <td className="px-6 py-4">
//                   <span
//                     className={`inline-block px-2 py-1 text-xs font-medium rounded ${
//                       teacher.role === "admin"
//                         ? "bg-purple-100 text-purple-800"
//                         : "bg-blue-100 text-blue-800"
//                     }`}
//                   >
//                     {teacher.role}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4">
//                   <span
//                     className={`inline-block px-2 py-1 text-xs font-medium rounded ${
//                       teacher.status === "active"
//                         ? "bg-green-100 text-green-800"
//                         : "bg-red-100 text-red-800"
//                     }`}
//                   >
//                     {teacher.status || "Unknown"}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4">
//                   <div className="flex flex-wrap gap-1">
//                     {teacher.assignments?.classTeacher && (
//                       <span className="bg-cyan-100 text-cyan-800 text-xs font-medium px-2 py-1 rounded">
//                         Class Teacher
//                       </span>
//                     )}
//                     {teacher.assignments?.subjectTeacher?.map((subj, idx) => (
//                       <span
//                         key={idx}
//                         className="bg-gray-200 text-gray-800 text-xs font-medium px-2 py-1 rounded"
//                       >
//                         {subj.subject?.name || "Unknown Subject"}
//                       </span>
//                     ))}
//                   </div>
//                 </td>
//                 <td className="px-6 py-4">
//                   <button
//                     onClick={() => onAssignClick(teacher)}
//                     className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 font-medium rounded text-xs px-3 py-1"
//                   >
//                     Assign
//                   </button>
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default TeacherTable;




const TeacherTable = ({ teachers = [], onAssignClick }) => {
  if (!Array.isArray(teachers)) {
    return <div className="text-red-500">Invalid data format: teachers is not an array</div>;
  }

  if (teachers.length === 0) {
    return <div className="text-gray-500">No teachers found</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left text-gray-500 border border-gray-200">
        <thead className="bg-gray-100 text-xs uppercase text-gray-700">
          <tr>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Role</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Class Teacher</th>
            <th className="px-6 py-3">Subject Assignments</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {teachers.map((teacher) => (
            <tr key={teacher._id} className="bg-white hover:bg-gray-50">
              <td className="px-6 py-4">{teacher.name}</td>
              <td className="px-6 py-4">{teacher.email}</td>
              <td className="px-6 py-4">
                <span
                  className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                    teacher.role === 'admin'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {teacher.role}
                </span>
              </td>
              <td className="px-6 py-4">
                <span
                  className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                    teacher.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {teacher.status || 'Unknown'}
                </span>
              </td>
              <td className="px-6 py-4">
                {teacher.currentAssignments?.classTeacher ? (
                  <span className="bg-cyan-100 text-cyan-800 text-xs font-medium px-2 py-1 rounded">
                    {teacher.currentAssignments.classTeacher.name}
                    {teacher.currentAssignments.classTeacher.division ? 
                      ` (${teacher.currentAssignments.classTeacher.division})` : ''}
                  </span>
                ) : (
                  <span className="text-gray-400">Not assigned</span>
                )}
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-wrap gap-1">
                  {teacher.currentAssignments?.subjectTeacher?.map((subj, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-200 text-gray-800 text-xs font-medium px-2 py-1 rounded"
                    >
                      {subj.subject} ({subj.class?.name || 'Unknown Class'})
                    </span>
                  ))}
                  {(!teacher.currentAssignments?.subjectTeacher || teacher.currentAssignments.subjectTeacher.length === 0) && (
                    <span className="text-gray-400">No subjects</span>
                  )}
                </div>
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => onAssignClick(teacher)}
                  className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 font-medium rounded text-xs px-3 py-1"
                >
                  Assign
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherTable;
