import React from "react";
import { svgPacket } from "../../svgPacket";
import Loader from "./Loader"
const InputBox = () => {
  return (
    <div className="input__box--container">
      <span className="search__svg--container">{svgPacket["searchIcon"]}</span>
      {/* <Loader/> */}
      <input type="text" placeholder="Searching is easier" className="input__box"/>
      <button className="clear__button">Clear</button>
    </div>
  );
};

export default InputBox;
