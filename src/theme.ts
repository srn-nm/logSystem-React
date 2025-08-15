import { createTheme } from "@mui/material/styles";

const getTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: "#1976d2", 
      },
      secondary: {
        main: "#ff9800",
      },
      background: {
        default: mode === "light" ? "#f9f9f9" : "#121212",
        paper: mode === "light" ? "#fff" : "#1e1e1e",
      },
      text: {
        primary: mode === "light" ? "#000" : "#fff",
        secondary: mode === "light" ? "#555" : "#aaa",
      },
    },
    typography: {
      fontFamily: "'Vazirmatn', sans-serif",
      h3: {
        fontWeight: 700,
      },
      body1: {
        color: mode === "light" ? "#555" : "#aaa",
      },
    },
  });

export default getTheme;
