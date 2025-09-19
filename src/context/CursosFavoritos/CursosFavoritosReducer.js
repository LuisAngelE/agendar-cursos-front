import {
  GET_ALL_CURSOS_FAVORITOS,
  ADD_CURSO_FAVORITO,
  DELETE_CURSO_FAVORITO,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case GET_ALL_CURSOS_FAVORITOS:
      return {
        ...state,
        cursos: action.payload,
      };
    case ADD_CURSO_FAVORITO:
      return {
        ...state,
        success: true,
      };
    case DELETE_CURSO_FAVORITO:
      return {
        ...state,
        cursos: state.cursos.filter((c) => c.id !== action.payload),
      };
    default:
      return state;
  }
};
