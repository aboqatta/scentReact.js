import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import headerImage from '../../assets/images/header22.jpg';
import { setProducts, setCategories } from "../../redux/productSlice";
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Home.css';

const Home = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.product.products);
    const categories = useSelector(state => state.product.categories);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productsResponse = await fetch('http://localhost:3000/products');
                const productsData = await productsResponse.json();
                dispatch(setProducts(productsData));

                const categoriesResponse = await fetch('http://localhost:3000/categories');
                const categoriesData = await categoriesResponse.json();
                dispatch(setCategories(categoriesData));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [dispatch]);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1);
    };

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

    return (
        <div className="home-container">
            <div className="header">
                <img src={headerImage} alt="Header Image" className="header-image"/>
                <div className="header-content">
                    <h2>WELCOME TO scent.com</h2>
                    <Link to="/shop" className="shop-button">SHOP NOW</Link>
                </div>
            </div>
            <div className="products-section">
                <h2 className="products-title">Top Products</h2>
                <div className="products-grid">
                    {products.slice(0, 4).map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))}
                </div>
            </div>
            <div className="products-section">
                <div className="categories">
                    <div className="categories-title">SHOP BY CATEGORY</div>
                    <ul className="categories-list">
                        {['All', ...categories.map(cat => cat.name)].map((category, index) => (
                            <li
                                key={index}
                                className={`category-item ${category === selectedCategory ? 'active' : ''}`}
                                onClick={() => handleCategoryClick(category)}
                            >
                                {category}
                            </li>
                        ))}
                    </ul>
                </div>
                <h2 className="products-title">Choose your scent</h2>
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
        </div>
    );
};

export default Home;
