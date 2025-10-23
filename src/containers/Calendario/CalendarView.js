import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Tooltip, Box, Typography } from "@mui/material";

moment.locale("es");
const localizer = momentLocalizer(moment);

export default function CalendarView({ fechas }) {
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

  const statusText = {
    1: "Pendiente de confirmación",
    2: "Confirmada",
    3: "Cancelada",
    4: "Realizada",
  };

  const statusColor = {
    1: "#ffb74d",
    2: "#66bb6a",
    3: "#e57373",
    4: "#42a5f5",
  };

  const ComponenteEvento = ({ event }) => (
    <Tooltip
      title={
        <Box p={1} sx={{ minWidth: 200 }}>
          <Typography align="center" variant="subtitle2" sx={{ mb: 0.5 }}>
            {event.resource.event_type.toUpperCase()}
          </Typography>

          {event.resource.event_type === "demo" ? (
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              <b>Instructor:</b>{" "}
              {event.resource.instructor_name ? (
                `${event.resource.instructor_name} ${event.resource.instructor_last_name}`
              ) : (
                <span style={{ color: "red" }}>No asignado</span>
              )}
            </Typography>
          ) : (
            <>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                <b>Curso:</b> {event.resource.course_title}
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                <b>
                  {event.resource.client_razon_social ? "Empresa:" : "Cliente:"}
                </b>{" "}
                {event.resource.client_razon_social
                  ? event.resource.client_razon_social
                  : `${event.resource.client_name} ${event.resource.client_last_name}`}
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                <b>Contacto:</b> {event.resource.client_phone}
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                <b>Localidad:</b> {event.resource.state_name}{" "}
                {event.resource.municipality_name}
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                <b>Instructor:</b>{" "}
                {event.resource.instructor_name ? (
                  `${event.resource.instructor_name} ${event.resource.instructor_last_name}`
                ) : (
                  <span style={{ color: "red" }}>No asignado</span>
                )}
              </Typography>
              <Typography variant="body2">
                <b>Estatus:</b>{" "}
                <span
                  style={{
                    color: statusColor[event.resource.course_status] || "black",
                  }}
                >
                  {statusText[event.resource.course_status] || "Desconocido"}
                </span>
              </Typography>
            </>
          )}
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
    const cursoGradientes = {
      1: "linear-gradient(135deg, orange 0%, #ffb74d 100%)",
      2: "linear-gradient(135deg, green 0%, #66bb6a 100%)",
      3: "linear-gradient(135deg, red 0%, #e57373 100%)",
      4: "linear-gradient(135deg, blue 0%, #42a5f5 100%)",
    };

    const demoGradiente =
      "linear-gradient(135deg, #cc00ffff 0%, #cc00ffff 100%)";

    const fondo =
      event.resource.event_type === "demo"
        ? demoGradiente
        : cursoGradientes[event.resource.course_status] ||
          "linear-gradient(135deg, #ccc 0%, #999 100%)";

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
