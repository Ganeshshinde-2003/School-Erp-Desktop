import React, { useEffect } from "react";
import { useUser } from "../../Context/UserAuthContext.js";
import ButtonComponent from "../../Components/ButtonComponent.js";

const LogoutPage = ({ setIsAuthenticated }) => {
  const { userData, logoutUser } = useUser();
  useEffect(() => {}, [userData]);

  const handleLagout = () => {
    setIsAuthenticated(false);
    logoutUser();
  };

  return (
    <div className="flex w-full justify-end h-[150px]">
      <div className="flex flex-col gap-2 px-10 py-5 items-center border border-solid border-black">
        <h3 className="font-[500] text-xl">{userData.role}</h3>
        <p className="text-lg">{userData.userName}</p>
        <ButtonComponent
          buttonText={"Logout"}
          onClickButton={handleLagout}
          isUpdateDisabled={false}
        />
      </div>
    </div>
  );
};

export default LogoutPage;
