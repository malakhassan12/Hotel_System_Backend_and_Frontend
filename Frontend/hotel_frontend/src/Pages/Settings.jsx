import { useState } from "react";
// ******************************** Mantine UI ********************************

import {
  Box,
  Title,
  Text,
  Group,
  Button,
  Space,
  Notification,
} from "@mantine/core";
// ******************************** ICons ********************************

import { IconDeviceFloppy } from "@tabler/icons-react";
// ******************************** Components ********************************

import SettingsTabs from "../Components/Tabs/Settings/SettingsTabs";

const Settings = () => {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <Box>
      <Space h="md" />

      {/* Header */}
      <Group justify="space-between" align="center" mb="lg">
        <div>
          <Title order={2}>Settings</Title>
          <Text size="sm" c="dimmed">
            Manage your account and system preferences
          </Text>
        </div>
        <Button
          variant="filled"
          color="primary"
          leftSection={<IconDeviceFloppy size={16} />}
          onClick={handleSave}
        >
          Save Changes
        </Button>
      </Group>

      {saved && (
        <Notification
          color="green"
          title="Success"
          onClose={() => setSaved(false)}
          mb="md"
        >
          Settings have been saved successfully!
        </Notification>
      )}

      <SettingsTabs />
      <Space h="md" />
    </Box>
  );
};

export default Settings;
