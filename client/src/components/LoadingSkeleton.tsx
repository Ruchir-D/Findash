import { Box, Skeleton, useTheme, alpha } from "@mui/material";
import DashboardBox from "./DashboardBox";

/**
 * Loading skeleton component for dashboard boxes
 */
const LoadingSkeleton = ({ gridArea }: { gridArea?: string }) => {
  const { palette } = useTheme();

  return (
    <DashboardBox gridArea={gridArea}>
      <Box p="1.5rem">
        {/* Header skeleton */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb="1rem">
          <Box display="flex" gap="0.75rem" alignItems="center" flex={1}>
            <Skeleton
              variant="circular"
              width={40}
              height={40}
              sx={{ bgcolor: alpha(palette.primary[900], 0.3) }}
            />
            <Box flex={1}>
              <Skeleton
                variant="text"
                width="60%"
                height={24}
                sx={{ bgcolor: alpha(palette.primary[900], 0.3), mb: 0.5 }}
              />
              <Skeleton
                variant="text"
                width="40%"
                height={16}
                sx={{ bgcolor: alpha(palette.primary[900], 0.3) }}
              />
            </Box>
          </Box>
          <Skeleton
            variant="rectangular"
            width={60}
            height={28}
            sx={{ bgcolor: alpha(palette.primary[900], 0.3), borderRadius: "8px" }}
          />
        </Box>

        {/* Chart skeleton */}
        <Skeleton
          variant="rectangular"
          width="100%"
          height="70%"
          sx={{
            bgcolor: alpha(palette.primary[900], 0.2),
            borderRadius: "8px",
            animation: "pulse 1.5s ease-in-out infinite",
            "@keyframes pulse": {
              "0%, 100%": { opacity: 1 },
              "50%": { opacity: 0.5 },
            },
          }}
        />
      </Box>
    </DashboardBox>
  );
};

export default LoadingSkeleton;
