import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error before a new request

    try {
      const response = await axios.post("http://localhost:8080/login", {
        username,
        password,
      });

      console.log("Login successful:", response.data);
      alert("Login successful!");
      console.log(response.data);
      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("username", response.data.username);
      sessionStorage.setItem("cart", JSON.stringify(response.data.productsInCart));
      sessionStorage.setItem("name", response.data.name);
      sessionStorage.setItem("pay", response.data.name);
      if (response.data.hasOwnProperty('pay')) {
        //worker
        navigate('/worker');
      } else {
        // client
        navigate('/products');
      }

    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
  <h1 className="text-4xl font-extrabold mb-8 text-blue-400">ONLINE SHOP</h1>
  <div className="w-96 p-6 bg-white rounded-lg shadow-lg">
    <h2 className="text-2xl font-bold text-center mb-4 text-blue-400">Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-blue-400 mb-1" >Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-blue-400 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>

          <button
  onClick={() => navigate("/register")}
  className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition duration-200 mt-2"
>
  Register
</button>




        </form>
      </div>
    </div>
  );
}
