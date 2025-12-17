import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './Card';
// Replace with a real icon import if using lucide-react, e.g.,
// import { Briefcase } from 'lucide-react'; 

export const JobApplicationCard = ({ count }) => {
  return (
    <Card className="shadow-lg border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        {/* Card Title/Label */}
        <CardTitle className="text-sm font-medium uppercase tracking-wider text-gray-500">
          Total Jobs Applied
        </CardTitle>
        
        {/* Icon */}
        <div className="p-2 rounded-md bg-blue-500 text-white">
          {/* Using an emoji placeholder, replace with <Briefcase className="h-4 w-4" /> */}
          <span className="text-lg">💼</span>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Main Value */}
        <div className="text-4xl font-extrabold text-gray-900">
          {count}
        </div>
        
        {/* Secondary Metric/Status */}
        <p className="text-xs text-gray-500 mt-1">
          <span className="text-green-500 font-semibold">+2</span> this week
        </p>
      </CardContent>
    </Card>
  );
};