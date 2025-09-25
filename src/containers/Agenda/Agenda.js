import React, { useContext, useEffect, useState } from "react";
import { Grid, MenuItem, TextField, Typography } from "@mui/material";
import Layout from "../../components/layout/Layout";
import AgendaContext from "../../context/Agenda/AgendaContext";
import TableAgenda from "../../components/Tables/TableAgenda";
import MethodGet from "../../config/service";

const Agenda = () => {
  const [searchNombre, setSearchNombre] = React.useState("");
  const [searchStatus, setSearchStatus] = React.useState("");
  const [searchState, setSearchState] = React.useState("");
  const [states, saveStates] = useState([]);

  const { agendas, GetAgendas } = useContext(AgendaContext);
  let type_user = localStorage.getItem("type_user");

  useEffect(() => {
    GetAgendas(searchNombre, searchStatus, searchState);
  }, [searchNombre, searchStatus, searchState]);

  useEffect(() => {
    MethodGet("/states")
      .then((res) => saveStates(res.data.data))
      .catch(console.log);
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
        <Grid item xs={12} md={12} lg={4}>
          <TextField
            label="Buscar por nombre del curso"
            variant="outlined"
            size="small"
            fullWidth
            value={searchNombre}
            onChange={(e) => setSearchNombre(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={12} lg={4}>
          <TextField
            select
            label="Filtrar por estatus"
            value={searchStatus}
            onChange={(e) => setSearchStatus(e.target.value)}
            fullWidth
            size="small"
          >
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="1">Pendiente de Confirmación</MenuItem>
            <MenuItem value="2">Reservación Confirmada</MenuItem>
            <MenuItem value="3">Reservación Cancelada</MenuItem>
            <MenuItem value="4">Reservación Realizada</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} md={12} lg={4}>
          <TextField
            select
            label="Filtrar por estado"
            value={searchState}
            onChange={(e) => setSearchState(e.target.value)}
            fullWidth
            size="small"
          >
            <MenuItem value="">Todos</MenuItem>
            {states.map((state) => (
              <MenuItem key={state.id} value={state.id}>
                {state.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TableAgenda agendas={agendas} />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Agenda;
