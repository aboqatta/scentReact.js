import React from 'react';
import './Shop.css';
import { useSelector } from 'react-redux';
import ProductCard from '../../components/ProductCard/ProductCard'; // Assuming ProductCard is imported correctly

const FilterData = () => {
    const filterProducts = useSelector(state => state.product.filteredProducts) || []; // Initialize filterProducts as an empty array if undefined

    return (
        <div className="products-section">
            <h2 className="products-title">All Products</h2>
            <div className="products-grid">
            {filterProducts.length > 0 ? (
    filterProducts.map(product => <ProductCard key={product.id} product={product} />)
) : (
    <p>No items found</p>
)}

            </div>
        </div>
    );
};

export default FilterData;