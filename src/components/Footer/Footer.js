import React from 'react'
import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-section">
          <h3>Scent.com</h3>
          <p>
            At <span className="bold-gold">Scent.com</span>, we offer a selection of exquisite perfumes to match every mood and occasion. Discover your perfect scent with our curated collection and enjoy luxury in every spray. For support, contact us at [contact email]. 
            Follow us on [social media links] for updates and special offers.
          </p>
        </div>
        <div className="footer-section quick-links-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/">Contact</Link></li>
            <li><Link to="/">About</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Follow us</h4>
          <div className="social-icons">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaGithub /></a>
            <a href="#"><FaLinkedin /></a>
          </div>
          <form className="subscribe-form">
            <input type="email" placeholder="Subscribe" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
        <div className="footer-section copyright-section">
          <p>
            &copy; 2024 Scent.com. All rights reserved.
          </p>
          <div className="legal-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
