import React from "react";

const Header = () => {
  return (
    <header className="flex justify-between items-center h-16 bg-gray-900 text-gray-200 px-5 border-b border-gray-800">
      <div className="flex items-center">
        <span className="text-2xl mr-2">{`{}`}</span>
        <span className="font-bold text-xl mr-1">GARV</span>
    
      </div>
      <nav className="flex-grow mx-10">
        <ul className="flex space-x-6">
          <li className="uppercase cursor-pointer hover:text-blue-400">HOME</li>
          <li className="uppercase cursor-pointer hover:text-blue-400">
            PROJECTS
          </li>
          <li className="uppercase cursor-pointer hover:text-blue-400">
            EXPERIENCE
          </li>
          <li className="uppercase cursor-pointer hover:text-blue-400">
            API LAB
          </li>
        </ul>
      </nav>
      <div className="flex items-center">
        <span className="flex items-center mr-4">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 mr-1"></span>{" "}
          ONLINE
        </span>
        <button className="border border-blue-400 text-blue-400 px-2 py-1 hover:bg-blue-500 hover:text-white">
          Authorize
        </button>
      </div>
    </header>
  );
};

export default Header;
