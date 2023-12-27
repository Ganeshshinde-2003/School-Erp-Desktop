import React, { useState, useEffect } from "react";
import Modal from "../../Components/Modal";
import Alert from "@mui/material/Alert";
import "../AddTeacher/AddTeacherForm.css";
import FeeSlabNamePopUp from "./CoreSettingDetailsForm";

const AddOrUpdateStudentForm = ({
  isUpdateOn,
  isModalOpen,
  setIsModalOpen,
  DocId,
  handleStudentUpdated,
}) => {
  const [getPassword, setGetPassword] = useState(null);
  const [validPassword, setValidPassword] = useState(false);
  const [activeCom, setActiveCom] = useState(1);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [newSlabName, setNewSlabName] = useState("");
  const [trackActiveCom, setTrackActiveCom] = useState(1);

  const handleAddSlab = () => {};
  const handleInputChange = (e) => {
    const password = e.target.value;
    setGetPassword(password);
    const isValid = true;
    setValidPassword(isValid);
  };

  if (!isModalOpen) return null;

  return (
    <Modal setShowModal={setIsModalOpen}>
      <h2 className="text-[20px] font-bold text-left bg-[#333333] text-white addTeacher-header">
        Enter Password
      </h2>
      <div className="addTeacher-form">
        <form>
          <div className="addTeacher-components">
            <div className="flex gap-5 items-center">
              <label className="block text-[18px] font-medium text-[#333333]">
                Enter Password
              </label>
              <input
                type="text"
                name="studentId"
                value={getPassword}
                onChange={handleInputChange}
                required
                className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="addTeacher-buttons">
            <button
              type="button"
              disabled={!validPassword}
              className={validPassword ? "" : "invalid-button"}
              onClick={() => {
                setIsModalOpen2(true);
              }}
            >
              Continue
            </button>
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(false);
              }}
              className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white "
            >
              Close
            </button>
          </div>
        </form>
      </div>
      <FeeSlabNamePopUp
        isModalOpen2={isModalOpen2}
        setIsModalOpen2={setIsModalOpen2}
        newSlabName={newSlabName}
        setNewSlabName={setNewSlabName}
        activeCom={trackActiveCom}
        onAddSlab={handleAddSlab}
      />
    </Modal>
  );
};

export default AddOrUpdateStudentForm;
