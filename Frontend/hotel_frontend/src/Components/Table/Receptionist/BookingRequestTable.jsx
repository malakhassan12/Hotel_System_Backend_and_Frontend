// ******************************** Mantline UI ********************************
import {
  Table,
  Text,
  Badge,
  ActionIcon,
  Group,
  Box,
  ScrollArea,
  Avatar,
  Loader,
  Center,
  Space,
  Pagination,
} from "@mantine/core";
// ******************************** Icons ********************************
import {
  IconEye,
  IconCheck,
  IconX,
  IconDotsVertical,
} from "@tabler/icons-react";
// ******************************** Components ********************************
import BookingModal from "../../Modal/Booking/BookingModal";
import useGetAllBookings from "../../../Hooks/Employee/useGetAllBookings";
import BookingRow from "./BookingTableComponents/BookingRow";
import UseGetUsersForBooking from "../../../Hooks/User/UseGetUsersForBooking";
import Loading from "../../Loader/Loading";
import Error from "../../Loader/Error";
import NoData from "../../Empty/NoData";
import { mapBookingData } from "../../../Functions/Booking/bookingFunctions";
import useSearchStore from "../../../Store/useSearchStore";
import SearchBySelect from "../../Search/SearchBySelect";
import { useState } from "react";

const BookingRequestTable = () => {
  const { data: res = [], isLoading, error } = useGetAllBookings();

  const safeData = Array.isArray(res) ? res : [];
  const { statusFilter, searchQuery, setStatusFilter, setSearchQuery } =
    useSearchStore();

  const data = safeData || [];
  const {
    data: finalData = [],
    isLoading: isLoadingFinal,
    error: errorFinal,
  } = UseGetUsersForBooking(data || []);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Change this value to adjust rows per page

  console.log("RES:", res);
  console.log("TYPE:", typeof res);

  console.log(finalData);

  // Transform API data to table rows
  const tableRows2 =
    Array.isArray(finalData) && finalData.length > 0
      ? finalData.map((booking) => mapBookingData(booking))
      : [];

  const tableRows = tableRows2.filter((item) => {
    const matchStatus =
      statusFilter === "all" ||
      item.status?.toLowerCase() === statusFilter?.toLowerCase();

    const matchSearch =
      searchQuery === "" ||
      item?.customer?.username
        ?.toLowerCase()
        .includes(searchQuery?.toLowerCase()) ||
      item?.id?.toString().includes(searchQuery) ||
      item?.room?.roomType?.toLowerCase().includes(searchQuery);

    return matchStatus && matchSearch;
  });

  // Pagination logic
  const totalPages = Math.ceil(tableRows.length / itemsPerPage);
  const paginatedRows = tableRows.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset to first page when filters change
  const handleFilterChange = (newStatus) => {
    setStatusFilter(newStatus);
    setCurrentPage(1);
  };

  const handleSearchChange = (newSearch) => {
    setSearchQuery(newSearch);
    setCurrentPage(1);
  };

  console.log(data, "Data");

  // Loading state
  if (isLoading || isLoadingFinal) {
    return <Loading />;
  }

  // Error state
  if (error || errorFinal) {
    return <Error name={"Booking"} error={error} />;
  }

  return (
    <Box>
      <SearchBySelect
        statusValue={statusFilter}
        onStatusChange={handleFilterChange}
        searchValue={searchQuery}
        onSearchChange={handleSearchChange}
        showSearch={true}
      />

      <Space h={"md"} />
      
      <ScrollArea>
        <Table striped highlightOnHover withTableBorder>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Booking ID</Table.Th>
              <Table.Th>Customer</Table.Th>
              <Table.Th>Room Number</Table.Th>
              <Table.Th>Check-In</Table.Th>
              <Table.Th>Check-Out</Table.Th>
              <Table.Th>Guests</Table.Th>
              <Table.Th>Total</Table.Th>
              <Table.Th>Payment</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {paginatedRows.length === 0 ? (
              <Table.Tr>
                <Table.Td colSpan={12}>
                  <Center>
                    <NoData name={"Booking"} />
                  </Center>
                </Table.Td>
              </Table.Tr>
            ) : (
              <>
                {paginatedRows.map((row) => (
                  <BookingRow key={row?.id} row={row} />
                ))}
              </>
            )}
          </Table.Tbody>
        </Table>
      </ScrollArea>

      {/* Pagination Section */}
      {totalPages > 1 && (
        <>
          <Space h="lg" />
          <Group justify="center" mt="md">
            <Pagination
              total={totalPages}
              value={currentPage}
              onChange={setCurrentPage}
              color="primary"
              radius="md"
              withEdges
              size="md"
            />
          </Group>
          
          {/* Show records info */}
          <Group justify="center" mt="xs">
            <Text size="xs" c="dimmed">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, tableRows.length)} of{" "}
              {tableRows.length} bookings
            </Text>
          </Group>
        </>
      )}

      {/* Show total count even without pagination */}
      {tableRows.length > 0 && totalPages <= 1 && (
        <Group justify="center" mt="md">
          <Text size="xs" c="dimmed">
            Total {tableRows.length} booking{tableRows.length !== 1 ? "s" : ""}
          </Text>
        </Group>
      )}
    </Box>
  );
};

export default BookingRequestTable;