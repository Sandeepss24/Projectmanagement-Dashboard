import { useState, useEffect } from "react";
import { FiX, FiUser, FiFileText } from "react-icons/fi";

const TaskModal = ({ isOpen, onClose, onSubmit, projectId, assignees = [] }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    assignedUser: "",
    status: "Todo",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        name: "",
        description: "",
        assignedUser: "",
        status: "Todo",
      });
      setErrors({});
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Task name is required";
    if (!formData.assignedUser) newErrors.assignedUser = "Please assign a user";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Add New Task</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <FiX size={20} className="text-slate-600 dark:text-slate-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Task Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter task name..."
              className={`w-full px-4 py-2.5 rounded-lg border-2 text-sm text-slate-800 dark:text-slate-200 dark:bg-slate-700 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.name ? "border-red-500" : "border-slate-200 dark:border-slate-600"
              }`}
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                <span>⚠</span> {errors.name}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
              <FiFileText className="text-slate-500 dark:text-slate-400" size={16} />
              Description
            </label>
            <textarea
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the task..."
              className="w-full px-4 py-2.5 rounded-lg border-2 border-slate-200 dark:border-slate-600 text-sm text-slate-800 dark:text-slate-200 dark:bg-slate-700 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
              <FiUser className="text-slate-500 dark:text-slate-400" size={16} />
              Assigned User <span className="text-red-500">*</span>
            </label>
            <select
              name="assignedUser"
              value={formData.assignedUser}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 rounded-lg border-2 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white dark:bg-slate-700 ${errors.assignedUser ? "border-red-500" : "border-slate-200 dark:border-slate-600"
              }`}
            >
              <option value="">Select User</option>
              {assignees.map((user, index) => (
                <option key={index} value={user}>
                  {user}
                </option>
              ))}
            </select>
            {errors.assignedUser && (
              <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                <span>⚠</span> {errors.assignedUser}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border-2 border-slate-200 dark:border-slate-600 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white dark:bg-slate-700"
            >
              <option value="Todo">Todo</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-white dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-lg font-medium text-sm hover:bg-slate-50 dark:hover:bg-slate-600 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium text-sm shadow-lg shadow-blue-500/30 hover:shadow-xl transition-all"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
