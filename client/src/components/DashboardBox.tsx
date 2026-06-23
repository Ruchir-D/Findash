import { Box } from "@mui/material";
import { styled } from "@mui/system";

const DashboardBox = styled(Box)(({ theme }) => ({
  backgroundColor: "rgba(30, 41, 59, 0.8)", // Semi-transparent background
  backdropFilter: "blur(20px)", // Glassmorphism effect
  borderRadius: "16px",
  border: "1px solid rgba(148, 163, 184, 0.1)",
  boxShadow: `
    0 4px 6px -1px rgba(0, 0, 0, 0.3),
    0 2px 4px -1px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 0 rgba(255, 255, 255, 0.05)
  `,
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  overflow: "visible",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  padding: "1rem", // Add default padding to all widgets

  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: `
      0 20px 25px -5px rgba(0, 0, 0, 0.3),
      0 10px 10px -5px rgba(0, 0, 0, 0.2),
      inset 0 1px 0 0 rgba(255, 255, 255, 0.1)
    `,
    border: `1px solid rgba(99, 102, 241, 0.3)`,
  },

  // Subtle gradient overlay
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "1px",
    background: "linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.4), transparent)",
  },
}));

export default DashboardBox;

