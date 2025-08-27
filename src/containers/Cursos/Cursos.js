import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import Layout from "../../components/layout/Layout";

const Cursos = () => {
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
        <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
          <Button
            variant="contained"
            fullWidth
            sx={{
              color: "white",
              backgroundColor: "#3F5EFB",
              "&:hover": {
                color: "white",
                backgroundColor: "#3F5EFB",
              },
            }}
          >
            Agregar
          </Button>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Cursos;
