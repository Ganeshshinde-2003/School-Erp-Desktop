import React from "react";
import DatePicker from "../../Components/DatePicker";
import "./PutAttendancs.css";

const PutAttendance = () => {
  return (
    <div className="staff-attendance-wrapper">
      <DatePicker
        minDate={new Date(2022, 4, 22)}
<<<<<<< HEAD
        maxDate={new Date(2024, 10, 22)}
=======
        maxDate={new Date(2030, 10, 22)}
>>>>>>> 8aab953e5ce37e42d9717ef6d18413c90d8171eb
      />
    </div>
  );
};

export default PutAttendance;
