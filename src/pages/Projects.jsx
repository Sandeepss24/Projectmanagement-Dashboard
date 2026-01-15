import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProjectTable from "../components/ProjectTable";
import { FiPlus, FiFilter, FiSearch, FiX } from "react-icons/fi";
import { useProjects } from "../context/ProjectContext";

const Projects = () => {
  const navigate = useNavigate();
  const { projects } = useProjects();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
  });

  // Filter and search logic
  const filteredProjects = projects.filter((project) => {
    // Search filter
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase());

    // Status filter
    const matchesStatus = filters.status === "all" || project.status === filters.status;

    // Priority filter
    const matchesPriority = filters.priority === "all" || project.priority === filters.priority;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleClearFilters = () => {
    setFilters({
      status: "all",
      priority: "all",
    });
  };

  const activeFiltersCount = Object.values(filters).filter(v => v !== "all").length;

  return (
    <div className="w-full space-y-4 sm:space-y-6 pt-16 lg:pt-0">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 dark:text-slate-100 mb-1 truncate">
            All Projects
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
            Showing {filteredProjects.length} of {projects.length} projects
          </p>
        </div>
        <button
          onClick={() => navigate("/projectform")}
          className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg sm:rounded-xl font-medium text-sm shadow-lg shadow-blue-500/30 hover:shadow-xl transition-all flex items-center justify-center gap-2 shrink-0"
        >
          <FiPlus size={18} />
          <span>New Project</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 flex items-center bg-white dark:bg-slate-800 rounded-lg sm:rounded-xl px-4 py-2.5 sm:py-3 border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
          <FiSearch className="text-slate-400 dark:text-slate-500 mr-3 shrink-0" size={18} />
          <input
            type="text"
            placeholder="Search projects by name..."
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
            <h3 className="font-semibold text-slate-800 dark:text-slate-100">Filter Projects</h3>
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
                <option value="Planned">Planned</option>
                <option value="In Progress">In Progress</option>
                <option value="On Hold">On Hold</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            {/* Priority Filter */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Priority
              </label>
              <select
                value={filters.priority}
                onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700"
              >
                <option value="all">All Priorities</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Projects Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        {filteredProjects.length > 0 ? (
          <ProjectTable projects={filteredProjects} />
        ) : (
          <div className="p-12 text-center">
            <div className="text-4xl mb-3">🔍</div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-1">No projects found</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
              {searchQuery || activeFiltersCount > 0
                ? "Try adjusting your search or filters"
                : "Create your first project to get started"}
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

    </div>
  );
};

export default Projects;
