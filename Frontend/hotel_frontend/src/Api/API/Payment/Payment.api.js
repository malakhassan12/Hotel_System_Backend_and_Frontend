// import axios from "axios";
import useAuthStore from "../../../Store/authStore";
import paymentClient from "../../Client/Payment/Payment.client";

const getPendingPayment = async () => {
  const res = await paymentClient.get("/PendingPayment");
  return res?.data;
};

const createPayment = async ({ bookingId, amount }) => {
  const user = useAuthStore.getState().user;

  console.log(user);

  const res = await paymentClient.post(
    "/create",
    {},
    {
      params: {
        bookingId: bookingId,
        amount: amount,
        userId: user?.userId,
        email: user?.email,
      },
    },
  );
  return res?.data;
};

const makeConfirm = async ({
  paymentIntentId,
  customerName,
  customerEmail,
  customerPhone,
}) => {
  const res = await paymentClient.post(
    "/confirm",
    {},
    {
      params: {
        paymentIntentId: paymentIntentId,
        customerName: customerName,
        customerEmail: customerEmail,
        customerPhone: customerPhone,
      },
    },
  );
  return res?.data;
};



// const stripeConfirm = async (clientSecret) => {
//   const paymentIntentId = clientSecret.split("_secret_")[0];

//   const res = await paymentClient.post("/confirm", null, {
//     params: {
//       paymentIntentId,
//       customerName: "test",
//       customerEmail: "test@gmail.com",
//       customerPhone: "01000000000",
//     },
//   });

//   return res.data;
// };

export { getPendingPayment, createPayment, makeConfirm,  };
