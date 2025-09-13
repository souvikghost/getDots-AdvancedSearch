import React from "react";
import { svgPacket } from "../../svgPacket";
import Loader from "./Loader";
const InputBox = ({ inputSearchValue, setInputSearchValue, isLoading }) => {
  const handleChange = (e) => {
    const { value } = e.target;
    setInputSearchValue(value?.trim());
  };

  const handleClear = () => {
    if (inputSearchValue) {
      setInputSearchValue("");
    }
  };

  return (
    <div className="input__box--container">
      {!isLoading ? (<span className="search__svg--container">{svgPacket["searchIcon"]}</span>):
      (<Loader/>)}
      <input type="text" placeholder="Searching is easier" className="input__box" value={inputSearchValue} onChange={handleChange} />
      <button type="button" onClick={handleClear} className="clear__button">
        Clear
      </button>
    </div>
  );
};

export default InputBox;
