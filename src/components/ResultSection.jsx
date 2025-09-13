import React, { useRef, useState } from "react";
import { svgPacket } from "../../svgPacket";
import ResultCard from "./ResultCard";
import { filterData } from "../utils/filterData";
import { AnimatePresence, motion } from "framer-motion";
import { filterPopUpChildConfig, filterPopUpContainerConfig, resultCardContainerConfig } from "../utils/motionConfig.js";
import { useOutsideClick } from "../hooks/useOutsideClick.js";
import ShimmerCard from "./ShimmerCard.jsx";

const ResultSection = ({ data, isFetchDataLoading }) => {
  const [filterPopUpIsOpen, setFilterPopUpIsOpen] = useState(false);
  const filterPopUpContainerRef = useRef(null);

  useOutsideClick({ ref: filterPopUpContainerRef, cb: () => setFilterPopUpIsOpen(false) });

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
            <motion.div ref={filterPopUpContainerRef} style={{ transformOrigin: "top" }} initial="close" animate={filterPopUpIsOpen ? "open" : "close"} exit="close" variants={filterPopUpContainerConfig} className="filter__tab--popUpContainer">
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
      <motion.div variants={resultCardContainerConfig} initial="hidden" animate="show" id="style-4" className="result__card--container">
        {isFetchDataLoading ? (
          <div className="shimmer__card--container">
            {Array.from({ length: 6 }).map((_, index) => {
              return <ShimmerCard key={index}/>;
            })}
          </div>
        ) : (
          data?.length > 0 &&
          data.map((item) => {
            return <ResultCard key={item.id} type={item?.type} data={item} />;
          })
        )}

        {/*  <div className="shimmer__card--container">
            {Array.from({length:6}).map((_,index)=>{
              return(
                <ShimmerCard/>
              )
            })}
          </div> */}
      </motion.div>
    </div>
  );
};

export default ResultSection;
