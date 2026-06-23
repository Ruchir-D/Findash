import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import { useGetKpisQuery } from "@/state/api";
import { Box, Button, Typography, useTheme, alpha, Chip, CircularProgress } from "@mui/material";
import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import regression, { DataPoint } from "regression";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import ErrorDisplay from "@/components/ErrorDisplay";
import EmptyState from "@/components/EmptyState";

const Predictions = () => {
  const { palette } = useTheme();
  const [isPredictions, setIsPredictions] = useState(false);
  const { data: kpiData, isLoading, isError } = useGetKpisQuery();

  const formattedData = useMemo(() => {
    if (!kpiData) return [];
    const monthData = kpiData[0].monthlyData;

    const formatted: Array<DataPoint> = monthData.map(
      ({ revenue }, i: number) => {
        return [i, Number(revenue)];
      }
    );
    const regressionLine = regression.linear(formatted);

    return monthData.map(({ month, revenue }, i: number) => {
      return {
        name: month,
        "Actual Revenue": revenue,
        "Regression Line": regressionLine.points[i][1],
        "Predicted Revenue": regressionLine.predict(i + 12)[1],
      };
    });
  }, [kpiData]);

  // Handle loading state
  if (isLoading) {
    return (
      <DashboardBox width="100%" minHeight="600px" overflow="hidden">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100%"
          gap="1.5rem"
          p="4rem"
        >
          <CircularProgress
            size={60}
            sx={{
              color: palette.primary[500],
            }}
          />
          <Typography variant="h4" color={palette.grey[300]}>
            Loading prediction data...
          </Typography>
        </Box>
      </DashboardBox>
    );
  }

  // Handle error state
  if (isError) {
    return <ErrorDisplay message="Failed to load prediction data. Please try again later." />;
  }

  // Handle empty state
  if (!kpiData || kpiData.length === 0) {
    return (
      <EmptyState
        title="No Data for Predictions"
        message="Historical data is required to generate revenue predictions."
      />
    );
  }

  return (
    <DashboardBox width="100%" minHeight="700px" p="2rem" overflow="visible" mb="2rem">
      <FlexBetween m="0 0 2rem 0" gap="2rem" flexWrap="wrap">
        <Box>
          <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
            <Box
              sx={{
                background: `linear-gradient(135deg, ${palette.primary[500]} 0%, ${palette.secondary[500]} 100%)`,
                borderRadius: "12px",
                padding: "0.75rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 4px 12px ${alpha(palette.primary[500], 0.3)}`,
              }}
            >
              <AutoGraphIcon sx={{ fontSize: "28px", color: "#fff" }} />
            </Box>
            <Box>
              <Typography
                variant="h2"
                sx={{
                  fontSize: "28px",
                  fontWeight: 700,
                  color: palette.grey[100],
                }}
              >
                Revenue Predictions
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: palette.grey[400],
                  fontSize: "14px",
                  marginTop: "0.25rem",
                }}
              >
                AI-powered revenue forecasting using linear regression analysis
              </Typography>
            </Box>
          </Box>
          <Box display="flex" gap="1rem" mt="1rem">
            <Chip
              icon={<ShowChartIcon />}
              label="Historical Data"
              sx={{
                background: alpha(palette.primary[600], 0.2),
                color: palette.primary[300],
                border: `1px solid ${palette.primary[600]}`,
                fontWeight: 500,
              }}
            />
            {isPredictions && (
              <Chip
                icon={<AutoGraphIcon />}
                label="12-Month Forecast Active"
                sx={{
                  background: alpha(palette.secondary[600], 0.2),
                  color: palette.secondary[300],
                  border: `1px solid ${palette.secondary[600]}`,
                  fontWeight: 500,
                }}
              />
            )}
          </Box>
        </Box>
        <Button
          onClick={() => setIsPredictions(!isPredictions)}
          variant="contained"
          startIcon={<ShowChartIcon />}
          sx={{
            background: isPredictions
              ? `linear-gradient(135deg, ${palette.accent[600]} 0%, ${palette.accent[700]} 100%)`
              : `linear-gradient(135deg, ${palette.primary[600]} 0%, ${palette.secondary[600]} 100%)`,
            color: "#fff",
            padding: "0.75rem 2rem",
            borderRadius: "10px",
            fontWeight: 600,
            fontSize: "14px",
            textTransform: "none",
            boxShadow: `0 4px 12px ${alpha(
              isPredictions ? palette.accent[500] : palette.primary[500],
              0.4
            )}`,
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: `0 6px 16px ${alpha(
                isPredictions ? palette.accent[500] : palette.primary[500],
                0.5
              )}`,
            },
          }}
        >
          {isPredictions ? "Hide Predictions" : "Show Next Year Forecast"}
        </Button>
      </FlexBetween>
      <ResponsiveContainer width="100%" height={500}>
        <LineChart
          data={formattedData}
          margin={{
            top: 20,
            right: 75,
            left: 30,
            bottom: 80,
          }}
        >
          <defs>
            <linearGradient id="predictGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={palette.secondary[400]} stopOpacity={1} />
              <stop offset="100%" stopColor={palette.accent[400]} stopOpacity={1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={alpha(palette.grey[700], 0.2)} />
          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={false}
            style={{ fontSize: "12px", fill: palette.grey[400] }}
          >
            <Label
              value="Month"
              offset={-10}
              position="insideBottom"
              style={{ fill: palette.grey[300], fontSize: "14px", fontWeight: 600 }}
            />
          </XAxis>
          <YAxis
            domain={[12000, 26000]}
            axisLine={false}
            tickLine={false}
            style={{ fontSize: "12px", fill: palette.grey[400] }}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
          >
            <Label
              value="Revenue (USD)"
              angle={-90}
              offset={0}
              position="insideLeft"
              style={{ fill: palette.grey[300], fontSize: "14px", fontWeight: 600 }}
            />
          </YAxis>
          <Tooltip
            contentStyle={{
              backgroundColor: alpha(palette.background.light, 0.95),
              border: `1px solid ${palette.primary[700]}`,
              borderRadius: "8px",
              color: palette.grey[100],
              padding: "12px",
            }}
            formatter={(value: number) => [`$${value.toFixed(2)}`, ""]}
          />
          <Legend
            verticalAlign="top"
            height={40}
            iconType="circle"
            wrapperStyle={{
              paddingBottom: "20px",
              fontSize: "13px",
              fontWeight: 500,
            }}
          />
          <Line
            type="monotone"
            dataKey="Actual Revenue"
            stroke={palette.primary[400]}
            strokeWidth={3}
            dot={{ fill: palette.primary[500], strokeWidth: 2, r: 5 }}
            activeDot={{ r: 7, fill: palette.primary[300] }}
          />
          <Line
            type="monotone"
            dataKey="Regression Line"
            stroke={palette.tertiary[500]}
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
          />
          {isPredictions && (
            <Line
              type="monotone"
              strokeDasharray="8 4"
              dataKey="Predicted Revenue"
              stroke="url(#predictGradient)"
              strokeWidth={3}
              dot={{ fill: palette.secondary[500], strokeWidth: 2, r: 5 }}
              activeDot={{ r: 7, fill: palette.secondary[300] }}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </DashboardBox>
  );
};

export default Predictions;