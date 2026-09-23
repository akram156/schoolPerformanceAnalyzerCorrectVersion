import React from "react";
import "./DropDown.css";
import translations from "../../translator";
import Spinner from "../spinner/Spinner";
const DropDown = ({
  dropDownOpen,
  setDropDownOpen,
  language,
  renameAnalyse,
  deleteAnalyse,
  isDeleting,
}) => {
  const t = translations[language];
  const handleRename = async () => {
    setDropDownOpen(false);
    const newName = prompt(t.prompt);

    await renameAnalyse(newName);
  };
  return (
    <div className="dropDownMainContainer">
      <div className="rename" onClick={handleRename}>
        <i class="fa-solid fa-pen"></i>
        {t.rename}
      </div>
      <div className="delete" onClick={deleteAnalyse}>
        {isDeleting ? (
          <Spinner />
        ) : (
          <>
            <i class="fa-solid fa-trash"></i>
            {t.delete}
          </>
        )}
      </div>
    </div>
  );
};

export default DropDown;
