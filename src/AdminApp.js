import "./App.css";
import AuthState from "./context/Auth/AuthState";
import CursosState from "./context/Cursos/CursosState";
import UsuarioState from "./context/Usuarios/UsuariosState";
import AppRouter from "./routes/AppRouter";

function AdminApp() {
  return (
    <AuthState>
      <UsuarioState>
        <CursosState>
          <AppRouter />
        </CursosState>
      </UsuarioState>
    </AuthState>
  );
}

export default AdminApp;
