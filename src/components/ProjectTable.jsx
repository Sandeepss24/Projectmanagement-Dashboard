import { useNavigate } from "react-router-dom";

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

const ProjectTable = ({ projects }) => {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto">
      {/* Desktop Table */}
      <table className="hidden md:table min-w-full">

        {/* Table Head */}
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Project</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Progress</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Tasks</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Due Date</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Team</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Priority</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="divide-y divide-slate-200">
          {projects.map((project) => {
            const completion = project.totalTasks > 0
              ? Math.round((project.completedTasks / project.totalTasks) * 100)
              : 0;

            return (
              <tr
                key={project.id}
                onClick={() => navigate(`/projects/${project.id}`)}
                className="cursor-pointer hover:bg-slate-50 transition-colors group"
              >
                {/* Project Name */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                    {project.name}
                  </div>
                </td>

                {/* Completion */}
                <td className="px-6 py-4">
                  <div className="w-40">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-slate-600">
                        {completion}%
                      </span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500"
                        style={{ width: `${completion}%` }}
                      />
                    </div>
                  </div>
                </td>

                {/* Tasks */}
                <td className="px-6 py-4 text-sm text-slate-700 font-medium">
                  <span className="text-green-600">{project.completedTasks}</span>
                  <span className="text-slate-400 mx-1">/</span>
                  <span>{project.totalTasks}</span>
                </td>

                {/* Due Date */}
                <td className="px-6 py-4 text-sm text-slate-600">
                  {project.dueDate}
                </td>

                {/* Assignees */}
                <td className="px-6 py-4">
                  <div className="flex -space-x-2">
                    {project.assignees.slice(0, 3).map((user, i) => (
                      <div
                        key={i}
                        className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-xs font-semibold flex items-center justify-center border-2 border-white shadow-sm hover:scale-110 transition-transform"
                        title={user}
                      >
                        {user}
                      </div>
                    ))}
                    {project.assignees.length > 3 && (
                      <div className="h-9 w-9 rounded-full bg-slate-200 text-slate-600 text-xs font-semibold flex items-center justify-center border-2 border-white shadow-sm">
                        +{project.assignees.length - 3}
                      </div>
                    )}
                  </div>
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${statusColors[project.status]}`}
                  >
                    {project.status}
                  </span>
                </td>

                {/* Priority */}
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${priorityColors[project.priority]}`}
                  >
                    {project.priority}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4 p-4">
        {projects.map((project) => {
          const completion = project.totalTasks > 0
            ? Math.round((project.completedTasks / project.totalTasks) * 100)
            : 0;

          return (
            <div
              key={project.id}
              onClick={() => navigate(`/projects/${project.id}`)}
              className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all active:scale-98"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-slate-800 flex-1">
                  {project.name}
                </h3>
                <span
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${priorityColors[project.priority]}`}
                >
                  {project.priority}
                </span>
              </div>

              {/* Progress */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium text-slate-600">Progress</span>
                  <span className="text-xs font-semibold text-slate-800">{completion}%</span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                    style={{ width: `${completion}%` }}
                  />
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
                <div>
                  <span className="text-slate-500 text-xs">Tasks</span>
                  <p className="font-medium text-slate-800">
                    {project.completedTasks}/{project.totalTasks}
                  </p>
                </div>
                <div>
                  <span className="text-slate-500 text-xs">Due Date</span>
                  <p className="font-medium text-slate-800">{project.dueDate}</p>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                <div className="flex -space-x-2">
                  {project.assignees.slice(0, 3).map((user, i) => (
                    <div
                      key={i}
                      className="h-7 w-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-xs font-semibold flex items-center justify-center border-2 border-white"
                    >
                      {user}
                    </div>
                  ))}
                  {project.assignees.length > 3 && (
                    <div className="h-7 w-7 rounded-full bg-slate-200 text-slate-600 text-xs font-semibold flex items-center justify-center border-2 border-white">
                      +{project.assignees.length - 3}
                    </div>
                  )}
                </div>
                <span
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${statusColors[project.status]}`}
                >
                  {project.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectTable;
