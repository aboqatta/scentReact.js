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
    topProducts: [],  // Added for top products
    categories: [],
    status: 'idle',
    error: null
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setTopProducts: (state, action) => {
            state.topProducts = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload;
                // Set top products as the first 4 products
                state.topProducts = action.payload.slice(0, 4);
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

export const { setTopProducts } = productSlice.actions;
export default productSlice.reducer;
