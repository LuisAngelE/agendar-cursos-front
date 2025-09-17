import React, { useReducer } from "react";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import MethodGet, { MethodPost } from "../../config/service";
import tokenAuth from "../../config/TokenAuth";
import headerConfig from "../../config/imageHeaders";
import Swal from "sweetalert2";

import {
  OBTENER_USUARIO,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  REGISTRO_EXITOSO,
  SHOW_ERRORS_API,
  CERRAR_SESION,
  GET_USER_ME,
  USER_CHANGEPASSWORD,
  UPDATE_INFO,
} from "../../types";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    autenticado: false,
    usuario: {},
    User: {},
    user_me: null,
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
              title: "Error",
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

  const cerrarSesion = () => {
    Swal.fire({
      title: "¿Cerrar sesión?",
      text: "Se cerrará tu sesión actual",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("type_user");
        localStorage.removeItem("user_id");
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

  const UserMe = () => {
    let url = "/me";
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: GET_USER_ME,
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const ChangePasswordUser = (datos) => {
    let url = "/resetPassword";
    MethodPost(url, datos)
      .then((res) => {
        Swal.fire({
          title: "Contraseña",
          text: "Modificada Correctamente",
          icon: "success",
        });
        dispatch({
          type: USER_CHANGEPASSWORD,
        });
      })
      .catch((error) => {
        let mensaje = "Error desconocido";
        if (error.response) {
          if (error.response.status === 422 && error.response.data.errors) {
            const errores = error.response.data.errors;
            mensaje = Object.values(errores)[0][0];
          } else if (error.response.data.error) {
            mensaje = error.response.data.error;
          }
        }
        Swal.fire({
          title: "Error",
          icon: "warning",
          text: mensaje,
        });
        dispatch({
          type: SHOW_ERRORS_API,
        });
      });
  };

  const EditInfo = (data) => {
    let url = `/updateProfile`;
    MethodPost(url, data)
      .then((res) => {
        Swal.fire({
          title: "Informacion",
          text: "Modificada Correctamente",
          icon: "success",
        });
        dispatch({
          type: UPDATE_INFO,
          payload: res.data,
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          text: error.response.data.message,
          icon: "error",
        });
        dispatch({
          type: SHOW_ERRORS_API,
        });
      });
  };

  const ChangePhoto = (data) => {
    Swal.fire({
      title: "¿Estás seguro de que quieres agregar esta imagen?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.value) {
        const formData = new FormData();
        formData.append("image", data.image);
        let url = "/profile/image/update";
        MethodPost(url, formData, { headerConfig })
          .then((res) => {
            Swal.fire({
              title: "Foto",
              text: "Modificada Correctamente",
              icon: "success",
            }).then(() => {
              window.location.reload();
            });
          })
          .catch((error) => {
            Swal.fire({
              title: "Error",
              icon: "error",
              text: "Esta imagen no es compatible. Por favor, selecciona otra imagen.",
            });
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
        user_me: state.user_me,
        success: state.success,
        cargando: state.cargando,
        Register,
        iniciarSesion,
        usuarioAutenticado,
        cerrarSesion,
        UserMe,
        ChangePasswordUser,
        EditInfo,
        ChangePhoto,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
