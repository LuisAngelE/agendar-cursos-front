import React from "react";
import { Switch, Route } from "react-router-dom/cjs/react-router-dom.min";
import Inicio from "../containers/Inicio/Inicio";
import Cursos from "../containers/Cursos/Cursos";
import Perfil from "../containers/Perfil/Perfil";
import Agenda from "../containers/Agenda/Agenda";
import Categorias from "../containers/Categorias/Categorias";
import NoResultados from "../components/layout/NoResultados";
import VistaCursos from "../containers/Cursos/VistaCursos";
import VistaAgenda from "../containers/Agenda/VistaAgenda";
import Usuarios from "../containers/Usuarios/Usuarios";
import Calendario from "../containers/Calendario/Calendario";

const AdminRoutes = () => {
  return (
    <Switch>
      <Route exact path="/Inicio" component={Inicio} />
      <Route exact path="/Usuarios" component={Usuarios} />
      <Route exact path="/Cursos" component={Cursos} />
      <Route exact path="/Cursos/:id" component={VistaCursos} />
      <Route exact path="/Agenda" component={Agenda} />
      <Route exact path="/Agenda/:id" component={VistaAgenda} />
      <Route exact path="/Perfil" component={Perfil} />
      <Route exact path="/Categorias" component={Categorias} />
      <Route exact path="/Calendario" component={Calendario} />

      <Route exact path="/no-resultados" component={NoResultados} />
      <Route component={NoResultados} />
    </Switch>
  );
};

export default AdminRoutes;
