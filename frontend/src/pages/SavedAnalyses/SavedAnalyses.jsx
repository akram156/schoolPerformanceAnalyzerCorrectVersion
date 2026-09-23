import React, { useEffect, useState } from "react";
import OneSavedAnalyses from "../../components/OneSavedAnalyses/OneSavedAnalyses";
import "./SavedAnalyses.css";
import translations from "../../translator";
import { useOutletContext } from "react-router-dom";
const SavedAnalyses = ({ language }) => {
  const t = translations[language];
  const { allAnalyses, getAllAnalyses } = useOutletContext();
  const [filterAnalyses, setFilterAnalyses] = useState("");
  useEffect(() => {
    getAllAnalyses();
  }, []);
  return (
    <div className="savedAnalysesMainContainer">
      <div className="savedAnalysesContainer">
        <div className="savedAnalysestitle">
          <div className="folderIconContainer">
            <i class="fa-regular fa-folder fa-xl"></i>{" "}
          </div>
          <div className="titleContainer">
            <h3>{t.savedAnalyses}</h3>
            <p>{t.savedAnalysesDescription}</p>
          </div>
        </div>
        <div className="filterContainer">
          <i class="fa-solid fa-magnifying-glass search-icon"></i>
          <input
            type="text"
            placeholder={t.searchAnalyses}
            onChange={(e) => setFilterAnalyses(e.target.value)}
          />
        </div>
        {allAnalyses.length > 0 ? (
          <div className="savedAnalysesCardsContainer">
            {allAnalyses
              .filter((analyse) => analyse.name.includes(filterAnalyses))
              .map((analyse) => (
                <OneSavedAnalyses
                  language={language}
                  analyse={analyse}
                  getAllAnalyses={getAllAnalyses}
                />
              ))}
          </div>
        ) : (
          <section className="empty-analyses">
            {" "}
            <div className="empty-analyses-icon"> 📊 </div>{" "}
            <h2>{t.Nosavedanalysesyet}</h2>{" "}
            <p>
              {" "}
              {t.Yourlatestanalysesandreportswillappearhereonceyoucreateone}{" "}
            </p>{" "}
          </section>
        )}
      </div>
    </div>
  );
};

export default SavedAnalyses;
