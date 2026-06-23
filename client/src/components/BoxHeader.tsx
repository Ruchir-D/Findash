import { Box, Typography, useTheme, alpha, Chip } from "@mui/material";
import React from "react";
import FlexBetween from "./FlexBetween";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

type Props = {
  title: string;
  sideText: string;
  subtitle?: string;
  icon?: React.ReactNode;
};

const BoxHeader = ({ icon, title, subtitle, sideText }: Props) => {
  const { palette } = useTheme();
  const isPositive = sideText.includes("+");

  return (
    <FlexBetween margin="0 0 0.75rem 0">
      <Box>
        <FlexBetween gap="0.75rem" mb="0.25rem">
          {icon && (
            <Box
              sx={{
                background: `linear-gradient(135deg, ${alpha(palette.primary[500], 0.2)} 0%, ${alpha(
                  palette.secondary[500],
                  0.2
                )} 100%)`,
                borderRadius: "8px",
                padding: "0.4rem",
                display: "flex",
                alignItems: "center",
                color: palette.primary[400],
              }}
            >
              {icon}
            </Box>
          )}
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              color: palette.grey[100],
              fontSize: "16px",
            }}
          >
            {title}
          </Typography>
        </FlexBetween>
        {subtitle && (
          <Typography
            variant="body2"
            sx={{
              color: palette.grey[400],
              fontSize: "12px",
              marginLeft: icon ? "2.5rem" : "0",
            }}
          >
            {subtitle}
          </Typography>
        )}
      </Box>

      <Chip
        icon={isPositive ? <TrendingUpIcon sx={{ fontSize: "16px" }} /> : undefined}
        label={sideText}
        size="small"
        sx={{
          background: isPositive
            ? `linear-gradient(135deg, ${alpha(palette.success[500], 0.2)} 0%, ${alpha(
                palette.success[600],
                0.1
              )} 100%)`
            : `linear-gradient(135deg, ${alpha(palette.accent[500], 0.2)} 0%, ${alpha(
                palette.accent[600],
                0.1
              )} 100%)`,
          color: isPositive ? palette.success[500] : palette.accent[500],
          border: `1px solid ${isPositive ? palette.success[600] : palette.accent[600]}`,
          fontWeight: 700,
          fontSize: "13px",
          padding: "0.5rem 0.25rem",
          height: "28px",
          "& .MuiChip-icon": {
            color: isPositive ? palette.success[500] : palette.accent[500],
          },
        }}
      />
    </FlexBetween>
  );
};

export default BoxHeader;