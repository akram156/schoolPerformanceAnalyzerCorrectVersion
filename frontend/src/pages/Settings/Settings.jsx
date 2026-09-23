import React, { useRef, useState } from "react";
import "./Settings.css";
import translations from "../../translator";
import { useOutletContext } from "react-router-dom";
import axios from "axios";

const Settings = ({ islightMode, setIslightmode, language, setLanguage }) => {
  // -------------------------
  // Profile states
  // -------------------------
  const t = translations[language];
  const { currentUser, setCurrentUser, getCurrentUser } = useOutletContext();

  const [profile, setProfile] = useState({
    id: currentUser._id,
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    role: currentUser.role,
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Profile image
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  // -------------------------
  // Password states
  // -------------------------

  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // -------------------------
  // Profile functions
  // -------------------------

  const handleProfileChange = (e) => {
    const { name, value } = e.target;

    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleProfileSave = async () => {
    setIsEditingProfile(false);

    // Later:
    // send profile data to your Express backend
    try {
      const result = await axios.put(
        "http://localhost:9825/api/setting/edit",
        profile,
      );
      await getCurrentUser();
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
    }
  };

  const handleProfileCancel = () => {
    setProfile({
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      role: currentUser.role,
    });

    setIsEditingProfile(false);
  };

  // -------------------------
  // Profile picture
  // -------------------------

  const handlePhotoClick = () => {
    fileInputRef.current.click();
  };

  const handlePhotoChange = async (e) => {
    console.log("reached")
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      if (!file) return;

      // Only images
      if (!file.type.startsWith("image/")) {
        alert("Please select an image.");
        return;
      }
      const preview = URL.createObjectURL(file);
      setCurrentUser({ ...currentUser, profilePicture: preview });
      // Create temporary URL for preview
      formData.append("profileImage", file);
      const token = localStorage.getItem("token");
      const result = await axios.put(
        "http://localhost:9825/api/setting/profilePicture",
        formData,
        {
          headers: {
            authorization: token,
          },
        },
      );
      // await getCurrentUser();
      alert( result.data.msg);
    } catch (e) {
      console.log("error", e.response.data);
    }
  };

  // -------------------------
  // Password functions
  // -------------------------

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const handlePasswordCancel = () => {
    setShowPasswordForm(false);

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };
  const handlePasswordSubmit = async (e) => {
    try {
      e.preventDefault();

      const result = await axios.put(
        "http://localhost:9825/api/setting/changePassword",
        { id: currentUser._id, ...passwordData },
      );
      alert(result.data.msg);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setShowPasswordForm(false);
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
    }
  };

  return (
    <div className="settingsPage">
      {/* =========================
          PAGE HEADER
      ========================== */}

      <div className="settingsHeader">
        <h2>{t.settings}</h2>

        <p>{t.manageProfile}</p>
      </div>

      {/* =========================
          PROFILE CARD
      ========================== */}

      <div className="settingsCard">
        <h3>{t.profileInformation}</h3>

        {/* Profile top */}

        <div className="profileTop">
          <div className="profilePictureWrapper">
            {currentUser.profilePicture ? (
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  border: "1px solid gray",
                  backgroundImage: `url(${currentUser.profilePicture})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              ></div>
            ) : (
              <div className="profilePicture initials">
                {currentUser.firstName.charAt(0).toUpperCase()}
                {currentUser.lastName.charAt(0).toUpperCase()}
              </div>
            )}

            <button className="photoPlusButton" onClick={handlePhotoClick}>
              +
            </button>

            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handlePhotoChange}
              style={{ display: "none" }}
            />
          </div>

          <div className="profileIdentity">
            <h2>
              {currentUser.firstName.charAt(0).toUpperCase() +
                currentUser.firstName.slice(1).toLowerCase()}{" "}
              {currentUser.lastName.charAt(0).toUpperCase() +
                currentUser.lastName.slice(1).toLowerCase()}
            </h2>

            <p>{currentUser.role}</p>

            <button className="changePhotoButton" onClick={handlePhotoClick}>
              {t.changePhoto}
            </button>
          </div>
        </div>

        <div className="settingsDivider"></div>

        {/* =========================
            PROFILE FORM
        ========================== */}

        <div className="profileForm">
          <div className="formGroup">
            <label>{t.firstName}</label>

            <input
              type="text"
              name="firstName"
              value={profile.firstName}
              onChange={handleProfileChange}
              disabled={!isEditingProfile}
            />
          </div>

          <div className="formGroup">
            <label>{t.lastName}</label>

            <input
              type="text"
              name="lastName"
              value={profile.lastName}
              onChange={handleProfileChange}
              disabled={!isEditingProfile}
            />
          </div>

          {/* <div className="formGroup">
            <label>{t.emailAddress}</label>

            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleProfileChange}
              disabled={!isEditingProfile}
            />
          </div> */}

          <div className="formGroup">
            <label>{t.role}</label>

            <select
              name="role"
              value={profile.role}
              onChange={handleProfileChange}
              disabled={!isEditingProfile}
              className="role"
            >
              <option value="Teacher">Teacher</option>
              <option value="Administrator">Administrator</option>
              <option value="Principal">Principal</option>
            </select>
          </div>
        </div>

        {/* =========================
            PROFILE BUTTONS
        ========================== */}

        <div className="profileActions">
          {!isEditingProfile ? (
            <button
              className="editProfileButton"
              onClick={() => setIsEditingProfile(true)}
            >
              <i className="fa-solid fa-pen"></i>
              {t.editProfile}
            </button>
          ) : (
            <>
              <button className="cancelButton" onClick={handleProfileCancel}>
                {t.cancel}
              </button>

              <button className="saveButton" onClick={handleProfileSave}>
                <i className="fa-solid fa-check"></i>
                {t.save}
              </button>
            </>
          )}
        </div>
      </div>

      {/* =========================
          PASSWORD CARD
      ========================== */}

      <div className="settingsCard securityCard">
        <div className="securityHeader">
          <div>
            <h3>{t.passwordSecurity}</h3>

            <p>{t.managePassword}</p>
          </div>

          {!showPasswordForm && (
            <button
              className="changePasswordButton"
              onClick={() => setShowPasswordForm(true)}
            >
              <i className="fa-solid fa-lock"></i>
              {t.changePassword}
            </button>
          )}
        </div>

        {/* =========================
            PASSWORD FORM
        ========================== */}

        {showPasswordForm && (
          <form className="passwordForm" onSubmit={handlePasswordSubmit}>
            <div className="formGroup">
              <label>{t.currentPassword}</label>

              <input
                type="text"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                placeholder={t.entercurrentPassword}
              />
            </div>

            <div className="formGroup">
              <label>{t.newPassword}</label>

              <input
                type="text"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                placeholder={t.enternewPassword}
              />
            </div>

            <div className="formGroup">
              <label>{t.confirmNewPassword}</label>

              <input
                type="text"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                placeholder={t.confirmNewPassword}
              />
            </div>

            <div className="passwordRequirements">
              <i className="fa-solid fa-circle-info"></i>

              <span>{t.passwordRequirement}.</span>
            </div>

            <div className="passwordActions">
              <button
                type="button"
                className="cancelButton"
                onClick={handlePasswordCancel}
              >
                {t.cancel}
              </button>

              <button type="submit" className="saveButton">
                <i className="fa-solid fa-check"></i>
                {t.updatePassword}
              </button>
            </div>
          </form>
        )}

        {!showPasswordForm && (
          <div className="passwordStatus">
            <div className="passwordIcon">
              <i className="fa-solid fa-shield-halved"></i>
            </div>

            <div>
              <h4>{t.password}</h4>
              <p>{t.passwordProtected}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
