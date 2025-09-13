import React from "react";
import { svgPacket } from "../../svgPacket";
import { motion } from "framer-motion";
import { resultCardChildContainerConfig } from "../utils/motionConfig";


const ResultCard = ({ type, data }) => {

  return (
    <motion.div variants={resultCardChildContainerConfig} key={data?.id} className="result__card">
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
          <p className="heading">{data?.name}</p>
          <span className="subHeading">{data?.lastActive === "Unactivated" ? `${data?.lastActive}` : `Active ${data?.lastActive}`}</span>
        </div>
      )}

      {/* meta data for files type === all files */}
      {type !== "person" && (
        <div className="result__card--infoDetails">
          <div className="result__header">
            <p className="heading">{data?.name}</p>
            {data?.type === "folder" && <label className="counter__container">{data?.fileCount}</label>}
          </div>
          <div className="subHeading result__meta">{`in ${data?.category} • ${data?.edited}`}</div>
        </div>
      )}
      <div className="links__container">
        <button type="button" className="copy__link--button">{svgPacket["copyToLinkIcon"]}</button>
        <button type="button" className="newTab__link--button">{svgPacket["newTabLinkIcon"]}
          <span className="subHeading">New Tab</span>
        </button>
      </div>
    </motion.div>
  );
};

export default ResultCard;
