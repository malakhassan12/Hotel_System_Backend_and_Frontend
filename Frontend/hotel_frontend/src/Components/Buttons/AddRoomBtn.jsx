// ******************************** Mantline UI ********************************

import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

// ******************************** Icons ********************************

import { IconCircleDashedPlus } from "@tabler/icons-react";
// ******************************** Componenets ********************************

import ManageRoomModal from "../Modal/Room/ManageRoomModal";
import useRoomMutations from "../../Hooks/Room/useRoomMutations";

const AddRoomBtn = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { addRoomMutation } = useRoomMutations();

  const handleSubmit = (formData) => {
    console.log(formData);
    console.log([...formData.entries()]);

    addRoomMutation.mutate(formData);

    if (addRoomMutation?.isSuccess) {
      close();
    }
  };
  return (
    <div>
      <ManageRoomModal
        opened={opened}
        close={close}
        mode={"create"}
        onSubmit={handleSubmit}
      />
      <Button
        leftSection={<IconCircleDashedPlus size={14} />}
        onClick={open}
        loading={addRoomMutation.isPending}
      >
        Add Room
      </Button>
    </div>
  );
};

export default AddRoomBtn;
