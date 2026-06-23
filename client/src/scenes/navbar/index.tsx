import { Link, useLocation } from "react-router-dom";
import { Box, Typography, useTheme, alpha, Button, Chip } from "@mui/material";
import FlexBetween from "@/components/FlexBetween";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import CloudOffIcon from "@mui/icons-material/CloudOff";
import { useDemoModeContext } from "@/context/DemoModeContext";

const Navbar = () => {
  const location = useLocation();
  const { palette } = useTheme();
  const selected = location.pathname === "/" ? "dashboard" : "predictions";
  const { isDemoMode, toggleDemoMode } = useDemoModeContext();

  return (
    <Box
      sx={{
        background: `linear-gradient(135deg, ${alpha(palette.primary[600], 0.1)} 0%, ${alpha(
          palette.secondary[600],
          0.1
        )} 100%)`,
        backdropFilter: "blur(20px)",
        borderRadius: "16px",
        border: `1px solid ${alpha(palette.primary[500], 0.2)}`,
        padding: "1rem 2rem",
        marginBottom: "1.5rem",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.2)",
      }}
    >
      <FlexBetween>
        {/* LEFT SIDE - Logo */}
        <FlexBetween gap="1rem">
          <Box
            sx={{
              background: `linear-gradient(135deg, ${palette.primary[500]} 0%, ${palette.secondary[500]} 100%)`,
              borderRadius: "12px",
              padding: "0.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 4px 12px ${alpha(palette.primary[500], 0.4)}`,
            }}
          >
            <TrendingUpIcon sx={{ fontSize: "28px", color: "#fff" }} />
          </Box>
          <Box>
            <Typography
              variant="h3"
              sx={{
                fontSize: "24px",
                fontWeight: 700,
                background: `linear-gradient(135deg, ${palette.primary[400]} 0%, ${palette.secondary[400]} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              FinDash
            </Typography>
            <Typography variant="body2" sx={{ color: palette.grey[400], fontSize: "11px" }}>
              Financial Analytics
            </Typography>
          </Box>
        </FlexBetween>

        {/* RIGHT SIDE - Navigation */}
        <FlexBetween gap="1rem">
          {/* Demo Mode Toggle */}
          <Button
            onClick={toggleDemoMode}
            startIcon={isDemoMode ? <DataUsageIcon /> : <CloudOffIcon />}
            sx={{
              background: isDemoMode
                ? `linear-gradient(135deg, ${palette.secondary[600]} 0%, ${palette.secondary[700]} 100%)`
                : alpha(palette.grey[700], 0.3),
              color: isDemoMode ? "#fff" : palette.grey[400],
              padding: "0.5rem 1rem",
              borderRadius: "8px",
              fontWeight: 500,
              fontSize: "13px",
              textTransform: "none",
              border: `1px solid ${
                isDemoMode ? palette.secondary[500] : alpha(palette.grey[600], 0.3)
              }`,
              transition: "all 0.3s ease",
              "&:hover": {
                background: isDemoMode
                  ? `linear-gradient(135deg, ${palette.secondary[500]} 0%, ${palette.secondary[600]} 100%)`
                  : alpha(palette.grey[600], 0.4),
                transform: "translateY(-1px)",
              },
            }}
          >
            {isDemoMode ? "Demo Mode" : "Use Demo Data"}
          </Button>

          <Link to="/" style={{ textDecoration: "none" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1.5rem",
                borderRadius: "10px",
                background:
                  selected === "dashboard"
                    ? `linear-gradient(135deg, ${palette.primary[600]} 0%, ${palette.primary[700]} 100%)`
                    : "transparent",
                border: `1px solid ${
                  selected === "dashboard" ? palette.primary[500] : "transparent"
                }`,
                color: selected === "dashboard" ? "#fff" : palette.grey[400],
                transition: "all 0.3s ease",
                cursor: "pointer",
                "&:hover": {
                  background:
                    selected === "dashboard"
                      ? `linear-gradient(135deg, ${palette.primary[600]} 0%, ${palette.primary[700]} 100%)`
                      : alpha(palette.primary[600], 0.1),
                  border: `1px solid ${palette.primary[500]}`,
                  color: selected === "dashboard" ? "#fff" : palette.primary[300],
                  transform: "translateY(-2px)",
                },
              }}
            >
              <DashboardIcon sx={{ fontSize: "18px" }} />
              <Typography variant="h5" fontWeight={selected === "dashboard" ? 600 : 500}>
                Dashboard
              </Typography>
            </Box>
          </Link>

          <Link to="/predictions" style={{ textDecoration: "none" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1.5rem",
                borderRadius: "10px",
                background:
                  selected === "predictions"
                    ? `linear-gradient(135deg, ${palette.secondary[600]} 0%, ${palette.secondary[700]} 100%)`
                    : "transparent",
                border: `1px solid ${
                  selected === "predictions" ? palette.secondary[500] : "transparent"
                }`,
                color: selected === "predictions" ? "#fff" : palette.grey[400],
                transition: "all 0.3s ease",
                cursor: "pointer",
                "&:hover": {
                  background:
                    selected === "predictions"
                      ? `linear-gradient(135deg, ${palette.secondary[600]} 0%, ${palette.secondary[700]} 100%)`
                      : alpha(palette.secondary[600], 0.1),
                  border: `1px solid ${palette.secondary[500]}`,
                  color: selected === "predictions" ? "#fff" : palette.secondary[300],
                  transform: "translateY(-2px)",
                },
              }}
            >
              <ShowChartIcon sx={{ fontSize: "18px" }} />
              <Typography variant="h5" fontWeight={selected === "predictions" ? 600 : 500}>
                Predictions
              </Typography>
            </Box>
          </Link>
        </FlexBetween>
      </FlexBetween>
    </Box>
  );
};

export default Navbar;