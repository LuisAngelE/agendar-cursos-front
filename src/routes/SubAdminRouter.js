import React from "react";
import { Switch, Route } from "react-router-dom/cjs/react-router-dom.min";
import Inicio from "../containers/Inicio/Inicio";
import Cursos from "../containers/Cursos/Cursos";
import Perfil from "../containers/Perfil/Perfil";
import NoResultados from "../components/layout/NoResultados";
import VistaCursos from "../containers/Cursos/VistaCursos";
import Calendario from "../containers/Calendario/Calendario";

const SubAdminRouter = () => {
  return (
    <Switch>
      <Route exact path="/Cursos" component={Cursos} />
      <Route exact path="/Cursos/:id" component={VistaCursos} />
      <Route exact path="/Perfil" component={Perfil} />
      <Route exact path="/Calendario" component={Calendario} />

      <Route exact path="/no-resultados" component={NoResultados} />
      <Route component={NoResultados} />
    </Switch>
  );
};

export default SubAdminRouter;
