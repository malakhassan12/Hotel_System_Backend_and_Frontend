import authClient from "../../Client/Auth/Auth.client";

const getPendingEmployees = async () => {
  try {
    const res = await authClient.get(`/pending-employees`);
    return res?.data;
  } catch (err) {
    return err;
  }
};

const approveEmployee = async (userId) => {
  try {
    const res = await authClient.post(`/approve/${userId}`);
    return res?.data;
  } catch (err) {
    return err;
  }
};

const rejectEmployee = async (userId) => {
  try {
    const res = await authClient.post(`/reject/${userId}`);
    return res?.data;
  } catch (err) {
    return err;
  }
};

export { getPendingEmployees, rejectEmployee, approveEmployee };
