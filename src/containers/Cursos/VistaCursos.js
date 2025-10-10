import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import MessageIcon from "@mui/icons-material/Message";
import {
  Box,
  Grid,
  Typography,
  Chip,
  Divider,
  Button,
  Container,
  Skeleton,
  Paper,
  Card,
  CardContent,
} from "@mui/material";
import MethodGet from "../../config/service";
import MultimediaCursos from "./MultimediaCursos";
import AgendaModal from "../Agenda/AgendaModal";
import { motion } from "framer-motion";

export default function VistaCursos(props) {
  const { id } = props.match.params;

  const [curso, setCurso] = useState(null);
  const [id_agenda, saveIdAgenda] = useState(null);
  const [modalAgenda, openModalAgenda] = useState(false);

  useEffect(() => {
    MethodGet(`/course/${id}`)
      .then((res) => setCurso(res.data))
      .catch((error) => console.log(error));
  }, [id]);

  const handleOpenAgenda = (id) => {
    openModalAgenda(true);
    saveIdAgenda(id);
  };

  const handleCloseAgenda = () => {
    openModalAgenda(false);
    saveIdAgenda(null);
  };

  if (!curso) {
    return <Layout>Cargando...</Layout>;
  }

  const {
    images = [],
    category = {},
    user = {},
    schedules = [],
    reservations = [],
  } = curso;

  let type_user = localStorage.getItem("type_user");

  return (
    <Layout>
      <Container
        maxWidth="lg"
        sx={{ py: { xs: 3, md: 5 } }}
        component={motion.div}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Grid container spacing={4} alignItems="stretch">
          <Grid item xs={12} md={6}>
            <Card
              component={motion.div}
              whileHover={{ scale: 1.02 }}
              sx={{ borderRadius: 3, overflow: "hidden", height: "100%" }}
            >
              <MultimediaCursos images={images} />
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card
              elevation={3}
              sx={{
                p: { xs: 2, md: 3 },
                borderRadius: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
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

              <Box sx={{ mb: 2 }}>
                {category?.name && (
                  <Chip
                    label={`Categoría: ${category.name}`}
                    color="success"
                    sx={{ mr: 1, mb: 1 }}
                  />
                )}
                {category?.name && (
                  <Chip
                    label={`Modelo: ${category.name}`}
                    color="primary"
                    sx={{ mb: 1 }}
                  />
                )}
              </Box>

              {curso.status !== 2 &&
                (type_user === "1" || type_user === "3") && (
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
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    }}
                    component={motion.button}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MessageIcon sx={{ mr: 1 }} />
                    {type_user === "1"
                      ? "Agendar este curso"
                      : "Me interesa este curso"}
                  </Button>
                )}
            </Card>
          </Grid>

          {type_user === "1" && (
            <Grid item xs={12}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Fechas Reservadas
              </Typography>
              {schedules.length > 0 ? (
                <Grid container spacing={2}>
                  {schedules.map((s) => (
                    <Grid item xs={12} md={6} key={s.id}>
                      <Paper
                        elevation={3}
                        component={motion.div}
                        whileHover={{ scale: 1.01 }}
                        sx={{
                          p: 2,
                          borderRadius: 3,
                          bgcolor: "#f9f9fb",
                          height: "100%",
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
                        <Typography variant="body2" gutterBottom>
                          🧑‍💼{" "}
                          <strong>
                            {s.instructor
                              ? `${s.instructor.name} ${s.instructor.last_name}`
                              : "Instructor no asignado"}
                          </strong>
                        </Typography>
                        {reservations
                          .filter((r) => r.schedule_id === s.id)
                          .map((r) => (
                            <Typography key={r.id} variant="body2">
                              🔖{" "}
                              <strong>
                                {r.status === 1
                                  ? "Pendiente de Confirmación"
                                  : r.status === 2
                                  ? "Reservación Confirmada"
                                  : r.status === 3
                                  ? "Reservación Cancelada"
                                  : r.status === 4
                                  ? "Reservación Realizada"
                                  : "Otro"}
                              </strong>
                            </Typography>
                          ))}
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
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
