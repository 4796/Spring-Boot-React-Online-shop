import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './components/LoginPage.jsx'
import ProductsPage from './components/ProductsPAge.jsx'
import CartPage from './components/CartPage.jsx'
import ProductDetail from "./components/ProductDetail.jsx";
import RegisterPage from "./components/RegisterPage.jsx";
import WorkersPage from './components/WorkersPage.jsx'
import WProductsPage from './components/WorkerProductsPAge.jsx';
import UpdateAccountPage from './components/UpdateAccountPage.jsx';
import AdminPage from './components/AdminPage.jsx';

function App() {
    return(
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/worker" element={<WorkersPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/register" element={<RegisterPage />} />


        <Route path="/worker/products" element={<WProductsPage />} />
        <Route path="/worker/admin" element={<AdminPage />} />
        <Route path="/worker/update" element={<UpdateAccountPage />} />
      </Routes>
    </Router>
    );
}

export default App
