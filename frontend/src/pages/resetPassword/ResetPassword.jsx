import React, { useState } from "react";
import "./ResetPassword.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../../components/spinner/Spinner";
import API_URL from "../../config/api";

const ResetPassword = () => {
  const [code, setCode] = useState("");
  const [codeVerified, setCodeVerified] = useState(false);
  const [isVerifing, setIsVerifing] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const location = useLocation();
  const email = location.state?.email;
  const navigate = useNavigate();
  const handleVerifyCode = async (e) => {
    console.log("email", email);
    try {
      e.preventDefault();
      setIsVerifing(true);
      const result = await axios.post(
        `${API_URL}/api/reset/resetPassword`,
        {
          email,
          code,
        },
      );
      if (result.data.msg == "success") {
        setCodeVerified(true);
      }
    } catch (error) {
      alert(error.response.data.error);
    } finally {
      setIsVerifing(false);
    }

    // For now, just an example.
    // Later, you will verify the code with your backend.
  };

  const handleResetPassword = async (e) => {
    try {
      e.preventDefault();
      setIsVerifing(true);
      const result = await axios.put(
        `${API_URL}/api/reset/resetPassword2`,
        {
          email,
          password,
          confirmPassword,
        },
      );

      alert(result.data.msg);
      navigate("/");
    } catch (error) {
      alert(error.response.data.error);
    } finally {
      setIsVerifing(false);
    }
  };

  return (
    <div className="reset-page">
      <div className="reset-card">
        <div className="reset-header">
          <h1>Reset Password</h1>
          <p>Enter the confirmation code sent to your email.</p>
        </div>

        {!codeVerified ? (
          /* STEP 1 — Confirmation Code */
          <form onSubmit={handleVerifyCode} className="reset-form">
            <div className="form-group">
              <label htmlFor="confirmationCode">Confirmation Code</label>

              <input
                id="confirmationCode"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter the 6-digit code"
                maxLength="6"
                required
              />
            </div>

            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="reset-button">
              {isVerifing ? <Spinner /> : <>Verify Code</>}
            </button>
          </form>
        ) : (
          /* STEP 2 — New Password */
          <form onSubmit={handleResetPassword} className="reset-form">
            <div className="success-message">✓ Code verified successfully</div>

            <div className="form-group">
              <label htmlFor="password">New Password</label>

              <input
                id="password"
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your new password"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>

              <input
                id="confirmPassword"
                type="text"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your new password"
                required
              />
            </div>

            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="reset-button">
              {isVerifing ? <Spinner /> : <>Reset Password</>}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
