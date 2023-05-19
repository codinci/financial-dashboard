import BoxHeader from '@/components/BoxHeader';
import DashboardBox from '@/components/DashboardBox';
import FlexBetween from '@/components/FlexBetween';
import { useGetKpisQuery, useGetProductsQuery } from '@/store/api';
import { Box, Typography, useTheme } from '@mui/material';
import { useMemo } from 'react';
import {
	ResponsiveContainer,
	LineChart,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	Line,
	Cell,
	Pie,
	PieChart,
	Scatter,
	ScatterChart,
	ZAxis
} from 'recharts';

const pieData = [
	{ name: "Group A", value: 600 },
	{ name: "Group B", value: 400 }
]

const RowTwo = () => {
	const { data: operationalData } = useGetKpisQuery();
	const { data: productData } = useGetProductsQuery();
	const { palette } = useTheme();
	const pieColors = [palette.primary[800], palette.primary[300]]

	const operationalExpenses = useMemo(() => {
		return (
			operationalData &&
			operationalData[0].monthlyData.map(({ month, operationalExpenses, nonOperationalExpenses }) => {
				return {
					name: month.substring(0, 3),
					'Operational Expenses': operationalExpenses,
					'Non-Operational Expenses': nonOperationalExpenses
				}
			})
		)
	}, [operationalData]);

	const productExpenseData = useMemo(() => {
		return (
			productData &&
			productData.map(({ _id, price, expense }) => {
				return {
					id: _id,
					price: price,
					expense: expense
				}
			})
		)
	}, [productData]);

  return (
	  <>
		{/* Grid Area D */}
		<DashboardBox bgcolor="#fff" gridArea="d">
			<BoxHeader
				title="Operational vs Non-Operational Expenses"
				sideText="+4%"
			/>
			<ResponsiveContainer
				width="100%"
				aspect={window.innerWidth >= 1200 ? 1.45 : window.innerWidth >= 800 ? 2.45 : 1.15}
				height="100%"
			>
				<LineChart
					data={operationalExpenses}
					margin={{
						top: 20,
						right: 0,
						left: -10,
						bottom: 55,
					}}
				>
					<CartesianGrid vertical={false} stroke={palette.grey[800]}/>
					<XAxis
						dataKey="name"
						tickLine={false}
						style={{ fontSize: "10px" }} />
					<YAxis
						yAxisId="left"
						tickLine={false}
						axisLine={false}
						style={{ fontSize: "10px" }}/>
					<YAxis
						yAxisId="right"
						orientation="right"
						tickLine={false}
						axisLine={false}
						style={{ fontSize: "10px" }}/>
					<Tooltip />
					<Line
						yAxisId="left"
						type="monotone"
						dataKey="Non-Operational Expenses"
						dot={true}
						stroke={palette.tertiary[500]}
					/>
					<Line
						yAxisId="right"
						type="monotone"
						dataKey="Operational Expenses"
						stroke={palette.primary.main}
					/>
				</LineChart>
			</ResponsiveContainer>

		</DashboardBox>

		{/* Grid Area E */}
		<DashboardBox bgcolor="#fff" gridArea="e">
			<BoxHeader
				title='Campaign and Targets'
				sideText='+4%'
			/>
			<FlexBetween mt='0.25rem' gap='1.5rem' pr='1rem'>
				<PieChart
					width={110}
					height={100}
					margin={{
						top: 0,
						right: -10,
						left: 10,
						bottom: 0,
					}}
				>
					<Pie
						stroke='none'
						data={pieData}
						innerRadius={18}
						outerRadius={38}
						paddingAngle={2}
						dataKey="value"
					>
						{pieData.map((entry, index) => (
							<Cell
								key={`cell-${index}`}
								fill={pieColors[index]}
							/>
						))}
					</Pie>
				</PieChart>
				<Box ml='-0.7rem' flexBasis='40%' textAlign='center'>
					<Typography variant='h5'>Target Sales</Typography>
					<Typography m='0.3rem 0' variant='h3' color={palette.primary[300]}>
						84
					</Typography>
					<Typography variant='h6'>
						Finance goals of the campaign that is desired
					</Typography>
				  </Box>
				  <Box flexBasis='40%'>
					<Typography variant='h5'>Losses in revenue</Typography>
					<Typography variant='h6'>
						Losses are down by 25%
					</Typography>
					<Typography mt='0.4rem' variant='h5'>
						Profit Margins
					</Typography>
					<Typography variant='h6'>
						Margins are up by 30% from last month.
					</Typography>
				</Box>
			</FlexBetween>
		</DashboardBox>

		{/* Grid Area F */}
		<DashboardBox bgcolor="#fff" gridArea="f">
			<BoxHeader
				title="Product Prices vs Expenses"
				sideText="+4%"
			/>
			<ResponsiveContainer
				width="100%"
				aspect={window.innerWidth >= 1200 ? 1.65 : window.innerWidth >= 800 ? 3 : 1.45}
				height="100%"
			>
				<ScatterChart
					margin={{
						top: 20,
						right: 15,
						bottom: 20,
						left: 0,
					}}
				>
					<CartesianGrid stroke={palette.grey[800]} />
					<XAxis
						type="number"
						dataKey="price"
						name="price"
						axisLine={false}
						tickLine={false}
						style={{fontSize: '10px'}}
						tickFormatter={(v) => `Ksh.${v}`}
					/>
					<YAxis
						type="number"
						dataKey="expense"
						name="expense"
						axisLine={false}
						tickLine={false}
						style={{fontSize: '10px'}}
						tickFormatter={(v) => `Ksh.${v}`}
					/>
					<ZAxis type="number" range={[20]} />
					<Tooltip formatter={(v) => `Ksh.${v}`} />
					<Scatter
						name="Product Expense Ratio"
						data={productExpenseData}
						fill={palette.tertiary[500]}
					/>
				</ScatterChart>
			</ResponsiveContainer>
		</DashboardBox>
	  </>
  )
}

export default RowTwo;