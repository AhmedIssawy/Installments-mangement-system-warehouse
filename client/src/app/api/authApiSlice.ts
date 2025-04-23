import { apiSlice } from "./apiSlice";
import { AUTH_URL } from "../features/constants.ts"

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: ({ username, password }) => ({
                url: `${AUTH_URL}/login`,
                method: "POST",
                credentials: "include",
                body: { username, password }
            }),
        }),
        logout: builder.mutation<any, void>({
            query: () => ({
                url: `${AUTH_URL}/logout`,
                credentials: "include",
                method: "POST"
            })
        }),
        checkAuth: builder.query<any, void>({
            query: () => ({
                url: `${AUTH_URL}/check`,
                credentials: "include",
                method: "GET"
            })
        })
    })
})

export const { useLoginMutation, useLogoutMutation, useCheckAuthQuery } = authApiSlice