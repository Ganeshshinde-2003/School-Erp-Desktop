import React, { useState } from "react";
import AddButton from "../../Components/AddButton";
import "../../Pages/AddStudentsDirectly/AddStudent.css";
import AddOrUpdateNoticeForm from "./AddOrUpdateNotice";
import "../../App.css";
import { getStudentListByJoiningClass } from "../../api/StudentMaster/AddStudentDirectly";

const AddNoticePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noticeAdded, setNoticeAdded] = useState(false);
  const [dataChanged, setDataChanged] = useState(false);
  const [docId, setDocId] = useState(null);
  const [noticeUpdate, setNoticeUpdate] = useState(false);

  const openModal = async () => {
    console.log("Open modal");
    const res = await getStudentListByJoiningClass("10");
    console.log(res);
    // setIsModalOpen(true);
  };

  const handleNoticeAdded = () => {
    setDataChanged(true);
  };

  const handleNoticeUpdated = () => {
    setDocId(null);
    setNoticeAdded(false);
    setDataChanged(true);
  };

  return (
    <div className="ml-4 mt-4 w-full ov-sc flex items-center justify-center">
      <div className="mt-5 max-w-full">
        <p className="h-16 text-center font-bold text-white flex items-center justify-center">
          <AddButton buttonText={"Add Notice"} onClickButton={openModal} />
        </p>
      </div>
      <AddOrUpdateNoticeForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleNoticeAdded={handleNoticeAdded}
        handleNoticeUpdated={handleNoticeUpdated}
        DocId={docId}
        isUpdateOn={noticeUpdate}
      />
      {noticeAdded && (
        <div className="text-green-500 text-center mt-2">
          Subject has been successfully added!
        </div>
      )}
    </div>
  );
};

export default AddNoticePage;
