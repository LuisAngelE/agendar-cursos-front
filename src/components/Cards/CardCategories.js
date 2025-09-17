import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CategoryIcon from "@mui/icons-material/Category";
import { Link } from "react-router-dom";

export default function CardCategories() {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Link to="Categorias" style={{ textDecoration: "none", width: "100%" }}>
        <Card sx={{ border: "none" }}> 
          <CardContent sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CategoryIcon sx={{ fontSize: 40, color: "#F05E29" }} />
            <Typography variant="h5" component="div">
              Categorías
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </Box>
  );
}
