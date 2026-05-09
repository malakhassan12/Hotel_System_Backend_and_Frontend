import { TextInput, Select, Group, Paper } from "@mantine/core";
import { IconSearch, IconFilter } from "@tabler/icons-react";

const UserFilters = ({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
}) => {
  return (
    <Paper withBorder p="md" radius="md">
      <Group gap="md" align="flex-end">
        <TextInput
          label="Search Employee"
          placeholder="Search by username or email..."
          leftSection={<IconSearch size={16} />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 2 }}
          size="md"
        />

        <Select
          label="Status"
          placeholder="Filter by status"
          value={statusFilter}
          onChange={setStatusFilter}
          leftSection={<IconFilter size={16} />}
          data={[
            { value: "all", label: "All Status" },
            { value: "pending", label: "Pending Approval" },
            { value: "approved", label: "Approved" },
          ]}
          style={{ flex: 1 }}
          size="md"
        />
      </Group>
    </Paper>
  );
};

export default UserFilters;