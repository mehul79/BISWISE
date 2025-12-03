import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from '../assets/back.gif';
import Navbar from "./Navbar";

const StartQuiz = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get("http://localhost:8000/checkAuth", {
          withCredentials: true,
        });
        if (!response.data.authenticated) navigate("/login");
      } catch (error) {
        console.error("Authentication check failed", error);
        navigate("/login");
      }
    };

    checkAuthentication();
  }, [navigate]);

  const handleStartQuiz = async () => {
    console.log("Starting the quiz");
    try {
      const response = await axios.get("http://localhost:8000/startQuiz", {
        withCredentials: true,
      });
      console.log(response.data);
      if (response.data.message === "Quiz Started") {
        navigate("/quizStarted");
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error("Failed to start the quiz", error);
      setMessage("Failed to start the quiz. Please try again.");
    }
  };

  return (
    <>
    <Navbar />
    <div className="flex items-center justify-center min-h-screen text-green-100 relative">
        <div
                  className="fixed top-0 left-0 w-full h-screen -z-10"
                  style={{
                    backgroundImage: `url(${logo})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    opacity: 0.6,
                  }}
                ></div>
      <div className="p-8 border-4 border-brown-400 rounded-lg shadow-md bg-green-700 pixel-font flex flex-col items-center justify-center glassmorphism h-96">
        <h1 className="text-3xl mb-4">Welcome to the Quiz!</h1>
        <p className="mb-4">{message}</p>
        <button
          onClick={handleStartQuiz}
          className="bg-green-500 hover:bg-green-600 text-green-900 font-bold py-2 px-4 rounded border-2 border-green-300"
        >
          Start Quiz
        </button>
      </div>
    </div>
    </>
  );
};

export default StartQuiz;
