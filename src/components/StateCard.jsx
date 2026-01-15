import React from 'react'

const StateCard = ({ title, value, icon, color = "blue" }) => {
  const colorClasses = {
    blue: "from-blue-500 to-indigo-600",
    green: "from-green-500 to-emerald-600",
    purple: "from-purple-500 to-pink-600",
    orange: "from-orange-500 to-red-600",
  };

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200">

      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-medium text-slate-500 mb-2 sm:mb-3 truncate">
            {title}
          </p>

          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-1">
            {value ?? "--"}
          </h2>

          <div className="flex items-center gap-1 text-xs text-green-600 font-medium">
            <span>↑ 12%</span>
            <span className="text-slate-400 hidden sm:inline">vs last month</span>
          </div>
        </div>

        {icon && (
          <div className={`p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br ${colorClasses[color] || colorClasses.blue} text-white shadow-md shrink-0`}>
            <div className="text-xl sm:text-2xl">
              {icon}
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default StateCard;
