import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './ProductCard.css';
import { asyncAddToCart } from '../../redux/cartSlice'; // Import asyncAddToCart
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();

    const handleAddToCart = async () => {
        try {
            await dispatch(asyncAddToCart(product));
            toast.success("Product Added Successfully!");
        } catch (error) {
            console.error('Error adding product:', error);
            toast.error('Failed to add product.');
        }
    };

    const imagePath = `${process.env.PUBLIC_URL}${product.image}`;

    return (
        <div className="product-card">
            <img src={imagePath} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <div className="rating">
                {[...Array(5)].map((_, index) => (
                    <FontAwesomeIcon key={index} icon={faStar} color="gold" />
                ))}
            </div>
            <div className="add-to-cart" onClick={handleAddToCart}>
                <span>+</span>
                <span>Add to cart</span>
            </div>
        </div>
    );
};

export default ProductCard;
