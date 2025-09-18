// import { useState, useEffect } from "react";
// import AdminLayout from "../../../components/layout/AdminLayout";
// import AdminService from "../../../services/adminService";
// import StudentTable from "../../../components/admin/StudentManagement";
// import StudentFormModal from "../../../components/admin/StudentFormModal";

// const StudentsPage = () => {
//   const [students, setStudents] = useState([]);
//   const [classes, setClasses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedStudent, setSelectedStudent] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [studentsRes, classesRes] = await Promise.all([
//           AdminService.getStudentsByClass(),
//           AdminService.getClasses(),
//         ]);
//         setStudents(studentsRes.data.students);
//         setClasses(classesRes.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleFormSubmit = async (studentData) => {
//     try {
//       if (selectedStudent) {
//         // Update existing student
//         await AdminService.updateStudent(selectedStudent._id, studentData);
//       } else {
//         // Create new student
//         await AdminService.createStudent(studentData);
//       }
//       // Refresh student list
//       const response = await AdminService.getStudentsByClass("all");
//       setStudents(response.data.students);
//       setIsModalOpen(false);
//     } catch (error) {
//       console.error("Error saving student:", error);
//     }
//   };

//   return (
//     <AdminLayout>
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-2xl font-bold mb-6">Student Management</h1>

//         <div className="flex justify-between items-center mb-6">
//           <div>
//             {/* <Button onClick={() => {
//               setSelectedStudent(null);
//               setIsModalOpen(true);
//             }}>
//               Add New Student
//             </Button> */}

//             <button
//               onClick={() => {
//                 setSelectedStudent(null);
//                 setIsModalOpen(true);
//               }}
//               className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
//             >
//               Add New Student
//             </button>
//           </div>
//         </div>

//         {loading ? (
//           <p>Loading students...</p>
//         ) : (
//           <StudentTable
//             students={students}
//             onEdit={(student) => {
//               setSelectedStudent(student);
//               setIsModalOpen(true);
//             }}
//           />
//         )}

//         <StudentFormModal
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//           studentData={selectedStudent}
//           classes={classes}
//           onSubmit={handleFormSubmit}
//         />
//       </div>
//     </AdminLayout>
//   );
// };

// export default StudentsPage;




import { useState, useEffect } from "react";
import AdminLayout from "../../../components/layout/AdminLayout";
import AdminService from "../../../services/adminService";
import StudentTable from "../../../components/admin/StudentManagement";
import StudentFormModal from "../../../components/admin/StudentFormModal";

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState("");
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [error, setError] = useState(null);

  // pagination state
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const classesRes = await AdminService.getClasses();
        setClasses(classesRes.data || []);
        // Set default class if available
        if (classesRes.data.length > 0) {
          setSelectedClassId(classesRes.data[0]._id);
        }
      } catch (error) {
        setError("Failed to fetch classes: " + error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchStudents = async () => {
      if (!selectedClassId) return;
      setLoading(true);
      try {
        const studentsRes = await AdminService.getStudentsByClass(selectedClassId);
        setStudents(studentsRes.data.students || []);
        setError(null);
        // compute total pages
        const pages = Math.ceil(studentsRes.data.students.length / rowsPerPage) || 1;
        setTotalPages(pages);
      } catch (error) {
        setError("Failed to fetch students: " + (error.response?.data?.message || error.message));
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [selectedClassId, rowsPerPage]); // update total pages when rowsPerPage changes

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setPage(1); // reset to first page
    const pages = Math.ceil(students.length / newRowsPerPage) || 1;
    setTotalPages(pages);
  };

  const handleFormSubmit = async (studentData) => {
    try {
      if (selectedStudent) {
        // Update existing student
        await AdminService.updateStudent(selectedStudent.id, studentData);
      } else {
        // Create new student
        await AdminService.createStudent(studentData);
      }
      // Refresh student list for the selected class
      if (selectedClassId) {
        const response = await AdminService.getStudentsByClass(selectedClassId);
        setStudents(response.data.students || []);
        setError(null);
      }
      setIsModalOpen(false);
    } catch (error) {
      setError("Failed to save student: " + (error.response?.data?.message || error.message));
    }
  };

   // slice students for pagination
  const paginatedStudents = students.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Student Management</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="flex justify-between items-center mb-6">
          <div>
            <label className="block text-md font-medium text-gray-700">Select Class</label>
            <select
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
              className="mt-1 block h-10 w-48 p-2 border rounded-sm  shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="">Select a class</option>
              {classes.map((cls) => (
                <option key={cls._id} value={cls._id}>
                  {cls.name} - {cls.division} ({cls.academicYear})
                </option>
              ))}
            </select>
          </div>
          {/* <button
            onClick={() => {
              setSelectedStudent(null);
              setIsModalOpen(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Add New Student
          </button> */}
        </div>

        <StudentTable
          students={paginatedStudents}
          selectedClassId={selectedClassId}
          loading={loading}
          page={page}
          rowsPerPage={rowsPerPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />

        <StudentFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          studentData={selectedStudent}
          classes={classes}
          onSubmit={handleFormSubmit}
        />
      </div>
    </AdminLayout>
  );
};

export default StudentsPage;


