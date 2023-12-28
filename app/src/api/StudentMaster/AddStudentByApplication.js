import { db } from "../../config/firebase";
import { getDocs,addDoc,doc,updateDoc,deleteDoc,collection,getDoc,serverTimestamp,query,orderBy,setDoc, where, } from "firebase/firestore";



export const testStudentData = {
    applicationNo: '123456',
    firstName: 'John',
    lastName: 'Doe',
    mobileNo: '9876543210',
    joiningClass: '10th',
    dob: '2000-01-01', 
    previousschoolTCNo: '7890123456',
    applicationFees: 100, 
    paymentmode: 'online',
    upitransactionNo: 'ABC123XYZ',
    aadharNo: '123456789012',
  };


export const addStudentByApplicationToDatabase = async (studentData) => {
    const studentRef = collection(db, 'AddStudentByApplication');

    const querySnapshot = await getDocs(query(studentRef, where("applicationNo", "==", studentData.applicationNo)));

    if (!querySnapshot.empty) {
        return { status: false, message: "student with the same studentId already exists" };
    }
   // Create a reference to the document with the sectionName as docId 
    const studentDocRef = doc(studentRef, studentData?.applicationNo);

    try {
        const studentDoc = await setDoc(studentDocRef, {
            applicationNo: studentData.applicationNo,
            firstName: studentData.firstName,
            lastName: studentData.lastName,
            mobileNo: studentData.mobileNo,
            joiningClass: studentData.joiningClass,
            dob: studentData.dob,
            previousschoolTCNo:studentData.previousschoolTCNo,
            applicationFees: studentData.applicationFees,
            paymentmode: studentData.paymentmode,
            upitransactionNo: studentData.upitransactionNo,
            aadharNo:studentData.aadharNo,
            feeSlabApplingFor:studentData.feeSlabApplingFor,
            isPending: true,
            createdAt: serverTimestamp(),
        });

        console.log('Data added successfully');
        return {
            status: true,
            message: 'Student Application added successfully',
        };
    } catch (error) {
        console.error(error);
        return {
            status: false,
            message: 'Error adding Student Application',
        };
    }
};

export const updateStudentByApplicationToDatabase = async (documentId, updatedStudentData) => {

    const studentDocRef = doc(db, "AddStudentByApplication", documentId);

    try {
        const studentDocSnapshot = await getDoc(studentDocRef);
        const existingData = studentDocSnapshot.data();
        
        const studentDataChanged = JSON.stringify(existingData) !== JSON.stringify(updatedStudentData);
        
        if (studentDataChanged) {
            await updateDoc(studentDocRef, updatedStudentData);  
            return { status: true, message: "Document successfully updated" }; 
        }
    }
    catch (error) {
        console.error("Error updating document:", error);
        return { status: false, message: "Error updating document" };
    }
};

export const deleteStudent = async (docId) => {
    const studentRef = collection(db, "AddStudentByApplication");
    const studentDocRef = doc(studentRef, docId);

    try {
        await deleteDoc(studentDocRef);
        console.log("Document successfully deleted!");
        return { status: true, message: "Document successfully deleted" };
    } catch (error) {
        console.error("Error deleting document:", error);
        return { status: false, message: "Error deleting document" };
    }
};

export const getApplicantStudentDataFromDd = async (DocId) => {
    try {
      const studentDocRef = doc(db, "AddStudentByApplication", DocId);
      const studentDocSnapshot = await getDoc(studentDocRef);

      if (studentDocSnapshot.exists()) {
        console.log(studentDocSnapshot.data())
        return studentDocSnapshot.data();
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching subject data", error);
      throw error;
    }
  };

  export const getApplicantStudentFromDatabase = async () => {
    const studentRef = collection(db, "AddStudentByApplication");

    try {
        const q = query(studentRef, orderBy("createdAt", "asc"));
        const querySnapshot = await getDocs(q);

        const studentData = [];

        for (const doc of querySnapshot.docs) {
            const data = doc.data();
            if(data.isPending){
                data.isPending ="Approve  disapprove"
            }
            // Modify the student data as needed
            const modifiedStudentData = {
              id: doc.id,
              Name: data.firstName + " " + data.lastName,
              "Mobile No.": data.mobileNo,
              "Application No.": data.applicationNo,
              "Joining Class": data.joiningClass,
              "Payment Mode": data.paymentmode,
              "Transaction No.": data.upitransactionNo,
            };
      
            studentData.push(modifiedStudentData);
          }

        return studentData;
    } catch (error) {
        console.error(error);
    }
};
