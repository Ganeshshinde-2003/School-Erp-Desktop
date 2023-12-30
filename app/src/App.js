import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddClassAndSection from "./Pages/AddClassAndSection/AddClassAndSection";
import AddOptionalSubject from "./Pages/AddOptionalSubject/AddOptionalSubject";
import Sidebar from "./Components/Sidebar";
import AddSubjects from "./Pages/AddSubjects/AddSubjects";
import AddTeacher from "./Pages/AddTeacher/AddTeacher.js";
import AddStudent from "./Pages/AddStudentsDirectly/AddStudent.js";
import AddStudentPage from "./Pages/AddStudentApplication/AddStudentApplication.js";
import PendingRequest from "./Pages/PendingRequest/PendingReauest.js";
import AddDriver from "./Pages/AddDriver/AddDriver.js";
import LocateDriver from "./Pages/LocateDriver/LocateDriver.js";
import ExpenseAdding from "./Pages/ExprenseAdding/ExpenseAdding.js";
import AddHoliday from "./Pages/AddHolidays/AddHoliday.js";
import AddStop from "./Pages/AddStopFees/AddOrUpdateStopFees.js";
import AddFeeSlab from "./Pages/AddFeeSlab/AddFeeSlab.js";
import AddNoticePage from "./Pages/AddNotice/AddNotice.js";
import SalaryToTeacher from "./Pages/SalaryToTeacher/SalaryToTeacher.js";
import AddVehicle from "./Pages/AddVehicles/AddVehicle.js";
import AddNonTeachingStaff from "./Pages/AddNonTeachingStaff/AddNonTeachingStaff.js";
import SalaryToNonTeachingStaff from "./Pages/SalaryToNonTeachingStaff/SalaryToNonTeachingStaff.js";
import AddFeeStructure from "./Pages/AddFeeStructure/AddFeeStructure.js";
import TimetablePage from "./Pages/Timetable/AddTimetable.js";
import CheckSyllabus from "./Pages/CheckSyllabus/CheckSyllabus.js";
import AddExams from "./Pages/AddExams/AddExams.js";
import SearchDetailsShow from "./Pages/SearchDetailsShow/SearchDetailsShow.js";
import PutAttendance from "./Pages/PutAttendance/PutAttendance.js";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import CoreSettings from "./Pages/CoreSettings/CoreSettings.js";
import Templates from "./Pages/Templates/Templates.js";
import Users from "./Pages/Users/Users.js";
import LoginPage from "./Pages/Auth/LoginPage.js";
import { UserProvider } from "./Context/UserAuthContext.js";
import LogoutPage from "./Pages/Auth/LogoutPage.js";
import VisualizeGraphs from "./Pages/VisualizeGraphs/VisualizeGraphs.js";
import AssignSections from "./Pages/AssignSections/AssignSections.js";
import Reports from "./Pages/Reports/Reports.js";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <UserProvider>
      <BrowserRouter>
        <div className="flex flex-col">
          {isAuthenticated && <Navbar />}
          <div className="flex">
            {isAuthenticated && <Sidebar />}
            <Routes>
              {!isAuthenticated && (
                <Route
                  path="/*"
                  element={
                    <LoginPage setIsAuthenticated={setIsAuthenticated} />
                  }
                />
              )}
              {isAuthenticated && (
                <>
                  <Route path="/home" element={<Home />} />
                  <Route
                    path="/class-master/add-subjects"
                    element={<AddSubjects />}
                  />
                  <Route
                    path="/class-master/add-optional-subject"
                    element={<AddOptionalSubject />}
                  />

                  <Route
                    path="/class-master/add-class-and-section"
                    element={<AddClassAndSection />}
                  />
                  <Route
                    path="/teacher-master/add-teacher"
                    element={<AddTeacher />}
                  />
                  <Route
                    path="/student-master/add-student"
                    element={<AddStudent />}
                  />
                  <Route
                    path="/transport-master/add-driver"
                    element={<AddDriver />}
                  />
                  <Route
                    path="/transport-master/locate-driver"
                    element={<LocateDriver />}
                  />
                  <Route
                    path="/student-master/add-student-Application"
                    element={<AddStudentPage />}
                  />
                  <Route
                    path="/student-master/pending_request"
                    element={<AddStudent />}
                  />
                  <Route
                    path="/student-master/pending-request"
                    element={<PendingRequest />}
                  />
                  <Route
                    path="/hodidays-master/add-holiday"
                    element={<AddHoliday />}
                  />
                  <Route
                    path="transport-master/add-stops-fees"
                    element={<AddStop />}
                  />
                  <Route
                    path="/expense-adding/add-expense"
                    element={<ExpenseAdding />}
                  />
                  <Route
                    path="/fee-structures/add-fee-slab"
                    element={<AddFeeSlab />}
                  />
                  <Route
                    path="/transport-master/add-vehciles"
                    element={<AddVehicle />}
                  />
                  <Route
                    path="/fee-structures/add-fee-structures"
                    element={<AddFeeStructure />}
                  />
                  <Route
                    path="/send-notice/add-notices"
                    element={<AddNoticePage />}
                  />
                  <Route
                    path="/staff-management/add-non-teaching-staff"
                    element={<AddNonTeachingStaff />}
                  />
                  <Route
                    path="/staff-management/salary-to-teachers"
                    element={<SalaryToTeacher />}
                  />
                  <Route
                    path="/staff-management/salary-to-non-teaching-staff"
                    element={<SalaryToNonTeachingStaff />}
                  />
                  <Route
                    path="/timetable/add-timetable"
                    element={<TimetablePage />}
                  />
                  <Route
                    path="/syllabus/check-syllabus"
                    element={<CheckSyllabus />}
                  />
                  <Route
                    path="/staff-attendance/put-attendance"
                    element={<PutAttendance />}
                  />
                  <Route
                    path="/exam-addition/add-exam"
                    element={<AddExams />}
                  />
                  <Route
                    path="/searchresult/:id"
                    element={<SearchDetailsShow />}
                  />
                  <Route
                    path="/core-functions/core-settings"
                    element={<CoreSettings />}
                  />
                  <Route
                    path="/core-functions/templates"
                    element={<Templates />}
                  />
                  <Route path="/core-functions/users" element={<Users />} />
                  <Route
                    path="/reports-allocation/visualize-graphs"
                    element={<VisualizeGraphs />}
                  />
                  <Route
                    path="/reports-allocation/assign-sections"
                    element={<AssignSections />}
                  />
                  <Route
                    path="/reports-allocation/reports"
                    element={<Reports />}
                  />
                  <Route
                    path="/logout"
                    element={
                      <LogoutPage setIsAuthenticated={setIsAuthenticated} />
                    }
                  />
                </>
              )}
            </Routes>
          </div>
          <ToastContainer position="top-right" />
        </div>
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;