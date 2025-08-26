import { useState, useEffect } from "react";
import AdminService from "../../services/adminService";

const AssignTeacherModal = ({ isOpen, onClose, teacher, onSubmit }) => {
  const [availableClasses, setAvailableClasses] = useState([]);
  const [assignableSubjects, setAssignableSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    classTeacherOf: "",
    subjectAssignments: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const classesRes = await AdminService.getAvailableClasses();
        setAvailableClasses(classesRes.available || []);

        if (teacher) {
          const initialClassTeacher =
            teacher.currentAssignments?.classTeacher?._id || "";
          const initialSubjects =
            teacher.currentAssignments?.subjectTeacher?.map((st) => ({
              classId: st.class?._id || st.class,
              subjectId: st.subject?._id || st.subject,
            })) || [];

          setFormData({
            classTeacherOf: initialClassTeacher,
            subjectAssignments: initialSubjects,
          });

          if (initialClassTeacher) {
            const subjectsRes = await AdminService.getSubjectsByClass(
              initialClassTeacher
            );
            setAssignableSubjects(subjectsRes.subjects || []);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) fetchData();
  }, [isOpen, teacher]);

  const handleClassChange = async (classId) => {
    setFormData((prev) => ({ ...prev, classTeacherOf: classId }));
    try {
      setLoading(true);
      const res = await AdminService.getSubjectsByClass(classId);
      setAssignableSubjects(res.subjects || []);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubjectToggle = (subjectId, classId) => {
    setFormData((prev) => {
      const existingIndex = prev.subjectAssignments.findIndex(
        (sa) => sa.classId === classId && sa.subjectId === subjectId
      );

      if (existingIndex >= 0) {
        return {
          ...prev,
          subjectAssignments: prev.subjectAssignments.filter(
            (_, index) => index !== existingIndex
          ),
        };
      } else {
        return {
          ...prev,
          subjectAssignments: [
            ...prev.subjectAssignments,
            { classId, subjectId },
          ],
        };
      }
    });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-full max-w-4xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-xl font-semibold">
            {teacher ? `Assign Roles to ${teacher.name}` : "Add New Teacher"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <p>Loading data...</p>
          </div>
        ) : (
          <div className="space-y-6 max-h-[70vh] overflow-y-auto">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Class Teacher Assignment
              </label>
              <select
                value={formData.classTeacherOf}
                onChange={(e) => handleClassChange(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              >
                <option value="">Select a class</option>
                {availableClasses.map((cls) => (
                  <option key={cls._id} value={cls._id}>
                    {cls.name}
                    {cls.division ? ` - ${cls.division}` : ""}
                  </option>
                ))}
              </select>
            </div>

            {formData.classTeacherOf && (
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Subject Assignments
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {assignableSubjects.map((subject) => (
                    <div key={subject._id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`subject-${subject._id}`}
                        checked={formData.subjectAssignments.some(
                          (sa) =>
                            sa.subjectId === subject._id &&
                            sa.classId === formData.classTeacherOf
                        )}
                        onChange={() =>
                          handleSubjectToggle(
                            subject._id,
                            formData.classTeacherOf
                          )
                        }
                        className="mr-2"
                      />
                      <label
                        htmlFor={`subject-${subject._id}`}
                        className="text-sm"
                      >
                        {subject.name || "Unknown Subject"}
                        {subject.isAssigned && (
                          <span className="text-xs text-gray-500">
                            (Assigned to {subject.assignedTo?.name || "Unknown"}
                            )
                          </span>
                        )}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-end gap-2 border-t pt-4 mt-6">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            Save Assignments
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignTeacherModal;



