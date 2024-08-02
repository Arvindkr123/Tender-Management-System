import { BASE_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const adminApiPrefix = `${BASE_URL}/api/v1/admin`;

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addTender: builder.mutation({
      query: (data) => ({
        url: `${adminApiPrefix}/add-tender`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    getAllTenders: builder.query({
      query: () => `${adminApiPrefix}/get-all-tenders`,
    }),
  }),
});

export const { useAddTenderMutation, useGetAllTendersQuery } = adminApiSlice;
