import React from "react";
import "./Onerecentwork.css";
import translations from "../../translator";
import { useNavigate } from "react-router-dom";
const Onerecentwork = ({ analyse, language }) => {
  const t = translations[language];
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
  const academicYearFormat = (dateString) => {
  const date = new Date(dateString);

  const month = date.getMonth() + 1; // getMonth() starts from 0
  const year = date.getFullYear();

  if (month >= 8) {
    return `${year}/${year + 1}`;
  } else {
    return `${year - 1}/${year}`;
  }
};
  return (
    <div className="OnerecentworkContainer">
      <div className="insideOnerecentworkContainer">
        <div className="titleContainer" id="t1">
          <div className="fileiconContainer">
            <i class="fa-regular fa-copy"></i>
          </div>
          <p>
            {analyse.schoolYear} {t[analyse.stream]}
          </p>
        </div>
        <div className="titleContainer" id="t2">
          <p>{academicYearFormat(analyse.createdAt)}</p>
        </div>
        <div className="titleContainer" id="t3">
          <p>T{analyse.trimester}</p>
        </div>
        <div className="titleContainer" id="t4">
          <p>{analyse.result.overview.studentsNumber}</p>
        </div>
        <div className="titleContainer" id="t5">
          <div className="calendericonContainer">
            <i class="fa-regular fa-calendar"></i>
          </div>
          <p>{formatDate(analyse.createdAt)}</p>
        </div>
        <div className="titleContainer" id="t6">
          <button onClick={(e) => navigate(`/analyses/${analyse._id}`)}>
            {t.open}
            {language == "العربية" ? (
              <i class="fa-solid fa-arrow-left-long"></i>
            ) : (
              <i class="fa-solid fa-arrow-right-long"></i>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onerecentwork;
