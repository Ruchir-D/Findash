import { Box, Typography, Button } from "@mui/material";
import DashboardBox from "./DashboardBox";

interface ErrorDisplayProps {
  gridArea?: string;
  message?: string;
  onRetry?: () => void;
}

/**
 * Error display component for failed API calls
 */
const ErrorDisplay = ({ gridArea, message, onRetry }: ErrorDisplayProps) => {
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
        <Typography variant="h6" color="error" gutterBottom>
          Error Loading Data
        </Typography>
        <Typography variant="body2" color="textSecondary" mb={2} textAlign="center">
          {message || "Unable to fetch data. Please try again."}
        </Typography>
        {onRetry && (
          <Button variant="outlined" size="small" onClick={onRetry}>
            Retry
          </Button>
        )}
      </Box>
    </DashboardBox>
  );
};

export default ErrorDisplay;
