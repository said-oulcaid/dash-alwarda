import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: 'auth', initialState: {
        user: localStorage.getItem("userInfo")
            ? JSON.parse(localStorage.getItem("userInfo"))
            : null,
        loading: false,
        error: null,
    },
    reducers: {
        setUser(state, action) {
            state.user = action.payload
        },
        logoutUser(state) {
            state.user = null;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
    }
})

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;