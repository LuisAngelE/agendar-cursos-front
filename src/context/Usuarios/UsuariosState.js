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

  const GetUsers = () => {
    MethodGet("/users")
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

  const AddUser = (data) => {
    MethodPost("/users", data)
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
        GetUsers();
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

  const UpdateUser = (data) => {
    let url = `/users/${data.id}`;
    MethodPut(url, data)
      .then((res) => {
        dispatch({
          type: UPDATE_USERS,
          payload: res.data,
        });
        Swal.fire({
          title: "Usuario modificada",
          text: res.data.message,
          icon: "success",
        }).then (() => {
          window.location.reload();
        });
        GetUsers();
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

  const DeleteUsers = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "El usuario seleccionado será eliminado",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        MethodDelete(`/users/${id}`)
          .then((res) => {
            Swal.fire({
              title: "Eliminada",
              text: res.data.message,
              icon: "success",
            });
            dispatch({
              type: DELETE_USERS,
              payload: id,
            });
            GetUsers();
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
        GetUsers,
        DeleteUsers,
        AddUser,
        UpdateUser,
      }}
    >
      {children}
    </UsuariosContext.Provider>
  );
};

export default UsuariosState;
