// import React, { useState } from "react";
// import "./Topbar.css";
// const Topbar = ({ islightMode, setIslightmode, language, setLanguage }) => {
//   return (
//     <div className="topBarContainer">
//       <div className="topBarLogoContainer">
//         <i
//           class="fa-solid fa-graduation-cap fa-2xl "
//           style={{ color: "#2563eb" }}
//         ></i>
//         <h2>School Analazer</h2>
//       </div>
//       <div className="topBarSettingContainer">
//         <div className="modeContainer" onClick={e=>setIslightmode(!islightMode)}>
//           {islightMode ? (
//             <i class="fa-solid fa-sun fa-lg"></i>
//           ) : (
//             <i class="fa-solid fa-moon fa-lg"></i>
//           )}
//         </div>

//         <div className="language-select">
//           <span>🌐 {language} ▼</span>

//           <select
//             value={language}
//             onChange={(e) => setLanguage(e.target.value)}
//           >
//             <option value="English">English</option>
//             <option value="العربية">العربية</option>
//             <option value="Français">Français</option>
//           </select>
//         </div>
//         <div className="adminContainer">
//           <div className="adminProfile">AB</div>
//           <p className="userName">user name</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Topbar;
import React from "react";
import "./Topbar.css";
import translations from "../../translator";
import { useNavigate } from "react-router-dom";

const Topbar = ({
  islightMode,
  setIslightmode,
  language,
  setLanguage,
  currentUser,
}) => {
  const t = translations[language];
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <header className="topBarContainer">
      {/* =========================
          LOGO
      ========================== */}

      <div className="topBarLogoContainer">
        <div className="topBarLogo">
          <i className="fa-solid fa-graduation-cap"></i>
        </div>

        <div className="topBarBrand">
          <h2>{t.schoolAnalyzer}</h2>
          <span>{t.academicPerformance}</span>
        </div>
      </div>

      {/* =========================
          RIGHT SIDE
      ========================== */}

      <div className="topBarSettingContainer">
        {/* Theme */}

        <button
          className="modeContainer"
          onClick={() => setIslightmode(!islightMode)}
          aria-label="Toggle theme"
        >
          {islightMode ? (
            <i className="fa-solid fa-sun"></i>
          ) : (
            <i className="fa-solid fa-moon"></i>
          )}
        </button>

        {/* Language */}

        <div className="languageSelect">
          <i className="fa-solid fa-globe languageIcon"></i>

          <span>{language}</span>

          <i className="fa-solid fa-chevron-down arrowIcon"></i>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="English">English</option>
            <option value="العربية">العربية</option>
            <option value="Français">Français</option>
          </select>
        </div>
        {/* User */}

        <div className="adminContainer">
          <div className="adminProfile">
            {currentUser.profilePicture ? (
              <img
                src={currentUser?.profilePicture}
                style={{
                  width: "30px",
                  height: "30px",
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

          <div className="adminInformation">
            <p className="userName">
              {" "}
              {currentUser.firstName.charAt(0).toUpperCase() +
                currentUser.firstName.slice(1).toLowerCase()}{" "}
              {currentUser.lastName.charAt(0).toUpperCase() +
                currentUser.lastName.slice(1).toLowerCase()}
            </p>

            <p className="userRole">{currentUser.role}</p>
          </div>
        </div>
        <div className="logoutContainer" onClick={handleLogout}>
          <i className="fa-solid fa-right-from-bracket"></i>
          <p>{t.logout}</p>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
