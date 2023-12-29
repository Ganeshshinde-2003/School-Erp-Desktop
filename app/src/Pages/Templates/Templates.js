import React, { useState } from "react";
import ButtonComponent from "../../Components/ButtonComponent";
import TemplatePopUp from "./TemplatesPopUp";

const Templates = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataToBeSend, setDataToBeSend] = useState(0);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const templateData = [
    {
      name: "ID Card",
      data: [1, 2, 3, 4],
    },
    {
      name: "TC Certificate",
      data: [1, 2, 3, 4],
    },
    {
      name: "No Due Certificate",
      data: [1, 2, 3, 4],
    },
    {
      name: "Marks Card",
      data: [1, 2, 3, 4],
    },
    {
      name: "Hall Ticket",
      data: [1, 2, 3, 4],
    },
    {
      name: "Fee Receipts",
      data: [1, 2, 3, 4],
    },
  ];
  return (
    <div className="flex flex-col my-16 mx-32 gap-10 w-[40%]">
      {templateData.map((template, index) => (
        <div key={index} className="flex w-full item-center justify-between">
          <h3 className="text-xl font-[500]">{template.name}</h3>
          <div>
            <ButtonComponent
              buttonText={"Choose Template"}
              onClickButton={() => {
                openModal();
                setDataToBeSend(index);
              }}
              isUpdateDisabled={false}
            />
          </div>
        </div>
      ))}
      <TemplatePopUp
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        dataToShow={templateData[dataToBeSend]}
      />
    </div>
  );
};

export default Templates;
