import { db } from "../../config/firebase";
import {
  doc,
  getDocs,
  addDoc,
  collection,
  updateDoc,
  deleteDoc,
  getDoc,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
  arrayUnion,
} from "firebase/firestore";

const feeCollectionData = {
  feeCollectionAccountNo: "9999999",
  ifscCode: "pytm0123456",
  accountHoldersName: "pytm",
  bankName: "bank of india",
};

export const updateOrCreateFeeCollectionDetailsInDb = async (
  feeCollectionData
) => {
  const coreFunctionsRef = collection(db, "CoreFunctions");
  const accountDetailsDocRef = doc(coreFunctionsRef, "accountDetails");

  try {
    const accountDetailsDocSnapshot = await getDoc(accountDetailsDocRef);

    if (accountDetailsDocSnapshot.exists()) {
      await updateDoc(accountDetailsDocRef, {
        feeCollectionAccountNo: feeCollectionData.feeCollectionAccountNo,
        ifscCode: feeCollectionData.ifscCode,
        accountHoldersName: feeCollectionData.accountHoldersName,
        bankName: feeCollectionData.bankName,
        updatedAt: serverTimestamp(),
      });

      console.log("Fee collection details updated successfully");
    } else {
      await setDoc(accountDetailsDocRef, {
        feeCollectionAccountNo: feeCollectionData.feeCollectionAccountNo,
        ifscCode: feeCollectionData.ifscCode,
        accountHoldersName: feeCollectionData.accountHoldersName,
        bankName: feeCollectionData.bankName,
        createdAt: serverTimestamp(),
      });

      console.log("Fee collection details created successfully");
    }

    return {
      status: true,
      message: "Fee collection details updated or created successfully",
    };
  } catch (error) {
    console.error("Error updating/creating fee collection details: ", error);
    return {
      status: false,
      message: "Error updating/creating fee collection details",
    };
  }
};

// Define function to update or create academic year details
export const updateOrCreateAcademicYearInDb = async (academicYearData) => {
  const coreFunctionsRef = collection(db, "CoreFunctions");
  const academicYearDocRef = doc(coreFunctionsRef, "academicYear");

  try {
    const academicYearDocSnapshot = await getDoc(academicYearDocRef);

    if (academicYearDocSnapshot.exists()) {
      await updateDoc(academicYearDocRef, {
        startDate: academicYearData.startDate,
        endDate: academicYearData.endDate,
        updatedAt: serverTimestamp(),
      });

      console.log("Academic year details updated successfully");
    } else {
      await setDoc(academicYearDocRef, {
        startDate: academicYearData.startDate,
        endDate: academicYearData.endDate,
        createdAt: serverTimestamp(),
      });

      console.log("Academic year details created successfully");
    }

    return {
      status: true,
      message: "Academic year details updated or created successfully",
    };
  } catch (error) {
    console.error("Error updating/creating academic year details: ", error);
    return {
      status: false,
      message: "Error updating/creating academic year details",
    };
  }
};

export const updateOrCreateAdmissionDataInDb = async (admissionData) => {
  const coreFunctionsRef = collection(db, "CoreFunctions");
  const admissionDocRef = doc(coreFunctionsRef, "admissionData");

  try {
    const admissionDocSnapshot = await getDoc(admissionDocRef);

    if (admissionDocSnapshot.exists()) {
      await updateDoc(admissionDocRef, {
        startDate: admissionData.startDate,
        endDate: admissionData.endDate,
        updatedAt: serverTimestamp(),
      });

      console.log("Admission data updated successfully");
    } else {
      await setDoc(admissionDocRef, {
        startDate: admissionData.startDate,
        endDate: admissionData.endDate,
        createdAt: serverTimestamp(),
      });

      console.log("Admission data created successfully");
    }

    return {
      status: true,
      message: "Admission data updated or created successfully",
    };
  } catch (error) {
    console.error("Error updating/creating admission data: ", error);
    return {
      status: false,
      message: "Error updating/creating admission data",
    };
  }
};

export const getAdmissionDatesFromDb = async () => {
  const coreFunctionsRef = collection(db, "CoreFunctions");
  const admissionDocRef = doc(coreFunctionsRef, "admissionData");

  try {
    const admissionDocSnapshot = await getDoc(admissionDocRef);

    if (admissionDocSnapshot.exists()) {
      const admissionData = admissionDocSnapshot.data();
      return {
        startDate: admissionData.startDate,
        endDate: admissionData.endDate,
      };
    } else {
      console.log("Admission data not found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching admission data: ", error);
    throw error;
  }
};

export const getAcademicYearDatesFromDb = async () => {
  const coreFunctionsRef = collection(db, "CoreFunctions");
  const academicYearDocRef = doc(coreFunctionsRef, "academicYear");

  try {
    const academicYearDocSnapshot = await getDoc(academicYearDocRef);

    if (academicYearDocSnapshot.exists()) {
      const academicYearData = academicYearDocSnapshot.data();
      return {
        startDate: academicYearData.startDate,
        endDate: academicYearData.endDate,
      };
    } else {
      console.log("Academic year data not found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching academic year data: ", error);
    throw error;
  }
};


export const getFeeCollectionDetailsFromDb = async () => {
    const coreFunctionsRef = collection(db, "CoreFunctions");
    const accountDetailsDocRef = doc(coreFunctionsRef, "accountDetails");
  
    try {
      const accountDetailsDocSnapshot = await getDoc(accountDetailsDocRef);
  
      if (accountDetailsDocSnapshot.exists()) {
        const feeCollectionDetails = accountDetailsDocSnapshot.data();
        console.log("Fee collection details retrieved successfully:", feeCollectionDetails);
        return {
          status: true,
          feeCollectionDetails,
        };
      } else {
        console.log("No fee collection details found");
        return {
          status: false,
          message: "No fee collection details found",
        };
      }
    } catch (error) {
      console.error("Error retrieving fee collection details: ", error);
      return {
        status: false,
        message: "Error retrieving fee collection details",
      };
    }
  };
  