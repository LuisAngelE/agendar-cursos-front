import React, { useReducer } from "react";
import CategoriasContext from "./CategoriasContext";
import CategoriasReducer from "./CategoriasReducer";
import MethodGet, {
  MethodPost,
  MethodPut,
  MethodDelete,
} from "../../config/service";
import Swal from "sweetalert2";
import {
  GET_ALL_CATEGORIAS,
  ADD_CATEGORIAS,
  UPDATE_CATEGORIAS,
  DELETE_CATEGORIAS,
} from "../../types";
const CategoriasState = ({ children }) => {
  const initialState = {
    categorias: [],
    categoria: null,
    ErrorsApi: [],
    success: false,
  };
  const [state, dispatch] = useReducer(CategoriasReducer, initialState);

  const GetCategories = () => {
    MethodGet("/categories")
      .then((res) => {
        dispatch({
          type: GET_ALL_CATEGORIAS,
          payload: res.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const AddCategorias = (data) => {
    MethodPost("/categories", data)
      .then((res) => {
        dispatch({
          type: ADD_CATEGORIAS,
          payload: res.data,
        });
        Swal.fire({
          title: "Éxito",
          text: "Categoría agregada con éxito",
          icon: "success",
        });
        GetCategories();
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

  const UpdateCategorias = (data) => {
    MethodPut(`/categories/${data.id}`, data)
      .then((res) => {
        dispatch({
          type: UPDATE_CATEGORIAS,
          payload: res.data,
        });
        Swal.fire({
          title: "Éxito",
          text: "Categoría actualizada con éxito",
          icon: "success",
        });
        GetCategories();
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

  const DeleteCategorias = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "La categoría seleccionada será eliminada",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, volver",
    }).then((result) => {
      if (result.isConfirmed) {
        MethodDelete(`/categories/${id}`)
          .then((res) => {
            Swal.fire({
              title: "Eliminado",
              text: res.data.mensaje,
              icon: "success",
            });
            GetCategories();
            dispatch({
              type: DELETE_CATEGORIAS,
              payload: id,
            });
          })
          .catch((error) => {
            Swal.fire({
              title: "Error",
              text: error.response?.data?.mensaje || "Ocurrió un error",
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <CategoriasContext.Provider
      value={{
        categorias: state.categorias,
        categoria: state.categoria,
        ErrorsApi: state.ErrorsApi,
        success: state.success,
        GetCategories,
        AddCategorias,
        UpdateCategorias,
        DeleteCategorias,
      }}
    >
      {children}
    </CategoriasContext.Provider>
  );
};

export default CategoriasState;
