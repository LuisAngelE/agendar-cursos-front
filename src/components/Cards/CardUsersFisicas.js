import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import GroupIcon from "@mui/icons-material/Group";
import { Link } from "react-router-dom";

export default function CardUsersFisicas() {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Link to="PersonasFisicas" style={{ textDecoration: "none", width: "100%" }}>
        <Card sx={{ border: "none" }}>
          <CardContent sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <GroupIcon sx={{ fontSize: 40, color: "#1C277D" }} />
            <Typography variant="h5" component="div">
              Personas Físicas
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </Box>
  );
}
