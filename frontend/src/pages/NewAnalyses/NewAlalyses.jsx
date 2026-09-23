import React, { useState } from "react";
import axios from "axios";
import "./NewAnalyses.css";
import EducationalLevel from "../../components/educationaLevel/EducationalLevel";
import Stream from "../../components/stream/Stream";
import Trimester from "../../components/trimester/Trimester";
import FileUploader from "../../components/fileUploader/FileUploader";
import SchoolYear from "../../components/schoolYear/SchoolYear";
import translations from "../../translator";
import { useNavigate } from "react-router-dom";
import API_URL from "../../config/api";
const NewAlalyses = ({ language }) => {
  const [currentState, setCurrentState] = useState(1);
  const [analysesData, setAnalysesData] = useState({
    educationaLevel: null,
    academicYear: null,
    stream: null,
    trimester: null,
    file: null,
  });
  const t = translations[language];
  const [isGnerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();
  const handleAnalysesGeneration = async () => {
    setIsGenerating(true);
    try {
      const formData = new FormData();
      formData.append("educationalLevel", analysesData.educationaLevel);
      formData.append("academicYear", analysesData.academicYear);
      formData.append("stream", analysesData.stream);
      formData.append("trimester", analysesData.trimester);
      formData.append("file", analysesData.file);
      const token = localStorage.getItem("token");
      const result = await axios.post(
        `${API_URL}/api/analysis/newAnalysis`,
        formData,
        {
          headers: {
            authorization: token,
          },
        },
      );
      console.log("triggered");
      console.log(result.data);
      const analysisId = result.data.analysisId;
      navigate(`/analyses/${analysisId}`);
    } catch (error) {
      alert(error.response?.data.error);
    } finally {
      setIsGenerating(false);
    }
  };
  return (
    <div className="newanalysesContainer">
      <div className="insidenewanalysesContainer">
        <div className="topnewanalysesContainer">
          <h3>{t.newAnalyses}</h3>
          <p>{t.importExcelDescription}</p>
        </div>
        <div className="levelsContainer">
          <div className="stepContainer">
            <div className={`step${currentState == 1 ? "active" : ""}`}>1</div>
            <span className={`span${currentState == 1 ? "active" : ""}`}>
              {t.educationalLevel}
            </span>
          </div>

          <div className="stepLine"></div>
          <div className="stepContainer">
            <div className={`step${currentState == 2 ? "active" : ""}`}>2</div>
            <span className={`span${currentState == 2 ? "active" : ""}`}>
              {t.academicYearStep}
            </span>
          </div>
          <div className="stepLine"></div>
          <div className="stepContainer">
            <div className={`step${currentState == 3 ? "active" : ""}`}>3</div>
            <span className={`span${currentState == 3 ? "active" : ""}`}>
              {t.stream}
            </span>
          </div>
          <div className="stepLine"></div>
          <div className="stepContainer">
            <div className={`step${currentState == 4 ? "active" : ""}`}>4</div>
            <span className={`span${currentState == 4 ? "active" : ""}`}>
              {t.trimesterStep}
            </span>
          </div>
          <div className="stepLine"></div>
          <div className="stepContainer">
            <div className={`step${currentState == 5 ? "active" : ""}`}>5</div>
            <span className={`span${currentState == 5 ? "active" : ""}`}>
              {t.upload}
            </span>
          </div>
        </div>
        <div className="mainnewanalysesContainer">
          {currentState == 1 && (
            <EducationalLevel
              currentState={currentState}
              setCurrentState={setCurrentState}
              analysesData={analysesData}
              setAnalysesData={setAnalysesData}
              language={language}
            />
          )}
          {currentState == 2 && (
            <SchoolYear
              currentState={currentState}
              setCurrentState={setCurrentState}
              analysesData={analysesData}
              setAnalysesData={setAnalysesData}
              language={language}
            />
          )}
          {currentState == 3 && (
            <Stream
              currentState={currentState}
              setCurrentState={setCurrentState}
              analysesData={analysesData}
              setAnalysesData={setAnalysesData}
              language={language}
            />
          )}
          {currentState == 4 && (
            <Trimester
              currentState={currentState}
              setCurrentState={setCurrentState}
              analysesData={analysesData}
              setAnalysesData={setAnalysesData}
              language={language}
            />
          )}
          {currentState == 5 && (
            <FileUploader
              currentState={currentState}
              setCurrentState={setCurrentState}
              analysesData={analysesData}
              setAnalysesData={setAnalysesData}
              handleAnalysesGeneration={handleAnalysesGeneration}
              language={language}
              isGnerating={isGnerating}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default NewAlalyses;
