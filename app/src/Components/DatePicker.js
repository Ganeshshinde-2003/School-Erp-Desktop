import React, { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner"; // Assuming you are using the Oval component for loading
import "../Pages/PutAttendance/PutAttendancs.css";
import {
  getAttendanceList,
  storeStaffAttendance,
} from "../api/StaffAttendance/StaffAttendance";
import DynamicTable from "./DynamicTable";
import { toast } from "react-toastify";

const DatePicker = ({ minDate, maxDate }) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const getNumberDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getSortedDays = (year, month) => {
    const dayIndex = new Date(year, month, 1).getDay();
    const firstHalf = days.slice(dayIndex);
    return [...firstHalf, ...days.slice(0, dayIndex)];
  };

  const range = (start, end) => {
    const length = Math.abs((end - start) / 1);
    const { result } = Array.from({ length }).reduce(
      ({ result, current }) => ({
        result: [...result, current],
        current: current + 1,
      }),
      { result: [], current: start }
    );

    return result;
  };

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [attendanceList, setAttendanceList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [attendanceData, setAttendanceData] = useState({});

  const formatToYYYYMMDD = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const fetchAttendanceList = async (selectedDate2) => {
    const formattedDate = formatToYYYYMMDD(selectedDate2);

    try {
      const attlist = await getAttendanceList(formattedDate);
      setAttendanceList(attlist);
      console.log(attlist);

      const transformedData = {
        staffArray: attlist.map((entry) => ({
          staffid: entry.EmpId,
          isPresent: entry.Status,
        })),
        date: formattedDate,
      };
      setAttendanceData(transformedData);
    } catch (error) {
      console.error("Error fetching attendance list:", error);
      toast.error("Error fetching data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendanceList(selectedDate);
  }, [selectedDate]);

  const nextMonth = () => {
    if (currentMonth < 11) {
      setCurrentMonth((prev) => prev + 1);
    } else {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    }
  };

  const prevMonth = () => {
    if (currentMonth > 0) {
      setCurrentMonth((prev) => prev - 1);
    } else {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    }
  };

  const handleSelectedDate = async (event) => {
    setIsButtonDisabled(true);
    if (event.target.id === "day") {
      const selectedDay = event.target.getAttribute("data-day");
      const newSelectedDate = new Date(currentYear, currentMonth, selectedDay);

      setSelectedDate(newSelectedDate);
      setIsLoading(true);
      fetchAttendanceList(newSelectedDate);
    }
  };

  const getTimeFromState = (_day) => {
    return new Date(currentYear, currentMonth, _day).getTime();
  };

  const handleAction = async (actionType, staffId) => {
    setIsButtonDisabled(false);
    if (actionType === "toggle") {
      setAttendanceData((attendanceData) => {
        const updatedStaffArray = attendanceData.staffArray.map((staff) => {
          if (staff.staffid === staffId) {
            return {
              ...staff,
              isPresent: !staff.isPresent, // Toggle the isPresent value
            };
          }
          return staff;
        });

        const updatedAttendanceList = attendanceList.map((entry) => {
          if (entry.EmpId === staffId) {
            return {
              ...entry,
              Status: !entry.Status, // Toggle the Status value
            };
          }
          return entry;
        });

        setAttendanceList(updatedAttendanceList);
        return {
          ...attendanceData,
          staffArray: updatedStaffArray,
        };
      });
    }
  };

  const handleSaveAttendence = async () => {
    const response = await storeStaffAttendance(attendanceData);
    console.log(response.message);
  };

  return (
    <div className="flex flex-col w-full items-center">
      <div className="pickerWrapper mb-10">
        <div className="headerDate">
          <button
            onClick={prevMonth}
            disabled={minDate?.getTime() > getTimeFromState(1)}
          >
            <ion-icon name="chevron-back-outline"></ion-icon>
          </button>
          <p className="month-name">
            {monthNames[currentMonth]} {currentYear}
          </p>
          <button
            onClick={nextMonth}
            disabled={
              maxDate?.getTime() <
              getTimeFromState(getNumberDaysInMonth(currentYear, currentMonth))
            }
          >
            <ion-icon name="chevron-forward-outline"></ion-icon>
          </button>
        </div>
        <div className="bodyDate">
          <div className="sevenColGrid">
            {getSortedDays(currentYear, currentMonth).map((day) => (
              <p key={day} className="month-days">
                {day}
              </p>
            ))}
          </div>
          <div className="sevenColGrid" onClick={handleSelectedDate}>
            {range(1, getNumberDaysInMonth(currentYear, currentMonth) + 1).map(
              (day) => (
                <p
                  key={day}
                  id="day"
                  data-day={day}
                  className={`
                  ${
                    selectedDate?.getTime() ===
                    new Date(currentYear, currentMonth, day).getTime()
                      ? "active"
                      : ""
                  } 
                  ${
                    day === new Date().getDate()
                      ? currentMonth === new Date().getMonth()
                        ? "current-date"
                        : ""
                      : ""
                  }`}
                >
                  {day}
                </p>
              )
            )}
          </div>
        </div>
      </div>
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
      ) : (
        <div className="add-optional-sub-table">
          <h1 className="h-16 text-center font-bold text-white flex items-center justify-center">
            Add Attendance
          </h1>
          <DynamicTable
            data={attendanceList}
            rowHeight={100}
            action={false}
            ispanding={false}
            attendanceStatus={true}
            handleAction={handleAction}
          />
          <p className="h-16 text-center font-bold text-white flex items-center justify-center">
            <button
              type="button"
              disabled={isButtonDisabled}
              style={{
                cursor: isButtonDisabled ? "not-allowed" : "pointer",
              }}
              onClick={handleSaveAttendence}
              className={`cursor-pointer text-white font-semibold rounded px-3 py-1 mr-2 ${
                isButtonDisabled ? "bg-gray-500" : "bg-black"
              }`}
            >
              Save Attendence
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
