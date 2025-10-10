import React, { useReducer } from "react";
import CalendarioContext from "./CalendarioContext";
import CalendarioReducer from "./CalendarioReducer";
import MethodGet from "../../config/service";
import { GET_ALL_CALENDARIO } from "../../types";
const CalendarioState = ({ children }) => {
  const initialState = {
    fechas: [],
    fecha: null,
    ErrorsApi: [],
    success: false,
  };
  const [state, dispatch] = useReducer(CalendarioReducer, initialState);

  const GetFechas = () => {
    let type_user = localStorage.getItem("type_user");
    let user_id = localStorage.getItem("user_id");
    let url =
      type_user === "2" || type_user === "3"
        ? `/course-schedules/dates/${user_id}`
        : "/course-schedules/dates";
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: GET_ALL_CALENDARIO,
          payload: res.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <CalendarioContext.Provider
      value={{
        fechas: state.fechas,
        fecha: state.fecha,
        ErrorsApi: state.ErrorsApi,
        success: state.success,
        GetFechas,
      }}
    >
      {children}
    </CalendarioContext.Provider>
  );
};

export default CalendarioState;
