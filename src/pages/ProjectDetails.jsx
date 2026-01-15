import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiCalendar, FiUsers, FiCheckCircle, FiClock, FiEdit } from "react-icons/fi";
import { useProjects } from "../context/ProjectContext";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProjectById } = useProjects();

  // Find project by id
  const project = getProjectById(id);

  if (!project) {
    return (
      <div className="flex items-center justify-center h-96 pt-16 lg:pt-0">
        <div className="text-center">
          <p className="text-slate-600 text-lg">Project not found</p>
          <button
            onClick={() => navigate("/projects")}
            className="mt-4 text-blue-600 hover:underline"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  const completion = project.totalTasks > 0
    ? Math.round((project.completedTasks / project.totalTasks) * 100)
    : 0;

  const statusColors = {
    Planned: "bg-slate-100 text-slate-700 border-slate-200",
    "In Progress": "bg-blue-100 text-blue-700 border-blue-200",
    Completed: "bg-green-100 text-green-700 border-green-200",
    "On Hold": "bg-amber-100 text-amber-700 border-amber-200",
  };

  const priorityColors = {
    Low: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Medium: "bg-amber-100 text-amber-700 border-amber-200",
    High: "bg-red-100 text-red-700 border-red-200",
  };

  return (
    <div className="w-full space-y-6 pt-16 lg:pt-0">

      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <FiArrowLeft size={24} className="text-slate-600" />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
            {project.name}
          </h1>
          <p className="text-slate-500 text-sm mt-1">Project Details & Progress</p>
        </div>
        <button
          onClick={() => navigate(`/projectform/${id}`)}
          className="px-4 py-2 bg-white border-2 border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-all flex items-center gap-2"
        >
          <FiEdit size={18} />
          <span className="hidden sm:inline">Edit</span>
        </button>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FiCheckCircle className="text-blue-600" size={20} />
            </div>
            <span className="text-sm text-slate-500 font-medium">Progress</span>
          </div>
          <p className="text-3xl font-bold text-slate-800">{completion}%</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <FiCheckCircle className="text-green-600" size={20} />
            </div>
            <span className="text-sm text-slate-500 font-medium">Completed</span>
          </div>
          <p className="text-3xl font-bold text-slate-800">{project.completedTasks}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-100 rounded-lg">
              <FiClock className="text-orange-600" size={20} />
            </div>
            <span className="text-sm text-slate-500 font-medium">Remaining</span>
          </div>
          <p className="text-3xl font-bold text-slate-800">{project.totalTasks - project.completedTasks}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <FiUsers className="text-purple-600" size={20} />
            </div>
            <span className="text-sm text-slate-500 font-medium">Team Size</span>
          </div>
          <p className="text-3xl font-bold text-slate-800">{project.assignees.length}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">

          {/* Project Info */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Project Information</h2>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FiCalendar className="text-slate-400" size={20} />
                <div>
                  <p className="text-sm text-slate-500">Due Date</p>
                  <p className="font-semibold text-slate-800">{project.dueDate}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-slate-400 text-xl">📊</div>
                <div>
                  <p className="text-sm text-slate-500">Status</p>
                  <span className={`inline-block px-3 py-1 rounded-lg text-sm font-semibold border mt-1 ${statusColors[project.status]}`}>
                    {project.status}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-slate-400 text-xl">🚩</div>
                <div>
                  <p className="text-sm text-slate-500">Priority</p>
                  <span className={`inline-block px-3 py-1 rounded-lg text-sm font-semibold border mt-1 ${priorityColors[project.priority]}`}>
                    {project.priority}
                  </span>
                </div>
              </div>

              {project.description && (
                <div className="pt-4 border-t border-slate-200">
                  <p className="text-sm text-slate-500 mb-2">Description</p>
                  <p className="text-slate-700">{project.description}</p>
                </div>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Overall Progress</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Tasks Completed</span>
                <span className="font-semibold text-slate-800">{project.completedTasks} / {project.totalTasks}</span>
              </div>
              <div className="h-4 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500"
                  style={{ width: `${completion}%` }}
                />
              </div>
              <p className="text-xs text-slate-500">
                {project.totalTasks > 0
                  ? `${project.totalTasks - project.completedTasks} tasks remaining to complete this project`
                  : "No tasks assigned yet"}
              </p>
            </div>
          </div>

        </div>

        {/* Right Column */}
        <div className="space-y-6">

          {/* Team Members */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <FiUsers className="text-slate-500" />
              Team Members
            </h2>
            <div className="space-y-3">
              {project.assignees.map((member, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold flex items-center justify-center shadow-md">
                    {member}
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">Team Member {member}</p>
                    <p className="text-xs text-slate-500">Developer</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium shadow-lg shadow-blue-500/30 hover:shadow-xl transition-all">
                Add Task
              </button>
              <button className="w-full px-4 py-3 bg-white border-2 border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-all">
                View Timeline
              </button>
              <button className="w-full px-4 py-3 bg-white border-2 border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-all">
                Generate Report
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default ProjectDetails;
