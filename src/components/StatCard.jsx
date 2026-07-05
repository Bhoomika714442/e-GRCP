import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Stack,
} from "@mui/material";

import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

const StatCard = React.memo(
  ({
    title,
    value,
    icon,
    color = "#1976d2",
    change,
    changeType = "up",
  }) => {
    return (
      <Card
        elevation={0}
        sx={{
          height: 130,
          width: "100%",
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
          borderTop: `3px solid ${color}`,
          bgcolor: "background.paper",
          transition: "all .25s ease",

          "&:hover": {
            transform: "translateY(-3px)",
            boxShadow: 4,
          },
        }}
      >
        <CardContent
          sx={{
            height: "100%",
            p: 2.5,
            "&:last-child": {
              pb: 2.5,
            },
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ height: "100%" }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    fontWeight: 500,
                    letterSpacing: 0.5,
                    textTransform: "uppercase",
                  }}
                >
                  {title}
                </Typography>

                <Typography
                  variant="h5"
                  fontWeight={700}
                  sx={{
                    mt: 1,
                  }}
                >
                  {value}
                </Typography>
              </Box>

              {change && (
                <Stack
                  direction="row"
                  spacing={0.5}
                  alignItems="center"
                >
                  {changeType === "up" ? (
                    <TrendingUpIcon
                      fontSize="small"
                      color="success"
                    />
                  ) : (
                    <TrendingDownIcon
                      fontSize="small"
                      color="error"
                    />
                  )}

                  <Typography
                    variant="body2"
                    fontWeight={600}
                    color={
                      changeType === "up"
                        ? "success.main"
                        : "error.main"
                    }
                  >
                    {change}
                  </Typography>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                  >
                    vs last month
                  </Typography>
                </Stack>
              )}
            </Box>

            <Avatar
              variant="rounded"
              sx={{
                width: 56,
                height: 56,
                bgcolor: `${color}15`,
                color: color,
                borderRadius: 2,
              }}
            >
              {icon}
            </Avatar>
          </Stack>
        </CardContent>
      </Card>
    );
  }
);

StatCard.displayName = "StatCard";

export default StatCard;