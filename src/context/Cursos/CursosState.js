import React, { useReducer } from "react";
import CursosContext from "./CursosContext";
import CursosReducer from "./CursosReducer";
import MethodGet, {
  MethodPost,
  MethodPut,
  MethodDelete,
} from "../../config/service";
import Swal from "sweetalert2";
import { GET_ALL_CURSOS, SHOW_ERRORS_API } from "../../types";
const CursosState = ({ children }) => {
  const initialState = {
    cursos: [],
    curso: null,
    ErrorsApi: [],
    success: false,
  };
  const [state, dispatch] = useReducer(CursosReducer, initialState);

  const GetCursos = () => {
    MethodGet("/course")
      .then((res) => {
        dispatch({
          type: GET_ALL_CURSOS,
          payload: res.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <CursosContext.Provider
      value={{
        cursos: state.cursos,
        curso: state.curso,
        ErrorsApi: state.ErrorsApi,
        success: state.success,
        GetCursos,
      }}
    >
      {children}
    </CursosContext.Provider>
  );
};

export default CursosState;
