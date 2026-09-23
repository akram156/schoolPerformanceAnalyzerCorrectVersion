import React from "react";
import "./Dashbord.css";
import SideBar from "../../components/sidebar/SideBar";
import Onerecentwork from "../../components/onerecentwork/Onerecentwork";
import { Link, useOutletContext } from "react-router-dom";
import translations from "../../translator";

const Dashbord = ({ language }) => {
  const t = translations[language];
  const { currentUser, licence, allAnalyses } = useOutletContext();
  const today = new Date();
  const expiration = new Date(licence?.expiresAt);
  const profileCreationDate = new Date(currentUser.createdAt);
  const difference = Math.abs(expiration - today);
  const difference2 = Math.abs(today - profileCreationDate);
  const remainingDays = Math.ceil(difference / (1000 * 60 * 60 * 24));
  const memberSince = Math.ceil(difference2 / (1000 * 60 * 60 * 24));
  console.log("remainingDays:", currentUser);
  return (
    <div className="mainDashboardContainer">
      <div className="insideDashboardContainer">
        <div className="welcomeDashboardContainer">
          <h2 id="dashboardName">{t.dashboard}</h2>
          <p id="dashboardWelcome">
            {t.welcomeBack}{" "}
            {currentUser.firstName.charAt(0).toUpperCase() +
              currentUser.firstName.slice(1).toLowerCase()}{" "}
            👋
          </p>
        </div>
        <div className="dashboardInformationContainer">
          <div className="totalAnalysesContainer">
            <div className="logcontainer">
              <i class="fa-regular fa-file fa-xl"></i>
            </div>
            <div className="informationcontainer">
              <p>{t.savedAnalysesCount}</p>
              <p id="numberOfSavedAnalyses">{allAnalyses.length}</p>
            </div>
            <div className="analysecontainer">
              <svg width="150" height="80" viewBox="0 0 150 80">
                <path
                  d="M5 60 L30 42 L55 48 L75 25 L105 40 L145 5"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
          <div className="middletotalAnalysesContainer">
            <div className="greenlogcontainer">
              <i class="fa-regular fa-clock fa-xl"></i>{" "}
            </div>
            <div className="informationcontainer">
              <p>{t.memberSince}</p>
              <p id="hoursFromLastUse">
                {memberSince} {t.daysAgo}
              </p>
            </div>
            <div className="analysecontainergreen">
              <svg width="130" height="80" viewBox="0 0 150 80">
                <path
                  d="M5 60 L30 42 L55 48 L75 25 L105 40 L145 5"
                  fill="none"
                  stroke="green"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
          <div className="totalAnalysesContainer">
            <div className="logcontainer">
              <i class="fa-solid fa-shield-halved fa-xl"></i>
            </div>
            <div className="informationcontainer">
              <p>{t.licenseStatus}</p>
              <p id="licenceActivation">{t.active}</p>
              <p>
                {remainingDays} {t.remainingDays}
              </p>
              <div className="progressbarContainer">
                <div className="progressbar"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="ourServicesContainer">
          <h4 id="ourservicesTitle">{t.whatSchoolAnalyzerCanDo}</h4>
          <p id="ourservicesSubtitle">{t.powerfulAcademicAnalyses}</p>
          <div className="ourservice">
            <div className="highschool">
              <div className="lefthighschool">
                <i class="fa-solid fa-school fa-xl"></i>
              </div>
              <div className="righthighschool">
                <h5>{t.highSchoolAnalyses}</h5>
                <p>{t.highSchoolAnalysesDescription}</p>
              </div>
            </div>
            <div className="middleschool">
              <div className="leftmiddleschool">
                <i class="fa-solid fa-building-columns fa-xl"></i>
              </div>
              <div className="rightmiddleschool">
                <h5>{t.middleSchoolAnalyses}</h5>
                <p>{t.middleSchoolAnalysesDescription}</p>
              </div>
            </div>
            <div className="allstreams">
              <div className="leftallstreams">
                <i class="fa-solid fa-graduation-cap fa-xl"></i>
              </div>
              <div className="rightallstreams">
                <h5>{t.allStreams}</h5>
                <p>{t.allStreamsDescription}</p>
              </div>
            </div>
            <div className="academicyear">
              <div className="leftacademicyear">
                <i class="fa-regular fa-calendar-days fa-xl"></i>
              </div>
              <div className="rightacademicyear">
                <h5>{t.anyAcademicYear}</h5>
                <p>{t.anyAcademicYearDescription}</p>
              </div>
            </div>
            <div className="trimestercomparaison">
              <div className="lefttremestercomparaison">
                <i class="fa-solid fa-chart-line fa-xl"></i>
              </div>
              <div className="righttremestercomparaison">
                <h5>{t.trimesterComparison}</h5>
                <p>{t.trimesterComparisonDescription}</p>
                <p></p>
              </div>
            </div>
            <div className="saveyouranalyses">
              <div className="leftsaveyouranalyses">
                <i class="fa-regular fa-folder fa-xl"></i>
              </div>
              <div className="rightsaveyouranalyses">
                <h5>{t.saveYourAnalyses}</h5>
                <p>{t.saveYourAnalysesDescription}</p>
              </div>
            </div>
          </div>
        </div>
        {allAnalyses.length > 0 ? (
          <div className="recentworkContainer">
            <h4>{t.recentWork}</h4>
            <div className="titlesContainer">
              <div className="title" id="title1">
                <p>{t.analyses}</p>
              </div>
              <div className="title" id="title2">
                <p>{t.academicYear}</p>
              </div>
              <div className="title" id="title3">
                <p>{t.trimester}</p>
              </div>
              <div className="title" id="title4">
                <p>{t.students}</p>
              </div>
              <div className="title" id="title5">
                <p>{t.createdAt}</p>
              </div>
              <div className="title" id="title6">
                <p>{t.action}</p>
              </div>
            </div>
            <div>
              {allAnalyses.map((analyse) => (
                <>
                  <Onerecentwork analyse={analyse} language={language} />
                  <hr className="Line" />
                </>
              ))}
            </div>
            <div className="viewAllContainer">
              <Link id="link" to={"/SavedAnalyses"}>
                {t.viewAllAnalyses}
                {language == "العربية" ? (
                  <i class="fa-solid fa-arrow-left-long fa-lg"></i>
                ) : (
                  <i class="fa-solid fa-arrow-right-long fa-lg"></i>
                )}
              </Link>
            </div>
          </div>
        ) : (
          <div className="emptyRecentWork">
            <h3>{t.Yourlatestworkandanalysesaredisplayedhere}</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashbord;
