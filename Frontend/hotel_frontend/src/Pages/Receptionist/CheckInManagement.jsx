// ******************************** Mantline UI ********************************

import { Space } from "@mantine/core";

// ******************************** Components ********************************

import InitialBox from "../../Components/Box/InitialBox";
import CheckInPerformanceCards from "../../Components/Analysis/Receptionist/CheckInPerformanceCards";
import CheckInTable from "../../Components/Table/Receptionist/CheckInTable";
import SearchBySelect from "../../Components/Search/SearchBySelect";

const CheckInManagement = () => {
  return (
    <div>
      <Space h={"md"} />

      <InitialBox
        title={"Check Management"}
        text={"Process customer check-ins or outs and manage arrivals"}
      />
      <Space h={"md"} />

      <CheckInPerformanceCards />

      <Space h={"md"} />

     

      <CheckInTable />
    </div>
  );
};

export default CheckInManagement;
