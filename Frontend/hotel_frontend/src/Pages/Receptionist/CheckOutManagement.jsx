import { useState } from "react";

// ******************************** Mantline UI ********************************

import { Space } from "@mantine/core";
// ******************************** Components ********************************

import SearchBySelect from "../../Components/Search/SearchBySelect";
import InitialBox from "../../Components/Box/InitialBox";
import CheckOutTable from "../../Components/Table/Receptionist/CheckOutTable";

const CheckOutManagement = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <Space h={"md"} />

      <InitialBox
        title={"Check-Out Management"}
        text={"Process customer check-outs and generate invoices"}
      />
      <Space h={"md"} />

      <SearchBySelect
        statusValue={statusFilter}
        onStatusChange={setStatusFilter}
        searchValue={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
        showSearch={true}
      />

      <Space h={"md"} />

      <CheckOutTable />
    </div>
  );
};

export default CheckOutManagement;
