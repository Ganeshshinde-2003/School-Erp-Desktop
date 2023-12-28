import React, { useState, useEffect } from "react";
import "./CoreSettings.css";
import AddOrUpdateStudentForm from "./CoreSettingsVerification.js";
import "../../App.css";
import ButtonComponent from "../../Components/ButtonComponent.js";
import FeeCollectionDetailsModal from "./CoreSettingDetailsForm";
import { updateOrCreateAcademicYearInDb, updateOrCreateAdmissionDataInDb, updateOrCreateFeeCollectionDetailsInDb, getAcademicYearDatesFromDb, getAdmissionDatesFromDb } from "../../api/CoreFunctions/CoreSettings.js";

const CoreSettings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentUpdate, setStudentUpdate] = useState(false);
  const [docId, setDocId] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);

  // State for academic year dates
  const [academicYearStartDate, setAcademicYearStartDate] = useState("");
  const [academicYearEndDate, setAcademicYearEndDate] = useState("");
  const [admissionStartDate, setAdmissionStartDate] = useState("");
  const [admissionEndDate, setAdmissionEndDate] = useState("");

  // State for fee collection details
  const [feeCollectionData, setFeeCollectionData] = useState({
    feeCollectionAccountNo: "",
    ifscCode: "",
    accountHoldersName: "",
    bankName: "",
  });

  // Fetch academic year dates on component mount
  useEffect(() => {
    const fetchAcademicYearDates = async () => {
      try {
        const academicYearDates = await getAcademicYearDatesFromDb();
        const admissionYearDates = await getAdmissionDatesFromDb();
        console.log(admissionYearDates);
        console.log(academicYearDates);
        if (academicYearDates) {
          setAcademicYearStartDate(academicYearDates.startDate);
          setAcademicYearEndDate(academicYearDates.endDate);
          setAdmissionStartDate(admissionYearDates.startDate);
          setAdmissionEndDate(admissionYearDates.endDate);
        }
      } catch (error) {
        console.error("Error fetching academic year dates: ", error);
      }
    };

    fetchAcademicYearDates();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleStudentUpdated = () => {
    setIsDisabled(false);
    setStudentUpdate(false);
  };

  const handleadmissionDateEndChange = (value) => {
    setIsDisabled(false);
    setAdmissionEndDate(value);
  };

  const handleadmissionDateStartChange = (value) => {
    setIsDisabled(false);
    setAdmissionStartDate(value);
  };

  const handleAcademicYearStartDateChange = (value) => {
    setIsDisabled(false);
    setAcademicYearStartDate(value);
  };

  const handleAcademicYearEndDateChange = (value) => {
    setIsDisabled(false);
    setAcademicYearEndDate(value);
  };



  const handleFeeCollectionUpdate = async () => {
    try {
      const result = await updateOrCreateFeeCollectionDetailsInDb(feeCollectionData);
      console.log(result);
      setStudentUpdate(true);
    } catch (error) {
      console.error("Error updating fee collection details: ", error);
    }
  };

  const handleUpdateClick = async () => {
    try{
      setIsDisabled(true);
      const academicYearData = {
        startDate: academicYearStartDate,
        endDate: academicYearEndDate,
      };

      const admissionData = {
        startDate: admissionStartDate,
        endDate: admissionEndDate,
      };

      await updateOrCreateAcademicYearInDb(academicYearData);
      await updateOrCreateAdmissionDataInDb(admissionData);

    }
    catch (error){
      console.error("Error updating fee collection details: ", error);
    }
  }

  return (
    <form className="mt-4 w-full">
      <div className="m-10 flex flex-col gap-10">
        <div className="components-coresettings">
          <p className="text-[18px]">Fee Collection Account Details </p>
          <ButtonComponent buttonText={"Set Details"} onClickButton={openModal} />
        </div>
        <div className="components-coresettings">
          <p className="text-[18px]">Academic Year Start Date </p>
          <input
          type="date"
          value={academicYearStartDate}
          name="admissionDate"
          onChange={(e) => handleAcademicYearStartDateChange(e.target.value)}
          required
          className="mt-1 p-2 block w-[47%] border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="components-coresettings">
        <p className="text-[18px]">Academic Year End Date </p>
        <input
          type="date"
          name="admissionDate"
          value={academicYearEndDate}
          onChange={(e) => handleAcademicYearEndDateChange(e.target.value)}
          required
          className="mt-1 p-2 block w-[47%] border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="components-coresettings">
        <p className="text-[18px]">Admission Start Date </p>
        <input
          type="date"
          name="admissionDate"
          value={admissionStartDate}
          onChange={(e) => handleadmissionDateStartChange(e.target.value)}
          required
          className="mt-1 p-2 block w-[47%] border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="components-coresettings">
        <p className="text-[18px]">Admission End Date </p>
        <input
          type="date"
          name="admissionDate"
          value={admissionEndDate}
          onChange={(e) => handleadmissionDateEndChange(e.target.value)}
          required
          className="mt-1 p-2 block w-[47%] border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        </div>
        </div>
        <div className="update-btn-core-settings">
        <ButtonComponent isUpdateDisabled={isDisabled} buttonText={"Update"} onClickButton={handleUpdateClick} />
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
