
import { IconUsers, IconUserCheck, IconSettings } from '@tabler/icons-react';
const cardsData = [
  {
    title: "Customer Portal",
    description:
      "Browse rooms, make bookings, manage reservations, and save favorites",
    icon: <IconUsers size={28} color={`var(--mantine-color-blue-6)`} />,
  },
  {
    title: "Receptionist Dashboard",
    description:
      "Manage booking requests, room status, check-ins, check-outs, and payments",
    icon: <IconSettings size={28} color={`var(--mantine-color-green-6)`} />,
  },
  {
    title: "Admin Console",
    description:
      "Full system analytics, user management, room management, and system logs",
    icon: <IconUserCheck size={28} color={`var(--mantine-color-primary-6)`} />,
  },
];

export { cardsData };
