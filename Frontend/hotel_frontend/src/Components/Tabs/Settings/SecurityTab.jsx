// ******************************** Mantine UI ********************************

import { Title, Text, Stack, PasswordInput, Divider } from "@mantine/core";

const SecurityTab = () => {
  return (
    <Stack gap="lg">
      <Title order={3}>Security Settings</Title>
      <Text size="sm" c="dimmed">
        Change your password and security preferences
      </Text>
      <Divider />

      <PasswordInput
        label="Current Password"
        placeholder="Enter current password"
      />
      <PasswordInput label="New Password" placeholder="Enter new password" />
      <PasswordInput
        label="Confirm New Password"
        placeholder="Confirm new password"
      />

      <Divider />
    </Stack>
  );
};

export default SecurityTab;
