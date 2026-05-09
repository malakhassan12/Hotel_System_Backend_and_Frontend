
// ******************************** Mantline UI ********************************

import { Divider, Flex, Space } from "@mantine/core";
// ******************************** Components ********************************

import InitialBox from "../../Components/Box/InitialBox";
import AddRoomBtn from "../../Components/Buttons/AddRoomBtn";
import ManageRoomsPerformanceCards from "../../Components/Analysis/Room/ManageRoomsPerformanceCards";
import Search from "../../Components/Search/Serach";
import ManageRoomsTable from "../../Components/Table/Admin/ManageRoomsTable";

const ManageRooms = () => {
  
  
  return (
    <div>
      <Flex justify={"space-between"}>
        <InitialBox
          title={"Manage Rooms"}
          text={"Add, edit, and delete room listings"}
        />

        <AddRoomBtn />
      </Flex>

      <Space h={"md"} />

      <ManageRoomsPerformanceCards />

      <Space h={"md"} />
      <Divider />

      <Space h={"md"} />

      <Search />

      <Space h={"md"} />

      <ManageRoomsTable/>


    </div>
  );
};

export default ManageRooms;
