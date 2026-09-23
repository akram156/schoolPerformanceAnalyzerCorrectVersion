// import React from "react";
import translations from "../../translator";
import "./SideBar.css";
import { NavLink } from "react-router-dom";

const SideBar = ({ language, currentUser }) => {
  const t = translations[language];
  return (
    <aside className="sidebar">
      {/* Navigation */}
      <nav className="pageNamesContainer">
        <NavLink
          className={({ isActive }) =>
            `directionContainer ${isActive ? "active" : ""}`
          }
          to="/Dashboard"
        >
          <i className="fa-solid fa-house-chimney icons"></i>
          <span>{t.dashboard}</span>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `directionContainer ${isActive ? "active" : ""}`
          }
          to="/NewAnalyses"
        >
          <i className="fa-regular fa-square-plus icons"></i>
          <span>{t.newAnalyses}</span>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `directionContainer ${isActive ? "active" : ""}`
          }
          to="/SavedAnalyses"
        >
          <i className="fa-regular fa-folder icons"></i>
          <span>{t.savedAnalyses}</span>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `directionContainer ${isActive ? "active" : ""}`
          }
          to="/Settings"
        >
          <i className="fa-solid fa-gear icons"></i>
          <span>{t.settings}</span>
        </NavLink>
      </nav>

      {/* User information */}
      <div className="profileInformationmainContainer">
        <div className="adminUserBottomContainer">
          <div className="imageProfileContainer">
            {currentUser.profilePicture ? (
              <img
                src={currentUser?.profilePicture}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  border: "1px solid gray",
                }}
              />
            ) : (
              <>
                {currentUser?.firstName[0]?.toUpperCase()}
                {currentUser?.lastName[0]?.toUpperCase()}
              </>
            )}
          </div>

          <div className="profileInformationContainer">
            <p id="userAdminName">
              {currentUser.firstName} {currentUser.lastName}
            </p>

            <p id="userEmail">{currentUser.email}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
