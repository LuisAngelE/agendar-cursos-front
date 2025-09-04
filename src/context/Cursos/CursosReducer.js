import { GET_ALL_CURSOS, SHOW_ERRORS_API } from "../../types";

const CursosReducer = (state, action) => {
  switch (action.type) {
    case GET_ALL_CURSOS:
      return {
        ...state,
        cursos: action.payload,
        success: false,
        ErrorsApi: [],
      };

    default:
      return state;
  }
};

export default CursosReducer;
