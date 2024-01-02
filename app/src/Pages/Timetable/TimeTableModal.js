// TimetableModal.jsx

import React, { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import Modal from "../../Components/Modal";
import { deleteTimetableEntry, getTimetableData } from "../../api/Timetable/Timetable";
import DynamicTable from "../../Components/DynamicTable";
import "../../App.css";
import { FaEdit } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { FaPlus } from "react-icons/fa";
import UpdateTimetable from "./UpdateTImetable";
import AddButton from "../../Components/AddButton";
import AlertComponent from "../../Components/AlertComponent";


function extractSectionCode(section) {
  const matches = section.match(/\d+[A-Z]/);
  return matches ? matches[0] : null;
}



const TimetableModal = ({ isOpen, closeModal, section }) => {
  const [timetableData, setTimetableData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [day, setDay] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isEditOn, setIsEditOn] = useState(false);
  const [subject, setSubject] = useState(null);
  const [sectionCode, setSectionCode] = useState(section);
  const [dataChanged, setDataChanged] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const inticalData = {
    className: extractSectionCode(section), // Provide a default value, empty string in this case
    day: "", // Provide a default value
    startTime: "", // Provide a default value
    endTime: "", // Provide a default value
    subject: "", // Provide a default value
  };
  const [dataToShow, setDataToShow] = useState(inticalData);





  const fetchData = () => {
    var className = extractSectionCode(section);
    getTimetableData(className)
      .then((data) => {
        setTimetableData(data.timetableData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching timetable data:", error);
        setIsLoading(false);
      });
  };


  useEffect(() => {
      // Fetch timetable data for the selected section
      fetchData();
      console.log("======================timetable data ========================",timetableData)
  },[section]);

  if (dataChanged) {
    fetchData();
    setDataChanged(false);
  }

  const handleDataChnage = () => {
    setDataChanged(true);
  };

  const handleAddButtonClick = (day) => {
    // Handle logic for adding new entries for the specific day
    setDay(day);
    setIsEditOn(false);
    const data = {
      className: extractSectionCode(section),
      day: day,
      startTime: "",
      endTime: "",
      subject: "",
    };
    setDataToShow(data);
    setIsModalOpen(true);
    console.log(`Add button clicked for ${day}`);
  };

  const handleEditButtonClick = (day, startTime, endTime, subject) => {
    // Handle logic for editing the selected entry
    setDay(day);
    setStartTime(startTime);
    setEndTime(endTime);
    setSubject(subject);
    setIsEditOn(true);
    const data = {
      className: extractSectionCode(section),
      day: day,
      startTime: startTime,
      endTime: endTime,
      subject: subject,
    };
    setDataToShow(data);
    setIsModalOpen(true);
    console.log(`Edit button clicked for ${day} at ${startTime} - ${endTime} for ${subject}`);
  };

  const handleDeleteButtonClick = async(day, startTime, endTime, subject) => {

    setDay(day);
    setStartTime(startTime);
    setEndTime(endTime);
    setSubject(subject);
    setIsEditOn(true);
    const data = {
      className: extractSectionCode(section),
      day: day,
      startTime: startTime,
      endTime: endTime,
      subject: subject,
    };
    const res = await deleteTimetableEntry(data);
    console.log(res.message);
    
    console.log(`Delete button clicked for ${day} at ${startTime}-${endTime} for ${subject}`);
    setDataChanged(true);
  };

  // const generateTable = () => {
  //   if (!timetableData) {
  //     return null;
  //   }

  //   const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday"];
  //   const allStartTimes = Array.from(
  //     new Set(
  //       days
  //         .flatMap((day) => Object.keys(timetableData[day] || {}))
  //     )
  //   );

  //   const tableData = [];

  //   // Generate table rows
  //   for (const startTime of allStartTimes) {
  //     const rowData = { startTime };

  //     // Populate data and add "Edit" and "Delete" buttons for each day
  //     for (const day of days) {
  //       const entry = timetableData[day] && timetableData[day][startTime];
  //       rowData[day] = entry ? (
  //         <div className="flex items-center space-x-2">
  //           <div>
  //            <b> &nbsp;{`${entry.subject}`}&nbsp;</b>
  //             <br></br>
  //             &nbsp;{`${entry.startTime} - ${entry.endTime}`}&nbsp;
  //             <br></br>
  //             <div className="flex option-btn-timetable">
  //             <FaEdit
  //             onClick={() => handleEditButtonClick(day, entry.startTime, entry.endTime, entry.subject)}
  //             className="cursor-pointer text-blue-500 mr-2"
  //           />
  //           <ImCross
  //           onClick={() => handleDeleteButtonClick(day, entry.startTime, entry.endTime, entry.subject)}
  //             className="w-5 h-5 cursor-pointer text-white mr-1 rounded-full bg-red-500 p-1"
  //           />
         
  //             </div>
  //           </div>
  //         </div>
  //       ) : "";

  //     }

  //     tableData.push(rowData);
  //   }

  //   // Add a row with "+" buttons under each day
  //   const addButtonsRow = {
  //     startTime: (
  //       <div className="flex items-center justify-center">
  //         {/* <button className="bg-green-500 text-white px-5 py-1 rounded-full" onClick={() => handleAddButtonClick("all")}>
  //           + Add Class
  //         </button> */}
  //       </div>
  //     ),
  //     ...days.reduce((acc, day) => {
  //       acc[day] = (
  //           <button className="bg-black text-white px-2 py-1 rounded-full text-sm add-class-btn" onClick={() => handleAddButtonClick(day)}>
  //           <div
  //           className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center absolute"
            
  //         >
  //           <FaPlus className="w-4 h-4 text-white" />
  //         </div>
  //         <span style={{ marginLeft: "15px" }}>Add</span>
  //           </button>
  //       );
  //       return acc;
  //     }, {}),
  //   };

  //   tableData.push(addButtonsRow);

  //   return tableData;
  // };

  const generateTable = () => {
    if (!timetableData) {
      return null;
    }
  
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const allStartTimes = Array.from(
      new Set(
        days.flatMap((day) => Object.keys(timetableData[day] || {}))
      )
    );
  
    // Sort start times
    const sortedStartTimes = allStartTimes.sort((a, b) => {
      const aDate = new Date(`2000-01-01 ${a}`);
      const bDate = new Date(`2000-01-01 ${b}`);
      return aDate - bDate;
    });
  
    const tableData = [];
  

    for (const startTime of sortedStartTimes) {
      const rowData = { };
  
      // Populate data and add "Edit" and "Delete" buttons for each day
      for (const day of days) {
        const entry = timetableData[day] && timetableData[day][startTime];
        rowData[day] = entry ? (
          <div className="flex items-center space-x-2 timetable-block-style justify-center">
            <div>
            
              <b> &nbsp;{`${entry.subject}`}&nbsp;</b>
              <br></br>
              <div className="timetable-timings-style">
              &nbsp;{`${entry.startTime} - ${entry.endTime}`}&nbsp;
              </div>
              <div className="flex option-btn-timetable">
                <FaEdit
                  onClick={() => handleEditButtonClick(day, entry.startTime, entry.endTime, entry.subject)}
                  className="cursor-pointer text-blue-500 mr-2"
                />
                <ImCross
                  onClick={() => handleDeleteButtonClick(day, entry.startTime, entry.endTime, entry.subject)}
                  className="w-5 h-5 cursor-pointer text-white mr-1 rounded-full bg-red-500 p-1"
                />
              </div>
            </div>
          </div>
        ) : "";
      }
  
      tableData.push(rowData);
    }
  
    // Add a row with "+" buttons under each day
    const addButtonsRow = {
      startTime: (
        <div className="flex items-center justify-center">
          {/* <button className="bg-green-500 text-white px-5 py-1 rounded-full" onClick={() => handleAddButtonClick("all")}>
              + Add Class
            </button> */}
        </div>
      ),
      ...days.reduce((acc, day) => {
        acc[day] = (
          <button className="bg-black text-white px-2 py-1 rounded-full text-sm add-class-btn" onClick={() => handleAddButtonClick(day)}>
            <div
              className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center absolute"
            >
              <FaPlus className="w-4 h-4 text-white" />
            </div>
            <span style={{ marginLeft: "15px" }}>Add</span>
          </button>
        );
        return acc;
      }, {}),
    };
  
    tableData.push(addButtonsRow);
  
    return tableData;
  };
  

  const handleUpdateTimetable = () => {
    setDataChanged(true);
  };

  const openModal = () => {
    console.log("Open modal");
    setIsModalOpen(true);
  };

  return (
    <>
    {isLoading ? (
      <div className="oval-styling-timetable">
      <Oval
      height={40}
      width={40}
      color="#333333"
      wrapperStyle={{ textAlign: "center" }}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#B5B5B5"
      strokeWidth={2}
      strokeWidthSecondary={2}
    /> </div>): (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Timetable Modal"
    >
      <div className="modal-content modal-content-style-timetable">
     {!isLoading? <span className="flex justify-between timetable-title-padding bg-[#333333]">
     <h2 className="text-[20px] font-bold text-left bg-[#333333] text-white addTeacher-header">Timetable for {section}</h2> 
     <ImCross
     onClick={closeModal}
     className="w-5 h-5 cursor-pointer text-white mr-1 rounded-full bg-black p-1"
   />
     </span>: null} 

        {isLoading ? (
          <Oval
            height={40}
            width={40}
            color="#333333"
            wrapperStyle={{ textAlign: "center" }}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#B5B5B5"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        ) : timetableData ? (
          <React.Fragment>
            <DynamicTable
              data={generateTable()}
              rowHeight={100}
              action={false}
              ispanding={false}
            />
          </React.Fragment>
        ) : (
          <AddButton buttonText={"Add Timetable"} onClickButton={openModal}  buttonStyle={{
            top: "9vh",
            left: "13vw",
          }}  />
        )}
      </div>
      <UpdateTimetable
      handleDataChnage={handleDataChnage}
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      day={day}
      setDay={setDay}
      startTime={startTime}
      setStartTime={setStartTime}
      endTime={endTime}
      setEndTime={setEndTime}
      subject={subject}
      setSubject={setSubject}
      isEditOn={isEditOn}
      dataToShow={dataToShow}
      sectionCode={sectionCode}
    />
    
              </Modal>)
    }
    </>
  );
};

export default TimetableModal;
