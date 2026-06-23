export const tokens = {
    grey: {
      100: "#f8f9fa",
      200: "#e9ecef",
      300: "#dee2e6",
      400: "#ced4da",
      500: "#adb5bd",
      600: "#6c757d",
      700: "#495057",
      800: "#343a40",
      900: "#212529",
    },
    primary: {
      // Modern blue-purple gradient
      100: "#e0e7ff",
      200: "#c7d2fe",
      300: "#a5b4fc",
      400: "#818cf8",
      500: "#6366f1",
      600: "#4f46e5",
      700: "#4338ca",
      800: "#3730a3",
      900: "#312e81",
    },
    secondary: {
      // Vibrant cyan-blue
      100: "#ccfbf1",
      200: "#99f6e4",
      300: "#5eead4",
      400: "#2dd4bf",
      500: "#14b8a6",
      600: "#0d9488",
      700: "#0f766e",
      800: "#115e59",
      900: "#134e4a",
    },
    accent: {
      // Coral/Orange for highlights
      100: "#ffe4e6",
      200: "#fecdd3",
      300: "#fda4af",
      400: "#fb7185",
      500: "#f43f5e",
      600: "#e11d48",
      700: "#be123c",
      800: "#9f1239",
      900: "#881337",
    },
    tertiary: {
      // Purple for charts
      500: "#a78bfa",
      600: "#8b5cf6",
    },
    success: {
      500: "#10b981",
      600: "#059669",
    },
    warning: {
      500: "#f59e0b",
      600: "#d97706",
    },
    background: {
      default: "#0f172a", // Darker, richer navy
      light: "#1e293b", // Slate-800
      card: "#1e293b",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
  };
  
  // mui theme settings
  export const themeSettings = {
    palette: {
      primary: {
        ...tokens.primary,
        main: tokens.primary[500],
        light: tokens.primary[400],
        dark: tokens.primary[700],
      },
      secondary: {
        ...tokens.secondary,
        main: tokens.secondary[500],
        light: tokens.secondary[300],
        dark: tokens.secondary[700],
      },
      tertiary: {
        ...tokens.tertiary,
      },
      accent: {
        ...tokens.accent,
        main: tokens.accent[500],
      },
      success: {
        ...tokens.success,
        main: tokens.success[500],
      },
      warning: {
        ...tokens.warning,
        main: tokens.warning[500],
      },
      grey: {
        ...tokens.grey,
        main: tokens.grey[500],
      },
      background: {
        default: tokens.background.default,
        paper: tokens.background.card,
        light: tokens.background.light,
      },
      text: {
        primary: tokens.grey[100],
        secondary: tokens.grey[400],
      },
    },
    typography: {
      fontFamily: ["Inter", "Roboto", "sans-serif"].join(","),
      fontSize: 14,
      h1: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 40,
        fontWeight: 700,
        letterSpacing: "-0.02em",
      },
      h2: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 32,
        fontWeight: 700,
        letterSpacing: "-0.01em",
      },
      h3: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 24,
        fontWeight: 600,
        color: tokens.grey[100],
      },
      h4: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 18,
        fontWeight: 600,
        color: tokens.grey[200],
      },
      h5: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 14,
        fontWeight: 500,
        color: tokens.grey[400],
      },
      h6: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 12,
        fontWeight: 400,
        color: tokens.grey[500],
      },
      body1: {
        fontSize: 14,
        color: tokens.grey[300],
      },
      body2: {
        fontSize: 12,
        color: tokens.grey[400],
      },
    },
    shape: {
      borderRadius: 12,
    },
    shadows: [
      "none",
      "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
      "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
      "0 25px 50px -12px rgb(0 0 0 / 0.25)",
      ...Array(19).fill("none"),
    ] as any,
  };