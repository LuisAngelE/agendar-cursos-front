import React, { useReducer } from "react";
import CursosPublicosContext from "./CursosPublicosContext";
import CursosPublicosReducer from "./CursosPublicosReducer";
import MethodGet from "../../config/service";
import { GET_ALL_CURSOS_PUBLICOS } from "../../types";
const CursosPublicosState = ({ children }) => {
  const initialState = {
    cursosPublicos: [],
    curso: null,
    ErrorsApi: [],
    success: false,
  };
  const [state, dispatch] = useReducer(CursosPublicosReducer, initialState);

  const GetCursosPublicos = () => {
    MethodGet("/coursePublic")
      .then((res) => {
        dispatch({
          type: GET_ALL_CURSOS_PUBLICOS,
          payload: res.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <CursosPublicosContext.Provider
      value={{
        cursosPublicos: state.cursosPublicos,
        curso: state.curso,
        ErrorsApi: state.ErrorsApi,
        success: state.success,
        GetCursosPublicos,
      }}
    >
      {children}
    </CursosPublicosContext.Provider>
  );
};

export default CursosPublicosState;
