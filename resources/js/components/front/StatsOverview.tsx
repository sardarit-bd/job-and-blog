import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Briefcase,
  Clock,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Users,
} from "lucide-react";

interface StatCardProps {
  title: string;
  value: number | string;
  description?: string;
  icon: React.ReactNode;
  trend?: string;
  className?: string;  // ← Add this for custom background
}

function StatCard({ title, value, description, icon, trend, className }: StatCardProps) {
  return (
    <Card className={className}>  {/* ← Apply the class here */}
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
        {trend && (
          <div className="flex items-center mt-2 text-xs">
            <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
            <span className="text-green-600 font-medium">{trend}</span>
            <span className="text-muted-foreground ml-1">vs last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function ApplicantStatsOverview() {
  const stats = {
    totalApplications: 24,
    pending: 12,
    interviews: 5,
    rejected: 7,
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Applications"
        value={stats.totalApplications}
        description="Jobs you've applied to"
        icon={<Briefcase className="h-4 w-4 text-muted-foreground" />}
        trend="+20%"
        className="bg-blue-50/80 border-blue-200"
      />

      <StatCard
        title="Pending Review"
        value={stats.pending}
        description="Awaiting response"
        icon={<Clock className="h-4 w-4 text-muted-foreground" />}
        trend="+5%"
        className="bg-amber-50/80 border-amber-200"  
      />

      <StatCard
        title="Interviews Scheduled"
        value={stats.interviews}
        description="Upcoming or completed"
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
        className="bg-emerald-50/80 border-emerald-200"  
      />

      <StatCard
        title="Offers / Accepted"
        value={stats.rejected} 
        description="Congratulations!"
        icon={<CheckCircle2 className="h-4 w-4 text-muted-foreground" />}
        className="bg-teal-50/80 border-teal-200"  
      />
    </div>
  );
}