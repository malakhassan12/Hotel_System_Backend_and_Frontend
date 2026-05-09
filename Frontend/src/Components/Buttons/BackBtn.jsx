import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { IconArrowLeft } from "@tabler/icons-react";

const BackBtn = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="light"
      leftSection={<IconArrowLeft size={16} />}
      onClick={() => navigate(-1)}
    >
      Back
    </Button>
  );
};

export default BackBtn;