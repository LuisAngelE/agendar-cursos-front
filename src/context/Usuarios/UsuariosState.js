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
  GET_ALL_USERS_FISICOS,
  GET_ALL_USERS_MORALES,
  UPDATE_USERS,
  GET_ALL_CLIENTS,
  SHOW_ERRORS_API,
} from "../../types";
const UsuariosState = ({ children }) => {
  const initialState = {
    users: [],
    usersFisicos: [],
    usersMorales: [],
    clients: [],
    user: null,
    ErrorsApi: [],
    success: false,
  };
  const [state, dispatch] = useReducer(UsuariosReducer, initialState);

  const handleError = (error) => {
    const data = error.response?.data;

    if (data?.errors) {
      const mensajes = Object.values(data.errors).flat().join("\n");
      Swal.fire({
        title: "Error de validación",
        icon: "warning",
        text: mensajes,
      });
    } else if (data?.mensaje || data?.error) {
      Swal.fire({
        title: data.error || "Error",
        icon: "error",
        text: data.mensaje || data.error,
      });
    } else {
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "Ocurrió un error inesperado",
      });
    }
  };

  const GetUsersFisicos = () => {
    let user_id = localStorage.getItem("user_id");
    MethodGet(`/users/fisicas/${user_id}`)
      .then((res) => {
        dispatch({
          type: GET_ALL_USERS_FISICOS,
          payload: res.data.data,
        });
      })
      .catch(handleError);
  };

  const GetUsersMorales = () => {
    let user_id = localStorage.getItem("user_id");
    MethodGet(`/users/morales/${user_id}`)
      .then((res) => {
        dispatch({
          type: GET_ALL_USERS_MORALES,
          payload: res.data.data,
        });
      })
      .catch(handleError);
  };

  const GetInstructores = () => {
    let user_id = localStorage.getItem("user_id");
    MethodGet(`/instructores/${user_id}`)
      .then((res) => {
        dispatch({
          type: GET_ALL_USERS,
          payload: res.data.data,
        });
      })
      .catch(handleError);
  };

  const GetClients = () => {
    let user_id = localStorage.getItem("user_id");
    MethodGet(`/users/clients/${user_id}`)
      .then((res) => {
        dispatch({
          type: GET_ALL_CLIENTS,
          payload: res.data.data,
        });
      })
      .catch(handleError);
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
      .catch(handleError);
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
      .catch(handleError);
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
      .catch(handleError);
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
      .catch(handleError);
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
          .catch(handleError);
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
          .catch(handleError);
      }
    });
  };

  return (
    <UsuariosContext.Provider
      value={{
        users: state.users,
        usersFisicos: state.usersFisicos,
        usersMorales: state.usersMorales,
        clients: state.clients,
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
        GetClients,
      }}
    >
      {children}
    </UsuariosContext.Provider>
  );
};

export default UsuariosState;
