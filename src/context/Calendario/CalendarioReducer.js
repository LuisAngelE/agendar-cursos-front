import { GET_ALL_CALENDARIO, SHOW_ERRORS_API } from "../../types";

const CalendarioReducer = (state, action) => {
  switch (action.type) {
    case GET_ALL_CALENDARIO:
      return {
        ...state,
        fechas: action.payload,
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

export default CalendarioReducer;
