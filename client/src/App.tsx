import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { themeSettings } from "./theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "@/scenes/navbar";
import Dashboard from "@/scenes/dashboard";
import Predictions from "@/scenes/predictions";
import ErrorBoundary from "@/components/ErrorBoundary";
import { DemoModeProvider } from "@/context/DemoModeContext";

function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <DemoModeProvider>
            <ErrorBoundary>
            <Box
              sx={{
                width: "100%",
                minHeight: "100vh",
                padding: "2rem 3rem 4rem 3rem",
                background: `
                  radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.05) 0%, transparent 50%),
                  radial-gradient(circle at 80% 80%, rgba(20, 184, 166, 0.05) 0%, transparent 50%),
                  linear-gradient(180deg, #0f172a 0%, #0a0f1e 100%)
                `,
                backgroundAttachment: "fixed",
              }}
            >
              <Navbar />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/predictions" element={<Predictions />} />
              </Routes>
            </Box>
            </ErrorBoundary>
          </DemoModeProvider>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
