import React, { useContext, useEffect, useState } from "react";
import { Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import Layout from "../../components/layout/Layout";
import RecipeReviewCard from "../../components/Cards/RecipeReviewCard";
import CursosContext from "../../context/Cursos/CursosContext";
import AddCursos from "./AddCursos";
import CategoriasContext from "../../context/Categorias/CategoriasContext";

const Cursos = () => {
  const [searchNombre, setSearchNombre] = React.useState("");
  const [searchTipoCategoria, setSearchTipoCategoria] = React.useState("");

  const { categorias, GetCategories } = useContext(CategoriasContext);
  const { cursos, GetCursos } = useContext(CursosContext);
  const type_user = localStorage.getItem("type_user");

  useEffect(() => {
    GetCursos(searchNombre, searchTipoCategoria);
    GetCategories();
  }, [searchNombre, searchTipoCategoria]);

  useEffect(() => {
    GetCategories();
  }, []);

  const [openModal, setOpenModal] = useState(false);
  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <Layout>
      <Grid container spacing={2} sx={{ padding: 2 }}>
        {type_user === "3" && (
          <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
            <Typography
              fontWeight="bold"
              fontFamily="monospace"
              variant="h5"
              sx={{ color: "black" }}
            >
              Todos los Cursos
            </Typography>
          </Grid>
        )}

        {type_user === "2" && (
          <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
            <Typography
              fontWeight="bold"
              fontFamily="monospace"
              variant="h5"
              sx={{ color: "black" }}
            >
              Mis Cursos Instructor
            </Typography>
          </Grid>
        )}

        {type_user === "1" && (
          <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
            <Typography
              fontWeight="bold"
              fontFamily="monospace"
              variant="h5"
              sx={{ color: "black" }}
            >
              Cursos
            </Typography>
          </Grid>
        )}

        {(type_user === "1" || type_user === "2") && (
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
            <Button
              onClick={handleClickOpen}
              variant="contained"
              fullWidth
              sx={{
                color: "white",
                backgroundColor: "#F05E29",
                "&:hover": {
                  color: "white",
                  backgroundColor: "#F05E29",
                },
              }}
            >
              Agregar
            </Button>
          </Grid>
        )}
        <Grid item xs={6}>
          <TextField
            label="Buscar por nombre del curso"
            variant="outlined"
            size="small"
            fullWidth
            value={searchNombre}
            onChange={(e) => setSearchNombre(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            select
            label="Filtrar por tipo de categoria"
            value={searchTipoCategoria}
            onChange={(e) => setSearchTipoCategoria(e.target.value)}
            fullWidth
            size="small"
          >
            <MenuItem value="">Todos</MenuItem>
            {categorias.map((categoria) => (
              <MenuItem key={categoria.id} value={categoria.id}>
                {categoria.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {cursos.length > 0
          ? cursos.map((curso) => (
              <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
                <RecipeReviewCard curso={curso} />
              </Grid>
            ))
          : null}
      </Grid>
      <AddCursos
        modal={openModal}
        handleClose={handleClose}
        categorias={categorias}
      />
    </Layout>
  );
};

export default Cursos;
