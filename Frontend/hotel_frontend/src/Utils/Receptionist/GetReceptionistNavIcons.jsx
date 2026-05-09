import {
  IconDashboard,
  IconCalendarCheck,
  IconHotelService,
  IconDoorEnter,
  IconDoorExit,
  IconCreditCard,
  IconBell,
  IconSettings,
  IconUsers,
  IconStars,
  IconLogs,
  IconHeart,
} from "@tabler/icons-react";

const iconMap = {
  IconDashboard: IconDashboard,
  IconCalendarCheck: IconCalendarCheck,
  IconHotelService: IconHotelService,
  IconDoorEnter: IconDoorEnter,
  IconDoorExit: IconDoorExit,
  IconCreditCard: IconCreditCard,
  IconBell: IconBell,
  IconSettings: IconSettings,
  IconUsers: IconUsers,
  IconStars: IconStars,
  IconLogs: IconLogs,
  IconHeart: IconHeart,
};

export const GetReceptionistNavIcons = (iconName, size = 18) => {
  const IconComponent = iconMap[iconName];
  if (!IconComponent) return null;
  return <IconComponent size={size} />;
};
