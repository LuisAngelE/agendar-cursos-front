import "./App.css";
import AgendaState from "./context/Agenda/AgendaState";
import AuthState from "./context/Auth/AuthState";
import CalendarioState from "./context/Calendario/CalendarioState";
import CategoriasState from "./context/Categorias/CategoriasState";
import CursosState from "./context/Cursos/CursosState";
import CursosFavoritosState from "./context/CursosFavoritos/CursosFavoritosState";
import CursosPublicosState from "./context/CursosPublicos/CursosPublicosState";
import GraficasState from "./context/Graficas/GraficasState";
import ModelosState from "./context/Modelos/ModelosState";
import UsuarioState from "./context/Usuarios/UsuariosState";
import AppRouter from "./routes/AppRouter";

function AdminApp() {
  return (
    <AuthState>
      <UsuarioState>
        <CursosState>
          <CategoriasState>
            <AgendaState>
              <CursosFavoritosState>
                <GraficasState>
                  <CursosPublicosState>
                    <CalendarioState>
                      <ModelosState>
                        <AppRouter />
                      </ModelosState>
                    </CalendarioState>
                  </CursosPublicosState>
                </GraficasState>
              </CursosFavoritosState>
            </AgendaState>
          </CategoriasState>
        </CursosState>
      </UsuarioState>
    </AuthState>
  );
}

export default AdminApp;
