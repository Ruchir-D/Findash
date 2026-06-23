import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import {
  useGetKpisQuery,
  useGetProductsQuery,
  useGetTransactionsQuery,
} from "@/state/api";
import { Box, Typography, useTheme, alpha } from "@mui/material";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import { useMemo } from "react";
import { Cell, Pie, PieChart } from "recharts";
import InventoryIcon from "@mui/icons-material/Inventory";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PieChartIcon from "@mui/icons-material/PieChart";
import SummarizeIcon from "@mui/icons-material/Summarize";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import ErrorDisplay from "@/components/ErrorDisplay";
import EmptyState from "@/components/EmptyState";

const Row3 = () => {
  const { palette } = useTheme();
  const pieColors = [palette.primary[500], alpha(palette.primary[500], 0.2)];

  const { data: kpiData, isLoading: kpisLoading, isError: kpisError } = useGetKpisQuery();
  const { data: productData, isLoading: productsLoading, isError: productsError } = useGetProductsQuery();
  const { data: transactionData, isLoading: transactionsLoading, isError: transactionsError } = useGetTransactionsQuery();

  const pieChartData = useMemo(() => {
    if (kpiData) {
      const totalExpenses = kpiData[0].totalExpenses;
      return Object.entries(kpiData[0].expensesByCategory).map(
        ([key, value]) => {
          return [
            {
              name: key,
              value: value,
            },
            {
              name: `${key} of Total`,
              value: totalExpenses - value,
            },
          ];
        }
      );
    }
  }, [kpiData]);

  const productColumns = [
    {
      field: "_id",
      headerName: "id",
      flex: 1,
    },
    {
      field: "expense",
      headerName: "Expense",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
  ];

  const transactionColumns = [
    {
      field: "_id",
      headerName: "id",
      flex: 1,
    },
    {
      field: "buyer",
      headerName: "Buyer",
      flex: 0.67,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.35,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "productIds",
      headerName: "Count",
      flex: 0.1,
      renderCell: (params: GridCellParams) =>
        (params.value as Array<string>).length,
    },
  ];

  // Handle loading state
  if (productsLoading || transactionsLoading || kpisLoading) {
    return (
      <>
        <LoadingSkeleton gridArea="g" />
        <LoadingSkeleton gridArea="h" />
        <LoadingSkeleton gridArea="i" />
        <LoadingSkeleton gridArea="j" />
      </>
    );
  }

  // Handle error state
  if (productsError || transactionsError || kpisError) {
    return (
      <>
        {productsError && <ErrorDisplay gridArea="g" message="Failed to load products" />}
        {!productsError && <LoadingSkeleton gridArea="g" />}
        {transactionsError && <ErrorDisplay gridArea="h" message="Failed to load transactions" />}
        {!transactionsError && <LoadingSkeleton gridArea="h" />}
        {kpisError && <ErrorDisplay gridArea="i" message="Failed to load expenses" />}
        {!kpisError && <LoadingSkeleton gridArea="i" />}
        <LoadingSkeleton gridArea="j" />
      </>
    );
  }

  return (
    <>
      <DashboardBox gridArea="g" sx={{ height: "100%", overflow: "hidden" }}>
        <BoxHeader
          icon={<InventoryIcon />}
          title="Product Inventory"
          subtitle="Complete product catalog"
          sideText={`${productData?.length} items`}
        />
        <Box
          mt="0.5rem"
          height="calc(100% - 80px)"
          sx={{
            overflow: "auto",
            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-track": {
              background: alpha(palette.grey[900], 0.3),
            },
            "&::-webkit-scrollbar-thumb": {
              background: alpha(palette.primary[500], 0.5),
              borderRadius: "3px",
              "&:hover": {
                background: alpha(palette.primary[500], 0.7),
              },
            },
            "& .MuiDataGrid-root": {
              color: palette.grey[200],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${alpha(palette.grey[700], 0.3)} !important`,
              padding: "0.5rem 0.75rem",
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `2px solid ${alpha(palette.primary[500], 0.3)} !important`,
              backgroundColor: alpha(palette.primary[900], 0.2),
              color: palette.grey[300],
              fontWeight: 600,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
            "& .MuiDataGrid-row": {
              "&:hover": {
                backgroundColor: alpha(palette.primary[900], 0.1),
              },
            },
          }}
        >
          {productData && productData.length > 0 ? (
            <DataGrid
              columnHeaderHeight={36}
              rowHeight={40}
              hideFooter={true}
              rows={productData}
              columns={productColumns}
              sx={{
                border: "none",
              }}
            />
          ) : (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="100%"
            >
              <Typography variant="body2" color={palette.grey[500]}>
                No products available
              </Typography>
            </Box>
          )}
        </Box>
      </DashboardBox>
      <DashboardBox gridArea="h" sx={{ height: "100%", overflow: "hidden" }}>
        <BoxHeader
          icon={<ReceiptIcon />}
          title="Recent Transactions"
          subtitle="Latest customer orders"
          sideText={`${transactionData?.length} orders`}
        />
        <Box
          mt="0.5rem"
          height="calc(100% - 80px)"
          sx={{
            overflow: "auto",
            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-track": {
              background: alpha(palette.grey[900], 0.3),
            },
            "&::-webkit-scrollbar-thumb": {
              background: alpha(palette.primary[500], 0.5),
              borderRadius: "3px",
              "&:hover": {
                background: alpha(palette.primary[500], 0.7),
              },
            },
            "& .MuiDataGrid-root": {
              color: palette.grey[200],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${alpha(palette.grey[700], 0.3)} !important`,
              padding: "0.5rem 0.75rem",
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `2px solid ${alpha(palette.primary[500], 0.3)} !important`,
              backgroundColor: alpha(palette.primary[900], 0.2),
              color: palette.grey[300],
              fontWeight: 600,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
            "& .MuiDataGrid-row": {
              "&:hover": {
                backgroundColor: alpha(palette.primary[900], 0.1),
              },
            },
          }}
        >
          {transactionData && transactionData.length > 0 ? (
            <DataGrid
              columnHeaderHeight={36}
              rowHeight={40}
              hideFooter={true}
              rows={transactionData}
              columns={transactionColumns}
              sx={{
                border: "none",
              }}
            />
          ) : (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="100%"
            >
              <Typography variant="body2" color={palette.grey[500]}>
                No transactions available
              </Typography>
            </Box>
          )}
        </Box>
      </DashboardBox>
      <DashboardBox gridArea="i" sx={{ height: "100%" }}>
        <BoxHeader
          icon={<PieChartIcon />}
          title="Expense Breakdown"
          subtitle="By category distribution"
          sideText="+4%"
        />
        <FlexBetween mt="0.5rem" gap="1rem" textAlign="center">
          {pieChartData?.map((data, i) => (
            <Box
              key={`${data[0].name}-${i}`}
              sx={{
                flex: 1,
                background: alpha(palette.primary[900], 0.2),
                borderRadius: "12px",
                padding: "1rem 0.5rem",
                border: `1px solid ${alpha(palette.primary[500], 0.2)}`,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  border: `1px solid ${alpha(palette.primary[500], 0.4)}`,
                },
              }}
            >
              <PieChart width={100} height={100}>
                <Pie
                  stroke="none"
                  data={data}
                  innerRadius={22}
                  outerRadius={40}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index]} />
                  ))}
                </Pie>
              </PieChart>
              <Typography
                variant="body2"
                sx={{
                  color: palette.grey[300],
                  fontWeight: 600,
                  fontSize: "13px",
                  marginTop: "0.5rem",
                  textTransform: "capitalize",
                }}
              >
                {data[0].name}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: palette.primary[400],
                  fontWeight: 700,
                  fontSize: "16px",
                  marginTop: "0.25rem",
                }}
              >
                ${(data[0].value / 1000).toFixed(1)}k
              </Typography>
            </Box>
          ))}
        </FlexBetween>
      </DashboardBox>
      <DashboardBox gridArea="j" sx={{ height: "100%" }}>
        <BoxHeader
          icon={<SummarizeIcon />}
          title="Performance Summary"
          subtitle="Quarter-over-quarter analysis"
          sideText="+15%"
        />
        <Box p="1.5rem">
          <Typography variant="body1" color={palette.grey[300]} mb="1rem" lineHeight={1.6}>
            Strong revenue growth driven by increased operational efficiency and strategic cost
            optimization. The current quarter shows a{" "}
            <Box
              component="span"
              sx={{
                color: palette.success[500],
                fontWeight: 700,
              }}
            >
              15% improvement
            </Box>{" "}
            in overall profitability compared to the previous period.
          </Typography>
          <Box
            sx={{
              background: alpha(palette.primary[900], 0.3),
              borderRadius: "12px",
              padding: "1rem",
              border: `1px solid ${alpha(palette.primary[500], 0.2)}`,
            }}
          >
            <Typography
              variant="body2"
              color={palette.grey[400]}
              mb="0.75rem"
              fontWeight={600}
            >
              Goal Progress
            </Typography>
            <Box
              height="20px"
              bgcolor={alpha(palette.grey[800], 0.5)}
              borderRadius="10px"
              overflow="hidden"
              position="relative"
            >
              <Box
                height="100%"
                sx={{
                  background: `linear-gradient(90deg, ${palette.primary[500]} 0%, ${palette.secondary[500]} 100%)`,
                  borderRadius: "10px",
                  width: "68%",
                  boxShadow: `0 0 12px ${alpha(palette.primary[500], 0.5)}`,
                  transition: "width 1s ease-in-out",
                }}
              />
            </Box>
            <FlexBetween mt="0.5rem">
              <Typography variant="body2" color={palette.grey[400]} fontSize="12px">
                Annual Target
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: palette.primary[400],
                  fontWeight: 700,
                  fontSize: "13px",
                }}
              >
                68% Complete
              </Typography>
            </FlexBetween>
          </Box>
        </Box>
      </DashboardBox>
    </>
  );
};

export default Row3;