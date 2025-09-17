import { Grid, Typography } from "@mui/material";
import Layout from "../../components/layout/Layout";
import CardCategories from "../../components/Cards/CardCategories";
import CardCourses from "../../components/Cards/CardCourses";
import CardCoursesAgent from "../../components/Cards/CardCoursesAgent";
import CardUsersFisicas from "../../components/Cards/CardUsersFisicas";
import CardUsersMorales from "../../components/Cards/CardUsersMorales";
import CardInicio from "../../components/Cards/CardInicio";

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
        <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
          <CardInicio />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
          <CardCategories />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
          <CardCourses />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
          <CardCoursesAgent />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
          <CardUsersFisicas />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
          <CardUsersMorales />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Inicio;
