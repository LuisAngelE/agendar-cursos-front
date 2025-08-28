import React, { useReducer } from "react";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import MethodGet, { MethodPost } from "../../config/service";
import tokenAuth from "../../config/TokenAuth";
import Swal from "sweetalert2";

import {
  OBTENER_USUARIO,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  REGISTRO_EXITOSO,
  SHOW_ERRORS_API,
  CERRAR_SESION,
} from "../../types";

const AuthState = (props) => {
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
        dispatch({
          type: OBTENER_USUARIO,
          payload: data,
        });
      })
      .catch((error) => {
        dispatch({
          type: LOGIN_ERROR,
        });
      });
  };

  const iniciarSesion = (datos) => {
    let url = "/login";
    MethodPost(url, datos)
      .then((res) => {
        dispatch({
          type: LOGIN_EXITOSO,
          payload: res.data,
        });
        usuarioAutenticado();
      })
      .catch((error) => {
        let mensaje = "Ocurrió un error inesperado";

        if (error.response && error.response.data) {
          const data = error.response.data;

          if (data.errors) {
            mensaje = Object.values(data.errors).flat().join("\n");
            Swal.fire({
              title: "Completa tus datos",
              icon: "warning",
              text: mensaje,
            });
          } else if (data.error) {
            mensaje = data.error + (data.message ? `: ${data.message}` : "");
            Swal.fire({
              title: "Credenciales incorrectas.",
              icon: "warning",
              text: mensaje,
            });
          }
        } else {
          Swal.fire({
            title: "Error",
            icon: "error",
            text: mensaje,
          });
        }
        dispatch({
          type: SHOW_ERRORS_API,
        });
      });
  };

  const Register = (datos) => {
    let url = "/register";
    MethodPost(url, datos)
      .then((res) => {
        const token = res.data.token;
        dispatch({
          type: REGISTRO_EXITOSO,
          payload: res.data,
        });
        Swal.fire({
          title: "¡Registro exitoso!",
          text: "Su cuenta ha sido creada correctamente.",
          icon: "success",
        });
        localStorage.setItem("token", token);
        usuarioAutenticado();
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
            title: "Completa tus Datos",
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

  const cerrarSesionn = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("type_user");

    dispatch({
      type: CERRAR_SESION,
    });

    window.location.reload();
  };

  const cerrarSesion = () => {
    Swal.fire({
      title: "¿Cerrar sesión?",
      text: "Se cerrará tu sesión actual",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("type_user");

        dispatch({
          type: CERRAR_SESION,
        });

        Swal.fire({
          title: "Sesión cerrada",
          text: "Has cerrado sesión correctamente",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          window.location.reload();
        });
      }
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
        cerrarSesion,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
