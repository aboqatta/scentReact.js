import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Shop.css';

const Shop = ({ selectedCategory }) => {
    const products = useSelector(state => state.product.products);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 12;

    const filteredProducts = selectedCategory === 'All'
        ? products
        : products.filter(product => product.category === selectedCategory);

    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = filteredProducts.slice(firstIndex, lastIndex);
    const nPage = Math.ceil(filteredProducts.length / recordsPerPage);
    const numbers = [...Array(nPage).keys()].map(n => n + 1);

    const nextPage = () => {
        if (currentPage < nPage) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prePage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const changeCPage = (id) => {
        setCurrentPage(id);
    };

    console.log("Current Page:", currentPage);
    console.log("Number of Pages:", nPage);

    return (
        <div className="products-section">
            <h2 className="products-title">{selectedCategory} Products</h2>
            <div className="products-grid">
                {records.map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))}
            </div>
            <div>
                <ul className='pagination'>
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <a href='#' className='page-link' onClick={(e) => { e.preventDefault(); prePage(); }}>Prev</a>
                    </li>
                    {numbers.map((n, i) => (
                        <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                            <a href='#' className='page-link' onClick={(e) => { e.preventDefault(); changeCPage(n); }}>{n}</a>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === nPage ? 'disabled' : ''}`}>
                        <a href='#' className='page-link' onClick={(e) => { e.preventDefault(); nextPage(); }}>Next</a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Shop;
