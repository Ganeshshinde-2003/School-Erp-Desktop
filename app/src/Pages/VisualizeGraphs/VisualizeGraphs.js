import React, { useState, useEffect } from "react";

import BarGraph from "../../Components/BarGraph";
import BarGraphData from "../../Database/BarGraphData";

const VisualizeGraphs = () => {
  const [attendanceBarGraphData, setAttendanceBarGraphData] = useState({
    labels: BarGraphData.map((data) => data.class),
    datasets: [
      {
        label: "Student Attendance",
        data: BarGraphData.map((data) => data.attendance),
        backgroundColor: ["red", "#ecf0f1", "#50AF95", "#F3ba2f", "#2a71d0"],
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  });
  return (
    <div className="w-3/4">
        <BarGraph data={attendanceBarGraphData} />
      </div>
  )
}

export default VisualizeGraphs