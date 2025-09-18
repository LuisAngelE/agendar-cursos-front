import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";

export default function CardInicio() {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Link to="/Inicio" style={{ textDecoration: "none", width: "100%" }}>
        <Card sx={{ border: "none" }}>
          <CardContent sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <HomeIcon sx={{ fontSize: 40, color: "#1C277D" }} />
            <Typography variant="h5" component="div">
              Inicio
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </Box>
  );
}
