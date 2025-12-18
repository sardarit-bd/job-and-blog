import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Clock, CheckCircle, XCircle } from "lucide-react";
import { ApplicantStatsOverview } from "@/components/front/StatsOverview";


const Dashboard = ({ auth }) => { 
  return (
    <MainLayout auth={auth}>
      <h1 className="text-2xl font-semibold font-['Poppins'] py-2">Dashboard</h1>
      {/* <BarChartCard /> */}
      <ApplicantStatsOverview />
    </MainLayout>
  );
};

export default Dashboard;