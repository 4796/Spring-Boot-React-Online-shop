import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Alert = ({ message, type }) => (
  <div className={`p-4 rounded-lg mb-4 ${type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
    {message}
  </div>
);

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setAlertMessage("Failed to load product details");
        setAlertType("error");
        setShowAlert(true);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      setAlertMessage("Please log in first!");
      setAlertType("error");
      setShowAlert(true);
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/products/${id}/addtocart`,
        { username: sessionStorage.getItem("username") },
        { headers: { Authorization: `${token}` } }
      );
      sessionStorage.setItem("cart", JSON.stringify(response.data.productsInCart));
      setAlertMessage("Product successfully added to cart!");
      setAlertType("success");
      setShowAlert(true);
    } catch (error) {
      console.error("Error adding to cart:", error.response?.data || error.message);
      setAlertMessage("Failed to add to cart!");
      setAlertType("error");
      setShowAlert(true);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-blue-600 p-6">
        <div className="container mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="bg-white text-blue-600 px-6 py-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            ← Back to Products
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {showAlert && <Alert message={alertMessage} type={alertType} />}

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-6">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="md:w-1/2 p-6 md:p-8">
              <div className="flex flex-col h-full">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                      {product.category}
                    </span>
                    <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                      {product.brand}
                    </span>
                  </div>

                  <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

                  <div className="space-y-4">
                    <p className="text-gray-600 leading-relaxed">{product.description}</p>

                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-bold text-gray-900">
                        ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          product.aveilable
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.aveilable ? "In Stock" : "Out of Stock"}
                      </span>
                    </div>

                    <div className="text-sm text-gray-500 space-y-1">
                      <p>Quantity available: {product.quantity}</p>
                      <p>Added: {new Date(product.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={!product.aveilable}
                  className={`mt-8 w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-white font-medium transition-colors ${
                    product.aveilable
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  <span className="mr-2">🛒</span>
                  {product.aveilable ? "Add to Cart" : "Out of Stock"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}