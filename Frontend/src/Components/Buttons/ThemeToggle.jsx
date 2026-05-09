// ******************************** Mantine UI ********************************
import {
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
  Tooltip,
} from "@mantine/core";

// ******************************** Icons ********************************
import { IconSun, IconMoon } from "@tabler/icons-react";

const ThemeToggle = () => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const isLight = computedColorScheme === "light";

  return (
    <Tooltip
      label={isLight ? "Dark mode" : "Light mode"}
      position="bottom"
      offset={5}
      transitionProps={{ transition: "fade", duration: 200 }}
    >
      <ActionIcon
        onClick={() => setColorScheme(isLight ? "dark" : "light")}
        size="lg"
        radius="xl"
        aria-label="Toggle color scheme"
        variant="default"
        style={{
          transition: "all 0.2s ease",
          backgroundColor: isLight 
            ? "var(--mantine-color-gray-0)" 
            : "var(--mantine-color-dark-6)",
          border: "1px solid",
          borderColor: isLight 
            ? "var(--mantine-color-gray-2)" 
            : "var(--mantine-color-dark-4)",
          color: isLight 
            ? "var(--mantine-color-gray-7)" 
            : "var(--mantine-color-yellow-4)",
        }}
      >
        {isLight ? (
          <IconMoon size={18} stroke={1.5} />
        ) : (
          <IconSun size={18} stroke={1.5} />
        )}
      </ActionIcon>
    </Tooltip>
  );
};

export default ThemeToggle;