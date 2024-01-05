import React, { useState, useEffect } from "react";
import Modal from "../../Components/Modal";
import Alert from "@mui/material/Alert";
import "../AddTeacher/AddTeacherForm.css";
import {
  addNonTeachingStaffToDb,
  getSpecificStaffDataFromDb,
  updateStaffToDatabase,
} from "../../api/StaffManagement/AddNonTeachingStaff";
import { toast } from "react-toastify";

const AddorUpdateNonTeachingStaff = ({
  isUpdateOn,
  isModalOpen,
  setIsModalOpen,
  DocId,
  handleNonStaffAdded,
  handleNonTeachingstaffUpdated,
}) => {
  const inticalData = {
    firstName: "",
    lastName: "",
    role: "",
    staffId: "",
    mobileNo: null,
    salary: null,
    bloodGroup: "",
    bankAccount: "",
    profilePic: null,
    dob: null,
  };
  const [staffData, setstaffData] = useState(inticalData);

  const [error, setError] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState(null);

  useEffect(() => {
    if (isModalOpen && isUpdateOn) {
      getstaffData(DocId);
    }
  }, [isModalOpen, isUpdateOn]);

  const getstaffData = async (DocId) => {
    try {
      const subject = await getSpecificStaffDataFromDb(DocId);

      if (subject) {
        setstaffData(subject);
      }
    } catch (error) {
      console.error("Error fetching subject data", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, files } = e.target;
    if (name === "profilePic" && files && files[0]) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setstaffData({
          ...staffData,
          [name]: reader.result, // Convert the file to a data URL
        });
      };

      reader.readAsDataURL(files[0]);
    } else {
      setstaffData({
        ...staffData,
        [name]: e.target.value,
      });
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await updateStaffToDatabase(DocId, staffData);

      toast.success(response.message);

      setstaffData(inticalData);

       
    } catch (error) {
      console.error("Error updating subject data", error);
    }
    finally{
      setIsModalOpen(false);
     handleNonTeachingstaffUpdated();
     }
  };

  const handleAdd = async () => {
    if (
      !staffData.firstName ||
      !staffData.lastName ||
      !staffData.mobileNo ||
      !staffData.bankAccount ||
      !staffData.bloodGroup ||
      !staffData.salary ||
      !staffData.dob ||
      !staffData.staffId ||
      !staffData.role
    ) {
      setError(true);
    } else {
      try {
        const response = await addNonTeachingStaffToDb(staffData);
        toast.success(response.message);
        setstaffData(inticalData);
      } catch (error) {
        console.error("Error updating subject data", error);
      }
     finally{
       setIsModalOpen(false);
       handleNonStaffAdded();
     }
    }
  };

  if (!isModalOpen) return null;

  return (
    <Modal setShowModal={setIsModalOpen}>
      {error && (
        <Alert severity="error" style={{ marginBottom: "10px" }}>
          Fill all the fields
        </Alert>
      )}

      <h2 className="text-[20px] font-bold text-left bg-[#333333] text-white addTeacher-header">
        {isUpdateOn ? "Update Staff" : "Add Staff"}
      </h2>
      <div className="addTeacher-form">
        <form>
          <div className="addTeacher-main-form">
            <div className="form-first">
              <div>
                <label className="block text-[18px] font-medium text-[#333333]">
                  First Name*
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={staffData.firstName}
                  onChange={handleInputChange}
                  required
                  className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-[18px] font-medium text-[#333333]">
                  Last Name*
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={staffData.lastName}
                  onChange={handleInputChange}
                  required
                  className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-[18px] font-medium text-[#333333]">
                  Staff I'D*
                </label>
                <input
                  type="text"
                  name="staffId"
                  value={staffData.staffId}
                  onChange={handleInputChange}
                  required
                  className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-[18px] font-medium text-[#333333]">
                  Role*
                </label>
                <input
                  type="text"
                  name="role"
                  value={staffData.role}
                  onChange={handleInputChange}
                  required
                  className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-[18px] font-medium text-[#333333]">
                  Bank AccountNo.*
                </label>
                <input
                  type="text"
                  name="bankAccount"
                  value={staffData.bankAccount}
                  onChange={handleInputChange}
                  required
                  className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="form-first">
              <div>
                <label className="block text-[18px] font-medium text-[#333333]">
                  Mobile No*
                </label>
                <input
                  type="number"
                  name="mobileNo"
                  value={staffData.mobileNo}
                  onChange={handleInputChange}
                  required
                  className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-[18px] font-medium text-[#333333]">
                  Boold Group
                </label>
                <input
                  type="text"
                  name="bloodGroup"
                  value={staffData.bloodGroup}
                  onChange={handleInputChange}
                  required
                  className="mt-1 p-2 block w-[47%] border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-[18px] font-medium text-[#333333]">
                  Salary*
                </label>
                <input
                  type="text"
                  name="salary"
                  value={staffData.salary}
                  onChange={handleInputChange}
                  required
                  className="mt-1 p-2 block w-[47%] border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-[18px] font-medium text-[#333333]">
                  Date of Birth*
                </label>
                <input
                  type="date"
                  name="dob"
                  value={staffData.dob}
                  onChange={handleInputChange}
                  required
                  className="mt-1 p-2 block w-[47%] border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="form-first w-[200px]">
              <label
                htmlFor="fileInput"
                className={`mt-1 p-2 w-half text-[20px] font-bold block h-[200px] border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-center ${
                  staffData.profilePic ? "cursor-pointer" : ""
                }`}
                style={{ color: "#333333" }}
              >
                {staffData.profilePic ? (
                  <img
                    src={staffData.profilePic}
                    alt="Selected Profile"
                    className="mt-2 h-[200px] w-full rounded-[10px] form-first"
                  />
                ) : (
                  "Photo+"
                )}
              </label>

              <input
                type="file"
                name="profilePic"
                id="fileInput"
                onChange={handleInputChange}
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>
          <div className="add-subject-btn addTeacher-buttons">
            <button
              type="button"
              onClick={isUpdateOn ? handleUpdate : handleAdd}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white "
            >
              {isUpdateOn ? "Update" : "Add"}
            </button>
            <button
              type="button"
              onClick={() => {
                setstaffData(inticalData);
                setIsModalOpen(false);
              }}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white "
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddorUpdateNonTeachingStaff;
