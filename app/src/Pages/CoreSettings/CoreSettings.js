import React from "react";
import { useState } from "react";
import "./CoreSettings.css";
import AddOrUpdateStudentForm from "./CoreSettingsVerification.js";
import "../../App.css";
import ButtonComponent from "../../Components/ButtonComponent.js";

const CoreSettings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentUpdate, setStudentUpdate] = useState(false);
  const [docId, setDocId] = useState(null);

  const openModal = async () => {
    console.log("Open modal");
    setIsModalOpen(true);
  };

  const handleStudentUpdated = () => {
    setStudentUpdate(false);
  };
  return (
    <form className="mt-4 w-full">
      <div className="m-10 flex flex-col gap-10">
        <div className="components-coresettings">
          <p className="text-[18px]">Fee Collection Account Details </p>
          <ButtonComponent
            buttonText={"Set Details"}
            onClickButton={openModal}
          />
        </div>
        <div className="components-coresettings">
          <p className="text-[18px]">Academic Year Start Date </p>
          <input
            type="date"
            name="admissionDate"
            required
            className="mt-1 p-2 block w-[47%] border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="components-coresettings">
          <p className="text-[18px]">Academic Year End Date </p>
          <input
            type="date"
            name="admissionDate"
            required
            className="mt-1 p-2 block w-[47%] border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="components-coresettings">
          <p className="text-[18px]">Admission Start Date </p>
          <input
            type="date"
            name="admissionDate"
            required
            className="mt-1 p-2 block w-[47%] border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="components-coresettings">
          <p className="text-[18px]">Admission End Date </p>
          <input
            type="date"
            name="admissionDate"
            required
            className="mt-1 p-2 block w-[47%] border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>
      <AddOrUpdateStudentForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleStudentUpdated={handleStudentUpdated}
        DocId={docId}
        isUpdateOn={studentUpdate}
      />
    </form>
  );
};

export default CoreSettings;
