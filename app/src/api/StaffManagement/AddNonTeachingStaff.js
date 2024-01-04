import { db } from "../../config/firebase";
import {
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  collection,
  getDoc,
  serverTimestamp,
  query,
  orderBy,
  setDoc,
  where,
} from "firebase/firestore";

export const testStaffData = {
  firstName: "John",
  lastName: "Smith",
  role: "Teacher",
  staffId: "S001",
  mobileNo: "1234567890",
  salary: 50000,
  bloodGroup: "A+",
  bankAccount: "12345678901234",
  dob: new Date(1990, 5, 15),
};

export const addNonTeachingStaffToDb = async (StaffData) => {
  const StaffRef = collection(db, "AddNonTeachingStaff");

  const querySnapshot = await getDocs(query(StaffRef, where("staffId", "==", StaffData?.staffId)));

   if (!querySnapshot.empty) {
       return { status: false, message: "staff with the same staffId already exists" };
   }
  // Create a reference to the document with the sectionName as docId
  const StaffDocRef = doc(StaffRef,StaffData.staffId);
  console.log(StaffDocRef);


  try {
    const StaffDoc = await setDoc(StaffDocRef, {
      firstName: StaffData.firstName,
      lastName: StaffData.lastName,
      role: StaffData.role,
      staffId: StaffData.staffId,
      mobileNo: StaffData.mobileNo,
      salary: StaffData.salary,
      bloodGroup: StaffData.bloodGroup,
      bankAccount: StaffData.bankAccount,
      dob: StaffData.dob,
      createdAt: serverTimestamp(),
    });

    console.log("Data added successfully");
    return {
      status: true,
      message: "Staff data added successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      status: false,
      message: "Error adding Staff data",
    };
  }
};

export const updateStaffToDatabase = async (documentId, updatedStaffData) => {
  const StaffDocRef = doc(db, "AddNonTeachingStaff", documentId);

  try {
    const StaffDocSnapshot = await getDoc(StaffDocRef);
    const existingData = StaffDocSnapshot.data();

    const StaffDataChanged =
      JSON.stringify(existingData) !== JSON.stringify(updatedStaffData);

    if (StaffDataChanged) {
      await updateDoc(StaffDocRef, updatedStaffData);
      console.log("Data updated successfully");
      return { status: true, message: "Document successfully updated" };
    }
  } catch (error) {
    console.error("Error updating document:", error);
    return { status: false, message: "Error updating document" };
  }
};

export const deleteStaffData = async (docId) => {
  const StaffRef = collection(db, "AddNonTeachingStaff");
  const StaffDocRef = doc(StaffRef, docId);
  const staffAttendanceRef = doc(db, "StaffAttendance", docId);

  try {
    await deleteDoc(StaffDocRef);
    await deleteDoc(staffAttendanceRef);

    return { status: true, message: "Document successfully deleted" };
  } catch (error) {
    console.error("Error deleting document:", error);
    return { status: false, message: "Error deleting document" };
  }
};

export const getSpecificStaffDataFromDb = async (docId) => {
  try {
    const StaffDocRef = doc(db, "AddNonTeachingStaff", docId);
    const StaffDocSnapshot = await getDoc(StaffDocRef);

    if (StaffDocSnapshot.exists()) {
      console.log(StaffDocSnapshot.data());
      return StaffDocSnapshot.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching Staff data ", error);
    throw error;
  }
};
export const getStaffDataFromDatabase = async () => {
  const StaffRef = collection(db, "AddNonTeachingStaff");

  try {
    const q = query(StaffRef, orderBy("createdAt", "asc"));
    const querySnapshot = await getDocs(q);

    const StaffData = [];

    for (const doc of querySnapshot.docs) {
      const data = doc.data();

      const modifiedStaffData = {
        id: doc.id,
        Name: data.firstName + " " + data.lastName,
        Role: data.role,
        "Staff ID": data.staffId,
        "Mobile No.": data.mobileNo,
        Salary: data.salary,
        "Blood Group": data.bloodGroup,
        "Bank AccountNo": data.bankAccount,
      };

      StaffData.push(modifiedStaffData);
    }

    console.log(StaffData);
    return StaffData;
  } catch (error) {
    console.error(error);
  }
};
