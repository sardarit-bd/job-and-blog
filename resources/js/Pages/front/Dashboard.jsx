import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import { ApplicantStatsOverview } from "@/components/front/StatsOverview";
import BarChartCard from "@/components/front/BarChartCard";

const Dashboard = ({ auth, stats, chartData }) => { 
  return (
    <MainLayout auth={auth}>
      <h1 className="text-2xl font-semibold font-['Poppins'] py-2">
        Dashboard
      </h1>

      <ApplicantStatsOverview stats={stats} />

      <BarChartCard 
        data={chartData || []}
        title="Application Trends"
        description="Your applications and acceptances over the last 12 months"
      />
    </MainLayout>
  );
};

export default Dashboard;