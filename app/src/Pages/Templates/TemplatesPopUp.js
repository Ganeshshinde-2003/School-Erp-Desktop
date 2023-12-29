import React, { useState, useEffect } from "react";
import Modal from "../../Components/Modal";
import Alert from "@mui/material/Alert";
import "../AddTeacher/AddTeacherForm.css";

const TemplatePopUp = ({ isModalOpen, setIsModalOpen, dataToShow }) => {
  const inticalData = {
    expenseName: "",
    amount: 0,
    description: "",
  };
  console.log(dataToShow);
  const [expenseData, setExpenseData] = useState(inticalData);
  const [error, setError] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState(null);

  //   useEffect(() => {
  //     if (isModalOpen && isUpdateOn) {
  //       getexpenseData(DocId);
  //     }
  //   }, [isModalOpen, isUpdateOn]);

  //   const getexpenseData = async (DocId) => {
  //     try {
  //       const subject = await getSpecificExpenseDataFromDb(DocId);

  //       if (subject) {
  //         setExpenseData(subject);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching subject data", error);
  //     }
  //   };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpenseData({
      ...expenseData,
      [name]: value,
    });
  };

  //   const handleUpdate = async () => {
  //     try {
  //       const response = await updateExpenseDataToDatabase(DocId, expenseData);

  //       setConfirmationMessage(response.message);

  //       setExpenseData(inticalData);

  //       setTimeout(() => {
  //         setConfirmationMessage(null);
  //         setIsModalOpen(false);
  //         handleExpenseUpdated();
  //       }, 2000);
  //     } catch (error) {
  //       console.error("Error updating subject data", error);
  //     }
  //   };

  //   const handleAdd = async () => {
  //     try {
  //       const response = await addExpenseDataToDb(expenseData);
  //       // Show a confirmation message
  //       setConfirmationMessage(response.message);

  //       setExpenseData(inticalData);
  //     } catch (error) {
  //       console.error("Error updating subject data", error);
  //     }
  //     setTimeout(() => {
  //       setConfirmationMessage(null);
  //       setIsModalOpen(false);
  //       handleExpenseAdded();
  //     }, 2000); // Hide the message after 2 seconds
  //   };

  if (!isModalOpen) return null;

  return (
    <Modal setShowModal={setIsModalOpen}>
      {error && (
        <Alert severity="error" style={{ marginBottom: "10px" }}>
          Fill all the fields
        </Alert>
      )}

      <h2 className="text-[20px] font-bold text-left bg-[#333333] text-white addTeacher-header">
        {`Choose Template for - ${dataToShow.name}`}
      </h2>
      <div className="addTeacher-form">
        <form>
          <div className="addTeacher-main-form subject-form">
            <div key="template">
              <div className="grid grid-cols-2 gap-4 template-items">
                {dataToShow.data.map((item, dataIndex) => (
                  <div key={dataIndex} className="template-design">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="add-subject-btn addTeacher-buttons">
            <button
              type="button"
              onClick={() => {}}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white "
            >
              Select
            </button>
            <button
              type="button"
              onClick={() => {
                setExpenseData(inticalData);
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

export default TemplatePopUp;
