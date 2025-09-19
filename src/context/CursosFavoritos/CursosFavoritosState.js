import React, { useReducer } from "react";
import CursosFavoritosContext from "./CursosFavoritosContext";
import CursosFavoritosReducer from "./CursosFavoritosReducer";
import MethodGet, { MethodPost, MethodDelete } from "../../config/service";
import {
  GET_ALL_CURSOS_FAVORITOS,
} from "../../types";

const CursosFavoritosState = ({ children }) => {
  const initialState = {
    cursos: [],
    curso: null,
    ErrorsApi: [],
    success: false,
  };

  const [state, dispatch] = useReducer(CursosFavoritosReducer, initialState);

  const GetCursosFavoritos = () => {
    MethodGet("/favorites")
      .then((res) => {
        dispatch({
          type: GET_ALL_CURSOS_FAVORITOS,
          payload: res.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <CursosFavoritosContext.Provider
      value={{
        cursos: state.cursos,
        curso: state.curso,
        ErrorsApi: state.ErrorsApi,
        success: state.success,
        GetCursosFavoritos,
      }}
    >
      {children}
    </CursosFavoritosContext.Provider>
  );
};

export default CursosFavoritosState;
