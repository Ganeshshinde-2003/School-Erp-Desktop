import React, { useEffect, useState } from "react";
import DynamicTable from "../../Components/DynamicTable";
import AddButton from "../../Components/AddButton";
import "./AddTeacher.css";
import AddOrUpdateTeacherForm from "./AddOrUpdateTeacherForm";
import { Oval } from "react-loader-spinner";
import {
  deleteTeacher,
  getTeacherFromDatabase,
  getSpecificTeacherDataFromDd,
} from "../../api/TeacherMaster/AddTeacher";
import AlertComponent from "../../Components/AlertComponent";
import { getSubjectsByClassName } from "../../api/ClassMaster/AddClassAndSection";
import "../../App.css";
import { toast } from "react-toastify";
import TableTitle from "../../Components/TableTitle";

const AddTeacher = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teacherUpdate, setTeacherUpdate] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const [teacherData, setTeacherData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataChanged, setDataChanged] = useState(false);
  const [docId, setDocId] = useState(null);

  const fetchData = () => {
    //calling api getTeacherData from database
    getTeacherFromDatabase()
      .then((data) => {
        setTeacherData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toast.error("Error fetching data");
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData(); // Fetch data initially
  }, []);

  if (dataChanged) {
    fetchData(); // Refetch data when dataChanged is true
    setDataChanged(false);
  }

  const handleAction = async (actionType, documentId) => {
    if (actionType === "edit") {
      console.log("edit ocument with ID:", documentId);
      setTeacherUpdate(true);
      setDocId(documentId);
      console.log(docId);
      setIsModalOpen(true);
      setDataChanged(true);
      //calling the update api and handleUpdate
    } else if (actionType === "delete") {
      setShowDeleteAlert(true);
      setDocId(documentId);
    }
  };

  const onConfirm = async () => {
    const response = await deleteTeacher(docId);
    console.log("Delete document with ID:", docId);
    if (response.status) {
      setDataChanged(true);
      setDocId(null);
      setShowDeleteAlert(false);
      toast.success(response.message);
    }
  };

  const onCancel = () => {
    setDocId(null);
    setShowDeleteAlert(false);
  };

  const openModal = () => {
    console.log("Open modal");
    setDocId(null);
    setTeacherUpdate(false);
    setIsModalOpen(true);
  };

  const handleTeacherAdded = () => {
    setDataChanged(true);
  };

  const handleTeacherUpdated = () => {
    setDocId(null);
    setTeacherUpdate(false);
    setDataChanged(true);
  };

  return (
    <div className="ml-4 mt-4 w-full ov-sc">
      <div className="mt-5 max-w-full">
        <div>
          {isLoading ? (
            <Oval
              height={80}
              width={80}
              color="#333333"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#B5B5B5"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          ) : (
            <div className="add-optional-sub-table">
            <TableTitle title={'Add Teachers'} />
            
              <DynamicTable
                data={teacherData}
                rowHeight={100}
                action={true}
                handleAction={handleAction}
                ispanding={false}
                isLocateOn={false}
                attendanceStatus={false}
                selectSection={false}
                sectionList={false}
                csvFileName="Add Teachers"
              />
              <p className="h-16 text-center font-bold text-white flex items-center justify-center">
                <AddButton
                  buttonText={"Add Teacher"}
                  onClickButton={openModal}
                />
              </p>
            </div>
          )}
        </div>
      </div>
      <AddOrUpdateTeacherForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleTeacherAdded={handleTeacherAdded}
        handleTeacherUpdated={handleTeacherUpdated}
        DocId={docId}
        isUpdateOn={teacherUpdate}
      />
      {showDeleteAlert && (
        <AlertComponent onConfirm={onConfirm} onCancel={onCancel} />
      )}
    </div>
  );
};

export default AddTeacher;
