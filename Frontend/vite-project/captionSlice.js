import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "./src/utils/axois.js"

export const registerCaption = createAsyncThunk(
    "auth/register",
    async (captionData, { rejectWithValue }) => {
        try {
            const response = await axiosClient.post("/caption/register", captionData);

            return response.data.caption;
        }
        catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const loginCaption = createAsyncThunk(
    "auth/login",
    async (captionData, { rejectWithValue }) => {
        try {
            const response = await axiosClient.post("/caption/login", captionData);
            return response.data.caption;
        }
        catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const checkAuthCaption = createAsyncThunk(
    "auth/checkAuth",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosClient.get("/caption/check");
            return response.data.caption;
        }
        catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const logoutCaption = createAsyncThunk(
    "auth/logoutUser",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosClient.post("/caption/logout");
            return null
        }
        catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

const slicer2 = createSlice({
    name: "slicers",
    initialState: {
        isAuthenticationCaption: false,
        loadingCaption: false,
        errorCaption: null,
        caption: null
    },
    reducers: {},
    extraReducers: (bulider) => {
        bulider
            .addCase(registerCaption.pending, (state) => {
                state.loadingCaption = true;
                state.errorCaption = null;
            })
            .addCase(registerCaption.fulfilled, (state, action) => {
                state.loadingCaption = false;
                state.isAuthenticationCaption = !!action.payload;
                state.caption = action.payload;
            })
            .addCase(registerCaption.rejected, (state, action) => {
                state.loadingCaption = false;
                state.errorCaption = action.payload;
            })

            //login
            .addCase(loginCaption.pending, (state) => {
                state.loadingCaption = true;
                state.errorCaption = null;
            })
            .addCase(loginCaption.fulfilled, (state, action) => {
                state.loadingCaption = false;
                state.isAuthenticationCaption = !!action.payload;
                state.caption = action.payload;
            })
            .addCase(loginCaption.rejected, (state, action) => {
                state.loadingCaption = false;
                state.errorCaption = action.payload;
            })
            //userAuth
            .addCase(checkAuthCaption.pending, (state) => {
                state.loadingCaption = true;
                state.errorCaption = null;
            })
            .addCase(checkAuthCaption.fulfilled, (state, action) => {
                state.loadingCaption = false;
                state.isAuthenticationCaption = !!action.payload;
                state.caption = action.payload;
            })
            .addCase(checkAuthCaption.rejected, (state, action) => {
                state.loadingCaption = false;
                state.errorCaption = action.payload;
            })
            //logout
            .addCase(logoutCaption.pending, (state) => {
                state.loadingCaption = true;
                state.errorCaption = null;
            })
            .addCase(logoutCaption.fulfilled, (state) => {
                state.loadingCaption = false;
                state.isAuthenticationCaption = false;
                state.caption = null;
                state.errorCaption = null;
            })
            .addCase(logoutCaption.rejected, (state, action) => {
                state.loadingCaption = false;
                state.isAuthenticationCaption = false;
                state.errorCaption = action.payload;
                state.caption = null;
            })


    }

})


export default slicer2.reducer;

// response = {
//     data: {
//         user: reply,
//         message: "User is registered"

//     }
//     status_code:

// }