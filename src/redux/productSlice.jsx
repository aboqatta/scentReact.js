import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

// Thunks for asynchronous actions
export const fetchProducts = createAsyncThunk('product/fetchProducts', async (categoryId) => {
    const url = categoryId
        ? `https://localhost:7256/api/Products/category/${categoryId}`
        : 'https://localhost:7256/api/Products';
    const response = await axios.get(url);
    return response.data;
});

export const fetchCategories = createAsyncThunk('product/fetchCategories', async () => {
    const response = await axios.get('https://localhost:7256/api/categories');
    return response.data;
});

const initialState = {
    products: [],
    categories: [],
    status: 'idle',
    error: null
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchCategories.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default productSlice.reducer;
