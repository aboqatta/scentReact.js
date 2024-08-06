import React from 'react';
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const products = useSelector(state => state.cart.products);
  return (
    <nav className='navbar'>
      <div className='container container-lg'>
        <div className='logo'>
          <Link to="/">Scent.com</Link>
        </div>
        <div className='search-container'>
          <form>
            <input className='search-input' type='text' placeholder='Search for product' />
            <FaSearch className='search-icon' />
          </form>
        </div>
        <div className='nav-items'>
          <Link to="/cart" className='nav-icon'>
            <FaShoppingCart className='cart-icon' />
            {products.length > 0 && <span className='cart-badge'>{products.length}</span>}
          </Link>
          <button className='login-register btn btn-beige'>Login | Register</button>
          <button className='user-icon btn btn-beige'>
            <FaUser />
          </button>
        </div>
      </div>
      <div className='nav-links'>
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/">Contact</Link>
        <Link to="/">About</Link>
      </div>
    </nav>
  );
}

export default Navbar;
