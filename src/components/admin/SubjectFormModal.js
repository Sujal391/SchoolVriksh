import { useState, useEffect } from 'react';

const SubjectFormModal = ({ isOpen, onClose, subjectData, classes, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    classId: '', // Changed from 'class' to 'classId'
    status: 'active'
  });

  useEffect(() => {
    if (subjectData) {
      setFormData({
        name: subjectData.name,
        classId: subjectData.class?._id || '', // Changed from 'class' to 'classId'
        status: subjectData.status
      });
    } else {
      setFormData({
        name: '',
        classId: classes.length > 0 ? classes[0]._id : '', // Changed from 'class' to 'classId'
        status: 'active'
      });
    }
  }, [isOpen, subjectData, classes]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h3 className="text-lg font-semibold">
            {subjectData ? 'Edit Subject' : 'Add New Subject'}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">&times;</button>
        </div>

        <div className="px-6 py-4 space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Subject Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Class
            </label>
            <select
              name="classId" // Changed from 'class' to 'classId'
              value={formData.classId} // Changed from 'class' to 'classId'
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
            >
              {classes.map(cls => (
                <option key={cls._id} value={cls._id}>
                  {cls.name} - {cls.division}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t px-6 py-4">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {subjectData ? 'Update' : 'Create'}
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

export default SubjectFormModal;