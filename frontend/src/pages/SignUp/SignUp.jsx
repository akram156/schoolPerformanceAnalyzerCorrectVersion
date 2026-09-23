import React, { useState } from "react";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../../components/spinner/Spinner";
const SignUp = () => {
  const [showingSignUpPassword, setShowingSignUpPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    licence: "",
  });
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (newUser.password !== confirmedPassword) {
        alert("تاكيد كلمه المرور غير صحيحي حاول مجددا");
        setConfirmedPassword("");
        setNewUser({
          ...newUser,
          password: "",
        });
        return;
      }
      const result = await axios.post(
        "http://localhost:9825/api/user/register",
        newUser,
      );
      // localStorage.setItem("token", result.data.token);
      navigate("/ConfirmEmail", {
        state: { email: newUser.email },
      });
      alert(result.data.msg);
    } catch (e) {
      if (Array.isArray(e.response?.data.errors)) {
        alert(
          e.response?.data.errors
            .map((e) => {
              return e.msg;
            })
            .join("\n"),
        );
      } else {
        alert(e.response?.data.error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mainSignupContainer">
      <div className="rightSignupContainer">
        <div className="centeredLeftContainer">
          <div className="logoContainer">
            <i
              class="fa-solid fa-graduation-cap fa-2xl "
              style={{ color: "#2563eb" }}
            ></i>
            <h2>School Analazer</h2>
          </div>
          <div className="welcomeContainer">
            <h4>Create your account</h4>
            <p>
              Set up your school analyzer account and start analyzing student
              performance
            </p>
          </div>
          <div className="formSignupContainer">
            <form>
              <div className="insideFormContainer">
                {/* first name container */}
                <div className="fullNameContainer">
                  <label htmlFor="firstname">First name</label>
                  <i className="fa-regular fa-user fa-xs user-icon"></i>
                  <input
                    type="text"
                    name=""
                    id="firstname"
                    placeholder="enter your full name"
                    value={newUser.firstName}
                    onChange={(e) => {
                      setNewUser({ ...newUser, firstName: e.target.value });
                    }}
                  />
                </div>
                {/* !lastname */}
                <div className="fullNameContainer">
                  <label htmlFor="lastname">Last name</label>
                  <i className="fa-regular fa-user fa-xs user-icon"></i>
                  <input
                    type="text"
                    name=""
                    id="lastname"
                    placeholder="enter your full name"
                    value={newUser.lastName}
                    onChange={(e) => {
                      setNewUser({ ...newUser, lastName: e.target.value });
                    }}
                  />
                </div>
                {/* email  container */}
                <div className="emailContainer">
                  <label htmlFor="email">email adress</label>
                  <i class="fa-solid fa-envelope fa-xs email-icon"></i>
                  <input
                    type="email"
                    name=""
                    id="email"
                    placeholder="example@gmail.com"
                    value={newUser.email}
                    onChange={(e) => {
                      setNewUser({ ...newUser, email: e.target.value });
                    }}
                  />
                </div>
                {/* password container */}
                <div className="emailContainer">
                  <label htmlFor="password">password</label>
                  <i className="fa-solid fa-lock fa-xs lock-icon"></i>
                  <i
                    class="fa-solid fa-eye fa-sm eye-icon"
                    onClick={(e) =>
                      setShowingSignUpPassword(!showingSignUpPassword)
                    }
                  ></i>
                  <input
                    type={showingSignUpPassword ? "text" : "password"}
                    name=""
                    id="password"
                    placeholder="••••••••••••••"
                    value={newUser.password}
                    onChange={(e) => {
                      setNewUser({ ...newUser, password: e.target.value });
                    }}
                  />
                </div>
                {/* confirm password container */}
                <div className="emailContainer">
                  <label htmlFor="cpassword">confirm password</label>
                  <i className="fa-solid fa-lock fa-xs lock-icon"></i>
                  <i
                    class="fa-solid fa-eye fa-sm eye-icon"
                    onClick={(e) =>
                      setShowingSignUpPassword(!showingSignUpPassword)
                    }
                  ></i>
                  <input
                    type={showingSignUpPassword ? "text" : "password"}
                    name=""
                    id="cpassword"
                    placeholder="••••••••••••••"
                    value={confirmedPassword}
                    onChange={(e) => setConfirmedPassword(e.target.value)}
                  />
                </div>
                {/* licence container */}
                <div className="emailContainer">
                  <label htmlFor="licence">Licence</label>
                  <i class="fa-solid fa-key fa-xs key-icon"></i>
                  <input
                    type="text"
                    name=""
                    id="licence"
                    placeholder="XXXX-XXXX-XXXX-XXXX "
                    value={newUser.licence}
                    onChange={(e) => {
                      setNewUser({ ...newUser, licence: e.target.value });
                    }}
                  />
                  <div className="licenceCalificationContainer">
                    <i class="fa-solid fa-circle-info fa-sm info-icon2"></i>
                    <p className="licenceClarification">
                      your licence key is provided when you purchase the school
                      analyzer
                    </p>
                  </div>
                </div>
                <div className="buttonContainer">
                  <button onClick={handleRegister}>
                    {isLoading ? <Spinner /> : "Create Account"}
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="middleLineContainer">
            <hr />
            <span>OR</span>
            <hr />
          </div>
          <div className="signUpOptionContainer">
            You already have an acount?{" "}
            <Link to={"/"} className="link">
              {"   "}
              Sign In
            </Link>
          </div>
        </div>
      </div>
      <div className="leftSignupContainer"></div>
    </div>
  );
};

export default SignUp;
