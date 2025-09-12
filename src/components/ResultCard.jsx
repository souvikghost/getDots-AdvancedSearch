import React from "react";
import { svgPacket } from "../../svgPacket";

const ResultCard = ({ type, data }) => {
  return (
    <div className="result__card">
      {/* fileicons section for type=== all files  */}
      {type !== "person" && <div className="result__card--imageSection">{svgPacket["videoFileIcon"]}</div>}

      {/* --- Profile Image Section with Status - type===person */}
      {type === "person" && (
        <div className="imageSection__wrapper">
          <div className="imageSection__container">
            <img src="https://avatars.githubusercontent.com/u/145422565?v=4" alt="Souvik profile image" className="profile__image" />
          </div>
          <div className="status__inactive"></div>
        </div>
      )}

      {/* meta data for type === person */}
      {type === "person" && (
        <div className="result__card--infoDetails">
          <p className="heading">Souvik Ghosh</p>
          <span className="subHeading">Deactivated</span>
        </div>
      )}

      {/* meta data for files type === all files */}
      {type !== "person" && (
        <div className="result__card--infoDetails">
          <div className="result__header">
            <p className="heading">Dribble Folder</p>
            <label className="counter__container">12</label>
          </div>
          <div className="subHeading result__meta">{`in Presentations • Edited 1w ago`}</div>
        </div>
      )}
    </div>
  );
};

export default ResultCard;
