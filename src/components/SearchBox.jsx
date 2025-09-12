import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { SearchBoxConfig } from "../utils/motionConfig";
import InputBox from "./InputBox";
import ResultSection from "./ResultSection";

const SearchBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  

  return (
    <>
      <AnimatePresence>
        <motion.div onClick={() => setIsOpen(!isOpen)} variants={SearchBoxConfig} initial="close" animate={isOpen ? "open" : "close"} exit="close" transition={{ type: "spring", stiffness: 100, damping: 20 }} className="search__box">
            <InputBox/>
            <ResultSection/>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default SearchBox;
