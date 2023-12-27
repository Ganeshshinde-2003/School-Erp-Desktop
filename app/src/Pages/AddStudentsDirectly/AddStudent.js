import React, { useState } from "react";
import AddButton from "../../Components/AddButton";
import "./AddStudent.css";
import AddOrUpdateStudentForm from "./AddOrUpdateStudentForm ";
import "../../App.css";

const AddStudent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentUpdate, setStudentUpdate] = useState(false);
  const [docId, setDocId] = useState(null);

  const openModal = async () => {
    console.log("Open modal");
    setIsModalOpen(true);
  };

  const handleStudentUpdated = () => {
    setStudentUpdate(false);
  };

  return (
    <div className="mt-4 w-full ov-sc flex items-center justify-center">
      <div className="mt-5 max-w-full">
        <p className="h-16 text-center font-bold text-white flex items-center justify-center">
          <AddButton buttonText={"Add Student"} onClickButton={openModal} />
        </p>
      </div>
      <AddOrUpdateStudentForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleStudentUpdated={handleStudentUpdated}
        DocId={docId}
        isUpdateOn={studentUpdate}
      />
    </div>
  );
};

export default AddStudent;
