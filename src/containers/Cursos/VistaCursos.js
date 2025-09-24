import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import MessageIcon from "@mui/icons-material/Message";
import {
  Box,
  Grid,
  Typography,
  Chip,
  Paper,
  Divider,
  Button,
} from "@mui/material";
import MethodGet from "../../config/service";
import MultimediaCursos from "./MultimediaCursos";

export default function VistaCursos(props) {
  const { id } = props.match.params;
  const [curso, saveCurso] = useState({});
  const { images = [], category = {}, user = {}, schedules = [] } = curso;

  useEffect(() => {
    MethodGet(`/course/${id}`)
      .then((res) => saveCurso(res.data))
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <Layout>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <MultimediaCursos images={images} />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {curso.title}
          </Typography>

          <Typography variant="h5" sx={{ lineHeight: 1.6, mb: 2 }}>
            Acerca del curso
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Typography variant="body2">
              <strong>Descripción :</strong> {curso.description}
            </Typography>
            <Typography variant="body2">
              <strong>Modalidad:</strong> {curso.modality}
            </Typography>
            <Typography variant="body2">
              <strong>Duración:</strong> {curso.duration}
            </Typography>
            {user?.razon_social && (
              <Typography variant="body2">
                <strong>Propietario:</strong> {user.razon_social}
              </Typography>
            )}
          </Box>

          {category?.name && (
            <Chip
              label={`Categoría: ${category.name}`}
              color="success"
              sx={{ mb: 2 }}
            />
          )}

          <br />

          {category?.name && (
            <Chip
              label={`Modelo: ${category.name}`}
              color="primary"
              sx={{ mb: 2 }}
            />
          )}

          <Button
            fullWidth
            variant="contained"
            sx={{
              bgcolor: "#5D65A2",
              "&:hover": { bgcolor: "#5D65A2" },
            }}
          >
            <MessageIcon sx={{ mr: 1 }} />
            Me Interesa Este Curso
          </Button>

          <Divider sx={{ my: 2 }} />
        </Grid>

        <Grid item xs={12} md={6}>
          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Fechas Reservadas
          </Typography>
          {schedules.length > 0 ? (
            schedules.map((s) => (
              <Paper
                key={s.id}
                variant="outlined"
                sx={{ p: 2, mb: 1, borderRadius: 2 }}
              >
                <Typography variant="body2">
                  📍{" "}
                  <strong>
                    {s.state.name}, {s.municipality.name}
                  </strong>
                </Typography>
                <Typography variant="body2">
                  🗓{" "}
                  {new Date(s.start_date).toLocaleString("es-MX", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </Typography>
                <Typography variant="body2">
                  🧑‍💼{" "}
                  <strong>
                    {s.instructor
                      ? `${s.instructor.name} ${s.instructor.last_name}`
                      : "Instructor no asignado"}
                  </strong>
                </Typography>
              </Paper>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              No hay fechas disponibles.
            </Typography>
          )}
        </Grid>
      </Grid>
    </Layout>
  );
}
