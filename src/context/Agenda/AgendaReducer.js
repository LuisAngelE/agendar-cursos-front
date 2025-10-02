import {
  GET_ALL_AGENDAS,
  GET_ALL_AGENDAS_COUNT,
  ADD_AGENDAS,
  SHOW_ERRORS_API,
} from "../../types";

const AgendaReducer = (state, action) => {
  switch (action.type) {
    case GET_ALL_AGENDAS:
      return {
        ...state,
        agendas: action.payload,
        success: false,
        ErrorsApi: [],
      };
    case GET_ALL_AGENDAS_COUNT:
      return {
        ...state,
        agendasCount: action.payload,
        success: false,
        ErrorsApi: [],
      };
    case ADD_AGENDAS:
      return {
        ...state,
        agendas: [action.payload, ...state.agendas],
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

export default AgendaReducer;
