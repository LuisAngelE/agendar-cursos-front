import {
  ADD_USERS,
  DELETE_USERS,
  GET_ALL_USERS,
  GET_ALL_USERS_FISICOS,
  GET_ALL_USERS_MORALES,
  UPDATE_USERS,
  GET_ALL_CLIENTS,
  SHOW_ERRORS_API,
} from "../../types";

const UsuariosReducer = (state, action) => {
  switch (action.type) {
    case GET_ALL_CLIENTS:
      return {
        ...state,
        clients: action.payload,
        success: false,
        ErrorsApi: [],
      };
    case GET_ALL_USERS:
      return {
        ...state,
        users: action.payload,
        success: false,
        ErrorsApi: [],
      };
    case GET_ALL_USERS_FISICOS:
      return {
        ...state,
        usersFisicos: action.payload,
        success: false,
        ErrorsApi: [],
      };
    case GET_ALL_USERS_MORALES:
      return {
        ...state,
        usersMorales: action.payload,
        success: false,
        ErrorsApi: [],
      };
    case ADD_USERS:
      return {
        ...state,
        users: [action.payload, ...state.users],
      };
    case UPDATE_USERS:
      return {
        ...state,
        ErrorsApi: [],
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };
    case DELETE_USERS:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
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

export default UsuariosReducer;
