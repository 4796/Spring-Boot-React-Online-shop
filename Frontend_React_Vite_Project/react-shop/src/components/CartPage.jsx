import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';


export default function CartPage() {
    const [cartItems, setCartItems] = useState(() => {
        // Parse the cart from sessionStorage and provide a fallback value
        const savedCart = sessionStorage.getItem("cart");
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          // Dodajemo UUID svakom proizvodu koji ga još nema
          return parsedCart.map(product => ({
            ...product,
            uuid: product.uuid || uuidv4() // Generišemo UUID ako ne postoji
          }));
        }
        return [];
      })
  const [address, setAddress] = useState("");
  const navigate = useNavigate();


    
  

  const handleBuy = async (productId) => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("Please log in first!");
      navigate("/login");
      return;
    }

    const userAddress = prompt("Enter your delivery address:");
    if (!userAddress) {
      alert("You must enter an address to complete the purchase.");
      return;
    }
    setAddress(userAddress);

    try {
      const response = await axios.post(
        `http://localhost:8080/api/products/${productId}/buy`,
        { adress: userAddress, 
          client:{
            username: sessionStorage.getItem("username"),
            productsInCart: cartItems,
          },
          product:{
            id: productId
          }
        },
        { headers: { Authorization: `${token}` } }
      );

      alert("Purchase successful!");
      console.log("Purchase response:", response.data);



// Osigurajte da svi proizvodi imaju uuid
const updatedCart = response.data.client.productsInCart.map(product => ({
    ...product,
    uuid: product.uuid || uuidv4(), // Dodajemo uuid ako ne postoji
  }));

  // Ažurirajte stanje i session storage
  setCartItems(updatedCart);



  sessionStorage.setItem("cart", JSON.stringify(updatedCart));
      // Osveži korpu nakon kupovine
      setCartItems(response.data.client.productsInCart);
    } catch (error) {
      console.error("Purchase failed:", error.response?.data || error.message);
      alert("Failed to complete the purchase.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 px-6 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">Your Cart</h1>
        <button 
          onClick={() => navigate("/products")} 
          className="bg-white text-blue-600 px-4 py-2 rounded-md shadow hover:bg-gray-200"
        >
          Back to Products
        </button>
      </header>

      {/* Poruka o plaćanju */}
      <div className="text-center bg-yellow-100 py-2 text-gray-700 font-semibold">
        For every order, cash on delivery payment
      </div>

      {/* Prikaz proizvoda u korpi */}
      <div className="container mx-auto py-6 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cartItems.length === 0 ? (
          <p className="text-center col-span-full text-gray-500 text-lg">Your cart is empty.</p>
        ) : (
          cartItems.map((product) => (
            <div key={product.uuid} className="bg-white p-4 rounded-lg shadow-md">
              <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-md" />
              <h2 className="text-lg font-bold mt-2" style={{color: 'blue'}}>{product.name || "No name available"}</h2>
              <p className="text-gray-600">${product.price}</p>
              <p className={`text-sm ${product.aveilable ? 'text-green-600' : 'text-red-600'}`}>
        {product.aveilable ? 'Aveilable' : 'Out of Stock'}
      </p>
              <button
                onClick={() => handleBuy(product.id)}
                className="mt-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                Buy
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
