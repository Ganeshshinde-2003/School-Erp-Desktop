import React from "react";
import DatePicker from "../../Components/DatePicker";
import "./PutAttendancs.css";

const PutAttendance = () => {
  return (
    <div className="staff-attendance-wrapper">
      <DatePicker
        minDate={new Date(2022, 4, 22)}
        maxDate={new Date(2030, 10, 22)}
      />
    </div>
  );
};

export default PutAttendance;
