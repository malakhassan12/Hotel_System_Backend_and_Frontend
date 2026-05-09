import { roomTypeMap } from "../../Constants/ConstantsFromBack";
import getStatusConfigRoom from "../../Utils/Room/getStatusConfigRoom";

const mapRoomData = (room) => {
  if (!room) return null;

  // Build features array from room amenities
  const features = [];
  if (room.oceanView) features.push("Ocean View");
  if (room.kingBed) features.push("King Bed");
  if (room.balcony) features.push("Balcony");
  if (room.miniBar) features.push("Mini Bar");
  if (room.wifi) features.push("Free WiFi");
  if (room.smartTv) features.push("Smart TV");

  // Build amenities array
  const amenities = [];
  if (room.wifi) amenities.push("Free High-Speed WiFi");
  if (room.smartTv) amenities.push("Smart TV with Streaming");
  if (room.miniBar) amenities.push("Mini Bar");
  if (room.balcony) amenities.push("Private Balcony");

  // Get images
  const images =
    room.images?.map((img) => {
      const baseUrl = "http://localhost:8080"; // Adjust as needed
      return `${baseUrl}/${img.imagePath}`;
    }) || [];

  // Default images if none provided
  if (images.length === 0) {
    images.push(
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=500&fit=crop",
    );
  }

  // Map status color and label

  const statusInfo = getStatusConfigRoom(room.status) || {
    label: room.status,
    color: "gray",
  };

  return {
    id: room.id,
    title: `${roomTypeMap[room.roomType] || room.roomType || "Room"} ${room.roomNumber}`,
    category: room.roomType || "Standard",
    price: `$${room.pricePerNight}`,
    pricePerNight: room.pricePerNight,
    status: room.status,
    statusLabel: statusInfo.label,
    statusColor: statusInfo.color,
    rating: 4.5, // You can add rating to API if needed
    reviews: 0, // You can add reviews to API if needed
    maxGuests: room.maxNumberOfUsers || 2,
    description:
      room.description ||
      "Comfortable and cozy room with all modern amenities for a perfect stay.",
    features: features,
    amenities: amenities,
    images: images,
    roomNumber: room.roomNumber,
    roomType: room.roomType,
    oceanView: room.oceanView,
    kingBed: room.kingBed,
    balcony: room.balcony,
    miniBar: room.miniBar,
    wifi: room.wifi,
    smartTv: room.smartTv,
  };
};

import { useEffect, useState } from "react";

const useRoomImages = () => {
  const [files, setFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  useEffect(() => {
    const urls = files?.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);

    return () => {
      urls?.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [files]);

  return {
    files,
    setFiles,
    previewUrls,
  };
};

export { mapRoomData, useRoomImages };
