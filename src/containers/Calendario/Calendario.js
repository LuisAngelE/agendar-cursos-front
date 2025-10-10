import Layout from "../../components/layout/Layout";
import { Grid, Typography } from "@mui/material";
import CalendarView from "./CalendarView";
import CalendarioContext from "../../context/Calendario/CalendarioContext";
import { useEffect, useContext } from "react";

const Calendario = () => {
  const { fechas, GetFechas } = useContext(CalendarioContext);
  const type_user = localStorage.getItem("type_user");

  useEffect(() => {
    GetFechas();
  }, []);

  return (
    <Layout>
      <Grid container spacing={2} sx={{ padding: 2 }}>
        <Grid item xs={12}>
          <Typography
            fontWeight="bold"
            fontFamily="monospace"
            variant="h5"
            sx={{ color: "black" }}
          >
            Mi calendario
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <CalendarView type_user={type_user} fechas={fechas} />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Calendario;
