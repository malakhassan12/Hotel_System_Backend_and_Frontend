// ******************************** Mantine UI ********************************
import { AppShell, Divider, NavLink, ScrollArea, Space } from "@mantine/core";
// ******************************** React-router-dom ********************************

import { useNavigate, useLocation } from "react-router-dom";
// ******************************** Utils ********************************

import { GetReceptionistNavIcons } from "../../Utils/Receptionist/GetReceptionistNavIcons";
import Screens from "../../Utils/Screens/Screens";

// ******************************** Components ********************************

import Logo from "../Logo/Logo";

const GeneralNav = ({ basePath = "/receptionist", navList }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { isMobile } = Screens();

  const renderNavLinks = (links) => {
    return links.map((link) => {
      if (link.children && link.children.length > 0) {
        return (
          <NavLink
            mb={"1rem"}
            key={link.id}
            label={link.label}
            leftSection={
              link.icon ? GetReceptionistNavIcons(link.icon) : undefined
            }
            defaultOpened={link.children.some((child) => {
              if (child.children) {
                return child.children.some(
                  (grandChild) => location.pathname === grandChild.path,
                );
              }
              return location.pathname === child.path;
            })}
            childrenOffset={28}
          >
            {renderNavLinks(link.children)}
          </NavLink>
        );
      }

      const fullPath = link.path === "" ? basePath : `${basePath}/${link.path}`;

const isActive = location.pathname === fullPath;
      return (
        <NavLink
          key={link.id}
          label={link.label}
          leftSection={
            link.icon ? GetReceptionistNavIcons(link.icon) : undefined
          }
          mb={"1rem"}
          active={isActive}
          onClick={() => navigate(link.path)}
          childrenOffset={28}
        />
      );
    });
  };

  return (
    <AppShell.Navbar
      p="md"
      style={{
        display: "flex",
        flexDirection: "column",
        // height: "100%",
      }}
    >
      <AppShell.Section p="md">
        {" "}
        {isMobile && (
          <>
            <Logo />
            <Space h="md" />
            <Divider />
          </>
        )}
      </AppShell.Section>
      <AppShell.Section grow my="md" component={ScrollArea} px="md">
        {renderNavLinks(navList)}
      </AppShell.Section>
    </AppShell.Navbar>
  );
};

export default GeneralNav;