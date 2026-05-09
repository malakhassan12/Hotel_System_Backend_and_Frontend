import {
  IconHotelService,
  IconCalendarCheck,
  IconHeart,
  IconDoor,
  IconUser,
  IconSettings,
  IconBell,
  IconHome,
  IconClipboardList,
} from "@tabler/icons-react";

const GetCustomerNavIcons = (iconName, size = 18, stroke = 1.8) => {
  const icons = {
    IconHotelService: <IconHotelService size={size} stroke={stroke} />,
    IconCalendarCheck: <IconCalendarCheck size={size} stroke={stroke} />,
    IconHeart: <IconHeart size={size} stroke={stroke} />,
    IconDoor: <IconDoor size={size} stroke={stroke} />,
    IconUser: <IconUser size={size} stroke={stroke} />,
    IconSettings: <IconSettings size={size} stroke={stroke} />,
    IconBell: <IconBell size={size} stroke={stroke} />,
    IconHome: <IconHome size={size} stroke={stroke} />,
    IconClipboardList: <IconClipboardList size={size} stroke={stroke} />,
  };

  return icons[iconName] || null;
};

export { GetCustomerNavIcons };