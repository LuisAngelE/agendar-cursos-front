import {Grid, Typography } from "@mui/material";
import Layout from "../../components/layout/Layout";

const Inicio = () => {
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
            Inicio
          </Typography>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Inicio;
