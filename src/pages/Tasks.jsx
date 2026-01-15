import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProjects } from "../context/ProjectContext";
import { FiSearch, FiFilter, FiX, FiFolder, FiUser } from "react-icons/fi";

const Tasks = () => {
    const navigate = useNavigate();
    const { projects } = useProjects();
    const [searchQuery, setSearchQuery] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        status: "all",
        project: "all",
    });

    // Get all tasks from all projects
    const allTasks = projects.flatMap(project =>
        (project.tasks || []).map(task => ({
            ...task,
            projectId: project.id,
            projectName: project.name,
        }))
    );

    // Filter tasks
    const filteredTasks = allTasks.filter((task) => {
        const matchesSearch =
            task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.assignedUser.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = filters.status === "all" || task.status === filters.status;
        const matchesProject = filters.project === "all" || task.projectId === parseInt(filters.project);

        return matchesSearch && matchesStatus && matchesProject;
    });

    const handleClearFilters = () => {
        setFilters({
            status: "all",
            project: "all",
        });
    };

    const activeFiltersCount = Object.values(filters).filter(v => v !== "all").length;

    // Group tasks by status
    const tasksByStatus = {
        Todo: filteredTasks.filter(t => t.status === "Todo"),
        "In Progress": filteredTasks.filter(t => t.status === "In Progress"),
        Done: filteredTasks.filter(t => t.status === "Done"),
    };

    return (
        <div className="w-full space-y-4 sm:space-y-6 pt-16 lg:pt-0">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                <div className="min-w-0">
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 dark:text-slate-100 mb-1 truncate">
                        All Tasks
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
                        Showing {filteredTasks.length} of {allTasks.length} tasks
                    </p>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 flex items-center bg-white dark:bg-slate-800 rounded-lg sm:rounded-xl px-4 py-2.5 sm:py-3 border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
                    <FiSearch className="text-slate-400 dark:text-slate-500 mr-3 shrink-0" size={18} />
                    <input
                        type="text"
                        placeholder="Search tasks by name or assignee..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-transparent outline-none w-full text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery("")}
                            className="ml-2 p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
                        >
                            <FiX size={16} className="text-slate-400 dark:text-slate-500" />
                        </button>
                    )}
                </div>
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`px-4 sm:px-6 py-2.5 sm:py-3 bg-white dark:bg-slate-800 border rounded-lg sm:rounded-xl font-medium text-sm transition-all flex items-center gap-2 justify-center shrink-0 relative ${activeFiltersCount > 0
                        ? "border-blue-500 text-blue-600 bg-blue-50 dark:bg-blue-900/30"
                        : "border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700"
                        }`}
                >
                    <FiFilter size={16} />
                    <span>Filters</span>
                    {activeFiltersCount > 0 && (
                        <span className="absolute -top-1 -right-1 h-5 w-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                            {activeFiltersCount}
                        </span>
                    )}
                </button>
            </div>

            {/* Filter Panel */}
            {showFilters && (
                <div className="bg-white dark:bg-slate-800 rounded-lg sm:rounded-xl border border-slate-200 dark:border-slate-700 p-4 sm:p-6 space-y-4">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-slate-800 dark:text-slate-100">Filter Tasks</h3>
                        {activeFiltersCount > 0 && (
                            <button
                                onClick={handleClearFilters}
                                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                            >
                                Clear All
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Status Filter */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Status
                            </label>
                            <select
                                value={filters.status}
                                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700"
                            >
                                <option value="all">All Statuses</option>
                                <option value="Todo">Todo</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Done">Done</option>
                            </select>
                        </div>

                        {/* Project Filter */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Project
                            </label>
                            <select
                                value={filters.project}
                                onChange={(e) => setFilters({ ...filters, project: e.target.value })}
                                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700"
                            >
                                <option value="all">All Projects</option>
                                {projects.map(project => (
                                    <option key={project.id} value={project.id}>
                                        {project.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            )}

            {/* Tasks by Status */}
            {filteredTasks.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Todo Column */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50">
                            <h3 className="font-semibold text-slate-800 dark:text-slate-100 flex items-center justify-between">
                                <span>Todo</span>
                                <span className="text-sm bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-200 px-2 py-1 rounded-full">
                                    {tasksByStatus.Todo.length}
                                </span>
                            </h3>
                        </div>
                        <div className="p-4 space-y-3 max-h-[600px] overflow-y-auto">
                            {tasksByStatus.Todo.map((task) => (
                                <div
                                    key={`${task.projectId}-${task.id}`}
                                    onClick={() => navigate(`/projects/${task.projectId}`)}
                                    className="bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer"
                                >
                                    <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-2 truncate">
                                        {task.name}
                                    </h4>
                                    {task.description && (
                                        <p className="text-sm text-slate-600 dark:text-slate-300 mb-3 line-clamp-2">
                                            {task.description}
                                        </p>
                                    )}
                                    <div className="flex items-center justify-between gap-2 text-xs">
                                        <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                                            <FiFolder size={12} />
                                            <span className="truncate">{task.projectName}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                                            <FiUser size={12} />
                                            <span className="truncate">{task.assignedUser}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {tasksByStatus.Todo.length === 0 && (
                                <p className="text-center text-slate-400 dark:text-slate-500 py-8 text-sm">No tasks</p>
                            )}
                        </div>
                    </div>

                    {/* In Progress Column */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-blue-50 dark:bg-blue-900/30">
                            <h3 className="font-semibold text-slate-800 dark:text-slate-100 flex items-center justify-between">
                                <span>In Progress</span>
                                <span className="text-sm bg-blue-200 dark:bg-blue-700 text-blue-700 dark:text-blue-200 px-2 py-1 rounded-full">
                                    {tasksByStatus["In Progress"].length}
                                </span>
                            </h3>
                        </div>
                        <div className="p-4 space-y-3 max-h-[600px] overflow-y-auto">
                            {tasksByStatus["In Progress"].map((task) => (
                                <div
                                    key={`${task.projectId}-${task.id}`}
                                    onClick={() => navigate(`/projects/${task.projectId}`)}
                                    className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer"
                                >
                                    <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-2 truncate">
                                        {task.name}
                                    </h4>
                                    {task.description && (
                                        <p className="text-sm text-slate-600 dark:text-slate-300 mb-3 line-clamp-2">
                                            {task.description}
                                        </p>
                                    )}
                                    <div className="flex items-center justify-between gap-2 text-xs">
                                        <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                                            <FiFolder size={12} />
                                            <span className="truncate">{task.projectName}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                                            <FiUser size={12} />
                                            <span className="truncate">{task.assignedUser}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {tasksByStatus["In Progress"].length === 0 && (
                                <p className="text-center text-slate-400 dark:text-slate-500 py-8 text-sm">No tasks</p>
                            )}
                        </div>
                    </div>

                    {/* Done Column */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-green-50 dark:bg-green-900/30">
                            <h3 className="font-semibold text-slate-800 dark:text-slate-100 flex items-center justify-between">
                                <span>Done</span>
                                <span className="text-sm bg-green-200 dark:bg-green-700 text-green-700 dark:text-green-200 px-2 py-1 rounded-full">
                                    {tasksByStatus.Done.length}
                                </span>
                            </h3>
                        </div>
                        <div className="p-4 space-y-3 max-h-[600px] overflow-y-auto">
                            {tasksByStatus.Done.map((task) => (
                                <div
                                    key={`${task.projectId}-${task.id}`}
                                    onClick={() => navigate(`/projects/${task.projectId}`)}
                                    className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer"
                                >
                                    <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-2 truncate">
                                        {task.name}
                                    </h4>
                                    {task.description && (
                                        <p className="text-sm text-slate-600 dark:text-slate-300 mb-3 line-clamp-2">
                                            {task.description}
                                        </p>
                                    )}
                                    <div className="flex items-center justify-between gap-2 text-xs">
                                        <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                                            <FiFolder size={12} />
                                            <span className="truncate">{task.projectName}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                                            <FiUser size={12} />
                                            <span className="truncate">{task.assignedUser}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {tasksByStatus.Done.length === 0 && (
                                <p className="text-center text-slate-400 dark:text-slate-500 py-8 text-sm">No tasks</p>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-700 p-12 text-center">
                    <div className="text-4xl mb-3">📝</div>
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-1">No tasks found</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        {searchQuery || activeFiltersCount > 0
                            ? "Try adjusting your search or filters"
                            : "Tasks will appear here once you add them to projects"}
                    </p>
                    {(searchQuery || activeFiltersCount > 0) && (
                        <button
                            onClick={() => {
                                setSearchQuery("");
                                handleClearFilters();
                            }}
                            className="mt-4 px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                        >
                            Clear all filters
                        </button>
                    )}
                </div>
            )}

        </div>
    );
};

export default Tasks;
