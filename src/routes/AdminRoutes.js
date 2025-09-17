import React from "react";
import { Switch, Route } from "react-router-dom/cjs/react-router-dom.min";
import Inicio from "../containers/Inicio/Inicio";
import Cursos from "../containers/Cursos/Cursos";
import PersonasFisicas from "../containers/PersonasFisicas/PersonasFisicas";
import PersonasMorales from "../containers/PersonasMorales/PersonasMorales";
import Perfil from "../containers/Perfil/Perfil";
import Agenda from "../containers/Agenda/Agenda";
import Categorias from "../containers/Categorias/Categorias";
import NoResultados from "../components/layout/NoResultados";
import VistaCursos from "../containers/Cursos/VistaCursos";
import VistaAgenda from "../containers/Agenda/VistaAgenda";

const AdminRoutes = () => {
  return (
    <Switch>
      <Route exact path="/Inicio" component={Inicio} />
      <Route exact path="/PersonasFisicas" component={PersonasFisicas} />
      <Route exact path="/PersonasMorales" component={PersonasMorales} />
      <Route exact path="/Cursos" component={Cursos} />
      <Route exact path="/Cursos/:id" component={VistaCursos} />
      <Route exact path="/Agenda" component={Agenda} />
      <Route exact path="/Agenda/:id" component={VistaAgenda} />
      <Route exact path="/Perfil" component={Perfil} />
      <Route exact path="/Categorias" component={Categorias} />

      <Route exact path="/no-resultados" component={NoResultados} />
      <Route component={NoResultados} />
    </Switch>
  );
};

export default AdminRoutes;
