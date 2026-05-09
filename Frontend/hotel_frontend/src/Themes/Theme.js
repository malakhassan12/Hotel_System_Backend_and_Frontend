import {
  createTheme,
  Loader,
  localStorageColorSchemeManager,
  Title,
} from "@mantine/core";
import { RingLoader } from "./RingLoader";

const Theme = createTheme({
  colors: {
    // 🌟 YELLOW (Primary)
    primary: [
      "#FFFDE7",
      "#FFF9C4",
      "#FFF59D",
      "#FFF176",
      "#FFEE58",
      "#FFEB3B",
      "#FDD835",
      "#FBC02D",
      "#F9A825",
      "#F57F17",
    ],

    // 💖 PINK (Accent)
    pink: [
      "#FCE4EC",
      "#F8BBD0",
      "#F48FB1",
      "#F06292",
      "#EC407A",
      "#E91E63",
      "#D81B60",
      "#C2185B",
      "#AD1457",
      "#880E4F",
    ],

    // 💜 Purple (للدارك مود - لمسة أنيقة)
    purple: [
      "#faf5ff",
      "#f3e8ff",
      "#e9d5ff",
      "#d8b4fe",
      "#c084fc",
      "#a855f7",
      "#9333ea",
      "#7e22ce",
      "#6b21a8",
      "#581c87",
    ],

    // 🌙 Dark Mode Backgrounds (متناسق مع الأصفر والوردي)
    darkBg: [
      "#2d2b2a", // 0
      "#262423", // 1
      "#201e1d", // 2
      "#1c1a19", // 3
      "#181615", // 4
      "#141211", // 5
      "#100e0d", // 6
      "#0c0a09", // 7
      "#080706", // 8
      "#040302", // 9
    ],

    // 🌙 Dark Mode Cards & Surfaces
    darkSurface: [
      "#3d3a38", // 0
      "#363331", // 1
      "#2f2c2a", // 2
      "#282523", // 3
      "#221f1d", // 4
      "#1c1917", // 5
      "#161312", // 6
      "#100e0d", // 7
      "#0a0908", // 8
      "#050404", // 9
    ],

    // 🌙 Dark Mode Borders
    darkBorder: [
      "#4a4644", // 0
      "#423e3c", // 1
      "#3a3634", // 2
      "#322e2c", // 3
      "#2a2624", // 4
      "#221f1d", // 5
      "#1a1716", // 6
      "#12100f", // 7
      "#0a0908", // 8
      "#050403", // 9
    ],

    // 📝 Text Colors (Light & Dark modes)
    text: [
      "#fafaf9", // 0 - White for dark mode
      "#e7e5e4", // 1
      "#d6d3d1", // 2
      "#a8a29e", // 3
      "#78716c", // 4
      "#57534e", // 5
      "#44403c", // 6
      "#292524", // 7
      "#1c1917", // 8
      "#0c0a09", // 9 - Black for light mode
    ],

    // 🤍 Light Mode Background
    lightBg: [
      "#FFFDF9", // 0 - Main background
      "#FFFBF5", // 1
      "#FFF9F0", // 2
      "#FFF7EB", // 3
      "#FFF5E6", // 4
      "#FFF3E1", // 5
      "#E6D9CA", // 6
      "#CCC0B2", // 7
      "#B3A79A", // 8
      "#998F83", // 9
    ],

    // 🎨 Neutral Grays (للنصوص والحواف)
    gray: [
      "#fafaf9",
      "#f5f5f4",
      "#e7e5e4",
      "#d6d3d1",
      "#a8a29e",
      "#78716c",
      "#57534e",
      "#44403c",
      "#292524",
      "#1c1917",
    ],

    // 🟢 Success
    success: [
      "#f0fdf4",
      "#dcfce7",
      "#bbf7d0",
      "#86efac",
      "#4ade80",
      "#22c55e",
      "#16a34a",
      "#15803d",
      "#166534",
      "#14532d",
    ],

    // 🔴 Error
    error: [
      "#fef2f2",
      "#fee2e2",
      "#fecaca",
      "#fca5a5",
      "#f87171",
      "#ef4444",
      "#dc2626",
      "#b91c1c",
      "#991b1b",
      "#7f1d1d",
    ],

    // 🔵 Info
    info: [
      "#eff6ff",
      "#dbeafe",
      "#bfdbfe",
      "#93c5fd",
      "#60a5fa",
      "#3b82f6",
      "#2563eb",
      "#1d4ed8",
      "#1e40af",
      "#1e3a8a",
    ],
  },

  // الألوان الأساسية
  primaryColor: "primary",
  primaryShade: { light: 6, dark: 4 }, // في الدارك shade 4 عشان يبان كويس

  secondaryColor: "pink",
  secondaryShade: { light: 5, dark: 3 },

  // الظلال
  shadows: {
    xs: "0 1px 2px rgba(0,0,0,0.05)",
    sm: "0 2px 4px rgba(0,0,0,0.08)",
    md: "0 6px 12px rgba(0,0,0,0.12)",
    lg: "0 12px 24px rgba(0,0,0,0.16)",
    xl: "0 20px 40px rgba(0,0,0,0.2)",
    "2xl": "0 30px 60px rgba(0,0,0,0.25)",
  },

  // العناوين
  headings: {
    fontFamily: "Poppins, 'Segoe UI', Roboto, sans-serif",
    fontWeight: "600",
    sizes: {
      h1: { fontSize: "clamp(2rem, 5vw, 3rem)", lineHeight: "1.2" },
      h2: { fontSize: "clamp(1.5rem, 4vw, 2.25rem)", lineHeight: "1.3" },
      h3: { fontSize: "clamp(1.25rem, 3vw, 1.875rem)", lineHeight: "1.4" },
      h4: { fontSize: "clamp(1.125rem, 2.5vw, 1.5rem)", lineHeight: "1.4" },
      h5: { fontSize: "clamp(1rem, 2vw, 1.25rem)", lineHeight: "1.5" },
      h6: { fontSize: "clamp(0.875rem, 1.5vw, 1rem)", lineHeight: "1.5" },
    },
  },

  fontFamily: "Inter, 'Segoe UI', Roboto, sans-serif",
  fontFamilyMonospace: "Monaco, 'Cascadia Code', monospace",

  fontSizes: {
    xs: "clamp(0.75rem, 1.5vw, 0.8125rem)",
    sm: "clamp(0.875rem, 2vw, 0.9375rem)",
    md: "clamp(1rem, 2.5vw, 1.0625rem)",
    lg: "clamp(1.125rem, 3vw, 1.1875rem)",
    xl: "clamp(1.25rem, 3.5vw, 1.375rem)",
  },

  fontWeights: {
    thin: 100,
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },

  lineHeights: {
    xs: "1.4",
    sm: "1.45",
    md: "1.55",
    lg: "1.6",
    xl: "1.65",
  },

  radius: {
    xs: "0.25rem",
    sm: "0.375rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    "2xl": "1.5rem",
  },

  spacing: {
    xs: "0.5rem",
    sm: "0.75rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "2.5rem",
    "3xl": "3rem",
  },

  breakpoints: {
    xs: "30em",
    sm: "48em",
    md: "64em",
    lg: "74em",
    xl: "90em",
  },

  autoContrast: true,
  luminanceThreshold: 0.45,

  defaultGradient: {
    from: "primary",
    to: "pink",
    deg: 135,
  },

  defaultRadius: "md",

  activeClassName: "active",
  focusClassName: "focus",

  components: {
     Loader: Loader.extend({
      defaultProps: {
        loaders: { ...Loader.defaultLoaders, ring: RingLoader },
        type: 'ring',
      },
    }),
    Button: {
      defaultProps: {
        radius: "md",
      },
      styles: (theme) => ({
        root: {
          fontWeight: 600,
          transition: "all 0.2s ease",
          "&:hover": {
            transform: "translateY(-1px)",
            boxShadow: theme.shadows.md,
          },
        },
        filled: {
          backgroundColor: `light-dark(${theme.colors.primary[6]}, ${theme.colors.primary[5]})`,
          color: `light-dark(${theme.colors.text[9]}, ${theme.colors.text[0]})`,
          "&:hover": {
            backgroundColor: `light-dark(${theme.colors.primary[7]}, ${theme.colors.primary[4]})`,
          },
        },
        light: {
          backgroundColor: `light-dark(${theme.colors.primary[1]}, ${theme.colors.darkSurface[5]})`,
          color: `light-dark(${theme.colors.primary[7]}, ${theme.colors.primary[3]})`,
          "&:hover": {
            backgroundColor: `light-dark(${theme.colors.primary[2]}, ${theme.colors.darkSurface[4]})`,
          },
        },
        outline: {
          borderColor: `light-dark(${theme.colors.pink[6]}, ${theme.colors.pink[5]})`,
          color: `light-dark(${theme.colors.pink[6]}, ${theme.colors.pink[3]})`,
          "&:hover": {
            backgroundColor: `light-dark(${theme.colors.primary[1]}, ${theme.colors.pink[6]})`,
          },
        },
        subtle: {
          color: `light-dark(${theme.colors.primary[6]}, ${theme.colors.primary[3]})`,
          "&:hover": {
            backgroundColor: `light-dark(${theme.colors.primary[1]}, ${theme.colors.darkSurface[6]})`,
          },
        },
      }),
    },

    Title: {
      defaultProps: {
        radius: "lg",
        padding: "lg",
      },
      styles: (theme) => ({
        root: {
          color: `light-dark(${theme.colors.pink[3]}, ${theme.colors.pink[2]})`,
        },
      }),
    },
    Text: {
      defaultProps: {
        radius: "lg",
        padding: "lg",
      },
      styles: (theme) => ({
        root: {
          color: `light-dark(${theme.colors.pink[3]}, ${theme.colors.pink[2]})`,
        },
      }),
    },

    Card: {
      defaultProps: {
        radius: "lg",
        padding: "lg",
        shadow: "sm",
        withBorder: true,
      },
      styles: (theme) => ({
        root: {
          height: "100%",
          cursor: "pointer",

          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",

          backgroundColor: `light-dark(${theme.colors.lightBg[0]}, ${theme.colors.darkSurface[6]})`,
          borderColor: `light-dark(${theme.colors.gray[2]}, ${theme.colors.darkBorder[4]})`,
        },
      }),
    },

    Modal: {
      defaultProps: {
        radius: "lg",
        padding: "xl",
      },
      styles: (theme) => ({
        header: {
          backgroundColor: `light-dark(${theme.colors.lightBg[0]}, ${theme.colors.darkSurface[6]})`,
        },
        body: {
          backgroundColor: `light-dark(${theme.colors.lightBg[0]}, ${theme.colors.darkSurface[6]})`,
        },
        title: {
          color: `light-dark(${theme.colors.primary[7]}, ${theme.colors.primary[3]})`,
          fontWeight: 600,
        },
      }),
    },

    Input: {
      defaultProps: {
        radius: "md",
      },
      styles: (theme) => ({
        input: {
          transition: "all 0.2s ease",
          backgroundColor: `light-dark(${theme.colors.white}, ${theme.colors.darkSurface[6]})`,
          borderColor: `light-dark(${theme.colors.gray[3]}, ${theme.colors.darkBorder[4]})`,
          color: `light-dark(${theme.colors.text[9]}, ${theme.colors.text[1]})`,
          "&:focus": {
            borderColor: `light-dark(${theme.colors.primary[6]}, ${theme.colors.primary[4]})`,
            boxShadow: `0 0 0 2px ${theme.colors.primary[2]}`,
          },
        },
        label: {
          color: `light-dark(${theme.colors.text[7]}, ${theme.colors.text[2]})`,
          fontWeight: 500,
        },
      }),
    },

    Select: {
      defaultProps: {
        radius: "md",
      },
      styles: (theme) => ({
        input: {
          backgroundColor: `light-dark(${theme.colors.white}, ${theme.colors.darkSurface[6]})`,
          borderColor: `light-dark(${theme.colors.gray[3]}, ${theme.colors.darkBorder[4]})`,
          color: `light-dark(${theme.colors.text[9]}, ${theme.colors.text[1]})`,
        },
        dropdown: {
          backgroundColor: `light-dark(${theme.colors.white}, ${theme.colors.darkSurface[7]})`,
          borderColor: `light-dark(${theme.colors.gray[2]}, ${theme.colors.darkBorder[5]})`,
        },
        item: {
          color: `light-dark(${theme.colors.text[9]}, ${theme.colors.text[1]})`,
          "&[data-hovered]": {
            backgroundColor: `light-dark(${theme.colors.primary[1]}, ${theme.colors.darkSurface[5]})`,
          },
          "&[data-selected]": {
            backgroundColor: `light-dark(${theme.colors.primary[6]}, ${theme.colors.primary[5]})`,
            color: `light-dark(${theme.colors.text[9]}, ${theme.colors.text[0]})`,
          },
        },
      }),
    },

    Tabs: {
      defaultProps: {
        color: "primary",
      },
      styles: (theme) => ({
        tab: {
          color: `light-dark(${theme.colors.text[7]}, ${theme.colors.text[2]})`,
          "&[data-active]": {
            color: `light-dark(${theme.colors.primary[6]}, ${theme.colors.primary[3]})`,
            borderColor: `light-dark(${theme.colors.primary[6]}, ${theme.colors.primary[4]})`,
          },
          "&:hover": {
            backgroundColor: `light-dark(${theme.colors.primary[0]}, ${theme.colors.darkSurface[6]})`,
          },
        },
        panel: {
          backgroundColor: `light-dark(${theme.colors.lightBg[0]}, ${theme.colors.darkSurface[6]})`,
        },
      }),
    },

    Badge: {
      defaultProps: {
        radius: "xl",
      },
      styles: (theme) => ({
        root: {
          backgroundColor: `light-dark(${theme.colors.primary[1]}, ${theme.colors.darkSurface[5]})`,
          color: `light-dark(${theme.colors.primary[7]}, ${theme.colors.primary[3]})`,
        },
      }),
    },

    Notification: {
      defaultProps: {
        radius: "md",
      },
      styles: (theme) => ({
        root: {
          backgroundColor: `light-dark(${theme.colors.lightBg[0]}, ${theme.colors.darkSurface[6]})`,
          borderColor: `light-dark(${theme.colors.gray[2]}, ${theme.colors.darkBorder[5]})`,
        },
      }),
    },
    NavLink: {
      styles: (theme) => ({
        root: {
          transition: "all 0.3s ease",
          borderRadius: "8px",

          "&:hover": {
            backgroundColor: theme.colors.primary[0],
          },

          // "&[data-active]": {
          //   backgroundColor: theme.colors.primary[2],
          //   color: theme.colors.primary[7],
          //   transform: "translateX(5px)",
          // },
        },
      }),
    },
  },

  other: {
    secondaryColor: "pink",
    secondaryShade: { light: 5, dark: 3 },

    hotelTheme: {
      luxury: "#E91E63",
      welcome: "#FFFDE7",
      executive: "#AD1457",
      standard: "#FFFDF9",
      premium: "#FBC02D",
      spa: "#22c55e",
      restaurant: "#f59e0b",
    },

    gradients: {
      hero: "linear-gradient(135deg, #FFEB3B 0%, #E91E63 100%)",
      card: "linear-gradient(135deg, #FFFDE7 0%, #FCE4EC 100%)",
      footer: "linear-gradient(135deg, #1c1917 0%, #0c0a09 100%)",
    },
  },
});

const colorSchemeManager = localStorageColorSchemeManager({
  key: "my-app-color-scheme",
});

const resolver = (theme) => {
  const getColor = (colorName, index, fallback) => {
    try {
      return theme.colors[colorName]?.[index] || fallback;
    } catch {
      return fallback;
    }
  };

  return {
    variables: {},
    light: {
      "--mantine-color-body": getColor("lightBg", 0, "#FFFDF9"),
      "--mantine-color-text": getColor("text", 9, "#0c0a09"),
    },
    dark: {
      "--mantine-color-body": getColor("darkBg", 7, "#0c0a09"),
      "--mantine-color-dark-filled": getColor("darkSurface", 6, "#161312"),
      "--mantine-color-text": getColor("text", 1, "#e7e5e4"),
      "--mantine-color-dark-outline": getColor("darkBorder", 5, "#221f1d"),
    },
  };
};

export { Theme, colorSchemeManager, resolver };
