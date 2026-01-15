import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  FiHome,
  FiFolder,
  FiCheckSquare,
  FiBell,
  FiUsers,
  FiSettings,
  FiMenu,
  FiMoon,
  FiSun
} from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

const menu = [
  { name: "Dashboard", path: "/", icon: <FiHome /> },
  { name: "Projects", path: "/projects", icon: <FiFolder /> },
  { name: "Tasks", path: "/tasks", icon: <FiCheckSquare /> },
  { name: "Reminders", path: "/reminders", icon: <FiBell /> },
  { name: "Team", path: "/team", icon: <FiUsers /> },
  { name: "Settings", path: "/settings", icon: <FiSettings /> },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <>
      {/* Mobile Topbar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 flex items-center justify-between bg-white dark:bg-slate-900 shadow-sm px-4 py-3 border-b border-slate-200 dark:border-slate-700 transition-colors">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-sm">PM</span>
          </div>
          <h2 className="font-bold text-slate-800 dark:text-slate-100 text-sm sm:text-base">Project Manager</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors shrink-0"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors shrink-0"
          >
            <FiMenu size={22} className="text-slate-700 dark:text-slate-300" />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:relative z-50
          h-screen lg:h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700
          transition-all duration-300 ease-in-out
          ${collapsed ? "lg:w-20" : "lg:w-64"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          w-64
        `}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700 h-16">
          <div className={`flex items-center gap-3 overflow-hidden ${collapsed && "lg:hidden"}`}>
            <div className="h-9 w-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-md shrink-0">
              <span className="text-white font-bold text-sm">PM</span>
            </div>
            <div className="min-w-0">
              <h1 className="font-bold text-base text-slate-800 dark:text-slate-100 truncate">Project Manager</h1>
            </div>
          </div>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all shrink-0"
          >
            <FiMenu size={18} />
          </button>
        </div>

        <nav className="p-3 space-y-1 overflow-y-auto h-[calc(100vh-4rem)]">
          {menu.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `
                flex items-center gap-3 px-3 py-2.5 rounded-lg
                text-sm font-medium
                transition-all duration-200
                ${isActive
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                }
                ${collapsed ? "lg:justify-center" : ""}
              `
              }
            >
              <span className="text-lg shrink-0">
                {item.icon}
              </span>
              <span className={`${collapsed ? "lg:hidden" : ""} truncate`}>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
