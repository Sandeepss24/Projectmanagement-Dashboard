import { FiUser, FiTrash2, FiEdit2 } from "react-icons/fi";

const TaskList = ({ tasks, onDeleteTask, onUpdateTaskStatus }) => {
  const statusColors = {
    Todo: "bg-slate-100 text-slate-700 border-slate-200",
    "In Progress": "bg-blue-100 text-blue-700 border-blue-200",
    Done: "bg-green-100 text-green-700 border-green-200",
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-3">📝</div>
        <h3 className="text-lg font-semibold text-slate-800 mb-1">No tasks yet</h3>
        <p className="text-sm text-slate-500">Click "Add Task" to create your first task</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md transition-all"
        >
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-slate-800 mb-1 truncate">
                {task.name}
              </h4>
              {task.description && (
                <p className="text-sm text-slate-600 line-clamp-2">
                  {task.description}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => onDeleteTask(task.id)}
                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                title="Delete task"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <FiUser size={14} />
              <span>{task.assignedUser}</span>
            </div>

            <select
              value={task.status}
              onChange={(e) => onUpdateTaskStatus(task.id, e.target.value)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold border cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                statusColors[task.status]
              }`}
            >
              <option value="Todo">Todo</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
