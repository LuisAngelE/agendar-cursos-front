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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MessageIcon from "@mui/icons-material/Message";
import { Button, IconButton } from "@mui/material";
import Default from "../../components/layout/img/default.png";
import { useState } from "react";
import AgendaModal from "./AgendaModal";
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

export default function RecipeReviewCard({ curso }) {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
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
          <IconButton
            size="small"
            component={motion.div}
            whileTap={{ scale: 0.8 }}
            whileHover={{ scale: 1.2 }}
          ></IconButton>
        }
        title={curso.title}
      />
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

      <CardActions disableSpacing>
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
          <Button
            onClick={() => handleOpenAgenda(curso.id)}
            fullWidth
            variant="contained"
            sx={{
              bgcolor: "#5D65A2",
              "&:hover": { bgcolor: "#5D65A2", scale: "1.1" },
            }}
          >
            <MessageIcon sx={{ mr: 1 }} />
            Me Interesa Este Curso
          </Button>
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
