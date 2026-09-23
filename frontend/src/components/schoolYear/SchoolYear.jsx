import React from "react";
import "./SchoolYear.css";
import translations from "../../translator";
const SchoolYear = ({
  currentState,
  setCurrentState,
  analysesData,
  setAnalysesData,
  language
}) => {
  const t=translations[language]
  return (
    <div className="mainShcoolYearContainer">
      <div className="yearsContainer">
        {analysesData.educationaLevel == "middle school" && (
          <div className="middleSchoolYears">
            <p
              onClick={(e) =>
                setAnalysesData({ ...analysesData, academicYear: "1AM" })
              }
              className={`schoolYear${analysesData.academicYear == "1AM" ? "active" : ""}`}
            >
              1AM
            </p>
            <p
              onClick={(e) =>
                setAnalysesData({ ...analysesData, academicYear: "2AM" })
              }
              className={`schoolYear${analysesData.academicYear == "2AM" ? "active" : ""}`}
            >
              2AM
            </p>
            <p
              onClick={(e) =>
                setAnalysesData({ ...analysesData, academicYear: "3AM" })
              }
              className={`schoolYear${analysesData.academicYear == "3AM" ? "active" : ""}`}
            >
              3AM
            </p>
            <p
              onClick={(e) =>
                setAnalysesData({ ...analysesData, academicYear: "4AM" })
              }
              className={`schoolYear${analysesData.academicYear == "4AM" ? "active" : ""}`}
            >
              4AM
            </p>
          </div>
        )}
        {analysesData.educationaLevel == "high school" && (
          <div className="highSchoolYears">
            <p
              onClick={(e) =>
                setAnalysesData({ ...analysesData, academicYear: "1AS" })
              }
              className={`schoolYear${analysesData.academicYear == "1AS" ? "active" : ""}`}
            >
              1AS
            </p>
            <p
              onClick={(e) =>
                setAnalysesData({ ...analysesData, academicYear: "2AS" })
              }
              className={`schoolYear${analysesData.academicYear == "2AS" ? "active" : ""}`}
            >
              2AS
            </p>
            <p
              onClick={(e) =>
                setAnalysesData({ ...analysesData, academicYear: "3AS" })
              }
              className={`schoolYear${analysesData.academicYear == "3AS" ? "active" : ""}`}
            >
              3AS
            </p>
          </div>
        )}
      </div>
      {/* <hr className="hrLine" /> */}
      <div className="fileUploaderFooter">
        <button
          className="previous"
          onClick={(e) => {
            setAnalysesData({ ...analysesData, educationaLevel: null });
            setCurrentState(1);
          }}
        >
          {language == "العربية" ? "→" : "←"} {t.previous}
        </button>

        <span>{t.stepOf.replace("{{current}}", 2)} </span>

        {analysesData.academicYear && (
          <button
            className="generateButton"
            onClick={(e) =>
              analysesData.educationaLevel == "high school"
                ? setCurrentState(3)
                : setCurrentState(4)
            }
          >
            {t.next} {language == "العربية" ? "←" : "→"}
          </button>
        )}
      </div>
    </div>
  );
};

export default SchoolYear;
