import { useMemo } from "react";
import DashboardBox from "@/components/DashboardBox";
import { useGetKpisQuery, useGetProductsQuery } from "@/state/api";
import BoxHeader from "@/components/BoxHeader";
import {
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
import { useTheme, Box, Typography, alpha } from "@mui/material";
import FlexBetween from "@/components/FlexBetween";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CampaignIcon from "@mui/icons-material/Campaign";
import ScatterPlotIcon from "@mui/icons-material/ScatterPlot";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import ErrorDisplay from "@/components/ErrorDisplay";
import EmptyState from "@/components/EmptyState";



const pieData = [
  { name: "Target Achieved", value: 600 },
  { name: "Target Remaining", value: 400 },
];

const Row2 = () => {
  const { data: productData, isLoading: productsLoading, isError: productsError } = useGetProductsQuery();
  const { palette } = useTheme();
  const { data: operationalData, isLoading: kpisLoading, isError: kpisError } = useGetKpisQuery();
  const pieColors = [palette.primary[500], alpha(palette.primary[500], 0.3)];
  // console.log(data);
  const operationalExpenses = useMemo(()=> {
    return(
      operationalData &&
      operationalData[0].monthlyData.map(({ month, operationalExpenses, nonOperationalExpenses})=> {
        return {
          name: month.substring(0, 3),
          "Operational Expenses": operationalExpenses,
          "Non Operational Expenses": nonOperationalExpenses,
        }
      })
    )
  }, [operationalData]);
  
  const productExpenseData = useMemo(()=> {
    return(
      productData &&
      productData.map(({_id, price, expense}) => {
          return {
            id: _id,
            price: price,
            expense: expense,
          }
        })
    );
  }, [productData]);
  // Handle loading state
  if (kpisLoading || productsLoading) {
    return (
      <>
        <LoadingSkeleton gridArea="d" />
        <LoadingSkeleton gridArea="e" />
        <LoadingSkeleton gridArea="f" />
      </>
    );
  }

  // Handle error state
  if (kpisError || productsError) {
    return (
      <>
        {kpisError && <ErrorDisplay gridArea="d" message="Failed to load expense data" />}
        {!kpisError && <LoadingSkeleton gridArea="d" />}
        <ErrorDisplay gridArea="e" message="Failed to load campaign data" />
        {productsError && <ErrorDisplay gridArea="f" message="Failed to load product data" />}
        {!productsError && <LoadingSkeleton gridArea="f" />}
      </>
    );
  }

  // Handle empty state for operational data
  if (!operationalData || operationalData.length === 0 || !operationalExpenses) {
    return (
      <>
        <EmptyState gridArea="d" title="No Expense Data" />
        <EmptyState gridArea="e" title="No Campaign Data" />
        {productExpenseData && productExpenseData.length > 0 ? (
          <DashboardBox gridArea="f">
            <BoxHeader
              icon={<ScatterPlotIcon />}
              title="Product Prices vs Expenses"
              subtitle="Price-to-expense ratio analysis"
              sideText="+6%"
            />
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart
                margin={{
                  top: 20,
                  right: 25,
                  bottom: 40,
                  left: -10,
                }}
              >
                <defs>
                  <linearGradient id="scatterGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor={palette.primary[400]} />
                    <stop offset="100%" stopColor={palette.secondary[400]} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={alpha(palette.grey[700], 0.2)} />
                <XAxis
                  type="number"
                  dataKey="price"
                  name="price"
                  axisLine={false}
                  tickLine={false}
                  style={{ fontSize: "12px", fill: palette.grey[400] }}
                  tickFormatter={(v) => `$${v}`}
                />
                <YAxis
                  type="number"
                  dataKey="expense"
                  name="expense"
                  axisLine={false}
                  tickLine={false}
                  style={{ fontSize: "12px", fill: palette.grey[400] }}
                  tickFormatter={(v) => `$${v}`}
                />
                <ZAxis type="number" range={[40, 200]} />
                <Tooltip
                  formatter={(v) => `$${v}`}
                  contentStyle={{
                    backgroundColor: alpha(palette.background.light, 0.95),
                    border: `1px solid ${palette.primary[700]}`,
                    borderRadius: "8px",
                    color: palette.grey[100],
                  }}
                  cursor={{ strokeDasharray: "3 3" }}
                />
                <Scatter
                  name="Product Expense Ratio"
                  data={productExpenseData}
                  fill={palette.primary[500]}
                  shape="circle"
                />
              </ScatterChart>
            </ResponsiveContainer>
          </DashboardBox>
        ) : (
          <EmptyState gridArea="f" title="No Product Data" />
        )}
      </>
    );
  }

  return (
    <>
      <DashboardBox gridArea="d" sx={{ overflow: "hidden", height: "100%" }}>
        <BoxHeader
          icon={<AccountBalanceIcon />}
          title="Operational vs Non-Operational Expenses"
          subtitle="Monthly expense breakdown by category"
          sideText="-2%"
        />
        <ResponsiveContainer width="100%" height="85%">
          <LineChart
            data={operationalExpenses}
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
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="Operational Expenses"
              stroke={palette.primary[400]}
              strokeWidth={3}
              dot={{ fill: palette.primary[500], strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="Non Operational Expenses"
              stroke={palette.secondary[400]}
              strokeWidth={3}
              dot={{ fill: palette.secondary[500], strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>

      <DashboardBox gridArea="e" sx={{ height: "100%" }}>
        <BoxHeader icon={<CampaignIcon />} title="Campaigns and Targets" sideText="+15%" />
        <FlexBetween mt="0.5rem" gap="1rem" pb="0.5rem">
          <PieChart
            width={120}
            height={110}
            margin={{
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="pieGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={palette.primary[400]} />
                <stop offset="100%" stopColor={palette.primary[600]} />
              </linearGradient>
            </defs>
            <Pie
              stroke="none"
              data={pieData}
              innerRadius={24}
              outerRadius={45}
              paddingAngle={3}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index]} />
              ))}
            </Pie>
          </PieChart>
          <Box
            flexBasis="45%"
            textAlign="center"
            sx={{
              background: alpha(palette.primary[600], 0.1),
              borderRadius: "12px",
              padding: "1rem",
              border: `1px solid ${alpha(palette.primary[500], 0.2)}`,
            }}
          >
            <Typography variant="body2" color={palette.grey[400]} fontWeight={500}>
              Target Sales
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontSize: "32px",
                fontWeight: 700,
                margin: "0.5rem 0",
                background: `linear-gradient(135deg, ${palette.primary[400]} 0%, ${palette.secondary[400]} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              83
            </Typography>
            <Typography variant="body2" color={palette.grey[500]} fontSize="11px">
              Campaign target goal
            </Typography>
          </Box>
          <Box flexBasis="40%">
            <Box mb="1rem">
              <Typography variant="body2" color={palette.grey[300]} fontWeight={600} mb="0.25rem">
                Revenue Losses
              </Typography>
              <Typography variant="body2" color={palette.success[500]} fontSize="12px">
                ↓ Down 25% from last quarter
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color={palette.grey[300]} fontWeight={600} mb="0.25rem">
                Profit Margins
              </Typography>
              <Typography variant="body2" color={palette.success[500]} fontSize="12px">
                ↑ Up 30% from last month
              </Typography>
            </Box>
          </Box>
        </FlexBetween>
      </DashboardBox>

      <DashboardBox gridArea="f" sx={{ overflow: "hidden", height: "100%" }}>
        <BoxHeader
          icon={<ScatterPlotIcon />}
          title="Product Prices vs Expenses"
          subtitle="Price-to-expense ratio analysis"
          sideText="+6%"
        />
        <ResponsiveContainer width="100%" height="85%">
          <ScatterChart
            margin={{
              top: 10,
              right: 20,
              bottom: 35,
              left: -10,
            }}
          >
            <defs>
              <linearGradient id="scatterGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={palette.primary[400]} />
                <stop offset="100%" stopColor={palette.secondary[400]} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={alpha(palette.grey[700], 0.2)} />
            <XAxis
              type="number"
              dataKey="price"
              name="price"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "12px", fill: palette.grey[400] }}
              tickFormatter={(v) => `$${v}`}
            />
            <YAxis
              type="number"
              dataKey="expense"
              name="expense"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "12px", fill: palette.grey[400] }}
              tickFormatter={(v) => `$${v}`}
            />
            <ZAxis type="number" range={[40, 200]} />
            <Tooltip
              formatter={(v) => `$${v}`}
              contentStyle={{
                backgroundColor: alpha(palette.background.light, 0.95),
                border: `1px solid ${palette.primary[700]}`,
                borderRadius: "8px",
                color: palette.grey[100],
              }}
              cursor={{ strokeDasharray: "3 3" }}
            />
            <Scatter
              name="Product Expense Ratio"
              data={productExpenseData}
              fill={palette.primary[500]}
              shape="circle"
            />
          </ScatterChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row2;