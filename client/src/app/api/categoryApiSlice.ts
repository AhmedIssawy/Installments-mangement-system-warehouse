import { apiSlice } from "./apiSlice";
import { CATEGORY_URL } from "../features/constants";


export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllCategories: builder.query<any, void>({
            query: () => ({
                url: CATEGORY_URL,
                method: "GET",
                credentials: "include",
            }),
        }),
        createCategory: builder.mutation<any, any>({
            query: ({ name }) => ({
                url: CATEGORY_URL,
                method: "POST",
                credentials: "include",
                body: { name }
            })
        }),
        updateCategory: builder.mutation<any, any>({
            query: ({ id, name }) => ({
                url: `${CATEGORY_URL}/${id}`,
                method: "PATCH",
                credentials: "include",
                body: { name }
            })
        }),
        getCategoryById: builder.query<any, string>({
            query: (id) => ({
                url: `${CATEGORY_URL}/${id}`,
                credentials: "include"
            })
        }),
        deleteCategory: builder.mutation<any, string>({
            query: (id) => ({
                url: `${CATEGORY_URL}/${id}`,
                credentials: "include",
                method: "DELETE",
            })
        })
    })
})

export const {
    useGetAllCategoriesQuery,
    useCreateCategoryMutation,
    useDeleteCategoryMutation,
    useGetCategoryByIdQuery,
    useUpdateCategoryMutation } = categoryApiSlice