import React, { useEffect, useState } from "react";
import { FaEdit, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { ImCross } from "react-icons/im";

import "./DynamicTable.css";
import AddButton from "./AddButton";
import { getSectionOfParticularStudent } from "../api/StudentMaster/AddStudentDirectly";

const DynamicTable = ({
  data,
  rowHeight,
  action,
  handleAction,
  ispanding,
  attendanceStatus,
  selectSection,
  sectionList,
  onChangeSection,
}) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  if (!data || data.length === 0) {
    return <div>No data to display</div>;
  }

  const hiddenColumns = ["id", "Status"];
  const columns = Object.keys(data[0]).filter(
    (column) => !hiddenColumns.includes(column)
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  return (
    <div>
      <table className="min-w-full border-collapse">
        <thead className="table-cols">
          <tr>
            <th className={`h-[${rowHeight}px] py-2 px-4 text-center color-white bg-gray-200 border border-gray-300`}>
              SI.No
            </th>
            {columns.map((column) => (
              <th className={`h-[${rowHeight}px] py-2 px-4 text-center bg-gray-200 border border-gray-300`} key={column}>
                {column}
              </th>
            ))}
            {action && (
              <th className={`h-[${rowHeight}px] py-2 px-4 text-center bg-gray-200 border border-gray-300`}>
                Edit/Delete
              </th>
            )}
            {ispanding && (
              <th className={`h-[${rowHeight}px] py-2 px-4 text-center bg-gray-200 border border-gray-300`}>
                Approve/disapprove
              </th>
            )}
            {attendanceStatus && (
              <th className={`h-[${rowHeight}px] py-2 px-4 text-center bg-gray-200 border border-gray-300`}>
                Attendance Status
              </th>
            )}
            {selectSection && (
              <th className={`h-[${rowHeight}px] py-2 px-4 text-center bg-gray-200 border border-gray-300`}>
                Select Section
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, rowIndex) => (
            <tr key={rowIndex} className={`h-[${rowHeight}px]`}>
              <td className="py-2 px-4 border border-gray-300 text-center">
                {startIndex + rowIndex + 1}
              </td>
              {columns.map((column) => (
                <td className="py-2 px-4 border border-gray-300 text-center" key={column}>
                  {row[column]}
                </td>
              ))}
              {action && (
                <td className={`h-[${rowHeight}px] py-2 px-4 border border-gray-300 text-center`}>
                  <div className="flex items-center justify-around">
                    <FaEdit
                      onClick={() => handleAction("edit", row.id)}
                      className="cursor-pointer text-blue-500 mr-2"
                    />
                    <ImCross
                      onClick={() => handleAction("delete", row.id)}
                      className="w-5 h-5 cursor-pointer text-white mr-1 rounded-full bg-red-500 p-1"
                    />
                  </div>
                </td>
              )}
              {ispanding && (
                <td className={`h-[${rowHeight}px] py-2 px-4 border border-gray-300 text-center`}>
                  <div className="flex items-center justify-around">
                    <button
                      onClick={() => handleAction("approve", row.id)}
                      className="cursor-pointer text-white font-semibold rounded bg-green-500 px-3 py-1 mr-2"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleAction("disapprove", row.id)}
                      className="cursor-pointer text-white font-semibold rounded bg-red-500 px-3 py-1 mr-1"
                    >
                      Disapprove
                    </button>
                  </div>
                </td>
              )}
              {attendanceStatus && (
                <td className={`h-[${rowHeight}px] py-2 px-4 border border-gray-300 text-center`}>
                  <div className="flex items-center justify-around">
                    <button
                      onClick={() => handleAction("toggle", row.EmpId)}
                      className={`cursor-pointer text-white font-semibold rounded px-3 py-1 mr-2 ${row.Status ? "bg-green-500" : "bg-red-500"}`}
                    >
                      {row.Status ? "Present" : "Absent"}
                    </button>
                  </div>
                </td>
              )}
              {selectSection && (
                <td className={`h-[${rowHeight}px] py-2 px-4 border border-gray-300 text-center`}>
                  <div className="flex items-center justify-around">
                    {/* Updated code here */}
                    <AsyncSectionSelect
                      studentId={row["Student Id"]}
                      sectionList={sectionList}
                      onChangeSection={onChangeSection}
                    />
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination buttons */}
      {data.length > itemsPerPage && (
        <div className="flex justify-center py-2 bg-[#B5B5B5]">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-[10px] py-2 mr-2 ${currentPage === 1 ? 'bg-gray-500 text-white' : 'bg-blue-500 text-white'}`}
            style={{ borderRadius: '50%' }}
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={endIndex >= data.length}
            className={`px-[10px] py-2 ${endIndex >= data.length ? 'bg-gray-500 text-white' : 'bg-blue-500 text-white'}`}
            style={{ borderRadius: '50%' }}
          >
            <FaArrowRight />
          </button>
        </div>
      )}
    </div>
  );
};

const AsyncSectionSelect = ({ studentId, sectionList, onChangeSection }) => {
  const [selectedSection, setSelectedSection] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const section = await getSectionOfParticularStudent(studentId);
        setSelectedSection(section);
      } catch (error) {
        console.error("Error fetching section:", error);
      }
    };

    fetchData();
  }, [studentId]);

  return (
    <select
      value={selectedSection}
      onChange={(e) => {
        onChangeSection(e.target.value, studentId);
        setSelectedSection(e.target.value);
      }}
      className="mt-1 block py-2 px-3 border text-white bg-[#333333] border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
    >
      <option value="">-- Select --</option>
      {sectionList.map((options) => (
        <option key={options} value={options}>
          {options}
        </option>
      ))}
    </select>
  );
};

export default DynamicTable;
