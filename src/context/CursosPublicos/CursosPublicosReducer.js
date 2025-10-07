import { GET_ALL_CURSOS_PUBLICOS, SHOW_ERRORS_API } from "../../types";

const CursosPublicosReducer = (state, action) => {
  switch (action.type) {
    case GET_ALL_CURSOS_PUBLICOS:
      return {
        ...state,
        cursosPublicos: action.payload,
        success: false,
        ErrorsApi: [],
      };
    case SHOW_ERRORS_API:
      return {
        ...state,
        ErrorsApi: action.payload,
      };
    default:
      return state;
  }
};

export default CursosPublicosReducer;
