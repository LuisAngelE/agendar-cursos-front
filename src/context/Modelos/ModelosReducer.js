import { GET_ALL_MODELOS, SHOW_ERRORS_API } from "../../types";

const ModelosReducer = (state, action) => {
  switch (action.type) {
    case GET_ALL_MODELOS:
      return {
        ...state,
        modelos: action.payload,
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

export default ModelosReducer;

