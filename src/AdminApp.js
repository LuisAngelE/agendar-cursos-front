import "./App.css";
import AuthState from "./context/Auth/AuthState";
import UsuarioState from "./context/Usuarios/UsuariosState";
import AppRouter from "./routes/AppRouter";

function AdminApp() {
  return (
    <AuthState>
      <UsuarioState>
        <AppRouter />
      </UsuarioState>
    </AuthState>
  );
}

export default AdminApp;
