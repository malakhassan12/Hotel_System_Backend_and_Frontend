// ******************************** Mantline UI ********************************

import { Space } from "@mantine/core";

// ******************************** Components ********************************
import InitialBox from "../../Components/Box/InitialBox";
import Search from "../../Components/Search/Serach";
import RoomCards from "../../Components/Card/Room/RoomCards";

const BrowseRooms = () => {
  return (
    <div>
      <Space h={"md"} />

      <InitialBox
        title={"Browse Rooms"}
        text={"Find the perfect room for your stay"}
      />
      <Space h={"md"} />
      <Search />
      <Space h={"md"} />
      <RoomCards />
    </div>
  );
};

export default BrowseRooms;
