import React, { useMemo } from 'react'
import DashboardBox from '@/components/DashboardBox'
import { useGetKpisQuery, useGetProductsQuery } from '@/state/api'
import BoxHeader from '@/components/BoxHeader'
import { CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useTheme, Box, Typography } from '@mui/material';
import FlexBetween  from '@/components/FlexBetween';



const pieData = [
  
    {name: "Group A", value: 600},
    {name: "Group B", value: 400},
  
];

const Row2 = () => {
  const { data: productData } = useGetProductsQuery();
  const { palette } = useTheme();
  const { data: operationalData } = useGetKpisQuery();
  const pieColors = [palette.primary[800], palette.primary[300]];
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
  return (
    <>
     <DashboardBox gridArea="d">
     <BoxHeader
      title="Operational vs Non-Operational Expenses"
      sideText="+4%"
    />
    <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={ operationalExpenses }
          margin={{
            top: 20,
            right: 0,
            left: -10,
            bottom: 55,
          }}
        >
          <CartesianGrid vertical={false} stroke={palette.grey[800]} />
          <XAxis 
                 dataKey="name" 
                 tickLine={false}
                 style={{fontSize: "10px"}}/>
          <YAxis 
                yAxisId="left"
                orientation="left"
                tickLine={false}
                style={{fontSize: "10px"}}
                axisLine={false}
                />
          <YAxis 
                yAxisId="right"
                orientation="right"
                tickLine={false}
                style={{fontSize: "10px"}}
                axisLine={false}
                />
          <Tooltip />
          <Line 
                yAxisId="right"
                type="monotone"
                dataKey="Non Operational Expenses"
                stroke={palette.tertiary[500]}/>

          <Line 
                yAxisId="left"
                type="monotone"
                dataKey="Operational Expenses"
                stroke={palette.primary.main} />
        </LineChart>
      </ResponsiveContainer>
     </DashboardBox>

     <DashboardBox gridArea="e">
      <BoxHeader title="Campaigns and Targets"  sideText="+4" />
      <FlexBetween mt="0.25rem" gap="1.5rem" pr="1rem">
     <PieChart 
        width={110} 
        height={100}
        margin={{
          top: 0,
          right: -10,
          left: 10,
          bottom: 0,
        }}>
          <Pie
            stroke="none"
            data={pieData}
            innerRadius={18}
            outerRadius={38}
            fill="#8884d8"
            paddingAngle={2}
            dataKey="value"
          >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={pieColors[index]} />
          ))}
        </Pie>
      </PieChart>
      <Box ml="-0.7rem" flexBasis="40%" textAlign="center">
            <Typography variant="h5"> Target Sales</Typography>
            <Typography variant="h3" m="0.3rem" color={palette.primary[300]}>83</Typography>
            <Typography variant="h6">Finance Goals of the campaign that is desired</Typography>
      </Box>
      <Box flexBasis="40%">
            <Typography variant="h5"> Losses in Revenue</Typography>
            <Typography variant="h6"> Losses are down 25%</Typography>
            <Typography mt="0.4rem" variant="h5">Profit Margins</Typography>
            <Typography variant="h6">Profits are up by 30% from last month</Typography>
      </Box>
      </FlexBetween>
     </DashboardBox>
     <DashboardBox gridArea="f"></DashboardBox>
    </>
  )
}

export default Row2