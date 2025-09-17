import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { Link } from "react-router-dom";

export default function CardCourses() {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Link to="Cursos" style={{ textDecoration: "none", width: "100%" }}>
        <Card sx={{ border: "none" }}>
          <CardContent sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <MenuBookIcon sx={{ fontSize: 40, color: "#1C277D" }} />
            <Typography variant="h5" component="div">
              Cursos
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </Box>
  );
}
