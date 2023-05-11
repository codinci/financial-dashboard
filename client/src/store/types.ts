export interface ExpensesByCategory {
	salaries: number;
	supplies: number;
	services: number;
}

export interface Month {
	id: string;
	month: string;
	revenue: number;
	expenses: number;
	nonOperationalExpenses: number;
	operationalExpenses: number;
}

export interface Day {
	id: string;
	date: string;
	revenue: number;
	expenses: number;
}

export interface GetKPisResponse {
	id: string;
	_id: string;
	__version: number;
	totalProfit: number;
	totalRevenue: number;
	totalExpenses: number;
	expensesByCategory: ExpensesByCategory;
	monthlyData: Array<Month>;
	daily: Array<Day>;
}