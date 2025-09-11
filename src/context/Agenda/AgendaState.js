import React, { useReducer } from "react";
import AgendaContext from "./AgendaContext";
import AgendaReducer from "./AgendaReducer";
import MethodGet, {
  MethodPost,
  MethodPut,
  MethodDelete,
} from "../../config/service";
import Swal from "sweetalert2";
import { GET_ALL_AGENDAS, ADD_AGENDAS } from "../../types";
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
      let url = `/courseSchedule/${user_id}`;
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

  return (
    <AgendaContext.Provider
      value={{
        agendas: state.agendas,
        agenda: state.agenda,
        ErrorsApi: state.ErrorsApi,
        success: state.success,
        GetAgendas,
        AddAgendas,
      }}
    >
      {children}
    </AgendaContext.Provider>
  );
};

export default AgendaState;
