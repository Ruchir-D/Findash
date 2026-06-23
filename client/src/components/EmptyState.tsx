import { Box, Typography, useTheme, alpha } from "@mui/material";
import DashboardBox from "./DashboardBox";
import DataUsageIcon from "@mui/icons-material/DataUsage";

interface EmptyStateProps {
  gridArea?: string;
  title?: string;
  message?: string;
}

/**
 * Empty state component for when no data is available
 */
const EmptyState = ({ gridArea, title, message }: EmptyStateProps) => {
  const { palette } = useTheme();

  return (
    <DashboardBox gridArea={gridArea}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100%"
        p="2rem"
      >
        <Box
          sx={{
            background: alpha(palette.grey[700], 0.2),
            borderRadius: "50%",
            padding: "1.5rem",
            marginBottom: "1.5rem",
          }}
        >
          <DataUsageIcon
            sx={{
              fontSize: "48px",
              color: palette.grey[500],
            }}
          />
        </Box>
        <Typography
          variant="h4"
          color={palette.grey[300]}
          gutterBottom
          textAlign="center"
        >
          {title || "No Data Available"}
        </Typography>
        <Typography
          variant="body2"
          color={palette.grey[500]}
          textAlign="center"
          maxWidth="300px"
        >
          {message || "There is no data to display at this time. Please check back later."}
        </Typography>
      </Box>
    </DashboardBox>
  );
};

export default EmptyState;
