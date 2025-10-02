import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import MethodGet from "../../config/service";
import {
  Grid,
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  Chip,
  Paper,
  Avatar,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function VistaAgenda(props) {
  const { id } = props.match.params;
  const [agenda, setAgenda] = useState(null);

  useEffect(() => {
    let url = `/courseSchedule/${id}`;
    MethodGet(url)
      .then((res) => {
        setAgenda(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  if (!agenda) {
    return <Layout>Cargando...</Layout>;
  }

  return (
    <Layout>
      <Grid container justifyContent="center" sx={{ mt: 4, px: 2 }}>
        <Grid item xs={12} md={8} lg={6}>
          <Card sx={{ borderRadius: 3, boxShadow: 6 }}>
            <CardContent>
              {/* Título */}
              <Typography variant="h4" gutterBottom fontWeight="bold">
                {agenda.course?.title}
              </Typography>
              <Chip
                label={agenda.course?.modality}
                color="primary"
                size="small"
                sx={{ mb: 2 }}
              />

              {/* Descripción */}
              <Typography
                variant="body1"
                color="text.secondary"
                gutterBottom
                sx={{ mb: 2 }}
              >
                {agenda.course?.description}
              </Typography>

              <Divider sx={{ my: 2 }} />

              {/* Info general */}
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <EventIcon color="primary" />
                    <Typography variant="body2">
                      {new Date(agenda.start_date).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <AccessTimeIcon color="primary" />
                    <Typography variant="body2">
                      {new Date(agenda.start_date).toLocaleTimeString()}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <SchoolIcon color="primary" />
                    <Typography variant="body2">
                      Duración: {agenda.course?.duration}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <PersonIcon color="primary" />
                    <Typography variant="body2">
                      {agenda.instructor?.name} {agenda.instructor?.last_name}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <LocationOnIcon color="primary" />
                    <Typography variant="body2">
                      {agenda.location}, {agenda.municipality?.name},{" "}
                      {agenda.state?.name}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              {/* Reservaciones */}
              <Typography variant="h6" gutterBottom fontWeight="medium">
                Reservaciones
              </Typography>

              {agenda.reservations?.length > 0 ? (
                agenda.reservations.map((res) => (
                  <Paper
                    key={res.id}
                    elevation={2}
                    sx={{
                      p: 2,
                      mb: 2,
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Avatar>{res.student?.name?.charAt(0)}</Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight="medium">
                        {res.student?.name} {res.student?.last_name}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        noWrap
                      >
                        {res.student?.email}
                      </Typography>
                    </Box>
                  </Paper>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Aún no hay reservaciones.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}
