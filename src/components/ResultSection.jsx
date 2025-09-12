import React, { useState } from "react";
import { svgPacket } from "../../svgPacket";
import ResultCard from "./ResultCard";
import { filterData } from "../utils/filterData";
import { AnimatePresence, motion } from "framer-motion";
import { filterPopUpChildConfig, filterPopUpContainerConfig } from "../utils/motionConfig.js";

const ResultSection = () => {
  const [filterPopUpIsOpen, setFilterPopUpIsOpen] = useState(false);

  return (
    <div className="result__container">
      <div className="filter__tab--container">
        <div className="filter__tab--buttonsContainer">
          <button type="button" className="filter__tab--button tab--active">
            <span className="filter__tab--buttonHeading">All</span>
            <label className="counter__container">7</label>
          </button>
          <button type="button" className="filter__tab--button">
            <label className="filter__tab--buttonHeading">
              {svgPacket["peopleIcon"]}
              <span>People</span>
            </label>
            <label className="counter__container">7</label>
          </button>
          <button type="button" className="filter__tab--button">
            <label className="filter__tab--buttonHeading">
              {svgPacket["messageIcon"]}
              <span>Chats</span>
            </label>
            <label className="counter__container">12</label>
          </button>
          <button type="button" className="filter__tab--button">
            <label className="filter__tab--buttonHeading">
              {svgPacket["listIcon"]}
              <span>Lists</span>
            </label>
            <label className="counter__container">12</label>
          </button>
        </div>
        <AnimatePresence>
          <motion.button initial={{ rotate: 0 }} animate={{ rotate: filterPopUpIsOpen ? 90 : 0 }} exit={{ rotate: 0 }} transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }} type="button" onClick={() => setFilterPopUpIsOpen(!filterPopUpIsOpen)} className="settings__filter--button">
            {svgPacket["settingsIcon"]}
          </motion.button>
        </AnimatePresence>
        <AnimatePresence>
          {filterPopUpIsOpen && (
            <motion.div style={{ transformOrigin: "top" }} initial="close" animate={filterPopUpIsOpen ? "open" : "close"} exit="close" variants={filterPopUpContainerConfig} className="filter__tab--popUpContainer">
              {Object.values(filterData).map((item) => {
                return (
                  <motion.div variants={filterPopUpChildConfig} className="filter__tab--list" key={item.id}>
                    <div className="filter__tab--listLeftSection">
                      {item.icon}
                      <p className="filter__tab--buttonHeading">{item.name}</p>
                    </div>
                    <div className="filter__tab--listRightSection">
                      <label className="switch">
                        <input type="checkbox" name={item.value} value={item.value} />
                        <span className="slider"></span>
                      </label>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* result cards */}
      <div className="result__card--container">
        <ResultCard type={"person"} />
        <ResultCard type={"files"} />
      </div>
    </div>
  );
};

export default ResultSection;
