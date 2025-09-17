import React from "react";
import Layout from "../../components/layout/Layout";
import { useEffect } from "react";
import { Grid } from "@mui/material";
import { useState } from "react";
import MethodGet from "../../config/service";

export default function VistaAgenda(props) {
  const { id } = props.match.params;

  const [agendas, saveAgendas] = useState([]);
  console.log(agendas, "el curso");

  useEffect(() => {
    let url = `/courseSchedule/${id}`;
    MethodGet(url)
      .then((res) => {
        saveAgendas(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <Layout>
      <Grid>{agendas.id}</Grid>
    </Layout>
  );
}
