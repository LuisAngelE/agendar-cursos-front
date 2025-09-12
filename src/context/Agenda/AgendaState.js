import React, { useReducer } from "react";
import AgendaContext from "./AgendaContext";
import AgendaReducer from "./AgendaReducer";
import MethodGet, {
  MethodPost,
  MethodPut,
  MethodDelete,
} from "../../config/service";
import Swal from "sweetalert2";
import {
  GET_ALL_AGENDAS,
  ADD_AGENDAS,
  ADD_INSTRUCTOR,
  ACCEPT_AGENDATION,
  CANCELED_AGENDATION,
  UPDATE_AGENDAS,
} from "../../types";
const AgendaState = ({ children }) => {
  const initialState = {
    agendas: [],
    agenda: null,
    ErrorsApi: [],
    success: false,
  };
  const [state, dispatch] = useReducer(AgendaReducer, initialState);

  const GetAgendas = () => {
    let type_user = localStorage.getItem("type_user");
    let user_id = localStorage.getItem("user_id");
    if (type_user === "1") {
      let url = `/courseSchedule`;
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
      text: "¿El curso agendado será aceptado?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, agendar",
      cancelButtonText: "No, agendar",
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
      text: "¿El curso agendado será cancelado?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cancelar",
      cancelButtonText: "No, cancelar",
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

  const DeleteAgendation = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿El curso agendado será eliminado?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        MethodDelete(`/courseSchedule/${id}`)
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
        DeleteAgendation,
      }}
    >
      {children}
    </AgendaContext.Provider>
  );
};

export default AgendaState;
