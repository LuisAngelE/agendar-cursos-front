import React, { useReducer } from "react";
import CursosContext from "./CursosContext";
import CursosReducer from "./CursosReducer";
import headerConfig from "../../config/imageHeaders";
import MethodGet, {
  MethodPost,
  MethodPut,
  MethodDelete,
} from "../../config/service";
import Swal from "sweetalert2";
import {
  GET_ALL_CURSOS,
  ADD_CURSOS,
  UPDATE_CURSOS,
  DELETE_CURSOS,
  ADD_CURSO_FAVORITO,
  DELETE_CURSO_FAVORITO,
} from "../../types";
const CursosState = ({ children }) => {
  const initialState = {
    cursos: [],
    curso: null,
    ErrorsApi: [],
    success: false,
  };
  const [state, dispatch] = useReducer(CursosReducer, initialState);

  const GetCursos = (nombre = "", category_id = "") => {
    let type_user = localStorage.getItem("type_user");
    let user_id = localStorage.getItem("user_id");
    if (type_user === "1" || type_user === "3") {
      let url = "/course";
      const params = new URLSearchParams();
      if (nombre.trim() !== "") params.append("nombre", nombre);
      if (category_id !== "") params.append("category_id", category_id);
      const queryString = params.toString();
      if (queryString) url += `?${queryString}`;
      MethodGet(url)
        .then((res) => {
          dispatch({
            type: GET_ALL_CURSOS,
            payload: res.data,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (type_user === "2") {
      let url = `/indexTypeUserCourse/${user_id}`;
      const params = new URLSearchParams();
      if (nombre.trim() !== "") params.append("nombre", nombre);
      if (category_id !== "") params.append("category_id", category_id);
      const queryString = params.toString();
      if (queryString) url += `?${queryString}`;
      MethodGet(url)
        .then((res) => {
          dispatch({
            type: GET_ALL_CURSOS,
            payload: res.data,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const AddCursos = (data) => {
    MethodPost("/course", data)
      .then((res) => {
        dispatch({
          type: ADD_CURSOS,
          payload: res.data,
        });
        Swal.fire({
          title: "Listo",
          text: "Curso agregado con éxito",
          icon: "success",
        });
        GetCursos();
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

  const UpdateCursos = (data) => {
    MethodPut(`/course/${data.id}`, data)
      .then((res) => {
        dispatch({
          type: UPDATE_CURSOS,
          payload: res.data,
        });
        Swal.fire({
          title: "Listo",
          text: "Curso actualizado con éxito",
          icon: "success",
        });
        GetCursos();
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

  const DeleteCursos = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "El curso seleccionado será eliminado",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, volver",
    }).then((result) => {
      if (result.isConfirmed) {
        MethodDelete(`/course/${id}`)
          .then((res) => {
            Swal.fire({
              title: "Eliminado",
              text: res.data.mensaje,
              icon: "success",
            });
            GetCursos();
            dispatch({
              type: DELETE_CURSOS,
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

  const ChangePhotoCourse = (data) => {
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
        let url = `/courses/${data.id}/images`;
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

  const AddCursoFavorito = (course_id) => {
    MethodPost("/favorites", { course_id })
      .then((res) => {
        dispatch({
          type: ADD_CURSO_FAVORITO,
          payload: course_id,
        });
        Swal.fire({
          title: "Listo",
          text: "Curso agregado a favoritos",
          icon: "success",
        });
        GetCursos();
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

  const DeleteCursoFavorito = (course_id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "El curso será eliminado de tus favoritos",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, volver",
    }).then((result) => {
      if (result.isConfirmed) {
        MethodDelete(`/favorites/${course_id}`)
          .then((res) => {
            Swal.fire({
              title: "Eliminado",
              text: res.data.mensaje,
              icon: "success",
            }).then(() => {
              window.location.reload();
            });
            GetCursos();
            dispatch({
              type: DELETE_CURSO_FAVORITO,
              payload: course_id,
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
    <CursosContext.Provider
      value={{
        cursos: state.cursos,
        curso: state.curso,
        ErrorsApi: state.ErrorsApi,
        success: state.success,
        GetCursos,
        AddCursos,
        UpdateCursos,
        DeleteCursos,
        ChangePhotoCourse,
        AddCursoFavorito,
        DeleteCursoFavorito,
      }}
    >
      {children}
    </CursosContext.Provider>
  );
};

export default CursosState;
