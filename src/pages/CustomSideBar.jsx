import React, { useState } from "react";
import { Link } from "react-router-dom";
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import {  FaBars } from "react-icons/fa"; // Add icons from react-icons

const CustomSidebar = () => {
  const [open, setOpen] = useState(true);

  const Menus = [
    { title: "View All Projects", src: "Overview", icon: <AutoAwesomeMosaicIcon /> },
  ];

  return (
    <div className="flex text-black justify-center items-center ">
      <div
        className={`${
          open ? "w-60" : "w-20"
        } bg-[#F7FAFF] h-screen p-5 pt-6 relative duration-300 `}
      >
        <div
          className={`absolute cursor-pointer -right-7 top-4 w-10 h-10 text-[24px]  rounded-full flex items-center justify-center  font-bold transition-transform  
          }`}
          onClick={() => setOpen(!open)}
        >
          <FaBars />
        </div>
        <div className="flex items-center gap-x-4">
          <AutoAwesomeMotionIcon />
          <h1
            className={` font-semibold text-2xl duration-200 ${
              !open && "hidden"
            }
            }`}
          >
            Tasks
          </h1>
        </div>
        <div className="mt-6">
          {Menus.map((menu, index) => (
            <Link
              to="/"
              key={index}
              className={`flex items-center p-2 mt-2  hover:bg-white rounded-lg transition-colors duration-300 ${
                open ? "pl-4" : "pl-0"
              }`}
            >
              <div className="text-xl flex justify-center items-center">{menu.icon}</div>
              <span className={`ml-2 font-medium ${!open && "hidden"}`}>
                {menu.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomSidebar;
