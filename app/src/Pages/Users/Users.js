import React, { useEffect, useState } from "react";
import DynamicTable from "../../Components/DynamicTable";
import AddButton from "../../Components/AddButton";
import { Oval } from "react-loader-spinner";
import AddOrUpdateUsersForm from "./UsersAddorUpdate";
import {
  deleteExpenseData,
  getExpenseDataFromDatabase,
} from "../../api/ExpenseAdding/AddExpense";
import AlertComponent from "../../Components/AlertComponent";
import "../../App.css";
import { deleteUser, getAllUsers } from "../../api/Authapi/auth";

const Users = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expenseUpdate, setexpenseUpdate] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const [expenseData, setexpenseData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataChanged, setDataChanged] = useState(false);
  const [docId, setDocId] = useState(null);

  const fetchData = () => {
    getAllUsers()
      .then((data) => {
        setexpenseData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
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
      setexpenseUpdate(true);
      setDocId(documentId);
      console.log(docId);
      setIsModalOpen(true);
    } else if (actionType === "delete") {
      setShowDeleteAlert(true);
      setDocId(documentId);
    }
  };
  const onConfirm = async () => {
    const response = await deleteUser(docId);
    console.log("Delete document with ID:", docId);
    if (response.status) {
      setDataChanged(true);
      setDocId(null);
      setShowDeleteAlert(false);
    }
  };

  const onCancel = () => {
    setDocId(null);
    setShowDeleteAlert(false);
  };
  // Function to open the modal
  const openModal = () => {
    console.log("Open modal");
    setDocId(null);
    setexpenseUpdate(false);
    setIsModalOpen(true);
  };

  const handleExpenseAdded = () => {
    setDataChanged(true);
  };

  const handleExpenseUpdated = () => {
    setDocId(null);
    setexpenseUpdate(false);
    setDataChanged(true);
  };

  return (
    <div className="ml-4 mt-4 w-full ov-sc">
      <div className="mt-5 max-w-full">
        <div className="flex justify-around">
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
              <h1 className="h-16 text-center font-bold text-white flex items-center justify-center">
                Add User
              </h1>
              <DynamicTable
                data={expenseData}
                rowHeight={100}
                action={true}
                ispanding={false}
                handleAction={handleAction}
              />
              <p className="h-16 text-center font-bold text-white flex items-center justify-center">
                <AddButton buttonText={"Add User"} onClickButton={openModal} />
              </p>
            </div>
          )}
        </div>
      </div>
      <AddOrUpdateUsersForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleExpenseAdded={handleExpenseAdded}
        handleExpenseUpdated={handleExpenseUpdated}
        DocId={docId}
        isUpdateOn={expenseUpdate}
      />
      {showDeleteAlert && (
        <AlertComponent onConfirm={onConfirm} onCancel={onCancel} />
      )}
    </div>
  );
};

export default Users;
