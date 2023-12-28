import React from "react";
import "./LoginPage.css";
import "../AddTeacher/AddTeacherForm.css";
import ButtonComponent from "../../Components/ButtonComponent";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="flex w-full h-[100vh] justify-center items-center">
      <div className="login-container">
        <h3>Login</h3>
        <form>
          <div className="addTeacher-main-form">
            <div className="form-first">
              <div>
                <label className="block text-[18px] font-medium text-[#333333]">
                  Username*
                </label>
                <input
                  type="text"
                  name="firstName"
                  //   value={studentData.firstName}
                  //   onChange={handleInputChange}
                  required
                  className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-[18px] font-medium text-[#333333]">
                  Password*
                </label>
                <input
                  type="text"
                  name="lastName"
                  //   value={studentData.lastName}
                  //   onChange={handleInputChange}
                  required
                  className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <ButtonComponent
                buttonText={"Login"}
                onClickButton={() => {}}
                color={"#333333"}
              />
              <Link to="/signup">Don't Have An Account?</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
