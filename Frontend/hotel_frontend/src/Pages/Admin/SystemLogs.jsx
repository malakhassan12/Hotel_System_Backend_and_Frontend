// ******************************** Mantline UI ********************************

import LogsPerformanceCards from "../../Components/Analysis/Admin/LogsPerformanceCards";
import InitialBox from "../../Components/Box/InitialBox";

// ******************************** Components ********************************

import { Divider, Space } from "@mantine/core";
import LogsTable from "../../Components/Table/Admin/LogsTable";

const SystemLogs = () => {
  return (
    <div>
      <InitialBox
        title={"System Logs"}
        text={"Monitor all system activities and actions"}
      />

      <Space h={"md"} />

      <LogsPerformanceCards />
      <Space h={"md"} />
      <Divider />
      <Space h={"md"} />

      <LogsTable />
    </div>
  );
};

export default SystemLogs;
