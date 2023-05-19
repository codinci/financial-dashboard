import BoxHeader from '@/components/BoxHeader';
import DashboardBox from '@/components/DashboardBox';
import { useGetKpisQuery } from '@/store/api';
import { useTheme } from '@mui/material';
import { useMemo } from 'react';
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
	LineChart,
	Line,
	CartesianGrid,
	Legend,
	BarChart,
	Bar
} from 'recharts';

const RowOne = () => {
	const { palette } = useTheme();
	const { data } = useGetKpisQuery();

	const revenueExpenses = useMemo(() => {
		return (
			data &&
			data[0].monthlyData.map(({ month, revenue, expenses }) => {
				return {
					name: month.substring(0, 3),
					revenue: revenue,
					expenses: expenses
				}
			})
		)
	}, [data]);

	const revenueProfit = useMemo(() => {
		return (
			data &&
			data[0].monthlyData.map(({ month, revenue, expenses }) => {
				return {
					name: month.substring(0, 3),
					revenue: revenue,
					profit: (revenue - expenses).toFixed(2)
				}
			})
		)
	}, [data]);

	const revenue = useMemo(() => {
		return (
			data &&
			data[0].monthlyData.map(({ month, revenue }) => {
				return {
					name: month.substring(0, 3),
					revenue: revenue
				}
			})
		)
	}, [data]);


	return (
		<>
			{/*Grid Area A */}
			<DashboardBox bgcolor="#fff" gridArea="a">
				<BoxHeader
					title="Revenue and Expenses"
					subtitle="top line represents revenue, bottom line represents expenses"
					sideText="+4%"
				/>
				<ResponsiveContainer
					width="100%"
					aspect={window.innerWidth >= 1200 ? 1.35 : window.innerWidth >= 800 ? 2.2 : 1}
					height="100%">
					<AreaChart
						width={500}
						height={400}
						data={revenueExpenses}
						margin={{
							top: 5,
							right: 25,
							left: -10,
							bottom: 15,
						}}
					>
						<defs>
							<linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
								<stop
									offset="5%"
									stopColor={palette.primary[300]}
									stopOpacity={0.5}
								/>
								<stop
									offset="95%"
									stopColor={palette.primary[300]}
									stopOpacity={0}
								/>
							</linearGradient>
							<linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
								<stop
									offset="5%"
									stopColor={palette.primary[300]}
									stopOpacity={0.5}
								/>
								<stop
									offset="95%"
									stopColor={palette.primary[300]}
									stopOpacity={0}
								/>
							</linearGradient>
						</defs>
						<XAxis
							dataKey="name"
							tickLine={false}
							style={{ fontSize: "10px" }}
						/>
						<YAxis
							tickLine={false}
							axisLine={{ strokeWidth: "0" }}
							style={{ fontSize: "10px" }}
							domain={[8000, 23000]}
						/>

						<Tooltip />
						<Area
							type="monotone"
							dataKey="revenue"
							dot={true}
							stroke={palette.primary.main}
							fillOpacity={1}
							fill="url(#colorRevenue)"
						/>
						<Area
							type="monotone"
							dataKey="expenses"
							dot={true}
							stroke={palette.primary.main}
							fillOpacity={1}
							fill="url(#colorExpenses)"
						/>
					</AreaChart>
				</ResponsiveContainer>
			</DashboardBox>

			{/* Grid Area B */}
			<DashboardBox bgcolor="#fff" gridArea="b">
				<BoxHeader
					title="Profit and Revenue"
					subtitle="top line represents profit, bottom line represents revenue"
					sideText="+4%"
				/>
				<ResponsiveContainer
					width="100%"
					aspect={window.innerWidth >= 1200 ? 1.13 : window.innerWidth >= 800 ? 1.95 : 0.95}
					height="100%"
				>
					<LineChart
						data={revenueProfit}
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
						<Legend
							height={20}
							wrapperStyle={{
								margin: '0 0 10px 0'
							}}
						/>
						<Line
							yAxisId="left"
							type="monotone"
							dataKey="profit"
							dot={true}
							stroke={palette.tertiary[500]}
						/>
						<Line
							yAxisId="right"
							type="monotone"
							dataKey="revenue"
							stroke={palette.primary.main}
						/>
					</LineChart>
				</ResponsiveContainer>
			</DashboardBox>

			{/* Grid Area C */}
			<DashboardBox bgcolor="#fff" gridArea="c">
				<BoxHeader
					title="Revenue Month by Month"
					subtitle="graph representing the revenue month by month"
					sideText="+4%"
				/>
				<ResponsiveContainer
					width="100%"
					aspect={window.innerWidth >= 1200 ? 1.5 : window.innerWidth >= 800 ? 2.65 : 1.25}
					height="100%"
				>
					<BarChart
						width={500}
						height={300}
						data={revenue}
						margin={{
							top: 17,
							right: 15,
							left: -5,
							bottom: 58,
						}}
					>
						<defs>
							<linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
								<stop
									offset="5%"
									stopColor={palette.primary[300]}
									stopOpacity={0.8}
								/>
								<stop
									offset="95%"
									stopColor={palette.primary[300]}
									stopOpacity={0}
								/>
							</linearGradient>
						</defs>
						<CartesianGrid vertical={false} stroke={palette.grey[800]} />
						<XAxis
							dataKey="name"
							axisLine={false}
							tickLine={false}
							style={{ fontSize: '10px' }}
						/>
						<YAxis
							axisLine={false}
							tickLine={false}
							style={{ fontSize: '10px' }}
						/>
						<Tooltip />
						<Legend />
						<Bar dataKey="revenue" fill="url(#colorRevenue)" />
					</BarChart>
				</ResponsiveContainer>
			</DashboardBox>
		</>
  )
}

export default RowOne;