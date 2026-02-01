import React, { useState, useEffect } from "react";
import logo from "../../assets/back.gif";
import "./LandingBefore.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from 'axios';
import useWeb3Forms from "@web3forms/react";
import Chat from "../Chat";

const LandingBefore = () => {
  const [userName, setUserName] = useState('');
  const [userMail, setUserMail] = useState('');
  // const [userNum, setUserNum] = useState('');
  const [userMsg, setUserMsg] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [shuffledRanks, setShuffledRanks] = useState([]);
  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get('http://localhost:8000/leaderBoard'); // Adjust URL
      const leaderboardData = response.data.leaderboard.map((entry) => ({
        points: entry.score,
        name: entry.username,
        isUser: false,
      }));

      let shuffleRanks = [...leaderboardData];
      shuffleRanks.sort(() => Math.random() - 0.5); // Initial shuffle

      const shuffleInterval = setInterval(() => {
        shuffleRanks.sort(() => Math.random() - 0.5);
        setShuffledRanks([...shuffleRanks]);
      }, 30);

      setTimeout(() => {
        clearInterval(shuffleInterval);
        const sortedRanks = [...shuffleRanks];
        sortedRanks.sort((a, b) => b.points - a.points); // Sort by points
        setShuffledRanks(sortedRanks);
      }, 800);

      return () => clearInterval(shuffleInterval);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);


  const accessKey = '6e945dc1-7434-4b0f-9d4f-b4d49ed10d19';

  const { submit: onSubmit } = useWeb3Forms({
    access_key: accessKey,
    settings: {
      from_name: 'Acme Inc',
      subject: 'New Contact Message from your Website',
    },
    onSuccess: (msg, data) => {
      // console.log('Form submitted successfully:', msg, data);
      setUserName('');
      setUserMail('');
      setUserMsg('');
      setError('Message sent successfully!');
    },
    onError: (msg, data) => {
      console.error('Form submission failed:', msg, data);
      setError('Failed to send the message. Please try again later.');
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!userName || !userMail || !userMsg) {
      setError('Please fill all provided fields');
      return;
    }
    if (!userMail.includes('@')) {
      setError('Invalid email');
      return;
    }

    setError(null);

    const userInfo = {
      name: userName,
      email: userMail,
      // phone: userNum,
      message: userMsg,
    };

    // console.log(userInfo)

    onSubmit(userInfo);
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="w-full bg-transparent">
          <nav className="flex fixed justify-between items-center z-50 px-6 py-4 text-black font-bold w-full">
            <div className="flex items-center justify-between w-full md:w-auto">
              <span className="text-lg text-white font-bold cursor-pointer">BISWISE</span>
            </div>
            <div className="flex space-x-4 ml-auto">
              {/* <a href="/startQuiz">
                <button className="text-white px-4 py-2 rounded-md font-semibold hover:text-[#94D3EC]">
                  Quiz
                </button>
              </a>
              <a href="/login">
                <button className="text-white px-4 py-2 rounded-md font-semibold hover:text-[#94D3EC]">
                  Login
                </button>
              </a>
              <a href="/signup">
                <button className="text-white px-4 py-2 rounded-md font-semibold hover:text-[#94D3EC]">
                  Sign Up
                </button>
              </a> */}
            </div>
          </nav>
        </div>
        <div
          className="fixed top-0 left-0 w-full h-screen -z-10"
        style={{
          backgroundImage: `url(${logo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.6,
        }}
        >
        </div>
        {/* Header*/}
        <section
          className="relative text-center flex-grow flex flex-col md:flex-row items-center justify-around p-8 pt-40 pb-40 h-screen"
        >
          <div className="text-center space-y-4">
            <h1
              className="text-5xl md:text-8xl lg:text-9xl font-family-PixelyaTrial text-[#94D3EC]"
              style={{
                textShadow:
                  "4px 4px 10px rgba(0, 0, 0, 0.8), 6px 6px 15px rgba(0, 0, 0, 0.5)",
              }}
            >
              BISWISE
            </h1>
            <p className="text-white-600 text-sm md:text-xl lg:text-2xl">
              Know the Standards, Pick the Best
            </p>
            <div className="flex justify-center mt-8">
              <button
                className="bg-[#32CD32] text-[#FFFFFF] text-lg md:text-xl py-2 px-5 md:px-7 rounded-2xl hover:bg-[#39E639] transition-colors"
                style={{ fontFamily: "Pixelify sans" }}
              >
                <a href="./game.html" >Play</a>
              </button>
            </div>
          </div>
        </section>
        {/* Abt*/}
        <section className="bg-[#C4BABA] py-16 px-4 md:px-8 flex flex-col items-center">
          <div className="bg-[#DEDCDC] w-full max-w-4xl rounded-lg border-2 border-black shadow-xl p-6 relative pixelated-frame">
            <h2
              className="text-4xl md:text-6xl text-black font-bold text-center"
              style={{ fontFamily: "Pixelify Sans" }}
            >
              ABOUT THE GAME
            </h2>
            <p
              className="mt-4 md:mt-6 text-base md:text-lg text-[#362636] text-center leading-relaxed"
              style={{ fontFamily: "Roboto Condensed" }}
            >
              Dive into the retro-future of BIS Standards! Sharpen your decision-making through pixel-perfect challenges.
              Whether conquering immersive workshops or unraveling mystery quests, every step brings you closer to
              mastering quality and safety in a fun, interactive way.
              Dive into the retro-future of BIS Standards! Sharpen your decision-making through pixel-perfect challenges.
              Whether conquering immersive workshops or unraveling mystery quests, every step brings you closer to
              mastering quality and safety in a fun, interactive way.
            </p>
            <div className="flex justify-center mt-6 md:mt-8">
              <button
                className="border-2 border-black text-black bg-white text-sm md:text-md py-2 px-4 md:px-6 rounded-2xl hover:bg-gray-300 transition"
                style={{ fontFamily: "Pixelify Sans" }}
              >
                <a href="./game.html" >Ready to Play?</a>
              </button>
            </div>
          </div>
        </section>

        {/*Cntct*/}
        <section id="contact" className="bg-[#C4BABA] py-8 px-6 flex flex-col items-center">
          <div className="flex flex-col lg:flex-row w-full max-w-6xl">
            <form onSubmit={handleFormSubmit} className="flex-1 lg:pr-6" autoComplete="off">
              <h2 className="text-3xl text-gray-800 font-pixel mb-4">Get in Touch</h2>
              <p className="text-sm text-gray-600 text-left max-w-xl mb-4">
                Have questions or need assistance? Reach out to us through the form below, and we’ll get back to you shortly.
              </p>
              {error && (
                <p
                  className={`text-center mb-4 ${error.includes("success") ? "text-green-600" : "text-red-600"
                    }`}
                >
                  {error}
                </p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-2 py-1 border-b-2 border-black bg-transparent text-black focus:outline-none"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-2 py-1 border-b-2 border-black bg-transparent text-black focus:outline-none"
                    value={userMail}
                    onChange={(e) => setUserMail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-600">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="3"
                  className="w-full px-2 py-1 border-b-2 border-black bg-transparent text-black focus:outline-none"
                  value={userMsg}
                  onChange={(e) => setUserMsg(e.target.value)}
                  required
                  style={{ resize: "none" }}
                ></textarea>
              </div>
              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  className="bg-[#FF7F50] text-white py-2 px-6 rounded-lg font-semibold hover:bg-[#cc5200] transition-colors"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </section>
        {/*Ftr*/}
        <footer className="bg-gray-800 text-white py-4">
          <div className="container mx-auto text-center">
            <p className="text-xs text-gray-400 mb-2">
              &copy; {new Date().getFullYear()} BISWISE. All Rights Reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};
export default LandingBefore;

