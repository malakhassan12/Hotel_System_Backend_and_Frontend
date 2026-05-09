// ******************************** Mantline UI ********************************
import {
  Card,
  Text,
  Group,
  TextInput,
  Select,
  Button,
  Stack,
  Divider,
  Badge,
} from "@mantine/core";
// ******************************** Icons ********************************

import {
  IconSearch,
  IconFilter,
  IconAdjustments,
  IconX,
} from "@tabler/icons-react";
import useSearchRoomStore from "../../Store/useSearchRoomStore";

const Search = () => {
  const {
    searchQuery,
    setSearchQuery,
    availability,
    setAvailability,
    clearFilters,
  } = useSearchRoomStore();

  return (
    <Card style={{ transition: "all 0.3s ease" }}>
      <Stack gap="md">
        {/* Search Input */}
        <TextInput
          placeholder="Search by name or description or room number..."
          leftSection={<IconSearch size={16} />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.currentTarget.value)}
          radius="md"
          size="md"
        />

        <Group grow>
          <Select
            label="Availability"
            value={availability}
            onChange={setAvailability}
            data={[
              { value: "all", label: "All Rooms" },
              { value: "AVAILABLE", label: "Available" },
              { value: "Booked", label: "Booked" },
              { value: "MAINTENANCE", label: "Maintenance" },
            ]}
          />
        </Group>

        <Group justify="space-between">
          <Button
            variant="subtle"
            color="gray"
            onClick={clearFilters}
            leftSection={<IconX size={14} />}
          >
            Clear Filters
          </Button>
        </Group>
      </Stack>
    </Card>
  );
};

export default Search;
