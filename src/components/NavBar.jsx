import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { bagImg, searchImg, logoImg } from "../utils";
import { navLists } from "../constants";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const dropdownVariants = {
  hidden: {
    opacity: 0,
    y: -10,
    pointerEvents: "none",
    transition: { duration: 0.2 }
  },
  visible: {
    opacity: 1,
    y: 0,
    pointerEvents: "auto",
    transition: { duration: 0.3 }
  }
};

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [collections, setCollections] = useState([]);
  const [hoveredNav, setHoveredNav] = useState(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/collections");
        setCollections(res.data);
      } catch (err) {
        console.error("Failed to fetch collections", err);
      }
    };
    fetchCollections();
  }, []);

  return (
  <header className="fixed z-50 flex items-center justify-between w-[75%] px-5 py-1 shadow-md top-3 left-1/2 -translate-x-1/2 sm:px-10 bg-slate-500">
      <nav className="flex w-full screen-max-width">
        <Link to="/" onClick={() => setIsMenuOpen(false)}>
          <img src={logoImg} alt="Logo" width={50} height={50} />
        </Link>

        <nav className="justify-center flex-1 hidden sm:flex">
          {navLists.map((nav) => {
            const isDropdown = nav === "GiftCards" || nav === "Games" || nav === "Softwares";
            const dropdownItems = collections.filter(
              (item) =>
                (nav === "GiftCards" && item.collection_id === 1) ||
                (nav === "Games" && item.collection_id === 2) ||
                (nav === "Softwares" && item.collection_id === 3)
            );

            return (
              <div
                key={nav}
                className="relative px-5 py-3 group"
                onMouseEnter={() => setHoveredNav(nav)}
                onMouseLeave={() => setHoveredNav(null)}
              >
                <Link
                  to={`/${nav.toLowerCase().replace(/\s/g, "")}`}
                  className="relative flex items-center gap-1 text-lg text-gray-300 transition duration-300 hover:text-white group"
                >
                  {nav || "Home"}
                  {isDropdown && <FiChevronDown className="mt-1 text-sm" />}
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
                </Link>

                <AnimatePresence>
                  {isDropdown && hoveredNav === nav && (
                    <motion.div
                      key="dropdown"
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="absolute left-0 z-50 w-56 mt-3 overflow-hidden bg-gray-900 shadow-xl rounded-xl ring-1 ring-gray-800"
                    >
                      {dropdownItems.map((item) => (
                        <Link
                        key={item.group_id}
                        to={`/games/${item.group_id}`}
                        className="block px-5 py-3 text-base font-semibold text-white transition duration-300 ease-in-out border-l-4 border-transparent hover:bg-gradient-to-r hover:from-gray-800 hover:to-gray-700 hover:text-white hover:border-indigo-500"
                      >
                        {item.name}
                      </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-7">
          <img src={searchImg} alt="search" width={18} height={18} />
          <img src={bagImg} alt="bag" width={18} height={18} />
          {/* <img
            src={searchImg}
            alt="Search"
            width={18}
            height={18}
            className="cursor-pointer"
          />
          <img
            src={bagImg}
            alt="Cart"
            width={18}
            height={18}
            className="cursor-pointer"
          /> */}
          <button
            className="text-2xl text-white sm:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      <div
        className={`fixed top-0 left-0 w-full h-screen bg-black text-white flex flex-col items-center justify-center transition-transform duration-300 ${
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        } sm:hidden`}
      >
        <button
          className="absolute text-3xl top-5 right-5"
          onClick={() => setIsMenuOpen(false)}
        >
          <FiX />
        </button>

        {navLists.map((nav) => (
          <Link
            key={nav}
            to={`/${nav.toLowerCase().replace(/\s/g, "")}`}
            className="py-3 text-xl"
            onClick={() => setIsMenuOpen(false)}
          >
            {nav || "Home"}
          </Link>
        ))}
      </div>
    </header>
  );
};

export default NavBar;
