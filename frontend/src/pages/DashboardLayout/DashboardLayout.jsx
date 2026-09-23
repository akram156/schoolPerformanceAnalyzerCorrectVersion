// import React, { useState } from "react";
// import { Outlet } from "react-router-dom";
// import Topbar from "../../components/topbar/Topbar";
// import "./DashboardLayout.css";
// import SideBar from "../../components/sidebar/SideBar";
// const DashboardLayout = ({
//   islightMode,
//   setIslightmode,
//   language,
//   setLanguage,
// }) => {
//   const [sidebarShown, setSidebarShown] = useState(true);
//   console.log("sidebar: ", sidebarShown);

//   return (
//     <div className="mainDashboardLayoutContainer">
//       <div className="topBarDashboardLayoutContainer">
//         <Topbar
//           islightMode={islightMode}
//           setIslightmode={setIslightmode}
//           language={language}
//           setLanguage={setLanguage}
//         />
//       </div>
//       <hr className="topbarLine" />
//       <div className="bodyDashboardLayoutContainer">
//         <div>
//           <div
//             onClick={(e) => setSidebarShown(!sidebarShown)}
//             style={{ cursor: "pointer" }}
//             className="sidebar-icon"
//           >
//             <i class="fa-solid fa-bars fa-lg"></i>
//           </div>
//           {sidebarShown && (
//             <>
//               <div
//                 className={
//                   sidebarShown
//                     ? "sidebarDashboardLayoutContainer"
//                     : "sidebarDashboardLayoutContainerHidden"
//                 }
//               >
//                 <SideBar />
//               </div>
//             </>
//           )}
//         </div>
//         {sidebarShown && <div className="verticalSeparator"></div>}

//         <div className="outletDashboardLayoutContainer">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;

import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Topbar from "../../components/topbar/Topbar";
import SideBar from "../../components/sidebar/SideBar";
import "./DashboardLayout.css";
import axios from "axios";
import { useEffect } from "react";
import Spinner from "../../components/spinner/Spinner";
import Loading from "../../components/loading/Loading";

const DashboardLayout = ({
  islightMode,
  setIslightmode,
  language,
  setLanguage,
}) => {
  const [sidebarShown, setSidebarShown] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [allAnalyses, setAllAnalyses] = useState([]);
  const [licence, setlicence] = useState(null);

  const navigate = useNavigate();
  const direction = language === "العربية" ? "rtl" : "ltr";
  const getCurrentUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const result = await axios.get(
        "http://localhost:9825/api/authorization/current",
        {
          headers: {
            Authorization: token,
          },
        },
      );

      setCurrentUser(result.data.user);
      setlicence(result.data.licence);
    } catch (e) {
      console.log(e.response.data);
      if (e.response?.status == 401 || e.response?.status == 403) {
        localStorage.removeItem("token");
        navigate("/");
        alert(e.response.data.error);
      }
    }
  };

  const getAllAnalyses = async () => {
    try {
      const token=localStorage.getItem("token")
      const result = await axios.get(
        "http://localhost:9825/api/getAnalyses/allAnalyses",
        {
          headers: {
            Authorization: token,
          },
        },
      );
      setAllAnalyses(result.data.analyses);
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    getCurrentUser();
    getAllAnalyses();
  }, []);
  console.log("analyses:", allAnalyses);
  {
    if (!currentUser) {
      return <Loading />;
    }

    return (
      <div className="mainDashboardLayoutContainer" dir={direction}>
        {/* ================= TOPBAR ================= */}

        <div className="topBarDashboardLayoutContainer">
          <Topbar
            islightMode={islightMode}
            setIslightmode={setIslightmode}
            language={language}
            setLanguage={setLanguage}
            currentUser={currentUser}
          />
        </div>

        <hr className="topbarLine" />

        {/* ================= BODY ================= */}

        <div className="bodyDashboardLayoutContainer">
          {/* SIDEBAR AREA */}

          <div
            className={
              sidebarShown ? "sidebarArea" : "sidebarArea sidebarAreaHidden"
            }
          >
            {/* Hamburger */}

            <button
              className="sidebar-icon"
              onClick={() => setSidebarShown(!sidebarShown)}
            >
              <i className="fa-solid fa-bars"></i>
            </button>

            {/* Sidebar */}

            {sidebarShown && (
              <div className="sidebarDashboardLayoutContainer">
                <SideBar language={language} currentUser={currentUser} />
              </div>
            )}
          </div>

          {/* VERTICAL SEPARATOR */}

          {sidebarShown && <div className="verticalSeparator"></div>}

          {/* MAIN CONTENT */}

          <main className="outletDashboardLayoutContainer">
            <Outlet
              context={{
                currentUser,
                getCurrentUser,
                setCurrentUser,
                licence,
                allAnalyses,
                getAllAnalyses,
              }}
            />
          </main>
        </div>
      </div>
    );
  }
};

export default DashboardLayout;
