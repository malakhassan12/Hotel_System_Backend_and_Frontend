// ******************************** Mantline UI ********************************
import { Space } from "@mantine/core";

// ******************************** Components ********************************
import InitialBox from "../../Components/Box/InitialBox";
import RoomPerformanceCards from "../../Components/Analysis/Room/RoomPerformanceCards";
import RoomCards from "../../Components/Card/Room/RoomCards";
import Search from "../../Components/Search/Serach";

const RoomsManagement = () => {
  return (
    <div>
      <Space h={"md"} />

      <InitialBox
        title={"Rooms Management"}
        text={"Monitor and update room status"}
      />

      <Space h={"md"} />

      <RoomPerformanceCards />

      <Space h={"md"} />
      <Search />

      <Space h={"md"} />

      <RoomCards />
    </div>
  );
};

export default RoomsManagement;
