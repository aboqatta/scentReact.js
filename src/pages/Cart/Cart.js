import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import EmptyCart from '../../assets/staticImages/emptyCart.png';
import { FaTrashAlt } from 'react-icons/fa';
import './Cart.css';
import { asyncDecreaseQuantity, asyncIncreaseQuantity, asyncRemoveFromCart, asyncSetCart } from '../../redux/cartSlice';
import { toast } from 'react-toastify';

const Cart = () => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const fetchCart = async () => {
    try {
      const { data } = await axios.get('https://localhost:7256/api/cart/cartitems');
      dispatch(asyncSetCart(data));
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [dispatch]);

  const handleDecreaseQuantity = async (productId) => {
    await dispatch(asyncDecreaseQuantity(productId));
    await fetchCart();
    toast.info("Quantity decreased!");
  };

  const handleIncreaseQuantity = async (productId) => {
    await dispatch(asyncIncreaseQuantity(productId));
    await fetchCart();
    toast.info("Quantity increased!");
  };

  const handleRemoveFromCart = async (productId) => {
    await dispatch(asyncRemoveFromCart(productId));
    await fetchCart();
    toast.error("Product removed from cart!");
  };

  return (
    <div className="cart-container">
      {cart.products.length > 0 ? (
        <div>
          <h3 className="cart-title">SHOPPING CART</h3>
          <div className="cart-content">
            <div className="cart-header">
              <p>PRODUCT</p>
              <div className="cart-header-details">
                <p>PRICE</p>
                <p>QUANTITY</p>
                <p>SUBTOTAL</p>
                <p>REMOVE</p>
              </div>
            </div>
            <div className="cart-products">
              {cart.products.map(product => (
                <div key={product.id} className="cart-product">
                  <div className="cart-product-info">
                    <img src={product.image} alt={product.name} className="product-image" />
                    <div>
                      <h3>{product.name}</h3>
                    </div>
                  </div>
                  <div className="cart-product-details">
                    <p>${product.price}</p>
                    <div className="quantity-controls">
                      <button 
                        onClick={() => handleDecreaseQuantity(product.id)} 
                        disabled={product.quantity === 1}
                      >
                        -
                      </button>
                      <p>{product.quantity}</p>
                      <button onClick={() => handleIncreaseQuantity(product.id)}>+</button>
                    </div>
                    <p>${(product.quantity * product.price).toFixed(2)}</p>
                    <button className="remove-button" onClick={() => handleRemoveFromCart(product.id)}>
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <h3>CART TOTAL</h3>
              <div className="summary-item">
                <span>Total Items:</span>
                <span className="summary-value">{cart.totalQuantity}</span>
              </div>
              <div className="summary-item">
                <p>Shipping:</p>
                {/* Add shipping cost if needed */}
              </div>
              <div className="summary-item">
                <span>Total Price:</span>
                <span className="summary-value">${cart.totalPrice.toFixed(2)}</span>
              </div>
              <button className="checkout-button" onClick={() => {/* Implement checkout functionality */}}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="empty-cart">
          <img src={EmptyCart} alt="Empty Cart" />
        </div>
      )}
    </div>
  );
};

export default Cart;
