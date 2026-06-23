import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  GetKpisResponse,
  GetProductsResponse,
  GetTransactionsResponse,
  GetTransactionsPaginatedResponse,
} from "./types";
import { dummyKpis, dummyProducts, dummyTransactions } from "@/data/dummyData";

/**
 * Check if demo mode is enabled
 */
const isDemoMode = () => {
  return localStorage.getItem("findash-demo-mode") === "true";
};

/**
 * RTK Query API configuration for financial dashboard
 * Provides hooks for fetching KPIs, products, and transactions
 */
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  reducerPath: "main",
  tagTypes: ["Kpis", "Products", "Transactions"],
  endpoints: (build) => ({
    /**
     * Fetch all KPI data including monthly and daily breakdowns
     */
    getKpis: build.query<Array<GetKpisResponse>, void>({
      queryFn: async (arg, queryApi, extraOptions, baseQuery) => {
        if (isDemoMode()) {
          // Return dummy data in demo mode
          return { data: dummyKpis };
        }
        // Fetch real data from API
        const result = await baseQuery("kpi/kpis/");
        return result.data ? { data: result.data as Array<GetKpisResponse> } : { error: result.error };
      },
      providesTags: ["Kpis"],
    }),
    /**
     * Fetch all product data with pricing and transaction references
     */
    getProducts: build.query<Array<GetProductsResponse>, void>({
      queryFn: async (arg, queryApi, extraOptions, baseQuery) => {
        if (isDemoMode()) {
          // Return dummy data in demo mode
          return { data: dummyProducts };
        }
        // Fetch real data from API
        const result = await baseQuery("product/products/");
        return result.data ? { data: result.data as Array<GetProductsResponse> } : { error: result.error };
      },
      providesTags: ["Products"],
    }),
    /**
     * Fetch transaction history with pagination support
     */
    getTransactions: build.query<Array<GetTransactionsResponse>, void>({
      queryFn: async (arg, queryApi, extraOptions, baseQuery) => {
        if (isDemoMode()) {
          // Return dummy data in demo mode
          return { data: dummyTransactions };
        }
        // Fetch real data from API
        const result = await baseQuery("transaction/transactions/");
        if (result.data) {
          const response = result.data as GetTransactionsPaginatedResponse | Array<GetTransactionsResponse>;
          // Handle both paginated and non-paginated responses
          if (Array.isArray(response)) {
            return { data: response };
          }
          return { data: response.data || [] };
        }
        return { error: result.error };
      },
      providesTags: ["Transactions"],
    }),
  }),
});

export const { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } = api;