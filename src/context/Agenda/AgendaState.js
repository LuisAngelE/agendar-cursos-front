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
    MethodGet("/courseSchedule")
      .then((res) => {
        dispatch({
          type: GET_ALL_AGENDAS,
          payload: res.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const AddAgendas = (data) => {
    MethodPost("/courseSchedule", data)
      .then((res) => {
        dispatch({
          type: ADD_AGENDAS,
          payload: res.data,
        });
        Swal.fire({
          title: "Listo",
          text: "Agenda agregada con éxito",
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
