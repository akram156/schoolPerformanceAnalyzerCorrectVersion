import React from "react";
import "./Trimester.css";
import translations from "../../translator";
const Trimester = ({
  currentState,
  setCurrentState,
  analysesData,
  setAnalysesData,
  language,
}) => {
  const t = translations[language];
  return (
    <div className="maintrimesterContainer">
      <div className="trimesterContainer">
        <div
          className={`trimester${analysesData.trimester == "1" ? "active" : ""}`}
          onClick={(e) =>
            setAnalysesData({
              ...analysesData,
              trimester: "1",
            })
          }
        >
          {t.firstTrimester}
        </div>
        <div
          className={`trimester${analysesData.trimester == "2" ? "active" : ""}`}
          onClick={(e) =>
            setAnalysesData({
              ...analysesData,
              trimester: "2",
            })
          }
        >
          {t.secondTrimester}
        </div>
        <div
          className={`trimester${analysesData.trimester == "3" ? "active" : ""}`}
          onClick={(e) =>
            setAnalysesData({
              ...analysesData,
              trimester: "3",
            })
          }
        >
          {t.thirdTrimester}
        </div>
      </div>
      {/* <hr className="hrLine" /> */}
      <div className="fileUploaderFooter">
        <button
          className="previous"
          onClick={(e) => {
            analysesData.educationaLevel == "high school"
              ? setCurrentState(3)
              : setCurrentState(2);
            analysesData.educationaLevel == "high school"
              ? setAnalysesData({ ...analysesData, stream: null })
              : setAnalysesData({ ...analysesData, academicYear: null });
          }}
        >
          {language == "العربية" ? "→" : "←"} {t.previous}
        </button>

        <span>{t.stepOf.replace("{{current}}", 4)}</span>

        {analysesData.trimester && (
          <button
            className="generateButton"
            onClick={(e) => setCurrentState(5)}
          >
            {t.next} {language == "العربية" ? "←" : "→"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Trimester;
