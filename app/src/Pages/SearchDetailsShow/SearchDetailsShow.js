import React from "react";
import { useState } from 'react';
import { useLocation, useParams } from "react-router-dom";
import TextNameComponent from "../../Components/TextNameComponent";
import "./SearchDetails.css";
import svgImage from "./add.png";
import Classes  from "../../Database/Classes";

const SearchDetailsShow = () => {
  const { id } = useParams();
  const location = useLocation();
  const { resultData } = location.state || {};
  const who = location.state?.who || " ";
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const months = [
    "January", "February", "March", "April", "May", "June",
  ];

  const handleToggle1 = () => {
    setIsChecked1(!isChecked1);
  };

  const handleToggle2 = () => {
    setIsChecked2(!isChecked2);
  };

  console.log(resultData);

  return (
    <div>
      {resultData && (
        <div>
        <div className="search-wrapper-details">
          <div className="search-container-details">
            <div className="search-wrapper">
              <TextNameComponent
                head="Name"
                disc={`${resultData.firstName} ${resultData.lastName}`}
              />
              <TextNameComponent
                head="Class"
                disc={
                  who === "student"
                    ? resultData.joiningClass
                    : resultData.classTeacher
                }
              />
              <TextNameComponent head="Mobile No." disc={resultData.mobileNo} />
              <TextNameComponent
                head="Year joined"
                disc={
                  who === "student"
                    ? resultData.admissionDate
                    : resultData.experienceDetails.joiningDate
                }
              />
            </div>
            <div className="search-wrapper">
              <TextNameComponent
                head={who === "student" ? "StudentId" : "TeacherId"}
                disc={
                  who === "student"
                    ? resultData.studentId
                    : resultData.teacherId
                }
              />
              <TextNameComponent
                head="Transport Slab"
                disc={resultData.transportSlab}
              />
              <TextNameComponent
                head={who === "student" ? "Fee Slab" : "Designation"}
                disc={
                  who === "student"
                    ? resultData.feeslab
                    : resultData.designation
                }
              />
              <TextNameComponent
                head="Section"
                disc={
                  who === "student"
                    ? resultData.joiningClass
                    : resultData.assignClasses?.class || "N/A"
                }
              />
            </div>
          </div>
          <div className="profile-container">
            {resultData.profilePic && (
              <img
                src={resultData.profilePic}
                alt={`${resultData.firstName} ${resultData.lastName}`}
                className="profile-img-search-details"
              />
            )}
          </div>
          <div>
          </div>
        </div>
        {who === "student" && (
    <div>
      <div className="Fees">
        <div>
          <div className="fees-section">
            <div className="fees-container">
              <h3 className="fees-text">Application Fees</h3><button className="option-button">Receipt</button>
            </div>
            <div className="fees-container">
              <h3 className="fees-text-2">Admission Fees</h3><button className="pay-button ">Take Fees</button>
            </div>
          </div>
       </div>
       <div className="fees-section">
        <div className="fees-container">
              <h2 className="Regular-Fees">Regular Fees</h2>
              <p className="mode">Annually</p>
              <label className="toggle-switch">
                <input type="checkbox" checked={isChecked1} onChange={handleToggle1} />
                <span className="slider round"></span>
                </label>
              <p className="mode">Monthly</p>
              <hr></hr>
        </div>
        <div>
          <br></br>
          <hr></hr>
        <div>
          <div className="flex">
                <p className="month">January</p>
                <button className="pay-button1">Take Fees</button>
          </div>
          <div className="flex">
                <p className="month">February</p>
                <button className="pay-button1">Take Fees</button>
          </div>
          <div className="flex">
                <p className="month">March</p>
                <button className="pay-button1 ">Take Fees</button>
          </div>
        </div>
        </div>
       </div>
       <div className="fees-section">
        <div className="fees-container">
              <h2 className="Regular-Fees">Transport Fees</h2>
              <p className="mode">Annually</p>
              <label className="toggle-switch">
                <input type="checkbox" checked={isChecked2} onChange={handleToggle2} />
                <span className="slider round"></span>
                </label>
              <p className="mode">Monthly</p>
              <hr></hr>
        </div>
        <div>
          <br></br>
          <hr></hr>
          <div className="flex">
                <p className="month">January</p>
                <button className="pay-button">Take Fees</button>
          </div>
          <div className="flex">
                <p className="month">February</p>
                <button className="pay-button">Take Fees</button>
          </div>
          <div className="flex">
                <p className="month">March</p>
                <button className="pay-button">Take Fees</button>
          </div>
        </div>
      </div>
    </div>
    <div className="marks-section">
        <div className="marks-container">
          <div className="marks-container">
            <h3 className="downloads-1">Marks Card</h3><button className="option-button">Download</button>
          </div>
          <div className="marks-container">
            <h3 className="downloads-1">Hall Ticket</h3><button className="option-button">Download</button>
          </div>
        </div>
        <div className="marks-container">
          <div className="marks-container">
              <h3 className="downloads">Previous year Data</h3><button className="option-button">Download</button>
          </div>
          <div className="marks-container">
              <h3 className="downloads">No Due Certificate</h3><button className="option-button">Download</button>
          </div>
       </div>
    </div>
    <div className="ExamAttendance">
        <div className="exam-section">
          <h3 className="exam">Exam wise Grades</h3>
            <hr></hr>
            <div className="flex">
                <p className="month">January</p>
                <button className="pay-button">Take Fees</button>
          </div>
          <div className="flex">
                <p className="month">February</p>
                <button className="pay-button">Take Fees</button>
          </div>
          <div className="flex">
                <p className="month">March</p>
                <button className="pay-button">Take Fees</button>
          </div>
         
        </div>
    </div>
   
  </div> )}
   {who !== "student" && (
  <div className="ExamAttendance">
      <div className="Fees">
        <div>
          <div className="fees-section2">
              <h2>Assign Classes</h2>
              <img src={svgImage} alt="SVG Image" />
              <hr></hr>
              <div>
                {Classes.map(Classes =>(
                 <Section value={Classes.text}/>
                )
                  )}
              </div>
          </div>
       </div>
       <div className="fees-section">
        <div className="fees-container">
              <h2 className="Regular-Fees">Syllabus Completed</h2>
              <hr></hr>
        </div>
        <div>
          <br></br>
          <hr></hr>
          <div className="Month">
          </div>
        </div>
       </div>
       <div className="fees-section">
        <div className="fees-container">
              <h2 className="Regular-Fees">Salary Payments</h2>
              <hr></hr>
        </div>
        <div>
          <br></br>
          <hr></hr>
        </div>
      </div>
    </div>
    </div> )}
      </div>
      )}
    </div>
  );
};

export default SearchDetailsShow;
