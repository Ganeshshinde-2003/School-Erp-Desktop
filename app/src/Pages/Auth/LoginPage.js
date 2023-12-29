import React, { useState } from "react";
import "./LoginPage.css";
import "../AddTeacher/AddTeacherForm.css";
import ButtonComponent from "../../Components/ButtonComponent";
import { getSpecificUser, loginAdminUser } from "../../api/Authapi/auth";
import { toast } from "react-toastify";
import { useUser } from "../../Context/UserAuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const initialData = {
    userName: "",
    password: "",
  };
  const [loginData, setLoginData] = useState(initialData);
  const { loginUser } = useUser();

  const handleSubmit = async () => {
    try {
      const response = await loginAdminUser(loginData);
      if (response.status) {
        toast.success(response.message);
        console.log(loginData.userName);
        await loginUser(loginData.userName);
        setIsAuthenticated(true);
        navigate("/home");
      } else {
        toast.error(response.message);
      }
      setLoginData(initialData);
    } catch (error) {
      toast.error("Invalid Credentials");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

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
                  name="userName"
                  value={loginData.userName}
                  onChange={handleInputChange}
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
                  name="password"
                  value={loginData.password}
                  onChange={handleInputChange}
                  required
                  className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <ButtonComponent
                buttonText={"Login"}
                onClickButton={handleSubmit}
                isUpdateDisabled={false}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
