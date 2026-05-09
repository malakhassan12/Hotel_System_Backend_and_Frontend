import { Select, TextInput, Box, Text, Grid } from "@mantine/core";
import { IconFilter, IconSearch } from "@tabler/icons-react";
import { bookingStatus } from "../../Constants/ConstantsFromBack";

const SearchBySelect = ({
  statusValue,
  onStatusChange,
  searchValue,
  onSearchChange,
  showSearch = true,
}) => {
  return (
    <Box>
      <Text size="sm" fw={600} mb={8} c="dimmed">
        Search & Filter
      </Text>

      <Grid gutter="md">
        {showSearch && (
          <Grid.Col span={{ base: 12, sm: 6, md: 8 }}>
            <TextInput
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => onSearchChange(e.currentTarget.value)}
              leftSection={<IconSearch size={16} />}
              radius="md"
              size="md"
            />
          </Grid.Col>
        )}

        <Grid.Col span={{ base: 12, sm: 6, md: showSearch ? 4 : 12 }}>
          <Select
            placeholder="Filter by status"
            value={statusValue}
            onChange={onStatusChange}
            data={["all", ...bookingStatus]}
            clearable
            leftSection={<IconFilter size={16} />}
            radius="md"
            size="md"
          />
        </Grid.Col>
      </Grid>
    </Box>
  );
};

export default SearchBySelect;
