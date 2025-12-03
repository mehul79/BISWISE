import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/pixelClouds.jpg";
import axios from 'axios';
import Navbar from '../Navbar';
const SignUpPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = {
      lName: name,
      lMail: email,
      lPassword: password,
    }

    console.log(formData);

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/signup", formData, {
        withCredentials: true,
      });
      if (response.data.err) {
        setError(response.data.err);
      } else if (response.data.redirect) {
        navigate("/login");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
        <Navbar textColor={"black"} />
      <div className="flex justify-center items-center min-h-screen bg-white text-black flex-col pt-16 pb-8">
        <div className="w-full max-w-md bg-white backdrop-blur-sm bg-opacity-40 p-6 rounded-lg shadow-md z-20">
          <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="block text-base font-semibold mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                placeholder="Enter your Name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="block text-base font-semibold mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-base font-semibold mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                placeholder="Enter your password"
              />
            </div>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="mr-2"
                />
                <label htmlFor="remember" className="text-sm">Remember me</label>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded-md text-base font-semibold hover:bg-blue-700 transition-colors"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
            {error && <p className="text-red-600 mt-3 text-center text-sm">{error}</p>}
          </form>
          <p className="text-center text-sm mt-3">
            Already have an account?{' '}
            <a href="/login" className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>

      <div className="fixed top-0 left-0 w-full h-screen z-10"
        style={{
          backgroundImage: `url(${logo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.2,
        }}
      ></div>
    </>
  );
};

export default SignUpPage;