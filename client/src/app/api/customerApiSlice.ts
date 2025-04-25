import { apiSlice } from "./apiSlice";
import { CUSTOMER_URL } from "../features/constants";


const customerApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllCustomers: builder.query<any, void>({
            query: () => ({
                url: CUSTOMER_URL,
                method: "GET",
                credentials: "include"
            })
        }),
        getCustomerById: builder.query<any, any>({
            query: (id) => ({
                url: `${CUSTOMER_URL}/${id}`,
                method: "GET",
                credentials: "include"
            })
        }),
        createCustomer: builder.mutation<any, any>({
            query: (data) => ({
                url: `${CUSTOMER_URL}`,
                method: "POST",
                credentials: "include",
                body: data
            })
        }),
        updateCustomer: builder.mutation<any, any>({
            query: ({ id, customer }) => ({
                url: `${CUSTOMER_URL}/${id}`,
                method: "PATCH",
                credentials: "include",
                body: customer,
            })
        }),
        deleteCustomer: builder.mutation<any, any>({
            query: (id) => ({
                url: `${CUSTOMER_URL}/${id}`,
                method: "DELETE",
                credentials: "include"
            })
        }),
        buyProduct: builder.mutation<any, any>({
            query: ({ customerId, productId, installment }) => ({
                url: `${CUSTOMER_URL}/${customerId}`,
                method: "POST",
                credentials: "include",
                body: { productId, installment }
            })
        }),
        addInstallment: builder.mutation<any, any>({
            query: ({ customerId, productId, installment }) => ({
                url: `${CUSTOMER_URL}/${customerId}/installments`,
                method: "POST",
                credentials: "include",
                body: { productId, installment }
            })
        })
    })
})

export const { useAddInstallmentMutation, useBuyProductMutation, useCreateCustomerMutation, useDeleteCustomerMutation, useGetAllCustomersQuery, useGetCustomerByIdQuery, useUpdateCustomerMutation } = customerApiSlice