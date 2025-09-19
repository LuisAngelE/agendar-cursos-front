import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { Grid, Typography } from "@mui/material";
import CursosFavoritosContext from "../../context/CursosFavoritos/CursosFavoritosContext";
import RecipeReviewCard from "../../components/Cards/RecipeReviewCard";
import NoDataComponent from "../../components/layout/NoDataComponent";

const CursosFavoritos = () => {
  const { cursos, GetCursosFavoritos } = useContext(CursosFavoritosContext);

  useEffect(() => {
    GetCursosFavoritos();
  }, []);

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
            Mis Cursos Favoritos
          </Typography>
        </Grid>
        {cursos.length > 0 ? (
          cursos.map((curso) => (
            <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
              <RecipeReviewCard curso={curso} />
            </Grid>
          ))
        ) : (
          <NoDataComponent />
        )}
      </Grid>
    </Layout>
  );
};

export default CursosFavoritos;
