import { Tabs, Badge, Paper } from "@mantine/core";

const BookingsTabs = ({ tabs, activeTab, onTabChange }) => {
  return (
    <Paper
      shadow="none"
      radius="md"
      style={{
        background: "transparent",
      }}
    >
      <Tabs
        value={activeTab}
        onChange={onTabChange}
        variant="pills"
        radius="xl"
        styles={{
          root: {
            width: "100%",
          },
          list: {
            gap: "8px",
            flexWrap: "wrap",
            "@media (max-width: 768px)": {
              gap: "6px",
            },
          },
          tab: {
            padding: "10px 20px",
            fontWeight: 600,
            fontSize: "14px",
            transition: "all 0.2s ease",
            borderRadius: "40px",

            "&[data-active]": {
              boxShadow: "0 4px 12px rgba(25, 113, 194, 0.3)",

              "&:hover": {
                transform: "translateY(-1px)",
                boxShadow: "0 6px 16px rgba(25, 113, 194, 0.4)",
              },
            },

            "&:not([data-active])": {
              "&:hover": {
                transform: "translateY(-1px)",
              },
            },

            "@media (max-width: 768px)": {
              padding: "8px 14px",
              fontSize: "12px",
              flex: "1 0 auto",
              minWidth: "fit-content",
            },

            "@media (max-width: 480px)": {
              padding: "6px 12px",
              fontSize: "11px",
            },
          },
          tabLabel: {
            display: "flex",
            alignItems: "center",
            gap: "8px",
            whiteSpace: "nowrap",

            "@media (max-width: 480px)": {
              gap: "4px",
            },
          },
        }}
      >
        <Tabs.List>
          {tabs.map((tab) => (
            <Tabs.Tab
              key={tab.key}
              value={tab.key}
              rightSection={
                tab.count !== undefined && (
                  <Badge
                    size="sm"
                    radius="xl"
                    styles={{
                      root: {
                        fontWeight: 600,
                        minWidth: "28px",
                        height: "22px",
                        padding: "0 8px",
                        fontSize: "11px",
                      },
                    }}
                  >
                    {tab.count}
                  </Badge>
                )
              }
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span style={{ fontSize: "16px" }}>
                  {tab.label.split(" ")[0]}
                </span>
                <span style={{ color: "black" }}>
                  {tab.label.split(" ").slice(1).join(" ")}
                </span>
              </span>
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs>
    </Paper>
  );
};

export default BookingsTabs;
