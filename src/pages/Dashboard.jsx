import StateCard from "../components/StateCard";
import Charts from "../components/Charts";
import ProjectTable from "../components/ProjectTable";
import { FiFolder, FiCheckCircle, FiClock, FiTrendingUp, FiPlus } from "react-icons/fi";
import { useProjects } from "../context/ProjectContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const { projects } = useProjects();
  const [searchQuery, setSearchQuery] = useState("");

  const totalProjects = projects.length;
  const activeProjects = projects.filter(p => p.status === "In Progress").length;
  const completedTasks = projects.reduce((sum, p) => sum + p.completedTasks, 0);
  const pendingTasks = projects.reduce((sum, p) => sum + (p.totalTasks - p.completedTasks), 0);

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full space-y-4 sm:space-y-6 pt-16 lg:pt-0">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 dark:text-slate-100 mb-1 truncate">
            Dashboard Overview
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">Track your projects and team performance</p>
        </div>
        <button
          onClick={() => navigate("/projectform")}
          className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg sm:rounded-xl font-medium text-sm shadow-lg shadow-blue-500/30 hover:shadow-xl transition-all flex items-center justify-center gap-2 shrink-0"
        >
          <FiPlus size={18} />
          <span>New Project</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StateCard title="Total Projects" value={totalProjects.toString()} icon={<FiFolder />} color="blue" />
        <StateCard title="Active Projects" value={activeProjects.toString()} icon={<FiTrendingUp />} color="green" />
        <StateCard title="Completed Tasks" value={completedTasks.toString()} icon={<FiCheckCircle />} color="purple" />
        <StateCard title="Pending Tasks" value={pendingTasks.toString()} icon={<FiClock />} color="orange" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3 sm:mb-4">Project Progress</h3>
          <div className="h-64">
            <Charts type="bar" />
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3 sm:mb-4">Project Status Distribution</h3>
          <div className="h-64">
            <Charts type="pie" />
          </div>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-slate-800 dark:text-slate-100">Recent Projects</h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">Monitor and manage your active projects</p>
            </div>
          </div>
          <div className="flex items-center bg-slate-50 dark:bg-slate-700 rounded-lg px-3 py-2 border border-slate-200 dark:border-slate-600">
            <FiFolder className="text-slate-400 dark:text-slate-500 mr-2" size={16} />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none w-full text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />
          </div>
        </div>
        <ProjectTable projects={filteredProjects} />
      </div>

    </div>
  );
};

export default Dashboard;
