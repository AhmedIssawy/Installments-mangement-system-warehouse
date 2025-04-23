import { apiSlice } from "./apiSlice";
import { PRODUCT_URL } from "../features/constants.ts"

const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllProducts: builder.query<any, void>({
            query: () => ({
                url: PRODUCT_URL,
                method: "GET",
                credentials: "include",
            }),
        }),
        createProduct: builder.mutation<any, any>({
            query: (data) => ({
                url: PRODUCT_URL,
                method: "POST",
                credentials: "include",
                body: data
            })
        }),
        updateProduct: builder.mutation<any, any>({
            query: ({ id, name, price, stock, category }) => ({
                url: `${PRODUCT_URL}/${id}`,
                method: "PATCH",
                credentials: "include",
                body: { name, price, stock, category }
            })
        }),
        getProductById: builder.query<any, any>({
            query: (id) => ({
                url: `${PRODUCT_URL}/${id}`,
                credentials: "include"
            })
        }),

        deleteProduct: builder.mutation<any, any>({
            query: (id) => ({
                url: `${PRODUCT_URL}/${id}`,
                credentials: "include",
                method: "DELETE",
            })
        }),
        getProductByCategoryId: builder.query<any, string>({
            query: (categoryId) => ({
                url: `${PRODUCT_URL}/category/${categoryId}`,
                method: "GET",
                credentials: "include",
            })
        }),
    })
})


export const { useCreateProductMutation, useDeleteProductMutation, useGetAllProductsQuery, useGetProductByCategoryIdQuery, useGetProductByIdQuery, useUpdateProductMutation } = productApiSlice