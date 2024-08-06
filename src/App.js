import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import Cart from "./pages/Cart/Cart";
import { ToastContainer } from 'react-toastify'; 

function App() {
    const [selectedCategory, setSelectedCategory] = useState('All');

    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route
                    path="/"
                    element={<Home setSelectedCategory={setSelectedCategory} />}
                />
                <Route
                    path="/shop"
                    element={<Shop selectedCategory={selectedCategory} />}
                />
                <Route path="/cart" element={<Cart />} />
            </Routes>
            <Footer />
            <ToastContainer />
        </BrowserRouter>
    );
}

export default App;
