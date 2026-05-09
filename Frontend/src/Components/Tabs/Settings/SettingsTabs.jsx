import { useState } from "react";
// ******************************** Mantine UI ********************************

import { Stack, Tabs, Card, Grid } from "@mantine/core";
// ******************************** ICons ********************************

import { IconUser, IconLock, IconBell } from "@tabler/icons-react";
// ******************************** Components ********************************

import ProfileTab from "./ProfileTab";
import SecurityTab from "./SecurityTab";
import NotificationsTab from "./NotificationsTab";

const SettingsTabs = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div>
      <Grid gutter="lg">
        {/* Sidebar */}
        <Grid.Col span={{ base: 12, lg: 3 }}>
          <Card withBorder padding="md" radius="md">
            <Stack gap="sm">
              <Tabs
                orientation="vertical"
                value={activeTab}
                onChange={setActiveTab}
              >
                <Tabs.List>
                  <Tabs.Tab
                    value="profile"
                    leftSection={<IconUser size={16} />}
                  >
                    Profile
                  </Tabs.Tab>
                  <Tabs.Tab
                    value="security"
                    leftSection={<IconLock size={16} />}
                  >
                    Security
                  </Tabs.Tab>
                  <Tabs.Tab
                    value="notifications"
                    leftSection={<IconBell size={16} />}
                  >
                    Notifications
                  </Tabs.Tab>
                </Tabs.List>
              </Tabs>
            </Stack>
          </Card>
        </Grid.Col>

        {/* Content */}
        <Grid.Col span={{ base: 12, lg: 9 }}>
          <Card withBorder padding="xl" radius="md">
            {/* Profile Settings */}
            {activeTab === "profile" && <ProfileTab />}

            {/* Security Settings */}
            {activeTab === "security" && <SecurityTab />}

            {/* Notifications Settings */}
            {activeTab === "notifications" && <NotificationsTab />}
          </Card>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default SettingsTabs;
