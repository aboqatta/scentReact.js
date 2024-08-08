import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../redux/productSlice';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Shop.css';

const Shop = ({ selectedCategoryId }) => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.product.products);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 12;

    useEffect(() => {
        dispatch(fetchProducts(selectedCategoryId));
    }, [dispatch, selectedCategoryId]);

    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = products.slice(firstIndex, lastIndex);
    const nPage = Math.ceil(products.length / recordsPerPage);

    const handlePageChange = (page) => setCurrentPage(page);

    return (
        <div className="products-section">
            <h2 className="products-title">
                {selectedCategoryId ? `Category ${selectedCategoryId} Products` : 'All Products'}
            </h2>
            <div className="products-grid">
                {records.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            <ul className='pagination'>
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className='page-link' onClick={() => handlePageChange(currentPage - 1)}>Prev</button>
                </li>
                {[...Array(nPage).keys()].map(n => (
                    <li className={`page-item ${currentPage === n + 1 ? 'active' : ''}`} key={n}>
                        <button className='page-link' onClick={() => handlePageChange(n + 1)}>{n + 1}</button>
                    </li>
                ))}
                <li className={`page-item ${currentPage === nPage ? 'disabled' : ''}`}>
                    <button className='page-link' onClick={() => handlePageChange(currentPage + 1)}>Next</button>
                </li>
            </ul>
        </div>
    );
};

export default Shop;
