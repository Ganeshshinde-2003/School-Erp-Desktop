import React, { useState, useEffect } from "react";
import Modal from "../../Components/Modal";
import Alert from "@mui/material/Alert";
import "../AddTeacher/AddTeacherForm.css";
import { addNoticeToDatabase } from "../../api/AddNotice/AddNotice";

const ClassRankList = ({ isModalOpen, setIsModalOpen }) => {
  const inticalData = {
    noticeTo: "",
    noticeDescription: "",
  };
  const [noticeData, setNoticeData] = useState(inticalData);

  const [error, setError] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setNoticeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleAdd = async () => {
    try {
      const response = await addNoticeToDatabase(noticeData);

      // Show a confirmation message
      setConfirmationMessage(response.message);

      setNoticeData(inticalData);
    } catch (error) {
      console.error("Error updating subject data", error);
    }

    setTimeout(() => {
      setConfirmationMessage(null);
      setIsModalOpen(false);
      handleNoticeAdded();
    }, 2000); // Hide the message after 2 seconds
  };

  if (!isModalOpen) return null;

  return (
    <Modal setShowModal={setIsModalOpen}>
      {error && (
        <Alert severity="error" style={{ marginBottom: "10px" }}>
          Fill all the fields
        </Alert>
      )}

      <h2 className="text-[20px] font-bold text-left bg-[#333333] text-white addTeacher-header">
        {"Update Expense"}
      </h2>
      <div className="addTeacher-form">
        <form>
          <div className="addTeacher-main-form subject-form">
            <div className="form-first">
              <label className="block text-sm font-medium text-gray-700">
                Class*
              </label>
              <select
                type="text"
                name="noticeTo"
                value={noticeData.noticeTo}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">--- Select ---</option>
                <option value="Pysics">Pysics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
                <option value="Maths">Maths</option>
              </select>
            </div>
            <div className="form-first">
              <label className="block text-sm font-medium text-gray-700">
                Section*
              </label>
              <select
                type="text"
                name="noticeTo"
                value={noticeData.noticeTo}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">--- Select ---</option>
                <option value="Pysics">Pysics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
                <option value="Maths">Maths</option>
              </select>
            </div>
            <div className="form-first">
              <label className="block text-sm font-medium text-gray-700">
                Exam*
              </label>
              <select
                type="text"
                name="noticeTo"
                value={noticeData.noticeTo}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">--- Select ---</option>
                <option value="Pysics">Pysics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
                <option value="Maths">Maths</option>
              </select>
            </div>
          </div>
          <div className="add-subject-btn addTeacher-buttons">
            <button
              type="button"
              onClick={handleAdd}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white "
            >
              {"Add"}
            </button>
            <button
              type="button"
              onClick={() => {
                setNoticeData(inticalData);
                setIsModalOpen(false);
              }}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white "
            >
              Close
            </button>
          </div>
        </form>
      </div>

      {confirmationMessage && (
        <div className="text-green-500 mt-4 text-center">
          {confirmationMessage}
        </div>
      )}
    </Modal>
  );
};

export default ClassRankList;
