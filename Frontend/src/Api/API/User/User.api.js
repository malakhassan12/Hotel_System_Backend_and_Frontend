import userClient from "../../Client/User/User.client";

const getUser = async (userId) => {
  try {
    const res = await userClient.get(`/${userId}`);
    return res?.data;
  } catch (err) {
    return err;
  }
};

const getAllUsers = async () => {
  try {
    const res = await userClient.get(``);
    return res?.data;
  } catch (err) {
    return err;
  }
};



export { getUser , getAllUsers };
