import React, { useState } from "react";
import { svgPacket } from "../../svgPacket";
import { AnimatePresence, motion } from "framer-motion";
import { resultCardChildContainerConfig } from "../utils/motionConfig";
import { highlightText } from "../utils/constantFunction";

const ResultCard = ({ type, data, searchQuery, index }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [message, setMessage] = useState("Copy link");
  const [isHovered, setIsHovered] = useState(false);

  const handleLinkCopiedAnimation = () => {
    setIsCopied(true);
    setMessage("Link copied!");

    setTimeout(() => {
      setIsCopied(false);
      setMessage("Copy link");
    }, 2000);
  };

  const showTooltip = isHovered || isCopied;

  return (
    <motion.div custom={index} variants={resultCardChildContainerConfig} initial="hidden" animate="show" exit="hidden" className="result__card">
      {/* fileicons section for type=== all files  */}
      {type !== "person" && <div className="result__card--imageSection">{svgPacket[`${data?.fileType}FileIcon`]}</div>}

      {/* --- Profile Image Section with Status - type===person */}
      {type === "person" && (
        <div className="imageSection__wrapper">
          <div className="imageSection__container">
            <img src={data?.avatar} alt={`${data?.name} profile image`} className="profile__image" />
          </div>
          <div className={`status__${data?.status}`}></div>
        </div>
      )}

      {/* meta data for type === person */}
      {type === "person" && (
        <div className="result__card--infoDetails">
          <p className="heading">{highlightText(data?.name, searchQuery)}</p>
          <span className="subHeading">{data?.lastActive === "Unactivated" ? `${data?.lastActive}` : `Active ${data?.lastActive}`}</span>
        </div>
      )}

      {/* meta data for files type === all files */}
      {type !== "person" && (
        <div className="result__card--infoDetails">
          <div className="result__header">
            <p className="heading">{highlightText(data?.name, searchQuery)}</p>
            {data?.type === "folder" && <label className="counter__container">{`${data?.fileCount} files`}</label>}
          </div>
          <div className="subHeading result__meta">{`in ${data?.category} • ${data?.edited}`}</div>
        </div>
      )}
      <div className="links__container">
        <button
          onMouseEnter={() => setIsHovered(true)}
          onClick={handleLinkCopiedAnimation}
          onMouseLeave={() => {
            setIsHovered(false);
          }}
          type="button"
          className="copy__link--button"
        >
          {svgPacket["copyToLinkIcon"]}

          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{
                  duration: 0.4,
                  scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
                }}
                className="link__copied--container"
              >
                {message !== "Copy link" && <span>{svgPacket["checkIcon"]}</span>}
                <p>{message}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
        <button type="button" className="newTab__link--button">
          {svgPacket["newTabLinkIcon"]}
          <span className="subHeading">New Tab</span>
        </button>
      </div>
    </motion.div>
  );
};

export default ResultCard;
