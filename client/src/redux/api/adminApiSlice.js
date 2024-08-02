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

    submitQuotation: builder.mutation({
      query: ({ tenderId, quotation }) => ({
        url: `${adminApiPrefix}/update-tender/${tenderId}`,
        method: "PUT",
        body: { quotation }, // Wrap the quotation value in an object
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useAddTenderMutation,
  useGetAllTendersQuery,
  useSubmitQuotationMutation,
} = adminApiSlice;
