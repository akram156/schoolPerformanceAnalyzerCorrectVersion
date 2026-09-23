import React, { use, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignIn.css";
import axios from "axios";
import Spinner from "../../components/spinner/Spinner";
const SignIn = () => {
  const navigate = useNavigate();
  const [passwordShown, setpasswordShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const result = await axios.post(
        "http://localhost:9825/api/user/login",
        user,
      );
      localStorage.setItem("token", result.data.token);
      navigate("/Dashboard");
      console.log(result);
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
  const forgetPassword = async () => {
    try {
      const result = await axios.post(
        "http://localhost:9825/api/reset/forgetPassword",
        {
          email: user.email,
        },
      );
      navigate("/restPassword", {
        state: { email: user.email },
      });
    } catch (error) {
      alert(error.response.data.error);
    }
  };
  return (
    <div className="mainContainer">
      <div className="rightContainer">
        <div className="centeredContainer">
          <div className="logoContainer">
            <i
              class="fa-solid fa-graduation-cap fa-2xl "
              style={{ color: "#2563eb" }}
            ></i>
            <h2>School Analazer</h2>
          </div>
          <div className="welcomeContainer">
            <h4>Welcome back</h4>
            <p>Sign in to your School Analyzer account</p>
          </div>
          <div className="formContainer">
            <form action="">
              <div className="insideFormContainer">
                <div className="emailContainer">
                  <label htmlFor="email">email adress</label>
                  <i className="fa-regular fa-user fa-xs user-icon"></i>
                  <input
                    type="email"
                    name=""
                    id="email"
                    placeholder="example@gmail.com"
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                  />
                </div>
                <div className="passwordContainer">
                  <label htmlFor="password">password</label>
                  <i className="fa-solid fa-lock fa-xs lock-icon"></i>
                  <input
                    type={passwordShown ? "text" : "password"}
                    id="password"
                    placeholder="••••••••••••••"
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                  />
                  <div className="forgetpasswordContaier">
                    <div className="checkboxContainer">
                      <input
                        type="checkbox"
                        onClick={(e) => setpasswordShown(!passwordShown)}
                      />{" "}
                      show password
                    </div>
                    <Link className="link" onClick={forgetPassword}>
                      forget password
                    </Link>
                  </div>
                </div>
                <div className="buttonContainer" onClick={handleLogin}>
                  <button>
                    {isLoading ? <Spinner /> : "Sign In to our School Analyzer"}
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
            You do not have an account?{" "}
            <Link to={"/SignUp"} className="link">
              {"   "}
              Sign Up
            </Link>
          </div>
        </div>
      </div>
      <div className="leftContainer"></div>
    </div>
  );
};

export default SignIn;
