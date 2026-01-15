import { useState, useEffect } from "react";
import { FiX, FiCalendar, FiUser, FiFlag, FiCheckCircle, FiList } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { useProjects } from "../context/ProjectContext";

const assigneeOptions = ["Alice", "Bob", "Charlie", "David", "Emma", "Frank"];
const managerOptions = ["Manager A", "Manager B", "Manager C"];

const ProjectForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addProject, updateProject, getProjectById } = useProjects();
  const [showSuccess, setShowSuccess] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    assignees: [],
    manager: "",
    status: "Planned",
    priority: "Medium",
    totalTasks: "",
    completedTasks: "",
  });

  const [errors, setErrors] = useState({});

  
  useEffect(() => {
    if (id) {
      const project = getProjectById(id);
      if (project) {
        setIsEditMode(true);
        setFormData({
          name: project.name,
          description: project.description || "",
          startDate: project.startDate || "",
          endDate: project.dueDate,
          assignees: project.assignees,
          manager: project.manager || "",
          status: project.status,
          priority: project.priority,
          totalTasks: project.totalTasks.toString(),
          completedTasks: project.completedTasks.toString(),
        });
      }
    }
  }, [id, getProjectById]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const toggleAssignee = (assignee) => {
    setFormData((prev) => ({
      ...prev,
      assignees: prev.assignees.includes(assignee)
        ? prev.assignees.filter((a) => a !== assignee)
        : [...prev.assignees, assignee],
    }));
    if (errors.assignees) {
      setErrors({ ...errors, assignees: "" });
    }
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Project name is required";
    if (
      formData.startDate &&
      formData.endDate &&
      formData.endDate <= formData.startDate
    )
      newErrors.endDate = "End date must be after start date";
    if (formData.assignees.length === 0)
      newErrors.assignees = "Select at least one team member";

   
    if (formData.totalTasks && parseInt(formData.totalTasks) < 0) {
      newErrors.totalTasks = "Total tasks must be 0 or greater";
    }
    if (formData.completedTasks && parseInt(formData.completedTasks) < 0) {
      newErrors.completedTasks = "Completed tasks must be 0 or greater";
    }
    if (
      formData.totalTasks &&
      formData.completedTasks &&
      parseInt(formData.completedTasks) > parseInt(formData.totalTasks)
    ) {
      newErrors.completedTasks = "Completed tasks cannot exceed total tasks";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      if (isEditMode) {
        updateProject(id, formData);
      } else {
        addProject(formData);
      }

      setShowSuccess(true);

      setTimeout(() => {
        navigate("/projects");
      }, 1500);
    }
  };

  if (showSuccess) {
    return (
      <div className="w-full max-w-4xl mx-auto pt-16 lg:pt-0">
        <div className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
            <FiCheckCircle className="text-green-600 dark:text-green-400" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
            {isEditMode ? "Project Updated Successfully!" : "Project Created Successfully!"}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">Redirecting to projects page...</p>
          <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto space-y-4 sm:space-y-6 pt-16 lg:pt-0">

      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 dark:text-slate-100 mb-1 truncate">
            {isEditMode ? "Edit Project" : "Create New Project"}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
            {isEditMode ? "Update project details" : "Fill in the details to start a new project"}
          </p>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors shrink-0"
        >
          <FiX size={24} className="text-slate-600 dark:text-slate-400" />
        </button>
      </div>

      {/* Form */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl sm:rounded-2xl shadow-sm overflow-hidden">
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">

          
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Project Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter project name..."
              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border-2 text-sm sm:text-base text-slate-800 dark:text-slate-200 dark:bg-slate-700 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.name ? "border-red-500" : "border-slate-200 dark:border-slate-600"
                }`}
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                <span>⚠</span> {errors.name}
              </p>
            )}
          </div>

          
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Description
            </label>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your project goals and objectives..."
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border-2 border-slate-200 dark:border-slate-600 text-sm sm:text-base text-slate-800 dark:text-slate-200 dark:bg-slate-700 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
            />
          </div>

          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                <FiList className="text-slate-500 dark:text-slate-400" size={16} />
                Total Tasks
              </label>
              <input
                type="number"
                name="totalTasks"
                min="0"
                value={formData.totalTasks}
                onChange={handleChange}
                placeholder="0"
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border-2 text-sm sm:text-base text-slate-800 dark:text-slate-200 dark:bg-slate-700 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.totalTasks ? "border-red-500" : "border-slate-200 dark:border-slate-600"
                  }`}
              />
              {errors.totalTasks && (
                <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                  <span>⚠</span> {errors.totalTasks}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                <FiCheckCircle className="text-slate-500 dark:text-slate-400" size={16} />
                Completed Tasks
              </label>
              <input
                type="number"
                name="completedTasks"
                min="0"
                value={formData.completedTasks}
                onChange={handleChange}
                placeholder="0"
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border-2 text-sm sm:text-base text-slate-800 dark:text-slate-200 dark:bg-slate-700 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.completedTasks ? "border-red-500" : "border-slate-200 dark:border-slate-600"
                  }`}
              />
              {errors.completedTasks && (
                <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                  <span>⚠</span> {errors.completedTasks}
                </p>
              )}
            </div>
          </div>

         
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                <FiCalendar className="text-slate-500 dark:text-slate-400" size={16} />
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border-2 border-slate-200 dark:border-slate-600 text-sm sm:text-base text-slate-800 dark:text-slate-200 dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                <FiCalendar className="text-slate-500 dark:text-slate-400" size={16} />
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border-2 text-sm sm:text-base text-slate-800 dark:text-slate-200 dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.endDate ? "border-red-500" : "border-slate-200 dark:border-slate-600"
                  }`}
              />
              {errors.endDate && (
                <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                  <span>⚠</span> {errors.endDate}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
              <FiUser className="text-slate-500 dark:text-slate-400" size={16} />
              Team Members <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {assigneeOptions.map((assignee) => {
                const isSelected = formData.assignees.includes(assignee) ||
                  formData.assignees.includes(assignee.substring(0, 2).toUpperCase());
                return (
                  <button
                    type="button"
                    key={assignee}
                    onClick={() => toggleAssignee(assignee)}
                    className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-lg sm:rounded-xl border-2 transition-all ${isSelected
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-transparent shadow-md"
                      : "bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-600 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                      }`}
                  >
                    {assignee}
                  </button>
                );
              })}
            </div>
            {errors.assignees && (
              <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
                <span>⚠</span> {errors.assignees}
              </p>
            )}
          </div>

       
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Project Manager
              </label>
              <select
                name="manager"
                value={formData.manager}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border-2 border-slate-200 dark:border-slate-600 text-sm sm:text-base text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white dark:bg-slate-700"
              >
                <option value="">Select Manager</option>
                {managerOptions.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border-2 border-slate-200 dark:border-slate-600 text-sm sm:text-base text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white dark:bg-slate-700"
              >
                <option value="Planned">Planned</option>
                <option value="In Progress">In Progress</option>
                <option value="On Hold">On Hold</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                <FiFlag className="text-slate-500 dark:text-slate-400" size={16} />
                Priority
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border-2 border-slate-200 dark:border-slate-600 text-sm sm:text-base text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white dark:bg-slate-700"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 sm:px-6 py-2.5 sm:py-3 bg-white dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-lg sm:rounded-xl font-medium text-sm hover:bg-slate-50 dark:hover:bg-slate-600 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg sm:rounded-xl font-medium text-sm shadow-lg shadow-blue-500/30 hover:shadow-xl transition-all"
            >
              {isEditMode ? "Update Project" : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
