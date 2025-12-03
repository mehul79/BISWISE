import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/pixelClouds.jpg";
import axios from 'axios';
import Navbar from '../Navbar';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) setEmail(savedEmail);
  }, []);

  const formData = {
    email,
    password,
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      const response = await axios.post("http://localhost:8000/login", formData, {
        withCredentials: true,
      });
  
      if (response.data.err) {
        setError(response.data.err);
        console.log("Error from backend:", response.data.err);
      } else if (response.data.redirect) {
        navigate("/");
      }
    } catch (err) {
      console.log("Request failed:", err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <>
        <Navbar textColor={"black"} />
      <div className="flex justify-center items-center min-h-screen bg-white text-black flex-col pt-20 pb-10">
        <div className="w-full max-w-md bg-white backdrop-blur-sm bg-opacity-40 p-8 rounded-lg shadow-md z-20">
          <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
          <form onSubmit={handleSubmit} >
            <div className="mb-4">
              <label htmlFor="email" className="block text-lg font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-lg font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="mr-2"
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember" className="text-sm">Remember me</label>
              </div>
              <button
              type="button"
              // onClick={handleForgotPassword}
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot password?
            </button>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
            {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
          </form>
          <p className="text-center text-sm mt-4">
            Don't have an account?{' '}
            <a href="/signup" className="text-blue-600 hover:underline">
              Sign up
            </a>
          </p>
        </div>

         <div className="fixed top-0 left-0 w-full h-screen z-10"
            style={{
                    backgroundImage: `url(${logo})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    opacity: 0.2,
                  }}
          ></div>


      </div>
    </>
  );
};

export default LoginPage;
