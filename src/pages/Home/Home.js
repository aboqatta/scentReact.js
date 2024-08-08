import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, fetchCategories } from "../../redux/productSlice";
import ProductCard from '../../components/ProductCard/ProductCard';
import './Home.css';
import headerImage from '../../assets/staticImages/header22.jpg';

const Home = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.product.products);
    const categories = useSelector(state => state.product.categories);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;

    useEffect(() => {
        dispatch(fetchProducts(selectedCategoryId));
        dispatch(fetchCategories());
    }, [dispatch, selectedCategoryId]);

    const handleCategoryClick = (categoryId) => {
        setSelectedCategoryId(categoryId);
        setCurrentPage(1);
    };

    const filteredProducts = selectedCategoryId === null
        ? products
        : products.filter(product => product.categoryId === selectedCategoryId);

    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = filteredProducts.slice(firstIndex, lastIndex);
    const nPage = Math.ceil(filteredProducts.length / recordsPerPage);
    const numbers = Array.from({ length: nPage }, (_, i) => i + 1);

    const nextPage = () => currentPage < nPage && setCurrentPage(currentPage + 1);
    const prePage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
    const changeCPage = (id) => setCurrentPage(id);

    return (
        <div className="home-container">
            <div className="header">
                <img src={headerImage} alt="Header" className="header-image" />
                <div className="header-content">
                    <h2>WELCOME TO scent.com</h2>
                    <Link to="/shop" className="shop-button">SHOP NOW</Link>
                </div>
            </div>
            <div className="products-section">
                <div className="categories">
                    <div className="categories-title">SHOP BY CATEGORY</div>
                    <ul className="categories-list">
                        <li
                            className={`category-item ${selectedCategoryId === null ? 'active' : ''}`}
                            onClick={() => handleCategoryClick(null)}
                        >
                            All
                        </li>
                        {categories.map(cat => (
                            <li
                                key={cat.id}
                                className={`category-item ${cat.id === selectedCategoryId ? 'active' : ''}`}
                                onClick={() => handleCategoryClick(cat.id)}
                            >
                                {cat.name}
                            </li>
                        ))}
                    </ul>
                </div>
                <h2 className="products-title">Choose your scent</h2>
                <div className="products-grid">
                    {records.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
                <ul className='pagination'>
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className='page-link' onClick={prePage}>Prev</button>
                    </li>
                    {numbers.map(n => (
                        <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={n}>
                            <button className='page-link' onClick={() => changeCPage(n)}>{n}</button>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === nPage ? 'disabled' : ''}`}>
                        <button className='page-link' onClick={nextPage}>Next</button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Home;
