import React, { useReducer } from "react";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import MethodGet, { MethodPost, MethodPut } from "../../config/service";
import headerConfig from "../../config/imageHeaders";
import { useTranslation } from "react-i18next";

import tokenAuth from "../../config/TokenAuth";

import { SHOW_ERRORS_API, types } from "../../types";

import Swal from "sweetalert2";

const AuthState = (props) => {
  const { t } = useTranslation();

  const initialState = {
    token: localStorage.getItem("token"),
    autenticado: false,
    usuario: {},
    User: {},
    cargando: true,
    success: false,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);
  const usuarioAutenticado = async (datos) => {
    const token = localStorage.getItem("token");

    if (token) {
      tokenAuth(token);
    }

    MethodGet("/user")
      .then(({ data }) => {
        localStorage.setItem("type_user", data.type_user);
        localStorage.setItem("user_id", data.id);
        dispatch({
          type: types.OBTENER_USUARIO,
          payload: data,
        });
      })
      .catch((error) => {
        dispatch({
          type: types.LOGIN_ERROR,
        });
      });
  };

  const iniciarSesion = (datos) => {
    let url = "/login";
    MethodPost(url, datos)
      .then((res) => {
        dispatch({
          type: types.LOGIN_EXITOSO,
          payload: res.data,
        });
        usuarioAutenticado();
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          icon: "error",
          text: error.response.data.message,
        });
        dispatch({
          type: SHOW_ERRORS_API,
        });
      });
  };

  const Register = (datos) => {
    let url = "/register";
    MethodPost(url, datos)
      .then((res) => {
        dispatch({
          type: types.REGISTRO_EXITOSO,
          payload: res.data.data,
        });
        Swal.fire({
          title: "Registro Exitoso",
          text: "Se creo su cuenta correctamente",
          icon: "success",
        });
      })
      .catch((error) => {
        let errorMessage = "Error al procesar la solicitud";
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          errorMessage = error.response.data.message;
        }
        Swal.fire({
          title: "Error",
          icon: "error",
          text: errorMessage,
        });
        dispatch({
          type: SHOW_ERRORS_API,
        });
      });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        success: state.success,
        cargando: state.cargando,

        Register,
        iniciarSesion,
        usuarioAutenticado,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
