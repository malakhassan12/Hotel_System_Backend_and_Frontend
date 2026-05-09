// ******************************** Mantine UI ********************************

import {
  Title,
  Text,
  Stack,
  Group,
  Button,
  TextInput,
  Divider,
  Avatar,
  Grid,
} from "@mantine/core";
// ******************************** Icons ********************************

import { IconUser, IconPhoto, IconMail, IconPhone } from "@tabler/icons-react";

const ProfileTab = () => {
  return (
    <Stack gap="lg">
      <Title order={3}>Profile Information</Title>
      <Text size="sm" c="dimmed">
        Update your personal information and profile picture
      </Text>
      <Divider />

      <Group justify="center">
        <Avatar size={120} radius="xl" color="primary">
          <IconUser size={60} />
        </Avatar>
        <Button variant="light" leftSection={<IconPhoto size={16} />}>
          Change Photo
        </Button>
      </Group>

      <Grid>
        <Grid.Col span={6}>
          <TextInput
            label="First Name"
            placeholder="John"
            defaultValue="John"
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput label="Last Name" placeholder="Doe" defaultValue="Doe" />
        </Grid.Col>
        <Grid.Col span={12}>
          <TextInput
            label="Email"
            placeholder="email@example.com"
            defaultValue="john@example.com"
            leftSection={<IconMail size={16} />}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <TextInput
            label="Phone"
            placeholder="+1 234 567 8901"
            defaultValue="+1 234 567 8901"
            leftSection={<IconPhone size={16} />}
          />
        </Grid.Col>
      </Grid>
    </Stack>
  );
};

export default ProfileTab;
