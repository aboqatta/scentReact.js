import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const getCartFromLocalStorage = () => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : { products: [], totalQuantity: 0, totalPrice: 0 };
};

const saveCartToLocalStorage = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

const initialState = getCartFromLocalStorage();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const existingItem = state.products.find(item => item.id === product.id);
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += existingItem.price;
      } else {
        state.products.push({
          ...product,
          quantity: 1,
          totalPrice: product.price
        });
      }
      state.totalPrice += product.price;
      state.totalQuantity = state.products.reduce((total, item) => total + item.quantity, 0);
      saveCartToLocalStorage(state);
    },
    removeFromCart(state, action) {
      const id = action.payload;
      const findItem = state.products.find(item => item.id === id);
      if (findItem) {
        state.totalPrice -= findItem.totalPrice;
        state.totalQuantity -= findItem.quantity;
        state.products = state.products.filter(item => item.id !== id);
        saveCartToLocalStorage(state);
      }
    },
    increaseQuantity(state, action) {
      const id = action.payload;
      const findItem = state.products.find(item => item.id === id);
      if (findItem) {
        findItem.quantity++;
        findItem.totalPrice += findItem.price;
        state.totalQuantity++;
        state.totalPrice += findItem.price;
        saveCartToLocalStorage(state);
      }
    },
    decreaseQuantity(state, action) {
      const id = action.payload;
      const findItem = state.products.find(item => item.id === id);
      if (findItem && findItem.quantity > 1) {
        findItem.quantity--;
        findItem.totalPrice -= findItem.price;
        state.totalQuantity--;
        state.totalPrice -= findItem.price;
        saveCartToLocalStorage(state);
      }
    },
    setCart(state, action) {
      return action.payload;
    }
  }
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, setCart } = cartSlice.actions;

const handleRequest = async (url, dispatch, action, method = 'POST') => {
  try {
    await axios({ method, url });
    dispatch(action());
  } catch (error) {
    console.error(`Failed to process request: ${error.message}`);
  }
};

export const asyncAddToCart = (product) => async (dispatch) => {
  handleRequest(`https://localhost:7256/api/cart/addtocart?productId=${product.id}`, dispatch, () => addToCart(product));
};

export const asyncRemoveFromCart = (productId) => async (dispatch) => {
  handleRequest(`https://localhost:7256/api/cart/removefromcart?productId=${productId}`, dispatch, () => removeFromCart(productId), 'DELETE');
};

export const asyncIncreaseQuantity = (productId) => async (dispatch) => {
  handleRequest(`https://localhost:7256/api/cart/increasequantity?productId=${productId}`, dispatch, () => increaseQuantity(productId));
};

export const asyncDecreaseQuantity = (productId) => async (dispatch) => {
  handleRequest(`https://localhost:7256/api/cart/decreasequantity?productId=${productId}`, dispatch, () => decreaseQuantity(productId));
};

export const asyncSetCart = (cartData) => async (dispatch) => {
  dispatch(setCart(cartData));
};

export default cartSlice.reducer;
