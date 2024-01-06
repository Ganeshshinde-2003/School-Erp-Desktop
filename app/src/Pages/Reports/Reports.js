import React, { useState } from "react";
import "./Reports.css";
import ButtonComponent from "../../Components/ButtonComponent";
import ClassRankList from "./ClassRankList";
import CerticationAllOnce from "./CertifiAll";

const Reports = () => {
  const checkPointshalf = [
    "Name",
    "Class",
    "Fee Slab",
    "Tranport Slab",
    "Attendance percentage",
  ];
  const checkPointsotherhalf = [
    "Student ID",
    "Section",
    "Optional Subjects chosen",
  ];
  const [feesPendingChecked, setFeesPendingChecked] = useState(false);
  const [transportChecked, setTransportChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

  const openModal = async () => {
    console.log("Open modal");
    setIsModalOpen(true);
  };

  const openModal2 = async () => {
    console.log("Open modal");
    setIsModalOpen2(true);
  };

  return (
    <div className="reports-container">
      <form className="reports-wrapper">
        <div className="reports-selections">
          <div className="reports-part">
            <div>
              <label>Class</label>
              <select>
                <option value="">Select Class</option>
                <option value="A">A</option>
                <option value="A">A</option>
              </select>
            </div>
            <div>
              <label>Section</label>
              <select>
                <option value="">Select Section</option>
                <option value="A">A</option>
                <option value="A">A</option>
              </select>
            </div>
          </div>
          <div className="reports-part report-part-two">
            <ButtonComponent
              buttonText={"Class Rank List"}
              onClickButton={openModal}
              isUpdateDisabled={false}
            />
            <ButtonComponent
              buttonText={"Certificates At Once"}
              onClickButton={openModal2}
              isUpdateDisabled={false}
            />
          </div>
        </div>
        <div className="reports-checpoints-list">
          <div className="reports-checkpoints">
            {checkPointshalf.map((subject) => (
              <div key={subject} className="flex gap-3 items-center">
                <input
                  type="checkbox"
                  name={subject}
                  className="mt-1 p-2 w-[24px] h-[24px] block w-half "
                />
                <label className="block text-[18px] font-medium text-white">
                  {subject}
                </label>
              </div>
            ))}
          </div>
          <div className="reports-checkpoints">
            {checkPointsotherhalf.map((subject) => (
              <div key={subject} className="flex gap-3 items-center">
                <input
                  type="checkbox"
                  name={subject}
                  className="mt-1 p-2 w-[24px] h-[24px] block w-half "
                />
                <label className="block text-[18px] font-medium text-white">
                  {subject}
                </label>
              </div>
            ))}
            <div className="flex gap-3 items-center">
              <input
                type="checkbox"
                name="Fees Pending"
                className="mt-1 p-2 w-[24px] h-[24px] block w-half "
                checked={feesPendingChecked}
                onChange={() => setFeesPendingChecked(!feesPendingChecked)}
              />
              <label className="block text-[18px] font-medium text-white">
                Fees Pending
              </label>
              {feesPendingChecked && (
                <div>
                  <select>
                    <option value="">Select </option>
                    <option value="Type1">Type 1</option>
                    <option value="Type2">Type 2</option>
                  </select>
                </div>
              )}
            </div>
            <div className="flex gap-3 items-center">
              <input
                type="checkbox"
                name="Transport Fees pending"
                className="mt-1 p-2 w-[24px] h-[24px] block w-half "
                checked={transportChecked}
                onChange={() => setTransportChecked(!transportChecked)}
              />
              <label className="block text-[18px] font-medium text-white">
                Transport Fees pending
              </label>
              {transportChecked && (
                <div>
                  <select>
                    <option value="">Select </option>
                    <option value="Type1">Type 1</option>
                    <option value="Type2">Type 2</option>
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="reports-download-button">
          <ButtonComponent
            buttonText={"Download"}
            onClickButton={() => {}}
            isUpdateDisabled={false}
          />
        </div>
      </form>
      <ClassRankList
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <CerticationAllOnce
        isModalOpen={isModalOpen2}
        setIsModalOpen={setIsModalOpen2}
      />
    </div>
  );
};

export default Reports;
