import React from "react";
// ******************************** Mantline UI ********************************

import { Space } from "@mantine/core";
// ******************************** Components ********************************
import DashboardPerfomanceCards from "../../Components/Analysis/Admin/DashboardPerfomanceCards";
import InitialBox from "../../Components/Box/InitialBox";
import AdminDashTabs from "../../Components/Tabs/Admin/AdminDashTabs";

const AdminDashBoard = () => {
  return (
    <div>
      <InitialBox
        title={"Admin Dashboard"}
        text={"Comprehensive analytics and system overview"}
      />

      <Space h={"md"} />

      <DashboardPerfomanceCards />

      <Space h={"md"} />

      <AdminDashTabs />
    </div>
  );
};

export default AdminDashBoard;
