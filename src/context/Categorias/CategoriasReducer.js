import { GET_ALL_CATEGORIAS, SHOW_ERRORS_API } from "../../types";

const CategoriasReducer = (state, action) => {
  switch (action.type) {
    case GET_ALL_CATEGORIAS:
      return {
        ...state,
        categorias: action.payload,
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

export default CategoriasReducer;

