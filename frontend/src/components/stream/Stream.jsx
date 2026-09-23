import React from "react";
import "./Stream.css";
import translations from "../../translator";
const Stream = ({
  currentState,
  setCurrentState,
  analysesData,
  setAnalysesData,
  language,
}) => {
  const t = translations[language];
  return (
    <div>
      {analysesData.educationaLevel == "high school" &&
        analysesData.academicYear == "1AS" && (
          <div className={"ASContaine"}>
            <div
              className={`primaryCore${analysesData.stream == "common core science" ? "active" : ""}`}
              onClick={(e) =>
                setAnalysesData({
                  ...analysesData,
                  stream: "common core science",
                })
              }
            >
              {t.commonCoreScienceTechnology}
              {analysesData.stream == "common core science" && (
                <div className="tickiconContainer">
                  <i class="fa-solid fa-check fa-sm"></i>{" "}
                </div>
              )}
            </div>
            <div
              className={`primaryCore${analysesData.stream == "common core literature" ? "active" : ""}`}
              onClick={(e) =>
                setAnalysesData({
                  ...analysesData,
                  stream: "common core literature",
                })
              }
            >
              {t.commonCoreLiteraturePhilosophy}
              {analysesData.stream == "common core literature" && (
                <div className="tickiconContainer">
                  <i class="fa-solid fa-check fa-sm"></i>{" "}
                </div>
              )}
            </div>
          </div>
        )}
      {analysesData.educationaLevel == "high school" &&
        analysesData.academicYear !== "1AS" && (
          <div className="ASContaine">
            <div
              className={`primaryCore${analysesData.stream == "science" ? "active" : ""}`}
              onClick={(e) =>
                setAnalysesData({ ...analysesData, stream: "science" })
              }
            >
              {t.science}
              {analysesData.stream == "science" && (
                <div className="tickiconContainer">
                  <i class="fa-solid fa-check fa-sm"></i>{" "}
                </div>
              )}
            </div>
            <div
              className={`primaryCore${analysesData.stream == "math" ? "active" : ""}`}
              onClick={(e) =>
                setAnalysesData({ ...analysesData, stream: "math" })
              }
            >
              {t.math}
              {analysesData.stream == "math" && (
                <div className="tickiconContainer">
                  <i class="fa-solid fa-check fa-sm"></i>{" "}
                </div>
              )}
            </div>
            <div
              className={`primaryCore${analysesData.stream == "technique math" ? "active" : ""}`}
              onClick={(e) =>
                setAnalysesData({ ...analysesData, stream: "technique math" })
              }
            >
              {t.techniqueMath}
              {analysesData.stream == "technique math" && (
                <div className="tickiconContainer">
                  <i class="fa-solid fa-check fa-sm"></i>{" "}
                </div>
              )}
            </div>
            <div
              className={`primaryCore${analysesData.stream == "economics" ? "active" : ""}`}
              onClick={(e) =>
                setAnalysesData({ ...analysesData, stream: "economics" })
              }
            >
              {t.managementEconomics}
              {analysesData.stream == "economics" && (
                <div className="tickiconContainer">
                  <i class="fa-solid fa-check fa-sm"></i>{" "}
                </div>
              )}
            </div>
            <div
              className={`primaryCore${analysesData.stream == "languages" ? "active" : ""}`}
              onClick={(e) =>
                setAnalysesData({ ...analysesData, stream: "languages" })
              }
            >
              {t.languages}
              {analysesData.stream == "languages" && (
                <div className="tickiconContainer">
                  <i class="fa-solid fa-check fa-sm"></i>{" "}
                </div>
              )}
            </div>
            <div
              className={`primaryCore${analysesData.stream == "philosophy" ? "active" : ""}`}
              onClick={(e) =>
                setAnalysesData({ ...analysesData, stream: "philosophy" })
              }
            >
              {t.literaturePhilosophy}
              {analysesData.stream == "philosophy" && (
                <div className="tickiconContainer">
                  <i class="fa-solid fa-check fa-sm"></i>{" "}
                </div>
              )}
            </div>
            <div
              className={`primaryCore${analysesData.stream == "art" ? "active" : ""}`}
              onClick={(e) =>
                setAnalysesData({ ...analysesData, stream: "art" })
              }
            >
              {t.art}
              {analysesData.stream == "art" && (
                <div className="tickiconContainer">
                  <i class="fa-solid fa-check fa-sm"></i>{" "}
                </div>
              )}
            </div>
          </div>
        )}
      {/* <hr className="hrLine" /> */}
      <div className="fileUploaderFooter">
        <button
          className="previous"
          onClick={(e) => {
            setCurrentState(2);
            setAnalysesData({ ...analysesData, academicYear: null });
          }}
        >
          {language == "العربية" ? "→" : "←"} {t.previous}
        </button>

        <span>{t.stepOf.replace("{{current}}", 3)}</span>

        {analysesData.stream && (
          <button
            className="generateButton"
            onClick={(e) => setCurrentState(4)}
          >
            {t.next} {language == "العربية" ? "←" : "→"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Stream;
