// ******************************** Mantine UI ********************************
import {
  Box,
  Card,
  Text,
  Title,
  Group,
  Badge,
  Timeline,
  ScrollArea,
  ThemeIcon,
  Stack,
  Divider,
} from "@mantine/core";

// ******************************** Icons ********************************
import {
  IconDoorEnter,
  IconDoorExit,
  IconCheck,
  IconClock,
  IconHotelService,
  IconBellRinging,
  IconReceipt,
  IconTools,
} from "@tabler/icons-react";

const TodayActivityTimeline = () => {
  const activities = [
    {
      id: 1,
      time: "10:00 AM",
      title: "Check-in Guest",
      description: "Ahmed Mohamed - Room 204 (Deluxe Suite)",
      type: "check-in",
      status: "completed",
      icon: IconDoorEnter,
      color: "green",
    },
    {
      id: 2,
      time: "11:30 AM",
      title: "Room Cleaning Completed",
      description: "Room 310 - Ready for next guest",
      type: "maintenance",
      status: "completed",
      icon: IconHotelService,
      color: "teal",
    },
    {
      id: 3,
      time: "12:15 PM",
      title: "Booking Request",
      description: "New booking from Sara Hassan - Standard Room",
      type: "booking",
      status: "pending",
      icon: IconBellRinging,
      color: "orange",
    },
    {
      id: 4,
      time: "02:00 PM",
      title: "Booking Approved",
      description: "John Doe - Executive Suite (3 nights)",
      type: "booking",
      status: "completed",
      icon: IconCheck,
      color: "primary",
    },
    {
      id: 5,
      time: "03:30 PM",
      title: "Payment Received",
      description: "$450 - Room 204 (Credit Card)",
      type: "payment",
      status: "completed",
      icon: IconReceipt,
      color: "blue",
    },
    {
      id: 6,
      time: "04:00 PM",
      title: "Check-out Completed",
      description: "Jane Smith - Room 105",
      type: "check-out",
      status: "completed",
      icon: IconDoorExit,
      color: "cyan",
    },
    {
      id: 7,
      time: "05:00 PM",
      title: "Maintenance Request",
      description: "Room 450 - AC not working",
      type: "maintenance",
      status: "pending",
      icon: IconTools,
      color: "red",
    },
  ];

  const getStatusColor = (status) => {
    return status === "completed"
      ? "green"
      : status === "pending"
        ? "orange"
        : "gray";
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "check-in":
        return "green";
      case "check-out":
        return "blue";
      case "booking":
        return "primary";
      case "payment":
        return "teal";
      case "maintenance":
        return "red";
      default:
        return "gray";
    }
  };

  const pendingCount = activities.filter((a) => a.status === "pending").length;
  const completedCount = activities.filter(
    (a) => a.status === "completed",
  ).length;

  return (
    <Card>
      <Stack gap="md">
        {/* Header */}
        <Group justify="space-between" align="center">
          <div>
            <Group gap="xs">
              <ThemeIcon size="md" radius="xl" variant="light" color="primary">
                <IconClock size={16} />
              </ThemeIcon>
              <Title order={4}>Today Activity Timeline</Title>
            </Group>
            <Text size="xs" c="dimmed" mt={4}>
              Real-time activities and updates
            </Text>
          </div>
          <Group gap="xs">
            <Badge size="lg" radius="xl" variant="light" color="green">
              {completedCount} Completed
            </Badge>
            {pendingCount > 0 && (
              <Badge size="lg" radius="xl" variant="light" color="orange">
                {pendingCount} Pending
              </Badge>
            )}
          </Group>
        </Group>

        <Divider />

        {/* Timeline */}
        <ScrollArea h={450} type="auto" offsetScrollbars>
          <Timeline
            active={activities.length - 1}
            bulletSize={24}
            lineWidth={2}
          >
            {activities.map((activity, ) => (
              <Timeline.Item
                key={activity.id}
                bullet={
                  <ThemeIcon
                    size={24}
                    radius="xl"
                    variant="light"
                    color={getTypeColor(activity.type)}
                  >
                    <activity.icon size={14} />
                  </ThemeIcon>
                }
                title={
                  <Group justify="space-between" wrap="nowrap">
                    <Text size="sm" fw={600}>
                      {activity.title}
                    </Text>
                    <Badge
                      size="sm"
                      radius="xl"
                      variant="light"
                      color={getStatusColor(activity.status)}
                    >
                      {activity.status}
                    </Badge>
                  </Group>
                }
              >
                <Text size="xs" c="dimmed" mt={4}>
                  {activity.description}
                </Text>
                <Text size="xs" c="primary" fw={500} mt={4}>
                  {activity.time}
                </Text>
              </Timeline.Item>
            ))}
          </Timeline>
        </ScrollArea>

        {/* Footer - Today Summary */}
        <Divider />
        <Group justify="space-between">
          <Text size="xs" c="dimmed">
            Last updated: {new Date().toLocaleTimeString()}
          </Text>
          <Group gap="xs">
            <ThemeIcon size="xs" radius="xl" color="green" />
            <Text size="xs" c="dimmed">
              Completed
            </Text>
            <ThemeIcon size="xs" radius="xl" color="orange" />
            <Text size="xs" c="dimmed">
              Pending
            </Text>
            <ThemeIcon size="xs" radius="xl" color="primary" />
            <Text size="xs" c="dimmed">
              In Progress
            </Text>
          </Group>
        </Group>
      </Stack>
    </Card>
  );
};

export default TodayActivityTimeline;
