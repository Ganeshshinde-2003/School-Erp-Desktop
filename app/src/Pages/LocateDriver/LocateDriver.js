import React, { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import DynamicTable from "../../Components/DynamicTable";
import { getLocateDataFromDatabase } from "../../api/TransportMaster/LocateDriverOrBus";
import "../../App.css";
import TableTitle from "../../Components/TableTitle";

const LocateDriver = () => {
  const [driverData, setDriverData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataChanged, setDataChanged] = useState(false);

  const fetchData = () => {
    getLocateDataFromDatabase()
      .then((data) => {
        setDriverData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData(); // Fetch data initially
  }, []);

  if (dataChanged) {
    fetchData(); // Refetch data when dataChanged is true
    setDataChanged(false);
  }
  const handleAction = async (actionType, documentId) => {
    if (actionType === "locate") {
      console.log("locate document with ID:", documentId);
      // -- Todo locate logic

    };
  }
    return (
      <div className="ml-4 mt-4 w-full ov-sc">
        <div className="mt-5 max-w-full">
          <div className="flex justify-around">
            {isLoading ? (
              <Oval
                height={80}
                width={80}
                color="#333333"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="#B5B5B5"
                strokeWidth={2}
                strokeWidthSecondary={2}
              />
            ) : (
              <div className="add-optional-sub-table">
              <TableTitle title={'Locate'} />
                <DynamicTable
                  data={driverData}
                  rowHeight={100}
                  action={false}
                  handleAction={handleAction}
                  ispanding={false}
                  isLocateOn={true}
                  attendanceStatus={false}
                  selectSection={false}
                  sectionList={false}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  export default LocateDriver;
