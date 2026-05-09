import React from 'react';
import { Box, Text, Group, Divider, Anchor, Stack, ThemeIcon, Grid } from '@mantine/core';
import { IconHeart, IconBrandGithub, IconBrandTwitter, IconBrandLinkedin, IconMail, IconPhone, IconMapPin, IconClock } from '@tabler/icons-react';

const AdminFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      style={{
        backgroundColor: 'light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-8))',
        borderTop: '1px solid light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-6))',
        marginTop: 'auto',
      }}
      py="xl"
      px="md"
    >
      <Box maw={1400} mx="auto">
        <Grid gutter="xl">
          {/* Company Info */}
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Stack gap="xs">
              <Text fw={700} size="lg" c="primary">Hotel Management</Text>
              <Text size="sm" c="dimmed">
                Complete hotel management solution for modern hospitality businesses.
              </Text>
              <Group gap="xs" mt="xs">
                <Anchor href="#" target="_blank">
                  <IconBrandGithub size={18} />
                </Anchor>
                <Anchor href="#" target="_blank">
                  <IconBrandTwitter size={18} />
                </Anchor>
                <Anchor href="#" target="_blank">
                  <IconBrandLinkedin size={18} />
                </Anchor>
                <Anchor href="#" target="_blank">
                  <IconMail size={18} />
                </Anchor>
              </Group>
            </Stack>
          </Grid.Col>

          {/* Quick Links */}
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Stack gap="xs">
              <Text fw={600} size="sm" tt="uppercase" c="dimmed">Quick Links</Text>
              <Anchor href="/admin" size="sm">Dashboard</Anchor>
              <Anchor href="/admin/rooms" size="sm">Rooms Management</Anchor>
              <Anchor href="/admin/users" size="sm">Users Management</Anchor>
              <Anchor href="/admin/reports" size="sm">Reports</Anchor>
              <Anchor href="/admin/settings" size="sm">Settings</Anchor>
            </Stack>
          </Grid.Col>

          {/* Contact Info */}
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Stack gap="xs">
              <Text fw={600} size="sm" tt="uppercase" c="dimmed">Contact Us</Text>
              <Group gap="xs">
                <IconPhone size={14} />
                <Text size="sm">+1 234 567 890</Text>
              </Group>
              <Group gap="xs">
                <IconMail size={14} />
                <Text size="sm">admin@hotel.com</Text>
              </Group>
              <Group gap="xs">
                <IconMapPin size={14} />
                <Text size="sm">123 Hotel Street, City</Text>
              </Group>
              <Group gap="xs">
                <IconClock size={14} />
                <Text size="sm">24/7 Support</Text>
              </Group>
            </Stack>
          </Grid.Col>

          {/* Admin Info */}
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Stack gap="xs">
              <Text fw={600} size="sm" tt="uppercase" c="dimmed">System Status</Text>
              <Group justify="space-between">
                <Text size="sm">Version</Text>
                <Text size="sm" fw={500}>v2.0.0</Text>
              </Group>
              <Group justify="space-between">
                <Text size="sm">Last Backup</Text>
                <Text size="sm" fw={500}>Today, 02:00 AM</Text>
              </Group>
              <Group justify="space-between">
                <Text size="sm">System Uptime</Text>
                <Text size="sm" fw={500} c="green">99.9%</Text>              </Group>
              <Group justify="space-between">
                <Text size="sm">Active Sessions</Text>
                <Text size="sm" fw={500}>12</Text>
              </Group>
            </Stack>
          </Grid.Col>
        </Grid>

        <Divider my="lg" />

        <Group justify="space-between" wrap="wrap">
          <Text size="xs" c="dimmed">
            © {currentYear} Hotel Management System. All rights reserved.
          </Text>
          <Group gap="lg">
            <Anchor href="#" size="xs" c="dimmed">Privacy Policy</Anchor>
            <Anchor href="#" size="xs" c="dimmed">Terms of Service</Anchor>
            <Anchor href="#" size="xs" c="dimmed">Cookie Policy</Anchor>
          </Group>
        </Group>
      </Box>
    </Box>
  );
};

export default AdminFooter;