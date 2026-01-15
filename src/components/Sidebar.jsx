import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  FiHome,
  FiFolder,
  FiCheckSquare,
  FiBell,
  FiUsers,
  FiSettings,
  FiMenu
} from "react-icons/fi";
import { MdOutlineCreateNewFolder } from "react-icons/md";

const menu = [
  { name: "Dashboard", path: "/", icon: <FiHome /> },
  { name: "Projects", path: "/projects", icon: <FiFolder /> },
  { name: "Creat Project", path: "/projectform", icon: <MdOutlineCreateNewFolder /> },
  { name: "Tasks", path: "/tasks", icon: <FiCheckSquare /> },
  { name: "Reminders", path: "/reminders", icon: <FiBell /> },
  { name: "Team", path: "/team", icon: <FiUsers /> },
  { name: "Settings", path: "/settings", icon: <FiSettings /> },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Topbar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 flex items-center justify-between bg-white shadow-sm px-4 py-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-sm">PM</span>
          </div>
          <h2 className="font-bold text-slate-800 text-sm sm:text-base">Project Manager</h2>
        </div>
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors shrink-0"
        >
          <FiMenu size={22} className="text-slate-700" />
        </button>
      </div>

      {/* Overlay (Mobile) */}
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
          h-screen lg:h-full bg-white border-r border-slate-200
          transition-all duration-300 ease-in-out
          ${collapsed ? "lg:w-20" : "lg:w-64"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          w-64
        `}
      >
        {/* Logo & Collapse */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 h-16">
          <div className={`flex items-center gap-3 overflow-hidden ${collapsed && "lg:hidden"}`}>
            <div className="h-9 w-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-md shrink-0">
              <span className="text-white font-bold text-sm">PM</span>
            </div>
            <div className="min-w-0">
              <h1 className="font-bold text-base text-slate-800 truncate">Project Manager</h1>
            </div>
          </div>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-all shrink-0"
          >
            <FiMenu size={18} />
          </button>
        </div>

        {/* Menu */}
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
                  : "text-slate-700 hover:bg-slate-100"
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
