import React, { useReducer } from "react";
import UsuariosContext from "./UsuariosContext";
import UsuariosReducer from "./UsuariosReducer";
import MethodGet, {
  MethodDelete,
  MethodPost,
  MethodPut,
} from "../../config/service";
import Swal from "sweetalert2";
import {
  ADD_USERS,
  DELETE_USERS,
  GET_ALL_USERS,
  UPDATE_USERS,
  SHOW_ERRORS_API,
} from "../../types";
const UsuariosState = ({ children }) => {
  const initialState = {
    users: [],
    user: null,
    ErrorsApi: [],
    success: false,
  };
  const [state, dispatch] = useReducer(UsuariosReducer, initialState);

  const GetUsersFisicos = () => {
    MethodGet("/users/fisicas")
      .then((res) => {
        dispatch({
          type: GET_ALL_USERS,
          payload: res.data.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const GetUsersMorales = () => {
    MethodGet("/users/morales")
      .then((res) => {
        dispatch({
          type: GET_ALL_USERS,
          payload: res.data.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const GetInstructores = () => {
    MethodGet("/instructores")
      .then((res) => {
        dispatch({
          type: GET_ALL_USERS,
          payload: res.data.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const AddPersonaFisicas = (data) => {
    MethodPost("/store/fisicas", data)
      .then((res) => {
        dispatch({
          type: ADD_USERS,
          payload: res.data,
        });
        Swal.fire({
          title: "Listo",
          text: "Usuario agregado correctamente",
          icon: "success",
        });
        GetUsersFisicos();
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

  const AddPersonaMorales = (data) => {
    MethodPost("/store/morales", data)
      .then((res) => {
        dispatch({
          type: ADD_USERS,
          payload: res.data,
        });
        Swal.fire({
          title: "Listo",
          text: "Usuario agregado correctamente",
          icon: "success",
        });
        GetUsersMorales();
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

  const UpdateUserFisicas = (data) => {
    let url = `/update/fisicas/${data.id}`;
    MethodPost(url, data)
      .then((res) => {
        dispatch({
          type: UPDATE_USERS,
          payload: res.data,
        });
        Swal.fire({
          title: "Listo",
          text: "Usuario modificado correctamente",
          icon: "success",
        }).then(() => {
          window.location.reload();
        });
        GetUsersFisicos();
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
            title: "Completa los Datos",
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

  const UpdateUserMorales = (data) => {
    let url = `/update/morales/${data.id}`;
    MethodPost(url, data)
      .then((res) => {
        dispatch({
          type: UPDATE_USERS,
          payload: res.data,
        });
        Swal.fire({
          title: "Listo",
          text: "Usuario modificado correctamente",
          icon: "success",
        }).then(() => {
          window.location.reload();
        });
        GetUsersMorales();
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
            title: "Completa los Datos",
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

  const DeleteUsersFisicos = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "El usuario seleccionado será eliminado",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, volver",
    }).then((result) => {
      if (result.isConfirmed) {
        MethodDelete(`/users/${id}`)
          .then((res) => {
            Swal.fire({
              title: "Eliminada",
              text: res.data.message,
              icon: "success",
            });
            GetUsersFisicos();
            dispatch({
              type: DELETE_USERS,
              payload: id,
            });
          })
          .catch((error) => {
            Swal.fire({
              title: "Error",
              text: error.response?.data?.message || "Ocurrió un error",
              icon: "error",
            });
          });
      }
    });
  };

  const DeleteUsersMorales = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "El usuario seleccionado será eliminado",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, volver",
    }).then((result) => {
      if (result.isConfirmed) {
        MethodDelete(`/users/${id}`)
          .then((res) => {
            Swal.fire({
              title: "Eliminada",
              text: res.data.message,
              icon: "success",
            });
            GetUsersMorales();
            dispatch({
              type: DELETE_USERS,
              payload: id,
            });
          })
          .catch((error) => {
            Swal.fire({
              title: "Error",
              text: error.response?.data?.message || "Ocurrió un error",
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <UsuariosContext.Provider
      value={{
        users: state.users,
        user: state.user,
        ErrorsApi: state.ErrorsApi,
        success: state.success,
        GetUsersFisicos,
        GetUsersMorales,
        GetInstructores,
        DeleteUsersFisicos,
        DeleteUsersMorales,
        AddPersonaFisicas,
        UpdateUserFisicas,
        AddPersonaMorales,
        UpdateUserMorales,
      }}
    >
      {children}
    </UsuariosContext.Provider>
  );
};

export default UsuariosState;
