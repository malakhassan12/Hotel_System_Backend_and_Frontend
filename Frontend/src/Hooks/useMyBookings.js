import { useState, useMemo } from "react";
import { mockMyBookings, bookingTabs } from "../Constants/CustomerBookingsConstants"

export const useMyBookings = () => {
  const [activeTab, setActiveTab] = useState("all");

  const filteredBookings = useMemo(() => {
    if (activeTab === "all") return mockMyBookings;

    return mockMyBookings.filter((booking) => booking.status === activeTab);
  }, [activeTab]);

  return {
    bookings: filteredBookings,
    activeTab,
    setActiveTab,
    tabs: bookingTabs,
  };
};