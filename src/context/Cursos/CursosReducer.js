import { GET_ALL_CURSOS, ADD_CURSOS, SHOW_ERRORS_API } from "../../types";

const CursosReducer = (state, action) => {
  switch (action.type) {
    case GET_ALL_CURSOS:
      return {
        ...state,
        cursos: action.payload,
        success: false,
        ErrorsApi: [],
      };
    case ADD_CURSOS:
      return {
        ...state,
        cursos: [action.payload, ...state.cursos],
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

export default CursosReducer;
