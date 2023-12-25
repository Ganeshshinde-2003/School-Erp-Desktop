import React, { useState, useEffect } from "react";
import Modal from "../../Components/Modal";
import Alert from "@mui/material/Alert";
import "../AddTeacher/AddTeacherForm.css";
import { addNoticeToDatabase } from "../../api/AddNotice/AddNotice";
import { addTimetable } from "../../api/Timetable/Timetable";
import {
  getAllClassesAndSectionNames,
  getSubjectsByClassName,
} from "../../api/ClassMaster/AddClassAndSection";

const UpdateTimetable = ({
  isModalOpen,
  setIsModalOpen,
  day,
  startTime,
  endTime,
  isEditOn,
  subject,
  sectionCode,
  dataToShow,
}) => {
  function extractSectionCode(section) {
    const matches = section.match(/\d+[A-Z]/);
    return matches ? matches[0] : null;
  }

  const extractedSectionCode = extractSectionCode(sectionCode);

  const inticalData = {
    className: extractedSectionCode, // Provide a default value, empty string in this case
    day: "", // Provide a default value
    startTime: "", // Provide a default value
    endTime: "", // Provide a default value
    subject: "", // Provide a default value
  };

  const [timetableDataToSend, SetTimetableDataToSend] = useState(inticalData);
  const [dataToShowforthiscomponent, setDataToShowforthiscomponent] =
    useState(inticalData);
  const [subjectsName, setSubjectsName] = useState([]);

  const [error, setError] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState(null);

  const getSubjectNames = async (className) => {
    console.log(className);
    if (true) {
      console.log(className);
      await getSubjectsByClassName(className).then((data) => {
        setSubjectsName(data);
        console.log(`${className} :`, data);
      });
    }
  };

  useEffect(() => {
    console.log(dataToShow);
    setDataToShowforthiscomponent(dataToShow);
    getSubjectNames(extractedSectionCode);
  },[dataToShow]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    SetTimetableDataToSend((prevData) => ({
      ...prevData,
      [name]: value,
      [day]: dataToShowforthiscomponent?.day,
    }));

    dataToShow[name] = value;
  };

  const handleUpdate = async () => {};

  const handleAdd = async () => {
    try {
      const res = await addTimetable(dataToShow);
      console.log(res.message);
    } catch (error) {
      console.error("Error updating subject data", error);
    }
    // setIsModalOpen(false);
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
        {isEditOn ? "Update Timetable" : "Add Timetable"}
      </h2>
      <div className="addTeacher-form">
        <form>
          <div className="addTeacher-main-form subject-form">
            <div className="form-first">
              <label className="block text-sm font-medium text-gray-700">
                Day
              </label>
              <select
                type="text"
                name="day"
                value={dataToShowforthiscomponent?.day}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">--- Select ---</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>


      </select> 
            </div>
            <div className="flex justify-between items-center">
            <label className="block text-sm w-[200px] font-medium text-gray-700">
            Subject
          </label>
            <select
            name="subject"
            value={dataToShowforthiscomponent?.subject}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-[92%] border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">--- Select ---</option>
            {subjectsName.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
            </select>
            </div>
            <div className="flex justify-between items-center">
              <label className="block text-sm w-[200px] font-medium text-gray-700">
                Start Time
              </label>
              <input
                type="text"
                rows="6"
                placeholder="HH:MM am/pm"
                name="startTime"
                value={dataToShowforthiscomponent?.startTime}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-[92%] border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="flex justify-between items-center">
              <label className="block text-sm w-[200px] font-medium text-gray-700">
                End Time
              </label>
              <input
                type="text"
                placeholder="HH:MM am/pm"
                rows="6"
                name="endTime"
                value={dataToShowforthiscomponent?.endTime}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-[92%] border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="add-subject-btn addTeacher-buttons">
            <button
              type="button"
              onClick={handleAdd}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white "
            >
              {isEditOn ? "Update" : "Add"}
            </button>
            <button
              type="button"
              onClick={() => {
                SetTimetableDataToSend(inticalData);
                setDataToShowforthiscomponent(inticalData);
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

export default UpdateTimetable;
