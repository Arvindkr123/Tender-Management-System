import { BASE_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addTender: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/api/v1/admin/add-tender`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
  }),
});

export const { useAddTenderMutation } = adminApiSlice;
