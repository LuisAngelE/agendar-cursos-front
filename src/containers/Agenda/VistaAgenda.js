import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import MethodGet from "../../config/service";
import { Grid, Box, Card, CardContent, Typography, Paper } from "@mui/material";
import {
  Event as EventIcon,
  AccessTime as AccessTimeIcon,
  School as SchoolIcon,
  LocationOn as LocationOnIcon,
  Category as CategoryIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Cancel as CancelIcon,
  Email as EmailIcon,
  Place as PlaceIcon,
  AssignmentTurnedIn as AssignmentTurnedInIcon,
  Title as TitleIcon,
  Description as DescriptionIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";

export default function VistaAgenda(props) {
  const { id } = props.match.params;
  const [agenda, setAgenda] = useState(null);

  useEffect(() => {
    MethodGet(`/courseSchedule/${id}`)
      .then((res) => setAgenda(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!agenda) return <Layout>Cargando...</Layout>;

  const statusMap = {
    1: "Pendiente de Confirmación",
    2: "Reservación Confirmada",
    3: "Reservación Cancelada",
    4: "Reservación Realizada",
  };

  return (
    <Layout>
      <Grid container spacing={3} sx={{ mt: 4, px: 2 }}>
        <Grid item xs={12} sm={12} md={6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderLeft: "6px solid #66bb6a",
                backgroundColor: "#f3fcf5",
                borderRadius: 2,
              }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
                sx={{ color: "#2e7d32" }}
              >
                <EventIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                Detalle de la reservación
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="body2"
                    sx={{ mb: 1, display: "flex", alignItems: "center" }}
                  >
                    <EventIcon
                      fontSize="small"
                      sx={{ mr: 1, color: "primary.main" }}
                    />
                    <b>Fecha solicitada:</b>
                  </Typography>
                  <Box sx={{ pl: 3 }}>
                    <Typography variant="body2">
                      {new Date(agenda.start_date).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2">
                      {new Date(agenda.start_date).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="body2"
                    sx={{ mb: 1, display: "flex", alignItems: "center" }}
                  >
                    <LocationOnIcon
                      fontSize="small"
                      sx={{ mr: 1, color: "primary.main" }}
                    />
                    <b>Ubicación:</b>
                  </Typography>
                  <Box sx={{ pl: 3 }}>
                    <Typography variant="body2">
                      {agenda.state?.name} {agenda.municipality?.name}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="body2"
                    sx={{ mb: 1, display: "flex", alignItems: "center" }}
                  >
                    <PersonIcon
                      fontSize="small"
                      sx={{ mr: 1, color: "primary.main" }}
                    />
                    <b>Estatus:</b>
                  </Typography>
                  <Box sx={{ pl: 3 }}>
                    <Typography variant="body2">
                      {agenda.reservations?.length > 0
                        ? statusMap[agenda.reservations[0].status]
                        : "Sin reservación"}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="body2"
                    sx={{ mb: 1, display: "flex", alignItems: "center" }}
                  >
                    <AccessTimeIcon
                      fontSize="small"
                      sx={{ mr: 1, color: "primary.main" }}
                    />
                    <b>Registro:</b>
                  </Typography>
                  <Box sx={{ pl: 3 }}>
                    <Typography variant="body2">
                      {new Date(agenda.created_at).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2">
                      {new Date(agenda.created_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="body2"
                    sx={{ mb: 1, display: "flex", alignItems: "center" }}
                  >
                    <PersonIcon
                      fontSize="small"
                      sx={{ mr: 1, color: "primary.main" }}
                    />
                    <b>Solicitante:</b>
                  </Typography>
                  <Box sx={{ pl: 3 }}>
                    {agenda.reservations?.length > 0 ? (
                      <>
                        <Typography variant="body2">
                          {agenda.reservations[0].student?.name}{" "}
                          {agenda.reservations[0].student?.last_name}
                        </Typography>
                        <Typography variant="body2">
                          {agenda.reservations[0].student?.phone}
                        </Typography>
                        <Typography variant="body2">
                          {agenda.reservations[0].student?.email}
                        </Typography>
                      </>
                    ) : (
                      <Typography variant="body2" color="text.disabled">
                        No registrado
                      </Typography>
                    )}
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="body2"
                    sx={{ mb: 1, display: "flex", alignItems: "center" }}
                  >
                    <SchoolIcon
                      fontSize="small"
                      sx={{ mr: 1, color: "primary.main" }}
                    />
                    <b>Instructor:</b>
                  </Typography>
                  <Box sx={{ pl: 3 }}>
                    {agenda.instructor ? (
                      <>
                        <Typography variant="body2">
                          {agenda.instructor.name} {agenda.instructor.last_name}
                        </Typography>
                        <Typography variant="body2">
                          {agenda.instructor.phone}
                        </Typography>
                        <Typography variant="body2">
                          {agenda.instructor.email}
                        </Typography>
                      </>
                    ) : (
                      <Typography variant="body2" color="text.disabled">
                        No asignado
                      </Typography>
                    )}
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  {agenda.reservations[0]?.status === 3 && (
                    <Box sx={{ pl: 3, color: "error.main" }}>
                      <Typography variant="body2">
                        <CancelIcon sx={{ mr: 1 }} />
                        Motivo de cancelación:
                      </Typography>
                      <Typography variant="body2">
                        {agenda.reservations[0].cancellation_reason}
                      </Typography>
                    </Box>
                  )}
                </Grid>
              </Grid>
            </Paper>
          </motion.div>
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderLeft: "6px solid #42a5f5",
                backgroundColor: "#f3f8fe",
                borderRadius: 2,
              }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
                sx={{ color: "#1565c0" }}
              >
                <SchoolIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                Información del curso
              </Typography>

              <Typography
                variant="body1"
                sx={{ mb: 1, display: "flex", alignItems: "center" }}
              >
                <TitleIcon
                  fontSize="small"
                  sx={{ mr: 1, color: "primary.main" }}
                />
                <b>Título:</b>
              </Typography>
              <Box sx={{ pl: 3 }}>{agenda.course?.title}</Box>

              <Typography
                variant="body1"
                sx={{ mb: 1, display: "flex", alignItems: "center" }}
              >
                <DescriptionIcon
                  fontSize="small"
                  sx={{ mr: 1, color: "primary.main" }}
                />
                <b>Descripción:</b>
              </Typography>
              <Box sx={{ pl: 3 }}>{agenda.course?.description}</Box>

              <Typography
                variant="body1"
                sx={{ mb: 1, display: "flex", alignItems: "center" }}
              >
                <AccessTimeIcon
                  fontSize="small"
                  sx={{ mr: 1, color: "primary.main" }}
                />
                <b>Duración:</b>
              </Typography>
              <Box sx={{ pl: 3 }}>{agenda.course?.duration}</Box>

              <Typography
                variant="body1"
                sx={{ mb: 1, display: "flex", alignItems: "center" }}
              >
                <CategoryIcon
                  fontSize="small"
                  sx={{ mr: 1, color: "primary.main" }}
                />
                <b>Categoría:</b>
              </Typography>
              <Box sx={{ pl: 3 }}>{agenda.course?.category?.name}</Box>

              <Typography
                variant="body1"
                sx={{ mb: 1, display: "flex", alignItems: "center" }}
              >
                <PersonIcon
                  fontSize="small"
                  sx={{ mr: 1, color: "primary.main" }}
                />
                <b>Propietario:</b>
              </Typography>
              <Box sx={{ pl: 3 }}>
                {agenda.course?.user?.razon_social ||
                  `${agenda.course?.user?.name || ""} ${
                    agenda.course?.user?.last_name || ""
                  }`}
              </Box>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
    </Layout>
  );
}
