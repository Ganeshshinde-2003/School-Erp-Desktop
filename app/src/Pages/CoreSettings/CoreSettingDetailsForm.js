import React, { useState, useEffect } from "react";
import Modal from "../../Components/Modal";
import Alert from "@mui/material/Alert";
import "../AddTeacher/AddTeacherForm.css";
import { getFeeCollectionDetailsFromDb, updateOrCreateFeeCollectionDetailsInDb } from "../../api/CoreFunctions/CoreSettings";



const FeeCollectionDetailsModal = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;


const [feeCollectionAccountNo, setFeeCollectionAccountNo] = useState("");
const [ifscCode, setIfscCode] = useState("");
const [accountHoldersName, setAccountHoldersName] = useState("");
const [bankName, setBankName] = useState("");



  const handleFeeCollectionUpdate = async () => {
    const feeCollectionData = {
      feeCollectionAccountNo: feeCollectionAccountNo,
      ifscCode: ifscCode,
      accountHoldersName: accountHoldersName,
      bankName: bankName,
    };
    await updateOrCreateFeeCollectionDetailsInDb(feeCollectionData)
    console.log(feeCollectionData);
    onClose();
  }

  useEffect(() => {
    const fetchFeeDetails = async () => {
      try {
        const feeCollectionData = await getFeeCollectionDetailsFromDb();

        setFeeCollectionAccountNo(feeCollectionData.feeCollectionDetails.feeCollectionAccountNo);
        setIfscCode(feeCollectionData.feeCollectionDetails.ifscCode);
        setAccountHoldersName(feeCollectionData.feeCollectionDetails.accountHoldersName);
        setBankName(feeCollectionData.feeCollectionDetails.bankName);

        console.log(feeCollectionData);
        
      } catch (error) {
        console.error("Error ", error);
      }
    };

    fetchFeeDetails();
  }, [])

  

  return (
    <Modal setShowModal={onClose}>
      <h2 className="text-[20px] font-bold text-left bg-[#333333] text-white addTeacher-header">
        Fee Collection Account Details
      </h2>
      <div className="addTeacher-form">
        <form>
          <div className="addTeacher-main-form">
            <div className="form-first">
              <div>
                <label className="block text-[18px] font-medium text-[#333333]">
                  Fee Collection Account No.*
                </label>
                <input
                  type="text"
                  value={feeCollectionAccountNo}
                  onChange={(e) =>
                    {setFeeCollectionAccountNo(e.target.value)
                    console.log(feeCollectionAccountNo)}
                  }
                  required
                  className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-[18px] font-medium text-[#333333]">IFSC Code*</label>
                <input
                  type="text"
                  value={ifscCode}
                  onChange={ (e) =>
                   { setIfscCode(e.target.value)
                    console.log(ifscCode)}
                  }
                  required
                  className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-[18px] font-medium text-[#333333]">
                  Account Holder's Name*
                </label>
                <input
                  type="text"
                  value={accountHoldersName}
                  onChange={(e) => {setAccountHoldersName(e.target.value) 
                  console.log(accountHoldersName)
                  }
                  
                  }
                  
                  required
                  className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-[18px] font-medium text-[#333333]">Bank Name*</label>
                <input
                  type="text"
                  value={bankName}
                  onChange={
                    
                    (e) => {setBankName(e.target.value) 
                    console.log(bankName)}
                    }
                  
                  required
                  className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
          <div className="addTeacher-buttons">
            <button type="button" onClick={handleFeeCollectionUpdate}>
              Update
            </button>
            <button
              type="button"
              onClick={() => {
              
                onClose();
              }}
              className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white "
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default FeeCollectionDetailsModal;
