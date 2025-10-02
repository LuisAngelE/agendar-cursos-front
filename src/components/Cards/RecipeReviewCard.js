import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import MessageIcon from "@mui/icons-material/Message";
import { Button, IconButton, Tooltip } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Default from "../layout/img/default.png";
import { useState } from "react";
import EditCursos from "../../containers/Cursos/EditCursos";
import CursosContext from "../../context/Cursos/CursosContext";
import CategoriasContext from "../../context/Categorias/CategoriasContext";
import ModalMultimedia from "../../containers/Cursos/ModalMultimedia";
import AgendaModal from "../../containers/Agenda/AgendaModal";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { motion } from "framer-motion";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));

export default function RecipeReviewCard({ curso, categorias }) {
  const { DeleteCursos, AddCursoFavorito, DeleteCursoFavorito } =
    React.useContext(CursosContext);
  const type_user = localStorage.getItem("type_user");
  const user_id = localStorage.getItem("user_id");

  const isFavorito = (curso) => {
    return curso.users_who_favorited?.some(
      (user) => user.id.toString() === user_id
    );
  };

  const handleToggleFavorito = (curso) => {
    if (isFavorito(curso)) {
      DeleteCursoFavorito(curso.id);
    } else {
      AddCursoFavorito(curso.id);
    }
  };

  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [id_user, saveUser] = useState(null);
  const [modalMultimedia, openModalMultimedia] = useState(false);
  const handleOpenMultimedia = (id) => {
    openModalMultimedia(true);
    saveUser(id);
  };
  const handleCloseMultimedia = () => {
    openModalMultimedia(false);
    saveUser(null);
  };

  const [modalUpdate, OpenModalUpdate] = useState(false);
  const [id_service, saveIdService] = useState(null);
  const handleClickOpen = (id) => {
    OpenModalUpdate(true);
    saveIdService(id);
  };
  const handleClickClose = () => {
    OpenModalUpdate(false);
    saveIdService(null);
  };

  const [id_agenda, saveIdAgenda] = useState(null);
  const [modalAgenda, openModalAgenda] = useState(false);
  const handleOpenAgenda = (id) => {
    openModalAgenda(true);
    saveIdAgenda(id);
  };
  const handleCloseAgenda = () => {
    openModalAgenda(false);
    saveIdAgenda(null);
  };

  return (
    <Card
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, boxShadow: "0 8px 20px rgba(0,0,0,0.15)" }}
      transition={{ duration: 0.3 }}
      sx={{ maxWidth: 345 }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "#F05E29", color: "#FFFFFF" }}>
            {curso.title?.charAt(0).toUpperCase() ?? "C"}
          </Avatar>
        }
        action={
          type_user === "3" ? (
            <IconButton
              size="small"
              onClick={() => handleToggleFavorito(curso)}
              component={motion.div}
              whileTap={{ scale: 0.8 }}
              whileHover={{ scale: 1.2 }}
            >
              <Tooltip
                title={
                  isFavorito(curso)
                    ? "Eliminar de favoritos"
                    : "Agregar a favoritos"
                }
                placement="top"
              >
                {isFavorito(curso) ? (
                  <FavoriteIcon sx={{ color: "#FF0000" }} />
                ) : (
                  <FavoriteBorderIcon sx={{ color: "#FF0000" }} />
                )}
              </Tooltip>
            </IconButton>
          ) : null
        }
        title={curso.title}
      />
      <Link to={`/Cursos/${curso.id}`} style={{ textDecoration: "none" }}>
        <motion.div whileHover={{ scale: 1.03 }}>
          <CardMedia
            component="img"
            height="194"
            image={curso.image?.url || Default}
            alt="Paella dish"
          />
        </motion.div>
        <CardContent>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Modalidad: {curso.modality} <br />
            Duración: {curso.duration} <br />
            Categoría: {curso.category?.name} <br />
          </Typography>
        </CardContent>
      </Link>

      <CardActions disableSpacing>
        {type_user === "1" && (
          <>
            <IconButton
              size="small"
              onClick={() => handleOpenMultimedia(curso.id)}
            >
              <Tooltip title="Agregar Multimedia" placement="top">
                <AddPhotoAlternateIcon
                  sx={{
                    color: "green",
                    transition: "0.2s",
                    "&:hover": { scale: "2" },
                  }}
                />
              </Tooltip>
            </IconButton>
            <IconButton size="small" onClick={() => handleClickOpen(curso.id)}>
              <Tooltip title="Editar Curso" placement="top">
                <EditIcon
                  sx={{
                    color: "#e7a62f",
                    transition: "0.2s",
                    "&:hover": { rotate: "40deg" },
                  }}
                />
              </Tooltip>
            </IconButton>
            <IconButton size="small" onClick={() => DeleteCursos(curso.id)}>
              <Tooltip title="Eliminar Curso" placement="top">
                <DeleteIcon
                  sx={{
                    color: "#FF0000",
                    transition: "0.2s",
                    "&:hover": { scale: "2" },
                  }}
                />
              </Tooltip>
            </IconButton>
          </>
        )}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography raphy sx={{ marginBottom: 2 }}>
            Descripción: {curso.description}
          </Typography>
          {(type_user === "1" || type_user === "3") && (
            <Button
              onClick={() => handleOpenAgenda(curso.id)}
              fullWidth
              variant="contained"
              sx={{
                bgcolor: "#5D65A2",
                "&:hover": { bgcolor: "#5D65A2", scale: "1.1", },
              }}
            >
              <MessageIcon sx={{ mr: 1 }} />
              Me Interesa Este Curso
            </Button>
          )}
        </CardContent>
      </Collapse>

      {id_user !== null && (
        <ModalMultimedia
          open={modalMultimedia}
          handleClose={handleCloseMultimedia}
          id={id_user}
        />
      )}
      {id_service !== null && (
        <EditCursos
          open={modalUpdate}
          handleClose={handleClickClose}
          id={id_service}
          categorias={categorias}
        />
      )}
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
