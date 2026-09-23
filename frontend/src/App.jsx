import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Dashbord from "./pages/Dashbord/Dashbord";
import Profile from "./pages/Profile/Profile";
import NewAlalyses from "./pages/NewAnalyses/NewAlalyses";
import SavedAnalyses from "./pages/SavedAnalyses/SavedAnalyses";
import DashboardLayout from "./pages/DashboardLayout/DashboardLayout";
import Settings from "./pages/Settings/Settings";
import Comparaison from "./pages/Comparaison/Comparaison";
import ProtectedRoute from "./pages/protectedRoute/ProtectedRoute";
import ConfirmEmail from "./pages/confirmEmail/ConfirmEmail";
import ProtectingOut from "./pages/protectingOut/ProtectingOut";
import Analyses from "./pages/analyses/Analyses";
import ResetPassword from "./pages/resetPassword/ResetPassword";

function App() {
  const [islightMode, setIslightmode] = useState(true);
  const [language, setLanguage] = useState("English");

  return (
    <div className={islightMode ? "app light" : "app dark"} >
      <Routes>
        <Route element={<ProtectingOut />}>
          <Route path="/" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/confirmEmail" element={<ConfirmEmail />} />
          <Route path="/restPassword" element={<ResetPassword/>}></Route>
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route
            element={
              <DashboardLayout
                islightMode={islightMode}
                setIslightmode={setIslightmode}
                language={language}
                setLanguage={setLanguage}
              />
            }
          >
            <Route
              path="/Dashboard"
              element={<Dashbord language={language} />}
            />
            <Route
              path="/Settings"
              element={<Settings language={language} />}
            />
            <Route
              path="/NewAnalyses"
              element={<NewAlalyses language={language} />}
            />
            <Route
              path="/SavedAnalyses"
              element={<SavedAnalyses language={language} />}
            />
            <Route
              path="/Comparaison"
              element={<Comparaison language={language} />}
            />
            <Route path="/analyses/:id" element={<Analyses language={language} />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
