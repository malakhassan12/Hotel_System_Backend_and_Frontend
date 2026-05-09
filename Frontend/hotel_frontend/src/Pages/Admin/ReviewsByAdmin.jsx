import React from "react";
import InitialBox from "../../Components/Box/InitialBox";
import { Space } from "@mantine/core";
import ReviewTable from "../../Components/Table/Review/ReviewTable";
import ReviewStatus from "../../Components/Analysis/Review/ReviewStatus";

const ReviewsByAdmin = () => {
  return (
    <div>
      <InitialBox
        title={"Reviews of the Rooms"}
        text={"lorem kndniuubiubiubdiubduibb"}
      />

      <Space h={"md"} />

      <ReviewStatus />
      <Space h={"md"} />

      <ReviewTable />
    </div>
  );
};

export default ReviewsByAdmin;
