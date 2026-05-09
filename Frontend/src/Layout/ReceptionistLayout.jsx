// ******************************** Mantline UI ********************************

import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
// ******************************** Compoenets ********************************

import GeneralHeader from "../Components/Header/GeneralHeader";
import GeneralNav from "../Components/Nav/GeneralNav";
// ******************************** react-router-dom ********************************

import { Outlet } from "react-router-dom";

import { ReceptionistNavLinks } from "../Constants/ReceptionisConstants";
import useAuthStore from "../Store/authStore";
const ReceptionistLayout = () => {
  const [disabled] = useDisclosure();
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  const { token, role, user } = useAuthStore();
  console.log(token, role, user);
  return (
    <AppShell
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      header={{ height: 60 }}
      padding="md"
      disabled={disabled}
    >
      <GeneralHeader
        mobileOpened={mobileOpened}
        toggleMobile={toggleMobile}
        desktopOpened={desktopOpened}
        toggleDesktop={toggleDesktop}
      />

      <GeneralNav navList={ReceptionistNavLinks} />
      <AppShell.Main pt="var(--app-shell-header-height)">
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default ReceptionistLayout;
