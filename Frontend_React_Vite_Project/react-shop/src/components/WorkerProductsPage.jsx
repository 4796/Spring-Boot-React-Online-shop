import React, { useState, useEffect } from 'react';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    aveilable: true,
    brand: '',
    category: '',
    description: '',
    image: '',
    name: '',
    price: '',
    quantity: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({
            worker:  sessionStorage.getItem("username"),
            product: newProduct
        })
      });

      if (response.ok) {
        fetchProducts();
        setNewProduct({
          aveilable: true,
          brand: '',
          category: '',
          description: '',
          image: '',
          name: '',
          price: '',
          quantity: ''
        });
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: sessionStorage.getItem("username"),
        })
      });

      if (response.ok) {
        fetchProducts();
        alert("Succesfully deleted product");
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleUpdateProduct = async (id, updatedProduct) => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({
            worker: {username: sessionStorage.getItem("username")},
            product: updatedProduct
        })
      });

      if (response.ok) {
        fetchProducts();
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    maxWidth: '500px',
    margin: '0 auto 30px'
  };

  const inputStyle = {
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px'
  };

  const productsListStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px'
  };

  const productCardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px'
  };

  const productImageStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '4px'
  };

  return (
    <div style={{ padding: '20px' }}>
      <form onSubmit={handleAddProduct} style={formStyle}>
        <input
          style={inputStyle}
          type="text"
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
        />
        <input
          style={inputStyle}
          type="text"
          placeholder="Brand"
          value={newProduct.brand}
          onChange={(e) => setNewProduct({...newProduct, brand: e.target.value})}
        />
        <input
          style={inputStyle}
          type="text"
          placeholder="Category"
          value={newProduct.category}
          onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
        />
        <textarea
          style={inputStyle}
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
        />
        <input
          style={inputStyle}
          type="text"
          placeholder="Image URL"
          value={newProduct.image}
          onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
        />
        <input
          style={inputStyle}
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
        />
        <input
          style={inputStyle}
          type="number"
          placeholder="Quantity"
          value={newProduct.quantity}
          onChange={(e) => setNewProduct({...newProduct, quantity: e.target.value})}
        />
        <button type="submit" style={{
          padding: '10px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>Add Product</button>
      </form>

      <div style={productsListStyle}>
        {products.map((product) => (
          <div key={product.id} style={productCardStyle}>
            <img src={product.image} alt={product.name} style={productImageStyle} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Brand: {product.brand}</p>
            <p>Category: {product.category}</p>
            <p>Price: ${product.price}</p>
            <p>Quantity: {product.quantity}</p>
            <p>Available: {product.aveilable ? 'Yes' : 'No'}</p>
            <button 
              onClick={() => handleDeleteProduct(product.id)}
              style={{
                marginRight: '10px',
                padding: '5px 10px',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Delete
            </button>
            <button 
              onClick={() => handleUpdateProduct(product.id, {
                ...product,
               // date: 
                price: prompt('Enter new price:', product.price),
                quantity: prompt('Enter new quantity:', product.quantity)
              })}
              style={{
                padding: '5px 10px',
                backgroundColor: '#2196F3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Update
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;