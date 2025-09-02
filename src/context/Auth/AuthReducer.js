import {
  OBTENER_USUARIO,
  REGISTRO_EXITOSO,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION,
  GET_USER_ME,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case REGISTRO_EXITOSO:
      return {
        ...state,
        autenticado: false,
      };
    case LOGIN_EXITOSO:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        autenticado: true,
        cargando: false,
      };

    case OBTENER_USUARIO:
      return {
        ...state,
        autenticado: true,
        usuario: action.payload,
        cargando: false,
      };

    case LOGIN_ERROR:
    case CERRAR_SESION:
      return {
        ...state,
        token: null,
        usuario: null,
        autenticado: false,
        cargando: false,
      };
    case GET_USER_ME:
      return {
        ...state,
        user_me: action.payload.user,
        success: false,
        ErrorsApi: [],
      };
    default:
      return state;
  }
};
