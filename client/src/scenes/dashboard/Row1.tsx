import { useMemo } from "react";
import DashboardBox from "@/components/DashboardBox";
import { useGetKpisQuery } from "@/state/api";
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Line,
  Tooltip,
  Area,
  Legend,
  LineChart,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import { useTheme, alpha } from "@mui/material";
import BoxHeader from "@/components/BoxHeader";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import BarChartIcon from "@mui/icons-material/BarChart";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import ErrorDisplay from "@/components/ErrorDisplay";
import EmptyState from "@/components/EmptyState";
 


type Props = {}

const Row1 = (props: Props) => {
  const { palette } = useTheme();
  const { data, isLoading, isError } = useGetKpisQuery();
  const revenueExpenses = useMemo(()=> {
    return(
      data &&
      data[0].monthlyData.map(({ month, revenue, expenses})=> {
        return {
          name: month.substring(0, 3),
          revenue: revenue,
          expenses: expenses,
        }
      })
    )
  }, [data]);

  const revenueProfit = useMemo(()=> {
    return(
      data &&
      data[0].monthlyData.map(({ month, revenue, expenses})=> {
        return {
          name: month.substring(0, 3),
          revenue: revenue,
          profit: (Number(revenue) - Number(expenses)).toFixed(2),
        };
      })
    )
  }, [data]);

  const revenue = useMemo(()=> {
    return(
      data &&
      data[0].monthlyData.map(({ month, revenue})=> {
        return {
          name: month.substring(0, 3),
          revenue: revenue,
        };
      })
    )
  }, [data]);

  // Handle loading state
  if (isLoading) {
    return (
      <>
        <LoadingSkeleton gridArea="a" />
        <LoadingSkeleton gridArea="b" />
        <LoadingSkeleton gridArea="c" />
      </>
    );
  }

  // Handle error state
  if (isError) {
    return (
      <>
        <ErrorDisplay gridArea="a" message="Failed to load revenue data" />
        <ErrorDisplay gridArea="b" message="Failed to load profit data" />
        <ErrorDisplay gridArea="c" message="Failed to load monthly data" />
      </>
    );
  }

  // Handle empty state
  if (!data || data.length === 0) {
    return (
      <>
        <EmptyState gridArea="a" title="No Revenue Data" message="Revenue and expense data is not available" />
        <EmptyState gridArea="b" title="No Profit Data" message="Profit data is not available" />
        <EmptyState gridArea="c" title="No Monthly Data" message="Monthly revenue data is not available" />
      </>
    );
  }

  return (
    <>
      <DashboardBox gridArea="a" sx={{ overflow: "hidden", height: "100%" }}>
        <BoxHeader
          icon={<TrendingUpIcon />}
          title="Revenue and Expenses"
          subtitle="Monthly revenue vs expenses comparison"
          sideText="+4%"
        />
        <ResponsiveContainer width="100%" height="85%">
          <AreaChart
            data={revenueExpenses}
            margin={{
              top: 5,
              right: 20,
              left: -10,
              bottom: 40,
            }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={palette.primary[500]} stopOpacity={0.8} />
                <stop offset="95%" stopColor={palette.primary[700]} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={palette.secondary[500]} stopOpacity={0.6} />
                <stop offset="95%" stopColor={palette.secondary[700]} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={alpha(palette.grey[700], 0.2)} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "12px", fill: palette.grey[400] }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "12px", fill: palette.grey[400] }}
              domain={[8000, 23000]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: alpha(palette.background.light, 0.95),
                border: `1px solid ${palette.primary[700]}`,
                borderRadius: "8px",
                color: palette.grey[100],
              }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke={palette.primary[400]}
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stroke={palette.secondary[400]}
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorExpenses)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </DashboardBox>
      
      <DashboardBox gridArea="b" sx={{ overflow: "hidden", height: "100%" }}>
        <BoxHeader
          icon={<MonetizationOnIcon />}
          title="Profit and Revenue"
          subtitle="Dual-axis comparison of profit margin vs revenue"
          sideText="+8%"
        />
        <ResponsiveContainer width="100%" height="85%">
          <LineChart
            data={revenueProfit}
            margin={{
              top: 5,
              right: 20,
              left: -10,
              bottom: 40,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={alpha(palette.grey[700], 0.2)} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "12px", fill: palette.grey[400] }}
            />
            <YAxis
              yAxisId="left"
              orientation="left"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "12px", fill: palette.grey[400] }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "12px", fill: palette.grey[400] }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: alpha(palette.background.light, 0.95),
                border: `1px solid ${palette.primary[700]}`,
                borderRadius: "8px",
                color: palette.grey[100],
              }}
            />
            <Legend
              height={20}
              wrapperStyle={{
                margin: "0 0 10px 0",
                fontSize: "12px",
              }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="revenue"
              stroke={palette.primary[400]}
              strokeWidth={3}
              dot={{ fill: palette.primary[500], strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="profit"
              stroke={palette.secondary[400]}
              strokeWidth={3}
              dot={{ fill: palette.secondary[500], strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>

      <DashboardBox gridArea="c" sx={{ overflow: "hidden", height: "100%" }}>
        <BoxHeader
          icon={<BarChartIcon />}
          title="Revenue Month by Month"
          subtitle="Monthly revenue trends and patterns"
          sideText="+12%"
        />
        <ResponsiveContainer width="100%" height="85%">
          <BarChart
            data={revenue}
            margin={{
              top: 5,
              right: 15,
              left: -5,
              bottom: 40,
            }}
          >
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={palette.primary[400]} stopOpacity={1} />
                <stop offset="100%" stopColor={palette.secondary[500]} stopOpacity={0.8} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={alpha(palette.grey[700], 0.2)} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "12px", fill: palette.grey[400] }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "12px", fill: palette.grey[400] }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: alpha(palette.background.light, 0.95),
                border: `1px solid ${palette.primary[700]}`,
                borderRadius: "8px",
                color: palette.grey[100],
              }}
              cursor={{ fill: alpha(palette.primary[600], 0.1) }}
            />
            <Bar
              dataKey="revenue"
              fill="url(#barGradient)"
              radius={[8, 8, 0, 0]}
              maxBarSize={50}
            />
          </BarChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row1