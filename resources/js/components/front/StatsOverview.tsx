import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Briefcase,
  Clock,
  CheckCircle2,
  TrendingUp,
  Users,
} from "lucide-react";

interface StatsData {
  totalApplications: number;
  pending: number;
  interviews: number;
  accepted: number;
  trend?: string; 
}

interface StatCardProps {
  title: string;
  value: number | string;
  description?: string;
  icon: React.ReactNode;
  trend?: string;
  className?: string;
}

function StatCard({ title, value, description, icon, trend, className }: StatCardProps) {
  return (
    <Card className={className}>
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

// 2. Accept 'stats' as a prop
export function ApplicantStatsOverview({ stats }: { stats: StatsData }) {
  // Fallback to zeros if stats aren't loaded yet
  const data = stats || {
    totalApplications: 0,
    pending: 0,
    interviews: 0,
    accepted: 0,
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Applications"
        value={data.totalApplications}
        description="Jobs you've applied to"
        icon={<Briefcase className="h-4 w-4 text-muted-foreground" />}
        className="bg-blue-50/80 border-blue-200"
      />

      <StatCard
        title="Pending Review"
        value={data.pending}
        description="Awaiting response"
        icon={<Clock className="h-4 w-4 text-muted-foreground" />}
        className="bg-amber-50/80 border-amber-200"  
      />

      <StatCard
        title="Interviews Scheduled"
        value={data.interviews}
        description="Upcoming or shortlisted"
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
        className="bg-[#738678]/50 border-[#738678]"  
      />

      <StatCard
        title="Offers / Accepted"
        value={data.accepted} 
        description="Congratulations!"
        icon={<CheckCircle2 className="h-4 w-4 text-muted-foreground" />}
        className="bg-teal-50/80 border-teal-200"  
      />
    </div>
  );
}