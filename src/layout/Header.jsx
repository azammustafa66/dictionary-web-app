import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import logo from "/assets/images/logo.svg";
import arrowDown from "/assets/images/icon-arrow-down.svg";
import iconMoon from "/assets/images/icon-moon.svg";
import { setFont } from "../../utils/fontSlice";
import { selectDarkMode, toggleDarkMode } from "../../utils/darkModeSlice";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [menuFont, setMenuFont] = useState("Serif");
  const dropdownRef = useRef();
  const buttonRef = useRef();
  const dispatch = useDispatch();
  const isDarkMode = useSelector(selectDarkMode);
  const textColour = isDarkMode ? "text-white" : "";

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="flex items-center justify-between gap-4 p-5 mb-2">
      <div>
        <a href="/">
          <img src={logo} alt="logo" className="w-7 h-8" />
        </a>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative inline-block text-left">
          <div>
            <button
              ref={buttonRef}
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`text-[#2D2D2D] rounded px-4 py-2 focus:outline-none focus:shadow-outline-black ${
                isDarkMode ? "text-white" : ""
              }`}
            >
              {menuFont}
              <img
                src={arrowDown}
                alt="arrow-down"
                className="inline-block ml-2"
              />
            </button>
          </div>

          {isDropdownOpen && (
            <div
              className={`origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg ${
                isDarkMode ? "bg-[#1f1f1f] custom-shadow" : "bg-white"
              } z-10`}
              ref={dropdownRef}
            >
              <div
                className="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <p
                  className={`block px-4 py-2 text-lg leading-5 text-[#2D2D2D] font-bold  hover:text-[#A445ED] cursor-pointer font-Inter ${textColour}
                  `}
                  role="menuitem"
                  onClick={(event) => {
                    dispatch(setFont("Inter"));
                    setMenuFont(event.target.textContent);
                  }}
                >
                  Serif
                </p>
                <p
                  className={`block px-4 py-2 text-lg leading-5 text-[#2D2D2D] font-bold  hover:text-[#A445ED] cursor-pointer font-Lora ${textColour}`}
                  role="menuitem"
                  onClick={(event) => {
                    dispatch(setFont("Lora"));
                    setMenuFont(event.target.textContent);
                  }}
                >
                  Sans
                </p>
                <p
                  className={`block px-4 py-2 text-lg leading-5 text-[#2D2D2D] font-bold  hover:text-[#A445ED] cursor-pointer font-Inconsolata ${textColour}`}
                  role="menuitem"
                  onClick={(event) => {
                    dispatch(setFont("Inconsolata"));
                    setMenuFont(event.target.textContent);
                  }}
                >
                  Mono
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="border-r border-[#E9E9E9]" />
        <div className="flex items-center gap-x-1">
          <label className="switch">
            <input
              type="checkbox"
              id="toggleBtn"
              onChange={() => dispatch(toggleDarkMode())}
            />
            <span className="slider"></span>
          </label>
          <img src={iconMoon} alt="dark-mode" />
        </div>
      </div>
    </nav>
  );
};

export default Header;
