import "./App.css";
import AuthState from "./context/Auth/AuthState";
import CategoriasState from "./context/Categorias/CategoriasState";
import CursosState from "./context/Cursos/CursosState";
import UsuarioState from "./context/Usuarios/UsuariosState";
import AppRouter from "./routes/AppRouter";

function AdminApp() {
  return (
    <AuthState>
      <UsuarioState>
        <CursosState>
          <CategoriasState>
            <AppRouter />
          </CategoriasState>
        </CursosState>
      </UsuarioState>
    </AuthState>
  );
}

export default AdminApp;
