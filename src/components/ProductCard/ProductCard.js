import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './ProductCard.css';
import { addToCart } from '../../redux/cartSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();

    const handleAddToCart = (e, product) => {
        e.stopPropagation();
        e.preventDefault();
        dispatch(addToCart(product));
        toast.success("Product Added Successfully!"); 
    };

   
    const imagePath = require(`../../assets/images/${product.image}`);

    return (
        <div className="product-card">
            <img src={imagePath} alt="product" className="product-image" />
            <h3>{product.name}</h3>
            <p>${product.price}</p> 
            <div className="rating">
                {[...Array(5)].map((_, index) => (
                    <FontAwesomeIcon key={index} icon={faStar} color="gold" />
                ))}
            </div>
            <div className="add-to-cart" onClick={(e) => handleAddToCart(e, product)}>
                <span>+</span>
                <span>Add to cart</span>
            </div>
        </div>
    );
};

export default ProductCard;
