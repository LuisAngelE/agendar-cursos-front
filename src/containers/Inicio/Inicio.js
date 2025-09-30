import { Grid, Box, Card, CardContent, Typography } from "@mui/material";
import Layout from "../../components/layout/Layout";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import SchoolIcon from "@mui/icons-material/School";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import GroupIcon from "@mui/icons-material/Group";
import BusinessIcon from "@mui/icons-material/Business";
import { motion, AnimatePresence } from "framer-motion";

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
    link: "/CursosAgent",
    bgColor: "#E3F2FD",
  },
  {
    title: "Usuarios Físicas",
    subtitle: "Gestión de usuarios físicos",
    icon: <GroupIcon sx={{ fontSize: 50, color: "#FBC02D" }} />,
    link: "/UsuariosFisicas",
    bgColor: "#FFFDE7",
  },
  {
    title: "Usuarios Morales",
    subtitle: "Gestión de usuarios morales",
    icon: <BusinessIcon sx={{ fontSize: 50, color: "#8E24AA" }} />,
    link: "/UsuariosMorales",
    bgColor: "#F3E5F5",
  },
];

const Inicio = () => {
  return (
    <Layout>
      <Grid container spacing={3} sx={{ padding: 2 }}>
        {cardsData.map((card, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={index}
            component={motion.tr}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.02 }}
          >
            <Link
              to={card.link}
              style={{ textDecoration: "none", width: "100%" }}
            >
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  backgroundColor: card.bgColor,
                  height: 180,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    gap: 1,
                    width: "100%",
                  }}
                >
                  {card.icon}
                  <Typography variant="h6">{card.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {card.subtitle}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default Inicio;
