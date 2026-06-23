/**
 * Breakdown of expenses by category
 */
export interface ExpensesByCategory {
  salaries: number;
  supplies: number;
  services: number;
}

/**
 * Monthly financial data
 */
export interface Month {
  id: string;
  month: string;
  revenue: string;
  expenses: string;
  nonOperationalExpenses: number;
  operationalExpenses: number;
}

/**
 * Daily financial data
 */
export interface Day {
  id: string;
  date: string;
  revenue: number;
  expenses: number;
}

/**
 * KPI (Key Performance Indicator) response from API
 */
export interface GetKpisResponse {
  id: string;
  _id: string;
  __v: number;
  totalProfit: number;
  totalRevenue: number;
  totalExpenses: number;
  expensesByCategory: ExpensesByCategory;
  monthlyData: Array<Month>;
  dailyData: Array<Day>;
}

/**
 * Product information response from API
 */
export interface GetProductsResponse {
  id: string;
  _id: string;
  __v: number;
  price: number;
  expense: number;
  transactions: Array<string>;
  createdAt: string;
  updatedAt: string;
}

/**
 * Transaction details response from API
 */
export interface GetTransactionsResponse {
  id: string;
  _id: string;
  __v: number;
  buyer: string;
  amount: number;
  productIds: Array<string>;
  createdAt: string;
  updatedAt: string;
}

/**
 * Paginated transaction response from API
 */
export interface GetTransactionsPaginatedResponse {
  data: Array<GetTransactionsResponse>;
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}