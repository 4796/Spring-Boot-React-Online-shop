import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './components/LoginPage.jsx'
import ProductsPage from './components/ProductsPAge.jsx'
import WorkersPage from './components/WorkersPage.jsx'
import CartPage from './components/CartPage.jsx'

function App() {
    return(
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/worker" element={<WorkersPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
    );
}

export default App
