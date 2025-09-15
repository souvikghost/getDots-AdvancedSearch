import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { SearchBoxConfig } from "../utils/motionConfig";
import InputBox from "./InputBox";
import ResultSection from "./ResultSection";
import { useDebounce } from "../hooks/useDebounce.js";
import dummyData from "../../dummyData.json";
import { filterData } from "../utils/filterData.jsx";

const SearchBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputSearchValue, setInputSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchDataLoading, setIsFetchDataLoading] = useState(false);
  const [dataSet, setDataSet] = useState([]);
  const [dataSetAfterFilter, setDataSetAfterFilter] = useState([]);
  const [filterTab, setFilterTab] = useState(filterData);
  const [copyAfterSearchedData, setCopyAfterSearchedData] = useState([]);

  // ---- Applied Debounce here
  const debouncedSearchValue = useDebounce(inputSearchValue, 300);

  const handlefilterData = async () => {
    if (debouncedSearchValue === "") return;
    setIsLoading(true);
    setIsFetchDataLoading(true);

    let filtered = dataSet;
    setIsOpen(filtered?.length > 0);
    console.log(filtered?.length);

    // apply search if exists
    if (debouncedSearchValue) {
      await new Promise((resolve) => {
        // Simulating API kind of response to show the Loader & Shimmer UI
        setTimeout(() => {
          filtered = dataSet.filter((item) => item?.name?.toLowerCase()?.includes(debouncedSearchValue?.toLowerCase()));
          if(filtered?.length>0){
            setDataSetAfterFilter(filtered);
            setCopyAfterSearchedData(filtered);
          }else{
            handleAllClear()
          }

          resolve(filtered);
        }, 1500);
      });
    }

    if (filtered?.length > 0) {
      handleDataCount(filtered);
    }

    setIsLoading(false);
    setIsFetchDataLoading(false);
  };

  const handleAllClear = () => {
    setDataSetAfterFilter([]);
    setCopyAfterSearchedData([]);

    setFilterTab((prev) =>
      Object.keys(prev).reduce((acc, key) => {
        acc[key] = {
          ...prev[key],
          count: 0, 
          isHighlighted: key === "all", 
        };
        return acc;
      }, {})
    );
  };

  // --- For Tabs like -> All/Chats/People
  const handleFilterDataBasedOnWhichTabIsActive = async () => {
    Object.entries(filterTab).forEach(([key, value]) => {
      const isActive = value.isHighlighted;

      if (isActive) {
        const filtered = copyAfterSearchedData.filter((item) => item?.keywords?.includes(key));
        setDataSetAfterFilter(filtered);
      }
    });
  };

  // ---- handle FileCount and update in UI
  const handleDataCount = (filterData) => {
    if (filterData?.length > 0) {
      const obj = {
        all: filterData?.length,
        chats: 0,
        files: 0,
        lists: 0,
        people: 0,
      };
      filterData.forEach((element) => {
        const type = element?.type;
        switch (type) {
          case "person":
            obj.people++;
            obj.chats++;
            break;
          case "file":
            obj.files++;
            break;
          case "folder":
            obj.lists += element.fileCount || 0;
            obj.files++;
            break;
          default:
            break;
        }
      });

      Object.entries(obj).forEach(([key, value]) => {
        setFilterTab((prev) => ({
          ...prev,
          [key]: {
            ...prev[key],
            count: value > 0 ? value : 0,
          },
        }));
      });
    }
  };

  // ---- Function for any filter like Files/Chats/Lists
  const handleFilterTabChange = (e) => {
    const { id } = e.currentTarget;

    setFilterTab((prev) => {
      const updated = Object.keys(prev).reduce((acc, key) => {
        acc[key] = {
          ...prev[key],
          isHighlighted: false,
        };
        return acc;
      }, {});

      updated[id] = {
        ...updated[id],
        isHighlighted: true,
      };

      return updated;
    });
  };

  useEffect(() => {
    setDataSet(dummyData.suggestions);
    setDataSetAfterFilter(dummyData.suggestions);
  }, []);

  useEffect(() => {
    if (debouncedSearchValue) {
      handlefilterData();
    } else {
      setDataSetAfterFilter(dummyData.suggestions);
      setIsOpen(false);
      handleAllClear();
    }
  }, [debouncedSearchValue]);

  useEffect(() => {
    handleFilterDataBasedOnWhichTabIsActive();
  }, [filterTab]);

  return (
    <>
      <AnimatePresence>
        <motion.div key="searchBox" variants={SearchBoxConfig} initial="close" animate={isOpen ? "open" : "close"} exit="close" transition={{ type: "spring", stiffness: 100, damping: 20 }} className="search__box">
          <InputBox isOpen={isOpen} isLoading={isLoading} inputSearchValue={inputSearchValue} setInputSearchValue={setInputSearchValue} />
          {isOpen && <ResultSection handleFilterTabChange={handleFilterTabChange} setFilterData={setFilterTab} filterData={filterTab} isFetchDataLoading={isFetchDataLoading} data={dataSetAfterFilter} debouncedSearchValue={debouncedSearchValue} />}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default SearchBox;
