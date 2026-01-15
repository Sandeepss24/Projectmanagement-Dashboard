import { FiSearch, FiBell, FiChevronDown } from "react-icons/fi";

const Topbar = () => {
  return (
    <header className="hidden lg:flex h-16 bg-white border-b border-slate-200 items-center justify-between px-4 xl:px-6 shrink-0">

      {/* Left Section */}
      <div className="flex items-center gap-4 min-w-0">
        <h3 className="text-base xl:text-lg font-semibold text-slate-800 truncate">
          Welcome back! 👋
        </h3>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 xl:gap-4 shrink-0">

        {/* Search */}
        <div className="hidden xl:flex items-center bg-slate-100 rounded-lg px-3 py-2 w-48 2xl:w-64 focus-within:ring-2 focus-within:ring-blue-500 focus-within:bg-white transition-all">
          <FiSearch className="text-slate-400 shrink-0" size={18} />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none px-2 text-sm w-full text-slate-700 placeholder:text-slate-400"
          />
        </div>

        {/* Notification */}
        <button className="relative p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all">
          <FiBell size={20} />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-2 cursor-pointer hover:bg-slate-100 rounded-lg px-2 py-1.5 transition-all">
          <div className="hidden xl:flex flex-col items-end">
            <span className="text-sm font-semibold text-slate-800">Sarah Smith</span>
            <span className="text-xs text-slate-500">Manager</span>
          </div>
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-semibold text-sm shrink-0">
            SS
          </div>
          <FiChevronDown className="text-slate-400 hidden lg:block" size={16} />
        </div>

      </div>
    </header>
  );
};

export default Topbar;
