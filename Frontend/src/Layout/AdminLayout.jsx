import React from "react";

// ******************************** Mantline UI ********************************

import { AppShell, Box, Burger, Group, Space, Text } from "@mantine/core";

import { useDisclosure } from "@mantine/hooks";
// ******************************** Components ********************************

import GeneralHeader from "../Components/Header/GeneralHeader";
import GeneralNav from "../Components/Nav/GeneralNav";
import { AdminNavLinks } from "../Constants/AdminConstants";
import AdminAside from "../Components/Aside/AdminAside";

// ******************************** react-router-dom ********************************

import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [disabled] = useDisclosure();
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          height: "100%",
          width: 250,
          breakpoint: "sm",
          collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
        }}
        aside={{
          width: 250,
          breakpoint: "md",
          collapsed: { desktop: false, mobile: true },
        }}
        padding="md"
        disabled={disabled}
      >
        <GeneralHeader
          mobileOpened={mobileOpened}
          toggleMobile={toggleMobile}
          desktopOpened={desktopOpened}
          toggleDesktop={toggleDesktop}
        />{" "}
        <GeneralNav basePath={"/admin"} navList={AdminNavLinks} />
        <AppShell.Main>
          <Space h={"md"} />
          <Outlet />
        </AppShell.Main>
        <AdminAside />
      </AppShell>
    </>
  );
};

export default AdminLayout;
