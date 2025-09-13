import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { SearchBoxConfig } from "../utils/motionConfig";
import InputBox from "./InputBox";
import ResultSection from "./ResultSection";
import { useDebounce } from "../hooks/useDebounce.js";
import dummyData from "../../dummyData.json";

const SearchBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputSearchValue, setInputSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchDataLoading, setIsFetchDataLoading] = useState(false);
  const [dataSet, setDataSet] = useState([]);
  const [dataSetAfterFilter, setDataSetAfterFilter] = useState([]);

  // ---- Applied Debounce here
  const debouncedSearchValue = useDebounce(inputSearchValue, 300);

  const filterData = () => {
    if (debouncedSearchValue === "") return;

    const filterData = dataSet?.length > 0 && dataSet.filter((item) => item?.name?.toLowerCase()?.includes(debouncedSearchValue?.toLowerCase()));
    if (filterData?.length > 0) {
      setDataSetAfterFilter(filterData);
      setIsOpen(true);
    } else {
    }
  };

  useEffect(() => {
    setDataSet(dummyData.suggestions);
    setDataSetAfterFilter(dummyData.suggestions);
  }, []);

  useEffect(() => {
    if (debouncedSearchValue) {
      filterData();
    } else {
      setDataSetAfterFilter(dummyData.suggestions);
      setIsOpen(false);
    }
  }, [debouncedSearchValue]);

  return (
    <>
      <AnimatePresence>
        <motion.div variants={SearchBoxConfig} initial="close" animate={isOpen ? "open" : "close"} exit="close" transition={{ type: "spring", stiffness: 100, damping: 20 }} className="search__box">
          <InputBox isLoading={isLoading} inputSearchValue={inputSearchValue} setInputSearchValue={setInputSearchValue} />
          {isOpen && <ResultSection isFetchDataLoading={isFetchDataLoading} data={dataSetAfterFilter} />}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default SearchBox;
