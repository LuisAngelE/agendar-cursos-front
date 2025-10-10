import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale("es");
const localizer = momentLocalizer(moment);

const messages = {
  allDay: "Todo el día",
  previous: "Anterior",
  next: "Siguiente",
  today: "Hoy",
  month: "Mes",
  week: "Semana",
  day: "Día",
  agenda: "Agenda",
  date: "Fecha",
  time: "Hora",
  event: "Evento",
  noEventsInRange: "No hay eventos en este rango",
  showMore: (total) => `+ Ver más (${total})`,
};

export default function CalendarView({ fechas }) {
  const events = fechas.map((e) => ({
    id: e.id,
    title: e.event_type.toUpperCase(),
    start: moment(e.start_date, "YYYY-MM-DD HH:mm:ss").toDate(),
    end: e.end_date
      ? moment(e.end_date, "YYYY-MM-DD HH:mm:ss").toDate()
      : moment(e.start_date, "YYYY-MM-DD HH:mm:ss").add(1, "hours").toDate(), 
    allDay: false,
    resource: e,
  }));

  return (
    <div style={{ height: "700px", padding: "20px" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={["month", "week", "day"]}
        messages={messages}
        style={{ height: 650 }}
        eventPropGetter={(event) => {
          let backgroundColor =
            event.resource.event_type === "curso" ? "#1976d2" : "#d32f2f";
          return { style: { backgroundColor, color: "white" } };
        }}
        step={30} 
        timeslots={2} 
      />
    </div>
  );
}
