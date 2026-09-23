import React, { useRef, useState } from "react";
import "./FileUploader.css";
import translations from "../../translator";

const FileUploader = ({
  currentState,
  setCurrentState,
  analysesData,
  setAnalysesData,
  handleAnalysesGeneration,
  language,
  isGnerating
}) => {
  const t = translations[language];
  const [selectedFile, setSelectedFile] = useState(null);

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Only accept .xls
    if (
      !file.name.toLowerCase().endsWith(".xls") &&
      !file.name.toLowerCase().endsWith(".xlsx")
    ) {
      alert("Please upload an .xls or .xlsx file only.");
      e.target.value = "";
      return;
    }

    setSelectedFile(file);

    // Save the file in your analysesData object
    setAnalysesData({
      ...analysesData,
      file: file,
    });
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);

    setAnalysesData({
      ...analysesData,
      file: null,
    });

    // Reset input so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  

  return (
    <div className="fileUploaderContainer">
      <div className="uploadTitle">
        <h4>{t.uploadFile}</h4>
        <p>{t.uploadExcelDescription}</p>
      </div>

      {!selectedFile ? (
        /* =========================
           NO FILE SELECTED
        ========================= */
        <div className="uploadBox" onClick={() => fileInputRef.current.click()}>
          <div className="uploadIcon">
            <i className="fa-solid fa-upload"></i>
          </div>

          <h4>{t.dragDropFile}</h4>

          <p>
            <span>{t.orClickToBrowse}</span> · {t.xlsSupported}
          </p>

          <div className="excelInfo">
            <i className="fa-regular fa-file-excel"></i>
            {t.excelFilesFromPlatform}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".xls,.xlsx"
            onChange={handleFileChange}
            hidden
          />
        </div>
      ) : (
        /* =========================
           FILE SELECTED
        ========================= */
        <div className="fileSelectedContainer">
          <div className="fileInformation">
            <div className="fileIcon">
              <i className="fa-regular fa-file-excel"></i>
            </div>

            <div className="fileDetails">
              <h4>{selectedFile.name}</h4>

              <p>
                {(selectedFile.size / 1024).toFixed(1)} KB ·{t.excelSpreadsheet}
              </p>
            </div>

            <div className="fileActions">
              {/* Remove */}
              <button
                className="removeFileButton"
                onClick={handleRemoveFile}
                title="Remove file"
              >
                <i className="fa-solid fa-trash"></i>
              </button>

              {/* Valid */}
              <i className="fa-solid fa-circle-check validIcon"></i>
            </div>
          </div>

          <div className="fileValidMessage">
            <i className="fa-solid fa-circle-check"></i>

            <div>
              <strong>{t.fileReady}</strong>
              <p>
                {t.fileUploadedSuccessfully}
              </p>
            </div>
          </div>
        </div>
      )}

      <hr />

      {/* Bottom buttons */}
      <div className="fileUploaderFooter">
        <button
          className="previous"
          onClick={() => {
            setCurrentState(4);
            setAnalysesData({ ...analysesData, trimester: null });
          }}
          disabled={isGnerating}
        >
          {language == "العربية" ? "→" : "←"} {t.previous}
        </button>

        <span>{t.stepOf.replace("{{current}}", 5)}</span>

        <button
          className="generateButton"
          disabled={!selectedFile || isGnerating}
          onClick={handleAnalysesGeneration}
        >
          {isGnerating ? (
            <>
              <i className="fa-solid fa-spinner fa-spin"></i>
              {t.generating}
            </>
          ) : (
            <>
              <i className="fa-solid fa-wand-magic-sparkles"></i>
              {t.generateAnalysis}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default FileUploader;
