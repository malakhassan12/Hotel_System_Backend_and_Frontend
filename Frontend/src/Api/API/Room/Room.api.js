import roomClient from "../../Client/Room/Room.client";

const getRoom = async (roomId) => {
    const res = await roomClient.get(`/${roomId}`);
    return res?.data;
  
};

const getAllRooms = async ({ page = 0, size = 10 }) => {
    const res = await roomClient.get("", {
      params: { page, size },
    });
    return res?.data?.content;
 
};

const editRoomStatus = async ({ roomId, status }) => {
    const res = await roomClient.patch(`/${roomId}/status?status=${status}`);
    return res?.data;
 
};

const getStatusOfRooms = async () => {
    const res = await roomClient.get(`/stats`);
    return res?.data;
 
};

const getCountAvailableRoom = async () => {
    const res = await roomClient.get(`/CountAvailableRoom`);
    return res?.data;
 
};

const getCountMantenanceRoom = async () => {
    const res = await roomClient.get(`/CountMantenanceRoom`);
    return res?.data;
 
};
const getImagesByRoom = async (roomId) => {
    const res = await roomClient.get(`/${roomId}/images`);
    return res?.data;
 
};

const addRoom = async (data) => {
    const res = await roomClient.post(`/add`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res?.data;
 
};

const updateRoom = async ({ roomId, data }) => {
    const res = await roomClient.put(`/${roomId}`, data);
    return res?.data;
 
};

const deleteRoom = async (roomId) => {
    const res = await roomClient.delete(`/${roomId}`);
    return res?.data;
 
};
export {
  getRoom,
  getAllRooms,
  editRoomStatus,
  getStatusOfRooms,
  getCountAvailableRoom,
  getCountMantenanceRoom,
  getImagesByRoom,
  addRoom,
  updateRoom,
  deleteRoom,
};
