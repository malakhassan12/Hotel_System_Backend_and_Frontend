import { Center, Text } from "@mantine/core";
import React from "react";

const NoData = ({ name }) => {
  return (
    <Center h={300}>
      <Text c="dimmed">No {name} found</Text>
    </Center>
  );
};

export default NoData;
