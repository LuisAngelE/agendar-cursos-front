import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Tooltip, Box, Typography } from "@mui/material";

moment.locale("es");
const localizer = momentLocalizer(moment);

export default function CalendarView({ fechas }) {
  console.log(fechas, "las fechas");
  const eventos = fechas.map((e) => ({
    id: e.id,
    title: e.event_type.toUpperCase(),
    start: moment(e.start_date, "YYYY-MM-DD HH:mm:ss").toDate(),
    end: e.end_date
      ? moment(e.end_date, "YYYY-MM-DD HH:mm:ss").toDate()
      : moment(e.start_date, "YYYY-MM-DD HH:mm:ss").add(1, "hours").toDate(),
    allDay: false,
    resource: e,
  }));

  const ComponenteEvento = ({ event }) => (
    <Tooltip
      title={
        <Box p={1} sx={{ minWidth: 200 }}>
          <Typography align="center" variant="subtitle2" sx={{ mb: 0.5 }}>
            {event.resource.event_type.toUpperCase()}
          </Typography>
          <Typography variant="body2" sx={{ mb: 0.5 }}>
            <b>Curso:</b> {event.resource.course_title}
          </Typography>
          <Typography variant="body2" sx={{ mb: 0.5 }}>
            <b>Cliente:</b> {event.resource.client_name}{" "}
            {event.resource.client_last_name}{" "}
            {event.resource.client_razon_social}
          </Typography>
          <Typography variant="body2" sx={{ mb: 0.5 }}>
            <b>Teléfono del cliente:</b> {event.resource.client_phone}
          </Typography>
          <Typography variant="body2" sx={{ mb: 0.5 }}>
            <b>Localidad:</b> {event.resource.state_name}{" "}
            {event.resource.municipality_name}
          </Typography>
          <Typography variant="body2" sx={{ mb: 0.5 }}>
            <b>Instructor:</b> {event.resource.instructor_name},{" "}
            {event.resource.instructor_last_name}
          </Typography>
          <Typography variant="body2">
            <b>Horario:</b> {event.resource.start_date}
          </Typography>
        </Box>
      }
      arrow
      placement="top"
    >
      <Box
        sx={{
          fontWeight: 600,
          fontSize: "0.85rem",
          color: "#fff",
          textAlign: "center",
          borderRadius: 1,
          p: "2px 4px",
          cursor: "pointer",
          whiteSpace: "nowrap",
        }}
      >
        {event.title}
      </Box>
    </Tooltip>
  );

  const obtenerEstiloEvento = (event) => {
    const gradientes = {
      curso: "linear-gradient(135deg, #42a5f5 0%, #1e88e5 100%)",
      demo: "linear-gradient(135deg, #ef5350 0%, #d32f2f 100%)",
    };
    const fondo =
      gradientes[event.resource.event_type] ||
      "linear-gradient(135deg, #66bb6a 0%, #388e3c 100%)";

    return {
      style: {
        background: fondo,
        borderRadius: "10px",
        padding: "4px 8px",
        fontSize: "0.85rem",
        fontWeight: 600,
        color: "#fff",
        boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
        transition: "transform 0.2s, box-shadow 0.2s",
        textAlign: "center",
      },
      onMouseEnter: (e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = "0 6px 10px rgba(0,0,0,0.25)";
      },
      onMouseLeave: (e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.2)";
      },
    };
  };

  return (
    <Box
      sx={{
        height: "700px",
        p: 2,
        bgcolor: "#f0f0f0",
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <Calendar
        localizer={localizer}
        events={eventos}
        startAccessor="start"
        endAccessor="end"
        views={["month", "week", "day"]}
        style={{ height: "650px" }}
        eventPropGetter={obtenerEstiloEvento}
        step={30}
        timeslots={2}
        components={{ event: ComponenteEvento }}
        messages={{
          next: "Siguiente",
          previous: "Anterior",
          today: "Hoy",
          month: "Mes",
          week: "Semana",
          day: "Día",
          agenda: "Agenda",
          date: "Fecha",
          time: "Hora",
          event: "Evento",
          allDay: "Todo el día",
        }}
      />
    </Box>
  );
}
