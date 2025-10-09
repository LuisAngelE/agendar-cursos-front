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
  GET_ALL_AGENDAS_COUNT,
} from "../../types";
const AgendaState = ({ children }) => {
  const initialState = {
    agendas: [],
    agenda: null,
    agendasCount: [],
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

  const GetAgendasCount = () => {
    let type_user = localStorage.getItem("type_user");
    let user_id = localStorage.getItem("user_id");
    if (type_user === "1") {
      let url = `/indexCount`;
      MethodGet(url)
        .then((res) => {
          dispatch({
            type: GET_ALL_AGENDAS_COUNT,
            payload: res.data,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (type_user === "2" || type_user === "3") {
      let url = `/indexTypeUserAgendaCount/${user_id}`;
      MethodGet(url)
        .then((res) => {
          dispatch({
            type: GET_ALL_AGENDAS_COUNT,
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
      cancelButtonText: "No, volver",
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

  const CanceledAgendation = async (id) => {
    const { value: reason } = await Swal.fire({
      title: "¿Estás seguro?",
      text: "El curso seleccionado será cancelado. Por favor, indica la razón:",
      icon: "question",
      input: "textarea",
      inputPlaceholder: "Escribe aquí la razón de la cancelación...",
      inputAttributes: {
        "aria-label": "Razón de cancelación",
      },
      showCancelButton: true,
      confirmButtonText: "Sí, cancelar",
      cancelButtonText: "No, volver",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",

      customClass: {
        popup: "swal-custom-font",
        input: "swal-custom-font",
      },

      preConfirm: (value) => {
        if (!value) {
          Swal.showValidationMessage("Debes ingresar una razón");
        }
        return value;
      },
    });

    if (reason) {
      MethodPost(`/reservations/${id}/cancel`, { motivo: reason })
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
      cancelButtonText: "No, volver",
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
      cancelButtonText: "No, volver",
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
        agendasCount: state.agendasCount,
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
        GetAgendasCount,
      }}
    >
      {children}
    </AgendaContext.Provider>
  );
};

export default AgendaState;
