import { Button, Card, CardContent, styled, Typography } from "@mui/material";
import React from "react";
const TriangleImg = styled("div")({
  width: 0,
  height: 0,
  borderLeft: "130px solid transparent",
  borderRight: "0px solid transparent",
  borderBottom: "130px solid gray", // Your triangle color
  position: "absolute",
  right: 0,
  bottom: 0,
  opacity: 0.2,
});

const TrophyImg = styled("img")({
  right: 15,
  bottom: 5,
  height: 100,
  position: "absolute",
});

const Achievements = () => {
  return (
    <div>
      <Card sx={{ position: "relative" }}>
        <CardContent>
          <Typography
            variant="h6"
            sx={{
              letterSpacing: ".15px",
              
              lineHeight: "2rem "
            }}
          >
            Code with Shubham
          </Typography>
          <Typography variant="body2"> Congratulation 🥳</Typography>
          <Typography sx={{ my: 3.1 }}> 777.7k</Typography>
          <Button variant="contained" size="small">
            View Sales
          </Button>
          <TriangleImg />
          <TrophyImg src="https://png.pngtree.com/png-vector/20240913/ourmid/pngtree-trophy-png-vector-material-png-image_12930952.png" />
        </CardContent>
      </Card>
    </div>
  );
};

export default Achievements;
