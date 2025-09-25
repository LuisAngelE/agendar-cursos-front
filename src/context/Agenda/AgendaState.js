import React, { useReducer } from "react";
import AgendaContext from "./AgendaContext";
import AgendaReducer from "./AgendaReducer";
import MethodGet, { MethodPost, MethodPut } from "../../config/service";
import Swal from "sweetalert2";
import {
  GET_ALL_AGENDAS,
  ADD_AGENDAS,
  ADD_INSTRUCTOR,
  ACCEPT_AGENDATION,
  CANCELED_AGENDATION,
  UPDATE_AGENDAS,
  RESCHEDULE,
  CLASS_DONE,
} from "../../types";
const AgendaState = ({ children }) => {
  const initialState = {
    agendas: [],
    agenda: null,
    ErrorsApi: [],
    success: false,
  };
  const [state, dispatch] = useReducer(AgendaReducer, initialState);

  const GetAgendas = (nombre = "", status = "", estado = "") => {
    let type_user = localStorage.getItem("type_user");
    let user_id = localStorage.getItem("user_id");
    if (type_user === "1") {
      let url = `/courseSchedule`;
      const params = new URLSearchParams();
      if (nombre.trim() !== "") params.append("nombre", nombre);
      if (status.trim() !== "") params.append("status", status);
      if (estado !== "") params.append("estado", estado);
      const queryString = params.toString();
      if (queryString) url += `?${queryString}`;
      MethodGet(url)
        .then((res) => {
          dispatch({
            type: GET_ALL_AGENDAS,
            payload: res.data,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (type_user === "2" || type_user === "3") {
      let url = `/indexTypeUserAgenda/${user_id}`;
      MethodGet(url)
        .then((res) => {
          dispatch({
            type: GET_ALL_AGENDAS,
            payload: res.data,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const AddAgendas = (data) => {
    MethodPost("/courseSchedule", data)
      .then((res) => {
        dispatch({
          type: ADD_AGENDAS,
          payload: res.data,
        });
        Swal.fire({
          title: "Tu solicitud ha sido registrada.",
          text: "Pronto será revisada y nos pondremos en contacto para informarte si el curso fue aprobado.",
          icon: "success",
        });
      })
      .catch((error) => {
        if (error.response?.data?.errors) {
          const errores = error.response.data.errors;
          const mensajes = Object.values(errores).flat().join("\n");

          Swal.fire({
            title: "Error",
            icon: "warning",
            text: mensajes,
          });
        } else if (error.response?.data?.error) {
          Swal.fire({
            title: "Error",
            icon: "warning",
            text: error.response.data.error,
          });
        } else {
          Swal.fire({
            title: "Error",
            icon: "error",
            text: "Ocurrió un error inesperado",
          });
        }
      });
  };

  const UpdateAgendas = (data) => {
    MethodPost(`/courseSchedule/${data.id}/edit`, data)
      .then((res) => {
        dispatch({
          type: UPDATE_AGENDAS,
          payload: res.data,
        });
        Swal.fire({
          title: "Tu solicitud ha sido actualizada.",
          text: "Pronto será revisada y nos pondremos en contacto para informarte si el curso fue aprobado.",
          icon: "success",
        });
        GetAgendas();
      })
      .catch((error) => {
        if (error.response?.data?.errors) {
          const errores = error.response.data.errors;
          const mensajes = Object.values(errores).flat().join("\n");

          Swal.fire({
            title: "Error",
            icon: "warning",
            text: mensajes,
          });
        } else if (error.response?.data?.error) {
          Swal.fire({
            title: "Error",
            icon: "warning",
            text: error.response.data.error,
          });
        } else {
          Swal.fire({
            title: "Error",
            icon: "error",
            text: "Ocurrió un error inesperado",
          });
        }
      });
  };

  const AddInstructor = (data) => {
    MethodPost(`/courses/${data.agenda_id}/assign-instructor`, data)
      .then((res) => {
        dispatch({
          type: ADD_INSTRUCTOR,
          payload: res.data,
        });
        Swal.fire({
          title: "Listo",
          text: "Instructor asignado correctamente al curso.",
          icon: "success",
        });
        GetAgendas();
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          const errores = error.response.data.errors;
          const mensajes = Object.values(errores).flat().join("\n");

          Swal.fire({
            title: "Error",
            icon: "warning",
            text: mensajes,
          });
        } else {
          Swal.fire({
            title: "Error",
            icon: "error",
            text: "Ocurrió un error inesperado",
          });
        }
      });
  };

  const AcceptAgendation = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿El curso seleccionado será reservado?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, aceptar",
      cancelButtonText: "No, aceptar",
    }).then((result) => {
      if (result.isConfirmed) {
        MethodPost(`/reservations/${id}/confirm`)
          .then((res) => {
            Swal.fire({
              title: "Agendado",
              text: res.data.mensaje,
              icon: "success",
            });
            GetAgendas();
            dispatch({
              type: ACCEPT_AGENDATION,
              payload: id,
            });
          })
          .catch((error) => {
            Swal.fire({
              title: "Error",
              text: error.response?.data?.mensaje || "Ocurrió un error",
              icon: "error",
            });
          });
      }
    });
  };

  const CanceledAgendation = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿El curso seleccionado será cancelado?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, aceptar",
      cancelButtonText: "No, aceptar",
    }).then((result) => {
      if (result.isConfirmed) {
        MethodPost(`/reservations/${id}/cancel`)
          .then((res) => {
            Swal.fire({
              title: "Cancelado",
              text: res.data.mensaje,
              icon: "success",
            });
            GetAgendas();
            dispatch({
              type: CANCELED_AGENDATION,
              payload: id,
            });
          })
          .catch((error) => {
            Swal.fire({
              title: "Error",
              text: error.response?.data?.mensaje || "Ocurrió un error",
              icon: "error",
            });
          });
      }
    });
  };

  const ClassDone = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿El curso seleccionado sea realizado?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, aceptar",
      cancelButtonText: "No, aceptar",
    }).then((result) => {
      if (result.isConfirmed) {
        MethodPost(`/reservations/${id}/served`)
          .then((res) => {
            Swal.fire({
              title: "Realizado",
              text: res.data.mensaje,
              icon: "success",
            });
            GetAgendas();
            dispatch({
              type: CLASS_DONE,
              payload: id,
            });
          })
          .catch((error) => {
            Swal.fire({
              title: "Error",
              text: error.response?.data?.mensaje || "Ocurrió un error",
              icon: "error",
            });
          });
      }
    });
  };

  const Reschedule = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿El curso seleccionado será reprogramado?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, aceptar",
      cancelButtonText: "No, aceptar",
    }).then((result) => {
      if (result.isConfirmed) {
        MethodPost(`/reservations/${id}/reschedule`)
          .then((res) => {
            Swal.fire({
              title: "Reprogramado",
              text: res.data.mensaje,
              icon: "success",
            });
            GetAgendas();
            dispatch({
              type: RESCHEDULE,
              payload: id,
            });
          })
          .catch((error) => {
            Swal.fire({
              title: "Error",
              text: error.response?.data?.mensaje || "Ocurrió un error",
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <AgendaContext.Provider
      value={{
        agendas: state.agendas,
        agenda: state.agenda,
        ErrorsApi: state.ErrorsApi,
        success: state.success,
        GetAgendas,
        AddAgendas,
        AddInstructor,
        AcceptAgendation,
        CanceledAgendation,
        UpdateAgendas,
        ClassDone,
        Reschedule,
      }}
    >
      {children}
    </AgendaContext.Provider>
  );
};

export default AgendaState;
