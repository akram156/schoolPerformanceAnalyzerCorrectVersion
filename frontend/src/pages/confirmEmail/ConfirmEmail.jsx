import React from "react";
import "./ConfirmEmail.css";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ConfirmEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [code, setCode] = useState("");

  const email = location.state?.email;

  const handleVerification = async () => {
    try {
      const result = await axios.post(
        "http://localhost:9825/api/verification/verify",
        {
          email: email,
          code: code,
        },
      );
      
      localStorage.setItem("token", result.data.token);

      alert(result.data.msg);

      navigate("/Dashboard");
    } catch (e) {
      alert(e.response.data.error);
    }
  };

  return (
    <div className="confirmEmailPage">
      <div className="confirmEmailCard">
        {/* Icon */}
        <div className="verificationIcon">
          <i className="fa-solid fa-envelope-circle-check"></i>
        </div>

        {/* Title */}
        <div className="confirmEmailHeader">
          <h1>Verify your email</h1>

          <p>We've sent a verification code to</p>

          <strong>{email}</strong>
        </div>

        {/* Code input */}
        <div className="codeContainer">
          <label htmlFor="verificationCode">Verification code</label>

          <div className="codeInputWrapper">
            <i className="fa-solid fa-shield-halved"></i>

            <input
              id="verificationCode"
              type="text"
              inputMode="numeric"
              maxLength={6}
              placeholder="Enter 6-digit code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
        </div>

        {/* Verify button */}
        <button className="verifyButton" onClick={handleVerification}>
          Verify email
          <i className="fa-solid fa-arrow-right"></i>
        </button>

        {/* Information */}
        <div className="verificationInfo">
          <i className="fa-solid fa-circle-info"></i>

          <p>Check your inbox or spam folder if you don't see the email.</p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmEmail;
