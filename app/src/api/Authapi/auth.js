import { doc, updateDoc, setDoc, getDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase";

const testUserDetails = {
  username: "testUser",
  password: "testPassword",
  role: "admin",
};

export const signupAdminUser = async (userDetails) => {
  const { userName, password, role } = userDetails;
  const authDocRef = doc(db, "Authentication", userName);

  try {
    const newUser = {
      userName,
      password,
      role,
    };

    await setDoc(authDocRef, newUser);

    return { status: true, message: "User successfully added" };
  } catch (error) {
    console.error("Error adding user", error);
    return {
      status: false,
      message: "An error occurred while adding the user",
    };
  }
};

export const loginAdminUser = async (userDetails) => {
  const { userName, password } = userDetails;
  const authDocRef = doc(db, "Authentication", userName);

  try {
    const docSnapshot = await getDoc(authDocRef);

    if (docSnapshot.exists()) {
      const storedUser = docSnapshot.data();

      if (
        userName === storedUser.userName &&
        password === storedUser.password
      ) {
        return { status: true, message: "Login successful" };
      } else {
        return { status: false, message: "Invalid credentials" };
      }
    } else {
      return { status: false, message: "User not found" };
    }
  } catch (error) {
    console.error("Error verifying credentials", error);
    return {
      status: false,
      message: "An error occurred while verifying credentials",
    };
  }
};

export const getAllUsers = async () => {
    const authDocRef = collection(db, 'Authentication');

    try {
        const querySnapshot = await getDocs(authDocRef);
        const authData = [];

        querySnapshot.forEach(async (doc) => {
            const data = doc.data();

            if (doc.id !== 'accounts') {
                const modifiedData = {
                    id: doc.id,
                    "User Name": data.userName, 
                    Role: data.role,
                };
                authData.push(modifiedData);
            }
        });

        return authData;
    } catch (error) {
        console.error('Error fetching all users', error);
        return [];
    }
};






export const getSpecificUser = async (DocId) => {
    try {
      const authDocRef = doc(db, "Authentication", DocId);
      const authDocRefSnapshot = await getDoc(authDocRef);
  
      if (authDocRefSnapshot.exists()) {
        return authDocRefSnapshot.data();
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching subject data", error);
      throw error;
    }
  };

  export const updateSpecificUser = async (documentId, updatedUserData) => {
    const authDocRef = collection(db, "Authentication");
    const authDocumentRef = doc(authDocRef, documentId);

    try {
        await updateDoc(authDocumentRef, updatedUserData);
        return { status: true, message: "Document successfully updated" };
    } catch (error) {
        console.error("Error updating document:", error);
        return { status: false, message: "Error updating document" };
    }
};


export const CheckAccountPassword = async (password) => {
  const authDocRef = doc(db, "Authentication", "accounts");

  try {
    const docSnapshot = await getDoc(authDocRef);

    if (docSnapshot.exists()) {
      const storedPassword = docSnapshot.data().password;

      if (password === storedPassword) {
        return { status: true, message: "Success!" };
      } else {
        return {
          status: false,
          message: "The password doesn't match or Invalid Credential",
        };
      }
    } else {
      return { status: false, message: "Document not found" };
    }
  } catch (error) {
    console.error("Error checking password", error);
    return {
      status: false,
      message: "An error occurred while checking the password",
    };
  }
};
