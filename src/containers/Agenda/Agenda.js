import React, { useContext, useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import Layout from "../../components/layout/Layout";
import AgendaContext from "../../context/Agenda/AgendaContext";
import TableAgenda from "../../components/Tables/TableAgenda";

const Agenda = () => {
  const { agendas, GetAgendas } = useContext(AgendaContext);
  let type_user = localStorage.getItem("type_user");

  useEffect(() => {
    GetAgendas();
  }, []);

  return (
    <Layout>
      <Grid container spacing={2} sx={{ padding: 2 }}>
        {type_user === "1" && (
          <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
            <Typography
              fontWeight="bold"
              fontFamily="monospace"
              variant="h5"
              sx={{ color: "black" }}
            >
              Cursos Reservados
            </Typography>
          </Grid>
        )}
        {(type_user === "2" || type_user === "3") && (
          <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
            <Typography
              fontWeight="bold"
              fontFamily="monospace"
              variant="h5"
              sx={{ color: "black" }}
            >
              Mis Cursos Reservados
            </Typography>
          </Grid>
        )}
        <Grid item xs={12}>
          <TableAgenda agendas={agendas} />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Agenda;
