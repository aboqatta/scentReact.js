import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmptyCart from '../../assets/staticImages/emptyCart.png';
import { FaTrashAlt } from 'react-icons/fa';
import './Cart.css';
import { decreaseQuantity, increaseQuantity, removeFromCart } from '../../redux/cartSlice';
import { toast } from 'react-toastify';

const Cart = () => {
  const cart = useSelector(state => state.cart);
  const [address] = useState('main street, 0012');
  const dispatch = useDispatch();

  const handleDecreaseQuantity = async (productId) => {
    try {
      await dispatch(decreaseQuantity(productId));
      toast.info("Quantity decreased!");
    } catch (error) {
      toast.error("Failed to decrease quantity.");
      console.error(error);
    }
  };

  const handleIncreaseQuantity = async (productId) => {
    try {
      await dispatch(increaseQuantity(productId));
      toast.info("Quantity increased!");
    } catch (error) {
      toast.error("Failed to increase quantity.");
      console.error(error);
    }
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      await dispatch(removeFromCart(productId));
      toast.error("Product removed from cart!");
    } catch (error) {
      toast.error("Failed to remove product from cart.");
      console.error(error);
    }
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
              {cart.products.map((product) => {
                const productImage = `${product.image}`; // Ensure this path is correct
                return (
                  <div key={product.id} className="cart-product">
                    <div className="cart-product-info">
                      <img src={productImage} alt={product.name} className="product-image" />
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
                );
              })}
            </div>
            <div className="cart-summary">
              <h3>CART TOTAL</h3>
              <div className="summary-item">
                <span>Total Items:</span>
                <span className="summary-value">{cart.totalQuantity}</span>
              </div>
              <div className="summary-item">
                <p>Shipping:</p>
              </div>
              <div className="summary-item">
                <p>Shipping to:</p>
                <span className="summary-value">{address}</span>
              </div>
              <button className="change-address-button not-allowed">Change Address</button>
              <div className="summary-item">
                <span>Total Price:</span>
                <span className="summary-value">${cart.totalPrice.toFixed(2)}</span>
              </div>
              <button className="checkout-button not-allowed">Proceed to Checkout</button>
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
