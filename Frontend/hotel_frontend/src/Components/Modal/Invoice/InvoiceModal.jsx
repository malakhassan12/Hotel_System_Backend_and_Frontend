// ******************************** Mantline UI ********************************
import { Modal, Paper, Text, Stack, Divider, Group, Badge, Button, Grid, Table } from '@mantine/core';
// ******************************** Icons ********************************

import { IconDownload, IconPrinter, IconMail, IconReceipt } from '@tabler/icons-react';

const InvoiceModal = ({ opened, close, invoice }) => {
  const defaultInvoice = {
    invoiceNumber: "INV-2024-001",
    bookingId: "B004",
    customerName: "John Doe",
    checkIn: "2026-04-06",
    checkOut: "2026-04-13",
    nights: 7,
    roomCharges: {
      pricePerNight: 2545,
      total: 17816.26,
    },
    additionalServices: [
      { name: "Airport Transfer", amount: 80.00 },
      { name: "Extra Bed", amount: 40.00 },
    ],
    totalAmount: 2660.00,
    tax: 0,
    paidAmount: 2660.00,
    paymentStatus: "Paid",
    invoiceDate: "2026-04-13",
  };

  const data = invoice || defaultInvoice;

  const handleDownload = () => {
    console.log("Downloading invoice...");
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSendEmail = () => {
    console.log("Sending invoice email...");
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={
        <Group gap="sm">
          <IconReceipt size={24} color="var(--mantine-color-primary-6)" />
          <Text size="lg" fw={700}>Invoice Breakdown</Text>
        </Group>
      }
      size="lg"
      radius="md"
      centered
      transitionProps={{ transition: "fade", duration: 300 }}
    >
      <Paper p="md" radius="md" withBorder>
        <Stack gap="md">
          {/* Header */}
          <Group justify="space-between">
            <div>
              <Text size="xs" c="dimmed">Invoice Number</Text>
              <Text fw={700}>{data.invoiceNumber}</Text>
            </div>
            <div>
              <Text size="xs" c="dimmed">Invoice Date</Text>
              <Text>{data.invoiceDate}</Text>
            </div>
            <Badge size="lg" radius="xl" color={data.paymentStatus === "Paid" ? "green" : "orange"}>
              {data.paymentStatus}
            </Badge>
          </Group>

          <Divider />

          {/* Customer Info */}
          <Grid>
            <Grid.Col span={6}>
              <Text size="xs" c="dimmed">Customer Name</Text>
              <Text fw={500}>{data.customerName}</Text>
            </Grid.Col>
            <Grid.Col span={6}>
              <Text size="xs" c="dimmed">Booking ID</Text>
              <Text>{data.bookingId}</Text>
            </Grid.Col>
            <Grid.Col span={6}>
              <Text size="xs" c="dimmed">Check-In</Text>
              <Text>{data.checkIn}</Text>
            </Grid.Col>
            <Grid.Col span={6}>
              <Text size="xs" c="dimmed">Check-Out</Text>
              <Text>{data.checkOut}</Text>
            </Grid.Col>
          </Grid>

          <Divider />

          {/* Room Charges */}
          <div>
            <Text size="sm" fw={600} mb="xs">Room Charges</Text>
            <Group justify="space-between">
              <Text size="sm" c="dimmed">
                {data.nights} nights × ${data.roomCharges.pricePerNight}
              </Text>
              <Text size="sm" fw={500}>${data.roomCharges.total.toLocaleString()}</Text>
            </Group>
          </div>

          {/* Additional Services */}
          {data.additionalServices.length > 0 && (
            <div>
              <Text size="sm" fw={600} mb="xs">Additional Services</Text>
              <Stack gap="xs">
                {data.additionalServices.map((service, i) => (
                  <Group key={i} justify="space-between">
                    <Text size="sm" c="dimmed">{service.name}</Text>
                    <Text size="sm">${service.amount.toFixed(2)}</Text>
                  </Group>
                ))}
              </Stack>
            </div>
          )}

          <Divider />

          {/* Total */}
          <Group justify="space-between">
            <Text size="lg" fw={700}>Total Amount</Text>
            <Text size="xl" fw={700} c="primary">${data.totalAmount.toFixed(2)}</Text>
          </Group>

          {data.tax > 0 && (
            <Group justify="space-between">
              <Text size="sm" c="dimmed">Tax (10%)</Text>
              <Text size="sm">${data.tax.toFixed(2)}</Text>
            </Group>
          )}

          {data.paidAmount && (
            <Group justify="space-between">
              <Text size="sm" fw={500}>Paid Amount</Text>
              <Text size="sm" fw={500} c="green">${data.paidAmount.toFixed(2)}</Text>
            </Group>
          )}

          <Divider />

          {/* Actions */}
          <Group justify="space-between">
            <Button variant="light" color="gray" leftSection={<IconDownload size={16} />} onClick={handleDownload}>
              Download PDF
            </Button>
            <Button variant="light" color="gray" leftSection={<IconPrinter size={16} />} onClick={handlePrint}>
              Print
            </Button>
            <Button variant="filled" color="primary" leftSection={<IconMail size={16} />} onClick={handleSendEmail}>
              Send to Customer
            </Button>
          </Group>
        </Stack>
      </Paper>
    </Modal>
  );
};

export default InvoiceModal;