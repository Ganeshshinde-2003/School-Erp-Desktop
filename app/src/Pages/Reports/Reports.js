import React, { useEffect, useState } from "react";
import "./Reports.css";
import ButtonComponent from "../../Components/ButtonComponent";
import ClassRankList from "./ClassRankList";
import CerticationAllOnce from "./CertifiAll";
import {
  getAllSectionsByClassName,
  getAllclassNames,
} from "../../api/ClassMaster/AddClassAndSection";
import { getCustomDataForReport } from "../../api/ReportAndAllocation/Reports";
import DynamicTable from "../../Components/DynamicTable";
import TableTitle from "../../Components/TableTitle";

const Reports = () => {
  const initialData = {
    Name: false,
    "Student ID": false,
    Class: false,
    Section: false,
    "Fee Slab": false,
    "Tranport Slab": false,
    "Attendance Percentage": false,
    "Optional Subjects chosen": false,
    Classname: "",
    Sectionname: "",
  };
  const checkPointshalf = [
    "Name",
    "Class",
    "Fee Slab",
    "Tranport Slab",
    "Attendance Percentage",
  ];
  const checkPointsotherhalf = [
    "Student ID",
    "Section",
    "Optional Subjects chosen",
  ];
  const [reportData, setReportData] = useState(initialData);
  const [feesPendingChecked, setFeesPendingChecked] = useState(false);
  const [transportChecked, setTransportChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [allClassesName, setAllClassesName] = useState(null);
  const [allSectionWithclass, setAllSectionWithClass] = useState(null);
  const [isDynamic, setIsDynamic] = useState(false);
  const [dynamicTableData, setDynamicTableData] = useState(null);

  const openModal = async () => {
    console.log("Open modal");
    setIsModalOpen(true);
  };

  const openModal2 = async () => {
    console.log("Open modal");
    setIsModalOpen2(true);
  };

  const getAllClasses = async () => {
    const data = await getAllclassNames();
    setAllClassesName(data);
    if (reportData.Classname !== "") {
      const sectionData = await getAllSectionsByClassName(reportData.Classname);
      setAllSectionWithClass(sectionData);
    }
  };

  const handleInputChange1 = (e) => {
    const { name, value } = e.target;
    setReportData({
      ...reportData,
      [name]: value,
    });
  };

  const handleInputChange2 = (e) => {
    const { name, checked } = e.target;

    setReportData((prevReportData) => ({
      ...prevReportData,
      [name]: checked,
    }));
  };

  const handleDownload = async () => {
    const formatedData = {
      includeName: reportData.Name,
      includeStudentID: reportData["Student ID"],
      includeClass: reportData.Class,
      includeSection: reportData.Section,
      includefeeslab: reportData["Fee Slab"],
      includeTransportSlab: reportData["Tranport Slab"],
      includeAttendancePercentage: reportData["Attendance Percentage"],
      includeOptionalSubjects: reportData["Optional Subjects chosen"],
      class: reportData.Classname,
      section: reportData.Sectionname,
    };

    console.log(formatedData);

    const response = await getCustomDataForReport(formatedData);
    setDynamicTableData(response);
    console.log(dynamicTableData);

    if (response !== null) {
      setIsDynamic(true);
    }
  };

  useEffect(() => {
    getAllClasses();
  }, [reportData.Classname]);

  return (
    <div className="reports-container">
      <form className="reports-wrapper">
        <div className="reports-selections">
          <div className="reports-part">
            <div>
              <label>Class</label>
              <select
                name="Classname"
                value={reportData.Classname}
                onChange={handleInputChange1}
              >
                <option value="">Select Class</option>
                {allClassesName?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Section</label>
              <select
                name="Sectionname"
                value={reportData.Sectionname}
                onChange={handleInputChange1}
              >
                <option value="">Select Section</option>
                {allSectionWithclass?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
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
                  onChange={handleInputChange2}
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
                  onChange={handleInputChange2}
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
              {/* {feesPendingChecked && (
                <div>
                  <select>
                    <option value="">Select </option>
                    <option value="Type1">Type 1</option>
                    <option value="Type2">Type 2</option>
                  </select>
                </div>
              )} */}
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
              {/* {transportChecked && (
                <div>
                  <select>
                    <option value="">Select </option>
                    <option value="Type1">Type 1</option>
                    <option value="Type2">Type 2</option>
                  </select>
                </div>
              )} */}
            </div>
          </div>
        </div>
        <div className="reports-download-button">
          <ButtonComponent
            buttonText={"Download"}
            onClickButton={handleDownload}
            isUpdateDisabled={false}
          />
        </div>
      </form>

      {isDynamic && (
        <div className="add-optional-sub-table">
          <TableTitle title={"Student Report"} />
          <DynamicTable
            data={dynamicTableData}
            rowHeight={100}
            action={false}
            ispanding={false}
            isLocateOn={false}
            attendanceStatus={false}
            selectSection={false}
            sectionList={false}
            csvFileName="Report-Data"
          />
        </div>
      )}

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
