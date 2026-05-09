// ******************************** Mantline UI ********************************

import {  Grid, Space, Stack,  } from "@mantine/core";
// ******************************** Components ********************************

import DashboardPerfomanceCards from "../../Components/Analysis/Receptionist/DashboardPerfomanceCards";
import DashPieChart from "../../Components/Analysis/Receptionist/DashPieChart";
import ReceptionistLineChart from "../../Components/Analysis/Receptionist/ReceptionistLineChart";
import TodayActivityTimeline from "../../Components/Analysis/Receptionist/TodayActivityTimeline";
import InitialBox from "../../Components/Box/InitialBox";

const ReceptionistDashBoard = () => {
  return (
    <div>
      <Space h={"md"} />

      <InitialBox
        title={"Receptionist Dashboard"}
        text={"Manage bookings and room operations"}
      />
      <Space h={"md"} />

      <DashboardPerfomanceCards />

      <Space h={"md"} />

      <Stack gap="lg">
        {/* Charts Section */}
        <Grid gutter="md">
          <Grid.Col span={{ base: 12, md: 6, lg: 5 }}>
            <DashPieChart />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 7 }}>
            <ReceptionistLineChart />
          </Grid.Col>
        </Grid>
      </Stack>

      <Space h={"md"} />

      {/* <TodayActivityTimeline /> */}
    </div>
  );
};

export default ReceptionistDashBoard;
