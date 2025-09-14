import React, { useEffect, useRef, useState } from "react";
import { svgPacket } from "../../svgPacket";
import Loader from "./Loader";
const InputBox = ({ isOpen, inputSearchValue, setInputSearchValue, isLoading }) => {
  const inputRef = useRef(null);
  const handleChange = (e) => {
    const { value } = e.target;
    setInputSearchValue(value?.trim());
  };

  const handleClear = () => {
    if (inputSearchValue) {
      setInputSearchValue("");
    }
  };

  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      // for Windows - WIN32
      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;

      // ctrl + s or for Mac cmd + s
      if (cmdOrCtrl && e.key.toLowerCase() === "s") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  return (
    <div className="input__box--container">
      {!isLoading ? <span className="search__svg--container">{svgPacket["searchIcon"]}</span> : <Loader />}
      <input ref={inputRef} type="text" name="usersearch" placeholder="Searching is easier" className="input__box" value={inputSearchValue} onChange={handleChange} />
      {isOpen ? (
        <button type="button" onClick={handleClear} className="clear__button">
          Clear
        </button>
      ) : (
        <div className="input__box--quickAccess">
          <div className="quickAccess__container subHeading__placeholder--inputBox ">
            <span>s</span>
            <div className="quickAccess__container--two">s</div>
          </div>
          <p className="subHeading__placeholder--inputBox ">quick access</p>
        </div>
      )}
    </div>
  );
};

export default InputBox;
