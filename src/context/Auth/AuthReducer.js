import { types } from "../../types";

export default (state, action) => {
  switch (action.type) {
    // Caso para el registro de usuario
    case types.REGISTRO_EXITOSO:
      return {
        ...state,
        autenticado: false,
      };
    // Caso para el inicio de sesión
    case types.LOGIN_EXITOSO:
      localStorage.setItem("token", action.payload.access_token);
      return {
        ...state,
        autenticado: true,
        cargando: false,
      };
    // Caso para obtener el usuario autenticado
    case types.OBTENER_USUARIO:
      return {
        ...state,
        autenticado: true,
        usuario: action.payload,
        cargando: false,
      };
    // Caso para cambiar la contraseña de los usuarios
    case types.USER_CHANGEPASSWORD:
      return {
        ...state,
        autenticado: true,
        cargando: false,
      };
    // Caso para cerrar la sesión de los usuarios
    case types.LOGIN_ERROR:
    case types.CERRAR_SESION:
      localStorage.removeItem("token");
      localStorage.removeItem("expires_at");
      return {
        ...state,
        token: null,
        usuario: null,
        autenticado: false,
        cargando: false,
      };
    default:
      return state;
  }
};
