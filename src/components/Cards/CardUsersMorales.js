import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import BusinessIcon from "@mui/icons-material/Business";
import { Link } from "react-router-dom";

export default function CardUsersMorales() {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Link
        to="PersonasMorales"
        style={{ textDecoration: "none", width: "100%" }}
      >
        <Card sx={{ border: "none" }}>
          <CardContent sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <BusinessIcon sx={{ fontSize: 40, color: "#F05E29" }} />
            <Typography variant="h5" component="div">
              Personas Morales
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </Box>
  );
}
