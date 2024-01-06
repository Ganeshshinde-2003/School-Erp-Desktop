import { db } from "../../config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

// const customDataOptions = {
//     includeName: true,
//     includeStudentID: true,
//     includeClass: true,
//     includeSection: true,
//     includefeeslab: true,
//     includeTransportSlab: true,
//     includeAttendancePercentage: true,
//     includeOptionalSubjects: true,
//     class: "KG",
//     section: "KGA",
//   };

// const res = await getCustomDataForReport(customDataOptions);

export const getCustomDataForReport = async (options) => {
  const { includeName, includeStudentID, includeClass, includeSection, includefeeslab, includeTransportSlab, includeAttendancePercentage, includeOptionalSubjects } = options;

  const studentRef = collection(db, "AddStudentsDirectly");
  let data = [];

  try {
    const q = query(studentRef,
      includeClass && where("joiningClass", "==", options.class),
      includeSection && where("joiningSection", "==", options.section)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const studentData = doc.data();
      const result = {};

      if (includeName) {
        result.name = `${studentData.firstName} ${studentData.lastName}`;
      }

      if (includeStudentID) {
        result.studentID = studentData.studentId;
      }

      if (includeClass) {
        result.class = studentData.joiningClass;
      }

      if (includeSection) {
        result.section = studentData.joiningSection || "N/A";
      }

      if (includefeeslab) {
        result.feeslab = studentData.feeslab;
      }

      if (includeTransportSlab) {
        result.transportSlab = studentData.transportSlab;
      }

      if (includeAttendancePercentage) {
        // Assuming attendance percentage is stored in the database
        result.attendancePercentage = studentData.attendancePercentage || "N/A";
      }
      if (includeOptionalSubjects) {
        result.optionalSubjects = studentData.optionalSubjects || [];
      }

      data.push(result);
    });

    return  data;
  } catch (error) {
    console.error("Error fetching custom data:", error);
    return { status: false, message: "Error fetching custom data" };
  }
};
