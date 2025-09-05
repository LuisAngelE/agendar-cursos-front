import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MessageIcon from "@mui/icons-material/Message";
import { IconButton, Tooltip } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Default from "../layout/img/default.png";
import { useState } from "react";
import EditCursos from "../../containers/Cursos/EditCursos";
import UsuariosContext from "../../context/Usuarios/UsuariosContext";
import CursosContext from "../../context/Cursos/CursosContext";

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

export default function RecipeReviewCard({ curso }) {
  const { users, GetInstructores } = React.useContext(UsuariosContext);
  const { DeleteCursos } = React.useContext(CursosContext);
  const [expanded, setExpanded] = React.useState(false);
  const type_user = localStorage.getItem("type_user");

  React.useEffect(() => {
    GetInstructores();
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
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

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: "#F05E29", color: "#FFFFFF" }}
            aria-label="recipe"
          >
            {curso.instructor?.razon_social
              ? curso.instructor.razon_social.charAt(0).toUpperCase()
              : curso.instructor?.name?.charAt(0).toUpperCase() ?? "?"}
          </Avatar>
        }
        action={
          <IconButton size="small">
            <Tooltip title="Agregar a Favoritos" placement="top">
              <FavoriteIcon sx={{ color: "#FF0000" }} />
            </Tooltip>
          </IconButton>
        }
        title={`${curso.instructor?.name ?? ""} 
                ${curso.instructor?.last_name ?? ""} 
                ${
                  curso.instructor?.razon_social
                    ? curso.instructor.razon_social
                    : ""
                }`.trim()}
      />
      <CardMedia
        component="img"
        height="194"
        image={Default}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {curso.title} {curso.modality}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {type_user !== "3" && (
          <>
            <IconButton size="small">
              <Tooltip title="Agregar Multimedia" placement="top">
                <AddPhotoAlternateIcon sx={{ color: "green" }} />
              </Tooltip>
            </IconButton>
            <IconButton size="small" onClick={() => handleClickOpen(curso.id)}>
              <Tooltip title="Editar Curso" placement="top">
                <EditIcon sx={{ color: "#e7a62f" }} />
              </Tooltip>
            </IconButton>
            <IconButton size="small" onClick={() => DeleteCursos(curso.id)}>
              <Tooltip title="Eliminar Curso" placement="top">
                <DeleteIcon sx={{ color: "#FF0000" }} />
              </Tooltip>
            </IconButton>
          </>
        )}
        <IconButton size="small">
          <Tooltip title="Detalle del Curso" placement="top">
            <VisibilityIcon sx={{ color: "blue" }} />
          </Tooltip>
        </IconButton>

        <IconButton size="small">
          <Tooltip title="Agendar Curso" placement="top">
            <MessageIcon sx={{ color: "#F05E29" }} />
          </Tooltip>
        </IconButton>

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
          <Typography sx={{ marginBottom: 2 }}>{curso.description}</Typography>
        </CardContent>
      </Collapse>
      {id_service !== null && (
        <EditCursos
          open={modalUpdate}
          handleClose={handleClickClose}
          id={id_service}
          users={users}
        />
      )}
    </Card>
  );
}
