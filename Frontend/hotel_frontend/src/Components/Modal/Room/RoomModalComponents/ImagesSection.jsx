import React from "react";
import {
  Paper,
  Stack,
  Text,
  Group,
  Image,
  Button,
  FileButton,
  Table,
  Box,
  Badge,
  ActionIcon,
  ScrollArea,
  Flex,
  Tooltip,
  Divider,
} from "@mantine/core";
import { IconTrash, IconUpload, IconPhoto, IconX, IconInfoCircle } from "@tabler/icons-react";

const ImagesSection = ({
  existingImages = [],
  setExistingImages,
  files = [],
  setFiles,
  previewUrls = [],
}) => {
  // Format file size
  const formatFileSize = (bytes) => {
    if (!bytes) return "";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  // Handle delete existing image
  const handleDeleteExisting = (imageId) => {
    setExistingImages((prev) => prev.filter((i) => i.id !== imageId));
  };

  // Handle delete new image
  const handleDeleteNew = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const totalImages = existingImages.length + files.length;

  return (
    <Paper withBorder radius="md" style={{ overflow: "hidden" }}>
      <Stack gap={0}>
        {/* Header Section */}
        <Box
          style={{
            padding: "16px 20px",
            color: "white",
          }}
        >
          <Group justify="space-between" align="center">
            <Group gap="xs">
              <IconPhoto size={24} />
              <Text fw={700} size="lg">
                Room Images Gallery
              </Text>
            </Group>

            <Badge
              size="lg"
              variant="filled"
              style={{
                backdropFilter: "blur(10px)",
              }}
            >
              {totalImages} {totalImages === 1 ? "Image" : "Images"}
            </Badge>
          </Group>
        </Box>

        {/* Content Section */}
        <Box style={{ padding: "20px" }}>
          {totalImages > 0 ? (
            <>
              {/* Statistics Bar */}
              <Group justify="space-between" mb="md" wrap="wrap" gap="xs">
                <Group gap="md">
                  <Badge variant="light" color="blue" size="lg">
                     Existing: {existingImages.length}
                  </Badge>
                  <Badge variant="light" color="green" size="lg">
                     New: {files.length}
                  </Badge>
                </Group>
                <Tooltip label="Images will be uploaded when you save the form">
                  <Group gap="xs">
                    <IconInfoCircle size={16} style={{ color: "#888" }} />
                    <Text size="xs" c="dimmed">
                      {files.length} pending upload(s)
                    </Text>
                  </Group>
                </Tooltip>
              </Group>

              <Divider mb="md" />

              {/* Responsive Table */}
              <ScrollArea>
                <Box style={{ minWidth: "500px" }}>
                  <Table
                    striped
                    highlightOnHover
                    verticalSpacing="sm"
                    horizontalSpacing="md"
                    style={{
                      borderCollapse: "separate",
                      borderSpacing: "0 8px",
                    }}
                  >
                    <Table.Thead>
                      <Table.Tr
                        style={{
                          borderRadius: "8px",
                        }}
                      >
                        <Table.Th style={{ width: "80px", textAlign: "center" }}>
                          Preview
                        </Table.Th>
                        <Table.Th>Image Details</Table.Th>
                        <Table.Th style={{ width: "100px" }}>Status</Table.Th>
                        <Table.Th style={{ width: "100px", textAlign: "center" }}>
                          Action
                        </Table.Th>
                      </Table.Tr>
                    </Table.Thead>

                    <Table.Tbody>
                      {/* Existing Images */}
                      {existingImages.map((img, ) => (
                        <Table.Tr
                          key={img.id}
                          style={{
                            transition: "all 0.3s ease",
                          }}
                        >
                          <Table.Td>
                            <Box
                              style={{
                                width: "60px",
                                height: "60px",
                                borderRadius: "8px",
                                overflow: "hidden",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                              }}
                            >
                              <Image
                                src={img.imageUrl}
                                width={60}
                                height={60}
                                fit="cover"
                                fallbackSrc="https://placehold.co/60x60?text=Error"
                              />
                            </Box>
                          </Table.Td>

                          <Table.Td>
                            <Stack gap={4}>
                              <Text size="sm" fw={600} lineClamp={1}>
                                {img.imagePath?.split("/").pop() || `Image_${img.id}`}
                              </Text>
                              <Text size="xs" c="dimmed">
                                ID: {img.id}
                              </Text>
                            </Stack>
                          </Table.Td>

                          <Table.Td>
                            <Badge
                              variant="filled"
                              size="md"
                              radius="xl"
                              style={{
                                color:"black"
                              }}
                            >
                              Saved
                            </Badge>
                          </Table.Td>

                          <Table.Td>
                            <Tooltip label="Delete this image">
                              <ActionIcon
                                variant="filled"
                                color="red"
                                size="md"
                                radius="xl"
                                onClick={() => handleDeleteExisting(img.id)}
                                style={{
                                  transition: "transform 0.2s",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.transform = "scale(1.1)";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.transform = "scale(1)";
                                }}
                              >
                                <IconTrash size={16} />
                              </ActionIcon>
                            </Tooltip>
                          </Table.Td>
                        </Table.Tr>
                      ))}

                      {/* New Images */}
                      {previewUrls.map((url, index) => (
                        <Table.Tr
                          key={`new-${index}`}
                          style={{
                            transition: "all 0.3s ease",
                          }}
                        >
                          <Table.Td>
                            <Box
                              style={{
                                width: "60px",
                                height: "60px",
                                borderRadius: "8px",
                                overflow: "hidden",
                                position: "relative",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                              }}
                            >
                              <Image
                                src={url}
                                width={60}
                                height={60}
                                fit="cover"
                              />
                              <Badge
                                size="xs"
                                variant="filled"
                                color="green"
                                style={{
                                  position: "absolute",
                                  top: "-5px",
                                  right: "-5px",
                                  borderRadius: "10px",
                                }}
                              >
                                New
                              </Badge>
                            </Box>
                          </Table.Td>

                          <Table.Td>
                            <Stack gap={4}>
                              <Text size="sm" fw={600} lineClamp={1}>
                                {files[index]?.name || `New_Image_${index + 1}`}
                              </Text>
                              <Group gap="xs">
                                <Text size="xs" c="dimmed">
                                  {formatFileSize(files[index]?.size)}
                                </Text>
                                <Badge size="xs" variant="dot" color="green">
                                  Ready
                                </Badge>
                              </Group>
                            </Stack>
                          </Table.Td>

                          <Table.Td>
                            <Badge
                              variant="filled"
                              color="green"
                              size="md"
                              radius="xl"
                            >
                              Pending
                            </Badge>
                          </Table.Td>

                          <Table.Td>
                            <Tooltip label="Remove from upload list">
                              <ActionIcon
                                variant="light"
                                color="red"
                                size="md"
                                radius="xl"
                                onClick={() => handleDeleteNew(index)}
                              >
                                <IconX size={16} />
                              </ActionIcon>
                            </Tooltip>
                          </Table.Td>
                        </Table.Tr>
                      ))}
                    </Table.Tbody>
                  </Table>
                </Box>
              </ScrollArea>
            </>
          ) : (
            /* Empty State */
            <Box
              style={{
                padding: "80px 20px",
                textAlign: "center",
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
                borderRadius: "12px",
              }}
            >
              <Stack align="center" gap="md">
                <Box
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(102, 126, 234, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IconPhoto size={40} style={{ color: "#667eea" }} />
                </Box>
                <Stack gap={4}>
                  <Text fw={700} size="lg" c="dimmed">
                    No Images Yet
                  </Text>
                  <Text size="sm" c="dimmed">
                    Upload your first room image to get started
                  </Text>
                </Stack>
              </Stack>
            </Box>
          )}

          <Divider my="md" />

          {/* Upload Section */}
          <FileButton
            multiple
            accept="image/*"
            onChange={(selected) => setFiles((prev) => [...prev, ...selected])}
          >
            {(props) => (
              <Button
                {...props}
                variant="gradient"
                leftSection={<IconUpload size={18} />}
                fullWidth
                size="md"
                radius="md"
                style={{
                  transition: "transform 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {files.length > 0 ? "Add More Images" : "Upload Images"}
              </Button>
            )}
          </FileButton>

          {files.length > 0 && (
            <Box
              style={{
                marginTop: "12px",
                padding: "8px",
                backgroundColor: "#e8f5e9",
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              <Group justify="center" gap="xs">
                <IconPhoto size={14} style={{ color: "#4caf50" }} />
                <Text size="sm" fw={500} c="green">
                  {files.length} new image(s) ready to upload
                </Text>
              </Group>
            </Box>
          )}
        </Box>
      </Stack>
    </Paper>
  );
};

export default ImagesSection;