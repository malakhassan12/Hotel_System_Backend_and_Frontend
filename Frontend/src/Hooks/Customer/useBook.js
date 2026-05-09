import { useState } from "react";
import { useParams } from "react-router-dom";
import { useCreateBookingMutation } from "./useCreateBookingMutations";
import useGetRoom from "../Room/useGetRoom";

export const useBook = () => {
  const { roomId } = useParams();

  
  const {
    data: room,
    isLoading: roomLoading,
    error: roomError,
  } = useGetRoom(roomId);

 
  const { mutateAsync, isPending, error } = useCreateBookingMutation();

 
  const [formData, setFormData] = useState({
    checkInDate: "",
    checkOutDate: "",
  });

  
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  
  const calculateTotalPrice = () => {
    if (
      !formData.checkInDate ||
      !formData.checkOutDate ||
      !room
    )
      return 0;

    const start = new Date(formData.checkInDate);
    const end = new Date(formData.checkOutDate);

    const nights = (end - start) / (1000 * 60 * 60 * 24);

    const pricePerNight = room.pricePerNight || 0;

    return nights > 0 ? nights * pricePerNight : 0;
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!room) {
        throw new Error("Room data not loaded yet");
      }

      const payload = {
        ...formData,
        checkInDate: new Date(formData.checkInDate).toISOString(),
        checkOutDate: new Date(formData.checkOutDate).toISOString(),
        totalPrice: calculateTotalPrice(),
      };

      await mutateAsync(payload);

      setFormData({
        checkInDate: "",
        checkOutDate: "",
      });

    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  
  return {
    formData,
    handleInputChange,
    handleSubmit,

  
    loadingSubmit: isPending,
    serverError: error?.response?.data?.message || "",

   
    room,
    roomLoading,
    roomError,

    
    totalPrice: calculateTotalPrice(),
  };
};