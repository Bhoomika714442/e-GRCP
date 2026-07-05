import { createTheme } from "@mui/material/styles";

const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,

      primary: {
        main: "#1976d2",
      },

      secondary: {
        main: "#9c27b0",
      },

      background: {
        default:
          mode === "dark"
            ? "#202124"
            : "#f5f7fa",

        paper:
          mode === "dark"
            ? "#2d2f31"
            : "#ffffff",
      },

      text: {
        primary:
          mode === "dark"
            ? "#ffffff"
            : "#222222",

        secondary:
          mode === "dark"
            ? "#bdbdbd"
            : "#666666",
      },

      divider:
        mode === "dark"
          ? "#3c4043"
          : "#e0e0e0",
    },

    typography: {
      fontFamily: "Roboto, sans-serif",
    },

    shape: {
      borderRadius: 12,
    },

    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            transition:
              "background-color .3s,color .3s",
          },

          "*": {
            transition:
              "background-color .3s,color .3s,border-color .3s",
          },
        },
      },

      MuiPaper: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor:
              theme.palette.background.paper,
            color:
              theme.palette.text.primary,
          }),
        },
      },

      MuiCard: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor:
              theme.palette.background.paper,
            color:
              theme.palette.text.primary,
          }),
        },
      },

      MuiTableCell: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderColor:
              theme.palette.divider,
            color:
              theme.palette.text.primary,
          }),

          head: ({ theme }) => ({
            backgroundColor:
              theme.palette.mode === "dark"
                ? "#2d2f31"
                : "#f5f5f5",

            color:
              theme.palette.text.primary,

            fontWeight: 700,
          }),
        },
      },

      MuiAppBar: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor:
              theme.palette.mode === "dark"
                ? "#2d2f31"
                : "#ffffff",

            color:
              theme.palette.text.primary,
          }),
        },
      },

      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: "#1f2937",
            color: "#ffffff",
          },
        },
      },
    },
  });

export default getTheme;