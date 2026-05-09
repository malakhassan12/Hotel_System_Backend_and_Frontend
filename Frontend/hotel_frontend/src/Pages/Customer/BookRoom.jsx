import {
  Container,
  Title,
  Text,
  Stack,
  Grid,
  Button,
  Group,
  Divider,
  Space,
} from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import BookForm from "../../Components/Forms/BookForm";
import BookingSummaryCard from "../../Components/Card/Booking/BookingSummaryCard";
// import { useBook } from "../../Hooks/Customer/useBook";
import InitialBox from "../../Components/Box/InitialBox";
import CustomerModal from "../../Components/Modal/Customer/CustomerModal";
const BookRoom = () => {
  const navigate = useNavigate();

  // const {
  //   formData,
  //   handleInputChange,
  //   handleSubmit,
  //   loadingSubmit,
  //   totalPrice,
  //   room,
  // } = useBook();

  const { roomId } = useParams();
  console.log(roomId);


  return (
    <Container size="lg" py="xl">
      <Group mb="xl">
        <Button variant="subtle" onClick={() => navigate(-1)}>
          ← Back
        </Button>
      </Group>
      <InitialBox
        title={"Complete Your Booking"}
        text={"Fill in your details and select dates"}
      />
      <Space h={"md"} />
      <Divider />
      <Space h={"md"} />

      <BookForm roomId={roomId} />
    </Container>
  );
};

export default BookRoom;
