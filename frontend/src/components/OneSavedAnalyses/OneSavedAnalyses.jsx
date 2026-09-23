import React, { useEffect, useRef, useState } from "react";
import "./OneSavedAnalyses.css";
import DropDown from "../dropDown/DropDown";
import translations from "../../translator";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../../config/api";
const OneSavedAnalyses = ({ language, analyse, getAllAnalyses }) => {
  const t = translations[language];
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [isDeleting,setIsDeleting]=useState(false)
  const dropDownRef = useRef(null);
  const navigate = useNavigate();
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const datePart = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    const timePart = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return `${datePart} · ${timePart}`;
  };
  const renameAnalyse = async (newAnalyseName) => {
    try {
      const result = await axios.put(
        `${API_URL}/api/edit/rename/${analyse._id}`,
        { name: newAnalyseName },
      );
      await getAllAnalyses();
      alert(result.data.msg);
    } catch (error) {
      alert(error.response.error);
    }
  };
  const deleteAnalyse = async () => {
    setIsDeleting(true)
    try {
      const result = await axios.delete(
        `${API_URL}/api/edit/delete/${analyse._id}`,
      );
      await getAllAnalyses();
      setDropDownOpen(false);
      setIsDeleting(false)
      alert(result.data.msg);
    } catch (error) {
      alert(error.response);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setDropDownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="cardContainer">
      {/* ================= Header ================= */}
      <div className="cardHeader">
        <div className="cardTitleInfoContainer">
          <div className="cardLogoContainer">
            <i className="fa-solid fa-graduation-cap"></i>
          </div>

          <div className="cardTitleSubContainer">
            <h3>{t.analysisOfResults}</h3>

            <p className="analysisName">{analyse.name}</p>

            <div className="classInfo">
              <span>{t[analyse.educationalLevel]}</span>
              <span className="infoDot">•</span>
              <span>{analyse.schoolYear} {t[analyse.stream]}</span>
            </div>
          </div>
        </div>

        <div className="settingWrapper" ref={dropDownRef}>
          <button
            type="button"
            className="cardSettingsContainer"
            onClick={() => setDropDownOpen(!dropDownOpen)}
            aria-label="Analysis settings"
          >
            <i className="fa-solid fa-ellipsis-vertical"></i>
          </button>

          {dropDownOpen && (
            <DropDown
              dropDownOpen={dropDownOpen}
              setDropDownOpen={setDropDownOpen}
              language={language}
              renameAnalyse={renameAnalyse}
              deleteAnalyse={deleteAnalyse}
              isDeleting={isDeleting}
            />
          )}
        </div>
      </div>

      {/* ================= Badge ================= */}
      <div className="cardBadgeRow">
        <div className="trimesterBadge">
          <i className="fa-regular fa-calendar"></i>
          <span>
            {t.trimester} {analyse.trimester}
          </span>
        </div>

        <div className="statusBadge">
          <span className="statusDot"></span>
          <span>{t.completed}</span>
        </div>
      </div>

      {/* ================= Statistics ================= */}
      <div className="cardStatistics">
        <div className="statisticItem">
          <div className="statisticIcon studentsIcon">
            <i className="fa-solid fa-users"></i>
          </div>

          <div className="statisticContent">
            <span className="statisticValue">
              {analyse.result.overview.studentsNumber}
            </span>
            <span className="statisticLabel">{t.student}</span>
          </div>
        </div>

        <div className="statisticDivider"></div>

        <div className="statisticItem">
          <div className="statisticIcon averageIcon">
            <i className="fa-solid fa-gauge-high"></i>
          </div>

          <div className="statisticContent">
            <span className="statisticValue">
              {analyse.result.overview.classAverage}
            </span>
            <span className="statisticLabel">{t.average}</span>
          </div>
        </div>

        <div className="statisticDivider"></div>

        <div className="statisticItem">
          <div className="statisticIcon successIcon">
            <i className="fa-solid fa-trophy"></i>
          </div>

          <div className="statisticContent">
            <span className="statisticValue">
              {analyse.result.overview.success.rate.toFixed(2)}%
            </span>
            <span className="statisticLabel">{t.success}</span>
          </div>
        </div>
      </div>

      {/* ================= Footer ================= */}
      <div className="cardFooter">
        <div className="createdContainer">
          <i className="fa-regular fa-clock"></i>

          <div className="createdText">
            <span className="createdLabel">{t.createdOn}</span>
            <span className="createdDate">{formatDate(analyse.createdAt)}</span>
          </div>
        </div>

        <button
          type="button"
          className="viewAnalysisButton"
          onClick={(e) => {
            navigate(`/analyses/${analyse._id}`);
          }}
        >
          <span>{t.viewAnalysis}</span>
          <i className="fa-solid fa-arrow-up-right-from-square"></i>
        </button>
      </div>
    </div>
  );
};

export default OneSavedAnalyses;
