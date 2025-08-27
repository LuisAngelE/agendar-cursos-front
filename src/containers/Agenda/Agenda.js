import React from "react";
import { Grid, Typography } from "@mui/material";
import Layout from "../../components/layout/Layout";

const Agenda = () => {
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
            Agenda
          </Typography>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Agenda;
