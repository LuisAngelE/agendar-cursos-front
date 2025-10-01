import { Grid, Box, Card, CardContent, Typography } from "@mui/material";
import Layout from "../../components/layout/Layout";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import SchoolIcon from "@mui/icons-material/School";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import GroupIcon from "@mui/icons-material/Group";
import BusinessIcon from "@mui/icons-material/Business";
import { motion } from "framer-motion";
import Graphics from "../../components/Graphics/Graphics";
import GraphicsDona from "../../components/Graphics/GraphicsDona";

const cardsData = [
  {
    title: "Inicio",
    subtitle: "Dashboard principal",
    icon: <HomeIcon sx={{ fontSize: 50, color: "#1C277D" }} />,
    link: "/Inicio",
    bgColor: "#E8EAF6",
  },
  {
    title: "Categorías",
    subtitle: "Gestión de categorías",
    icon: <CategoryIcon sx={{ fontSize: 50, color: "#F05E29" }} />,
    link: "/Categorias",
    bgColor: "#FFF3E0",
  },
  {
    title: "Cursos",
    subtitle: "Todos los cursos disponibles",
    icon: <MenuBookIcon sx={{ fontSize: 50, color: "#43A047" }} />,
    link: "/Cursos",
    bgColor: "#E8F5E9",
  },
  {
    title: "Cursos Reservados",
    subtitle: "Cursos asignados a instructores",
    icon: <SchoolIcon sx={{ fontSize: 50, color: "#1E88E5" }} />,
    link: "/Agenda",
    bgColor: "#E3F2FD",
  },
  {
    title: "Usuarios Físicas",
    subtitle: "Gestión de usuarios físicos",
    icon: <GroupIcon sx={{ fontSize: 50, color: "#FBC02D" }} />,
    link: "/Usuarios",
    bgColor: "#FFFDE7",
  },
  {
    title: "Usuarios Morales",
    subtitle: "Gestión de usuarios morales",
    icon: <BusinessIcon sx={{ fontSize: 50, color: "#8E24AA" }} />,
    link: "/Usuarios",
    bgColor: "#F3E5F5",
  },
];

const Inicio = () => {
  return (
    <Layout>
      <Grid container spacing={4} sx={{ padding: 3 }}>
        {cardsData.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Link
              to={card.link}
              style={{ textDecoration: "none", width: "100%" }}
            >
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  backgroundColor: card.bgColor,
                  minHeight: 180,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: 6,
                  },
                }}
                component={motion.div}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    gap: 1.5,
                    width: "100%",
                  }}
                >
                  {card.icon}
                  <Typography variant="h6">{card.title}</Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ opacity: 0.8 }}
                  >
                    {card.subtitle}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}

        <Grid item xs={12}>
          <Typography
            fontWeight="bold"
            fontFamily="monospace"
            variant="h5"
            sx={{ color: "black", textAlign: "center", mb: 2 }}
          >
            Estadísticas
          </Typography>
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <Box
            sx={{
              p: 2,
              borderRadius: 3,
              boxShadow: 3,
              backgroundColor: "#fff",
              height: "100%",
            }}
          >
            <Graphics />
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <Box
            sx={{
              p: 2,
              borderRadius: 3,
              boxShadow: 3,
              backgroundColor: "#fff",
              height: "100%",
            }}
          >
            <GraphicsDona />
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Inicio;
