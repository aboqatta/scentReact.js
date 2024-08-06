import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    categories: [] 
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProducts(state, action) {
            state.products = action.payload;
        },
        setCategories(state, action) {  
            state.categories = action.payload;
        }
    }
});

export const { setProducts, setCategories } = productSlice.actions;
export default productSlice.reducer;
