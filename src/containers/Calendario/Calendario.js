import React from "react";
import Layout from "../../components/layout/Layout";
import { Grid, Typography } from "@mui/material";

const Calendario = () => {
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
            Mi calendario
          </Typography>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Calendario;
