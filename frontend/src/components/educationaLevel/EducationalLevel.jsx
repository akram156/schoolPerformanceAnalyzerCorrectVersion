import React, { useState } from "react";
import "./EducationaLevel.css";
import translations from "../../translator";
const EducationalLevel = ({
  currentState,
  setCurrentState,
  setAnalysesData,
  analysesData,
  language,
}) => {
  const [middleSchoolClicke, setMiddleSchoolClicked] = useState(false);
  const [highSchoolClicke, setHighSchoolClicked] = useState(false);
  const t = translations[language];
  return (
    <div className="educationalLevelContainer">
      <div className="educationLevelTile">
        <h4 id="title">{t.educationalLevel}</h4>
        <p id="subtitle">{t.selectSchoolLevel}</p>
      </div>
      <div className="educationalLevelSelection">
        <div
          className={`middleSchoolContainer${middleSchoolClicke ? "active" : ""}`}
          onClick={(e) => {
            setHighSchoolClicked(false);
            setMiddleSchoolClicked(true);
            setAnalysesData({
              ...analysesData,
              educationaLevel: "middle school",
            });
          }}
        >
          <div className="middleSchoolLogo">
            <i class="fa-solid fa-school fa-xl "></i>
          </div>
          <h4>{t.middleSchool}</h4>
          <p>{t.middleSchoolGrades}</p>
          {middleSchoolClicke && (
            <div className="middleschooltickContainer">
              <i class="fa-solid fa-check fa-xs"></i>
            </div>
          )}
        </div>
        <div
          className={`HighSchoolContainer${highSchoolClicke ? "active" : ""}`}
          onClick={(e) => {
            setHighSchoolClicked(true);
            setMiddleSchoolClicked(false);
            setAnalysesData({
              ...analysesData,
              educationaLevel: "high school",
            });
          }}
        >
          <div className="HighSchoolLogo">
            <i class="fa-solid fa-building-columns fa-xl"></i>
          </div>
          <h4>{t.highSchool}</h4>
          <p>{t.highSchoolGrades}</p>
          {highSchoolClicke && (
            <div className="highschooltickContainer">
              <i class="fa-solid fa-check fa-xs"></i>
            </div>
          )}
        </div>
      </div>
      <hr />
      <div className="fileUploaderFooter">
        <button className="previous" disabled={true}>
          {language=='العربية'?"→":"←"} {t.previous}
        </button>

        <span>{t.stepOf.replace("{{current}}", 1)}</span>

        {analysesData.educationaLevel && (
          <button
            className="generateButton"
            onClick={(e) => setCurrentState(2)}
          >
            {t.next} {language=='العربية'?"←":"→"}
          </button>
        )}
      </div>
    </div>
  );
};

export default EducationalLevel;
