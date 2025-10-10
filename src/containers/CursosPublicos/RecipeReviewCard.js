import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  Message as MessageIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import Default from "../../components/layout/img/default.webp";
import AgendaModal from "./AgendaModal";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
}));

export default function RecipeReviewCard({ curso }) {
  const [expanded, setExpanded] = useState(true);
  const [id_agenda, saveIdAgenda] = useState(null);
  const [modalAgenda, openModalAgenda] = useState(false);

  const handleExpandClick = () => setExpanded(!expanded);
  const handleOpenAgenda = (id) => {
    openModalAgenda(true);
    saveIdAgenda(id);
  };
  const handleCloseAgenda = () => {
    openModalAgenda(false);
    saveIdAgenda(null);
  };

  const statusColor =
    curso.status === 1 ? "#37ff00" : curso.status === 2 ? "#ff0000" : "#808080";
  const statusText =
    curso.status === 1
      ? "Activo"
      : curso.status === 2
      ? "Inactivo"
      : "Desconocido";

  return (
    <Card
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, boxShadow: "0 8px 20px rgba(0,0,0,0.15)" }}
      transition={{ duration: 0.3 }}
      sx={{
        maxWidth: 345,
        borderRadius: 2,
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        overflow: "hidden",
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "#1565C0", color: "#ffffffff" }}>
            {curso.title?.charAt(0).toUpperCase() ?? "C"}
          </Avatar>
        }
        title={
          <Typography variant="h6" noWrap>
            {curso.title}
          </Typography>
        }
        subheader={curso.category?.name}
      />

      <motion.div whileHover={{ scale: 1.03 }} style={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="194"
          image={curso.image?.url || Default}
          alt={curso.title}
        />
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            padding: "4px 8px",
            borderRadius: "12px",
            backgroundColor: statusColor,
            color: "#fff",
            fontSize: "0.75rem",
            fontWeight: "bold",
            textTransform: "uppercase",
          }}
        >
          {statusText}
        </div>
      </motion.div>

      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
        <Typography variant="body2" color="text.secondary">
          Modalidad: {curso.modality}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Duración: {curso.duration}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Descripción: {curso.description}
          </Typography>
          {curso.status !== 2 && (
            <Button
              onClick={() => handleOpenAgenda(curso.id)}
              fullWidth
              variant="contained"
              sx={{
                bgcolor: "#1976D2",
                "&:hover": { bgcolor: "#1565C0", transform: "scale(1.05)" },
              }}
            >
              <MessageIcon sx={{ mr: 1 }} />
              Me interesa este curso
            </Button>
          )}
        </CardContent>
      </Collapse>

      {id_agenda !== null && (
        <AgendaModal
          open={modalAgenda}
          handleClose={handleCloseAgenda}
          id={id_agenda}
          curso={curso}
        />
      )}
    </Card>
  );
}
