import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/products");
        setProducts(response.data);
    //    console.log(response.data[0])
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    const token = sessionStorage.getItem("token"); // Dohvatanje tokena iz sesije
    if (!token) {
      alert("Please log in first!");
      navigate("/login");
      return;
    }

    try {
        const response = await axios.post(
            `http://localhost:8080/products/${productId}/addtocart`,
            {
              username: sessionStorage.getItem('username') 
            },
            { 
              headers: { 
                Authorization: `${token}` 
              } 
            }
          );
          sessionStorage.setItem("cart", JSON.stringify(response.data.productsInCart));
      alert("Product added to cart!");
      console.log("Cart response:", response.data);
    } catch (error) {
      console.error("Error adding to cart:", error.response?.data || error.message);
      alert("Failed to add to cart!");
    }
  };


  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 px-6 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">Products</h1>
        <button 
          onClick={() => navigate("/cart")} 
          className="bg-white text-blue-600 px-4 py-2 rounded-md shadow hover:bg-gray-200"
        >
          View Cart
        </button>
      </header>

      {/* Lista proizvoda */}
      <div className="container mx-auto py-6 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {products.map((product) => (
    <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
      <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-md" />
      <h2 className="text-lg font-bold mt-2" style={{color: 'blue'}}>{product.name || "No name available"}</h2>
      {/* Brand */}
      <p className="text-sm text-gray-500">Brand: {product.brand}</p>
      
      {/* Category */}
      <p className="text-sm text-gray-500">Category: {product.category}</p>
      
      {/* Availability */}
      <p className={`text-sm ${product.aveilable ? 'text-green-600' : 'text-red-600'}`}>
        {product.aveilable ? 'Aveilable' : 'Out of Stock'}
      </p>
      
      {/* Price */}
      <p className="text-gray-600 mt-1">${product.price}</p>
      
      <button
              onClick={() => handleAddToCart(product.id)}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Add to Cart
            </button>
    </div>
  ))}
</div>
    </div>
  );
}
