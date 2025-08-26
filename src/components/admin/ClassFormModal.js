import { useEffect, useState } from 'react';
import AdminService from '../../services/adminService';

const ClassFormModal = ({ isOpen, onClose, classData, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    division: '',
    capacity: 30,
    academicYear: new Date().getFullYear() + '-' + (new Date().getFullYear() + 1),
    rteSeats: 0,
    classTeacher: ''
  });

  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await AdminService.getTeachers();
        setTeachers(response.data);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };

    if (isOpen) {
      fetchTeachers();
      if (classData) {
        setFormData({
          name: classData.name,
          division: classData.division,
          capacity: classData.capacity,
          academicYear: classData.academicYear,
          rteSeats: classData.rteSeats?.total || 0,
          classTeacher: classData.classTeacher?._id || ''
        });
      } else {
        setFormData({
          name: '',
          division: '',
          capacity: 30,
          academicYear: new Date().getFullYear() + '-' + (new Date().getFullYear() + 1),
          rteSeats: 0,
          classTeacher: ''
        });
      }
    }
  }, [isOpen, classData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    onSubmit({
      ...formData,
      rteSeats: {
        total: parseInt(formData.rteSeats),
        occupied: 0
      }
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center px-4">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">
        <h2 className="text-xl font-semibold mb-4">
          {classData ? 'Edit Class' : 'Add New Class'}
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Class Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Division</label>
            <input
              type="text"
              name="division"
              value={formData.division}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Capacity</label>
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">RTE Seats</label>
            <input
              type="number"
              name="rteSeats"
              value={formData.rteSeats}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Academic Year</label>
            <input
              type="text"
              name="academicYear"
              value={formData.academicYear}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Class Teacher</label>
            <select
              name="classTeacher"
              value={formData.classTeacher}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="">Select Class Teacher</option>
              {teachers.map(teacher => (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {classData ? 'Update' : 'Create'}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassFormModal;
