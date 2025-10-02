import {
  GET_COUNT_CATEGORIAS,
  GET_COUNT_COURSE,
  GET_COUNT_RESERVATION,
  GET_COUNT_USER,
} from "../../types";

const GraficasReducer = (state, action) => {
  switch (action.type) {
    case GET_COUNT_CATEGORIAS:
      return {
        ...state,
        total_categories: action.payload,
        ErrorsAPI: [],
      };
    case GET_COUNT_COURSE:
      return {
        ...state,
        total_course: action.payload,
        ErrorsAPI: [],
      };
    case GET_COUNT_RESERVATION:
      return {
        ...state,
        total_reservartion: action.payload,
        ErrorsAPI: [],
      };
    case GET_COUNT_USER:
      return {
        ...state,
        total_users: action.payload,
        ErrorsAPI: [],
      };
    default:
      return state;
  }
};

export default GraficasReducer;
