import React from "react";
import Layout from "../../components/layout/Layout";
import { useEffect } from "react";
import { Grid } from "@mui/material";
import { useState } from "react";
import MethodGet from "../../config/service";

export default function VistaCursos(props) {
  const { id } = props.match.params;

  const [cursos, saveCursos] = useState([]);
  console.log(cursos, "el curso");

  useEffect(() => {
    let url = `/course/${id}`;
    MethodGet(url)
      .then((res) => {
        saveCursos(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <Layout>
      <Grid>{cursos.id}</Grid>
    </Layout>
  );
}
