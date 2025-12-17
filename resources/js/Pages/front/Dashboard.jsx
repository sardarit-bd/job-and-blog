import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import { JobApplicationCard } from '../../components/ui/JobApplicationCard';


const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg transition duration-300 ease-in-out hover:shadow-2xl border-l-4" style={{ borderColor: color }}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</h3>
        <div className={`p-2 rounded-full text-white bg-opacity-75`} style={{ backgroundColor: color }}>
          {/* Replace with actual Icon component */}
          <span className="text-xl">{icon}</span>
        </div>
      </div>
      <p className="mt-4 text-4xl font-extrabold text-gray-900">{value}</p>
    </div>
  );
};

// A component for recent activities
const ActivityCard = () => {
  const activities = [
    { time: '5m ago', action: 'New user registered', detail: 'Jane Smith', color: 'text-green-500' },
    { time: '1h ago', action: 'Project update pushed', detail: 'Dashboard UI', color: 'text-indigo-500' },
    { time: '2h ago', action: 'Payment received', detail: '$450.00', color: 'text-yellow-500' },
    { time: '4h ago', action: 'Server health check', detail: 'System OK', color: 'text-blue-500' },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg md:col-span-2 lg:col-span-1">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
      <ul className="divide-y divide-gray-200">
        {activities.map((activity, index) => (
          <li key={index} className="py-3 flex items-start space-x-3">
            <span className={`text-lg ${activity.color}`}>{/* <Clock size={16} /> */} 🕒</span>
            <div>
              <p className="text-sm font-medium text-gray-700">{activity.action}</p>
              <p className="text-xs text-gray-500">{activity.detail} · {activity.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};


// --- The Main Dashboard Page Component ---

const Dashboard = () => {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard Overview</h1>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {/* <JobApplicationCard count={18} /> */}
        </div>


      </div>
    </MainLayout>
  );
};

export default Dashboard;