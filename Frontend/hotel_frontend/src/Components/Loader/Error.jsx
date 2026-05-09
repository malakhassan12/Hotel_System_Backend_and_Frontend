import { Center, Text } from "@mantine/core";
import React from "react";

const Error = ({ name, error }) => {
  return (
    <Center h={300}>
      <Text c="red">
        Error loading ${name}: {error.message}
      </Text>
    </Center>
  );
};

export default Error;
