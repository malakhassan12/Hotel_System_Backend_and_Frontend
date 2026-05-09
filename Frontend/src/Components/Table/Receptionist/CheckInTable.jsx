// ******************************** Mantline UI ********************************
import {
  Table,
  Text,
  Badge,
  Group,
  Avatar,
  ActionIcon,
  ScrollArea,
  Box,
  Loader,
  Center,
  Alert,
  Pagination,
  Stack,
  Paper,
  Title,
  Space,
} from "@mantine/core";

// ******************************** Icons ********************************
import {
  IconEye,
  IconCheck,
  IconX,
  IconReceipt,
  IconDoorEnter,
  IconAlertCircle,
  IconRefresh,
  IconCalendar,
  IconUsers,
  IconPhone,
  IconListCheck,
} from "@tabler/icons-react";

// ******************************** Components ********************************
import CustomerModal from "../../Modal/Customer/CustomerModal";
import RoomModal from "../../Modal/Room/RoomModal";
import BookingModal from "../../Modal/Booking/BookingModal";
import CheckinRow from "./CheckinTableComponents/CheckinRow";
import useGetAllBookings from "../../../Hooks/Employee/useGetAllBookings";
import { useState } from "react";
import NoData from "../../Empty/NoData";
import Loading from "../../Loader/Loading";
import { mapBookingData } from "../../../Functions/Booking/bookingFunctions";
import Error from "../../Loader/Error";
import UseGetUsersForBooking from "../../../Hooks/User/UseGetUsersForBooking";
import SearchBySelect from "../../Search/SearchBySelect";
import useSearchStore from "../../../Store/useSearchStore";

const CheckInTable = () => {
  const { data: res = [], isLoading, error } = useGetAllBookings();
  const { statusFilter, searchQuery, setStatusFilter, setSearchQuery } =
    useSearchStore();

  const safeData = Array.isArray(res) ? res : [];

  const data = safeData || [];
  const {
    data: bookings = [],
    isLoading: isLoadingFinal,
    error: errorFinal,
  } = UseGetUsersForBooking(data || []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  console.log("API Bookings Data:", bookings);

  // Transform API data to table rows
  const checkins =
    Array.isArray(bookings) && bookings.length > 0
      ? bookings.map((booking) => mapBookingData(booking))
      : [];

  // Filter only check-in ready bookings (pending or confirmed)
  const checkinsReady = checkins.filter((item) => {
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

  // Pagination
  const totalPages = Math.ceil(checkinsReady.length / itemsPerPage);
  const paginatedCheckins = checkinsReady.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const rows = paginatedCheckins.map((checkin) => (
    <CheckinRow key={checkin.id} checkin={checkin} />
  ));

  if (isLoading || isLoadingFinal) {
    return <Loading name={"Check"} />;
  }

  if (error || errorFinal) {
    return <Error name={"Check"} error={error} />;
  }

  return (
    <Box>
      <SearchBySelect
        statusValue={statusFilter}
        onStatusChange={setStatusFilter}
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        showSearch={true}
      />

      <Space h={"md"} />
      <Paper withBorder radius="md" overflow="hidden">
        <ScrollArea>
          <Table
            striped
            highlightOnHover
            withTableBorder
            withColumnBorders
            horizontalSpacing="md"
            verticalSpacing="sm"
          >
            <Table.Thead>
              <Table.Tr>
                <Table.Th style={{ fontWeight: 600, fontSize: "13px" }}>
                  Booking ID
                </Table.Th>
                <Table.Th style={{ fontWeight: 600, fontSize: "13px" }}>
                  Customer
                </Table.Th>
                <Table.Th style={{ fontWeight: 600, fontSize: "13px" }}>
                  Room
                </Table.Th>
                <Table.Th style={{ fontWeight: 600, fontSize: "13px" }}>
                  Dates
                </Table.Th>
                <Table.Th
                  ta="center"
                  style={{ fontWeight: 600, fontSize: "13px" }}
                >
                  Guests
                </Table.Th>
                <Table.Th style={{ fontWeight: 600, fontSize: "13px" }}>
                  Payment
                </Table.Th>
                <Table.Th style={{ fontWeight: 600, fontSize: "13px" }}>
                  Status
                </Table.Th>
                <Table.Th
                  ta="center"
                  style={{ fontWeight: 600, fontSize: "13px" }}
                >
                  Actions
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {checkinsReady.length === 0 ? (
                <Table.Tr>
                  <Table.Td colSpan={8}>
                    <Center>
                      <NoData name={"Check"} />
                    </Center>
                  </Table.Td>
                </Table.Tr>
              ) : (
                <>{rows}</>
              )}
            </Table.Tbody>
          </Table>
        </ScrollArea>
      </Paper>

      {totalPages > 1 && (
        <Group justify="center" mt="xl">
          <Pagination
            total={totalPages}
            value={currentPage}
            onChange={setCurrentPage}
            color="primary"
            radius="md"
            withEdges
          />
        </Group>
      )}
    </Box>
  );
};

export default CheckInTable;
