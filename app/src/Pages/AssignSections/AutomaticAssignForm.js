import React, { useState, useEffect } from "react";
import Modal from "../../Components/Modal";
import Alert from "@mui/material/Alert";
import { assignStudentsToSections } from "../../api/StudentMaster/AddStudentDirectly";


const AutomaticAssignForm = ({
  isModalOpen,
  setIsModalOpen,
  selectedClass,
  sectionOptions,
  totalStudents,
  setTotalStudents,
  listOfStudentsWithoutJoiningSection,
  setDataChanged
}) => {

  const [error, setError] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState(null);
  const [prevInputValues, setPrevInputValues] = useState({});

  useEffect(() => {
    if (isModalOpen) {
      console.log("Open modal");
    }
  }, [isModalOpen]);

  const handleInputChange = (section, e) => {
    const { value } = e.target;
    const newValue = parseInt(value, 10) || 0;
    console.log("sec", section);
    
    setTotalStudents((prevTotalStudents) => {
      const prevValue = prevInputValues[section] || 0;
      const adjustment = prevValue - newValue;
      setPrevInputValues((prev) => ({ ...prev, [section]: newValue }));
      return prevTotalStudents + adjustment;
    });
  };
  
  

  const handleAssign = async () => {
    try {
      sectionOptions.forEach((section) => {
        const inputValue = prevInputValues[section] || 0;
        console.log(`Section ${section}: ${inputValue}`);
      });
  
      await assignStudentsToSections(prevInputValues,listOfStudentsWithoutJoiningSection);
  
      console.log(prevInputValues);
      setDataChanged(true);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating subject data", error);
    }
  };
  

  if (!isModalOpen) return null;

  return (
    <Modal setShowModal={setIsModalOpen}>
      {error && (
        <Alert severity="error" style={{ marginBottom: "10px" }}>
          Fill all the fields
        </Alert>
      )}

      <h2 className="flex justify-between items-center text-[20px] font-bold text-left bg-[#333333] text-white addTeacher-header">
        <span>{"Automatic assign " + selectedClass}</span>
        <span className="pl-20"> Total left: {totalStudents}</span>
      </h2>
      <div className="addTeacher-form">
        <form>
          {sectionOptions.map((section, index) => (
            <div key={index} className="flex justify-between items-center mb-4">
              <label className="block text-[18px] font-medium text-[#333333]">
                Section {section}
              </label>
              <input
                type="number"
                name={`section_${section}`}
                onChange={(e) => handleInputChange(section, e)}
                className="mt-1 p-2 w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          ))}
          <div className="add-subject-btn addTeacher-buttons">
            <button
              type="button"
              onClick={handleAssign}
              disabled={!(totalStudents >= 0)}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed "
            >
              {"Assign"}
            </button>
            <button
              type="button"
              onClick={() => {
               
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

export default AutomaticAssignForm;
