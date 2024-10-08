import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { styles } from "../styles";


import { logo, menu, close } from "../assets";

const Navbar = () => {

  const [isOverlapped, setIsOverlapped] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      // Change this threshold value based on when the navbar should change color
      if (offset > 50) { // Adjust this value as needed
        setIsOverlapped(true);
      } else {
        setIsOverlapped(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  const [active,setActive] = useState('')

  const [toggle,setToggle] = useState(false)

  const navLinks = [
    {
      id: "about",
      title: "About",
    },
    {
      id: "work",
      title: "Work",
    },
    {
      id: "contact",
      title: "Contact",
    },
  ];

  return (
    <nav
      className={`sm:px-16 px-6 w-full flex items-center py-5 fixed top-0 z-20 ${isOverlapped ? 'bg-primary' : ''}`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img
            src={logo}
            width={80}
            alt="logo"
            className="w-9 h-9 objct-contain"
          />
          <p className="text-white text-[18px] font-bold cursor-pointer flex">
            Ankit &nbsp; <span className="sm:block hidden">| Developer</span>
          </p>
        </Link>

        <ul className="list-none hidden sm:flex flex-row gap-10">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title ? "text-white" : "text-secondary"
              } hover:text-white text-[18px] font-medium cursor-pointer`}
               onClick={() => setActive(nav.title)}
// React's state management system recognizes the change in the active state. When the state changes, React triggers a re-render of the component.
// During this re-render, the className for the list item is recalculated based on the new active state.
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
        </ul>

        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain cursor-pointer"
          onClick={() => setToggle(!toggle)}
          />

          <div className={`${!toggle ? 'hidden' : 'flex' } p-6 bg-primary absolute top-20 right-0 mx-4 my-2 min-2-[140px] z-10 rounded-xl`}>

          <ul className="list-none flex justify-end items-start flex-col gap-4 ">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title ? "text-white" : "text-secondary"
              } font-poppins font-medium cursor-pointer text-[16px]`}
               onClick={() => {
                setToggle(!toggle);
                setActive(nav.title)
               }}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
        </ul>
            
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
