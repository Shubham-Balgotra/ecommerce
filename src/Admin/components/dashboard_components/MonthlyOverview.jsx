import React from "react";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SettingsCellIcon from "@mui/icons-material/SettingsCell";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";

const salesData = [
  {
    stats: "283k",
    color: "#2196f3",
    title: "Sales",
    icon: <TrendingUpIcon sx={{ fontSize: "1.75rem" }} />,
  },
  {
    stats: "43k",
    color: "#ff9100",
    title: "Customers",
    icon: <AccountBoxIcon sx={{ fontSize: "1.75rem" }} />,
  },
  {
    stats: "124k",
    color: "#76ff03",
    title: "Products",
    icon: <SettingsCellIcon sx={{ fontSize: "1.75rem" }} />,
  },
  {
    stats: "673k",
    color: "#9c27b0",
    title: "Revenue",
    icon: <CurrencyRupeeIcon sx={{ fontSize: "1.75rem" }} />,
  },
];

const RenderStats = () => {
  return salesData.map((item, index) => (
    <Grid item xs={12} sm={3} key={index}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Avatar
          variant="rounded"
          sx={{
            mr: 3,
            color: "white",
            backgroundColor: `${item.color}`,
            height: 40,
            weidth: 40,
            boxShadow: 3,
          }}
        >
          {item.icon}
        </Avatar>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="caption">{item.title}</Typography>
          <Typography variant="h6">{item.stats}</Typography>
        </Box>
      </Box>
    </Grid>
  ));
};
const MonthlyOverview = () => {
  return (
    <div>
      <Card
        sx={{
          height: {
            xs: "auto", // For small screens (mobile), set height to auto or adjust as needed
            sm: 197, // For screens above mobile (sm and larger), apply height: 197px
            md: 197, // You can adjust this further for medium (md) and large (lg) screens as well
          },
        }}
      >
        <CardHeader
          title="Monthly Overview"
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          subheader={
            <Typography variant="body2">
              <Box
                component="span"
                sx={{ fontWeight: "600", color: "text.primary" }}
              >
                Total 49.5% growth
              </Box>{" "}
              🤩 this month
            </Typography>
          }
          titleTypographyProps={{
            sx: {
              mb: 2.5,
              lineHeight: "2rem !important",
              letterSpacing: ".15rem !important",
            },
          }}
        />
        <CardContent sx={{ pt: (theme) => `${theme.spacing(3)} !important` }}>
          <Grid container spacing={[5, 0]}>
            {RenderStats()}
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default MonthlyOverview;
