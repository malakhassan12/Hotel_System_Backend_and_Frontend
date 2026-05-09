import React, { useEffect, useState } from "react";
// ******************************** Mantline UI ********************************

import {
  Modal,
  Group,
  Text,
  Stack,
  Divider,
  Grid,
  Badge,
  Image,
  Button,
  TextInput,
  NumberInput,
  Select,
  FileButton,
  Checkbox,
  SimpleGrid,
  Paper,
  Title,
  Loader,
} from "@mantine/core";

import { useRoomImages } from "../../../Functions/Room/RoomFunctions";
import { defaultRoom, useRoomForm } from "../../../Hooks/Form/useRoomForm";
import { buildFormData } from "../../../Utils/Room/roomHelper";
import ImagesSection from "./RoomModalComponents/ImagesSection";
import { roomStatus, roomTypes } from "../../../Constants/ConstantsFromBack";

const ManageRoomModal = ({
  opened,
  close,
  room,
  mode = "view",
  onSubmit,
  isLoading = false,
}) => {
  const form = useRoomForm();
  const [existingImages, setExistingImages] = useState([]);
  const { files, setFiles, previewUrls } = useRoomImages();

  // Properly sync existingImages when room changes
  useEffect(() => {
    if (opened && room?.images) {
      setExistingImages(room.images);
    } else if (!opened && mode === "create") {
      setExistingImages([]);
      setFiles([]);
    }
  }, [opened, room, mode]);

  useEffect(() => {
    if (!opened) return;

    if (mode === "edit" && room) {
      form.setValues({ ...defaultRoom, ...room });
      setExistingImages(room.images || []);
    }

    if (mode === "create") {
      form.setValues(defaultRoom);
      setExistingImages([]);
      setFiles([]);
    }
  }, [opened, room, mode]);

  const handleSubmit = form.onSubmit((values) => {
    // const formData = buildFormData(values, files, existingImages);

    // console.log([...formData.entries()]);

    // console.log(files);

    // if (mode === "edit") {
    //   onSubmit(formData);
    // } else {
    //   onSubmit(formData);
    // }

    // close();

    console.log("=== FORM SUBMISSION DEBUG ===");
    console.log("Values:", values);
    console.log("Files to upload:", files);
    console.log("Existing images to keep:", existingImages);

    const formData = buildFormData(values, files, existingImages);

    // Log all form data entries
    console.log("FormData entries:");
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    if (mode === "edit") {
      onSubmit(formData);
    } else {
      onSubmit(formData);
    }

    // close();
  });

  return (
    <Modal opened={opened} onClose={close} size="xl" centered>
      <Stack gap="md">
        {/* Title */}
        <Group justify="space-between" align="center">
          <Title order={3}>
            {mode === "create"
              ? "Create New Room"
              : mode === "edit"
                ? "Edit Room"
                : "Room Details"}
          </Title>

          <Badge
            size="lg"
            color={
              form.values.status === "AVAILABLE"
                ? "green"
                : form.values.status === "BOOKED"
                  ? "orange"
                  : "gray"
            }
            variant="filled"
          >
            {form.values.status}
          </Badge>
        </Group>

        <Divider />
        {/* Image Upload Section */}

        {mode == "create" && (
          <ImagesSection
            existingImages={existingImages}
            setExistingImages={setExistingImages}
            files={files}
            setFiles={setFiles}
            previewUrls={previewUrls}
          />
        )}

        {/* Main Form Fields */}
        <Paper withBorder p="md" radius="md">
          <Stack gap="md">
            <Text fw={600} size="sm">
              Room Information
            </Text>

            <NumberInput
              label="Room Number"
              placeholder="e.g., 101, 202, 305"
              required
              min={1}
              {...form.getInputProps("roomNumber")}
            />

            <TextInput
              label="Description"
              placeholder="Describe the room features..."
              {...form.getInputProps("description")}
            />

            <Grid>
              <Grid.Col span={6}>
                <Select
                  label="Room Type"
                  placeholder="Select type"
                  required
                  // data={[
                  //   { value: "SINGLE", label: "Single Room" },
                  //   { value: "DOUBLE", label: "Double Room" },
                  //   { value: "SUITE", label: "Suite" },
                  //   { value: "DELUXE", label: "Deluxe" },
                  // ]}

                  data={roomTypes}
                  {...form.getInputProps("roomType")}
                />
              </Grid.Col>

              <Grid.Col span={6}>
                <NumberInput
                  label="Price per Night"
                  placeholder="Enter price"
                  min={0}
                  required
                  {...form.getInputProps("pricePerNight")}
                />
              </Grid.Col>

              <Grid.Col span={6}>
                <NumberInput
                  label="Max Number of Users"
                  placeholder="Max guests"
                  min={1}
                  required
                  {...form.getInputProps("maxNumberOfUsers")}
                />
              </Grid.Col>

             
            </Grid>
          </Stack>
        </Paper>

        {/* Amenities Section */}
        <Paper withBorder p="md" radius="md">
          <Stack gap="sm">
            <Text fw={600} size="sm">
              Amenities & Features
            </Text>

            <SimpleGrid cols={{ base: 2, sm: 3 }} spacing="md">
              <Checkbox
                label="Ocean View"
                {...form.getInputProps("oceanView", { type: "checkbox" })}
              />
              <Checkbox
                label="King Bed"
                {...form.getInputProps("kingBed", { type: "checkbox" })}
              />
              <Checkbox
                label="Balcony"
                {...form.getInputProps("balcony", { type: "checkbox" })}
              />
              <Checkbox
                label="Mini Bar"
                {...form.getInputProps("miniBar", { type: "checkbox" })}
              />
              <Checkbox
                label="WiFi"
                {...form.getInputProps("wifi", { type: "checkbox" })}
              />
              <Checkbox
                label="Smart TV"
                {...form.getInputProps("smartTv", { type: "checkbox" })}
              />
            </SimpleGrid>
          </Stack>
        </Paper>

        {/* View Mode Additional Info */}
        {mode === "view" && room && (
          <Paper withBorder p="md" radius="md">
            <Stack gap="xs">
              <Text fw={600} size="sm">
                Additional Information
              </Text>
              <Group justify="space-between">
                <Text size="sm" c="dimmed">
                  Booking ID:
                </Text>
                <Text size="sm">{room.bookingId || "No active booking"}</Text>
              </Group>
              <Group justify="space-between">
                <Text size="sm" c="dimmed">
                  Wishlists:
                </Text>
                <Text size="sm">{room.wishlists?.length || 0}</Text>
              </Group>
            </Stack>
          </Paper>
        )}

        <Divider />

        {/* Actions */}
        <Group justify="space-between">
          <Button
            onClick={handleSubmit}
            color={mode === "create" ? "blue" : "green"}
            size="md"
            disabled={isLoading}
            loading={isLoading}
            leftSection={isLoading && <Loader size="xs" color="white" />}
          >
            {mode === "create"
              ? isLoading
                ? "Creating..."
                : "Create Room"
              : mode === "edit"
                ? isLoading
                  ? "Saving..."
                  : "Save Changes"
                : "Close"}
          </Button>

          <Button
            variant="light"
            onClick={close}
            size="md"
            disabled={isLoading}
          >
            Cancel
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};

export default ManageRoomModal;
