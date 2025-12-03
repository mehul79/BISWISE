import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Navbar = ({textColor}) => {
  return (
    <nav className={`flex justify-between items-center z-50 px-6 py-4 font-bold w-full absolute text-${textColor=='black'? 'black' : "white"}`}>
      <div className="flex items-center justify-between w-full md:w-auto">
        <a className="text-lg font-bold cursor-pointer" href="/">BISWISE</a>
      </div>
      <div className="flex space-x-4 ml-auto">
      <a href="/startQuiz">
                <button className={` px-4 py-2 rounded-md font-semibold hover:text-${textColor=='black'? 'gray-500' : "[#94D3EC]"}`}>
                  Quiz
                </button>
              </a>
        <a href="/login">
          <button className={` px-4 py-2 rounded-md font-semibold hover:text-${textColor=='black'? 'gray-500' : "[#94D3EC]"}`}>
            Login
          </button>
        </a>
        <a href="/signup">
          <button className={` px-4 py-2 rounded-md font-semibold hover:text-${textColor=='black'? 'gray-500' : "[#94D3EC]"}`}>
            Sign Up
          </button>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
