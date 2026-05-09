import { Button } from "@mantine/core";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAuthStore from "../../Store/authStore";
import useGetOneBooking from "../../Hooks/Customer/useGetOneBooking";
import useGetRoom from "../../Hooks/Room/useGetRoom";
import usePaymentMutations from "../../Hooks/Payement/usePaymentMutations";

const SendPaymentIntentBtn = () => {
  const { roomId } = useParams();
  const { user } = useAuthStore();

  console.log(user?.userId, Number(roomId));

  const { data: booking = {} } = useGetOneBooking(user?.userId, Number(roomId));
  console.log(booking);
  const { data: room } = useGetRoom(roomId);
  console.log(room);

  const { createPaymentMutation } = usePaymentMutations();

  const navigate = useNavigate();

  // const makePayment = () => {
  //   createPaymentMutation.mutate({
  //     bookingId: booking.id,
  //     amount: booking.totalPrice,
  //   });
  // };
  const makePayment = async () => {
    const res = await createPaymentMutation.mutateAsync({
      bookingId: booking.id,
      amount: booking.totalPrice,
    });

    const clientSecret = res.clientSecret;

    navigate(`/customer/create-payment/${roomId}`, {
      state: { clientSecret },
    });
  };

  console.log(booking);

  return (
    <>
      <Button
        fullWidth
        size="lg"
        type="link"
        mt="md"
        variant="gradient"
        gradient={{ from: "blue", to: "cyan", deg: 135 }}
        radius="md"
        component={Link}
        to={`/customer/create-payment/${roomId}`}
        onClick={makePayment}
        loading={createPaymentMutation?.isPending}
        disabled={booking?.status !== "ACCEPTED"}
      >
        Go To Payment ?
      </Button>
    </>
  );
};

export default SendPaymentIntentBtn;
