import React, { useEffect, useState } from "react";
import DynamicTable from "../../Components/DynamicTable";
import AddButton from "../../Components/AddButton";
import { Oval } from "react-loader-spinner";
import AddOrUpdateFeeSlab from "./AddOrUpdateFeeSlab";
import {
  deleteFeeSlabData,
  getFeeSlabDataFromDatabase,
} from "../../api/FeeStructure/AddFeeSlab";
import "../../App.css";
import { toast } from "react-toastify";
import TableTitle from "../../Components/TableTitle";

const AddFeeSlab = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feeSlabUpdate, setFeeSlabUpdate] = useState(false);

  const [feeSlabData, setFeeSlabData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataChanged, setDataChanged] = useState(false);
  const [docId, setDocId] = useState(null);

  const fetchData = () => {
    getFeeSlabDataFromDatabase()
      .then((data) => {
        setFeeSlabData(data);
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
      setFeeSlabUpdate(true);
      setDocId(documentId);
      console.log(docId);
      setIsModalOpen(true);
    } else if (actionType === "delete") {
      const response = await deleteFeeSlabData(documentId);
      console.log("Delete document with ID:", documentId);
      if (response.status) {
        setDataChanged(true);
      }
    }
  };

  // Function to open the modal
  const openModal = () => {
    console.log("Open modal");
    setIsModalOpen(true);
  };

  const handleFeeSlabAdded = () => {
    setDataChanged(true);
  };

  const handleFeeSlabUpdated = () => {
    setFeeSlabUpdate(true);
    setTimeout(() => {
      setFeeSlabUpdate(false);
      setDataChanged(true);
    }, 2000);
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
            <TableTitle title={'Add Fee Slabs'} />
                
              <DynamicTable
                data={feeSlabData}
                rowHeight={100}
                action={true}
                ispanding={false}
                handleAction={handleAction}
                isLocateOn={false}
                attendanceStatus={false}
                selectSection={false}
                sectionList={false}
              />
              <p className="h-16 text-center font-bold text-white flex items-center justify-center">
                <AddButton
                  buttonText={"Add a Slab"}
                  onClickButton={openModal}
                />
              </p>
            </div>
          )}
        </div>
      </div>
      <AddOrUpdateFeeSlab
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleFeeSlabAdded={handleFeeSlabAdded}
        handleFeeSlabUpdated={handleFeeSlabUpdated}
        DocId={docId}
        isUpdateOn={feeSlabUpdate}
      />
    </div>
  );
};

export default AddFeeSlab;
