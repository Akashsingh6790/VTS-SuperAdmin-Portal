// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { Users, Activity, DollarSign, TrendingUp } from "lucide-react";
import { organizationService } from "../services/organizationService";

const Dashboard = () => {
  const [recentActivities, setRecentActivities] = useState([]);
  const [loadingActivities, setLoadingActivities] = useState(true);

  const stats = [
    {
      title: "Total Users",
      value: "2,543",
      change: "+12.5%",
      icon: Users,
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      title: "Active Sessions",
      value: "842",
      change: "+8.2%",
      icon: Activity,
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      title: "Revenue",
      value: "$45,231",
      change: "+23.1%",
      icon: DollarSign,
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      title: "Growth",
      value: "18.2%",
      change: "+4.3%",
      icon: TrendingUp,
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
    },
  ];


  const activityStyles = {
  ORGANIZATION_CREATED: {
    bg: "bg-green-100",
    text: "text-green-700",
    dot: "bg-green-500",
  },
  ORGANIZATION_UPDATED: {
    bg: "bg-orange-100",
    text: "text-orange-700",
    dot: "bg-orange-500",
  },
  ORGANIZATION_DELETED: {
    bg: "bg-red-100",
    text: "text-red-700",
    dot: "bg-red-500",
  },
};


 
useEffect(() => {
  const fetchStats = async () => {
    try {
      const res = await organizationService.getStats();
      setRecentActivities(res.recentActivities || []);
    } catch (error) {
      console.error("Failed to load dashboard stats", error);
    } finally {
      setLoadingActivities(false);
    }
  };

  fetchStats();
}, []);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-2">
                    {stat.value}
                  </h3>
                  <p className="text-sm text-green-600 font-medium mt-2">
                    {stat.change}
                  </p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <Icon className={`w-6 h-6 ${stat.textColor}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
       {/* Recent Activity */}
<div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
  <h2 className="text-xl font-bold text-gray-900 mb-6">
    Recent Activity
  </h2>

  {loadingActivities ? (
    <p className="text-gray-500">Loading recent activities...</p>
  ) : recentActivities.length === 0 ? (
    <p className="text-gray-500">No recent activity</p>
  ) : (
    <div className="space-y-4">
      {recentActivities.map((activity) => {
        const style =
          activityStyles[activity.type] ||
          activityStyles.ORGANIZATION_UPDATED;

        return (
          <div
            key={activity.id}
            className={`flex items-start gap-4 p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition ${style.bg}`}
          >
            {/* Timeline Dot */}
            <div className="flex flex-col items-center">
              <span
                className={`w-3 h-3 rounded-full mt-1 ${style.dot}`}
              />
              <span className="h-full w-px bg-gray-200 mt-1" />
            </div>

            {/* Content */}
            <div className="flex-1">
              <p className={`text-sm font-semibold ${style.text}`}>
                {activity.action}
              </p>

              <p className="text-sm text-gray-900 mt-1">
              
                <span className="font-semibold">
                  {activity.title}
                </span>
              </p>

              <p className="text-xs text-gray-500 mt-1">
                {activity.time}
              </p>
            </div>

            {/* Type Badge */}
            <span
              className={`text-xs font-medium px-3 py-1 rounded-full ${style.text} bg-white`}
            >
              {activity.type.replace("_", " ")}
            </span>
          </div>
        );
      })}
    </div>
  )}
</div>


        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition">
              Add New Organization
            </button>
            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-lg transition">
              Generate Report
            </button>
            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-lg transition">
              View Analytics
            </button>
            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-lg transition">
              System Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
