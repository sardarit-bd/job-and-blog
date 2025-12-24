import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

interface ChartData {
  month: string;
  applications: number;
  accepted: number;
}

interface BarChartCardProps {
  data: ChartData[];
  title?: string;
  description?: string;
}

const chartConfig = {
  applications: {
    label: "Applications",
    color: "hsl(271, 91%, 65%)",
  },
  accepted: {
    label: "Accepted",
    color: "hsl(152, 68%, 45%)",
  },
} satisfies ChartConfig;

const BarChartCard: React.FC<BarChartCardProps> = ({
  data,
  title = "Trends Over Time",
  description = "Monthly overview",
}) => {
  return (
    <Card className="mt-5 border-gray-200">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              barCategoryGap="20%"
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" />
              <YAxis 
                allowDecimals={false}
                tickFormatter={(value) => Math.round(value).toString()}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey="applications"
                stackId="1"
                stroke="#1663deff"
                fill="#60a6f6ff"
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="accepted"
                stackId="1"
                stroke="#10b981"
                fill="#34d399"
                radius={[4, 4, 0, 0]}
              />
            </RechartsBarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default BarChartCard;