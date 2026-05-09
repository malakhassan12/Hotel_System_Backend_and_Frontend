import notificationClient from "../../Client/Notification/Notification.client";

const getAllNotificationByUserId = async (userId) => {
  const res = await notificationClient.get(`/${userId}`);
  return res?.data;
};

const deleteNoti = async (notiId) => {
  const res = await notificationClient.delete(`/delete/${notiId}`);
  return res?.data;
};

const sendNoti = async (noti) => {
  const res = await notificationClient.post(`/send`, noti);
  return res?.data;
};

const deleteAllNotis = async (userId) => {
  const res = await notificationClient.delete(`/${userId}`);
  return res?.data;
};

export { getAllNotificationByUserId, deleteNoti, sendNoti, deleteAllNotis };
