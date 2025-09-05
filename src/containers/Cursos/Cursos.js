import React, { useContext, useEffect, useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import Layout from "../../components/layout/Layout";
import RecipeReviewCard from "../../components/Cards/RecipeReviewCard";
import CursosContext from "../../context/Cursos/CursosContext";
import AddCursos from "./AddCursos";
import UsuariosContext from "../../context/Usuarios/UsuariosContext";

const Cursos = () => {
  const { cursos, GetCursos } = useContext(CursosContext);
  const { users, GetInstructores } = useContext(UsuariosContext);
  const type_user = localStorage.getItem("type_user");

  useEffect(() => {
    GetCursos();
    GetInstructores();
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
        {type_user !== "3" && (
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
        {cursos.length > 0
          ? cursos.map((curso) => (
              <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
                <RecipeReviewCard curso={curso} />
              </Grid>
            ))
          : null}
      </Grid>
      <AddCursos modal={openModal} handleClose={handleClose} users={users} />
    </Layout>
  );
};

export default Cursos;
