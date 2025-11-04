import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { Grid, MenuItem, TextField, Typography } from "@mui/material";
import TableCursos from "../../components/Tables/TableCursos";
import CategoriasContext from "../../context/Categorias/CategoriasContext";
import ModelosContext from "../../context/Modelos/ModelosContext";
import AgendaContext from "../../context/Agenda/AgendaContext";

const CursosTabla = () => {
  const { categorias, GetCategories } = useContext(CategoriasContext);
  const { modelos, GetModelos } = useContext(ModelosContext);
  const { agendas, GetAgendasAll } = useContext(AgendaContext);
  const [searchNombre, setSearchNombre] = useState("");
  const [searchTipoCategoria, setSearchTipoCategoria] = useState("");
  const [searchTipoModelo, setSearchTipoModelo] = useState("");

  useEffect(() => {
    GetAgendasAll(searchNombre, searchTipoCategoria, searchTipoModelo);
  }, [searchNombre, searchTipoCategoria, searchTipoModelo]);

  useEffect(() => {
    GetCategories();
    GetModelos();
  }, []);

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
            Todos los cursos reservados
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Buscar por nombre del curso"
            variant="outlined"
            size="small"
            fullWidth
            value={searchNombre}
            onChange={(e) => setSearchNombre(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            select
            label="Filtrar por tipo de categoría"
            value={searchTipoCategoria}
            onChange={(e) => setSearchTipoCategoria(e.target.value)}
            fullWidth
            size="small"
          >
            <MenuItem value="">Todos</MenuItem>
            {categorias.map((categoria) => (
              <MenuItem key={categoria.id} value={categoria.id}>
                {categoria.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            select
            label="Filtrar por tipo de modelo"
            value={searchTipoModelo}
            onChange={(e) => setSearchTipoModelo(e.target.value)}
            fullWidth
            size="small"
          >
            <MenuItem value="">Todos</MenuItem>
            {modelos.map((modelo) => (
              <MenuItem key={modelo.id} value={modelo.id}>
                {modelo.nombre_segmento} {""}
                {modelo.nombre_tipo_unidad}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TableCursos agendas={agendas} />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default CursosTabla;
