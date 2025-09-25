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
  Container,
  Skeleton,
} from "@mui/material";
import MethodGet from "../../config/service";
import MultimediaCursos from "./MultimediaCursos";
import AgendaModal from "../Agenda/AgendaModal";

export default function VistaCursos(props) {
  const { id } = props.match.params;
  const [curso, saveCurso] = useState({});
  const { images = [], category = {}, user = {}, schedules = [] } = curso;
  let type_user = localStorage.getItem("type_user");

  const [id_agenda, saveIdAgenda] = useState(null);
  const [modalAgenda, openModalAgenda] = useState(false);

  const handleOpenAgenda = (id) => {
    openModalAgenda(true);
    saveIdAgenda(id);
  };
  const handleCloseAgenda = () => {
    openModalAgenda(false);
    saveIdAgenda(null);
  };

  useEffect(() => {
    MethodGet(`/course/${id}`)
      .then((res) => saveCurso(res.data))
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4} alignItems="flex-start">
          <Grid item xs={12} md={6}>
            <Box sx={{ aspectRatio: "16/9", width: "100%" }}>
              <MultimediaCursos images={images} />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            {!curso.title ? (
              <Skeleton variant="rectangular" height={40} width="80%" />
            ) : (
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {curso.title}
              </Typography>
            )}

            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ mb: 2 }}
            >
              Acerca del curso
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                <strong>Descripción:</strong> {curso.description}
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                <strong>Modalidad:</strong> {curso.modality}
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                <strong>Duración:</strong> {curso.duration}
              </Typography>
              {user?.razon_social && (
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  <strong>Propietario:</strong> {user.razon_social}
                </Typography>
              )}
            </Box>

            {category?.name && (
              <Chip
                label={`Categoría: ${category.name}`}
                color="success"
                sx={{ mb: 2, mr: 1 }}
              />
            )}

            {category?.name && (
              <Chip
                label={`Modelo: ${category.name}`}
                color="primary"
                sx={{ mb: 2 }}
              />
            )}

            <Button
              onClick={() => handleOpenAgenda(curso.id)}
              fullWidth
              variant="contained"
              sx={{
                bgcolor: "#5D65A2",
                "&:hover": { bgcolor: "#4a538d" },
                borderRadius: 3,
                py: 1.5,
                fontWeight: "bold",
                boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                mt: 2,
              }}
            >
              <MessageIcon sx={{ mr: 1 }} />
              Me Interesa Este Curso
            </Button>

            <Divider sx={{ my: 3 }} />
          </Grid>

          {(type_user === "1" || type_user === "2") && (
            <Grid item xs={12} md={6}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Fechas Reservadas
              </Typography>
              {schedules.length > 0 ? (
                schedules.map((s) => (
                  <Paper
                    key={s.id}
                    elevation={3}
                    sx={{
                      p: 2,
                      mb: 2,
                      borderRadius: 3,
                      bgcolor: "#f9f9fb",
                    }}
                  >
                    <Typography variant="body2" gutterBottom>
                      📍{" "}
                      <strong>
                        {s.state.name}, {s.municipality.name}
                      </strong>
                    </Typography>
                    <Typography variant="body2" gutterBottom>
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
          )}
        </Grid>

        {id_agenda !== null && (
          <AgendaModal
            open={modalAgenda}
            handleClose={handleCloseAgenda}
            id={id_agenda}
            curso={curso}
          />
        )}
      </Container>
    </Layout>
  );
}
